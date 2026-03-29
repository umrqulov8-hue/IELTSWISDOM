"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export function PracticeCard({ test, index, lang, type }: { test: any, index: number, lang: string, type: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (index * 0.03) }}
            className="group bg-white/50 border border-slate-100 rounded-2xl p-4 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        {lang === 'uz' ? "Mock Test" : "Mock Practice"}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-700">
                        <Clock className="w-2.5 h-2.5" />
                        {test.duration}
                    </div>
                </div>
                <h3 className="text-xs font-bold text-slate-700 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {test.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-50 text-slate-700 rounded-md">{test.level}</span>
                    <Link 
                        href={`/practice/${type}/${test.id}`} 
                        aria-label={lang === 'uz' ? "Testni boshlash" : "Start Test"}
                        className="text-indigo-600 group-hover:translate-x-1 transition-transform"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
