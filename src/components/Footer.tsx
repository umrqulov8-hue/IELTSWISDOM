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
                            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center">
                                <div className="w-3 h-3 border-[2.5px] border-white dark:border-slate-900 rounded-md" />
                            </div>
                            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">IELTS Wisdom</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">
                            The complete platform for mastering IELTS. <br />
                            Helping students reach Band 8.0+ through AI-powered education.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                             <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 saas-border text-sm outline-none focus:ring-2 ring-slate-900/5 transition-all flex-1"
                             />
                             <Button className="h-11 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                                Subscribe
                             </Button>
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
                    <p className="text-xs font-bold text-slate-400">
                        {tx(T.footer.copy, lang)}
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
