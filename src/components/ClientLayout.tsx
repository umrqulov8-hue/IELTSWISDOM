"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";

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
    const { lang } = useLanguage();

    const isDashboard = DASHBOARD_ROUTES.some((route) =>
        pathname === route || pathname.startsWith(route + "/")
    );

    return (
        <>
            {!isDashboard && <Header />}
            <AnimatePresence mode="wait">
                <motion.main
                    key={lang}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={isDashboard ? "flex-grow" : "flex-grow pt-16"}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            {!isDashboard && <Footer />}
        </>
    );
}
