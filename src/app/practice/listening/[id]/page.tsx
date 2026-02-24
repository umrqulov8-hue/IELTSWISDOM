"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import type { ListeningPart } from "@/types/listening";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ListeningPartSection({
    part,
    answers,
    onAnswerChange,
    isSubmitted
}: {
    part: ListeningPart,
    answers: Record<string, string>,
    onAnswerChange: (id: string, value: string) => void,
    isSubmitted: boolean
}) {
    const contentRef = useRef<HTMLDivElement>(null);

    // Attach event listeners to dangerouslySetInnerHTML inputs
    useEffect(() => {
        const handleInput = (e: Event) => {
            if (isSubmitted) {
                e.preventDefault();
                return;
            }

            const target = e.target as HTMLInputElement;
            if (target && target.tagName === 'INPUT' && target.id.startsWith('q-')) {
                const questionId = target.id.replace('q-', '');
                onAnswerChange(questionId, target.value);

                if (target.value.trim() !== '') {
                    target.classList.add('border-blue-500', 'bg-blue-50/50');
                } else {
                    target.classList.remove('border-blue-500', 'bg-blue-50/50');
                }
            }
        };

        const container = contentRef.current;
        if (container) {
            container.addEventListener('input', handleInput);
        }

        return () => {
            if (container) {
                container.removeEventListener('input', handleInput);
            }
        };
    }, [isSubmitted, onAnswerChange]);

    // Update input styles when answers change (especially for showing results)
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        part.questions.filter(q => q.type === 'fill-blank').forEach(q => {
            const input = container.querySelector(`#q-${q.id}`) as HTMLInputElement;
            if (input) {
                input.value = answers[q.id.toString()] || '';
                input.disabled = isSubmitted;

                if (isSubmitted) {
                    const isCorrect = input.value.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase();
                    if (isCorrect) {
                        input.classList.remove('border-blue-500', 'bg-blue-50/50', 'border-black');
                        input.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
                    } else {
                        input.classList.remove('border-blue-500', 'bg-blue-50/50', 'border-black');
                        input.classList.add('border-red-500', 'bg-red-50', 'text-red-700');

                        if (!input.nextElementSibling?.classList.contains('correction')) {
                            const correction = document.createElement('span');
                            correction.className = 'correction text-xs text-red-600 font-bold ml-2 bg-red-100 px-2 py-0.5 rounded';
                            correction.textContent = `Correct: ${q.correctAnswer}`;
                            input.parentNode?.insertBefore(correction, input.nextSibling);
                        }
                    }
                }
            }
        });
    }, [isSubmitted, answers, part.questions]);

    return (
        <div className="mb-0">
            {/* Header Section */}
            <div className="bg-[#2980b9] text-white p-4 rounded-t-lg font-bold text-lg mb-0 flex items-center shadow-sm">
                {part.title}
            </div>

            {/* Instructions Box */}
            <div className="bg-[#eef5f9] border-x border-[#d1e4ef] p-4 text-sm text-slate-700 mb-6 rounded-b-lg shadow-sm">
                {part.instructions}
            </div>

            {/* Content Box */}
            <div className="px-2 md:px-4">
                <div
                    ref={contentRef}
                    className="prose prose-slate max-w-none text-slate-800"
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />

                {/* Multiple Choice Questions Rendered Natively */}
                {part.questions.filter(q => q.type === 'multiple-choice').length > 0 && (
                    <div className="mt-8 space-y-8">
                        {part.questions.filter(q => q.type === 'multiple-choice').map(q => {
                            const isAnswerCorrect = isSubmitted && answers[q.id.toString()] === q.correctAnswer.toString();
                            const isAnswerWrong = isSubmitted && answers[q.id.toString()] !== q.correctAnswer.toString();

                            return (
                                <div key={q.id} className={cn(
                                    "p-6 rounded-xl border-2 transition-colors",
                                    isAnswerCorrect ? "border-green-300 bg-green-50/30" :
                                        isAnswerWrong ? "border-red-300 bg-red-50/30" : "border-slate-100 bg-slate-50/50"
                                )}>
                                    <h4 className="font-bold text-lg mb-4 flex gap-3">
                                        <span className={cn(
                                            "flex-none w-8 h-8 flex items-center justify-center rounded-lg text-sm bg-white border",
                                            isAnswerCorrect ? "text-green-700 border-green-300" :
                                                isAnswerWrong ? "text-red-700 border-red-300" : "text-slate-700 border-slate-300"
                                        )}>{q.id}</span>
                                        <span className="leading-tight pt-1">{q.text}</span>
                                    </h4>

                                    <div className="space-y-3 pl-11">
                                        {q.options?.map((opt, idx) => {
                                            const isSelected = answers[q.id.toString()] === idx.toString();
                                            const isCorrectOption = idx.toString() === q.correctAnswer.toString();

                                            return (
                                                <label key={idx} className={cn(
                                                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all w-full",
                                                    isSelected && !isSubmitted ? "bg-blue-50 border-blue-300 shadow-sm" : "bg-white border-slate-200 hover:border-blue-200",
                                                    isSubmitted && isCorrectOption ? "bg-green-100 border-green-400" : "",
                                                    isSubmitted && isSelected && !isCorrectOption ? "bg-red-100 border-red-400" : ""
                                                )}>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center",
                                                        isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300",
                                                        isSubmitted && isCorrectOption ? "border-green-600 bg-green-600" : "",
                                                        isSubmitted && isSelected && !isCorrectOption ? "border-red-600 bg-red-600" : ""
                                                    )}>
                                                        {(isSelected || (isSubmitted && isCorrectOption)) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name={`q-${q.id}`}
                                                        className="hidden"
                                                        checked={isSelected}
                                                        onChange={() => !isSubmitted && onAnswerChange(q.id.toString(), idx.toString())}
                                                    />
                                                    <span className={cn(
                                                        "font-medium",
                                                        isSelected ? "text-slate-900" : "text-slate-600"
                                                    )}>
                                                        <span className="mr-2 font-bold opacity-50">{String.fromCharCode(65 + idx)}.</span>
                                                        {opt}
                                                    </span>
                                                </label>
                                            )
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


export default function ListeningTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const testId = resolvedParams.id;
    const testData = LISTENING_TESTS[testId];

    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerChange = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (!testData) return;

        let newScore = 0;
        testData.parts.forEach(part => {
            part.questions.forEach(q => {
                const userAnswer = answers[q.id.toString()];
                if (userAnswer) {
                    if (q.type === 'fill-blank') {
                        if (userAnswer.trim().toLowerCase() === q.correctAnswer.toString().toLowerCase()) {
                            newScore++;
                        }
                    } else if (q.type === 'multiple-choice') {
                        if (userAnswer === q.correctAnswer.toString()) {
                            newScore++;
                        }
                    }
                }
            });
        });

        setScore(newScore);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!testData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">We couldn't find the listening test you're looking for.</p>
                <Link href="/practice/listening">
                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
                        Return to Library
                    </button>
                </Link>
            </div>
        );
    }

    const totalQuestions = testData.parts.reduce((acc, part) => acc + part.questions.length, 0);
    const currentPart = testData.parts[currentPartIndex];

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans pb-24">
            <main className="flex-1 max-w-[900px] w-full mx-auto px-4 md:px-0 py-8">

                {isSubmitted && (
                    <div className="bg-white border-2 border-green-500 p-8 rounded-2xl mb-8 shadow-sm text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Test Completed!</h2>
                        <p className="text-slate-500 mb-6">Here are your results for {testData.title}</p>
                        <div className="text-6xl font-black text-green-600 mb-4">{score} <span className="text-3xl text-slate-400">/ {totalQuestions}</span></div>
                        <p className="font-bold text-slate-700">Accuracy: {Math.round((score / totalQuestions) * 100)}%</p>
                    </div>
                )}

                {/* Global Audio Player Block */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-6 mb-6">
                    <h2 className="text-xl font-bold text-[#2c3e50] text-center mb-4">{testData.title}</h2>
                    <div className="bg-[#344454] rounded-[0.5rem] py-6 px-4 md:px-12 flex flex-col items-center">
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">Audio Player</h3>
                        {currentPart.audioUrl ? (
                            <div className="w-full max-w-xl mb-4 bg-white rounded-full opacity-90 hover:opacity-100 transition-opacity">
                                <audio
                                    key={currentPart.audioUrl}
                                    controls
                                    src={currentPart.audioUrl}
                                    className="w-full h-10 custom-audio"
                                    preload="metadata"
                                />
                            </div>
                        ) : (
                            <div className="text-white/50 mb-4 italic text-sm">No audio available for this part</div>
                        )}
                        <p className="text-white/80 text-xs">Playing: {currentPart.title}</p>
                    </div>
                </div>

                {/* Questions Block */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-4 md:p-6">
                    <ListeningPartSection
                        part={currentPart}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                        isSubmitted={isSubmitted}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-6">
                        <button
                            onClick={() => setCurrentPartIndex(i => Math.max(0, i - 1))}
                            disabled={currentPartIndex === 0}
                            className="bg-[#bdc3c7] hover:bg-[#aab7b8] disabled:opacity-50 disabled:hover:bg-[#bdc3c7] text-white font-bold px-5 py-2.5 rounded transition-all text-sm shadow-sm flex items-center gap-1.5"
                        >
                            <span className="text-lg leading-none">&larr;</span> Previous Part
                        </button>

                        {currentPartIndex < testData.parts.length - 1 ? (
                            <button
                                onClick={() => setCurrentPartIndex(i => Math.min(testData.parts.length - 1, i + 1))}
                                className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold px-5 py-2.5 rounded transition-all text-sm shadow-sm flex items-center gap-1.5"
                            >
                                Next Part <span className="text-lg leading-none">&rarr;</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                                className="bg-[#2ecc71] hover:bg-[#27ae60] disabled:bg-slate-300 text-white font-bold px-6 py-2.5 rounded transition-all text-sm shadow-sm"
                            >
                                {isSubmitted ? "Submitted" : "Submit Test"}
                            </button>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}
