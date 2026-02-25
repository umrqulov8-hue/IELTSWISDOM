"use client";

import { Button } from "./Button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();
    const { lang } = useLanguage();
    const h = T.hero;

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-28">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
                <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="max-w-2xl"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }} className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary bg-primary/5 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                            {tx(h.badge, lang)}
                        </motion.div>

                        <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
                            {tx(h.h1a, lang)} <span className="text-secondary">{tx(h.h1b, lang)}</span>{tx(h.h1c, lang) ? ` ${tx(h.h1c, lang)}` : ""}
                        </motion.h1>

                        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }} className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                            {tx(h.desc, lang)}
                        </motion.p>

                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }} className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button size="lg" className="group" onClick={handleStartLearning} disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : tx(h.cta, lang)}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                            </Button>
                            <Button variant="outline" size="lg" href="#methodology">
                                {tx(h.curriculum, lang)}
                            </Button>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }} className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-secondary" />
                                <span>{tx(h.teachers, lang)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-secondary" />
                                <span>{tx(h.lifetime, lang)}</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="relative lg:h-[600px] flex items-center justify-center hidden md:flex"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] rotate-3 opacity-20"></div>
                            <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                                <div className="p-8 text-center">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <span className="text-4xl">🎓</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">IELTS Prep</h3>
                                    <p className="text-muted-foreground">Band 7.0+ Guaranteed</p>
                                    <div className="mt-6 flex justify-center -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                                U{i}
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary text-white flex items-center justify-center text-xs font-bold">
                                            +2k
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge 1 */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">A+</div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{lang === "en" ? "Student Rating" : "Talaba reytingi"}</p>
                                        <p className="font-bold text-primary">4.9/5.0</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">24h</div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{lang === "en" ? "Support" : "Yordam"}</p>
                                        <p className="font-bold text-primary">{lang === "en" ? "Live Chat" : "Jonli Chat"}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
