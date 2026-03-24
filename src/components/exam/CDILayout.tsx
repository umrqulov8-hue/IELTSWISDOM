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
            "h-screen overflow-hidden bg-[#F0F2F5] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900",
            fontSize === "large" ? "text-lg" : fontSize === "extra-large" ? "text-xl" : "text-base"
        )}>
            <FullscreenLock onForceSubmit={onFinish}>
                {/* --- CDI Header --- */}
                <header className="h-[74px] bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between px-8 shrink-0 z-50">
                    <div className="flex items-center gap-4">
                        <span className="text-[#e2272e] font-black text-4xl tracking-tighter mr-2 select-none">IELTS</span>
                        <div className="flex flex-col border-l-2 border-slate-200 pl-4">
                            <span className="font-extrabold text-lg leading-tight text-slate-900 tracking-tight">48887375</span>
                            <CDITimer duration={duration} onTimeUp={onFinish} variant="cdi" />
                        </div>
                    </div>

                    <div className="flex items-center gap-8 text-black opacity-80">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                        <button onClick={handleFontSizeChange} title="Change text size" className="hover:opacity-70 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                    </div>
                </header>

                {/* --- Main Area --- */}
                <main className="flex-1 min-h-0 overflow-hidden relative flex flex-col bg-white">
                    <div id="scroll-container" className="flex-1 min-h-0 overflow-hidden relative flex flex-col w-full">
                        {children}
                    </div>
                </main>

                {/* --- CDI Footer Navigation --- */}
                <footer className="h-[76px] bg-[#E8E8E8] border-t-2 border-slate-300 flex items-center justify-between px-8 shrink-0 z-50">
                    <div className="flex items-center gap-8 h-full">
                        {Array.from({ length: totalParts }).map((_, i) => {
                            const isActive = currentPart === i;
                            const questionsPerPart = 10;
                            return (
                                <div key={i} className="flex flex-col justify-end h-full pb-2">
                                    <button
                                        onClick={() => onPartChange(i)}
                                        className={cn(
                                            "font-bold text-[15px] mb-1 ml-1 text-left",
                                            isActive ? "text-black" : "text-slate-500 hover:text-black"
                                        )}
                                    >
                                        Part {i + 1}
                                    </button>
                                    {isActive ? (
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: questionsPerPart }).map((_, qIdx) => {
                                                const qn = i * questionsPerPart + qIdx + 1;
                                                return (
                                                    <button key={qIdx} className="w-6 h-5 flex items-center justify-center text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-400">
                                                        {qn}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-[11px] font-semibold text-slate-500 ml-1">
                                            0 of 10
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPartChange(Math.max(0, currentPart - 1))}
                            disabled={currentPart === 0}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center transition-all opacity-90",
                                currentPart === 0 ? "bg-[#d1d5db] text-white cursor-not-allowed" : "bg-[#9ca3af] hover:bg-[#6b7280] text-white"
                            )}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button
                            onClick={() => {
                                if (currentPart < totalParts - 1) onPartChange(currentPart + 1);
                                else onFinish();
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-black hover:bg-gray-800 text-white transition-all opacity-90 group"
                        >
                            {currentPart < totalParts - 1 ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                            ) : (
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">OK</span>
                            )}
                        </button>
                    </div>
                </footer>
            </FullscreenLock>
        </div>
    );
}
