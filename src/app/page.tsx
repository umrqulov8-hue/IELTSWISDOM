"use client";

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import SmoothScrollLenis from '@/components/parallax-home/SmoothScrollLenis';
import StatsParallax from '@/components/parallax-home/StatsParallax';
import HeroParallax from '@/components/parallax-home/HeroParallax';
import ProcessParallax from '@/components/parallax-home/ProcessParallax';
import PricingParallax from '@/components/parallax-home/PricingParallax';
import FAQParallax from '@/components/parallax-home/FAQParallax';
import TrustMarquee from '@/components/parallax-home/TrustMarquee';
import ExpertiseSection from '@/components/parallax-home/ExpertiseSection';
import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/hooks/useAuth';
import { usePerformance } from '@/hooks/usePerformance';

export default function Home() {
    const { openModal } = useModal();
    const { handleStartLearning, isLoading } = useAuth();
    const { scrollYProgress } = useScroll();
    
    // Smooth progress bar at the top
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
    const headerBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(20px)"]);
    const headerBorder = useTransform(scrollYProgress, [0, 0.05], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.05)"]);
    const headerPadding = useTransform(scrollYProgress, [0, 0.05], ["40px", "24px"]);

    return (
        <SmoothScrollLenis>
            <main className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white w-full overflow-hidden">
                {/* Progress Bar */}
                <motion.div 
                    className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left mix-blend-difference"
                    style={{ scaleX }}
                />

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
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 flex justify-between items-center"
                >
                    <div className="font-black text-3xl tracking-tighter uppercase text-black flex items-center gap-2">
                        <span>IELTS</span>
                        <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5" />
                        <span className="font-serif italic font-light lowercase opacity-60 tracking-normal text-black/70">wisdom</span>
                    </div>
                    <div className="flex gap-12 items-center">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openModal}
                            className="text-[10px] uppercase tracking-[0.4em] bg-white text-black px-10 py-4 rounded-full font-black shadow-2xl cursor-pointer"
                        >
                            Entry
                        </motion.button>
                    </div>
                </motion.header>

                <HeroParallax />
                <TrustMarquee />
                <StatsParallax />
                <ExpertiseSection />
                <ProcessParallax />
                <PricingParallax />
                <FAQParallax />

                <footer className="w-full bg-white pt-20 pb-20 z-40 relative px-6 rounded-t-[5rem] shadow-[0_-80px_160px_rgba(0,0,0,0.04)] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end mb-40">
                            <div>
                                <h2 className="text-7xl md:text-[12rem] font-serif italic tracking-tighter text-black leading-[0.8] mb-12">
                                    The New<br/>
                                    <span className="font-sans font-black uppercase not-italic">Standard.</span>
                                </h2>
                                <p className="text-3xl text-black/30 max-w-xl font-medium tracking-tight">
                                    Trusted by elite universities. Mastered by champions. Powered by research.
                                </p>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleStartLearning}
                                    disabled={isLoading}
                                    className="bg-black text-white px-20 py-10 rounded-full text-2xl font-black uppercase tracking-widest shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] disabled:opacity-50"
                                >
                                    {isLoading ? 'Wait...' : 'Secure Success'}
                                </motion.button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-32 border-t border-black/5">
                            <div className="flex flex-col gap-6">
                                <h4 className="font-black uppercase tracking-[0.4em] text-[10px] opacity-20">Platform</h4>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Dashboard</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Mock Exams</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">AI Evaluator</a>
                            </div>
                            <div className="flex flex-col gap-6">
                                <h4 className="font-black uppercase tracking-[0.4em] text-[10px] opacity-20">Company</h4>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">About Us</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Contact</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Privacy Policy</a>
                            </div>
                            <div className="flex flex-col gap-6">
                                <h4 className="font-black uppercase tracking-[0.4em] text-[10px] opacity-20">Resources</h4>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">IELTS Guide</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Blog</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Success Stories</a>
                            </div>
                            <div className="flex flex-col gap-6">
                                <h4 className="font-black uppercase tracking-[0.4em] text-[10px] opacity-20">Socials</h4>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">Instagram</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">YouTube</a>
                                <a href="#" className="font-bold text-xl hover:opacity-50 transition-all">LinkedIn</a>
                            </div>
                        </div>

                        <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] opacity-10">
                            <p>&copy; 2026 IELTS Wisdom. All rights reserved.</p>
                            <p className="mt-4 md:mt-0 font-serif lowercase italic opacity-50">artistic excellence meets precision learning.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </SmoothScrollLenis>
    );
}