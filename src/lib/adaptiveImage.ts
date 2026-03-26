import type { DeviceTier } from "@/hooks/useDeviceCapabilities";

interface AdaptiveImageOptions {
  width?: number;
  quality?: number;
}

/**
 * Returns Next.js Image component quality prop based on device tier.
 * High tier → 90, mid → 75, low → 55.
 */
export function getAdaptiveImageQuality(tier: DeviceTier): number {
  const map: Record<DeviceTier, number> = { low: 55, mid: 75, high: 90 };
  return map[tier];
}

/**
 * Appends Cloudinary/Imgix compatible transform params to a base URL
 * for adaptive image delivery.
 * Passthrough if the URL is already a Next.js internal path.
 */
export function getAdaptiveImageSrc(
  baseSrc: string,
  tier: DeviceTier,
  opts: AdaptiveImageOptions = {}
): string {
  if (baseSrc.startsWith("/")) return baseSrc; // local assets — handled by Next.js Image

  const quality = opts.quality ?? getAdaptiveImageQuality(tier);
  const width = opts.width;

  const url = new URL(baseSrc);
  url.searchParams.set("q", String(quality));
  if (width) url.searchParams.set("w", String(width));
  return url.toString();
}
