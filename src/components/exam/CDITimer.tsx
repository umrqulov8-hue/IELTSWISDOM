"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CDITimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    isRunning?: boolean;
}

export function CDITimer({ duration, onTimeUp, isRunning = true }: CDITimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) {
            if (timeLeft <= 0) onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isRunning, onTimeUp]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const getTimerColor = () => {
        if (timeLeft <= 60) return "text-red-600 bg-red-50 border-red-200 animate-pulse";
        if (timeLeft <= 300) return "text-orange-600 bg-orange-50 border-orange-200";
        if (timeLeft <= 600) return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-slate-700 bg-slate-50 border-slate-200";
    };

    const [isHidden, setIsHidden] = useState(false);

    return (
        <button 
            type="button"
            onClick={() => setIsHidden(!isHidden)}
            title="Click to hide or show timer"
            className={cn(
                "flex items-center gap-3 px-6 py-2.5 rounded-xl border font-mono font-bold text-xl shadow-inner transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer",
                isHidden ? "text-slate-400 bg-slate-800 border-slate-700 shadow-none" : getTimerColor()
            )}>
            <Clock className={cn("w-5 h-5 transition-all duration-300", !isHidden && timeLeft <= 60 ? "animate-spin-slow" : "")} />
            <span className={cn("min-w-[4rem] text-center transition-all duration-300", isHidden ? "blur-[6px] select-none opacity-50" : "blur-0")}>
                {formatTime(timeLeft)}
            </span>
        </button>
    );
}
