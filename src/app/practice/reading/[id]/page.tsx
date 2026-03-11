"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, use, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, BookOpen, Flag, AlertCircle, Pause, Play, Type, Minus, Plus, ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { READING_TESTS, ReadingTest } from "@/data/reading-tests";
import { HighlighterMenu, HighlightColor } from "@/components/ui/HighlighterMenu";
import { toast } from "sonner";


export default function ReadingTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const supabase = createClient();

    // Load test data based on ID
    const testId = resolvedParams.id;
    const testData = READING_TESTS[testId];

    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [timeLeft, setTimeLeft] = useState(testData.timeLimit || 1200);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [fontSize, setFontSize] = useState(18); // Default font size in px
    const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
    const [leftWidth, setLeftWidth] = useState(60); // 60% default
    const [isResizing, setIsResizing] = useState(false);
    const [expandedPassageTab, setExpandedPassageTab] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Highlighter State
    const [selection, setSelection] = useState<{ x: number; y: number; text: string } | null>(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const readingAreaRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null); // Save range before menu click steals focus
    const stripLeadingNumber = (text: string) => {
        if (!text) return "";
        return text.replace(/^[0-9]+[\.\)\s]+\s*/, "");
    };

    // Split-screen Resizing Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

            // Constrain between 20% and 80%
            if (newLeftWidth >= 20 && newLeftWidth <= 80) {
                setLeftWidth(newLeftWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // Apply font size via ref so it doesn't wipe DOM-based highlights
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.fontSize = `${fontSize}px`;
        }
    }, [fontSize]);

    const handleMouseUp = () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !containerRef.current) {
            setIsMenuVisible(false);
            return;
        }

        const range = sel.getRangeAt(0);
        if (containerRef.current.contains(range.commonAncestorContainer)) {
            const rect = range.getBoundingClientRect();
            // Save the range so menu button clicks don't lose the selection
            savedRangeRef.current = range.cloneRange();
            setSelection({
                x: rect.left + rect.width / 2,
                y: rect.top,
                text: sel.toString()
            });
            setIsMenuVisible(true);
        } else {
            setIsMenuVisible(false);
        }
    };

    const applyHighlight = (color: HighlightColor) => {
        // Restore saved selection before we apply anything
        const sel = window.getSelection();
        if (!sel) return;

        if (savedRangeRef.current) {
            sel.removeAllRanges();
            sel.addRange(savedRangeRef.current);
        }

        if (color === 'copy') {
            const text = sel.toString();
            navigator.clipboard.writeText(text).then(() => {
                toast.success("Copied to clipboard!");
            });
            sel.removeAllRanges();
            setIsMenuVisible(false);
            savedRangeRef.current = null;
            return;
        }

        if (color === 'none') {
            // Remove all highlight spans in the selected range
            if (savedRangeRef.current && containerRef.current) {
                const range = savedRangeRef.current;
                const spans = containerRef.current.querySelectorAll<HTMLElement>(
                    'mark[data-hlt]'
                );
                spans.forEach(span => {
                    if (range.intersectsNode(span)) {
                        const parent = span.parentNode!;
                        while (span.firstChild) parent.insertBefore(span.firstChild, span);
                        parent.removeChild(span);
                    }
                });
                // Normalize merged text nodes
                containerRef.current.normalize();
            }
            sel.removeAllRanges();
            setIsMenuVisible(false);
            savedRangeRef.current = null;
            return;
        }

        // Apply highlight using surroundContents on cloned range
        try {
            if (!savedRangeRef.current) return;
            const range = savedRangeRef.current;

            // Walk text nodes in the selection to wrap each one individually
            // (surroundContents fails on partial cross-element selections)
            const walker = document.createTreeWalker(
                range.commonAncestorContainer.nodeType === Node.TEXT_NODE
                    ? range.commonAncestorContainer.parentNode!
                    : range.commonAncestorContainer,
                NodeFilter.SHOW_TEXT,
                null
            );

            const textNodes: Text[] = [];
            let node: Node | null;
            while ((node = walker.nextNode())) {
                const textNode = node as Text;
                // Check if this text node overlaps with the selection
                if (range.intersectsNode(textNode)) {
                    textNodes.push(textNode);
                }
            }

            const colorMap: Record<string, string> = {
                yellow: '#FFF59D',
                green: '#C8E6C9',
                blue: '#BBDEFB',
            };
            const bgColor = colorMap[color] ?? '#FFF59D';

            textNodes.forEach(textNode => {
                // Determine what slice of this text node is selected
                const nodeStart = textNode === range.startContainer ? range.startOffset : 0;
                const nodeEnd = textNode === range.endContainer ? range.endOffset : textNode.length;

                if (nodeStart >= nodeEnd) return; // Empty slice, skip

                // Split off the un-highlighted prefix
                if (nodeStart > 0) textNode.splitText(nodeStart);
                const splitNode = textNode === range.startContainer && nodeStart > 0
                    ? textNode.nextSibling as Text
                    : textNode;

                if (!splitNode) return;

                // Split off the un-highlighted suffix
                const actualEnd = textNode === range.startContainer && nodeStart > 0
                    ? nodeEnd - nodeStart
                    : nodeEnd;
                if (actualEnd < splitNode.length) splitNode.splitText(actualEnd);

                // Wrap in a <mark> element
                const mark = document.createElement('mark');
                mark.setAttribute('data-hlt', color);
                mark.style.display = 'inline';
                mark.style.backgroundColor = bgColor;
                mark.style.borderRadius = '2px';
                mark.style.padding = '0';
                mark.style.margin = '0';
                mark.style.color = 'inherit';
                mark.style.lineHeight = 'inherit';
                (mark.style as any).WebkitBoxDecorationBreak = 'clone';
                (mark.style as any).boxDecorationBreak = 'clone';
                splitNode.parentNode?.insertBefore(mark, splitNode);
                mark.appendChild(splitNode);
            });

        } catch (err) {
            console.error('Highlight error:', err);
            toast.error("Could not apply highlight. Please try again.");
        }

        sel.removeAllRanges();
        setIsMenuVisible(false);
        savedRangeRef.current = null;
    };

    const handleHighlight = applyHighlight;

    // Memoize content with testData and currentPassageIndex as dep
    const memoizedContent = useMemo(() => {
        const content = testData.passages
            ? testData.passages[currentPassageIndex].content
            : (testData.content || "");

        return (
            <div
                ref={contentRef}
                id="reading-content"
                className="prose prose-slate max-w-none text-slate-700 leading-loose selection:bg-[#2D3E50]/15 selection:text-blue-900"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testData.content, testData.passages, currentPassageIndex]);



    // Initialize content and manager
    useEffect(() => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setShowResult(false);
        setTimeLeft(testData.timeLimit || 1200);
        setCurrentPassageIndex(0);
    }, [testId]);

    // Auto-scroll to top when passage changes
    useEffect(() => {
        if (readingAreaRef.current) readingAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPassageIndex]);

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
                        <button className="px-6 py-3 bg-[#2D3E50] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            Return to Library
                        </button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-[9999] bg-[#F2F4F8] flex flex-col h-full">

                {/* --- Start Screen Overlay --- */}
                {!hasStarted && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#F2F4F8]/90 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-10 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/60 relative overflow-hidden"
                        >
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 1 }}
                                className="absolute -top-10 -left-10 w-40 h-40 bg-[#2D3E50]/10/60 rounded-full blur-3xl opacity-60"
                            ></motion.div>
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 1 }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100/60 rounded-full blur-3xl opacity-60"
                            ></motion.div>
                            
                            <div className="relative z-10">
                                <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 bg-[#2D3E50]/5/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)] border border-white/50"
                                >
                                    <BookOpen className="w-10 h-10 text-[#2D3E50]" />
                                </motion.div>
                                
                                <motion.h2 
                                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="text-3xl font-black text-slate-800 mb-4 tracking-tight"
                                >
                                    {testData.title}
                                </motion.h2>
                                
                                <motion.div 
                                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                                    className="flex justify-center gap-6 mb-8 text-slate-600"
                                >
                                    <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white/60 shadow-sm">
                                        <Clock className="w-4 h-4 text-[#2D3E50]/50" />
                                        <span className="font-semibold text-sm">{Math.floor((testData.timeLimit || 1200) / 60)} Minutes</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white/60 shadow-sm">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span className="font-semibold text-sm">{testData.questions.length} Questions</span>
                                    </div>
                                </motion.div>
                                
                                <motion.p 
                                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                    className="text-slate-500 mb-8 leading-relaxed text-sm"
                                >
                                    You will have {Math.floor((testData.timeLimit || 1200) / 60)} minutes to complete {testData.questions.length} questions. The timer will start as soon as you click the button below. Good luck!
                                </motion.p>
                                
                                <motion.div 
                                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                                    className="flex gap-4 justify-center"
                                >
                                    <Link href="/practice/reading">
                                        <button className="px-6 py-4 rounded-xl border-2 border-slate-200/60 bg-white/50 text-slate-600 font-bold hover:bg-white hover:border-slate-300 transition-all shadow-sm">
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setHasStarted(true)}
                                        className="px-10 py-4 bg-gradient-to-r from-[#2D3E50] to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-[#2D3E50]/30 hover:shadow-[#2D3E50]/50 transition-all hover:-translate-y-0.5 active:scale-95"
                                    >
                                        Start Test
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}

                <div className="flex-1 flex flex-col h-full w-full p-0 pt-16 overflow-hidden">

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

                                <div className="text-5xl font-extrabold text-[#2D3E50] mb-2">
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
                                        <button className="w-full py-3 rounded-xl bg-[#2D3E50] text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-[#2D3E50]/20">
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
                            <Link href="/practice/reading" className="font-bold text-2xl tracking-tighter text-slate-900 hover:opacity-80 transition-opacity">
                                IELTS<span className="text-[#2D3E50]">Wisdom</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-200" />
                            <h2 className="font-bold text-slate-700 text-lg line-clamp-1 max-w-xl">
                                {testData.passages
                                    ? testData.passages[currentPassageIndex].title
                                    : `Part 1: ${testData.title}`}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Font Size Controls */}
                            <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                                <Type className="w-3.5 h-3.5 text-slate-400" />
                                <button
                                    onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                                    className="p-1 rounded hover:bg-white hover:shadow-sm text-slate-500 hover:text-[#2D3E50] transition-all active:scale-90"
                                    title="Decrease Font Size"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <div className="w-px h-4 bg-slate-200" />
                                <button
                                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                                    className="p-1 rounded hover:bg-white hover:shadow-sm text-slate-500 hover:text-[#2D3E50] transition-all active:scale-90"
                                    title="Increase Font Size"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className={cn(
                                "flex items-center gap-1.5 font-mono text-sm font-bold px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200",
                                timeLeft < 300 ? "text-red-500 bg-red-50 border-red-100 animate-pulse" : "text-slate-700"
                            )}>
                                <Clock className="w-3.5 h-3.5" />
                                <span className="min-w-[3rem] text-center">{formatTime(timeLeft)}</span>
                                <div className="w-px h-4 bg-slate-300" />
                                <button
                                    onClick={() => setIsRunning(!isRunning)}
                                    className="p-0.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
                                    title={isRunning ? "Pause Timer" : "Resume Timer"}
                                >
                                    {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                                </button>
                            </div>



                        </div>
                    </div>

                    {/* --- Split Screen Content --- */}
                    <div ref={containerRef} onMouseUp={handleMouseUp} className="flex-1 min-h-0 flex flex-col md:flex-row gap-0 overflow-hidden relative">

                        {/* LEFT: Reading Passage (Scrollable) */}
                        <div
                            ref={readingAreaRef}
                            className="w-full h-full bg-white px-5 py-4 overflow-y-auto hide-scrollbar relative group transition-none"
                            style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${leftWidth}%` : '100%' }}
                        >
                            {/* Text Selection Popover */}
                            <HighlighterMenu
                                isVisible={isMenuVisible}
                                position={selection || { x: 0, y: 0 }}
                                onHighlight={handleHighlight}
                            />

                            {memoizedContent}
                        </div>

                        {/* RESIZE HANDLE */}
                        <div
                            onMouseDown={() => setIsResizing(true)}
                            className={cn(
                                "hidden md:flex group/handle w-3 -mx-1.5 z-50 transition-all cursor-col-resize items-center justify-center relative",
                                isResizing && "w-4 -mx-2"
                            )}
                        >
                            <div className={cn(
                                "w-[1px] h-full bg-transparent group-hover/handle:bg-slate-300 transition-colors",
                                isResizing && "bg-slate-400 w-[2px]"
                            )} />
                            <div className={cn(
                                "absolute top-1/2 -translate-y-1/2 w-6 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-400 opacity-0 group-hover/handle:opacity-100 group-hover/handle:scale-110 transition-all",
                                isResizing && "opacity-100 text-slate-700 scale-110 border-slate-300 shadow-slate-500/10"
                            )}>
                                <GripVertical className="w-4 h-4" />
                            </div>
                        </div>

                        {/* RIGHT: Questions (Scrollable) */}
                        <div
                            className="w-full h-full bg-white px-5 py-4 overflow-y-auto hide-scrollbar"
                            style={{
                                fontSize: `${fontSize}px`,
                                width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${100 - leftWidth}%` : '100%'
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">
                                    {testData.passages
                                        ? `Questions ${testData.passages[currentPassageIndex].questionRange.start}-${testData.passages[currentPassageIndex].questionRange.end}`
                                        : `Questions 1-${testData.questions.length}`}
                                </h3>
                                <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Answer all questions</span>
                            </div>

                            <div className="space-y-8">
                                {testData.questions
                                    .filter(q => {
                                        if (!testData.passages) return true;
                                        const range = testData.passages[currentPassageIndex].questionRange;
                                        return q.id >= range.start && q.id <= range.end;
                                    })
                                    .map((q, index, arr) => {
                                        const passageQuestions = arr;
                                        const isCorrect = isSubmitted && (
                                            q.type === "fill-blank"
                                                ? (typeof answers[q.id] === 'string' && answers[q.id].trim().toLowerCase() === (q.correctAnswer as string).toLowerCase())
                                                : answers[q.id] === q.correctAnswer
                                        );
                                        const isWrong = isSubmitted && !isCorrect;

                                        const isShortOptions = q.type === "multiple-choice" && q.options
                                            ? q.options.every(opt => opt.length <= 2)
                                            : false;

                                        // Special Handling for "Raising the Mary Rose" Diagram List (Q9-13)
                                        if (testId === "fp-3" && q.id >= 9 && q.id <= 13) {
                                            if (q.id === 9) {
                                                const renderInput = (id: number) => {
                                                    const checkCorrect = (qid: number) => {
                                                        const question = testData.questions.find(x => x.id === qid);
                                                        if (!question) return false;
                                                        const userAnswer = answers[qid];
                                                        if (typeof userAnswer === 'string') {
                                                            const acceptable = (question.correctAnswer as string).split(',').map(s => s.trim().toLowerCase());
                                                            return acceptable.includes(userAnswer.trim().toLowerCase());
                                                        }
                                                        return false;
                                                    };
                                                    const isCorrect_mary = checkCorrect(id);
                                                    return (
                                                        <span id={`question-${id}`} className="inline-flex items-center gap-2 relative ml-1 mr-1">
                                                            <span className="flex-none w-6 h-6 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[11px] font-semibold bg-white shadow-sm">{id}</span>
                                                            <input type="text"
                                                                className={cn("w-36 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none transition-all text-sm shadow-sm",
                                                                    isSubmitted ? (isCorrect_mary ? "border-green-400 bg-green-50 text-green-700 shadow-green-200" : "border-red-400 bg-red-50 text-red-700 shadow-red-200") : "hover:border-[#2D3E50]/30 focus:border-[#FF851B] focus:ring-4 focus:ring-[#FF851B]/10 text-slate-700"
                                                                )}
                                                                value={answers[id] || ""}
                                                                onChange={(e) => handleAnswer(id, e.target.value)}
                                                                disabled={isSubmitted}
                                                            />
                                                            {isSubmitted && !isCorrect_mary && <span className="absolute top-full left-8 mt-1 bg-white border border-red-200 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap z-50">Answer: {String(testData.questions.find(x => x.id === id)?.correctAnswer)}</span>}
                                                        </span>
                                                    );
                                                };

                                                return (
                                                    <div key="mary-rose-list" className="mb-12">
                                                        <div className="mb-10">
                                                            <img src="https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/Screenshot%202026-02-21%20223902.png" alt="Raising the Mary Rose Diagram" className="w-full max-w-2xl mx-auto object-contain" />
                                                        </div>

                                                        <div className="border border-slate-800 bg-white p-6 sm:p-10 max-w-2xl mx-auto text-slate-800 text-[17px]">
                                                            <div className="space-y-6">
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xl leading-none">&bull;</span>
                                                                    <div className="flex items-center flex-wrap leading-loose">
                                                                        {renderInput(9)}
                                                                        <span>attached to hull by wires</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xl leading-none">&bull;</span>
                                                                    <div className="flex items-center flex-wrap leading-loose">
                                                                        {renderInput(10)}
                                                                        <span>to prevent hull being sucked into mud</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xl leading-none">&bull;</span>
                                                                    <div className="flex items-center flex-wrap leading-loose">
                                                                        <span>legs are placed into</span>
                                                                        {renderInput(11)}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xl leading-none">&bull;</span>
                                                                    <div className="flex items-center flex-wrap leading-loose">
                                                                        <span>hull is lowered into</span>
                                                                        {renderInput(12)}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xl leading-none">&bull;</span>
                                                                    <div className="flex items-center flex-wrap leading-loose">
                                                                        {renderInput(13)}
                                                                        <span>used as extra protection for the hull</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null; // Skip rendering 10-13 as they are inside the list
                                            }
                                        }

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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
                                                                            value={answers[31] || ""} onChange={(e) => handleAnswer(31, e.target.value)} disabled={isSubmitted}
                                                                        />
                                                                        in the sea
                                                                    </td>
                                                                    <td className="p-4 align-top">
                                                                        to encourage <span className="font-bold">32</span>
                                                                        <input id="question-32" type="text"
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                                                            className="mx-2 bg-transparent border-b border-black text-black font-semibold focus:outline-none focus:border-[#FF851B] w-24 text-center transition-all placeholder:text-slate-400"
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
                                            const isCorrect = isSubmitted && answers[q.id] === q.correctAnswer;
                                            return (
                                                <div id={`question-${q.id}`} key={q.id} className={cn(
                                                    "p-4 rounded-xl border transition-colors",
                                                    isSubmitted && isCorrect ? "border-green-200 bg-green-50/50" :
                                                        isSubmitted && !isCorrect ? "border-red-200 bg-red-50/50" :
                                                            "border-slate-200 hover:border-blue-300"
                                                )}>
                                                    <div className="flex items-start gap-4 mb-3">
                                                        <p className="font-medium text-slate-700 leading-relaxed pt-1">{stripLeadingNumber(q.text)}</p>
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
                                                                                ? "bg-[#2D3E50] border-[#2D3E50] text-white shadow-md scale-105"
                                                                                : "bg-white border-slate-200 text-slate-600 hover:border-[#2D3E50]/40 hover:bg-[#2D3E50]/5",
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
                                                        (q.options && q.options.length > 5) ? (
                                                            <div className="ml-12 mt-2 relative">
                                                                <select
                                                                    className={cn(
                                                                        "w-full p-4 rounded-2xl border-2 appearance-none outline-none transition-all cursor-pointer font-bold bg-white shadow-sm",
                                                                        answers[q.id] !== undefined ? "border-[#2D3E50]/60 bg-[#2D3E50]/5 text-[#2D3E50] ring-4 ring-[#2D3E50]/5" : "border-slate-200 text-slate-700 hover:border-[#2D3E50]/40 hover:bg-slate-50",
                                                                        isSubmitted && answers[q.id] === q.correctAnswer && "border-green-400 bg-green-50 text-green-800 ring-green-500/10",
                                                                        isSubmitted && answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer && "border-red-400 bg-red-50 text-red-800 ring-red-500/10",
                                                                        isSubmitted && "cursor-not-allowed"
                                                                    )}
                                                                    value={answers[q.id] !== undefined ? answers[q.id] : ""}
                                                                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                                    disabled={isSubmitted}
                                                                >
                                                                    <option value="" disabled>Choose Heading</option>
                                                                    {q.options?.map((option, index) => (
                                                                        <option key={index} value={index}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#2D3E50] bg-[#2D3E50]/5/80 rounded-full p-1 border border-[#2D3E50]/10 shadow-sm">
                                                                    <ChevronRight className="w-5 h-5 rotate-90" />
                                                                </div>
                                                                {isSubmitted && answers[q.id] !== q.correctAnswer && (
                                                                    <div className="mt-3 p-3 bg-[#2D3E50]/5 border border-[#2D3E50]/10 rounded-xl text-xs font-bold text-blue-700 animate-in fade-in slide-in-from-top-1">
                                                                        Correct: {q.options![Number(q.correctAnswer)]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-3 ml-12">
                                                                {q.options?.map((option, index) => {
                                                                    const isSelected = answers[q.id] === String(index) || answers[q.id] === index;
                                                                    return (
                                                                        <label key={index} className={cn(
                                                                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all group",
                                                                            isSelected ? "bg-[#2D3E50]/5 border-[#2D3E50]/20" : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50",
                                                                            isSubmitted && index === Number(q.correctAnswer) && "bg-green-50 border-green-200",
                                                                            isSubmitted && isSelected && index !== Number(q.correctAnswer) && "bg-red-50 border-red-200"
                                                                        )}>
                                                                            <div className={cn(
                                                                                "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                                                                isSelected ? "border-[#2D3E50] bg-[#2D3E50]" : "border-slate-300 group-hover:border-blue-400"
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
                                                        )
                                                    )}

                                                    {isSubmitted && !isCorrect && (
                                                        <div className="mt-4 ml-12 p-3 bg-[#2D3E50]/5 border border-[#2D3E50]/10 rounded-lg text-sm text-blue-800">
                                                            <span className="font-bold">Correct Answer: </span>
                                                            {typeof q.correctAnswer === 'number' && q.options
                                                                ? q.options[q.correctAnswer as number]
                                                                : q.correctAnswer}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        if (q.type === "matching") {
                                            return (
                                                <div id={`question-${q.id}`} key={q.id} className={cn(
                                                    "p-5 rounded-2xl border-2 transition-all shadow-sm",
                                                    isSubmitted && isCorrect ? "border-green-200 bg-green-50/50" :
                                                        isSubmitted && !isCorrect ? "border-red-200 bg-red-50/50" :
                                                            "border-slate-100 bg-white hover:border-[#2D3E50]/20"
                                                )}>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                        <div className="flex items-start gap-4">
                                                            <p className="font-bold text-slate-800 leading-relaxed pt-1">{stripLeadingNumber(q.text)}</p>
                                                        </div>

                                                        <div className="relative flex-1 max-w-[240px]">
                                                            <select
                                                                className={cn(
                                                                    "w-full p-3 pl-4 pr-10 rounded-xl border-2 appearance-none outline-none transition-all cursor-pointer font-bold bg-white shadow-sm text-sm",
                                                                    answers[q.id] !== undefined ? "border-blue-400 bg-[#2D3E50]/5 text-blue-900 ring-4 ring-[#2D3E50]/20" : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50",
                                                                    isSubmitted && answers[q.id] === q.correctAnswer && "border-green-400 bg-green-50 text-green-800 ring-green-500/10",
                                                                    isSubmitted && answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer && "border-red-400 bg-red-50 text-red-800 ring-red-500/10",
                                                                    isSubmitted && "cursor-not-allowed"
                                                                )}
                                                                value={answers[q.id] !== undefined ? answers[q.id] : ""}
                                                                onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                                disabled={isSubmitted}
                                                            >
                                                                <option value="" disabled>Choose Answer</option>
                                                                {q.options?.map((option, index) => (
                                                                    <option key={index} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#2D3E50]">
                                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {isSubmitted && !isCorrect && (
                                                        <div className="mt-3 ml-12 p-3 bg-[#2D3E50]/5 border border-[#2D3E50]/10 rounded-xl text-xs font-bold text-blue-700 animate-in fade-in slide-in-from-top-1">
                                                            Correct: {q.correctAnswer}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        // Determine if this question should be skipped (if it was already rendered inside another question's text)
                                        const isAlreadyRendered = passageQuestions.some(prevQ => {
                                            if (prevQ.id >= q.id) return false;
                                            if (prevQ.type !== 'fill-blank') return false;
                                            const regex = new RegExp(`(?:^|\\D)${q.id}\\s*(?:[…\\._]{2,})`);
                                            return regex.test(prevQ.text);
                                        });

                                        if (isAlreadyRendered) return null;

                                        // Find all question IDs covered by this box
                                        const coveredIds = [q.id];
                                        if (q.type === 'fill-blank') {
                                            passageQuestions.forEach(nextQ => {
                                                if (nextQ.id <= q.id) return;
                                                const regex = new RegExp(`(?:^|\\D)${nextQ.id}\\s*(?:[…\\._]{2,})`);
                                                if (regex.test(q.text)) {
                                                    coveredIds.push(nextQ.id);
                                                }
                                            });
                                        }

                                        const allCorrect = coveredIds.every(id => {
                                            const question = passageQuestions.find((pq: any) => pq.id === id);
                                            return answers[id]?.toLowerCase().trim() === String(question?.correctAnswer).toLowerCase().trim();
                                        });
                                        const anyWrong = coveredIds.some(id => {
                                            if (!answers[id]) return false;
                                            const question = passageQuestions.find((pq: any) => pq.id === id);
                                            return answers[id]?.toLowerCase().trim() !== String(question?.correctAnswer).toLowerCase().trim();
                                        });

                                        return (
                                            <div id={`question-${q.id}`} key={q.id} className={cn(
                                                "p-4 rounded-xl border transition-colors",
                                                isSubmitted && allCorrect ? "border-green-200 bg-green-50/50" :
                                                    isSubmitted && anyWrong ? "border-red-200 bg-red-50/50" :
                                                        "border-slate-100 bg-slate-50/50"
                                            )}>
                                                <div className="flex gap-3 mb-3">
                                                    <div className="w-full">
                                                        {q.image && (
                                                            <div className="mb-4 rounded-lg overflow-hidden border border-slate-200">
                                                                <img src={q.image} alt="Question Diagram" className="w-full h-auto" />
                                                            </div>
                                                        )}
                                                        {q.type === "fill-blank" ? (
                                                            <div className="font-medium text-slate-700 leading-relaxed">
                                                                {q.text.split(/([0-9]+\s*(?:[…\._]{2,}))|(?:[…\._]{2,})/).filter(Boolean).map((part, i, arr) => {
                                                                    // Check if this part contains a numbered blank (e.g. "5 ____")
                                                                    const match = part.match(/([0-9]+)\s*(?:[…\._]{2,})/);
                                                                    if (match) {
                                                                        const targetId = parseInt(match[1]);
                                                                        const targetQuestion = passageQuestions.find(pq => pq.id === targetId) || q;
                                                                        const isCorrect_target = isSubmitted && answers[targetId]?.toLowerCase().trim() === String(targetQuestion.correctAnswer).toLowerCase().trim();
                                                                        const isWrong_target = isSubmitted && answers[targetId] && !isCorrect_target;

                                                                        return (
                                                                            <span key={i}>
                                                                                <span className="font-bold text-[#2D3E50] mr-1">{targetId}</span>
                                                                                <input
                                                                                    type="text"
                                                                                    className={cn(
                                                                                        "inline-block mx-1 px-3 py-1 bg-white border-b-2 focus:outline-none transition-all w-32 text-center font-bold text-sm",
                                                                                        isSubmitted && isCorrect_target ? "border-green-500 bg-green-50 text-green-700" :
                                                                                            isSubmitted && isWrong_target ? "border-red-500 bg-red-50 text-red-700" :
                                                                                                "border-blue-400 focus:border-[#2D3E50] hover:border-[#2D3E50]/50 text-slate-800"
                                                                                    )}
                                                                                    value={answers[targetId] || ""}
                                                                                    onChange={(e) => handleAnswer(targetId, e.target.value)}
                                                                                    disabled={isSubmitted}
                                                                                    placeholder=""
                                                                                    autoComplete="off"
                                                                                />
                                                                            </span>
                                                                        );
                                                                    }

                                                                    // Check if it's a plain blank (un-numbered)
                                                                    if (part.match(/^[…\._]{2,}$/)) {
                                                                        return (
                                                                            <input
                                                                                key={i}
                                                                                type="text"
                                                                                className={cn(
                                                                                    "inline-block mx-2 px-3 py-1 bg-white border-b-2 focus:outline-none transition-all w-40 text-center font-bold text-sm",
                                                                                    isSubmitted && allCorrect ? "border-green-500 bg-green-50 text-green-700" :
                                                                                        isSubmitted && anyWrong ? "border-red-500 bg-red-50 text-red-700" :
                                                                                            "border-blue-400 focus:border-[#2D3E50] hover:border-[#2D3E50]/50 text-slate-800"
                                                                                )}
                                                                                value={answers[q.id] || ""}
                                                                                onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                                                disabled={isSubmitted}
                                                                                placeholder=""
                                                                                autoComplete="off"
                                                                            />
                                                                        );
                                                                    }

                                                                    return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
                                                                })}
                                                                {isSubmitted && anyWrong && (
                                                                    <div className="mt-3 space-y-2">
                                                                        {coveredIds.map(id => {
                                                                            const question = passageQuestions.find((pq: any) => pq.id === id);
                                                                            const isWrong_id = answers[id]?.toLowerCase().trim() !== String(question?.correctAnswer).toLowerCase().trim();
                                                                            if (!isWrong_id) return null;
                                                                            return (
                                                                                <div key={id} className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-700 animate-in fade-in slide-in-from-top-1">
                                                                                    Question {id}: Correct Answer: {question?.correctAnswer}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="font-medium text-slate-700">
                                                                <p dangerouslySetInnerHTML={{ __html: q.text }} />
                                                                {isSubmitted && !allCorrect && (
                                                                    <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-700 animate-in fade-in slide-in-from-top-1">
                                                                        Correct Answer: {q.type === "true-false" ? (q.options ? q.options[q.correctAnswer as number] : q.correctAnswer) : q.correctAnswer}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="pl-9 space-y-2">
                                                    {q.type === "true-false" && (
                                                        <div className="space-y-2">
                                                            {q.options?.map((option, optIndex) => (
                                                                <label
                                                                    key={optIndex}
                                                                    className={cn(
                                                                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                                                        answers[q.id] === optIndex
                                                                            ? "bg-[#2D3E50]/5 border-[#2D3E50]/20 ring-1 ring-[#2D3E50]/20"
                                                                            : "bg-white border-slate-200 hover:border-slate-300",
                                                                    )}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${q.id}`}
                                                                        className="w-4 h-4 text-[#2D3E50] border-slate-300 focus:ring-[#2D3E50]/50"
                                                                        checked={answers[q.id] === optIndex}
                                                                        onChange={() => handleAnswer(q.id, optIndex)}
                                                                        disabled={isSubmitted}
                                                                    />
                                                                    <span className={cn("text-sm", answers[q.id] === optIndex ? "text-blue-700 font-medium" : "text-slate-600")}>
                                                                        {option}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>




                        </div>

                    </div>
                </div>

                {/* --- Question Navigator (Fixed Bottom Bar - Always Visible) --- */}
                <div className="fixed bottom-0 left-0 right-0 z-[110]">
                    <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-1.5 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
                        <div className="max-w-[1920px] mx-auto flex items-center gap-1 overflow-x-auto custom-scrollbar-hide">
                            {testData.passages ? (
                                <>
                                    {/* Passage Tabs with Toggle */}
                                    {testData.passages.map((passage, idx) => (
                                        <div key={idx} className="flex items-center gap-0.5 shrink-0">
                                            <button
                                                onClick={() => {
                                                    if (expandedPassageTab === idx) {
                                                        setExpandedPassageTab(null);
                                                    } else {
                                                        setExpandedPassageTab(idx);
                                                        setCurrentPassageIndex(idx);
                                                    }
                                                }}
                                                className={cn(
                                                    "flex-none px-3 py-1.5 rounded-lg text-[11px] font-black transition-all duration-200 border flex items-center justify-center",
                                                    expandedPassageTab === idx
                                                        ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-md shadow-[#2D3E50]/20 scale-105"
                                                        : currentPassageIndex === idx
                                                            ? "bg-[#2D3E50]/10 text-blue-700 border-[#2D3E50]/20 hover:bg-[#2D3E50]/20"
                                                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-[#2D3E50]/5 hover:text-[#2D3E50] hover:border-[#2D3E50]/20"
                                                )}
                                            >
                                                P{idx + 1}
                                            </button>
                                            <AnimatePresence mode="popLayout">
                                                {expandedPassageTab === idx && (
                                                    <motion.div
                                                        key={`passage-questions-${idx}`}
                                                        initial={{ width: 0, opacity: 0 }}
                                                        animate={{ width: 'auto', opacity: 1 }}
                                                        exit={{ width: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        className="flex items-center gap-0.5 overflow-hidden"
                                                    >
                                                        {testData.questions
                                                            .filter(q => q.id >= passage.questionRange.start && q.id <= passage.questionRange.end)
                                                            .map((q, qIdx) => {
                                                                const isAnswered = (answers[q.id] !== undefined && answers[q.id] !== "");
                                                                return (
                                                                    <motion.button
                                                                        key={q.id}
                                                                        initial={{ scale: 0, opacity: 0 }}
                                                                        animate={{ scale: 1, opacity: 1 }}
                                                                        exit={{ scale: 0, opacity: 0 }}
                                                                        transition={{ delay: qIdx * 0.02, type: 'spring', damping: 15, stiffness: 300 }}
                                                                        onClick={() => {
                                                                            setCurrentPassageIndex(idx);
                                                                            setTimeout(() => {
                                                                                document.getElementById(`question-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                            }, 50);
                                                                        }}
                                                                        className={cn(
                                                                            "flex-none w-6 h-6 rounded text-[9px] font-black transition-colors border flex items-center justify-center",
                                                                            isAnswered
                                                                                ? "bg-[#2D3E50] text-white border-[#2D3E50]"
                                                                                : "bg-white text-slate-400 border-slate-200 hover:border-blue-400 hover:text-[#2D3E50] hover:bg-[#2D3E50]/5"
                                                                        )}
                                                                    >
                                                                        {q.id}
                                                                    </motion.button>
                                                                );
                                                            })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {idx < testData.passages!.length - 1 && (
                                                <div className="w-px h-5 bg-slate-200 mx-0.5" />
                                            )}
                                        </div>
                                    ))}

                                    {/* Back / Next buttons */}
                                    <div className="ml-auto flex items-center gap-1 shrink-0">
                                        <button
                                            onClick={() => setCurrentPassageIndex(prev => Math.max(0, prev - 1))}
                                            disabled={currentPassageIndex === 0}
                                            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[11px] active:scale-95"
                                        >
                                            <ChevronRight className="w-3 h-3 rotate-180" />
                                            Back
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (currentPassageIndex === testData.passages!.length - 1) {
                                                    handleSubmit();
                                                } else {
                                                    setCurrentPassageIndex(prev => Math.min(testData.passages!.length - 1, prev + 1));
                                                }
                                            }}
                                            disabled={isSubmitted && currentPassageIndex === testData.passages!.length - 1}
                                            className={cn(
                                                "flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-all text-[11px] active:scale-95",
                                                currentPassageIndex === testData.passages!.length - 1
                                                    ? isSubmitted
                                                        ? "bg-slate-400 text-white cursor-not-allowed"
                                                        : "bg-[#2D3E50] text-white hover:bg-blue-700"
                                                    : "bg-[#2D3E50] text-white hover:bg-blue-700"
                                            )}
                                        >
                                            {currentPassageIndex === testData.passages!.length - 1 ? (
                                                isSubmitted ? "Submitted" : "Submit"
                                            ) : (
                                                "Next"
                                            )}
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Single-Part: show all questions */
                                testData.questions.map((q) => {
                                    const isAnswered = (answers[q.id] !== undefined && answers[q.id] !== "") || (testId === "fp-12" && q.id >= 30 && q.id <= 36 && answers[q.id]);
                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => {
                                                document.getElementById(`question-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                            className={cn(
                                                "flex-none w-7 h-7 rounded text-[9px] font-black transition-all border flex items-center justify-center",
                                                isAnswered
                                                    ? "bg-[#2D3E50] text-white border-[#2D3E50]"
                                                    : "bg-white text-slate-400 border-slate-100 hover:border-blue-400 hover:text-[#2D3E50] hover:bg-[#2D3E50]/5"
                                            )}
                                        >
                                            {q.id}
                                        </button>
                                    );
                                })
                            )}
                            {/* Submit button (always right-aligned) */}
                            {!testData.passages && (
                                <div className="ml-auto shrink-0">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitted}
                                        className={cn(
                                            "flex items-center gap-1 px-3 py-1 rounded-md font-bold transition-all text-[11px] active:scale-95",
                                            isSubmitted
                                                ? "bg-slate-400 text-white cursor-not-allowed"
                                                : "bg-[#2D3E50] text-white hover:bg-blue-700"
                                        )}
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                        {isSubmitted ? "Submitted" : "Submit Test"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
}
