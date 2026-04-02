"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * DarkModeTransition — Ink Smoke Reveal
 *
 * HOW IT WORKS:
 *  1. Canvas fills entirely with the OLD theme's background color
 *     (so it looks identical to the current page — no foreign blob)
 *  2. setTheme fires → new theme is rendered underneath the canvas
 *  3. Canvas "burns away" in organic smoke/ink holes via destination-out
 *     compositing + SVG feTurbulence displacement filter on the canvas itself
 *  4. The page appears to turn INTO smoke and dissolve, revealing the new theme
 *
 * The SVG filter wraps the canvas so ALL edges of the dissolving areas
 * are distorted by fractal noise → looks like real ink smoke.
 */
export function DarkModeTransition() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const turbAnimRef = useRef<number | null>(null);
  const prevThemeRef = useRef<string | undefined>(undefined);
  const isAnimatingRef = useRef(false);
  const justTriggeredRef = useRef(false); // prevent double-fire
  const feTurbRef = useRef<SVGFETurbulenceElement | null>(null);
  const feDispRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const runInkAnimation = useCallback((toDark: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cancel any existing animation cleanly
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (turbAnimRef.current) cancelAnimationFrame(turbAnimRef.current);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isAnimatingRef.current = true;
    justTriggeredRef.current = true;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.display = "block";
    canvas.style.pointerEvents = "all";

    // ── OLD theme color (what we're leaving) ──────────────────────────────
    // Read the ACTUAL computed background color of the page right now,
    // so it perfectly matches whatever is on screen.
    const computedBg = getComputedStyle(document.documentElement)
      .getPropertyValue("--tw-bg-opacity") // fallback
      .trim();
    // Reliable: read body background
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    // Convert rgb() to hex or use known theme values as fallback
    const oldColor = cssColorToRgba(bodyBg) || (toDark ? "#f8f9fa" : "#0f172a");

    // ── SVG turbulence animation ──────────────────────────────────────────
    const DURATION = 1300; // ms
    const startTime = performance.now();

    const animateTurb = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / DURATION, 1);

      if (feTurbRef.current) {
        // Evolve seed for animated noise field
        const seed = Math.floor(elapsed * 0.08) % 200;
        feTurbRef.current.setAttribute("seed", String(seed));
        // Increase frequency for more chaotic smoke as it progresses
        const freq = 0.015 + t * 0.022;
        feTurbRef.current.setAttribute("baseFrequency", `${freq} ${freq * 0.65}`);
      }
      if (feDispRef.current) {
        // Ramp up displacement — edges get more distorted over time
        const scale = 25 + t * 80;
        feDispRef.current.setAttribute("scale", String(scale));
      }
      if (t < 1.1) {
        turbAnimRef.current = requestAnimationFrame(animateTurb);
      }
    };
    turbAnimRef.current = requestAnimationFrame(animateTurb);

    // ── Smoke cluster layout ──────────────────────────────────────────────
    // Spread many overlapping smoke holes across the ENTIRE viewport.
    // This ensures the canvas fully erases by t=1.
    const CLUSTERS = 35;
    const clusters = Array.from({ length: CLUSTERS }, (_, i) => {
      // Use a quasi-random grid for even coverage + randomness
      const col = i % 6;
      const row = Math.floor(i / 6);
      const gx = (col / 5) * W;
      const gy = (row / Math.ceil(CLUSTERS / 6)) * H;
      return {
        x: gx + (Math.random() - 0.5) * (W / 4),
        y: gy + (Math.random() - 0.5) * (H / 4),
        size: Math.min(W, H) * (0.14 + Math.random() * 0.20),
        delay: Math.random() * 0.40,
        sx: 0.75 + Math.random() * 0.5,   // ellipse x-scale
        sy: 0.75 + Math.random() * 0.5,   // ellipse y-scale
        rot: Math.random() * Math.PI,     // initial rotation
        rotSpeed: (Math.random() - 0.5) * 1.5,
      };
    });

    // Extra wisp points — thin rising tendrils
    const WISPS = 14;
    const wisps = Array.from({ length: WISPS }, (_, i) => ({
      x: (W / (WISPS + 1)) * (i + 1) + (Math.random() - 0.5) * W * 0.08,
      size: Math.min(W, H) * (0.07 + Math.random() * 0.09),
      delay: Math.random() * 0.55,
      phase: (i / WISPS) * Math.PI * 2,
    }));

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(t, 1), 3);
    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    // ── Main draw loop ────────────────────────────────────────────────────
    const drawFrame = (ts: number) => {
      const elapsed = ts - startTime;
      const rawT = elapsed / DURATION;

      if (rawT > 1.25) {
        ctx.clearRect(0, 0, W, H);
        canvas.style.display = "none";
        canvas.style.pointerEvents = "none";
        isAnimatingRef.current = false;
        return;
      }

      const t = Math.min(rawT, 1);

      // Step 1: re-fill entire canvas with old theme color
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = oldColor;
      ctx.fillRect(0, 0, W, H);

      // Step 2: burn smoke holes — destination-out removes pixels
      ctx.globalCompositeOperation = "destination-out";

      // — Main smoke clusters (big holes spreading outward)
      clusters.forEach((c) => {
        const ct = Math.max(0, (t - c.delay) / (1 - c.delay + 0.001));
        const et = easeOutCubic(ct);
        if (et <= 0.001) return;

        const r = c.size * et * 1.9;
        const angle = c.rot + t * c.rotSpeed;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(angle);
        ctx.scale(c.sx, c.sy);

        // Soft radial erase — center fully erased, edges diffuse
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        g.addColorStop(0,    "rgba(0,0,0,1)");
        g.addColorStop(0.50, "rgba(0,0,0,1)");
        g.addColorStop(0.72, "rgba(0,0,0,0.85)");
        g.addColorStop(0.88, "rgba(0,0,0,0.45)");
        g.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // — Wisps: thin rising smoke columns that go upward
      wisps.forEach((w) => {
        const ct = Math.max(0, (t - w.delay) / (1 - w.delay + 0.001));
        const et = easeOutCubic(ct);
        if (et <= 0.001) return;

        // Drift horizontally with a sine wave (smoke sway)
        const dx = Math.sin(t * 3.5 + w.phase) * W * 0.04;
        // Rise upward
        const wx = w.x + dx;
        const wy = H * (0.85 - et * 0.75);
        const wr = w.size * et;

        const wg = ctx.createRadialGradient(wx, wy, 0, wx, wy, wr);
        wg.addColorStop(0,    "rgba(0,0,0,0.80)");
        wg.addColorStop(0.55, "rgba(0,0,0,0.40)");
        wg.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.fillStyle = wg;
        ctx.beginPath();
        ctx.arc(wx, wy, wr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Step 3: global canvas fade-out in final 20% (clean finish)
      if (t > 0.80) {
        const fadeT = easeInOutQuart((t - 0.80) / 0.20);
        // Draw remaining color but faded
        ctx.globalCompositeOperation = "destination-in";
        ctx.globalAlpha = 1 - fadeT;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";
      animFrameRef.current = requestAnimationFrame(drawFrame);
    };

    animFrameRef.current = requestAnimationFrame(drawFrame);
  }, []);

  // ── Theme change listener ─────────────────────────────────────────────
  useEffect(() => {
    if (prevThemeRef.current === undefined) {
      prevThemeRef.current = resolvedTheme;
      return;
    }
    if (prevThemeRef.current !== resolvedTheme) {
      prevThemeRef.current = resolvedTheme;
      // If already triggered by settings page click, skip (avoids double-fire)
      if (justTriggeredRef.current) {
        justTriggeredRef.current = false;
        return;
      }
      runInkAnimation(resolvedTheme === "dark");
    }
  }, [resolvedTheme, runInkAnimation]);

  // ── Global trigger API ────────────────────────────────────────────────
  useEffect(() => {
    (window as any).__triggerInkTransition = runInkAnimation;
    return () => {
      delete (window as any).__triggerInkTransition;
    };
  }, [runInkAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (turbAnimRef.current) cancelAnimationFrame(turbAnimRef.current);
    };
  }, []);

  return (
    <>
      {/*
        SVG filter applied to the canvas via CSS filter: url(#ink-smoke)
        feTurbulence generates fractal noise → feDisplacementMap distorts
        the canvas boundary/edges so they look like real ink smoke wisps.
      */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="ink-smoke"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={feTurbRef}
              type="fractalNoise"
              baseFrequency="0.015 0.010"
              numOctaves="5"
              seed="1"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              ref={feDispRef}
              in="SourceGraphic"
              in2="noise"
              scale="25"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Slight blur on top for extra smoke softness */}
            <feGaussianBlur in="displaced" stdDeviation="1.5" />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "none",
          pointerEvents: "none",
          // THIS is the magic — SVG turbulence distorts all canvas edges
          filter: "url(#ink-smoke)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

// ── Helper: convert CSS rgb/rgba string to usable color ──────────────────
function cssColorToRgba(css: string): string | null {
  if (!css || css === "transparent") return null;
  const match = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1]).toString(16).padStart(2, "0");
  const g = parseInt(match[2]).toString(16).padStart(2, "0");
  const b = parseInt(match[3]).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}
