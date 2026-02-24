"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { handleStartLearning, isLoading } = useAuth();
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/welcome') || pathname?.startsWith('/practice');
    const isReadingTest = pathname?.startsWith('/practice/reading/') && pathname.split('/').length > 3;



    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Courses", href: "/#courses" },
        { name: "Methodology", href: "/#methodology" },
        { name: "Success Stories", href: "/#testimonials" },
        { name: "Resources", href: "/#lead-magnet" },
    ];

    if (isReadingTest) return null;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled
                ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <motion.div
                                className="relative flex items-center justify-center py-2 px-1"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                {/* Using the new transparent owl logo */}
                                <img
                                    src="/owl-logo.png"
                                    alt="IELTS Wisdom Logo"
                                    className="h-12 w-auto object-contain drop-shadow-sm"
                                />
                            </motion.div>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <Button variant="secondary" size="sm" onClick={handleStartLearning} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Started"}
                        </Button>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-secondary focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-slate-50 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 px-3">
                                <Button className="w-full" variant="secondary" onClick={handleStartLearning} disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Get Started"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
