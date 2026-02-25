"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Dashboard/app routes that should NOT show the landing Header + Footer
const DASHBOARD_ROUTES = [
    "/dashboard",
    "/leaderboard",
    "/ai-check",
    "/vocabulary",
    "/materials",
    "/samples",
    "/articles",
    "/lessons",
    "/results",
    "/mock-exams",
    "/practice",
    "/welcome",
    "/avatar",
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isDashboard = DASHBOARD_ROUTES.some((route) =>
        pathname === route || pathname.startsWith(route + "/")
    );

    return (
        <>
            {!isDashboard && <Header />}
            <main className={isDashboard ? "flex-grow" : "flex-grow pt-16"}>
                {children}
            </main>
            {!isDashboard && <Footer />}
        </>
    );
}
