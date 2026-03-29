"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const router = useRouter();

    const handleNext = () => {
        if (step > 1 && selectedOption === null) return;
        if (step < 3) {
            setStep(step + 1);
            setSelectedOption(null);
        } else {
            setLoading(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full">
                    <motion.div
                        initial={{ scaleX: 0.33 }}
                        animate={{ scaleX: step / 3 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ transformOrigin: "left" }}
                        className="h-full bg-[#FF851B]"
                    />
                </div>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-[#001F3F] mb-4">
                        {step === 1 && "Welcome to the Inner Circle"}
                        {step === 2 && "Define Your Goals"}
                        {step === 3 && "Let's Place You"}
                    </h1>
                    <p className="text-slate-500">
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
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-orange-300 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF851B]">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Personalized Curriculum</h3>
                                    <p className="text-sm text-slate-500">Tailored to your current level</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-orange-300 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF851B]">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Daily Progress Tracking</h3>
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
                                <div
                                    key={i}
                                    onClick={() => setSelectedOption(i)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer text-center font-medium shadow-sm ${selectedOption === i ? 'bg-orange-50 border-[#FF851B] text-[#FF851B]' : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50/50'}`}
                                >
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
                                <div
                                    key={i}
                                    onClick={() => setSelectedOption(i)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer text-center font-medium shadow-sm ${selectedOption === i ? 'bg-orange-50 border-[#FF851B] text-[#FF851B]' : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50/50'}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                <div className="mt-12 flex justify-end">
                    <Button
                        onClick={handleNext}
                        className={`font-bold px-8 py-6 rounded-xl shadow-lg transition-all ${step > 1 && selectedOption === null ? 'bg-slate-200 text-slate-600 cursor-not-allowed hover:bg-slate-200' : 'bg-[#FF851B] hover:bg-[#e67615] text-white shadow-[#FF851B]/20'}`}
                        disabled={loading || (step > 1 && selectedOption === null)}
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
