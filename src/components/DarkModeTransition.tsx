"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * DarkModeTransition
 *
 * Pastdan tepaga qarab oval/ellipse ko'tariladi:
 *  - Dark mode → qora oval pastdan tepaga
 *  - Light mode → oq oval pastdan tepaga
 *
 * Oval ekranni to'liq yopgach, yangi tema ostidan ochilib qolgan bo'ladi.
 */
export function DarkModeTransition() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const prevThemeRef = useRef<string | undefined>(undefined);
  const isAnimatingRef = useRef(false);
  const justTriggeredRef = useRef(false);

  const runAnimation = useCallback((toDark: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

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

    // Yangi temaning rangi — bu oval shu rang bo'ladi
    const fillColor = toDark ? "#0b1120" : "#f8f9fa";

    // Oval parametrlari
    const rx = W * 0.65;   // gorizontal radius — ekrandan kengroq
    const ry = H * 0.55;   // vertikal radius

    // Boshlang'ich pozitsiya: oval butunlay ekran ostida
    const startY = H + ry;
    // Tugash pozitsiya: oval butunlay ekran tepasida
    const endY = -ry;

    const DURATION = 750; // ms — tez va ruhiyatli
    const startTime = performance.now();

    // Ease — tezdan boshlanib, tepada sekinlashadi
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const drawFrame = (ts: number) => {
      const rawT = Math.min((ts - startTime) / DURATION, 1);
      const t = easeInOutQuad(rawT);

      ctx.clearRect(0, 0, W, H);

      // Oval markazi — pastdan tepaga ko'tariladi
      const cy = startY + (endY - startY) * t;
      const cx = W / 2;

      // Oval chizish
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Oval ustida yopiq to'rtburchak — oval yuqoriga o'tgach ekranni to'liq yopish
      // (oval markazidan yuqorida qolgan qismni ham to'ldiradi)
      if (cy < H) {
        ctx.fillRect(0, 0, W, cy);
      }

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(drawFrame);
      } else {
        // To'liq yopildi, endi canvas yo'qolsin (yangi tema ochilgan)
        // Qisqa pause, keyin canvas o'chadi
        setTimeout(() => {
          canvas.style.display = "none";
          canvas.style.pointerEvents = "none";
          isAnimatingRef.current = false;
        }, 80);
      }
    };

    animFrameRef.current = requestAnimationFrame(drawFrame);
  }, []);

  // Theme o'zgarishini kuzatish
  useEffect(() => {
    if (prevThemeRef.current === undefined) {
      prevThemeRef.current = resolvedTheme;
      return;
    }
    if (prevThemeRef.current !== resolvedTheme) {
      prevThemeRef.current = resolvedTheme;
      if (justTriggeredRef.current) {
        justTriggeredRef.current = false;
        return;
      }
      runAnimation(resolvedTheme === "dark");
    }
  }, [resolvedTheme, runAnimation]);

  // Global trigger (settings page uchun)
  useEffect(() => {
    (window as any).__triggerInkTransition = runAnimation;
    return () => {
      delete (window as any).__triggerInkTransition;
    };
  }, [runAnimation]);

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
