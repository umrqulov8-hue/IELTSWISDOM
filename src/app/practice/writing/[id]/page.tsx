"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Save, ArrowLeft, Pause, Play, LayoutList, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Prompts Data ---
type TaskData = { title: string; prompt: string; type: "task-1" | "task-2"; minWords: number };
type TestData = {
    title: string;
    type: "task-1" | "task-2" | "full-test";
    tasks: TaskData[]; // Array for single or multiple tasks
};

const PROMPTS: Record<string, TestData> = {
    // Feb 11 Tests - FULL TEST (NEW)
    "feb11-full": {
        title: "February 11 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Poverty in the USA",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The table show information about age, average income per person and population below poverty line in three stages in the USA.</p>
                    
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img 
                           src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral%2011.jpg" 
                           alt="Tables showing age, average income and population below poverty line in the USA" 
                           class="w-full h-auto rounded-lg shadow-sm"
                       />
                    </div>

                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Fashion and Copying",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        The tendency of human copying one another is shown in the popularity of fashion in clothes and other commodities.<br/><br/>
                        <strong>To what extent do you agree or disagree?</strong>
                    </div>
                    <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p>Write at least 250 words.</p>
                `
            }
        ]
    },

    // Feb 15.1 Tests - FULL TEST (NEW)
    "feb15-1-full": {
        title: "February 15.1 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Work Hours in Europe",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The tables give information about the average hours worked by part-time and full-time men and women in three countries in Europe in 2002 and compare them with the European countries.</p>
                    
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img 
                           src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral15.1.jpg" 
                           alt="Tables showing average work hours in Europe" 
                           class="w-full h-auto rounded-lg shadow-sm"
                       />
                    </div>

                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Zoos - Cruel or Useful?",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        Some people think that zoos are cruel and should be closed down. Others, however, believe that zoos can be useful in protecting wild animals.<br/><br/>
                        <strong>Discuss both views and give your opinion.</strong>
                    </div>
                    <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p>Write at least 250 words.</p>
                `
            }
        ]
    },

    // Feb 15 Tests - FULL TEST (NEW)
    "feb15-full": {
        title: "February 15 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: AU Students Studying Abroad",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The table below shows the number of Australian students studying abroad from 2004 and 2006.</p>
                    
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img 
                           src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral%2015.jpg" 
                           alt="Table showing number of Australian students studying abroad" 
                           class="w-full h-auto rounded-lg shadow-sm"
                       />
                    </div>

                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Celebrities & Media Privacy",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        Celebrities make a very good living out of media attention and have chosen to live in the public spotlight. They have no right to complain when they feel the media are intruding on their privacy.<br/><br/>
                        <strong>To what extent do you agree or disagree with this opinion?</strong>
                    </div>
                    <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p>Write at least 250 words.</p>
                `
            }
        ]
    },

    // Feb 16 Tests - FULL TEST
    "feb16-full": {
        title: "February 16 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Olive Oil Production",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The diagram below shows the production of olive oil. Write a report for a university lecturer describing the information below.</p>
                    
                    <div class="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-col items-center gap-4">
                       <img 
                           src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/photo_2026-02-18_22-44-31.jpg" 
                           alt="Olive Oil Production Process" 
                           class="w-full h-auto rounded-lg"
                       />
                    </div>

                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Value of Artists",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        Today, artists, such as musicians and painters, are still valued despite the advancements in technology and science.<br/><br/>
                        <strong>Why is this the case?</strong><br/>
                        <strong>Is the impact of art on people's lives the same as the impact of science and technology?</strong>
                    </div>
                    <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p>Write at least 250 words.</p>
                `
            }
        ]
    },

    "c20-ac-t4-t2": {
        title: "Cambridge IELTS 20 - Academic Writing Test 4 (Task 2)",
        type: "task-2",
        tasks: [{
            title: "Task 2",
            type: "task-2",
            minWords: 250,
            prompt: `
                <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                <p class="mb-4">You should spend about 40 minutes on this task.</p>
                <p class="mb-4">Write about the following topic:</p>
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 italic">
                    Some people believe that the best way to solve environmental problems is to increase the price of fuel. To what extent do you agree or disagree?
                </div>
                <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                <p>Write at least 250 words.</p>
            `
        }]
    },
    // Default fallback for any other ID
    "default": {
        title: "Writing Practice Task",
        type: "task-2",
        tasks: [{
            title: "Task 2",
            type: "task-2",
            minWords: 250,
            prompt: `
                <h3 class="text-lg font-bold mb-2">WRITING TASK</h3>
                <p class="mb-4">You should spend about 40 minutes on this task.</p>
                <p class="mb-4">Write about the following topic:</p>
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 italic">
                    Completing university education is thought by some to be the best way to get a good job. On the other hand, other people think that getting experience and developing soft skills is more important.
                    <br/><br/>
                    Discuss both sides and give your opinion.
                </div>
                <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                <p>Write at least 250 words.</p>
            `
        }]
    }
};

export default function WritingTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const testId = resolvedParams.id; // e.g. "feb16-full"

    // Load prompt based on ID or fallback
    const testData = PROMPTS[testId] || PROMPTS["default"];

    // State
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [contentMap, setContentMap] = useState<Record<number, string>>({ 0: "", 1: "" }); // Store content for each task index
    const [timeLeft, setTimeLeft] = useState(testData.type === "task-1" ? 1200 : testData.type === "full-test" ? 3600 : 2400); // 20, 60 or 40 mins
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    const activeTask = testData.tasks[activeTabIndex];
    const currentContent = contentMap[activeTabIndex] || "";

    // Timer Logic
    useEffect(() => {
        if (isSubmitted || timeLeft <= 0 || !isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, isRunning]);

    // Word Count Calculation
    const getWordCount = (text: string) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };
    const currentWordCount = getWordCount(currentContent);
    const minWords = activeTask.minWords;
    const progress = Math.min((currentWordCount / minWords) * 100, 100);

    const handleContentChange = (val: string) => {
        setContentMap(prev => ({ ...prev, [activeTabIndex]: val }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const totalWordCount = Object.values(contentMap).reduce((acc, text) => acc + getWordCount(text), 0);

    return (
        <DashboardLayout
            title="Writing Test"
            description={testData.title}
            hideSidebar
            hideHeader
        >
            <div className="max-w-full mx-auto h-[calc(100vh-140px)] flex flex-col gap-4 px-2 w-full">

                {/* --- Top Bar --- */}
                <header className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex-shrink-0">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium hidden md:inline">Exit</span>
                    </button>

                    {/* Task Tabs (Only show if multiple tasks) */}
                    {testData.tasks.length > 1 && (
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            {testData.tasks.map((task, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTabIndex(index)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                                        activeTabIndex === index
                                            ? "bg-white text-slate-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {task.type === "task-1" ? <LayoutList className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                                    {task.type === "task-1" ? "Task 1" : "Task 2"}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <div className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all",
                            timeLeft < 300 ? "bg-red-50 border-red-100 text-red-600 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-700"
                        )}>
                            <Clock className="w-5 h-5" />
                            <span className="font-mono font-bold text-lg min-w-[3.5rem] text-center">
                                {formatTime(timeLeft)}
                            </span>
                            <div className="w-px h-6 bg-slate-300 mx-1" />
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
                                title={isRunning ? "Pause Timer" : "Resume Timer"}
                            >
                                {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>
                        </div>

                        <button
                            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2"
                            onClick={() => setIsSubmitted(true)}
                        >
                            <Save className="w-4 h-4" />
                            Submit
                        </button>
                    </div>
                </header>

                {/* --- Split Screen Content --- */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">

                    {/* Left Panel: Prompt */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar">
                        <div
                            className="prose prose-slate max-w-none prose-p:text-slate-600"
                            dangerouslySetInnerHTML={{ __html: activeTask.prompt }}
                        />
                    </div>

                    {/* Right Panel: Editor */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col relative">
                        <textarea
                            value={currentContent}
                            onChange={(e) => handleContentChange(e.target.value)}
                            placeholder={`Type your answer for ${activeTask.type === "task-1" ? "Task 1" : "Task 2"} here...`}
                            className="flex-1 w-full bg-transparent resize-none outline-none text-slate-700 text-lg leading-relaxed placeholder:text-slate-300 font-serif"
                            spellCheck={false}
                        />

                        {/* Footer Stats */}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "font-bold transition-colors",
                                    currentWordCount >= minWords ? "text-emerald-600" : "text-slate-400"
                                )}>
                                    {currentWordCount} words
                                </span>
                                <span className="text-slate-300">/</span>
                                <span className="text-slate-400">Target: {minWords}+</span>
                            </div>

                            {/* Progress Ring or Bar */}
                            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-500",
                                        currentWordCount >= minWords ? "bg-emerald-500" : "bg-rose-500"
                                    )}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Submission Overlay --- */}
                {isSubmitted && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-[2rem]">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-100 max-w-md"
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Submitted!</h2>
                            <p className="text-slate-500 mb-8">
                                You wrote <strong className="text-slate-800">{totalWordCount} words</strong> in total.
                                <br />Great job practicing!
                            </p>
                            <button
                                onClick={() => router.back()}
                                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </motion.div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}
