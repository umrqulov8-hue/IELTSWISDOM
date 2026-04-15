"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SmoothScrollLenis from "@/components/parallax-home/SmoothScrollLenis";
import TransitionLink from "@/components/TransitionLink";

// ─── Data ────────────────────────────────────────────────────────────────────

const modules = [
    {
        id: "01",
        skill: "Listening",
        duration: "8 Weeks",
        bg: "#0f0f0f",
        textDark: false,
        description:
            "Master the art of active listening with 200+ authentic IELTS audio tasks. From academic lectures to casual conversations — you'll hear every detail that examiners expect.",
        features: ["Cambridge audio simulations", "Note-taking strategies", "Multiple accent training", "Prediction technique"],
    },
    {
        id: "02",
        skill: "Reading",
        duration: "10 Weeks",
        bg: "#f5f5f0",
        textDark: true,
        description:
            "Speed-read complex academic texts while answering with precision. Our system trains you to scan, skim and locate answers 3× faster than untrained readers.",
        features: ["Skimming & scanning drills", "True/False/Not Given mastery", "Academic vocabulary mapping", "Time management strategies"],
    },
    {
        id: "03",
        skill: "Writing",
        duration: "12 Weeks",
        bg: "#1a1a2e",
        textDark: false,
        description:
            "Transform your essays and reports with AI feedback calibrated to IELTS examiner standards. Every submission is evaluated on Task Achievement, Coherence, Vocabulary, and Grammar.",
        features: ["Task 1 & Task 2 training", "Examiner-mimicking AI grader", "Band descriptor analysis", "Daily writing challenges"],
    },
    {
        id: "04",
        skill: "Speaking",
        duration: "6 Weeks",
        bg: "#f5f5f0",
        textDark: true,
        description:
            "Build fluency and confidence across all 3 speaking parts. Our AI examiner gives you real-time feedback on pronunciation, coherence and lexical range.",
        features: ["Part 1, 2 & 3 mock sessions", "Pronunciation coaching", "Fluency & coherence drills", "Cue card technique mastery"],
    },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const y = useTransform(smooth, [0, 1], ["0%", "25%"]);
    const opacity = useTransform(smooth, [0, 0.7], [1, 0]);

    return (
        <section
            ref={ref}
            className="sticky top-0 w-full overflow-hidden bg-white flex items-center justify-center"
            style={{ height: "100vh", zIndex: 1 }}
        >
            <motion.div
                style={{ y, willChange: "transform" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="text-[18vw] font-black uppercase tracking-tighter leading-none text-black/[0.035]" aria-hidden>
                    LEARN
                </span>
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-8"
                >
                    What You Will Master
                </motion.p>

                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        The Full<br />
                        <span className="text-black/20">Curriculum.</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl text-black/50 font-medium max-w-2xl mx-auto mt-8 leading-relaxed"
                >
                    Four skills. One system. Designed to take you from your current band to Band 8.5.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 flex items-center justify-center gap-4"
                >
                    <div className="w-8 h-[1px] bg-black/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/25">Scroll to explore modules</span>
                    <div className="w-8 h-[1px] bg-black/20" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─── Module Section ───────────────────────────────────────────────────────────

function ModuleSection({ mod, index }: { mod: typeof modules[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const innerY = useTransform(smooth, [0, 1], ["5%", "-5%"]);

    const isDark = !mod.textDark;
    const textColor = isDark ? "#fff" : "#000";
    const mutedColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
    const dimColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

    return (
        <div
            ref={ref}
            className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
            style={{ height: "100vh", zIndex: index + 2, backgroundColor: mod.bg }}
        >
            <motion.div
                style={{ y: innerY, willChange: "transform" }}
                className="relative w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
                {/* Ghost number */}
                <div className="absolute -top-4 right-6 md:right-12 pointer-events-none select-none">
                    <span className="text-[18vw] font-black leading-none tabular-nums" style={{ color: dimColor }}>
                        {mod.id}
                    </span>
                </div>

                {/* Left col */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] mb-6"
                        style={{ color: mutedColor }}
                    >
                        Module {mod.id} · {mod.duration}
                    </motion.p>

                    <div className="overflow-hidden mb-8">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(3.5rem,7vw,7rem)] font-black uppercase tracking-tighter leading-[0.88]"
                            style={{ color: textColor }}
                        >
                            {mod.skill}
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl font-medium leading-[1.7]"
                        style={{ color: mutedColor }}
                    >
                        {mod.description}
                    </motion.p>
                </div>

                {/* Right col — features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <ul className="space-y-5">
                        {mod.features.map((feat, fi) => (
                            <motion.li
                                key={fi}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + fi * 0.08 }}
                                className="flex items-center gap-5"
                                style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: "1.2rem" }}
                            >
                                <span className="text-[10px] font-black tabular-nums" style={{ color: mutedColor }}>
                                    {String(fi + 1).padStart(2, "0")}
                                </span>
                                <span className="text-base font-bold uppercase tracking-wider" style={{ color: textColor }}>
                                    {feat}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-black"
            style={{ height: "100vh", zIndex: modules.length + 2 }}
        >
            <div className="text-center px-6 max-w-4xl mx-auto">
                <div className="overflow-hidden mb-10">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-[0.88] text-white"
                    >
                        Start Your<br />
                        <span className="text-white/20">Journey Today.</span>
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-white/50 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    All four modules. All four skills. One complete system designed to deliver Band 8.5.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <TransitionLink
                        href="/pricing"
                        className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                        View Pricing
                    </TransitionLink>
                    <TransitionLink
                        href="/methodology"
                        className="px-12 py-5 border-2 border-white/30 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:border-white transition-all"
                    >
                        Our Methodology
                    </TransitionLink>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CurriculumPage() {
    return (
        <SmoothScrollLenis>
            <div className="bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ height: `${(modules.length + 3) * 100}vh` }}>
                    <HeroSection />
                    {modules.map((mod, i) => (
                        <ModuleSection key={mod.id} mod={mod} index={i} />
                    ))}
                    <CTASection />
                </div>
            </div>
        </SmoothScrollLenis>
    );
}
