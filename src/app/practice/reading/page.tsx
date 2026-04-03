"use client";
// Last updated: 2026-04-03

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, PlayCircle, CheckCircle2, Search, Sparkles,
    Layers, FileText, Bookmark, GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

// --- Types ---
interface TestCategory {
    id: string;
    title: string;
    icon?: any;
}

interface TestItem {
    id: string;
    categoryId: string;
    title: string;
    progress?: string;
    isNew?: boolean;
    status: "free" | "premium";
}

// --- Data ---
const CATEGORIES: TestCategory[] = [
    { id: "all", title: "All Tests" },
    { id: "free-passages", title: "Free Passages", icon: BookOpen },
    { id: "premium-passages", title: "Premium", icon: Sparkles },
    { id: "full-tests", title: "Full Tests", icon: Layers },
    { id: "mock-passages", title: "Mock Passages", icon: Bookmark },
    { id: "cambridge-ielts", title: "Cambridge IELTS", icon: GraduationCap },
];

const TESTS: TestItem[] = [
    // Premium Passages
    { id: "homers-literary-legacy", categoryId: "premium-passages", title: "Homer's Literary Legacy", isNew: true, status: "premium" },
    { id: "the-rise-of-agribots", categoryId: "premium-passages", title: "The Rise of Agribots", isNew: true, status: "premium" },

    // Free Passages
    { id: "fp-9", categoryId: "free-passages", title: "Socially Responsible Businesses", isNew: true, status: "free" },
    { id: "south-pole-adventurer", categoryId: "free-passages", title: "South Pole Adventurer", isNew: true, status: "free" },
    { id: "fp-13", categoryId: "free-passages", title: "The Dover Bronze-Age Boat", isNew: true, status: "free" },
    { id: "fp-14", categoryId: "free-passages", title: "A Closer Examination of a Study on Verbal and Non-Verbal Message", isNew: true, status: "free" },
    { id: "fp-15", categoryId: "free-passages", title: "Katherine Mansfield", isNew: true, status: "free" },
    { id: "fp-16", categoryId: "free-passages", title: "Aphantasia: A life without mental images", isNew: true, status: "free" },
    { id: "fp-17", categoryId: "free-passages", title: "Australian artist Margaret Preston", isNew: true, status: "free" },
    { id: "fp-18", categoryId: "free-passages", title: "Life lessons from villains, crooks and gangsters", isNew: true, status: "free" },
    { id: "fp-19", categoryId: "free-passages", title: "Fear of the Unknown", isNew: true, status: "free" },
    { id: "fp-20", categoryId: "free-passages", title: "Britain needs strong TV industry", isNew: true, status: "free" },
    { id: "fp-21", categoryId: "free-passages", title: "How to find your way out of a food desert", isNew: true, status: "free" },
    { id: "fp-22", categoryId: "free-passages", title: "Insect decision-making", isNew: true, status: "free" },
    { id: "fp-23", categoryId: "free-passages", title: "Why Do We Touch Strangers So Much? A History Of The Handshake Offers Clues", isNew: true, status: "free" },
    { id: "fp-24", categoryId: "free-passages", title: "Economic Evolution", isNew: true, status: "free" },

    // Cambridge IELTS
    { id: "fp-10", categoryId: "cambridge-ielts", title: "Crop-growing skyscrapers", isNew: true, status: "free" },
    { id: "fp-11", categoryId: "cambridge-ielts", title: "The Falkirk Wheel", isNew: true, status: "free" },
    { id: "fp-12", categoryId: "cambridge-ielts", title: "Reducing the Effects of Climate Change", isNew: true, status: "free" },
    { id: "fp-3", categoryId: "cambridge-ielts", title: "Raising the Mary Rose", isNew: true, status: "free" },
    { id: "fp-4", categoryId: "cambridge-ielts", title: "What destroyed the civilisation of Easter Island?", isNew: true, status: "free" },

    // Mock Test Passages
    { id: "mock-1-p1", categoryId: "mock-passages", title: "Tea and the Industrial Revolution", isNew: true, status: "free" },
    { id: "mock-1-p2", categoryId: "mock-passages", title: "Gifted children and learning", isNew: true, status: "free" },
    { id: "mock-1-p3", categoryId: "mock-passages", title: "Museums of fine art and their public", isNew: true, status: "free" },
    { id: "mock-2-p1", categoryId: "mock-passages", title: "Our Vanishing Night", isNew: true, status: "free" },
    { id: "mock-2-p2", categoryId: "mock-passages", title: "Endless Harvest", isNew: true, status: "free" },
    { id: "mock-2-p3", categoryId: "mock-passages", title: "Film Noir", isNew: true, status: "free" },
    { id: "mock-3-p1", categoryId: "mock-passages", title: "Development of Adolescence", isNew: true, status: "free" },
    { id: "mock-3-p2", categoryId: "mock-passages", title: "Intelligence and Giftedness", isNew: true, status: "free" },
    { id: "mock-3-p3", categoryId: "mock-passages", title: "Communicating Styles and Conflict", isNew: true, status: "free" },
    { id: "mock-4-p1", categoryId: "mock-passages", title: "Can animals count?", isNew: true, status: "free" },
    { id: "mock-4-p2", categoryId: "mock-passages", title: "Is It Time To Halt the Rising Tide of Plastic Packaging?", isNew: true, status: "free" },
    { id: "mock-4-p3", categoryId: "mock-passages", title: "The Growth of Intelligence", isNew: true, status: "free" },
    { id: "mock-5-p1", categoryId: "mock-passages", title: "Nutmeg – a valuable spice", isNew: true, status: "free" },
    { id: "mock-5-p2", categoryId: "mock-passages", title: "Driverless cars", isNew: true, status: "free" },
    { id: "mock-5-p3", categoryId: "mock-passages", title: "What is exploration?", isNew: true, status: "free" },
    { id: "mock-6-p1", categoryId: "mock-passages", title: "Could urban engineers learn from dance?", isNew: true, status: "free" },
    { id: "mock-6-p2", categoryId: "mock-passages", title: "Should we try to bring extinct species back to life?", isNew: true, status: "free" },
    { id: "mock-6-p3", categoryId: "mock-passages", title: "Having a laugh", isNew: true, status: "free" },

    // Full Tests
    { id: "mt-1", categoryId: "full-tests", title: "IELTS Reading Mock Test 1 (Full)", isNew: true, status: "free" },
    { id: "mock-2-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 2 (Full)", isNew: true, status: "free" },
    { id: "mock-3-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 3 (Full)", isNew: true, status: "free" },
    { id: "mock-4-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 4 (Full)", isNew: true, status: "free" },
    { id: "mock-5-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 5 (Full)", isNew: true, status: "free" },
    { id: "mock-6-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 6 (Full)", isNew: true, status: "free" },
    { id: "mock-7-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 7 (Full)", isNew: true, status: "free" },
];

const CAT_LABELS_UZ: Record<string, string> = {
    all: "Barchasi",
    "free-passages": "Bepul Matnlar",
    "premium-passages": "Premium",
    "full-tests": "To'liq Testlar",
    "mock-passages": "Mock Matnlar",
    "cambridge-ielts": "Cambridge IELTS",
};

export default function ReadingPage() {
    const { lang } = useLanguage();
    const D = T.reading;
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [bestScores, setBestScores] = useState<Record<string, { score: number; total: number }>>({});
    const supabase = createClient();

    useEffect(() => {
        const fetchCompletions = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from("test_results")
                .select("test_id, score, total_questions")
                .eq("user_id", user.id);
            if (data) {
                const scores: Record<string, { score: number; total: number }> = {};
                data.forEach((result: any) => {
                    const current = scores[result.test_id];
                    if (!current || result.score > current.score) {
                        scores[result.test_id] = { score: result.score, total: result.total_questions };
                    }
                });
                setBestScores(scores);
            }
        };
        fetchCompletions();
    }, [supabase]);

    const filteredTests = TESTS.filter((test) => {
        const matchesCategory = selectedCategory === "all" || test.categoryId === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleCategories =
        selectedCategory === "all"
            ? CATEGORIES.filter((c) => c.id !== "all")
            : CATEGORIES.filter((c) => c.id === selectedCategory);

    return (
        <DashboardLayout title={tx(D.title, lang)} description={tx(D.desc, lang)}>
            <div className="relative z-10 space-y-8">

                {/* Background blobs */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[100px]" />
                    <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-300/10 rounded-full blur-[80px]" />
                </div>

                {/* Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-600 p-8 md:p-10 shadow-[0_20px_50px_rgba(37,99,235,0.3)] group"
                >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light" />
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <BookOpen className="w-80 h-80 text-white translate-x-20 -translate-y-20 rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                    </div>
                    <div className="relative z-10 text-white max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                <FileText className="w-3 h-3 text-sky-200" />
                                <BouncyText key={`badge-${lang}`} text={lang === "uz" ? "Keng kutubxona" : "Extensive Library"} type="word" />
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            <BouncyText key={`title-${lang}`} text={lang === "uz" ? "O'qish Kutubxonasi" : "Reading Library"} type="word" />
                        </h2>
                        <p className="text-blue-100 text-lg leading-relaxed font-light">
                            <BouncyText
                                key={`desc-${lang}`}
                                text={lang === "uz"
                                    ? "Akademik va umumiy o'quv matnlarimiz to'plami bilan o'qish tezligi va tushunish qobiliyatingizni oshiring."
                                    : "Enhance your reading speed and comprehension with our vast collection of academic and general training texts."}
                                type="word"
                            />
                        </p>
                    </div>
                </motion.div>

                {/* Search + Category Tabs row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                    {/* Search */}
                    <div className="relative group w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={lang === "uz" ? "Matnni toping..." : "Search passages..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-blue-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm placeholder:text-blue-300/70 dark:placeholder:text-slate-500"
                        />
                    </div>

                    {/* Category chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {CATEGORIES.map((cat) => {
                            const count = cat.id === "all" ? TESTS.length : TESTS.filter((t) => t.categoryId === cat.id).length;
                            const active = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={cn(
                                        "relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 overflow-hidden",
                                        active
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                            : "bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
                                    )}
                                >
                                    {cat.icon && <cat.icon className="w-3.5 h-3.5 flex-shrink-0" />}
                                    <span>{lang === "uz" ? (CAT_LABELS_UZ[cat.id] ?? cat.title) : cat.title}</span>
                                    <span className={cn(
                                        "ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                                        active ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                    )}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Test Sections */}
                <div className="space-y-12">
                    <AnimatePresence mode="popLayout">
                        {visibleCategories.map((category, catIndex) => {
                            const categoryTests = filteredTests.filter((t) => t.categoryId === category.id);
                            if (categoryTests.length === 0) return null;
                            const CatIcon = category.icon;

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                >
                                    {/* Section header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        {CatIcon && (
                                            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                                                <CatIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                                {lang === "uz" ? (CAT_LABELS_UZ[category.id] ?? category.title) : category.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                                {categoryTests.length} {lang === "uz" ? "Test mavjud" : "Items Available"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Cards grid */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-40px" }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                                        }}
                                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
                                    >
                                        {categoryTests.map((test) => (
                                            <motion.div
                                                key={test.id}
                                                variants={{
                                                    hidden: { opacity: 0, y: 25, scale: 0.9 },
                                                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.45, duration: 0.6 } },
                                                }}
                                                className="group bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl rounded-[1.5rem] p-1 border border-white/60 dark:border-slate-700/60 hover:border-blue-200/50 dark:hover:border-blue-500/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-500 relative hover:-translate-y-1"
                                            >
                                                <div className="bg-white/50 dark:bg-slate-800/40 rounded-[1.2rem] p-5 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-blue-50/30 dark:group-hover:from-slate-800 dark:group-hover:to-blue-950/20 transition-colors duration-500">

                                                    {/* Top badges */}
                                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                                        <span className={cn(
                                                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border",
                                                            test.status === "free"
                                                                ? "bg-emerald-50/80 border-emerald-100 text-emerald-600"
                                                                : "bg-amber-50/80 border-amber-100 text-amber-600"
                                                        )}>
                                                            {test.status === "free" ? (lang === "uz" ? "Bepul" : "Free") : "Premium"}
                                                        </span>
                                                        {bestScores[test.id] && (
                                                            <div className="flex items-center gap-1.5 text-[10px] text-white font-bold bg-blue-500 px-2 py-1 rounded-full shadow-sm shadow-blue-500/20">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                {bestScores[test.id].score}/{bestScores[test.id].total}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <div className="mb-6 relative z-10">
                                                        <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 min-h-[2.5em]">
                                                            {test.title}
                                                        </h4>
                                                        {test.isNew && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800/50">
                                                                {lang === "uz" ? "YANGI" : "NEW"}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Start button */}
                                                    <div className="mt-auto relative z-10">
                                                        <Link href={`/practice/reading/${test.id}`} className="w-full">
                                                            <button className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-700 group-hover:bg-blue-600 text-white font-bold text-xs shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 ring-1 ring-white/10">
                                                                <PlayCircle className="w-3.5 h-3.5 fill-current opacity-90" />
                                                                {lang === "uz" ? "Boshlash" : "Start"}
                                                            </button>
                                                        </Link>
                                                    </div>

                                                    {/* Decoration blob */}
                                                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {filteredTests.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700"
                        >
                            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Search className="w-8 h-8 text-blue-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                                {lang === "uz" ? "Matnlar topilmadi" : "No passages found"}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                {lang === "uz" ? "Boshqa narsani qidirib ko'ring." : "Try searching for something else or clear filters."}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
