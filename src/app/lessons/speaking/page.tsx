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
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                            <Mic className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                {lang === 'uz' ? "Gapirish Ko'nikmalari" : "Speaking Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-rose-600 text-white rounded-lg shadow-sm shadow-rose-200">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                {lang === 'uz' ? "Gapirish qobiliyatingiz rivojlanishini kuzatib boring" : "Track your speaking skill development"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Progress Overview Card --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 tracking-tight">{lang === 'uz' ? "Gapirish Jarayoni" : "Speaking Progress"}</h3>
                                <span className="text-2xl font-black text-rose-600">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-50 shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                {lang === 'uz' ? "Gapirish ko'nikmalaringiz rivojlanishini kuzating" : "Track your speaking skill development"}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 md:col-span-2 gap-4">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-emerald-500" />
                            <StatItem label={lang === 'uz' ? "O'rtacha ball" : "Avg Score"} value="7.0" color="text-rose-500" />
                            <StatItem label={lang === 'uz' ? "Qoldi" : "Remaining"} value={totalItems - completedItems} color="text-blue-500" />
                        </div>
                    </div>
                </motion.div>

                {/* --- Lessons Grid --- */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-100" />
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                            {lang === 'uz' ? "Darslar" : "Structured Lessons"}
                        </h2>
                        <div className="h-px flex-1 bg-slate-100" />
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
                            <div className="h-px flex-1 bg-slate-100" />
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                                {lang === 'uz' ? "Mock Testlar" : "Mock Practice"}
                            </h2>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MIGRATED_SPEAKING_TESTS.map((test, idx) => (
                                <PracticeCard key={test.id} test={test} index={idx} lang={lang} type="speaking" />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Speaking Test Structure & Assessment --- */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 mt-16 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {lang === 'uz' ? "Speaking Testining Formati va Baholash" : "Speaking Test Format & Assessment"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                {lang === 'uz' ? "Test Tuzilishi (11-14 daqiqa)" : "Test Structure (11-14 minutes)"}
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl border border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-blue-600">{lang === 'uz' ? "1-qism: Kirish" : "Part 1: Introduction"}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'uz' ? "Siz va tanish mavzular haqida umumiy savollar" : "General questions about yourself and familiar topics"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">4-5 min</span>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-purple-600">{lang === 'uz' ? "2-qism: Uzun nutq" : "Part 2: Long Turn"}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'uz' ? "Berilgan mavzuda 2 daqiqalik nutq (1 daqiqa tayyorgarlik)" : "2-minute talk on a given topic with 1-minute preparation"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">3-4 min</span>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-rose-600">{lang === 'uz' ? "3-qism: Muhokama" : "Part 3: Discussion"}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{lang === 'uz' ? "2-qism mavzusiga qarab mavhum mavzularda kengaytirilgan muhokama" : "Extended discussion on abstract topics related to Part 2"}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-rose-50 text-rose-600 rounded-lg">4-5 min</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                {lang === 'uz' ? "Baholash Mezonlari" : "Assessment Criteria"}
                            </h3>
                            <div className="grid gap-3">
                                <CriteriaCard label={lang === 'uz' ? "Ravonlik va aloqa" : "Fluency & Coherence"} desc={lang === 'uz' ? "Nutq oqimi va mantiqiy tashkil qilish" : "Speech flow and logical organization"} percent="25%" color="bg-blue-50 text-blue-600 border-blue-100" />
                                <CriteriaCard label={lang === 'uz' ? "Lug'at boyligi" : "Lexical Resource"} desc={lang === 'uz' ? "So'z boyligi va aniqligi" : "Vocabulary range and accuracy"} percent="25%" color="bg-emerald-50 text-emerald-600 border-emerald-100" />
                                <CriteriaCard label={lang === 'uz' ? "Grammatik ko'lam" : "Grammatical Range"} desc={lang === 'uz' ? "Grammatik xilma-xillik va aniqlik" : "Grammar variety and accuracy"} percent="25%" color="bg-purple-50 text-purple-600 border-purple-100" />
                                <CriteriaCard label={lang === 'uz' ? "Talaffuz" : "Pronunciation"} desc={lang === 'uz' ? "Aniq nutq va tabiiy ohanglar" : "Clear speech and natural patterns"} percent="25%" color="bg-orange-50 text-orange-600 border-orange-100" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Speaking Success Tips --- */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <Target className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {lang === 'uz' ? "Speaking-da muvaffaqiyat qozonish uchun maslahatlar" : "Speaking Success Tips"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <p className="text-sm font-black text-blue-600 uppercase tracking-widest">{lang === 'uz' ? "Speaking-dan oldin" : "Before Speaking"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 font-bold list-none">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {lang === 'uz' ? "Dam oling va ishonch bilan bo'ling" : "Relax and be confident"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {lang === 'uz' ? "Savollarni diqqat bilan eshiting" : "Listen carefully to questions"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {lang === 'uz' ? "Javob berishdan oldin o'ylash uchun vaqt oling" : "Take time to think before answering"}
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">{lang === 'uz' ? "Speaking paytida" : "During Speaking"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 font-bold list-none">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    {lang === 'uz' ? "Aniq va odatdagi tezlikda so'zlang" : "Speak clearly and at normal pace"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    {lang === 'uz' ? "Lug'at boyligidan foydalaning" : "Use a range of vocabulary"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    {lang === 'uz' ? "Misollar bilan kengaytirilgan javob bering" : "Give extended answers with examples"}
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-black text-purple-600 uppercase tracking-widest">{lang === 'uz' ? "Murakkab maslahatlar" : "Advanced Tips"}</p>
                            <ul className="space-y-3 text-xs text-slate-500 font-bold list-none">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    {lang === 'uz' ? "Bog'lovchi so'zlardan samarali foydalaning" : "Use discourse markers effectively"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    {lang === 'uz' ? "Shaxsiy fikr va g'oyalarni ko'rsating" : "Show personal opinions and ideas"}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
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
            <span className={cn("text-2xl font-black mb-1", color)}>{value}</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{label}</span>
        </div>
    );
}

function CriteriaCard({ label, desc, percent, color }: { label: string, desc: string, percent: string, color: string }) {
    return (
        <div className={cn("p-4 rounded-2xl border flex items-center justify-between", color)}>
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
            className="group bg-white border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    {lang === 'uz' ? `${lesson.lessonNumber}-Dars` : `Lesson ${lesson.lessonNumber}`}
                </span>
                {isCompleted && (
                    <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6 flex-1">
                <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-rose-600 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-rose-400" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 text-rose-500" :
                    lesson.typeBadge === "Overview" ? "bg-slate-50 text-slate-500" :
                    lesson.typeBadge === "Skills" ? "bg-blue-50 text-blue-500" : "bg-rose-50 text-rose-500"
                )}>
                    {lesson.typeBadge}
                </div>
            </div>

            <div className="flex items-center justify-between items-center mb-6">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.level === "Expert" ? "bg-rose-50 text-rose-500" :
                    lesson.level === "Advanced" ? "bg-amber-50 text-amber-500" :
                    lesson.level === "Intermediate" ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"
                )}>
                    {lesson.level}
                </div>
            </div>

            <Link href={lesson.id === "s-lesson-1" ? "/practice/speaking" : `/practice/speaking/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 text-slate-600 hover:bg-slate-100" 
                        : "bg-slate-900 text-white hover:bg-rose-600 hover:shadow-rose-200"
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
            className="group bg-white/50 border border-slate-100 rounded-2xl p-4 hover:border-rose-200 hover:bg-white hover:shadow-lg transition-all"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{lang === 'uz' ? "Mock Test" : "Mock Practice"}</span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                        <Clock className="w-2.5 h-2.5" />
                        {test.duration}
                    </div>
                </div>
                <h4 className="text-xs font-bold text-slate-700 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {test.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded-md">{test.level}</span>
                    <Link href={`/practice/${type}/${test.id}`} className="text-rose-500 group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
