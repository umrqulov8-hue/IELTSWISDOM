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
            circleBg: "bg-gradient-to-br from-[#1ea2e6] to-[#016baa]",
            iconColor: "text-white"
        },
        reading: {
            icon: BookOpen,
            circleBg: "bg-gradient-to-br from-[#2ed184] to-[#01904a]",
            iconColor: "text-white"
        },
        writing: {
            icon: Pencil,
            circleBg: "bg-gradient-to-br from-[#fc9b44] to-[#d65f04]",
            iconColor: "text-white"
        }
    };

    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Liquid milky background - softer now */}
            <div className="absolute inset-0 bg-[#f7f9fc] overflow-hidden -z-20">
                <div className="absolute top-[-15%] left-[-10%] w-[70vw] h-[70vw] rounded-[40%] bg-white opacity-80 blur-[80px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-[45%] bg-white opacity-90 blur-[100px]" />
                <div className="absolute top-[20%] left-[50%] w-[50vw] h-[50vw] rounded-full bg-[#eef2f6] opacity-50 blur-[90px]" />
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-12 relative z-10 pt-4 pb-16">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-[#111827] flex justify-center gap-2 flex-wrap drop-shadow-sm">
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
                            className="rounded-[32px] p-6 md:p-8 relative overflow-hidden"
                            style={{
                                // Much softer outer panel
                                background: "rgba(252, 253, 255, 0.7)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,255,255,0.8)",
                                // Reduced shadow spread and opacity drastically
                                boxShadow: "10px 10px 30px rgba(180, 195, 215, 0.15), -5px -5px 20px rgba(255,255,255,0.8), inset 0 2px 4px rgba(255,255,255,0.9)"
                            }}
                        >
                            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-[32px]" />

                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-10 ml-2 border-l-[3.5px] border-[#2ebc82] pl-3.5 h-[22px] relative z-10">
                                <h2 className="text-[18px] font-bold text-[#1f2937] tracking-tight">
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
                                            className="rounded-[36px] p-6 md:p-9 flex flex-col items-center relative transition-all duration-500 overflow-hidden group"
                                            style={{
                                                // Softer inner card
                                                background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.9) 100%)",
                                                border: "1px solid rgba(255,255,255,1)",
                                                // Extremely softened shadows to match the new image exactly
                                                boxShadow: `
                                                    6px 6px 16px rgba(180, 195, 215, 0.2), 
                                                    -6px -6px 16px rgba(255,255,255,1),
                                                    inset 2px 2px 5px rgba(255,255,255,1), 
                                                    inset -2px -2px 5px rgba(200, 210, 225, 0.15)
                                                `
                                            }}
                                        >
                                            <div className="absolute top-[-20%] left-[-10%] right-[-10%] h-[50%] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0)_70%)] opacity-60 pointer-events-none transform -skew-y-6" />

                                            {/* Vibrant 3D Circular Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className={cn(
                                                    "w-[60px] h-[60px] rounded-full flex items-center justify-center mb-6 relative z-10 transition-transform duration-300",
                                                    config.circleBg
                                                )}
                                                style={{
                                                    // Floating sphere look, slightly softer
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.15)"
                                                }}
                                            >
                                                <div className="absolute top-[2px] left-[15%] right-[15%] h-[40%] bg-gradient-to-b from-white/50 to-transparent rounded-full pointer-events-none" />
                                                <config.icon className={cn("w-[26px] h-[26px] z-10 drop-shadow-sm", config.iconColor)} strokeWidth={2.2} />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-[#374151] font-semibold text-[14px] tracking-wide mb-6 relative z-10">
                                                {section.title}
                                            </h3>

                                            {/* Progress Info Ring */}
                                            <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center mb-8 relative z-10"
                                                style={{
                                                    background: "#f4f7f9",
                                                    // Very soft sunken shadow
                                                    boxShadow: "inset 2px 2px 5px rgba(185, 200, 215, 0.3), inset -2px -2px 5px rgba(255,255,255,1), 0 1px 2px rgba(255,255,255,0.8)"
                                                }}
                                            >
                                                <span className="text-[11px] font-bold text-[#6b7280]">0%</span>
                                                {section.progress > 0 && (
                                                    <svg className="absolute w-full h-full transform -rotate-90">
                                                        <circle cx="23" cy="23" r="21" stroke="currentColor" strokeWidth="2.5" fill="none"
                                                            strokeDasharray={132} strokeDashoffset={132 - (132 * section.progress) / 100}
                                                            strokeLinecap="round"
                                                            className={cn("opacity-60", SECTION_CONFIG[section.type].iconColor.replace('text-white', 'text-current text-[#4fc490]'))}
                                                        />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* "Take Test" Milky Button (Pill) */}
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="w-[85%] py-3.5 rounded-full text-[13px] font-bold flex items-center justify-center gap-2 relative overflow-hidden z-10 bg-white"
                                                style={{
                                                    // Softer pill shadow
                                                    boxShadow: `
                                                        4px 4px 10px rgba(180, 195, 210, 0.15), 
                                                        -4px -4px 10px rgba(255,255,255,1), 
                                                        inset 0 2px 4px rgba(255,255,255,1), 
                                                        inset 0 -2px 4px rgba(200, 210, 225, 0.1)
                                                    `,
                                                    color: "#4b5563"
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-transparent opacity-80 rounded-full" />
                                                <div className="absolute -inset-x-[100%] top-0 bottom-0 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {section.status === "upgrade" ? (
                                                    <div className="flex items-center gap-1.5 relative z-10 pt-0.5">
                                                        <Lock className="w-[14px] h-[14px]" strokeWidth={2.5} /> <span>Upgrade</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 relative z-10 pt-0.5">
                                                        <Play className="w-3 h-3 fill-[#4b5563]" /> <span className="tracking-wide">Take Test</span>
                                                    </div>
                                                )}
                                            </motion.button>

                                            {/* Two faint debossed dots below button */}
                                            <div className="flex gap-2 opacity-40 mt-3 z-10 relative">
                                                <div className="w-[5px] h-[5px] rounded-full bg-[#cbd5e1]" style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1), 1px 1px 2px rgba(255,255,255,1)" }} />
                                                <div className="w-[5px] h-[5px] rounded-full bg-[#cbd5e1]" style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1), 1px 1px 2px rgba(255,255,255,1)" }} />
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
