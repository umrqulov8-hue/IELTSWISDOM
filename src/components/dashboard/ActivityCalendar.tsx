"use client";

import { useState, useRef, useEffect } from "react";
import { Flame, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthContext } from "@/context/AuthContext";

// Local storage key for demo sake, but uniquely tied to user ID
const getActivityKey = (uid: string) => `user_activity_history_${uid}`;

interface DayData {
    date: Date;
    isoDate: string; // YYYY-MM-DD
    active: boolean;
}

export function ActivityCalendar() {
    const { lang } = useLanguage();
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeDates, setActiveDates] = useState<Set<string>>(new Set());
    const [gridWeeks, setGridWeeks] = useState<DayData[][]>([]);
    
    const [hoveredDay, setHoveredDay] = useState<{ x: number, y: number, date: string, active: boolean, rect: DOMRect } | null>(null);

    // Initial load & mark today as active
    useEffect(() => {
        if (!user) return;
        const key = getActivityKey(user.id);
        
        let history: string[] = [];
        try {
            const raw = localStorage.getItem(key);
            if (raw) {
                history = JSON.parse(raw);
            }
        } catch(e) {}

        const todayRaw = new Date();
        const todayIso = todayRaw.toISOString().split('T')[0];

        // Ensure today is tracked
        if (!history.includes(todayIso)) {
            history.push(todayIso);
            localStorage.setItem(key, JSON.stringify(history));
        }

        // Mock some random old data if it's too short, just to show how it looks!
        if (history.length === 1) {
            for (let i = 1; i <= 60; i++) {
                if (Math.random() > 0.6) {
                    const mockDate = new Date();
                    mockDate.setDate(mockDate.getDate() - i);
                    history.push(mockDate.toISOString().split('T')[0]);
                }
            }
            localStorage.setItem(key, JSON.stringify(history));
        }

        setActiveDates(new Set(history));
    }, [user]);

    // Build grid (Last 52 weeks = 364 days, up to today)
    useEffect(() => {
        const today = new Date();
        // Force today to be end of day local
        today.setHours(23, 59, 59, 999);
        
        // Go back 365 days
        const start = new Date(today);
        start.setDate(start.getDate() - 364);

        // Normalize Start Date so we align perfectly into a 7-day grid where Sunday=0
        // We actually want a continuous array of days grouped by cols of 7
        const daysToGenerate = 365;
        let runningDate = new Date(start);
        
        const generatedDays = [];
        for (let i = 0; i < daysToGenerate; i++) {
            const isoDate = runningDate.toISOString().split('T')[0];
            generatedDays.push({
                date: new Date(runningDate),
                isoDate,
                active: activeDates.has(isoDate)
            });
            runningDate.setDate(runningDate.getDate() + 1);
        }

        // Chunk into weeks (columns)
        const weeks: DayData[][] = [];
        for (let i = 0; i < generatedDays.length; i += 7) {
            weeks.push(generatedDays.slice(i, i + 7));
        }

        setGridWeeks(weeks);
    }, [activeDates]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Format current streak safely
    let currentStreakCount = 0;
    const tempToday = new Date().toISOString().split('T')[0];
    let checkDate = new Date();
    
    // Count backward from today
    while (true) {
        const dIso = checkDate.toISOString().split('T')[0];
        if (activeDates.has(dIso)) {
            currentStreakCount++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // Is it just missing today because they haven't logged in today? 
            if (dIso === tempToday && currentStreakCount === 0) {
                 checkDate.setDate(checkDate.getDate() - 1);
                 // If yesterday is true, keep going
                 if (activeDates.has(checkDate.toISOString().split('T')[0])) {
                     continue;
                 }
            }
            break;
        }
    }


    const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthNamesUz = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
    const months = lang === "en" ? monthNamesEn : monthNamesUz;

    const formatDate = (date: Date) => {
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    return (
        <div className="relative z-[9999]" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Activity Streak"
                className={cn(
                    "flex items-center gap-2 p-2 px-3 rounded-xl bg-white dark:bg-slate-900 border shadow-sm transition-all duration-300 ease-in-out cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95",
                    currentStreakCount > 0 
                      ? "border-orange-200 dark:border-orange-900/50" 
                      : "border-slate-200 dark:border-slate-800",
                    isOpen && "ring-2 ring-orange-400"
                )}
            >
                <Flame className={cn("w-5 h-5", currentStreakCount > 0 ? "text-orange-500 fill-orange-500 stroke-[1.5]" : "text-slate-400 stroke-[2]")} />
                <span className={cn("text-sm font-extrabold font-mono", currentStreakCount > 0 ? "text-orange-600 dark:text-orange-400" : "text-slate-500 dark:text-slate-400")}>
                    {currentStreakCount}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        className="absolute right-0 top-[calc(100%+16px)] w-auto min-w-[320px] max-w-[calc(100vw-32px)] sm:max-w-max bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-top-right transition-all z-50 p-6 flex flex-col gap-4 overflow-x-auto"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <div>
                                <h3 className="font-extrabold text-slate-800 dark:text-white text-lg flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                                    {lang === "en" ? "Activity Streak" : "Faollik Davr"}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {lang === "en" ? `${currentStreakCount} consecutive days practiced` : `Qatorasiga ${currentStreakCount} kun mashq qildingiz`}
                                </p>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="flex gap-1.5 justify-end relative overflow-x-auto pb-4 custom-scrollbar"
                             onMouseLeave={() => setHoveredDay(null)}>
                            {gridWeeks.map((week, wIndex) => (
                                <div key={wIndex} className="flex flex-col gap-1.5 flex-shrink-0">
                                    {week.map((day, dIndex) => (
                                        <div
                                            key={dIndex}
                                            onMouseEnter={(e) => {
                                                const rect = (e.target as HTMLElement).getBoundingClientRect();
                                                setHoveredDay({ date: day.isoDate, active: day.active, x: rect.left, y: rect.top, rect: rect });
                                            }}
                                            className={cn(
                                                "w-3.5 h-3.5 rounded-[4px] transition-all duration-300 transform hover:scale-125 cursor-crosshair ring-1 ring-inset",
                                                day.active 
                                                  ? "bg-orange-500 ring-orange-600 dark:ring-orange-600/50 shadow-[0_0_8px_rgba(249,115,22,0.6)]" 
                                                  : "bg-slate-100 dark:bg-slate-800 ring-slate-200 dark:ring-slate-700/50"
                                            )}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Global Tooltip for Hover */}
                        {hoveredDay && (
                            <div className="flex items-center gap-2 p-2 px-3 bg-slate-900 border border-slate-700 rounded-lg absolute left-1/2 -translate-x-1/2 bottom-0 text-white text-xs font-bold pointer-events-none shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 min-w-max">
                                {hoveredDay.active ? (
                                    <>
                                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> 
                                        {formatDate(new Date(hoveredDay.date))} (Active)
                                    </>
                                ) : (
                                    <>
                                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                                        {formatDate(new Date(hoveredDay.date))} (No activity)
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 ml-auto">
                            {lang === "en" ? "Less" : "Kam"}
                            <div className="w-3 h-3 rounded-[3px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                            <div className="w-3 h-3 rounded-[3px] bg-orange-500/50 border border-orange-500/50" />
                            <div className="w-3 h-3 rounded-[3px] bg-orange-500 border border-orange-600 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                            {lang === "en" ? "More" : "Ko'p"}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
