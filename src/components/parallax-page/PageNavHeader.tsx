"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
    { label: "Methodology", href: "/methodology" },
    { label: "Curriculum", href: "/curriculum" },
    { label: "Results", href: "/success-stories" },
    { label: "Pricing", href: "/pricing" },
];

export default function PageNavHeader() {
    const pathname = usePathname();
    const { handleStartLearning } = useAuth();
    const isHome = pathname === "/";
    
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // On non-home pages, it's always "scrolled" (solid)
    const activeScrolled = isHome ? isScrolled : true;

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-20 flex justify-between items-center transition-all duration-500"
            style={{
                paddingTop: activeScrolled ? "1.2rem" : "2rem",
                paddingBottom: activeScrolled ? "1.2rem" : "2rem",
                backdropFilter: activeScrolled ? "blur(12px)" : "blur(0px)",
                WebkitBackdropFilter: activeScrolled ? "blur(12px)" : "blur(0px)",
                background: activeScrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0)",
                borderBottom: activeScrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0)",
                boxShadow: activeScrolled ? "0 4px 20px -5px rgba(0,0,0,0.05)" : "none",
            }}
        >
            {/* Logo → back to homepage */}
            <TransitionLink href="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-white font-serif italic text-lg leading-none">W</span>
                </div>
                <span className="text-lg font-black uppercase tracking-tighter text-black">Wisdom</span>
            </TransitionLink>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-10">
                {navItems.map(({ label, href }) => {
                    const isActive = pathname === href ||
                        (pathname === "/" && href === "/methodology" && false); // homepage sections
                    
                    const handleNavClick = (e: React.MouseEvent) => {
                        if (pathname === "/") {
                            // On homepage: scroll to section
                            e.preventDefault();
                            const sectionMap: Record<string, string> = {
                                "/methodology": "methodology",
                                "/curriculum": "curriculum",
                                "/success-stories": "results",
                                "/pricing": "special-pricing",
                            };
                            const sectionId = sectionMap[href];
                            if (sectionId) {
                                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                            }
                        }
                        // On other pages: TransitionLink handles normal routing
                    };

                    return isHome ? (
                        // On homepage: plain button that scrolls to section
                        <button
                            key={href}
                            onClick={() => {
                                const sectionMap: Record<string, string> = {
                                    "/methodology": "methodology",
                                    "/curriculum": "curriculum",
                                    "/success-stories": "results",
                                    "/pricing": "special-pricing",
                                };
                                const sectionId = sectionMap[href];
                                if (sectionId) {
                                    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="relative text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-300 cursor-pointer text-black/45 hover:text-black"
                        >
                            {label}
                        </button>
                    ) : (
                        // On other pages: navigate normally
                        <TransitionLink
                            key={href}
                            href={href}
                            className="relative text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-300 cursor-pointer"
                            style={{ color: isActive ? "#000" : "rgba(0,0,0,0.45)" }}
                        >
                            {label}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        key={href}
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        exit={{ scaleX: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ transformOrigin: "left" }}
                                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-black"
                                    />
                                )}
                            </AnimatePresence>
                        </TransitionLink>
                    );
                })}
            </nav>

            {/* CTA */}
            <button
                onClick={handleStartLearning}
                className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            >
                Begin Journey
            </button>
        </motion.header>
    );
}
