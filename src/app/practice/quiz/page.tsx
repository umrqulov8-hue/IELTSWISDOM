"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft as BackIcon, CheckCircle, XCircle, ArrowRight, Trophy, Link as LinkIcon, Keyboard, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import confetti from 'canvas-confetti';
import { getVocabularyForPassage, VocabItem } from "@/data/vocabulary";

// --- Dynamic Quiz Generator ---
const generateQuizData = (passageId: string) => {
    const vocabList = getVocabularyForPassage(passageId);

    // Shuffle vocab list to get random questions
    const shuffledVocab = [...vocabList].sort(() => Math.random() - 0.5).slice(0, 10); // Limit to 10 questions max

    return shuffledVocab.map((item, index) => {
        // Randomly choose question type: 0 = Definition -> Term, 1 = Term -> Definition
        const questionType = Math.random() > 0.5 ? 0 : 1;

        let questionText = "";
        let correctAnswerIndex = 0;
        let options: string[] = [];

        // Generate distractors
        const otherItems = vocabList.filter(v => v.id !== item.id);
        const distractors = otherItems.sort(() => Math.random() - 0.5).slice(0, 3);

        if (questionType === 0) {
            // Definition -> Term
            questionText = `Which word matches this definition: "${item.definition}"?`;
            const answerOptions = [item.term, ...distractors.map(d => d.term)];
            // Shuffle options
            const shuffledOptions = answerOptions.sort(() => Math.random() - 0.5);
            options = shuffledOptions;
            correctAnswerIndex = shuffledOptions.indexOf(item.term);
        } else {
            // Term -> Definition
            questionText = `What is the definition of "${item.term}"?`;
            const answerOptions = [item.definition, ...distractors.map(d => d.definition)];
            // Shuffle options
            const shuffledOptions = answerOptions.sort(() => Math.random() - 0.5);
            options = shuffledOptions;
            correctAnswerIndex = shuffledOptions.indexOf(item.definition);
        }

        return {
            id: index,
            question: questionText,
            options: options,
            correctAnswer: correctAnswerIndex
        };
    });
};

function QuizContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const passageId = searchParams.get("id") || "c18-t1-p1";

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    useEffect(() => {
        const data = generateQuizData(passageId);
        setQuestions(data);
    }, [passageId]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#34D399', '#10B981'] // Green confetti
            });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setIsQuizComplete(true);
            if (score === questions.length) {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const handleRetry = () => {
        const data = generateQuizData(passageId);
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setIsQuizComplete(false);
    };

    if (!currentQuestion) return null;

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans relative overflow-hidden text-slate-800">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all group shadow-sm hover:shadow-md"
                >
                    <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back</span>
                </button>

                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 drop-shadow-sm">
                    Vocabulary Quiz
                </h1>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600 font-medium text-sm">Score: {score}</span>
                </div>
            </header>

            <main className="relative z-10 max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">

                {/* Result Screen */}
                <AnimatePresence mode="wait">
                    {isQuizComplete ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl"
                        >
                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <Trophy className="w-12 h-12 text-emerald-600" />
                                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
                            <p className="text-xl text-slate-500 mb-8">
                                You scored <span className="text-emerald-600 font-bold">{score}</span> out of <span className="text-slate-800 font-bold">{questions.length}</span>
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleRetry}
                                    className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-bold transition-all flex items-center gap-2 border border-slate-200 hover:shadow-md"
                                >
                                    <RotateCcw className="w-5 h-5" /> Retry Quiz
                                </button>
                                <Link
                                    href={`/practice/typing?id=${passageId}`}
                                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    <Keyboard className="w-5 h-5" /> Next: Typing
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="w-full"
                        >
                            {/* Question Card */}
                            <div className="w-full bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden border border-slate-100">
                                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                    <motion.div
                                        className="h-full bg-emerald-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-4 block">Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Options Grid */}
                            <div className="grid gap-4">
                                {currentQuestion.options.map((option: string, index: number) => {
                                    let status = "idle";
                                    if (isAnswered) {
                                        if (index === currentQuestion.correctAnswer) status = "correct";
                                        else if (index === selectedOption) status = "incorrect";
                                        else status = "dimmed";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleOptionClick(index)}
                                            disabled={isAnswered}
                                            className={cn(
                                                "w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group shadow-sm",
                                                status === "idle" && "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md text-slate-700",
                                                status === "correct" && "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                                                status === "incorrect" && "bg-rose-50 border-rose-500 text-rose-800",
                                                status === "dimmed" && "opacity-50 bg-slate-50 border-slate-200 text-slate-400"
                                            )}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <span className="text-lg font-medium">{option}</span>
                                                {status === "correct" && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                                                {status === "incorrect" && <XCircle className="w-6 h-6 text-rose-500" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            <div className="mt-8 flex justify-end h-14">
                                {isAnswered && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleNext}
                                        className="px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                                    >
                                        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default function QuizPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center font-sans text-slate-500">Loading quiz...</div>}>
            <QuizContent />
        </Suspense>
    );
}
