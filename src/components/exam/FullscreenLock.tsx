"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export function FullscreenLock({ children }: { children: React.ReactNode }) {
    const [isLocked, setIsLocked] = useState(false);
    const [exitCode, setExitCode] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    // ESC Hold State
    const [isHoldingEsc, setIsHoldingEsc] = useState(false);
    const [escProgress, setEscProgress] = useState(0);

    const EXIT_PASSWORD = "101112";
    const ESC_HOLD_TIME_MS = 20000; // 20 seconds

    const requestFullscreen = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            } else if ((document.documentElement as any).webkitRequestFullscreen) {
                await (document.documentElement as any).webkitRequestFullscreen();
            } else if ((document.documentElement as any).msRequestFullscreen) {
                await (document.documentElement as any).msRequestFullscreen();
            }
        } catch (err) {
            console.error("Error attempting to re-enable fullscreen:", err);
        }
    };

    const handleFullscreenChange = useCallback(() => {
        if (!document.fullscreenElement) {
            // User exited fullscreen (e.g., pressed Esc)
            setIsLocked(true);
        }
    }, []);

    // Intercept keyboard events to prevent Alt+F4, Win+D, F11, Esc default actions
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const isF11 = e.key === "F11";
        const isAltF4 = e.altKey && e.key === "F4";
        const isWinD = e.metaKey && e.key === "d";

        if (isF11 || isAltF4 || isWinD) {
            e.preventDefault();
            setIsLocked(true);
            if (!document.fullscreenElement) {
                requestFullscreen();
            }
        }
    }, []);

    useEffect(() => {
        const enforceLock = () => {
            setIsLocked(true);
            if (!document.fullscreenElement) {
                requestFullscreen();
            }
        };

        const lockKeyboard = async () => {
            if (document.fullscreenElement && 'keyboard' in navigator) {
                try {
                    await (navigator as any).keyboard.lock(['Escape', 'MetaLeft', 'MetaRight', 'OSLeft', 'OSRight']);
                } catch (e) {
                    console.error("Keyboard lock failed", e);
                }
            }
        };

        const onFsChange = () => {
            if (document.fullscreenElement) {
                lockKeyboard();
            } else {
                // If they escaped full screen but are not locked by Windows key, just lock them anyway
                enforceLock();
            }
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                enforceLock();
            }
        };

        let escInterval: NodeJS.Timeout | null = null;
        let holdTime = 0;

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                if (!escInterval && !isLocked) {
                    setIsHoldingEsc(true);
                    holdTime = 0;
                    setEscProgress(0);

                    escInterval = setInterval(() => {
                        holdTime += 100;
                        const progress = (holdTime / ESC_HOLD_TIME_MS) * 100;

                        if (progress >= 100) {
                            clearInterval(escInterval!);
                            escInterval = null;
                            router.push('/mock-exams');
                        } else {
                            setEscProgress(progress);
                        }
                    }, 100);
                }
            } else {
                handleKeyDown(e);
            }
        };

        const handleGlobalKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (escInterval) {
                    clearInterval(escInterval);
                    escInterval = null;
                }
                setIsHoldingEsc(false);
                setEscProgress(0);
                holdTime = 0;
            }
        };

        document.addEventListener("fullscreenchange", onFsChange);
        document.addEventListener("webkitfullscreenchange", onFsChange);
        document.addEventListener("mozfullscreenchange", onFsChange);
        document.addEventListener("MSFullscreenChange", onFsChange);
        document.addEventListener("visibilitychange", onVisibilityChange);

        window.addEventListener("keydown", handleGlobalKeyDown, { capture: true });
        window.addEventListener("keyup", handleGlobalKeyUp, { capture: true });
        window.addEventListener("blur", enforceLock);

        lockKeyboard();

        return () => {
            if (escInterval) clearInterval(escInterval);
            document.removeEventListener("fullscreenchange", onFsChange);
            document.removeEventListener("webkitfullscreenchange", onFsChange);
            document.removeEventListener("mozfullscreenchange", onFsChange);
            document.removeEventListener("MSFullscreenChange", onFsChange);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("keydown", handleGlobalKeyDown, { capture: true });
            window.removeEventListener("keyup", handleGlobalKeyUp, { capture: true });
            window.removeEventListener("blur", enforceLock);
        };
    }, [handleKeyDown, isLocked, router]);

    useEffect(() => {
        if (!isLocked) return;

        const handleUserGesture = () => {
            if (!document.fullscreenElement) {
                requestFullscreen();
            }
        };

        window.addEventListener('click', handleUserGesture, { capture: true });
        window.addEventListener('keydown', handleUserGesture, { capture: true });

        return () => {
            window.removeEventListener('click', handleUserGesture, { capture: true });
            window.removeEventListener('keydown', handleUserGesture, { capture: true });
        };
    }, [isLocked]);

    const handleUnlock = () => {
        if (exitCode === EXIT_PASSWORD) {
            router.push('/mock-exams');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <>
            {children}

            <AnimatePresence>
                {isHoldingEsc && !isLocked && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-slate-700/50 flex flex-col items-center gap-2 min-w-[300px]"
                    >
                        <span className="font-bold text-sm tracking-widest uppercase">
                            Hold ESC to abort test
                        </span>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-rose-500 rounded-full transition-all duration-100 ease-linear"
                                style={{ width: `${escProgress}%` }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLocked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl shadow-slate-200 border border-slate-100 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />

                            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-rose-500" />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-2">Exam Locked</h2>
                            <p className="text-slate-500 mb-8 font-medium">
                                You attempted to leave the fullscreen environment. Please enter the invigilator code to unlock or exit.
                            </p>

                            <div className="space-y-4">
                                <input
                                    type="password"
                                    value={exitCode}
                                    onChange={(e) => setExitCode(e.target.value)}
                                    placeholder="Enter exit code..."
                                    className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-4 focus:border-blue-500 outline-none transition-all placeholder:tracking-normal placeholder:text-base placeholder:-translate-y-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleUnlock();
                                    }}
                                    autoFocus
                                />

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-rose-500 text-sm font-bold flex items-center justify-center gap-2"
                                    >
                                        <AlertTriangle className="w-4 h-4" /> Incorrect code
                                    </motion.p>
                                )}

                                <button
                                    onClick={handleUnlock}
                                    className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 mt-4"
                                >
                                    End Test & Exit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
