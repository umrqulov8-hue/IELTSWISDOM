import type { DeviceTier } from "@/hooks/useDeviceCapabilities";
import type { NetworkTier } from "@/hooks/useDeviceCapabilities";

interface AdaptiveImageResult {
  quality: number;
  sizes: string;
  /** Append ?w=N to remote CDN URLs */
  cdnWidth: number;
}

/**
 * Returns Next.js Image component props optimised for device and network.
 * For local `/` paths, use `quality` directly with Next.js `<Image quality={}>`.
 * For remote CDN URLs, append the `cdnWidth` as a query param.
 */
export function getAdaptiveImageProps(
  tier: DeviceTier,
  networkTier: NetworkTier,
  isBatteryLow: boolean = false
): AdaptiveImageResult {
  // Battery low → minimum quality regardless of tier
  if (isBatteryLow) return { quality: 40, sizes: "(max-width: 640px) 100vw, 640px", cdnWidth: 640 };
  // Slow network → reduce bandwidth
  if (networkTier === "slow") return { quality: 55, sizes: "(max-width: 480px) 100vw, 480px", cdnWidth: 480 };

  const map: Record<DeviceTier, AdaptiveImageResult> = {
    low:  { quality: 55, sizes: "(max-width: 640px) 100vw, 640px", cdnWidth: 640 },
    mid:  { quality: 75, sizes: "(max-width: 1024px) 100vw, 1024px", cdnWidth: 1024 },
    high: { quality: 90, sizes: "100vw", cdnWidth: 1920 },
  };
  return map[tier];
}

/**
 * Gets quality as a simple number (for use with Next.js <Image quality={n}>).
 */
export function getAdaptiveImageQuality(
  tier: DeviceTier,
  networkTier: NetworkTier = "fast",
  isBatteryLow: boolean = false
): number {
  return getAdaptiveImageProps(tier, networkTier, isBatteryLow).quality;
}

/**
 * Appends Cloudinary/Imgix compatible transform params to a base URL.
 * Passthrough if the URL is an internal Next.js path.
 */
export function getAdaptiveImageSrc(
  baseSrc: string,
  tier: DeviceTier,
  networkTier: NetworkTier = "fast",
  isBatteryLow: boolean = false
): string {
  if (baseSrc.startsWith("/")) return baseSrc;
  const { quality, cdnWidth } = getAdaptiveImageProps(tier, networkTier, isBatteryLow);
  const url = new URL(baseSrc);
  url.searchParams.set("q", String(quality));
  url.searchParams.set("w", String(cdnWidth));
  return url.toString();
}
