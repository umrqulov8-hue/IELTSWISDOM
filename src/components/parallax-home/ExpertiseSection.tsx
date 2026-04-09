"use client";

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

    return (
        <section className="w-full bg-white py-40 border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
                    <div className="sticky top-40">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 0.4, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-[1px] bg-black" />
                            <span className="text-xs font-black uppercase tracking-[0.6em]">The Science</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-7xl md:text-[9rem] font-serif italic text-black leading-[0.85] mb-16"
                        >
                            Beyond just<br/>
                            <span className="font-sans font-black uppercase not-italic tracking-tighter">practice.</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl text-black/50 font-medium leading-[1.5] max-w-md mb-20"
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
                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                className="group relative will-change-transform"
                            >
                                <div className="text-[14rem] md:text-[18rem] font-sans font-black leading-none text-black/[0.06] group-hover:text-black/[0.12] transition-colors duration-1000 select-none tracking-tighter">
                                    {m.value}
                                </div>
                                <div className="mt-[-2.5rem] ml-4 md:ml-12 border-l border-black/10 pl-8 md:pl-12 group-hover:border-black transition-colors duration-700">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                                        {m.title}
                                    </h3>
                                    <p className="text-lg text-black/40 font-medium max-w-xs group-hover:text-black/70 transition-colors duration-500">
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
