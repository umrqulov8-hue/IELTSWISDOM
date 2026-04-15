"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/context/ModalContext";
import SmoothScrollLenis from '@/components/parallax-home/SmoothScrollLenis';
import HeroParallax from '@/components/parallax-home/HeroParallax';
import dynamic from 'next/dynamic';
import { LazySection } from './LazySection';
import TransitionLink from '@/components/TransitionLink';

const ExpertiseSection = dynamic(() => import('@/components/parallax-home/ExpertiseSection'), { ssr: false });
const ProcessParallax = dynamic(() => import('@/components/parallax-home/ProcessParallax'), { ssr: false });
const TrustMarquee = dynamic(() => import('@/components/parallax-home/TrustMarquee'), { ssr: false });
const StatsParallax = dynamic(() => import('@/components/parallax-home/StatsParallax'), { ssr: false });
const PricingParallax = dynamic(() => import('@/components/parallax-home/PricingParallax'), { ssr: false });
const FAQParallax = dynamic(() => import('@/components/parallax-home/FAQParallax'), { ssr: false });

export default function LandingPage() {
    const [mounted, setMounted] = React.useState(false);
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        setMounted(true);
        document.body.style.backgroundColor = "#FFFFFF";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
    const headerBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(8px)"]);
    const headerBorder = useTransform(scrollYProgress, [0, 0.05], ["rgba(0,0,0,0)", "rgba(0,0,0,0.05)"]);
    const headerBorderWidth = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
    const headerPadding = useTransform(scrollYProgress, [0, 0.05], ["2rem", "1rem"]);
    const headerShadow = useTransform(
        scrollYProgress, 
        [0, 0.05], 
        ["0 0px 0px 0 rgba(0,0,0,0)", "0 4px 20px -5px rgba(0,0,0,0.05)"]
    );

    return (
        <SmoothScrollLenis>
            <main ref={containerRef} className="relative bg-white selection:bg-black selection:text-white overflow-hidden font-plus-jakarta">
                {/* Fixed Premium Header - SSR Safe Shell */}
                <motion.header 
                    style={{ 
                        backgroundColor: headerBg, 
                        borderBottomWidth: headerBorderWidth,
                        borderBottomStyle: "solid",
                        borderBottomColor: headerBorder,
                        paddingTop: headerPadding,
                        paddingBottom: headerPadding,
                        boxShadow: headerShadow,
                        backdropFilter: headerBlur,
                        WebkitBackdropFilter: headerBlur,
                        willChange: "opacity, background-color, backdrop-filter",
                        transform: "translateZ(0)"
                    }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-20 flex justify-between items-center transition-all duration-500 will-change-transform"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white font-serif italic text-xl leading-none">W</span>
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter text-black">Wisdom</span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-12">
                        {[
                            { label: 'Methodology', href: '/methodology' },
                            { label: 'Curriculum', href: '/curriculum' },
                            { label: 'Results', href: '/success-stories' },
                            { label: 'Pricing', href: '/pricing' },
                        ].map(({ label, href }) => (
                            <TransitionLink key={href} href={href} className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-black transition-colors">
                                {label}
                            </TransitionLink>
                        ))}
                    </nav>

                    {/* Button Placeholder for SSR, Real button when mounted */}
                    <div className="w-40 h-10 flex justify-end">
                        {mounted && <BeginJourneyButton />}
                    </div>
                </motion.header>

                <HeroParallax />
                
                {/* SSR Safe Structure: Render only expensive sections when mounted */}
                <section id="methodology">
                    <LazySection>
                        <ExpertiseSection />
                    </LazySection>
                </section>

                {mounted && <ClientSections />}

                {/* Modern Minimal Footer */}
                <footer className="w-full bg-black text-white py-40 px-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 items-end">
                        <div className="space-y-12">
                            <h2 className="text-8xl md:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter">
                                Reach<br/><span className="text-white/60">Band 8.5</span>
                            </h2>
                            <p className="text-xl text-white/70 font-medium max-w-sm">
                                Join the elite circle of students who mastered the IELTS logic, not just the questions.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-12">
                           {mounted && <SecureSuccessButton />}
                            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50 flex gap-8">
                                <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                                <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                                <span>© 2024 Wisdom</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </SmoothScrollLenis>
    );
}

// Client-only components to isolate useAuth and other browser-only logic from SSR
function BeginJourneyButton() {
    const { handleStartLearning } = useAuth();
    return (
        <button 
            onClick={handleStartLearning}
            className="px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap min-w-[180px] flex items-center justify-center"
        >
            Begin Journey
        </button>
    );
}

function SecureSuccessButton() {
    const { handleStartLearning, isLoading } = useAuth();
    return (
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartLearning}
            disabled={isLoading}
            className="px-16 py-8 bg-white text-black text-xl font-black uppercase tracking-widest rounded-full hover:bg-white/90 transition-all shadow-2xl flex items-center gap-4 relative overflow-hidden"
        >
            {isLoading ? 'Wait...' : 'Secure Success'}
        </motion.button>
    );
}

function ClientSections() {
    return (
        <>
            <LazySection>
                <TrustMarquee />
            </LazySection>
            
            <LazySection>
                <StatsParallax />
            </LazySection>

            <section id="curriculum">
                <LazySection>
                    <ProcessParallax />
                </LazySection>
            </section>

            <LazySection>
                <PricingParallax />
            </LazySection>

            <LazySection>
                <FAQParallax />
            </LazySection>
        </>
    );
}
