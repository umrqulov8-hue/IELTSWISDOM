"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    BookOpen, 
    CheckCircle2, 
    Clock, 
    BarChart3, 
    ChevronRight, 
    Lock, 
    PlayCircle,
    Star,
    Zap,
    BookMarked,
    Target,
    Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";
import { READING_LESSONS, MIGRATED_TESTS } from "@/data/reading-lessons";

export default function ReadingSkillsPage() {
    const { lang } = useLanguage();
    
    // Calculate stats
    const totalItems = READING_LESSONS.length;
    const completedItems = READING_LESSONS.filter(l => l.status === "completed").length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);
    const avgScore = 85; // Mock avg score
    const remainingItems = totalItems - completedItems;

    return (
        <DashboardLayout
            title={lang === 'uz' ? "O'qish Ko'nikmalari" : "Reading Skills"}
            description={lang === 'uz' ? "Strukturaviy darslar va amaliyot orqali IELTS Akademik o'qishini o'zlashtiring" : "Master IELTS Academic Reading through structured lessons and practice"}
        >
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800/50 transition-colors">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors">
                                {lang === 'uz' ? "O'qish Ko'nikmalari" : "Reading Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">
                                {lang === 'uz' ? "O'zlashtirish kursingizni kuzatib boring" : "Track your reading skill development"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Progress Overview Card --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group transition-all"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                        {/* Progress Bar Column */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">{lang === 'uz' ? "Jarayon" : "Progress Overview"}</h2>
                                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 transition-colors">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-1 border border-slate-50 dark:border-slate-800 shadow-inner transition-colors">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 dark:bg-blue-500 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest transition-colors">
                                {lang === 'uz' ? "O'qish ko'nikmalaringizni rivojlanishini kuzating" : "Track your reading skill development"}
                            </p>
                        </div>

                        {/* Stats Columns */}
                        <div className="grid grid-cols-3 md:col-span-2 gap-4">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-emerald-700 dark:text-emerald-400" />
                            <StatItem label={lang === 'uz' ? "O'rtacha ball" : "Avg Score"} value={`${avgScore}%`} color="text-blue-700 dark:text-blue-400" />
                            <StatItem label={lang === 'uz' ? "Qoldi" : "Remaining"} value={remainingItems} color="text-orange-500 dark:text-orange-400" />
                        </div>
                    </div>
                </motion.div>

                {/* --- Lessons Grid --- */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                        <h2 className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors">
                            {lang === 'uz' ? "Darslar" : "Structured Lessons"}
                        </h2>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {READING_LESSONS.map((lesson, idx) => (
                            <LessonCard key={lesson.id} lesson={lesson} index={idx} lang={lang} />
                        ))}
                    </div>
                </div>

                {/* --- Migrated Tests Section (Old Data) --- */}
                <div className="space-y-8 pt-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                        <h2 className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors">
                            {lang === 'uz' ? "Qo'shimcha amaliyot" : "Practice Passages"}
                        </h2>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {MIGRATED_TESTS.map((test, idx) => (
                            <PracticeCard key={test.id} test={test} index={idx} lang={lang} />
                        ))}
                    </div>
                </div>

                {/* --- Reading Tips & Strategies --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mt-16 shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 transition-colors">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            {lang === 'uz' ? "O'qish bo'yicha maslahatlar va strategiyalar" : "Reading Tips & Strategies"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                <Clock className="w-4 h-4 text-blue-700 dark:text-blue-400 transition-colors" />
                                {lang === 'uz' ? "Vaqtni boshqarish" : "Time Management"}
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium list-none transition-colors">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Har bir matn uchun 20 daqiqa sarflang (jami 60 daqiqa)" : "Spend 20 minutes per passage (60 minutes total)"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Avval tezda ko'zdan kechiring, so'ngra savollarni o'qing" : "Skim first, then read questions"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Qiyin savollarga juda ko'p vaqt sarflamang" : "Don't spend too long on difficult questions"}
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400 transition-colors" />
                                {lang === 'uz' ? "Savol strategiyalari" : "Question Strategies"}
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium list-none transition-colors">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Matndan oldin savollarni o'qing" : "Read questions before the passage"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Kalit so'zlarni va sinonimlarni aniqlang" : "Identify keywords and synonyms"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "True/False/Not Given savollarida ehtiyot bo'ling" : "Be careful with True/False/Not Given"}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

// --- Subcomponents ---

function StatItem({ label, value, color }: { label: string, value: string | number, color: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <span className={cn("text-2xl font-black mb-1 transition-colors", color)}>{value}</span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center transition-colors">{label}</span>
        </div>
    );
}

function LessonCard({ lesson, index, lang }: { lesson: any, index: number, lang: string }) {
    const isCompleted = lesson.status === "completed";
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 relative flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">
                    {lang === 'uz' ? `${lesson.lessonNumber}-Dars` : `Lesson ${lesson.lessonNumber}`}
                </span>
                {isCompleted && (
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-500 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6 flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">
                    <Clock className="w-3 h-3 text-blue-400 dark:text-blue-300 transition-colors" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.level === "Expert" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.level === "Advanced" ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400" :
                    lesson.level === "Intermediate" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400" : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                )}>
                    {lesson.level}
                </div>
            </div>

            {lesson.score && (
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-full h-1.5 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                        <div className="h-full bg-emerald-400 dark:bg-emerald-500" style={{ width: `${lesson.score}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 whitespace-nowrap transition-colors">Score: {lesson.score}%</span>
                </div>
            )}

            <Link href={`/practice/reading/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-blue-400 dark:hover:text-white"
                )}>
                    {isCompleted 
                        ? (lang === 'uz' ? "Ko'rib chiqish" : "Review") 
                        : (lang === 'uz' ? "Darsni boshlash" : "Start Lesson")
                    }
                    {!isCompleted && <ChevronRight className="w-4 h-4" />}
                </button>
            </Link>
        </motion.div>
    );
}

function PracticeCard({ test, index, lang }: { test: any, index: number, lang: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (index * 0.03) }}
            className="group bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 lg:hover:shadow-lg transition-all"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">{test.categoryId.replace('-', ' ')}</span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-700 dark:text-slate-400 transition-colors">
                        <Clock className="w-2.5 h-2.5" />
                        {test.duration}
                    </div>
                </div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {test.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-md transition-colors">{test.level}</span>
                    <Link 
                        href={`/practice/reading/${test.id}`} 
                        aria-label={lang === 'uz' ? "Testni boshlash" : "Start Test"}
                        className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
