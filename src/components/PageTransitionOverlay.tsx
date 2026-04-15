"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";

/**
 * Rezo-Zero style "from-top" page transition.
 *
 * A white panel sits ABOVE the viewport (y: -100%, invisible).
 *
 * On navigation click (triggered by TransitionLink):
 *   Phase 1 – panel slides DOWN from top: y -100% → 0%  (covers old page)
 *   Phase 2 – route changes, panel slides DOWN further: y 0% → 100%
 *             (new page revealed from TOP going downward)
 *
 * This creates the "tepadan pastga" (top-to-bottom reveal) parallax feel.
 */
export default function PageTransitionOverlay() {
    const pathname = usePathname();
    const prevPath = useRef<string | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isRevealing = useRef(false);

    useEffect(() => {
        // On first mount — record path, no animation
        if (prevPath.current === null) {
            prevPath.current = pathname;
            return;
        }

        // Path changed → Phase 2: slide panel DOWN to reveal new page from top
        if (prevPath.current !== pathname) {
            prevPath.current = pathname;
            const panel = panelRef.current;
            if (!panel || isRevealing.current) return;

            isRevealing.current = true;

            // Short pause so new page DOM is ready before we reveal
            const timer = setTimeout(() => {
                animate(
                    panel,
                    { y: "100%" },
                    { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
                ).then(() => {
                    if (panel) {
                        // Reset: park panel above viewport, hidden, ready for next navigation
                        panel.style.transform = "translateY(-100%)";
                        panel.style.visibility = "hidden";
                    }
                    isRevealing.current = false;
                });
            }, 60);

            return () => clearTimeout(timer);
        }
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
                /* White panel — blends with the white page backgrounds */
                backgroundColor: "#ffffff",
                transform: "translateY(-100%)",  /* Parked above viewport */
                visibility: "hidden",
                willChange: "transform",
                pointerEvents: "none",
            }}
        />
    );
}
