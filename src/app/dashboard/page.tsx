"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";

export default function DashboardPage() {
    const { stats } = useDashboard();
    const { lang } = useLanguage();
    const D = T.dashboard;

    const {
        progress_percentage = 0,
        estimated_level = "Beginner (A1/A2)",
    } = stats || {};

    return (
        <DashboardLayout showGreeting={true}>
            <m.div className="space-y-10">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                    {/* Current Progress - Detailed Stats */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <div className="w-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/30 transition-shadow duration-300">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10">
                                <h2 className="text-lg font-bold text-white mb-4">
                                    <BouncyText key={`prog-${lang}`} text={tx(D.progress, lang)} type="word" simple />
                                </h2>

                                {/* Overall Score */}
                                <div className="flex items-end gap-2 mb-1">
                                    <span className="text-5xl font-black">{progress_percentage ?? 0}</span>
                                    <span className="text-xl text-orange-200 mb-1 font-bold">%</span>
                                </div>
                                {/* Visual Progress Bar */}
                                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden mb-5 relative">
                                    <m.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress_percentage ?? 0}%` }}
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
                                    aria-label="View full leaderboard and statistics"
                                    className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-xs font-black text-orange-50 uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2 group shadow-lg shadow-black/5"
                                >
                                    <Trophy className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                                    {tx(D.fullView, lang)}
                                </Link>

                            </div>
                        </div>
                    </m.div>

                    {/* Next Lesson - Electric Blue Glass */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full"
                    >
                        <div className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] p-8 text-white relative flex flex-col justify-between group shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300 overflow-hidden h-full">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-blue-100 text-xs font-black mb-3 tracking-widest uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                                    <PlayCircle className="w-3 h-3" /> <BouncyText key={`nl-${lang}`} text={tx(D.nextLesson, lang)} type="word" simple />
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
                                    <BouncyText key={`cont-${lang}`} text={tx(D.continue, lang)} type="word" simple />
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </m.div>
                </section>

                <div className="space-y-6">
                    <h2 className="text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
                        <BouncyText key={`pop-${lang}`} text={tx(D.popular, lang)} type="word" simple />
                    </h2>
                    <FeatureGrid stats={stats} />
                </div>
            </m.div>
        </DashboardLayout>
    );
}
