"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, X, Check, BookOpen, Trophy, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";

// Fallback Mock Data (if DB is empty for demo)
const FALLBACK_SEARCH_RESULTS = [
    { id: '1', title: "Advanced Connectors", type: "Lesson", icon: PlayCircle, href: "/lessons" },
    { id: '2', title: "IELTS Speaking Part 2", type: "Practice", icon: BookOpen, href: "/practice/speaking" },
    { id: '3', title: "Weekly Leaderboard", type: "Social", icon: Trophy, href: "/leaderboard" },
    { id: '4', title: "Writing Task 2 Guide", type: "Article", icon: BookOpen, href: "/articles" },
];

interface DashboardHeaderProps {
    title?: string;
    description?: string;
    showGreeting?: boolean;
    displayName?: string;
}

export function DashboardHeader({ title, description, showGreeting, displayName }: DashboardHeaderProps) {
    const { notifications, lessons, markNotificationRead, clearNotifications } = useDashboard();
    const router = useRouter();

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Notification State
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Safe unread count
    const unreadCount = notifications ? notifications.filter(n => !n.is_read).length : 0;

    // Filter Logic
    // If lessons array is empty (no DB data yet), use Fallback for demo experience
    const availableItems = (lessons && lessons.length > 0) ? lessons : FALLBACK_SEARCH_RESULTS;

    const filteredResults = availableItems.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close dropdowns on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex justify-between items-center mb-10 z-50 relative">
            <div>
                {showGreeting ? (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                            Welcome back, <span className="text-[#FF8C00]">{displayName}</span>!
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Ready to hit your targets today?</p>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            {title}
                        </h1>
                        {description && <p className="text-slate-500 mt-2 font-medium">{description}</p>}
                    </motion.div>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* --- Search Bar --- */}
                <div ref={searchRef} className="relative hidden md:block group z-50">
                    <motion.div
                        initial={false}
                        animate={{ width: isSearchFocused ? 320 : 256 }}
                        className="relative"
                    >
                        <Search className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                            isSearchFocused ? "text-[#007BFF]" : "text-slate-400"
                        )} />
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            className={cn(
                                "w-full bg-white/50 border backdrop-blur-md rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all shadow-sm placeholder:text-slate-400",
                                isSearchFocused
                                    ? "border-[#FF8C00] ring-4 ring-orange-500/10 shadow-lg bg-white/80"
                                    : "border-white/60 hover:bg-white/80"
                            )}
                        />
                    </motion.div>

                    {/* Search Dropdown */}
                    <AnimatePresence>
                        {isSearchFocused && searchQuery.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full mt-2 w-full bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="p-2">
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((result: any) => (
                                            <button
                                                key={result.id}
                                                onClick={() => {
                                                    // Router Push Logic for Search Results
                                                    const target = result.href || `/lessons/${result.slug}`;
                                                    router.push(target);
                                                    setIsSearchFocused(false);
                                                }}
                                                className="flex items-center w-full text-left gap-3 p-3 hover:bg-white/50 rounded-xl transition-colors group/item"
                                            >
                                                <div className="p-2 bg-blue-50 rounded-lg text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{result.title}</p>
                                                    <p className="text-xs text-slate-500">{result.module || "General"}</p>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-500 text-sm">
                                            No results found.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Notification Bell --- */}
                <div ref={notificationRef} className="relative z-40">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn(
                            "p-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm relative transition-all hover:scale-105 active:scale-95",
                            showNotifications ? "bg-white/80 border-[#FF8C00] shadow-md" : "hover:bg-white/80"
                        )}
                    >
                        <Bell className={cn("w-5 h-5 transition-colors", showNotifications ? "text-[#FF8C00] fill-orange-500/20" : "text-slate-600")} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#F2F4F8] flex items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-4 w-80 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden origin-top-right"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/20 flex justify-between items-center bg-white/40">
                                    <h3 className="font-bold text-slate-800">Notifications</h3>
                                    {notifications && notifications.length > 0 && (
                                        <button onClick={clearNotifications} className="text-xs text-slate-500 hover:text-red-500 transition-colors">
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                {/* List */}
                                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={cn(
                                                    "p-3 rounded-2xl transition-all relative group",
                                                    notif.is_read ? "bg-transparent text-slate-400" : "bg-white/60 shadow-sm border border-white/50"
                                                )}
                                            >
                                                {!notif.is_read && (
                                                    <div className="absolute right-2 top-2 w-2 h-2 bg-[#FF8C00] rounded-full" />
                                                )}
                                                <h4 className={cn("text-sm font-bold mb-1", notif.is_read ? "text-slate-500" : "text-slate-800")}>
                                                    {notif.title}
                                                </h4>
                                                <p className="text-xs mb-2 leading-relaxed opacity-90">
                                                    {notif.message}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] opacity-70">{notif.time_ago || "Just now"}</span>
                                                    {!notif.is_read && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); markNotificationRead(notif.id); }}
                                                            className="text-[10px] bg-slate-200 hover:bg-green-100 hover:text-green-600 px-2 py-1 rounded-full transition-colors flex items-center gap-1"
                                                        >
                                                            <Check className="w-3 h-3" /> Mark read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-400 text-sm flex flex-col items-center">
                                            <Bell className="w-8 h-8 opacity-20 mb-2" />
                                            No notifications
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
