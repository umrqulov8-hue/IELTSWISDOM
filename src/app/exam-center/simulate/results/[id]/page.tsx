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

const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 1500;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue.toFixed(1)}</span>;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20
        }
    }
};

export default function SimulationResultsPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0] || 'MT-1';
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
        <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-12 font-sans transition-all selection:bg-blue-100 relative overflow-x-hidden print:min-h-0 print:p-0 print:bg-white print:overflow-hidden">
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
                        margin: 0 !important;
                        padding: 0 !important;
                        height: 100% !important;
                        overflow: hidden !important;
                    }
                    html {
                        height: 100% !important;
                        overflow: hidden !important;
                    }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    
                    /* Certificate Design */
                    .certificate-container {
                        width: 210mm !important;
                        height: 297mm !important;
                        max-height: 297mm !important;
                        padding: 10mm !important; /* Slightly reduced padding to ensure fit */
                        position: relative !important;
                        background: white !important;
                        overflow: hidden !important;
                        display: flex !important;
                        flex-direction: column !important;
                        box-sizing: border-box !important;
                        margin: 0 !important;
                        border: none !important;
                    }
                    .certificate-border {
                        position: absolute !important;
                        top: 2mm !important;
                        left: 2mm !important;
                        right: 2mm !important;
                        bottom: 2mm !important;
                        border: 3px solid #1A2E44 !important;
                        pointer-events: none !important;
                        z-index: 50 !important;
                    }
                    .certificate-inner-border {
                        position: absolute !important;
                        top: 4mm !important;
                        left: 4mm !important;
                        right: 4mm !important;
                        bottom: 4mm !important;
                        border: 1px solid #C5A059 !important;
                        pointer-events: none !important;
                        z-index: 50 !important;
                    }
                    .watermark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 70pt;
                        font-weight: 900;
                        color: rgba(26, 46, 68, 0.02);
                        white-space: nowrap;
                        pointer-events: none;
                        z-index: 0;
                        text-transform: uppercase;
                        letter-spacing: 0.3em;
                    }
                    
                    /* Official TRF Structure */
                    .trf-table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        margin-bottom: 2mm !important;
                    }
                    .trf-cell {
                        border: 1px solid #1A2E44 !important;
                        padding: 1.5mm 3mm !important;
                        position: relative;
                        background: white !important;
                    }
                    .trf-label {
                        font-size: 7.5pt !important;
                        text-transform: uppercase !important;
                        font-weight: 900 !important;
                        color: #64748b !important;
                        letter-spacing: 0.05em !important;
                        display: block !important;
                        margin-bottom: 0.5mm !important;
                    }
                    .trf-value {
                        font-size: 11pt !important;
                        font-weight: 800 !important;
                        color: #1A2E44 !important;
                        text-transform: uppercase !important;
                    }
                    .trf-score-box {
                        border: 1.5px solid #1A2E44 !important;
                        width: 12mm !important;
                        height: 12mm !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        font-size: 14pt !important;
                        font-weight: 900 !important;
                        color: #1A2E44 !important;
                        background: #f8fafc !important;
                        margin: 0 auto !important;
                    }
                    .trf-score-box.overall {
                        background: #1A2E44 !important;
                        color: #C5A059 !important;
                        border: 1.5px solid #C5A059 !important;
                    }
                    .trf-score-label {
                        font-size: 7pt !important;
                        font-weight: 900 !important;
                        text-align: center !important;
                        color: #1A2E44 !important;
                        margin-bottom: 1.5mm !important;
                    }

                    .print-header-top {
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: flex-end !important;
                        margin-bottom: 4mm !important;
                        border-bottom: 2px solid #1A2E44 !important;
                        padding-bottom: 2mm !important;
                    }

                    /* Absolute footer for print */
                    .print-footer-absolute {
                        position: absolute !important;
                        bottom: 12mm !important;
                        left: 12mm !important;
                        right: 12mm !important;
                        z-index: 60 !important;
                        background: white !important;
                    }
                    
                    /* Force no second page */
                    * {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                }
                .print-only { display: none; }
            `}</style>

            <div className="max-w-5xl mx-auto certificate-container relative">
                {/* Visual Elements for Print */}
                <div className="print-only certificate-border" />
                <div className="print-only certificate-inner-border" />
                <div className="print-only watermark">IELTS WISDOM</div>

                {/* Print Header */}
                <div className="print-only relative z-10 pt-4 px-2">
                    <div className="print-header-top">
                        <div>
                            <h2 className="text-4xl font-black text-[#1A2E44] tracking-tighter leading-none mb-1">IELTS</h2>
                            <p className="text-[10pt] font-black text-slate-800 uppercase tracking-widest">Test Report Form</p>
                        </div>
                        <div className="text-right">
                             <div className="bg-[#f8fafc] border border-slate-300 px-8 py-2 font-black text-[#1A2E44] text-[12pt] uppercase tracking-widest">ACADEMIC</div>
                        </div>
                    </div>
                    
                    <div className="text-[8pt] text-slate-500 font-bold mb-4 italic leading-tight">
                        NOTE: Admission to undergraduate and post graduate courses should be based on the ACADEMIC Reading and Writing Modules. 
                        GENERAL TRAINING Reading and Writing Modules are not designed to test the full range of language skills required for academic purposes.
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="border border-slate-900 p-2 flex justify-between items-center bg-white">
                            <span className="text-[7pt] font-black uppercase text-slate-500">Centre Number</span>
                            <span className="text-sm font-black text-[#1A2E44]">AE113</span>
                        </div>
                        <div className="border border-slate-900 p-2 flex justify-between items-center bg-white">
                            <span className="text-[7pt] font-black uppercase text-slate-500">Date</span>
                            <span className="text-sm font-black text-[#1A2E44]">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                        </div>
                        <div className="border border-slate-900 p-2 flex justify-between items-center bg-white">
                            <span className="text-[7pt] font-black uppercase text-slate-500">Candidate Number</span>
                            <span className="text-sm font-black text-[#1A2E44]">#{id.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Candidate Details Table */}
                    <div className="font-black text-[10pt] text-[#1A2E44] mb-2 uppercase border-b border-slate-200 pb-1">Candidate Details</div>
                    <div className="space-y-[1px] bg-slate-200 border border-slate-900 mb-6">
                        <div className="grid grid-cols-1 bg-white p-3">
                            <span className="text-[7pt] text-slate-500 uppercase">Family Name</span>
                            <span className="text-[11pt] font-black">{user?.email?.split('@')[0]?.toUpperCase() || "STUDENT"}</span>
                        </div>
                        <div className="grid grid-cols-1 bg-white p-3 border-t border-slate-200">
                            <span className="text-[7pt] text-slate-500 uppercase">First Name</span>
                            <span className="text-[11pt] font-black">{user?.email?.split('@')[0]?.toUpperCase() || "STUDENT"}</span>
                        </div>
                        <div className="grid grid-cols-1 bg-white p-3 border-t border-slate-200">
                            <span className="text-[7pt] text-slate-500 uppercase">Candidate ID</span>
                            <span className="text-[11pt] font-black">IW-{id.toUpperCase()}-7394</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[1px] bg-slate-200 border border-slate-900 mb-6">
                        <div className="bg-white p-3">
                            <span className="text-[7pt] text-slate-500 uppercase d-block">Date of Birth</span>
                            <span className="text-[10pt] font-black">10/05/1998</span>
                        </div>
                        <div className="grid grid-cols-2 gap-[1px] bg-slate-200">
                             <div className="bg-white p-3">
                                <span className="text-[7pt] text-slate-500 uppercase d-block">Sex (M/F)</span>
                                <span className="text-[10pt] font-black">M</span>
                             </div>
                             <div className="bg-white p-3">
                                <span className="text-[7pt] text-slate-500 uppercase d-block">Scheme Code</span>
                                <span className="text-[9pt] font-black">Private Candidate</span>
                             </div>
                        </div>
                    </div>

                    {/* Test Results Section */}
                    <div className="font-black text-[10pt] text-[#1A2E44] mb-2 uppercase border-b border-slate-200 pb-1 mt-6">Test Results</div>
                    <div className="border border-slate-900 p-4 bg-white mb-8">
                        <div className="flex justify-between items-end gap-1">
                            {[
                                { name: "Listening", key: "listening" },
                                { name: "Reading", key: "reading" },
                                { name: "Writing", key: "writing" },
                                { name: "Speaking", key: "speaking" },
                                { name: "Overall Band Score", key: "overall", isOverall: true },
                                { name: "CEFR Level", key: "cefr" }
                            ].map((s) => (
                                <div key={s.key} className="flex-1 flex flex-col items-center">
                                    <div className="trf-score-label" style={{ fontSize: '6.5pt', whiteSpace: 'nowrap' }}>{s.name}</div>
                                    <div className={cn("trf-score-box", s.isOverall && "overall")}>
                                        {s.key === "overall" 
                                            ? overallBand.toFixed(1)
                                            : s.key === "cefr"
                                                ? (overallBand >= 7.5 ? "C1" : overallBand >= 6.5 ? "B2" : "B1")
                                                : sectionBands[s.key as keyof typeof sectionBands] > 0 
                                                    ? sectionBands[s.key as keyof typeof sectionBands].toFixed(1)
                                                    : "N/A"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4">
                        <div className="border border-slate-900 p-4 bg-white min-h-[140px] flex flex-col justify-between">
                            <span className="text-[7pt] font-black uppercase text-slate-500 block mb-2">Administrator Comments</span>
                            <div className="text-[9pt] text-slate-700 font-bold leading-relaxed mb-4">
                                Performance reflects high accuracy in fundamental structures. 
                                Recommended focus on complex lexical variety for technical and academic contexts.
                            </div>
                            <div className="text-[7pt] text-slate-400 mt-auto pt-2 border-t border-slate-50 border-dashed italic">
                                Academic assessment result - IELTS WISDOM Practice Verification
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                             <div className="flex-1 border border-slate-900 p-4 bg-white flex flex-col items-center justify-center relative">
                                <span className="text-[6pt] font-black uppercase text-slate-400 absolute top-2 left-2">Administrator's Signature</span>
                                <div className="text-xl font-serif italic text-[#1A2E44] opacity-50 mt-4 select-none">IELTS Wisdom</div>
                             </div>
                             <div className="flex-1 border border-slate-900 p-4 bg-white flex flex-col items-center justify-center relative">
                                <span className="text-[6pt] font-black uppercase text-slate-400 absolute top-2 left-2">Validation Stamp</span>
                                <CheckCircle2 className="w-8 h-8 text-[#C5A059] mb-1" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Web Header */}
                <motion.div 
                    variants={itemVariants}
                    className="mb-12 flex items-center justify-between no-print"
                >
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
                </motion.div>

                {/* Score Summary Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 relative z-10 no-print"
                >
                    {/* Overall Band Card */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="bg-[#1A2E44] rounded-[3rem] p-12 shadow-2xl shadow-blue-900/30 border border-blue-800 flex flex-col items-center justify-center text-center relative overflow-hidden group print-card print-overall"
                    >
                        {/* Background Decorative Elements */}
                        <div className="absolute top-0 right-0 p-8">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" 
                            />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="text-[14px] uppercase font-black text-[#C5A059] tracking-[0.3em] mb-6 print-mb-xsmall print-text-small">Overall Band Score</div>
                            <div className="text-[10rem] font-black text-white tracking-tighter mb-4 leading-none band-value">
                                <AnimatedNumber value={overallBand} />
                            </div>
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 backdrop-blur-md print-p-small print-text-xsmall"
                            >
                                <CheckCircle2 className="w-4 h-4 text-[#C5A059] print-only:w-3 print-only:h-3" />
                                Certified Result
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section Breakdown */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 print-grid">
                        {[
                            { name: "Listening", key: "listening", icon: <Clock className="w-6 h-6" />, color: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600" },
                            { name: "Reading", key: "reading", icon: <Layout className="w-6 h-6" />, color: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600" },
                            { name: "Writing", key: "writing", icon: <BarChart3 className="w-6 h-6" />, color: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600" },
                            { name: "Speaking", key: "speaking", icon: <Send className="w-6 h-6" />, color: "bg-emerald-600", light: "bg-emerald-50", text: "text-emerald-600" }
                        ].map((section, idx) => {
                            const band = sectionBands[section.key as keyof typeof sectionBands];
                            const result = results[section.key];
                            
                            return (
                                <motion.div 
                                    key={section.key}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all group cursor-default print-card print-p-small"
                                >
                                    <div className="flex items-center justify-between mb-6 print-mb-xsmall">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg print-only:w-8 print-only:h-8 transition-transform group-hover:scale-110", section.color)}>
                                            {section.icon}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-black text-slate-900 leading-none print-text-small">
                                                {band > 0 ? <AnimatedNumber value={band} /> : "N/A"}
                                            </div>
                                            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 print-text-xsmall">Band</p>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 print-text-small group-hover:text-blue-600 transition-colors">{section.name}</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter print-text-xsmall">
                                                {result ? `${result.score}/${result.total} Correct` : "Manual Assessment"}
                                            </p>
                                        </div>
                                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden print-only:hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(band / 9) * 100}%` }}
                                                transition={{ duration: 2, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
                                                className={cn("h-full rounded-full", section.color)}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* AI Analysis / Actions */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 no-print"
                >
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -8, scale: 1.01 }}
                        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm print-card print-p-small"
                    >
                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 print-mb-xsmall print-text-small">
                            <BarChart3 className="w-6 h-6 text-[#C5A059] print-only:w-4 print-only:h-4" />
                            Performance Insights
                        </h3>
                        <div className="space-y-6 print-space-y-none">
                            <div className="flex gap-4 print-mb-xsmall">
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
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col gap-4 no-print"
                    >
                        <motion.button 
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
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
                        </motion.button>

                        <motion.button 
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
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
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Print Footer */}
                <div className="print-only print-footer-absolute text-center" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-center text-[7pt] font-bold text-slate-500 italic">
                        <span>The validity of this IELTS Test Report Form can be verified online at http://ielts.wisdom.org.uk</span>
                        <span className="uppercase tracking-widest text-slate-900 not-italic">IELTS WISDOM GLOBAL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
