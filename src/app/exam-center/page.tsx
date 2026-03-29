"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    ClipboardList,
    Headphones,
    BookOpen,
    PenTool,
    Mic,
    ChevronRight,
    ArrowLeft,
    AlertTriangle,
    CheckCircle2,
    Clock,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BouncyText } from "@/components/ui/BouncyText";

// --- Types ---
type ExamStep = "welcome" | "identity" | "rules" | "selection";

interface Section {
    id: string;
    title: string;
    icon: any;
    duration: string;
    questions: string;
    color: string;
    description: string;
}

const SECTIONS: Section[] = [
    {
        id: "listening",
        title: "Listening",
        icon: Headphones,
        duration: "30 + 2 min",
        questions: "40 Questions",
        color: "bg-blue-500",
        description: "Four parts with 10 questions each. Strict 2-minute check at the end."
    },
    {
        id: "reading",
        title: "Reading",
        icon: BookOpen,
        duration: "60 mins",
        questions: "40 Questions",
        color: "bg-emerald-500",
        description: "Three passages with split-screen layout and CDI question types."
    },
    {
        id: "writing",
        title: "Writing",
        icon: PenTool,
        duration: "60 mins",
        questions: "2 Tasks",
        color: "bg-rose-500",
        description: "Task 1 and Task 2 with on-screen word counter and auto-save."
    },
    {
        id: "speaking",
        title: "Speaking",
        icon: Mic,
        duration: "11-14 mins",
        questions: "3 Parts",
        color: "bg-orange-500",
        description: "Simulated face-to-face interview with part-by-part recording."
    }
];

export default function ExamCenterPage() {
    const router = useRouter();
    const [step, setStep] = useState<ExamStep>("welcome");
    const [agreedRules, setAgreedRules] = useState<boolean>(false);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const handleStartSimulation = (sectionId: string) => {
        // In a real app, we'd fetch the latest test ID for this section
        // For now, we'll use a mocked ID or redirect to a landing simulation
        router.push(`/exam-center/simulate/${sectionId}/default`);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />

            <div className="w-full max-w-4xl relative z-10">
                <AnimatePresence mode="wait">
                    {/* STEP 1: WELCOME */}
                    {step === "welcome" && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Official Test Center
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                                Welcome to the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IELTS CDI Simulator</span>
                            </h1>

                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                You are about to enter a strict, timed examination environment.
                                Please ensure you are in a quiet room and have a stable connection.
                            </p>

                            <div className="pt-8">
                                <button
                                    onClick={() => setStep("identity")}
                                    className="bg-[#2D3E50] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto group"
                                >
                                    Check In to Test Center
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-slate-600 text-xs mt-4">By proceeding, you agree to the examination code of conduct.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: IDENTITY CHECK */}
                    {step === "identity" && (
                        <motion.div
                            key="identity"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <User className="w-10 h-10 text-slate-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Identity Verification</h2>
                                <p className="text-slate-500 text-sm mb-8">Please confirm your details before starting the exam.</p>

                                <div className="space-y-4 text-left mb-10">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
                                        <div>
                                            <p className="text-xs text-slate-600 font-bold uppercase">Candidate Name</p>
                                            <p className="text-slate-700 font-bold">John Doe</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-600 font-bold uppercase">Candidate ID</p>
                                        <p className="text-slate-700 font-bold">IELTS-CDI-8829</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep("rules")}
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                                >
                                    Confirm Details
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: RULES BRIEFING */}
                    {step === "rules" && (
                        <motion.div
                            key="rules"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Examination Rules</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-6">
                                    <RuleItem icon={Clock} title="Strict Timing" desc="Tests will auto-submit exactly when the timer reaches zero." />
                                    <RuleItem icon={ShieldCheck} title="No External Aids" desc="No phones, dictionaries, or AI tools are permitted during the session." />
                                </div>
                                <div className="space-y-6">
                                    <RuleItem icon={ClipboardList} title="Review Period" desc="Listening has 2 mins check time. Reading/Writing have NO extra time." />
                                    <RuleItem icon={CheckCircle2} title="Final Submission" desc="Answers cannot be changed once the final 'Submit' button is clicked." />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agreedRules}
                                        onChange={(e) => setAgreedRules(e.target.checked)}
                                        className="w-6 h-6 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                                    />
                                    <span className="text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                                        I am ready to follow all examination rules.
                                    </span>
                                </label>

                                <button
                                    onClick={() => setStep("selection")}
                                    disabled={!agreedRules}
                                    className="px-10 py-4 bg-[#2D3E50] text-white rounded-2xl font-bold shadow-lg disabled:opacity-30 transition-all hover:bg-slate-800"
                                >
                                    Proceed to Section Selection
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: SECTION SELECTION */}
                    {step === "selection" && (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-4xl font-black text-slate-800 tracking-tight">Select Test Section</h2>
                                <p className="text-slate-500 font-medium">Which part of the IELTS test would you like to simulate today?</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {SECTIONS.map((section) => (
                                    <motion.button
                                        key={section.id}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleStartSimulation(section.id)}
                                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-left flex items-start gap-6 group hover:border-blue-200 transition-all"
                                    >
                                        <div className={cn("w-16 h-16 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform", section.color)}>
                                            <section.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                        {section.duration}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{section.description}</p>
                                            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                Begin Simulation <ChevronRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => setStep("rules")}
                                    className="text-slate-600 hover:text-slate-600 text-sm font-medium flex items-center gap-2 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to Rules
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function RuleItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                <Icon className="w-5 h-5 text-slate-600" />
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-base">{title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
