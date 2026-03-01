"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Search, X } from "lucide-react";
import { PropsWithChildren, useState, useRef, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
    showGreeting?: boolean;
    hideSidebar?: boolean;
    hideHeader?: boolean;
    fullHeight?: boolean;
}

// Premium page transition variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 18,
        scale: 0.985,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1] as const, // custom easeOutExpo
        },
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.99,
        filter: "blur(3px)",
        transition: {
            duration: 0.22,
            ease: [0.4, 0, 1, 1] as const,
        },
    },
};

export function DashboardLayout({
    children,
    title,
    description,
    showGreeting = false,
    hideSidebar = false,
    hideHeader = false,
    fullHeight = false,
}: DashboardLayoutProps) {
    const { user } = useAuthContext();
    const displayName = user?.email?.split("@")[0] || "Student";
    const pathname = usePathname();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close search on click outside
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
        <div className="min-h-[calc(100vh-4rem)] bg-[#F2F4F8] text-slate-900 flex overflow-hidden relative">
            {/* Ambient Background Blobs */}
            {!hideSidebar && (
                <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none" />
            )}
            {!hideSidebar && (
                <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none" />
            )}

            {!hideSidebar && <Sidebar />}

            {/* Main Content Area */}
            <main
                className={cn(
                    "flex-1 p-4 md:p-8 relative z-10",
                    fullHeight
                        ? "overflow-hidden h-screen flex flex-col"
                        : "overflow-y-auto h-[calc(100vh-4rem)]",
                    !hideSidebar &&
                    "lg:ml-[90px] lg:peer-hover:ml-72 transition-[margin] duration-500 ease-in-out"
                )}
            >
                {/* Dashboard Header */}
                {!hideHeader && (
                    <header className="flex justify-between items-center mb-6 pt-2 flex-shrink-0">
                        <div>
                            {showGreeting ? (
                                <>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                        Welcome back,{" "}
                                        <span className="text-[#FF8C00]">{displayName}</span>!
                                    </h1>
                                    <p className="text-slate-500 mt-2 font-medium">
                                        Ready to hit your targets today?
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-slate-500 mt-2 font-medium">
                                            {description}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center" ref={searchRef}>
                                {/* Expandable Search Container */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width: isSearchExpanded ? "240px" : "46px",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 24,
                                        mass: 0.8
                                    }}
                                    className="relative flex items-center group overflow-hidden"
                                >
                                    {/* Soft White/Silver Ambient Glow */}
                                    <div className="absolute -inset-[3px] bg-gradient-to-r from-white/40 via-white/20 to-white/40 rounded-full opacity-20 group-hover:opacity-40 blur-xl transition-all duration-700 pointer-events-none" />

                                    {/* Liquid Glass Container */}
                                    <div
                                        onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
                                        className={cn(
                                            "relative flex items-center bg-white/30 backdrop-blur-[24px] border-[1.5px] border-white/70 hover:border-white/90 rounded-full shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_8px_rgba(255,255,255,0.4)] transition-all duration-300 w-full h-[46px]",
                                            isSearchExpanded ? "cursor-text" : "cursor-pointer"
                                        )}
                                    >
                                        <div className="absolute left-[14px] flex items-center justify-center">
                                            <Search className="w-[18px] h-[18px] text-slate-500 hover:text-slate-800 transition-colors duration-300" />
                                        </div>

                                        <AnimatePresence>
                                            {isSearchExpanded && (
                                                <motion.input
                                                    autoFocus
                                                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                                    transition={{ duration: 0.2 }}
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="bg-transparent border-none outline-none py-[10px] pl-[44px] pr-10 text-[15px] font-medium text-slate-800 placeholder:text-slate-400/80 w-full"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isSearchExpanded && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsSearchExpanded(false);
                                                }}
                                                className="absolute right-3 p-1 rounded-full hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </div>




                            <button className="p-2.5 rounded-full bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm relative transition-all hover:scale-105 active:scale-95">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white" />
                            </button>
                        </div>
                    </header>
                )}

                {/* Page content with transition */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={cn(
                            fullHeight
                                ? "flex-1 overflow-hidden h-full"
                                : "max-w-6xl mx-auto space-y-10 pb-10"
                        )}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
