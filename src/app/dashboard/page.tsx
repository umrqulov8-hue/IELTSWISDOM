"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, ArrowRight, Loader2, BookOpen, Headphones, PenTool, Brain, Trophy } from "lucide-react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";


export default function DashboardPage() {
    const { stats } = useDashboard();
    const { lang } = useLanguage();
    const D = T.dashboard;

    // Show 0/defaults while data loads in background — no blocking spinner
    const {
        progress_percentage,
        completed_lessons,
        reading_tests_completed,
        reading_average_score,
        listening_tests_completed,
        listening_average_score,
        writing_tests_completed,
        writing_average_score,
        vocab_tests_completed,
        vocab_average_score,
        estimated_level,
    } = stats || {
        progress_percentage: 0,
        completed_lessons: 0,
        reading_tests_completed: 0,
        reading_average_score: 0,
        listening_tests_completed: 0,
        listening_average_score: 0,
        writing_tests_completed: 0,
        writing_average_score: 0,
        vocab_tests_completed: 0,
        vocab_average_score: 0,
        estimated_level: "Beginner (A1/A2)",
    };

    const TOTAL_TESTS = {
        reading: 8,
        listening: 15,
        writing: 10,
        vocab: 20
    };

    return (
        <DashboardLayout showGreeting={true}>
            <m.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                        }
                    }
                }}
            >
                <m.section layout transition={{ type: "spring", stiffness: 100, damping: 14, mass: 0.8 }} className="block w-full mb-10 md:-mx-3 after:content-[''] after:table after:clear-both">
                    {/* Current Progress - Detailed Stats */}
                    <m.div
                        layout
                        transition={{ layout: { type: "spring", stiffness: 100, damping: 14, mass: 0.8 } }}
                        className="float-left w-full md:w-1/2 md:px-3 mb-6"
                    >
                        <div className="w-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/30 transition-shadow duration-300">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10">
                                <h2 className="text-lg font-bold text-white mb-4">
                                    <BouncyText key={`prog-${lang}`} text={tx(D.progress, lang)} type="word" />
                                </h2>

                                {/* Overall Score */}
                                <div className="flex items-end gap-2 mb-1">
                                    {stats ? (
                                        <>
                                            <span className="text-5xl font-black">{progress_percentage}</span>
                                            <span className="text-xl text-orange-200 mb-1 font-bold">%</span>
                                        </>
                                    ) : (
                                        <Skeleton className="h-12 w-20 bg-white/20" />
                                    )}
                                </div>
                                {/* Visual Progress Bar */}
                                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden mb-5 relative">
                                    <m.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress_percentage}%` }}
                                        transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                                        className="h-full bg-gradient-to-r from-white to-orange-100 rounded-full relative"
                                    >
                                        <m.div
                                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-white blur-[2px]"
                                        />
                                    </m.div>
                                </div>

                                {/* Level Badge */}
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                                        🎓 {estimated_level}
                                    </span>
                                </div>

                                <Link
                                    href="/leaderboard"
                                    className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-xs font-black text-orange-50 uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2 group shadow-lg shadow-black/5"
                                >
                                    <Trophy className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                                    {lang === 'en' ? "Full View" : "To'liq ko'rish"}
                                </Link>

                            </div>
                        </div>
                    </m.div>

                    {/* Next Lesson - Electric Blue Glass */}
                    <m.div
                        layout
                        transition={{ layout: { type: "spring", stiffness: 100, damping: 14, mass: 0.8 } }}
                        className="float-left w-full md:w-1/2 md:px-3 mb-6"
                    >
                        <div className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] p-8 text-white relative flex flex-col justify-between group shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-blue-100 text-xs font-black mb-3 tracking-widest uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                                    <PlayCircle className="w-3 h-3" /> <BouncyText key={`nl-${lang}`} text={tx(D.nextLesson, lang)} type="word" />
                                </div>
                                <h2 className="text-3xl font-bold mb-3 leading-tight">
                                    {tx(D.lessonTitle, lang)}
                                </h2>
                                <p className="text-blue-100 max-w-md font-medium">
                                    {tx(D.lessonDesc, lang)}
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 flex justify-end">
                                <Link href="/lessons" className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                                    <BouncyText key={`cont-${lang}`} text={tx(D.continue, lang)} type="word" />
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </m.div>

                    <m.div layout transition={{ layout: { type: "spring", stiffness: 100, damping: 14, mass: 0.8 } }} className="block w-full pt-4 mb-8 after:content-[''] after:table after:clear-both">
                        <h2 className="text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
                            <BouncyText key={`pop-${lang}`} text={tx(D.popular, lang)} type="word" />
                        </h2>
                    </m.div>

                    <FeatureGrid />
                </m.section>
            </m.div>
        </DashboardLayout>
    );
}
