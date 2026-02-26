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
        <div className="flex flex-col min-h-screen font-sans text-slate-800 relative overflow-hidden bg-slate-50">
            {/* Light Liquid Background Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
            <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[10%] w-[550px] h-[550px] bg-emerald-50/60 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />

            {/* Top Navigation Bar - Light Glass */}
            <header className="relative z-50 bg-white/40 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-slate-200/50 shadow-sm">
                <Link href="/practice/speaking" className="flex items-center gap-3 group">
                    <Image
                        src="/owl-logo.png"
                        alt="IELTS Wisdom"
                        width={42}
                        height={42}
                        className="object-contain group-hover:scale-105 transition-transform"
                    />
                </Link>

                {/* Timer Pill */}
                <div className="flex items-center gap-2 font-bold text-slate-700 bg-white/70 backdrop-blur-md border border-slate-200 px-4 py-1.5 rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-[14px] tracking-wider font-mono">{formatTime(timeLeft)}</span>
                </div>

                <button className="text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 p-2 rounded-xl transition-all border border-transparent hover:border-slate-200">
                    <Menu className="w-5 h-5" strokeWidth={2} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col pt-6 relative z-10 items-center">

                {/* Part Header - Frost Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 mb-8 w-full max-w-3xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <h2 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight mb-1.5">
                        {currentPart.title}
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base font-medium">
                        {currentPart.instructions}
                    </p>
                </div>

                {/* Navigation & Question Controls */}
                <div className="flex justify-between items-center mb-10 w-full max-w-3xl relative h-[42px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[13px] py-2 px-5 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:-translate-x-1"
                        )}
                    >
                        ← <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full">
                        <span className="inline-block bg-white/90 text-slate-800 border border-slate-200/60 px-5 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase shadow-sm">
                            QUESTION {currentQuestion.id}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[13px] py-2 px-5 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:translate-x-1"
                        )}
                    >
                        <span className="hidden sm:inline">Next</span> →
                    </button>
                </div>

                {/* Question Text */}
                <h1 className="text-[26px] md:text-[34px] font-[900] text-slate-900 text-center mb-14 whitespace-pre-line max-w-3xl leading-[1.2] tracking-tight drop-shadow-sm">
                    {currentQuestion.text}
                </h1>

                {/* Premium Light Glass Recording Area */}
                <div className="w-full max-w-2xl bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    <p className="text-slate-500 text-[15px] mb-10 font-semibold tracking-wide relative z-10">
                        Click the mic icon to start recording your answer
                    </p>

                    {/* Mic Button - Liquid Green */}
                    <div className="relative w-[100px] h-[100px] mx-auto mb-10 z-10">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse" />
                        <button className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white/40">
                            <Mic className="w-[40px] h-[40px] text-white group-hover:scale-110 transition-transform drop-shadow-lg" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Upload button - Glassic */}
                    <button className="relative z-10 bg-white/60 hover:bg-white/90 text-slate-600 hover:text-slate-900 font-bold text-[14px] py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 mx-auto transition-all border border-white/80 shadow-sm hover:shadow-lg">
                        Or upload an audio file <Upload className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                </div>

                {/* Mobile Extra padding */}
                <div className="h-16"></div>
            </main>
        </div>
    );
}
