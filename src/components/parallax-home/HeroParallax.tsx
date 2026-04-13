"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";
import Image from "next/image";

export default function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    
    const { isMobile, shouldAnimate } = usePerformance();
    
    // Mouse tracking for 3D depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const mouseParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
    const mouseParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);
    const textMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["-1%", "1%"]);
    const textMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["-1%", "1%"]);

    const containerRect = useRef<DOMRect | null>(null);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        
        // Cache the rect to avoid forced reflows (Layout Thrashing)
        if (!containerRect.current && containerRef.current) {
            containerRect.current = containerRef.current.getBoundingClientRect();
        }
        
        const rect = containerRect.current;
        if (rect) {
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        }
    };

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

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const showAnimations = isClient && imageLoaded;
    const showTextAnimations = isClient; // LCP optimization: render text ASAP

    return (
        <section 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            className="relative h-[120vh] w-full overflow-hidden bg-white flex items-start justify-center cursor-default"
        >
            {/* Main Hero Image Layer */}
            <motion.div 
                initial={{ opacity: 0, scale: 1.15 }}
                animate={showAnimations ? { opacity: 0.6, scale: 1.0 } : {}}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                    scale: scaleImage, 
                    y: yImage, 
                    x: mouseParallaxX,
                    y: mouseParallaxY,
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0) translateZ(0)" // Forced GPU acceleration
                }}
                className="absolute inset-0 z-0 h-screen origin-bottom bg-white overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white z-10" />
                <Image 
                    src="/images/noir-hero.webp" 
                    alt="Noir Elite Architecture" 
                    fill
                    priority
                    sizes="100vw"
                    onLoad={() => setImageLoaded(true)}
                    className="object-cover grayscale"
                />
            </motion.div>

            <motion.div 
                style={{ 
                    y: yText, 
                    opacity: opacityText, 
                    x: textMouseX,
                    y: textMouseY,
                    transform: "translate3d(0, 0, 10px) translateZ(0)", // High priority GPU layer
                    willChange: "transform, opacity"
                }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-screen"
            >
                <div className="overflow-hidden pb-4 flex gap-1 md:gap-2" style={{ perspective: "1000px" }}>
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={false} // SSR Optimization: Render at opacity 1 immediately
                            animate={showTextAnimations ? { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1
                            } : { opacity: 1 }} // Fallback to 1 to prevent flickering in LCP candidates
                            transition={{ 
                                duration: 1.8, 
                                delay: 0.4 + i * 0.08, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            style={{ 
                                willChange: "transform, opacity",
                                transform: "translateZ(0)"
                            }}
                            className="text-6xl md:text-[clamp(4rem,7vw,7rem)] leading-[1.0] font-bold tracking-[-0.04em] text-black uppercase inline-block font-plus-jakarta"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
                
                <motion.div 
                    initial={false}
                    animate={showTextAnimations ? { opacity: 1, y: 0 } : { opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    style={{ 
                        willChange: "transform, opacity",
                        transform: "translateZ(0)"
                    }}
                    className="flex flex-col items-center mt-12"
                >
                    <p className="text-xl md:text-2xl font-playfair italic text-black/60 max-w-2xl tracking-normal mb-16">
                        The Science of Scoring.
                    </p>
                    
                    <motion.div 
                        initial={false}
                        animate={showTextAnimations ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: 1.8 
                        }}
                        className="relative group"
                    >
                        <button 
                            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            className="bg-black text-white px-16 py-6 rounded-full text-lg font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden relative"
                        >
                            <span className="relative z-10 font-plus-jakarta">Explore System</span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Transition to next section overlay */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-30" />
        </section>
    );
}
