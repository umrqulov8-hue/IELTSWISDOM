"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/context/ModalContext";
import SmoothScrollLenis from '@/components/parallax-home/SmoothScrollLenis';
import HeroParallax from '@/components/parallax-home/HeroParallax';
import ExpertiseSection from '@/components/parallax-home/ExpertiseSection';
import ProcessParallax from '@/components/parallax-home/ProcessParallax';
import TrustMarquee from '@/components/parallax-home/TrustMarquee';
import StatsParallax from '@/components/parallax-home/StatsParallax';
import PricingParallax from '@/components/parallax-home/PricingParallax';
import FAQParallax from '@/components/parallax-home/FAQParallax';

export default function LandingPage() {
    const { handleStartLearning, isLoading } = useAuth();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
    const headerBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(20px)"]);
    const headerBorder = useTransform(scrollYProgress, [0, 0.05], ["rgba(0,0,0,0)", "rgba(0,0,0,0.05)"]);
    const headerPadding = useTransform(scrollYProgress, [0, 0.05], ["2rem", "1rem"]);

    return (
        <SmoothScrollLenis>
            <main ref={containerRef} className="relative bg-white selection:bg-black selection:text-white overflow-hidden">
                {/* Fixed Premium Header */}
                <motion.header 
                    style={{ 
                        backgroundColor: headerBg, 
                        backdropFilter: headerBlur,
                        WebkitBackdropFilter: headerBlur,
                        borderBottom: "1px solid",
                        borderBottomColor: headerBorder,
                        paddingTop: headerPadding,
                        paddingBottom: headerPadding
                    }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-0 left-0 right-0 z-[100] px-10 flex justify-between items-center transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white font-serif italic text-xl">W</span>
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter text-black">Wisdom</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-12">
                        {['Methodology', 'Curriculum', 'Results', 'Pricing'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>

                    <button 
                        onClick={handleStartLearning}
                        className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all"
                    >
                        Begin Journey
                    </button>
                </motion.header>

                <HeroParallax />
                
                <section id="methodology">
                    <ExpertiseSection />
                </section>

                <TrustMarquee />
                
                <StatsParallax />

                <section id="curriculum">
                    <ProcessParallax />
                </section>

                <PricingParallax />

                <FAQParallax />

                {/* Modern Minimal Footer */}
                <footer className="w-full bg-black text-white py-40 px-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 items-end">
                        <div className="space-y-12">
                            <h2 className="text-8xl md:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter">
                                Reach<br/>Band 8.5
                            </h2>
                            <p className="text-xl text-white/40 font-medium max-w-sm">
                                Join the elite circle of students who mastered the IELTS logic, not just the questions.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-12">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStartLearning}
                                disabled={isLoading}
                                className="px-16 py-8 bg-white text-black text-xl font-black uppercase tracking-widest rounded-full hover:bg-white/90 transition-all shadow-2xl flex items-center gap-4 relative overflow-hidden"
                            >
                                {isLoading ? 'Wait...' : 'Secure Success'}
                            </motion.button>
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 flex gap-8">
                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>© 2024 Wisdom</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </SmoothScrollLenis>
    );
}
