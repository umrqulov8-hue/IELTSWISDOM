"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlayCircle, ArrowRight, Loader2 } from "lucide-react";
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
    const { progress_percentage, completed_lessons } = stats || { progress_percentage: 0, completed_lessons: 0 };

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
                    {/* Current Progress - Orange Liquid */}
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
                            <h3 className="text-lg font-bold text-orange-100 mb-6">
                                <BouncyText key={`prog-${lang}`} text={tx(D.progress, lang)} type="word" />
                            </h3>

                            <div className="flex items-end gap-2 mb-3">
                                <span className="text-6xl font-black">{progress_percentage}</span>
                                <span className="text-xl text-orange-200 mb-2 font-bold">%</span>
                            </div>

                            <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden mb-4 border border-white/10">
                                <div className="h-full w-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] relative overflow-hidden bg-transparent">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: progress_percentage / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        style={{ transformOrigin: "left" }}
                                        className="absolute left-0 top-0 bottom-0 bg-white rounded-full w-full"
                                    >
                                        <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                                    </motion.div>
                                </div>
                            </div>
                            <p className="text-sm text-orange-100 font-medium">
                                <BouncyText key={`msg-${lang}`} text={progress_percentage < 50 ? tx(D.keep, lang) : tx(D.excellent, lang)} type="word" />
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

                {/* Feature Grid */}
                <motion.section
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="mt-10"
                >
                    <h3 className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
                        <BouncyText key={`pop-${lang}`} text={tx(D.popular, lang)} type="word" />
                    </h3>
                    <FeatureGrid />
                </motion.section>
            </motion.div>
        </DashboardLayout>
    );
}
