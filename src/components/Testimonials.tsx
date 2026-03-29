"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Marketing Manager",
        result: "IELTS Band 8.0",
        content: "I was stuck at Band 6.5 for years. After just 8 weeks with this program, I finally achieved the score I needed for my visa.",
        before: 6.5,
        after: 8.0,
    },
    {
        name: "David Chen",
        role: "Software Engineer",
        result: "Fluent in 6 Months",
        content: "The structured curriculum made all the difference. I can now confidentally lead meetings with international clients.",
        before: 4.0,
        after: 9.0, // Visual scale 1-10
    },
    {
        name: "Elena Rodriguez",
        role: "University Student",
        result: "Passed Cambridge C1",
        content: "The native speaker sessions were invaluable. They corrected mistakes I didn't even know I was making.",
        before: 5.0,
        after: 8.5,
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1 } }
                        }}
                        className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4"
                    >
                        Real Students, <span className="text-secondary">Real Results</span>
                    </motion.h2>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1 } }
                        }}
                        className="text-lg text-muted-foreground"
                    >
                        Join thousands of students who have transformed their English skills.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm relative"
                        >
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100 dark:text-slate-800" />

                            <div className="flex gap-1 text-secondary mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 dark:text-slate-600 mb-6 italic">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center text-xs font-medium mb-2">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="text-secondary font-bold">{testimonial.result}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div style={{ width: `${(testimonial.before / 10) * 100}%` }} className="h-full bg-slate-300"></div>
                                    <div style={{ width: `${((testimonial.after - testimonial.before) / 10) * 100}%` }} className="h-full bg-secondary"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                    <span>Before</span>
                                    <span>After</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
