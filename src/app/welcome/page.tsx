"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-600/20 rounded-full blur-3xl opacity-30 mix-blend-screen animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl opacity-20 mix-blend-screen animate-blob animation-delay-2000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-yellow-500/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
                    <motion.div
                        initial={{ width: "33%" }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-yellow-500 transition-all duration-500"
                    />
                </div>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent mb-4">
                        {step === 1 && "Welcome to the Inner Circle"}
                        {step === 2 && "Define Your Goals"}
                        {step === 3 && "Let's Place You"}
                    </h1>
                    <p className="text-slate-400">
                        {step === 1 && "Everything becomes easier when you have a system. Let's set yours up."}
                        {step === 2 && "Where do you want to be in 6 months?"}
                        {step === 3 && "Quick check: Which sentence sounds correct?"}
                    </p>
                </div>

                {/* Content Steps */}
                <div className="min-h-[200px] flex flex-col items-center justify-center">
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4 w-full"
                        >
                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-200">Personalized Curriculum</h3>
                                    <p className="text-sm text-slate-500">Tailored to your current level</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-200">Daily Progress Tracking</h3>
                                    <p className="text-sm text-slate-500">See your improvement in real-time</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-3 w-full"
                        >
                            {["I want to speak fluently for work.", "I need to pass IELTS with 7.0+", "I want to travel confidently."].map((goal, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-700 bg-slate-800/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all cursor-pointer text-center text-slate-300 hover:text-yellow-200 font-medium">
                                    {goal}
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-3 w-full"
                        >
                            {["I have gone to the store yesterday.", "I went to the store yesterday.", "I was go to the store yesterday."].map((option, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-700 bg-slate-800/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all cursor-pointer text-center text-slate-300 hover:text-yellow-200 font-medium">
                                    {option}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                <div className="mt-12 flex justify-end">
                    <Button
                        onClick={handleNext}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 rounded-xl shadow-lg shadow-yellow-500/20"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                {step === 3 ? "Finish Setup" : "Continue"}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>

            </motion.div>
        </div>
    );
}
