"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Zap, ChevronDown, ChevronUp, Book, Star, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Types ---
interface SpeakingTest {
    id: string;
    month: string;
    testNumber: number;
    takenCount: number;
    isPro: boolean;
}

// --- Mock Data ---
const SPEAKING_TESTS: SpeakingTest[] = [
    { id: "jan-1", month: "January", testNumber: 1, takenCount: 107407, isPro: false },
    { id: "jan-2", month: "January", testNumber: 2, takenCount: 19238, isPro: false },
    { id: "feb-1", month: "February", testNumber: 1, takenCount: 12932, isPro: false },
    { id: "feb-2", month: "February", testNumber: 2, takenCount: 5201, isPro: false },
    { id: "mar-1", month: "March", testNumber: 1, takenCount: 6234, isPro: false },
    { id: "mar-2", month: "March", testNumber: 2, takenCount: 3967, isPro: false },
    { id: "apr-1", month: "April", testNumber: 1, takenCount: 4305, isPro: false },
    { id: "apr-2", month: "April", testNumber: 2, takenCount: 2799, isPro: false },
    { id: "may-1", month: "May", testNumber: 1, takenCount: 4005, isPro: false },
    { id: "may-2", month: "May", testNumber: 2, takenCount: 2728, isPro: false },
    { id: "jun-1", month: "June", testNumber: 1, takenCount: 8911, isPro: false },
    { id: "jun-2", month: "June", testNumber: 2, takenCount: 4054, isPro: false },
    { id: "jul-1", month: "July", testNumber: 1, takenCount: 18635, isPro: false },
    { id: "jul-2", month: "July", testNumber: 2, takenCount: 8453, isPro: false },
    { id: "aug-1", month: "August", testNumber: 1, takenCount: 760, isPro: false },
    { id: "aug-2", month: "August", testNumber: 2, takenCount: 299, isPro: false },
    { id: "sep-1", month: "September", testNumber: 1, takenCount: 2478, isPro: false },
    { id: "sep-2", month: "September", testNumber: 2, takenCount: 936, isPro: false },
];

export default function SpeakingPage() {
    const [showAll, setShowAll] = useState(false);
    const visibleTests = showAll ? SPEAKING_TESTS : SPEAKING_TESTS.slice(0, 8); // Show first 4 rows (8 cards) initially

    return (
        <DashboardLayout
            title="Speaking Practice"
            description="Master IELTS Speaking with our latest practice tests."
        >
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

                {/* --- Left Column: Main Content --- */}
                <div className="flex-1 min-w-0">

                    {/* Header Card with Book Cover */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                        {/* Book Cover Placeholder */}
                        <div className="flex-shrink-0 w-40 h-56 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 text-center transform -rotate-3 border-l-4 border-slate-700 relative group transition-transform hover:rotate-0 hover:scale-105 duration-500">
                            <div className="absolute top-0 left-2 w-1 h-full bg-white/10" />
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight mb-2">IELTS<br />PRACTICE TEST</h3>
                            <div className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest">Speaking Edition</div>

                            {/* Lighting Glint */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>

                        {/* Title Section */}
                        <div className="flex-1 text-center md:text-left pt-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                                IELTS Speaking Practice Tests
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Practice with the latest actual speaking test questions. Each test includes Part 1, Part 2, and Part 3 topics.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-current" /> 18+ Tests
                                </div>
                                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Updated Weekly
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <AnimatePresence>
                            {visibleTests.map((test) => (
                                <motion.button
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={test.id}
                                    className="bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 rounded-xl p-5 text-left transition-all group shadow-sm hover:shadow-md flex flex-col justify-between h-28"
                                >
                                    <div>
                                        <h4 className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {test.month} Speaking Practice Test {test.testNumber}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                                        <span className="text-sm text-slate-500 font-medium">
                                            {test.takenCount.toLocaleString()} tests taken
                                        </span>
                                    </div>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Show All Toggle */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium transition-colors px-6 py-3 rounded-full hover:bg-slate-100"
                        >
                            {showAll ? (
                                <>View less <ChevronUp className="w-4 h-4" /></>
                            ) : (
                                <>View all tests <ChevronDown className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>

                </div>

                {/* --- Right Column: Sidebar Promo --- */}
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">

                    {/* Upgrade Promo Card */}
                    <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl sticky top-24">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/30 shadow-inner">
                                <Globe className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-6">Unlock Full Potential</h3>

                            <ul className="text-left space-y-3 mb-8 text-orange-50 text-sm font-medium">
                                <li className="flex items-start gap-2">
                                    <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                    <span>Bite-Sized Lessons and Exercises</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                    <span>Learn Anytime, Anywhere</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                    <span>Instant AI Feedback</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                    <span>Save 90% Compared to In-Person Classes</span>
                                </li>
                            </ul>

                            <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg flex items-center justify-center gap-2 group">
                                Learn more
                                <span className="bg-orange-600 text-white rounded text-[10px] px-1 py-0.5 group-hover:scale-110 transition-transform">+</span>
                            </button>
                        </div>
                    </div>
                </aside>

            </div>
        </DashboardLayout>
    );
}
