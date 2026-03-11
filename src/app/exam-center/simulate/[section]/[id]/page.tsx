"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { READING_TESTS } from "@/data/reading-tests";
import { LISTENING_TESTS } from "@/data/listening-tests";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { CDILayout } from "@/components/exam/CDILayout";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Clock, LayoutList, PenTool, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SimulationPage() {
    const params = useParams();
    const router = useRouter();
    const section = params?.section as "reading" | "listening" | "writing" | "speaking";
    const testId = params?.id as string;

    const [testData, setTestData] = useState<any>(null);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [breakTimer, setBreakTimer] = useState(60);
    const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);

    // Timer State
    const [duration, setDuration] = useState(0);

    // Initialize test data
    useEffect(() => {
        if (!section || !testId) return;

        let data: any = null;
        let time = 3600; // default 1 hour

        const isMockTest = testId.startsWith("mt-");

        if (section === "reading") {
            data = READING_TESTS[testId] || (isMockTest ? {
                id: testId,
                title: "Reading Test (Coming Soon)",
                passages: [
                    {
                        id: "p1",
                        title: "Content Publishing Soon",
                        content: "<div class='p-10 text-slate-400 text-center font-medium'>The reading passage for this test will be added soon.</div>",
                        questionRange: { start: 1, end: 13 },
                        questions: []
                    }
                ],
                questions: []
            } : READING_TESTS["fp-9"]);
            time = 3600;
        } else if (section === "listening") {
            data = LISTENING_TESTS[testId] || (isMockTest ? {
                id: testId,
                title: "Listening Test (Coming Soon)",
                parts: [
                    {
                        id: "p1",
                        title: "Audio Publishing Soon",
                        audioUrl: "",
                        content: "<div class='p-10 text-slate-400 text-center font-medium'>The listening audio and questions for this test will be added soon.</div>",
                        questions: []
                    }
                ]
            } : LISTENING_TESTS["t1-1"]);
            time = 1800; // 30 mins approx
        } else if (section === "writing") {
            // Placeholder: structure similar to practice/writing/[id]
            data = isMockTest ? {
                title: "Writing Test (Coming Soon)",
                type: "full-test",
                tasks: [
                    { title: "Task 1", type: "task-1", minWords: 150, prompt: "<div class='p-10 text-slate-400 text-center font-medium'>Writing Task 1 will be added soon.</div>" },
                    { title: "Task 2", type: "task-2", minWords: 250, prompt: "<div class='p-10 text-slate-400 text-center font-medium'>Writing Task 2 will be added soon.</div>" }
                ]
            } : {
                title: "Writing Academic Test",
                type: "full-test",
                tasks: [
                    { title: "Task 1", type: "task-1", minWords: 150, prompt: "<strong>Academic Writing Task 1</strong><br/><br/>The chart below shows the changes in ownership of electrical appliances and amount of time spent on housework in households in one country between 1920 and 2019.<br/><br/>Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
                    { title: "Task 2", type: "task-2", minWords: 250, prompt: "<strong>Academic Writing Task 2</strong><br/><br/>In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in.<br/><br/>What are the reasons for this? How can people research this?" }
                ]
            };
            time = 3600;
        } else if (section === "speaking") {
            data = SPEAKING_TESTS[testId] || (isMockTest ? {
                id: testId,
                title: "Speaking Test (Coming Soon)",
                parts: [
                    {
                        id: "p1",
                        title: "Questions Publishing Soon",
                        instructions: "The speaking questions for this test will be added soon.",
                        questions: []
                    }
                ]
            } : SPEAKING_TESTS["jan-1"]);
            time = 840; // 14 mins max
        }

        setTestData(data);
        setDuration(time);
    }, [section, testId]);

    const handleAnswerChange = useCallback((id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    }, []);

    const handlePassageInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.tagName === 'INPUT' && target.id.startsWith('q-')) {
            const qId = target.id.replace('q-', '');
            handleAnswerChange(qId, target.value);
        }
    }, [handleAnswerChange]);

    // Restore input values from answers when part changes or answers update
    useEffect(() => {
        const container = document.getElementById("passage-content-container");
        if (!container) return;
        
        const inputs = container.querySelectorAll<HTMLInputElement>('input[id^="q-"]');
        inputs.forEach(input => {
            const qId = input.id.replace('q-', '');
            input.value = answers[qId] || "";
        });
    }, [currentPartIndex, answers]);

    // Break Timer Effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isBreak && breakTimer > 0) {
            interval = setInterval(() => {
                setBreakTimer(prev => prev - 1);
            }, 1000);
        } else if (isBreak && breakTimer === 0) {
            const nextSectionMap: Record<string, string> = {
                listening: "reading",
                reading: "writing",
                writing: "speaking",
                speaking: "dashboard"
            };
            const nextSection = nextSectionMap[section];

            if (nextSection === "dashboard") {
                router.push("/dashboard");
            } else {
                router.push(`/exam-center/simulate/${nextSection}/${testId}`);
                setIsBreak(false);
                setBreakTimer(60);
                setIsSubmitted(false);
                setCurrentPartIndex(0);
                setAnswers({});
            }
        }
        return () => clearInterval(interval);
    }, [isBreak, breakTimer, section, testId, router]);

    const handleSubmit = async () => {
        if (isSubmitted) return;
        setIsSubmitted(true);

        // Calculate score for Reading/Listening
        let score = 0;
        let total = 0;

        if (section === "reading" || section === "listening") {
            const parts = section === "reading" ? (testData.passages || [testData]) : testData.parts;
            parts.forEach((p: any) => {
                p.questions.forEach((q: any) => {
                    total++;
                    const userAns = (answers[q.id.toString()] || "").trim().toLowerCase();
                    const correctAns = q.correctAnswer.toString().toLowerCase();
                    if (userAns === correctAns) score++;
                });
            });
        }

        toast.success("Test submitted successfully!");

        // Save to Supabase logic...
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from("test_results").insert({
                user_id: user.id,
                test_id: `sim-${section}-${testId}`,
                score,
                total_questions: total || 40
            });
        }

        // Show results or redirect
        if (testId.startsWith("mt-")) {
            setIsBreak(true);
        } else {
            router.push("/dashboard");
        }
    };

    if (!testData) return <div className="p-20 text-center font-bold">Loading Test Data...</div>;

    const totalParts = section === "reading" ? (testData.passages?.length || 1) : (testData.parts?.length || 1);
    const currentPart = section === "reading" ? (testData.passages ? testData.passages[currentPartIndex] : testData) : testData.parts[currentPartIndex];

    const totalQ = section === "reading" ? testData.questions.length : testData.parts.reduce((acc: number, p: any) => acc + p.questions.length, 0);
    const currentQCount = Object.keys(answers).length;

    return (
        <CDILayout
            title={testData.title || "IELTS Mock Test"}
            section={section.charAt(0).toUpperCase() + section.slice(1) as any}
            duration={isBreak ? breakTimer : duration}
            onFinish={handleSubmit}
            currentPart={currentPartIndex}
            totalParts={totalParts}
            onPartChange={setCurrentPartIndex}
            questionsHandled={{ current: currentQCount, total: totalQ }}
        >
            <div className="h-full relative">
                {/* Break Overlay */}
                <AnimatePresence>
                    {isBreak && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="max-w-md w-full"
                            >
                                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                                    <Clock className="w-12 h-12 text-blue-400" />
                                </div>
                                <h2 className="text-4xl font-black mb-4">Section Completed</h2>
                                <p className="text-slate-300 text-lg mb-12">
                                    Take a short breather. The next section will start automatically in:
                                </p>
                                <div className="text-7xl font-black font-mono text-blue-400 mb-12">
                                    00:{breakTimer.toString().padStart(2, '0')}
                                </div>
                                <button
                                    onClick={() => setBreakTimer(0)}
                                    className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all shadow-xl"
                                >
                                    Skip Break
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {section === "reading" && (
                    <div className="flex h-full gap-6">
                        {/* Reading Split-Screen: Passage left, Questions right */}
                        <div className="w-1/2 bg-white rounded-2xl p-8 overflow-y-auto shadow-sm border border-slate-200 prose prose-slate">
                            <h2 className="text-2xl font-black mb-6">{currentPart.title}</h2>
                            <div 
                                id="passage-content-container"
                                dangerouslySetInnerHTML={{ __html: currentPart.content }} 
                                onInput={handlePassageInput}
                            />
                        </div>
                        <div className="w-1/2 bg-white rounded-2xl p-8 overflow-y-auto shadow-sm border border-slate-200">
                            <QuestionsList
                                questions={testData.questions.filter((q: any) => {
                                    if (testData.passages) {
                                        return q.id >= currentPart.questionRange.start && q.id <= currentPart.questionRange.end;
                                    }
                                    return true;
                                })}
                                answers={answers}
                                onAnswerChange={handleAnswerChange}
                                htmlContent={currentPart.content}
                            />
                        </div>
                    </div>
                )}

                {section === "listening" && (
                    <div className="w-full space-y-8">
                        {isCheckingAnswers ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-900/90 backdrop-blur-xl text-white rounded-[3rem] p-12 text-center shadow-2xl"
                            >
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-10 h-10 text-blue-300 animate-pulse" />
                                </div>
                                <h2 className="text-3xl font-black mb-4">Time to check your answers</h2>
                                <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
                                    You have 2 minutes to review your answers. Audio has stopped.
                                </p>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all"
                                >
                                    Submit Now
                                </button>
                            </motion.div>
                        ) : (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-slate-800">{currentPart.title}</h2>
                                    {currentPart.audioUrl && (
                                        <audio
                                            controls
                                            src={currentPart.audioUrl}
                                            className="h-10"
                                            onEnded={() => {
                                                if (currentPartIndex === totalParts - 1) {
                                                    setIsCheckingAnswers(true);
                                                    setDuration(120); // 2 minutes
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                                <div 
                                    id="passage-content-container"
                                    dangerouslySetInnerHTML={{ __html: currentPart.content }} 
                                    className="prose prose-slate max-w-none mb-10" 
                                    onInput={handlePassageInput}
                                />
                                <QuestionsList
                                    questions={currentPart.questions}
                                    answers={answers}
                                    onAnswerChange={handleAnswerChange}
                                    htmlContent={currentPart.content}
                                />
                            </div>
                        )}
                    </div>
                )}

                {section === "writing" && (
                    <div className="max-w-none mx-auto h-full flex flex-col gap-6">
                        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mx-auto border border-slate-300">
                            {testData.tasks.map((task: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPartIndex(index)}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                                        currentPartIndex === index
                                            ? "bg-[#2D3E50] text-white shadow-lg"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {task.type === "task-1" ? <LayoutList className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                                    {task.type === "task-1" ? "Task 1" : "Task 2"}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-y-auto prose prose-slate max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: testData.tasks[currentPartIndex].prompt }} />
                            </div>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col relative">
                                <textarea
                                    className="flex-1 resize-none bg-transparent outline-none text-slate-700 leading-relaxed font-serif text-lg"
                                    placeholder="Type your essay here..."
                                    value={answers[`task-${currentPartIndex}`] || ""}
                                    onChange={(e) => handleAnswerChange(`task-${currentPartIndex}`, e.target.value)}
                                />
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm font-bold">
                                        <span className="text-slate-400">Word Count:</span>
                                        <span className="text-blue-600">{(answers[`task-${currentPartIndex}`] || "").trim().split(/\s+/).filter(Boolean).length}</span>
                                    </div>
                                    <div className="text-[10px] uppercase font-black text-slate-300 tracking-widest">
                                        Auto-saving enabled
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {section === "speaking" && (
                    <div className="max-w-none mx-auto h-full flex flex-col items-center justify-center space-y-12">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200">
                                <Mic className="w-3.5 h-3.5" />
                                {currentPart.title}
                            </div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                                {currentPart.instructions}
                            </h2>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                            {currentPart.questions.map((q: any, idx: number) => (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-start gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 font-mono font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {q.id}
                                    </div>
                                    <div className="flex-1 text-xl font-bold text-slate-700 leading-relaxed">
                                        {q.text.split('\n').map((line: string, i: number) => (
                                            <p key={i} className={i > 0 ? "mt-4 text-sm font-normal text-slate-500 whitespace-pre-line" : ""}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse cursor-not-allowed">
                                <Mic className="w-8 h-8" />
                            </div>
                            <p className="text-rose-500 font-bold text-sm uppercase tracking-widest">
                                Recording in progress...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </CDILayout>
    );
}

function QuestionsList({ questions, answers, onAnswerChange, htmlContent }: any) {
    return (
        <div className="space-y-4">
            {questions.map((q: any) => {
                // If question is completely embedded in HTML, don't render its wrapper at all
                const isEmbeddedFillBlank = q.type === "fill-blank" && htmlContent && (htmlContent.includes(`id="q-${q.id}"`) || htmlContent.includes(`id='q-${q.id}'`));
                if (isEmbeddedFillBlank && !q.text && (!q.options || q.options.length === 0)) {
                    return null;
                }

                return (
                    <div key={q.id} className="p-2 sm:p-4">
                        {q.text && (
                            <p className="font-bold text-slate-700 mb-4">
                                <span className="text-blue-600 mr-2 font-mono">{q.id}.</span>
                                {q.text}
                            </p>
                        )}

                        {q.type === "multiple-choice" && (
                            <div className="space-y-2">
                                {q.options.map((opt: string, idx: number) => (
                                    <label key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            checked={answers[q.id.toString()] === idx.toString()}
                                            onChange={() => onAnswerChange(q.id.toString(), idx.toString())}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm text-slate-600">
                                            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                                            {opt}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {q.type === "fill-blank" && !isEmbeddedFillBlank && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                {!q.text && (
                                    <span className="text-blue-600 font-mono font-bold whitespace-nowrap">{q.id}.</span>
                                )}
                                <input
                                    type="text"
                                    value={answers[q.id.toString()] || ""}
                                    onChange={(e) => onAnswerChange(q.id.toString(), e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-800"
                                    placeholder="Type your answer here..."
                                />
                            </div>
                        )}

                    {q.type === "true-false" && (
                        <div className="flex gap-3">
                            {["TRUE", "FALSE", "NOT GIVEN"].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => onAnswerChange(q.id.toString(), val)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-xs font-bold border transition-all",
                                        answers[q.id.toString()] === val
                                            ? "bg-slate-800 text-white border-transparent"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    )}
                    </div>
                );
            })}
        </div>
    );
}
