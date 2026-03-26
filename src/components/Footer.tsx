"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";

export function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/welcome');

    if (isDashboard) return null;

    return (
        <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <m.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }} className="space-y-4">
                        <Link href="/" className="font-bold text-xl tracking-tighter text-primary">
                            IELTS<span className="text-secondary">Wisdom</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Master English naturally with our proven methodology. Join thousands of successful students today.
                        </p>
                    </m.div>

                    <m.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }}>
                        <h2 className="font-semibold text-primary mb-4">Platform</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-secondary">Courses</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Mentors</Link></li>
                        </ul>
                    </m.div>

                    <m.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }}>
                        <h2 className="font-semibold text-primary mb-4">Company</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-secondary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Contact</Link></li>
                        </ul>
                    </m.div>

                    <m.div style={{ willChange: "transform, opacity" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 0.8 } } }}>
                        <h2 className="font-semibold text-primary mb-4">Legal</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy-policy" className="hover:text-secondary">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Terms of Service</Link></li>
                        </ul>
                    </m.div>
                </m.div>
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-muted-foreground"
                >
                    © {new Date().getFullYear()} IELTS Wisdom. All rights reserved.
                </m.div>
            </div>
        </footer>
    );
}
