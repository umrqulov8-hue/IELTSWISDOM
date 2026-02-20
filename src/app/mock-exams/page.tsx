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
            borderColor: "border-[#52C3F1]",
            iconColor: "text-[#0091CF]",
            iconBg: "bg-cyan-50",
            btnColor: "bg-[#008CC9] hover:bg-[#007AB0]",
            shadowColor: "shadow-cyan-200"
        },
        reading: {
            icon: BookOpen,
            borderColor: "border-[#25BFA2]",
            iconColor: "text-[#00965E]",
            iconBg: "bg-emerald-50",
            btnColor: "bg-[#00965E] hover:bg-[#007F50]",
            shadowColor: "shadow-emerald-200"
        },
        writing: {
            icon: Pencil,
            borderColor: "border-[#FFB76B]",
            iconColor: "text-[#F05A28]",
            iconBg: "bg-orange-50",
            btnColor: "bg-[#F05A28] hover:bg-[#D4481C]",
            shadowColor: "shadow-orange-200"
        }
    };

    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            <div className="max-w-6xl mx-auto space-y-10">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Actual Tests <span className="text-[#00A651]">to Academic Library</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">Actual Tests Academic collections for three skills.</p>
                </motion.div>

                {/* --- Tests List --- */}
                <div className="space-y-6">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-2 mb-6 border-l-[3px] border-[#00A651] pl-3 h-6">
                                <h2 className="text-lg font-bold text-slate-700">
                                    {test.title}
                                </h2>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
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
                                            whileHover={{ scale: 1.02 }}
                                            className={cn(
                                                "rounded-2xl border bg-white p-6 flex flex-col items-center gap-6 h-full min-h-[300px] relative transition-colors duration-300",
                                                config.borderColor,
                                                // Specific hover shadows handled by Tailwind group-hover logic if needed, but motion handles scale
                                                "hover:shadow-2xl hover:shadow-black/5"
                                            )}
                                        >
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                className={cn("p-4 rounded-2xl mb-2", config.iconBg)}
                                            >
                                                <config.icon className={cn("w-6 h-6", config.iconColor)} strokeWidth={2} />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-slate-700 font-medium text-center text-[15px]">
                                                {section.title}
                                            </h3>

                                            {/* Animated Progress Circle */}
                                            <div className="relative w-12 h-12 flex items-center justify-center my-auto">
                                                <svg className="absolute w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        stroke="#F1F5F9"
                                                        strokeWidth="3"
                                                        fill="transparent"
                                                    />
                                                    <motion.circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        fill="transparent"
                                                        strokeDasharray={125}
                                                        strokeDashoffset={125} // Start empty
                                                        animate={{ strokeDashoffset: 125 - (125 * section.progress) / 100 }}
                                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                        className={cn(section.progress > 0 ? config.iconColor : "text-transparent")}
                                                    />
                                                </svg>
                                                <span className="text-[10px] font-bold text-slate-400">0%</span>
                                            </div>

                                            {/* Action Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={cn(
                                                    "w-full py-3 rounded-lg text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-auto overflow-hidden relative group",
                                                    section.status === "upgrade"
                                                        ? "bg-[#1E293B] border border-[#0F172A] text-[#FFC107]" // Dark button with gold text
                                                        : config.btnColor
                                                )}
                                            >
                                                {/* Shimmer Effect */}
                                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                                                {section.status === "upgrade" ? (
                                                    <>
                                                        <Lock className="w-3.5 h-3.5" /> Upgrade to Pro
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-3.5 h-3.5 fill-current" /> Take Test
                                                    </>
                                                )}
                                            </motion.button>

                                            {/* Bottom decorative dots */}
                                            <div className="flex gap-2 mt-2">
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                                                    className="w-3 h-3 rounded-full bg-slate-100"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                                                    className="w-3 h-3 rounded-full bg-slate-100"
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Pagination --- */}
                <div className="flex justify-center items-center gap-2 pb-12">
                    <button className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[1, 2, 3, 4, 5, 6].map((page) => (
                        <motion.button
                            key={page}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-colors border",
                                currentPage === page
                                    ? "bg-[#1E293B] border-[#1E293B] text-white"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {page}
                        </motion.button>
                    ))}
                    <button className="h-9 px-4 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

            </div>
        </DashboardLayout>
    );
}
