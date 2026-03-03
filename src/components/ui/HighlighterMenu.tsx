"use client";

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlighter, Eraser, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'none' | 'copy';

interface HighlighterMenuProps {
    onHighlight: (color: HighlightColor) => void;
    isVisible: boolean;
    position: { x: number; y: number };
}

export const HighlighterMenu: React.FC<HighlighterMenuProps> = ({ onHighlight, isVisible, position }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Adjust position to be centered above selection
    const adjustedX = position.x;
    const adjustedY = position.y - 60;

    const containerVariants: any = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            filter: 'blur(10px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: 10,
            scale: 0.9,
            filter: 'blur(5px)',
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 500, damping: 30 }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={menuRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    style={{
                        left: adjustedX,
                        top: adjustedY,
                        position: 'fixed'
                    }}
                    className="z-[10002] flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] -translate-x-1/2 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none overflow-hidden"
                >
                    <motion.div variants={itemVariants}>
                        <HighlightButton
                            color="yellow"
                            className="bg-yellow-200 hover:bg-yellow-300 border-yellow-300/50 shadow-yellow-200/50"
                            onClick={() => onHighlight('yellow')}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <HighlightButton
                            color="green"
                            className="bg-green-200 hover:bg-green-300 border-green-300/50 shadow-green-200/50"
                            onClick={() => onHighlight('green')}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <HighlightButton
                            color="blue"
                            className="bg-blue-200 hover:bg-blue-300 border-blue-300/50 shadow-blue-200/50"
                            onClick={() => onHighlight('blue')}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="w-px h-4 bg-slate-200/50 mx-0.5" />

                    <motion.div variants={itemVariants}>
                        <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onHighlight('copy')}
                            className="p-1.5 rounded-full hover:bg-slate-100/80 text-slate-500 transition-colors relative group active:scale-95"
                            title="Copy to Clipboard"
                        >
                            <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onHighlight('none')}
                            className="p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors group active:scale-95"
                            title="Remove Highlight"
                        >
                            <Eraser className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface HighlightButtonProps {
    color: HighlightColor;
    className: string;
    onClick: () => void;
}

const HighlightButton: React.FC<HighlightButtonProps> = ({ color, className, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={cn(
                "w-8 h-8 rounded-full border-2 transition-colors shadow-sm relative overflow-hidden",
                "after:absolute after:inset-0 after:bg-gradient-to-tr after:from-white/30 after:to-transparent",
                className
            )}
            title={`Highlight ${color}`}
        >
            <span className="sr-only">Highlight {color}</span>
        </motion.button>
    );
};
