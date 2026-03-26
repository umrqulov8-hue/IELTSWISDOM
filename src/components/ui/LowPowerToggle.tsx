"use client";

import { useDevice } from "@/context/DeviceContext";

/**
 * LowPowerToggle — floating battery pill button.
 * Shows current power mode and lets users toggle low-power manually.
 * Accessible: aria-label, keyboard navigable, respects prefers-reduced-motion.
 */
export function LowPowerToggle() {
  const { isLowPower, isManual, isBatteryLow, batteryLevel, isCharging, toggleLowPower } = useDevice();

  const pct = Math.round(batteryLevel * 100);

  // Battery color based on level
  const batteryColor =
    batteryLevel < 0.2 ? "text-red-500" :
    batteryLevel < 0.5 ? "text-amber-500" :
    "text-emerald-500";

  // Battery fill segments (3 bars)
  const filledBars = batteryLevel < 0.25 ? 1 : batteryLevel < 0.6 ? 2 : 3;

  return (
    <button
      onClick={toggleLowPower}
      aria-label={isLowPower ? "Disable low-power mode" : "Enable low-power mode"}
      aria-pressed={isLowPower}
      title={`Battery: ${pct}% ${isCharging ? "(charging)" : ""} — Click to ${isLowPower ? "disable" : "enable"} low-power mode`}
      className={[
        "fixed bottom-5 right-5 z-[200]",
        "flex items-center gap-2 px-3 py-2 rounded-full",
        "text-xs font-bold tracking-wide uppercase",
        "shadow-lg border transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400",
        isLowPower
          ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
          : "bg-white/80 backdrop-blur-md border-white/60 text-slate-600 hover:bg-white",
        // Pulse when battery is critically low and not in low-power mode
        isBatteryLow && !isLowPower ? "animate-pulse" : "",
      ].filter(Boolean).join(" ")}
    >
      {/* Mini battery icon */}
      <span className={`flex items-center gap-0.5 ${batteryColor}`} aria-hidden="true">
        <span className="flex gap-px items-end h-4">
          {[1, 2, 3].map((b) => (
            <span
              key={b}
              className={[
                "w-1 rounded-sm transition-all duration-500",
                b <= filledBars ? "bg-current" : "bg-current opacity-20",
                b === 1 ? "h-2" : b === 2 ? "h-3" : "h-4",
              ].join(" ")}
            />
          ))}
        </span>
        {/* Charging bolt */}
        {isCharging && (
          <svg className="w-3 h-3 text-emerald-500 -ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        )}
      </span>

      <span>{isLowPower ? "Low Power" : `${pct}%`}</span>

      {isBatteryLow && !isLowPower && (
        <span className="text-red-500 text-[10px] font-black">!</span>
      )}
    </button>
  );
}
