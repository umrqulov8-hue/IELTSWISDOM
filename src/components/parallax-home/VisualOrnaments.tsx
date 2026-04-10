"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const NeuralMasteryVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center p-20 bg-black overflow-hidden">
        {/* Animated Background Gradients */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 0],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#3b82f633,transparent)]"
        />
        
        {/* The Neural Map */}
        <div className="relative z-10 w-full h-full grid grid-cols-4 gap-4 md:gap-8">
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className="relative"
                >
                    <div className="w-full aspect-square border border-white/10 rounded-2xl flex items-center justify-center group overflow-hidden">
                        <motion.div 
                            animate={{ opacity: [0.1, 0.5, 0.1] }}
                            transition={{ duration: 2 + i % 2, repeat: Infinity, delay: i * 0.5 }}
                            className="bg-white/5 w-full h-full absolute inset-0 group-hover:bg-white/20 transition-colors" 
                        />
                        <div className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30 group-hover:opacity-100 transition-opacity">
                            {['Vocab', 'Logic', 'Flow', 'Tone', 'Grammar', 'Context', 'Speed', 'Depth'][i % 8]}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Dynamic Lines Layer */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <motion.path 
                d="M100,100 L300,400 L500,200 L700,500 L900,100" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </svg>
    </div>
);

export const EvaluationVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <motion.div 
            animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,#ef444433,transparent)]"
        />
        
        <div className="relative z-10 flex flex-col items-center gap-12">
            <div className="relative">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-80 h-80 md:w-[30rem] md:h-[30rem] border-4 border-dashed border-white/5 rounded-full" 
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-10 border-2 border-white/10 rounded-full flex items-center justify-center overflow-hidden"
                >
                    <div className="text-[12rem] font-black text-white mix-blend-difference opacity-5">AI</div>
                </motion.div>
                
                {/* Score Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center group">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="text-[10rem] md:text-[15rem] font-sans font-black text-white leading-none tracking-tighter"
                        >
                            8.5
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.4 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs uppercase tracking-[0.8em] font-black text-white"
                        >
                            Evaluation
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [20, 40, 20] }}
                        transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                        className="w-1.5 bg-white/20 rounded-full"
                    />
                ))}
            </div>
        </div>
    </div>
);

export const MockTestVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <motion.div 
            animate={{ 
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#10b98133,transparent)]"
        />
        
        <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] w-full max-w-2xl">
            <div className="flex justify-between items-center mb-12 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Listening Section</span>
                <span className="text-[10px] font-serif italic tracking-[0.2em]">Authentic Env</span>
            </div>
            
            <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-xs font-black opacity-40">
                            {i + 1}
                        </div>
                        <div className="flex-1 h-[1px] bg-white/10 relative">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 2, delay: i * 0.5 }}
                                className="absolute inset-0 h-full bg-white/40 shadow-[0_0_20px_white]" 
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-16 flex justify-center">
                <div className="text-[8rem] font-serif italic text-white/10 select-none">60:00</div>
            </div>
        </div>
    </div>
);
