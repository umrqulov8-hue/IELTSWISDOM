import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
    return (
        <DashboardLayout
            title="Leaderboard"
            description="Compete with other students and climb the ranks!"
        >
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-orange-100 p-6 rounded-full mb-6">
                    <Trophy className="w-12 h-12 text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Leaderboard Coming Soon</h2>
                <p className="text-slate-500 max-w-md">
                    We're currently calculating the scores. Check back later to see where you stand among your peers!
                </p>
                <button className="mt-8 px-6 py-3 bg-[#FF8C00] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all">
                    View My Stats
                </button>
            </div>
        </DashboardLayout>
    );
}
