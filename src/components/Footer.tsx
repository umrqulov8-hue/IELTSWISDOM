"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/welcome');

    if (isDashboard) return null;

    return (
        <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="font-bold text-xl tracking-tighter text-primary">
                            Learn<span className="text-secondary">English</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Master English naturally with our proven methodology. Join thousands of successful students today.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-secondary">Courses</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Mentors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-secondary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-secondary">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-secondary">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Learn English Effectively. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
