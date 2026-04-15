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
