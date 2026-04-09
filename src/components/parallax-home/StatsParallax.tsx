"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, animate, useMotionValue, useSpring } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

function Counter({ value, decimal = 0, suffix = "" }: { value: number, decimal?: number, suffix?: string }) {
    const count = useMotionValue(0);
    const [display, setDisplay] = useState("0");
    const ref = useRef(null);
    const inView = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !inView.current) {
                inView.current = true;
                const controls = animate(count, value, { 
                    duration: 3, 
                    ease: [0.16, 1, 0.3, 1],
                    onUpdate: (latest) => setDisplay(latest.toFixed(decimal) + suffix)
                });
                return () => controls.stop();
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, decimal, suffix]);

    return <span ref={ref}>{display}</span>;
}

export default function StatsParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile, shouldAnimate } = usePerformance();
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const yPosition = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section ref={containerRef} className="w-full bg-white text-black py-80 overflow-hidden relative">
            <motion.div 
                style={{ y: shouldAnimate && !isMobile ? yPosition : 0 }} 
                className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-40 text-center will-change-transform"
            >
                
                <div className="flex flex-col items-center justify-center group">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[14rem] md:text-[20rem] font-black leading-[0.7] tracking-tighter transition-transform group-hover:scale-105 duration-700"
                    >
                        <Counter value={8.5} decimal={1} />
                    </motion.div>
                    <div className="w-12 h-[2px] bg-black/10 mt-16 mb-8 group-hover:w-20 group-hover:bg-black transition-all duration-700" />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-xs uppercase tracking-[0.6em] font-black"
                    >
                        Average Band Score
                    </motion.p>
                </div>

                <div className="flex flex-col items-center justify-center group">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[14rem] md:text-[20rem] font-black leading-[0.7] tracking-tighter transition-transform group-hover:scale-105 duration-700"
                    >
                        <Counter value={10} suffix="k+" />
                    </motion.div>
                    <div className="w-12 h-[2px] bg-black/10 mt-16 mb-8 group-hover:w-20 group-hover:bg-black transition-all duration-700" />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="text-xs uppercase tracking-[0.6em] font-black"
                    >
                        Successful Students
                    </motion.p>
                </div>

            </motion.div>
        </section>
    );
}
