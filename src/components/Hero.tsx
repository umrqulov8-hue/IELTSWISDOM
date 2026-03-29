"use client";

import { Button } from "./Button";
import { m, LazyMotion, domMax } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, Zap, Shield, Target, PenTool, MessageSquare, BookOpen, Headphones, Trophy, Search, BarChart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();
    const { lang } = useLanguage();
    const h = T.hero;

    const connectedCards = [
        { 
            icon: PenTool, label: "Writing", x: -280, y: -120, 
            extra: { type: 'bars', items: [60, 40, 80] },
            swim: { y: [0, -12, 0], x: [0, 8, 0], duration: 5 }
        },
        { 
            icon: Headphones, label: "Listening", x: 280, y: -120, 
            extra: { type: 'bars', items: [30, 90, 50, 70] },
            swim: { y: [0, 10, 0], x: [0, -6, 0], duration: 6 }
        },
        { 
            icon: Sparkles, label: "AI Evaluator", x: -180, y: -240, 
            extra: { type: 'dots', items: ['#10b981', '#f59e0b', '#ef4444'] },
            swim: { y: [0, -15, 0], x: [0, 10, 0], duration: 7 }
        },
        { 
            icon: Target, label: "Mock Engine", x: 180, y: -220, 
            extra: { type: 'versions', items: ['v1.2.0', 'v1.0.5'] },
            swim: { y: [0, 8, 0], x: [0, 12, 0], duration: 5.5 }
        },
        { 
            icon: BarChart, label: "Analytics", x: 340, y: 100, 
            extra: { type: 'chart', items: [40, 70, 30, 90] },
            swim: { y: [0, -10, 0], x: [0, -8, 0], duration: 6.5 }
        },
        { 
            icon: Search, label: "Analysis", x: -340, y: 100, 
            extra: { type: 'dots', items: ['#334155', '#334155', '#334155'] },
            swim: { y: [0, 12, 0], x: [0, 6, 0], duration: 4.8 }
        },
        { 
            icon: Zap, label: "Speed Prep", x: -180, y: 220, 
            extra: { type: 'bars', items: [100, 80, 60] },
            swim: { y: [0, -8, 0], x: [0, -10, 0], duration: 5.2 }
        },
        { 
            icon: Trophy, label: "Band 9.0", x: 180, y: 220, 
            extra: { type: 'dots', items: ['#f59e0b', '#f59e0b'] },
            swim: { y: [0, 15, 0], x: [0, 5, 0], duration: 7.2 }
        },
    ];

    return (
        <LazyMotion features={domMax}>
            <section className="relative pt-24 pb-40 overflow-hidden bg-white dark:bg-slate-950">
                {/* Subtle Grid Background */}
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
                        className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] max-w-5xl mx-auto mb-10"
                    >
                        Build consistent <br /> 
                        <span className="text-slate-500">IELTS success</span> at scale
                    </m.h1>

                    {/* Description */}
                    <m.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        Create, maintain, and scale your IELTS preparation with our comprehensive platform. <br />
                        From design-tokens to AI-powered mock tests, we've got you covered.
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

                    {/* Neural Map Visualization */}
                    <div className="relative h-[700px] max-w-6xl mx-auto hidden lg:flex items-center justify-center">
                        {/* Central Logo */}
                        <m.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="w-32 h-32 rounded-[2.5rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl z-30 relative"
                        >
                             <div className="w-10 h-10 border-[6px] border-white dark:border-slate-900 rounded-[1rem]" />
                        </m.div>

                        {/* Combined Cards & Lines System */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {connectedCards.map((card, idx) => (
                                <m.div
                                    key={`group-${idx}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + idx * 0.1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    {/* Line with identical swim animation */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                                        <m.line
                                            animate={{ 
                                                x2: [
                                                    `calc(50% + ${card.x}px)`, 
                                                    `calc(50% + ${card.x + card.swim.x[1]}px)`, 
                                                    `calc(50% + ${card.x}px)`
                                                ], 
                                                y2: [
                                                    `calc(50% + ${card.y}px)`, 
                                                    `calc(50% + ${card.y + card.swim.y[1]}px)`, 
                                                    `calc(50% + ${card.y}px)`
                                                ] 
                                            }}
                                            transition={{ duration: card.swim.duration, repeat: Infinity, ease: "easeInOut" }}
                                            x1="50%" y1="50%" x2={`calc(50% + ${card.x}px)`} y2={`calc(50% + ${card.y}px)`}
                                            className="stroke-slate-200 dark:stroke-slate-800 stroke-[1]"
                                        />
                                    </svg>

                                    {/* Card with swim animation */}
                                    <m.div
                                        initial={{ opacity: 0, scale: 0.8, x: card.x, y: card.y }}
                                        animate={{ 
                                            opacity: 1, 
                                            scale: 1, 
                                            x: [card.x, card.x + card.swim.x[1], card.x], 
                                            y: [card.y, card.y + card.swim.y[1], card.y] 
                                        }}
                                        transition={{ 
                                            opacity: { duration: 1 },
                                            scale: { duration: 1 },
                                            x: { duration: card.swim.duration, repeat: Infinity, ease: "easeInOut" },
                                            y: { duration: card.swim.duration, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute pointer-events-auto glass-card min-w-[140px] p-4 rounded-2xl shadow-xl saas-border flex flex-col gap-3 group hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                                                <card.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-900 dark:text-white">{card.label}</span>
                                        </div>

                                        {/* Dynamic Content like in Screenshot */}
                                        <div className="flex flex-col gap-1.5 opacity-60">
                                            {card.extra.type === 'versions' && (card.extra.items as string[]).map((v, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[10px] font-medium">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    {v}
                                                </div>
                                            ))}
                                            {card.extra.type === 'bars' && (
                                                <div className="flex flex-col gap-1">
                                                    {(card.extra.items as number[]).map((w, i) => (
                                                        <div key={i} className="h-1 bg-slate-900/10 dark:bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-slate-900 dark:bg-white" style={{ width: `${w}%` }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {card.extra.type === 'dots' && (
                                                <div className="flex gap-1.5">
                                                    {(card.extra.items as string[]).map((c, i) => (
                                                        <div key={i} className="w-3 h-3 rounded-md" style={{ backgroundColor: c }} />
                                                    ))}
                                                </div>
                                            )}
                                            {card.extra.type === 'chart' && (
                                                <div className="flex items-end gap-1.5 h-8">
                                                    {(card.extra.items as number[]).map((v, i) => (
                                                        <div key={i} className="flex-1 bg-slate-900/20 dark:bg-white/20 rounded-t" style={{ height: `${v}%` }} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </m.div>
                                </m.div>
                            ))}
                        </div>

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
