"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    PenTool, 
    CheckCircle2, 
    Clock, 
    ChevronRight, 
    Layout,
    Target,
    Lightbulb,
    FileText,
    PieChart,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { WRITING_LESSONS, MIGRATED_WRITING_TESTS } from "@/data/writing-lessons";

export default function WritingSkillsPage() {
    const { lang } = useLanguage();
    
    const totalItems = WRITING_LESSONS.length;
    const completedItems = WRITING_LESSONS.filter(l => l.status === "completed").length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);

    return (
        <DashboardLayout
            title={lang === 'uz' ? "Yozish Ko'nikmalari" : "Writing Skills"}
            description={lang === 'uz' ? "Strukturaviy darslar va amaliyot orqali IELTS Akademik Yozish 1-topshiriq va 2-topshiriqni o'zlashtiring" : "Master IELTS Academic Writing Task 1 and Task 2 through structured lessons and practice"}
        >
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm border border-orange-100 dark:border-orange-800/50 transition-colors">
                            <PenTool className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors">
                                {lang === 'uz' ? "Yozish Ko'nikmalari" : "Writing Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-orange-600 dark:bg-orange-500 text-white rounded-lg shadow-sm shadow-orange-200 dark:shadow-none transition-all">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">
                                {lang === 'uz' ? "Yozish qobiliyatingiz rivojlanishini kuzatib boring" : "Track your writing skill development"}
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
                                <h2 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">{lang === 'uz' ? "Yozish Jarayoni" : "Writing Progress"}</h2>
                                <span className="text-2xl font-black text-orange-600 dark:text-orange-400 transition-colors">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-1 border border-slate-50 dark:border-slate-800 shadow-inner transition-colors">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 dark:bg-orange-500 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest transition-colors">
                                {lang === 'uz' ? "Yozish ko'nikmalaringizni rivojlanishini kuzating" : "Track your writing skill development"}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 md:col-span-2 gap-4">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-orange-500 dark:text-orange-400" />
                            <StatItem label={lang === 'uz' ? "1-topshiriq" : "Task 1"} value={1} color="text-blue-700 dark:text-blue-400" />
                            <StatItem label={lang === 'uz' ? "2-topshiriq" : "Task 2"} value={0} color="text-purple-700 dark:text-purple-400" />
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
                        {WRITING_LESSONS.map((lesson, idx) => (
                            <WritingLessonCard key={lesson.id} lesson={lesson} index={idx} lang={lang} />
                        ))}
                    </div>
                </div>

                {/* --- Migrated Tests Section --- */}
                {MIGRATED_WRITING_TESTS.length > 0 && (
                    <div className="space-y-8 pt-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                            <h2 className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors">
                                {lang === 'uz' ? "Mock Testlar" : "Mock Practice"}
                            </h2>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MIGRATED_WRITING_TESTS.map((test, idx) => (
                                <PracticeCard key={test.id} test={test} index={idx} lang={lang} type="writing" />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Writing Tips & Band Score Criteria --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mt-16 shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 transition-colors">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            {lang === 'uz' ? "Yozish bo'yicha maslahatlar va baholash mezonlari" : "Writing Tips & Band Score Criteria"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 transition-colors">
                                    <PieChart className="w-4 h-4 text-blue-700 dark:text-blue-400 transition-colors" />
                                    {lang === 'uz' ? "1-topshiriq (20 daqiqa, 150+ so'z)" : "Task 1 (20 minutes, 150+ words)"}
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium list-none transition-colors">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                        {lang === 'uz' ? "Asosiy tendentsiyalarni va xususiyatlarni tasvirlab bering" : "Describe the main trends and key features"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                        {lang === 'uz' ? "Umumiy sharh (overview) paragrafini kiriting" : "Include an overview paragraph"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                        {lang === 'uz' ? "Tasvirlaringizni qo'llab-quvvatlash uchun ma'lumotlardan foydalaning" : "Use data to support your descriptions"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                        {lang === 'uz' ? "O'z fikringizni bildirishdan yoki izohlashdan saqlaning" : "Avoid giving opinions or interpretations"}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 transition-colors">
                                    <MessageSquare className="w-4 h-4 text-purple-700 dark:text-purple-400 transition-colors" />
                                    {lang === 'uz' ? "2-topshiriq (40 daqiqa, 250+ so'z)" : "Task 2 (40 minutes, 250+ words)"}
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium list-none transition-colors">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                        {lang === 'uz' ? "Savolning barcha qismlariga javob bering" : "Address all parts of the question"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                        {lang === 'uz' ? "Aniq fikringizni misollar bilan taqdim eting" : "Present clear position with examples"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                        {lang === 'uz' ? "Mavzuga oid gaplar bilan paragraflardan foydalaning" : "Use paragraphs with clear topic sentences"}
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                        {lang === 'uz' ? "O'z pozitsiyangizni umumlashtirish bilan yakunlang" : "Conclude by summarizing your position"}
                                    </li>
                                </ul>
                            </div>
                        </div>
 
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6 transition-all">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                <Layout className="w-4 h-4 text-orange-600 transition-colors" />
                                {lang === 'uz' ? "Baholash Mezonlari" : "Assessment Criteria"}
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Topshiriq bajarilishi" : "Task Achievement"}</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white transition-colors">25%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Mantiq va bog'liqlik" : "Coherence & Cohesion"}</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white transition-colors">25%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Lug'at boyligi" : "Lexical Resource"}</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white transition-colors">25%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Grammatika va aniqlik" : "Grammar & Accuracy"}</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white transition-colors">25%</p>
                                </div>
                            </div>
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

function WritingLessonCard({ lesson, index, lang }: { lesson: any, index: number, lang: string }) {
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
                <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">
                    <Clock className="w-3 h-3 text-orange-400 dark:text-orange-300 transition-colors" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.typeBadge === "Theory" ? "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400" :
                    lesson.typeBadge === "Task 2" ? "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400" : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
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
                {lesson.score && (
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 transition-colors">Score: {lesson.score}%</span>
                )}
            </div>

            <Link href={lesson.id === "w-lesson-1" ? "/practice/writing" : `/practice/writing/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white"
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
            className="group bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:border-orange-200 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-800 transition-all lg:hover:shadow-lg"
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
