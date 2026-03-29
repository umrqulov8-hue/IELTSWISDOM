"use client";

import { m, LazyMotion, domMax } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "IELTS Wisdom transformed how our team builds and maintains our design system. The automation features alone save us hours every week.",
        name: "Sarah Chen",
        role: "Design Systems Lead at TechCorp",
        initials: "SC"
    },
    {
        quote: "The collaboration features are incredible. Our designers and developers are finally speaking the same language thanks to DesignKit.",
        name: "Marcus Johnson",
        role: "Frontend Lead at StartupXYZ",
        initials: "MJ"
    },
    {
        quote: "We've been able to scale our design system across 15+ products seamlessly. The versioning and deployment features are game-changers.",
        name: "Elena Rodriguez",
        role: "Product Designer at Enterprise Inc",
        initials: "ER"
    },
    {
        quote: "The AI-powered component generation is mind-blowing. It's like having a design systems expert working 24/7 for our team.",
        name: "David Kim",
        role: "CTO at InnovateLab",
        initials: "DK"
    },
    {
        quote: "Integration with our existing tools was seamless. DesignKit fits perfectly into our workflow without any disruption.",
        name: "Lisa Thompson",
        role: "UX Director at DesignCo",
        initials: "LT"
    },
    {
        quote: "The documentation auto-generation feature has made our component library so much more accessible to the entire organization.",
        name: "Alex Rivera",
        role: "Senior Developer at BuildFast",
        initials: "AR"
    }
];

export function Testimonials() {
    return (
        <LazyMotion features={domMax}>
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
        </LazyMotion>
    );
}
