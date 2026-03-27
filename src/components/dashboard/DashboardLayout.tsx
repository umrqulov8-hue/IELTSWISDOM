"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Search, X } from "lucide-react";
import { PropsWithChildren, useState, useRef, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useDevice } from "@/context/DeviceContext";

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
    showGreeting?: boolean;
    hideSidebar?: boolean;
    hideHeader?: boolean;
    fullHeight?: boolean;
    maxWidth?: string;
}

// Premium page transition variants — typed as `any` to avoid framer-motion
// version-specific ease tuple type regression
const pageVariants: any = {
    initial: {
        opacity: 0,
        y: 18,
        scale: 0.985,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.99,
        transition: {
            duration: 0.22,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
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
    maxWidth = "max-w-6xl",
}: DashboardLayoutProps) {
    const { user } = useAuthContext();
    const displayName = user?.email?.split("@")[0] || "Student";
    const pathname = usePathname();
    const { shouldUseHeavyEffects, shouldAnimate } = useDevice();
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
            {/* Ambient Animated Background Blobs — only on high-tier devices */}
            {shouldUseHeavyEffects && !hideSidebar && (
                <>
                    <m.div
                        style={{ willChange: "transform" }}
                        animate={{
                            x: [0, 40, -20, 0],
                            y: [0, -30, 40, 0],
                            scale: [1, 1.1, 0.9, 1],
                            rotate: [0, 90, 180, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-400/20 blur-[130px] rounded-full pointer-events-none z-[-1]"
                    />
                    <m.div
                        style={{ willChange: "transform" }}
                        animate={{
                            x: [0, -50, 30, 0],
                            y: [0, 60, -20, 0],
                            scale: [1, 0.9, 1.1, 1],
                            rotate: [0, -120, -240, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="fixed bottom-[-15%] right-[-10%] w-[700px] h-[700px] bg-blue-400/15 blur-[110px] rounded-full pointer-events-none z-[-1]"
                    />
                    <m.div
                        style={{ willChange: "transform" }}
                        animate={{
                            x: [0, 30, -40, 0],
                            y: [0, 50, 40, 0],
                            scale: [0.8, 1.2, 0.9, 0.8],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="fixed top-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-[-1]"
                    />
                </>
            )}

            {!hideSidebar && <Sidebar />}

            {/* Main Content Area */}
            <main
                className={cn(
                    "flex-1 p-4 md:p-8 relative z-10",
                    fullHeight
                        ? "overflow-hidden h-screen flex flex-col"
                        : "overflow-y-auto overflow-x-hidden h-[calc(100vh-4rem)]",
                    !hideSidebar &&
                    "lg:ml-[90px] lg:peer-hover:ml-72 transition-[margin-left] duration-[450ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                )}
                style={{ willChange: !hideSidebar ? 'margin-left' : 'auto' }}
            >
                {/* Dashboard Header */}
                {!hideHeader && (
                    <header className="flex justify-between items-center mb-6 pt-2 flex-shrink-0">
                        <div>
                            {showGreeting ? (
                                <>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                        Welcome back,{" "}
                                        <span className="text-orange-700">{displayName}</span>!
                                    </h1>
                                    <p className="text-slate-600 mt-2 font-medium">
                                        Ready to hit your targets today?
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-slate-600 mt-2 font-medium">
                                            {description}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center" ref={searchRef}>
                                {/* Expandable Search Container */}
                                <m.div
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
                                                <m.input
                                                    autoFocus
                                                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                                    transition={{ duration: 0.2 }}
                                                    type="text"
                                                    placeholder="Search..."
                                                    aria-label="Search dashboard"
                                                    className="bg-transparent border-none outline-none py-[10px] pl-[44px] pr-10 text-[15px] font-medium text-slate-800 placeholder:text-slate-400/80 w-full"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isSearchExpanded && (
                                            <button
                                                aria-label="Close search"
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
                                </m.div>
                            </div>




                            <button aria-label="Notifications" className="p-2.5 rounded-full bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm relative transition-all hover:scale-105 active:scale-95">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white" />
                            </button>
                        </div>
                    </header>
                )}

                {/* Page content with transition */}
                <AnimatePresence mode="wait">
                    <m.div
                        key={pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={cn(
                            fullHeight
                                ? "flex-1 overflow-hidden h-full"
                                : `${maxWidth} mx-auto space-y-10 pb-10`
                        )}
                    >
                        {children}
                    </m.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
