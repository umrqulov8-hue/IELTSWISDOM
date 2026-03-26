/**
 * Privacy-first performance telemetry.
 * All payloads are anonymous — no user IDs, cookies, or PII.
 * Uses navigator.sendBeacon for fire-and-forget delivery.
 */

export interface DeviceTierPayload {
  tier: string;
  fps: number;
  cores: number;
  memory: number;
  gpuTier: string;
  networkTier: string;
}

export interface FrameDropPayload {
  fromFps: number;
  toFps: number;
  tier: string;
}

const ENDPOINT = "/api/telemetry";

// Track whether we've already beaconed this session to avoid spam
let hasTrackedTier = false;

/**
 * Sends a single anonymous device-tier beacon per session.
 * This fires once on DeviceProvider mount.
 */
export function trackDeviceTier(payload: DeviceTierPayload): void {
  if (hasTrackedTier) return;
  hasTrackedTier = true;

  if (typeof navigator === "undefined" || !navigator.sendBeacon) return;

  try {
    const blob = new Blob(
      [JSON.stringify({ event: "device_tier", ...payload, timestamp: Date.now() })],
      { type: "application/json" }
    );
    navigator.sendBeacon(ENDPOINT, blob);
  } catch { /* ignore — telemetry must never crash the app */ }
}

/**
 * Tracks real-time frame drop events.
 * Rate-limited to once per 5 seconds to avoid noisy data.
 */
let lastDropTracked = 0;
export function trackFrameDrop(payload: FrameDropPayload): void {
  const now = Date.now();
  if (now - lastDropTracked < 5000) return;
  lastDropTracked = now;

  if (typeof navigator === "undefined" || !navigator.sendBeacon) return;

  try {
    const blob = new Blob(
      [JSON.stringify({ event: "frame_drop", ...payload, timestamp: now })],
      { type: "application/json" }
    );
    navigator.sendBeacon(ENDPOINT, blob);
  } catch { /* ignore */ }
}
