"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ListeningLessonCard({ lesson, index, lang }: { lesson: any, index: number, lang: string }) {
    const isCompleted = lesson.status === "completed";
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 relative flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">
                    {lang === 'uz' ? `${lesson.lessonNumber}-Dars` : `Lesson ${lesson.lessonNumber}`}
                </span>
                {isCompleted && (
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-500 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6 flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">
                    <Clock className="w-3 h-3 text-indigo-400 dark:text-indigo-300 transition-colors" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.typeBadge === "Overview" ? "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400" :
                    lesson.typeBadge === "Skills" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400" : 
                    lesson.typeBadge.includes("Section") ? "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400" : "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 dark:text-indigo-400"
                )}>
                    {lesson.typeBadge}
                </div>
            </div>

            <div className="flex items-center justify-between items-center mb-6">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                    lesson.level === "Expert" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400" :
                    lesson.level === "Advanced" ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400" :
                    lesson.level === "Intermediate" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400" : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                )}>
                    {lesson.level}
                </div>
                {lesson.score && (
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 transition-colors">Score: {lesson.score}%</span>
                )}
            </div>

            <Link href={lesson.id === "l-lesson-1" ? "/practice/listening" : `/practice/listening/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white"
                )}>
                    {isCompleted 
                        ? (lang === 'uz' ? "Ko'rib chiqish" : "Review") 
                        : (lang === 'uz' ? "Darsni boshlash" : "Start Lesson")
                    }
                    {!isCompleted && <ChevronRight className="w-4 h-4" />}
                </button>
            </Link>
        </motion.div>
    );
}
