"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Maximize, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function FullscreenEnforcer() {
    const [isFullscreen, setIsFullscreen] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    // Security Lock states
    const [violations, setViolations] = useState(0);
    const hasTerminated = useRef(false);

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
                    className="fixed inset-0 z-[999999] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none"
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200"
                    >
                        {isLockedOut ? (
                            <div className="flex flex-col items-center py-6">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                                    Imtihon To'xtatildi
                                </h2>
                                <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                                    Siz ruxsat etilmagan harakatni 3 marta takrorladingiz. Xavfsizlik qoidalariga ko'ra imtihon majburiy yakunlandi.
                                </p>
                                <div className="flex items-center gap-3 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl w-full justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Bosh sahifaga qaytilmoqda...
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                    <AlertCircle className="w-10 h-10 text-amber-700" />
                                    {(violations > 0) && (
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-bounce">
                                            {violations}/3
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                                    To'liq ekran rejimi talab etiladi
                                </h2>
                                <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                                    Imtihonni davom ettirish uchun to'liq ekran rejimiga o'tishingiz shart. Iltimos, quyidagi tugmani bosing va F11 yoki boshqa tugmalar orqali ekrandan chiqmang.
                                </p>
                                
                                <button
                                    onClick={requestFullscreen}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    <Maximize className="w-5 h-5" />
                                    <span>To'liq Ekranga Qaytish</span>
                                </button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlayContent, document.body);
}
