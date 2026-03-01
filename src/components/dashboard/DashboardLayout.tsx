"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Search } from "lucide-react";
import { PropsWithChildren } from "react";
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
                            <div className="relative hidden md:flex items-center group">
                                {/* Glowing Blur Background Container */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-30 group-hover:opacity-60 group-focus-within:opacity-75 blur-md transition-all duration-500 animate-pulse pointer-events-none" />

                                {/* Futuristic Glass Container */}
                                <div className="relative flex items-center bg-white/40 backdrop-blur-2xl border-[1.5px] border-white/60 hover:border-white/80 focus-within:border-cyan-400/50 rounded-full shadow-[0_8px_30px_rgba(31,38,135,0.1),inset_0_1px_4px_rgba(255,255,255,0.6)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.2),inset_0_1px_4px_rgba(255,255,255,0.8)] group-focus-within:shadow-[0_8px_32px_rgba(34,211,238,0.3),inset_0_1px_4px_rgba(255,255,255,0.9)]">

                                    {/* Neon Gradient Border overlay for inner edge */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <Search className="absolute left-4 w-[18px] h-[18px] text-slate-500 group-focus-within:text-purple-600 group-hover:text-cyan-600 transition-colors duration-500 drop-shadow-sm z-10" />

                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="relative z-10 bg-transparent border-none outline-none py-[10px] pl-[42px] pr-5 text-[15px] font-medium text-slate-800 placeholder:text-slate-500/80 w-64 focus:w-80 transition-all duration-500"
                                    />
                                </div>
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
