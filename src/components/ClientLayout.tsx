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
    const [isTransitioning, setIsTransitioning] = useState(false);

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

    // List of paths that constitute the "Landing Site" and should have cinematic transitions
    const landingPaths = ["/", "/methodology", "/curriculum", "/success-stories", "/pricing"];
    const isLandingPage = landingPaths.includes(pathname);

    // If it's an app page (Dashboard, Lessons, etc.), render plainly without the cinematic wrapper
    if (!isLandingPage) {
        return (
            <DeviceProvider>
                <main className="min-h-screen bg-background">
                    {children}
                </main>
            </DeviceProvider>
        );
    }

    return (
        <LazyMotion features={domMax}>
            <DeviceProvider>
                <div 
                    className={`relative min-h-screen bg-background ${isTransitioning ? "overflow-hidden h-screen" : ""}`}
                >
                    {/* 
                      * STATIONARY HEADER
                      * Only for Landing pages.
                      */}
                    <PageNavHeader />

                    <AnimatePresence 
                        mode="popLayout" 
                        initial={false} 
                        custom={navigationState.direction}
                        onExitComplete={() => setIsTransitioning(false)}
                    >
                        <m.div
                            key={pathname}
                            custom={navigationState.direction}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onAnimationStart={() => setIsTransitioning(true)}
                            onAnimationComplete={() => setIsTransitioning(false)}
                            className="w-full min-h-screen bg-background"
                            style={{ willChange: "transform" }}
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
