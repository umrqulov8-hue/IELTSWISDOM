"use client";

import { LucideIcon } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillStatsCardProps {
    title: string;
    icon: LucideIcon;
    percentage: number;
    color?: string;
}

export function SkillStatsCard({ title, icon: Icon, percentage, color = "bg-slate-900" }: SkillStatsCardProps) {
    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-slate-900 tracking-tight">{title}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-slate-900 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="space-y-3">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full", color)}
                    />
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">{percentage}% Complete</span>
                </div>
            </div>
        </div>
    );
}
