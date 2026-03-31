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
                <section className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-slate-600" />
                        <h3 className="font-black text-slate-900 tracking-tight">{lang === 'uz' ? "Hisob" : "Account"}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{lang === 'uz' ? "To'liq ism" : "Full Name"}</label>
                                <input 
                                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-slate-300 transition-all"
                                    defaultValue={user?.user_metadata?.full_name || ""}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{lang === 'uz' ? "Email manzil" : "Email Address"}</label>
                                <input 
                                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-600 cursor-not-allowed outline-none"
                                    value={user?.email || ""}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 space-y-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl font-black shadow-lg">
                                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                            </div>
                            <button className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-slate-900 transition-colors">
                                {lang === 'uz' ? "Suratni o'zgartirish" : "Change Photo"}
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex justify-end">
                        <button className="px-8 h-12 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                            {lang === 'uz' ? "Saqlash" : "Save Changes"}
                        </button>
                    </div>
                </section>

                {/* --- Preferences Section --- */}
                <section className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-slate-600" />
                        <h3 className="font-black text-slate-900 tracking-tight">{lang === 'uz' ? "Afzalliklar" : "Preferences"}</h3>
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
                    <section className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-emerald-700" />
                            <h3 className="font-black text-slate-900 tracking-tight">{lang === 'uz' ? "Xavfsizlik" : "Security"}</h3>
                        </div>
                        <p className="text-xs text-slate-600 font-bold leading-relaxed">
                            {lang === 'uz' ? "Hisobingiz ma'lumotlari xavfsiz va maxfiylik deklaratsiyasiga ko'ra saqlanadi." : "Your account data is secured and stored according to our privacy policy."}
                        </p>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline pt-2 inline-block">
                            {lang === 'uz' ? "Parolni yangilash" : "Update Password"}
                        </button>
                    </section>

                    <section className="bg-rose-50 border border-rose-100 rounded-[2rem] p-8 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <LogOut className="w-5 h-5 text-rose-700" />
                            <h3 className="font-black text-rose-900 tracking-tight">{lang === 'uz' ? "Chiqish" : "Sign Out"}</h3>
                        </div>
                        <p className="text-xs text-rose-400 font-bold leading-relaxed">
                            {lang === 'uz' ? "Boshqa qurilmada kirish uchun joriy sessiyani yakunlang." : "Terminate your current session to sign in on another device."}
                        </p>
                        <button 
                            onClick={handleSignOut}
                            className="bg-white px-6 h-10 rounded-xl text-rose-700 font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            {lang === 'uz' ? "Tizimdan chiqish" : "Logout Now"}
                        </button>
                    </section>
                </div>

                <div className="flex items-center justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest pt-8">
                    <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <Link href="/terms" className="hover:text-slate-600">Terms of Service</Link>
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
            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-slate-900 transition-colors">
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">{label}</p>
                    <p className="text-[10px] text-slate-600 font-bold">{description}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {value && <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{value}</span>}
                {onClick && active !== undefined && (
                    <div className={cn(
                        "w-10 h-5 rounded-full p-1 transition-all duration-300",
                        active ? "bg-slate-900" : "bg-slate-200"
                    )}>
                        <div className={cn(
                            "w-3 h-3 bg-white rounded-full transition-transform duration-300",
                            active ? "translate-x-5" : "translate-x-0"
                        )} />
                    </div>
                )}
                <ChevronRight className="w-4 h-4 text-slate-200" />
            </div>
        </div>
    );
}

import Link from "next/link";
