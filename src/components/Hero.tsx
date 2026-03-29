"use client";

import { Button } from "./Button";
import { m, LazyMotion, domMax } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, Zap, Shield, Target } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();
    const { lang } = useLanguage();
    const h = T.hero;

    return (
        <LazyMotion features={domMax}>
            <section className="relative pt-20 pb-32 overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
                {/* Background Blobs for SaaS feel */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-blob" />
                    <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-cyan-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                </div>

                <div className="container relative mx-auto px-4 text-center">
                    {/* Badge */}
                    <m.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 saas-border shadow-sm mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{tx(h.badge, lang)}</span>
                    </m.div>

                    {/* Headline */}
                    <m.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.95] mb-8"
                    >
                        <span className="block mb-2">{tx(h.h1a, lang)}</span>
                        <span className="text-gradient inline-block">{tx(h.h1b, lang)}</span>
                    </m.h1>

                    {/* Description */}
                    <m.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {tx(h.desc, lang)}
                    </m.p>

                    {/* CTAs */}
                    <m.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                    >
                        <Button size="lg" className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 group text-lg" onClick={handleStartLearning} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : tx(h.cta, lang)}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl saas-border bg-white dark:bg-slate-900 text-lg" href="#methodology">
                            {tx(h.curriculum, lang)}
                        </Button>
                    </m.div>

                    {/* Mockup Preview - The "Design System" Focus */}
                    <m.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
                        className="relative max-w-6xl mx-auto"
                    >
                        <div className="relative glass-card rounded-[2.5rem] overflow-hidden p-3 border-2 border-slate-200/20 dark:border-slate-800/20">
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden aspect-[16/10] relative shadow-2xl">
                                {/* Synthetic Dashboard UI Elements */}
                                <div className="absolute inset-0 p-8 flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4">
                                            {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
                                        </div>
                                        <div className="w-32 h-10 rounded-full bg-slate-100 dark:bg-slate-800" />
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 flex-1">
                                        <div className="col-span-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 relative overflow-hidden">
                                             <div className="h-4 w-40 bg-indigo-500/20 rounded-full mb-4" />
                                             <div className="h-8 w-60 bg-indigo-500/10 rounded-full" />
                                             {/* Floating Stat element */}
                                             <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-xl saas-border scale-110">
                                                 <Zap className="text-secondary w-6 h-6 mb-2" />
                                                 <div className="font-black text-2xl text-slate-900 dark:text-white">8.5</div>
                                                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Band</div>
                                             </div>
                                        </div>
                                        <div className="col-span-4 flex flex-col gap-6">
                                            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6">
                                                <Target className="text-cyan-500 w-8 h-8 mb-4" />
                                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
                                                <div className="h-4 w-[60%] bg-slate-200 dark:bg-slate-700 rounded-full" />
                                            </div>
                                            <div className="flex-1 bg-indigo-500 rounded-3xl p-6 flex flex-col justify-center text-white">
                                                <Shield className="w-8 h-8 mb-2" />
                                                <div className="font-bold text-lg leading-tight mb-2">Ready for Exam?</div>
                                                <div className="text-xs text-indigo-100 italic">"Your progress is 92%"</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Glow Effect at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Floating Feature Badges */}
                        <m.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-12 hidden lg:flex p-6 rounded-3xl glass-card saas-border shadow-2xl items-center gap-4 z-20"
                        >
                            <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">AI Feedback</div>
                                <div className="font-black text-slate-900 dark:text-white">Instant Scoring</div>
                            </div>
                        </m.div>

                        <m.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 hidden lg:flex p-6 rounded-3xl glass-card saas-border shadow-2xl items-center gap-4 z-20"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200" />)}
                            </div>
                            <div className="text-left">
                                <div className="font-black text-slate-900 dark:text-white">Join 10k+ Students</div>
                                <div className="text-xs font-bold text-indigo-500">Live Community</div>
                            </div>
                        </m.div>
                    </m.div>
                </div>
            </section>
        </LazyMotion>
    );
}
