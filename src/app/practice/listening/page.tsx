"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Headphones,
    PlayCircle,
    Clock,
    Lock,
    Search,
    Sparkles,
    BookOpen,
    ChevronRight,
    CheckCircle,
    Mic2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

interface TestCategory {
    id: string;
    title: string;
    count: number;
    icon?: any;
    color: string;
}
interface TestItem {
    id: string;
    categoryId: string;
    title: string;
    duration: string;
    status: "free" | "premium" | "completed";
    difficulty?: "Easy" | "Medium" | "Hard";
    parts?: number;
}

const CATEGORIES: TestCategory[] = [
    { id: "all", title: "All Tests", count: 29, color: "from-violet-500 to-purple-600" },
    { id: "authentic", title: "Free Authentic", count: 4, color: "from-emerald-500 to-teal-600" },
    { id: "trainer-1", title: "IELTS Trainer 1", count: 6, color: "from-blue-500 to-indigo-600" },
    { id: "trainer-2", title: "IELTS Trainer 2", count: 6, color: "from-sky-500 to-blue-600" },
    { id: "test-plus-3", title: "Test Plus 3", count: 7, color: "from-orange-500 to-amber-600" },
    { id: "premium", title: "Premium Tests", count: 15, color: "from-rose-500 to-pink-600", icon: Lock },
];

const TESTS: TestItem[] = [
    { id: "t1-1", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 1", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t1-2", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 2", duration: "28 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t1-3", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 3", duration: "31 min", status: "free", difficulty: "Hard", parts: 4 },
    { id: "t1-4", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 4", duration: "29 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t1-5", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 5", duration: "30 min", status: "free", difficulty: "Easy", parts: 4 },
    { id: "t1-6", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 6", duration: "32 min", status: "free", difficulty: "Hard", parts: 4 },
    { id: "t2-1", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 1", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t2-2", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 2", duration: "30 min", status: "free", difficulty: "Easy", parts: 4 },
    { id: "t2-3", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 3", duration: "29 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t2-4", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 4", duration: "31 min", status: "free", difficulty: "Hard", parts: 4 },
    { id: "t2-5", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 5", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "t2-6", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 6", duration: "30 min", status: "free", difficulty: "Easy", parts: 4 },
    { id: "tp3-1", categoryId: "test-plus-3", title: "Test Plus 3, Test 1", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "tp3-2", categoryId: "test-plus-3", title: "Test Plus 3, Test 2", duration: "30 min", status: "free", difficulty: "Hard", parts: 4 },
    { id: "tp3-3", categoryId: "test-plus-3", title: "Test Plus 3, Test 3", duration: "30 min", status: "free", difficulty: "Easy", parts: 4 },
    { id: "tp3-4", categoryId: "test-plus-3", title: "Test Plus 3, Test 4", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "cambridge-11-test-1", categoryId: "authentic", title: "Cambridge IELTS 11, Test 1", duration: "32 min", status: "free", difficulty: "Hard", parts: 4 },
    { id: "auth-1", categoryId: "authentic", title: "Authentic Test 1", duration: "30 min", status: "free", difficulty: "Medium", parts: 4 },
    { id: "auth-2", categoryId: "authentic", title: "Authentic Test 2", duration: "30 min", status: "free", difficulty: "Easy", parts: 4 },
    { id: "auth-3", categoryId: "authentic", title: "Authentic Test 3", duration: "30 min", status: "free", difficulty: "Hard", parts: 4 },
];

const DIFF_COLORS: Record<string, string> = {
    Easy: "text-emerald-600 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-600 bg-amber-50 border-amber-200",
    Hard: "text-rose-600 bg-rose-50 border-rose-200",
};

export default function ListeningPage() {
    const { lang } = useLanguage();
    const D = T.listening;
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTests = TESTS.filter((test) => {
        const matchesCategory = selectedCategory === "all" || test.categoryId === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const activeCat = CATEGORIES.find((c) => c.id === selectedCategory)!;

    return (
        <DashboardLayout
            title={tx(D.title, lang)}
            description={tx(D.desc, lang)}
        >
            {/* ── Hero ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-br from-[#1a1060] via-[#2d1b8e] to-[#4c1d95] p-8 md:p-10 shadow-2xl"
            >
                {/* grid texture */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-yellow-300" />
                                IELTS Academic
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                            Listening Studio
                        </h1>
                        <p className="text-purple-200 text-base md:text-lg leading-relaxed max-w-xl">
                            Train with real Cambridge exam audio. 4 sections · 40 questions per test · All accents covered.
                        </p>
                    </div>
                    <div className="flex gap-5 md:flex-col md:text-right">
                        {[["29", "Total Tests"], ["160+", "Hours Audio"], ["40Q", "Per Test"]].map(([val, label]) => (
                            <div key={label} className="text-center md:text-right">
                                <div className="text-3xl font-black text-white">{val}</div>
                                <div className="text-purple-300 text-xs font-medium">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Search + Filter row ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={lang === 'uz' ? "Testlarni qidiring..." : "Search tests…"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 shadow-sm transition-all"
                    />
                </div>
            </div>

            {/* ── Category Pills ── */}
            <div className="flex gap-2 flex-wrap mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                            selectedCategory === cat.id
                                ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md`
                                : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"
                        )}
                    >
                        {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                        {cat.title}
                        <span className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                            selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        )}>
                            {cat.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* ── Test Grid ── */}
            <AnimatePresence mode="popLayout">
                {filteredTests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200"
                    >
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">
                            {lang === 'uz' ? "Testlar topilmadi" : "No tests found"}
                        </h3>
                        <p className="text-slate-400">
                            {lang === 'uz' ? "Boshqa so'z bilan qidiring yoki toifani o'zgartiring." : "Try different search or category."}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={selectedCategory + searchQuery}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {filteredTests.map((test, index) => (
                            <motion.div
                                key={test.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.04 }}
                                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Card top accent */}
                                <div className={`h-1.5 w-full bg-gradient-to-r ${activeCat.id === "all"
                                    ? CATEGORIES.find(c => c.id === test.categoryId)?.color ?? "from-purple-500 to-indigo-500"
                                    : activeCat.color}`}
                                />

                                <div className="p-6">
                                    {/* Top row */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br
                                                ${activeCat.id === "all"
                                                    ? CATEGORIES.find(c => c.id === test.categoryId)?.color ?? "from-purple-500 to-indigo-500"
                                                    : activeCat.color}
                                                shadow-md`}>
                                                <Headphones className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">
                                                    {CATEGORIES.find(c => c.id === test.categoryId)?.title ?? "Test"}
                                                </p>
                                                <h3 className="font-bold text-slate-800 text-base group-hover:text-purple-700 transition-colors leading-tight">
                                                    {test.title}
                                                </h3>
                                            </div>
                                        </div>
                                        {test.status === "premium" && (
                                            <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
                                                <Lock className="w-3 h-3" /> Premium
                                            </span>
                                        )}
                                        {test.status === "free" && (
                                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                                                Free
                                            </span>
                                        )}
                                    </div>

                                    {/* Info pills */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            {test.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium">
                                            <Mic2 className="w-3.5 h-3.5 text-slate-400" />
                                            {test.parts ?? 4} {lang === 'uz' ? "Qism" : "Sections"}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium">
                                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                            40 {lang === 'uz' ? "Savol" : "Questions"}
                                        </span>
                                        {test.difficulty && (
                                            <span className={cn(
                                                "text-xs font-semibold px-3 py-1.5 rounded-xl border",
                                                DIFF_COLORS[test.difficulty]
                                            )}>
                                                {test.difficulty}
                                            </span>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <Link href={`/practice/listening/${test.id}`}>
                                        <button className={cn(
                                            "w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                                            test.status === "premium"
                                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                : "bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-600 text-white shadow-md group-hover:shadow-purple-400/30"
                                        )}>
                                            {test.status === "premium" ? (
                                                <><Lock className="w-4 h-4" /> {lang === 'uz' ? "Qulfni ochish" : "Unlock Test"}</>
                                            ) : (
                                                <>
                                                    <PlayCircle className="w-4 h-4 fill-current" />
                                                    {tx(D.start, lang)}
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
