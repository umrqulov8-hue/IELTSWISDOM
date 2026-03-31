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
            className="group bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 transition-all lg:hover:shadow-lg"
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">
                        {lang === 'uz' ? "Mock Test" : "Mock Practice"}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-700 dark:text-slate-400 transition-colors">
                        <Clock className="w-2.5 h-2.5" />
                        {test.duration}
                    </div>
                </div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {test.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-md transition-colors">{test.level}</span>
                    <Link 
                        href={`/practice/${type}/${test.id}`} 
                        aria-label={lang === 'uz' ? "Testni boshlash" : "Start Test"}
                        className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
