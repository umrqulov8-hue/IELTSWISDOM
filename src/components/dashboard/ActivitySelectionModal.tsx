"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Link as LinkIcon, ClipboardCheck, Keyboard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActivitySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        bookTitle: string;
        testTitle: string;
        passageTitle: string;
        passageId: string;
    } | null;
}

const activities = [
    {
        id: "flashcards",
        title: "Flashcards",
        description: "Master vocabulary with interactive flashcards",
        icon: Layers,
        color: "text-blue-500",
        bg: "bg-blue-50",
        border: "border-blue-100",
        hover: "hover:bg-blue-100/50"
    },
    {
        id: "matching",
        title: "Matching Game",
        description: "Connect terms with their definitions",
        icon: LinkIcon,
        color: "text-purple-500",
        bg: "bg-purple-50",
        border: "border-purple-100",
        hover: "hover:bg-purple-100/50"
    },
    {
        id: "quiz",
        title: "Quiz",
        description: "Test your knowledge with challenging questions",
        icon: ClipboardCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        hover: "hover:bg-emerald-100/50"
    },
    {
        id: "typing",
        title: "Typing Practice",
        description: "Improve recall through active typing exercises",
        icon: Keyboard,
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
        hover: "hover:bg-amber-100/50"
    }
];

export function ActivitySelectionModal({ isOpen, onClose, data }: ActivitySelectionModalProps) {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-12 md:pt-24 lg:pt-32">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40, filter: "blur(20px)" }}
                        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ scale: 0.9, opacity: 0, y: 40, filter: "blur(20px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative bg-white/10 backdrop-blur-[32px] border-t border-l border-white/40 border-b border-r border-black/20 shadow-[0_24px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] p-8 md:p-12 max-w-4xl w-full mx-auto overflow-hidden mb-12"
                    >
                        {/* Realistic Reflective Shine Overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_1px_5px_rgba(255,255,255,0.5)]" />
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/40 to-transparent" />
                        </div>

                        {/* Animated Liquid Blobs Inside Modal */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
                            <motion.div
                                animate={{
                                    x: [0, 100, -100, 0],
                                    y: [0, -50, 50, 0],
                                    rotate: [0, 90, 180, 0]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-blue-400/10 rounded-full blur-[100px]"
                            />
                            <motion.div
                                animate={{
                                    x: [0, -100, 100, 0],
                                    y: [0, 50, -50, 0],
                                    rotate: [0, -90, -180, 0]
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-amber-400/10 rounded-full blur-[100px]"
                            />
                        </div>

                        {/* Content */}
                        <div className="text-center mb-10 relative z-10">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl font-black text-slate-800 mb-3 tracking-tight"
                            >
                                Choose an Activity
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed"
                            >
                                <span className="font-bold text-slate-700">Book:</span> {data.bookTitle} <span className="mx-2 opacity-30">|</span> <span className="font-bold text-slate-700">Test:</span> {data.testTitle}
                                <br />
                                <span className="text-sm font-medium opacity-80 mt-1 block">Passage: {data.passageTitle}</span>
                            </motion.p>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute -top-2 -right-2 md:top-0 md:right-0 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all text-slate-600 border border-white/40 shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10 mb-10">
                            {activities.map((activity, idx) => {
                                const Icon = activity.icon;
                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                    >
                                        <Link
                                            href={`/practice/${activity.id}?id=${data.passageId}`}
                                            className={cn(
                                                "group relative p-7 rounded-3xl border border-white/40 bg-white/5 hover:bg-white/20 backdrop-blur-md transition-all duration-500 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 flex flex-col items-center text-center gap-5 overflow-hidden",
                                            )}
                                        >
                                            {/* Subtle Shimmer for Cards */}
                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                            <div className={cn(
                                                "p-4 rounded-2xl shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg",
                                                activity.bg, activity.color
                                            )}>
                                                <Icon className="w-9 h-9" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-1.5">
                                                    {activity.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                                                    {activity.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="text-center relative z-10">
                            <button onClick={onClose} className="text-slate-500 hover:text-amber-500 text-sm font-bold transition-all inline-flex items-center gap-2 group px-6 py-2 rounded-full border border-transparent hover:border-amber-100 hover:bg-amber-50/10">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                                Need more words? Go back to Collections.
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
