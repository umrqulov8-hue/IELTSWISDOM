"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import SmoothScrollLenis from "@/components/parallax-home/SmoothScrollLenis";
import { useAuth } from "@/hooks/useAuth";
import TransitionLink from "@/components/TransitionLink";

// ─── Plans data ───────────────────────────────────────────────────────────────

const plans = [
    {
        name: "Essential",
        price: "$49",
        period: "per month",
        features: [
            "AI Writing Evaluation (10/mo)",
            "AI Speaking Practice (5/mo)",
            "All Reading & Listening Tests",
            "Detailed Performance Analytics",
        ],
        popular: false,
        bg: "#f5f5f0",
        textDark: true,
    },
    {
        name: "Pro",
        price: "$89",
        period: "per month",
        features: [
            "Unlimited Writing Evaluation",
            "Unlimited Speaking Practice",
            "Personalized Study Roadmap",
            "Examiner-curated Strategies",
            "Mock Test Simulations",
        ],
        popular: true,
        bg: "#0f0f0f",
        textDark: false,
    },
    {
        name: "Master",
        price: "$149",
        period: "quarterly",
        features: [
            "Full Pro Experience",
            "1-on-1 Native Tutor Sessions",
            "VIP Support Channel",
            "Extended Mock Exams",
            "Lifetime Resource Access",
        ],
        popular: false,
        bg: "#f5f5f0",
        textDark: true,
    },
];

const faqs = [
    {
        q: "Can I switch plans later?",
        a: "Yes. You can upgrade or downgrade at any time. Changes take effect from your next billing cycle.",
    },
    {
        q: "Is there a free trial?",
        a: "We offer a 7-day free access to the Essential plan. No credit card required to start.",
    },
    {
        q: "How does the AI writing evaluator work?",
        a: "Our model evaluates on the same 4 IELTS criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.",
    },
    {
        q: "What happens after I reach my target score?",
        a: "Many students continue to push beyond their original goal. You keep full access until your subscription ends.",
    },
    {
        q: "Is there a refund policy?",
        a: "Yes. We offer a full refund within 14 days of purchase if you're not satisfied — no questions asked.",
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
                <span className="text-[18vw] font-black uppercase tracking-tighter text-black/[0.035]" aria-hidden>
                    INVEST
                </span>
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-8"
                >
                    Simple, Transparent Pricing
                </motion.p>

                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter leading-[0.88] text-black"
                    >
                        Invest In<br />
                        <span className="text-black/20">Your Future.</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl text-black/45 font-medium max-w-2xl mx-auto mt-8 leading-relaxed"
                >
                    One clear goal: Band 8.5. One system to get you there. Pick the plan that fits your journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 flex items-center justify-center gap-4"
                >
                    <div className="w-8 h-[1px] bg-black/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/25">Scroll to compare plans</span>
                    <div className="w-8 h-[1px] bg-black/20" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─── Plan Section ─────────────────────────────────────────────────────────────

function PlanSection({ plan, index }: { plan: typeof plans[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const innerY = useTransform(smooth, [0, 1], ["5%", "-5%"]);
    const { handleStartLearning } = useAuth();

    const isDark = !plan.textDark;
    const textColor = isDark ? "#fff" : "#000";
    const muted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
    const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
    const dimPrice = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

    return (
        <div
            ref={ref}
            className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
            style={{ height: "100vh", zIndex: index + 2, backgroundColor: plan.bg }}
        >
            <motion.div
                style={{ y: innerY, willChange: "transform" }}
                className="relative w-full max-w-6xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
                {/* Ghost price */}
                <div className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <span className="text-[22vw] font-black leading-none tabular-nums" style={{ color: dimPrice }}>
                        {plan.price}
                    </span>
                </div>

                {/* Left side */}
                <div>
                    {plan.popular && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-6 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest"
                            style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
                        >
                            Most Popular
                        </motion.div>
                    )}

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] mb-4"
                        style={{ color: muted }}
                    >
                        {plan.period}
                    </motion.p>

                    <div className="overflow-hidden mb-4">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(1.5rem,4vw,4rem)] font-black uppercase tracking-tighter leading-none"
                            style={{ color: muted }}
                        >
                            {plan.name}
                        </motion.h2>
                    </div>

                    <div className="overflow-hidden mb-10">
                        <motion.div
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(4rem,10vw,8rem)] font-black tracking-tighter leading-none tabular-nums"
                            style={{ color: textColor }}
                        >
                            {plan.price}
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStartLearning}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all"
                        style={{
                            backgroundColor: isDark ? "#fff" : "#000",
                            color: isDark ? "#000" : "#fff",
                        }}
                    >
                        Get Started
                    </motion.button>
                </div>

                {/* Right side — features */}
                <motion.ul
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-5"
                >
                    {plan.features.map((feat, fi) => (
                        <motion.li
                            key={fi}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + fi * 0.08 }}
                            className="flex items-center gap-5"
                            style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: "1.1rem" }}
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)" }}
                            />
                            <span className="text-base md:text-lg font-medium" style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}>
                                {feat}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-black"
            style={{ height: "100vh", zIndex: plans.length + 2 }}
        >
            <div className="w-full max-w-4xl mx-auto px-6 md:px-20">
                <div className="mb-16">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-4">Common Questions</p>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-white leading-[0.9]"
                        >
                            Got Questions?<br />
                            <span className="text-white/25">We Have Answers.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="space-y-0">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="border-t border-white/10 last:border-b"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex justify-between items-center py-6 text-left group"
                            >
                                <span className="text-base md:text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                                    {faq.q}
                                </span>
                                <span
                                    className="text-white/40 text-2xl font-light ml-4 transition-transform duration-300"
                                    style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                                >
                                    +
                                </span>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/55 text-base md:text-lg font-medium leading-relaxed pb-6">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
    const { handleStartLearning } = useAuth();

    return (
        <div
            className="sticky top-0 w-full flex items-center justify-center bg-white"
            style={{ height: "100vh", zIndex: plans.length + 3 }}
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
                        Secure Your<br />
                        <span className="text-black/20">Band 8.5.</span>
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-black/45 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    14-day money-back guarantee. Cancel anytime. Start today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartLearning}
                        className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-black/90 transition-all shadow-xl"
                    >
                        Start Free Trial
                    </motion.button>
                    <TransitionLink
                        href="/success-stories"
                        className="px-12 py-5 border-2 border-black text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-black hover:text-white transition-all"
                    >
                        See Student Results
                    </TransitionLink>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
    return (
        <SmoothScrollLenis>
            <div className="bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ height: `${(plans.length + 3) * 100}vh` }}>
                    <HeroSection />
                    {plans.map((plan, i) => (
                        <PlanSection key={plan.name} plan={plan} index={i} />
                    ))}
                    <FAQSection />
                    <CTASection />
                </div>
            </div>
        </SmoothScrollLenis>
    );
}
