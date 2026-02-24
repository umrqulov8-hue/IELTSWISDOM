"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, List } from "lucide-react";
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
            border: "border-[#6ea8fe]",
            titleText: "text-[#208a8a]",
            topBg: "bg-[#fdf8f0]",
            buttonBg: "bg-[#188069]",
            buttonHover: "hover:bg-[#126b56]"
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
            border: "border-[#6ea8fe]",
            titleText: "text-[#208a8a]",
            topBg: "bg-[#fdf8f0]",
            buttonBg: "bg-[#188069]",
            buttonHover: "hover:bg-[#126b56]"
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
            border: "border-[#75c689]",
            titleText: "text-[#28a745]",
            topBg: "bg-[#fdf8f0]",
            buttonBg: "bg-[#188069]",
            buttonHover: "hover:bg-[#126b56]"
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
            border: "border-[#75c689]",
            titleText: "text-[#28a745]",
            topBg: "bg-[#fdf8f0]",
            buttonBg: "bg-[#188069]",
            buttonHover: "hover:bg-[#126b56]"
        }
    }
];

export default function MockExamsPage() {
    return (
        <DashboardLayout
            title="Practice Exams"
            description="Take full mock exams and improve your performance."
        >
            {/* Clean white background for the whole page */}
            <div className="absolute inset-0 bg-white -z-20"></div>

            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10 w-full mb-20">

                <div className="text-center mb-10">
                    <p className="text-[#64748b] text-[15px] font-medium tracking-wide">
                        improve your performance.
                    </p>
                </div>

                {/* Main Container */}
                <div className="bg-white rounded-xl overflow-hidden mb-16"
                    style={{
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                    }}
                >

                    {/* Header */}
                    <div className="bg-[#1b8a71] px-5 py-3.5 flex items-center gap-3 text-white">
                        <List className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        <h2 className="text-[16px] font-bold tracking-wide">Available Mock Tests</h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="p-4 md:p-6 lg:p-8 border border-t-0 border-gray-100 rounded-b-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {MOCK_TESTS.map((test, index) => (
                                <motion.div
                                    key={test.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={cn("rounded-xl border flex flex-col overflow-hidden bg-white", test.theme.border)}
                                >
                                    {/* Top Section */}
                                    <div className={cn("px-6 py-5 border-b border-[#e2e8f0]", test.theme.topBg)}>
                                        <h3 className={cn("text-[20px] font-bold mb-3 font-serif tracking-tight", test.theme.titleText)}>
                                            {test.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-[#1b8a71] text-white text-[11px] font-bold px-3 py-1.5 rounded-[5px] tracking-wide uppercase">
                                                Full Test
                                            </span>
                                            <span className="bg-[#12b8b6] text-white text-[11px] font-bold px-3 py-1.5 rounded-[5px] tracking-wide uppercase">
                                                3 Hours
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-[#475569] text-[13px] mb-6 font-medium leading-relaxed">
                                            {test.description}
                                        </p>

                                        <h4 className="font-bold text-[#1e293b] text-[12px] mb-3 tracking-wider uppercase">
                                            {test.listTitle}
                                        </h4>
                                        <ul className="list-disc pl-[18px] text-[13px] text-[#475569] font-medium space-y-1.5 mb-10">
                                            {test.listItems.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto">
                                            <button className={cn("w-full text-white font-semibold py-[12px] rounded-lg flex items-center justify-center gap-2 transition-colors text-[14px]", test.theme.buttonBg, test.theme.buttonHover)}>
                                                <PlayCircle className="w-5 h-5" strokeWidth={2} />
                                                Start Test
                                            </button>
                                            <button className="w-full text-center text-[#64748b] hover:text-[#334155] text-[12px] mt-4 font-semibold transition-colors">
                                                View Sample Answers
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
