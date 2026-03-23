"use client";

import { useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Check, Menu } from "lucide-react";

export default function PreTestChecksPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [hasPlayedSound, setHasPlayedSound] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(true);
    const [step, setStep] = useState<1 | 2>(1);
    const [videoSrc, setVideoSrc] = useState("/test%20uchun%20video/pre-test.mp4");
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    const handleStartTest = () => {
        const testIndex = parseInt(id, 10);
        const mtId = `mt-${testIndex + 1}`;
        router.push(`/exam-center/simulate/listening/${mtId}`);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="text-red-600 font-extrabold text-4xl tracking-tighter">IELTS</div>
                    <div className="flex flex-col text-sm text-slate-800 font-medium pl-4 border-l border-slate-200">
                        <span className="text-slate-900 leading-tight">123456</span>
                        <span className="text-slate-500 text-xs">00:60 minutes left</span>
                    </div>
                </div>
                <button className="text-slate-500 hover:text-slate-800 transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                
                {/* Pre-test checks Card */}
                <div className={`bg-white rounded-xl border p-6 transition-all ${step === 1 && hasPlayedSound ? 'border-green-200 shadow-sm' : 'border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-slate-900">Pre-test checks</h2>
                        {step === 1 && hasPlayedSound && <Check className="w-6 h-6 text-green-500" />}
                    </div>
                    
                    {step === 2 && (
                        <>
                            <div className="flex justify-end mb-2">
                                <button 
                                    onClick={() => setIsVideoVisible(!isVideoVisible)}
                                    className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
                                >
                                    {isVideoVisible ? 'Hide video' : 'Show video'}
                                </button>
                            </div>

                            {isVideoVisible && (
                                <div className="mb-8">
                                    <video 
                                        src={videoSrc}
                                        controls
                                        autoPlay={videoSrc.includes("Listening")}
                                        controlsList="nodownload noremoteplayback"
                                        onContextMenu={(e) => e.preventDefault()}
                                        disablePictureInPicture
                                        onEnded={() => {
                                            if (videoSrc.includes("pre-test")) {
                                                setVideoSrc("/test%20uchun%20video/Listening.mp4");
                                            }
                                        }}
                                        className="w-full rounded-lg border border-slate-200 shadow-sm transition-opacity"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end border-t border-slate-100 pt-6">
                                <button
                                    onClick={handleStartTest}
                                    className="px-8 py-3 rounded-lg font-bold transition-colors bg-[#0f172a] text-white hover:bg-slate-800 shadow-md"
                                >
                                    Start Test
                                </button>
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <p className="text-slate-700 mb-6">
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
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Listening</h3>
                    <div className="text-red-500 font-medium mb-4">Not completed</div>
                    <div className="text-slate-600">Timing: 30 minutes</div>
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
