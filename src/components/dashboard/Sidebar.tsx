"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Trophy,
    Sparkles,
    Languages,
    Users,
    BookOpen,
    LogOut,
    User,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Student Results', href: '/results', icon: Sparkles },
    { name: 'Premium AI Check', href: '/ai-check', icon: Sparkles, premium: true },
    { name: 'Translation Practice', href: '/translation', icon: Languages },
    { name: 'Join My Lessons', href: '/lessons', icon: Users, featured: true },
    { name: 'Read Articles', href: '/articles', icon: BookOpen },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuthContext();

    return (
        <aside className="fixed left-0 top-0 h-screen w-[90px] hover:w-72 bg-white/40 backdrop-blur-2xl border-r border-white/40 z-[110] hidden lg:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out group overflow-hidden peer">

            {/* Logo Section */}
            <div className="px-6 py-8 flex items-center h-[88px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                <Link href="/dashboard" className="flex items-center gap-0 font-bold hover:opacity-80 transition-opacity relative w-full">

                    {/* Collapsed Logo (Dark Green 'I') */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#1c3e2e] rounded-xl text-white shadow-lg shadow-[#1c3e2e]/20 flex-shrink-0 group-hover:hidden transition-all duration-300 relative">
                        {/* Tiny crown on top of the I */}
                        <svg className="absolute top-1.5 w-3 h-3 text-white/80 fill-current" viewBox="0 0 24 24">
                            <path d="M4 15l-2-9 5.5 4.5L12 3l4.5 7.5L22 6l-2 9H4z" />
                            <circle cx="2" cy="5" r="1.5" />
                            <circle cx="12" cy="2" r="1.5" />
                            <circle cx="22" cy="5" r="1.5" />
                        </svg>
                        <span className="text-xl font-serif font-bold mt-2">I</span>
                    </div>

                    {/* Expanded Logo (IELTS Wisdom with Crown) */}
                    <div className="hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out items-center relative w-auto overflow-visible pr-4">
                        <div className="relative translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500">
                            {/* Crown SVG positioned perfectly over the S */}
                            <svg className="absolute -top-[12px] right-[-2px] w-[20px] h-[14px] text-[#1c3e2e] fill-current drop-shadow-sm" viewBox="0 0 24 24">
                                <path d="M3 16l-2-9 6 4.5L12 3l5 8.5 6-4.5-2 9H3zm-1-2h20v4H2v-4z" />
                                <circle cx="1" cy="6" r="1.5" />
                                <circle cx="7" cy="11.5" r="1.5" />
                                <circle cx="12" cy="2" r="1.5" />
                                <circle cx="17" cy="11.5" r="1.5" />
                                <circle cx="23" cy="6" r="1.5" />
                            </svg>
                            <span className="text-[28px] font-serif font-black text-[#1c3e2e] tracking-tight drop-shadow-sm">
                                IELTS
                            </span>
                        </div>

                        <div className="relative ml-1.5 translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500 delay-75">
                            <span className="text-[28px] font-serif font-black text-[#1c3e2e] tracking-tight drop-shadow-sm">
                                Wisdom
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* User Profile Section */}
            <div className="px-5 pb-8 pt-2 border-b border-white/20 flex-shrink-0">
                <div className="flex items-center gap-4 mb-2 overflow-hidden">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full ring-2 ring-white/50 shadow-lg p-[2px] bg-gradient-to-tr from-orange-400 to-blue-500 relative group/avatar">
                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white">
                            {/* Placeholder Avatar */}
                            <User className="text-slate-400 w-6 h-6" />
                        </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden flex flex-col justify-center">
                        <h3 className="text-slate-800 font-bold text-lg truncate">
                            {user?.email?.split('@')[0] || "Student"}
                        </h3>
                        <p className="text-slate-500 text-xs font-medium bg-white/50 px-2 py-0.5 rounded-full w-fit mt-1 border border-white/40">Premium Member</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-2 custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group/item relative overflow-hidden whitespace-nowrap",
                                isActive
                                    ? "bg-[#FF8C00] text-white shadow-[0_10px_20px_-10px_rgba(255,140,0,0.5)]"
                                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                            )}
                        >
                            <Icon className={cn(
                                "w-6 h-6 flex-shrink-0 transition-colors duration-300",
                                isActive ? "text-white" : "text-slate-400 group-hover/item:text-[#FF8C00]"
                            )} />

                            <span className={cn(
                                "opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[160px] transition-all duration-500 ease-in-out font-medium translate-x-[-10px] group-hover:translate-x-0"
                            )}>
                                {item.name}
                            </span>

                            {item.featured && (
                                <span className={cn(
                                    "absolute right-2 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 scale-0 group-hover:scale-100",
                                    isActive ? "bg-white/20 text-white" : "bg-[#FF8C00] text-white"
                                )}>
                                    NEW
                                </span>
                            )}

                            {/* Hover Indicator for Collapsed State */}
                            {!isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover/item:h-1/2 bg-[#FF8C00] rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-0 group-hover/item:opacity-100 group-hover:opacity-0" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Disclaimer & Footer */}
            <div className="p-4 border-t border-white/20 overflow-hidden flex-shrink-0">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-4 px-4 py-3 w-full text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-2 whitespace-nowrap group/logout"
                >
                    <LogOut className="w-6 h-6 flex-shrink-0 group-hover/logout:rotate-180 transition-transform duration-500" />
                    <span className="font-medium opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] transition-all duration-500 ease-in-out">Sign Out</span>
                </button>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 pl-4">
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px]">
                        © 2025 IELTS Wisdom
                    </p>
                </div>
            </div>

            {/* Hover Hint Overlay (Optional aesthetic touch) */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </aside>
    );
}
