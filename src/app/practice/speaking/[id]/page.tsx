"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { Menu, Clock, Mic, Upload, Send, Crown, Square, Trash2, Loader2, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpeakingTestInterface() {
    const params = useParams();
    const testId = params?.id as string;
    const testData = testId ? SPEAKING_TESTS[testId] : null;
    const { lang } = useLanguage();

    const [timeLeft, setTimeLeft] = useState(16);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Audio Recording States
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // Timer logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRecording) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Recording Functions
    const startRecording = async () => {
        setError(null);
        setResults(null);
        chunksRef.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setTimeLeft(0);
        } catch (err) {
            console.error("Microphone access denied:", err);
            setError("Microphone permission denied. Please allow access to record.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleAnalysis = async () => {
        if (!audioBlob) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            // 1. Transcribe
            const formData = new FormData();
            formData.append("file", audioBlob, "recording.wav");

            const transcribeRes = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
            });

            if (!transcribeRes.ok) {
                const errData = await transcribeRes.json();
                throw new Error(errData.details || errData.error || "Transcription failed");
            }
            const { text } = await transcribeRes.json();

            // 2. Evaluate
            const evaluateRes = await fetch("/api/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!evaluateRes.ok) {
                const errData = await evaluateRes.json();
                throw new Error(errData.details || errData.error || "Evaluation failed");
            }
            const data = await evaluateRes.json();

            setResults(data);
        } catch (err: any) {
            console.error("Analysis error:", err);
            setError(err.message || "Failed to analyze your answer. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetRecording = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setResults(null);
        setError(null);
        setTimeLeft(0);
    };

    if (!testData) return <div className="p-10 text-center">Test not found</div>;

    const currentPart = testData.parts[currentPartIndex];
    const currentQuestion = currentPart.questions[currentQuestionIndex];

    const hasNextQuestion = currentQuestionIndex < currentPart.questions.length - 1;
    const hasPrevQuestion = currentQuestionIndex > 0;

    const handleNext = () => {
        if (hasNextQuestion) setCurrentQuestionIndex(prev => prev + 1);
        else if (currentPartIndex < testData.parts.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrev = () => {
        if (hasPrevQuestion) setCurrentQuestionIndex(prev => prev - 1);
        else if (currentPartIndex > 0) {
            setCurrentPartIndex(prev => prev - 1);
            setCurrentQuestionIndex(testData.parts[currentPartIndex - 1].questions.length - 1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 relative overflow-hidden bg-[#F2F4F8]">
            {/* Light Liquid Background Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000 pointer-events-none" />

            {/* Top Navigation Bar - Light Glass */}
            <header className="relative z-50 bg-white/40 backdrop-blur-xl h-20 flex items-center justify-between px-6 border-b border-white/60 shadow-sm">
                <Link href="/practice/speaking" className="flex items-center gap-3 group">
                    <Image
                        src="/owl-logo.png"
                        alt="IELTS Wisdom"
                        width={46}
                        height={46}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>

                {/* Timer Pill */}
                <div className="flex items-center gap-3 font-bold text-slate-700 bg-white/70 backdrop-blur-md border border-white/80 px-5 py-2 rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm">
                    <Clock className="w-4 h-4 text-[#FF8C00]" />
                    <span className="text-[15px] tracking-wider font-mono">{formatTime(timeLeft)}</span>
                </div>

                <button className="text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 p-2.5 rounded-xl transition-all border border-transparent hover:border-white/80 backdrop-blur-sm">
                    <Menu className="w-6 h-6" strokeWidth={2} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col pt-10 relative z-10 items-center">

                {/* Part Header - Light Frost Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 mb-12 w-full max-w-4xl text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <h2 className="font-black text-slate-800 text-xl md:text-2xl tracking-wide mb-3">
                        {currentPart.title}
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                        {currentPart.instructions}
                    </p>
                </div>

                {/* Navigation & Question Controls */}
                <div className="flex justify-between items-center mb-14 w-full max-w-4xl relative h-[48px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[14px] py-2.5 px-6 flex items-center gap-3 rounded-full tracking-wide transition-all z-10",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:-translate-x-2"
                        )}
                    >
                        ← <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full mt-12 md:mt-0 md:relative md:left-auto md:translate-x-0 md:flex-1 md:flex justify-center pointer-events-none">
                        <span className="inline-block bg-white/90 text-slate-800 border border-slate-200/60 px-6 py-2 rounded-full text-[13px] font-black tracking-[0.2em] uppercase shadow-sm backdrop-blur-md pointer-events-auto">
                            QUESTION {currentQuestion.id}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[14px] py-2.5 px-6 flex items-center gap-3 rounded-full tracking-wide transition-all z-10",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:translate-x-2"
                        )}
                    >
                        <span className="hidden sm:inline">Next</span> →
                    </button>
                </div>

                {/* Question Text */}
                <h1 className="text-[32px] md:text-[44px] font-[900] text-slate-900 text-center mb-16 whitespace-pre-line w-full max-w-5xl leading-[1.3] tracking-tight drop-shadow-sm">
                    {currentQuestion.text}
                </h1>

                {/* Premium Glass Recording Area */}
                <div className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                    {error && (
                        <div className="mb-8 p-5 bg-rose-50 backdrop-blur-md text-rose-600 rounded-2xl border border-rose-100 text-sm font-medium animate-in fade-in slide-in-from-top-2 shadow-sm w-full max-w-2xl mx-auto">
                            {error}
                        </div>
                    )}

                    {!audioUrl && !isAnalyzing && !results && (
                        <>
                            <p className="text-slate-500 text-[16px] mb-12 font-medium tracking-wide relative z-10">
                                {isRecording ? "Recording... Click to stop" : "Click the mic icon to start recording your answer"}
                            </p>

                            {/* Mic Button - Liquid Glass Glow */}
                            <div className="relative w-[120px] h-[120px] mx-auto mb-10 z-10">
                                <div className={cn(
                                    "absolute inset-0 rounded-full blur-2xl opacity-30",
                                    isRecording ? "bg-rose-400 animate-pulse" : "bg-emerald-400 animate-pulse"
                                )} />
                                <button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={cn(
                                        "absolute inset-0 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group border-2 border-white/60 backdrop-blur-md",
                                        isRecording
                                            ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/20 hover:scale-105"
                                            : "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/20 hover:scale-105 active:scale-95"
                                    )}
                                >
                                    {isRecording ? (
                                        <Square className="w-[40px] h-[40px] text-white fill-white drop-shadow-sm" strokeWidth={2} />
                                    ) : (
                                        <Mic className="w-[48px] h-[48px] text-white group-hover:scale-110 transition-transform drop-shadow-lg" strokeWidth={2.5} />
                                    )}
                                </button>
                            </div>

                            <p className="text-[13px] font-bold tracking-widest text-slate-400 uppercase mb-8 relative z-10">
                                Timer: <span className={cn("font-mono text-[15px]", isRecording ? "text-rose-500" : "text-slate-600")}>{formatTime(timeLeft)}</span>
                            </p>
                        </>
                    )}

                    {audioUrl && !isAnalyzing && !results && (
                        <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
                            <p className="text-slate-500 text-[16px] mb-8 font-semibold tracking-wide">
                                Recording complete! Listen back or analyze
                            </p>

                            <div className="flex flex-col gap-6 max-w-md mx-auto mb-10">
                                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-full p-2 shadow-sm">
                                    <audio src={audioUrl} controls className="w-full h-12 outline-none" />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={resetRecording}
                                        className="flex-1 bg-white/60 hover:bg-white text-slate-600 font-bold py-3.5 px-4 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
                                    >
                                        <Trash2 className="w-5 h-5" /> Redo
                                    </button>
                                    <button
                                        onClick={handleAnalysis}
                                        className="flex-[2] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95 border border-white/20"
                                    >
                                        Analyze Answer <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="relative z-10 py-16 flex flex-col items-center animate-in fade-in duration-700">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-blue-300 rounded-full blur-2xl opacity-40 animate-pulse" />
                                <div className="bg-white/80 border border-white/60 p-5 rounded-3xl backdrop-blur-md shadow-md relative z-10">
                                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" strokeWidth={2.5} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Analyzing your answer...</h3>
                            <p className="text-slate-500 font-medium text-lg">Using AI to evaluate your speaking</p>
                        </div>
                    )}

                    {results && (
                        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl mx-auto text-left">

                            {/* Top Accuracy Section */}
                            <div className="flex flex-col items-center justify-center mb-10 border-b border-slate-200/50 pb-10">
                                <div className="relative w-24 h-24 mb-3">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                        <circle
                                            cx="50" cy="50" r="45" fill="none" stroke="#FF8C00" strokeWidth="8"
                                            strokeDasharray="282.7"
                                            strokeDashoffset={282.7 - (282.7 * (results.accuracyPercentage || 0)) / 100}
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold text-slate-800">{results.accuracyPercentage || 0}%</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-slate-600 tracking-wide uppercase">Accuracy</span>
                            </div>

                            {/* Transcripts Section - Glass Panel */}
                            <div className="mb-12 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:bg-white/80 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                                <p className="text-base font-semibold text-slate-700 mb-4 inline-flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Polished transcript:
                                </p>
                                <div className="flex gap-3 mb-6 relative z-10">
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                                        <Play className="w-4 h-4" /> Male
                                    </button>
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                                        <Play className="w-4 h-4" /> Female
                                    </button>
                                </div>
                                <p className="text-slate-800 text-[18px] md:text-[20px] leading-relaxed mb-10 font-medium relative z-10">
                                    {results.polishedTranscript}
                                </p>

                                <div className="pt-8 border-t border-slate-200/60 relative z-10">
                                    <p className="text-base font-semibold text-slate-700 mb-6 inline-flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Actual audio transcript:
                                    </p>
                                    <div className="flex flex-wrap gap-x-2 gap-y-4 mb-4">
                                        {results.wordAnalysis?.map((item: any, idx: number) => {
                                            let colorClass = "text-emerald-500 drop-shadow-sm";
                                            let percentColor = "text-emerald-600/80";
                                            if (item.status === "minor_error") {
                                                colorClass = "text-amber-500 drop-shadow-sm";
                                                percentColor = "text-amber-600/80";
                                            } else if (item.status === "major_error") {
                                                colorClass = "text-rose-500 font-bold drop-shadow-sm";
                                                percentColor = "text-rose-600/80";
                                            }

                                            return (
                                                <div key={idx} className="flex flex-col items-center group relative cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                                                    <span className={cn("text-[11px] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5", percentColor)}>
                                                        {item.percentage}%
                                                    </span>
                                                    <span className={cn("text-[18px] md:text-[20px] font-bold tracking-wide", colorClass)}>
                                                        {item.word}
                                                    </span>
                                                    {item.tip && (
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-[13px] px-4 py-2.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 group-hover:-translate-y-2 z-30 text-center font-medium">
                                                            {item.tip}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-200" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-sm text-slate-400 italic text-center w-full mt-8">Tips: Click on each word to see feedback.</p>
                                </div>
                            </div>

                            {/* Score Card Container - Light Glass */}
                            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] mb-12 relative group/card">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

                                {/* Overall Band Hero */}
                                <div className="py-16 flex flex-col items-center border-b border-slate-200/50 relative z-10 bg-white/30 backdrop-blur-sm">
                                    <h3 className="text-xl text-slate-500 font-bold tracking-widest uppercase mb-6">Overall Band Score</h3>
                                    <div className="flex flex-col items-center bg-white/60 backdrop-blur-md border border-slate-200 shadow-sm px-12 py-8 rounded-3xl relative group hover:bg-white transition-colors duration-500">
                                        <div className="absolute inset-0 bg-orange-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="text-[96px] md:text-[120px] font-black text-[#FF8C00] leading-none mb-2 drop-shadow-sm">
                                            {results.overallBand?.toFixed(1) || results.bandScore}
                                        </div>
                                        <div className="text-lg font-bold text-slate-400 tracking-wider">(+/- 0.5)</div>
                                    </div>
                                    <button className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 border border-slate-200">
                                        Export Result to Word <Upload className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Vocabulary Bars */}
                                <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-slate-200/50 relative z-10">
                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 backdrop-blur-md rounded-2xl p-6 text-center border border-yellow-200/60 shadow-sm hover:shadow-md hover:border-yellow-300 transition-all duration-300">
                                        <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-1">Vocabulary Complexity</p>
                                        <p className="text-xl md:text-2xl font-black text-slate-800 drop-shadow-sm mb-2">{results.vocabulary?.complexity?.level || "Evaluating..."}</p>
                                        <p className="text-sm font-medium text-slate-600">{results.vocabulary?.complexity?.feedback || ""}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 backdrop-blur-md rounded-2xl p-6 text-center border border-indigo-200/60 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300">
                                        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Vocabulary Repetition</p>
                                        <p className="text-lg md:text-xl font-bold text-slate-800 drop-shadow-sm">{results.vocabulary?.repetition?.feedback || "Evaluating..."}</p>
                                    </div>
                                </div>

                                {/* Criteria Details */}
                                <div className="p-6 md:p-10 flex flex-col gap-8 divide-y divide-slate-200/50 relative z-10">
                                    {results.criteria && Object.entries(results.criteria).map(([key, item]: [string, any]) => {
                                        let title = "Criterion";
                                        if (key === "taskResponse") title = "Task Response";
                                        if (key === "fluency") title = "Fluency & Coherence";
                                        if (key === "lexical") title = "Lexical Resource";
                                        if (key === "grammar") title = "Grammatical Range & Accuracy";
                                        if (key === "pronunciation") title = "Pronunciation";

                                        // Fallback if the AI uses the old structure
                                        const score = item.score || item.band;
                                        const feedback = item.feedback || "Feedback not provided.";

                                        return (
                                            <div key={key} className="flex flex-col items-center text-center pt-8 pb-4 first:pt-4 group">
                                                <h4 className="text-lg md:text-xl font-bold text-slate-700 tracking-wider mb-2">{title}</h4>
                                                <div className="text-[40px] md:text-[48px] font-black text-[#FF8C00] mb-4 drop-shadow-sm group-hover:scale-110 group-hover:text-orange-500 transition-all duration-500">{score?.toFixed(1) || "-.*"}</div>
                                                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-4xl font-medium">{feedback}</p>
                                            </div>
                                        );
                                    })}

                                    {(!results.criteria && results.breakdown) && Object.entries(results.breakdown).map(([key, score]: [string, any]) => (
                                        <div key={key} className="flex flex-col items-center text-center pt-8 pb-4 first:pt-4 group">
                                            <h4 className="text-lg md:text-xl font-bold text-slate-700 tracking-wider capitalize mb-2">{key}</h4>
                                            <div className="text-[40px] md:text-[48px] font-black text-[#FF8C00] mb-4 drop-shadow-sm group-hover:scale-110 group-hover:text-orange-500 transition-all duration-500">{Number(score).toFixed(1) || score}</div>
                                            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-4xl font-medium">{results.feedback}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Audio Player and Answer Playback - Light Glass */}
                            <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden mb-12 w-full relative group hover:bg-white/80 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                                <div className="px-6 py-4 border-b border-slate-200/50 bg-white/40 flex items-center relative z-10">
                                    <span className="text-sm font-bold text-slate-600 uppercase tracking-widest bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">Question 1 Answer</span>
                                </div>
                                <div className="p-8 md:p-12 text-center flex flex-col items-center relative z-10">
                                    <p className="text-lg md:text-xl font-medium text-slate-800 mb-12 max-w-4xl leading-relaxed">
                                        {results.polishedTranscript || "Your answer was recorded successfully."}
                                    </p>

                                    <div className="bg-white/50 backdrop-blur-md border border-slate-200 rounded-full px-8 py-4 flex items-center justify-center min-w-[350px] gap-6 mb-6 relative shadow-sm">
                                        {audioUrl && <audio src={audioUrl} controls className="h-12 w-full outline-none max-w-[300px]" />}
                                        <button onClick={resetRecording} className="absolute -right-4 -top-4 bg-rose-500 text-white border border-rose-400 rounded-full p-2.5 shadow-lg shadow-rose-500/20 hover:scale-110 hover:bg-rose-600 transition-all duration-300 z-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="w-full max-w-md text-center mb-10">
                                        <span className="text-[13px] font-bold tracking-widest text-slate-400 uppercase">Speaking Time: {formatTime(timeLeft)}</span>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-6">
                                        <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all hover:-translate-y-1 active:scale-95 font-bold text-base border border-teal-400/50 backdrop-blur-sm">
                                            Improve Naturalness
                                        </button>
                                        <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3.5 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all hover:-translate-y-1 active:scale-95 font-bold text-base border border-purple-400/50 backdrop-blur-sm">
                                            Enhance Speech
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!audioUrl && !isAnalyzing && !results && (
                        <button className="relative z-10 bg-white/60 hover:bg-white/90 text-slate-600 hover:text-slate-900 font-bold text-[14px] py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 mx-auto transition-all border border-white/80 shadow-sm hover:shadow-lg">
                            Or upload an audio file <Upload className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                    )}
                </div>

                {/* Mobile Extra padding */}
                <div className="h-16"></div>
            </main>
        </div>
    );
}
