"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

const partners = [
    "University of Oxford",
    "Cambridge Assessment",
    "British Council",
    "IDP Education",
    "Harvard University",
    "Stanford Graduate School",
    "MIT",
    "Yale University",
    "Princeton",
    "Columbia University"
];

export default function TrustMarquee() {
    const { shouldAnimate } = usePerformance();

    return (
        <section className="w-full bg-white py-20 overflow-hidden border-y border-black/5 relative">
            <div className="flex whitespace-nowrap">
                <motion.div 
                    animate={shouldAnimate ? { x: [0, -1000] } : {}}
                    transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="flex gap-20 items-center px-10 will-change-transform"
                >
                    {partners.map((p, i) => (
                        <span key={i} className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors cursor-default whitespace-nowrap">
                            {p}
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {partners.map((p, i) => (
                        <span key={i + partners.length} className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors cursor-default whitespace-nowrap">
                            {p}
                        </span>
                    ))}
                </motion.div>
            </div>
            
            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
        </section>
    );
}
