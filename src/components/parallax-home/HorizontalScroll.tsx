"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const testimonials = [
    {
        name: "Akmal R.",
        score: "Band 8.5",
        text: "The precision evaluations showed me exactly where my writing was failing. Within 3 weeks, I jumped from 6.5 to 8.5.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Malika T.",
        score: "Band 8.0",
        text: "IELTS Wisdom mock tests replicate real anxiety and timing flawlessly. I walked into the actual exam completely relaxed.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Jasur M.",
        score: "Band 7.5",
        text: "The strategies for the Reading section were a game-changer. I finally stopped running out of time on the third passage.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Madina A.",
        score: "Band 8.0",
        text: "Absolutely stunning platform. Not just the teaching quality, but practicing on an interface that feels this premium boosts your confidence.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 0.9], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[450vh] bg-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-24 px-12 md:px-40">
                    
                    {/* Header Block inside the scroll */}
                    <div className="w-[80vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 0.4, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-[1px] bg-black" />
                            <span className="text-xs font-black uppercase tracking-[0.6em]">Results</span>
                        </motion.div>
                        <h2 className="text-7xl md:text-[12rem] font-serif italic text-black leading-[0.85] tracking-tighter mb-12">
                            Success<br/>
                            <span className="font-sans font-black uppercase not-italic tracking-tighter">Stories.</span>
                        </h2>
                        <p className="text-2xl text-black/40 font-medium leading-[1.4] max-w-lg">
                            Join thousands of candidates who transformed their scores and unlocked their global futures.
                        </p>
                    </div>

                    {testimonials.map((t, idx) => (
                        <motion.div 
                            key={idx} 
                            transition={{ duration: 1 }}
                            className="w-[85vw] md:w-[45vw] flex-shrink-0 relative group rounded-[4rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col bg-white"
                        >
                            <div className="h-[60%] w-full relative flex items-center justify-center bg-black overflow-hidden p-12">
                                <motion.div 
                                    animate={{ 
                                        opacity: [0.1, 0.2, 0.1],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f644,transparent)]"
                                />
                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-xl">
                                        <span className="text-4xl md:text-6xl font-black text-white">
                                            {t.name ? (
                                                <>
                                                    {t.name.split(' ')[0]?.[0] || ''}
                                                    {t.name.split(' ')[1]?.[0] || ''}
                                                </>
                                            ) : 'ST'}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center gap-2 mb-2 opacity-40 justify-center">
                                            <div className="w-4 h-[1px] bg-white" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Score Record</span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">{t.name}</h3>
                                        <div className="mt-4 px-6 py-2 bg-white/10 rounded-full border border-white/10 inline-block">
                                            <span className="text-sm font-serif italic text-white/60 tracking-widest">{t.score}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[40%] w-full p-10 md:p-16 flex items-center bg-white">
                                <p className="text-2xl md:text-3xl font-serif italic text-black/60 leading-[1.4] group-hover:text-black transition-colors duration-700">
                                    "{t.text}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    
                    <div className="w-[40vw] flex-shrink-0" />
                </motion.div>
            </div>
        </section>
    );
}
