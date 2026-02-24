"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import type { ListeningPart } from "@/types/listening";
import {
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    Play,
    Headphones,
    Clock,
    BookOpen,
    ChevronRight,
    Volume2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Part Section Component
// ─────────────────────────────────────────────
function ListeningPartSection({
    part,
    answers,
    onAnswerChange,
    isSubmitted,
}: {
    part: ListeningPart;
    answers: Record<string, string>;
    onAnswerChange: (id: string, value: string) => void;
    isSubmitted: boolean;
}) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleInput = (e: Event) => {
            if (isSubmitted) { e.preventDefault(); return; }
            const target = e.target as HTMLInputElement;
            if (target?.tagName === "INPUT" && target.id.startsWith("q-")) {
                const questionId = target.id.replace("q-", "");
                onAnswerChange(questionId, target.value);
                target.classList.toggle("border-blue-500", target.value.trim() !== "");
                target.classList.toggle("bg-blue-50/50", target.value.trim() !== "");
            }
        };
        const container = contentRef.current;
        container?.addEventListener("input", handleInput);
        return () => container?.removeEventListener("input", handleInput);
    }, [isSubmitted, onAnswerChange]);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;
        part.questions.filter((q) => q.type === "fill-blank").forEach((q) => {
            const input = container.querySelector(`#q-${q.id}`) as HTMLInputElement;
            if (!input) return;
            input.value = answers[q.id.toString()] || "";
            input.disabled = isSubmitted;
            if (isSubmitted) {
                const correct = input.value.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase();
                input.classList.toggle("border-green-500", correct);
                input.classList.toggle("bg-green-50", correct);
                input.classList.toggle("text-green-700", correct);
                input.classList.toggle("border-red-500", !correct);
                input.classList.toggle("bg-red-50", !correct);
                input.classList.toggle("text-red-700", !correct);
                if (!correct && !input.nextElementSibling?.classList.contains("correction")) {
                    const span = document.createElement("span");
                    span.className = "correction text-xs text-red-600 font-bold ml-2 bg-red-100 px-2 py-0.5 rounded";
                    span.textContent = `✓ ${q.correctAnswer}`;
                    input.parentNode?.insertBefore(span, input.nextSibling);
                }
            }
        });
    }, [isSubmitted, answers, part.questions]);

    return (
        <div className="mb-8">
            <div className="bg-[#2980b9] text-white px-5 py-3 rounded-t-xl font-bold text-base">
                {part.title}
            </div>
            <div className="bg-[#eef5f9] border border-[#c8dff0] border-t-0 px-5 py-3 text-sm text-slate-700 rounded-b-xl mb-6">
                {part.instructions}
            </div>
            <div className="px-1">
                <div
                    ref={contentRef}
                    className="prose prose-slate max-w-none text-slate-800"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />
                {part.questions.filter((q) => q.type === "multiple-choice").length > 0 && (
                    <div className="mt-8 space-y-6">
                        {part.questions.filter((q) => q.type === "multiple-choice").map((q) => {
                            const isCorrect = isSubmitted && answers[q.id.toString()] === q.correctAnswer.toString();
                            const isWrong = isSubmitted && answers[q.id.toString()] !== q.correctAnswer.toString();
                            return (
                                <div key={q.id} className={cn(
                                    "p-5 rounded-xl border-2",
                                    isCorrect ? "border-green-300 bg-green-50/30" :
                                        isWrong ? "border-red-300 bg-red-50/30" :
                                            "border-slate-100 bg-slate-50/50"
                                )}>
                                    <h4 className="font-bold text-base mb-4 flex gap-3">
                                        <span className={cn(
                                            "flex-none w-8 h-8 flex items-center justify-center rounded-lg text-sm bg-white border",
                                            isCorrect ? "text-green-700 border-green-300" :
                                                isWrong ? "text-red-700 border-red-300" :
                                                    "text-slate-700 border-slate-300"
                                        )}>{q.id}</span>
                                        <span className="leading-tight pt-1">{q.text}</span>
                                    </h4>
                                    <div className="space-y-2.5 pl-11">
                                        {q.options?.map((opt, idx) => {
                                            const isSelected = answers[q.id.toString()] === idx.toString();
                                            const isCorrectOpt = idx.toString() === q.correctAnswer.toString();
                                            return (
                                                <label key={idx} className={cn(
                                                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                                    isSelected && !isSubmitted ? "bg-blue-50 border-blue-300 shadow-sm" : "bg-white border-slate-200 hover:border-blue-200",
                                                    isSubmitted && isCorrectOpt ? "bg-green-100 border-green-400" : "",
                                                    isSubmitted && isSelected && !isCorrectOpt ? "bg-red-100 border-red-400" : ""
                                                )}>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0",
                                                        isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300",
                                                        isSubmitted && isCorrectOpt ? "border-green-600 bg-green-600" : "",
                                                        isSubmitted && isSelected && !isCorrectOpt ? "border-red-600 bg-red-600" : ""
                                                    )}>
                                                        {(isSelected || (isSubmitted && isCorrectOpt)) && (
                                                            <div className="w-2 h-2 bg-white rounded-full" />
                                                        )}
                                                    </div>
                                                    <input type="radio" name={`q-${q.id}`} className="hidden"
                                                        checked={isSelected}
                                                        onChange={() => !isSubmitted && onAnswerChange(q.id.toString(), idx.toString())}
                                                    />
                                                    <span className="font-medium text-sm text-slate-700">
                                                        <span className="mr-2 font-bold opacity-40">{String.fromCharCode(65 + idx)}.</span>
                                                        {opt}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ListeningTestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: testId } = use(params);
    const testData = LISTENING_TESTS[testId];

    const [started, setStarted] = useState(false);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerChange = (id: string, value: string) =>
        setAnswers((prev) => ({ ...prev, [id]: value }));

    const handleSubmit = () => {
        if (!testData) return;
        let s = 0;
        testData.parts.forEach((part) =>
            part.questions.forEach((q) => {
                const ua = answers[q.id.toString()];
                if (!ua) return;
                if (q.type === "fill-blank" && ua.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase()) s++;
                if (q.type === "multiple-choice" && ua === q.correctAnswer.toString()) s++;
            })
        );
        setScore(s);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!testData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4">
                <AlertCircle className="w-14 h-14 text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Not Found</h2>
                <Link href="/practice/listening">
                    <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold">
                        ← Return to Library
                    </button>
                </Link>
            </div>
        );
    }

    const totalQuestions = testData.parts.reduce((a, p) => a + p.questions.length, 0);
    const currentPart = testData.parts[currentPartIndex];
    const answeredCount = Object.values(answers).filter((v) => v !== "").length;

    // ── PRE-START SCREEN ──────────────────────────────────────────────────
    if (!started) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
                {/* Top bar */}
                <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
                    <Link href="/practice/listening">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    </Link>
                    <span className="text-slate-300">|</span>
                    <span className="font-bold text-slate-800 text-sm">{testData.title}</span>
                </div>

                <div className="flex-1 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-xl"
                    >
                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                            {/* Gradient top */}
                            <div className="bg-gradient-to-br from-[#1a1060] via-[#2d1b8e] to-[#4c1d95] p-10 text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10"
                                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                                />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur">
                                        <Headphones className="w-10 h-10 text-white" />
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{testData.title}</h1>
                                    <p className="text-purple-200 text-sm">IELTS Academic · Listening Section</p>
                                </div>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                                {[
                                    { icon: Clock, label: "Duration", value: "~30 min" },
                                    { icon: BookOpen, label: "Questions", value: "40" },
                                    { icon: Volume2, label: "Sections", value: `${testData.parts.length}` },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="py-5 text-center">
                                        <Icon className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
                                        <div className="text-xl font-extrabold text-slate-800">{value}</div>
                                        <div className="text-[11px] text-slate-400 font-medium">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Instructions */}
                            <div className="p-6 space-y-3">
                                <p className="text-slate-500 text-sm font-medium mb-4">Before you begin:</p>
                                {[
                                    "Listen carefully — audio plays only once in the real exam",
                                    "Complete all 4 sections in order",
                                    "Fill in blanks with ONE WORD AND/OR A NUMBER unless stated otherwise",
                                    "You can submit your answers at the end of Part 4",
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm text-slate-600">{tip}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="px-6 pb-6">
                                <button
                                    onClick={() => setStarted(true)}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-purple-400/30 transition-all duration-200 flex items-center justify-center gap-3 group"
                                >
                                    <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                                    Start Test
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-3">
                                    Audio player will appear after you start
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ── TEST SCREEN ───────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans pb-32">
            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <Link href="/practice/listening">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    </Link>
                    <span className="text-slate-300 text-sm">|</span>
                    <h1 className="font-bold text-slate-800 text-sm">{testData.title}</h1>
                </div>
                <div className="text-xs text-slate-400 font-medium hidden sm:block">
                    {answeredCount}/{totalQuestions} answered
                </div>
            </div>

            <main className="flex-1 max-w-[900px] w-full mx-auto px-4 md:px-6 py-6">

                {/* Score banner */}
                <AnimatePresence>
                    {isSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border-2 border-green-500 p-6 rounded-2xl mb-6 shadow-sm text-center"
                        >
                            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">Test Completed!</h2>
                            <p className="text-slate-400 text-sm mb-4">{testData.title}</p>
                            <div className="text-5xl font-black text-green-600 mb-1">
                                {score} <span className="text-2xl text-slate-400">/ {totalQuestions}</span>
                            </div>
                            <p className="font-bold text-slate-600 text-sm">
                                Accuracy: {Math.round((score / totalQuestions) * 100)}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Audio Player — shown only after start */}
                <AnimatePresence>
                    {started && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#2c3a4a] rounded-2xl shadow-lg px-6 py-5 mb-6"
                        >
                            <p className="text-white/50 text-xs text-center mb-2 font-medium tracking-wide uppercase">
                                Audio Player
                            </p>
                            {currentPart.audioUrl ? (
                                <audio
                                    key={currentPart.audioUrl}
                                    controls
                                    src={currentPart.audioUrl}
                                    className="w-full max-w-2xl mx-auto block h-10 mb-2"
                                    preload="metadata"
                                />
                            ) : (
                                <p className="text-white/30 text-sm text-center mb-2 italic">No audio for this section</p>
                            )}
                            <p className="text-white/50 text-xs text-center">Playing: {currentPart.title}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Questions */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-7">
                    <ListeningPartSection
                        part={currentPart}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                        isSubmitted={isSubmitted}
                    />

                    {/* Nav buttons */}
                    <div className="flex justify-between items-center mt-10 pt-5 border-t border-slate-100">
                        <button
                            onClick={() => setCurrentPartIndex((i) => Math.max(0, i - 1))}
                            disabled={currentPartIndex === 0}
                            className="bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-1.5"
                        >
                            ← Previous
                        </button>
                        {currentPartIndex < testData.parts.length - 1 ? (
                            <button
                                onClick={() => setCurrentPartIndex((i) => Math.min(testData.parts.length - 1, i + 1))}
                                className="bg-[#2980b9] hover:bg-[#2471a3] text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-1.5"
                            >
                                Next Part →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-md"
                            >
                                {isSubmitted ? "Submitted ✓" : "Submit Test"}
                            </button>
                        )}
                    </div>
                </div>
            </main>

            {/* ── Fixed bottom nav ── */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                <div className="max-w-[900px] mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
                    {/* Part tabs */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {testData.parts.map((part, pIdx) => {
                            const partQIds = part.questions.map((q) => q.id.toString());
                            const answered = partQIds.filter((id) => answers[id] && answers[id] !== "").length;
                            const isActive = pIdx === currentPartIndex;
                            return (
                                <button
                                    key={part.id}
                                    onClick={() => setCurrentPartIndex(pIdx)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                        isActive
                                            ? "bg-[#2980b9] text-white border-[#2980b9] shadow-sm"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-[#2980b9] hover:text-[#2980b9]"
                                    )}
                                >
                                    {part.title.replace("SECTION ", "Part ")}
                                    <span className={cn(
                                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {answered}/{partQIds.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Question dots */}
                    <div className="flex items-center gap-0.5 flex-wrap justify-end max-w-[55%]">
                        {currentPart.questions.map((q) => {
                            const answered = answers[q.id.toString()] && answers[q.id.toString()] !== "";
                            let dot = "bg-slate-200";
                            if (isSubmitted) {
                                const correct = q.type === "fill-blank"
                                    ? answers[q.id.toString()]?.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase()
                                    : answers[q.id.toString()] === q.correctAnswer.toString();
                                dot = correct ? "bg-emerald-500" : "bg-red-400";
                            } else if (answered) {
                                dot = "bg-[#2980b9]";
                            }
                            return (
                                <div key={q.id} title={`Q${q.id}`}
                                    className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white transition-colors", dot)}>
                                    {q.id}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Progress */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
