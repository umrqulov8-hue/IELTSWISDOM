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
            className={`relative flex items-center w-[68px] h-[34px] rounded-full p-[3px] transition-colors duration-500 shadow-inner focus:outline-none
                ${isUz
                    ? "bg-gradient-to-r from-[#1eb53a] via-[#0099b5] to-[#1eb53a]"  // Uzbek flag colors
                    : "bg-gradient-to-r from-[#002868] to-[#BF0A30]"             // US flag colors
                }`}
        >
            {/* Track labels */}
            <span className={`absolute left-2 text-[10px] font-bold transition-opacity duration-300 ${isUz ? "opacity-100 text-white" : "opacity-0"}`}>
                UZ
            </span>
            <span className={`absolute right-2 text-[10px] font-bold transition-opacity duration-300 ${!isUz ? "opacity-100 text-white" : "opacity-0"}`}>
                EN
            </span>

            {/* Sliding circle with flag */}
            <motion.div
                animate={{ x: isUz ? 34 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[28px] h-[28px] rounded-full bg-white shadow-md flex items-center justify-center text-lg leading-none overflow-hidden flex-shrink-0"
            >
                <span className="text-[18px]">
                    {isUz ? "🇺🇿" : "🇺🇸"}
                </span>
            </motion.div>
        </button>
    );
}
