"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, AlertCircle, Sparkles, BookOpen, Mic, PenLine, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { translations as T, tx } from "@/lib/translations";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BouncyText } from "@/components/ui/BouncyText";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AICheckPage() {
    const router = useRouter();
    const { lang } = useLanguage();
    const { isPro } = useSubscription();
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
            if (!res.ok) throw new Error(data.error || "Server error");
            setMessages([...newMessages, { role: "assistant", content: data.reply }]);
        } catch (err: any) {
            const msg = err.message || "Something went wrong";
            setError(msg);
            toast.error(msg);
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

    const renderContent = (text: string) => {
        // Robust basic markdown-like replacement
        let html = text
            .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
            .replace(/\n/g, "<br/>");
        return html;
    };

    return (
        <DashboardLayout fullHeight hideHeader>
            <div className="flex flex-col h-full w-full font-sans selection:bg-orange-500/30">
                {/* --- Header --- */}
                <header className="w-full z-50 pb-4 flex-shrink-0">
                    <div className="max-w-5xl mx-auto backdrop-blur-md bg-white/80 border border-slate-200/60 rounded-3xl p-3 md:p-4 flex items-center justify-between shadow-sm">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm hidden sm:inline">
                                <BouncyText key={`back-${lang}`} text={lang === "en" ? "Back to Dashboard" : "Boshqaruv paneliga qaytish"} type="word" />
                            </span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C00] to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,140,0,0.3)] relative z-10">
                                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                </div>
                                <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-40 animate-pulse" />
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-20 shadow-sm" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-slate-800 text-base tracking-wide">
                                    IELTS AI Assistant
                                </h1>
                                <p className="text-[11px] text-orange-500 font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                                    ● <BouncyText key={`ol-${lang}`} text={tx(AIC.online, lang)} type="word" />
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={clearChat}
                            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all text-sm font-semibold"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                <BouncyText key={`cl-${lang}`} text={tx(AIC.clear, lang)} type="word" />
                            </span>
                        </button>
                    </div>
                </header>

                {/* --- Main Chat Area --- */}
                <div className="flex-1 w-full max-w-5xl mx-auto overflow-y-auto custom-scrollbar flex flex-col pr-1 md:pr-4">
                    <div className="w-full space-y-6 flex flex-col pt-2 pb-4">
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
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md relative ${msg.role === "assistant" ? "bg-gradient-to-br from-[#FF8C00] to-amber-500" : "bg-gradient-to-br from-blue-500 to-cyan-500"}`}>
                                        {msg.role === "assistant" ? (
                                            <Bot className="w-5 h-5 text-white relative z-10" />
                                        ) : (
                                            <User className="w-5 h-5 text-white" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`max-w-[85%] md:max-w-[75%] px-5 py-4 text-[15px] leading-relaxed border shadow-sm relative
                                            ${msg.role === "assistant"
                                                ? "bg-white border-slate-200 text-slate-800 rounded-3xl rounded-bl-sm"
                                                : "bg-blue-50 border-blue-100 text-blue-900 rounded-3xl rounded-br-sm"
                                            }
                                        `}
                                    >
                                        <div
                                            className="prose prose-p:my-1 prose-headings:text-slate-800 max-w-none break-words"
                                            dangerouslySetInnerHTML={{ __html: msg.role === "assistant" ? renderContent(msg.content).replace(/class='text-white/g, "class='text-slate-900") : renderContent(msg.content) }}
                                        />
                                        {/* Subtle edge highlight */}
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent rounded-t-3xl" />
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
                                    {QUICK_PROMPTS().map(({ icon: Icon, label, text }, idx) => (
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1), type: "spring", bounce: 0.4 }}
                                            key={label}
                                            onClick={() => sendMessage(text)}
                                            className="flex items-center gap-4 text-left px-5 py-4 rounded-3xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-[0_4px_20px_rgba(255,140,0,0.1)] transition-all duration-300 group overflow-hidden relative"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                                                <Icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                                            </div>
                                            <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-[15px]">
                                                <BouncyText key={`qp-${idx}-${lang}`} text={label} type="word" />
                                            </span>
                                        </motion.button>
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
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C00] to-amber-500 shadow-md flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white animate-pulse" />
                                </div>
                                <div className="bg-white border border-slate-200 rounded-3xl rounded-bl-sm px-5 py-4 shadow-sm">
                                    <div className="flex gap-1.5 items-center h-5">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0s]" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-3 text-red-600 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm md:ml-14 max-w-2xl shadow-sm"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                                <span className="leading-relaxed">{error}</span>
                            </motion.div>
                        )}

                        <div ref={bottomRef} className="h-4" />
                    </div>
                </div>

                {/* --- Input Dock --- */}
                <div className="w-full z-50 pt-4 pb-2 flex-shrink-0 bg-transparent">
                    <div className="max-w-4xl mx-auto relative group">
                        {!isPro && (
                            <div className="absolute inset-0 z-[60] backdrop-blur-md bg-white/20 rounded-3xl flex items-center justify-center border border-white/40 shadow-lg">
                                <div className="text-center p-6 bg-white/90 rounded-2xl shadow-xl border border-slate-200">
                                    <Lock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                    <h3 className="text-slate-800 font-bold mb-1">Premium Feature</h3>
                                    <p className="text-slate-500 text-xs mb-4">Upgrade to Pro to chat with AI Assistant</p>
                                    <Link href="/upgrade">
                                        <button className="px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-transform">
                                            Upgrade Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        <div className={cn(
                            "relative backdrop-blur-xl bg-white/90 border border-slate-200 rounded-3xl p-3 flex items-end gap-3 shadow-lg transition-all duration-300 group-focus-within:border-orange-400/50 group-focus-within:shadow-[0_8px_30px_rgba(255,140,0,0.15)] group-focus-within:bg-white text-slate-800",
                            !isPro && "opacity-50 pointer-events-none"
                        )}>
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                placeholder={tx(AIC.placeholder, lang)}
                                rows={1}
                                className="flex-1 resize-none bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none py-3 px-4 min-h-[50px] max-h-[200px] overflow-y-auto leading-relaxed text-[15px] font-medium custom-scrollbar"
                                disabled={loading || !isPro}
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || loading || !isPro}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-[#FF8C00] flex items-center justify-center text-white flex-shrink-0 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 mb-0.5 mr-0.5"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-center text-[10px] sm:text-[11px] text-slate-500 mt-4 tracking-wide font-medium">
                            <BouncyText key={`disc-${lang}`} text={tx(AIC.disclaimer, lang)} type="word" />
                        </p>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.1);
                        border-radius: 20px;
                    }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.2);
                    }
                `}} />
            </div>
        </DashboardLayout>
    );
}
