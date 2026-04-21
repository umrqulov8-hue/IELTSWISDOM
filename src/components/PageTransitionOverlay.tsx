"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * REZO-ZERO STYLE PAGE TRANSITION
 * 
 * A solid black curtain panel animates in two phases:
 * 
 *   Phase 1 — COVER (triggered by TransitionLink click):
 *     Panel slides UP from below → covers the entire screen
 *     translateY(100%) → translateY(0%)   over ~450ms
 * 
 *   Phase 2 — REVEAL (triggered by route change detected via pathname):
 *     Panel continues sliding UP → exits through the top
 *     translateY(0%) → translateY(-100%)  over ~550ms
 * 
 * This creates the seamless "curtain wipe" where the panel always
 * moves in ONE direction: bottom → center → top.
 * No reversals, no drops, no jumps.
 */
export default function PageTransitionOverlay() {
    const pathname = usePathname();
    const panelRef = useRef<HTMLDivElement>(null);
    const firstMount = useRef(true);
    const phaseRef = useRef<"idle" | "covering" | "revealing">("idle");

    // --- Phase 1: Cover screen when link is clicked ---
    useEffect(() => {
        const handleStart = () => {
            const panel = panelRef.current;
            if (!panel || phaseRef.current !== "idle") return;

            phaseRef.current = "covering";

            // Make panel visible, park it just below viewport
            panel.style.visibility = "visible";
            panel.style.transition = "none";
            panel.style.transform = "translateY(100%)";

            // Force reflow so the starting position is registered
            panel.getBoundingClientRect();

            // Slide UP to cover the screen
            panel.style.transition = "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)";
            panel.style.transform = "translateY(0%)";
        };

        window.addEventListener("page-transition-start", handleStart);
        return () => window.removeEventListener("page-transition-start", handleStart);
    }, []);

    // --- Phase 2: Reveal new page when pathname changes ---
    useEffect(() => {
        // Skip the very first mount (page load — no transition needed)
        if (firstMount.current) {
            firstMount.current = false;
            return;
        }

        const panel = panelRef.current;
        if (!panel) return;

        // Short delay to ensure new page DOM is painted before revealing
        const reveal = setTimeout(() => {
            phaseRef.current = "revealing";

            // Continue sliding UP to exit through the top
            panel.style.transition = "transform 0.58s cubic-bezier(0.76, 0, 0.24, 1)";
            panel.style.transform = "translateY(-100%)";

            // After reveal completes, reset to idle state
            const reset = setTimeout(() => {
                if (panel) {
                    panel.style.transition = "none";
                    panel.style.visibility = "hidden";
                    panel.style.transform = "translateY(100%)"; // park below again
                }
                phaseRef.current = "idle";
            }, 620);

            return () => clearTimeout(reset);
        }, 60);

        return () => clearTimeout(reveal);
    }, [pathname]);

    return (
        <div
            id="page-transition-panel"
            ref={panelRef}
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                backgroundColor: "#000000", // Solid black — Rezo-Zero style
                transform: "translateY(100%)",   // Parked below viewport
                visibility: "hidden",
                willChange: "transform",
                pointerEvents: "none",
            }}
        />
    );
}
