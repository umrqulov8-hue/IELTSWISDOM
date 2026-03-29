"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Search, X, Menu } from "lucide-react";
import { PropsWithChildren, useState, useRef, useEffect, memo } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

interface DashboardLayoutProps extends PropsWithChildren {
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
        <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex relative font-sans">
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
                    "fixed inset-y-0 left-0 z-[110] transition-transform duration-300 transform lg:translate-x-0 lg:w-[280px] bg-white border-r border-slate-100 flex flex-col shadow-sm",
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
                    <header className="h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-[#F8F9FB]/80 backdrop-blur-md z-40 border-b border-slate-100/50">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open mobile menu"
                                className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            
                            <div className="flex flex-col">
                            {showGreeting ? (
                                <>
                                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                                        Welcome Back, {displayName}
                                    </h1>
                                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-0.5">
                                        {tx(T.greeting.subtitle, lang)}
                                    </p>
                                </>
                            ) : (
                                <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
                            )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative" ref={searchRef}>
                                <m.div 
                                    animate={{ width: isSearchExpanded ? 240 : 40 }}
                                    className="h-10 bg-white border border-slate-200 rounded-xl flex items-center overflow-hidden shadow-sm"
                                >
                                    <button 
                                        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                                        aria-label="Search lessons"
                                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                    <input 
                                        aria-label="Search"
                                        className="bg-transparent border-none outline-none text-sm font-medium w-full pr-4 placeholder:text-slate-700 text-slate-900"
                                        placeholder="Search..."
                                    />
                                </m.div>
                            </div>
                            
                            <button 
                                aria-label="Notifications"
                                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-600 transition-colors shadow-sm relative"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-orange-500 rounded-full border-2 border-white" />
                            </button>
                        </div>
                    </header>
                )}

                {/* Content Area */}
                <div className={cn(
                    fullHeight ? "flex-1 h-full" : "p-8 flex-1", 
                    maxWidth, 
                    "mx-auto w-full overflow-hidden"
                )}>
                    <AnimatePresence mode="wait">
                        <m.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
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
    );
});
