"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function LanguageToggle() {
    const { lang, setLang } = useLanguage();
    const isUz = lang === "uz";
    const toggle = () => setLang(isUz ? "en" : "uz");

    return (
        <button
            onClick={toggle}
            aria-label="Switch language"
            className="relative flex items-center w-[68px] h-[34px] rounded-full p-[3px] focus:outline-none overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.55), 0 4px 16px rgba(0,0,0,0.10)",
            }}
        >
            {/* Glass shimmer highlight */}
            <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.30) 0%, transparent 55%)" }}
            />

            {/* Label left */}
            <span className={`absolute left-2.5 text-[10px] font-bold drop-shadow transition-opacity duration-300 text-slate-700 ${isUz ? "opacity-100" : "opacity-0"}`}>
                UZ
            </span>
            {/* Label right */}
            <span className={`absolute right-2 text-[10px] font-bold drop-shadow transition-opacity duration-300 text-slate-700 ${!isUz ? "opacity-100" : "opacity-0"}`}>
                EN
            </span>

            {/* Sliding pill */}
            <motion.div
                animate={{ x: isUz ? 34 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[28px] h-[28px] rounded-full flex-shrink-0 flex items-center justify-center text-[18px]"
                style={{
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.9)",
                }}
            >
                {isUz ? "🇺🇿" : "🇺🇸"}
            </motion.div>
        </button>
    );
}
