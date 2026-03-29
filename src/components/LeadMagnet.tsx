"use client";

import { Button } from "./Button";
import { Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function LeadMagnet() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <section id="lead-magnet" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-slate-500/10 blur-[120px]" />
            </div>

            <div className="container relative mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto rounded-[2.5rem] p-1 md:p-1.5 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl"
                >
                    <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] p-8 md:p-16 overflow-hidden relative">
                        {/* Decorative internal glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                        
                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400 mb-8 uppercase tracking-widest"
                                >
                                    <span className="mr-2">🎁</span> Free Resource
                                </motion.div>
                                
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                                    Master <span className="text-indigo-400">Grammar</span> Without the Grind
                                </h2>
                                
                                <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
                                    Download our signature "IELTS Mastery Guide" and eliminate the 50 most common errors that hold students back from Band 8.5+.
                                </p>

                                <ul className="space-y-5 mb-0">
                                    {[
                                        "Master tricky prepositions & articles",
                                        "Perfect your complex sentence structures",
                                        "Sound authentic with expert collocations"
                                    ].map((item, i) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className="flex items-center text-slate-300 font-medium"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4 shrink-0">
                                                <CheckCircle className="h-4 w-4 text-emerald-400" />
                                            </div>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Get Your Copy</h3>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium">Instant PDF access + weekly prep tips.</p>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="block w-full rounded-2xl border-0 py-4 pl-12 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-200 dark:ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm bg-slate-50 dark:bg-slate-900 transition-all font-medium"
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" size="lg" className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                                            Send Me The Guide
                                        </Button>

                                        <p className="text-[10px] text-center text-slate-400 uppercase font-bold tracking-widest mt-6">
                                            🔒 No spam. Unsubscribe anytime.
                                        </p>
                                    </form>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="h-10 w-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Check Your Inbox!</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                            We've sent the mastery guide to<br /><strong className="text-indigo-600 dark:text-indigo-400">{email}</strong>.
                                        </p>
                                        <Button
                                            variant="ghost"
                                            className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                                            onClick={() => {
                                                setSubmitted(false);
                                                setEmail("");
                                            }}
                                        >
                                            Back to study
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
