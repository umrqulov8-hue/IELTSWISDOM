"use client";

import { useState, useEffect } from "react";

export type FrameRate = 60 | 90 | 120 | 144;

export interface FrameRateInfo {
  fps: FrameRate;
  /** Duration multiplier: 1.0 at 60Hz, 0.75 at 90Hz, 0.5 at 120Hz+ */
  durationMultiplier: number;
}

function bucketFps(measured: number): FrameRate {
  if (measured >= 130) return 144;
  if (measured >= 105) return 120;
  if (measured >= 75) return 90;
  return 60;
}

function getMultiplier(fps: FrameRate): number {
  const map: Record<FrameRate, number> = { 60: 1.0, 90: 0.75, 120: 0.55, 144: 0.45 };
  return map[fps];
}

/**
 * Measures the actual display refresh rate using two consecutive
 * requestAnimationFrame callbacks. Buckets the result into standard
 * Hz values and returns a duration multiplier for animations.
 */
export function useFrameRate(): FrameRateInfo {
  const [info, setInfo] = useState<FrameRateInfo>({ fps: 60, durationMultiplier: 1.0 });

  useEffect(() => {
    let raf1: number;
    let raf2: number;

    raf1 = requestAnimationFrame((t1) => {
      raf2 = requestAnimationFrame((t2) => {
        const delta = t2 - t1;
        if (delta > 0) {
          const measured = 1000 / delta;
          const fps = bucketFps(measured);
          setInfo({ fps, durationMultiplier: getMultiplier(fps) });
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return info;
}
