"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";

export default function LeaderboardPage() {
    const { lang } = useLanguage();
    const L = T.leaderboard;
    return (
        <DashboardLayout title={tx(L.title, lang)} description={tx(L.desc, lang)}>
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-orange-100 p-6 rounded-full mb-6">
                    <Trophy className="w-12 h-12 text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{tx(L.comingSoon, lang)}</h2>
                <p className="text-slate-500 max-w-md">{tx(L.info, lang)}</p>
                <button className="mt-8 px-6 py-3 bg-[#FF8C00] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all">
                    {tx(L.viewStats, lang)}
                </button>
            </div>
        </DashboardLayout>
    );
}
