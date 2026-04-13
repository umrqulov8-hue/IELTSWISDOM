"use client";

import React from 'react';

export default function SkeletonHero() {
    return (
        <main className="relative bg-white min-h-screen overflow-hidden">
            {/* Header Shell */}
            <header className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-20 py-8 flex justify-between items-center border-b border-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-serif italic text-xl">W</span>
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter text-black">Wisdom</span>
                </div>
                <div className="w-[180px] h-14 bg-black rounded-full" />
            </header>

            {/* Static Hero Shell */}
            <section className="relative h-screen w-full flex items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center justify-center text-center px-4 w-full h-screen">
                    <h1 className="text-[14vw] md:text-[16vw] leading-[0.75] font-black tracking-tighter text-black uppercase">
                        Wisdom
                    </h1>
                    <p className="text-2xl md:text-4xl font-serif italic text-black/80 mt-12">
                        The Science of Scoring.
                    </p>
                    <div className="mt-16 w-48 h-16 bg-black rounded-full" />
                </div>
            </section>
        </main>
    );
}
