"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SmoothScrollLenis from "@/components/parallax-home/SmoothScrollLenis";
import TransitionLink from "@/components/TransitionLink";

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
    {
        name: "Aisha K.",
        country: "UAE",
        before: "6.0",
        after: "8.5",
        quote:
            "I had failed twice before. Three months with Wisdom and I went from 6.0 to 8.5. The feedback system is unlike anything I've used.",
        bg: "#0f0f0f",
        textDark: false,
    },
    {
        name: "Dmitri V.",
        country: "Russia",
        before: "6.5",
        after: "8.0",
        quote:
            "The writing AI is phenomenal. It explains exactly why my score dropped and what to fix. I improved 1.5 bands in just 8 weeks.",
        bg: "#f5f5f0",
        textDark: true,
    },
    {
        name: "Mei L.",
        country: "China",
        before: "5.5",
        after: "7.5",
        quote:
            "Speaking was my biggest fear. After 6 weeks of Wisdom's speaking sessions, I went from 5.5 to 7.5. My examiner commented on my fluency.",
        bg: "#1a1a2e",
        textDark: false,
    },
    {
        name: "Priya M.",
        country: "India",
        before: "7.0",
        after: "8.5",
        quote:
            "I was stuck at 7.0 for two attempts. Wisdom identified that my coherence score was dragging everything down. Fixed it in 6 weeks.",
        bg: "#f5f5f0",
        textDark: true,
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
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <span className="text-[20vw] font-black uppercase tracking-tighter text-black/[0.035]" aria-hidden>
                    PROOF
                </span>
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-8"
                >
                    Validated Performance
                </motion.p>

                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        Real Students.<br />
                        <span className="text-black/20">Real Results.</span>
                    </motion.h1>
                </div>

                {/* Big stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    {[
                        { v: "8.5", l: "Avg Band Score" },
                        { v: "10k+", l: "Students Trained" },
                        { v: "94%", l: "Hit Target Score" },
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-5xl md:text-6xl font-black text-black tracking-tighter tabular-nums">
                                {s.v}
                            </div>
                            <div className="mt-2 w-8 h-[1px] bg-black/20 mx-auto" />
                            <p className="mt-2 text-[9px] font-black uppercase tracking-[0.4em] text-black/35">{s.l}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─── Testimonial Section ──────────────────────────────────────────────────────

function TestimonialSection({ t, index }: { t: typeof testimonials[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const innerY = useTransform(smooth, [0, 1], ["5%", "-5%"]);

    const isDark = !t.textDark;
    const textColor = isDark ? "#fff" : "#000";
    const muted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
    const dimColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

    return (
        <div
            ref={ref}
            className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
            style={{ height: "100vh", zIndex: index + 2, backgroundColor: t.bg }}
        >
            <motion.div
                style={{ y: innerY, willChange: "transform" }}
                className="relative w-full max-w-6xl mx-auto px-6 md:px-20"
            >
                {/* Ghost score */}
                <div className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <span className="text-[20vw] font-black leading-none tabular-nums" style={{ color: dimColor }}>
                        {t.after}
                    </span>
                </div>

                {/* Score badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-4 mb-10 px-6 py-3 rounded-full border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: muted }}>Band</span>
                        <span className="text-2xl font-black tabular-nums line-through" style={{ color: muted }}>{t.before}</span>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: muted }}>Band</span>
                        <span className="text-2xl font-black tabular-nums" style={{ color: textColor }}>{t.after}</span>
                    </div>
                </motion.div>

                {/* Quote */}
                <div className="overflow-hidden mb-12">
                    <motion.blockquote
                        initial={{ y: "60%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(1.4rem,3vw,2.8rem)] font-medium leading-[1.35] max-w-3xl"
                        style={{ color: textColor }}
                    >
                        &ldquo;{t.quote}&rdquo;
                    </motion.blockquote>
                </div>

                {/* Author */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-5"
                >
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black"
                        style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                            color: textColor,
                        }}
                    >
                        {t.name[0]}
                    </div>
                    <div>
                        <p className="font-black text-base" style={{ color: textColor }}>{t.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: muted }}>{t.country}</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-white"
            style={{ height: "100vh", zIndex: testimonials.length + 2 }}
        >
            <div className="text-center px-6 max-w-4xl mx-auto">
                <div className="overflow-hidden mb-10">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        Your Turn<br />
                        <span className="text-black/20">to Succeed.</span>
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-black/50 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    Join 10,000+ students who trusted the system and hit their target band score.
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
                        className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Get Started
                    </TransitionLink>
                    <TransitionLink
                        href="/curriculum"
                        className="px-12 py-5 border-2 border-black text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-black hover:text-white transition-all"
                    >
                        See Curriculum
                    </TransitionLink>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SuccessStoriesPage() {
    return (
        <SmoothScrollLenis>
            <div className="bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ height: `${(testimonials.length + 3) * 100}vh` }}>
                    <HeroSection />
                    {testimonials.map((t, i) => (
                        <TestimonialSection key={i} t={t} index={i} />
                    ))}
                    <CTASection />
                </div>
            </div>
        </SmoothScrollLenis>
    );
}
