"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { calculateBandScore, calculateOverallBand } from "@/utils/ielts-calculator";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Send, CheckCircle2, ChevronRight, BarChart3, Clock, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestResult {
    section: string;
    score: number;
    total: number;
    created_at: string;
}

export default function SimulationResultsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [results, setResults] = useState<Record<string, TestResult>>({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchResults() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // Fetch all sections for this simulation ID
                // The test_id in supabase is stored as `sim-${section}-${id}`
                const sections = ["listening", "reading", "writing", "speaking"];
                const resultsMap: Record<string, TestResult> = {};

                for (const section of sections) {
                    const { data, error } = await supabase
                        .from("test_results")
                        .select("*")
                        .eq("user_id", user.id)
                        .eq("test_id", `sim-${section}-${id}`)
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .single();

                    if (data) {
                        resultsMap[section] = {
                            section,
                            score: data.score,
                            total: data.total_questions,
                            created_at: data.created_at
                        };
                    }
                }
                setResults(resultsMap);
            }
            setLoading(false);
        }

        fetchResults();
    }, [id]);

    const getBandForSection = (section: string, score: number) => {
        if (section === "reading" || section === "listening") {
            return calculateBandScore(score, section as any);
        }
        // Writing and Speaking currently use scores as placeholders or simple values
        // For simulation, we might need a more complex evaluator later.
        // For now, if score is out of 9, return it, else assume 0 for "Pending Evaluation"
        return score <= 9 && score > 0 ? score : 0;
    };

    const sectionBands = {
        listening: getBandForSection("listening", results.listening?.score || 0),
        reading: getBandForSection("reading", results.reading?.score || 0),
        writing: results.writing?.score || 0,
        speaking: results.speaking?.score || 0
    };

    const overallBand = calculateOverallBand([
        sectionBands.listening,
        sectionBands.reading,
        sectionBands.writing || 6.0, // Default for placeholders
        sectionBands.speaking || 6.5  // Default for placeholders
    ]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold text-slate-600">Calculating your Band Score...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans transition-all selection:bg-blue-100">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all font-bold group mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mock Test Results</h1>
                        <p className="text-slate-500 font-medium">Test ID: <span className="text-blue-600">#{id}</span> • Completed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Global Rank</p>
                                <p className="text-lg font-black text-slate-800">Top 12%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Overall Band Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-24 h-24 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors" />
                        </div>
                        
                        <div className="relative">
                            <div className="text-[12px] uppercase font-black text-blue-600 tracking-[0.2em] mb-4">Overall Band Score</div>
                            <div className="text-8xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
                                {overallBand.toFixed(1)}
                            </div>
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Target Achieved
                            </div>
                        </div>
                    </motion.div>

                    {/* Section Breakdown */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "Listening", key: "listening", icon: <Clock />, color: "bg-blue-500" },
                            { name: "Reading", key: "reading", icon: <Layout />, color: "bg-indigo-500" },
                            { name: "Writing", key: "writing", icon: <BarChart3 />, color: "bg-purple-500" },
                            { name: "Speaking", key: "speaking", icon: <Send />, color: "bg-orange-500" }
                        ].map((section, idx) => {
                            const result = results[section.key];
                            const band = sectionBands[section.key as keyof typeof sectionBands];
                            
                            return (
                                <motion.div 
                                    key={section.key}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", section.color)}>
                                            {section.icon}
                                        </div>
                                        <div className="text-2xl font-black text-slate-800">
                                            {band > 0 ? band.toFixed(1) : "N/A"}
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{section.name}</h3>
                                            <p className="text-xs text-slate-400 font-medium">
                                                {result ? `${result.score}/${result.total} Correct` : "Evaluation Pending"}
                                            </p>
                                        </div>
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(band / 9) * 100}%` }}
                                                className={cn("h-full rounded-full", section.color)}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Detailed Analysis / Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#2D3E50] rounded-[2rem] p-8 text-white">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            AI Recommended Focus
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <p className="text-sm font-bold mb-1">Vocabulary Precision</p>
                                <p className="text-xs text-slate-300">Your Task 2 essay shows good structure but could benefit from less common academic collocations.</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <p className="text-sm font-bold mb-1">Listening S4 - Distractors</p>
                                <p className="text-xs text-slate-300">You missed 3 questions in Section 4 due to audio distractors. Practice identifying synonyms in lectures.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => router.push('/exam-center')}
                            className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-blue-500 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                                    <ArrowLeft className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900">Try Another Test</p>
                                    <p className="text-xs text-slate-400">Continue practicing to improve</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </button>

                        <button 
                            className="bg-blue-600 p-6 rounded-2xl text-white flex items-center justify-between hover:bg-blue-700 transition-all group shadow-lg shadow-blue-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold">Share Your Success</p>
                                    <p className="text-xs text-blue-100">Download report or share to social</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
