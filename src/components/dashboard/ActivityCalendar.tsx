"use client";

import { useState, useRef, useEffect } from "react";
import { Flame, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthContext } from "@/context/AuthContext";

const getActivityKey = (uid: string) => `user_activity_history_${uid}`;

const toLocalIso = (d: Date) => {
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().split('T')[0];
};

export function ActivityCalendar() {
    const { lang } = useLanguage();
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeDates, setActiveDates] = useState<Set<string>>(new Set());
    
    // Calendar view state
    const [viewDate, setViewDate] = useState(new Date());

    // Initial load & mark today as active
    useEffect(() => {
        if (!user) return;
        const key = getActivityKey(user.id);
        
        let history: string[] = [];
        try {
            const raw = localStorage.getItem(key);
            if (raw) history = JSON.parse(raw);
        } catch(e) {}

        const todayIso = toLocalIso(new Date());

        if (!history.includes(todayIso)) {
            history.push(todayIso);
            localStorage.setItem(key, JSON.stringify(history));
        }

        // Mock some days for demo
        if (history.length === 1) {
            for (let i = 1; i <= 60; i++) {
                if (Math.random() > 0.4) {
                    const mockDate = new Date();
                    mockDate.setDate(mockDate.getDate() - i);
                    history.push(toLocalIso(mockDate));
                }
            }
            localStorage.setItem(key, JSON.stringify(history));
        }

        setActiveDates(new Set(history));
    }, [user]);

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
    const tempToday = toLocalIso(new Date());
    let checkDate = new Date();
    
    while (true) {
        const dIso = toLocalIso(checkDate);
        if (activeDates.has(dIso)) {
            currentStreakCount++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            if (dIso === tempToday && currentStreakCount === 0) {
                 checkDate.setDate(checkDate.getDate() - 1);
                 if (activeDates.has(toLocalIso(checkDate))) {
                     continue;
                 }
            }
            break;
        }
    }

    // Monthly Calendar Logic
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
    const prevMonthDays = new Date(year, month, 0).getDate();

    const calendarDays = [];
    
    // Pad previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push({
            day: prevMonthDays - firstDayOfMonth + i + 1,
            isCurrentMonth: false,
            isoDate: toLocalIso(new Date(year, month - 1, prevMonthDays - firstDayOfMonth + i + 1))
        });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            isCurrentMonth: true,
            isoDate: toLocalIso(new Date(year, month, i))
        });
    }
    
    // Pad next month
    const remaining = 42 - calendarDays.length; // Ensure 6 rows
    for (let i = 1; i <= remaining; i++) {
         calendarDays.push({
            day: i,
            isCurrentMonth: false,
            isoDate: toLocalIso(new Date(year, month + 1, i))
        });
    }

    const prevMonth = () => {
        setViewDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setViewDate(new Date(year, month + 1, 1));
    };

    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesUz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
    const months = lang === "en" ? monthNamesEn : monthNamesUz;

    const weekdaysEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const weekdaysUz = ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];
    const weekdays = lang === "en" ? weekdaysEn : weekdaysUz;

    const todayIso = toLocalIso(new Date());

    return (
        <div className="relative z-[9999]" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Activity Streak"
                className={cn(
                    "flex items-center gap-2 p-2 px-3 rounded-xl bg-white dark:bg-slate-900 border shadow-sm transition-all duration-150 ease-in-out cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95",
                    currentStreakCount > 0 
                      ? "border-slate-800 dark:border-slate-200" 
                      : "border-slate-200 dark:border-slate-800",
                    isOpen && "ring-2 ring-slate-800 dark:ring-slate-200"
                )}
            >
                <CalendarIcon className={cn("w-5 h-5", currentStreakCount > 0 ? "text-slate-800 dark:text-slate-100" : "text-slate-400")} />
                <span className={cn("text-sm font-extrabold font-mono", currentStreakCount > 0 ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400")}>
                    {currentStreakCount} <Flame className="inline-block w-3 h-3 text-slate-800 dark:text-slate-100 fill-slate-800 dark:fill-slate-100 -mt-1 -ml-1" />
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-[calc(100%+12px)] w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-top-right z-50 p-5 overflow-hidden"
                    >
                        {/* Calendar Header */}
                        <div className="flex justify-between items-center mb-6 px-1">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">
                                {months[month]} {year}
                            </h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevMonth}
                                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={nextMonth}
                                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Weekdays Header */}
                        <div className="grid grid-cols-7 mb-4">
                            {weekdays.map((w, i) => (
                                <div key={i} className="text-center text-xs font-bold text-slate-400 dark:text-slate-500">
                                    {w}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                            {calendarDays.map((d, i) => {
                                const isActive = activeDates.has(d.isoDate);
                                const isToday = d.isoDate === todayIso;

                                return (
                                    <div key={i} className="flex justify-center relative group">
                                        <div 
                                            className={cn(
                                                "w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 relative z-10",
                                                d.isCurrentMonth ? "text-slate-700 dark:text-slate-300" : "text-slate-300 dark:text-slate-600",
                                                isActive && "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md transform hover:scale-105",
                                                !isActive && isToday && "ring-2 ring-slate-800 dark:ring-slate-100 text-slate-800 dark:text-slate-100 font-extrabold",
                                                !isActive && !isToday && d.isCurrentMonth && "hover:bg-slate-100 dark:hover:bg-slate-800 cursor-default"
                                            )}
                                        >
                                            {d.day}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center px-1">
                            <span className="text-xs text-slate-500 font-medium">
                                {lang === "en" ? "Current Streak" : "Joriy seriya"}
                            </span>
                            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                                {currentStreakCount} {lang === "en" ? "Days" : "Kun"} <Flame className="w-3.5 h-3.5 fill-slate-800 dark:fill-slate-100" />
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
