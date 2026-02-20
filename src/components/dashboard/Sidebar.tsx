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
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[90px] hover:w-72 bg-white/40 backdrop-blur-2xl border-r border-white/40 z-40 hidden lg:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out group overflow-hidden peer">

            {/* Logo Section */}
            <div className="px-6 py-8 flex items-center h-[88px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-slate-800 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FF8C00] to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20 flex-shrink-0">
                        <span className="text-xl">L</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out flex items-center">
                        <span className="translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500">earn</span>
                        <span className="text-[#FF8C00] translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500 delay-75">English</span>
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
                        © 2025 LearnEnglish
                    </p>
                </div>
            </div>

            {/* Hover Hint Overlay (Optional aesthetic touch) */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </aside>
    );
}
