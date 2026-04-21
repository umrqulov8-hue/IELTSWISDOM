"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * IELTS Wisdom Landing V3.2 - Stable
 */

const SECTIONS = [
    { id: "hero",        bg: "#ffffff", theme: "light" },
    { id: "methodology", bg: "#000000", theme: "dark" },
    { id: "curriculum",  bg: "#f8f8f8", theme: "light" },
    { id: "results",     bg: "#000000", theme: "dark" },
    { id: "special-pricing", bg: "#ffffff", theme: "light" },
    { id: "cta",         bg: "#000000", theme: "dark" },
];

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { handleStartLearning } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handlePlanSelect = async (planName: string, price: string) => {
        try {
            setIsLoading(planName);
            const res = await fetch("/api/payments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName,
                    amount: parseInt(price.replace(/,/g, "")),
                }),
            });

            if (res.status === 401) {
                handleStartLearning();
                return;
            }

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Payment initiation failed");
            }

            const { payment_url } = await res.json();
            window.location.href = payment_url;
        } catch (error: any) {
            console.error("Payment error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoading(null);
        }
    };

    useEffect(() => {
        setIsLoaded(true);
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.5, // Smoother scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.2,
            lerp: 0.1, // Added for extra smoothness
        });

        const rAF = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(rAF);
        };
        requestAnimationFrame(rAF);

        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray<HTMLElement>(".parallax-panel");

            panels.forEach((panel, i) => {
                const isLast = i === panels.length - 1;

                // ── Section Pinning ──
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top",
                    end: isLast ? "bottom bottom" : "+=100%",
                    pin: !isLast,
                    pinSpacing: false,
                    anticipatePin: 1,
                    scrub: 1.2, // Increased for smoother catch-up
                });

                // ── Overlay Effect ──
                if (i > 0) {
                    gsap.fromTo(panel, 
                        { yPercent: 100 },
                        {
                            yPercent: 0,
                            ease: "power2.inOut", // Smoother easing
                            scrollTrigger: {
                                trigger: panel,
                                start: "top bottom",
                                end: "top top",
                                scrub: 1.2,
                            }
                        }
                    );
                }

                // ── Inner Parallax ──
                const bg = panel.querySelector(".panel-bg");
                if (bg) {
                    gsap.to(bg, {
                        y: -80, // Slightly more pronounced parallax
                        ease: "none",
                        scrollTrigger: {
                            trigger: panel,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }
            });

            // ── Hero Animations ──
            gsap.from(".hero-letter", {
                y: 120,
                opacity: 0,
                duration: 2,
                stagger: 0.15,
                ease: "expo.out",
                delay: 0.5
            });

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-white">
            {/* NOIR NOISE */}
            <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] select-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="n">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#n)" />
                </svg>
            </div>

            {/* ── PANEL 1: HERO ── */}
            <section id="hero" className="parallax-panel relative h-screen w-full flex items-center justify-center bg-white z-[10]">
                <div className="panel-bg absolute inset-0 z-0">
                    <Image
                        src="/noir_elite_architecture_bg_1776527207196.png"
                        alt=""
                        fill
                        priority
                        className="object-cover grayscale brightness-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white" />
                </div>
                
                <div className="relative z-10 text-center px-4">
                    <p className="mb-10 text-[10px] uppercase font-black tracking-[1em] text-black/30">IELTS Wisdom</p>
                    <div className="flex justify-center flex-wrap gap-0 overflow-hidden py-4">
                        {"WISDOM".split("").map((c, i) => (
                            <span key={i} className="hero-letter block text-[clamp(4rem,18vw,16rem)] font-black leading-[0.8] tracking-tighter text-black uppercase">
                                {c}
                            </span>
                        ))}
                    </div>
                    <p className="mt-12 text-2xl font-serif italic text-black/40">IELTSda muvaffaqiyat garovi.</p>
                </div>
            </section>

            {/* ── PANEL 2: METHODOLOGY ── */}
            <section id="methodology" className="parallax-panel relative h-screen w-full flex items-center bg-black z-[20]">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="max-w-md">
                            <h2 className="text-[clamp(3rem,8vw,7rem)] font-black text-white leading-[0.85] tracking-tighter uppercase mb-10">
                                IELTS<br /><span className="text-white/20">Wisdom.</span>
                            </h2>
                            <p className="text-xl text-white/40 leading-relaxed italic mb-12">
                                Tajribali mutaxassislar tomonidan yaratilgan eng mukammal o'quv tizimi.
                            </p>
                            <button className="px-10 py-4 border border-white/20 rounded-full text-[10px] uppercase font-black tracking-[0.4em] text-white/40 hover:text-white hover:border-white transition-all">
                                O'rganish
                            </button>
                        </div>
                        <div className="flex flex-col justify-center border-t border-white/10">
                            {[
                                { n: "91%", d: "Muvaffaqiyatli talabalar" },
                                { n: "2.5x", d: "Tezroq natijaga erishish" },
                                { n: "50k+", d: "O'rganilgan materiallar" }
                            ].map((s, i) => (
                                <div key={i} className="py-10 border-b border-white/10 flex items-end gap-6 group cursor-pointer transition-colors hover:text-white">
                                    <span className="text-7xl font-black text-white tracking-tighter tabular-nums leading-none">{s.n}</span>
                                    <span className="text-sm text-white/30 font-medium mb-2 group-hover:text-white">{s.d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PANEL 3: CURRICULUM ── */}
            <section id="curriculum" className="parallax-panel relative h-screen w-full flex items-center bg-[#f2f2f2] z-[30]">
                <div className="w-full max-w-7xl mx-auto px-10">
                    <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-black leading-none tracking-tighter uppercase mb-16">
                        O'quv<br /><span className="text-black/10">Rejasi.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-black/5 pt-10">
                        {["Reading", "Listening", "Writing", "Speaking"].map((t, i) => (
                            <div key={i} className="p-10 bg-white/50 backdrop-blur-sm rounded-3xl group cursor-pointer hover:bg-black hover:text-white transition-all duration-700">
                                <span className="text-xs font-black opacity-20 group-hover:opacity-40">0{i+1}</span>
                                <h3 className="text-3xl font-black my-4 tracking-tighter">{t}</h3>
                                <div className="w-10 h-1 bg-black/5 group-hover:bg-white/20 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PANEL 4: RESULTS ── */}
            <section id="results" className="parallax-panel relative h-screen w-full flex items-center bg-black z-[40]">
                <div className="w-full max-w-7xl mx-auto px-10 text-center">
                    <p className="text-[10px] uppercase font-black tracking-[0.8em] text-white/20 mb-10">Talabalar Natijalari</p>
                    <div className="grid grid-cols-3 gap-10">
                        {[
                            { n: "8.5", l: "O'rtacha Ball" },
                            { n: "10k+", l: "Talabalar" },
                            { n: "94%", l: "Muvaffaqiyat" }
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-8xl font-black text-white tracking-tighter">{s.n}</span>
                                <span className="text-[10px] uppercase font-black tracking-[0.5em] text-white/30">{s.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PANEL 5: PRICING ── */}
            <section id="special-pricing" className="parallax-panel relative h-screen w-full flex items-center bg-white z-[50]">
                <div className="w-full max-w-7xl mx-auto px-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                        <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-black leading-[0.85] tracking-tighter uppercase">
                            Tariflar<br /><span className="text-black/10">Sarmoyasi.</span>
                        </h2>
                        <p className="text-sm font-medium text-black/40 max-w-xs italic leading-relaxed">Kelajagingiz uchun munosib sarmoya. Har bir tiyin uchun natija.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { n: "Pro", p: "25,000", d: "2 Mock imtihon", b: false },
                            { n: "Premium", p: "50,000", d: "3 Mock imtihon", b: true },
                            { n: "Ultimate", p: "80,000", d: "4 Mock imtihon", b: false },
                            { n: "Lifetime", p: "150,000", d: "Bir umrlik", b: false }
                        ].map((p, i) => (
                            <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col gap-6 relative overflow-hidden transition-all duration-700 hover:scale-[1.02] ${p.b ? 'bg-black text-white shadow-2xl' : 'bg-[#f8f8f8] text-black'}`}>
                                <p className="text-[9px] uppercase font-black tracking-[0.5em] opacity-40">{p.n}</p>
                                <p className="text-5xl font-black tracking-tighter leading-none">{p.p}<span className="text-xs ml-1 opacity-40">UZS</span></p>
                                <p className="text-xs font-medium opacity-50">{p.d}</p>
                                <button 
                                    onClick={() => handlePlanSelect(p.n, p.p)}
                                    disabled={!!isLoading}
                                    className={`mt-10 py-4 rounded-full text-[9px] uppercase font-black tracking-[0.3em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${p.b ? 'bg-white text-black' : 'bg-black text-white'}`}
                                >
                                    {isLoading === p.n ? (
                                        <>
                                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ...
                                        </>
                                    ) : "Tanlash"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PANEL 6: CTA ── */}
            <section id="cta" className="parallax-panel relative h-screen w-full flex items-center justify-center bg-black text-center z-[60]">
                <div>
                    <h2 className="text-[clamp(4rem,12vw,12rem)] font-black text-white leading-[0.8] tracking-tighter uppercase mb-16">
                        Hoziroq<br /><span className="text-white/20">Boshlang.</span>
                    </h2>
                    <button onClick={handleStartLearning} className="px-20 py-8 bg-white text-black rounded-full font-black uppercase text-xs tracking-[0.5em] shadow-[0_20px_100px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all">
                        O'qishni boshlash
                    </button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.8em] text-white/10">IELTS Wisdom © 2025</div>
            </section>
        </div>
    );
}
