"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { ArrowLeftRight, Search, Settings2, BookOpen, Clock, ChevronRight, Globe, Volume2, Mic, Copy, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Simple debounce utility
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

export default function TranslationPage() {
    const { lang } = useLanguage();
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    // Translation direction state
    const [sourceLang, setSourceLang] = useState<"en" | "uz">("en");
    const [targetLang, setTargetLang] = useState<"en" | "uz">("uz");

    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isAutoDetect, setIsAutoDetect] = useState(true);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    const debouncedSourceText = useDebounce(sourceText, 600); // 600ms delay

    const handleSwap = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    const handleCopy = () => {
        if (translatedText) navigator.clipboard.writeText(translatedText);
    };

    useEffect(() => {
        const performTranslation = async () => {
            if (!debouncedSourceText.trim()) {
                setTranslatedText("");
                setError(null);
                return;
            }

            setIsTranslating(true);
            setError(null);

            try {
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: debouncedSourceText,
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Failed to translate");

                setTranslatedText(data.translatedText);
            } catch (err: any) {
                console.error("Translation error:", err);
                setError(err.message);
            } finally {
                setIsTranslating(false);
            }
        };

        performTranslation();
    }, [debouncedSourceText, sourceLang, targetLang]);

    // Mock data
    const historyItems = [
        { text: "English", translated: "Ingliz tili", chars: 28.2 },
        { text: "Send the text asap", translated: "Matnni tezroq yuboring", chars: 20.8 },
        { text: "I'll be there soon", translated: "Tez orada u yerda bo'laman", chars: 12.1 },
        { text: "Option Date Must", translated: "Sana tanlanishi kerak", chars: 28.0 },
    ];

    return (
        <DashboardLayout
            title={lang === "uz" ? "Tarjima Paneli" : "Translation Dashboard"}
            description={lang === "uz" ? "Grammatika va aniqlikni oshirish uchun jumlalarni tarjima qiling." : "Translate sentences to improve your grammar and accuracy."}
        >
            <div className="w-full max-w-5xl mx-auto mt-4 pb-12">

                {/* Main Glass Widget Overlay */}
                <div className="relative rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-2xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden">

                    {/* Glowing Accent Edges */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                    {/* --- Upper Section: Translation Areas --- */}
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 relative z-10">

                        {/* Source Text Box */}
                        <div className="flex-1 bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm relative group transition-all duration-300 hover:shadow-md hover:bg-white/60 focus-within:ring-2 ring-cyan-400/30">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="font-semibold text-slate-700">{lang === "uz" ? "Asl Matn" : "Source Text"}</span>
                                <div className="flex gap-2 items-center">
                                    <button className="text-slate-400 hover:text-blue-500 transition-colors"><Mic className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl min-h-[160px] p-4 flex flex-col focus-within:bg-white focus-within:border-cyan-200 transition-colors">
                                <textarea
                                    value={sourceText}
                                    onChange={(e) => setSourceText(e.target.value)}
                                    placeholder={lang === "uz" ? "Bu yerga matn kiriting..." : "Enter text here..."}
                                    className="w-full flex-1 bg-transparent resize-none outline-none text-slate-800 placeholder:text-slate-400 text-lg"
                                />
                                <div className="flex justify-between items-center mt-2 opacity-50 text-slate-500 text-xs font-semibold">
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-100 uppercase tracking-widest text-[#00E5FF] font-bold">
                                        <Globe className="w-3 h-3" /> {sourceLang === "en" ? "EN" : "UZ"}
                                    </div>
                                    <span>{sourceText.length} / 5000</span>
                                </div>
                            </div>
                        </div>

                        {/* Swap Button container (Absolute center on desktop, inline hidden on mobile or shown between) */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                            <button
                                onClick={handleSwap}
                                className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] border-4 border-white/80 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <ArrowLeftRight className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>

                        {/* Mobile Swap Button */}
                        <div className="md:hidden flex justify-center -my-3 relative z-20">
                            <button
                                onClick={handleSwap}
                                className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
                            >
                                <ArrowLeftRight className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Translated Text Box */}
                        <div className="flex-1 bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm relative group transition-all duration-300 hover:shadow-md hover:bg-white/60">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-slate-700">{lang === "uz" ? "Tarjima" : "Translated Text"}</span>
                                    {isTranslating && <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button className="text-slate-400 hover:text-blue-500 transition-colors"><Volume2 className="w-4 h-4" /></button>
                                    <button onClick={handleCopy} className="text-slate-400 hover:text-blue-500 active:scale-90 transition-all"><Copy className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl min-h-[160px] p-4 flex flex-col pt-5 relative">
                                <div className="w-full flex-1 text-slate-700 text-lg">
                                    {error ? (
                                        <span className="text-red-400 text-sm font-medium">{error}</span>
                                    ) : (
                                        translatedText || <span className="text-slate-400">{lang === "uz" ? "Tarjima bu yerda paydo bo'ladi..." : "Translation will appear here..."}</span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-2 opacity-50 text-slate-500 text-xs font-semibold">
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-100 uppercase tracking-widest text-[#00E5FF] font-bold">
                                        <Globe className="w-3 h-3" /> {targetLang === "uz" ? "UZ" : "EN"}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* --- Lower Section: 3 Columns --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-10 relative z-10">

                        {/* History */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm flex flex-col h-[280px]">
                            <div className="flex items-center gap-2 font-bold text-slate-700 mb-5 pb-3 border-b border-slate-200/50">
                                <Clock className="w-4 h-4 text-blue-500" />
                                {lang === "uz" ? "Tarix" : "History"}
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                                {historyItems.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/80 transition-colors cursor-pointer border border-transparent hover:border-slate-200 group">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-800 line-clamp-1">{item.text}</span>
                                            <span className="text-slate-400 flex-shrink-0 group-hover:text-blue-500 font-medium">{item.chars}k</span>
                                        </div>
                                        <span className="text-sm text-slate-500 line-clamp-1 group-hover:text-slate-700">{item.translated}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Glossary */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm flex flex-col h-[280px]">
                            <div className="flex items-center gap-2 font-bold text-slate-700 mb-5 pb-3 border-b border-slate-200/50">
                                <BookOpen className="w-4 h-4 text-cyan-500" />
                                {lang === "uz" ? "Lug'at" : "Glossary"}
                            </div>

                            <div className="relative mb-4">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={lang === "uz" ? "Qidirish..." : "Search"}
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 ring-cyan-500/20 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                {[
                                    { tUz: "Saqlangan tarjimalar", tEn: "Saved Translations", icon: Star, color: "text-amber-400" },
                                    { tUz: "Mening ro'yxatim", tEn: "My Vocabulary List", icon: BookOpen, color: "text-blue-400" },
                                    { tUz: "Oflayn paketlar", tEn: "Offline Packages", icon: Globe, color: "text-emerald-400" },
                                ].map((item, i) => (
                                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">{lang === "uz" ? item.tUz : item.tEn}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-transform group-hover:translate-x-0.5" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm flex flex-col h-[280px]">
                            <div className="flex items-center gap-2 font-bold text-slate-700 mb-5 pb-3 border-b border-slate-200/50">
                                <Settings2 className="w-4 h-4 text-purple-500" />
                                {lang === "uz" ? "Sozlamalar" : "Settings"}
                            </div>

                            <div className="flex-1 flex flex-col justify-center space-y-6 px-1">
                                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsAutoDetect(!isAutoDetect)}>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                        {lang === "uz" ? "Tilni Avtomatik Aniqlash" : "Auto-Detect Language"}
                                    </span>
                                    <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shadow-inner ${isAutoDetect ? 'bg-cyan-500' : 'bg-slate-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isAutoDetect ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsOfflineMode(!isOfflineMode)}>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                            {lang === "uz" ? "Oflayn Rejim" : "Offline Mode"}
                                        </span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">
                                            {lang === "uz" ? "Tarjimalarni internetsiz ishlating" : "Translate without internet connection"}
                                        </span>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shadow-inner ${isOfflineMode ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isOfflineMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Embedded styles for custom scrollbar for history panel */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(148, 163, 184, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(148, 163, 184, 0.5);
                }
            `}} />
        </DashboardLayout>
    );
}
