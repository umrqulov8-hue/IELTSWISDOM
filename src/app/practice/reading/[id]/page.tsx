"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, BookOpen, Flag, AlertCircle, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { READING_TESTS, ReadingTest } from "@/data/reading-tests";


export default function ReadingTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const supabase = createClient();

    // Load test data based on ID
    const testId = resolvedParams.id;
    const testData = READING_TESTS[testId];

    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);



    // Initialize content and manager
    useEffect(() => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setShowResult(false);
        setTimeLeft(1200);


    }, [testId, testData?.content]); // Re-run if content changes (e.g. data load)

    // Timer Logic
    useEffect(() => {
        if (hasStarted && timeLeft > 0 && !isSubmitted && isRunning) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitted) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted, hasStarted, isRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };



    const handleAnswer = (questionId: number, answer: any) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        if (!testData) return;

        let newScore = 0;
        testData.questions.forEach(q => {
            const userAnswer = answers[q.id];
            if (q.type === "fill-blank") {
                if (typeof userAnswer === 'string' && userAnswer.trim().toLowerCase() === (q.correctAnswer as string).toLowerCase()) {
                    newScore++;
                }
            } else {
                if (userAnswer === q.correctAnswer) {
                    newScore++;
                }
            }
        });
        setScore(newScore);
        setIsSubmitted(true);
        setShowResult(true);

        // Save result to Supabase
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.from('test_results').insert({
                    user_id: user.id,
                    test_id: testId,
                    score: newScore,
                    total_questions: testData.questions.length,
                    completed_at: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error("Error saving test result:", error);
        }
    };

    if (!testData) {
        return (
            <DashboardLayout title="Test Not Found" description="The requested reading test could not be found.">
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Not Found</h2>
                    <p className="text-slate-500 mb-8 max-w-md">
                        We couldn't find the reading test you're looking for. It might have been removed or the URL is incorrect.
                    </p>
                    <Link href="/practice/reading">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            Return to Library
                        </button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Reading Test"
            description="Read the passage and answer the questions."
            hideSidebar
            hideHeader
        >
            <div className="fixed inset-0 z-[9999] bg-[#F2F4F8] flex flex-col h-full">

                {/* --- Start Screen Overlay --- */}
                {!hasStarted && (
                    <div className="absolute inset-0 z-[10001] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <BookOpen className="w-10 h-10 text-blue-600" />
                            </div>
                            <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">IELTS Reading Practice</h1>
                            <h2 className="text-2xl font-serif text-slate-600 mb-8 italic">"{testData.title}"</h2>

                            <div className="bg-slate-50 rounded-xl p-6 mb-10 text-left space-y-3 border border-slate-100">
                                <p className="flex items-center gap-3 text-slate-700">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    <span className="font-semibold">Time Limit:</span> 20 Minutes
                                </p>
                                <p className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold">Questions:</span> {testData.questions.length} Items
                                </p>
                                <p className="flex items-center gap-3 text-slate-700">
                                    <Flag className="w-5 h-5 text-blue-500" />
                                    <span className="font-semibold">Task Type:</span> Mixed Questions
                                </p>
                            </div>

                            <button
                                onClick={() => setHasStarted(true)}
                                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                            >
                                Start Test Now
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex-1 flex flex-col h-full max-w-[1920px] mx-auto w-full p-6 pt-20">

                    {/* --- Result Modal --- */}
                    {showResult && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Test Completed!</h3>
                                <p className="text-slate-500 mb-6">You scored</p>

                                <div className="text-5xl font-extrabold text-blue-600 mb-2">
                                    {score} <span className="text-2xl text-slate-400 font-medium">/ {testData.questions.length}</span>
                                </div>

                                <p className="text-sm text-slate-400 mb-8">
                                    Accuracy: {Math.round((score / testData.questions.length) * 100)}%
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowResult(false)}
                                        className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                                    >
                                        Review Answers
                                    </button>
                                    <Link href="/practice/reading" className="flex-1">
                                        <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                                            Back to List
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* --- Distraction-Free Header --- */}
                    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="font-bold text-2xl tracking-tighter text-slate-900">
                                Learn<span className="text-blue-600">English</span>
                            </div>
                            <div className="h-6 w-px bg-slate-200" />
                            <h2 className="font-bold text-slate-700 text-lg line-clamp-1 max-w-xl">Part 1: {testData.title}</h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-lg bg-slate-50 border border-slate-200",
                                timeLeft < 300 ? "text-red-500 bg-red-50 border-red-100 animate-pulse" : "text-slate-700"
                            )}>
                                <Clock className="w-5 h-5" />
                                <span className="min-w-[3.5rem] text-center">{formatTime(timeLeft)}</span>
                                <div className="w-px h-5 bg-slate-300 mx-2" />
                                <button
                                    onClick={() => setIsRunning(!isRunning)}
                                    className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
                                    title={isRunning ? "Pause Timer" : "Resume Timer"}
                                >
                                    {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                                </button>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                            >
                                {isSubmitted ? "Submitted" : "Submit Test"}
                            </button>
                        </div>
                    </div>

                    {/* --- Split Screen Content --- */}
                    <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-8">

                        {/* LEFT: Reading Passage (Scrollable) */}
                        <div className="w-full md:w-[60%] bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar relative group">
                            <h3 className="text-3xl font-bold text-slate-800 mb-8 font-serif leading-tight">{testData.title}</h3>

                            {/* Text Selection Popover */}

                            <div
                                id="reading-content"
                                className="prose prose-slate max-w-none text-slate-700 leading-loose text-lg selection:bg-blue-100 selection:text-blue-900"
                                dangerouslySetInnerHTML={{ __html: testData.content }}
                            />
                        </div>

                        {/* RIGHT: Questions (Scrollable) */}
                        <div className="w-full md:w-[40%] bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Questions 1-{testData.questions.length}</h3>
                                <span className="text-sm text-slate-400 font-medium">Answer all questions</span>
                            </div>

                            <div className="space-y-8">
                                {testData.questions.map((q) => {
                                    const isCorrect = isSubmitted && (
                                        q.type === "fill-blank"
                                            ? (typeof answers[q.id] === 'string' && answers[q.id].trim().toLowerCase() === (q.correctAnswer as string).toLowerCase())
                                            : answers[q.id] === q.correctAnswer
                                    );
                                    const isWrong = isSubmitted && !isCorrect;

                                    const isShortOptions = q.type === "multiple-choice" && q.options
                                        ? q.options.every(opt => opt.length <= 2)
                                        : false;

                                    // Special Handling for "Reducing the Effects of Climate Change" Table (Q30-36)
                                    if (testId === "fp-12" && q.id >= 30 && q.id <= 36) {
                                        if (q.id === 30) {
                                            return (
                                                <div key="glass-table-container" className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative">
                                                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/50 to-transparent pointer-events-none z-10" />
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="bg-slate-50/80 border-b border-slate-200 backdrop-blur-sm">
                                                                <th className="p-4 font-bold text-slate-700 w-1/2 text-sm uppercase tracking-wider">Method</th>
                                                                <th className="p-4 font-bold text-slate-700 w-1/2 text-sm uppercase tracking-wider">Purpose</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Row 1 */}
                                                            <tr id="question-30" className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">put a large number of tiny spacecraft into orbit far above Earth</td>
                                                                <td className="p-4 align-top">
                                                                    to create a <span className="font-bold">30</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[30] || ""} onChange={(e) => handleAnswer(30, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    that would reduce the amount of light reaching Earth
                                                                </td>
                                                            </tr>
                                                            {/* Row 2 */}
                                                            <tr id="question-31" className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">
                                                                    place <span className="font-bold">31</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[31] || ""} onChange={(e) => handleAnswer(31, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    in the sea
                                                                </td>
                                                                <td className="p-4 align-top">
                                                                    to encourage <span className="font-bold">32</span>
                                                                    <input id="question-32" type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[32] || ""} onChange={(e) => handleAnswer(32, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    to form
                                                                </td>
                                                            </tr>
                                                            {/* Row 3 */}
                                                            <tr id="question-33" className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">release aerosol sprays into the stratosphere</td>
                                                                <td className="p-4 align-top">
                                                                    to create <span className="font-bold">33</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[33] || ""} onChange={(e) => handleAnswer(33, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    that would reduce the amount of light reaching Earth
                                                                </td>
                                                            </tr>
                                                            {/* Row 4 */}
                                                            <tr id="question-34" className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">
                                                                    fix strong <span className="font-bold">34</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[34] || ""} onChange={(e) => handleAnswer(34, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    to Greenland ice sheets
                                                                </td>
                                                                <td className="p-4 align-top">to prevent icebergs moving into the sea</td>
                                                            </tr>
                                                            {/* Row 5 */}
                                                            <tr id="question-35" className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">plant trees in Russian Arctic that would lose their leaves in winter</td>
                                                                <td className="p-4 align-top">
                                                                    to allow the <span className="font-bold">35</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[35] || ""} onChange={(e) => handleAnswer(35, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                    to reflect radiation
                                                                </td>
                                                            </tr>
                                                            {/* Row 6 */}
                                                            <tr id="question-36" className="hover:bg-slate-50 transition-colors">
                                                                <td className="p-4 align-top">
                                                                    change the direction of <span className="font-bold">36</span>
                                                                    <input type="text"
                                                                        className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-blue-500 w-24 text-center transition-all placeholder:text-slate-400"
                                                                        value={answers[36] || ""} onChange={(e) => handleAnswer(36, e.target.value)} disabled={isSubmitted}
                                                                    />
                                                                </td>
                                                                <td className="p-4 align-top">to bring more cold water into ice-forming areas</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        } else {
                                            return null; // Skip rendering for 31-36 as they are in the table
                                        }
                                    }
                                    if (q.type === "multiple-choice") {
                                        // ...
                                        return (
                                            <div id={`question-${q.id}`} key={q.id} className={cn(
                                                // ...
                                                "p-4 rounded-xl border transition-colors",
                                                isSubmitted && isCorrect ? "border-green-200 bg-green-50/50" :
                                                    isSubmitted && !isCorrect ? "border-red-200 bg-red-50/50" :
                                                        "border-slate-200 hover:border-blue-300"
                                            )}>
                                                <div className="flex items-start gap-4 mb-3">
                                                    <span className={cn(
                                                        "flex-none w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                                        isSubmitted && isCorrect ? "bg-green-100 text-green-700" :
                                                            isSubmitted && !isCorrect ? "bg-red-100 text-red-700" :
                                                                "bg-blue-50 text-blue-700"
                                                    )}>
                                                        {q.id}
                                                    </span>
                                                    <p className="font-medium text-slate-700 leading-relaxed pt-1">{q.text}</p>
                                                </div>

                                                {isShortOptions ? (
                                                    <div className="flex flex-wrap gap-2 ml-12">
                                                        {q.options?.map((option, index) => {
                                                            const isSelected = answers[q.id] === String(index);
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => !isSubmitted && handleAnswer(q.id, String(index))}
                                                                    disabled={isSubmitted}
                                                                    className={cn(
                                                                        "w-10 h-10 rounded-lg text-sm font-bold border transition-all flex items-center justify-center",
                                                                        isSelected
                                                                            ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                                                                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50",
                                                                        isSubmitted && index === Number(q.correctAnswer) && "bg-green-500 border-green-500 text-white", // Show correct answer
                                                                        isSubmitted && isSelected && index !== Number(q.correctAnswer) && "bg-red-500 border-red-500 text-white", // Show wrong user selection
                                                                    )}
                                                                >
                                                                    {option}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 ml-12">
                                                        {q.options?.map((option, index) => {
                                                            const isSelected = answers[q.id] === String(index);
                                                            return (
                                                                <label key={index} className={cn(
                                                                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all group",
                                                                    isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50",
                                                                    isSubmitted && index === Number(q.correctAnswer) && "bg-green-50 border-green-200",
                                                                    isSubmitted && isSelected && index !== Number(q.correctAnswer) && "bg-red-50 border-red-200"
                                                                )}>
                                                                    <div className={cn(
                                                                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                                                        isSelected ? "border-blue-500 bg-blue-500" : "border-slate-300 group-hover:border-blue-400"
                                                                    )}>
                                                                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                                    </div>
                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${q.id}`}
                                                                        value={index}
                                                                        checked={isSelected}
                                                                        onChange={() => handleAnswer(q.id, String(index))}
                                                                        disabled={isSubmitted}
                                                                        className="hidden"
                                                                    />
                                                                    <span className={cn(
                                                                        "text-sm",
                                                                        isSelected ? "text-slate-900 font-medium" : "text-slate-600"
                                                                    )}>{option}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {isSubmitted && !isCorrect && (
                                                    <div className="mt-4 ml-12 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                                                        <span className="font-bold">Correct Answer: </span>
                                                        {typeof q.correctAnswer === 'number' && q.options
                                                            ? q.options[q.correctAnswer as number]
                                                            : q.correctAnswer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <div id={`question-${q.id}`} key={q.id} className={cn(
                                            "p-4 rounded-xl border transition-colors",
                                            isSubmitted && isCorrect ? "border-green-200 bg-green-50/50" :
                                                isSubmitted && isWrong ? "border-red-200 bg-red-50/50" :
                                                    "border-slate-100 bg-slate-50/50"
                                        )}>
                                            <div className="flex gap-3 mb-3">
                                                <span className={cn(
                                                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
                                                    isSubmitted && isCorrect ? "bg-green-100 text-green-600" :
                                                        isSubmitted && isWrong ? "bg-red-100 text-red-600" :
                                                            "bg-blue-100 text-blue-600"
                                                )}>
                                                    {q.id}
                                                </span>
                                                <div className="w-full">
                                                    {q.image && (
                                                        <div className="mb-4 rounded-lg overflow-hidden border border-slate-200">
                                                            <img src={q.image} alt="Question Diagram" className="w-full h-auto" />
                                                        </div>
                                                    )}
                                                    {q.type === "fill-blank" ? (
                                                        <p className="font-medium text-slate-700 leading-8">
                                                            {q.text.split("_____").map((part, i, arr) => (
                                                                <span key={i}>
                                                                    {part}
                                                                    {i < arr.length - 1 && (
                                                                        <input
                                                                            type="text"
                                                                            className={cn(
                                                                                "mx-1.5 px-3 py-1 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all w-40 text-center font-bold text-sm shadow-sm",
                                                                                isSubmitted && isCorrect ? "border-green-400 bg-green-50 text-green-700 shadow-green-200" :
                                                                                    isSubmitted && isWrong ? "border-red-400 bg-red-50 text-red-700 shadow-red-200" :
                                                                                        "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-slate-700"
                                                                            )}
                                                                            value={answers[q.id] || ""}
                                                                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                                            disabled={isSubmitted}
                                                                            placeholder="Type here..."
                                                                        />
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    ) : (
                                                        <p className="font-medium text-slate-700">{q.text}</p>
                                                    )}

                                                    {isSubmitted && isWrong && (
                                                        <p className="text-xs text-red-500 mt-1 font-semibold">
                                                            Correct Answer: {q.type === "true-false" ? q.options![q.correctAnswer as number] : q.correctAnswer}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Question Inputs (Hidden for fill-blank now) */}
                                            <div className="pl-9 space-y-2">
                                                {q.type === "true-false" ? (
                                                    q.options?.map((option, optIndex) => (
                                                        <label
                                                            key={optIndex}
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                                                answers[q.id] === optIndex
                                                                    ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200"
                                                                    : "bg-white border-slate-200 hover:border-slate-300",
                                                            )}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`question-${q.id}`}
                                                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                                                checked={answers[q.id] === optIndex}
                                                                onChange={() => handleAnswer(q.id, optIndex)}
                                                                disabled={isSubmitted}
                                                            />
                                                            <span className={cn("text-sm", answers[q.id] === optIndex ? "text-blue-700 font-medium" : "text-slate-600")}>
                                                                {option}
                                                            </span>
                                                        </label>
                                                    ))
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- Question Navigator (Fixed Bottom Bar) --- */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                    <div className="max-w-[1920px] mx-auto flex items-center gap-4">

                        <div className="flex-1 overflow-x-auto custom-scrollbar flex items-center gap-2 pb-1 md:pb-0">
                            {testData.questions.map((q) => {
                                const isAnswered = (answers[q.id] !== undefined && answers[q.id] !== "") || (testId === "fp-12" && q.id >= 30 && q.id <= 36 && answers[q.id]);

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            document.getElementById(`question-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        className={cn(
                                            "flex-none w-7 h-7 rounded-full text-xs font-bold transition-all shadow-sm border",
                                            isAnswered
                                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                                        )}
                                    >
                                        {q.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
