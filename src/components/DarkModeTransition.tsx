"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * DarkModeTransition
 * 
 * CapCut-style inky smoke effect when switching between light and dark mode.
 * Uses an HTML Canvas with blob expansion + turbulence simulation to
 * create a fluid, organic ink-spread animation.
 */
export function DarkModeTransition() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const prevThemeRef = useRef<string | undefined>(undefined);
  const isAnimatingRef = useRef(false);

  const runInkAnimation = useCallback((toDark: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas || isAnimatingRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isAnimatingRef.current = true;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.display = "block";
    canvas.style.pointerEvents = "all";

    // Ink color — dark mode = black ink, light mode = white/cream ink
    const inkColor = toDark ? "#080b14" : "#f8fafc";

    // Origin — random-ish center-biased point (like a brush splat)
    const ox = W * (0.3 + Math.random() * 0.4);
    const oy = H * (0.2 + Math.random() * 0.35);

    const maxRadius = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy)) * 1.1;

    let startTime: number | null = null;
    const DURATION = 900; // ms

    // Blob control points
    const POINTS = 14;
    const offsets = Array.from({ length: POINTS }, () => (Math.random() - 0.5) * 0.28);
    const noiseSeeds = Array.from({ length: POINTS }, () => Math.random() * 100);

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const drawFrame = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const rawT = Math.min(elapsed / DURATION, 1);
      const t = easeInOutCubic(rawT);

      ctx.clearRect(0, 0, W, H);

      const r = maxRadius * t;

      // Turbulence noise at this frame
      const turbScale = 1 + t * 0.4; // slight scale expansion

      ctx.save();
      ctx.beginPath();

      for (let i = 0; i <= POINTS; i++) {
        const idx = i % POINTS;
        const angle = (idx / POINTS) * Math.PI * 2;

        // Organic blob — noise-driven radius variation
        const noiseVal = Math.sin(noiseSeeds[idx] + elapsed * 0.006 + idx * 1.3) * 0.18
          + Math.cos(noiseSeeds[idx] * 0.7 + elapsed * 0.004 + idx * 0.9) * 0.1;

        const blobR = r * turbScale * (1 + offsets[idx] + noiseVal * t);

        const x = ox + Math.cos(angle) * blobR;
        const y = oy + Math.sin(angle) * blobR;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Prev point
          const prevIdx = (i - 1) % POINTS;
          const prevAngle = (prevIdx / POINTS) * Math.PI * 2;
          const prevNoise = Math.sin(noiseSeeds[prevIdx] + elapsed * 0.006 + prevIdx * 1.3) * 0.18
            + Math.cos(noiseSeeds[prevIdx] * 0.7 + elapsed * 0.004 + prevIdx * 0.9) * 0.1;
          const prevR = r * turbScale * (1 + offsets[prevIdx] + prevNoise * t);
          const px = ox + Math.cos(prevAngle) * prevR;
          const py = oy + Math.sin(prevAngle) * prevR;

          const cpx = (px + x) / 2 + (Math.random() - 0.5) * r * 0.06;
          const cpy = (py + y) / 2 + (Math.random() - 0.5) * r * 0.06;
          ctx.quadraticCurveTo(cpx, cpy, x, y);
        }
      }

      ctx.closePath();

      // Radial gradient for smoke-like diffusion at edges
      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * turbScale * 1.2);
      grad.addColorStop(0, inkColor);
      grad.addColorStop(0.72, inkColor);
      grad.addColorStop(0.88, inkColor + "cc"); // semi-transparent fade
      grad.addColorStop(1, inkColor + "00");    // fully transparent edge

      ctx.fillStyle = grad;
      ctx.fill();

      // Ink tendrils — smoky wisps radiating outward
      if (t < 0.92) {
        for (let k = 0; k < 7; k++) {
          const tendrilAngle = (k / 7) * Math.PI * 2 + elapsed * 0.0015 + k * 0.8;
          const tendrilLen = r * (0.25 + Math.sin(noiseSeeds[k % POINTS] + t * 3) * 0.15) * t;
          const tx1 = ox + Math.cos(tendrilAngle) * r * 0.6;
          const ty1 = oy + Math.sin(tendrilAngle) * r * 0.6;
          const tx2 = ox + Math.cos(tendrilAngle) * (r + tendrilLen);
          const ty2 = oy + Math.sin(tendrilAngle) * (r + tendrilLen);

          const tendrilGrad = ctx.createLinearGradient(tx1, ty1, tx2, ty2);
          tendrilGrad.addColorStop(0, inkColor + "88");
          tendrilGrad.addColorStop(1, inkColor + "00");

          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.quadraticCurveTo(
            tx1 + (Math.random() - 0.5) * 40,
            ty1 + (Math.random() - 0.5) * 40,
            tx2, ty2
          );
          ctx.lineWidth = (2 + Math.random() * 3) * (1 - t * 0.7);
          ctx.strokeStyle = tendrilGrad;
          ctx.stroke();
        }
      }

      ctx.restore();

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(drawFrame);
      } else {
        // Animation complete — canvas dissolves
        ctx.clearRect(0, 0, W, H);
        canvas.style.display = "none";
        canvas.style.pointerEvents = "none";
        isAnimatingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(drawFrame);
  }, []);

  useEffect(() => {
    if (prevThemeRef.current === undefined) {
      prevThemeRef.current = resolvedTheme;
      return;
    }
    if (prevThemeRef.current !== resolvedTheme) {
      const toDark = resolvedTheme === "dark";
      prevThemeRef.current = resolvedTheme;
      runInkAnimation(toDark);
    }
  }, [resolvedTheme, runInkAnimation]);

  // Expose a global trigger so settings page can call it before setTheme
  useEffect(() => {
    (window as any).__triggerInkTransition = runInkAnimation;
    return () => {
      delete (window as any).__triggerInkTransition;
    };
  }, [runInkAnimation]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "none",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
