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
    reading_progress?: number;
    listening_progress?: number;
    writing_progress?: number;
    vocab_progress?: number;
    reading_breakdown?: {
        free_passages: { count: number; correct: number; total: number };
        cambridge: { count: number; correct: number; total: number };
    };
    listening_breakdown?: {
        practice: { count: number; correct: number; total: number };
        cambridge: { count: number; correct: number; total: number };
    };
    writing_breakdown?: {
        task1: { count: number; average_score: number };
        task2: { count: number; average_score: number };
    };
    vocab_breakdown?: {
        count: number;
        correct: number;
        total: number;
    };
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
                // Run all queries in PARALLEL — use maybeSingle() to handle missing rows
                const [statsResult, testResults, notifResult, lessonResult] = await Promise.all([
                    supabase.from('student_stats').select('*').eq('user_id', user.id).maybeSingle(),
                    supabase.from('test_results').select('test_id, score, total_questions').eq('user_id', user.id),
                    supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
                    supabase.from('lessons').select('id, title, slug, module, icon_name').limit(20),
                ]);

                // Log errors but don't crash
                if (statsResult.error) console.warn("Dashboard: Could not fetch student_stats", statsResult.error.message);
                if (testResults.error) console.warn("Dashboard: Could not fetch test_results", testResults.error.message);
                if (notifResult.error) console.warn("Dashboard: Could not fetch notifications", notifResult.error.message);
                if (lessonResult.error) console.warn("Dashboard: Could not fetch lessons", lessonResult.error.message);

                // Calculate real stats from test_results
                let reading_tests_completed = 0, reading_score_sum = 0, reading_q_sum = 0, reading_unique = new Set();
                let listening_tests_completed = 0, listening_score_sum = 0, listening_q_sum = 0, listening_unique = new Set();
                let writing_tests_completed = 0, writing_score_sum = 0, writing_unique = new Set();
                let vocab_tests_completed = 0, vocab_score_sum = 0, vocab_q_sum = 0, vocab_unique = new Set();

                // Detailed breakdown
                const reading_breakdown = {
                    free_passages: { count: 0, correct: 0, total: 0, unique: new Set() },
                    cambridge: { count: 0, correct: 0, total: 0, unique: new Set() }
                };
                const listening_breakdown = {
                    practice: { count: 0, correct: 0, total: 0, unique: new Set() },
                    cambridge: { count: 0, correct: 0, total: 0, unique: new Set() }
                };
                const writing_breakdown = {
                    task1: { count: 0, sum_score: 0, unique: new Set() },
                    task2: { count: 0, sum_score: 0, unique: new Set() }
                };
                const vocab_breakdown = {
                    count: 0, correct: 0, total: 0, unique: new Set()
                };

                let totalScorePercentage = 0;
                let completedTestsCount = 0;

                if (testResults.data && testResults.data.length > 0) {
                    testResults.data.forEach((test) => {
                        const id = test.test_id.toLowerCase();
                        const percentage = (test.score / (test.total_questions || 1)) * 100;

                        // Categorize
                        if (id.startsWith('vocab-')) {
                            vocab_unique.add(test.test_id);
                            vocab_score_sum += test.score;
                            vocab_q_sum += test.total_questions;
                            vocab_breakdown.unique.add(test.test_id);
                            vocab_breakdown.correct += test.score;
                            vocab_breakdown.total += test.total_questions;
                        }
                        else if (id.startsWith('w-') || id.startsWith('feb')) {
                            writing_unique.add(test.test_id);
                            writing_score_sum += test.score; // Band score
                            if (id.startsWith('t1-') || id.includes('task1')) {
                                writing_breakdown.task1.unique.add(test.test_id);
                                writing_breakdown.task1.sum_score += test.score;
                            } else {
                                writing_breakdown.task2.unique.add(test.test_id);
                                writing_breakdown.task2.sum_score += test.score;
                            }
                        }
                        else if (id.startsWith('t1-') || id.startsWith('t2-') || id.startsWith('tp3-') || id.startsWith('cambridge-') || id.startsWith('auth-')) {
                            listening_unique.add(test.test_id);
                            listening_score_sum += test.score;
                            listening_q_sum += test.total_questions;
                            if (id.startsWith('cambridge-')) {
                                listening_breakdown.cambridge.unique.add(test.test_id);
                                listening_breakdown.cambridge.correct += test.score;
                                listening_breakdown.cambridge.total += test.total_questions;
                            } else {
                                listening_breakdown.practice.unique.add(test.test_id);
                                listening_breakdown.practice.correct += test.score;
                                listening_breakdown.practice.total += test.total_questions;
                            }
                        }
                        else {
                            // Default to Reading
                            reading_unique.add(test.test_id);
                            reading_score_sum += test.score;
                            reading_q_sum += test.total_questions;

                            if (id.startsWith('fp-')) {
                                reading_breakdown.free_passages.unique.add(test.test_id);
                                reading_breakdown.free_passages.correct += test.score;
                                reading_breakdown.free_passages.total += test.total_questions;
                            } else if (id.startsWith('c17-') || id.startsWith('c18-') || id.startsWith('c19-') || id.match(/^c\d+-/)) {
                                reading_breakdown.cambridge.unique.add(test.test_id);
                                reading_breakdown.cambridge.correct += test.score;
                                reading_breakdown.cambridge.total += test.total_questions;
                            }
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
                    estimated_level,
                    reading_progress: Math.min(Math.round((reading_unique.size / 8) * 100), 100),
                    listening_progress: Math.min(Math.round((listening_unique.size / 15) * 100), 100),
                    writing_progress: Math.min(Math.round((writing_unique.size / 10) * 100), 100),
                    vocab_progress: Math.min(Math.round((vocab_unique.size / 20) * 100), 100),
                    reading_breakdown: {
                        free_passages: {
                            count: reading_breakdown.free_passages.unique.size,
                            correct: reading_breakdown.free_passages.correct,
                            total: reading_breakdown.free_passages.total
                        },
                        cambridge: {
                            count: reading_breakdown.cambridge.unique.size,
                            correct: reading_breakdown.cambridge.correct,
                            total: reading_breakdown.cambridge.total
                        }
                    },
                    listening_breakdown: {
                        practice: {
                            count: listening_breakdown.practice.unique.size,
                            correct: listening_breakdown.practice.correct,
                            total: listening_breakdown.practice.total
                        },
                        cambridge: {
                            count: listening_breakdown.cambridge.unique.size,
                            correct: listening_breakdown.cambridge.correct,
                            total: listening_breakdown.cambridge.total
                        }
                    },
                    writing_breakdown: {
                        task1: {
                            count: writing_breakdown.task1.unique.size,
                            average_score: writing_breakdown.task1.unique.size > 0
                                ? Number((writing_breakdown.task1.sum_score / writing_breakdown.task1.unique.size).toFixed(1))
                                : 0
                        },
                        task2: {
                            count: writing_breakdown.task2.unique.size,
                            average_score: writing_breakdown.task2.unique.size > 0
                                ? Number((writing_breakdown.task2.sum_score / writing_breakdown.task2.unique.size).toFixed(1))
                                : 0
                        }
                    },
                    vocab_breakdown: {
                        count: vocab_breakdown.unique.size,
                        correct: vocab_breakdown.correct,
                        total: vocab_breakdown.total
                    }
                });

                if (notifResult.data) {
                    setNotifications(notifResult.data as Notification[]);
                }

                if (lessonResult.data) {
                    setLessons(lessonResult.data || []);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading, supabase]);

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
