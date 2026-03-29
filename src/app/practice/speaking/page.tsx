"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Zap, ChevronDown, ChevronUp, Book, Star, Clock, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { BouncyText } from "@/components/ui/BouncyText";

// --- Types ---
interface SpeakingTest {
    id: string;
    month: string;
    testNumber: number;
    takenCount: number;
    isPro: boolean;
}

// --- Mock Data ---
const SPEAKING_TESTS: SpeakingTest[] = [
    { id: "jan-1", month: "January", testNumber: 1, takenCount: 107407, isPro: false },
    { id: "jan-2", month: "January", testNumber: 2, takenCount: 19238, isPro: false },
    { id: "feb-1", month: "February", testNumber: 1, takenCount: 12932, isPro: false },
    { id: "feb-2", month: "February", testNumber: 2, takenCount: 5201, isPro: false },
    { id: "mar-1", month: "March", testNumber: 1, takenCount: 6234, isPro: false },
    { id: "mar-2", month: "March", testNumber: 2, takenCount: 3967, isPro: false },
    { id: "apr-1", month: "April", testNumber: 1, takenCount: 4305, isPro: false },
    { id: "apr-2", month: "April", testNumber: 2, takenCount: 2799, isPro: false },
    { id: "may-1", month: "May", testNumber: 1, takenCount: 4005, isPro: false },
    { id: "may-2", month: "May", testNumber: 2, takenCount: 2728, isPro: false },
    { id: "jun-1", month: "June", testNumber: 1, takenCount: 8911, isPro: false },
    { id: "jun-2", month: "June", testNumber: 2, takenCount: 4054, isPro: false },
    { id: "jul-1", month: "July", testNumber: 1, takenCount: 18635, isPro: false },
    { id: "jul-2", month: "July", testNumber: 2, takenCount: 8453, isPro: false },
    { id: "aug-1", month: "August", testNumber: 1, takenCount: 760, isPro: false },
    { id: "aug-2", month: "August", testNumber: 2, takenCount: 299, isPro: false },
    { id: "sep-1", month: "September", testNumber: 1, takenCount: 2478, isPro: false },
    { id: "sep-2", month: "September", testNumber: 2, takenCount: 936, isPro: false },
];

export default function SpeakingPage() {
    const { lang } = useLanguage();
    const { isPro } = useSubscription();
    const S = {
        title: lang === 'en' ? "Speaking Practice" : "Gapirish Mashqi",
        desc: lang === 'en' ? "Master IELTS Speaking with our latest practice tests." : "Chet tilida erkin gapirishni eng so'nggi testlar bilan o'zlang.",
        coverTitle: lang === 'en' ? "IELTS\nPRACTICE TEST" : "IELTS\nAMALIY TEST",
        coverSub: lang === 'en' ? "Speaking Edition" : "Gapirish Bo'limi",
        mainTitle: lang === 'en' ? "IELTS Speaking Practice Tests" : "IELTS Gapirish Amaliy Testlari",
        mainDesc: lang === 'en' ? "Practice with the latest actual speaking test questions. Each test includes Part 1, Part 2, and Part 3 topics." : "Eng so'nggi haqiqiy gapirish test savollari bilan mashq qiling. Har bir test 1, 2 va 3-qismlarni o'z ichiga oladi.",
        testsText: lang === 'en' ? "18+ Tests" : "18+ Testlar",
        updatedText: lang === 'en' ? "Updated Weekly" : "Haftalik yangilanadi",
        testWord: lang === 'en' ? "Speaking Practice Test" : "Gapirish Amaliy Test",
        taken: lang === 'en' ? "tests taken" : "marta topshirilgan",
        viewLess: lang === 'en' ? "View less" : "Kamroq ko'rsatish",
        viewAll: lang === 'en' ? "View all tests" : "Barcha testlarni ko'rish",
        promoTitle: lang === 'en' ? "Unlock Full Potential" : "To'liq imkoniyatni oching",
        p1: lang === 'en' ? "Bite-Sized Lessons and Exercises" : "Qisqa darslar va mashqlar",
        p2: lang === 'en' ? "Learn Anytime, Anywhere" : "Istalgan vaqt, istalgan joyda",
        p3: lang === 'en' ? "Instant AI Feedback" : "Tezkor AI baholashi",
        p4: lang === 'en' ? "Save 90% Compared to In-Person Classes" : "Jonli darslarga qaraganda 90% tejaysiz",
        btn: lang === 'en' ? "Learn more" : "Batafsil ma'lumot",
    };

    const MONTH_UZ: Record<string, string> = {
        "January": "Yanvar", "February": "Fevral", "March": "Mart", "April": "Aprel", "May": "May", "June": "Iyun", "July": "Iyul", "August": "Avgust", "September": "Sentabr", "October": "Oktabr", "November": "Noyabr", "December": "Dekabr",
    };

    const [showAll, setShowAll] = useState(false);
    const visibleTests = showAll ? SPEAKING_TESTS : SPEAKING_TESTS.slice(0, 8); // Show first 4 rows (8 cards) initially

    return (
        <DashboardLayout
            title={S.title}
            description={S.desc}
        >
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

                {/* --- Left Column: Main Content --- */}
                <div className="flex-1 min-w-0">

                    {/* Header Card with Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                        {/* Book Cover Placeholder */}
                        <div className="flex-shrink-0 w-40 h-56 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 text-center transform -rotate-3 border-l-4 border-slate-700 relative group transition-transform hover:rotate-0 hover:scale-105 duration-500">
                            <div className="absolute top-0 left-2 w-1 h-full bg-white/10" />
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight mb-2 whitespace-pre-line">{S.coverTitle}</h3>
                            <div className="mt-4 text-[10px] text-slate-600 uppercase tracking-widest">{S.coverSub}</div>

                            {/* Lighting Glint */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>

                        {/* Title Section */}
                        <div className="flex-1 text-center md:text-left pt-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                                <BouncyText key={`sp-title-${lang}`} text={S.mainTitle} type="word" />
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                <BouncyText key={`sp-desc-${lang}`} text={S.mainDesc} type="word" />
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-current" /> {S.testsText}
                                </div>
                                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {S.updatedText}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Test Grid */}
                    <motion.div
                        layout
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                    >
                        <AnimatePresence>
                            {visibleTests.map((test) => (
                                <Link
                                    href={isPro || test.id === "jan-1" ? `/practice/speaking/${test.id}` : "/upgrade"}
                                    key={test.id}
                                    className="block w-full h-full"
                                >
                                    <motion.div
                                        layout
                                        variants={{
                                            hidden: { opacity: 0, y: 20, scale: 0.9 },
                                            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.45 } }
                                        }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={cn(
                                            "bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 rounded-xl p-5 text-left transition-all group shadow-sm hover:shadow-md flex flex-col justify-between h-28 cursor-pointer w-full relative overflow-hidden",
                                            !(isPro || test.id === "jan-1") && "opacity-80"
                                        )}
                                    >
                                        <div>
                                            <h4 className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-1 flex items-center gap-2">
                                                {lang === 'uz' ? MONTH_UZ[test.month] : test.month} {S.testWord} {test.testNumber}
                                                {!(isPro || test.id === "jan-1") && <Lock className="w-3.5 h-3.5 text-slate-600" />}
                                            </h4>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                                            <span className="text-sm text-slate-500 font-medium">
                                                {test.takenCount.toLocaleString()} {S.taken}
                                            </span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Show All Toggle */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium transition-colors px-6 py-3 rounded-full hover:bg-slate-100"
                        >
                            {showAll ? (
                                <>{S.viewLess} <ChevronUp className="w-4 h-4" /></>
                            ) : (
                                <>{S.viewAll} <ChevronDown className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>

                </div>

                {/* --- Right Column: Sidebar Promo --- */}
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
                    {/* Upgrade Promo Card */}
                    {!isPro && (
                        <motion.div
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.3 }}
                            className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl sticky top-24"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/30 shadow-inner"
                                >
                                    <Globe className="w-8 h-8 text-white" />
                                </motion.div>

                                <h3 className="text-xl font-bold mb-6">
                                    <BouncyText key={`promo-title-${lang}`} text={S.promoTitle} type="word" />
                                </h3>

                                <ul className="text-left space-y-3 mb-8 text-orange-50 text-sm font-medium">
                                    <li className="flex items-start gap-2">
                                        <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                        <span>{S.p1}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                        <span>{S.p2}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                        <span>{S.p3}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-white" />
                                        <span>{S.p4}</span>
                                    </li>
                                </ul>

                                <Link href="/upgrade">
                                    <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg flex items-center justify-center gap-2 group">
                                        {S.btn}
                                        <span className="bg-orange-600 text-white rounded text-[10px] px-1 py-0.5 group-hover:scale-110 transition-transform">+</span>
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </aside>
            </div >
        </DashboardLayout >
    );
}
