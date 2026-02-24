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
            borderColor: "border-[#40c0e7]/40",
            iconColor: "text-[#008CC9]",
            // 3D glossy gradient background for the icon container
            iconBg: "bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_4px_10px_rgba(0,140,201,0.2)]",
            // Gradient button
            btnColor: "bg-gradient-to-r from-[#008CC9] to-[#00A9F4] hover:from-[#007AB0] hover:to-[#008CC9] shadow-[0_4px_12px_rgba(0,140,201,0.3)] text-white shadow-inner"
        },
        reading: {
            icon: BookOpen,
            borderColor: "border-[#25BFA2]/40",
            iconColor: "text-[#00965E]",
            iconBg: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_4px_10px_rgba(0,150,94,0.2)]",
            btnColor: "bg-gradient-to-r from-[#00965E] to-[#25BFA2] hover:from-[#007F50] hover:to-[#00965E] shadow-[0_4px_12px_rgba(0,150,94,0.3)] text-white shadow-inner"
        },
        writing: {
            icon: Pencil,
            borderColor: "border-[#F05A28]/40",
            iconColor: "text-[#D4481C]",
            iconBg: "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_4px_10px_rgba(240,90,40,0.2)]",
            btnColor: "bg-gradient-to-r from-[#F05A28] to-[#FF8C61] hover:from-[#D4481C] hover:to-[#F05A28] shadow-[0_4px_12px_rgba(240,90,40,0.3)] text-white shadow-inner"
        }
    };

    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Soft background gradient for the page */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100/50 -z-10" />

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 mt-4"
                >
                    <h1 className="text-3xl md:text-[2.75rem] font-black tracking-tight text-[#111827] leading-tight">
                        Actual Tests <span className="text-[#00A651]">to Academic Library</span>
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base mt-3 font-medium">Actual Tests Academic collections for three skills.</p>
                </motion.div>

                {/* --- Tests List --- */}
                <div className="space-y-8">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
                            className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
                        >
                            {/* Subtle inner top highlight */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

                            {/* Section Header */}
                            <div className="flex items-center gap-2 mb-8 border-l-[4px] border-[#0091CF] pl-4 h-7">
                                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                                    {test.title}
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
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
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            className={cn(
                                                "rounded-[20px] border bg-white p-6 md:p-8 flex flex-col items-center gap-6 h-full relative transition-all duration-300",
                                                config.borderColor,
                                                "shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]",
                                                "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:rounded-[20px] before:pointer-events-none"
                                            )}
                                        >
                                            {/* 3D Icon Container */}
                                            <motion.div
                                                whileHover={{ scale: 1.05, rotate: [-2, 2, 0] }}
                                                className={cn("p-5 rounded-2xl mb-2 relative", config.iconBg)}
                                            >
                                                {/* Inner top highlight for glass effect */}
                                                <div className="absolute top-0 inset-x-2 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-xl pointer-events-none" />
                                                <config.icon className={cn("w-7 h-7 relative z-10 drop-shadow-md", config.iconColor)} strokeWidth={2.5} />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-slate-800 font-bold text-center text-sm md:text-[15px] tracking-tight">
                                                {section.title}
                                            </h3>

                                            {/* Animated Progress Circle */}
                                            <div className="relative w-12 h-12 flex items-center justify-center my-2">
                                                <svg className="absolute w-full h-full transform -rotate-90 filter drop-shadow-sm">
                                                    {/* Background track */}
                                                    <circle
                                                        cx="24" cy="24" r="20"
                                                        stroke="#F1F5F9"
                                                        strokeWidth="3.5"
                                                        fill="transparent"
                                                    />
                                                    {/* Progress fill */}
                                                    <motion.circle
                                                        cx="24" cy="24" r="20"
                                                        stroke="currentColor"
                                                        strokeWidth="3.5"
                                                        fill="transparent"
                                                        strokeLinecap="round"
                                                        strokeDasharray={125}
                                                        strokeDashoffset={125}
                                                        animate={{ strokeDashoffset: 125 - (125 * section.progress) / 100 }}
                                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                        className={cn(section.progress > 0 ? config.iconColor : "text-[#E2E8F0]")}
                                                    />
                                                </svg>
                                                <span className="text-[9px] font-black text-slate-400">0%</span>
                                            </div>

                                            {/* Action Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={cn(
                                                    "w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-auto overflow-hidden relative group",
                                                    section.status === "upgrade"
                                                        ? "bg-gradient-to-r from-slate-800 to-slate-700 text-[#FFC107] border border-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.15)]"
                                                        : cn(config.btnColor, "border border-black/5")
                                                )}
                                            >
                                                {/* Shimmer Effect */}
                                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />

                                                {section.status === "upgrade" ? (
                                                    <>
                                                        <Lock className="w-3.5 h-3.5 opacity-90" strokeWidth={2.5} /> <span className="tracking-wide">Upgrade to Pro</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-4 h-4 fill-current drop-shadow-sm" /> <span className="tracking-wide">Take Test</span>
                                                    </>
                                                )}
                                            </motion.button>

                                            {/* Soft dots indicator */}
                                            <div className="flex gap-1.5 mt-1 opacity-60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
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
