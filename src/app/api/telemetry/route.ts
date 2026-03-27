import { NextResponse } from "next/server";

interface TelemetryPayload {
  event: string;
  timestamp?: number;
  [key: string]: unknown;
}

/**
 * POST /api/telemetry
 * Receives anonymous performance telemetry beacons from the client.
 * In production this can be forwarded to an analytics provider.
 */
export async function POST(request: Request) {
  try {
    const payload: TelemetryPayload = await request.json();

    // Validate that this is a known event from our app
    const allowedEvents = ["device_tier", "frame_drop"];
    if (!allowedEvents.includes(payload.event)) {
      return NextResponse.json({ error: "unknown event" }, { status: 400 });
    }

    // Strip any accidental PII fields before logging
    const { event, timestamp, tier, fps, cores, memory, gpuTier, networkTier, fromFps, toFps } = payload;

    // In production: forward to analytics (e.g. LogRocket, OpenTelemetry, Vercel Analytics)
    // Always respond 204 — sendBeacon ignores the response body
    return new NextResponse(null, { status: 204 });
  } catch {
    // Telemetry errors must never propagate to clients
    return new NextResponse(null, { status: 204 });
  }
}
