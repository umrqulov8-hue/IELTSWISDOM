import type { DeviceTier, NetworkTier } from "@/hooks/useDeviceCapabilities";

export interface AdaptiveVideoProps {
  /** Resolved video src — suffix based on tier */
  src: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  /** HTML video preload attribute */
  preload: "none" | "metadata" | "auto";
  /** Whether to render the video at all (false on very low tier + slow network) */
  shouldRender: boolean;
}

type QualitySuffix = "480p" | "720p" | "1080p";

/**
 * Converts a base video URL like "/videos/hero.mp4" to tier-appropriate:
 * - high  → "/videos/hero_1080p.mp4"
 * - mid   → "/videos/hero_720p.mp4"
 * - low   → "/videos/hero_480p.mp4"
 *
 * Also controls autoPlay (off on low) and preload strategy.
 */
export function getAdaptiveVideoProps(
  baseSrc: string,
  tier: DeviceTier,
  networkTier: NetworkTier,
  isBatteryLow: boolean = false
): AdaptiveVideoProps {
  // Ultra-low: don't render at all if on slow network + low tier
  if ((tier === "low" || isBatteryLow) && networkTier === "slow") {
    return { src: baseSrc, autoPlay: false, loop: false, muted: true, preload: "none", shouldRender: false };
  }

  const effectiveTier: DeviceTier = isBatteryLow ? "low" : tier;

  const suffixMap: Record<DeviceTier, QualitySuffix> = {
    low: "480p",
    mid: "720p",
    high: "1080p",
  };

  const suffix = suffixMap[effectiveTier];
  // Insert quality suffix before file extension
  const resolvedSrc = baseSrc.replace(/(\.\w+)$/, `_${suffix}$1`);

  const config: Record<DeviceTier, Omit<AdaptiveVideoProps, "src" | "shouldRender">> = {
    low:  { autoPlay: false, loop: false, muted: true, preload: "none" },
    mid:  { autoPlay: false, loop: true,  muted: true, preload: "metadata" },
    high: { autoPlay: true,  loop: true,  muted: true, preload: "auto" },
  };

  return { src: resolvedSrc, shouldRender: true, ...config[effectiveTier] };
}
