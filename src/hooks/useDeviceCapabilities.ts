"use client";

import { useState, useEffect } from "react";

export type DeviceTier = "low" | "mid" | "high";
export type NetworkTier = "slow" | "fast";

export interface DeviceCapabilities {
  tier: DeviceTier;
  prefersReducedMotion: boolean;
  networkTier: NetworkTier;
  cores: number;
  memory: number;
}

// Safely read navigator.deviceMemory (not available in all browsers/TypeScript types)
function getDeviceMemory(): number {
  if (typeof navigator === "undefined") return 4;
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
}

// Safely read navigator.connection (Network Information API)
function getEffectiveType(): string {
  if (typeof navigator === "undefined") return "4g";
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  return conn?.effectiveType ?? "4g";
}

function computeTier(cores: number, memory: number): DeviceTier {
  if (cores <= 2 || memory <= 2) return "low";
  if (cores <= 4 || memory <= 4) return "mid";
  return "high";
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    tier: "high",
    prefersReducedMotion: false,
    networkTier: "fast",
    cores: 8,
    memory: 8,
  });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = getDeviceMemory();
    const effectiveType = getEffectiveType();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const networkTier: NetworkTier = ["slow-2g", "2g", "3g"].includes(effectiveType) ? "slow" : "fast";
    const tier = computeTier(cores, memory);

    setCapabilities({ tier, prefersReducedMotion, networkTier, cores, memory });

    // React to prefers-reduced-motion changes in real time
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setCapabilities((prev) => ({ ...prev, prefersReducedMotion: e.matches }));
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return capabilities;
}
