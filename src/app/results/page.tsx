"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion } from "framer-motion";
import { BouncyText } from "@/components/ui/BouncyText";

export default function ResultsPage() {
    const { lang } = useLanguage();
    const R = T.results;
    return (
        <DashboardLayout
            title={tx(R.title, lang)}
            description={tx(R.desc, lang)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm"
            >
                <div className="bg-blue-100 p-6 rounded-full mb-6 relative group cursor-pointer inline-block">
                    <motion.div animate={{ rotate: [0, 15, -15, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 4 }}>
                        <Sparkles className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />
                    </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    <BouncyText key={`r-title-${lang}`} text={tx(R.title, lang)} type="word" />
                </h2>
                <p className="text-slate-500 max-w-md">
                    <BouncyText key={`r-desc-${lang}`} text={tx(R.coming, lang)} type="word" />
                </p>
            </motion.div>
        </DashboardLayout>
    );
}
