"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { DeviceProvider } from "@/context/DeviceContext";

/**
 * Minimal ClientLayout — zero hydration errors.
 *
 * PageNavHeader is imported dynamically (client-only) so
 * the server never renders it → no SSR/client mismatch.
 */

const landingPaths = ["/", "/methodology", "/curriculum", "/success-stories", "/pricing"];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = landingPaths.includes(pathname);

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
        <DeviceProvider>
            <NavbarClient />
            {children}
        </DeviceProvider>
    );
}

/**
 * NavbarClient — renders navbar only on client side.
 * Uses useState/useEffect to avoid SSR rendering the navbar
 * (which has useScroll, usePathname, etc. that differ server↔client).
 */
function NavbarClient() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    if (!show) return null;

    // Lazy import to keep server bundle clean
    const PageNavHeader = require("@/components/parallax-page/PageNavHeader").default;
    return <PageNavHeader />;
}
