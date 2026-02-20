"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, PlayCircle, Clock, BarChart3, ChevronRight, Lock, Search, Filter, Sparkles, Music } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface TestCategory {
    id: string;
    title: string;
    count: number;
    icon?: any;
}

interface TestItem {
    id: string;
    categoryId: string;
    title: string;
    duration: string;
    status: "free" | "premium" | "completed";
}

// --- Mock Data ---
const CATEGORIES: TestCategory[] = [
    { id: "all", title: "All Tests", count: 28 },
    { id: "trainer-1", title: "IELTS Trainer 1", count: 6 },
    { id: "trainer-2", title: "IELTS Trainer 2", count: 6 },
    { id: "test-plus-3", title: "Test Plus 3", count: 7 },
    { id: "authentic", title: "Free Authentic", count: 3 },
    { id: "premium", title: "Premium Tests", count: 15, icon: Lock },
];

const TESTS: TestItem[] = [
    // Trainer 1
    { id: "t1-1", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 1", duration: "30 min", status: "free" },
    { id: "t1-2", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 2", duration: "28 min", status: "free" },
    { id: "t1-3", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 3", duration: "31 min", status: "free" },
    { id: "t1-4", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 4", duration: "29 min", status: "free" },
    { id: "t1-5", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 5", duration: "30 min", status: "free" },
    { id: "t1-6", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 6", duration: "32 min", status: "free" },

    // Trainer 2
    { id: "t2-1", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 1", duration: "30 min", status: "free" },
    { id: "t2-2", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 2", duration: "30 min", status: "free" },
    { id: "t2-3", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 3", duration: "29 min", status: "free" },
    { id: "t2-4", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 4", duration: "31 min", status: "free" },
    { id: "t2-5", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 5", duration: "30 min", status: "free" },
    { id: "t2-6", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 6", duration: "30 min", status: "free" },

    // Test Plus 3
    { id: "tp3-1", categoryId: "test-plus-3", title: "Test Plus 3, Test 1", duration: "30 min", status: "free" },
    { id: "tp3-2", categoryId: "test-plus-3", title: "Test Plus 3, Test 2", duration: "30 min", status: "free" },
    { id: "tp3-3", categoryId: "test-plus-3", title: "Test Plus 3, Test 3", duration: "30 min", status: "free" },
    { id: "tp3-4", categoryId: "test-plus-3", title: "Test Plus 3, Test 4", duration: "30 min", status: "free" },

    // Authentic
    { id: "auth-1", categoryId: "authentic", title: "Authentic Test 1", duration: "30 min", status: "free" },
    { id: "auth-2", categoryId: "authentic", title: "Authentic Test 2", duration: "30 min", status: "free" },
    { id: "auth-3", categoryId: "authentic", title: "Authentic Test 3", duration: "30 min", status: "free" },
];


export default function ListeningPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTests = TESTS.filter(test => {
        const matchesCategory = selectedCategory === "all" || test.categoryId === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <DashboardLayout
            title="Listening Practice"
            description="Authentic audio materials with native speakers to improve your listening comprehension."
        >
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Background Blobs for Purple Aesthetic */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-300/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-[80px]" />
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
                            <Search className="h-4 w-4 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a listening test..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 backdrop-blur-md border border-purple-100 text-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all shadow-[0_4px_20px_rgba(168,85,247,0.05)] placeholder:text-purple-300/70"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 p-4 space-y-2 lg:sticky lg:top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-purple-100/50">
                            <Filter className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Collections</span>
                        </div>

                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                                    selectedCategory === category.id
                                        ? "text-purple-700 shadow-md shadow-purple-500/10"
                                        : "hover:bg-purple-50/50 text-slate-600 hover:text-purple-800"
                                )}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    {category.icon ? (
                                        <category.icon className={cn("w-4 h-4", selectedCategory === category.id ? "text-purple-600" : "text-slate-400 group-hover:text-purple-500")} />
                                    ) : (
                                        <div className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            selectedCategory === category.id ? "bg-purple-500 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "bg-slate-300 group-hover:bg-purple-300"
                                        )} />
                                    )}
                                    <span className={cn("transition-colors", selectedCategory === category.id && "font-semibold")}>
                                        {category.title}
                                    </span>
                                </div>
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-lg text-[10px] bg-white/50 border font-bold relative z-10 transition-colors",
                                    selectedCategory === category.id
                                        ? "border-purple-200 text-purple-600 bg-white"
                                        : "border-transparent text-slate-400 group-hover:bg-white group-hover:border-purple-100 group-hover:text-purple-400"
                                )}>
                                    {category.count}
                                </span>

                                {selectedCategory === category.id && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-100 via-fuchsia-50 to-purple-50 z-0"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 min-w-0">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 md:p-10 mb-10 shadow-[0_20px_50px_rgba(124,58,237,0.3)] group"
                    >
                        {/* Animated Mesh Gradient Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Headphones className="w-80 h-80 text-white transform translate-x-20 -translate-y-20 rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                        </div>

                        <div className="relative z-10 text-white max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-yellow-300" /> Premium Content
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Listening Studio</h2>
                            <p className="text-purple-100 text-lg leading-relaxed font-light">
                                Immerse yourself in authentic audio experiences. Master varying accents and complex dialogues with our high-fidelity listening tests.
                            </p>
                        </div>
                    </motion.div>

                    {/* Test Sections */}
                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {(selectedCategory === "all" ? CATEGORIES.filter(c => c.id !== "all") : CATEGORIES.filter(c => c.id === selectedCategory)).map((category, catIndex) => {
                                const categoryTests = filteredTests.filter(t => t.categoryId === category.id);
                                if (categoryTests.length === 0) return null;

                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-sm border border-purple-100 text-purple-600">
                                                {category.id.includes('trainer') ? <BarChart3 className="w-5 h-5" /> :
                                                    category.id.includes('plus') ? <Sparkles className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                    {category.title}
                                                </h3>
                                                <p className="text-sm text-slate-400 font-medium">{categoryTests.length} Tests Available</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                            {categoryTests.map((test, index) => (
                                                <motion.div
                                                    key={test.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                                    className="group bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-1 border border-white/60 hover:border-purple-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)] transition-all duration-500 relative hover:-translate-y-1"
                                                >
                                                    <div className="bg-white/50 rounded-[1.2rem] p-5 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-purple-50/30 transition-colors duration-500">

                                                        {/* Top Metadata */}
                                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                                            <span className={cn(
                                                                "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border",
                                                                test.status === "free"
                                                                    ? "bg-emerald-50/80 border-emerald-100 text-emerald-600"
                                                                    : "bg-amber-50/80 border-amber-100 text-amber-600"
                                                            )}>
                                                                {test.status === "free" ? "Free Access" : "Premium"}
                                                            </span>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-100/50 px-2.5 py-1.5 rounded-lg border border-slate-200/50">
                                                                <Clock className="w-3.5 h-3.5 text-purple-400" /> {test.duration}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="mb-6 relative z-10">
                                                            <h4 className="font-bold text-slate-800 text-lg group-hover:text-purple-700 transition-colors line-clamp-1 mb-1">
                                                                {test.title}
                                                            </h4>
                                                            <p className="text-xs text-slate-400 font-medium">Cambridge Official Materials</p>
                                                        </div>

                                                        {/* Action Button */}
                                                        <div className="mt-auto relative z-10">
                                                            <button className="w-full py-3.5 rounded-xl bg-slate-900 group-hover:bg-purple-600 text-white font-bold text-sm shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden">
                                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                                <PlayCircle className="w-4 h-4 fill-current opacity-90 relative z-10" />
                                                                <span className="relative z-10">Start Practice</span>
                                                                <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                                                            </button>
                                                        </div>

                                                        {/* Decoration Blob */}
                                                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredTests.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200"
                            >
                                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Search className="w-8 h-8 text-purple-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No tests found</h3>
                                <p className="text-slate-400">Try searching for something else or clear filters.</p>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
