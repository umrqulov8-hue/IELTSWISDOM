"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthContext } from "@/context/AuthContext";

// Types
export interface StudentStats {
    progress_percentage: number;
    completed_lessons: number;
    total_lessons: number;
    current_streak: number;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    is_read: boolean;
    created_at: string;
    time_ago?: string; // Calculated field
}

export interface Lesson {
    id: string;
    title: string;
    slug: string;
    module: string;
    icon_name: string;
}

export function useDashboard() {
    const supabase = createClient();
    const { user, isLoading: authLoading } = useAuthContext();
    const [stats, setStats] = useState<StudentStats | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (authLoading) return; // Wait for auth to settle

            if (!user) {
                // Not logged in -> Stop loading, no data
                setDataLoading(false);
                return;
            }

            try {
                // 1. Fetch Stats
                const { data: statsData } = await supabase
                    .from('student_stats')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (statsData) {
                    setStats(statsData);
                } else {
                    // Fallback / Default
                    setStats({
                        progress_percentage: 0,
                        completed_lessons: 0,
                        total_lessons: 100,
                        current_streak: 0
                    });
                }

                // 2. Fetch Notifications
                const { data: notifData } = await supabase
                    .from('notifications')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (notifData) {
                    const formattedDetails = notifData.map(n => ({
                        ...n,
                        time_ago: "Recently"
                    }));
                    setNotifications(formattedDetails);
                }

                // 3. Fetch Lessons (For Search)
                const { data: lessonData } = await supabase
                    .from('lessons')
                    .select('*')
                    .limit(20);

                if (lessonData) {
                    setLessons(lessonData);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading]);

    const markNotificationRead = async (id: string) => {
        try {
            await supabase.from('notifications').update({ is_read: true }).eq('id', id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (e) {
            console.error(e);
        }
    };

    const clearNotifications = async () => {
        try {
            if (!user) return;
            await supabase.from('notifications').delete().eq('user_id', user.id);
            setNotifications([]);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        stats,
        notifications,
        lessons,
        loading: authLoading || dataLoading,
        markNotificationRead,
        clearNotifications
    };
}
