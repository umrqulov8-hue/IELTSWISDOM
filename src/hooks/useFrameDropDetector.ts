"use client";

import { useState, useEffect, useRef } from "react";

export interface FrameDropInfo {
  /** Current rolling-average FPS over last 2s */
  currentFps: number;
  /** True if FPS has dropped >20% below the expected refresh rate */
  isDropping: boolean;
  /** Number of drop events detected since mount */
  dropCount: number;
}

const WINDOW_MS = 2000; // 2-second rolling window
const DROP_THRESHOLD = 0.8; // 80% of expected = dropping
const MIN_EXPECTED_FPS = 55; // floor for 60Hz detection

/**
 * Monitors real-time FPS using a rolling requestAnimationFrame window.
 * When actual FPS drops more than 20% below the expected refresh rate,
 * `isDropping` becomes true so the app can downgrade animations.
 */
export function useFrameDropDetector(expectedFps: number = 60): FrameDropInfo {
  const [info, setInfo] = useState<FrameDropInfo>({
    currentFps: expectedFps,
    isDropping: false,
    dropCount: 0,
  });

  const rafRef = useRef<number>(0);
  const dropCountRef = useRef(0);
  const framesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const threshold = Math.max(MIN_EXPECTED_FPS, expectedFps) * DROP_THRESHOLD;

    function frame(timestamp: number) {
      if (lastTimeRef.current > 0) {
        framesRef.current.push(timestamp);
        // Keep only frames within the rolling window
        framesRef.current = framesRef.current.filter((t) => timestamp - t < WINDOW_MS);

        const windowFps = framesRef.current.length / (WINDOW_MS / 1000);

        const isDropping = windowFps < threshold && framesRef.current.length > 5;
        if (isDropping) dropCountRef.current += 1;

        setInfo((prev) => {
          const newInfo: FrameDropInfo = {
            currentFps: Math.round(windowFps),
            isDropping,
            dropCount: dropCountRef.current,
          };
          // Only update state if values changed to avoid excessive renders
          if (
            prev.currentFps === newInfo.currentFps &&
            prev.isDropping === newInfo.isDropping
          ) return prev;
          return newInfo;
        });
      }
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [expectedFps]);

  return info;
}
