"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { Menu, Clock, Mic, Upload, Send, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SpeakingTestInterface() {
    const params = useParams();
    const testId = params?.id as string;
    const testData = testId ? SPEAKING_TESTS[testId] : null;
    const { lang } = useLanguage();

    const [timeLeft, setTimeLeft] = useState(16); // Starting at 16s for demo based on screenshot
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!testData) return <div className="p-10 text-center">Test not found</div>;

    const currentPart = testData.parts[currentPartIndex];
    const currentQuestion = currentPart.questions[currentQuestionIndex];

    const hasNextQuestion = currentQuestionIndex < currentPart.questions.length - 1;
    const hasPrevQuestion = currentQuestionIndex > 0;

    const handleNext = () => {
        if (hasNextQuestion) setCurrentQuestionIndex(prev => prev + 1);
        else if (currentPartIndex < testData.parts.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrev = () => {
        if (hasPrevQuestion) setCurrentQuestionIndex(prev => prev - 1);
        else if (currentPartIndex > 0) {
            setCurrentPartIndex(prev => prev - 1);
            setCurrentQuestionIndex(testData.parts[currentPartIndex - 1].questions.length - 1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-[#fff1e0] via-white to-[#e8f0fe]">
            {/* Subtle Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/40 rounded-full mix-blend-multiply blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply blur-[120px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="relative z-50 bg-white/40 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-slate-200/50">
                <Link href="/practice/speaking" className="flex items-center gap-3 group">
                    <div className="bg-[#1A362D] w-10 h-10 rounded-[12px] flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(26,54,45,0.2)] group-hover:scale-105 transition-transform relative overflow-hidden ring-1 ring-white/10">
                        <Crown className="w-5 h-5 text-slate-200 fill-slate-200 absolute top-1.5" strokeWidth={1} />
                        <span className="text-white font-serif font-bold text-[22px] leading-none mt-3.5 tracking-tighter">I</span>
                    </div>
                </Link>

                {/* Timer Pill */}
                <div className="flex items-center gap-2 font-bold text-slate-800 bg-white/80 border border-slate-200 px-4 py-1.5 rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-[13px] tracking-wider font-mono">{formatTime(timeLeft)}</span>
                </div>

                <button className="text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 p-2 rounded-xl transition-colors shadow-sm border border-transparent hover:border-slate-200">
                    <Menu className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col pt-4 relative z-10 items-center">

                {/* Part Header - Light Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 w-full max-w-3xl text-center shadow-sm border border-slate-200/60">
                    <h2 className="font-bold text-slate-800 text-lg tracking-wide mb-1.5">
                        {currentPart.title}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                        {currentPart.instructions}
                    </p>
                </div>

                {/* Navigation & Question Controls */}
                <div className="flex justify-between items-center mb-10 w-full max-w-3xl relative h-[40px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm font-bold text-[12px] py-2 px-4 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-slate-50 hover:shadow-md"
                        )}
                    >
                        ← <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full">
                        <span className="inline-block bg-orange-100/80 text-orange-600 border border-orange-200 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm">
                            QUESTION {currentQuestion.id}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm font-bold text-[12px] py-2 px-4 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-slate-50 hover:shadow-md"
                        )}
                    >
                        <span className="hidden sm:inline">Next</span> →
                    </button>
                </div>

                {/* Question Text */}
                <h1 className="text-[24px] md:text-[28px] font-extrabold text-slate-800 text-center mb-12 whitespace-pre-line max-w-3xl leading-snug drop-shadow-sm">
                    {currentQuestion.text}
                </h1>

                {/* Recording Area Light Card */}
                <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-10 md:p-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] relative">

                    <p className="text-slate-500 text-[14px] mb-8 font-semibold tracking-wide">
                        Click the mic icon to start recording your answer
                    </p>

                    {/* Mic Button */}
                    <div className="relative w-[80px] h-[80px] mx-auto mb-8">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse" />
                        <button className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-[#00d084] rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-transform group border border-white/50">
                            <Mic className="w-[34px] h-[34px] text-white group-hover:scale-110 transition-transform drop-shadow-sm" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Upload Button */}
                    <button className="bg-slate-50/80 hover:bg-slate-100 text-slate-600 hover:text-slate-800 font-semibold text-[13px] py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto transition-all border border-slate-200 shadow-sm hover:shadow-md">
                        Or upload an audio file <Upload className="w-4 h-4 text-slate-500" strokeWidth={2} />
                    </button>
                </div>

                {/* Mobile Extra padding */}
                <div className="h-10"></div>
            </main>
        </div>
    );
}
