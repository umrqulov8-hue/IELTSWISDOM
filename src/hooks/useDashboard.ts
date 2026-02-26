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
                let reading_tests_completed = 0;
                let reading_average_score = 0;
                let totalScorePercentage = 0;
                let completedTestsCount = 0;

                if (testResults.data && testResults.data.length > 0) {
                    const uniqueReadingTests = new Set();
                    let readingScoreSum = 0;
                    let readingQuestionsSum = 0;

                    testResults.data.forEach((test) => {
                        // Assuming reading test IDs usually start with 'fp-' or similar. 
                        // If all current tests are reading, we can just classify all.
                        // For now we assume all tests in db are reading until we add others.
                        uniqueReadingTests.add(test.test_id);
                        readingScoreSum += test.score;
                        readingQuestionsSum += test.total_questions;

                        // For overall
                        completedTestsCount++;
                        totalScorePercentage += (test.score / test.total_questions) * 100;
                    });

                    reading_tests_completed = uniqueReadingTests.size;
                    reading_average_score = readingQuestionsSum > 0 ? (readingScoreSum / readingQuestionsSum) * 100 : 0;
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
                    progress_percentage: completedTestsCount > 0 ? Math.round(avgScore) : 0, // Use average score as overall progress % for now
                    reading_tests_completed,
                    reading_average_score: Math.round(reading_average_score),
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
