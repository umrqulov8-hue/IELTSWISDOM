"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Send, Bot, User, Trash2, AlertCircle, Sparkles, BookOpen, Mic, PenLine } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AICheckPage() {
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

    // Re-generate welcome message when language changes
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
        text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

    return (
        <DashboardLayout title={tx(AIC.title, lang)} description={tx(AIC.desc, lang)}>
            <div className="flex flex-col h-[calc(100vh-148px)] max-w-3xl mx-auto">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">IELTS AI {lang === "en" ? "Assistant" : "Yordamchisi"}</p>
                            <p className="text-xs text-green-500 font-medium">● {tx(AIC.online, lang)}</p>
                        </div>
                    </div>
                    <button onClick={clearChat} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100">
                        <Trash2 className="w-3.5 h-3.5" /> {tx(AIC.clear, lang)}
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-5 pr-1 pb-3">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-end`}>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "assistant" ? "bg-gradient-to-br from-violet-600 to-indigo-600" : "bg-gradient-to-br from-[#1c3e2e] to-[#2d6049]"}`}>
                                {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                            </div>
                            <div className={`max-w-[78%] text-sm leading-[1.7] ${msg.role === "assistant" ? "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm" : "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-md shadow-violet-200"}`}
                                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                            />
                        </div>
                    ))}

                    {/* Quick prompts */}
                    {showPrompts && messages.length === 1 && (
                        <div className="grid grid-cols-2 gap-2 pt-1 pl-11">
                            {QUICK_PROMPTS().map(({ icon: Icon, label, text }) => (
                                <button key={label} onClick={() => sendMessage(text)}
                                    className="flex items-center gap-2 text-left px-3 py-2.5 rounded-xl bg-white border border-slate-100 hover:border-violet-200 hover:bg-violet-50 transition-all text-xs text-slate-600 hover:text-violet-700 shadow-sm hover:shadow-md group">
                                    <Icon className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Typing indicator */}
                    {loading && (
                        <div className="flex gap-3 items-end">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                <div className="flex gap-1 items-center h-4">
                                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm ml-11">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input bar */}
                <div className="mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 flex items-end gap-2 p-2.5 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50 transition-all">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder={tx(AIC.placeholder, lang)}
                        rows={1}
                        className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none py-1.5 px-2 max-h-[160px] overflow-y-auto leading-relaxed"
                        disabled={loading}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || loading}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-md shadow-violet-200"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-center text-[11px] text-slate-400 mt-2">
                    {tx(AIC.disclaimer, lang)}
                </p>
            </div>
        </DashboardLayout>
    );
}
