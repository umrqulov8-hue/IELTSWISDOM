"use client";

import { Trophy, ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import Link from "next/link";

interface MockMetricProps {
    label: string;
    value: string | number;
    color?: string;
}

function MockMetric({ label, value, color = "text-slate-900" }: MockMetricProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-3xl font-black tracking-tight leading-none text-slate-900">{value}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}

export function MockTestWidget({ completed, total, avgBand, lastScore }: { 
    completed: number; 
    total: number; 
    avgBand: number; 
    lastScore: number; 
}) {
    const progress = (completed / total) * 100;

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full group">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                    <Trophy className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Mock Test Progress</h2>
                    <p className="text-xs font-medium text-slate-400 tracking-wide">Track your performance across full-length IELTS practice tests</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                <MockMetric label="Completed" value={completed} />
                <MockMetric label="Total Tests" value={total} />
                <MockMetric label="Avg. Band" value={avgBand} color="text-emerald-500" />
                <MockMetric label="Last Score" value={lastScore} color="text-blue-500" />
            </div>

            <div className="mt-auto space-y-6">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span className="uppercase tracking-widest">Progress</span>
                        <span>{completed}/{total}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <m.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="h-full bg-[#0f172a] rounded-full"
                        />
                    </div>
                </div>

                <Link 
                    href="/mock-exams/quick-start" 
                    className="w-full bg-[#0f172a] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-slate-200 transition-all active:translate-y-0"
                >
                    <span>Take Practice Test</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
