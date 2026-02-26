"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { UserSettingsPanel } from '@/components/settings/UserSettingsPanel';
import {
    LayoutDashboard,
    Trophy,
    Sparkles,
    Languages,
    Users,
    BookOpen,
    LogOut,
    User,
    ChevronRight,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { translations as T, tx } from '@/lib/translations';
import type { Lang } from '@/lib/translations';
import { ProBadge } from '@/components/ui/ProBadge';

function getNavItems(lang: Lang) {
    return [
        { name: tx(T.sidebar.dashboard, lang), href: '/dashboard', icon: LayoutDashboard },
        { name: tx(T.sidebar.leaderboard, lang), href: '/leaderboard', icon: Trophy },
        { name: tx(T.sidebar.results, lang), href: '/results', icon: Sparkles },
        { name: tx(T.sidebar.aiCheck, lang), href: '/ai-check', icon: Sparkles, premium: true },
        { name: tx(T.sidebar.lessons, lang), href: '/lessons', icon: Users, featured: true },
        { name: tx(T.sidebar.articles, lang), href: '/articles', icon: BookOpen },
    ];
}

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuthContext();
    const { lang } = useLanguage();
    const { isPro } = useSubscription();
    const navItems = getNavItems(lang);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const supabase = createClient();

    // Fetch avatar URL if exists for Sidebar
    useEffect(() => {
        async function loadProfile() {
            if (!user) return;
            const { data } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();
            if (data?.avatar_url) {
                setAvatarUrl(data.avatar_url);
            }
        }
        loadProfile();
    }, [user, supabase]);

    return (
        <aside className="fixed left-0 top-0 h-screen w-[90px] hover:w-[280px] bg-white/40 backdrop-blur-3xl border-r border-white/40 z-[110] hidden lg:flex flex-col shadow-[4px_0_40px_rgba(0,0,0,0.03)] transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] group peer">

            {/* Logo Section */}
            <div className="px-6 py-8 flex items-center h-[100px] flex-shrink-0 whitespace-nowrap">
                <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity relative w-full h-12">

                    {/* Collapsed Logo (Dark Green 'I') */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#1c3e2e] rounded-2xl text-white shadow-xl shadow-[#1c3e2e]/20 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:-translate-x-4 origin-left pointer-events-auto group-hover:pointer-events-none">
                        <svg className="absolute top-1.5 w-3.5 h-3.5 text-white/90 fill-current" viewBox="0 0 24 24">
                            <path d="M4 15l-2-9 5.5 4.5L12 3l4.5 7.5L22 6l-2 9H4z" />
                            <circle cx="2" cy="5" r="1.5" />
                            <circle cx="12" cy="2" r="1.5" />
                            <circle cx="22" cy="5" r="1.5" />
                        </svg>
                        <span className="text-2xl font-serif font-black mt-2">I</span>
                    </div>

                    {/* Expanded Logo (IELTS Wisdom with Crown) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center w-auto overflow-visible pr-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 scale-75 translate-x-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 origin-left pointer-events-none group-hover:pointer-events-auto z-10">
                        <motion.div
                            className="relative flex items-center"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.05 } }
                            }}
                        >
                            <div className="relative flex">
                                {"IELTS".split('').map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 15, scale: 0.8 },
                                            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } }
                                        }}
                                        className="text-[30px] font-serif font-black text-[#1c3e2e] tracking-tight drop-shadow-sm inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="relative ml-2 flex">
                                {"Wisdom".split('').map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 15, scale: 0.8 },
                                            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } }
                                        }}
                                        className="text-[30px] font-serif font-black text-[#1c3e2e] tracking-tight drop-shadow-sm relative inline-block"
                                    >
                                        {letter}
                                        {i === 2 && (
                                            <motion.svg
                                                variants={{
                                                    hidden: { opacity: 0, y: -30, scale: 0, rotate: -30 },
                                                    visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { delay: 0.8, type: "spring", stiffness: 500, damping: 12 } }
                                                }}
                                                className="absolute -top-[2px] left-[55%] -translate-x-1/2 w-[20px] h-3.5 text-[#1c3e2e] fill-current drop-shadow-sm origin-bottom"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M3 16l-2-9 6 4.5L12 3l5 8.5 6-4.5-2 9H3zm-1-2h20v4H2v-4z" />
                                                <circle cx="1" cy="6" r="1.5" />
                                                <circle cx="7" cy="11.5" r="1.5" />
                                                <circle cx="12" cy="2" r="1.5" />
                                                <circle cx="17" cy="11.5" r="1.5" />
                                                <circle cx="23" cy="6" r="1.5" />
                                            </motion.svg>
                                        )}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </Link>
            </div>

            {/* Profile Section */}
            <div className="px-5 pb-8 pt-2 border-b border-white/10 flex-shrink-0 relative">
                <motion.button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center gap-4 mb-2 hover:bg-white/50 p-2.5 -ml-2.5 rounded-2xl transition-all duration-300 text-left cursor-pointer group/profilebtn"
                >
                    <div className="w-12 h-12 flex-shrink-0 rounded-full ring-2 ring-white/60 shadow-lg p-[2px] bg-gradient-to-tr from-orange-400 to-blue-500 relative group/avatar">
                        <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border-2 border-white">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="text-slate-400 w-6 h-6 group-hover/profilebtn:text-blue-500 transition-colors" />
                            )}
                        </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[160px] transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap overflow-hidden flex flex-col justify-center">
                        <h3 className="text-slate-800 font-bold text-lg truncate group-hover/profilebtn:text-blue-600 transition-colors">
                            {user?.email?.split('@')[0] || "Student"}
                        </h3>
                        {isPro ? (
                            <ProBadge size="sm" className="mt-1" />
                        ) : (
                            <p className="text-slate-500 text-[11px] font-semibold bg-white/60 px-2.5 py-0.5 rounded-full w-fit mt-1 border border-white/40">
                                {lang === 'en' ? 'Free Member' : 'Bepul foydalanuvchi'}
                            </p>
                        )}
                    </div>
                </motion.button>

                <UserSettingsPanel
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-8 px-4 space-y-2.5 custom-scrollbar">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link key={item.name} href={item.href}>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    whileHover={{ x: 5 }}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group/item relative overflow-hidden whitespace-nowrap mb-2",
                                        isActive
                                            ? "bg-[#FF8C00] text-white shadow-[0_12px_24px_-8px_rgba(255,140,0,0.4)]"
                                            : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
                                    )}
                                >
                                    {/* Active background indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute inset-0 bg-[#FF8C00] -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: isActive ? 0 : 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Icon className={cn(
                                            "w-6 h-6 flex-shrink-0 transition-colors duration-300",
                                            isActive ? "text-white" : "text-slate-400 group-hover/item:text-[#FF8C00]"
                                        )} />
                                    </motion.div>

                                    <span className={cn(
                                        "opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[160px] transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] font-semibold text-sm",
                                        isActive ? "text-white" : "text-slate-700"
                                    )}>
                                        {item.name}
                                    </span>

                                    {item.featured && (
                                        <motion.span
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className={cn(
                                                "absolute right-3 text-[9px] font-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                                isActive ? "bg-white/20 text-white" : "bg-[#FF8C00] text-white"
                                            )}
                                        >
                                            NEW
                                        </motion.span>
                                    )}

                                    {/* Left Indicator bar */}
                                    {!isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 group-hover/item:h-1/2 bg-[#FF8C00] rounded-r-full transition-all duration-300 opacity-0 group-hover/item:opacity-100" />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </motion.div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 overflow-hidden flex-shrink-0">
                <motion.button
                    onClick={() => signOut()}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 px-4 py-3.5 w-full text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-2xl transition-all duration-400 mb-2 whitespace-nowrap group/logout"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0 group-hover/logout:rotate-12 transition-transform" />
                    <span className="font-semibold text-sm opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] transition-all duration-[700ms]">
                        {lang === 'en' ? 'Sign Out' : 'Chiqish'}
                    </span>
                </motion.button>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 pl-4">
                    <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                        © 2025 IELTS Wisdom
                    </p>
                </div>
            </div>

            {/* Premium edge glow */}
            <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </aside>
    );
}
