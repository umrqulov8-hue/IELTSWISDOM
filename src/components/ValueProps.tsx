"use client";

import { m, LazyMotion, domMax } from "framer-motion";
import { PenTool, MessageSquare, BookOpen, Headphones, Sparkles, Target, Zap, Trophy, Shield, Brain, Layers, Search, Code, Smartphone, Globe, BarChart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function ValueProps() {
    const { lang } = useLanguage();
    
    const featureItems = [
        { icon: Brain, title: "AI Correction", badge: "AI", type: "ai", desc: "Instant feedback on your writing tasks with detailed band score analysis." },
        { icon: Layers, title: "Full Mock Tests", badge: "Core", type: "core", desc: "Experience the real IELTS environment with timed full-length exams." },
        { icon: Smartphone, title: "Mobile Practice", badge: "Pro", type: "pro", desc: "Study on the go with our optimized mobile companion app." },
        { icon: Sparkles, title: "Band 9 Samples", badge: "Core", type: "core", desc: "Access a library of model answers for every task type." },
        { icon: Shield, title: "Secure Testing", badge: "Pro", type: "pro", desc: "Fraud-proof test environment for authentic mock results." },
        { icon: Globe, title: "Native Support", badge: "Core", type: "core", desc: "Curriculum designed by native IELTS examiners." },
        { icon: BarChart, title: "Analytics", badge: "Pro", type: "pro", desc: "Track your progress with detailed performance metrics." },
        { icon: Zap, title: "Flashcards", badge: "Core", type: "core", desc: "Master 5000+ IELTS words with our smart spaced-repetition system." },
    ];

    return (
        <LazyMotion features={domMax}>
            <section id="features" className="py-32 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <m.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
                        >
                            Everything you need <br /> for IELTS success
                        </m.h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            From AI prediction to authentic mock tests, <br /> our platform provides all the tools you need to reach Band 8.0+.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {featureItems.map((item, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 saas-border shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                                        item.type === 'ai' ? 'bg-indigo-50 text-indigo-600' : 
                                        item.type === 'pro' ? 'bg-orange-50 text-orange-600' : 
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}
