"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, X, Check, BookOpen, Trophy, PlayCircle, Settings, BellOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { BouncyText } from "@/components/ui/BouncyText";
import { translations as T, tx } from "@/lib/translations";
import { memo } from "react";
import OneSignal from 'react-onesignal';


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

export const DashboardHeader = memo(({ title, description, showGreeting, displayName }: DashboardHeaderProps) => {
    const { notifications, lessons, markNotificationRead, clearNotifications } = useDashboard();
    const router = useRouter();
    const { lang } = useLanguage();

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Notification State
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Push Notification State
    const [isPushEnabled, setIsPushEnabled] = useState(false);
    const [isPushSupported, setIsPushSupported] = useState(false);

    // Sync Push Status
    useEffect(() => {
        let isMounted = true;
        
        const checkPushStatus = () => {
            if (!isMounted) return;
            try {
                if (typeof window !== 'undefined' && OneSignal && OneSignal.User && OneSignal.User.PushSubscription) {
                    setIsPushSupported(true);
                    const optedIn = OneSignal.User.PushSubscription.optedIn;
                    setIsPushEnabled(!!optedIn);
                    
                    // Add listener for future changes
                    OneSignal.User.PushSubscription.addEventListener("change", (event) => {
                        if (isMounted) setIsPushEnabled(!!event.current.optedIn);
                    });
                }
            } catch (err) {
                console.error("OneSignal push status error:", err);
            }
        };

        const timer = setInterval(() => {
            if (typeof window !== 'undefined' && OneSignal && OneSignal.User) {
                checkPushStatus();
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            isMounted = false;
            clearInterval(timer);
        };
    }, []);

    const togglePush = async () => {
        try {
            if (typeof window !== 'undefined' && OneSignal && OneSignal.User) {
                if (isPushEnabled) {
                    await OneSignal.User.PushSubscription.optOut();
                    setIsPushEnabled(false);
                } else {
                    await OneSignal.Notifications.requestPermission();
                    // State will update via the event listener, but optimism helps
                    setTimeout(() => {
                        setIsPushEnabled(!!OneSignal.User.PushSubscription.optedIn);
                    }, 500);
                }
            }
        } catch (err) {
            console.error("OneSignal toggle error:", err);
        }
    };


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
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            // Close search dropdown
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
            
            // Close notification dropdown ONLY if click is outside BOTH the dropdown AND the bell button itself
            // We ensure we don't accidentally close it when they are trying to open/close it via the bell
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }

        // Use capture phase to ensure it runs before any React event handlers bubble up and get stopped
        document.addEventListener("mousedown", handleClickOutside, true);
        document.addEventListener("touchstart", handleClickOutside, { passive: true, capture: true });
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
            document.removeEventListener("touchstart", handleClickOutside, { capture: true });
        };
    }, []);

    return (
        <header className="flex justify-between items-center mb-10 z-50 relative">
            <div>
                {showGreeting ? (
                    <div className="opacity-0 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">
                            {lang === "en" ? "Welcome back, " : "Xush kelibsiz, "} 
                            <span className="text-[#FF8C00] drop-shadow-sm">{displayName}</span>!
                        </h1>
                        <p className="text-slate-700 dark:text-slate-300 mt-2 font-medium transition-colors">
                            {lang === "en" ? "Ready to hit your targets today?" : "Bugun maqsadlaringizga erishishga tayyormisiz?"}
                        </p>
                    </div>
                ) : (
                    <div className="opacity-0 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-slate-700 dark:text-slate-300 mt-2 font-medium transition-colors">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* --- Search Bar --- */}
                <div ref={searchRef} className="relative hidden md:block group z-50">
                    <div className="relative">

                        <Search className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-400 ease-in-out z-10",
                            isSearchFocused ? "text-blue-800 dark:text-blue-400" : "text-slate-700 dark:text-slate-400"
                        )} />
                        <input
                            type="text"
                            id="header-search-input"
                            name="search"
                            autoComplete="off"
                            aria-label="Search lessons"
                            placeholder={lang === "en" ? "Search lessons..." : "Darslarni qidirish..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            className={cn(
                                "relative w-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none transition-all duration-500 ease-in-out shadow-[0_8px_32px_rgba(0,0,0,0.1)] placeholder:text-slate-700 dark:placeholder:text-slate-500 text-slate-900 dark:text-white overflow-hidden border-t border-l border-white/40 dark:border-slate-700/50 border-b border-r border-black/10 dark:border-slate-800/80",
                                isSearchFocused
                                    ? "ring-1 ring-white/50 dark:ring-slate-700 bg-white/20 dark:bg-slate-800/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] dark:shadow-none"
                                    : "hover:bg-white/20 dark:hover:bg-slate-800/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
                            )}
                        />
                        {/* Realistic Shimmer Refraction Effect */}
                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{
                                        background: "linear-gradient(135deg, transparent, rgba(255,255,255,0.4), transparent)",
                                        backgroundSize: "200% 200%",
                                    }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Search Dropdown */}
                    <AnimatePresence>
                        {isSearchFocused && searchQuery.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute top-full mt-4 w-[110%] -left-[5%] bg-white/20 dark:bg-slate-900/80 backdrop-blur-3xl border-t border-l border-white/50 dark:border-slate-700/50 border-b border-r border-black/10 dark:border-slate-800/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden transition-all"
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
                                                className="flex items-center w-full text-left gap-3 p-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group/item"
                                            >
                                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{result.title}</p>
                                                    <p className="text-xs text-slate-700 dark:text-slate-400 transition-colors">{result.module || "General"}</p>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm transition-colors">
                                            {lang === "en" ? "No results found." : "Natija topilmadi."}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Notification Bell --- */}
                <div ref={notificationRef} className="relative z-[9999]">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowNotifications((prev) => !prev);
                        }}
                        aria-label={lang === "en" ? "View notifications" : "Bildirishnomalarni ko'rish"}
                        className={cn(
                            "flex items-center justify-center p-3 rounded-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out border border-white/40 dark:border-slate-700/50 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-800/60 active:scale-95",
                            showNotifications ? "ring-2 ring-orange-400 bg-white/20 dark:bg-slate-800/40" : ""
                        )}
                        style={{ pointerEvents: "auto" }}
                    >
                        <motion.div
                            animate={showNotifications || unreadCount === 0 ? {} : { rotate: [0, -20, 20, -20, 20, 0] }}
                            transition={showNotifications || unreadCount === 0 ? {} : { repeat: Infinity, repeatDelay: 4, duration: 0.6 }}
                        >
                            <Bell className={cn("w-5 h-5 transition-colors duration-500 ease-in-out", showNotifications ? "text-orange-400" : "text-slate-600 dark:text-slate-400")} />
                        </motion.div>
                        {unreadCount > 0 && (
                             <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center z-10"
                            >
                            </motion.span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 40, x: 20, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.8, y: 40, x: 20, filter: "blur(20px)" }}
                                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                className="absolute right-0 top-[calc(100%+20px)] w-80 sm:w-96 bg-white/20 dark:bg-slate-900/80 backdrop-blur-3xl border-t border-l border-white/50 dark:border-slate-700/50 border-b border-r border-black/10 dark:border-slate-800/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden origin-top-right transition-all z-50"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/20 dark:border-slate-800/50 flex justify-between items-center bg-white/40 dark:bg-slate-800/40 transition-colors">
                                    <h3 className="font-bold text-slate-800 dark:text-white transition-colors">{lang === "en" ? "Notifications" : "Bildirishnomalar"}</h3>
                                    {notifications && notifications.length > 0 && (
                                        <button onClick={clearNotifications} className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                            {lang === "en" ? "Clear All" : "Hammasini o'chirish"}
                                        </button>
                                    )}
                                </div>
                                
                                {/* Push Notification Toggle Row */}
                                {isPushSupported && (
                                    <div className="px-4 py-3 bg-white/40 dark:bg-slate-800/40 border-b border-white/20 dark:border-slate-800/50 flex items-center justify-between transition-colors">
                                        <div className="flex items-center gap-2">
                                            {isPushEnabled ? <Bell className="w-4 h-4 text-orange-400" /> : <BellOff className="w-4 h-4 text-slate-400" />}
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800 dark:text-white">
                                                    {lang === "en" ? "Browser Notifications" : "Brauzer bildirishnomalari"}
                                                </span>
                                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                                    {isPushEnabled ? (lang === "en" ? "Active" : "Yoqilgan") : (lang === "en" ? "Inactive" : "O'chirilgan")}
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={togglePush}
                                            className={cn(
                                                "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none",
                                                isPushEnabled ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-700"
                                            )}
                                        >
                                            <span 
                                                className={cn(
                                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300",
                                                    isPushEnabled ? "translate-x-5" : "translate-x-1"
                                                )}
                                            />
                                        </button>
                                    </div>
                                )}

                                {/* List */}
                                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={cn(
                                                    "p-3 rounded-2xl transition-all relative group",
                                                    notif.is_read ? "bg-transparent text-slate-600 dark:text-slate-400" : "bg-white/60 dark:bg-slate-800/60 shadow-sm border border-white/50 dark:border-slate-700/50"
                                                )}
                                            >
                                                {!notif.is_read && (
                                                    <div className="absolute right-2 top-2 w-2 h-2 bg-[#FF8C00] rounded-full" />
                                                )}
                                                <h4 className={cn("text-sm font-bold mb-1 transition-colors", notif.is_read ? "text-slate-500 dark:text-slate-500" : "text-slate-800 dark:text-white")}>
                                                    {notif.title}
                                                </h4>
                                                <p className="text-xs mb-2 leading-relaxed opacity-90 transition-colors">
                                                    {notif.message}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] opacity-70 transition-colors">{notif.time_ago || "Just now"}</span>
                                                    {!notif.is_read && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); markNotificationRead(notif.id); }}
                                                            className="text-[10px] bg-slate-200 dark:bg-slate-700 hover:bg-green-100 dark:hover:bg-green-900/40 hover:text-green-600 dark:hover:text-green-400 px-2 py-1 rounded-full transition-colors flex items-center gap-1"
                                                        >
                                                            <Check className="w-3 h-3" /> {lang === "en" ? "Mark read" : "O'qildi"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-600 text-sm flex flex-col items-center">
                                            <Bell className="w-8 h-8 opacity-20 mb-2" />
                                            {lang === "en" ? "No notifications" : "Bildirishnomalar yo'q"}
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
});
