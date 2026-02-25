"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, AlertCircle, Sparkles, BookOpen, Mic, PenLine, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AICheckPage() {
    const router = useRouter();
    const { lang } = useLanguage();
    const AIC = T.aiCheck;

    const WELCOME_MESSAGE = (): Message => ({
        role: "assistant",
        content: tx(AIC.welcome, lang),
    });

    const QUICK_PROMPTS = () => [
        { icon: PenLine, label: tx(AIC.prompts.essay, lang), text: lang === "en" ? "Here is my Task 2 essay, please check and give a band score:" : "Mana mening Task 2 inshoim, iltimos tekshiring va band baholab bering:" },
        { icon: BookOpen, label: tx(AIC.prompts.task1, lang), text: lang === "en" ? "How should I write IELTS Writing Task 1? Explain step by step." : "IELTS Writing Task 1 uchun qanday yozish kerak? Bosqichma-bosqich tushuntirib bering." },
        { icon: Mic, label: tx(AIC.prompts.speaking, lang), text: lang === "en" ? "How do I prepare for IELTS Speaking Part 2? Give me the best tips." : "IELTS Speaking Part 2 uchun qanday tayyorlanaman? Eng yaxshi maslahatlarni bering." },
        { icon: Sparkles, label: tx(AIC.prompts.band7, lang), text: lang === "en" ? "What are the secrets to getting Band 7 or above in IELTS?" : "IELTS da Band 7 va undan yuqori ball olish uchun asosiy sirlarni aytib bering." },
    ];

    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE()]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPrompts, setShowPrompts] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setMessages([WELCOME_MESSAGE()]);
        setShowPrompts(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        setShowPrompts(false);
        const newMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        setError(null);
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        try {
            const res = await fetch("/api/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Server xatosi");
            setMessages([...newMessages, { role: "assistant", content: data.reply }]);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        const el = e.target;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 160) + "px";
    };

    const clearChat = () => {
        setMessages([{ role: "assistant", content: tx(AIC.cleared, lang) }]);
        setShowPrompts(true);
        setError(null);
    };

    const renderContent = (text: string) =>
        text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-bold'>$1</strong>").replace(/\n/g, "<br/>");

    return (
        <div className="relative min-h-screen bg-[#05050A] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* --- Background Effects --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Top left giant bloom */}
                <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen animate-pulse duration-[8s]" />
                {/* Bottom right electric cyan bloom */}
                <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/10 blur-[150px] mix-blend-screen" />
                {/* Center subtle purple glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] rounded-full bg-violet-900/10 blur-[140px]" />
            </div>

            {/* --- Floating Header --- */}
            <header className="fixed top-0 left-0 w-full z-50 pt-4 px-4 md:px-8">
                <div className="max-w-5xl mx-auto backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-3 md:p-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-semibold text-sm hidden sm:inline">{lang === "en" ? "Back to Dashboard" : "Boshqaruv paneliga qaytish"}</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] relative z-10">
                                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                            </div>
                            <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md opacity-50 animate-pulse" />
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#13141c] rounded-full z-20 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-bold text-white text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                IELTS AI Assistant
                            </h1>
                            <p className="text-[11px] text-cyan-400 font-medium font-mono uppercase tracking-wider">
                                ● {tx(AIC.online, lang)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={clearChat}
                        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all text-sm font-semibold"
                    >
                        <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">{tx(AIC.clear, lang)}</span>
                    </button>
                </div>
            </header>

            {/* --- Main Chat Area --- */}
            <main className="relative z-10 w-full max-w-5xl mx-auto pt-32 pb-40 px-4 md:px-8 h-screen overflow-y-auto custom-scrollbar flex flex-col">
                <div className="flex-1 w-full space-y-6 flex flex-col">
                    <AnimatePresence>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className={`flex gap-3 md:gap-4 items-end w-full group ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative ${msg.role === "assistant" ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20" : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-purple-500/20"}`}>
                                    {msg.role === "assistant" ? (
                                        <>
                                            <Bot className="w-5 h-5 text-white relative z-10" />
                                            <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
                                        </>
                                    ) : (
                                        <User className="w-5 h-5 text-white" />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div
                                    className={`max-w-[85%] md:max-w-[75%] px-5 py-4 text-[15px] leading-relaxed backdrop-blur-xl border shadow-2xl relative
                                        ${msg.role === "assistant"
                                            ? "bg-white/[0.03] border-white/10 text-slate-200 rounded-3xl rounded-bl-sm"
                                            : "bg-indigo-500/10 border-indigo-500/20 text-white rounded-3xl rounded-br-sm shadow-[0_4px_20px_rgba(99,102,241,0.1)]"
                                        }
                                    `}
                                >
                                    <div
                                        className="prose prose-invert prose-p:my-1 prose-headings:text-white max-w-none break-words"
                                        dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                                    />
                                    {/* Subtle edge highlight */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent rounded-t-3xl" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Quick Prompts */}
                    <AnimatePresence>
                        {showPrompts && messages.length === 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 md:pl-14 w-full max-w-3xl"
                            >
                                {QUICK_PROMPTS().map(({ icon: Icon, label, text }) => (
                                    <button
                                        key={label}
                                        onClick={() => sendMessage(text)}
                                        className="flex items-center gap-4 text-left px-5 py-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                        <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                            <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                        </div>
                                        <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-[15px]">{label}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-4 items-end max-w-[85%]"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-white animate-pulse" />
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl rounded-bl-sm px-5 py-4 shadow-2xl">
                                <div className="flex gap-1.5 items-center h-5">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.8)] [animation-delay:-0.3s]" />
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.8)] [animation-delay:-0.15s]" />
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.8)] [animation-delay:0s]" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 text-red-200 bg-red-500/10 border border-red-500/30 backdrop-blur-md rounded-2xl px-5 py-4 text-sm md:ml-14 max-w-2xl shadow-[0_0_30px_rgba(239,68,68,0.1)]"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                            <span className="leading-relaxed">{error}</span>
                        </motion.div>
                    )}

                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>

            {/* --- Input Dock --- */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-8 bg-gradient-to-t from-[#05050A] via-[#05050A]/90 to-transparent pt-12">
                <div className="max-w-4xl mx-auto relative group">
                    {/* Glowing aura around input */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-lg opacity-30 group-focus-within:opacity-70 transition-opacity duration-500" />

                    <div className="relative backdrop-blur-2xl bg-[#0D0E15]/80 border border-white/10 rounded-3xl p-3 flex items-end gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 group-focus-within:border-cyan-500/50 group-focus-within:bg-[#0D0E15]/95 group-focus-within:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder={tx(AIC.placeholder, lang)}
                            rows={1}
                            className="flex-1 resize-none bg-transparent text-white placeholder:text-slate-500 focus:outline-none py-3 px-4 min-h-[50px] max-h-[200px] overflow-y-auto leading-relaxed text-[15px] font-medium custom-scrollbar"
                            disabled={loading}
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || loading}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0 hover:opacity-100 opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-0.5 mr-0.5 relative overflow-hidden group/btn disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                            <Send className="w-5 h-5 relative z-10 -ml-0.5" />
                        </button>
                    </div>

                    <p className="text-center text-[10px] sm:text-[11px] text-slate-500 mt-4 tracking-wide font-medium">
                        {tx(AIC.disclaimer, lang)}
                    </p>
                </div>
            </div>

            {/* Global Custom Scrollbar for dark theme */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.2);
                }
                
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
