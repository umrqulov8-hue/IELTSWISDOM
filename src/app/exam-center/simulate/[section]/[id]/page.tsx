"use client";

import React, { use, useState, useEffect, useCallback, useRef, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { READING_TESTS } from "@/data/reading-tests";
import { LISTENING_TESTS } from "@/data/listening-tests";
import { WRITING_TESTS } from "@/data/writing-tests";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { CDILayout } from "@/components/exam/CDILayout";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Clock, LayoutList, PenTool, Mic, GripVertical, ChevronRight, Highlighter, MousePointer2, Copy, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Memoized Passage Renderer to prevent highlight wiping on re-renders
const PassageRenderer = memo(({ title, content }: { title: string; content: string }) => {
    return (
        <>
            <h2 className="text-3xl font-black mb-8">{title}</h2>
            <div 
                id="passage-content-container"
                dangerouslySetInnerHTML={{ __html: content }} 
            />
        </>
    );
});
PassageRenderer.displayName = "PassageRenderer";

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
    const [isVideoEnded, setIsVideoEnded] = useState(false);

    // Timer State
    const [duration, setDuration] = useState(0);

    // Reading Resizer state
    const [leftWidth, setLeftWidth] = useState(50);
    const [isResizing, setIsResizing] = useState(false);

    // Scrolling and Highlighting State
    const containerRef = useRef<HTMLDivElement>(null);
    const passageRef = useRef<HTMLDivElement>(null);
    const questionsRef = useRef<HTMLDivElement>(null);

    // Scroll isolation is handled entirely by CSS:
    // Each panel uses overflow-y-auto + overscroll-behavior: contain
    // This prevents scroll chaining between panels natively in the browser.

    // Highlighting Logic
    const [showHighlightToolbar, setShowHighlightToolbar] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const savedRangeRef = useRef<Range | null>(null);
    const [contextTarget, setContextTarget] = useState<HTMLElement | null>(null);

    const handleTextSelection = (e: React.MouseEvent) => {
        // Use requestAnimationFrame for smoother capture
        requestAnimationFrame(() => {
            const selection = window.getSelection();
            if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // Check if selection is inside the reading container
                if (!containerRef.current?.contains(range.commonAncestorContainer)) {
                    setShowHighlightToolbar(false);
                    return;
                }

                const rect = range.getBoundingClientRect();
                savedRangeRef.current = range.cloneRange();
                setToolbarPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 52
                });
                setShowHighlightToolbar(true);
            } else {
                // Clicking outside or empty selection
                if (!showContextMenu) {
                    setShowHighlightToolbar(false);
                    savedRangeRef.current = null;
                }
            }
        });
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const highlightSpan = target.closest('[data-highlight]') as HTMLElement | null;

        if (highlightSpan) {
            e.preventDefault();
            setContextTarget(highlightSpan);
            setContextMenuPosition({ x: e.clientX, y: e.clientY });
            setShowContextMenu(true);
        } else if (containerRef.current?.contains(target)) {
            // Allow normal right-click on non-highlighted text
            setShowContextMenu(false);
        }
    };

    const applyHighlight = (color: 'yellow' | 'green' | 'blue') => {
        const range = savedRangeRef.current;
        if (!range) return;

        const colors = {
            yellow: '#FFF59D',
            green: '#C8E6C9',
            blue: '#2D3E50'
        };

        try {
            // Restore selection visually for feedback
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }

            const bgColor = colors[color];

            // Robust Fallback: TreeWalker for multi-element selections
            const root = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
                ? range.commonAncestorContainer.parentNode! 
                : range.commonAncestorContainer;
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
            
            const nodes: Text[] = [];
            let node;
            while ((node = walker.nextNode())) {
                if (range.intersectsNode(node)) nodes.push(node as Text);
            }

            // If no nodes found but it's a text node, add it
            if (nodes.length === 0 && range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
                nodes.push(range.commonAncestorContainer as Text);
            }

            // Process nodes in REVERSE document order to prevent index shifting
            nodes.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? 1 : -1)
                .forEach(textNode => {
                    const start = textNode === range.startContainer ? range.startOffset : 0;
                    const end = textNode === range.endContainer ? range.endOffset : textNode.length;
                    
                    if (start >= end) return;

                    // 1. Split at the end first
                    if (end < textNode.length) {
                        textNode.splitText(end);
                    }
                    
                    // 2. Split at the start (returns the node we want to highlight)
                    const highlightNode = start > 0 ? textNode.splitText(start) : textNode;

                    const span = document.createElement('span');
                    span.className = `hlt-${color}`;
                    span.setAttribute('data-highlight', color);
                    span.style.backgroundColor = colors[color];
                    span.style.color = color === 'blue' ? 'white' : 'inherit';
                    span.style.borderRadius = '2px';
                    span.style.padding = '0';
                    span.style.cursor = 'pointer';
                    span.style.display = 'inline';
                    
                    highlightNode.parentNode?.insertBefore(span, highlightNode);
                    span.appendChild(highlightNode);
                });

            selection?.removeAllRanges();
            toast.success('Highlighted');
        } catch (err) {
            console.error('Highlight error:', err);
            toast.error('Could not apply highlight');
        }

        setShowHighlightToolbar(false);
        savedRangeRef.current = null;
    };

    const removeHighlight = () => {
        if (!contextTarget) return;

        const parent = contextTarget.parentNode;
        if (parent) {
            // Unwrap: replace the span with its children
            while (contextTarget.firstChild) {
                parent.insertBefore(contextTarget.firstChild, contextTarget);
            }
            parent.removeChild(contextTarget);
            parent.normalize();
        }
        setShowContextMenu(false);
        setContextTarget(null);
    };

    const copyFromContextMenu = () => {
        if (contextTarget) {
            navigator.clipboard.writeText(contextTarget.textContent || '');
            toast.success('Copied to clipboard');
        }
        setShowContextMenu(false);
    };

    const copySelection = () => {
        if (savedRangeRef.current) {
            navigator.clipboard.writeText(savedRangeRef.current.toString());
            toast.success('Text copied to clipboard');
        }
        setShowHighlightToolbar(false);
        savedRangeRef.current = null;
    };

    const copyQuestionPath = (qId: string | number) => {
        const passageName = currentPart?.title || `Passage ${currentPartIndex + 1}`;
        const path = `Reading Test → ${passageName} → Question ${qId}`;
        navigator.clipboard.writeText(path);
        toast.success(`Path copied: Q${qId}`);
    };

    // Close menus on outside click
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            setShowContextMenu(false);
            // Only close toolbar if not clicking inside it
            const toolbar = document.getElementById('ielts-highlight-toolbar');
            if (toolbar && !toolbar.contains(e.target as Node)) {
                // Don't hide on mouseup that triggered the selection
            }
        };
        window.addEventListener('mousedown', handle);
        return () => window.removeEventListener('mousedown', handle);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const newWidth = (e.clientX / window.innerWidth) * 100;
            if (newWidth > 20 && newWidth < 80) {
                setLeftWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

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
            data = WRITING_TESTS[testId] || {
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

    // Break Timer / Next Section transition
    const goToNextSection = useCallback(() => {
        const nextSectionMap: Record<string, string> = {
            listening: "reading",
            reading: "writing",
            writing: "speaking",
            speaking: "dashboard"
        };
        const nextSection = nextSectionMap[section as string];

        if (nextSection === "dashboard") {
            router.push(`/exam-center/simulate/results/${testId}`);
        } else {
            router.push(`/exam-center/simulate/${nextSection}/${testId}`);
            setIsBreak(false);
            setIsVideoEnded(false);
            setIsSubmitted(false);
            setCurrentPartIndex(0);
            setAnswers({});
        }
    }, [section, testId, router]);

    const handleSubmit = async () => {
        if (isSubmitted) return;
        setIsSubmitted(true);

        try {
            // Calculate score for Reading/Listening
            let score = 0;
            let total = 0;

            if (section === "reading") {
                // For Reading: Questions are at the root
                (testData.questions || []).forEach((q: any) => {
                    total++;
                    const userAns = (answers[q.id.toString()] || "").trim().toLowerCase();
                    const correctAns = (q.correctAnswer || "").toString().toLowerCase();
                    if (userAns && userAns === correctAns) score++;
                });
            } else if (section === "listening") {
                // For Listening: Questions are nested in parts
                (testData.parts || []).forEach((p: any) => {
                    (p.questions || []).forEach((q: any) => {
                        total++;
                        const userAns = (answers[q.id.toString()] || "").trim().toLowerCase();
                        const correctAns = (q.correctAnswer || "").toString().toLowerCase();
                        if (userAns && userAns === correctAns) score++;
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
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred during submission, but your progress is being preserved.");
        } finally {
            // Show break screen for transitions, but for the final section (speaking), go to results
            if (section === "speaking") {
                router.push(`/exam-center/simulate/results/${testId}`);
            } else {
                setIsBreak(true);
            }
        }
    };

    if (!testData) return <div className="p-20 text-center font-bold">Loading Test Data...</div>;

    const totalParts = section === "reading" 
        ? (testData.passages?.length || 1) 
        : section === "writing" 
            ? (testData.tasks?.length || 1) 
            : (testData.parts?.length || 1);

    const currentPart = section === "reading" 
        ? (testData.passages ? testData.passages[currentPartIndex] : testData) 
        : section === "writing"
            ? testData.tasks[currentPartIndex]
            : testData.parts[currentPartIndex];

    const totalQ = section === "reading" 
        ? (testData.questions?.length || 0) 
        : section === "writing"
            ? (testData.tasks?.length || 0)
            : (testData.parts?.reduce((acc: number, p: any) => acc + (p.questions?.length || 0), 0) || 0);
    const currentQCount = Object.keys(answers).length;

    if (isBreak) {
        const nextSectionMap: Record<string, string> = {
            listening: "reading",
            reading: "writing",
            writing: "speaking",
            speaking: "dashboard"
        };
        const nextSection = nextSectionMap[section as string];
        
        const getSectionData = (sec: string) => {
            switch(sec) {
                case "reading": return { title: "Reading", timing: "60 minutes", video: "/test%20uchun%20video/reading.mp4" };
                case "writing": return { title: "Writing", timing: "60 minutes", video: null };
                case "speaking": return { title: "Speaking", timing: "11-14 minutes", video: null };
                default: return { title: "Next Section", timing: "", video: null };
            }
        };

        const secData = getSectionData(nextSection);

        return (
            <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
                {/* Header matching pre-check */}
                <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="text-red-600 font-extrabold text-4xl tracking-tighter">IELTS</div>
                        <div className="flex flex-col text-sm text-slate-800 font-medium pl-4 border-l border-slate-200">
                            <span className="text-slate-900 leading-tight">123456</span>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl w-full mx-auto px-4 py-8 space-y-4">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{secData.title}</h3>
                            <div className="text-red-500 font-medium mb-4">Not completed</div>
                            <div className="text-slate-600 mb-6">Timing: {secData.timing}</div>

                            {secData.video ? (
                                <div className="mt-6">
                                    <video 
                                        src={secData.video}
                                        controls
                                        autoPlay
                                        controlsList="nodownload noremoteplayback"
                                        onContextMenu={(e) => e.preventDefault()}
                                        disablePictureInPicture
                                        onEnded={() => setIsVideoEnded(true)}
                                        className="w-full rounded-lg border border-slate-200 shadow-sm mb-6"
                                    />
                                    {isVideoEnded && (
                                        <button
                                            onClick={goToNextSection}
                                            className="px-6 py-3 bg-[#0f172a] text-white rounded-lg font-bold shadow-md hover:bg-slate-800 transition-colors mt-6"
                                        >
                                            Start {secData.title}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-6">
                                    <button
                                        onClick={goToNextSection}
                                        className="px-6 py-3 bg-[#0f172a] text-white rounded-lg font-bold shadow-md hover:bg-slate-800 transition-colors mt-6"
                                    >
                                        Start {secData.title}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        );
    }

    return (
        <CDILayout
            title={testData.title || "IELTS Mock Test"}
            section={section.charAt(0).toUpperCase() + section.slice(1) as any}
            duration={duration}
            onFinish={handleSubmit}
            currentPart={currentPartIndex}
            totalParts={totalParts}
            onPartChange={setCurrentPartIndex}
            questionsHandled={{ current: currentQCount, total: totalQ }}
        >
            <div className="flex-1 min-h-0 relative">
                {section === "reading" && (
                    <div ref={containerRef} onMouseUp={handleTextSelection} onContextMenu={handleContextMenu} className={cn(
                        "flex h-full gap-0 bg-white overflow-hidden relative",
                        isResizing && "cursor-col-resize select-none"
                    )}>
                         {/* LEFT: Reading Passage (Scrollable) - DUAL SCROLL ISOLATED */}
                        <div 
                            ref={passageRef}
                             className="h-full overflow-y-auto p-10 lg:p-14 border-r border-slate-100 prose prose-slate max-w-none prose-h2:text-2xl prose-h2:mb-6 prose-p:leading-[1.85] prose-p:text-[15px] selection:bg-yellow-100"
                            style={{ width: `${leftWidth}%`, scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
                        >
                            <PassageRenderer title={currentPart.title} content={currentPart.content} />
                        </div>

                        {/* FLOATING HIGHLIGHT TOOLBAR */}
                        <AnimatePresence>
                            {showHighlightToolbar && (
                                <motion.div
                                    id="ielts-highlight-toolbar"
                                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, y: 6 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ 
                                        position: 'fixed',
                                        left: toolbarPosition.x,
                                        top: toolbarPosition.y,
                                        transform: 'translateX(-50%)',
                                        zIndex: 1000
                                    }}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onMouseUp={(e) => e.stopPropagation()}
                                    className="flex items-center gap-0.5 bg-[#2D3E50] text-white px-1 py-1 rounded-xl shadow-2xl border border-white/10"
                                >
                                    <div className="flex items-center gap-1.5 px-2 py-1.5">
                                        <button
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => applyHighlight('yellow')}
                                            className="w-6 h-6 rounded-full bg-[#FFF59D] border border-white/20 transition-transform hover:scale-110 shadow-sm"
                                            title="Highlight Yellow"
                                        />
                                        <button
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => applyHighlight('green')}
                                            className="w-6 h-6 rounded-full bg-[#C8E6C9] border border-white/20 transition-transform hover:scale-110 shadow-sm"
                                            title="Highlight Green"
                                        />
                                            <button
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={() => applyHighlight('blue')}
                                                className="w-6 h-6 rounded-full bg-[#2D3E50] border border-white/20 transition-transform hover:scale-110 shadow-sm"
                                                title="Highlight Blue"
                                            />
                                    </div>
                                    <div className="w-px h-4 bg-white/20" />
                                    <button
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={copySelection}
                                        className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Copy className="w-3 h-3 text-white/70" />
                                        <span className="text-xs font-semibold">Copy</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RIGHT-CLICK CONTEXT MENU */}
                        <AnimatePresence>
                            {showContextMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                    transition={{ duration: 0.1 }}
                                    style={{ 
                                        position: 'fixed',
                                        left: contextMenuPosition.x,
                                        top: contextMenuPosition.y,
                                        zIndex: 1001
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/15 min-w-[175px] py-1 overflow-hidden"
                                >
                                    <button
                                        onClick={copyFromContextMenu}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                                    >
                                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-xs font-bold text-slate-700">Copy Text</span>
                                    </button>
                                    <div className="h-px bg-slate-100 mx-2" />
                                    <button
                                        onClick={removeHighlight}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group"
                                    >
                                        <MousePointer2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
                                        <span className="text-xs font-bold text-slate-700 group-hover:text-red-600">Remove Highlight</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RESIZE HANDLE (Matching Practice Page) */}
                        <div
                            onMouseDown={() => setIsResizing(true)}
                            className={cn(
                                "hidden md:flex group/handle w-3 -mx-1.5 z-[60] transition-all cursor-col-resize items-center justify-center relative",
                                isResizing && "w-4 -mx-2"
                            )}
                        >
                            <div className={cn(
                                "w-[1px] h-full bg-transparent group-hover/handle:bg-slate-300 transition-colors",
                                isResizing && "bg-slate-400 w-[2px]"
                            )} />
                            <div className={cn(
                                "absolute top-1/2 -translate-y-1/2 w-8 h-12 bg-white border border-slate-200 rounded-2xl shadow-xl flex items-center justify-center text-slate-400 opacity-0 group-hover/handle:opacity-100 group-hover/handle:scale-110 transition-all",
                                isResizing && "opacity-100 text-slate-700 scale-110 border-slate-300 shadow-[#2D3E50]/15"
                            )}>
                                <div className="flex flex-col gap-0.5 items-center justify-center">
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Questions (Scrollable) - DUAL SCROLL ISOLATED */}
                        <div 
                            ref={questionsRef}
                            className="h-full overflow-y-auto p-10 lg:p-14 bg-[#F8F9FB]"
                            style={{ width: `${100 - leftWidth}%`, overscrollBehavior: 'contain' }}
                        >
                            <div className="max-w-5xl mx-auto">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                                    <h3 className="text-xl font-black text-slate-800">
                                        Questions {currentPart.questionRange.start}-{currentPart.questionRange.end}
                                    </h3>
                                </div>

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
                                    isSubmitted={isSubmitted}
                                    onCopyPath={copyQuestionPath}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {section === "listening" && (
                    <div ref={containerRef} onMouseUp={handleTextSelection} onContextMenu={handleContextMenu} className="h-full overflow-y-auto bg-white relative" style={{ overscrollBehavior: 'contain' }}>
                        <div className="max-w-6xl mx-auto w-full space-y-6 px-8 py-4">
                            <div className="w-full">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-slate-800">{currentPart.title}</h2>
                                    {currentPart.audioUrl && (
                                        <audio
                                            autoPlay
                                            controls
                                            src={currentPart.audioUrl}
                                            className="h-10"
                                        />
                                    )}
                                </div>
                                {currentPart.content.includes("<!-- QUESTIONS_PLACEHOLDER -->") ? (
                                    <>
                                        <div 
                                            id="passage-content-container-1"
                                            dangerouslySetInnerHTML={{ __html: currentPart.content.split("<!-- QUESTIONS_PLACEHOLDER -->")[0] }} 
                                            className="prose prose-slate max-w-none mb-8" 
                                            onInput={handlePassageInput}
                                        />
                                        <QuestionsList
                                            questions={currentPart.questions}
                                            answers={answers}
                                            onAnswerChange={handleAnswerChange}
                                            htmlContent={currentPart.content}
                                        />
                                        <div 
                                            id="passage-content-container-2"
                                            dangerouslySetInnerHTML={{ __html: currentPart.content.split("<!-- QUESTIONS_PLACEHOLDER -->")[1] }} 
                                            className="prose prose-slate max-w-none mt-8" 
                                            onInput={handlePassageInput}
                                        />
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {section === "writing" && (
                    <div className="max-w-none mx-auto h-full flex flex-col gap-4">
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
                                        <span className="text-[#2D3E50]">{(answers[`task-${currentPartIndex}`] || "").trim().split(/\s+/).filter(Boolean).length}</span>
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
                            <div className="inline-flex items-center gap-2 bg-[#2D3E50]/10 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#2D3E50]/20">
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
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 font-mono font-bold text-slate-400 group-hover:bg-[#2D3E50] group-hover:text-white transition-all">
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

function QuestionsList({ questions, answers, onAnswerChange, htmlContent, isSubmitted, onCopyPath }: any) {
    const stripLeadingNumber = (text: string) => {
        if (!text) return "";
        // Remove patterns like "1. ", "1) ", or start with "1 " 
        return text.replace(/^[0-9]+[\.\)\s]+\s*/, "");
    };

    return (
        <div className="space-y-6">
            {questions.map((q: any, index: number, arr: any[]) => {
                const passageQuestions = arr;
                
                // Special handling for already rendered identifiers
                const isAlreadyRendered = passageQuestions.some(prevQ => {
                    if (prevQ.id >= q.id) return false;
                    if (prevQ.type !== 'fill-blank') return false;
                    const regex = new RegExp(`(?:^|\\D)${q.id}\\s*(?:[…\\._]{2,})`);
                    return regex.test(prevQ.text || "");
                });

                if (isAlreadyRendered) return null;

                // Check if this specific question is manually rendered in the HTML content
                // We look for 'id="q-X"' or 'id=\'q-X\''
                const isEmbeddedInHtml = htmlContent && (
                    htmlContent.includes(`id="q-${q.id}"`) || 
                    htmlContent.includes(`id='q-${q.id}'`)
                );

                if (isEmbeddedInHtml) return null;

                // Find all question IDs covered by this box (for grouped fill-blanks)
                const coveredIds = [q.id];
                if (q.type === 'fill-blank') {
                    passageQuestions.forEach(nextQ => {
                        if (nextQ.id <= q.id) return;
                        const regex = new RegExp(`(?:^|\\D)${nextQ.id}\\s*(?:[…\\._]{2,})`);
                        if (regex.test(q.text || "")) {
                            coveredIds.push(nextQ.id);
                        }
                    });
                }

                const allCorrect = coveredIds.every(id => {
                    const question = passageQuestions.find((pq: any) => pq.id === id);
                    if (!question) return false;
                    return answers[id.toString()]?.toLowerCase().trim() === question.correctAnswer?.toString().toLowerCase().trim();
                });
                const anyWrong = coveredIds.some(id => {
                    const val = answers[id.toString()];
                    if (!val) return false;
                    const question = passageQuestions.find((pq: any) => pq.id === id);
                    return val.toLowerCase().trim() !== question?.correctAnswer?.toString().toLowerCase().trim();
                });

                return (
                    <div id={`question-${q.id}`} key={q.id} className={cn(
                        "p-5 rounded-2xl border-2 transition-all",
                        isSubmitted && allCorrect ? "border-green-200 bg-green-50/50" :
                            isSubmitted && anyWrong ? "border-red-200 bg-red-50/50" :
                                "border-slate-100 bg-white hover:border-[#2D3E50]/10"
                    )}>

                        <div className="w-full">
                                {q.type === "multiple-choice" && (
                                    <div className="space-y-4">
                                        <p className="font-bold text-slate-800 leading-relaxed pt-1">{stripLeadingNumber(q.text)}</p>
                                        <div className="space-y-3">
                                            {q.options?.map((option: string, i: number) => {
                                                const isSelected = answers[q.id.toString()] === i.toString();
                                                const isCorrectOpt = isSubmitted && i.toString() === q.correctAnswer?.toString();
                                                const isWrongOpt = isSubmitted && isSelected && i.toString() !== q.correctAnswer?.toString();

                                                return (
                                                    <label key={i} className={cn(
                                                        "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all group",
                                                        isSelected ? "border-[#2D3E50] bg-[#2D3E50]/5" : "border-slate-100 bg-slate-50/30 hover:border-slate-200 hover:bg-slate-50",
                                                        isCorrectOpt && "border-green-500 bg-green-50",
                                                        isWrongOpt && "border-red-500 bg-red-50"
                                                    )}>
                                                        <input 
                                                            type="radio" 
                                                            className="hidden" 
                                                            checked={isSelected}
                                                            onChange={() => !isSubmitted && onAnswerChange(q.id.toString(), i.toString())}
                                                            disabled={isSubmitted}
                                                        />
                                                        <div className={cn(
                                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                            isSelected ? "border-[#2D3E50] bg-[#2D3E50]" : "border-slate-300 group-hover:border-[#2D3E50]/50"
                                                        )}>
                                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                                                        </div>
                                                        <span className={cn("text-base font-medium", isSelected ? "text-[#2D3E50]" : "text-slate-700")}>
                                                            <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                                                            {option}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {q.type === "matching" && (
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <p className="font-bold text-slate-800 leading-relaxed pt-1">{stripLeadingNumber(q.text)}</p>
                                        <div className="relative w-full sm:w-64">
                                            <select
                                                className={cn(
                                                    "w-full p-3 pr-10 rounded-xl border-2 appearance-none outline-none transition-all font-bold bg-white text-sm",
                                                    answers[q.id.toString()] ? "border-[#2D3E50]/60 bg-[#2D3E50]/5 text-[#2D3E50]" : "border-slate-200 text-slate-700 hover:border-[#2D3E50]/40",
                                                    isSubmitted && answers[q.id.toString()] === q.correctAnswer?.toString() && "border-green-400 bg-green-50 text-green-800",
                                                    isSubmitted && answers[q.id.toString()] && answers[q.id.toString()] !== q.correctAnswer?.toString() && "border-red-400 bg-red-50 text-red-800"
                                                )}
                                                value={answers[q.id.toString()] || ""}
                                                onChange={(e) => onAnswerChange(q.id.toString(), e.target.value)}
                                                disabled={isSubmitted}
                                            >
                                                <option value="">Choose Answer</option>
                                                {q.options?.map((opt: string, i: number) => (
                                                    <option key={i} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {q.type === "fill-blank" && (
                                    <div className="font-medium text-slate-700 leading-relaxed pt-1">
                                        {stripLeadingNumber(q.text).split(/([0-9]+\s*(?:[…\._]{2,}))|(?:[…\._]{2,})/).filter(Boolean).map((part: string, i: number) => {
                                            const match = part.match(/([0-9]+)\s*(?:[…\._]{2,})/);
                                            if (match) {
                                                const targetId = parseInt(match[1]);
                                                const targetQuestion = passageQuestions.find(pq => pq.id === targetId) || q;
                                                const isCorrect_target = isSubmitted && answers[targetId.toString()]?.toLowerCase().trim() === targetQuestion.correctAnswer?.toString().toLowerCase().trim();
                                                const isWrong_target = isSubmitted && answers[targetId.toString()] && !isCorrect_target;

                                                return (
                                                    <span key={i} className="inline-flex items-center">
                                                        <span className="font-black text-[#FF851B] mx-1">{targetId}</span>
                                                        <input
                                                            type="text"
                                                            className={cn(
                                                                "mx-1 px-3 py-1 bg-white border-b-2 outline-none transition-all w-32 md:w-36 text-center font-black text-sm",
                                                                isSubmitted ? (
                                                                    isCorrect_target ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"
                                                                ) : "border-[#2D3E50]/40 focus:border-[#FF851B] focus:ring-4 focus:ring-[#FF851B]/5 hover:border-[#FF851B]/60 text-slate-900"
                                                            )}
                                                            value={answers[targetId.toString()] || ""}
                                                            onChange={(e) => onAnswerChange(targetId.toString(), e.target.value)}
                                                            disabled={isSubmitted}
                                                            autoComplete="off"
                                                        />
                                                    </span>
                                                );
                                            }

                                            if (part.match(/^[…\._]{2,}$/)) {
                                                const isCorrect_q = isSubmitted && answers[q.id.toString()]?.toLowerCase().trim() === q.correctAnswer?.toString().toLowerCase().trim();
                                                const isWrong_q = isSubmitted && answers[q.id.toString()] && !isCorrect_q;

                                                return (
                                                    <input
                                                        key={i}
                                                        type="text"
                                                        className={cn(
                                                            "mx-1 px-3 py-1 bg-white border-b-2 outline-none transition-all w-36 md:w-40 text-center font-black text-sm",
                                                            isSubmitted ? (
                                                                isCorrect_q ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"
                                                            ) : "border-blue-400 focus:border-[#2D3E50] focus:ring-4 focus:ring-[#2D3E50]/10 hover:border-[#2D3E50]/50 text-slate-900"
                                                        )}
                                                        value={answers[q.id.toString()] || ""}
                                                        onChange={(e) => onAnswerChange(q.id.toString(), e.target.value)}
                                                        disabled={isSubmitted}
                                                        autoComplete="off"
                                                    />
                                                );
                                            }

                                            return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
                                        })}
                                    </div>
                                )}

                                {q.type === "true-false" && (
                                    <div className="space-y-4">
                                        <p className="font-bold text-slate-800 leading-relaxed pt-1">{stripLeadingNumber(q.text)}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["TRUE", "FALSE", "NOT GIVEN"].map((val) => {
                                                const isSelected = answers[q.id.toString()] === val;
                                                const isCorrectVal = isSubmitted && val === q.correctAnswer?.toString().toUpperCase();
                                                const isWrongVal = isSubmitted && isSelected && val !== q.correctAnswer?.toString().toUpperCase();

                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => !isSubmitted && onAnswerChange(q.id.toString(), val)}
                                                        className={cn(
                                                            "px-4 py-2 rounded-xl text-xs font-black border-2 transition-all",
                                                            isSelected ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-500 border-slate-100 hover:border-slate-200",
                                                            isCorrectVal && "bg-green-600 text-white border-green-600",
                                                            isWrongVal && "bg-red-600 text-white border-red-600"
                                                        )}
                                                        disabled={isSubmitted}
                                                    >
                                                        {val}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {isSubmitted && anyWrong && (
                                    <div className="mt-4 space-y-2">
                                        {coveredIds.map(id => {
                                            const question = passageQuestions.find((pq: any) => pq.id === id);
                                            const val = answers[id.toString()] || "";
                                            const isWrong_id = val.toLowerCase().trim() !== question?.correctAnswer?.toString().toLowerCase().trim();
                                            if (!isWrong_id) return null;
                                            return (
                                                <div key={id} className="p-3 bg-[#2D3E50]/5 border border-[#2D3E50]/10 rounded-xl text-xs font-bold text-blue-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                    Question {id}: Correct Answer is "{question?.correctAnswer}"
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                    </div>
                );
            })}
        </div>
    );
}
