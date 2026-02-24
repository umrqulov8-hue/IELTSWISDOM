"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// --- Mock Data ---
const MOCK_TESTS = [
    {
        id: "ac-1",
        title: "Academic Mock Test 1",
        type: "academic",
        isFree: true,
        isNew: true,
        buttonText: "Start Test"
    },
    {
        id: "ac-2",
        title: "Academic Mock Test 2",
        type: "academic",
        isFree: true,
        isNew: true,
        buttonText: "Start Test"
    },
    {
        id: "gt-1",
        title: "General Training Mock Test 1",
        type: "general",
        isFree: true,
        isNew: false,
        buttonText: "Start Test"
    },
    {
        id: "gt-2",
        title: "General Training Mock Test 2",
        type: "general",
        isFree: true,
        isNew: false,
        buttonText: "Start Test"
    }
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Full Mock Exams"
            description="Experience the real IELTS test environment with our complete mock exams."
        >
            {/* Very clean minimalist background with subtle soft color blobs in corners like the image */}
            <div className="absolute inset-0 bg-[#f8fafc] overflow-hidden -z-20">
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

                {/* Cards Grid */}
                <div className="p-4 md:p-6 lg:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {MOCK_TESTS.map((section, index) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="rounded-[28px] p-6 lg:p-8 flex flex-col items-start relative transition-all duration-500 bg-white group h-full"
                                style={{
                                    // Tighter, crisp edge shadow to make the card POP without glaring
                                    boxShadow: "0 8px 24px rgba(149, 157, 165, 0.15), 0 2px 8px rgba(149, 157, 165, 0.05)",
                                    border: "1px solid rgba(240, 244, 248, 1)"
                                }}
                            >
                                {/* Top badges row */}
                                <div className="flex items-center justify-between w-full mb-8">
                                    {section.isFree && (
                                        <div className="px-3.5 py-1 rounded-full border border-[#b4eed3] bg-[#f0fbf6] text-[#22c55e] text-[11px] font-bold tracking-widest uppercase">
                                            FREE
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-[#1e293b] font-extrabold text-[17px] leading-[1.3] mb-4 pr-4">
                                    {section.title}
                                </h3>

                                {/* NEW Badge */}
                                <div className="mb-auto pb-8">
                                    {section.isNew ? (
                                        <div className="inline-block px-2.5 py-0.5 rounded-md border border-[#ffcdd2] bg-[#fff0f2] text-[#ff4d4f] text-[10px] font-bold tracking-widest uppercase">
                                            NEW
                                        </div>
                                    ) : (
                                        <div className="h-[22px]" /> // Spacer
                                    )}
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
                                    <div className="w-3.5 h-3.5 bg-[#e2e8f0] rounded-full" />
                                    <span className="tracking-wide">{section.buttonText}</span>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
