"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Search, Hash, Clock, BookOpen, Layers, Lock, ChevronRight, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MOCK_TESTS = [
    {
        id: "t1",
        series: "IELTS TRAINER 1",
        title: "IELTS Trainer 1, Test 1",
        time: "30 min",
        sections: "4 Sections",
        questions: "40 Questions",
        difficulty: "Medium",
        isFree: true,
        borderColor: "border-[#4a55f5]"
    },
    {
        id: "t2",
        series: "IELTS TRAINER 1",
        title: "IELTS Trainer 1, Test 2",
        time: "28 min",
        sections: "4 Sections",
        questions: "40 Questions",
        difficulty: "Medium",
        isFree: true,
        borderColor: "border-[#4a55f5]"
    },
    {
        id: "t3",
        series: "IELTS TRAINER 1",
        title: "IELTS Trainer 1, Test 3",
        time: "31 min",
        sections: "4 Sections",
        questions: "40 Questions",
        difficulty: "Hard",
        isFree: true,
        borderColor: "border-[#4a55f5]"
    },
    {
        id: "t4",
        series: "IELTS TRAINER 1",
        title: "IELTS Trainer 1, Test 4",
        time: "29 min",
        sections: "4 Sections",
        questions: "40 Questions",
        difficulty: "Medium",
        isFree: true,
        borderColor: "border-[#4a55f5]"
    }
];

const CATEGORIES = [
    { label: "All Tests", count: 29, active: true },
    { label: "Free Authentic", count: 4, active: false },
    { label: "IELTS Trainer 1", count: 6, active: false },
    { label: "IELTS Trainer 2", count: 6, active: false },
    { label: "Test Plus 3", count: 7, active: false },
    { label: "Premium Tests", count: 15, active: false, locked: true },
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Listening Studio"
            description="Master IELTS Listening with authentic Cambridge tests."
        >
            {/* Background identical to the image (subtle soft gradients) */}
            <div className="absolute inset-0 bg-[#f8f9fc] overflow-hidden -z-20">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#fff0e6] opacity-60 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#e6f0ff] opacity-60 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8 relative z-10 pt-4 pb-16">

                {/* --- Big Purple Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-gradient-to-r from-[#321c71] to-[#4c2b9b] rounded-[24px] p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-900/10"
                >
                    {/* Subtle dot pattern overlay could go here */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        {/* Left Side Info */}
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase mb-6">
                                <span className="text-[#facc15]">#</span> IELTS Academic
                            </div>

                            <h1 className="text-4xl md:text-[42px] font-extrabold mb-4 tracking-tight drop-shadow-sm">
                                Listening Studio
                            </h1>
                            <p className="text-white/80 text-[15px] leading-relaxed max-w-md font-medium">
                                Train with real Cambridge exam audio. 4 sections - 40 questions per test. All accents covered.
                            </p>
                        </div>

                        {/* Right Side Stats */}
                        <div className="flex items-center gap-8 md:gap-12 text-center">
                            <div>
                                <div className="text-3xl font-bold tracking-tight mb-1">29</div>
                                <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Total Tests</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight mb-1">160+</div>
                                <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Hours Audio</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight mb-1">40Q</div>
                                <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Per Test</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- Search Bar --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                >
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                    <input
                        type="text"
                        placeholder="Search tests..."
                        className="w-full bg-white border border-[#e2e8f0] rounded-full py-4 pl-14 pr-6 text-[15px] font-medium text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent shadow-sm"
                    />
                </motion.div>

                {/* --- Filter Pills --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-3"
                >
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={i}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm",
                                cat.active
                                    ? "bg-[#8b5cf6] text-white border border-transparent shadow-md shadow-violet-500/20"
                                    : "bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#cbd5e1] hover:bg-slate-50"
                            )}
                        >
                            {cat.locked && <Lock className="w-3.5 h-3.5 text-[#94a3b8]" />}
                            {cat.label}
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-md text-[10px] bg-black/5",
                                cat.active ? "bg-white/20 text-white" : "text-[#64748b] bg-[#f1f5f9]"
                            )}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* --- Test Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 pt-4">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                            className={cn(
                                "bg-white rounded-[24px] p-6 lg:p-7 relative transition-all shadow-sm flex flex-col items-start border-t-4",
                                test.borderColor
                            )}
                            style={{
                                boxShadow: "0 10px 30px rgba(148, 163, 184, 0.1), 0 1px 3px rgba(148, 163, 184, 0.05)",
                                borderLeft: "1px solid rgba(226, 232, 240, 0.6)",
                                borderRight: "1px solid rgba(226, 232, 240, 0.6)",
                                borderBottom: "1px solid rgba(226, 232, 240, 0.6)"
                            }}
                        >
                            {/* Top Row: Icon + Title + Free badge */}
                            <div className="flex items-start justify-between w-full mb-6 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-[52px] h-[52px] rounded-2xl bg-[#4a55f5] flex items-center justify-center shrink-0 shadow-sm">
                                        <Headphones className="w-6 h-6 text-white" strokeWidth={2.2} />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-[#94a3b8] tracking-widest uppercase mb-1">
                                            {test.series}
                                        </div>
                                        <h3 className="text-[17px] font-extrabold text-[#1e293b] tracking-tight">
                                            {test.title}
                                        </h3>
                                    </div>
                                </div>
                                {test.isFree && (
                                    <div className="px-3 py-1 bg-[#f0fdf4] border border-[#bbf7d0] text-[#22c55e] rounded-full text-[10px] font-bold tracking-widest uppercase shrink-0">
                                        Free
                                    </div>
                                )}
                            </div>

                            {/* Meta Info Pills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#64748b] bg-[#f8fafc] text-[12px] font-semibold">
                                    <Clock className="w-3.5 h-3.5" />
                                    {test.time}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#64748b] bg-[#f8fafc] text-[12px] font-semibold">
                                    <Layers className="w-3.5 h-3.5" />
                                    {test.sections}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#64748b] bg-[#f8fafc] text-[12px] font-semibold">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    {test.questions}
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold",
                                    test.difficulty === 'Medium'
                                        ? "bg-[#fffbeb] border-[#fde68a] text-[#d97706]"
                                        : "bg-[#fef2f2] border-[#fecaca] text-[#ef4444]"
                                )}>
                                    {test.difficulty}
                                </div>
                            </div>

                            {/* Start Practice Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#0f172a" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-[14px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2.5 transition-colors bg-[#1e293b] text-white mt-auto shadow-md"
                            >
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-80" />
                                <span className="tracking-wide">Start Practice</span>
                                <ChevronRight className="w-4 h-4 text-white/70" strokeWidth={3} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
