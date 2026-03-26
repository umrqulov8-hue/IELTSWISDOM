"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ielts-low-power";

export interface LowPowerMode {
  /** True when user has manually enabled low-power mode or battery is critically low */
  isLowPower: boolean;
  /** Whether the current state was set manually vs auto-detected */
  isManual: boolean;
  /** Toggle low-power mode on/off manually */
  toggleLowPower: () => void;
  /** Force override – used by DeviceContext when battery < 20% */
  forceEnable: () => void;
  /** Disable the forced override */
  forceClear: () => void;
}

/**
 * Manages the low-power mode state with:
 * - Persistent user preference (localStorage)
 * - Programmatic override for auto battery-based activation
 * - System prefers-reduced-motion sync
 */
export function useLowPowerMode(): LowPowerMode {
  const [isManual, setIsManual] = useState(false);
  const [isForced, setIsForced] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "true") setIsManual(true);
    } catch { /* Private browsing */ }
  }, []);

  const toggleLowPower = useCallback(() => {
    setIsManual((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const forceEnable = useCallback(() => setIsForced(true), []);
  const forceClear = useCallback(() => setIsForced(false), []);

  const isLowPower = isManual || isForced;

  // Sync html attribute for CSS
  useEffect(() => {
    document.documentElement.setAttribute("data-low-power", String(isLowPower));
  }, [isLowPower]);

  return { isLowPower, isManual, toggleLowPower, forceEnable, forceClear };
}
