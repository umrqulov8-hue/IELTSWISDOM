"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/parallax-home/SmoothScroll';
import HeroParallax from '@/components/parallax-home/HeroParallax';
import FeaturesParallax from '@/components/parallax-home/FeaturesParallax';

export default function Home() {
    useEffect(() => {
        // Ensure background is strictly black for this page to match agency themes
        document.body.style.backgroundColor = "#000";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <SmoothScroll>
            <main className="bg-[#000] min-h-screen text-white font-sans selection:bg-white selection:text-black w-full overflow-hidden">
                {/* Floating Transparent Agency Header */}
                <motion.header 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference"
                >
                    <div className="font-bold text-2xl tracking-tighter uppercase">
                        IELTS<span className="font-light">Wisdom</span>
                    </div>
                    <div className="flex gap-8 items-center">
                        <Link href="/dashboard" className="text-sm uppercase tracking-widest hover:opacity-50 transition-opacity">
                            Dashboard
                        </Link>
                        <Link href="/auth/login" className="text-sm uppercase tracking-widest bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-transform font-medium">
                            Log In
                        </Link>
                    </div>
                </motion.header>

                <HeroParallax />
                
                <FeaturesParallax />

                <footer className="w-full bg-black py-24 text-center z-40 relative px-6">
                    <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-12">
                        Ready to Begin?
                    </h2>
                    <Link href="/dashboard" className="inline-block bg-white text-black px-12 py-5 rounded-full text-xl font-medium hover:scale-105 transition-transform">
                        Start Practicing Now
                    </Link>
                    <div className="mt-32 text-white/30 text-sm flex flex-col md:flex-row justify-between max-w-7xl mx-auto items-center">
                        <p>&copy; 2026 IELTS Wisdom. All rights reserved.</p>
                        <p className="mt-4 md:mt-0">Designed for absolute mastery.</p>
                    </div>
                </footer>
            </main>
        </SmoothScroll>
    );
}