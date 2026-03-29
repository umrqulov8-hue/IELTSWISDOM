"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
    Play, 
    CheckCircle2, 
    Star, 
    Clock, 
    Award, 
    TrendingUp, 
    BookOpen, 
    Headphones, 
    PenTool, 
    Mic,
    Info,
    ChevronRight,
    Trophy,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_TESTS_DASHBOARD, MockTestMeta } from "@/data/mock-exams-dashboard";

export default function MockExamsPage() {
    const { lang } = useLanguage();
    const router = useRouter();
    const [isStarting, setIsStarting] = useState(false);

    const completedCount = MOCK_TESTS_DASHBOARD.filter(t => t.status === "completed").length;
    const totalTests = MOCK_TESTS_DASHBOARD.length;
    const progressPercent = Math.round((completedCount / totalTests) * 100);

    return (
        <>
            <AnimatePresence>
                {isStarting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center text-slate-800"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-center space-y-8"
                        >
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto relative">
                                <motion.div 
                                    className="absolute inset-0 bg-blue-100 rounded-full"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <ShieldCheck className="w-12 h-12 text-blue-600 relative z-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tight text-slate-900">Preparing Exam Center</h3>
                                <p className="text-slate-500 font-medium">Entering secure examination mode...</p>
                            </div>
                            <div className="w-64 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden border border-slate-200">
                                <motion.div 
                                    className="h-full bg-blue-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <DashboardLayout 
                title={lang === 'uz' ? "IELTS Mock Testlar" : "IELTS Mock Tests"}
                description={lang === 'uz' ? "Haqiqiy IELTS imtihon muhitini simulyatsiya qilish uchun 30 ta to'liq amaliy testlar" : "30 complete practice tests to simulate real IELTS exam conditions"}
            >
                <div className="max-w-7xl mx-auto space-y-12 pb-20 pt-6">
                    
                    {/* --- Header & Summary Badge --- */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-amber-700" />
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {lang === 'uz' ? "Mock Testlar" : "IELTS Mock Tests"}
                            </h2>
                        </div>
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {completedCount}/{totalTests} {lang === 'uz' ? "Tugallandi" : "Completed"}
                        </div>
                    </div>

                    {/* --- Progress Overview Card --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm space-y-10"
                    >
                        <div>
                            <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                                {lang === 'uz' ? "Test natijalari sharhi" : "Test Progress Overview"}
                            </h2>
                            <p className="text-sm font-bold text-slate-500">
                                {lang === 'uz' ? "Barcha mock testlar bo'yicha ko'rsatkichlaringizni kuzatib boring" : "Track your performance across all mock tests"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <SummaryStat label={lang === 'uz' ? "Topshirilgan Testlar" : "Tests Completed"} value={completedCount} color="text-slate-900" />
                            <SummaryStat label={lang === 'uz' ? "O'rtacha Band" : "Average Band Score"} value="7.4" color="text-emerald-700" />
                            <SummaryStat label={lang === 'uz' ? "Band 7+ Natijalar" : "Band 7+ Scores"} value="4" color="text-blue-700" />
                            <SummaryStat label={lang === 'uz' ? "Qolgan Testlar" : "Tests Remaining"} value={totalTests - completedCount} color="text-slate-600" />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    className="h-full bg-slate-900 rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Skill Averages --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SkillAvg icon={<BookOpen className="w-5 h-5" />} label={lang === 'uz' ? "Reading Avg" : "Reading Avg"} value="35/40" color="bg-blue-50 text-blue-700" />
                        <SkillAvg icon={<PenTool className="w-5 h-5" />} label={lang === 'uz' ? "Writing Avg" : "Writing Avg"} value="33/40" color="bg-purple-50 text-purple-700" />
                        <SkillAvg icon={<Headphones className="w-5 h-5" />} label={lang === 'uz' ? "Listening Avg" : "Listening Avg"} value="37/40" color="bg-emerald-50 text-emerald-700" />
                        <SkillAvg icon={<Mic className="w-5 h-5" />} label={lang === 'uz' ? "Speaking Avg" : "Speaking Avg"} value="7.6" color="bg-rose-50 text-rose-700" />
                    </div>

                    {/* --- Test Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_TESTS_DASHBOARD.map((test, idx) => (
                            <MockExamCard 
                                key={test.id} 
                                test={test} 
                                lang={lang} 
                                onStart={() => {
                                    setIsStarting(true);
                                    setTimeout(() => router.push(`/mock-exams/${idx}/pre-check`), 3500);
                                }}
                            />
                        ))}
                    </div>

                    {/* --- Info Section --- */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-sm space-y-12">
                        <div className="space-y-2">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {lang === 'uz' ? "Mock Test haqida ma'lumot" : "Mock Test Information"}
                            </h2>
                            <p className="text-sm font-bold text-slate-700">
                                {lang === 'uz' ? "Bizning IELTS amaliy testlarimizdan nimalarni kutish kerak" : "What to expect from our IELTS practice tests"}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <InfoGroup title={lang === 'uz' ? "Test Tuzilishi" : "Test Structure"}>
                                    <InfoItem label={lang === 'uz' ? "Reading: 60 daqiqa, 40 savol" : "Reading: 60 minutes, 40 questions"} />
                                    <InfoItem label={lang === 'uz' ? "Writing: 60 daqiqa, 2 topshiriq" : "Writing: 60 minutes, 2 tasks"} />
                                    <InfoItem label={lang === 'uz' ? "Listening: 30 daqiqa, 40 savol" : "Listening: 30 minutes, 40 questions"} />
                                    <InfoItem label={lang === 'uz' ? "Speaking: 11-14 daqiqa, 3 qism" : "Speaking: 11-14 minutes, 3 parts"} />
                                </InfoGroup>
                                <InfoGroup title={lang === 'uz' ? "Qiyinchilik darajasi" : "Difficulty Progression"}>
                                    <InfoItem label={lang === 'uz' ? "Boshlang'ich (1-10): Band 5.0-6.5 maqsad" : "Beginner (1-10): Band 5.0-6.5 target"} />
                                    <InfoItem label={lang === 'uz' ? "O'rta (11-20): Band 6.0-7.5 maqsad" : "Intermediate (11-20): Band 6.0-7.5 target"} />
                                    <InfoItem label={lang === 'uz' ? "Yuqori (21-30): Band 7.0-9.0 maqsad" : "Advanced (21-30): Band 7.0-9.0 target"} />
                                </InfoGroup>
                            </div>
                            <div className="space-y-8">
                                <InfoGroup title={lang === 'uz' ? "Xususiyatlari" : "Features"}>
                                    <InfoItem label={lang === 'uz' ? "Haqiqiy IELTS uslubidagi savollar" : "Authentic IELTS-style questions"} />
                                    <InfoItem label={lang === 'uz' ? "Vaqt bilan bosim ostida ishlash" : "Timed test conditions"} />
                                    <InfoItem label={lang === 'uz' ? "Batafsil ishlash tahlili" : "Detailed performance analysis"} />
                                    <InfoItem label={lang === 'uz' ? "Bo'lim bo'yicha qayta aloqa" : "Section-by-section feedback"} />
                                    <InfoItem label={lang === 'uz' ? "Band ballarini bashorat qilish" : "Band score predictions"} />
                                </InfoGroup>
                                <InfoGroup title={lang === 'uz' ? "Ochish Talablari" : "Unlock Requirements"}>
                                    <InfoItem label={lang === 'uz' ? "Yangi testlarni ochish uchun oldingilarini yakunlang" : "Complete previous tests to unlock new ones"} />
                                    <InfoItem label={lang === 'uz' ? "Muntazam mashg'ulot jadvalini saqlang" : "Maintain consistent practice schedule"} />
                                    <InfoItem label={lang === 'uz' ? "Fikr-mulohazalarni ko'rib chiqing va zaif tomonlarni kuchaytiring" : "Review feedback and improve weak areas"} />
                                </InfoGroup>
                            </div>
                        </div>
                    </div>

                </div>
            </DashboardLayout>
        </>
    );
}

function SummaryStat({ label, value, color }: { label: string, value: string | number, color: string }) {
    return (
        <div className="text-center space-y-2">
            <p className={cn("text-4xl font-black tracking-tight", color)}>{value}</p>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{label}</p>
        </div>
    );
}

function SkillAvg({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", color)}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-lg font-black text-slate-900 tracking-tight">{value}</p>
            </div>
        </div>
    );
}

function MockExamCard({ test, lang, onStart }: { test: MockTestMeta, lang: string, onStart: () => void }) {
    const isCompleted = test.status === "completed";
    
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={cn(
                "bg-white border rounded-[2.5rem] p-8 flex flex-col space-y-6 relative group transition-all duration-300",
                isCompleted ? "border-emerald-100 shadow-sm" : "border-slate-50 hover:border-slate-200 hover:shadow-lg"
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600">{lang === 'uz' ? `Test ${test.index + 1}` : `Test ${test.index + 1}`}</span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    {test.isFavorite && <Star className="w-4 h-4 text-amber-600 fill-amber-600" />}
                </div>
                <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    test.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-800" :
                    test.difficulty === "Intermediate" ? "bg-amber-50 text-amber-800" :
                    "bg-rose-50 text-rose-800"
                )}>
                    {lang === 'uz' ? (test.difficulty === "Beginner" ? "Boshlang'ich" : test.difficulty === "Intermediate" ? "O'rta" : "Yuqori") : test.difficulty}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                    {lang === 'uz' ? test.title.uz : test.title.en}
                </h3>
                <p className="text-xs font-bold text-slate-600 leading-relaxed line-clamp-2">
                    {lang === 'uz' ? test.desc.uz : test.desc.en}
                </p>
            </div>

            <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest text-slate-700">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                </div>
                
                {isCompleted && test.overall_band && (
                    <div className="pt-2 border-t border-slate-50 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Award className="w-4 h-4" />
                            <span>Overall Band: {test.overall_band}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-[9px] text-slate-600">
                            <div className="flex justify-between pr-4 border-r border-slate-100">
                                <span>Reading:</span> <span className="text-slate-900">{test.scores?.reading}</span>
                            </div>
                            <div className="flex justify-between pl-4">
                                <span>Writing:</span> <span className="text-slate-900">{test.scores?.writing}</span>
                            </div>
                            <div className="flex justify-between pr-4 border-r border-slate-100">
                                <span>Listening:</span> <span className="text-slate-900">{test.scores?.listening}</span>
                            </div>
                            <div className="flex justify-between pl-4">
                                <span>Speaking:</span> <span className="text-slate-900">{test.scores?.speaking}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button 
                onClick={onStart}
                className={cn(
                    "w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mt-2",
                    isCompleted 
                        ? "bg-slate-50 text-slate-900 border border-slate-100 hover:bg-slate-100" 
                        : "bg-slate-900 text-white shadow-lg hover:shadow-xl hover:bg-slate-800"
                )}
            >
                {isCompleted ? (
                    <>
                        <ChevronRight className="w-4 h-4" />
                        {lang === 'uz' ? "Natijalarni ko'rish" : "Review Results"}
                    </>
                ) : (
                    <>
                        <Play className="w-4 h-4 fill-white" />
                        {lang === 'uz' ? "Testni boshlash" : "Start Test"}
                    </>
                )}
            </button>
        </motion.div>
    );
}

function InfoGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h3>
            <ul className="space-y-3">
                {children}
            </ul>
        </div>
    );
}

function InfoItem({ label }: { label: string }) {
    return (
        <li className="flex items-start gap-2 text-sm font-bold text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0" />
            <span>{label}</span>
        </li>
    );
}
