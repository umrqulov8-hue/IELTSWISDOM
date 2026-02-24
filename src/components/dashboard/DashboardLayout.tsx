"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Search } from "lucide-react";
import { PropsWithChildren } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
    showGreeting?: boolean;
    hideSidebar?: boolean;
    hideHeader?: boolean;
    fullHeight?: boolean;
}

export function DashboardLayout({ children, title, description, showGreeting = false, hideSidebar = false, hideHeader = false, fullHeight = false }: DashboardLayoutProps) {
    const { user } = useAuthContext();
    const displayName = user?.email?.split('@')[0] || "Student";

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
            <main className={cn(
                "flex-1 p-4 md:p-8 relative z-10",
                fullHeight ? "overflow-hidden h-screen flex flex-col" : "overflow-y-auto h-[calc(100vh-4rem)]",
                !hideSidebar && "lg:ml-[90px] lg:peer-hover:ml-72 transition-[margin] duration-500 ease-in-out"
            )}>
                {/* Dashboard Header */}
                {!hideHeader && (
                    <header className="flex justify-between items-center mb-6 pt-2 flex-shrink-0">
                        <div>
                            {showGreeting ? (
                                <>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                        Welcome back, <span className="text-[#FF8C00]">{displayName}</span>!
                                    </h1>
                                    <p className="text-slate-500 mt-2 font-medium">Ready to hit your targets today?</p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                        {title}
                                    </h1>
                                    {description && <p className="text-slate-500 mt-2 font-medium">{description}</p>}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF8C00] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-white/50 border border-white/60 backdrop-blur-md rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-400/50 focus:ring-4 focus:ring-orange-500/10 w-64 transition-all shadow-sm group-hover:bg-white/80 placeholder:text-slate-400"
                                />
                            </div>
                            <button className="p-2.5 rounded-full bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm relative transition-all hover:scale-105 active:scale-95">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white" />
                            </button>
                        </div>
                    </header>
                )}

                {fullHeight ? (
                    <div className="flex-1 overflow-hidden">
                        {children}
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto space-y-10 pb-10">
                        {children}
                    </div>
                )}
            </main>
        </div>
    );
}
