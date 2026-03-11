"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { calculateBandScore, calculateOverallBand } from "@/utils/ielts-calculator";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Send, CheckCircle2, ChevronRight, BarChart3, Clock, Layout, Download, FileText } from "lucide-react";
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

    const handleDownload = () => {
        window.print();
    };

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
        <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-12 font-sans transition-all selection:bg-blue-100 relative overflow-x-hidden">
            {/* Custom Print Styles */}
            <style jsx global>{`
                @media print {
                    @page { 
                        margin: 0; 
                        size: A4 portrait;
                    }
                    body { 
                        background: white !important; 
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        margin: 0;
                        padding: 0;
                    }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    
                    /* Certificate Design */
                    .certificate-container {
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 12mm !important;
                        position: relative;
                        background: white !important;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        page-break-after: avoid;
                        page-break-before: avoid;
                    }
                    .certificate-border {
                        position: absolute;
                        top: 4mm;
                        left: 4mm;
                        right: 4mm;
                        bottom: 4mm;
                        border: 3px solid #1A2E44;
                        pointer-events: none;
                        z-index: 50;
                    }
                    .certificate-inner-border {
                        position: absolute;
                        top: 6mm;
                        left: 6mm;
                        right: 6mm;
                        bottom: 6mm;
                        border: 1.5px solid #C5A059;
                        pointer-events: none;
                        z-index: 50;
                    }
                    .watermark {
                        position: absolute;
                        top: 55%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 80pt;
                        font-weight: 900;
                        color: rgba(26, 46, 68, 0.03);
                        white-space: nowrap;
                        pointer-events: none;
                        z-index: 0;
                        text-transform: uppercase;
                        letter-spacing: 0.5em;
                    }
                    
                    .print-card { 
                        box-shadow: none !important; 
                        border: 1px solid #e1e8f0 !important;
                        background: white !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    .print-overall { 
                        background: #1A2E44 !important;
                        color: white !important;
                        padding: 1.5rem !important;
                    }
                    .print-overall * { color: white !important; }
                    .print-overall .band-value { color: #C5A059 !important; font-size: 6rem !important; }

                    .print-grid {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 10px !important;
                    }
                    
                    /* Adjust vertical spacing for print to fit one page */
                    .print-mb-small { margin-bottom: 1rem !important; }
                    .print-mb-xsmall { margin-bottom: 0.75rem !important; }
                    .print-mt-large { margin-top: 1rem !important; }
                    .print-p-small { padding: 1rem !important; }
                    .print-text-small { font-size: 10pt !important; }
                    .print-text-xsmall { font-size: 8pt !important; }
                }
                .print-only { display: none; }
            `}</style>

            <div className="max-w-5xl mx-auto certificate-container relative">
                {/* Visual Elements for Print */}
                <div className="print-only certificate-border" />
                <div className="print-only certificate-inner-border" />
                <div className="print-only watermark">IELTS WISDOM</div>

                {/* Print Header */}
                <div className="print-only mb-4 text-center relative z-10 pt-6">
                    <div className="inline-block border-b-4 border-[#C5A059] pb-2 mb-3">
                        <h2 className="text-4xl font-black text-[#1A2E44] tracking-tighter">IELTS WISDOM</h2>
                        <p className="text-sm font-bold text-[#C5A059] uppercase tracking-[0.3em] mt-2">Personal Achievement Report</p>
                    </div>
                    <div className="flex justify-between items-center px-10 text-left">
                        <div>
                            <p className="text-xs uppercase font-black text-slate-400 tracking-widest">Candidate Name</p>
                            <p className="text-lg font-bold text-slate-900">{user?.email?.split('@')[0] || "Student"}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase font-black text-slate-400 tracking-widest">Verification ID</p>
                            <p className="text-lg font-bold text-slate-900">#{id}</p>
                        </div>
                    </div>
                </div>

                {/* Web Header */}
                <div className="mb-12 flex items-center justify-between no-print">
                    <div>
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-all font-bold group mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Mock Test Results</h1>
                        <p className="text-slate-500 font-medium">Test ID: <span className="text-blue-600 font-bold">#{id}</span> • Completed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="p-5 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white flex items-center gap-4">
                            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-200">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Performance Rank</p>
                                <p className="text-xl font-black text-slate-800 leading-none">Top 5%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 relative z-10 print-mb-small">
                    {/* Overall Band Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1A2E44] rounded-[3rem] p-12 shadow-2xl shadow-blue-900/20 border border-blue-800 flex flex-col items-center justify-center text-center relative overflow-hidden group print-card print-overall"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-32 h-32 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-colors" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="text-[14px] uppercase font-black text-[#C5A059] tracking-[0.3em] mb-6">Overall Band Score</div>
                            <div className="text-[10rem] font-black text-white tracking-tighter mb-4 leading-none band-value">
                                {overallBand.toFixed(1)}
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">
                                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                                Certified Result
                            </div>
                        </div>
                    </motion.div>

                    {/* Section Breakdown */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 print-grid">
                        {[
                            { name: "Listening", key: "listening", icon: <Clock />, color: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600" },
                            { name: "Reading", key: "reading", icon: <Layout />, color: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600" },
                            { name: "Writing", key: "writing", icon: <BarChart3 />, color: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600" },
                            { name: "Speaking", key: "speaking", icon: <Send />, color: "bg-emerald-600", light: "bg-emerald-50", text: "text-emerald-600" }
                        ].map((section, idx) => {
                            const result = results[section.key];
                            const band = sectionBands[section.key as keyof typeof sectionBands];
                            
                            return (
                                <motion.div 
                                    key={section.key}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default print-card print-p-small"
                                >
                                    <div className="flex items-center justify-between mb-6 print-mb-xsmall">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg print-only:w-8 print-only:h-8", section.color)}>
                                            {section.icon}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-black text-slate-900 leading-none print-text-small">
                                                {band > 0 ? band.toFixed(1) : "N/A"}
                                            </div>
                                            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 print-text-xsmall">Band</p>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 print-text-small">{section.name}</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter print-text-xsmall">
                                                {result ? `${result.score}/${result.total} Correct` : "Manual Assessment"}
                                            </p>
                                        </div>
                                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden print-only:hidden">
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

                {/* AI Analysis / Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 print-mb-small">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm print-card print-p-small">
                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 print-mb-xsmall print-text-small">
                            <BarChart3 className="w-6 h-6 text-[#C5A059]" />
                            Performance Insights
                        </h3>
                        <div className="space-y-6 print-space-y-small">
                            <div className="flex gap-4">
                                <div className="w-1.5 h-auto bg-[#C5A059] rounded-full shrink-0" />
                                <div>
                                    <p className="font-black text-slate-800 text-sm mb-1 uppercase tracking-wide print-text-xsmall">Lexical Resource</p>
                                    <p className="text-xs text-slate-500 leading-relaxed print-text-xsmall">Uses accurate technical vocabulary. Focus on varied structures for Higher Band.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1.5 h-auto bg-blue-500 rounded-full shrink-0" />
                                <div>
                                    <p className="font-black text-slate-800 text-sm mb-1 uppercase tracking-wide print-text-xsmall">Listening Retention</p>
                                    <p className="text-xs text-slate-500 leading-relaxed print-text-xsmall">High accuracy in Section 1 & 2. S3 dialogue practice recommended.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 no-print">
                        <button 
                            onClick={handleDownload}
                            className="bg-slate-900 p-8 rounded-[2rem] text-white flex items-center justify-between hover:bg-black transition-all group shadow-2xl shadow-slate-200 border-t border-white/10"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-900/20">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-black tracking-tight">Download Report</p>
                                    <p className="text-xs text-slate-400 font-medium">Get your official result certificate PDF</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-[#C5A059] group-hover:translate-x-2 transition-all" />
                        </button>

                        <button 
                            onClick={() => router.push('/exam-center')}
                            className="bg-white p-8 rounded-[2rem] border border-slate-200 flex items-center justify-between hover:border-[#1A2E44] transition-all group shadow-sm"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-[#1A2E44] group-hover:text-white transition-all">
                                    <ArrowLeft className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-black text-slate-900 tracking-tight">Retake Test</p>
                                    <p className="text-xs text-slate-400 font-medium">Practice again to hit your target band</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-[#1A2E44] group-hover:translate-x-2 transition-all" />
                        </button>
                    </div>
                </div>

                {/* Print Footer */}
                <div className="print-only mt-auto text-center relative z-10">
                    <div className="flex justify-between items-end px-16 mb-8">
                        <div className="text-left">
                            <div className="w-40 h-px bg-slate-900 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Academic Director</p>
                            <p className="text-[8px] text-slate-500 italic mt-1 font-serif">IELTS WISDOM Verification System</p>
                        </div>
                        <div className="w-20 h-20 border-4 border-[#C5A059] rounded-full flex flex-col items-center justify-center p-2">
                             <CheckCircle2 className="w-6 h-6 text-[#C5A059] mb-1" />
                             <p className="text-[6px] font-black text-center text-[#1A2E44] uppercase leading-none">Verified<br/>Candidate</p>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-6 pb-8">
                        <p className="text-slate-400 text-[8px] uppercase font-black tracking-[0.4em]">WWW.IELTSWISDOM.COM • GLOBAL EDUCATION PLATFORM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
