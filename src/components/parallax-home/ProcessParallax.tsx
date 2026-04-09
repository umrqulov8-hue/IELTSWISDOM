"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

const steps = [
    {
        id: "01",
        title: "Intelligent Baseline",
        description: "Take a diagnostic test analyzed by our AI to identify your current band level and specific weaknesses across 12 linguistic parameters.",
        detail: "No more guessing. Know exactly where you stand."
    },
    {
        id: "02",
        title: "Adaptive Strategy",
        description: "Receive a personalized curriculum that focuses exclusively on the areas that will bridge the gap to your target score.",
        detail: "Efficiency is the key to Band 8.5."
    },
    {
        id: "03",
        title: "Dynamic Feedback",
        description: "Submit practice tasks and get instant, detailed evaluations that mimic official IELTS examiner criteria.",
        detail: "Real-time improvement, every single day."
    }
];

function Step({ step, index }: { step: typeof steps[0], index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    return (
        <div ref={ref} className="min-h-[60vh] flex flex-col justify-center py-20 border-b border-black/5 last:border-0 relative">
            <motion.div 
                initial={{ opacity: 0.1, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0.1, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
                <div className="md:col-span-2">
                    <span className="text-6xl font-black text-black/10 tabular-nums leading-none">
                        {step.id}
                    </span>
                </div>
                <div className="md:col-span-6">
                    <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
                        {step.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed max-w-xl">
                        {step.description}
                    </p>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end h-full">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInView ? 1 : 0 }}
                        className="p-6 bg-black text-white rounded-2xl rotate-3 shadow-2xl mt-10 md:mt-0"
                    >
                        <p className="text-sm uppercase tracking-widest font-bold opacity-50 mb-2">Pro Tip</p>
                        <p className="text-lg font-medium">{step.detail}</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProcessParallax() {
    const containerRef = useRef(null);
    const { isMobile, shouldAnimate } = usePerformance();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001
    });

    const yBackground = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
    const opacityBackground = useTransform(smoothProgress, [0, 0.5, 1], [0.01, 0.03, 0.01]);

    return (
        <section ref={containerRef} className="w-full bg-white py-32 relative overflow-hidden">
            {/* Background Text (Premium Parallax) */}
            <motion.div 
                style={{ y: shouldAnimate && !isMobile ? yBackground : 0, opacity: opacityBackground }}
                className="absolute top-0 right-[-10%] text-[20vw] font-black text-black uppercase leading-none select-none pointer-events-none will-change-transform"
            >
                Process
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.5em] font-bold text-black/40 mb-4 ml-1">The Methodology</h2>
                    <div className="overflow-hidden">
                        <motion.h2 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-[8rem] font-bold uppercase tracking-tighter leading-[0.9]"
                        >
                            Designed For<br/>
                            <span className="text-black/20">Absolute Mastery.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="space-y-0">
                    {steps.map((step, i) => (
                        <Step key={i} step={step} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
