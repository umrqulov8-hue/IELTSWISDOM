"use client";

import React from 'react';

export default function SkeletonHero() {
    return (
        <div className="relative w-full overflow-hidden bg-white min-h-screen">
            {/* Minimal Header Shell */}
            <div className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-20 py-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-black rounded-lg" />
                    <div className="w-24 h-4 bg-black/10 rounded" />
                </div>
            </div>

            {/* Static Hero Shell */}
            <div className="relative h-screen w-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-4">
                    <div className="w-32 h-2 bg-black/5 mb-10 rounded" />
                    <h1 className="text-[clamp(4rem,18vw,16rem)] font-black leading-[0.8] tracking-tighter text-black uppercase opacity-10">
                        WISDOM
                    </h1>
                    <div className="mt-12 w-64 h-4 bg-black/5 rounded" />
                    <div className="mt-16 w-48 h-14 bg-black rounded-full" />
                </div>
            </div>
        </div>
    );
}
