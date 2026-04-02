"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
    User, 
    Bell, 
    Globe, 
    Shield, 
    LogOut,
    ChevronRight,
    Moon,
    Volume2,
    Database,
    HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { lang, setLang } = useLanguage();
    const { user, signOut } = useAuthContext();
    const [notifs, setNotifs] = useState(true);
    const { theme, setTheme } = useTheme();
    const [updating, setUpdating] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/login";
    };

    return (
        <DashboardLayout 
            title={lang === 'uz' ? "Sozlamalar" : "Settings"}
            description={lang === 'uz' ? "O'quv afzalliklaringizni, xabarnomalarni va hisob sozlamalarini sozlang" : "Configure your learning preferences, notifications, and account settings"}
        >
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                
                {/* --- Account Section --- */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm space-y-8 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors" />
                        <h3 className="font-black text-slate-900 dark:text-white tracking-tight transition-colors">{lang === 'uz' ? "Hisob" : "Account"}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest transition-colors">{lang === 'uz' ? "To'liq ism" : "Full Name"}</label>
                                <input 
                                    className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-slate-300 dark:focus:border-slate-700 transition-all"
                                    defaultValue={user?.user_metadata?.full_name || ""}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest transition-colors">{lang === 'uz' ? "Email manzil" : "Email Address"}</label>
                                <input 
                                    className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 text-sm font-bold text-slate-600 dark:text-slate-400 cursor-not-allowed outline-none transition-colors duration-200"
                                    value={user?.email || ""}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] space-y-4 text-center transition-colors duration-200">
                            <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xl font-black shadow-lg transition-colors">
                                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                            </div>
                            <button className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                                {lang === 'uz' ? "Suratni o'zgartirish" : "Change Photo"}
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 flex justify-end transition-colors">
                        <button className="px-8 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                            {lang === 'uz' ? "Saqlash" : "Save Changes"}
                        </button>
                    </div>
                </section>

                {/* --- Preferences Section --- */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm space-y-6 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors" />
                        <h3 className="font-black text-slate-900 dark:text-white tracking-tight transition-colors">{lang === 'uz' ? "Afzalliklar" : "Preferences"}</h3>
                    </div>

                    <div className="space-y-2">
                        <ToggleItem 
                            icon={<Globe className="w-4 h-4" />}
                            label={lang === 'uz' ? "Til" : "Language"}
                            description={lang === 'uz' ? "Ilova interfeysi tili" : "App interface language"}
                            value={lang === 'en' ? "English" : "O'zbek"}
                            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
                        />
                        <ToggleItem 
                            icon={<Bell className="w-4 h-4" />}
                            label={lang === 'uz' ? "Bildirishnomalar" : "Notifications"}
                            description={lang === 'uz' ? "Xabarlar va dars eslatmalari" : "Bulletins and lesson reminders"}
                            active={notifs}
                            onClick={() => setNotifs(!notifs)}
                        />
                        <ToggleItem 
                            icon={<Moon className="w-4 h-4" />}
                            label={lang === 'uz' ? "Tungi rejim" : "Dark Mode"}
                            description={lang === 'uz' ? "Kam yoritilgan interfeys" : "Low-light interface"}
                            active={theme === 'dark'}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        />
                        <ToggleItem 
                            icon={<Volume2 className="w-4 h-4" />}
                            label={lang === 'uz' ? "Ovoz effektlari" : "Sound Effects"}
                            description={lang === 'uz' ? "Mashg'ulotlar paytidagi tovushlar" : "Audio cues during exercises"}
                            active={true}
                        />
                    </div>
                </section>

                {/* --- Privacy & Database --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm space-y-4 transition-colors duration-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-500 transition-colors" />
                            <h3 className="font-black text-slate-900 dark:text-white tracking-tight transition-colors">{lang === 'uz' ? "Xavfsizlik" : "Security"}</h3>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-bold leading-relaxed transition-colors">
                            {lang === 'uz' ? "Hisobingiz ma'lumotlari xavfsiz va maxfiylik deklaratsiyasiga ko'ra saqlanadi." : "Your account data is secured and stored according to our privacy policy."}
                        </p>
                        <button className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline pt-2 inline-block transition-colors">
                            {lang === 'uz' ? "Parolni yangilash" : "Update Password"}
                        </button>
                    </section>

                    <section className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-[2rem] p-8 space-y-4 transition-colors duration-200">
                        <div className="flex items-center gap-3 mb-2">
                            <LogOut className="w-5 h-5 text-rose-600 dark:text-rose-500 transition-colors" />
                            <h3 className="font-black text-rose-900 dark:text-rose-400 tracking-tight transition-colors">{lang === 'uz' ? "Chiqish" : "Sign Out"}</h3>
                        </div>
                        <p className="text-xs text-rose-500 dark:text-rose-400/80 font-bold leading-relaxed transition-colors">
                            {lang === 'uz' ? "Boshqa qurilmada kirish uchun joriy sessiyani yakunlang." : "Terminate your current session to sign in on another device."}
                        </p>
                        <button 
                            onClick={handleSignOut}
                            className="bg-white dark:bg-slate-950 px-6 h-10 rounded-xl text-rose-600 dark:text-rose-500 font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            {lang === 'uz' ? "Tizimdan chiqish" : "Logout Now"}
                        </button>
                    </section>
                </div>

                <div className="flex items-center justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest pt-8">
                    <Link href="/privacy-policy" className="hover:text-slate-600">Privacy Policy</Link>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <Link href="/privacy-policy" className="hover:text-slate-600">Terms of Service</Link>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>v2.4.0-stable</span>
                </div>

            </div>
        </DashboardLayout>
    );
}

function ToggleItem({ icon, label, description, value, active, onClick }: { icon: any, label: string, description: string, value?: string, active?: boolean, onClick?: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-1 transition-colors">{label}</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold transition-colors">{description}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {value && <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest transition-colors">{value}</span>}
                {onClick && active !== undefined && (
                    <div className={cn(
                        "w-10 h-5 rounded-full p-1 transition-all duration-300",
                        active ? "bg-slate-900 dark:bg-white" : "bg-slate-200 dark:bg-slate-700"
                    )}>
                        <div className={cn(
                            "w-3 h-3 bg-white dark:bg-slate-900 rounded-full transition-transform duration-300",
                            active ? "translate-x-5" : "translate-x-0"
                        )} />
                    </div>
                )}
                <ChevronRight className="w-4 h-4 text-slate-200 dark:text-slate-600 transition-colors" />
            </div>
        </div>
    );
}

import Link from "next/link";
