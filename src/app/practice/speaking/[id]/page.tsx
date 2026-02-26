"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SPEAKING_TESTS } from "@/data/speaking-tests";
import { Menu, Clock, Mic, Upload, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SpeakingTestInterface() {
    const params = useParams();
    const testId = params?.id as string;
    const testData = testId ? SPEAKING_TESTS[testId] : null;
    const { lang } = useLanguage();

    const [timeLeft, setTimeLeft] = useState(16); // Starting at 16s for demo based on screenshot
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!testData) return <div className="p-10 text-center">Test not found</div>;

    const currentPart = testData.parts[currentPartIndex];
    const currentQuestion = currentPart.questions[currentQuestionIndex];

    const hasNextQuestion = currentQuestionIndex < currentPart.questions.length - 1;
    const hasPrevQuestion = currentQuestionIndex > 0;

    const handleNext = () => {
        if (hasNextQuestion) setCurrentQuestionIndex(prev => prev + 1);
        else if (currentPartIndex < testData.parts.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrev = () => {
        if (hasPrevQuestion) setCurrentQuestionIndex(prev => prev - 1);
        else if (currentPartIndex > 0) {
            setCurrentPartIndex(prev => prev - 1);
            setCurrentQuestionIndex(testData.parts[currentPartIndex - 1].questions.length - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
            {/* Top Bar matching screenshot */}
            <header className="bg-white border-t-4 border-[#e63946] border-b border-gray-200 h-14 flex items-center justify-between px-4 sticky top-0 z-50">
                {/* Logo Placeholder (similar to E logo in picture) */}
                <Link href="/practice/speaking" className="flex items-center gap-2">
                    <div className="bg-[#e63946] text-white font-bold w-8 h-8 rounded flex items-center justify-center text-xl tracking-tighter shadow-sm">
                        E
                    </div>
                </Link>

                {/* Timer */}
                <div className="flex items-center gap-2 font-bold text-black ml-auto mr-auto absolute left-1/2 -translate-x-1/2">
                    <Clock className="w-5 h-5 fill-black text-white" />
                    <span className="text-[15px]">{formatTime(timeLeft)}</span>
                </div>

                {/* Menu Icon */}
                <button className="text-gray-600 hover:text-black hover:bg-gray-100 p-2 rounded transition-colors">
                    <Menu className="w-6 h-6" strokeWidth={2.5} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col pt-8">

                {/* Part Header */}
                <div className="border border-gray-200 rounded-md bg-white text-center py-4 mb-8 shadow-sm">
                    <h2 className="font-bold text-gray-900 text-[15px] tracking-wide">{currentPart.title}</h2>
                    <p className="text-gray-600 text-sm mt-1">{currentPart.instructions}</p>
                </div>

                {/* Top Navigation Row */}
                <div className="flex justify-between items-center mb-10 w-full relative h-[40px]">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrevQuestion && currentPartIndex === 0}
                        className={cn(
                            "bg-[#a0aab8] text-white font-bold text-[13px] py-1.5 px-3 flex items-center gap-1 rounded tracking-wide z-10",
                            (!hasPrevQuestion && currentPartIndex === 0) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500 transition-colors shadow-sm"
                        )}
                    >
                        ← Previous Question
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center w-full">
                        <p className="text-gray-600 text-[15px] font-medium">Question {currentQuestion.id}:</p>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNextQuestion && currentPartIndex === testData.parts.length - 1}
                        className={cn(
                            "bg-[#212529] text-white font-bold text-[13px] py-1.5 px-3 flex items-center gap-1 rounded tracking-wide z-10",
                            (!hasNextQuestion && currentPartIndex === testData.parts.length - 1) ? "opacity-50 cursor-not-allowed" : "hover:bg-black transition-colors shadow-sm"
                        )}
                    >
                        Next Question →
                    </button>
                </div>

                {/* Question Text */}
                <h1 className="text-[24px] font-bold text-center text-gray-900 mb-10 whitespace-pre-line max-w-4xl mx-auto leading-snug">
                    {currentQuestion.text}
                </h1>

                {/* Recording Fieldset Area */}
                <div className="relative mt-2">
                    <fieldset className="border-[1px] border-gray-300 rounded-[5px] bg-[#f4f6f8] px-6 pb-8 pt-12 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] relative w-full"
                        style={{ borderTopWidth: '1px' }}>

                        {/* Legend overlaid on border */}
                        <div className="absolute left-4 top-0 -translate-y-1/2 bg-[#f8f9fa] px-2 text-[12px] text-gray-600">
                            Question {currentQuestion.id} Answer
                        </div>

                        <p className="text-gray-500 text-[15px] mb-6 font-medium">Click the mic icon to start recording...</p>

                        {/* Mic Button */}
                        <button className="w-[68px] h-[68px] bg-[#00a65a] rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-[#008d4c] transition-colors shadow-md hover:shadow-lg active:scale-95 group">
                            <Mic className="w-[34px] h-[34px] text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                        </button>

                        {/* Upload Button */}
                        <button className="bg-[#0073b7] text-white font-bold text-[13px] py-2 px-4 rounded flex items-center justify-center gap-1 mx-auto hover:bg-[#00639d] transition-colors shadow-sm">
                            Or upload an audio file <Upload className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
                        </button>
                    </fieldset>

                    {/* Speaking Time Indicator */}
                    <p className="text-[11px] text-gray-600 mt-1 italic pl-1">Speaking Time: 0s</p>
                </div>

                {/* Submit Controls */}
                <div className="mt-10 flex justify-center">
                    <button className="bg-[#008000] text-white font-bold text-sm py-2 px-5 rounded flex items-center gap-2 hover:bg-[#006600] transition-colors shadow-md">
                        Submit Answer <Send className="w-4 h-4" />
                    </button>
                </div>

            </main>
        </div>
    );
}
