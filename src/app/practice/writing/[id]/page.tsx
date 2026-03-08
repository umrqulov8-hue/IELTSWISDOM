"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock, CheckCircle2, Save, ArrowLeft, Pause, Play,
    LayoutList, PenTool, Sparkles, AlertCircle, ChevronDown,
    ChevronUp, Star, TrendingUp, Lightbulb, RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

// --- Types ---
type TaskData = { title: string; prompt: string; type: "task-1" | "task-2"; minWords: number };
type TestData = {
    title: string;
    type: "task-1" | "task-2" | "full-test";
    tasks: TaskData[];
};

// Band score result types
interface CriterionResult {
    band: number;
    title: string;
    feedback: string;
    strengths: string[];
    improvements: string[];
}
interface BandResult {
    overallBand: number;
    criteria: {
        taskAchievement: CriterionResult;
        coherenceCohesion: CriterionResult;
        lexicalResource: CriterionResult;
        grammaticalRange: CriterionResult;
    };
    summaryComment: string;
    topTips: string[];
}

// --- Mock Prompts Data ---
const PROMPTS: Record<string, TestData> = {
    "feb22-full": {
        title: "February 22 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Employment Patterns in New Zealand",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The table below shows employment patterns for males and females in New Zealand in 1993 and 2003.</p>
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img src="/image for writing test/photo_2026-03-07_18-06-02.jpg" alt="Table showing employment patterns in New Zealand" class="w-full h-auto rounded-lg shadow-sm border border-slate-100"/>
                    </div>
                    <p class="mb-4">Summarize the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Solving Traffic Congestion",
                prompt: "Some people believe that to solve a problem of traffic congestions the government needs to provide free and 24/7 public transport. To what extent you agree or disagree?",
                type: "task-2",
                minWords: 250
            }
        ]
    },
    "feb25-full": {
        title: "February 25 - Full Academic Writing Test",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Interests in Sports in Europe",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The table illustrates the total proportion of interests in sports by collecting data in European country, which occurred in 1999, 2004 and 2009.</p>
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img src="/image for writing test/photo_2026-03-07_17-21-04.jpg" alt="Table showing proportion of interests in sports in Europe" class="w-full h-auto rounded-lg shadow-sm border border-slate-100"/>
                    </div>
                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Homeschooling",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        There has been an increase in the number of parents who are choosing to educate their children at home instead of sending them to school.<br/><br/>
                        <strong>Do the advantages of this outweigh the disadvantages?</strong>
                    </div>
                    <p class="mb-4">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p>Write at least 250 words.</p>
                `
            }
        ]
    },
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
                       <img src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral%2011.jpg" alt="Tables showing age, average income and population below poverty line in the USA" class="w-full h-auto rounded-lg shadow-sm"/>
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
                       <img src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral15.1.jpg" alt="Tables showing average work hours in Europe" class="w-full h-auto rounded-lg shadow-sm"/>
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
                       <img src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/febral%2015.jpg" alt="Table showing number of Australian students studying abroad" class="w-full h-auto rounded-lg shadow-sm"/>
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
                       <img src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/photo_2026-02-18_22-44-31.jpg" alt="Olive Oil Production Process" class="w-full h-auto rounded-lg"/>
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
    "working-hours": {
        title: "Writing Practice - Working Hours & Fuel Production",
        type: "full-test",
        tasks: [
            {
                title: "Task 1: Fuel Production in the UK",
                type: "task-1",
                minWords: 150,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 1</h3>
                    <p class="mb-4">You should spend about 20 minutes on this task.</p>
                    <p class="mb-4">The graph below shows the production levels of the main kinds of fuel in the UK between 1981 and 2000.</p>
                    <div class="mb-6 flex flex-col items-center gap-4">
                       <img src="https://engnovatewebsitestorage.blob.core.windows.net/ielts-writing-task-1-images/a6aad123f8d98350" alt="Chart showing production levels of main kinds of fuel in the UK" class="w-full h-auto rounded-lg shadow-sm border border-slate-100"/>
                    </div>
                    <p class="mb-4">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                `
            },
            {
                title: "Task 2: Working Hours Laws",
                type: "task-2",
                minWords: 250,
                prompt: `
                    <h3 class="text-lg font-bold mb-2">WRITING TASK 2</h3>
                    <p class="mb-4">You should spend about 40 minutes on this task.</p>
                    <p class="mb-4">Write about the following topic:</p>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 italic text-slate-700 leading-relaxed shadow-sm">
                        Some countries have introduced laws to limit the working hours that an employer can ask from an employee.<br/><br/>
                        <strong>Why are these laws introduced?<br/>Is this a positive or negative trend?</strong>
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

// ─── Band colour helper ───────────────────────────────────────────
function bandColor(band: number) {
    if (band >= 8) return { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
    if (band >= 7) return { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
    if (band >= 6) return { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
    return { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" };
}

// ─── Criterion Card ───────────────────────────────────────────────
function CriterionCard({ criterion }: { criterion: CriterionResult }) {
    const [open, setOpen] = useState(false);
    const c = bandColor(criterion.band);
    return (
        <div className={cn("rounded-2xl border overflow-hidden", c.border)}>
            <button
                onClick={() => setOpen(!open)}
                className={cn("w-full flex items-center justify-between p-4 text-left", c.light)}
            >
                <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm", c.bg)}>
                        {criterion.band}
                    </div>
                    <div>
                        <p className={cn("font-bold text-sm", c.text)}>{criterion.title}</p>
                        <p className="text-xs text-slate-500">Band {criterion.band} · Click to expand</p>
                    </div>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-white space-y-4 border-t border-slate-100">
                            <p className="text-slate-700 text-sm leading-relaxed">{criterion.feedback}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Strengths
                                    </p>
                                    <ul className="space-y-1">
                                        {criterion.strengths.map((s, i) => (
                                            <li key={i} className="text-xs text-emerald-800 flex items-start gap-1.5">
                                                <span className="text-emerald-500 mt-0.5">•</span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> To Improve
                                    </p>
                                    <ul className="space-y-1">
                                        {criterion.improvements.map((s, i) => (
                                            <li key={i} className="text-xs text-rose-800 flex items-start gap-1.5">
                                                <span className="text-rose-400 mt-0.5">•</span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function WritingTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const testId = resolvedParams.id;

    const testData = PROMPTS[testId] || PROMPTS["default"];

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [contentMap, setContentMap] = useState<Record<number, string>>({ 0: "", 1: "" });
    const [timeLeft, setTimeLeft] = useState(testData.type === "task-1" ? 1200 : testData.type === "full-test" ? 3600 : 2400);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    // AI checking state
    const [isChecking, setIsChecking] = useState(false);
    const [checkError, setCheckError] = useState<string | null>(null);
    const [results, setResults] = useState<BandResult[]>([]); // one per task
    const [checkingTaskIndex, setCheckingTaskIndex] = useState(0);

    const activeTask = testData.tasks[activeTabIndex];
    const currentContent = contentMap[activeTabIndex] || "";

    useEffect(() => {
        if (isSubmitted || timeLeft <= 0 || !isRunning) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, isRunning]);

    const getWordCount = (text: string) =>
        text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const currentWordCount = getWordCount(currentContent);
    const minWords = activeTask.minWords;
    const progress = Math.min((currentWordCount / minWords) * 100, 100);

    const handleContentChange = (val: string) =>
        setContentMap(prev => ({ ...prev, [activeTabIndex]: val }));

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const totalWordCount = Object.values(contentMap).reduce((acc, text) => acc + getWordCount(text), 0);

    // Submit: stop timer, show results panel, start AI checking
    const handleSubmit = async () => {
        setIsSubmitted(true);
        setIsRunning(false);
        await checkAllTasks();
    };

    const checkAllTasks = async () => {
        setIsChecking(true);
        setCheckError(null);
        const allResults: BandResult[] = [];

        for (let i = 0; i < testData.tasks.length; i++) {
            const essay = contentMap[i] || "";
            if (getWordCount(essay) < 30) {
                // Skip empty tasks
                continue;
            }
            setCheckingTaskIndex(i);
            try {
                const res = await fetch("/api/ai-writing-check", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        taskType: testData.tasks[i].type,
                        prompt: testData.tasks[i].prompt.replace(/<[^>]*>/g, " ").trim(),
                        essay,
                    }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "AI check failed");
                allResults.push(data as BandResult);
            } catch (err: unknown) {
                setCheckError(err instanceof Error ? err.message : "AI check failed");
            }
        }
        setResults(allResults);
        setIsChecking(false);

        // Save result to Supabase
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user && allResults.length > 0) {
            // Calculate a combined band score if multiple tasks
            const averageBand = allResults.reduce((acc, curr) => acc + curr.overallBand, 0) / allResults.length;

            try {
                // "w" prefix to distinguish it as a writing test if test data doesn't have one naturally
                const finalTestId = testId.startsWith("w-") || testId.startsWith("feb") ? testId : `w-${testId}`;
                await supabase.from("test_results").insert({
                    user_id: user.id,
                    test_id: finalTestId,
                    score: averageBand,
                    total_questions: 9 // Using 9 total since band is out of 9
                });
            } catch (err) {
                console.error("Failed to save writing test result", err);
            }
        }
    };

    return (
        <DashboardLayout title="Writing Test" description={testData.title} hideSidebar hideHeader>
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

                    <div className="flex items-center gap-3">
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

                        {!isSubmitted ? (
                            <button
                                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2"
                                onClick={handleSubmit}
                            >
                                <Save className="w-4 h-4" />
                                Submit
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl font-bold text-sm">
                                <CheckCircle2 className="w-4 h-4" /> Submitted
                            </div>
                        )}
                    </div>
                </header>

                {/* --- Main Content or Results --- */}
                {!isSubmitted ? (
                    /* Writing Interface */
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar">
                            <div
                                className="prose prose-slate max-w-none prose-p:text-slate-600"
                                dangerouslySetInnerHTML={{ __html: activeTask.prompt }}
                            />
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col relative">
                            <textarea
                                value={currentContent}
                                onChange={(e) => handleContentChange(e.target.value)}
                                placeholder={`Type your answer for ${activeTask.type === "task-1" ? "Task 1" : "Task 2"} here...`}
                                className="flex-1 w-full bg-transparent resize-none outline-none text-slate-700 text-lg leading-relaxed placeholder:text-slate-300 font-serif"
                                spellCheck={false}
                            />
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <span className={cn("font-bold transition-colors", currentWordCount >= minWords ? "text-emerald-600" : "text-slate-400")}>
                                        {currentWordCount} words
                                    </span>
                                    <span className="text-slate-300">/</span>
                                    <span className="text-slate-400">Target: {minWords}+</span>
                                </div>
                                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full transition-all duration-500", currentWordCount >= minWords ? "bg-emerald-500" : "bg-rose-500")}
                                        style={{ width: `${progress}% ` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Results Panel */
                    <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pb-6">
                        {/* Loading state */}
                        {isChecking && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
                            >
                                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-violet-600 animate-pulse" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">AI is checking your essay...</h3>
                                <p className="text-slate-500 text-sm">
                                    Evaluating {testData.tasks[checkingTaskIndex]?.title} against official IELTS Band Descriptors
                                </p>
                                <div className="flex gap-1.5 justify-center mt-4">
                                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </motion.div>
                        )}

                        {/* Error state */}
                        {checkError && !isChecking && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-red-800">AI Check Failed</p>
                                    <p className="text-red-600 text-sm">{checkError}</p>
                                    <button onClick={checkAllTasks} className="mt-3 flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-900">
                                        <RotateCcw className="w-4 h-4" /> Try again
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Results */}
                        {!isChecking && results.length > 0 && results.map((result, ri) => {
                            const taskLabel = testData.tasks.length > 1
                                ? (ri === 0 ? "Task 1" : "Task 2")
                                : testData.tasks[0].type === "task-1" ? "Task 1" : "Task 2";
                            const oc = bandColor(result.overallBand);
                            return (
                                <motion.div
                                    key={ri}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: ri * 0.1 }}
                                    className="space-y-4"
                                >
                                    {/* Overall Score Hero Card */}
                                    <div className={cn("rounded-3xl p-6 text-white relative overflow-hidden shadow-xl", oc.bg)}>
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-8 -translate-x-8" />
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div>
                                                <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">{taskLabel} · Overall Band Score</p>
                                                <div className="flex items-end gap-3">
                                                    <span className="text-7xl font-black leading-none">{result.overallBand}</span>
                                                    <span className="text-2xl text-white/70 mb-2">/ 9.0</span>
                                                </div>
                                                <p className="text-white/90 mt-2 text-sm max-w-xs">{result.summaryComment}</p>
                                            </div>
                                            <div className="hidden md:grid grid-cols-2 gap-3">
                                                {Object.values(result.criteria).map((c) => (
                                                    <div key={c.title} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[90px]">
                                                        <p className="text-white font-black text-xl">{c.band}</p>
                                                        <p className="text-white/75 text-[10px] leading-tight mt-0.5">{c.title.split(" ")[0]}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4 Criteria Cards */}
                                    <div className="grid grid-cols-1 gap-3">
                                        {Object.values(result.criteria).map((criterion) => (
                                            <CriterionCard key={criterion.title} criterion={criterion} />
                                        ))}
                                    </div>

                                    {/* Top Tips */}
                                    {result.topTips?.length > 0 && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                                            <p className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                                <Lightbulb className="w-4 h-4" /> Top Tips to Improve Your Score
                                            </p>
                                            <ul className="space-y-2">
                                                {result.topTips.map((tip, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                                                        <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5 fill-amber-400" />
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* Submission summary + back button */}
                        {!isChecking && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="text-slate-600 text-sm">
                                    <p className="font-bold text-slate-800 mb-1">Test Complete · {totalWordCount} words written</p>
                                    <p>Keep practicing to improve your band score!</p>
                                </div>
                                <button
                                    onClick={() => router.back()}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to Tests
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}
