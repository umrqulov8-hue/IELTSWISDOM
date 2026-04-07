"use client";

import { useAuth } from "@/hooks/useAuth";
import { m, LazyMotion, domMax } from "framer-motion";
import dynamic from "next/dynamic";
import { MagicButton } from "./ui/MagicButton";
import SplitText from "./ui/SplitText";

const Threads = dynamic(() => import("./ui/Threads"), {
  ssr: false,
});

const GradualBlur = dynamic(() => import("./ui/GradualBlur"), {
  ssr: false,
});

export function Hero() {
    const { handleStartLearning, isLoading } = useAuth();

    return (
        <LazyMotion features={domMax}>
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white selection:bg-slate-950 selection:text-white">
                {/* Minimalist Grid / Noise Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-80" />

                {/* Subdued Cinematic WebGL Threads Background - Full Screen */}
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)] mix-blend-multiply will-change-transform">
                    <Threads 
                        amplitude={1.2}
                        distance={0.2}
                        enableMouseInteraction={true}
                        color={[0.2, 0.4, 0.8]} 
                    />
                </div>

                <div className="container relative mx-auto px-6 text-center z-10 flex flex-col items-center justify-center">
                    
                    {/* Oversized, Tightly Kerned Rezo-Zero Style Typography */}
                    <h1 className="text-[12vw] sm:text-[8vw] md:text-7xl lg:text-[110px] xl:text-[130px] font-black tracking-[-0.04em] leading-[0.9] max-w-[90vw] mx-auto mb-10 flex flex-col items-center">
                        <div className="overflow-hidden pb-2">
                            <SplitText
                                text="Master every section"
                                className="text-slate-950 drop-shadow-sm"
                                delay={20}
                                duration={1.2}
                                threshold={0.1}
                                splitType="words"
                                from={{ opacity: 0, y: 120, rotate: 5 }}
                                to={{ opacity: 1, y: 0, rotate: 0 }}
                                ease="power4.out"
                            />
                        </div>
                        <div className="overflow-hidden pb-4">
                            <SplitText
                                text="OF THE IELTS EXAM"
                                className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-800 to-slate-500 font-extrabold uppercase italic tracking-tighter"
                                delay={60}
                                duration={1.4}
                                threshold={0.1}
                                splitType="words"
                                from={{ opacity: 0, y: 120, rotate: -5 }}
                                to={{ opacity: 1, y: 0, rotate: 0 }}
                                ease="power4.out"
                            />
                        </div>
                    </h1>

                    {/* Minimalist Subtext Reveal */}
                    <div className="overflow-hidden mb-16">
                        <SplitText
                            text="Reach Band 8.5+ with precision evaluations, authentic mock tests, and systematic section mastery designed by experts."
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto block font-light tracking-wide leading-relaxed"
                            delay={30}
                            duration={1.2}
                            splitType="lines"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            ease="power3.out"
                        />
                    </div>

                    {/* Brutalist / Minimalist CTAs */}
                    <m.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center gap-6 w-full"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={handleStartLearning}
                                disabled={isLoading}
                                className="relative group overflow-hidden rounded-full bg-slate-950 text-white px-10 py-5 text-lg font-bold tracking-tight transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isLoading ? "Loading..." : "Start Free"}
                                </span>
                                <div className="absolute inset-0 h-full w-0 bg-slate-800 transition-all duration-500 ease-out group-hover:w-full z-0" />
                            </button>

                            <button className="relative group rounded-full bg-white border border-slate-200 text-slate-900 px-10 py-5 text-lg font-medium tracking-tight transition-all duration-500 hover:bg-slate-50 shadow-sm active:scale-95">
                                Play Guide
                            </button>
                        </div>
                        
                        <m.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-sm font-medium text-slate-500 mt-4 tracking-wide uppercase"
                        >
                            Already using IELTS Wisdom? 
                            <button onClick={handleStartLearning} className="text-slate-950 font-bold hover:text-slate-700 transition-colors ml-2 hover:underline decoration-slate-900/30 underline-offset-4">
                                Sign in
                            </button>
                        </m.p>
                    </m.div>

                </div>

                {/* Subtle Scroll Indicator */}
                <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-slate-900/0 via-slate-900/40 to-slate-900/0 overflow-hidden relative">
                        <m.div 
                            animate={{ y: [-24, 24] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1/2 bg-slate-900/80 absolute top-0"
                        />
                    </div>
                </m.div>

                {/* Bottom Blur Transition */}
                <GradualBlur
                    target="parent"
                    position="bottom"
                    height="8rem"
                    strength={4}
                    divCount={8}
                    curve="bezier"
                    exponential
                    opacity={1}
                />
            </section>
        </LazyMotion>
    );
}
