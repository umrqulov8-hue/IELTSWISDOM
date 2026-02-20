"use client";

import {
    Headphones,
    BookOpen,
    Pencil,
    Trophy,
    ClipboardList,
    Star,
    Mic,
    Book
} from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

const features = [
    { name: "Learn Vocabulary", icon: Headphones, color: "text-blue-400", href: "/vocabulary" },
    { name: "Listening Practice", icon: Mic, color: "text-purple-400", href: "/practice/listening" },
    { name: "Reading Practice", icon: BookOpen, color: "text-emerald-400", href: "/practice/reading" },
    { name: "Writing Practice", icon: Pencil, color: "text-orange-400", href: "/practice/writing" },
    { name: "Band 9.0 Samples", icon: Trophy, color: "text-yellow-400", href: "/samples" },
    { name: "Take a Full Mock", icon: ClipboardList, color: "text-red-400", href: "/mock-exams" },
    { name: "Special Materials", icon: Star, color: "text-cyan-400", href: "/materials" },
    { name: "Speaking Practice", icon: Book, color: "text-pink-400", href: "/practice/speaking" },
];

export function FeatureGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {features.map((feature, index) => {
                const Icon = feature.icon;

                // Construct vivid gradients based on the "color" prop or index
                // We'll map colors to specific gradients for that "Vivid" look
                let gradientClass = "from-blue-500 to-cyan-400";
                if (feature.color.includes("orange")) gradientClass = "from-orange-400 to-red-400";
                if (feature.color.includes("purple")) gradientClass = "from-purple-500 to-indigo-500";
                if (feature.color.includes("emerald")) gradientClass = "from-emerald-400 to-teal-500";
                if (feature.color.includes("yellow")) gradientClass = "from-yellow-400 to-orange-400";
                if (feature.color.includes("pink")) gradientClass = "from-pink-500 to-rose-400";
                if (feature.color.includes("red")) gradientClass = "from-red-500 to-rose-500";

                return (
                    <Link href={feature.href} key={feature.name} className="block">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl hover:bg-white/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 h-full"
                        >
                            {/* Vivid Bottom Glow */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-50 group-hover:opacity-100 group-hover:h-full transition-all duration-500 -z-10`} />

                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-700 group-hover:text-white transition-colors">
                                    {feature.name}
                                </h3>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
