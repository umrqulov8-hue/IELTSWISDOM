# Adaptive Rendering Hooks — Developer Guide

> These hooks and utilities provide a complete hardware-adaptive rendering pipeline for IELTS Wisdom.

---

## Quick Start

```tsx
import { useDevice } from "@/context/DeviceContext";

function MyComponent() {
  const { shouldAnimate, shouldUseHeavyEffects, tier, isLowPower } = useDevice();

  return (
    <div>
      {shouldAnimate && <AnimatedBackground />}
      {shouldUseHeavyEffects && <ParticleSystem />}
      <p>Device Tier: {tier}</p>
    </div>
  );
}
```

---

## Context Values (`useDevice()`)

| Value | Type | Description |
|---|---|---|
| `tier` | `'low' \| 'mid' \| 'high'` | Effective device tier (may downgrade if dropping) |
| `fps` | `60 \| 90 \| 120 \| 144` | Detected display refresh rate |
| `currentFps` | `number` | Rolling real-time measured FPS |
| `isDropping` | `boolean` | True when FPS drops >20% below expected |
| `shouldAnimate` | `boolean` | Safe to run Framer Motion / CSS animations |
| `shouldUseHeavyEffects` | `boolean` | Safe to render blur, particles, backdrop |
| `batteryLevel` | `0–1` | Current battery level |
| `isBatteryLow` | `boolean` | `batteryLevel < 0.2 && !isCharging` |
| `gpuTier` | `'software' \| 'integrated' \| 'discrete'` | WebGPU/WebGL detected GPU class |
| `networkTier` | `'slow' \| 'fast'` | Based on `navigator.connection.effectiveType` |
| `isLowPower` | `boolean` | User or battery triggered low-power mode |
| `toggleLowPower` | `() => void` | Flip low-power mode manually |

---

## Adding a New Animated Component

1. Import `useDevice`:
   ```tsx
   const { shouldAnimate, shouldUseHeavyEffects } = useDevice();
   ```
2. Guard heavy effects:
   ```tsx
   {shouldUseHeavyEffects && <BackdropBlurPanel />}
   {shouldAnimate ? <motion.div ...> : <div ...>}
   ```
3. Use adaptive transition presets:
   ```tsx
   import { adaptiveTransition } from "@/lib/adaptiveMotion";
   transition={adaptiveTransition[tier]}
   ```

---

## Adaptive Utilities

### Images
```tsx
import { getAdaptiveImageQuality } from "@/lib/adaptiveImage";

<Image
  src={src}
  quality={getAdaptiveImageQuality(tier, networkTier, isBatteryLow)}
/>
```

### Videos
```tsx
import { getAdaptiveVideoProps } from "@/lib/adaptiveVideo";

const videoProps = getAdaptiveVideoProps(baseSrc, tier, networkTier, isBatteryLow);
{videoProps.shouldRender && <video {...videoProps} />}
```

---

## Testing with DevTools

| Test | How |
|---|---|
| Simulate low-tier CPU | DevTools → Performance → 4× CPU throttle |
| Simulate low network | DevTools → Network → 3G throttle |
| Simulate reduced motion | DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" |
| Simulate battery low | Console: `window.__debugBattery = true` (if debug mode implemented) |
| Simulate 120Hz | Requires physical device; verify via `data-fps` attribute on `<html>` |

### Verify via HTML attributes
Open DevTools Elements panel and inspect `<html>`:
```html
<html
  data-device-tier="high"
  data-fps="60"
  data-reduced-motion="false"
  data-low-power="false"
  data-gpu="integrated"
  data-dropping="false"
>
```

---

## CSS Selector Hierarchy

```
prefers-reduced-motion: reduce   → highest priority, kills everything
[data-low-power="true"]          → kills everything + collapses shadows/blur
[data-gpu="software"]            → kills filter/blur/backdrop-blur
[data-device-tier="low"]         → kills decorative animations
[data-device-tier="mid"]         → reduces backdrop-blur quality
[data-fps="120"] / [data-fps="144"] → speeds up wave animations
[data-dropping="true"]           → pauses looping animations immediately
@media (hover: none)             → pauses hover-only CSS animations
```

---

## Adding Telemetry for New Events

```ts
import { trackFrameDrop } from "@/lib/performanceTelemetry";

// Rate-limited to once per 5s automatically
trackFrameDrop({ fromFps: 60, toFps: 22, tier: "high" });
```

> All telemetry is anonymous. No user IDs, cookies, or PII are transmitted.
