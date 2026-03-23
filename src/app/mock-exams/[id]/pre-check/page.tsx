"use client";

import { useState, useRef, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Menu } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function PreTestChecksPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [hasPlayedSound, setHasPlayedSound] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreTestVideoVisible, setIsPreTestVideoVisible] = useState(true);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isListeningVideoEnded, setIsListeningVideoEnded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [userName, setUserName] = useState<string>("Candidate");

    // Fetch user
    useEffect(() => {
        async function fetchUser() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || "Candidate");
            }
        }
        fetchUser();
    }, []);

    // Stop audio if component unmounts
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const handlePlaySound = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/audio/Cambridge%20IELTS%2011.1.1.mp3");
            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
        
        audioRef.current.currentTime = 0;
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                setHasPlayedSound(true);
            })
            .catch(e => console.log("Audio play error", e));
    };

    const handleStopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleContinueToVideo = () => {
        if (!hasPlayedSound) return;
        setStep(2);
    };

    const handlePreTestVideoEnded = () => {
        setIsPreTestVideoVisible(false);
        setStep(3);
    };

    const handleStartListening = () => {
        handleStopSound();
        const testIndex = parseInt(id, 10);
        const mtId = `mt-${testIndex + 1}`;
        router.push(`/exam-center/simulate/listening/${mtId}`);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Image 
                        src="/owl-logo.png" 
                        alt="IELTS Wisdom Logo" 
                        width={140} 
                        height={40} 
                        className="h-9 w-auto object-contain"
                    />
                    <div className="flex flex-col text-sm text-slate-800 font-normal pl-4 border-l border-slate-200">
                        <span className="text-slate-900 leading-tight">{userName}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                
                {/* Pre-test checks Card */}
                <div className={`bg-white rounded-xl border p-6 transition-all ${step === 1 && hasPlayedSound ? 'border-green-200 shadow-sm' : 'border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-slate-900">Pre-test checks</h2>
                        {hasPlayedSound && <Check className="w-6 h-6 text-green-500" />}
                    </div>
                    
                    {(step === 2 || step === 3) && (
                        <div className="flex justify-end mb-2">
                            <button 
                                onClick={() => setIsPreTestVideoVisible(!isPreTestVideoVisible)}
                                className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
                            >
                                {isPreTestVideoVisible ? 'Hide video' : 'Show video'}
                            </button>
                        </div>
                    )}

                    {(step === 2 || (step === 3 && isPreTestVideoVisible)) && (
                        <div className="mb-4">
                            <video 
                                src="/test%20uchun%20video/pre-test.mp4"
                                controls
                                autoPlay={step === 2}
                                controlsList="nodownload noremoteplayback"
                                onContextMenu={(e) => e.preventDefault()}
                                disablePictureInPicture
                                onEnded={handlePreTestVideoEnded}
                                className="w-full rounded-lg border border-slate-200 shadow-sm transition-opacity"
                            />
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <p className="text-slate-700 mb-6 mt-4">
                                Put on your headphones and click <span className="font-bold">Play sound</span> to play a sample sound.
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                                {isPlaying ? (
                                    <button
                                        onClick={handleStopSound}
                                        className="px-6 py-2.5 rounded-lg font-bold transition-colors bg-[#0f172a] text-white hover:bg-slate-800"
                                    >
                                        Stop sound
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaySound}
                                        className="px-6 py-2.5 rounded-lg font-bold transition-colors bg-[#0f172a] text-white hover:bg-slate-800"
                                    >
                                        Play sound
                                    </button>
                                )}
                                <button
                                    onClick={handleContinueToVideo}
                                    disabled={!hasPlayedSound}
                                    className={`px-6 py-2.5 rounded-lg font-bold border transition-colors ${
                                        hasPlayedSound 
                                        ? "bg-white border-slate-300 text-slate-900 hover:bg-slate-50 cursor-pointer" 
                                        : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                                >
                                    Continue
                                </button>
                            </div>
                            <p className="text-sm text-slate-500">
                                If you cannot hear the sound clearly, please tell the invigilator.
                            </p>
                        </>
                    )}
                </div>

                {/* Listening Card */}
                <div className={`bg-white rounded-xl border p-6 shadow-sm transition-all ${step === 3 ? 'border-blue-200' : 'border-slate-200'}`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Listening</h3>
                    <div className="text-red-500 font-medium mb-4">Not completed</div>
                    <div className="text-slate-600 mb-4">Timing: 45 minutes</div>
                    
                    {step === 3 && (
                        <div className="mt-6">
                            <video 
                                src="/test%20uchun%20video/listening.mp4"
                                controls
                                autoPlay
                                controlsList="nodownload noremoteplayback"
                                onContextMenu={(e) => e.preventDefault()}
                                disablePictureInPicture
                                onEnded={() => setIsListeningVideoEnded(true)}
                                className="w-full rounded-lg border border-slate-200 shadow-sm mb-6"
                            />

                            {isListeningVideoEnded && (
                                <>
                                    <button
                                        onClick={handleStartListening}
                                        className="px-6 py-3 bg-[#0f172a] text-white rounded-lg font-bold shadow-md hover:bg-slate-800 transition-colors mt-6"
                                    >
                                        Start Listening
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Reading Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Reading</h3>
                    <div className="text-red-500 font-medium mb-4">Not completed</div>
                    <div className="text-slate-600">Timing: 1 hour</div>
                </div>

                {/* Writing Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Writing</h3>
                    <div className="text-red-500 font-medium mb-4">Not completed</div>
                    <div className="text-slate-600">Timing: 1 hour</div>
                </div>

            </main>
        </div>
    );
}
