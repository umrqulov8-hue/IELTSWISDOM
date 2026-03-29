"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    User, 
    Mail, 
    Calendar, 
    Award, 
    Clock, 
    TrendingUp, 
    BookOpen, 
    Headphones, 
    PenTool, 
    Mic,
    ChevronRight,
    Search,
    Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ProfilePage() {
    const { lang } = useLanguage();
    const { user } = useAuthContext();
    const { stats, loading } = useDashboard();

    if (loading) {
        return (
            <DashboardLayout title={lang === 'uz' ? "Profil" : "Profile"} description="">
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout 
            title={lang === 'uz' ? "Mening Profilim" : "My Profile"}
            description={lang === 'uz' ? "Hisobingiz sozlamalari va batafsil tahlillarni boshqaring" : "Manage your account settings and view detailed progress analytics"}
        >
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                
                {/* --- Profile Header --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center text-center space-y-6"
                    >
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-xl group-hover:scale-105 transition-transform">
                                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                            </div>
                            <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full shadow-lg" />
                        </div>
                        
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                {user?.user_metadata?.full_name || (lang === 'uz' ? "Foydalanuvchi" : "IELTS Scholar")}
                            </h2>
                            <p className="text-sm text-slate-400 font-bold flex items-center justify-center gap-2">
                                <Mail className="w-3 h-3" />
                                {user?.email}
                            </p>
                        </div>

                        <div className="w-full pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'uz' ? "A'zolik" : "Joined"}</p>
                                <p className="text-sm font-bold text-slate-700">March 2024</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'uz' ? "Daraja" : "Level"}</p>
                                <p className="text-sm font-bold text-slate-700">{stats?.estimated_level || "Beginner"}</p>
                            </div>
                        </div>

                        <Link href="/settings" className="w-full">
                            <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors">
                                {lang === 'uz' ? "Profilni tahrirlash" : "Edit Profile"}
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <StatsCard 
                            icon={<Award className="w-5 h-5 text-amber-500" />}
                            label={lang === 'uz' ? "O'rtacha Band" : "Avg Band Score"}
                            value={stats?.estimated_level.includes('Advanced') ? "7.5" : stats?.estimated_level.includes('Intermediate') ? "6.5" : "5.5"}
                            subLabel={lang === 'uz' ? "Hozirgi taxmin" : "Current estimate"}
                            bgColor="bg-amber-50"
                        />
                        <StatsCard 
                            icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
                            label={lang === 'uz' ? "O'zlashtirish" : "Total Progress"}
                            value={`${stats?.progress_percentage || 0}%`}
                            subLabel={lang === 'uz' ? "Umumiy darslardan" : "From all lessons"}
                            bgColor="bg-emerald-50"
                        />
                        <StatsCard 
                            icon={<Clock className="w-5 h-5 text-blue-500" />}
                            label={lang === 'uz' ? "O'quv Zarbi" : "Study Streak"}
                            value={`${stats?.current_streak || 0} ${lang === 'uz' ? "Kun" : "Days"}`}
                            subLabel={lang === 'uz' ? "Ketma-ket" : "In a row"}
                            bgColor="bg-blue-50"
                        />
                        <StatsCard 
                            icon={<BookOpen className="w-5 h-5 text-purple-500" />}
                            label={lang === 'uz' ? "Topshirilgan Testlar" : "Tests Completed"}
                            value={
                                (stats?.reading_tests_completed || 0) + 
                                (stats?.listening_tests_completed || 0) + 
                                (stats?.writing_tests_completed || 0)
                            }
                            subLabel={lang === 'uz' ? "Barcha modullar" : "Across all modules"}
                            bgColor="bg-purple-50"
                        />
                    </motion.div>
                </div>

                {/* --- Skill Breakdown --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkillProgressCard 
                        icon={<BookOpen className="w-4 h-4" />}
                        label={lang === 'uz' ? "O'qish" : "Reading"}
                        score={stats?.reading_average_score || 0}
                        progress={stats?.reading_progress || 0}
                        color="bg-blue-600"
                        lightColor="bg-blue-50"
                        textColor="text-blue-600"
                    />
                    <SkillProgressCard 
                        icon={<Headphones className="w-4 h-4" />}
                        label={lang === 'uz' ? "Eshitish" : "Listening"}
                        score={stats?.listening_average_score || 0}
                        progress={stats?.listening_progress || 0}
                        color="bg-indigo-600"
                        lightColor="bg-indigo-50"
                        textColor="text-indigo-600"
                    />
                    <SkillProgressCard 
                        icon={<PenTool className="w-4 h-4" />}
                        label={lang === 'uz' ? "Yozish" : "Writing"}
                        score={(stats?.writing_average_score || 0) * 10} // Just for visualization
                        progress={stats?.writing_progress || 0}
                        color="bg-orange-600"
                        lightColor="bg-orange-50"
                        textColor="text-orange-600"
                    />
                    <SkillProgressCard 
                        icon={<Mic className="w-4 h-4" />}
                        label={lang === 'uz' ? "Gapirish" : "Speaking"}
                        score={85}
                        progress={25}
                        color="bg-rose-600"
                        lightColor="bg-rose-50"
                        textColor="text-rose-600"
                    />
                </div>

                {/* --- Recent Activity --- */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {lang === 'uz' ? "Oxirgi faoliyat" : "Recent Activity"}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-600 transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ActivityRow 
                            icon={<BookOpen className="w-4 h-4 text-blue-600" />}
                            title="IELTS Reading Mock Test 7"
                            module="Reading"
                            score="32/40"
                            band="7.5"
                            date="2 days ago"
                        />
                        <ActivityRow 
                            icon={<PenTool className="w-4 h-4 text-orange-600" />}
                            title="Task 2: Essay Practice"
                            module="Writing"
                            score="B+"
                            band="7.0"
                            date="4 days ago"
                        />
                        <ActivityRow 
                            icon={<Headphones className="w-4 h-4 text-indigo-600" />}
                            title="Section 1: Listening Practice"
                            module="Listening"
                            score="38/40"
                            band="8.5"
                            date="1 week ago"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatsCard({ icon, label, value, subLabel, bgColor }: { icon: any, label: string, value: string | number, subLabel: string, bgColor: string }) {
    return (
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", bgColor)}>
                {icon}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
                <p className="text-xs text-slate-400 font-bold">{subLabel}</p>
            </div>
        </div>
    );
}

function SkillProgressCard({ icon, label, score, progress, color, lightColor, textColor }: { icon: any, label: string, score: number, progress: number, color: string, lightColor: string, textColor: string }) {
    return (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", lightColor, textColor)}>
                    {icon}
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                    <p className={cn("text-lg font-black tracking-tight", textColor)}>{score}%</p>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={cn("h-full rounded-full shadow-sm", color)}
                    />
                </div>
            </div>
        </div>
    );
}

function ActivityRow({ icon, title, module, score, band, date }: { icon: any, title: string, module: string, score: string, band: string, date: string }) {
    return (
        <div className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50 transition-all group">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{title}</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{module}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-10">
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-sm font-black text-slate-900">{score}</p>
                </div>
                <div className="text-right min-w-[3rem]">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Band</p>
                    <p className="text-sm font-black text-slate-900">{band}</p>
                </div>
                <div className="p-2 bg-white text-slate-300 rounded-xl border border-slate-100 group-hover:text-slate-900 group-hover:border-slate-200 transition-all">
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
