"use client";

import dynamic from 'next/dynamic';

import { Suspense } from 'react';

const LandingPage = dynamic(() => import('@/components/parallax-home/LandingPage'), { 
    ssr: false,
});

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <LandingPage />
        </Suspense>
    );
}