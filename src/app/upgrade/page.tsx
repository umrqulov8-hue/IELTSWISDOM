"use client";

import { motion } from "framer-motion";
import { Check, Crown, Zap, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function UpgradePage() {
    const { lang } = useLanguage();

    const plans = [
        {
            name: "Premium",
            price: "$9.99",
            period: "/month",
            description: "Unlock Enhanced Learning",
            icon: <Star className="w-8 h-8 text-blue-500" />,
            features: [
                "Ad-Free Experience",
                "Unlimited Translations",
                "Exclusive Study Materials",
                "Priority Support",
                "Band score prediction",
                "Custom Vocabulary Lists"
            ],
            cta: lang === 'en' ? "Join Premium" : "Premiumga a'zo bo'ling",
            theme: "light",
            gradient: "from-blue-500/10 via-white/40 to-indigo-500/10",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            highlight: "blue"
        },
        {
            name: "Pro",
            price: "$24.99",
            period: "/month",
            description: "Ultimate IELTS Power",
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            features: [
                "ALL Premium Features",
                "AI-Powered Speaking Tests",
                "Unlimited Essay Checks",
                "1-on-1 Feedback sessions",
                "Personalized Study Plan",
                "Early Access to Features"
            ],
            cta: lang === 'en' ? "Go Pro" : "Proga o'ting",
            theme: "dark",
            gradient: "from-slate-900/95 via-slate-800/98 to-slate-900/95",
            buttonColor: "bg-gradient-to-r from-amber-400 to-orange-500",
            highlight: "gold"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex">
            <Sidebar />
            <main className="flex-1 lg:ml-[90px] p-6 lg:p-12 flex flex-col items-center justify-center">

                {/* Back Button */}
                <Link
                    href="/dashboard"
                    className="self-start mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    {lang === 'en' ? "Back to Dashboard" : "Boshqaruvga qaytish"}
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-6xl font-serif font-black text-slate-900 mb-4 tracking-tight"
                    >
                        {lang === 'en' ? "Elevate Your Journey" : "Sayohatni yangi darajaga olib chiqing"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg lg:text-xl font-medium max-w-2xl mx-auto"
                    >
                        {lang === 'en'
                            ? "Choose the plan that fits your goals and unlock exclusive IELTS tools."
                            : "Maqsadingizga mos keladigan tarifni tanlang va eksklyuziv IELTS vositalaridan foydalaning."}
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                            className={`relative rounded-[40px] p-8 lg:p-10 border shadow-2xl overflow-hidden group flex flex-col ${plan.theme === 'dark'
                                    ? 'bg-slate-900 border-white/10 text-white'
                                    : 'bg-white/40 backdrop-blur-3xl border-white/60 text-slate-900'
                                }`}
                        >
                            {/* Background Liquid Effects */}
                            <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-30 -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125 ${plan.highlight === 'gold' ? 'bg-amber-500' : 'bg-blue-400'
                                }`} />
                            <div className={`absolute bottom-0 left-0 w-64 h-64 blur-[80px] rounded-full opacity-20 -ml-32 -mb-32 transition-transform duration-700 group-hover:scale-125 ${plan.highlight === 'gold' ? 'bg-orange-500' : 'bg-indigo-400'
                                }`} />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Badge */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl shadow-inner ${plan.theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow-sm border border-slate-100'
                                        }`}>
                                        {plan.icon}
                                    </div>
                                    {plan.highlight === 'gold' && (
                                        <div className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                                            Recommended
                                        </div>
                                    )}
                                </div>

                                {/* Plan Info */}
                                <h3 className="text-3xl font-serif font-black mb-2 tracking-tight">{plan.name}</h3>
                                <p className={`${plan.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mb-6`}>
                                    {plan.description}
                                </p>

                                <div className="flex items-baseline gap-1 mb-10">
                                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                    <span className={`${plan.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} font-bold`}>{plan.period}</span>
                                </div>

                                {/* Features */}
                                <div className="flex-1 space-y-4 mb-10">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.theme === 'dark' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/10 text-blue-600'
                                                }`}>
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span className={`text-sm font-semibold tracking-tight ${plan.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <button className={`w-full py-5 rounded-[22px] text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-[1.03] active:scale-[0.98] ${plan.buttonColor}`}>
                                    {plan.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer info */}
                <p className="mt-16 text-slate-400 text-sm font-medium tracking-tight">
                    {lang === 'en'
                        ? "Secure payments handled by Stripe. Cancel anytime."
                        : "Xavfsiz to'lovlar Stripe orqali amalga oshiriladi. Istalgan vaqtda bekor qiling."}
                </p>

            </main>
        </div>
    );
}
