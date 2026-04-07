"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
    {
        title: "Precision Evaluations",
        description: "Get accurate, AI-driven insights into your Writing and Speaking tasks, highlighting exactly where you need improvement to achieve a Band 8.5+.",
        image: "https://images.unsplash.com/photo-1544716900-50f01de6c66b?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Authentic Mock Tests",
        description: "Experience the real IELTS exam pressure with our rigorously timed, full-length practice tests across all four skills - Reading, Listening, Speaking, and Writing.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Systematic Mastery",
        description: "Break down complex topics into digestible exercises. Build your vocabulary and grammatical range progressively with expertly curated content.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
    }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center w-full min-h-[80vh] gap-12 md:gap-24 px-6 md:px-12 xl:px-24 mb-32 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2 overflow-hidden h-[50vh] md:h-[70vh] relative group">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img 
                        style={{ y: yImage, scale: 1.15 }}
                        src={feature.image} 
                        alt={feature.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.2] grayscale hover:grayscale-0"
                    />
                </motion.div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="overflow-hidden pb-2 mb-6">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase"
                    >
                        {feature.title}
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.p 
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-white/70 font-light leading-relaxed"
                    >
                        {feature.description}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

export default function FeaturesParallax() {
    return (
        <section className="w-full bg-[#0A0A0A] py-32 z-30 relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-[1400px] mx-auto">
                {features.map((f, i) => (
                    <FeatureCard key={i} feature={f} index={i} />
                ))}
            </div>
        </section>
    );
}
