"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StatsParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Track scroll for this specific section over a larger offset to animate early
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleNumber1 = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
    const opacityNumber1 = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    
    const scaleNumber2 = useTransform(scrollYProgress, [0.2, 0.7], [0.5, 1]);
    const opacityNumber2 = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

    const yPosition = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={containerRef} className="w-full bg-white text-black py-40 overflow-hidden relative">
            <motion.div style={{ y: yPosition }} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 text-center">
                
                <div className="flex flex-col items-center justify-center">
                    <motion.div 
                        style={{ scale: scaleNumber1, opacity: opacityNumber1 }}
                        className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter"
                    >
                        8.5
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl font-medium mt-4 tracking-tight"
                    >
                        Average Band Score
                    </motion.p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <motion.div 
                        style={{ scale: scaleNumber2, opacity: opacityNumber2 }}
                        className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter"
                    >
                        10k+
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-4xl font-medium mt-4 tracking-tight"
                    >
                        Successful Students
                    </motion.p>
                </div>

            </motion.div>
        </section>
    );
}
