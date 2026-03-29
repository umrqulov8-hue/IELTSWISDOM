"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, Star, ArrowLeft, Shield, Clock, Users, Gift, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { BouncyText } from "@/components/ui/BouncyText";
import { ProBadge } from "@/components/ui/ProBadge";

export default function UpgradePage() {
    const { lang } = useLanguage();
    const { isPro, subscribe, cancelSubscription } = useSubscription();
    const [showCelebration, setShowCelebration] = useState(false);

    const handleSubscribe = () => {
        setShowCelebration(true);
        setTimeout(() => {
            subscribe();
        }, 1500);
    };

    const T = {
        back: lang === "en" ? "Back to Dashboard" : "Boshqaruvga qaytish",
        title: lang === "en" ? "Choose Your Plan" : "Tarifingizni tanlang",
        subtitle: lang === "en" ? "Unlock the full power of IELTS preparation." : "IELTS tayyorgarligining to'liq quvvatini oching.",
        free: lang === "en" ? "Free" : "Bepul",
        freeDesc: lang === "en" ? "Get started with essential features" : "Asosiy imkoniyatlar bilan boshlang",
        pro: "Pro",
        proDesc: lang === "en" ? "Ultimate IELTS Power" : "To'liq IELTS quvvati",
        currentPlan: lang === "en" ? "Current Plan" : "Joriy tarif",
        goPro: lang === "en" ? "Go Pro" : "Pro ga o'tish",
        activePro: lang === "en" ? "You're Pro!" : "Siz Pro siz!",
        cancelBtn: lang === "en" ? "Cancel Subscription" : "Obunani bekor qilish",
        afterTrial: lang === "en" ? "$1.99/month · Auto-renews" : "$1.99/oy · Avtomatik yangilanadi",
        secure: lang === "en" ? "Secure payments handled by Stripe. Cancel anytime." : "Xavfsiz to'lovlar Stripe orqali. Istalgan vaqtda bekor qiling.",
        month: lang === "en" ? "/month" : "/oy",
        forever: lang === "en" ? "forever" : "doim",
    };

    const freeFeatures = [
        { text: lang === "en" ? "70% Materials Access" : "70% materiallarga kirish", included: true },
        { text: lang === "en" ? "Ad-Free Experience" : "Reklmasiz tajriba", included: true },
        { text: lang === "en" ? "Basic Study Resources" : "Asosiy o'quv resurslari", included: true },
        { text: lang === "en" ? "Community Access" : "Jamoaga kirish", included: true },
        { text: lang === "en" ? "Weekly New Materials" : "Haftalik yangi materiallar", included: false },
        { text: lang === "en" ? "Curated Collections & Guides" : "Tanlangan to'plamlar va qo'llanmalar", included: false },
        { text: lang === "en" ? "Dedicated Human Support" : "Maxsus odam qo'llab-quvvatlash", included: false },
        { text: lang === "en" ? "Pro Badge" : "Pro nishoni", included: false },
    ];

    const proFeatures = [
        { text: lang === "en" ? "100% Unlimited Access" : "100% cheksiz kirish", included: true },
        { text: lang === "en" ? "Ad-Free Experience" : "Reklmasiz tajriba", included: true },
        { text: lang === "en" ? "All Exclusive Materials" : "Barcha eksklyuziv materiallar", included: true },
        { text: lang === "en" ? "Community Access" : "Jamoaga kirish", included: true },
        { text: lang === "en" ? "Weekly New Materials" : "Haftalik yangi materiallar", included: true },
        { text: lang === "en" ? "Curated Collections & Guides" : "Tanlangan to'plamlar va qo'llanmalar", included: true },
        { text: lang === "en" ? "Dedicated Human Support" : "Maxsus odam qo'llab-quvvatlash", included: true },
        { text: lang === "en" ? "Pro Badge" : "Pro nishoni", included: true },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex">
            <Sidebar />
            <main className="flex-1 lg:ml-[90px] p-6 lg:p-12 flex flex-col items-center">

                {/* Back Button */}
                <Link href="/dashboard" className="self-start mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group">
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    {T.back}
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-6xl font-serif font-black text-slate-900 mb-4 tracking-tight"
                    >
                        <BouncyText key={`up-title-${lang}`} text={T.title} type="word" />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg lg:text-xl font-medium max-w-2xl mx-auto"
                    >
                        {T.subtitle}
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

                    {/* --- FREE CARD --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="relative rounded-[40px] p-8 lg:p-10 border bg-white/40 backdrop-blur-3xl border-white/60 text-slate-900 shadow-2xl overflow-hidden group flex flex-col"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-20 -mr-32 -mt-32 bg-emerald-400 transition-transform duration-700 group-hover:scale-125" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 blur-[80px] rounded-full opacity-15 -ml-32 -mb-32 bg-green-400 transition-transform duration-700 group-hover:scale-125" />

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Badge */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                                    <Gift className="w-8 h-8 text-emerald-700" />
                                </div>
                                {!isPro && (
                                    <div className="px-4 py-1.5 bg-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 border border-emerald-200">
                                        {T.currentPlan}
                                    </div>
                                )}
                            </div>

                            {/* Plan Info */}
                            <h3 className="text-3xl font-serif font-black mb-2 tracking-tight">{T.free}</h3>
                            <p className="text-slate-500 font-medium mb-6">{T.freeDesc}</p>

                            <div className="flex items-baseline gap-1 mb-10">
                                <span className="text-5xl font-black tracking-tighter">$0</span>
                                <span className="text-slate-600 font-bold">{T.forever}</span>
                            </div>

                            {/* Features */}
                            <div className="flex-1 space-y-4 mb-10">
                                {freeFeatures.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {f.included ? (
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-600">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-slate-100 text-slate-600">
                                                <X className="w-3 h-3 stroke-[3]" />
                                            </div>
                                        )}
                                        <span className={`text-sm font-semibold tracking-tight ${f.included ? "text-slate-600" : "text-slate-600"}`}>
                                            {f.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            {!isPro && (
                                <div className="py-5 rounded-[22px] text-sm font-black uppercase tracking-[0.2em] text-emerald-600 border-2 border-emerald-200 bg-emerald-50 text-center cursor-default">
                                    {T.currentPlan}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* --- PRO CARD --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
                        className="relative rounded-[40px] p-8 lg:p-10 border bg-white/40 backdrop-blur-3xl border-amber-200/50 text-slate-900 shadow-2xl overflow-hidden group flex flex-col ring-2 ring-amber-400/30"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-30 -mr-32 -mt-32 bg-amber-500 transition-transform duration-700 group-hover:scale-125" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 blur-[80px] rounded-full opacity-20 -ml-32 -mb-32 bg-orange-500 transition-transform duration-700 group-hover:scale-125" />

                        {/* Shine overlay */}
                        <div className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -skew-x-12"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 3 }}
                            />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Badge */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm border border-amber-100">
                                    <Zap className="w-8 h-8 text-amber-700 fill-amber-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                    {isPro && <ProBadge size="sm" />}
                                </div>
                            </div>

                            {/* Plan Info */}
                            <h3 className="text-3xl font-serif font-black mb-2 tracking-tight">{T.pro}</h3>
                            <p className="text-slate-500 font-medium mb-6">{T.proDesc}</p>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-5xl font-black tracking-tighter">$1.99</span>
                                <span className="text-slate-600 font-bold">{T.month}</span>
                            </div>
                            <p className="text-xs text-amber-600 font-bold mb-8 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> {T.afterTrial}
                            </p>
                            {isPro && <div className="mb-8" />}

                            {/* Features */}
                            <div className="flex-1 space-y-4 mb-10">
                                {proFeatures.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-amber-500/15 text-amber-600">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                        <span className="text-sm font-semibold tracking-tight text-slate-600">
                                            {f.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            {!isPro ? (
                                <div className="relative">
                                    {/* Celebration particles */}
                                    <AnimatePresence>
                                        {showCelebration && (
                                            <>
                                                {[...Array(12)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                                        animate={{
                                                            opacity: [1, 1, 0],
                                                            scale: [0, 1.5, 0.5],
                                                            x: (Math.random() - 0.5) * 300,
                                                            y: (Math.random() - 0.5) * 200 - 80,
                                                            rotate: Math.random() * 720,
                                                        }}
                                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                                        className="absolute top-1/2 left-1/2 z-50 pointer-events-none"
                                                    >
                                                        <div className={`w-3 h-3 rounded-full ${['bg-amber-400', 'bg-orange-500', 'bg-yellow-300', 'bg-pink-400', 'bg-purple-400', 'bg-emerald-400'][i % 6]
                                                            }`} />
                                                    </motion.div>
                                                ))}
                                                {/* Big sparkle icon */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                                                    animate={{ opacity: [0, 1, 0], scale: [0, 2, 0], rotate: [0, 180, 360] }}
                                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                                                >
                                                    <Sparkles className="w-10 h-10 text-amber-400" />
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        onClick={handleSubscribe}
                                        whileTap={{ scale: 0.92 }}
                                        animate={showCelebration ? {
                                            scale: [1, 1.08, 0.95, 1.05, 1],
                                            boxShadow: [
                                                "0 10px 25px rgba(245,158,11,0.3)",
                                                "0 20px 50px rgba(245,158,11,0.6)",
                                                "0 10px 25px rgba(245,158,11,0.3)",
                                            ]
                                        } : {}}
                                        transition={showCelebration ? { duration: 0.8, ease: "easeOut" } : {}}
                                        className="w-full py-5 rounded-[22px] text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-[1.03] bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-amber-500/30 relative overflow-hidden"
                                    >
                                        {/* Button shine */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                                            animate={showCelebration ? { x: ["-100%", "200%"] } : {}}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                        />
                                        <span className="relative z-10">
                                            {showCelebration ? (lang === "en" ? "🎉 Welcome to Pro!" : "🎉 Pro ga xush kelibsiz!") : T.goPro}
                                        </span>
                                    </motion.button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="py-5 rounded-[22px] text-sm font-black uppercase tracking-[0.2em] text-amber-600 border-2 border-amber-200 bg-amber-50 text-center flex items-center justify-center gap-2">
                                        <Zap className="w-4 h-4 fill-current" /> {T.activePro}
                                    </div>
                                    <button
                                        onClick={cancelSubscription}
                                        className="w-full py-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors"
                                    >
                                        {T.cancelBtn}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Footer info */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-slate-600 text-sm font-medium tracking-tight flex items-center gap-2"
                >
                    <Shield className="w-4 h-4" /> {T.secure}
                </motion.p>

            </main>
        </div>
    );
}
