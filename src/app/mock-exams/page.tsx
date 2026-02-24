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
            // Solid vibrant blue gradient for the circular icon background
            circleBg: "bg-gradient-to-br from-[#1ea2e6] to-[#016baa]",
            iconColor: "text-white"
        },
        reading: {
            icon: BookOpen,
            // Solid vibrant green gradient
            circleBg: "bg-gradient-to-br from-[#2ed184] to-[#01904a]",
            iconColor: "text-white"
        },
        writing: {
            icon: Pencil,
            // Solid vibrant orange gradient
            circleBg: "bg-gradient-to-br from-[#fc9b44] to-[#d65f04]",
            iconColor: "text-white"
        }
    };

    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Liquid milky background */}
            <div className="absolute inset-0 bg-[#f4f7f9] overflow-hidden -z-20">
                {/* Simulated liquid ripples in the background using large blurred shapes */}
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white opacity-60 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-white opacity-80 blur-[120px]" />
                <div className="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-[#e8eef3] opacity-50 blur-[80px]" />
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
                    <p className="text-[#8492a6] text-[13px] md:text-sm mt-2 font-medium">Actual Tests Academic collections for three skills</p>
                </motion.div>

                {/* --- Tests List --- */}
                <div className="space-y-10">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
                            className="rounded-3xl p-6 md:p-8 relative overflow-hidden"
                            style={{
                                // Frosted glass outer panel
                                background: "rgba(251, 252, 253, 0.7)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                border: "1px solid rgba(255,255,255,0.9)",
                                boxShadow: "0 10px 40px rgba(180, 195, 210, 0.2), inset 0 2px 5px rgba(255,255,255,1)"
                            }}
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-8 ml-2 border-l-[3px] border-[#2ebc82] pl-3 h-5">
                                <h2 className="text-[17px] font-semibold text-[#1f2937]">
                                    {test.title}
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1 }
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
                                                hidden: { opacity: 0, scale: 0.95 },
                                                show: { opacity: 1, scale: 1 }
                                            }}
                                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                            className="rounded-[28px] p-6 md:p-8 flex flex-col items-center relative transition-all duration-300"
                                            style={{
                                                // Glossy liquid inner card
                                                background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,248,252,0.8))",
                                                border: "1px solid rgba(255,255,255,1)",
                                                boxShadow: "0 12px 30px rgba(190, 205, 220, 0.25), inset 0 4px 15px rgba(255,255,255,0.9), inset 0 -4px 10px rgba(230, 240, 250, 0.4)"
                                            }}
                                        >
                                            {/* Top soft highlight curve (glass reflection) */}
                                            <div className="absolute top-2 left-2 right-2 h-1/3 bg-gradient-to-b from-white to-transparent opacity-60 rounded-t-[20px] pointer-events-none" />

                                            {/* Vibrant 3D Circular Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className={cn(
                                                    "w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10",
                                                    config.circleBg
                                                )}
                                                style={{
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.15)"
                                                }}
                                            >
                                                {/* Top bright highlight on the circle itself */}
                                                <div className="absolute top-0.5 inset-x-2 h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />
                                                <config.icon className={cn("w-6 h-6 z-10 drop-shadow-sm", config.iconColor)} strokeWidth={2} />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-[#374151] font-medium text-[13px] tracking-wide mb-5">
                                                {section.title}
                                            </h3>

                                            {/* Progress Info Ring (replacing animated SVG with the simple circle from the image) */}
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 relative"
                                                style={{
                                                    background: "linear-gradient(135deg, #fdfefe, #edf1f6)",
                                                    boxShadow: "inset 0 3px 6px rgba(180, 195, 210, 0.2), 0 2px 5px rgba(255,255,255,0.8)"
                                                }}
                                            >
                                                <span className="text-[10px] font-bold text-[#6b7280]">0%</span>
                                                {/* Small partial colored ring indicator if progress > 0 */}
                                                {section.progress > 0 && (
                                                    <svg className="absolute w-full h-full transform -rotate-90">
                                                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none"
                                                            strokeDasharray={113} strokeDashoffset={113 - (113 * section.progress) / 100}
                                                            className={cn("opacity-40", SECTION_CONFIG[section.type].iconColor.replace('text-white', 'text-current text-[#4fc490]'))}
                                                        />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* "Take Test" Milky Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-[80%] py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 relative overflow-hidden group mb-3"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,245,250,0.4))",
                                                    border: "1px solid rgba(255,255,255,0.8)",
                                                    boxShadow: "0 6px 16px rgba(180, 195, 210, 0.25), inset 0 3px 6px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(210, 220, 235, 0.3)",
                                                    color: "#4b5563" // slate-600
                                                }}
                                            >
                                                {/* Milky highlight wave */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none rounded-full" />

                                                {section.status === "upgrade" ? (
                                                    <>
                                                        <Lock className="w-3.5 h-3.5 relative z-10" strokeWidth={2} /> <span className="relative z-10">Upgrade</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-[11px] h-[11px] fill-[#4b5563] relative z-10" /> <span className="relative z-10 tracking-wide mt-0.5">Take Test</span>
                                                    </>
                                                )}
                                            </motion.button>

                                            {/* Two faint dots below button */}
                                            <div className="flex gap-1.5 opacity-30 mt-1">
                                                <div className="w-[5px] h-[5px] rounded-full bg-slate-400" />
                                                <div className="w-[5px] h-[5px] rounded-full bg-slate-400" />
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
