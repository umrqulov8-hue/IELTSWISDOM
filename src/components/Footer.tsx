"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { Button } from "./Button";

export function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-[1rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-4 text-white dark:text-slate-900 fill-current" viewBox="0 0 24 24">
                                    <path d="M3 16l-2-9 6 4.5L12 3l5 8.5 6-4.5-2 9H3zm-1-2h20v4H2v-4z" />
                                    <circle cx="1" cy="6" r="1.5" />
                                    <circle cx="7" cy="11.5" r="1.5" />
                                    <circle cx="12" cy="2" r="1.5" />
                                    <circle cx="17" cy="11.5" r="1.5" />
                                    <circle cx="23" cy="6" r="1.5" />
                                </svg>
                            </div>
                            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">IELTS Wisdom</span>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Features</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Changelog</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Roadmap</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Guides</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Templates</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Contact</a></li>
                            <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800 gap-6">
                    <p className="text-xs font-bold text-slate-500">
                        {tx(T.footer.copy, lang)}
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
