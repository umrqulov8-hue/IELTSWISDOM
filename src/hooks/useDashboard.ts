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
    reading_tests_completed: number;
    reading_average_score: number;
    listening_tests_completed: number;
    listening_average_score: number;
    writing_tests_completed: number;
    writing_average_score: number; // This will actually be the average Band score 0-9
    vocab_tests_completed: number;
    vocab_average_score: number;
    estimated_level: string;
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
                // Run all queries in PARALLEL
                const [statsResult, testResults, notifResult, lessonResult] = await Promise.all([
                    supabase.from('student_stats').select('*').eq('user_id', user.id).single(),
                    supabase.from('test_results').select('test_id, score, total_questions').eq('user_id', user.id),
                    supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
                    supabase.from('lessons').select('id, title, slug, module, icon_name').limit(20),
                ]);

                // Calculate real stats from test_results
                let reading_tests_completed = 0, reading_score_sum = 0, reading_q_sum = 0, reading_unique = new Set();
                let listening_tests_completed = 0, listening_score_sum = 0, listening_q_sum = 0, listening_unique = new Set();
                let writing_tests_completed = 0, writing_score_sum = 0, writing_unique = new Set();
                let vocab_tests_completed = 0, vocab_score_sum = 0, vocab_q_sum = 0, vocab_unique = new Set();

                let totalScorePercentage = 0;
                let completedTestsCount = 0;

                if (testResults.data && testResults.data.length > 0) {
                    testResults.data.forEach((test) => {
                        const id = test.test_id.toLowerCase();
                        const percentage = (test.score / test.total_questions) * 100;

                        // Categorize
                        if (id.startsWith('vocab-')) {
                            vocab_unique.add(test.test_id);
                            vocab_score_sum += test.score;
                            vocab_q_sum += test.total_questions;
                        }
                        else if (id.startsWith('w-') || id.startsWith('feb')) {
                            writing_unique.add(test.test_id);
                            writing_score_sum += test.score; // Band score
                        }
                        else if (id.startsWith('t1-') || id.startsWith('t2-') || id.startsWith('tp3-') || id.startsWith('cambridge-') || id.startsWith('auth-')) {
                            listening_unique.add(test.test_id);
                            listening_score_sum += test.score;
                            listening_q_sum += test.total_questions;
                        }
                        else {
                            // Default to Reading (covers fp-, c17-, c18-, etc.)
                            reading_unique.add(test.test_id);
                            reading_score_sum += test.score;
                            reading_q_sum += test.total_questions;
                        }

                        // For overall
                        completedTestsCount++;
                        totalScorePercentage += percentage;
                    });

                    reading_tests_completed = reading_unique.size;
                    listening_tests_completed = listening_unique.size;
                    writing_tests_completed = writing_unique.size;
                    vocab_tests_completed = vocab_unique.size;
                }

                const avgScore = completedTestsCount > 0 ? totalScorePercentage / completedTestsCount : 0;
                let estimated_level = "Beginner (A1/A2)";
                if (avgScore >= 40 && avgScore < 70) estimated_level = "Intermediate (B1/B2)";
                if (avgScore >= 70) estimated_level = "Advanced (C1/C2)";

                setStats({
                    ...(statsResult.data || {
                        completed_lessons: 0,
                        total_lessons: 100,
                        current_streak: 0,
                    }),
                    progress_percentage: completedTestsCount > 0 ? Math.round(avgScore) : 0,
                    reading_tests_completed,
                    reading_average_score: reading_q_sum > 0 ? Math.round((reading_score_sum / reading_q_sum) * 100) : 0,
                    listening_tests_completed,
                    listening_average_score: listening_q_sum > 0 ? Math.round((listening_score_sum / listening_q_sum) * 100) : 0,
                    writing_tests_completed,
                    writing_average_score: writing_tests_completed > 0 ? Number((writing_score_sum / writing_tests_completed).toFixed(1)) : 0,
                    vocab_tests_completed,
                    vocab_average_score: vocab_q_sum > 0 ? Math.round((vocab_score_sum / vocab_q_sum) * 100) : 0,
                    estimated_level
                });

                if (notifResult.data) {
                    setNotifications(notifResult.data.map(n => ({ ...n, time_ago: "Recently" })));
                }

                if (lessonResult.data) {
                    setLessons(lessonResult.data);
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
