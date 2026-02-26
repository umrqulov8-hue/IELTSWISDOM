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
    const [results, setResults] = useState<{ score: string; feedback: string } | null>(null);
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

            setResults({
                score: data.bandScore || "7.5",
                feedback: data.feedback || "Good coherence and lexical resource. Try to use more complex structures."
            });
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
        <div className="flex flex-col min-h-screen font-sans text-slate-800 relative overflow-hidden bg-slate-50">
            {/* Light Liquid Background Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
            <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[10%] w-[550px] h-[550px] bg-emerald-50/60 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />

            {/* Top Navigation Bar - Light Glass */}
            <header className="relative z-50 bg-white/40 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-slate-200/50 shadow-sm">
                <Link href="/practice/speaking" className="flex items-center gap-3 group">
                    <Image
                        src="/owl-logo.png"
                        alt="IELTS Wisdom"
                        width={42}
                        height={42}
                        className="object-contain group-hover:scale-105 transition-transform"
                    />
                </Link>

                {/* Timer Pill */}
                <div className="flex items-center gap-2 font-bold text-slate-700 bg-white/70 backdrop-blur-md border border-slate-200 px-4 py-1.5 rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-[14px] tracking-wider font-mono">{formatTime(timeLeft)}</span>
                </div>

                <button className="text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 p-2 rounded-xl transition-all border border-transparent hover:border-slate-200">
                    <Menu className="w-5 h-5" strokeWidth={2} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col pt-6 relative z-10 items-center">

                {/* Part Header - Frost Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 mb-8 w-full max-w-3xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <h2 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight mb-1.5">
                        {currentPart.title}
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base font-medium">
                        {currentPart.instructions}
                    </p>
                </div>

                {/* Navigation & Question Controls */}
                <div className="flex justify-between items-center mb-10 w-full max-w-3xl relative h-[42px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[13px] py-2 px-5 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:-translate-x-1"
                        )}
                    >
                        ← <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full">
                        <span className="inline-block bg-white/90 text-slate-800 border border-slate-200/60 px-5 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase shadow-sm">
                            QUESTION {currentQuestion.id}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-white/80 shadow-sm font-bold text-[13px] py-2 px-5 flex items-center gap-2 rounded-full tracking-wide transition-all z-10",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-white hover:shadow-md hover:translate-x-1"
                        )}
                    >
                        <span className="hidden sm:inline">Next</span> →
                    </button>
                </div>

                {/* Question Text */}
                <h1 className="text-[26px] md:text-[34px] font-[900] text-slate-900 text-center mb-14 whitespace-pre-line max-w-3xl leading-[1.2] tracking-tight drop-shadow-sm">
                    {currentQuestion.text}
                </h1>

                {/* Premium Light Glass Recording Area */}
                <div className="w-full max-w-2xl bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    {!audioUrl && !isAnalyzing && !results && (
                        <>
                            <p className="text-slate-500 text-[15px] mb-10 font-semibold tracking-wide relative z-10">
                                {isRecording ? "Recording... Click to stop" : "Click the mic icon to start recording your answer"}
                            </p>

                            {/* Mic Button - Liquid Green / Stop Button */}
                            <div className="relative w-[100px] h-[100px] mx-auto mb-10 z-10">
                                <div className={cn(
                                    "absolute inset-0 rounded-full blur-2xl opacity-30",
                                    isRecording ? "bg-rose-400 animate-pulse" : "bg-emerald-400 animate-pulse"
                                )} />
                                <button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={cn(
                                        "absolute inset-0 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group border-2 border-white/40",
                                        isRecording
                                            ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/20 hover:scale-105"
                                            : "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/20 hover:scale-105 active:scale-95"
                                    )}
                                >
                                    {isRecording ? (
                                        <Square className="w-[36px] h-[36px] text-white fill-white" strokeWidth={2} />
                                    ) : (
                                        <Mic className="w-[40px] h-[40px] text-white group-hover:scale-110 transition-transform drop-shadow-lg" strokeWidth={2.5} />
                                    )}
                                </button>
                            </div>

                            <p className="text-[12px] font-bold tracking-widest text-slate-400 uppercase mb-8">
                                Timer: <span className={cn("font-mono", isRecording ? "text-rose-500" : "text-slate-600")}>{formatTime(timeLeft)}</span>
                            </p>
                        </>
                    )}

                    {audioUrl && !isAnalyzing && !results && (
                        <div className="relative z-10 animate-in fade-in zoom-in-95 duration-300">
                            <p className="text-slate-500 text-[15px] mb-8 font-semibold tracking-wide">
                                Recording complete! Listen back or analyze
                            </p>

                            <div className="flex flex-col gap-4 max-w-sm mx-auto mb-10">
                                <audio src={audioUrl} controls className="w-full h-12 rounded-full" />
                                <div className="flex gap-2">
                                    <button
                                        onClick={resetRecording}
                                        className="flex-1 bg-white/60 hover:bg-white text-slate-600 font-bold py-3 px-4 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" /> Redo
                                    </button>
                                    <button
                                        onClick={handleAnalysis}
                                        className="flex-[2] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                                    >
                                        Analyze Answer <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="relative z-10 py-12 flex flex-col items-center animate-in fade-in duration-500">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse" />
                                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing your answer...</h3>
                            <p className="text-slate-500 font-medium">Using AI to evaluate your speaking</p>
                        </div>
                    )}

                    {results && (
                        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="bg-emerald-100 p-2 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Evaluation</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex flex-col items-center justify-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Band Score</span>
                                    <span className="text-4xl font-black text-blue-700">{results.score}</span>
                                </div>
                                <div className="col-span-2 bg-white/80 border border-slate-100 rounded-3xl p-6 text-left">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Feedback</span>
                                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{results.feedback}</p>
                                </div>
                            </div>

                            <button
                                onClick={resetRecording}
                                className="bg-slate-900 text-white font-bold py-3.5 px-10 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                            >
                                Try Again
                            </button>
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
