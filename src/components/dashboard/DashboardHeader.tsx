"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, X, Check, BookOpen, Trophy, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { BouncyText } from "@/components/ui/BouncyText";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

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
    const { lang } = useLanguage();

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
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <motion.h1
                            key={lang}
                            variants={{
                                hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
                                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                            }}
                            className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight"
                        >
                            <BouncyText text={lang === "en" ? "Welcome back," : "Xush kelibsiz,"} type="word" /> <span className="text-[#FF8C00]">{displayName}</span>!
                        </motion.h1>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
                                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                            }}
                            className="text-slate-500 mt-2 font-medium"
                        >
                            {lang === "en" ? "Ready to hit your targets today?" : "Bugun maqsadlaringizga erishishga tayyormisiz?"}
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
                                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                            }}
                            className="text-3xl font-extrabold text-slate-800 tracking-tight"
                        >
                            {title}
                        </motion.h1>
                        {description && (
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
                                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                                }}
                                className="text-slate-500 mt-2 font-medium"
                            >
                                {description}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <DarkModeToggle />
                {/* --- Search Bar --- */}
                <div ref={searchRef} className="relative hidden md:block group z-50">
                    <div className="absolute inset-x-0 -top-full h-[200%] pointer-events-none opacity-20 blur-3xl overflow-hidden rounded-full">
                        <motion.div
                            animate={{
                                x: [0, 100, -100, 0],
                                y: [0, -50, 50, 0],
                                scale: [1, 1.2, 0.8, 1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full"
                        />
                        <motion.div
                            animate={{
                                x: [0, -100, 100, 0],
                                y: [0, 50, -50, 0],
                                scale: [1, 1.5, 0.7, 1]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -right-1/4 bottom-1/4 w-1/2 h-1/2 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full"
                        />
                    </div>
                    <motion.div
                        initial={false}
                        animate={{ width: isSearchFocused ? 380 : 280 }}
                        className="relative"
                    >
                        <Search className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-400 ease-in-out z-10",
                            isSearchFocused ? "text-blue-500" : "text-slate-400"
                        )} />
                        <input
                            type="text"
                            placeholder={lang === "en" ? "Search lessons..." : "Darslarni qidirish..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            className={cn(
                                "relative w-full bg-white/10 backdrop-blur-2xl rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none transition-all duration-500 ease-in-out shadow-[0_8px_32px_rgba(0,0,0,0.1)] placeholder:text-slate-400 overflow-hidden border-t border-l border-white/40 border-b border-r border-black/10",
                                isSearchFocused
                                    ? "ring-1 ring-white/50 bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : "hover:bg-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
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
                                className="absolute top-full mt-4 w-[110%] -left-[5%] bg-white/20 backdrop-blur-3xl border-t border-l border-white/50 border-b border-r border-black/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden"
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
                                            {lang === "en" ? "No results found." : "Natija topilmadi."}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Notification Bell --- */}
                <div ref={notificationRef} className="relative z-40">
                    <motion.button
                        whileHover={!showNotifications ? { scale: 1.05 } : {}}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn(
                            "p-3 rounded-full bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative transition-all duration-500 ease-in-out border-t border-l border-white/40 border-b border-r border-black/10",
                            showNotifications ? "ring-1 ring-white/50 bg-white/20" : "hover:bg-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
                        )}
                    >
                        <motion.div
                            animate={showNotifications || unreadCount === 0 ? {} : { rotate: [0, -20, 20, -20, 20, 0] }}
                            transition={showNotifications || unreadCount === 0 ? {} : { repeat: Infinity, repeatDelay: 4, duration: 0.6 }}
                        >
                            <Bell className={cn("w-5 h-5 transition-colors duration-500 ease-in-out", showNotifications ? "text-orange-400" : "text-slate-600")} />
                        </motion.div>
                        {unreadCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center z-10"
                            >
                            </motion.span>
                        )}
                    </motion.button>

                    {/* Notification Dropdown */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 40, x: 20, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.8, y: 40, x: 20, filter: "blur(20px)" }}
                                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                className="absolute right-0 top-[calc(100%+20px)] w-85 bg-white/20 backdrop-blur-3xl border-t border-l border-white/50 border-b border-r border-black/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden origin-top-right"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/20 flex justify-between items-center bg-white/40">
                                    <h3 className="font-bold text-slate-800">{lang === "en" ? "Notifications" : "Bildirishnomalar"}</h3>
                                    {notifications && notifications.length > 0 && (
                                        <button onClick={clearNotifications} className="text-xs text-slate-500 hover:text-red-500 transition-colors">
                                            {lang === "en" ? "Clear All" : "Hammasini o'chirish"}
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
                                                            <Check className="w-3 h-3" /> {lang === "en" ? "Mark read" : "O'qildi"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-400 text-sm flex flex-col items-center">
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
}
