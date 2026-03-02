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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                        left: adjustedX,
                        top: adjustedY,
                        position: 'fixed'
                    }}
                    className="z-[10002] flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-xl shadow-slate-200/50 -translate-x-1/2"
                >
                    <HighlightButton
                        color="yellow"
                        className="bg-yellow-200 hover:bg-yellow-300 border-yellow-300"
                        onClick={() => onHighlight('yellow')}
                    />
                    <HighlightButton
                        color="green"
                        className="bg-green-200 hover:bg-green-300 border-green-300"
                        onClick={() => onHighlight('green')}
                    />
                    <HighlightButton
                        color="blue"
                        className="bg-blue-200 hover:bg-blue-300 border-blue-300"
                        onClick={() => onHighlight('blue')}
                    />
                    <div className="w-px h-4 bg-slate-200 mx-0.5" />
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onHighlight('copy')}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        title="Copy to Clipboard"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onHighlight('none')}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        title="Remove Highlight"
                    >
                        <Eraser className="w-4 h-4" />
                    </button>
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
        <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={cn(
                "w-8 h-8 rounded-full border-2 transition-all active:scale-90 hover:shadow-sm",
                className
            )}
            title={`Highlight ${color}`}
        >
            <span className="sr-only">Highlight {color}</span>
        </button>
    );
};
