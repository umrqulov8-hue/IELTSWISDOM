"use client";

import { useLeaderboard, LeaderboardUser } from "@/hooks/useLeaderboard";
import { useAuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Leaderboard() {
    const { leaderboard, loading } = useLeaderboard();
    const { user: currentUser } = useAuthContext();

    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Leaderboard...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Leaderboard</h3>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Top 10 Students</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                {leaderboard.map((user, index) => {
                    const isCurrentUser = user.id === currentUser?.id;
                    const rank = user.rank || index + 1;

                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-2xl transition-all",
                                isCurrentUser
                                    ? "bg-orange-50 border border-orange-100 ring-2 ring-orange-500/10"
                                    : "bg-white border border-transparent hover:border-slate-100 hover:bg-slate-50/50"
                            )}
                        >
                            {/* Rank Badge */}
                            <div className="flex-shrink-0 w-8 flex justify-center">
                                {rank === 1 ? (
                                    <Medal className="w-5 h-5 text-yellow-500" />
                                ) : rank === 2 ? (
                                    <Medal className="w-5 h-5 text-slate-400" />
                                ) : rank === 3 ? (
                                    <Medal className="w-5 h-5 text-amber-600" />
                                ) : (
                                    <span className="text-sm font-black text-slate-300">#{rank}</span>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-slate-400" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className={cn(
                                    "text-sm font-bold truncate",
                                    isCurrentUser ? "text-orange-950" : "text-slate-700"
                                )}>
                                    {user.display_name}
                                    {isCurrentUser && <span className="ml-2 text-[10px] bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded font-black uppercase">You</span>}
                                </h4>
                                <p className="text-[10px] text-slate-400 font-medium truncate italic">{user.estimated_level}</p>
                            </div>

                            {/* Score */}
                            <div className="text-right flex-shrink-0">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                    <span className="text-xs font-black text-slate-800">{user.progress_percentage}%</span>
                                </div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Progress</div>
                            </div>
                        </motion.div>
                    );
                })}

                {leaderboard.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                            <Star className="w-6 h-6 text-slate-200" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">No data yet. Be the first to start!</p>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50">
                <button className="w-full text-[11px] font-bold text-slate-400 hover:text-orange-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                    View Complete Ranking
                </button>
            </div>
        </div>
    );
}
