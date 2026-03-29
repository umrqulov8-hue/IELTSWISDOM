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
        color: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-100",
        hover: "hover:bg-blue-100/50"
    },
    {
        id: "matching",
        title: "Matching Game",
        description: "Connect terms with their definitions",
        icon: LinkIcon,
        color: "text-purple-700",
        bg: "bg-purple-50",
        border: "border-purple-100",
        hover: "hover:bg-purple-100/50"
    },
    {
        id: "quiz",
        title: "Quiz",
        description: "Test your knowledge with challenging questions",
        icon: ClipboardCheck,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        hover: "hover:bg-emerald-100/50"
    },
    {
        id: "typing",
        title: "Typing Practice",
        description: "Improve recall through active typing exercises",
        icon: Keyboard,
        color: "text-amber-700",
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
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-20 md:pt-32 lg:pt-40">
                    {/* Backdrop - Simple Light backdrop as requested (non-dark) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/5 cursor-pointer"
                    />

                    {/* Modal Card - Ultra Compact size: max-w-lg, padding: p-6/p-8 */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="relative bg-white/40 backdrop-blur-[24px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.05)] rounded-[2rem] p-6 md:p-8 max-w-lg w-full mx-auto mb-12"
                    >
                        {/* Static Subtle Shine Overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-[2rem] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50" />
                        </div>



                        {/* Content */}
                        <div className="text-center mb-6 relative z-10">
                            <motion.h2
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl font-black text-slate-800 mb-1.5 tracking-tight"
                            >
                                Choose an Activity
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 max-w-sm mx-auto px-4 leading-relaxed text-xs md:text-sm font-medium"
                            >
                                <span className="font-bold text-slate-600 truncate inline-block max-w-[120px]">{data.bookTitle}</span>
                                <span className="mx-1 opacity-20">|</span>
                                <span className="font-bold text-slate-600 truncate inline-block max-w-[100px]">{data.testTitle}</span>
                                <br />
                                <span className="text-[10px] opacity-70 mt-0.5 block truncate">{data.passageTitle}</span>
                            </motion.p>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute -top-1 -right-1 p-2 rounded-full bg-slate-100/50 hover:bg-slate-200/80 transition-all text-slate-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 mb-6">
                            {activities.map((activity, idx) => {
                                const Icon = activity.icon;
                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (idx * 0.05) }}
                                    >
                                        <Link
                                            href={`/practice/${activity.id}?id=${data.passageId}`}
                                            className={cn(
                                                "group relative p-4 rounded-2xl border border-white/50 bg-white/20 hover:bg-white/40 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 flex flex-col items-center text-center gap-2",
                                            )}
                                        >

                                            <div className={cn(
                                                "p-2 rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110",
                                                activity.bg, activity.color
                                            )}>
                                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-slate-800 mb-0.5">
                                                    {activity.title}
                                                </h3>
                                                <p className="text-[10px] text-slate-600 font-semibold leading-tight px-1">
                                                    {activity.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="text-center relative z-10">
                            <button onClick={onClose} className="text-slate-600 hover:text-amber-700 text-[11px] font-bold transition-all inline-flex items-center gap-1 group py-1 px-4 rounded-full hover:bg-amber-50/30">
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                Go back
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
