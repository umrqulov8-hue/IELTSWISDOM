"use client";

import { LISTENING_LESSONS } from "@/data/listening-lessons";
import { ListeningLessonCard } from "./ListeningLessonCard";
import { motion } from "framer-motion";

export default function ListeningLessonsGrid({ lang }: { lang: string }) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />
                <h2 className="text-sm font-black text-slate-600 uppercase tracking-[0.2em]">
                    {lang === 'uz' ? "Darslar" : "Structured Lessons"}
                </h2>
                <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LISTENING_LESSONS.map((lesson, idx) => (
                    <ListeningLessonCard key={lesson.id} lesson={lesson} index={idx} lang={lang} />
                ))}
            </div>
        </div>
    );
}
