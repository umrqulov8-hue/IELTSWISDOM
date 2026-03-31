"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    Headphones, 
    Volume2,
    Calendar,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { LISTENING_LESSONS } from "@/data/listening-lessons";
import dynamic from "next/dynamic";

// --- Dynamic Imports for Performance ---
const ListeningLessonsGrid = dynamic(() => import("./ListeningLessonsGrid"), { 
    ssr: false,
    loading: () => <div className="h-40 animate-pulse bg-slate-50 rounded-3xl" />
});

const ListeningPracticeGrid = dynamic(() => import("./ListeningPracticeGrid"), { 
    ssr: false 
});

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
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-800/50 transition-colors">
                            <Headphones className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors">
                                {lang === 'uz' ? "Eshitish Ko'nikmalari" : "Listening Skills"}
                                <span className="text-[10px] font-bold px-2 py-1 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all">
                                    {completedItems}/{totalItems} {lang === 'uz' ? "Bajarildi" : "Completed"}
                                </span>
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">
                                {lang === 'uz' ? "Barcha bo'limlar bo'ylab eshitish qobiliyatingiz rivojlanishini kuzatib boring" : "Track your listening skill development across all sections"}
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
                                <h2 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">{lang === 'uz' ? "Eshitish Jarayoni" : "Listening Progress"}</h2>
                                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 transition-colors">{progressPercent}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-1 border border-slate-50 dark:border-slate-800 shadow-inner transition-colors">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-slate-900 dark:bg-indigo-500 rounded-full shadow-lg"
                                />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest transition-colors">
                                {lang === 'uz' ? "Eshitish ko'nikmalaringizni rivojlanishini kuzating" : "Track your listening skill development across all sections"}
                            </p>
                        </div>

                        <div className="grid grid-cols-4 md:col-span-2 gap-2">
                            <StatItem label={lang === 'uz' ? "Bajarildi" : "Completed"} value={completedItems} color="text-emerald-700 dark:text-emerald-500" />
                            <StatItem label={lang === 'uz' ? "O'rtacha ball" : "Avg Score"} value="88%" color="text-indigo-500 dark:text-indigo-400" />
                            <StatItem label={lang === 'uz' ? "Bo'limlar" : "Sections"} value={1} color="text-purple-700 dark:text-purple-400" />
                            <StatItem label={lang === 'uz' ? "Ko'nikmalar" : "Skills"} value={1} color="text-blue-700 dark:text-blue-400" />
                        </div>
                    </div>
                </motion.div>

                {/* --- Lessons Grid --- */}
                <ListeningLessonsGrid lang={lang} />

                {/* --- Migrated Tests Section --- */}
                <ListeningPracticeGrid lang={lang} />

                {/* --- Listening Test Structure & Tips --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mt-16 shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors">
                            <Volume2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            {lang === 'uz' ? "Listening Testining Tuzilishi va Maslahatlar" : "Listening Test Structure & Tips"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                <Calendar className="w-4 h-4 text-indigo-500" />
                                {lang === 'uz' ? "Test Tuzilishi (30 daqiqa + 10 daqiqa o'tkazish)" : "Test Structure (30 minutes + 10 minutes transfer)"}
                            </h3>
                            <div className="space-y-3">
                                <StructureRow label={lang === 'uz' ? "1-bo'lim: Ijtimoiy vaziyat" : "Section 1: Social situation"} count="10 questions" color="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50" />
                                <StructureRow label={lang === 'uz' ? "2-bo'lim: Umumiy qiziqishlar" : "Section 2: General interest"} count="10 questions" color="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/50" />
                                <StructureRow label={lang === 'uz' ? "3-bo'lim: Ta'lim konteksti" : "Section 3: Educational context"} count="10 questions" color="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50" />
                                <StructureRow label={lang === 'uz' ? "4-bo'lim: Akademik ma'ruza" : "Section 4: Academic lecture"} count="10 questions" color="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800/50" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
                                <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400 transition-colors" />
                                {lang === 'uz' ? "Asosiy Strategiyalar" : "Essential Strategies"}
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium list-none transition-colors">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Audio boshlanishidan oldin savollarni o'qing" : "Read questions before the audio starts"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Sizga qanday javob kerakligini taxmin qiling" : "Predict what kind of answer you need"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Kalit so'zlarni va sinonimlarni tinglang" : "Listen for keywords and synonyms"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "Agar javobni o'tkazib yuborsangiz, vahima qo'ymang" : "Don't panic if you miss an answer"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
                                    {lang === 'uz' ? "10 daqiqalik o'tkazish vaqtidan unumli foydalaning" : "Use the 10-minute transfer time wisely"}
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 transition-colors" />
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
            <span className={cn("text-2xl font-black mb-1 transition-colors", color)}>{value}</span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center transition-colors">{label}</span>
        </div>
    );
}

function StructureRow({ label, count, color }: { label: string, count: string, color: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm transition-all">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors">{label}</span>
            <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg transition-colors border", color)}>{count}</span>
        </div>
    );
}
