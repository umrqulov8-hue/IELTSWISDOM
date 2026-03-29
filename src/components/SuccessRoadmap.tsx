"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star, Target, Zap, Rocket, Award, ShieldCheck, Microscope } from "lucide-react";
import GradualBlur from "./ui/GradualBlur";

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
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 uppercase">
                        IELTS Wisdom <br /> <span className="text-slate-400">Success Roadmap</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        A structured path toward Band 8.5+. Scroll through the milestones that define our mastery curriculum.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative rounded-[2.5rem] p-1.5 bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800 dark:to-transparent shadow-2xl overflow-hidden">
                    <section 
                        className="relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-inner"
                        style={{ height: 500 }}
                    >
                        {/* Internal Scrollable Area */}
                        <div 
                            className="h-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide p-8 md:p-16 space-y-12"
                            id="roadmap-scroll-container"
                        >
                            {milestones.map((ms, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="flex items-start gap-8 relative group"
                                >
                                    {/* Connection Line Decor */}
                                    {idx !== milestones.length - 1 && (
                                        <div className="absolute left-6 top-12 bottom-[-48px] w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
                                    )}

                                    <div className={`w-12 h-12 rounded-2xl ${ms.bg} ${ms.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                        <ms.icon className="w-6 h-6" />
                                    </div>
                                    
                                    <div className="space-y-2 pt-1">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                            {ms.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
                                            {ms.description}
                                        </p>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="ml-auto opacity-10 font-black text-4xl select-none hidden md:block">
                                        {idx + 1}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Extra Bottom Spacing for Gradual Blur padding */}
                            <div className="h-32" />
                        </div>

                        {/* Graduation Blur integration at the bottom */}
                        <GradualBlur
                            target="parent"
                            position="bottom"
                            height="10rem"
                            strength={3}
                            divCount={8}
                            curve="bezier"
                            exponential
                            opacity={1}
                        />

                        {/* Hint for more content */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pointer-events-none animate-pulse">
                            Scroll For More
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
