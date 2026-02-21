"use client";

import { use, useState, useEffect, useRef } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import { Play, Pause, Volume2, MoreVertical, Menu, Headphones, AlertCircle, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ListeningTestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const testId = resolvedParams.id;
    const testData = LISTENING_TESTS[testId];

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(100); // Mock duration
    const contentRef = useRef<HTMLDivElement>(null);

    // Audio Player Mock Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentTime < duration) {
            interval = setInterval(() => {
                setCurrentTime(prev => prev + 1);
            }, 1000);
        } else if (currentTime >= duration) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTime, duration]);

    // Attach event listeners to dangerouslySetInnerHTML inputs
    useEffect(() => {
        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target && target.tagName === 'INPUT' && target.id.startsWith('q-')) {
                const questionId = target.id.replace('q-', '');
                setAnswers(prev => ({ ...prev, [questionId]: target.value }));

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
    }, []);

    const formatTime = (timeInSeconds: number) => {
        const m = Math.floor(timeInSeconds / 60);
        const s = Math.floor(timeInSeconds % 60);
        return `\${m}:\${s < 10 ? '0' : ''}\${s}`;
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

    const currentPart = testData.parts[0]; // Assuming Part 1 for UI mockup

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Top Red Promotional Banner */}
            <div className="bg-[#cc0000] text-white text-center py-2.5 px-4 font-bold text-sm tracking-wide">
                24 Hours Only: Get 99% Off on Our Premium Plan - <a href="#" className="underline decoration-white/50 hover:decoration-white transition-all">Check Out Now!</a>
            </div>

            <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-8 py-6">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-bold text-slate-800">
                        {currentPart.title}
                    </h1>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Audio Player Component */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center gap-4 mb-6 relative overflow-hidden">
                    {/* Scrubber Background track */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-200">
                        <div
                            className="h-full bg-slate-800 transition-all duration-100"
                            style={{ width: `\${(currentTime / duration) * 100}%` }}
                        />
                    </div>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 flex-none rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors bg-white shadow-sm border border-slate-200"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                    </button>

                    <div className="text-sm font-medium font-mono text-slate-600 min-w-[5.5rem]">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Custom Scrubber */}
                    <div className="flex-1 relative items-center hidden md:flex h-3 group cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        setCurrentTime(percent * duration);
                    }}>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#cc0000]" style={{ width: `\${(currentTime / duration) * 100}%` }} />
                        </div>
                        {/* Fake Scrubber knob */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[#cc0000] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `calc(\${(currentTime / duration) * 100}% - 7px)` }}
                        />
                    </div>

                    <div className="flex items-center gap-3 text-slate-500 ml-auto">
                        <button className="p-1.5 hover:bg-slate-200 rounded-md transition-colors"><Volume2 className="w-5 h-5" /></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded-md transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Instructions */}
                <h2 className="text-lg font-medium text-slate-700 mb-4">{currentPart.instructions}</h2>

                <button className="flex items-center gap-2 bg-white border border-slate-300 shadow-sm hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-md transition-all text-sm mb-6">
                    <Headphones className="w-4 h-4 text-slate-500" />
                    Listen from Here
                </button>

                {/* Content Box */}
                <div className="border border-slate-300 rounded-sm bg-white p-6 md:p-8 min-h-[500px]">
                    <div
                        ref={contentRef}
                        className="prose prose-slate max-w-none text-slate-800 focus-within:prose-input:ring-blue-500"
                        dangerouslySetInnerHTML={{ __html: currentPart.content }}
                    />
                </div>
            </main>

            {/* Bottom Sticky Action Bar */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 mt-8 flex justify-end shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
                <button className="bg-[#00a82d] hover:bg-[#008f26] text-white font-bold px-8 py-3 rounded-md transition-all flex items-center gap-2 shadow-lg shadow-green-500/20 active:scale-95">
                    Submit <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
