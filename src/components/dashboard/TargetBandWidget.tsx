"use client";

import { m } from "framer-motion";
import { useDevice } from "@/context/DeviceContext";

interface TargetBandWidgetProps {
    target: number;
    current: number;
}

export function TargetBandWidget({ target, current }: TargetBandWidgetProps) {
    const { shouldAnimate } = useDevice();
    const percentage = (current / target) * 100;
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 mt-6 group/target">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                        {/* Background Circle */}
                        <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            className="text-slate-200 dark:text-slate-700"
                        />
                        {/* Progress Circle */}
                        <m.circle
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className="text-slate-900 dark:text-slate-100"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <TrophyIcon className="w-4 h-4 text-slate-600" />
                    </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-0.5">Target Band</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white leading-none">{target}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700">Current: {current}</span>
                <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-slate-900 dark:bg-slate-100"
                    />
                </div>
            </div>
        </div>
    );
}

function TrophyIcon({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    );
}
