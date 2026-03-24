"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FullscreenEnforcer() {
    const [isFullscreen, setIsFullscreen] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkFullscreen = () => {
            const isFull = !!document.fullscreenElement || 
                           !!(document as any).webkitFullscreenElement || 
                           !!(document as any).msFullscreenElement;
            setIsFullscreen(isFull);
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
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-amber-500" />
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlayContent, document.body);
}
