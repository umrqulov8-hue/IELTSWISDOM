"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

export default function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    
    const { isMobile, shouldAnimate } = usePerformance();
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth Spring for "Liquid" motion
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax values with spring damping
    const yText = useTransform(smoothProgress, [0, 1], ["0%", shouldAnimate && !isMobile ? "100%" : "0%"]);
    const opacityText = useTransform(smoothProgress, [0, 0.4], [1, 0]);
    const scaleImage = useTransform(smoothProgress, [0, 1], [1, shouldAnimate && !isMobile ? 1.15 : 1]);
    const yImage = useTransform(smoothProgress, [0, 1], ["0%", shouldAnimate && !isMobile ? "20%" : "0%"]);
    
    // Depth ornaments
    const ornament1Y = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
    const ornament2Y = useTransform(smoothProgress, [0, 1], ["0%", "150%"]);
    const ornament3Rotation = useTransform(smoothProgress, [0, 1], [0, 45]);
    
    // Text Splitting logic
    const title = "Wisdom";
    const letters = title.split("");

    return (
        <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-white flex items-start justify-center">
            {/* Main Hero Image Layer */}
            <motion.div 
                style={{ scale: scaleImage, y: yImage }}
                className="absolute inset-0 z-0 h-screen origin-bottom will-change-transform"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop" 
                    alt="IELTS Hero Architecture" 
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
            </motion.div>

            {/* Content Layer */}
            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-screen"
            >
                <div className="overflow-hidden pb-4 flex">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "150%", rotate: 10 }}
                            animate={{ y: 0, rotate: 0 }}
                            transition={{ 
                                duration: 1.5, 
                                delay: 0.2 + i * 0.08, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="text-[14vw] md:text-[16vw] leading-[0.75] font-black tracking-tighter text-black uppercase inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col items-center mt-12"
                >
                    <p className="text-2xl md:text-4xl font-serif italic text-black/80 max-w-2xl tracking-tight mb-16">
                        The Science of Scoring.
                    </p>
                    
                    {/* Magnetic Button */}
                    <div className="relative">
                        <button className="bg-black text-white px-10 py-5 rounded-full text-xl font-bold uppercase tracking-widest shadow-2xl hover:bg-black/80 transition-all duration-300">
                            Explore System
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Transition to next section overlay */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-30" />
        </section>
    );
}
