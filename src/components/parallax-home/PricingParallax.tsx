"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

const plans = [
    {
        name: "Essential",
        price: "$49",
        duration: "per month",
        features: ["AI Writing Evaluation (10/mo)", "AI Speaking Practice (5/mo)", "Access to All Reading & Listening Tests", "Detailed Performance Analytics"],
        isPopular: false
    },
    {
        name: "Pro",
        price: "$89",
        duration: "per month",
        features: ["Unlimited Writing Evaluation", "Unlimited Speaking Practice", "Personalized Study Roadmap", "Examiner-curated Strategies", "Mock Test Simulations"],
        isPopular: true
    },
    {
        name: "Master",
        price: "$149",
        duration: "Quarterly",
        features: ["Full Pro Experience", "1-on-1 Feedback Session with Native Tutor", "VIP Support Channel", "Extended Mock Exams", "Lifetime Access to Resources"],
        isPopular: false
    }
];

function PricingCard({ plan, index }: { plan: typeof plans[0], index: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
            className={`flex flex-col p-10 rounded-[2.5rem] relative overflow-hidden h-full border ${plan.isPopular ? 'bg-black text-white border-black z-10' : 'bg-white text-black border-black/5 hover:border-black/20'}`}
        >
            {plan.isPopular && (
                <div className="absolute top-8 right-8 px-4 py-1 bg-white text-black text-[10px] uppercase font-black tracking-widest rounded-full">
                    Recommended
                </div>
            )}

            <div className="mb-12">
                <h3 className="text-xl uppercase tracking-widest font-black opacity-50 mb-2">
                    {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-5xl md:text-7xl font-bold tracking-tighter tabular-nums">{plan.price}</span>
                    <span className={`text-sm opacity-50 uppercase tracking-widest font-bold`}>{plan.duration}</span>
                </div>
            </div>

            <ul className="flex-grow space-y-6 mb-12">
                {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-4 items-start text-sm md:text-base font-medium opacity-80 leading-snug">
                         <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${plan.isPopular ? 'bg-white' : 'bg-black opacity-30'}`} />
                         {f}
                    </li>
                ))}
            </ul>

            <button className={`w-full py-6 rounded-full text-lg font-bold uppercase tracking-widest transition-all ${plan.isPopular ? 'bg-white text-black hover:scale-[1.02]' : 'bg-black text-white hover:bg-black/90 hover:scale-[1.02]'}`}>
                Get Started
            </button>
        </motion.div>
    );
}

export default function PricingParallax() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="w-full bg-[#FAFAFA] py-40 relative perspective-1000 overflow-hidden">
             {/* Background Decoration (Static) */}
             <div 
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-5 select-none pointer-events-none"
             >
                <div className="text-[30vw] font-black uppercase tracking-tighter">PRICING</div>
             </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-9xl font-bold uppercase tracking-tighter text-black"
                    >
                        Invest In<br/>
                        <span className="text-black/20 italic">Your Future Self.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((p, i) => (
                        <PricingCard key={i} plan={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
