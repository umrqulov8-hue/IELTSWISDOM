"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft as BackIcon, CheckCircle, XCircle, ArrowRight, Keyboard, Target, Sparkles, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import confetti from 'canvas-confetti';
import { getVocabularyForPassage } from "@/data/vocabulary";

function TypingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const passageId = searchParams.get("id") || "c18-t1-p1";
    const inputRef = useRef<HTMLInputElement>(null);

    const [words, setWords] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Fetch data from centralized source
        const data = getVocabularyForPassage(passageId);
        setWords(data);
    }, [passageId]);

    // Auto-focus input on question change
    useEffect(() => {
        if (inputRef.current && !isComplete) {
            inputRef.current.focus();
        }
    }, [currentIndex, isComplete]);

    const currentWord = words[currentIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "correct") {
            handleNext();
            return;
        }

        if (inputValue.trim().toLowerCase() === currentWord.term.toLowerCase()) {
            setStatus("correct");
            setScore(prev => prev + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#38BDF8', '#818CF8'] // Blue/Indigo confetti
            });
        } else {
            setStatus("incorrect");
            // Shake effect logic could go here
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInputValue("");
            setStatus("idle");
        } else {
            setIsComplete(true);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setInputValue("");
        setStatus("idle");
        setScore(0);
        setIsComplete(false);
    };

    if (!currentWord) return null;

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans relative overflow-hidden text-slate-800">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all group shadow-sm hover:shadow-md"
                >
                    <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back</span>
                </button>

                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                    Typing Master
                </h1>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <Target className="w-4 h-4 text-sky-500" />
                    <span className="text-slate-600 font-medium text-sm">Target: {currentIndex + 1} / {words.length}</span>
                </div>
            </header>

            <main className="relative z-10 max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">

                <AnimatePresence mode="wait">
                    {isComplete ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl"
                        >
                            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <Keyboard className="w-12 h-12 text-sky-500" />
                                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl animate-pulse"></div>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-800 mb-2">Typing Completed!</h2>
                            <p className="text-xl text-slate-500 mb-8">
                                You correctly typed <span className="text-sky-600 font-bold">{score}</span> terms.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleRetry}
                                    className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-bold transition-all flex items-center gap-2 border border-slate-200 hover:shadow-md"
                                >
                                    <RefreshCcw className="w-5 h-5" /> Practice Again
                                </button>
                                <button
                                    onClick={() => router.back()}
                                    className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-bold shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1"
                                >
                                    Finish
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentWord.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="w-full"
                        >
                            {/* Definition Card */}
                            <div className="text-center mb-10">
                                <span className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-4 block">Definition</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                                    "{currentWord.definition}"
                                </h2>
                            </div>

                            {/* Input Area */}
                            <div className="relative max-w-md mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="relative group">
                                        <div className={cn(
                                            "absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500",
                                            status === "correct" ? "bg-emerald-500" :
                                                status === "incorrect" ? "bg-rose-500" : "bg-sky-500"
                                        )}></div>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => {
                                                setInputValue(e.target.value);
                                                if (status !== "idle") setStatus("idle");
                                            }}
                                            disabled={status === "correct"}
                                            placeholder="Type the vocab word..."
                                            className={cn(
                                                "relative w-full bg-white border-2 text-center text-2xl font-bold py-4 rounded-xl outline-none transition-all placeholder:text-slate-600 shadow-xl text-slate-800",
                                                status === "idle" && "border-slate-200 focus:border-sky-500",
                                                status === "correct" && "border-emerald-500 text-emerald-600 bg-emerald-50",
                                                status === "incorrect" && "border-rose-500 text-rose-700 bg-rose-50"
                                            )}
                                        />

                                        {/* Status Indicators */}
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {status === "correct" && <CheckCircle className="w-6 h-6 text-emerald-700 animate-bounce" />}
                                            {status === "incorrect" && <XCircle className="w-6 h-6 text-rose-700 animate-pulse" />}
                                        </div>
                                    </div>

                                    {/* Feedback / Instructions */}
                                    <div className="h-8 mt-4 text-center">
                                        {status === "incorrect" && (
                                            <p className="text-rose-700 font-medium text-sm animate-shake">Incorrect, try again!</p>
                                        )}
                                        {status === "correct" && (
                                            <p className="text-emerald-600 font-medium text-sm flex items-center justify-center gap-1">
                                                <Sparkles className="w-3 h-3" /> Correct! Press Enter to continue
                                            </p>
                                        )}
                                        {status === "idle" && (
                                            <p className="text-slate-600 text-xs">Press Enter to submit</p>
                                        )}
                                    </div>

                                    {/* Next Button (Visible if correct) */}
                                    {status === "correct" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 flex justify-center"
                                        >
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="px-8 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold shadow-lg transition-all flex items-center gap-2"
                                            >
                                                Next Word <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    )}
                                </form>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default function TypingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center font-sans text-slate-500">Loading typing practice...</div>}>
            <TypingContent />
        </Suspense>
    );
}
