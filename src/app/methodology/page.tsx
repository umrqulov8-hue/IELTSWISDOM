"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SmoothScrollLenis from "@/components/parallax-home/SmoothScrollLenis";
import TransitionLink from "@/components/TransitionLink";

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
    {
        id: "01",
        title: "Linguistic Deconstruction",
        subtitle: "12-Parameter Framework",
        body: "We reverse-engineered every IELTS exam from 2018–2024 and identified 12 recurring linguistic parameters that examiners consistently reward. Our AI trains you on each one with surgical precision.",
        accent: "#f5f5f0",
        textDark: true,
    },
    {
        id: "02",
        title: "Neural Feedback Engine",
        subtitle: "AI-Powered Evaluation",
        body: "Our proprietary model was trained on 50,000+ marked IELTS scripts. When you submit a task, it evaluates your response on the same rubric an examiner uses — in under 3 seconds.",
        accent: "#0f0f0f",
        textDark: false,
    },
    {
        id: "03",
        title: "Adaptive Learning Path",
        subtitle: "Personalized Curriculum",
        body: "No two learners are the same. Our algorithm continuously recalibrates your study plan based on your latest performance, ensuring you spend time only where it matters most.",
        accent: "#f5f5f0",
        textDark: true,
    },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const y = useTransform(smooth, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(smooth, [0, 0.6], [1, 0]);
    const scale = useTransform(smooth, [0, 1], [1, 1.08]);

    return (
        <section
            ref={ref}
            className="sticky top-0 w-full overflow-hidden bg-white flex items-center justify-center"
            style={{ height: "100vh", zIndex: 1 }}
        >
            {/* Kinetic background text */}
            <motion.div
                style={{ y, scale, willChange: "transform" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span
                    className="text-[22vw] font-black uppercase tracking-tighter leading-none text-black/[0.04]"
                    aria-hidden
                >
                    METHOD
                </span>
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-8"
                >
                    Our Approach
                </motion.p>

                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        The Science<br />
                        <span className="text-black/20">of Scoring.</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl text-black/50 font-medium max-w-2xl mx-auto mt-8 leading-relaxed"
                >
                    A system built not on intuition, but on a rigorous analysis of what IELTS examiners actually reward.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-16 flex items-center justify-center gap-4"
                >
                    <div className="w-8 h-[1px] bg-black/30" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">
                        Scroll to explore
                    </span>
                    <div className="w-8 h-[1px] bg-black/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─── Pillar Section ───────────────────────────────────────────────────────────

function PillarSection({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const innerY = useTransform(smooth, [0, 1], ["4%", "-4%"]);

    const isDark = !pillar.textDark;

    return (
        <div
            ref={ref}
            className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
            style={{ height: "100vh", zIndex: index + 2, backgroundColor: pillar.accent }}
        >
            <motion.div
                style={{ y: innerY, willChange: "transform" }}
                className="relative w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center h-full"
            >
                {/* Number */}
                <div className="absolute top-10 right-10 md:right-20">
                    <span
                        className="text-[9rem] font-black leading-none tabular-nums"
                        style={{ color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
                    >
                        {pillar.id}
                    </span>
                </div>

                {/* Left */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] mb-6"
                        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
                    >
                        {pillar.subtitle}
                    </motion.p>

                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter"
                            style={{ color: isDark ? "#ffffff" : "#000000" }}
                        >
                            {pillar.title}
                        </motion.h2>
                    </div>
                </div>

                {/* Right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p
                        className="text-xl md:text-2xl font-medium leading-[1.6]"
                        style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
                    >
                        {pillar.body}
                    </p>

                    <div
                        className="mt-12 w-16 h-[2px]"
                        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
    const stats = [
        { value: "91%", label: "Examiner Correlation" },
        { value: "12", label: "Linguistic Parameters" },
        { value: "2.5×", label: "Faster Improvement" },
        { value: "50k+", label: "Marked Scripts Trained On" },
    ];

    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-black"
            style={{ height: "100vh", zIndex: pillars.length + 2 }}
        >
            <div className="w-full max-w-7xl mx-auto px-6 md:px-20">
                <div className="mb-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-4">By the numbers</p>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(3rem,7vw,6rem)] font-black uppercase tracking-tighter text-white leading-[0.9]"
                        >
                            Our Methodology<br />
                            <span className="text-white/20">In Numbers.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.12 }}
                            className="group"
                        >
                            <div className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums mb-4 group-hover:text-white/80 transition-colors">
                                {s.value}
                            </div>
                            <div className="w-8 h-[1px] bg-white/20 mb-4 group-hover:w-16 transition-all duration-500" />
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-white"
            style={{ height: "100vh", zIndex: pillars.length + 3 }}
        >
            <div className="text-center px-6 max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-black uppercase tracking-[0.6em] text-black/30 mb-8"
                >
                    Ready to Begin
                </motion.p>

                <div className="overflow-hidden mb-10">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        Apply the<br />
                        <span className="text-black/20">Methodology.</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
                >
                    <TransitionLink
                        href="/curriculum"
                        className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        See Curriculum
                    </TransitionLink>
                    <TransitionLink
                        href="/pricing"
                        className="px-12 py-5 border-2 border-black text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-black hover:text-white transition-all"
                    >
                        View Pricing
                    </TransitionLink>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MethodologyPage() {
    return (
        <SmoothScrollLenis>
            <div className="bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {/* Curtain stack — each section is sticky and slides over the previous */}
                <div style={{ height: `${(pillars.length + 3) * 100}vh` }}>
                    <HeroSection />
                    {pillars.map((pillar, i) => (
                        <PillarSection key={pillar.id} pillar={pillar} index={i} />
                    ))}
                    <StatsSection />
                    <CTASection />
                </div>
            </div>
        </SmoothScrollLenis>
    );
}
