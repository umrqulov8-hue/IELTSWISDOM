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
            // A beautiful blue frosted glass look
            cardBg: "from-[#6eb3f7] to-[#4b9dec] shadow-[0_8px_32px_rgba(75,157,236,0.3)]",
            badge1: "bg-emerald-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]",
            badge2: "bg-teal-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
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
            cardBg: "from-[#6eb3f7] to-[#4b9dec] shadow-[0_8px_32px_rgba(75,157,236,0.3)]",
            badge1: "bg-emerald-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]",
            badge2: "bg-teal-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
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
            // A beautiful warm peachy/orange frosted glass look
            cardBg: "from-[#fdae73] to-[#f9883f] shadow-[0_8px_32px_rgba(249,136,63,0.3)]",
            badge1: "bg-orange-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]",
            badge2: "bg-cyan-500/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
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
            cardBg: "from-[#fdae73] to-[#f9883f] shadow-[0_8px_32px_rgba(249,136,63,0.3)]",
            badge1: "bg-orange-400/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]",
            badge2: "bg-cyan-500/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
        }
    }
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Available Mock Tests"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Pure white background as requested */}
            <div className="absolute inset-0 bg-white -z-20"></div>

            <div className="max-w-[1100px] mx-auto px-4 md:px-8 space-y-8 relative z-10 pt-4 pb-16">

                {/* Section Header */}
                <div className="flex items-center gap-2 mb-6 ml-2 border-l-[3.5px] border-[#2ebc82] pl-3 h-[24px]">
                    <h2 className="text-[19px] font-bold text-[#111827] tracking-tight">
                        Available Mock Tests
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {MOCK_TESTS.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
                            className={cn(
                                "relative rounded-3xl p-8 flex flex-col overflow-hidden text-white backdrop-blur-xl bg-gradient-to-br",
                                test.theme.cardBg
                            )}
                            style={{
                                // Deep glassmorphism styling
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                boxShadow: `
                                    inset 0 2px 20px rgba(255, 255, 255, 0.4),
                                    inset 0 -2px 20px rgba(0, 0, 0, 0.05),
                                    0 20px 40px -10px rgba(0, 0, 0, 0.1)
                                `
                            }}
                        >
                            {/* Inner ambient shine to enhance the highly glossy look */}
                            <div className="absolute top-[-30%] left-[-20%] w-[120%] h-[60%] bg-gradient-to-b from-white/40 to-transparent -rotate-12 pointer-events-none rounded-full blur-2xl" />

                            <div className="relative z-10">
                                {/* Title */}
                                <h3 className="text-[24px] font-extrabold mb-4 tracking-tight drop-shadow-md">
                                    {test.title}
                                </h3>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <span className={cn("text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase border border-white/40 drop-shadow-sm", test.theme.badge1)}>
                                        FULL TEST
                                    </span>
                                    <span className={cn("text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase border border-white/40 drop-shadow-sm", test.theme.badge2)}>
                                        3 HOURS
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-white/90 text-[14px] mb-6 font-medium leading-relaxed drop-shadow-sm">
                                    {test.description}
                                </p>

                                {/* List Section */}
                                <h4 className="font-extrabold text-white text-[12px] mb-3 tracking-widest uppercase drop-shadow-sm opacity-90">
                                    {test.listTitle}
                                </h4>
                                <ul className="list-disc pl-[18px] text-[14px] text-white/95 font-medium space-y-2 mb-10 drop-shadow-sm">
                                    {test.listItems.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Push button to bottom */}
                            <div className="mt-auto relative z-10 w-full px-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full text-white font-bold py-[14px] rounded-2xl flex items-center justify-center gap-2 transition-all text-[15px] bg-white/20 hover:bg-white/30 backdrop-blur-md"
                                    style={{
                                        border: "1px solid rgba(255, 255, 255, 0.6)",
                                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                                    }}
                                >
                                    <Play className="w-[18px] h-[18px] fill-white/80" strokeWidth={2.5} />
                                    <span className="tracking-wide">Start Test</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
