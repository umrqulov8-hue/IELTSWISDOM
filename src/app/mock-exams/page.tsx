"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Search, Filter, ArrowUpDown, ChevronUp, ChevronDown, Users, FileText, ChevronRight, Clock, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All Tests", "OneIELTS", "Cambridge"];

// Mock data structured for accordion
const SERIES_DATA = [
    {
        id: "s-13",
        title: "OneIELTS Series - 13",
        iconBg: "bg-[#7d1436]", // Dark red/maroon
        iconTextTop: "OneIELTS",
        iconTextBottom: "Series 13",
        participants: "20708 participants",
        completed: "0 of 4 Test completed",
        isExpandedDefault: true,
        tests: [
            { id: "t1", title: "Mock Test - 01", isFree: true, difficulty: "Medium", users: 12214, time: "2h 45m" },
            { id: "t2", title: "Mock Test - 02", isFree: false, difficulty: "Medium", users: 3840, time: "2h 45m" },
            { id: "t3", title: "Mock Test - 03", isFree: false, difficulty: "Medium", users: 1064, time: "2h 45m" },
            { id: "t4", title: "Mock Test - 04", isFree: false, difficulty: "Medium", users: 876, time: "2h 45m" },
        ]
    },
    {
        id: "c-20",
        title: "Cambridge Book - 20",
        iconBg: "bg-[#183a73]", // Navy blue
        iconTextTop: "IELTS",
        iconTextBottom: "Cambridge 20",
        participants: "12745 participants",
        completed: "0 of 4 Test completed",
        isExpandedDefault: false,
        tests: [
            { id: "c1", title: "Mock Test - 01", isFree: true, difficulty: "Hard", users: 5400, time: "2h 45m" },
            { id: "c2", title: "Mock Test - 02", isFree: false, difficulty: "Medium", users: 4300, time: "2h 45m" },
            { id: "c3", title: "Mock Test - 03", isFree: false, difficulty: "Medium", users: 4100, time: "2h 45m" },
            { id: "c4", title: "Mock Test - 04", isFree: false, difficulty: "Hard", users: 3800, time: "2h 45m" },
        ]
    },
    {
        id: "c-19",
        title: "Cambridge Book - 19",
        iconBg: "bg-[#183a73]",
        iconTextTop: "IELTS",
        iconTextBottom: "Cambridge 19",
        participants: "2870 participants",
        completed: "0 of 4 Test completed",
        isExpandedDefault: false,
        tests: []
    }
];

export default function MockExamsPage() {
    const [activeTab, setActiveTab] = useState("All Tests");
    const [expandedSeries, setExpandedSeries] = useState<string[]>(
        SERIES_DATA.filter(s => s.isExpandedDefault).map(s => s.id)
    );

    const toggleSeries = (id: string) => {
        setExpandedSeries(prev =>
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    return (
        <DashboardLayout
            title="Mock Exams"
            description="Access our comprehensive library of IELTS mock tests."
        >
            <div className="absolute inset-0 bg-white -z-20"></div>

            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 pb-20 space-y-6">

                {/* Search & Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]" />
                        <input
                            type="text"
                            placeholder="Search test title and press Enter"
                            className="w-full bg-white border border-[#e5e7eb] rounded-xl py-3 pl-12 pr-4 text-[14px] text-[#374151] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-[#d1d5db] transition-colors"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto shrink-0">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#e5e7eb] px-5 py-3 rounded-xl text-[14px] text-[#4b5563] font-medium hover:bg-gray-50 transition-colors">
                            Filters <Filter className="w-[15px] h-[15px] text-[#6b7280]" />
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#e5e7eb] px-5 py-3 rounded-xl text-[14px] text-[#4b5563] font-medium hover:bg-gray-50 transition-colors">
                            Sort By <ArrowUpDown className="w-[15px] h-[15px] text-[#6b7280]" />
                        </button>
                    </div>
                </div>

                {/* Tabs Row */}
                <div className="bg-[#f4f5f7] p-1.5 rounded-xl flex items-center gap-1 overflow-x-auto no-scrollbar border border-[#f3f4f6]">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={cn(
                                "px-6 py-2 rounded-lg text-[14px] font-medium transition-all whitespace-nowrap",
                                activeTab === cat
                                    ? "bg-white text-[#111827] shadow-sm ring-1 ring-black/5"
                                    : "text-[#6b7280] hover:text-[#374151] hover:bg-black/5"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Series List */}
                <div className="space-y-4 pt-4">
                    {SERIES_DATA.map((series) => {
                        const isExpanded = expandedSeries.includes(series.id);

                        return (
                            <div key={series.id} className="bg-white border border-[#f3f4f6] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300">
                                {/* Accordion Header */}
                                <div
                                    className="p-5 md:p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                                    onClick={() => toggleSeries(series.id)}
                                >
                                    <div className="flex items-center gap-5">
                                        {/* Logo Box */}
                                        <div className={cn("w-[66px] h-[66px] rounded-[18px] flex flex-col items-center justify-center text-white shrink-0 overflow-hidden relative shadow-sm", series.iconBg)}>
                                            <div className="text-[11px] font-semibold leading-tight z-10 mb-0.5">{series.iconTextTop}</div>
                                            <div className="flex gap-1 items-center justify-center font-bold text-[10px] bg-black/10 px-1 py-0.5 rounded z-10">
                                                <span>{series.iconTextBottom.split(' ')[0]}</span>
                                                <span className="text-[12px] opacity-100">{series.iconTextBottom.split(' ')[1]}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-[18px] font-bold text-[#1f2937] mb-2 tracking-tight">
                                                {series.title}
                                            </h2>
                                            <div className="flex items-center gap-5 text-[13px] text-[#6b7280]">
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-[#9ca3af]" />
                                                    {series.participants}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FileText className="w-4 h-4 text-[#9ca3af]" />
                                                    {series.completed}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] bg-white transition-colors hover:bg-gray-50 hover:text-gray-600">
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                </div>

                                {/* Accordion Body (Tests Grid) */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-6 pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                                                {series.tests.map((test) => (
                                                    <div
                                                        key={test.id}
                                                        className="group relative border border-[#e5e7eb] rounded-xl p-5 hover:border-[#3b82f6] hover:shadow-sm transition-all cursor-pointer bg-white"
                                                    >
                                                        {/* Top right floating badge */}
                                                        {test.isFree && (
                                                            <div className="absolute top-0 right-6 -translate-y-[1px] bg-[#3b82f6] text-white px-3 py-[3px] rounded-b-md text-[11px] font-bold tracking-wide shadow-sm z-10 flex flex-col">
                                                                Free Scoring
                                                                <div className="absolute -left-[6px] top-0 w-[6px] h-full border-t border-[#3b82f6] bg-[#3b82f6]/10 rounded-tl-sm skew-x-[-15deg] origin-bottom hidden" />
                                                            </div>
                                                        )}

                                                        {/* Title */}
                                                        <h3 className="text-[15px] font-semibold text-[#374151] mb-6 mt-1 group-hover:text-[#3b82f6] transition-colors pr-24 tracking-tight">
                                                            {test.title}
                                                        </h3>

                                                        {/* Bottom Meta */}
                                                        <div className="flex items-center justify-between mt-auto">
                                                            <div className="flex items-center gap-5 text-[13px] text-[#6b7280] font-medium font-sans">
                                                                <div className="flex items-center gap-1.5 focus">
                                                                    <BarChart2 className="w-[14px] h-[14px] text-[#f59e0b] scale-x-[-1]" />
                                                                    {test.difficulty}
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Users className="w-[14px] h-[14px]" />
                                                                    {test.users}
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock className="w-[14px] h-[14px]" />
                                                                    {test.time}
                                                                </div>
                                                            </div>
                                                            <ChevronRight className="w-5 h-5 text-[#d1d5db] group-hover:text-[#3b82f6] transition-colors" />
                                                        </div>
                                                    </div>
                                                ))}
                                                {series.tests.length === 0 && (
                                                    <div className="col-span-1 md:col-span-2 text-center py-6 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                                                        No tests available in this series yet.
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
