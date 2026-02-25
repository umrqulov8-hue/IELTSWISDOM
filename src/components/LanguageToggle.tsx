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
            className="relative flex items-center w-[72px] h-[36px] rounded-full p-[4px] focus:outline-none transition-colors bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-inner"
        >
            {/* Inactive labels on the track */}
            <span
                className={`absolute left-[12px] text-xs font-bold text-slate-400 dark:text-slate-500 transition-opacity duration-300 ${isUz ? "opacity-100" : "opacity-0"}`}
            >
                US
            </span>
            <span
                className={`absolute right-[12px] text-xs font-bold text-slate-400 dark:text-slate-500 transition-opacity duration-300 ${!isUz ? "opacity-100" : "opacity-0"}`}
            >
                UZ
            </span>

            {/* Sliding handle */}
            <motion.div
                layout
                initial={false}
                animate={{
                    x: isUz ? 36 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white dark:bg-slate-200 shadow-md border border-slate-100 z-10"
            >
                <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] font-bold text-slate-800"
                >
                    {isUz ? "UZ" : "US"}
                </motion.span>
            </motion.div>
        </button>
    );
}
