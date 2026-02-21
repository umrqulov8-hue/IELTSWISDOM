"use client";

import { motion } from "framer-motion";
import { Layers, Mic, Infinity as InfinityIcon } from "lucide-react";

const features = [
    {
        icon: Layers,
        title: "Structured Curriculum",
        description: "Forget random lessons. Follow a step-by-step path designed to take you from beginner to fluent.",
    },
    {
        icon: Mic,
        title: "Native Speaker Support",
        description: "Practice with real teachers and get instant feedback on your pronunciation and grammar.",
    },
    {
        icon: InfinityIcon,
        title: "Lifetime Access",
        description: "Buy a course once and keep it forever. Revisit lessons anytime you need a refresher.",
    },
];

export function ValueProps() {
    return (
        <section id="methodology" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                        Why Choose <span className="text-secondary">IELTS Wisdom?</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We combine proven learning methods with modern technology to help you succeed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-secondary/20 hover:shadow-xl hover:shadow-secondary/5 transition-all text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
