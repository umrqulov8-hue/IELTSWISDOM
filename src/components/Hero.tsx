"use client";

import { Button } from "./Button";
import { m, LazyMotion, domMax } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, Zap, Shield, Target, PenTool, MessageSquare, BookOpen, Headphones, Trophy, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();
    const { lang } = useLanguage();
    const h = T.hero;

    const connectedCards = [
        { icon: PenTool, label: "Writing", x: -280, y: -120 },
        { icon: Headphones, label: "Listening", x: 280, y: -120 },
        { icon: BookOpen, label: "Reading", x: -320, y: 80 },
        { icon: MessageSquare, label: "Speaking", x: 320, y: 80 },
        { icon: Sparkles, label: "AI Correction", x: -150, y: -220 },
        { icon: Target, label: "Mock Test", x: 150, y: -220 },
        { icon: Zap, label: "Grammar", x: -180, y: 220 },
        { icon: Trophy, label: "Band 8.0+", x: 180, y: 220 },
    ];

    return (
        <LazyMotion features={domMax}>
            <section className="relative pt-24 pb-40 overflow-hidden bg-white dark:bg-slate-950">
                {/* Subtle Grid Background like screenshot */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                <div className="container relative mx-auto px-4 text-center">
                    {/* DesignKit Badge Style */}
                    <m.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 saas-border shadow-sm mb-12"
                    >
                        <m.span 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="text-lg"
                        >✨</m.span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.1em]">New: AI-powered band score prediction</span>
                    </m.div>

                    {/* Headline - DesignKit Typography */}
                    <m.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.9] max-w-5xl mx-auto mb-10"
                    >
                        {tx(h.h1a, lang)} <br />
                        <span className="text-slate-500">{tx(h.h1b, lang)}</span> {tx(h.h1c, lang)}
                    </m.h1>

                    {/* Description */}
                    <m.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Prepare for IELTS with the most comprehensive design-driven platform. <br />
                        Everything you need to master all four skills in one unified experience.
                    </m.p>

                    {/* CTAs */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32"
                    >
                        <Button size="lg" className="h-14 px-10 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-xl group text-lg font-bold" onClick={handleStartLearning} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Start Free Trial"}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl saas-border bg-white dark:bg-slate-900 text-lg group font-bold">
                            <span className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">▶</span>
                            Watch Demo
                        </Button>
                    </m.div>

                    {/* Neural Map Visualization - DesignKit Signature */}
                    <div className="relative h-[600px] max-w-5xl mx-auto hidden lg:flex items-center justify-center">
                        {/* Central Logo */}
                        <m.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="w-32 h-32 rounded-[2.5rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl z-30 relative"
                        >
                             <div className="w-10 h-10 border-[6px] border-white dark:border-slate-900 rounded-[1rem]" />
                        </m.div>

                        {/* Connected Cards & Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(0,0,0,0.05))" }}>
                            {connectedCards.map((card, idx) => (
                                <m.line
                                    key={`line-${idx}`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 1.5, delay: 1 + idx * 0.1 }}
                                    x1="50%" y1="50%" x2={`calc(50% + ${card.x}px)`} y2={`calc(50% + ${card.y}px)`}
                                    className="stroke-slate-300 dark:stroke-slate-700 stroke-[1]"
                                />
                            ))}
                        </svg>

                        {connectedCards.map((card, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, x: card.x, y: card.y }}
                                transition={{ duration: 1, delay: 0.8 + idx * 0.1, type: "spring", bounce: 0.4 }}
                                className="absolute glass-card px-5 py-3 rounded-2xl shadow-xl saas-border flex items-center gap-3 z-20 group hover:bg-slate-50 transition-colors"
                            >
                                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{card.label}</span>
                            </m.div>
                        ))}

                        {/* Ambient Particles */}
                        {[...Array(20)].map((_, i) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0.1, 0.4, 0.1],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{ 
                                    duration: 3 + Math.random() * 5, 
                                    repeat: Infinity, 
                                    delay: Math.random() * 5 
                                }}
                                className="absolute w-1 h-1 bg-slate-400 rounded-full"
                                style={{ 
                                    left: `${50 + (Math.random() - 0.5) * 80}%`, 
                                    top: `${50 + (Math.random() - 0.5) * 80}%` 
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}
