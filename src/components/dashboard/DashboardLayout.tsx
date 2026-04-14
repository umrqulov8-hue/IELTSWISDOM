"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { X, Menu } from "lucide-react";
import { useState, useRef, useEffect, memo } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { m, AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { ActivityCalendar } from "@/components/dashboard/ActivityCalendar";

interface DashboardLayoutProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    showGreeting?: boolean;
    hideSidebar?: boolean;
    maxWidth?: string;
    fullHeight?: boolean;
    hideHeader?: boolean;
}

export const DashboardLayout = memo(({
    children,
    title = "IELTS Dashboard",
    description,
    showGreeting = true,
    hideSidebar = false,
    maxWidth = "max-w-7xl",
    fullHeight = false,
    hideHeader = false,
}: DashboardLayoutProps) => {
    const { user } = useAuthContext();
    const { lang } = useLanguage();
    const displayName = user?.email?.split("@")[0] || "Student";
    const pathname = usePathname();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Track initial load for CLS suppression
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        setIsInitialLoad(false);
    }, []);

    // Close mobile menu on path change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchExpanded(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <LazyMotion features={domMax}>
            <div className="min-h-screen bg-[#F8F9FB] dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex relative font-sans transition-colors duration-200">
                {/* Sidebar Overlay for Mobile */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar Wrapper */}
                {!hideSidebar && (
                    <aside className={cn(
                        "fixed inset-y-0 left-0 z-[110] transition-transform duration-300 transform lg:translate-x-0 lg:w-[280px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col shadow-sm transition-colors duration-200",
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}>
                        <Sidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
                    </aside>
                )}

                <main className={cn(
                    "flex-1 flex flex-col min-h-screen relative",
                    !hideSidebar && "lg:ml-[280px]"
                )}>
                    {/* Clean Header */}
                    {!hideHeader && (
                        <header className="h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-[#F8F9FB]/80 dark:bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-100/50 dark:border-slate-800/50 transition-colors duration-200">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    aria-label="Open mobile menu"
                                    className="lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-sm transition-colors"
                                >
                                    <Menu className="w-5 h-5 antialias" />
                                </button>
                                
                                <div className="flex flex-col min-w-[120px] min-h-[48px] justify-center">
                                {showGreeting ? (
                                    <>
                                        <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
                                            Welcome Back, {displayName}
                                        </h1>
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest mt-0.5 transition-colors">
                                            {tx(T.greeting.subtitle, lang)}
                                        </p>
                                    </>
                                ) : (
                                    <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{title}</h1>
                                )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <ActivityCalendar />
                            </div>
                        </header>
                    )}

                    {/* Content Area */}
                    <div className={cn(
                        fullHeight ? "flex-1 h-full" : "p-8 flex-1", 
                        maxWidth, 
                        "mx-auto w-full overflow-hidden contain-layout"
                    )}>
                        <AnimatePresence mode="wait">
                            <m.div
                                key={pathname}
                                initial={isInitialLoad ? false : { opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className={cn(fullHeight && "h-full")}
                            >
                                {children}
                            </m.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </LazyMotion>
    );
});
