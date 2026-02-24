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
            {/* Very clean minimalist background with subtle soft color blobs in corners like the image */}
            <div className="absolute inset-0 bg-[#f4f7fa] overflow-hidden -z-20">
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#fae8d4] opacity-40 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#dce8fa] opacity-60 blur-[100px]" />
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
                            className="rounded-[24px] p-6 md:p-8 relative overflow-hidden bg-white"
                            style={{
                                // Clean white panel, very soft wide drop shadow, no border, no inset
                                boxShadow: "0 15px 40px rgba(185, 200, 220, 0.4)"
                            }}
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-10 ml-2 border-l-[3.5px] border-[#2ebc82] pl-3.5 h-[22px] relative z-10">
                                <h2 className="text-[17px] font-bold text-[#1f2937] tracking-wider">
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
                                            className="rounded-[24px] p-6 md:p-9 flex flex-col items-center relative transition-all duration-500 bg-white group"
                                            style={{
                                                // Clean white card, slightly more pronounced but soft shadow
                                                boxShadow: "0 10px 30px rgba(185, 200, 220, 0.35)"
                                            }}
                                        >
                                            {/* Vibrant 3D Circular Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className={cn(
                                                    "w-[56px] h-[56px] rounded-full flex items-center justify-center mb-6 relative z-10 transition-transform duration-300",
                                                    config.circleBg
                                                )}
                                                style={{
                                                    // Soft drop shadow and a subtle inner highlight to keep it looking 3D like a pill
                                                    boxShadow: "0 8px 16px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.4)"
                                                }}
                                            >
                                                <div className="absolute top-[2px] left-[15%] right-[15%] h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />
                                                <config.icon className={cn("w-[24px] h-[24px] z-10 drop-shadow-sm", config.iconColor)} strokeWidth={2.2} />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-[#374151] font-semibold text-[13px] tracking-wide mb-6 relative z-10">
                                                {section.title}
                                            </h3>

                                            {/* Progress Info Ring - Small soft grey circle */}
                                            <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center mb-8 relative z-10 bg-[#f4f7f9]"
                                                style={{
                                                    boxShadow: "inset 2px 2px 4px rgba(185, 200, 215, 0.2), inset -2px -2px 4px rgba(255,255,255,1)"
                                                }}
                                            >
                                                <span className="text-[10px] font-bold text-[#6b7280]">0%</span>
                                                {section.progress > 0 && (
                                                    <svg className="absolute w-full h-full transform -rotate-90">
                                                        <circle cx="19" cy="19" r="17" stroke="currentColor" strokeWidth="2.5" fill="none"
                                                            strokeDasharray={106} strokeDashoffset={106 - (106 * section.progress) / 100}
                                                            strokeLinecap="round"
                                                            className={cn("opacity-60", SECTION_CONFIG[section.type].iconColor.replace('text-white', 'text-current text-[#4fc490]'))}
                                                        />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* "Take Test" Button (Soft White Pill) */}
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="w-[85%] py-3.5 rounded-full text-[12px] font-bold flex items-center justify-center gap-2 relative overflow-hidden z-10 bg-white"
                                                style={{
                                                    // Very soft drop shadow, clean white
                                                    boxShadow: "0 6px 15px rgba(185, 200, 220, 0.25)",
                                                    color: "#374151"
                                                }}
                                            >
                                                {section.status === "upgrade" ? (
                                                    <div className="flex items-center gap-1.5 pt-0.5">
                                                        <Lock className="w-[13px] h-[13px]" strokeWidth={2.5} /> <span className="tracking-wide">Upgrade</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 pt-0.5">
                                                        <Play className="w-2.5 h-2.5 fill-[#374151]" /> <span className="tracking-wide">Take Test</span>
                                                    </div>
                                                )}
                                            </motion.button>

                                            {/* Two faint debossed dots below button */}
                                            <div className="flex gap-1.5 opacity-30 mt-3 z-10 relative">
                                                <div className="w-[4px] h-[4px] rounded-full bg-[#cbd5e1]" />
                                                <div className="w-[4px] h-[4px] rounded-full bg-[#cbd5e1]" />
                                            </div>
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
