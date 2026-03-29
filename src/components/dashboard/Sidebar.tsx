"use client";

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    BookOpen, 
    PenTool, 
    Headphones, 
    MessageSquare, 
    Trophy, 
    Settings, 
    User,
    FileText,
    LogOut,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { TargetBandWidget } from './TargetBandWidget';

const NAV_GROUPS = [
    {
        label: "SKILLS",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Reading", href: "/lessons/reading", icon: BookOpen, badge: "12 Lessons" },
            { name: "Writing", href: "/lessons/writing", icon: PenTool, badge: "10 Lessons" },
            { name: "Listening", href: "/lessons/listening", icon: Headphones, badge: "15 Lessons" },
            { name: "Speaking", href: "/lessons/speaking", icon: MessageSquare, badge: "8 Lessons" },
        ]
    },
    {
        label: "PRACTICE",
        items: [
            { name: "Mock Tests", href: "/mock-exams", icon: Trophy, badge: "30 Tests" },
            { name: "Articles", href: "/articles", icon: FileText },
        ]
    },
    {
        label: "ACCOUNT",
        items: [
            { name: "Profile", href: "/profile", icon: User },
            { name: "Settings", href: "/settings", icon: Settings },
        ]
    }
];

interface SidebarProps {
    onMobileClose?: () => void;
}

export const Sidebar = memo(({ onMobileClose }: SidebarProps) => {
    const pathname = usePathname();
    const { signOut } = useAuthContext();
    const { lang } = useLanguage();

    return (
        <div className="h-full flex flex-col">
            {/* Logo Section */}
            <div className="px-8 py-8 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-black leading-none tracking-tight">IELTS Wisdom</span>
                        <span className="text-[10px] font-bold text-slate-500 mt-0.5 tracking-wider uppercase">Master Your Skills</span>
                    </div>
                </Link>

                {onMobileClose && (
                    <button 
                        onClick={onMobileClose}
                        aria-label="Close mobile menu"
                        className="lg:hidden p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 border border-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Navigation Groups */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 custom-scrollbar">
                {NAV_GROUPS.map((group) => (
                    <div key={group.label} className="space-y-2">
                        <h3 className="px-4 text-[10px] font-black text-slate-700 tracking-[0.2em] uppercase">
                            {group.label === "SKILLS" ? (lang === 'uz' ? "KO'NIKMALAR" : "SKILLS") : 
                             group.label === "PRACTICE" ? (lang === 'uz' ? "MASHQLAR" : "PRACTICE") : 
                             (lang === 'uz' ? "HISOB" : "ACCOUNT")}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                // Basic translation mapping for main sidebar items
                                const translatedName = 
                                    item.name === "Dashboard" ? (lang === 'uz' ? "Asosiy" : "Dashboard") :
                                    item.name === "Reading" ? (lang === 'uz' ? "O'qish" : "Reading") :
                                    item.name === "Writing" ? (lang === 'uz' ? "Yozish" : "Writing") :
                                    item.name === "Listening" ? (lang === 'uz' ? "Eshitish" : "Listening") :
                                    item.name === "Speaking" ? (lang === 'uz' ? "Gapirish" : "Speaking") :
                                    item.name === "Mock Tests" ? (lang === 'uz' ? "Mock Testlar" : "Mock Tests") :
                                    item.name === "Articles" ? (lang === 'uz' ? "Maqolalar" : "Articles") :
                                    item.name === "Profile" ? (lang === 'uz' ? "Profil" : "Profile") :
                                    item.name === "Settings" ? (lang === 'uz' ? "Sozlamalar" : "Settings") :
                                    item.name;

                                return (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group/item",
                                            isActive 
                                                ? "bg-black text-white shadow-md shadow-slate-200" 
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={cn(
                                                "w-5 h-5",
                                                isActive ? "text-white" : "text-slate-400 group-hover/item:text-slate-600"
                                            )} />
                                            <span className="text-sm font-bold tracking-tight">{translatedName}</span>
                                        </div>
                                        {item.badge && (
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-lg",
                                                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                                            )}>
                                                {lang === 'uz' ? item.badge.replace('Lessons', 'Dars').replace('Tests', 'Test') : item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Bottom Widgets */}
            <div className="p-6 border-t border-slate-50 bg-white space-y-4">
                <TargetBandWidget target={7.5} current={6.8} />
                
                <button 
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    <span>{lang === 'uz' ? "Chiqish" : "Logout"}</span>
                </button>
            </div>
        </div>
    );
});
