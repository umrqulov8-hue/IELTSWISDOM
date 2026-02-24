"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import type { ListeningPart } from "@/types/listening";
import { AlertCircle, CheckCircle2, ChevronLeft, Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Part Section
// ─────────────────────────────────────────────
function ListeningPartSection({
    part, answers, onAnswerChange, isSubmitted,
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
            const t = e.target as HTMLInputElement;
            if (t?.tagName === "INPUT" && t.id.startsWith("q-")) {
                onAnswerChange(t.id.replace("q-", ""), t.value);
            }
        };
        const el = contentRef.current;
        el?.addEventListener("input", handleInput);
        return () => el?.removeEventListener("input", handleInput);
    }, [isSubmitted, onAnswerChange]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        part.questions.filter(q => q.type === "fill-blank").forEach(q => {
            const input = el.querySelector(`#q-${q.id}`) as HTMLInputElement;
            if (!input) return;
            input.value = answers[q.id.toString()] || "";
            input.disabled = isSubmitted;
            if (isSubmitted) {
                const ok = input.value.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase();
                input.style.borderBottom = ok ? "2px solid #22c55e" : "2px solid #ef4444";
                input.style.color = ok ? "#15803d" : "#b91c1c";
                if (!ok && !input.nextElementSibling?.classList.contains("corr")) {
                    const sp = document.createElement("span");
                    sp.className = "corr text-[11px] text-red-500 font-bold ml-1";
                    sp.textContent = `✓${q.correctAnswer}`;
                    input.parentNode?.insertBefore(sp, input.nextSibling);
                }
            }
        });
    }, [isSubmitted, answers, part.questions]);

    return (
        <div>
            {/* Section header */}
            <div className="flex items-baseline gap-4 mb-5">
                <h2 className="text-2xl font-black text-slate-700 tracking-tight">{part.title}</h2>
                <span className="text-base text-slate-400 font-medium">{part.instructions}</span>
            </div>

            {/* Glass content card */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
                <div
                    ref={contentRef}
                    className="prose prose-slate max-w-none text-slate-700 prose-p:my-1 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />

                {/* Multiple choice */}
                {part.questions.filter(q => q.type === "multiple-choice").length > 0 && (
                    <div className="mt-8 space-y-5">
                        {part.questions.filter(q => q.type === "multiple-choice").map(q => {
                            const isCorrect = isSubmitted && answers[q.id.toString()] === q.correctAnswer.toString();
                            const isWrong = isSubmitted && answers[q.id.toString()] !== q.correctAnswer.toString();
                            return (
                                <div key={q.id} className={cn(
                                    "p-4 rounded-xl border backdrop-blur-sm transition-colors",
                                    isCorrect ? "border-green-300/60 bg-green-50/40" :
                                        isWrong ? "border-red-300/60 bg-red-50/40" :
                                            "border-white/40 bg-white/20"
                                )}>
                                    <p className="font-bold text-slate-700 mb-3 flex gap-2">
                                        <span className="text-slate-400 font-mono text-sm mt-0.5">{q.id}.</span>
                                        {q.text}
                                    </p>
                                    <div className="space-y-2 pl-5">
                                        {q.options?.map((opt, idx) => {
                                            const sel = answers[q.id.toString()] === idx.toString();
                                            const correctOpt = idx.toString() === q.correctAnswer.toString();
                                            return (
                                                <label key={idx} className={cn(
                                                    "flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all text-sm",
                                                    sel && !isSubmitted ? "bg-white/60 border-slate-300 shadow-sm" : "bg-white/20 border-white/30 hover:bg-white/40",
                                                    isSubmitted && correctOpt ? "bg-green-100/50 border-green-300" : "",
                                                    isSubmitted && sel && !correctOpt ? "bg-red-100/50 border-red-300" : "",
                                                )}>
                                                    <div className={cn(
                                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                                        sel ? "border-slate-600 bg-slate-600" : "border-slate-300",
                                                        isSubmitted && correctOpt ? "border-green-500 bg-green-500" : "",
                                                        isSubmitted && sel && !correctOpt ? "border-red-500 bg-red-500" : "",
                                                    )}>
                                                        {(sel || (isSubmitted && correctOpt)) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                    </div>
                                                    <input type="radio" name={`q-${q.id}`} className="hidden"
                                                        checked={sel}
                                                        onChange={() => !isSubmitted && onAnswerChange(q.id.toString(), idx.toString())}
                                                    />
                                                    <span className="text-slate-700">
                                                        <span className="text-slate-400 mr-1 font-semibold">{String.fromCharCode(65 + idx)}.</span>
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
        setAnswers(p => ({ ...p, [id]: value }));

    const handleSubmit = () => {
        if (!testData) return;
        let s = 0;
        testData.parts.forEach(part =>
            part.questions.forEach(q => {
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
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center">
                <div>
                    <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Not Found</h2>
                    <Link href="/practice/listening">
                        <button className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold">← Back</button>
                    </Link>
                </div>
            </div>
        );
    }

    const totalQ = testData.parts.reduce((a, p) => a + p.questions.length, 0);
    const currentPart = testData.parts[currentPartIndex];
    const answeredCount = Object.values(answers).filter(v => v !== "").length;

    // ── PRE-START ──────────────────────────────────────────────────────
    if (!started) {
        return (
            <div className="liquid-bg min-h-screen flex flex-col">
                <div className="glass-topbar sticky top-0 z-30 px-5 py-3 flex items-center gap-3">
                    <Link href="/practice/listening">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    </Link>
                    <span className="text-slate-300">|</span>
                    <span className="font-bold text-slate-700 text-sm">{testData.title}</span>
                </div>

                <div className="flex-1 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md"
                    >
                        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-8 text-center border-b border-white/30">
                                <div className="w-16 h-16 glass-pill rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🎧</span>
                                </div>
                                <h1 className="text-xl font-extrabold text-slate-800 mb-1">{testData.title}</h1>
                                <p className="text-slate-500 text-sm">IELTS Academic · Listening</p>
                            </div>

                            <div className="grid grid-cols-3 divide-x divide-white/30 border-b border-white/30">
                                {[["~30 min", "Duration"], ["40", "Questions"], [`${testData.parts.length}`, "Sections"]].map(([v, l]) => (
                                    <div key={l} className="py-4 text-center">
                                        <div className="text-2xl font-black text-slate-800">{v}</div>
                                        <div className="text-[11px] text-slate-400 font-medium">{l}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 space-y-2.5">
                                {["Listen once — pay attention to every detail",
                                    "Complete 4 sections with 10 questions each",
                                    "ONE WORD AND/OR A NUMBER unless stated"].map((tip, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 glass-pill rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0 mt-0.5">{i + 1}</span>
                                            <p className="text-sm text-slate-600">{tip}</p>
                                        </div>
                                    ))}
                            </div>

                            <div className="px-6 pb-6">
                                <button
                                    onClick={() => setStarted(true)}
                                    className="w-full py-4 glass-pill-dark rounded-2xl font-bold text-base text-white transition-all flex items-center justify-center gap-3 group shadow-lg"
                                >
                                    <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                                    Start Test
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-2.5">Audio player appears after you start</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <style>{liquidStyles}</style>
            </div>
        );
    }

    // ── TEST SCREEN ────────────────────────────────────────────────────
    return (
        <div className="liquid-bg min-h-screen flex flex-col pb-28">

            {/* Global styles */}
            <style>{liquidStyles}</style>

            {/* Top bar */}
            <div className="glass-topbar sticky top-0 z-30 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/practice/listening">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    </Link>
                    <span className="text-slate-300 text-sm">|</span>
                    <span className="font-bold text-slate-700 text-sm">{testData.title}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{answeredCount}/{totalQ}</span>
            </div>

            <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-10 py-6 space-y-5">

                {/* Score */}
                <AnimatePresence>
                    {isSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 text-center"
                        >
                            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                            <h2 className="text-xl font-bold text-slate-800 mb-1">Test Completed!</h2>
                            <div className="text-4xl font-black text-slate-800 my-2">
                                {score} <span className="text-xl text-slate-400">/ {totalQ}</span>
                            </div>
                            <p className="text-slate-500 text-sm">Accuracy: {Math.round((score / totalQ) * 100)}%</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Audio Player */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-audio rounded-2xl px-6 py-4"
                >
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest text-center mb-2 font-semibold">
                        Audio Player
                    </p>
                    {currentPart.audioUrl ? (
                        <audio
                            key={currentPart.audioUrl}
                            controls
                            src={currentPart.audioUrl}
                            className="w-full max-w-2xl mx-auto block h-9"
                            preload="metadata"
                        />
                    ) : (
                        <p className="text-slate-400 text-sm text-center italic">No audio for this section</p>
                    )}
                    <p className="text-slate-400 text-xs text-center mt-2">Playing: {currentPart.title}</p>
                </motion.div>

                {/* Questions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPartIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ListeningPartSection
                            part={currentPart}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            isSubmitted={isSubmitted}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-2">
                    <button
                        onClick={() => setCurrentPartIndex(i => Math.max(0, i - 1))}
                        disabled={currentPartIndex === 0}
                        className="glass-pill px-5 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 disabled:opacity-30 transition-all"
                    >
                        ← Previous
                    </button>
                    {currentPartIndex < testData.parts.length - 1 ? (
                        <button
                            onClick={() => setCurrentPartIndex(i => Math.min(testData.parts.length - 1, i + 1))}
                            className="glass-pill-dark px-5 py-2.5 rounded-2xl text-sm font-bold text-white transition-all"
                        >
                            Next Part →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitted}
                            className="glass-pill-dark px-6 py-2.5 rounded-2xl text-sm font-bold text-white disabled:opacity-40 transition-all"
                        >
                            {isSubmitted ? "Submitted ✓" : "Submit Test"}
                        </button>
                    )}
                </div>
            </main>

            {/* ── Bottom Nav ── */}
            <div className="glass-bottombar fixed bottom-0 left-0 right-0 z-40 px-4 py-3">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3">
                    {/* Part pills */}
                    <div className="flex gap-2 flex-wrap">
                        {testData.parts.map((part, pIdx) => {
                            const pIds = part.questions.map(q => q.id.toString());
                            const answered = pIds.filter(id => answers[id] && answers[id] !== "").length;
                            const isActive = pIdx === currentPartIndex;
                            return (
                                <button
                                    key={part.id}
                                    onClick={() => setCurrentPartIndex(pIdx)}
                                    className={cn(
                                        "px-4 py-2 rounded-2xl text-sm font-bold transition-all border",
                                        isActive
                                            ? "glass-pill-dark text-white border-transparent shadow-md"
                                            : "glass-pill text-slate-600 border-white/40 hover:border-white/70"
                                    )}
                                >
                                    Part {pIdx + 1}
                                    {answered > 0 && (
                                        <span className={cn("ml-1.5 text-[10px]", isActive ? "text-white/70" : "text-slate-400")}>
                                            {answered}/{pIds.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Question dots */}
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                        {currentPart.questions.map(q => {
                            const answered = answers[q.id.toString()] && answers[q.id.toString()] !== "";
                            let cls = "bg-white/40 text-slate-400 border border-white/50";
                            if (isSubmitted) {
                                const ok = q.type === "fill-blank"
                                    ? answers[q.id.toString()]?.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase()
                                    : answers[q.id.toString()] === q.correctAnswer.toString();
                                cls = ok ? "bg-green-400/80 text-white border-green-300" : "bg-red-400/80 text-white border-red-300";
                            } else if (answered) {
                                cls = "bg-slate-600/70 text-white border-slate-500/50";
                            }
                            return (
                                <div key={q.id} title={`Q${q.id}`}
                                    className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold backdrop-blur-sm transition-all", cls)}>
                                    {q.id}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress */}
                <div className="max-w-[860px] mx-auto mt-2.5 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-slate-500 to-slate-700 rounded-full transition-all duration-500"
                        style={{ width: `${totalQ ? (answeredCount / totalQ) * 100 : 0}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const liquidStyles = `
  /* Liquid silver background */
  .liquid-bg {
    background: linear-gradient(135deg, #e8edf2 0%, #d4dce8 25%, #e2e8ef 50%, #cdd5e0 75%, #dde4ec 100%);
    position: relative;
    overflow-x: hidden;
  }
  .liquid-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 15% 30%, rgba(200,210,230,0.6) 0%, transparent 60%),
      radial-gradient(ellipse 60% 70% at 80% 70%, rgba(180,195,220,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 40% at 50% 10%, rgba(220,228,240,0.7) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 90% 20%, rgba(185,200,225,0.4) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
  .liquid-bg::after {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 30% at 20% 80%, rgba(210,220,240,0.5) 0%, transparent 50%),
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(195,210,230,0.35) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
  }
  .liquid-bg > * { position: relative; z-index: 1; }

  /* Glass card */
  .glass-card {
    background: rgba(255,255,255,0.45);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border: 1px solid rgba(255,255,255,0.65);
    box-shadow: 0 8px 32px rgba(100,120,160,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
  }

  /* Audio player glass */
  .glass-audio {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(24px) saturate(1.5);
    -webkit-backdrop-filter: blur(24px) saturate(1.5);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 4px 20px rgba(100,120,160,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
  }

  /* Top bar glass */
  .glass-topbar {
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 1px 12px rgba(100,120,160,0.06);
  }

  /* Bottom bar glass */
  .glass-bottombar {
    background: rgba(240,245,252,0.75);
    backdrop-filter: blur(28px) saturate(1.6);
    -webkit-backdrop-filter: blur(28px) saturate(1.6);
    border-top: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 -4px 24px rgba(100,120,160,0.08);
  }

  /* Pill glass (light) */
  .glass-pill {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 2px 8px rgba(100,120,160,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
    transition: all 0.2s;
  }
  .glass-pill:hover {
    background: rgba(255,255,255,0.7);
    box-shadow: 0 4px 16px rgba(100,120,160,0.1);
  }

  /* Pill glass (dark) */
  .glass-pill-dark {
    background: linear-gradient(135deg, rgba(60,70,90,0.85) 0%, rgba(40,50,70,0.9) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(40,50,80,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
    transition: all 0.2s;
  }
  .glass-pill-dark:hover {
    background: linear-gradient(135deg, rgba(70,80,105,0.9) 0%, rgba(50,60,85,0.95) 100%);
    box-shadow: 0 6px 24px rgba(40,50,80,0.35);
    transform: translateY(-1px);
  }

  /* Prose input styling */
  .prose input[type="text"] {
    border: none;
    border-bottom: 1.5px solid rgba(100,120,160,0.4);
    background: transparent;
    outline: none;
    padding: 0 4px;
    font-weight: 600;
    color: #1e293b;
    transition: border-color 0.2s;
  }
  .prose input[type="text"]:focus {
    border-bottom-color: rgba(60,80,120,0.7);
  }
`;
