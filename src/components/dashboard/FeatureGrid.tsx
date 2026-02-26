"use client";

import {
    Headphones, BookOpen, Pencil, Trophy, ClipboardList, Star, Mic, Book
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";

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
    return (
        <>
            {featureDefs.map((feature, index) => {
                const Icon = feature.icon;
                let gradientClass = "from-blue-500 to-cyan-400";
                if (feature.color.includes("orange")) gradientClass = "from-orange-400 to-red-400";
                if (feature.color.includes("purple")) gradientClass = "from-purple-500 to-indigo-500";
                if (feature.color.includes("emerald")) gradientClass = "from-emerald-400 to-teal-500";
                if (feature.color.includes("yellow")) gradientClass = "from-yellow-400 to-orange-400";
                if (feature.color.includes("pink")) gradientClass = "from-pink-500 to-rose-400";
                if (feature.color.includes("red")) gradientClass = "from-red-500 to-rose-500";

                return (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            default: { delay: index * 0.08, type: "spring", bounce: 0.5 },
                            layout: { type: "spring", stiffness: 100, damping: 14, mass: 0.8, delay: index * 0.03 }
                        }}
                        key={feature.key}
                        className="float-left w-1/2 md:w-1/4 px-2 md:px-3 mb-4 md:mb-6 h-[170px]"
                    >
                        <Link href={feature.href} className="block h-full">
                            <div className="group relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl hover:bg-white/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-50 group-hover:opacity-100 group-hover:h-full transition-all duration-500 -z-10`} />
                                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-700 group-hover:text-white transition-colors line-clamp-2">
                                        <BouncyText key={lang} text={tx(T.features[feature.key], lang)} type="word" />
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </>
    );
}
