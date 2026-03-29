"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    Headphones, 
    CheckCircle2, 
    Clock, 
    ChevronRight, 
    Zap,
    Target,
    Lightbulb,
    FileText,
    Volume2,
    Calendar,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LISTENING_LESSONS, MIGRATED_LISTENING_TESTS } from "@/data/listening-lessons";

export default function ListeningSkillsPage() {
    const { lang } = useLanguage();
    
    const totalItems = LISTENING_LESSONS.length;
    const completedItems = LISTENING_LESSONS.filter(l => l.status === "completed").length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);

    return (
        <DashboardLayout
            title={lang === 'uz' ? "Eshitish Ko'nikmalari" : "Listening Skills"}
            description={lang === 'uz' ? "Keng qamrovli amaliyot va strategiyalar orqali IELTS Listening-ni o'zlashtiring" : "Master IELTS Listening through comprehensive practice and strategies"}
        >
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                            <Headphones className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                {lang === 'uz' ? "Eshitish Ko'nikmalari" : "Listening Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-indigo-600 text-white rounded-lg shadow-sm shadow-indigo-200">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                {lang === 'uz' ? "Barcha bo'limlar bo'ylab eshitish qobiliyatingiz rivojlanishini kuzatib boring" : "Track your listening skill development across all sections"}
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
                                <h3 className="font-bold text-slate-800 tracking-tight">{lang === 'uz' ? "Eshitish Jarayoni" : "Listening Progress"}</h3>
                                <span className="text-2xl font-black text-indigo-600">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-50 shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
                                {lang === 'uz' ? "Eshitish ko'nikmalaringizni rivojlanishini kuzating" : "Track your listening skill development across all sections"}
                            </p>
                        </div>

                        <div className="grid grid-cols-4 md:col-span-2 gap-2">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-emerald-700" />
                            <StatItem label={lang === 'uz' ? "O'rtacha ball" : "Avg Score"} value="88%" color="text-indigo-500" />
                            <StatItem label={lang === 'uz' ? "Bo'limlar" : "Sections"} value={1} color="text-purple-700" />
                            <StatItem label={lang === 'uz' ? "Ko'nikmalar" : "Skills"} value={1} color="text-blue-700" />
                        </div>
                    </div>
                </motion.div>

                {/* --- Lessons Grid --- */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-100" />
                        <h2 className="text-sm font-black text-slate-600 uppercase tracking-[0.2em]">
                            {lang === 'uz' ? "Darslar" : "Structured Lessons"}
                        </h2>
                        <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {LISTENING_LESSONS.map((lesson, idx) => (
                            <ListeningLessonCard key={lesson.id} lesson={lesson} index={idx} lang={lang} />
                        ))}
                    </div>
                </div>

                {/* --- Migrated Tests Section --- */}
                {MIGRATED_LISTENING_TESTS.length > 0 && (
                    <div className="space-y-8 pt-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100" />
                            <h2 className="text-sm font-black text-slate-600 uppercase tracking-[0.2em]">
                                {lang === 'uz' ? "Mock Testlar" : "Mock Practice"}
                            </h2>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MIGRATED_LISTENING_TESTS.map((test, idx) => (
                                <PracticeCard key={test.id} test={test} index={idx} lang={lang} type="listening" />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Listening Test Structure & Tips --- */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 mt-16 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <Volume2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {lang === 'uz' ? "Listening Testining Tuzilishi va Maslahatlar" : "Listening Test Structure & Tips"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-indigo-500" />
                                {lang === 'uz' ? "Test Tuzilishi (30 daqiqa + 10 daqiqa o'tkazish)" : "Test Structure (30 minutes + 10 minutes transfer)"}
                            </h3>
                            <div className="space-y-3">
                                <StructureRow label={lang === 'uz' ? "1-bo'lim: Ijtimoiy vaziyat" : "Section 1: Social situation"} count="10 questions" color="bg-blue-50 text-blue-600" />
                                <StructureRow label={lang === 'uz' ? "2-bo'lim: Umumiy qiziqishlar" : "Section 2: General interest"} count="10 questions" color="bg-purple-50 text-purple-600" />
                                <StructureRow label={lang === 'uz' ? "3-bo'lim: Ta'lim konteksti" : "Section 3: Educational context"} count="10 questions" color="bg-indigo-50 text-indigo-600" />
                                <StructureRow label={lang === 'uz' ? "4-bo'lim: Akademik ma'ruza" : "Section 4: Academic lecture"} count="10 questions" color="bg-rose-50 text-rose-700" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Target className="w-4 h-4 text-emerald-700" />
                                {lang === 'uz' ? "Asosiy Strategiyalar" : "Essential Strategies"}
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-500 font-medium list-none">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "Audio boshlanishidan oldin savollarni o'qing" : "Read questions before the audio starts"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "Sizga qanday javob kerakligini taxmin qiling" : "Predict what kind of answer you need"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "Kalit so'zlarni va sinonimlarni tinglang" : "Listen for keywords and synonyms"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "Agar javobni o'tkazib yuborsangiz, vahima qo'ymang" : "Don't panic if you miss an answer"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "10 daqiqalik o'tkazish vaqtidan unumli foydalaning" : "Use the 10-minute transfer time wisely"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                                    {lang === 'uz' ? "Yozilishni va so'z chegaralarini tekshiring" : "Check spelling and word limits"}
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
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">{label}</span>
        </div>
    );
}

function StructureRow({ label, count, color }: { label: string, count: string, color: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 shadow-sm">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg", color)}>{count}</span>
        </div>
    );
}

function ListeningLessonCard({ lesson, index, lang }: { lesson: any, index: number, lang: string }) {
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
                    <div className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6 flex-1">
                <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 text-rose-700" :
                    lesson.typeBadge === "Overview" ? "bg-slate-50 text-slate-500" :
                    lesson.typeBadge === "Skills" ? "bg-blue-50 text-blue-700" : 
                    lesson.typeBadge.includes("Section") ? "bg-purple-50 text-purple-700" : "bg-indigo-50 text-indigo-500"
                )}>
                    {lesson.typeBadge}
                </div>
            </div>

            <div className="flex items-center justify-between items-center mb-6">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.level === "Expert" ? "bg-rose-50 text-rose-700" :
                    lesson.level === "Advanced" ? "bg-amber-50 text-amber-700" :
                    lesson.level === "Intermediate" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"
                )}>
                    {lesson.level}
                </div>
                {lesson.score && (
                    <span className="text-[10px] font-black text-emerald-700">Score: {lesson.score}%</span>
                )}
            </div>

            <Link href={lesson.id === "l-lesson-1" ? "/practice/listening" : `/practice/listening/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 text-slate-600 hover:bg-slate-100" 
                        : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200"
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
            className="group bg-white/50 border border-slate-100 rounded-2xl p-4 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        {lang === 'uz' ? "Mock Test" : "Mock Practice"}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-700">
                        <Clock className="w-2.5 h-2.5" />
                        {test.duration}
                    </div>
                </div>
                <h4 className="text-xs font-bold text-slate-700 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {test.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-50 text-slate-700 rounded-md">{test.level}</span>
                    <Link 
                        href={`/practice/${type}/${test.id}`} 
                        aria-label={lang === 'uz' ? "Testni boshlash" : "Start Test"}
                        className="text-indigo-600 group-hover:translate-x-1 transition-transform"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
