"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles, Send, Bot, User, Trash2, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AICheckPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Salom! Men IELTS Wisdom AI yordamchisiman 🎓\n\nMen sizga quyidagilarda yordam bera olaman:\n• **Insho (Writing)** tekshirish va band baho berish\n• **Speaking** mashq va maslahatlar\n• **Reading & Listening** strategiyalar\n• Grammatika va lug'at tuzatish\n• Umumiy IELTS tayyorgarlik bo'yicha savollar\n\nInshoingizni yoki savolingizni yuboring, men javob beraman! 💪",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const newMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        setError(null);

        // reset textarea height
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        try {
            const res = await fetch("/api/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
                }),
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
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        const el = e.target;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 180) + "px";
    };

    const clearChat = () => {
        setMessages([
            {
                role: "assistant",
                content: "Suhbat tozalandi! Yangi savol yoki inshoingizni yuboring 😊",
            },
        ]);
        setError(null);
    };

    return (
        <DashboardLayout
            title="Premium AI Check"
            description="AI yordamchingiz bilan IELTS bo'yicha savol bering yoki inshongizni tekshiring."
        >
            <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1c3e2e]">IELTS AI Yordamchisi</h3>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                                Online · GPT-4o Mini
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={clearChat}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        Tozalash
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Avatar */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === "assistant"
                                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                                        : "bg-[#1c3e2e]"
                                    }`}
                            >
                                {msg.role === "assistant" ? (
                                    <Bot className="w-4 h-4 text-white" />
                                ) : (
                                    <User className="w-4 h-4 text-white" />
                                )}
                            </div>

                            {/* Bubble */}
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === "assistant"
                                        ? "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none"
                                    }`}
                                dangerouslySetInnerHTML={{
                                    __html: msg.content
                                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                        .replace(/\n/g, "<br/>"),
                                }}
                            />
                        </div>
                    ))}

                    {/* Loading dots */}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                <div className="flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input bar */}
                <div className="mt-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-end gap-2 p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleTextareaInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Savol bering yoki inshongizni yuboring... (Enter = yuborish, Shift+Enter = yangi qator)"
                        rows={1}
                        className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none py-2 px-2 max-h-[180px] overflow-y-auto"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-2">
                    AI xatolik qilishi mumkin. Muhim ma'lumotlarni tekshiring.
                </p>
            </div>
        </DashboardLayout>
    );
}
