"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ClipboardList, AlertTriangle, CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

function RuleItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                <Icon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-base">{title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

export default function MockExamIntroPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const { lang } = useLanguage();
    const [agreedRules, setAgreedRules] = useState<boolean>(false);
    const [isStarting, setIsStarting] = useState(false);

    const INTRO = T.mockExamsIntro;
    const testIndex = parseInt(id, 10);
    const testsArray = T.mockExams.tests as any;
    const mockTest = testsArray[testIndex] || testsArray[0] || {
        title: { en: "Mock Test", uz: "Mock Test" },
        desc: { en: "Test description", uz: "Test tavsifi" },
        listTitle: { en: "Components", uz: "Tarkib" },
        listItems: []
    }; // fallback

    const handleStartSequence = () => {
        setIsStarting(true);
        // Request fullscreen immediately to avoid interruptions
        try {
            const el = document.documentElement as any;
            if (el.requestFullscreen) {
                el.requestFullscreen().catch(console.error);
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        } catch (err) {
            console.error("Error attempting to enable fullscreen:", err);
        }

        // Delay the actual navigation to show the animation
        setTimeout(() => {
            router.push(`/mock-exams/${id}/pre-check`);
        }, 3500); // 3.5 seconds for a premium feel
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Transition Overlay */}
            <AnimatePresence>
                {isStarting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center text-slate-800"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-center space-y-8"
                        >
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto relative">
                                <motion.div 
                                    className="absolute inset-0 bg-blue-100 rounded-full"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <ShieldCheck className="w-12 h-12 text-blue-600 relative z-10" />
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tight text-slate-900">Preparing Exam Center</h3>
                                <p className="text-slate-500 font-medium">Entering secure examination mode...</p>
                            </div>

                            <div className="w-64 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden border border-slate-200">
                                <motion.div 
                                    className="h-full bg-blue-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                />
                            </div>

                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-500"
                            >
                                Initializing Simulation
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl z-0 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl z-0 pointer-events-none" />

            <div className="w-full max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden"
                >
                    <div className="flex flex-col mb-8 gap-2 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200 shadow-sm w-max mb-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {tx(mockTest.title, lang)}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{tx(INTRO.title, lang)}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
                        <div className="space-y-6">
                            <RuleItem icon={Clock} title={tx(INTRO.strictTiming, lang)} desc={tx(INTRO.strictTimingDesc, lang)} />
                            <RuleItem icon={ShieldCheck} title={tx(INTRO.noAids, lang)} desc={tx(INTRO.noAidsDesc, lang)} />
                        </div>
                        <div className="space-y-6">
                            <RuleItem icon={ClipboardList} title={tx(INTRO.reviewPeriod, lang)} desc={tx(INTRO.reviewPeriodDesc, lang)} />
                            <RuleItem icon={CheckCircle2} title={tx(INTRO.finalSubmission, lang)} desc={tx(INTRO.finalSubmissionDesc, lang)} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100 relative z-10">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={agreedRules}
                                onChange={(e) => setAgreedRules(e.target.checked)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                            />
                            <span className="text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                                {tx(INTRO.agreeText, lang)}
                            </span>
                        </label>

                        <button
                            onClick={handleStartSequence}
                            disabled={!agreedRules || isStarting}
                            className="px-10 py-4 bg-[#2D3E50] text-white rounded-2xl font-bold shadow-lg disabled:opacity-30 transition-all hover:bg-slate-800"
                        >
                            {tx(INTRO.startBtn, lang)}
                        </button>
                    </div>

                    <div className="flex justify-center mt-8 relative z-10">
                        <button
                            onClick={() => router.push("/mock-exams")}
                            className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> {tx(INTRO.backBtn, lang)}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
