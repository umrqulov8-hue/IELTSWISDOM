"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import type { ListeningPart } from "@/types/listening";
import { Play, Pause, Volume2, MoreVertical, Menu, Headphones, AlertCircle, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sub-component for each Listening Section (Part)
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
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Audio Event Listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(e => console.error("Audio playback failed", e));
                setIsPlaying(true);
            }
        }
    };

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

                // Add active styling dynamically
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
    }, [isSubmitted, onAnswerChange]); // Re-bind if submission state changes

    // Update input styles when answers change (especially for showing results)
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        part.questions.filter(q => q.type === 'fill-blank').forEach(q => {
            const input = container.querySelector(`#q-\${q.id}`) as HTMLInputElement;
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

                        // Optionally inject correct answer next to it
                        if (!input.nextElementSibling?.classList.contains('correction')) {
                            const correction = document.createElement('span');
                            correction.className = 'correction text-xs text-red-600 font-bold ml-2 bg-red-100 px-2 py-0.5 rounded';
                            correction.textContent = `Correct: \${q.correctAnswer}`;
                            input.parentNode?.insertBefore(correction, input.nextSibling);
                        }
                    }
                }
            }
        });
    }, [isSubmitted, answers, part.questions]);

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "0:00";
        const m = Math.floor(timeInSeconds / 60);
        const s = Math.floor(timeInSeconds % 60);
        return `\${m}:\${s < 10 ? '0' : ''}\${s}`;
    };

    const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="mb-16 border-b-4 border-slate-100 pb-12 last:border-0">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                    {part.title}
                </h1>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Audio Player Component */}
            {part.audioUrl && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4 mb-6 relative overflow-hidden shadow-sm">
                    <audio ref={audioRef} src={part.audioUrl} preload="metadata" />

                    {/* Scrubber Background track */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200">
                        <div
                            className="h-full bg-slate-800 transition-all duration-100"
                            style={{ width: `\${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>

                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex-none rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors bg-white shadow-sm border border-slate-200"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
                    </button>

                    <div className="text-sm font-medium font-mono text-slate-600 min-w-[6rem] bg-white px-3 py-1.5 rounded-md border border-slate-200">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Custom Scrubber */}
                    <div className="flex-1 relative items-center hidden md:flex h-6 group cursor-pointer" onClick={handleScrub}>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#cc0000]" style={{ width: `\${duration ? (currentTime / duration) * 100 : 0}%` }} />
                        </div>
                        {/* Fake Scrubber knob */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#cc0000] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `calc(\${duration ? (currentTime / duration) * 100 : 0}% - 8px)` }}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 ml-auto">
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors bg-white border border-slate-200"><Volume2 className="w-4 h-4" /></button>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <h2 className="text-lg font-medium text-slate-700 mb-4">{part.instructions}</h2>

            <button className="flex items-center gap-2 bg-white border border-slate-300 shadow-sm hover:bg-slate-50 text-slate-700 font-bold px-5 py-2.5 rounded-lg transition-all text-sm mb-6 active:scale-95">
                <Headphones className="w-5 h-5 text-slate-500" />
                Listen from Here
            </button>

            {/* Content Box */}
            <div className="border border-slate-300 rounded-xl bg-white p-6 md:p-8 shadow-sm">
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
                                                        name={`q-\${q.id}`}
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


export default function ListeningTestPage({ params }: { params: { id: string } }) {
    const testId = params.id;
    const testData = LISTENING_TESTS[testId];

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

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans pb-24">
            {/* Top Red Promotional Banner */}
            <div className="bg-[#cc0000] text-white text-center py-2.5 px-4 font-bold text-sm tracking-wide shadow-md sticky top-0 z-50">
                24 Hours Only: Get 30% Off on Our Premium Plan - <a href="#" className="underline decoration-white/50 hover:decoration-white transition-all">Check Out Now!</a>
            </div>

            <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 md:px-8 py-10">

                <h1 className="text-3xl font-black text-slate-800 mb-2">{testData.title}</h1>
                <p className="text-slate-500 mb-10 pb-4 border-b border-slate-200">Listen to the audio files and answer the questions below.</p>

                {isSubmitted && (
                    <div className="bg-white border-2 border-green-500 p-8 rounded-2xl mb-12 shadow-xl shadow-green-500/10 text-center animate-in slide-in-from-top-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Test Completed!</h2>
                        <p className="text-slate-500 mb-6">Here are your results for {testData.title}</p>
                        <div className="text-6xl font-black text-green-600 mb-4">{score} <span className="text-3xl text-slate-400">/ {totalQuestions}</span></div>
                        <p className="font-bold text-slate-700">Accuracy: {Math.round((score / totalQuestions) * 100)}%</p>
                    </div>
                )}

                <div className="space-y-8">
                    {testData.parts.map(part => (
                        <ListeningPartSection
                            key={part.id}
                            part={part}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            isSubmitted={isSubmitted}
                        />
                    ))}
                </div>
            </main>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50">
                <div className="text-sm font-bold text-slate-500 hidden sm:block">
                    Answered: <span className="text-slate-800">{Object.keys(answers).length}</span> / {totalQuestions}
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-all w-full sm:w-auto"
                    >
                        Back to Top
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className="bg-[#cc0000] hover:bg-red-700 disabled:opacity-50 disabled:bg-slate-300 text-white font-bold px-10 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto shadow-lg shadow-red-500/30"
                    >
                        {isSubmitted ? "Submitted" : "Submit Test"} <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
