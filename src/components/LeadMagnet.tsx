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
            // Here you would typically send the email to your API
            console.log("Submitted email:", email);
        }
    };

    return (
        <section id="lead-magnet" className="py-24 bg-primary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            </div>

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-6">
                                <span className="mr-2">🎁</span> Free Resource
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                                Stop Making Simple Grammar Mistakes
                            </h2>
                            <p className="text-slate-300 mb-8 text-lg">
                                Download our free "Essential Grammar Guide" and fix the 50 most common errors English learners make.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Master tricky prepositions",
                                    "Perfect your verb tenses",
                                    "Sound more like a native speaker"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-200">
                                        <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-900">Get Your Free Copy</h3>
                                        <p className="text-sm text-slate-500">Instant PDF download + weekly tips.</p>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 bg-slate-50"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" size="lg">
                                        Send Me The Guide
                                    </Button>

                                    <p className="text-xs text-center text-slate-400 mt-4">
                                        We respect your inbox. Unsubscribe at any time.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Check Your Inbox!</h3>
                                    <p className="text-slate-500">
                                        We've sent the guide to <strong>{email}</strong>.
                                    </p>
                                    <Button
                                        variant="ghost"
                                        className="mt-6 text-sm"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setEmail("");
                                        }}
                                    >
                                        Send to another email
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
