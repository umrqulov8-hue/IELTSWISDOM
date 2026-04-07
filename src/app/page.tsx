"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/parallax-home/SmoothScroll';
import HeroParallax from '@/components/parallax-home/HeroParallax';
import FeaturesParallax from '@/components/parallax-home/FeaturesParallax';
import HorizontalScroll from '@/components/parallax-home/HorizontalScroll';
import StatsParallax from '@/components/parallax-home/StatsParallax';
import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
    const { openModal } = useModal();
    const { handleStartLearning, isLoading } = useAuth();

    useEffect(() => {
        // Ensure background is strictly white for the light theme
        document.body.style.backgroundColor = "#FFFFFF";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <SmoothScroll>
            <main className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white w-full overflow-hidden">
                {/* Floating Transparent Agency Header */}
                <motion.header 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center"
                >
                    <div className="font-bold text-2xl tracking-tighter uppercase text-black drop-shadow-sm">
                        IELTS<span className="font-light">Wisdom</span>
                    </div>
                    <div className="flex gap-8 items-center">
                        <Link href="/dashboard" className="text-sm uppercase tracking-widest text-black hover:opacity-50 transition-opacity font-semibold">
                            Dashboard
                        </Link>
                        <button 
                            onClick={openModal}
                            className="text-sm uppercase tracking-widest bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition-transform font-medium shadow-xl cursor-pointer"
                        >
                            Log In
                        </button>
                    </div>
                </motion.header>

                <HeroParallax />
                <StatsParallax />
                <FeaturesParallax />
                <HorizontalScroll />

                <footer className="w-full bg-white py-32 text-center z-40 relative px-6 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-gray-100">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-12 text-black">
                        Ready to Begin?
                    </h2>
                    <button 
                        onClick={handleStartLearning}
                        disabled={isLoading}
                        className="inline-block bg-black text-white px-12 py-6 rounded-full text-xl font-medium hover:scale-105 transition-transform shadow-2xl disabled:opacity-50"
                    >
                        {isLoading ? 'Checking...' : 'Start Practicing Now'}
                    </button>
                    <div className="mt-40 pt-10 border-t border-gray-200 text-gray-500 text-sm flex flex-col md:flex-row justify-between max-w-7xl mx-auto items-center">
                        <p>&copy; 2026 IELTS Wisdom. All rights reserved.</p>
                        <p className="mt-4 md:mt-0 uppercase tracking-widest font-semibold text-black">Designed for absolute mastery.</p>
                    </div>
                </footer>
            </main>
        </SmoothScroll>
    );
}