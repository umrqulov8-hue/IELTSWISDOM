"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

const metrics = [
    {
        title: "Linguistic Precision",
        value: "91%",
        description: "Correlation with official IELTS examiner standards using our proprietary neural engine."
    },
    {
        title: "Growth Acceleration",
        value: "2.5x",
        description: "Faster score improvement compared to traditional paper-based or classroom learning."
    },
    {
        title: "Vocabulary Range",
        value: "14k+",
        description: "Academic and general training terms mapped and adapted to your current proficiency."
    }
];

export default function ExpertiseSection() {
    const { shouldAnimate, isMobile } = usePerformance();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // if (!mounted) return null; // REMOVED FOR SSR COMPATIBILITY

    return (
        <section className="w-full bg-white py-40">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
                    <div className="sticky top-40">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 0.6, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-[1px] bg-black" />
                            <span className="text-xs font-black uppercase tracking-[0.6em]">The Science</span>
                        </motion.div>
                        <div className="overflow-hidden mb-16 px-1">
                            <motion.h2 
                                initial={{ opacity: 0, y: "100%" }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                style={{ transform: "translateZ(0)" }}
                                className="text-4xl md:text-[clamp(3rem,6vw,5.5rem)] font-bold uppercase text-black leading-[1.0] tracking-[-0.04em] font-plus-jakarta"
                            >
                                Master<br/>
                                <span className="text-black/40">The Logic.</span>
                            </motion.h2>
                        </div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl text-black/80 font-medium leading-[1.5] max-w-md mb-20"
                        >
                            We deconstruct the IELTS exam into 12 distinct linguistic parameters, allowing you to master the logic behind the score.
                        </motion.p>
                        
                        <motion.button 
                            whileHover={{ x: 10 }}
                            className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4 group"
                        >
                            <span>Read the Whitepaper</span>
                            <div className="w-8 h-[1px] bg-black group-hover:w-16 transition-all duration-500" />
                        </motion.button>
                    </div>
                    
                    <div className="space-y-20 lg:pt-10">
                        {metrics.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={shouldAnimate ? { opacity: 0, y: isMobile ? 50 : 100 } : { opacity: 1, y: 0 }}
                                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                                viewport={{ once: true, margin: "-100px" }}
                                style={{ transform: "translateZ(0)" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                className="group relative will-change-transform"
                            >
                                <div className="overflow-hidden px-1">
                                    <motion.div 
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-8xl md:text-[clamp(5rem,10vw,9rem)] font-bold leading-none text-black tracking-[-0.05em] select-none font-plus-jakarta"
                                    >
                                        {m.value}
                                    </motion.div>
                                </div>
                                <div className="mt-8 ml-4 md:ml-12 border-l-2 border-black pl-8 md:pl-12">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 font-plus-jakarta">
                                        {m.title}
                                    </h3>
                                    <p className="text-base text-black/70 font-medium max-w-xs group-hover:text-black transition-colors duration-500 leading-relaxed">
                                        {m.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
