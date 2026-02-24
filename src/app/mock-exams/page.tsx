"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MOCK_TESTS = [
    {
        id: "ac-1",
        title: "Academic Mock Test 1",
        type: "academic",
        description: "Complete Academic IELTS test covering all four skills.",
        listTitle: "TEST COMPONENTS:",
        listItems: [
            "Listening: 40 questions (30 min)",
            "Reading: 40 questions (60 min)",
            "Writing: 2 tasks (60 min)",
            "Speaking: 3 parts (11-14 min)",
        ],
        theme: {
            // Cyan to Yellow-Orange card background like the left card in the user's reference
            cardBg: "from-[#6beae5] via-[#a2f0c7] to-[#ffe68d]",
            titleColor: "text-[#0f172a]",
            textColor: "text-[#1e293b]",
            badge1: "bg-[#10b981] shadow-[0_4px_10px_rgba(16,185,129,0.3)] text-white", // Green
            badge2: "bg-[#0ea5e9] shadow-[0_4px_10px_rgba(14,165,233,0.3)] text-white"  // Blue
        }
    },
    {
        id: "ac-2",
        title: "Academic Mock Test 2",
        type: "academic",
        description: "Second complete Academic test with different topics.",
        listTitle: "TEST FEATURES:",
        listItems: [
            "New topics and questions",
            "Band score prediction",
            "Detailed answer explanations",
            "Performance analytics",
        ],
        theme: {
            // Orange to Crimson card background like the right card in the user's reference
            cardBg: "from-[#ff9f6b] via-[#ff6a5a] to-[#ff2a5f]",
            titleColor: "text-[#0f172a]",
            textColor: "text-white",
            badge1: "bg-[#10b981] shadow-[0_4px_10px_rgba(16,185,129,0.3)] text-white", // Green
            badge2: "bg-[#0ea5e9] shadow-[0_4px_10px_rgba(14,165,233,0.3)] text-white"  // Blue
        }
    },
    {
        id: "gt-1",
        title: "General Training Mock Test 1",
        type: "general",
        description: "Complete General Training test for work and migration.",
        listTitle: "TEST COMPONENTS:",
        listItems: [
            "Listening: 40 questions (30 min)",
            "Reading: 40 questions (60 min)",
            "Writing: 2 tasks (60 min)",
            "Speaking: 3 parts (11-14 min)",
        ],
        theme: {
            cardBg: "from-[#6beae5] via-[#a2f0c7] to-[#ffe68d]",
            titleColor: "text-[#0f172a]",
            textColor: "text-[#1e293b]",
            badge1: "bg-[#10b981] shadow-[0_4px_10px_rgba(16,185,129,0.3)] text-white",
            badge2: "bg-[#0ea5e9] shadow-[0_4px_10px_rgba(14,165,233,0.3)] text-white"
        }
    },
    {
        id: "gt-2",
        title: "General Training Mock Test 2",
        type: "general",
        description: "Second complete General Training test with varied content.",
        listTitle: "TEST FEATURES:",
        listItems: [
            "New topics and questions",
            "Band score prediction",
            "Detailed answer explanations",
            "Performance analytics",
        ],
        theme: {
            cardBg: "from-[#ff9f6b] via-[#ff6a5a] to-[#ff2a5f]",
            titleColor: "text-[#0f172a]",
            textColor: "text-white",
            badge1: "bg-[#10b981] shadow-[0_4px_10px_rgba(16,185,129,0.3)] text-white",
            badge2: "bg-[#0ea5e9] shadow-[0_4px_10px_rgba(14,165,233,0.3)] text-white"
        }
    }
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Available Mock Tests"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* 
              The solid cream background specifically requested by the user from the second image.
            */}
            <div className="absolute inset-0 bg-[#fdf5eb] overflow-hidden -z-20"></div>

            <div className="max-w-[1150px] mx-auto px-4 md:px-8 space-y-10 relative z-10 pt-6 pb-20">

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-10 pl-5 border-l-[4px] border-[#0f172a]">
                    <h2 className="text-[28px] font-black text-[#0f172a] tracking-tight">
                        Available Mock Tests
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 60 }}
                            className={cn(
                                "relative rounded-[32px] p-8 lg:p-10 flex flex-col overflow-hidden group bg-gradient-to-br",
                                test.theme.cardBg
                            )}
                            style={{
                                // Deep precise drop shadows and frosted white top border
                                borderTop: "2px solid rgba(255, 255, 255, 0.6)",
                                borderLeft: "2px solid rgba(255, 255, 255, 0.4)",
                                boxShadow: `
                                    inset 4px 4px 20px rgba(255, 255, 255, 0.4),
                                    inset -4px -4px 20px rgba(0, 0, 0, 0.05),
                                    0 25px 50px -12px rgba(0, 0, 0, 0.15)
                                `
                            }}
                        >
                            {/* Inner ambient shine to enhance crystalline highlights */}
                            <div className="absolute top-[-30%] left-[-20%] w-[150%] h-[70%] bg-gradient-to-b from-white/60 to-transparent -rotate-[15deg] pointer-events-none rounded-full blur-[2px] opacity-70 group-hover:from-white/80 transition-all duration-700" />

                            <div className="relative z-10">
                                {/* Title */}
                                <h3 className={cn("text-[26px] font-black mb-6 tracking-tight drop-shadow-sm", test.theme.titleColor)}>
                                    {test.title}
                                </h3>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <span className={cn("text-[12px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase border border-white/40", test.theme.badge1)}>
                                        FULL TEST
                                    </span>
                                    <span className={cn("text-[12px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase border border-white/40", test.theme.badge2)}>
                                        3 HOURS
                                    </span>
                                </div>

                                {/* Description */}
                                <p className={cn("text-[15px] mb-8 font-bold leading-relaxed opacity-95", test.theme.textColor)}>
                                    {test.description}
                                </p>

                                {/* List Section */}
                                <h4 className={cn("font-black text-[13px] mb-4 tracking-widest uppercase", test.theme.textColor)}>
                                    {test.listTitle}
                                </h4>
                                <ul className={cn("list-disc pl-[20px] text-[15px] font-bold space-y-3 mb-12 opacity-95", test.theme.textColor)}>
                                    {test.listItems.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Push button to bottom */}
                            <div className="mt-auto relative z-10 w-full">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full text-[#0f172a] font-black py-[16px] rounded-[18px] flex items-center justify-center gap-3 transition-all text-[16px] bg-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:drop-shadow-[0_12px_25px_rgba(0,0,0,0.15)]"
                                >
                                    <Play className="w-[20px] h-[20px] fill-[#0f172a]" strokeWidth={3} />
                                    <span className="tracking-widest uppercase">Start Test</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
