"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    Mic, 
    CheckCircle2, 
    Clock, 
    ChevronRight, 
    Volume2,
    Target,
    Lightbulb,
    FileText,
    MessageCircle,
    Users,
    Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SPEAKING_LESSONS, MIGRATED_SPEAKING_TESTS } from "@/data/speaking-lessons";

export default function SpeakingSkillsPage() {
    const { lang } = useLanguage();
    
    const totalItems = SPEAKING_LESSONS.length;
    const completedItems = SPEAKING_LESSONS.filter(l => l.status === "completed").length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);

    return (
        <DashboardLayout
            title={lang === 'uz' ? "Gapirish Ko'nikmalari" : "Speaking Skills"}
            description={lang === 'uz' ? "Strukturaviy darslar va amaliyot orqali IELTS Gapirish (Speaking) qismini o'zlashtiring" : "Master the IELTS Speaking section through structured lessons and practice"}
        >
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-700 dark:text-rose-400 shadow-sm border border-rose-100 dark:border-rose-800/50 transition-colors">
                            <Mic className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors">
                                {lang === 'uz' ? "Gapirish Ko'nikmalari" : "Speaking Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-rose-600 dark:bg-rose-500 text-white rounded-lg shadow-sm shadow-rose-200 dark:shadow-none transition-all">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">
                                {lang === 'uz' ? "Gapirish qobiliyatingiz rivojlanishini kuzatib boring" : "Track your speaking skill development"}
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
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">{lang === 'uz' ? "Gapirish Jarayoni" : "Speaking Progress"}</h2>
                                <span className="text-2xl font-black text-rose-700 dark:text-rose-400 transition-colors">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-1 border border-slate-50 dark:border-slate-800 shadow-inner transition-colors">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 dark:bg-rose-500 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest transition-colors">
                                {lang === 'uz' ? "Gapirish ko'nikmalaringiz rivojlanishini kuzating" : "Track your speaking skill development"}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 md:col-span-2 gap-4">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-emerald-700 dark:text-emerald-500" />
                            <StatItem label={lang === 'uz' ? "O'rtacha ball" : "Avg Score"} value="7.0" color="text-rose-700 dark:text-rose-400" />
                            <StatItem label={lang === 'uz' ? "Qoldi" : "Remaining"} value={totalItems - completedItems} color="text-blue-700 dark:text-blue-400" />
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
                        {SPEAKING_LESSONS.map((lesson, idx) => (
                            <SpeakingLessonCard key={lesson.id} lesson={lesson} index={idx} lang={lang} />
                        ))}
                    </div>
                </div>

                {/* --- Migrated Tests Section --- */}
                {MIGRATED_SPEAKING_TESTS.length > 0 && (
                    <div className="space-y-8 pt-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                            <h2 className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors">
                                {lang === 'uz' ? "Mock Testlar" : "Mock Practice"}
                            </h2>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MIGRATED_SPEAKING_TESTS.map((test, idx) => (
                                <PracticeCard key={test.id} test={test} index={idx} lang={lang} type="speaking" />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Speaking Test Structure & Assessment --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mt-16 shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/30 rounded-xl flex items-center justify-center text-rose-700 dark:text-rose-400 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            {lang === 'uz' ? "Speaking Testining Formati va Baholash" : "Speaking Test Format & Assessment"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                {lang === 'uz' ? "Test Tuzilishi (11-14 daqiqa)" : "Test Structure (11-14 minutes)"}
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 transition-colors">{lang === 'uz' ? "1-qism: Kirish" : "Part 1: Introduction"}</p>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium transition-colors">{lang === 'uz' ? "Siz va tanish mavzular haqida umumiy savollar" : "General questions about yourself and familiar topics"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors">4-5 min</span>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-purple-600 dark:text-purple-400 transition-colors">{lang === 'uz' ? "2-qism: Uzun nutq" : "Part 2: Long Turn"}</p>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium transition-colors">{lang === 'uz' ? "Berilgan mavzuda 2 daqiqalik nutq (1 daqiqa tayyorgarlik)" : "2-minute talk on a given topic with 1-minute preparation"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg transition-colors">3-4 min</span>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-rose-700 dark:text-rose-400 transition-colors">{lang === 'uz' ? "3-qism: Muhokama" : "Part 3: Discussion"}</p>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium transition-colors">{lang === 'uz' ? "2-qism mavzusiga qarab mavhum mavzularda kengaytirilgan muhokama" : "Extended discussion on abstract topics related to Part 2"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 rounded-lg transition-colors">4-5 min</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                {lang === 'uz' ? "Baholash Mezonlari" : "Assessment Criteria"}
                            </h3>
                            <div className="grid gap-3">
                                <CriteriaCard label={lang === 'uz' ? "Ravonlik va aloqa" : "Fluency & Coherence"} desc={lang === 'uz' ? "Nutq oqimi va mantiqiy tashkil qilish" : "Speech flow and logical organization"} percent="25%" color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50" />
                                <CriteriaCard label={lang === 'uz' ? "Lug'at boyligi" : "Lexical Resource"} desc={lang === 'uz' ? "So'z boyligi va aniqligi" : "Vocabulary range and accuracy"} percent="25%" color="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50" />
                                <CriteriaCard label={lang === 'uz' ? "Grammatik ko'lam" : "Grammatical Range"} desc={lang === 'uz' ? "Grammatik xilma-xillik va aniqlik" : "Grammar variety and accuracy"} percent="25%" color="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/50" />
                                <CriteriaCard label={lang === 'uz' ? "Talaffuz" : "Pronunciation"} desc={lang === 'uz' ? "Aniq nutq va tabiiy ohanglar" : "Clear speech and natural patterns"} percent="25%" color="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800/50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Speaking Success Tips --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mt-16 shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors">
                            <Target className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            {lang === 'uz' ? "Speaking-da muvaffaqiyat qozonish uchun maslahatlar" : "Speaking Success Tips"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <p className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Speaking-dan oldin" : "Before Speaking"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400 font-bold list-none transition-all">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 transition-colors" />
                                    {lang === 'uz' ? "Dam oling va ishonch bilan bo'ling" : "Relax and be confident"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 transition-colors" />
                                    {lang === 'uz' ? "Savollarni diqqat bilan eshiting" : "Listen carefully to questions"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 transition-colors" />
                                    {lang === 'uz' ? "Javob berishdan oldin o'ylash uchun vaqt oling" : "Take time to think before answering"}
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Speaking paytida" : "During Speaking"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400 font-bold list-none transition-all">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 transition-colors" />
                                    {lang === 'uz' ? "Aniq va odatdagi tezlikda so'zlang" : "Speak clearly and at normal pace"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 transition-colors" />
                                    {lang === 'uz' ? "Lug'at boyligidan foydalaning" : "Use a range of vocabulary"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 transition-colors" />
                                    {lang === 'uz' ? "Misollar bilan kengaytirilgan javob bering" : "Give extended answers with examples"}
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Murakkab maslahatlar" : "Advanced Tips"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400 font-bold list-none transition-all">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-500 transition-colors" />
                                    {lang === 'uz' ? "Bog'lovchi so'zlardan samarali foydalaning" : "Use discourse markers effectively"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-500 transition-colors" />
                                    {lang === 'uz' ? "Shaxsiy fikr va g'oyalarni ko'rsating" : "Show personal opinions and ideas"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-500 transition-colors" />
                                    {lang === 'uz' ? "Zarur bo'lganda o'zingizni tuzating" : "Self-correct when necessary"}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

function StatItem({ label, value, color }: { label: string, value: string | number, color: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <span className={cn("text-2xl font-black mb-1 transition-all", color)}>{value}</span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center transition-colors">{label}</span>
        </div>
    );
}

function CriteriaCard({ label, desc, percent, color }: { label: string, desc: string, percent: string, color: string }) {
    return (
        <div className={cn("p-4 rounded-2xl border flex items-center justify-between transition-all", color)}>
            <div>
                <p className="text-sm font-bold">{label}</p>
                <p className="text-[10px] opacity-70 font-medium">{desc}</p>
            </div>
            <span className="text-xl font-black">{percent}</span>
        </div>
    );
}

function SpeakingLessonCard({ lesson, index, lang }: { lesson: any, index: number, lang: string }) {
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
                <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">
                    <Clock className="w-3 h-3 text-rose-400 dark:text-rose-300 transition-colors" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.typeBadge === "Overview" ? "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400" :
                    lesson.typeBadge === "Skills" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400" : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400"
                )}>
                    {lesson.typeBadge}
                </div>
            </div>

            <div className="flex items-center justify-between items-center mb-6">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.level === "Expert" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.level === "Advanced" ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400" :
                    lesson.level === "Intermediate" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400" : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                )}>
                    {lesson.level}
                </div>
            </div>

            <Link href={lesson.id === "s-lesson-1" ? "/practice/speaking" : `/practice/speaking/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white"
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

function PracticeCard({ test, index, lang, type }: { test: any, index: number, lang: string, type: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (index * 0.03) }}
            className="group bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:border-rose-200 dark:hover:border-rose-500 hover:bg-white dark:hover:bg-slate-800 lg:hover:shadow-lg transition-all"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Mock Test" : "Mock Practice"}</span>
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
                        href={`/practice/${type}/${test.id}`} 
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
