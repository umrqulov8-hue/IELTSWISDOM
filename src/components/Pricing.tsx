"use client";

import { m } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const tiers = [
    {
        name: "Starter",
        price: "Free",
        desc: "Perfect for students starting their IELTS journey.",
        features: [
            "Access to Basic Lessons",
            "1 Monthly Mock Test",
            "Community Support",
            "Digital Study Planner",
        ],
        cta: "Get Started",
        featured: false
    },
    {
        name: "Pro",
        price: "$29",
        period: "/ month",
        desc: "Best for serious students aiming for Band 7.5+.",
        features: [
            "Unlimited Mock Tests",
            "AI-Powered Writing Correction",
            "Speaking Video Analysis",
            "Priority Support",
            "Exclusive Band 9 Samples",
        ],
        cta: "Start Free Trial",
        featured: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For language schools and institutions.",
        features: [
            "Custom Curriculum",
            "Teacher Management Dashboard",
            "Bulk Student Enrollment",
            "API Access",
            "Dedicated Account Manager",
        ],
        cta: "Contact Sales",
        featured: false
    }
];

export function Pricing() {
    return (
        <>
            <section id="pricing" className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <m.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
                        >
                            Simple, transparent <br /> pricing
                        </m.h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            Choose the plan that fits your study goals and needs. <br /> Start free and scale as you grow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                        {tiers.map((tier, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`relative flex flex-col p-10 rounded-[2.5rem] saas-border shadow-sm transition-all hover:shadow-2xl ${
                                    tier.featured ? 'bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white z-10 scale-105' : 'bg-white dark:bg-slate-900'
                                }`}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-10">
                                    <h3 className="text-xl font-bold text-slate-500 mb-6">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-slate-900 dark:text-white leading-none">{tier.price}</span>
                                        {tier.period && <span className="text-slate-500 font-bold">{tier.period}</span>}
                                    </div>
                                    <p className="mt-6 text-slate-500 font-medium leading-relaxed">
                                        {tier.desc}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-10 flex-1">
                                    {tier.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button 
                                    size="lg" 
                                    variant={tier.featured ? "primary" : "outline"}
                                    className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest ${
                                        tier.featured ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'saas-border'
                                    }`}
                                >
                                    {tier.cta}
                                </Button>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
