"use client";

import { Button } from "./Button";
import { m, LazyMotion, domMax } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, Zap, Shield, Target, PenTool, MessageSquare, BookOpen, Headphones, Trophy, Search, BarChart, Play } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import Threads from "./ui/Threads";
import GradualBlur from "./ui/GradualBlur";
import SplitText from "./ui/SplitText";

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();
    const { lang } = useLanguage();
    const h = T.hero;

    const connectedCards = [
        { 
            icon: PenTool, label: "Writing", x: -250, y: -100, 
            scale: 1.0, w: 170,
            extra: { type: 'bars', items: [60, 40, 80] },
            duration: 7 // Faster local float
        },
        { 
            icon: Headphones, label: "Listening", x: 250, y: -80, 
            scale: 0.85, w: 150,
            extra: { type: 'bars', items: [30, 90, 50, 70] },
            duration: 8.5
        },
        { 
            icon: Sparkles, label: "Band 8.5+", x: -160, y: -180, 
            scale: 1.1, w: 190,
            extra: { type: 'dots', items: ['#10b981', '#f59e0b', '#ef4444'] },
            duration: 9.3
        },
        { 
            icon: Target, label: "Mock Exam", x: 180, y: -170, 
            scale: 0.95, w: 170,
            extra: { type: 'versions', items: ['v1.2.0', 'v1.0.5'] },
            duration: 10.7
        },
        { 
            icon: BarChart, label: "Skill Analytics", x: 280, y: 100, 
            scale: 1.05, w: 180,
            extra: { type: 'chart', items: [40, 70, 30, 90] },
            duration: 12.1
        },
        { 
            icon: Search, label: "Gap Analysis", x: -300, y: 120, 
            scale: 0.8, w: 140,
            extra: { type: 'dots', items: ['#334155', '#334155', '#334155'] },
            duration: 11.3
        },
        { 
            icon: Zap, label: "Speed Prep", x: -180, y: 190, 
            scale: 0.9, w: 160,
            extra: { type: 'bars', items: [100, 80, 60] },
            duration: 13.7
        },
        { 
            icon: Trophy, label: "EXAM READY", x: 180, y: 200, 
            scale: 1.0, w: 180,
            extra: { type: 'dots', items: ['#f59e0b', '#f59e0b'] },
            duration: 15.1
        },
    ];

    return (
        <LazyMotion features={domMax}>
            <section className="relative pt-16 pb-24 overflow-hidden bg-white dark:bg-slate-950">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Dynamic WebGL Threads Background - Full Width & Enlarged */}
                <div className="absolute top-0 left-0 w-full h-[550px] z-0 opacity-80 pointer-events-none [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,#000_20%,transparent_100%)] will-change-transform">
                    <Threads 
                        amplitude={1.2}
                        distance={0.2}
                        enableMouseInteraction={true}
                        color={[0.4, 0.5, 0.8]} 
                    />
                </div>

                <div className="container relative mx-auto px-4 text-center">
                    {/* Badge Removed */}

                    {/* Headline - Expert Migration */}
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto mb-6">
                        <SplitText
                            text="Master every section"
                            className="text-slate-950 dark:text-white"
                            delay={30}
                            duration={0.8}
                            threshold={0.2}
                            rootMargin="-50px"
                        />
                        <br />
                        <SplitText
                            text="OF THE IELTS EXAM"
                            className="text-slate-400 font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400"
                            delay={50}
                            duration={1}
                            threshold={0.2}
                            rootMargin="-50px"
                        />
                    </h1>

                    {/* Description - Expert Migration */}
                    <m.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Reach Band 8.5+ with precision evaluations, authentic mock tests, and systematic section mastery designed by experts.
                    </m.p>

                    {/* CTAs */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col items-center justify-center gap-4 mb-24"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="h-14 px-10 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-xl group text-lg font-bold transition-all hover:scale-105 active:scale-95 border-0" onClick={handleStartLearning} disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Try for Free"}
                                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-lg group font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors">
                                    <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600 ml-0.5" />
                                </div>
                                Guide
                            </Button>
                        </div>
                        <m.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="text-sm font-medium text-slate-500 mt-2"
                        >
                            Already using IELTS Wisdom? <button onClick={handleStartLearning} className="text-slate-900 dark:text-white font-bold hover:underline">Sign in</button>
                        </m.p>
                    </m.div>

                    {/* Neural Map Visualization - Hyper-Compact Localized Oval */}
                    <div className="relative h-[620px] max-w-5xl mx-auto hidden lg:flex items-center justify-center">
                        {/* Central Logo - Clockwork Toj */}
                        <m.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                            transition={{ 
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 1, delay: 0.5 }
                            }}
                            className="w-32 h-32 rounded-[2.5rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl z-20 relative"
                        >
                             <svg className="w-12 h-8 text-white dark:text-slate-900 fill-current drop-shadow-lg" viewBox="0 0 24 24">
                                <path d="M3 16l-2-9 6 4.5L12 3l5 8.5 6-4.5-2 9H3zm-1-2h20v4H2v-4z" />
                                <circle cx="1" cy="6" r="1.5" />
                                <circle cx="7" cy="11.5" r="1.5" />
                                <circle cx="12" cy="2" r="1.5" />
                                <circle cx="17" cy="11.5" r="1.5" />
                                <circle cx="23" cy="6" r="1.5" />
                             </svg>
                        </m.div>

                        {/* Combined Cards & Lines System */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {connectedCards.map((card, idx) => {
                                // Calculate localized clockwise oval keyframes
                                const dx = 25; // horizontal swing
                                const dy = 20; // vertical swing
                                
                                const xKeyframes = [card.x, card.x + dx, card.x, card.x - dx, card.x];
                                const yKeyframes = [card.y - dy, card.y, card.y + dy, card.y, card.y - dy];
                                const sKeyframes = [card.scale, card.scale * 1.05, card.scale, card.scale * 0.95, card.scale];

                                return (
                                    <m.div
                                        key={`group-${idx}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 + idx * 0.1 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        {/* Line - Tracks the localized float */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                                            <m.line
                                                animate={{ 
                                                    x2: xKeyframes.map(x => `calc(50% + ${x}px)`), 
                                                    y2: yKeyframes.map(y => `calc(50% + ${y}px)`),
                                                }}
                                                transition={{ 
                                                    repeat: Infinity, 
                                                    duration: card.duration, 
                                                    ease: "linear" 
                                                }}
                                                x1="50%" y1="50%" x2={`calc(50% + ${card.x}px)`} y2={`calc(50% + ${card.y}px)`}
                                                className="stroke-slate-950/10 dark:stroke-white/10 stroke-[1]"
                                            />
                                        </svg>

                                        {/* Card - Localized Clockwise Oval */}
                                        <m.div
                                            initial={{ opacity: 0, x: card.x, y: card.y }}
                                            animate={{ 
                                                opacity: 1, 
                                                x: xKeyframes, 
                                                y: yKeyframes,
                                                scale: sKeyframes,
                                                rotate: [-0.5, 0.5, -0.5]
                                            }}
                                            transition={{ 
                                                opacity: { duration: 1 },
                                                x: { repeat: Infinity, duration: card.duration, ease: "linear" },
                                                y: { repeat: Infinity, duration: card.duration, ease: "linear" },
                                                scale: { repeat: Infinity, duration: card.duration, ease: "linear" },
                                                rotate: { repeat: Infinity, duration: card.duration / 3, ease: "easeInOut" }
                                            }}
                                            style={{ width: card.w }}
                                            className="absolute pointer-events-auto bg-white dark:bg-slate-900 p-4 rounded-[1.25rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 flex flex-col gap-3 group hover:scale-[1.05] hover:bg-white active:scale-95 transition-all cursor-pointer z-30 origin-center will-change-transform"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm">
                                                    <card.icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-[10px] text-slate-900 dark:text-white tracking-tight uppercase whitespace-nowrap">{card.label}</span>
                                            </div>

                                            {/* Simplified Content */}
                                            <div className="flex flex-col gap-1.5 opacity-40">
                                                {card.extra.type === 'versions' && (card.extra.items as string[]).map((v, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-[9px] font-semibold">
                                                        <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                        {v}
                                                    </div>
                                                ))}
                                                {card.extra.type === 'bars' && (
                                                    <div className="flex flex-col gap-1">
                                                        {(card.extra.items as number[]).map((w, i) => (
                                                            <div key={i} className="h-1 bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-slate-900/60 dark:bg-white/60" style={{ width: `${w}%` }} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {card.extra.type === 'dots' && (
                                                    <div className="flex gap-1">
                                                        {(card.extra.items as string[]).map((c, i) => (
                                                            <div key={i} className="w-3 h-3 rounded-md shadow-sm" style={{ backgroundColor: c }} />
                                                        ))}
                                                    </div>
                                                )}
                                                {card.extra.type === 'chart' && (
                                                    <div className="flex items-end gap-1 h-6 mt-0.5">
                                                        {(card.extra.items as number[]).map((v, i) => (
                                                            <div key={i} className="flex-1 bg-slate-900/10 dark:bg-white/10 rounded-t-sm transition-all group-hover:bg-slate-900/20" style={{ height: `${v}%` }} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </m.div>
                                    </m.div>
                                );
                            })}
                        </div>

                        {/* Ambient Particles */}
                        {[...Array(20)].map((_, i) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0.03, 0.1, 0.03],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{ 
                                    duration: 5 + Math.random() * 5, 
                                    repeat: Infinity, 
                                    delay: Math.random() * 5 
                                }}
                                className="absolute w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full blur-[1px]"
                                style={{ 
                                    left: `${Math.random() * 100}%`, 
                                    top: `${Math.random() * 100}%` 
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Scroll Transition Blur - Calibrated to prevent smudging headers */}
                <GradualBlur
                    target="parent"
                    position="bottom"
                    height="6rem"
                    strength={2}
                    divCount={6}
                    curve="bezier"
                    exponential
                    opacity={0.8}
                />
            </section>
        </LazyMotion>
    );
}
