"use client";

import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('@/components/parallax-home/LandingPage'), { 
    ssr: false,
    loading: () => <div className="min-h-screen bg-white" />
});

export default function Home() {
    return <LandingPage />;
}