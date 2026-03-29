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
            scale: 1.05, w: 180,
            extra: { type: 'bars', items: [60, 40, 80] },
            swim: { dx: 25, dy: -30, durX: 5.7, durY: 7.1, durR: 8.3 }
        },
        { 
            icon: Headphones, label: "Listening", x: 280, y: -100, 
            scale: 0.9, w: 160,
            extra: { type: 'bars', items: [30, 90, 50, 70] },
            swim: { dx: -20, dy: 30, durX: 6.3, durY: 5.1, durR: 9.9 }
        },
        { 
            icon: Sparkles, label: "AI Evaluator", x: -180, y: -220, 
            scale: 1.15, w: 200,
            extra: { type: 'dots', items: ['#10b981', '#f59e0b', '#ef4444'] },
            swim: { dx: 12, dy: -35, durX: 7.7, durY: 6.9, durR: 12.1 }
        },
        { 
            icon: Target, label: "Mock Engine", x: 200, y: -200, 
            scale: 1.0, w: 180,
            extra: { type: 'versions', items: ['v1.2.0', 'v1.0.5'] },
            swim: { dx: 30, dy: 15, durX: 5.1, durY: 7.3, durR: 10.7 }
        },
        { 
            icon: BarChart, label: "Analytics", x: 320, y: 120, 
            scale: 1.1, w: 190,
            extra: { type: 'chart', items: [40, 70, 30, 90] },
            swim: { dx: -25, dy: -25, durX: 6.9, durY: 8.1, durR: 14.1 }
        },
        { 
            icon: Search, label: "Analysis", x: -350, y: 140, 
            scale: 0.85, w: 150,
            extra: { type: 'dots', items: ['#334155', '#334155', '#334155'] },
            swim: { dx: 20, dy: 15, durX: 8.9, durY: 6.3, durR: 7.1 }
        },
        { 
            icon: Zap, label: "Speed Prep", x: -200, y: 220, 
            scale: 0.95, w: 170,
            extra: { type: 'bars', items: [100, 80, 60] },
            swim: { dx: -30, dy: -20, durX: 5.3, durY: 7.7, durR: 11.3 }
        },
        { 
            icon: Trophy, label: "Band 9.0", x: 220, y: 240, 
            scale: 1.05, w: 190,
            extra: { type: 'dots', items: ['#f59e0b', '#f59e0b'] },
            swim: { dx: 20, dy: 35, durX: 7.1, durY: 9.3, durR: 8.9 }
        },
    ];

    return (
        <LazyMotion features={domMax}>
            <section className="relative pt-20 pb-32 overflow-hidden bg-white dark:bg-slate-950">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                <div className="container relative mx-auto px-4 text-center">
                    {/* DesignKit Badge Style */}
                    <m.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 saas-border shadow-sm mb-10"
                    >
                        <m.span 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="text-base"
                        >✨</m.span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.15em]">AI-powered band score prediction</span>
                    </m.div>

                    {/* Headline - Scaled down for more compact fit */}
                    <m.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-8"
                    >
                        Build consistent <br /> 
                        <span className="text-slate-400">IELTS success</span> at scale
                    </m.h1>

                    {/* Description */}
                    <m.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
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
                        <Button size="lg" className="h-14 px-10 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-xl group text-lg font-bold transition-all hover:scale-105 active:scale-95" onClick={handleStartLearning} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Start Free Trial"}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl saas-border bg-white dark:bg-slate-900 text-lg group font-bold hover:bg-slate-50 transition-all">
                            <span className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center mr-3 group-hover:bg-white shadow-sm transition-colors">▶</span>
                            Watch Demo
                        </Button>
                    </m.div>

                    {/* Neural Map Visualization - Scaled down height and z-index fix */}
                    <div className="relative h-[720px] max-w-6xl mx-auto hidden lg:flex items-center justify-center">
                        {/* Central Logo - Switched to lower z-index than cards but higher than lines */}
                        <m.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                            transition={{ 
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 1, delay: 0.5 }
                            }}
                            className="w-36 h-36 rounded-[3rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl z-20 relative"
                        >
                             <div className="w-11 h-11 border-[8px] border-white dark:border-slate-900 rounded-[1.25rem]" />
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
                                    {/* Line - Forced to lowest z-index */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                                        <m.line
                                            animate={{ 
                                                x2: [
                                                    `calc(50% + ${card.x}px)`, 
                                                    `calc(50% + ${card.x + card.swim.dx}px)`, 
                                                    `calc(50% + ${card.x}px)`
                                                ], 
                                                y2: [
                                                    `calc(50% + ${card.y}px)`, 
                                                    `calc(50% + ${card.y + card.swim.dy}px)`, 
                                                    `calc(50% + ${card.y}px)`
                                                ],
                                                opacity: [0.08, 0.15, 0.08]
                                            }}
                                            transition={{ 
                                                x2: { duration: card.swim.durX, repeat: Infinity, ease: "easeInOut" },
                                                y2: { duration: card.swim.durY, repeat: Infinity, ease: "easeInOut" },
                                                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            x1="50%" y1="50%" x2={`calc(50% + ${card.x}px)`} y2={`calc(50% + ${card.y}px)`}
                                            className="stroke-slate-900 dark:stroke-white stroke-[1.2]"
                                        />
                                    </svg>

                                    {/* Card - Higher z-index than lines to hide their ends */}
                                    <m.div
                                        initial={{ opacity: 0, scale: card.scale * 0.8, x: card.x, y: card.y }}
                                        animate={{ 
                                            opacity: 1, 
                                            scale: [card.scale, card.scale * 1.03, card.scale], 
                                            x: [card.x, card.x + card.swim.dx, card.x], 
                                            y: [card.y, card.y + card.swim.dy, card.y],
                                            rotate: [-2, 2, -2]
                                        }}
                                        transition={{ 
                                            opacity: { duration: 1 },
                                            scale: { duration: 5.7, repeat: Infinity, ease: "easeInOut" },
                                            x: { duration: card.swim.durX, repeat: Infinity, ease: "easeInOut" },
                                            y: { duration: card.swim.durY, repeat: Infinity, ease: "easeInOut" },
                                            rotate: { duration: card.swim.durR, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        style={{ width: card.w }}
                                        className="absolute pointer-events-auto glass-card p-5 rounded-[1.5rem] shadow-xl saas-border flex flex-col gap-3.5 group hover:scale-[1.05] hover:bg-white active:scale-95 transition-all cursor-pointer z-30 origin-center"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm">
                                                <card.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-900 dark:text-white tracking-tight">{card.label}</span>
                                        </div>

                                        {/* Content matching the high-fidelity density */}
                                        <div className="flex flex-col gap-2 opacity-40">
                                            {card.extra.type === 'versions' && (card.extra.items as string[]).map((v, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[10px] font-semibold">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    {v}
                                                </div>
                                            ))}
                                            {card.extra.type === 'bars' && (
                                                <div className="flex flex-col gap-1.5">
                                                    {(card.extra.items as number[]).map((w, i) => (
                                                        <div key={i} className="h-1.5 bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-slate-900/60 dark:bg-white/60" style={{ width: `${w}%` }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {card.extra.type === 'dots' && (
                                                <div className="flex gap-1.5">
                                                    {(card.extra.items as string[]).map((c, i) => (
                                                        <div key={i} className="w-3.5 h-3.5 rounded-lg shadow-sm" style={{ backgroundColor: c }} />
                                                    ))}
                                                </div>
                                            )}
                                            {card.extra.type === 'chart' && (
                                                <div className="flex items-end gap-1.5 h-8 mt-1">
                                                    {(card.extra.items as number[]).map((v, i) => (
                                                        <div key={i} className="flex-1 bg-slate-900/10 dark:bg-white/10 rounded-t-sm transition-all group-hover:bg-slate-900/20" style={{ height: `${v}%` }} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </m.div>
                                </m.div>
                            ))}
                        </div>

                        {/* Atmospheric Ambient Particles */}
                        {[...Array(30)].map((_, i) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0.05, 0.2, 0.05],
                                    scale: [1, 2, 1],
                                    y: [0, -40, 0]
                                }}
                                transition={{ 
                                    duration: 5 + Math.random() * 8, 
                                    repeat: Infinity, 
                                    delay: Math.random() * 5 
                                }}
                                className="absolute w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full blur-[1px]"
                                style={{ 
                                    left: `${Math.random() * 100}%`, 
                                    top: `${Math.random() * 100}%` 
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}
