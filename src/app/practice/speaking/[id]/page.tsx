"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { Menu, Clock, Mic, Upload, Send } from "lucide-react";
import Link from "next/link";
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
        <div className="flex flex-col min-h-screen font-sans text-slate-200 relative overflow-hidden bg-slate-950">
            {/* Liquid Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0" />

            {/* Top Navigation Bar - Frosted Glass */}
            <header className="relative z-50 bg-white/5 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6 sticky top-0 shadow-lg">
                <Link href="/practice/speaking" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-br from-[#e63946] to-rose-600 text-white font-bold w-9 h-9 rounded-xl flex items-center justify-center text-xl tracking-tighter shadow-[0_0_15px_rgba(230,57,70,0.5)] group-hover:scale-105 transition-transform duration-300">
                        E
                    </div>
                </Link>

                {/* Timer Glass Pill */}
                <div className="flex items-center gap-2 font-bold text-white bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-inner absolute left-1/2 -translate-x-1/2">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span className="text-[15px] tracking-wider font-mono">{formatTime(timeLeft)}</span>
                </div>

                <button className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300 backdrop-blur-sm">
                    <Menu className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col pt-8 lg:pt-12 relative z-10">

                {/* Part Header - Glass Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <h2 className="font-bold text-white text-lg md:text-xl tracking-wide mb-2">
                        {currentPart.title}
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        {currentPart.instructions}
                    </p>
                </div>

                {/* Navigation & Question Controls */}
                <div className="flex justify-between items-center mb-8 w-full relative h-[40px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 font-bold text-[13px] py-2 px-4 flex items-center gap-2 rounded-xl tracking-wide z-10 transition-all duration-300",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-x-1"
                        )}
                    >
                        ← <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full">
                        <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[13px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                            Question {currentQuestion.id}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 font-bold text-[13px] py-2 px-4 flex items-center gap-2 rounded-xl tracking-wide z-10 transition-all duration-300",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:translate-x-1"
                        )}
                    >
                        <span className="hidden sm:inline">Next</span> →
                    </button>
                </div>

                {/* Question Text displayed prominently */}
                <h1 className="text-[26px] md:text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 text-center mb-12 whitespace-pre-line max-w-4xl mx-auto leading-snug drop-shadow-lg">
                    {currentQuestion.text}
                </h1>

                {/* Liquid Glass Recording Area */}
                <div className="relative mt-2 w-full max-w-3xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* Glow effect inside card */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <p className="text-slate-300 text-[16px] mb-8 font-medium tracking-wide relative z-10">
                            Click the mic icon to start recording your answer
                        </p>

                        {/* Premium Liquid Mic Button */}
                        <div className="relative w-[90px] h-[90px] mx-auto mb-10 z-10">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 animate-pulse" />
                            <button className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn border border-white/20">
                                <Mic className="w-[38px] h-[38px] text-white group-hover/btn:scale-110 transition-transform duration-300 drop-shadow-md" strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Upload Button */}
                        <button className="relative z-10 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-[14px] py-3 px-6 rounded-2xl flex items-center justify-center gap-2 mx-auto transition-all duration-300 backdrop-blur-md shadow-sm">
                            Or upload an audio file <Upload className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Speaking Time Indicator */}
                    <p className="text-[12px] text-indigo-300 mt-4 text-center font-medium tracking-widest uppercase">
                        Speaking Time: <span className="text-white">00:00</span>
                    </p>
                </div>

                {/* Submit Controls */}
                <div className="mt-14 mb-8 flex justify-center relative z-10 w-full max-w-md mx-auto">
                    <button className="w-full bg-gradient-to-r from-emerald-500 hover:from-emerald-400 to-teal-600 hover:to-teal-500 text-white font-bold text-[15px] py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1">
                        Submit Final Answer <Send className="w-5 h-5" />
                    </button>
                </div>

            </main>
        </div>
    );
}
