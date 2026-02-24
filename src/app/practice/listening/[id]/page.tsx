"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import type { ListeningPart } from "@/types/listening";
import { AlertCircle, CheckCircle2, ChevronLeft, Settings2, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Audio Player
// ─────────────────────────────────────────────
function AudioPlayerBar({
    audioUrl,
    partTitle,
}: {
    audioUrl?: string;
    partTitle: string;
}) {
    return (
        <div className="bg-[#2c3a4a] rounded-xl shadow-md px-6 py-5 mb-6">
            <h2 className="text-white font-semibold text-center text-sm tracking-wide mb-3">
                Audio Player
            </h2>
            {audioUrl ? (
                <div className="w-full max-w-2xl mx-auto mb-3">
                    <audio
                        key={audioUrl}
                        controls
                        src={audioUrl}
                        className="w-full h-10"
                        preload="metadata"
                    />
                </div>
            ) : (
                <div className="text-white/40 text-sm text-center mb-3 italic">
                    No audio available for this part
                </div>
            )}
            <p className="text-white/60 text-xs text-center">Playing: {partTitle}</p>
        </div>
    );
}

// ─────────────────────────────────────────────
// Part Section
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
            if (isSubmitted) {
                e.preventDefault();
                return;
            }
            const target = e.target as HTMLInputElement;
            if (target && target.tagName === "INPUT" && target.id.startsWith("q-")) {
                const questionId = target.id.replace("q-", "");
                onAnswerChange(questionId, target.value);
                if (target.value.trim() !== "") {
                    target.classList.add("border-blue-500", "bg-blue-50/50");
                } else {
                    target.classList.remove("border-blue-500", "bg-blue-50/50");
                }
            }
        };

        const container = contentRef.current;
        if (container) container.addEventListener("input", handleInput);
        return () => {
            if (container) container.removeEventListener("input", handleInput);
        };
    }, [isSubmitted, onAnswerChange]);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        part.questions
            .filter((q) => q.type === "fill-blank")
            .forEach((q) => {
                const input = container.querySelector(`#q-${q.id}`) as HTMLInputElement;
                if (input) {
                    input.value = answers[q.id.toString()] || "";
                    input.disabled = isSubmitted;

                    if (isSubmitted) {
                        const isCorrect =
                            input.value.trim().toLowerCase() ===
                            q.correctAnswer.toString().toLowerCase();
                        if (isCorrect) {
                            input.classList.remove("border-blue-500", "bg-blue-50/50", "border-black");
                            input.classList.add("border-green-500", "bg-green-50", "text-green-700");
                        } else {
                            input.classList.remove("border-blue-500", "bg-blue-50/50", "border-black");
                            input.classList.add("border-red-500", "bg-red-50", "text-red-700");
                            if (!input.nextElementSibling?.classList.contains("correction")) {
                                const correction = document.createElement("span");
                                correction.className =
                                    "correction text-xs text-red-600 font-bold ml-2 bg-red-100 px-2 py-0.5 rounded";
                                correction.textContent = `Correct: ${q.correctAnswer}`;
                                input.parentNode?.insertBefore(correction, input.nextSibling);
                            }
                        }
                    }
                }
            });
    }, [isSubmitted, answers, part.questions]);

    return (
        <div className="mb-8">
            {/* Part Header */}
            <div className="bg-[#2980b9] text-white px-5 py-3 rounded-t-lg font-bold text-base flex items-center">
                {part.title}
            </div>

            {/* Instructions */}
            <div className="bg-[#eef5f9] border border-[#c8dff0] border-t-0 px-5 py-3 text-sm text-slate-700 rounded-b-lg mb-6">
                {part.instructions}
            </div>

            {/* Content */}
            <div className="px-1 md:px-2">
                <div
                    ref={contentRef}
                    className="prose prose-slate max-w-none text-slate-800"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />

                {/* Multiple Choice */}
                {part.questions.filter((q) => q.type === "multiple-choice").length > 0 && (
                    <div className="mt-8 space-y-6">
                        {part.questions
                            .filter((q) => q.type === "multiple-choice")
                            .map((q) => {
                                const isAnswerCorrect =
                                    isSubmitted &&
                                    answers[q.id.toString()] === q.correctAnswer.toString();
                                const isAnswerWrong =
                                    isSubmitted &&
                                    answers[q.id.toString()] !== q.correctAnswer.toString();

                                return (
                                    <div
                                        key={q.id}
                                        className={cn(
                                            "p-5 rounded-xl border-2 transition-colors",
                                            isAnswerCorrect
                                                ? "border-green-300 bg-green-50/30"
                                                : isAnswerWrong
                                                    ? "border-red-300 bg-red-50/30"
                                                    : "border-slate-100 bg-slate-50/50"
                                        )}
                                    >
                                        <h4 className="font-bold text-base mb-4 flex gap-3">
                                            <span
                                                className={cn(
                                                    "flex-none w-8 h-8 flex items-center justify-center rounded-lg text-sm bg-white border",
                                                    isAnswerCorrect
                                                        ? "text-green-700 border-green-300"
                                                        : isAnswerWrong
                                                            ? "text-red-700 border-red-300"
                                                            : "text-slate-700 border-slate-300"
                                                )}
                                            >
                                                {q.id}
                                            </span>
                                            <span className="leading-tight pt-1">{q.text}</span>
                                        </h4>

                                        <div className="space-y-2.5 pl-11">
                                            {q.options?.map((opt, idx) => {
                                                const isSelected =
                                                    answers[q.id.toString()] === idx.toString();
                                                const isCorrectOption =
                                                    idx.toString() === q.correctAnswer.toString();

                                                return (
                                                    <label
                                                        key={idx}
                                                        className={cn(
                                                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all w-full",
                                                            isSelected && !isSubmitted
                                                                ? "bg-blue-50 border-blue-300 shadow-sm"
                                                                : "bg-white border-slate-200 hover:border-blue-200",
                                                            isSubmitted && isCorrectOption
                                                                ? "bg-green-100 border-green-400"
                                                                : "",
                                                            isSubmitted && isSelected && !isCorrectOption
                                                                ? "bg-red-100 border-red-400"
                                                                : ""
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0",
                                                                isSelected
                                                                    ? "border-blue-600 bg-blue-600"
                                                                    : "border-slate-300",
                                                                isSubmitted && isCorrectOption
                                                                    ? "border-green-600 bg-green-600"
                                                                    : "",
                                                                isSubmitted && isSelected && !isCorrectOption
                                                                    ? "border-red-600 bg-red-600"
                                                                    : ""
                                                            )}
                                                        >
                                                            {(isSelected ||
                                                                (isSubmitted && isCorrectOption)) && (
                                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                                )}
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name={`q-${q.id}`}
                                                            className="hidden"
                                                            checked={isSelected}
                                                            onChange={() =>
                                                                !isSubmitted &&
                                                                onAnswerChange(
                                                                    q.id.toString(),
                                                                    idx.toString()
                                                                )
                                                            }
                                                        />
                                                        <span
                                                            className={cn(
                                                                "font-medium text-sm",
                                                                isSelected
                                                                    ? "text-slate-900"
                                                                    : "text-slate-600"
                                                            )}
                                                        >
                                                            <span className="mr-2 font-bold opacity-50">
                                                                {String.fromCharCode(65 + idx)}.
                                                            </span>
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
export default function ListeningTestPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const testId = resolvedParams.id;
    const testData = LISTENING_TESTS[testId];

    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerChange = (id: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (!testData) return;
        let newScore = 0;
        testData.parts.forEach((part) => {
            part.questions.forEach((q) => {
                const userAnswer = answers[q.id.toString()];
                if (userAnswer) {
                    if (q.type === "fill-blank") {
                        if (
                            userAnswer.trim().toLowerCase() ===
                            q.correctAnswer.toString().toLowerCase()
                        )
                            newScore++;
                    } else if (q.type === "multiple-choice") {
                        if (userAnswer === q.correctAnswer.toString()) newScore++;
                    }
                }
            });
        });
        setScore(newScore);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!testData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">
                    We couldn't find the listening test you're looking for.
                </p>
                <Link href="/practice/listening">
                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
                        Return to Library
                    </button>
                </Link>
            </div>
        );
    }

    const totalQuestions = testData.parts.reduce(
        (acc, part) => acc + part.questions.length,
        0
    );
    const currentPart = testData.parts[currentPartIndex];

    // Build answered count for bottom bar
    const answeredCount = Object.keys(answers).filter((k) => answers[k] !== "").length;

    // Question ranges per part for bottom nav dots
    const partRanges = testData.parts.map((part) => {
        const ids = part.questions.map((q) => q.id);
        if (ids.length === 0) return "";
        return `${Math.min(...ids)}-${Math.max(...ids)}`;
    });

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans pb-32">
            {/* ── Top bar with test title ── */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3">
                    <Link href="/practice/listening">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>
                    </Link>
                    <span className="text-slate-300 text-sm">|</span>
                    <h1 className="font-bold text-slate-800 text-sm">{testData.title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Sun className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Settings2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <main className="flex-1 max-w-[900px] w-full mx-auto px-4 md:px-6 py-6">

                {/* Score banner */}
                {isSubmitted && (
                    <div className="bg-white border-2 border-green-500 p-6 rounded-2xl mb-6 shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-1">Test Completed!</h2>
                        <p className="text-slate-500 mb-4 text-sm">Results for {testData.title}</p>
                        <div className="text-5xl font-black text-green-600 mb-2">
                            {score}{" "}
                            <span className="text-2xl text-slate-400">/ {totalQuestions}</span>
                        </div>
                        <p className="font-bold text-slate-700 text-sm">
                            Accuracy: {Math.round((score / totalQuestions) * 100)}%
                        </p>
                    </div>
                )}

                {/* Audio Player */}
                <AudioPlayerBar
                    audioUrl={currentPart.audioUrl}
                    partTitle={currentPart.title}
                />

                {/* Questions */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-7">
                    <ListeningPartSection
                        part={currentPart}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                        isSubmitted={isSubmitted}
                    />

                    {/* Inline nav buttons */}
                    <div className="flex justify-between items-center mt-10 pt-5 border-t border-slate-100">
                        <button
                            onClick={() => setCurrentPartIndex((i) => Math.max(0, i - 1))}
                            disabled={currentPartIndex === 0}
                            className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm flex items-center gap-1.5"
                        >
                            ← Previous Part
                        </button>

                        {currentPartIndex < testData.parts.length - 1 ? (
                            <button
                                onClick={() =>
                                    setCurrentPartIndex((i) =>
                                        Math.min(testData.parts.length - 1, i + 1)
                                    )
                                }
                                className="bg-[#3498db] hover:bg-[#2980b9] text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm flex items-center gap-1.5"
                            >
                                Next Part →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                                className="bg-[#2ecc71] hover:bg-[#27ae60] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-all text-sm"
                            >
                                {isSubmitted ? "Submitted ✓" : "Submit Test"}
                            </button>
                        )}
                    </div>
                </div>
            </main>

            {/* ── Fixed bottom navigation bar (like screenshot 2) ── */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                <div className="max-w-[900px] mx-auto px-4 py-2 flex items-center justify-between gap-2">
                    {/* Part dots */}
                    <div className="flex items-center gap-1 flex-wrap">
                        {testData.parts.map((part, pIdx) => {
                            const partQIds = part.questions.map((q) => q.id.toString());
                            const answeredInPart = partQIds.filter(
                                (id) => answers[id] && answers[id] !== ""
                            ).length;
                            const isActive = pIdx === currentPartIndex;

                            return (
                                <button
                                    key={part.id}
                                    onClick={() => setCurrentPartIndex(pIdx)}
                                    title={`${part.title}: ${partRanges[pIdx]}`}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                        isActive
                                            ? "bg-[#2980b9] text-white border-[#2980b9]"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-[#2980b9] hover:text-[#2980b9]"
                                    )}
                                >
                                    <span>{part.title.replace("SECTION ", "Part ")}</span>
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 text-slate-400"
                                    )}>
                                        {answeredInPart}/{partQIds.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Question progress dots — show for current part */}
                    <div className="flex items-center gap-0.5 flex-wrap justify-end max-w-[56%]">
                        {currentPart.questions.map((q) => {
                            const answered = answers[q.id.toString()] && answers[q.id.toString()] !== "";
                            let dotColor = "bg-slate-200";
                            if (isSubmitted) {
                                const correct =
                                    q.type === "fill-blank"
                                        ? answers[q.id.toString()]?.trim().toLowerCase() ===
                                        q.correctAnswer.toString().toLowerCase()
                                        : answers[q.id.toString()] === q.correctAnswer.toString();
                                dotColor = correct ? "bg-green-500" : "bg-red-400";
                            } else if (answered) {
                                dotColor = "bg-[#2980b9]";
                            }

                            return (
                                <div
                                    key={q.id}
                                    title={`Q${q.id}`}
                                    className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white transition-colors",
                                        dotColor
                                    )}
                                >
                                    {q.id}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full bg-[#2980b9] transition-all duration-300"
                        style={{
                            width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
