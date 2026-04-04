"use client";

import { m } from "framer-motion";
import { CheckCircle2, Star, Target, Zap, Rocket, Award, ShieldCheck, Microscope } from "lucide-react";
import CardSwap, { Card } from "./ui/CardSwap";

const milestones = [
    {
        title: "Initial Diagnostic (Band Prep)",
        description: "Adaptive AI evaluation to pinpoint your baseline grammar and lexical resource. No guesswork.",
        icon: Target,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    },
    {
        title: "Mock Exam Simulation",
        description: "Full-length 1:1 authentic CDI environment. Practice under pressure, perfectly timed.",
        icon: Microscope,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "AI Feedback & Revisions",
        description: "Instant, sub-sentence level corrections. Fix errors before they become habits.",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        title: "Mastery of Tricky Structures",
        description: "Detailed blueprints for complex sentences, collocations, and idiomatic flow.",
        icon: ShieldCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        title: "The Success Pillar (Band 8.5+)",
        description: "Final refinement phase targeted at achieving absolute fluency and precision.",
        icon: Award,
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        title: "Enterprise Shield Certification",
        description: "Secure, SOC 2 compliant results that matter for organizations and institutions.",
        icon: Rocket,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
];

export function SuccessRoadmap() {
    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-24">
                    <m.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Rocket className="w-3 h-3" />
                        The Journey
                    </m.div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 uppercase">
                        IELTS Wisdom <br /> <span className="text-indigo-600 dark:text-indigo-500 text-opacity-80">Success Roadmap</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        Experience our structured path toward Band 8.5+ through an immersive 3D milestone discovery.
                    </p>
                </div>

                <div className="relative h-[650px] flex items-center justify-center">
                    <CardSwap
                        width={500}
                        height={380}
                        cardDistance={70}
                        verticalDistance={80}
                        delay={6000}
                        pauseOnHover={true}
                    >
                        {milestones.map((ms, idx) => (
                            <Card key={idx} className="flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-14 h-14 rounded-2xl ${ms.bg} ${ms.color} flex items-center justify-center shadow-lg`}>
                                            <ms.icon className="w-7 h-7" />
                                        </div>
                                        <div className="text-6xl font-black text-slate-200 dark:text-slate-800 opacity-50 select-none">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                            {ms.title}
                                        </h3>
                                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                            {ms.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Phase</span>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                        Milestone {idx + 1}/6
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CardSwap>
                </div>
            </div>
        </section>
    );
}
