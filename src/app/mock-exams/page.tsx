"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, ChevronLeft, ChevronRight, Headphones, BookOpen, Pencil, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface MockTestSection {
    id: string;
    type: "listening" | "reading" | "writing";
    title: string;
    progress: number; // 0 to 100
    status: "start" | "continue" | "completed" | "upgrade";
}

interface MockTest {
    id: string;
    title: string;
    sections: [MockTestSection, MockTestSection, MockTestSection];
}

// --- Mock Data ---
const MOCK_TESTS: MockTest[] = [
    {
        id: "test-1",
        title: "Actual Test 1",
        sections: [
            { id: "t1-l", type: "listening", title: "Listening Test 1 AC", progress: 0, status: "start" },
            { id: "t1-r", type: "reading", title: "Reading Test 1 AC", progress: 0, status: "start" },
            { id: "t1-w", type: "writing", title: "Writing Test 1 AC", progress: 0, status: "start" },
        ]
    },
    {
        id: "test-2",
        title: "Actual Test 2",
        sections: [
            { id: "t2-l", type: "listening", title: "Listening Test 2 AC", progress: 0, status: "start" },
            { id: "t2-r", type: "reading", title: "Reading Test 2 AC", progress: 0, status: "start" },
            { id: "t2-w", type: "writing", title: "Writing Test 2 AC", progress: 0, status: "start" },
        ]
    },
    {
        id: "test-3",
        title: "Actual Test 3",
        sections: [
            { id: "t3-l", type: "listening", title: "Listening Test 3 AC", progress: 0, status: "upgrade" },
            { id: "t3-r", type: "reading", title: "Reading Test 3 AC", progress: 0, status: "upgrade" },
            { id: "t3-w", type: "writing", title: "Writing Test 3 AC", progress: 0, status: "upgrade" },
        ]
    },
    {
        id: "test-4",
        title: "Actual Test 4",
        sections: [
            { id: "t4-l", type: "listening", title: "Listening Test 4 AC", progress: 0, status: "upgrade" },
            { id: "t4-r", type: "reading", title: "Reading Test 4 AC", progress: 0, status: "upgrade" },
            { id: "t4-w", type: "writing", title: "Writing Test 4 AC", progress: 0, status: "upgrade" },
        ]
    },
    {
        id: "test-5",
        title: "Actual Test 5",
        sections: [
            { id: "t5-l", type: "listening", title: "Listening Test 5 AC", progress: 0, status: "upgrade" },
            { id: "t5-r", type: "reading", title: "Reading Test 5 AC", progress: 0, status: "upgrade" },
            { id: "t5-w", type: "writing", title: "Writing Test 5 AC", progress: 0, status: "upgrade" },
        ]
    },
];

export default function MockExamsPage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Config for each section type
    const SECTION_CONFIG = {
        listening: {
            icon: Headphones,
            circleBg: "bg-gradient-to-br from-[#128ace] to-[#04619b]",
            iconColor: "text-white"
        },
        reading: {
            icon: BookOpen,
            circleBg: "bg-gradient-to-br from-[#20b268] to-[#097b3d]",
            iconColor: "text-white"
        },
        writing: {
            icon: Pencil,
            circleBg: "bg-gradient-to-br from-[#e88127] to-[#b75005]",
            iconColor: "text-white"
        }
    };

    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Clean, uniform background to fix color harmony issues */}
            <div className="absolute inset-0 bg-[#f8fafc] overflow-hidden -z-20">
                {/* Subtle top gradient just to give a tiny bit of depth, not jarring */}
                <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#e2e8f0]/30 to-transparent pointer-events-none" />
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-12 relative z-10 pt-4 pb-16">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-[#111827] flex justify-center gap-2 flex-wrap">
                        Actual Tests <span className="text-[#2ebc82]">to Academic Library</span>
                    </h1>
                    <p className="text-[#8492a6] text-[13px] md:text-sm mt-3 font-medium">Actual Tests Academic collections for three skills</p>
                </motion.div>

                {/* --- Tests List --- */}
                <div className="space-y-12">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 40 }}
                            className="rounded-[32px] p-6 lg:p-10 relative overflow-hidden bg-white"
                            style={{
                                // Tighter, more defined shadow for the main container
                                boxShadow: "0 10px 40px rgba(140, 160, 190, 0.15), 0 2px 10px rgba(140, 160, 190, 0.05)"
                            }}
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-10 ml-2 border-l-[3.5px] border-[#2ebc82] pl-3.5 h-[24px] relative z-10">
                                <h2 className="text-[19px] font-extrabold text-[#111827] tracking-tight">
                                    {test.title}
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.15 }
                                    }
                                }}
                                initial="hidden"
                                animate="show"
                            >
                                {test.sections.map((section) => {
                                    const config = SECTION_CONFIG[section.type];
                                    return (
                                        <motion.div
                                            key={section.id}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.95, y: 20 },
                                                show: { opacity: 1, scale: 1, y: 0 }
                                            }}
                                            whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                                            className="rounded-[28px] p-6 lg:p-8 flex flex-col items-start relative transition-all duration-500 bg-white group h-full"
                                            style={{
                                                // Tighter, crisp edge shadow to make the card POP without glaring
                                                boxShadow: "0 8px 24px rgba(149, 157, 165, 0.15), 0 2px 8px rgba(149, 157, 165, 0.05)",
                                                border: "1px solid rgba(240, 244, 248, 1)"
                                            }}
                                        >
                                            {/* Top badges row */}
                                            <div className="flex items-center justify-between w-full mb-8">
                                                <div className="px-3.5 py-1 rounded-full border border-[#b4eed3] bg-[#f0fbf6] text-[#22c55e] text-[11px] font-bold tracking-widest uppercase">
                                                    {section.status === 'upgrade' ? 'PRO' : 'FREE'}
                                                </div>

                                                {/* Optional Progress pill if there's progress, mimicking the blue tag in the image */}
                                                {section.progress > 0 && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b82f6] text-white text-[11px] font-bold tracking-wide">
                                                        <span className="w-3 h-3 flex justify-center items-center border border-white rounded-full">
                                                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                        </span>
                                                        {section.progress}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-[#1e293b] font-extrabold text-[17px] leading-[1.3] mb-4 pr-4">
                                                {section.title}
                                            </h3>

                                            {/* NEW Badge */}
                                            <div className="mb-auto pb-8">
                                                <div className="inline-block px-2.5 py-0.5 rounded-md border border-[#ffcdd2] bg-[#fff0f2] text-[#ff4d4f] text-[10px] font-bold tracking-widest uppercase">
                                                    NEW
                                                </div>
                                            </div>

                                            {/* Start Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full mt-4 py-3.5 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-3 relative overflow-hidden transition-colors"
                                                style={{
                                                    backgroundColor: "#0f172a", // Dark navy/black
                                                    color: "#ffffff" // White text
                                                }}
                                            >
                                                {section.status === "upgrade" ? (
                                                    <>
                                                        <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                        <span className="tracking-wide">Upgrade</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Simple white circular dot like the image */}
                                                        <div className="w-3.5 h-3.5 bg-[#e2e8f0] rounded-full" />
                                                        <span className="tracking-wide">Start</span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Pagination --- */}
                <div className="flex justify-center items-center gap-2 pb-14 pt-4">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-all shadow-sm">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <motion.button
                            key={page}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all shadow-sm",
                                currentPage === page
                                    ? "bg-slate-800 border-transparent text-white shadow-md shadow-slate-300"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            )}
                        >
                            {page}
                        </motion.button>
                    ))}
                    <span className="text-slate-400 px-1">...</span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(83)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 text-sm font-bold transition-all shadow-sm"
                    >
                        83
                    </motion.button>
                    <button className="h-10 px-5 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 text-sm transition-all shadow-sm gap-1 ml-1">
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </DashboardLayout>
    );
}
