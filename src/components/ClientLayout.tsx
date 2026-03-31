"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { DeviceProvider } from "@/context/DeviceContext";

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
    "/exam-center",
    "/profile",
    "/settings",
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { lang } = useLanguage();

    const isDashboard = DASHBOARD_ROUTES.some((route) =>
        pathname === route || pathname.startsWith(route + "/")
    );

    return (
        <LazyMotion features={domMax}>
            <DeviceProvider>
                {!isDashboard && <Header />}
                <main className={isDashboard ? "flex-grow" : "flex-grow pt-16"}>
                    {children}
                </main>
                {!isDashboard && <Footer />}
            </DeviceProvider>
        </LazyMotion>
    );
}

