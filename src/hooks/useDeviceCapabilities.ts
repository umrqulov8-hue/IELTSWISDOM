"use client";

import { useState, useEffect } from "react";

export type DeviceTier = "low" | "mid" | "high";
export type NetworkTier = "slow" | "fast";
export type GpuTier = "software" | "integrated" | "discrete";

export interface DeviceCapabilities {
  tier: DeviceTier;
  prefersReducedMotion: boolean;
  networkTier: NetworkTier;
  cores: number;
  memory: number;
  // v2 fields
  batteryLevel: number;
  isCharging: boolean;
  isBatteryLow: boolean;
  gpuTier: GpuTier;
}

// ---------------------------------------------------------------------------
// Safe browser API readers
// ---------------------------------------------------------------------------

type NavigatorWithExtras = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string; addEventListener?: Function; removeEventListener?: Function };
  gpu?: { requestAdapter: () => Promise<{ info?: { description?: string } } | null> };
};

function getDeviceMemory(): number {
  if (typeof navigator === "undefined") return 4;
  return (navigator as NavigatorWithExtras).deviceMemory ?? 4;
}

function getEffectiveType(): string {
  if (typeof navigator === "undefined") return "4g";
  return (navigator as NavigatorWithExtras).connection?.effectiveType ?? "4g";
}

/** Detect GPU tier:
 * - WebGPU available + discrete keyword → "discrete"
 * - WebGL renderer contains intel/apple/mali/adreno → "integrated"
 * - Software/llvm/swiftshader → "software"
 */
async function detectGpuTier(): Promise<GpuTier> {
  try {
    const nav = navigator as NavigatorWithExtras;
    if (nav.gpu) {
      const adapter = await nav.gpu.requestAdapter();
      const desc = adapter?.info?.description?.toLowerCase() ?? "";
      if (desc.includes("nvidia") || desc.includes("amd") || desc.includes("radeon")) return "discrete";
      if (desc.includes("intel") || desc.includes("apple") || desc.includes("mali") || desc.includes("adreno")) return "integrated";
      if (desc.includes("software") || desc.includes("llvm") || desc.includes("swiftshader")) return "software";
    }
  } catch { /* WebGPU not supported */ }

  // WebGL fallback
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)?.toString().toLowerCase() ?? "";
        if (renderer.includes("llvm") || renderer.includes("swiftshader") || renderer.includes("vmware")) return "software";
        if (renderer.includes("intel") || renderer.includes("apple") || renderer.includes("mali") || renderer.includes("adreno")) return "integrated";
        if (renderer.includes("nvidia") || renderer.includes("amd") || renderer.includes("radeon") || renderer.includes("geforce")) return "discrete";
      }
    }
  } catch { /* WebGL not supported */ }

  return "integrated"; // safe default
}

function computeTier(cores: number, memory: number, isBatteryLow: boolean, gpuTier: GpuTier): DeviceTier {
  // Battery low always forces low tier regardless of hardware
  if (isBatteryLow) return "low";
  // Software GPU or very low resources
  if (gpuTier === "software" || cores <= 2 || memory <= 2) return "low";
  if (cores <= 4 || memory <= 4) return "mid";
  return "high";
}

// ---------------------------------------------------------------------------
// Main hook
// ---------------------------------------------------------------------------

const DEFAULT_STATE: DeviceCapabilities = {
  tier: "high",
  prefersReducedMotion: false,
  networkTier: "fast",
  cores: 8,
  memory: 8,
  batteryLevel: 1,
  isCharging: true,
  isBatteryLow: false,
  gpuTier: "integrated",
};

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(DEFAULT_STATE);

  useEffect(() => {
    let cleanup: (() => void)[] = [];

    // ─── PHASE 1: Instant sync detection (runs before first paint) ────────────
    // All sync APIs — no blocking, establishes initial tier within microseconds
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = getDeviceMemory();
    const effectiveType = getEffectiveType();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const networkTier: NetworkTier = ["slow-2g", "2g", "3g"].includes(effectiveType) ? "slow" : "fast";
    // GPU defaults to "integrated" for initial render — updated async below
    const initialTier = computeTier(cores, memory, false, "integrated");

    setCapabilities((prev) => ({
      ...prev,
      tier: initialTier,
      prefersReducedMotion,
      networkTier,
      cores,
      memory,
    }));

    // ─── PHASE 2: Async enrichment (battery + GPU, doesn't block paint) ───────
    async function enrichAsync() {
      // GPU detection (WebGPU + WebGL fallback)
      const gpuTier = await detectGpuTier();

      // Battery API
      let batteryLevel = 1;
      let isCharging = true;
      try {
        type BatteryManager = { level: number; charging: boolean; addEventListener: Function; removeEventListener: Function };
        const battery = await (navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }).getBattery?.() as BatteryManager | undefined;
        if (battery) {
          batteryLevel = battery.level;
          isCharging = battery.charging;

          const onBatteryChange = () => {
            const isBatteryLow = battery.level < 0.2 && !battery.charging;
            setCapabilities((prev) => {
              const tier = computeTier(prev.cores, prev.memory, isBatteryLow, prev.gpuTier);
              return { ...prev, batteryLevel: battery.level, isCharging: battery.charging, isBatteryLow, tier };
            });
          };
          battery.addEventListener("levelchange", onBatteryChange);
          battery.addEventListener("chargingchange", onBatteryChange);
          cleanup.push(() => {
            battery.removeEventListener("levelchange", onBatteryChange);
            battery.removeEventListener("chargingchange", onBatteryChange);
          });
        }
      } catch { /* Battery API not supported */ }

      const isBatteryLow = batteryLevel < 0.2 && !isCharging;
      const enrichedTier = computeTier(cores, memory, isBatteryLow, gpuTier);

      setCapabilities((prev) => ({
        ...prev,
        tier: enrichedTier,
        gpuTier,
        batteryLevel,
        isCharging,
        isBatteryLow,
      }));
    }

    // Use requestIdleCallback to defer GPU detection until after first render
    if (typeof requestIdleCallback !== "undefined") {
      const handle = requestIdleCallback(() => enrichAsync());
      cleanup.push(() => cancelIdleCallback(handle));
    } else {
      // Fallback: defer with setTimeout
      const t = setTimeout(enrichAsync, 200);
      cleanup.push(() => clearTimeout(t));
    }

    // ─── Live change listeners ─────────────────────────────────────────────────
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionHandler = (e: MediaQueryListEvent) =>
      setCapabilities((prev) => ({ ...prev, prefersReducedMotion: e.matches }));
    mql.addEventListener("change", motionHandler);
    cleanup.push(() => mql.removeEventListener("change", motionHandler));

    const conn = (navigator as NavigatorWithExtras).connection;
    if (conn?.addEventListener) {
      const netHandler = () => {
        const nt: NetworkTier = ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "") ? "slow" : "fast";
        setCapabilities((prev) => ({ ...prev, networkTier: nt }));
      };
      conn.addEventListener("change", netHandler);
      cleanup.push(() => conn.removeEventListener?.("change", netHandler));
    }

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return capabilities;
}

