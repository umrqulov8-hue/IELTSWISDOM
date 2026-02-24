"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "uz";

interface LanguageContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (en: string, uz: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "en",
    setLang: () => { },
    t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");
    const t = (en: string, uz: string) => (lang === "en" ? en : uz);
    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
