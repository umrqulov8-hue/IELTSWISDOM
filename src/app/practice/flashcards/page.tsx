"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Shuffle, RotateCcw, Bookmark, Layers, Link as LinkIcon, ClipboardCheck, Keyboard, ArrowLeft as BackIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getVocabularyForPassage } from "@/data/vocabulary";

function FlashcardsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const passageId = searchParams.get("id") || "c18-t1-p1";

    const [vocabList, setVocabList] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

    useEffect(() => {
        // Fetch data from centralized source
        const data = getVocabularyForPassage(passageId);
        setVocabList(data);
    }, [passageId]);

    const currentCard = vocabList[currentIndex];

    const handleNext = () => {
        if (currentIndex < vocabList.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleShuffle = () => {
        const shuffled = [...vocabList].sort(() => Math.random() - 0.5);
        setVocabList(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
        setDirection(0);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (!currentCard) return null;

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans relative overflow-hidden">
            {/* Dynamic Background Elements - Light Mode */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all group shadow-sm hover:shadow-md"
                >
                    <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        {currentCard.term}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Recall</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-600 font-medium text-sm">{currentIndex + 1} / {vocabList.length}</span>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 py-4 flex flex-col items-center">

                {/* Activity Navigation Pills - Light Mode */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <Link href={`/practice/matching?id=${passageId}`} className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-emerald-50 rounded-full text-slate-600 hover:text-emerald-600 font-medium text-sm transition-all border border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-md">
                        <LinkIcon className="w-4 h-4 group-hover:scale-110 transition-transform" /> Matching Game
                    </Link>
                    <Link href={`/practice/quiz?id=${passageId}`} className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-purple-50 rounded-full text-slate-600 hover:text-purple-600 font-medium text-sm transition-all border border-slate-200 hover:border-purple-200 shadow-sm hover:shadow-md">
                        <ClipboardCheck className="w-4 h-4 group-hover:scale-110 transition-transform" /> Quiz Challenge
                    </Link>
                    <Link href={`/practice/typing?id=${passageId}`} className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-amber-50 rounded-full text-slate-600 hover:text-amber-600 font-medium text-sm transition-all border border-slate-200 hover:border-amber-200 shadow-sm hover:shadow-md">
                        <Keyboard className="w-4 h-4 group-hover:scale-110 transition-transform" /> Typing Practice
                    </Link>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-lg h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / vocabList.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Flashcard Area */}
                <div className="relative w-full max-w-xl aspect-[1.6/1] perspective-1000 mb-10 cursor-pointer group" onClick={handleFlip}>
                    <motion.div
                        className="w-full h-full relative preserve-3d transition-transform duration-700"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front - Term */}
                        <div className="absolute inset-0 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-8 backface-hidden border border-white/60 bg-white/80 backdrop-blur-xl relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-shadow duration-500">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={currentCard.id + "front"}
                                className="text-center z-10"
                            >
                                <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-2 block">Vocabulary Term</span>
                                <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-2 drop-shadow-sm">
                                    {currentCard.term}
                                </h2>
                                <p className="text-slate-400 text-sm font-medium mt-4 flex items-center justify-center gap-2 group-hover:text-blue-500 transition-colors">
                                    <RotateCcw className="w-3 h-3" /> Click card to reveal meaning
                                </p>
                            </motion.div>
                        </div>

                        {/* Back - Definition */}
                        <div className="absolute inset-0 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-10 backface-hidden border border-white/60 bg-white/80 backdrop-blur-xl relative overflow-hidden rotate-y-180" style={{ transform: "rotateY(180deg)" }}>
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-50 to-teal-50 opacity-50" />

                            <div className="text-center z-10 space-y-6">
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-2 block">Definition</span>
                                    <p className="text-2xl md:text-3xl text-slate-800 font-medium leading-relaxed">
                                        "{currentCard.definition}"
                                    </p>
                                </div>
                                <div className="h-px w-24 bg-slate-200 mx-auto"></div>
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1 block">Example Context</span>
                                    <p className="text-slate-500 italic text-lg leading-relaxed">
                                        {currentCard.example}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 md:gap-6 mb-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                        aria-label="Previous Card"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleShuffle}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 group"
                    >
                        <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Shuffle Deck</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === vocabList.length - 1}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                        aria-label="Next Card"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-white transition-colors flex items-center gap-2 border border-transparent hover:border-slate-200 hover:shadow-sm">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        Master this Term
                    </button>
                    <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-white transition-colors flex items-center gap-2 border border-transparent hover:border-slate-200 hover:shadow-sm">
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        Save for Later
                    </button>
                </div>

            </main>
        </div>
    );
}

export default function FlashcardsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center font-sans text-slate-500">Loading flashcards...</div>}>
            <FlashcardsContent />
        </Suspense>
    );
}
