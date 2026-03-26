"use client";

import { Button } from "./Button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { BouncyText } from "@/components/ui/BouncyText";

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
                        key={lang}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
                        }}
                        className="max-w-2xl"
                    >
                        <motion.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }} className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary bg-primary/5 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                            {tx(h.badge, lang)}
                        </motion.div>

                        <motion.h1 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
                            <BouncyText text={tx(h.h1a, lang)} type="letter" />{" "}
                            <BouncyText text={tx(h.h1b, lang)} type="letter" className="text-secondary" />
                            {tx(h.h1c, lang) && (
                                <>{" "}<BouncyText text={tx(h.h1c, lang)} type="letter" /></>
                            )}
                        </motion.h1>

                        <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                            <BouncyText text={tx(h.desc, lang)} type="word" />
                        </motion.p>

                        <motion.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }} className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button size="lg" className="group shadow-lg shadow-primary/20" onClick={handleStartLearning} disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : tx(h.cta, lang)}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                            </Button>
                            <Button variant="outline" size="lg" href="#methodology">
                                {tx(h.curriculum, lang)}
                            </Button>
                        </motion.div>

                        <motion.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }} className="flex items-center gap-6 text-sm text-muted-foreground">
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
                        initial={{ opacity: 0, scale: 0.8, rotateY: 30, rotateX: 20, z: -200 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.4 }}
                        className="relative lg:h-[600px] flex items-center justify-center hidden md:flex"
                        style={{ perspective: "1000px" }}
                    >
                        <div className="relative w-full max-w-md aspect-square" style={{ transformStyle: "preserve-3d" }}>
                            <motion.div
                                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                                animate={{ opacity: 0.2, rotate: 3, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.5 }}
                                className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] shadow-2xl"
                                style={{ transform: "translateZ(-50px)" }}
                            />

                            <motion.div
                                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center p-8"
                                style={{ transform: "translateZ(0px)" }}
                            >
                                <div className="text-center w-full flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.6, type: "spring", bounce: 0.6, duration: 0.8 }}
                                        className="w-24 h-24 bg-primary/10 rounded-full mb-6 flex items-center justify-center shadow-inner"
                                    >
                                        <span className="text-4xl drop-shadow-sm">🎓</span>
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className="text-2xl font-bold text-primary mb-2"
                                    >
                                        IELTS Prep
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                        className="text-muted-foreground font-medium"
                                    >
                                        Band 7.0+ Guaranteed
                                    </motion.p>
                                    <div className="mt-8 flex justify-center -space-x-4 pl-4">
                                        {[1, 2, 3, 4].map((i, idx) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20, scale: 0.5 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ delay: 1.0 + idx * 0.1, type: "spring", bounce: 0.6 }}
                                                className="w-12 h-12 rounded-full border-[3px] border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm relative z-10"
                                            >
                                                U{i}
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20, scale: 0.5 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{ delay: 1.4, type: "spring", bounce: 0.6 }}
                                            className="w-12 h-12 rounded-full border-[3px] border-white bg-secondary text-white flex items-center justify-center text-xs font-bold shadow-sm relative z-20"
                                        >
                                            +2k
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Badge 1 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 40, y: -40 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                transition={{ delay: 1.3, type: "spring", bounce: 0.5, duration: 0.8 }}
                                className="absolute -top-6 -right-6 z-30"
                                style={{ transform: "translateZ(80px)" }}
                            >
                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black text-lg shadow-inner">A+</div>
                                        <div>
                                            <p className="text-xs text-muted-foreground tracking-wide font-medium uppercase">{lang === "en" ? "Student Rating" : "Talaba reytingi"}</p>
                                            <p className="font-bold text-primary text-lg">4.9/5.0</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: -40, y: 40 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                transition={{ delay: 1.5, type: "spring", bounce: 0.5, duration: 0.8 }}
                                className="absolute -bottom-6 -left-6 z-30"
                                style={{ transform: "translateZ(60px)" }}
                            >
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                    className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-lg shadow-inner">24h</div>
                                        <div>
                                            <p className="text-xs text-muted-foreground tracking-wide font-medium uppercase">{lang === "en" ? "Support" : "Yordam"}</p>
                                            <p className="font-bold text-primary text-lg">{lang === "en" ? "Live Chat" : "Jonli Chat"}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
