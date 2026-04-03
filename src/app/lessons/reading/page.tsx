"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    BookOpen, 
    CheckCircle2, 
    Clock, 
    ChevronRight,
    Lightbulb,
    Target,
    PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";
import { READING_LESSONS } from "@/data/reading-lessons";
import { createClient } from "@/utils/supabase/client";

const PRACTICE_TESTS = [
    { id: "homers-literary-legacy", title: "Homer's Literary Legacy", status: "premium" as const },
    { id: "the-rise-of-agribots", title: "The Rise of Agribots", status: "premium" as const },
    { id: "fp-9", title: "Socially Responsible Businesses", status: "free" as const },
    { id: "south-pole-adventurer", title: "South Pole Adventurer", status: "free" as const },
    { id: "fp-13", title: "The Dover Bronze-Age Boat", status: "free" as const },
    { id: "fp-14", title: "A Closer Examination of a Study on Verbal and Non-Verbal Message", status: "free" as const },
    { id: "fp-15", title: "Katherine Mansfield", status: "free" as const },
    { id: "fp-16", title: "Aphantasia: A life without mental images", status: "free" as const },
    { id: "fp-17", title: "Australian artist Margaret Preston", status: "free" as const },
    { id: "fp-18", title: "Life lessons from villains, crooks and gangsters", status: "free" as const },
    { id: "fp-19", title: "Fear of the Unknown", status: "free" as const },
    { id: "fp-20", title: "Britain needs strong TV industry", status: "free" as const },
    { id: "fp-21", title: "How to find your way out of a food desert", status: "free" as const },
    { id: "fp-22", title: "Insect decision-making", status: "free" as const },
    { id: "fp-23", title: "Why Do We Touch Strangers So Much?", status: "free" as const },
    { id: "fp-24", title: "Economic Evolution", status: "free" as const },
    { id: "fp-10", title: "Crop-growing skyscrapers", status: "free" as const },
    { id: "fp-11", title: "The Falkirk Wheel", status: "free" as const },
    { id: "fp-12", title: "Reducing the Effects of Climate Change", status: "free" as const },
    { id: "fp-3", title: "Raising the Mary Rose", status: "free" as const },
    { id: "fp-4", title: "What destroyed the civilisation of Easter Island?", status: "free" as const },
    { id: "mock-1-p1", title: "Tea and the Industrial Revolution", status: "free" as const },
    { id: "mock-1-p2", title: "Gifted children and learning", status: "free" as const },
    { id: "mock-1-p3", title: "Museums of fine art and their public", status: "free" as const },
    { id: "mock-2-p1", title: "Our Vanishing Night", status: "free" as const },
    { id: "mock-2-p2", title: "Endless Harvest", status: "free" as const },
    { id: "mock-2-p3", title: "Film Noir", status: "free" as const },
    { id: "mock-3-p1", title: "Development of Adolescence", status: "free" as const },
    { id: "mock-3-p2", title: "Intelligence and Giftedness", status: "free" as const },
    { id: "mock-3-p3", title: "Communicating Styles and Conflict", status: "free" as const },
    { id: "mock-4-p1", title: "Can animals count?", status: "free" as const },
    { id: "mock-4-p2", title: "Is It Time To Halt the Rising Tide of Plastic Packaging?", status: "free" as const },
    { id: "mock-4-p3", title: "The Growth of Intelligence", status: "free" as const },
    { id: "mock-5-p1", title: "Nutmeg – a valuable spice", status: "free" as const },
    { id: "mock-5-p2", title: "Driverless cars", status: "free" as const },
    { id: "mock-5-p3", title: "What is exploration?", status: "free" as const },
    { id: "mock-6-p1", title: "Could urban engineers learn from dance?", status: "free" as const },
    { id: "mock-6-p2", title: "Should we try to bring extinct species back to life?", status: "free" as const },
    { id: "mock-6-p3", title: "Having a laugh", status: "free" as const },
    { id: "mt-1", title: "IELTS Reading Mock Test 1 (Full)", status: "free" as const },
    { id: "mock-2-full", title: "IELTS Reading Mock Test 2 (Full)", status: "free" as const },
    { id: "mock-3-full", title: "IELTS Reading Mock Test 3 (Full)", status: "free" as const },
    { id: "mock-4-full", title: "IELTS Reading Mock Test 4 (Full)", status: "free" as const },
    { id: "mock-5-full", title: "IELTS Reading Mock Test 5 (Full)", status: "free" as const },
    { id: "mock-6-full", title: "IELTS Reading Mock Test 6 (Full)", status: "free" as const },
    { id: "mock-7-full", title: "IELTS Reading Mock Test 7 (Full)", status: "free" as const },
];

export default function ReadingSkillsPage() {
    const { lang } = useLanguage();
    const supabase = createClient();
    const [bestScores, setBestScores] = useState<Record<string, { score: number; total: number }>>({});
    
    // Calculate stats
    const totalItems = READING_LESSONS.length;
    const completedItems = READING_LESSONS.filter(l => l.status === "completed").length;
    const progressPercent = Math.round((completedItems / totalItems) * 100);
    const avgScore = 85;
    const remainingItems = totalItems - completedItems;

    useEffect(() => {
        const fetchScores = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from("test_results")
                .select("test_id, score, total_questions")
                .eq("user_id", user.id);
            if (data) {
                const scores: Record<string, { score: number; total: number }> = {};
                data.forEach((r: any) => {
                    if (!scores[r.test_id] || r.score > scores[r.test_id].score)
                        scores[r.test_id] = { score: r.score, total: r.total_questions };
                });
                setBestScores(scores);
            }
        };
        fetchScores();
    }, [supabase]);

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

                {/* --- Practice Passages --- */}
                <div className="space-y-8 pt-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                        <h2 className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors">
                            {lang === 'uz' ? "Amaliyot Matnlari" : "Practice Passages"}
                        </h2>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 transition-colors" />
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
                    >
                        {PRACTICE_TESTS.map((test) => (
                            <motion.div
                                key={test.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.5 } },
                                }}
                                className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {/* Badges */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                                        test.status === "free"
                                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400"
                                            : "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/50 text-amber-600 dark:text-amber-400"
                                    )}>
                                        {test.status === "free" ? (lang === "uz" ? "Bepul" : "Free") : "Premium"}
                                    </span>
                                    {bestScores[test.id] && (
                                        <div className="flex items-center gap-1 text-[10px] text-white font-bold bg-blue-500 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            {bestScores[test.id].score}/{bestScores[test.id].total}
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-4 flex-1 min-h-[2.5em]">
                                    {test.title}
                                </h4>

                                {/* Button */}
                                <Link href={`/practice/reading/${test.id}`} className="w-full">
                                    <button className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 group-hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300">
                                        <PlayCircle className="w-3.5 h-3.5 fill-current opacity-90" />
                                        {lang === 'uz' ? "Boshlash" : "Start"}
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>


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


