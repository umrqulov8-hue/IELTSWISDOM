"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Info } from "lucide-react";

interface VideoLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
    description: string;
}

export function VideoLessonModal({ isOpen, onClose, videoUrl, title, description }: VideoLessonModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div key="video-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                    >
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                            <div className="relative flex-1 bg-black aspect-video lg:aspect-auto">
                                <iframe
                                    src={videoUrl}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="w-full lg:w-80 p-8 flex flex-col bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                                        <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                        Lecture Video
                                    </span>
                                </div>

                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                                    {title}
                                </h2>
                                
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                                    {description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-snug">
                                            Watch the full lecture to unlock advanced strategies for this section. Don't forget to take notes!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
