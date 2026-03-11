"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertTriangle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export function FullscreenLock({ children, onForceSubmit }: { children: React.ReactNode, onForceSubmit?: () => void }) {
    const [isLocked, setIsLocked] = useState(false);
    const [exitCode, setExitCode] = useState("");
    const [error, setError] = useState(false);

    // Secure Exam Mode State
    const [violations, setViolations] = useState(0);
    const [currentCode, setCurrentCode] = useState("");
    const [isDisqualified, setIsDisqualified] = useState(false);

    const router = useRouter();

    // Constant parameters
    const MAX_VIOLATIONS = 3;

    // Generate a random 6 digit code
    const generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const requestFullscreen = () => {
        try {
            const el = document.documentElement as any;
            if (el.requestFullscreen) {
                el.requestFullscreen().catch((e: any) => console.error("Fullscreen err:", e));
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        } catch (err) {
            console.error("Error attempting to re-enable fullscreen:", err);
        }
    };

    const triggerViolation = useCallback((reason: string) => {
        if (isDisqualified || isLocked) return; // Prevent multiple triggers if already locked/disqualified

        setViolations(prev => {
            const newCount = prev + 1;
            if (newCount >= MAX_VIOLATIONS) {
                setIsDisqualified(true);
                // Call onForceSubmit after a short delay so user sees "Disqualified"
                setTimeout(() => {
                    if (onForceSubmit) onForceSubmit();
                    else router.push('/mock-exams');
                }, 3000);
            } else {
                setCurrentCode(generateCode());
                setIsLocked(true);
            }
            return newCount;
        });
    }, [isDisqualified, isLocked, onForceSubmit, router]);


    // Intercept keyboard events to prevent shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Prevent defaults and trigger violation for:
        // F12, Ctrl+Shift+I, Alt+F4, F11, Win+D, Ctrl+C, Ctrl+V, F5, Ctrl+R

        const isF12 = e.key === "F12";
        const isDevTools = e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "c" || e.key === "C");
        const isF11 = e.key === "F11";
        const isAltF4 = e.altKey && e.key === "F4";
        const isWinD = e.metaKey && (e.key === "d" || e.key === "D");
        const isCopyPaste = (e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C" || e.key === "v" || e.key === "V");
        const isRefresh = e.key === "F5" || ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.key === "R"));
        const isEsc = e.key === "Escape";

        if (isF12 || isDevTools || isF11 || isAltF4 || isWinD || isCopyPaste || isRefresh || isEsc) {
            e.preventDefault();
            triggerViolation(`Keyboard shortcut attempt: ${e.key}`);
            if (!document.fullscreenElement) {
                requestFullscreen();
            }
        }
    }, [triggerViolation]);

    useEffect(() => {
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
                // Exited fullscreen
                triggerViolation("Exited fullscreen");
            }
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                triggerViolation("Tab switched or window lost focus");
            }
        };

        const preventContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            // Optional: trigger violation on right-click, or just silently block.
            // triggerViolation("Right-click blocked"); 
        };

        const preventCopyPaste = (e: ClipboardEvent) => {
            e.preventDefault();
        };

        const preventUnload = (e: BeforeUnloadEvent) => {
            // Browsers don't allow custom messages anymore, but this triggers the prompt
            e.preventDefault();
            e.returnValue = '';
        };

        // Enforce full screen immediately on mount if not disqualified or locked
        if (!document.fullscreenElement && !isLocked && !isDisqualified) {
            requestFullscreen();
        }

        document.addEventListener("fullscreenchange", onFsChange);
        document.addEventListener("webkitfullscreenchange", onFsChange);
        document.addEventListener("mozfullscreenchange", onFsChange);
        document.addEventListener("MSFullscreenChange", onFsChange);

        document.addEventListener("visibilitychange", onVisibilityChange);

        // Anti-cheat listeners
        window.addEventListener("keydown", handleKeyDown, { capture: true });
        document.addEventListener("contextmenu", preventContextMenu, { capture: true });
        document.addEventListener("copy", preventCopyPaste, { capture: true });
        document.addEventListener("paste", preventCopyPaste, { capture: true });
        document.addEventListener("cut", preventCopyPaste, { capture: true });
        window.addEventListener("beforeunload", preventUnload);

        lockKeyboard();

        return () => {
            document.removeEventListener("fullscreenchange", onFsChange);
            document.removeEventListener("webkitfullscreenchange", onFsChange);
            document.removeEventListener("mozfullscreenchange", onFsChange);
            document.removeEventListener("MSFullscreenChange", onFsChange);
            document.removeEventListener("visibilitychange", onVisibilityChange);

            window.removeEventListener("keydown", handleKeyDown, { capture: true });
            document.removeEventListener("contextmenu", preventContextMenu, { capture: true });
            document.removeEventListener("copy", preventCopyPaste, { capture: true });
            document.removeEventListener("paste", preventCopyPaste, { capture: true });
            document.removeEventListener("cut", preventCopyPaste, { capture: true });
            window.removeEventListener("beforeunload", preventUnload);
        };
    }, [handleKeyDown, isLocked, isDisqualified, triggerViolation]);

    // Re-enforce fullscreen if clicking while locked
    useEffect(() => {
        if (!isLocked) return;
        const handleUserGesture = () => {
            if (!document.fullscreenElement) {
                requestFullscreen();
            }
        };
        window.addEventListener('click', handleUserGesture, { capture: true });
        // Clean up keyboard events for unlock input
        // window.addEventListener('keydown', handleUserGesture, { capture: true }); // Removed to allow typing
        return () => {
            window.removeEventListener('click', handleUserGesture, { capture: true });
        };
    }, [isLocked]);

    const handleUnlock = () => {
        if (exitCode === currentCode) {
            requestFullscreen();
            setIsLocked(false);
            setExitCode("");
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="w-full h-full select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
            {children}

            <AnimatePresence>
                {isDisqualified && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[99999] bg-[#F0F2F5]/95 backdrop-blur-3xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl text-center"
                        >
                            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldAlert className="w-12 h-12 text-rose-600" />
                            </div>
                            <h2 className="text-4xl font-black text-rose-600 mb-4">Exam Disqualified</h2>
                            <p className="text-slate-600 text-lg mb-8 font-medium">
                                You have exceeded the maximum number of security violations ({MAX_VIOLATIONS}). Your exam session has been terminated and your current progress has been submitted.
                            </p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                                <motion.div
                                    className="h-full bg-rose-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                Processing Submission...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLocked && !isDisqualified && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-[#F0F2F5]/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xl border border-rose-100 text-center relative overflow-hidden flex flex-col items-center"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />

                            <div className="flex gap-2 mb-8">
                                {[...Array(MAX_VIOLATIONS)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-12 h-2 rounded-full ${i < violations ? 'bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]' : 'bg-slate-100'}`}
                                    />
                                ))}
                            </div>

                            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-rose-500" />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-2">Security Lock</h2>

                            <p className="text-rose-600 font-bold mb-4 bg-rose-50 px-4 py-2 rounded-lg">
                                Violation {violations} of {MAX_VIOLATIONS}
                            </p>

                            <p className="text-slate-500 mb-6 font-medium text-sm leading-relaxed">
                                Suspicious behavior detected (e.g. exiting fullscreen, switching tabs, or using restricted shortcuts). To resume, please type the verification code below:
                            </p>

                            <div className="bg-slate-100 rounded-2xl px-8 py-4 mb-8 w-full border border-slate-200">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Verification Code</span>
                                <span className="text-4xl font-mono font-black text-slate-800 tracking-[0.25em]">{currentCode}</span>
                            </div>

                            <div className="space-y-4 w-full">
                                <input
                                    type="text"
                                    value={exitCode}
                                    onChange={(e) => setExitCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter the 6-digit code"
                                    className="w-full text-center text-2xl tracking-[0.2em] font-mono bg-white border-2 border-slate-200 rounded-2xl px-4 py-4 focus:border-[#2D3E50] focus:ring-4 focus:ring-[#2D3E50]/10 outline-none transition-all placeholder:tracking-normal placeholder:text-base placeholder:font-sans"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleUnlock();
                                    }}
                                    autoFocus
                                    maxLength={6}
                                />

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-rose-500 text-sm font-bold flex items-center justify-center gap-2"
                                    >
                                        <AlertTriangle className="w-4 h-4" /> Incorrect code entered
                                    </motion.p>
                                )}

                                <button
                                    onClick={handleUnlock}
                                    disabled={exitCode.length !== 6}
                                    className="w-full bg-[#2D3E50] text-white py-4 rounded-xl font-bold hover:bg-[#1E293B] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    Verify & Resume Exam
                                </button>

                                <button
                                    onClick={() => { if (onForceSubmit) onForceSubmit(); else router.push('/mock-exams') }}
                                    className="w-full bg-transparent text-slate-500 py-3 rounded-xl font-bold hover:text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                                >
                                    End Test & Exit Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
