"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useDeviceCapabilities, type DeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { useFrameRate, type FrameRateInfo } from "@/hooks/useFrameRate";
import { useFrameDropDetector, type FrameDropInfo } from "@/hooks/useFrameDropDetector";
import { useLowPowerMode, type LowPowerMode } from "@/hooks/useLowPowerMode";
import { trackDeviceTier } from "@/lib/performanceTelemetry";

export interface DeviceContextValue
  extends DeviceCapabilities,
    FrameRateInfo,
    Omit<FrameDropInfo, "dropCount">,
    Pick<LowPowerMode, "isLowPower" | "isManual" | "toggleLowPower"> {
  /** True if animations should run (non-low tier AND not reduced-motion AND not low-power) */
  shouldAnimate: boolean;
  /** True only on high-tier devices — enables heavy blur/backdrop/particle effects */
  shouldUseHeavyEffects: boolean;
  /** Drop count since session start */
  dropCount: number;
}

const defaultValue: DeviceContextValue = {
  tier: "high",
  prefersReducedMotion: false,
  networkTier: "fast",
  cores: 8,
  memory: 8,
  batteryLevel: 1,
  isCharging: true,
  isBatteryLow: false,
  gpuTier: "integrated",
  fps: 60,
  durationMultiplier: 1.0,
  currentFps: 60,
  isDropping: false,
  dropCount: 0,
  isLowPower: false,
  isManual: false,
  toggleLowPower: () => {},
  shouldAnimate: true,
  shouldUseHeavyEffects: true,
};

const DeviceContext = createContext<DeviceContextValue>(defaultValue);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const capabilities = useDeviceCapabilities();
  const frameRate = useFrameRate();
  const frameDrop = useFrameDropDetector(frameRate.fps);
  const lowPower = useLowPowerMode();

  // Auto-enable low-power when battery is critically low
  useEffect(() => {
    if (capabilities.isBatteryLow) {
      lowPower.forceEnable();
    } else {
      lowPower.forceClear();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capabilities.isBatteryLow]);

  const isLowPower = lowPower.isLowPower;

  // Downgrade animation gate when frame-dropping in real time
  const effectiveTier =
    (frameDrop.isDropping && capabilities.tier === "high") ? "mid"
    : capabilities.tier;

  const shouldAnimate =
    effectiveTier !== "low" &&
    !capabilities.prefersReducedMotion &&
    !isLowPower;

  const shouldUseHeavyEffects =
    effectiveTier === "high" &&
    !capabilities.prefersReducedMotion &&
    !isLowPower &&
    !frameDrop.isDropping;

  const value: DeviceContextValue = {
    ...capabilities,
    // Override tier with effective tier
    tier: effectiveTier,
    ...frameRate,
    currentFps: frameDrop.currentFps,
    isDropping: frameDrop.isDropping,
    dropCount: frameDrop.dropCount,
    isLowPower,
    isManual: lowPower.isManual,
    toggleLowPower: lowPower.toggleLowPower,
    shouldAnimate,
    shouldUseHeavyEffects,
  };

  // Set data-* HTML attributes for CSS selectors
  useEffect(() => {
    document.documentElement.setAttribute("data-device-tier", effectiveTier);
    document.documentElement.setAttribute(
      "data-reduced-motion",
      String(capabilities.prefersReducedMotion)
    );
    document.documentElement.setAttribute("data-fps", String(frameRate.fps));
    document.documentElement.setAttribute("data-low-power", String(isLowPower));
    document.documentElement.setAttribute("data-gpu", capabilities.gpuTier);
    document.documentElement.setAttribute("data-dropping", String(frameDrop.isDropping));
  }, [effectiveTier, capabilities.prefersReducedMotion, frameRate.fps, isLowPower, capabilities.gpuTier, frameDrop.isDropping]);

  // Send ONE anonymous telemetry beacon per session
  useEffect(() => {
    trackDeviceTier({
      tier: capabilities.tier,
      fps: frameRate.fps,
      cores: capabilities.cores,
      memory: capabilities.memory,
      gpuTier: capabilities.gpuTier,
      networkTier: capabilities.networkTier,
    });
  // Only run once on initial capability detection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceContextValue {
  return useContext(DeviceContext);
}
