"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Lock, AlertCircle, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function FullscreenEnforcer() {
    const [isFullscreen, setIsFullscreen] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    
    // Security Lock states
    const [violations, setViolations] = useState(0);
    const [verificationCode, setVerificationCode] = useState("");
    const [inputValue, setInputValue] = useState("");
    const hasTerminated = useRef(false);

    const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

    useEffect(() => {
        setIsMounted(true);
        const checkFullscreen = () => {
            const isFull = !!document.fullscreenElement || 
                           !!(document as any).webkitFullscreenElement || 
                           !!(document as any).msFullscreenElement;
                           
            setIsFullscreen(prev => {
                if (prev && !isFull && !hasTerminated.current) {
                    // Just exited fullscreen
                    setViolations(v => {
                        const newV = v + 1;
                        if (newV >= 3) {
                            hasTerminated.current = true;
                            setTimeout(() => {
                                window.location.href = "/dashboard";
                            }, 3000);
                        }
                        return newV;
                    });
                    setVerificationCode(generateCode());
                    setInputValue("");
                }
                return isFull;
            });
        };

        // Initial check
        checkFullscreen();

        // Listen for changes
        document.addEventListener("fullscreenchange", checkFullscreen);
        document.addEventListener("webkitfullscreenchange", checkFullscreen);
        document.addEventListener("msfullscreenchange", checkFullscreen);

        return () => {
            document.removeEventListener("fullscreenchange", checkFullscreen);
            document.removeEventListener("webkitfullscreenchange", checkFullscreen);
            document.removeEventListener("msfullscreenchange", checkFullscreen);
        };
    }, []);

    const requestFullscreen = async () => {
        try {
            const el = document.documentElement as any;
            if (el.requestFullscreen) {
                await el.requestFullscreen();
            } else if (el.webkitRequestFullscreen) {
                await el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                await el.msRequestFullscreen();
            }
        } catch (err) {
            console.error("Error attempting to enable fullscreen:", err);
            // Even if it fails (sometimes needs explicit user gesture), the button is there for them to retry
        }
    };

    if (!isMounted) return null;

    const isLockedOut = violations >= 3;

    const overlayContent = (
        <AnimatePresence>
            {!isFullscreen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999999] bg-[#F2F4F8] flex flex-col items-center justify-center p-6 text-center select-none"
                >
                    <motion.div 
                        initial={{ scale: 0.95, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl shadow-slate-900/10 border border-slate-200 overflow-visible relative flex flex-col"
                    >
                        {/* Red Top Border */}
                        <div className="h-1.5 w-full bg-red-500 absolute top-0 left-0 rounded-t-2xl" />

                        {/* Visual Close Button (non-functional overlay visual) */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center shadow-sm">
                            <X className="w-3.5 h-3.5 text-white opacity-80" />
                        </div>

                        {/* Lock Icon */}
                        <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mt-8 mb-4">
                            <Lock className="w-6 h-6 text-red-500" />
                        </div>

                        <h2 className="text-[22px] font-black text-slate-800 mb-2 tracking-tight">
                            Security Lock
                        </h2>
                        
                        <div className="mx-auto bg-red-50 text-red-600 font-bold px-4 py-1 rounded-md text-xs mb-6">
                            Violation {Math.min(violations, 3)} of 3
                        </div>

                        {isLockedOut ? (
                            <div className="px-8 pb-8 flex flex-col items-center">
                                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                                    Maximum security violations reached. Your exam has been terminated automatically.
                                </p>
                                <div className="flex items-center gap-3 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl w-full justify-center">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Exiting...
                                </div>
                            </div>
                        ) : (
                            <div className="px-6 pb-6 flex flex-col w-full">
                                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                                    Suspicious behavior detected (e.g. exiting fullscreen, switching tabs, or using restricted shortcuts). To resume, please type the verification code below:
                                </p>

                                <div className="bg-slate-50 rounded-xl py-3 px-4 mb-6 border border-slate-200">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                        Verification Code
                                    </div>
                                    <div className="text-2xl font-black text-slate-800 tracking-[0.3em] font-mono">
                                        {verificationCode.split('').join(' ')}
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="Enter the 6-digit code"
                                    className="w-full mb-4 px-4 py-3 rounded-xl border border-slate-200 text-center font-mono text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all placeholder:text-slate-300 placeholder:font-sans"
                                    maxLength={6}
                                />

                                <button
                                    onClick={requestFullscreen}
                                    disabled={inputValue !== verificationCode}
                                    className={cn(
                                        "w-full py-3.5 rounded-xl font-bold text-sm transition-all mb-4 mt-2",
                                        inputValue === verificationCode 
                                            ? "bg-[#8ea1b0] hover:bg-[#7a8c9a] text-white shadow-md" 
                                            : "bg-[#9ca3af] text-white/90 cursor-not-allowed opacity-80"
                                    )}
                                >
                                    Verify & Resume Exam
                                </button>

                                <button 
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    End Test & Exit Now
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlayContent, document.body);
}
