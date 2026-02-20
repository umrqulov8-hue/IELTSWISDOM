"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Link as LinkIcon, ClipboardCheck, Keyboard, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 max-w-4xl w-full mx-auto overflow-hidden"
                    >
                        {/* Content */}
                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Choose an Activity</h2>
                            <p className="text-slate-500">
                                <span className="font-medium text-slate-700">Book:</span> {data.bookTitle}, <span className="font-medium text-slate-700">Test:</span> {data.testTitle}, <span className="font-medium text-slate-700">Passage:</span> {data.passageTitle}
                            </p>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-0 right-0 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 mb-8">
                            {activities.map((activity, idx) => {
                                const Icon = activity.icon;
                                return (
                                    <Link
                                        key={activity.id}
                                        href={`/practice/${activity.id}?id=${data.passageId}`}
                                        className={`group relative p-6 rounded-2xl border ${activity.border} ${activity.bg} ${activity.hover} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center gap-4`}
                                    >
                                        <div className={`p-4 rounded-xl bg-white shadow-sm ${activity.color} group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">
                                                {activity.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium">
                                                {activity.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="text-center relative z-10">
                            <button onClick={onClose} className="text-slate-400 hover:text-amber-500 text-sm font-medium transition-colors inline-flex items-center gap-1 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Need more words? Go back to Collections.
                            </button>
                        </div>

                        {/* Decorative Background Blobs */}
                        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
