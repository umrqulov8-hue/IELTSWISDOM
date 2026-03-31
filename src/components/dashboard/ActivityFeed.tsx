"use client";

import { Clock, BookOpen, Headphones, PenTool, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
    id: string;
    type: "Reading" | "Listening" | "Writing" | "Speaking";
    title: string;
    time: string;
    score: number | string;
    color?: string;
}

const ICON_MAP = {
    Reading: BookOpen,
    Listening: Headphones,
    Writing: PenTool,
    Speaking: MessageSquare,
};

function ActivityItem({ activity }: { activity: Activity }) {
    const Icon = ICON_MAP[activity.type];
    
    return (
        <div className="flex items-center justify-between py-4 group/item transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-400 group-hover/item:bg-slate-900 dark:group-hover/item:bg-white group-hover/item:text-white dark:group-hover/item:text-slate-900 transition-all">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">{activity.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 transition-colors">{activity.time}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">{activity.title}</h3>
                </div>
            </div>
            
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 transition-colors">{activity.score}</span>
        </div>
    );
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full transition-all">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-slate-800 dark:text-slate-200 transition-colors" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Recent Activity</h2>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>

            {activities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="w-12 h-12 text-slate-100 dark:text-slate-800 mb-4 transition-colors" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-500 uppercase tracking-widest transition-colors">No activity yet</p>
                </div>
            )}
        </div>
    );
}
