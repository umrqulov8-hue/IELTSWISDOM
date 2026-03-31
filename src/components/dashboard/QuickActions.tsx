"use client";

import { BookOpen, PenTool, Headphones, MessageSquare, Target } from "lucide-react";
import Link from "next/link";

const ACTIONS = [
    { name: "Reading Practice", href: "/lessons/reading", icon: BookOpen },
    { name: "Writing Tasks", href: "/lessons/writing", icon: PenTool },
    { name: "Listening Tests", href: "/lessons/listening", icon: Headphones },
    { name: "Speaking Practice", href: "/lessons/speaking", icon: MessageSquare },
];

export function QuickActions() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link 
                            key={action.name} 
                            href={action.href}
                            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none transition-all hover:translate-y-[-2px] group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all">
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{action.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
