"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "IELTS Wisdom transformed how I approach the Writing section. The AI-powered feedback saves me hours of checking and helped me reach Band 8.5.",
        name: "Abdurahmon Karimov",
        role: "Band 8.5 Student",
        initials: "AK"
    },
    {
        quote: "The mock test engine is the most authentic I've seen. It perfectly mimics the CDI environment, ensuring students feel fully prepared for exam day.",
        name: "James Wilson",
        role: "IELTS Expert Examiner",
        initials: "JW"
    },
    {
        quote: "We've been able to scale our language school across 5+ locations seamlessly using the Enterprise dashboard. The student tracking is a game-changer.",
        name: "Elena Rodriguez",
        role: "Director at Elite English",
        initials: "ER"
    },
    {
        quote: "The AI Evaluator's accuracy in predicting scores is mind-blowing. It's like having a native examiner working 24/7 for our students.",
        name: "Dr. David Kim",
        role: "Head of Academic English",
        initials: "DK"
    },
    {
        quote: "Integration with our curriculum was seamless. IELTS Wisdom fits perfectly into our prep classes without any technical disruption.",
        name: "Lisa Thompson",
        role: "Senior Prep Instructor",
        initials: "LT"
    },
    {
        quote: "The detailed analytics feature has made tracking progress so much easier for our entire organization. Every student knows exactly where to improve.",
        name: "Alex Rivera",
        role: "IELTS Program Manager",
        initials: "AR"
    }
];

export function Testimonials() {
    return (
        <>
            <section id="testimonials" className="py-32 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                        {testimonials.map((testimonial, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group bg-white dark:bg-slate-900 rounded-3xl p-10 saas-border shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col"
                            >
                                <p className="text-lg text-slate-900 dark:text-white leading-relaxed font-bold mb-10 flex-1">
                                    "{testimonial.quote}"
                                </p>
                                
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                        {testimonial.initials}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{testimonial.name}</div>
                                        <div className="text-xs font-bold text-slate-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
