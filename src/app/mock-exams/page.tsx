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
        ]
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
        ]
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
        ]
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
        ]
    }
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Available Mock Tests"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* 
              Intensely saturated cyan-to-orange liquid background.
              We use a base gradient and large blurred orbs to create the "liquid" color depth.
            */}
            <div className="absolute inset-0 overflow-hidden -z-20 bg-gradient-to-br from-[#00ebff] via-[#ff9500] to-[#ff2a5f]">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00ffff] rounded-full mix-blend-overlay filter blur-[100px] opacity-80 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#ff0055] rounded-full mix-blend-overlay filter blur-[120px] opacity-80 animate-pulse-slow"></div>
            </div>

            <div className="max-w-[1150px] mx-auto px-4 md:px-8 space-y-10 relative z-10 pt-6 pb-20">

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-10 pl-5 border-l-[4px] border-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                    <h2 className="text-[28px] font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
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
                            className="relative rounded-[32px] p-8 lg:p-10 flex flex-col overflow-hidden text-white backdrop-blur-2xl bg-white/10 group"
                            style={{
                                // Razor-sharp crystalline edges, less hazy (bg-white/10 is very transparent), deep precise drop shadows
                                borderTop: "1.5px solid rgba(255, 255, 255, 0.9)",
                                borderLeft: "1.5px solid rgba(255, 255, 255, 0.6)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.15)",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                boxShadow: `
                                    inset 2px 2px 15px rgba(255, 255, 255, 0.3),
                                    inset -2px -2px 15px rgba(0, 0, 0, 0.1),
                                    0 30px 60px -15px rgba(0, 0, 0, 0.5)
                                `
                            }}
                        >
                            {/* Inner ambient shine to enhance crystalline highlights */}
                            <div className="absolute top-[-30%] left-[-20%] w-[150%] h-[70%] bg-gradient-to-b from-white/50 to-transparent -rotate-[15deg] pointer-events-none rounded-full blur-[2px] opacity-70 group-hover:from-white/70 transition-all duration-700" />

                            <div className="relative z-10">
                                {/* Title */}
                                <h3 className="text-[28px] font-black mb-6 tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                                    {test.title}
                                </h3>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <span className="bg-[#10b981] text-white text-[13px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase border border-white/50 shadow-[0_8px_20px_rgba(16,185,129,0.8)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                                        FULL TEST
                                    </span>
                                    <span className="bg-[#0ea5e9] text-white text-[13px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase border border-white/50 shadow-[0_8px_20px_rgba(14,165,233,0.8)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                                        3 HOURS
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-white text-[16px] mb-8 font-bold leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] opacity-95">
                                    {test.description}
                                </p>

                                {/* List Section */}
                                <h4 className="font-black text-white text-[14px] mb-4 tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                                    {test.listTitle}
                                </h4>
                                <ul className="list-disc pl-[20px] text-[16px] text-white font-bold space-y-3 mb-12 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] opacity-95">
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
                                    className="w-full text-[#0f172a] font-black py-[18px] rounded-[20px] flex items-center justify-center gap-3 transition-all text-[17px] bg-white drop-shadow-[0_10px_25px_rgba(255,255,255,0.4)]"
                                >
                                    <Play className="w-[22px] h-[22px] fill-[#0f172a]" strokeWidth={3} />
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
