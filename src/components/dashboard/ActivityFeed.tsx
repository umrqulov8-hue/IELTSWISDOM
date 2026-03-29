"use client";

import { Clock, BookOpen, Headphones, PenTool, MessageSquare } from "lucide-react";

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
        <div className="flex items-center justify-between py-4 group/item">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover/item:bg-[#0f172a] group-hover/item:text-white transition-all">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{activity.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-700">{activity.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover/item:text-[#0f172a] transition-colors">{activity.title}</h4>
                </div>
            </div>
            
            <span className="text-sm font-black text-emerald-700">{activity.score}</span>
        </div>
    );
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-slate-800" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Activity</h2>
            </div>

            <div className="divide-y divide-slate-50">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>

            {activities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="w-12 h-12 text-slate-100 mb-4" />
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-widest">No activity yet</p>
                </div>
            )}
        </div>
    );
}
