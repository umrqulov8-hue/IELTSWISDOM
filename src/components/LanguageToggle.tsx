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
            className="relative flex items-center w-[68px] h-[34px] rounded-full p-[3px] 
                       backdrop-blur-md border border-white/30
                       shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_16px_rgba(0,0,0,0.12)]
                       transition-all duration-500 focus:outline-none overflow-hidden group"
            style={{
                background: isUz
                    ? "linear-gradient(135deg, rgba(30,181,58,0.45) 0%, rgba(0,153,181,0.45) 50%, rgba(30,181,58,0.45) 100%)"
                    : "linear-gradient(135deg, rgba(0,40,104,0.45) 0%, rgba(191,10,48,0.45) 100%)",
            }}
        >
            {/* Glass highlight shimmer */}
            <span className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)" }} />

            {/* Labels */}
            <span className={`absolute left-2.5 text-[10px] font-bold text-white drop-shadow transition-opacity duration-300 ${isUz ? "opacity-100" : "opacity-0"}`}>
                UZ
            </span>
            <span className={`absolute right-2 text-[10px] font-bold text-white drop-shadow transition-opacity duration-300 ${!isUz ? "opacity-100" : "opacity-0"}`}>
                EN
            </span>

            {/* Sliding glass pill with flag */}
            <motion.div
                animate={{ x: isUz ? 34 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[28px] h-[28px] rounded-full flex-shrink-0 flex items-center justify-center text-[18px]
                           backdrop-blur-sm border border-white/50
                           shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)]"
                style={{ background: "rgba(255,255,255,0.85)" }}
            >
                {isUz ? "🇺🇿" : "🇺🇸"}
            </motion.div>
        </button>
    );
}
