"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PlayCircle, CheckCircle2, Clock, BarChart3, ChevronRight, Lock, Search, Filter, Sparkles, Layers, FileText, Bookmark, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";

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
    progress?: string; // e.g., "4/16"
    isNew?: boolean;
    status: "free" | "premium";
}

// --- Mock Data ---
const CATEGORIES: TestCategory[] = [
    { id: "all", title: "All Tests", count: 57 },
    { id: "free-passages", title: "Free Passages", count: 22, icon: BookOpen },
    { id: "premium-passages", title: "Premium Passages", count: 19, icon: Sparkles },
    { id: "full-tests", title: "Full Tests", count: 16, icon: Layers },
    { id: "cambridge-ielts", title: "Cambridge IELTS Readings", count: 0, icon: GraduationCap },
];

const TESTS: TestItem[] = [
    // Free Passages
    { id: "fp-1", categoryId: "free-passages", title: "Evolution of the Calculator", isNew: true, status: "free" },
    { id: "fp-2", categoryId: "free-passages", title: "Sleeping on the job", isNew: true, status: "free" },
    { id: "fp-9", categoryId: "free-passages", title: "Socially Responsible Businesses", isNew: true, status: "free" },
    { id: "fp-13", categoryId: "free-passages", title: "The Dover Bronze-Age Boat", isNew: true, status: "free" },
    { id: "fp-14", categoryId: "free-passages", title: "A Closer Examination of a Study on Verbal and Non-Verbal Message", isNew: true, status: "free" },
    { id: "fp-15", categoryId: "free-passages", title: "Katherine Mansfield", isNew: true, status: "free" },
    { id: "fp-16", categoryId: "free-passages", title: "Aphantasia: A life without mental images", isNew: true, status: "free" },
    { id: "fp-17", categoryId: "free-passages", title: "Australian artist Margaret Preston", isNew: true, status: "free" },
    { id: "fp-18", categoryId: "free-passages", title: "Life lessons from villains, crooks and gangsters", isNew: true, status: "free" },
    { id: "fp-19", categoryId: "free-passages", title: "Fear of the Unknown", isNew: true, status: "free" },
    { id: "fp-10", categoryId: "cambridge-ielts", title: "Crop-growing skyscrapers", isNew: true, status: "free" },
    { id: "fp-11", categoryId: "cambridge-ielts", title: "The Falkirk Wheel", isNew: true, status: "free" },
    { id: "fp-12", categoryId: "cambridge-ielts", title: "Reducing the Effects of Climate Change", isNew: true, status: "free" },
    { id: "fp-3", categoryId: "cambridge-ielts", title: "Raising the Mary Rose", isNew: true, status: "free" },
    { id: "fp-4", categoryId: "cambridge-ielts", title: "What destroyed the civilisation of Easter Island?", isNew: true, status: "free" },
];


import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";



export default function ReadingPage() {
    const { lang } = useLanguage();
    const D = T.reading;
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [bestScores, setBestScores] = useState<Record<string, { score: number, total: number }>>({});
    const supabase = createClient();

    useEffect(() => {
        const fetchCompletions = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('test_results')
                .select('test_id, score, total_questions')
                .eq('user_id', user.id);

            if (data) {
                const scores: Record<string, { score: number, total: number }> = {};
                data.forEach((result: any) => {
                    const currentBest = scores[result.test_id];
                    if (!currentBest || result.score > currentBest.score) {
                        scores[result.test_id] = {
                            score: result.score,
                            total: result.total_questions
                        };
                    }
                });
                setBestScores(scores);
            }
        };

        fetchCompletions();
    }, [supabase]);




    const filteredTests = TESTS.filter(test => {
        const matchesCategory = selectedCategory === "all" || test.categoryId === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <DashboardLayout
            title={tx(D.title, lang)}
            description={tx(D.desc, lang)}
        >
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Background Blobs for Blue Aesthetic */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[100px]" />
                    <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-300/10 rounded-full blur-[80px]" />
                </div>

                {/* --- Sidebar Filters --- */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={lang === 'uz' ? "O'qish matnini toping..." : "Find a reading passage..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 backdrop-blur-md border border-blue-100 text-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-[0_4px_20px_rgba(59,130,246,0.05)] placeholder:text-blue-300/70"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.3 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 p-4 space-y-2 lg:sticky lg:top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-blue-100/50">
                            <Filter className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{lang === 'uz' ? "Test Turlari" : "Test Types"}</span>
                        </div>

                        {CATEGORIES.map((category) => {
                            const count = category.id === "all"
                                ? TESTS.length
                                : TESTS.filter(t => t.categoryId === category.id).length;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                                        selectedCategory === category.id
                                            ? "text-blue-700 shadow-md shadow-blue-500/10"
                                            : "hover:bg-blue-50/50 text-slate-600 hover:text-blue-800"
                                    )}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        {category.icon ? (
                                            <category.icon className={cn("w-4 h-4", selectedCategory === category.id ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500")} />
                                        ) : (
                                            <div className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-300",
                                                selectedCategory === category.id ? "bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.4)]" : "bg-slate-300 group-hover:bg-blue-300"
                                            )} />
                                        )}
                                        <span className={cn("transition-colors", selectedCategory === category.id && "font-semibold")}>
                                            {lang === 'uz' ? (
                                                category.id === "all" ? "Barcha Testlar" :
                                                    category.id === "free-passages" ? "Bepul Matnlar" :
                                                        category.id === "premium-passages" ? "Premium Matnlar" :
                                                            category.id === "full-tests" ? "To'liq Testlar" :
                                                                category.id === "cambridge-ielts" ? "Cambridge IELTS O'qish" : category.title
                                            ) : category.title}
                                        </span>
                                    </div>
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-lg text-[10px] bg-white/50 border font-bold relative z-10 transition-colors",
                                        selectedCategory === category.id
                                            ? "border-blue-200 text-blue-600 bg-white"
                                            : "border-transparent text-slate-400 group-hover:bg-white group-hover:border-blue-100 group-hover:text-blue-400"
                                    )}>
                                        {count}
                                    </span>

                                    {selectedCategory === category.id && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-100 via-sky-50 to-blue-50 z-0"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </motion.div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 min-w-0">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-600 p-8 md:p-10 mb-10 shadow-[0_20px_50px_rgba(37,99,235,0.3)] group"
                    >
                        {/* Animated Mesh Gradient Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <BookOpen className="w-80 h-80 text-white transform translate-x-20 -translate-y-20 rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                        </div>

                        <div className="relative z-10 text-white max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <FileText className="w-3 h-3 text-sky-200" />
                                    <BouncyText key={`rl-badge-${lang}`} text={lang === 'uz' ? "Keng kutubxona" : "Extensive Library"} type="word" />
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                <BouncyText key={`rl-title-${lang}`} text={lang === 'uz' ? "O'qish Kutubxonasi" : "Reading Library"} type="word" />
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed font-light">
                                <BouncyText key={`rl-desc-${lang}`} text={lang === 'uz' ? "Akademik va umumiy o'quv matnlarimiz to'plami bilan o'qish tezligi va tushunish qobiliyatingizni oshiring." : "Enhance your reading speed and comprehension with our vast collection of academic and general training texts."} type="word" />
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
                                            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-sm border border-blue-100 text-blue-600">
                                                <category.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                    {lang === 'uz' ? (
                                                        category.id === "all" ? "Barcha Testlar" :
                                                            category.id === "free-passages" ? "Bepul Matnlar" :
                                                                category.id === "premium-passages" ? "Premium Matnlar" :
                                                                    category.id === "full-tests" ? "To'liq Testlar" :
                                                                        category.id === "cambridge-ielts" ? "Cambridge IELTS O'qish" : category.title
                                                    ) : category.title}
                                                </h3>
                                                <p className="text-sm text-slate-400 font-medium">{categoryTests.length} {lang === 'uz' ? "Test mavjud" : "Items Available"}</p>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-40px" }}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                                            }}
                                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
                                        >
                                            {categoryTests.map((test, index) => (
                                                <motion.div
                                                    key={test.id}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 25, scale: 0.9 },
                                                        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.45, duration: 0.6 } }
                                                    }}
                                                    className="group bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-1 border border-white/60 hover:border-blue-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-500 relative hover:-translate-y-1"
                                                >
                                                    <div className="bg-white/50 rounded-[1.2rem] p-5 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-blue-50/30 transition-colors duration-500">

                                                        {/* Top Metadata */}
                                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                                            <span className={cn(
                                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border",
                                                                test.status === "free"
                                                                    ? "bg-emerald-50/80 border-emerald-100 text-emerald-600"
                                                                    : "bg-amber-50/80 border-amber-100 text-amber-600"
                                                            )}>
                                                                {test.status === "free" ? (lang === 'uz' ? "Bepul" : "Free") : (lang === 'uz' ? "Premium" : "Premium")}
                                                            </span>

                                                            {test.progress && (
                                                                <div className="flex items-center gap-1.5 text-[10px] text-white font-bold bg-emerald-500 px-2 py-1 rounded-full shadow-sm shadow-emerald-500/20">
                                                                    <CheckCircle2 className="w-3 h-3" /> {test.progress}
                                                                </div>
                                                            )}
                                                            {bestScores[test.id] ? (
                                                                <div className="flex items-center gap-1.5 text-[10px] text-white font-bold bg-blue-500 px-2 py-1 rounded-full shadow-sm shadow-blue-500/20 ml-auto">
                                                                    <CheckCircle2 className="w-3 h-3" /> {bestScores[test.id].score}/{bestScores[test.id].total}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        {/* Content */}
                                                        <div className="mb-6 relative z-10">
                                                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors line-clamp-2 mb-2 min-h-[2.5em]">
                                                                {test.title}
                                                            </h4>
                                                            {test.isNew && (
                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-500 border border-rose-100">
                                                                    {lang === 'uz' ? "YANGI" : "NEW"}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Action Button */}
                                                        <div className="mt-auto relative z-10">
                                                            <Link href={`/practice/reading/${test.id}`} className="w-full">
                                                                <button className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-xs shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden ring-1 ring-white/20">
                                                                    <PlayCircle className="w-3.5 h-3.5 fill-current opacity-90 relative z-10" />
                                                                    <span className="relative z-10">{lang === 'uz' ? "Boshlash" : "Start"}</span>
                                                                </button>
                                                            </Link>
                                                        </div>

                                                        {/* Decoration Blob */}
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
                                className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200"
                            >
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Search className="w-8 h-8 text-blue-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">{lang === 'uz' ? "Matnlar topilmadi" : "No passages found"}</h3>
                                <p className="text-slate-400">{lang === 'uz' ? "Boshqa narsani qidirib ko'ring yoki filtrlarni tozalang." : "Try searching for something else or clear filters."}</p>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
