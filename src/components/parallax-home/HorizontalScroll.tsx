"use client";

import { useRef } from "react";
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

    // Translate horizontal container based on vertical scroll
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#FAFAFA]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-12 md:px-32">
                    
                    {/* Header Block inside the scroll */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-black leading-none">
                            Success<br/>Stories
                        </h2>
                        <p className="mt-8 text-xl text-black/60 max-w-md">
                            Join thousands of candidates who transformed their scores and unlocked their global futures.
                        </p>
                    </div>

                    {testimonials.map((t, idx) => (
                        <div key={idx} className="w-[80vw] md:w-[40vw] flex-shrink-0 relative group rounded-3xl overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-[60vh] bg-white border border-gray-100 flex flex-col">
                            <div className="h-1/2 w-full overflow-hidden relative">
                                <img src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-8 text-white">
                                    <h3 className="text-3xl font-bold">{t.name}</h3>
                                    <span className="inline-block mt-2 px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold tracking-wider uppercase">
                                        {t.score}
                                    </span>
                                </div>
                            </div>
                            <div className="h-1/2 w-full p-8 md:p-12 flex items-center">
                                <p className="text-2xl md:text-3xl font-light text-black/80 leading-relaxed">
                                    "{t.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Buffer space at the end */}
                    <div className="w-[10vw] flex-shrink-0" />
                </motion.div>
            </div>
        </section>
    );
}
