import type { DeviceTier } from "@/hooks/useDeviceCapabilities";
import type { FrameRate } from "@/hooks/useFrameRate";

// ---------------------------------------------------------------------------
// Framer Motion transition presets keyed by device tier
// ---------------------------------------------------------------------------

export const adaptiveTransition = {
  low: { duration: 0 } as const,
  mid: { type: "tween" as const, duration: 0.2, ease: "easeOut" as const },
  high: { type: "spring" as const, bounce: 0.5, duration: 0.5 },
} satisfies Record<DeviceTier, object>;

export const adaptiveSpring = {
  low: { duration: 0 } as const,
  mid: { type: "tween" as const, duration: 0.3, ease: "easeInOut" as const },
  high: { type: "spring" as const, stiffness: 380, damping: 22, mass: 0.8 },
} satisfies Record<DeviceTier, object>;

/**
 * Scale an animation duration to the display refresh rate.
 * Higher Hz screens look best with slightly shorter durations so
 * the same physical motion covers fewer real-world milliseconds.
 */
export function scaleDuration(baseDuration: number, fps: FrameRate): number {
  const map: Record<FrameRate, number> = {
    60: 1.0,
    90: 0.85,
    120: 0.7,
    144: 0.6,
  };
  return baseDuration * map[fps];
}

/**
 * Returns a Framer Motion variant set (hidden/visible) that is a
 * simple fade on low-tier vs full spring pop on high-tier.
 */
export function adaptiveFadeVariants(tier: DeviceTier) {
  if (tier === "low") {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  if (tier === "mid") {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.5 },
    },
  };
}
