"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, ArrowRight, Loader2, BookOpen, Headphones, PenTool, Brain, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";

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
            <motion.div
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
                {/* Progress & Next Lesson - Vivid Cards */}
                <section className="grid md:grid-cols-5 gap-6">
                    {/* Current Progress - Detailed Stats */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                        }}
                        className="md:col-span-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/30 transition-shadow duration-300"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-orange-100 mb-4">
                                <BouncyText key={`prog-${lang}`} text={tx(D.progress, lang)} type="word" />
                            </h3>

                            {/* Overall Score */}
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-5xl font-black">{progress_percentage}</span>
                                <span className="text-xl text-orange-200 mb-1 font-bold">%</span>
                            </div>
                            <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden mb-4 border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress_percentage}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                />
                            </div>

                            {/* Level Badge */}
                            <div className="flex items-center gap-2 mb-5">
                                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                                    🎓 {estimated_level}
                                </span>
                            </div>

                            {/* Section-wise Stats Grid */}
                            <div className="grid grid-cols-1 gap-3 mt-4">
                                {/* Reading */}
                                <div className="bg-black/10 rounded-xl p-3 border border-white/10">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-3.5 h-3.5 text-orange-100" />
                                            <span className="text-[13px] font-bold text-orange-100">Reading</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{reading_tests_completed}/{TOTAL_TESTS.reading}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-orange-100/80">
                                        <span>Accuracy</span>
                                        <span className="font-bold text-white">{reading_average_score}%</span>
                                    </div>
                                </div>

                                {/* Listening */}
                                <div className="bg-black/10 rounded-xl p-3 border border-white/10">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <Headphones className="w-3.5 h-3.5 text-orange-100" />
                                            <span className="text-[13px] font-bold text-orange-100">Listening</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{listening_tests_completed}/{TOTAL_TESTS.listening}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-orange-100/80">
                                        <span>Accuracy</span>
                                        <span className="font-bold text-white">{listening_average_score}%</span>
                                    </div>
                                </div>

                                {/* Writing */}
                                <div className="bg-black/10 rounded-xl p-3 border border-white/10">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <PenTool className="w-3.5 h-3.5 text-orange-100" />
                                            <span className="text-[13px] font-bold text-orange-100">Writing</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{writing_tests_completed}/{TOTAL_TESTS.writing}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-orange-100/80">
                                        <span>Avg. Band</span>
                                        <span className="font-bold text-white">{writing_average_score}</span>
                                    </div>
                                </div>

                                {/* Vocabulary */}
                                <div className="bg-black/10 rounded-xl p-3 border border-white/10">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <Brain className="w-3.5 h-3.5 text-orange-100" />
                                            <span className="text-[13px] font-bold text-orange-100">Vocabulary</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{vocab_tests_completed}/{TOTAL_TESTS.vocab}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-orange-100/80">
                                        <span>Accuracy</span>
                                        <span className="font-bold text-white">{vocab_average_score}%</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-orange-200 font-medium mt-3">
                                {progress_percentage === 0
                                    ? "Complete a practice test to see your progress!"
                                    : progress_percentage < 50
                                        ? tx(D.keep, lang)
                                        : tx(D.excellent, lang)}
                            </p>
                        </div>
                    </motion.div>

                    {/* Next Lesson - Electric Blue Glass */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } }
                        }}
                        className="md:col-span-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
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
                    </motion.div>
                </section>

                <div className="grid md:grid-cols-5 gap-6 mt-10">
                    <div className="md:col-span-3">
                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <BouncyText key={`pop-${lang}`} text={tx(D.popular, lang)} type="word" />
                        </h3>
                        <FeatureGrid />
                    </div>
                    <div className="md:col-span-2">
                        <Leaderboard />
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
