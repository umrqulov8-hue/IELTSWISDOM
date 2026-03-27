"use client";

import {
    Headphones, BookOpen, Pencil, Trophy, ClipboardList, Star, Mic, Book
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";
import { cn } from "@/lib/utils";
import { useDevice } from "@/context/DeviceContext";


const featureDefs = [
    { key: "vocabulary" as const, icon: Headphones, color: "text-blue-400", href: "/vocabulary" },
    { key: "listening" as const, icon: Mic, color: "text-purple-400", href: "/practice/listening" },
    { key: "reading" as const, icon: BookOpen, color: "text-emerald-400", href: "/practice/reading" },
    { key: "writing" as const, icon: Pencil, color: "text-orange-400", href: "/practice/writing" },
    { key: "samples" as const, icon: Trophy, color: "text-yellow-400", href: "/samples" },
    { key: "mock" as const, icon: ClipboardList, color: "text-red-400", href: "/mock-exams" },
    { key: "materials" as const, icon: Star, color: "text-cyan-400", href: "/materials" },
    { key: "speaking" as const, icon: Book, color: "text-pink-400", href: "/practice/speaking" },
];

export function FeatureGrid() {
    const { lang } = useLanguage();
    const { shouldAnimate, shouldUseHeavyEffects } = useDevice();
    return (
        <>
            {featureDefs.map((feature, index) => {
                const Icon = feature.icon;
                let gradientClass = "from-blue-500 to-cyan-400";
                let waveColor = "text-cyan-400";
                if (feature.color.includes("orange")) { gradientClass = "from-orange-400 to-red-400"; waveColor = "text-red-400"; }
                if (feature.color.includes("purple")) { gradientClass = "from-purple-500 to-indigo-500"; waveColor = "text-indigo-500"; }
                if (feature.color.includes("emerald")) { gradientClass = "from-emerald-400 to-teal-500"; waveColor = "text-teal-500"; }
                if (feature.color.includes("yellow")) { gradientClass = "from-yellow-400 to-orange-400"; waveColor = "text-orange-400"; }
                if (feature.color.includes("pink")) { gradientClass = "from-pink-500 to-rose-400"; waveColor = "text-rose-400"; }
                if (feature.color.includes("red")) { gradientClass = "from-red-500 to-rose-500"; waveColor = "text-rose-500"; }

                const CardWrapper = shouldAnimate ? m.div : "div";
                const motionProps = shouldAnimate
                    ? { initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: index * 0.08, type: "spring", bounce: 0.5 } }
                    : {};

                return (
                    <CardWrapper
                        {...(motionProps as any)}
                        key={feature.key}
                        className="float-left w-1/2 md:w-1/4 px-2 md:px-3 mb-4 md:mb-6 h-[170px]"
                    >
                        <Link href={feature.href} className="block h-full relative group">
                            <div className="relative bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center justify-center">

                                {/* Wave + Bubble Effect — guarded behind shouldAnimate */}
                                <div className="absolute left-0 right-0 h-full bottom-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0">
                                    {/* Back Wave */}
                                    {shouldAnimate && (
                                        <div className={cn("absolute top-[-25px] left-0 w-[200%] h-[26px] animate-wave-roll-slow opacity-50", waveColor)}>
                                            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full fill-current">
                                                <path d="M0,50 Q125,100 250,50 T500,50 T750,50 T1000,50 L1000,100 L0,100 Z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Front Wave */}
                                    {shouldAnimate && (
                                        <div className={cn("absolute top-[-18px] left-0 w-[200%] h-[20px] animate-wave-roll-fast opacity-90", waveColor)}>
                                            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full fill-current">
                                                <path d="M0,50 Q125,100 250,50 T500,50 T750,50 T1000,50 L1000,100 L0,100 Z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Liquid Body (always shown on hover) */}
                                    <div className={cn("absolute inset-0 opacity-90 bg-gradient-to-t", gradientClass)} />

                                    {/* Bubbles — only on high-tier devices */}
                                    {shouldUseHeavyEffects && (
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute w-2 h-2 rounded-full bg-white/60 left-[10%] animate-drop-rise-turbulent delay-50" />
                                            <div className="absolute w-3 h-3 rounded-full bg-white/40 left-[25%] animate-drop-rise-turbulent delay-200" />
                                            <div className="absolute w-1.5 h-1.5 rounded-full bg-white/80 left-[35%] animate-drop-rise-turbulent delay-400" />
                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/50 left-[50%] animate-drop-rise-turbulent delay-600" />
                                            <div className="absolute w-1 h-1 rounded-full bg-white/70 left-[60%] animate-drop-rise-turbulent delay-800" />
                                            <div className="absolute w-3 h-3 rounded-full bg-white/30 left-[75%] animate-drop-rise-turbulent delay-900" />
                                            <div className="absolute w-2 h-2 rounded-full bg-white/60 left-[85%] animate-drop-rise-turbulent delay-1100" />
                                            <div className="absolute w-1.5 h-1.5 rounded-full bg-white/50 left-[90%] animate-drop-rise-turbulent delay-1300" />
                                            <div className="absolute w-3 h-3 rounded-full bg-white/40 left-[15%] animate-drop-rise-turbulent delay-1500" />
                                            <div className="absolute w-2 h-2 rounded-full bg-white/70 left-[45%] animate-drop-rise-turbulent delay-1800" />
                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/60 left-[80%] animate-drop-rise-turbulent delay-2100" />
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                    <div className={cn(
                                        "p-4 rounded-2xl shadow-lg transition-transform duration-500 ease-out group-hover:scale-110",
                                        "bg-gradient-to-br text-white",
                                        gradientClass,
                                        "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:border group-hover:border-white/40"
                                    )}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-sm font-bold transition-colors duration-500 line-clamp-2 text-slate-700 group-hover:text-white delay-100">
                                        <BouncyText key={lang} text={tx(T.features[feature.key], lang)} type="word" />
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </CardWrapper>
                );
            })}
        </>
    );
}

