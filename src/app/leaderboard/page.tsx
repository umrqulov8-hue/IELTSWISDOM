"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion } from "framer-motion";
import { BouncyText } from "@/components/ui/BouncyText";

export default function LeaderboardPage() {
    const { lang } = useLanguage();
    const L = T.leaderboard;
    return (
        <DashboardLayout title={tx(L.title, lang)} description={tx(L.desc, lang)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm"
            >
                <div className="bg-orange-100 p-6 rounded-full mb-6 relative group cursor-pointer inline-block">
                    <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 3 }}>
                        <Trophy className="w-12 h-12 text-[#FF8C00] group-hover:scale-110 transition-transform" />
                    </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    <BouncyText key={`l-title-${lang}`} text={tx(L.comingSoon, lang)} type="word" />
                </h2>
                <p className="text-slate-500 max-w-md">
                    <BouncyText key={`l-desc-${lang}`} text={tx(L.info, lang)} type="word" />
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-6 py-3 bg-[#FF8C00] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
                >
                    <BouncyText key={`l-btn-${lang}`} text={tx(L.viewStats, lang)} type="word" />
                </motion.button>
            </motion.div>
        </DashboardLayout>
    );
}
