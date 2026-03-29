"use client";

import { m, LazyMotion, domMax } from "framer-motion";
import { Layers, Mic, Infinity as InfinityIcon, Sparkles, Brain, BookOpenText, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function ValueProps() {
    const { lang } = useLanguage();
    const v = T.valueProps;

    const bentoItems = [
        {
            icon: Brain,
            title: tx(v.ai.title, lang),
            description: tx(v.ai.desc, lang),
            className: "lg:col-span-2 lg:row-span-2 bg-indigo-600 text-white shadow-indigo-500/20",
            iconClass: "bg-white/20 text-white",
            delay: 0.1
        },
        {
            icon: BookOpenText,
            title: tx(v.materials.title, lang),
            description: tx(v.materials.desc, lang),
            className: "lg:col-span-1 lg:row-span-1 bg-white dark:bg-slate-900 saas-border",
            iconClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
            delay: 0.2
        },
        {
            icon: Mic,
            title: tx(v.feedback.title, lang),
            description: tx(v.feedback.desc, lang),
            className: "lg:col-span-1 lg:row-span-1 bg-white dark:bg-slate-900 saas-border",
            iconClass: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400",
            delay: 0.3
        },
        {
            icon: Trophy,
            title: tx(v.success.title, lang),
            description: tx(v.success.desc, lang),
            className: "lg:col-span-2 lg:row-span-1 bg-slate-900 text-white dark:bg-indigo-950",
            iconClass: "bg-white/10 text-white",
            delay: 0.4
        }
    ];

    return (
        <LazyMotion features={domMax}>
            <section id="methodology" className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <m.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
                        >
                            {tx(v.title, lang)}
                        </m.h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {tx(v.subtitle, lang)}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {bentoItems.map((item, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: item.delay }}
                                className={`group relative p-8 rounded-[2.5rem] overflow-hidden flex flex-col justify-end min-h-[320px] shadow-sm transition-all hover:shadow-xl ${item.className}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.iconClass}`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black tracking-tight leading-tight">{item.title}</h3>
                                    <p className="opacity-80 leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                </div>
                                {/* Decorative internal glow/element */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/10 transition-colors" />
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}
