"use client";

import { MIGRATED_LISTENING_TESTS } from "@/data/listening-lessons";
import { PracticeCard } from "./PracticeCard";

export default function ListeningPracticeGrid({ lang }: { lang: string }) {
    if (MIGRATED_LISTENING_TESTS.length === 0) return null;

    return (
        <div className="space-y-8 pt-10">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />
                <h2 className="text-sm font-black text-slate-600 uppercase tracking-[0.2em]">
                    {lang === 'uz' ? "Mock Testlar" : "Mock Practice"}
                </h2>
                <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {MIGRATED_LISTENING_TESTS.map((test, idx) => (
                    <PracticeCard key={test.id} test={test} index={idx} lang={lang} type="listening" />
                ))}
            </div>
        </div>
    );
}
