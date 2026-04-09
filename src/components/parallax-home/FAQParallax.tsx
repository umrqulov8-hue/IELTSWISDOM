"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePerformance } from "@/hooks/usePerformance";

const faqs = [
    {
        question: "How accurate is the AI evaluation?",
        answer: "Our AI is trained on over 500,000 real IELTS exam scripts and speaking recordings. It matches official examiner scores with 91% precision, focusing on Lexical Resource, Grammatical Range, Task Response, and Cohesion."
    },
    {
        question: "Can I practice for all 4 sections?",
        answer: "Yes. IELTS Wisdom provides comprehensive practice modules for Reading, Listening, Speaking, and Writing. Each section is designed to mimic the actual exam environment."
    },
    {
        question: "Is there a free trial available?",
        answer: "Every new user gets 1 free Writing evaluation and 1 full-length Mock Test to experience the power of the platform before committing to a plan."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 100% money-back guarantee within the first 7 days if you haven't seen any improvement in your mock test scores."
    }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-black/5 last:border-0"
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex justify-between items-center text-left hover:opacity-60 transition-opacity"
            >
                <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter">
                    {faq.question}
                </span>
                <motion.span 
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="text-3xl font-light"
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-lg text-black/60 font-medium leading-relaxed max-w-2xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQParallax() {
    return (
        <section className="w-full bg-white py-40">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-sm uppercase tracking-[0.5em] font-bold text-black/40 mb-4">Support</h2>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black">
                        Questions?
                    </h2>
                </div>

                <div className="space-y-0">
                    {faqs.map((f, i) => (
                        <FAQItem key={i} faq={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
