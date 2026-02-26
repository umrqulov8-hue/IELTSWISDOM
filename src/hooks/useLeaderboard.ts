"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export interface LeaderboardUser {
    id: string;
    display_name: string;
    avatar_url: string;
    progress_percentage: number;
    estimated_level: string;
    rank?: number;
}

export function useLeaderboard() {
    const supabase = createClient();
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Fetch top 10 users by joining profiles and student_stats
                // Note: We use a simple select here. In a real app we might need a more complex join or view.
                const { data, error } = await supabase
                    .from('student_stats')
                    .select(`
                        user_id,
                        progress_percentage,
                        estimated_level,
                        profiles:user_id (
                            full_name,
                            avatar_url,
                            email
                        )
                    `)
                    .order('progress_percentage', { ascending: false })
                    .limit(10);

                if (error) throw error;

                if (data) {
                    const formatted: LeaderboardUser[] = data.map((item: any, index) => ({
                        id: item.user_id,
                        display_name: item.profiles?.full_name || item.profiles?.email?.split('@')[0] || "Student",
                        avatar_url: item.profiles?.avatar_url || "",
                        progress_percentage: item.progress_percentage || 0,
                        estimated_level: item.estimated_level || "Beginner",
                        rank: index + 1
                    }));
                    setLeaderboard(formatted);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return { leaderboard, loading };
}
