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
import type { StudentStats } from "@/hooks/useDashboard";
import { memo } from "react";


const featureDefs = [
    { key: "vocabulary" as const, icon: Headphones, color: "text-blue-400", href: "/vocabulary", statKey: "vocab_progress" as const },
    { key: "listening" as const, icon: Mic, color: "text-purple-400", href: "/practice/listening", statKey: "listening_progress" as const },
    { key: "reading" as const, icon: BookOpen, color: "text-emerald-400", href: "/lessons/reading", statKey: "reading_progress" as const },
    { key: "writing" as const, icon: Pencil, color: "text-orange-400", href: "/practice/writing", statKey: "writing_progress" as const },
    { key: "samples" as const, icon: Trophy, color: "text-yellow-400", href: "/samples" },
    { key: "mock" as const, icon: ClipboardList, color: "text-red-400", href: "/mock-exams" },
    { key: "materials" as const, icon: Star, color: "text-cyan-400", href: "/materials" },
    { key: "speaking" as const, icon: Book, color: "text-pink-400", href: "/practice/speaking" },
];

interface FeatureGridProps {
    stats?: StudentStats | null;
}

export const FeatureGrid = memo(({ stats }: FeatureGridProps) => {
    const { lang } = useLanguage();
    const { shouldAnimate, shouldUseHeavyEffects } = useDevice();
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-8">
            {featureDefs.map((feature, index) => {
                const Icon = feature.icon;
                const progress = feature.statKey ? (stats?.[feature.statKey] ?? 0) : null;
                
                let gradientClass = "from-blue-500 to-cyan-400";
                let waveColor = "text-cyan-400";
                if (feature.color.includes("orange")) { gradientClass = "from-orange-400 to-red-400"; waveColor = "text-red-400"; }
                if (feature.color.includes("purple")) { gradientClass = "from-purple-500 to-indigo-500"; waveColor = "text-indigo-500"; }
                if (feature.color.includes("emerald")) { gradientClass = "from-emerald-400 to-teal-500"; waveColor = "text-teal-500"; }
                if (feature.color.includes("yellow")) { gradientClass = "from-yellow-400 to-orange-400"; waveColor = "text-orange-400"; }
                if (feature.color.includes("pink")) { gradientClass = "from-pink-500 to-rose-400"; waveColor = "text-rose-400"; }
                if (feature.color.includes("red")) { gradientClass = "from-red-500 to-rose-500"; waveColor = "text-rose-700"; }

                const CardWrapper = shouldAnimate ? m.div : "div";
                const motionProps = shouldAnimate
                    ? { initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: index * 0.08, type: "spring", bounce: 0.5 } }
                    : {};

                return (
                    <CardWrapper
                        {...(motionProps as any)}
                        key={feature.key}
                        className="h-[170px]"
                    >
                        <Link 
                            href={feature.href} 
                            aria-label={`Go to ${tx(T.features[feature.key], lang)} section. Current progress: ${progress !== null ? progress : 0}%`}
                            className="block h-full relative group"
                        >
                            <div className={cn(
                                "relative bg-white/50 border border-white/60 p-6 rounded-[2rem] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center justify-center",
                                shouldUseHeavyEffects && "backdrop-blur-xl"
                            )}>

                                {/* Wave + Bubble Effect — guarded behind shouldAnimate */}
                                <div className="absolute left-0 right-0 h-full bottom-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0">
                                    {/* Liquid Body (always shown on hover) */}
                                    <div className={cn("absolute inset-0 opacity-90 bg-gradient-to-t", gradientClass)} />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center gap-4 w-full">
                                    <div className={cn(
                                        "p-4 rounded-2xl shadow-lg transition-transform duration-500 ease-out group-hover:scale-110",
                                        "bg-gradient-to-br text-white",
                                        gradientClass,
                                        "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:border group-hover:border-white/40"
                                    )}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <h2 className="text-sm font-bold transition-colors duration-500 line-clamp-2 text-slate-800 group-hover:text-white delay-100">
                                            <BouncyText key={lang} text={tx(T.features[feature.key], lang)} type="word" simple />
                                        </h2>
                                        
                                        {/* Mini Progress Indicator */}
                                        {progress !== null && (
                                            <div className="flex flex-col items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <div className="w-12 h-1 bg-slate-200 group-hover:bg-white/30 rounded-full overflow-hidden">
                                                    <m.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        className="h-full bg-current"
                                                        style={{ color: 'inherit' }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-700 group-hover:text-white">{progress}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </CardWrapper>
                );
            })}
        </div>
    );
});

