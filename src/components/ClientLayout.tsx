"use client";

import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { DeviceProvider } from "@/context/DeviceContext";
import { navigationState } from "@/lib/navigationState";
import { useEffect, useState } from "react";
import PageNavHeader from "@/components/parallax-page/PageNavHeader";

/**
 * EXACT REZO-ZERO TRANSITION ARCHITECTURE
 * 
 * 1. Global Navbar: Stay fixed and unmoving during transition.
 * 2. Duo-Move Parallax: 
 *    - Entering page slides fast (100% -> 0).
 *    - Exiting page drifts slowly in same direction (0 -> -15vh).
 * 3. Luxury Easing: Using a "heavy" ease-out curve for premium inertia.
 */

const DURATION = 0.95;
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const; // Quartz Ease Out

const variants = {
    // NEW page coming in
    initial: (dir: string) => ({
        y: dir === "backward" ? "-100vh" : "100vh",
        zIndex: 2,
    }),
    animate: {
        y: 0,
        zIndex: 2,
        transition: {
            y: { duration: DURATION, ease: LUXURY_EASE },
        }
    },
    // OLD page going out (Parallax Drift)
    exit: (dir: string) => ({
        y: dir === "backward" ? "15vh" : "-15vh",
        zIndex: 1,
        transition: {
            y: { duration: DURATION, ease: LUXURY_EASE },
        }
    } as const)
};

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-background min-h-screen">
                {children}
            </div>
        );
    }

    return (
        <LazyMotion features={domMax}>
            <DeviceProvider>
                <div className="relative overflow-hidden min-h-screen bg-background">
                    {/* 
                      * STATIONARY HEADER
                      * Placing it OUTSIDE AnimatePresence ensures it doesn't move 
                      * during page transitions, exactly like Rezo-Zero.
                      */}
                    <PageNavHeader />

                    <AnimatePresence 
                        mode="popLayout" 
                        initial={false} 
                        custom={navigationState.direction}
                    >
                        <m.div
                            key={pathname}
                            custom={navigationState.direction}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full min-h-screen bg-background"
                            style={{
                                willChange: "transform",
                                // Add 80px (header height) padding-top to handle fixed header
                                // OR ensure pages handle their own top padding.
                                // Since we moved the header here, we'll keep the stack clean.
                            }}
                        >
                            <main className="flex-grow">
                                {children}
                            </main>
                        </m.div>
                    </AnimatePresence>
                </div>
            </DeviceProvider>
        </LazyMotion>
    );
}
