"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion } from "framer-motion";
import { BouncyText } from "@/components/ui/BouncyText";

export default function ArticlesPage() {
    const { lang } = useLanguage();
    const AR = T.articles;
    return (
        <DashboardLayout
            title={tx(AR.title, lang)}
            description={tx(AR.desc, lang)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm"
            >
                <div className="bg-emerald-100 p-6 rounded-full mb-6 relative group cursor-pointer inline-block">
                    <motion.div animate={{ rotate: [0, 10, -10, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 5 }}>
                        <BookOpen className="w-12 h-12 text-emerald-500 group-hover:scale-110 transition-transform" />
                    </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    <BouncyText key={`ar-title-${lang}`} text={tx(AR.title, lang)} type="word" />
                </h2>
                <p className="text-slate-500 max-w-md">
                    <BouncyText key={`ar-desc-${lang}`} text={tx(AR.coming, lang)} type="word" />
                </p>
            </motion.div>
        </DashboardLayout>
    );
}
