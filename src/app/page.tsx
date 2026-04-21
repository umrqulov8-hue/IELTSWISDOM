"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SkeletonHero from '@/components/parallax-home/SkeletonHero';

const LandingPage = dynamic(() => import('@/components/parallax-home/NoirLanding'), { 
    ssr: false,
});

export default function Home() {
    return (
        <Suspense fallback={<SkeletonHero />}>
            <LandingPage />
        </Suspense>
    );
}