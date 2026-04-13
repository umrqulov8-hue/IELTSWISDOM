"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { DeviceProvider } from "@/context/DeviceContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <LazyMotion features={domMax}>
            <DeviceProvider>
                <main className="flex-grow">
                    {children}
                </main>
            </DeviceProvider>
        </LazyMotion>
    );
}
