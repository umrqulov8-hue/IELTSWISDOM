"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useDeviceCapabilities, type DeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { useFrameRate, type FrameRateInfo } from "@/hooks/useFrameRate";

export interface DeviceContextValue extends DeviceCapabilities, FrameRateInfo {
  /** True if animations should run (non-low tier AND not reduced-motion) */
  shouldAnimate: boolean;
  /** True only on high-tier devices — enables heavy blur/backdrop/particle effects */
  shouldUseHeavyEffects: boolean;
}

const defaultValue: DeviceContextValue = {
  tier: "high",
  prefersReducedMotion: false,
  networkTier: "fast",
  cores: 8,
  memory: 8,
  fps: 60,
  durationMultiplier: 1.0,
  shouldAnimate: true,
  shouldUseHeavyEffects: true,
};

const DeviceContext = createContext<DeviceContextValue>(defaultValue);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const capabilities = useDeviceCapabilities();
  const frameRate = useFrameRate();

  const shouldAnimate = capabilities.tier !== "low" && !capabilities.prefersReducedMotion;
  const shouldUseHeavyEffects = capabilities.tier === "high" && !capabilities.prefersReducedMotion;

  const value: DeviceContextValue = {
    ...capabilities,
    ...frameRate,
    shouldAnimate,
    shouldUseHeavyEffects,
  };

  // Mount data-device-tier on <html> so CSS can adapt via attribute selectors
  useEffect(() => {
    document.documentElement.setAttribute("data-device-tier", capabilities.tier);
    document.documentElement.setAttribute(
      "data-reduced-motion",
      String(capabilities.prefersReducedMotion)
    );
    document.documentElement.setAttribute("data-fps", String(frameRate.fps));
  }, [capabilities.tier, capabilities.prefersReducedMotion, frameRate.fps]);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceContextValue {
  return useContext(DeviceContext);
}
