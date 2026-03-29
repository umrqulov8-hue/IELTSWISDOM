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
            className="group bg-white border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    {lang === 'uz' ? `${lesson.lessonNumber}-Dars` : `Lesson ${lesson.lessonNumber}`}
                </span>
                {isCompleted && (
                    <div className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-6 flex-1">
                <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {lesson.description}
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {lesson.duration}
                </div>
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.typeBadge === "Full Test" ? "bg-rose-50 text-rose-700" :
                    lesson.typeBadge === "Overview" ? "bg-slate-50 text-slate-500" :
                    lesson.typeBadge === "Skills" ? "bg-blue-50 text-blue-700" : 
                    lesson.typeBadge.includes("Section") ? "bg-purple-50 text-purple-700" : "bg-indigo-50 text-indigo-500"
                )}>
                    {lesson.typeBadge}
                </div>
            </div>

            <div className="flex items-center justify-between items-center mb-6">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    lesson.level === "Expert" ? "bg-rose-50 text-rose-700" :
                    lesson.level === "Advanced" ? "bg-amber-50 text-amber-700" :
                    lesson.level === "Intermediate" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"
                )}>
                    {lesson.level}
                </div>
                {lesson.score && (
                    <span className="text-[10px] font-black text-emerald-700">Score: {lesson.score}%</span>
                )}
            </div>

            <Link href={lesson.id === "l-lesson-1" ? "/practice/listening" : `/practice/listening/${lesson.testId}`} className="block">
                <button className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-sm",
                    isCompleted 
                        ? "bg-slate-50 text-slate-600 hover:bg-slate-100" 
                        : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200"
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
