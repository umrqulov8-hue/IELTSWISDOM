"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeuralMasteryVisual, EvaluationVisual, MockTestVisual } from "./VisualOrnaments";

const features = [
    {
        title: "Precision Evaluation",
        description: "Get accurate, AI-driven insights into your Writing and Speaking tasks, highlighting exactly where you need improvement to achieve a Band 8.5+.",
        type: "evaluation"
    },
    {
        title: "Authentic Mock Tests",
        description: "Experience the real IELTS exam pressure with our rigorously timed, full-length practice tests across all four skills - Reading, Listening, Speaking, and Writing.",
        type: "mock"
    },
    {
        title: "Systematic Mastery",
        description: "Break down complex topics into digestible exercises. Build your vocabulary and grammatical range progressively with expertly curated content.",
        type: "mastery"
    }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    
    // Parallax values
    const yVisual = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const titleParts = feature.title.split(" ");
    const head = titleParts[0];
    const tail = titleParts.slice(1).join(" ");

    const renderVisual = () => {
        switch (feature.type) {
            case "evaluation": return <EvaluationVisual />;
            case "mock": return <MockTestVisual />;
            case "mastery": return <NeuralMasteryVisual />;
            default: return null;
        }
    };

    return (
        <motion.div 
            ref={ref} 
            style={{ opacity }}
            className={`flex flex-col md:flex-row items-center w-full min-h-[90vh] gap-12 md:gap-32 px-6 md:px-16 xl:px-32 mb-40 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            <div className="w-full md:w-[55%] h-[60vh] md:h-[80vh] relative group perspective-2000">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, rotateY: isEven ? -10 : 10 }}
                    whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ y: yVisual, scale, transform: "translateZ(0)" }}
                    className="absolute inset-0 w-full h-full shadow-[0_80px_160px_-40px_rgba(0,0,0,0.5)] rounded-[4rem] overflow-hidden bg-black will-change-transform"
                >
                    {renderVisual()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">0{index + 1}</span>
                        <div className="w-8 h-[1px] bg-white opacity-20" />
                    </div>
                </motion.div>
            </div>
            
            <div className={`w-full md:w-[45%] flex flex-col justify-center text-black ${!isEven ? 'md:items-end md:text-right' : ''}`}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.4, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-4 mb-8 ${!isEven ? 'flex-row-reverse' : ''}`}
                >
                    <div className="w-12 h-[1px] bg-black" />
                    <span className="text-xs font-black uppercase tracking-[0.6em]">Core {index + 1}</span>
                </motion.div>

                <div className="mb-12 overflow-hidden px-1">
                    <motion.h2 
                        initial={{ opacity: 0, y: "100%" }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase text-black leading-[1.0] tracking-[-0.04em] font-plus-jakarta"
                    >
                        {head}<br/>
                        <span className="text-black/10">{tail}</span>
                    </motion.h2>
                </div>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl text-black/60 font-medium leading-[1.3] tracking-tight max-w-sm group-hover:text-black transition-colors duration-700"
                >
                    {feature.description}
                </motion.p>
            </div>
        </motion.div>
    );
}

export default function FeaturesParallax() {
    return (
        <section className="w-full bg-white py-60 z-30 relative overflow-hidden border-t border-black/5">
            <div className="max-w-[1600px] mx-auto">
                {features.map((f, i) => (
                    <FeatureCard key={i} feature={f} index={i} />
                ))}
            </div>
        </section>
    );
}
