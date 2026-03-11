"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { CDITimer } from "./CDITimer";
import { FullscreenLock } from "./FullscreenLock";

interface CDILayoutProps {
    children: React.ReactNode;
    title: string;
    section: "Listening" | "Reading" | "Writing" | "Speaking";
    duration: number; // in seconds
    onFinish: () => void;
    currentPart: number;
    totalParts: number;
    onPartChange: (index: number) => void;
    questionsHandled?: { current: number; total: number };
}

export function CDILayout({
    children,
    title,
    section,
    duration,
    onFinish,
    currentPart,
    totalParts,
    onPartChange,
    questionsHandled
}: CDILayoutProps) {
    const [fontSize, setFontSize] = useState<"standard" | "large" | "extra-large">("standard");

    const handleFontSizeChange = () => {
        if (fontSize === "standard") setFontSize("large");
        else if (fontSize === "large") setFontSize("extra-large");
        else setFontSize("standard");
    };

    useEffect(() => {
        const container = document.getElementById("scroll-container");
        if (container) {
            container.scrollTo(0, 0);
        }
    }, [currentPart]);

    return (
        <div className={cn(
            "min-h-screen bg-[#F0F2F5] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900",
            fontSize === "large" ? "text-lg" : fontSize === "extra-large" ? "text-xl" : "text-base"
        )}>
            <FullscreenLock onForceSubmit={onFinish}>
                {/* --- CDI Header --- */}
                <header className="h-[65px] bg-[#2D3E50] text-white flex items-center justify-between px-6 shrink-0 shadow-lg z-50">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">IELTS {section}</span>
                            <span className="font-bold text-sm truncate max-w-[300px]">{title}</span>
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2">
                        <div className="bg-white px-6 py-1.5 rounded-xl shadow-sm border border-slate-200">
                            <CDITimer duration={duration} onTimeUp={onFinish} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleFontSizeChange}
                            className="flex flex-col items-center gap-0.5 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors"
                            title="Change Font Size"
                        >
                            <Type className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-bold">T-Size</span>
                        </button>
                    </div>
                </header>

                {/* --- Main Area --- */}
                <main className="flex-1 overflow-hidden relative flex flex-col min-h-0 bg-white">
                    <div id="scroll-container" className="flex-1 overflow-hidden relative flex flex-col w-full">
                        {children}
                    </div>
                </main>

                {/* --- CDI Footer Navigation --- */}
                <footer className="h-[70px] bg-white border-t border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalParts }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => onPartChange(i)}
                                className={cn(
                                    "h-10 px-5 rounded-md font-bold text-sm transition-all border",
                                    currentPart === i
                                        ? "bg-[#2D3E50] text-white border-transparent shadow-md"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                                )}
                            >
                                Part {i + 1}
                            </button>
                        ))}
                        {questionsHandled && (
                            <span className="ml-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Questions {questionsHandled.current} of {questionsHandled.total}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onPartChange(Math.max(0, currentPart - 1))}
                            disabled={currentPart === 0}
                            className="h-10 px-6 rounded-md font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 transition-all flex items-center gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <button
                            onClick={() => {
                                if (currentPart < totalParts - 1) onPartChange(currentPart + 1);
                                else onFinish();
                            }}
                            className="h-10 px-6 rounded-md font-bold text-sm bg-[#2D3E50] text-white hover:bg-[#1E293B] shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2"
                        >
                            {currentPart < totalParts - 1 ? "Next" : "Submit"}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </footer>
            </FullscreenLock>
        </div>
    );
}
