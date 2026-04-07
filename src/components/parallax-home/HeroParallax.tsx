"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-[#FAFAFA] flex items-start justify-center">
            <motion.div 
                style={{ scale: scaleImage, y: yImage }}
                className="absolute inset-0 z-0 h-screen origin-bottom"
            >
                {/* Changed overlay to a light gradient for high-end cinematic bright look */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-[#FAFAFA] z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2670&auto=format&fit=crop" 
                    alt="IELTS Hero Architecture" 
                    className="w-full h-full object-cover opacity-80"
                />
            </motion.div>

            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-screen"
            >
                <div className="overflow-hidden pb-4">
                    <motion.h1 
                        initial={{ y: "120%", rotate: 2 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[10rem] leading-none font-bold tracking-tighter text-black uppercase"
                    >
                        Wisdom
                    </motion.h1>
                </div>
                <div className="overflow-hidden mt-6">
                    <motion.p 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-3xl font-medium text-black/70 max-w-3xl"
                    >
                        Master every section OF THE IELTS EXAM
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}
