"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, PlayCircle, Clock, CheckCircle2, ChevronRight, Lock, Search, Filter, Sparkles, FileText, BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Types ---
interface TestCategory {
    id: string;
    title: string;
    count: number;
    icon?: any;
}

type WritingMode = "all" | "academic" | "general";
type WritingTaskType = "all" | "task-1" | "task-2" | "full-test";

interface TestItem {
    id: string;
    mode: "academic" | "general";
    taskType: "task-1" | "task-2" | "full-test";
    title: string;
    subtitle?: string;
    duration: string;
    status: "free" | "premium";
    isNew?: boolean;
}

// --- Mock Data ---
const CATEGORIES = [
    { id: "all", title: "All Tests", count: 42 },
    { id: "academic", title: "Academic", count: 28, icon: GraduationCap },
    { id: "general", title: "General Training", count: 14, icon: Briefcase },
];

const TESTS: TestItem[] = [
    // Feb 11 Tests - FULL TEST (NEW)
    { id: "feb11-full", mode: "academic", taskType: "full-test", title: "February 11 Test", subtitle: "Full Academic Writing Test", duration: "60 min", status: "free", isNew: true },

    // Feb 15.1 Tests - FULL TEST (NEW)
    { id: "feb15-1-full", mode: "academic", taskType: "full-test", title: "February 15.1 Test", subtitle: "Full Academic Writing Test", duration: "60 min", status: "free", isNew: true },

    // Feb 15 Tests - FULL TEST (NEW)
    { id: "feb15-full", mode: "academic", taskType: "full-test", title: "February 15 Test", subtitle: "Full Academic Writing Test", duration: "60 min", status: "free", isNew: true },

    // Feb 16 Tests - FULL TEST
    { id: "feb16-full", mode: "academic", taskType: "full-test", title: "February 16 Test", subtitle: "Full Academic Writing Test", duration: "60 min", status: "free", isNew: true },


    // Cambridge 20 Academic
    // { id: "c20-ac-t4-t2", mode: "academic", taskType: "task-2", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 4 (Task 2)", duration: "40 min", status: "free", isNew: true },
    // { id: "c20-ac-t4-t1", mode: "academic", taskType: "task-1", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 4 (Task 1)", duration: "20 min", status: "free", isNew: true },
    // { id: "c20-ac-t4-full", mode: "academic", taskType: "full-test", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 4", duration: "60 min", status: "free", isNew: true },

    // { id: "c20-ac-t3-t2", mode: "academic", taskType: "task-2", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 3 (Task 2)", duration: "40 min", status: "free", isNew: true },
    // { id: "c20-ac-t3-t1", mode: "academic", taskType: "task-1", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 3 (Task 1)", duration: "20 min", status: "free", isNew: true },
    // { id: "c20-ac-t3-full", mode: "academic", taskType: "full-test", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 3", duration: "60 min", status: "free", isNew: true },

    // { id: "c20-ac-t2-t2", mode: "academic", taskType: "task-2", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 2 (Task 2)", duration: "40 min", status: "free" },
    // { id: "c20-ac-t2-t1", mode: "academic", taskType: "task-1", title: "Cambridge IELTS 20", subtitle: "Academic Writing Test 2 (Task 1)", duration: "20 min", status: "free" },

    // // Cambridge 20 General
    // { id: "c20-gt-t1-t2", mode: "general", taskType: "task-2", title: "Cambridge IELTS 20", subtitle: "General Writing Test 1 (Task 2)", duration: "40 min", status: "free" },
    // { id: "c20-gt-t1-t1", mode: "general", taskType: "task-1", title: "Cambridge IELTS 20", subtitle: "General Writing Test 1 (Task 1)", duration: "20 min", status: "free" },

    // // Older Tests
    // { id: "c19-ac-t1-full", mode: "academic", taskType: "full-test", title: "Cambridge IELTS 19", subtitle: "Academic Writing Test 1", duration: "60 min", status: "free" },
    // { id: "c19-gt-t1-full", mode: "general", taskType: "full-test", title: "Cambridge IELTS 19", subtitle: "General Writing Test 1", duration: "60 min", status: "free" },
];


export default function WritingPage() {
    const [selectedMode, setSelectedMode] = useState<WritingMode>("all");
    const [selectedTaskType, setSelectedTaskType] = useState<WritingTaskType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTests = TESTS.filter(test => {
        const matchesMode = selectedMode === "all" || test.mode === selectedMode;
        const matchesTaskType = selectedTaskType === "all" || test.taskType === selectedTaskType;
        const matchesSearch =
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (test.subtitle && test.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesMode && matchesTaskType && matchesSearch;
    });

    return (
        <DashboardLayout
            title="Writing Practice"
            description="Master your essay structure and vocabulary with our extensive library."
        >
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Background Blobs for Red Aesthetic */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-300/20 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-red-300/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-[80px]" />
                </div>

                {/* --- Sidebar Filters --- */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search writing tests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 backdrop-blur-md border border-rose-100 text-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all shadow-[0_4px_20px_rgba(244,63,94,0.05)] placeholder:text-rose-300/70"
                        />
                    </motion.div>

                    {/* Mode Filter */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 p-4 space-y-2 lg:sticky lg:top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-rose-100/50">
                            <Filter className="w-4 h-4 text-rose-600" />
                            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Test Mode</span>
                        </div>

                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedMode(category.id as WritingMode)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                                    selectedMode === category.id
                                        ? "text-rose-700 shadow-md shadow-rose-500/10"
                                        : "hover:bg-rose-50/50 text-slate-600 hover:text-rose-800"
                                )}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    {category.icon ? (
                                        <category.icon className={cn("w-4 h-4", selectedMode === category.id ? "text-rose-600" : "text-slate-400 group-hover:text-rose-500")} />
                                    ) : (
                                        <div className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            selectedMode === category.id ? "bg-rose-500 scale-125 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : "bg-slate-300 group-hover:bg-rose-300"
                                        )} />
                                    )}
                                    <span className={cn("transition-colors", selectedMode === category.id && "font-semibold")}>
                                        {category.title}
                                    </span>
                                </div>
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-lg text-[10px] bg-white/50 border font-bold relative z-10 transition-colors",
                                    selectedMode === category.id
                                        ? "border-rose-200 text-rose-600 bg-white"
                                        : "border-transparent text-slate-400 group-hover:bg-white group-hover:border-rose-100 group-hover:text-rose-400"
                                )}>
                                    {category.count}
                                </span>

                                {selectedMode === category.id && (
                                    <motion.div
                                        layoutId="activeMode"
                                        className="absolute inset-0 bg-gradient-to-r from-rose-100 via-pink-50 to-rose-50 z-0"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* Task Type Filter */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 p-4 space-y-3 lg:sticky lg:top-[22rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
                    >
                        <label className="text-xs font-bold text-rose-400 uppercase tracking-wider px-2">Task Type</label>
                        <select
                            value={selectedTaskType}
                            onChange={(e) => setSelectedTaskType(e.target.value as WritingTaskType)}
                            className="w-full bg-white/50 border border-rose-100 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all cursor-pointer"
                        >
                            <option value="all">All Task Types</option>
                            <option value="task-1">Task 1 (Report/Letter)</option>
                            <option value="task-2">Task 2 (Essay)</option>
                            <option value="full-test">Full Test</option>
                        </select>

                        <button className="w-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2">
                            <Filter className="w-4 h-4" /> Apply Filter
                        </button>
                    </motion.div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 min-w-0">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 p-8 md:p-10 mb-10 shadow-[0_20px_50px_rgba(225,29,72,0.3)] group"
                    >
                        {/* Animated Mesh Gradient Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Pencil className="w-80 h-80 text-white transform translate-x-20 -translate-y-20 rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                        </div>

                        <div className="relative z-10 text-white max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <Pencil className="w-3 h-3 text-rose-200" /> Writing Workshop
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Writing Excellence</h2>
                            <p className="text-rose-100 text-lg leading-relaxed font-light">
                                Perfect your essay structure, coherence, and vocabulary with our extensive library of Academic and General Training tasks.
                            </p>
                        </div>
                    </motion.div>

                    {/* Test Sections */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                Available Tests <span className="text-sm font-normal text-slate-400">({filteredTests.length})</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            <AnimatePresence mode="popLayout">
                                {filteredTests.map((test, index) => (
                                    <motion.div
                                        key={test.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-1 border border-white/60 hover:border-rose-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)] transition-all duration-500 relative hover:-translate-y-1"
                                    >
                                        <div className="bg-white/50 rounded-[1.2rem] p-6 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-rose-50/30 transition-colors duration-500">

                                            {/* Top Metadata */}
                                            <div className="flex justify-between items-start mb-4 relative z-10">
                                                <div className="flex flex-col gap-1">
                                                    <span className={cn(
                                                        "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border w-fit",
                                                        test.taskType === "task-1"
                                                            ? "bg-sky-50/80 border-sky-100 text-sky-600"
                                                            : test.taskType === "task-2"
                                                                ? "bg-purple-50/80 border-purple-100 text-purple-600"
                                                                : "bg-orange-50/80 border-orange-100 text-orange-600"
                                                    )}>
                                                        {test.taskType === "task-1" ? "Task 1" : test.taskType === "task-2" ? "Task 2" : "Full Test"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {test.isNew && (
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white shadow-sm shadow-rose-500/20 animate-pulse">
                                                            NEW
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold bg-slate-100/50 px-2 py-1 rounded-lg">
                                                        <Clock className="w-3 h-3" /> {test.duration}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="mb-6 relative z-10">
                                                <h4 className="font-bold text-rose-600 text-sm uppercase tracking-wide mb-1">
                                                    {test.title}
                                                </h4>
                                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-rose-700 transition-colors line-clamp-2">
                                                    {test.subtitle}
                                                </h3>
                                            </div>

                                            {/* Action Button */}
                                            <div className="mt-auto relative z-10">
                                                <Link href={`/practice/writing/${test.id}`} className={cn(
                                                    "w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden ring-1 ring-white/20",
                                                    test.status === "free"
                                                        ? "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-rose-500/30"
                                                        : "bg-slate-900 text-white hover:bg-slate-800 group-hover:shadow-slate-500/30"
                                                )}>

                                                    {test.status === "premium" ? (
                                                        <>
                                                            <Lock className="w-3.5 h-3.5 opacity-80 relative z-10" />
                                                            <span className="relative z-10">Premium Access</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Pencil className="w-3.5 h-3.5 fill-current opacity-90 relative z-10" />
                                                            <span className="relative z-10">Take Test</span>
                                                        </>
                                                    )}
                                                </Link>
                                            </div>

                                            {/* Decoration Blob */}
                                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-rose-500/20 transition-all duration-700 pointer-events-none" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredTests.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200"
                            >
                                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Search className="w-8 h-8 text-rose-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No writing tests found</h3>
                                <p className="text-slate-400">Try searching for something else or clear filters.</p>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
