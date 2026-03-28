"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SkillStatsCard } from "@/components/dashboard/SkillStatsCard";
import { MockTestWidget } from "@/components/dashboard/MockTestWidget";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BookOpen, PenTool, Headphones, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
    const { stats, loading } = useDashboard();

    const mockActivities: any[] = [
        { id: "1", type: "Reading", title: "Academic Reading Task 1", time: "Today", score: "85%" },
        { id: "2", type: "Listening", title: "Social Context Practice", time: "Yesterday", score: "92%" },
        { id: "3", type: "Writing", title: "Task 2 Essay Structure", time: "2 days ago", score: "78%" },
    ];

    if (loading) {
        return (
            <DashboardLayout showGreeting={true}>
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Skeleton className="lg:col-span-2 h-[450px] rounded-3xl" />
                        <Skeleton className="h-[450px] rounded-3xl" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout showGreeting={true}>
            <div className="space-y-12">
                {/* Header Section */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back to IELTS Prep</h1>
                    <p className="text-sm font-medium text-slate-400">Continue your journey to IELTS success. Track your progress and practice with authentic materials.</p>
                </div>

                {/* Skill Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkillStatsCard 
                        title="Reading" 
                        icon={BookOpen} 
                        percentage={stats?.reading_progress || 0} 
                        color="bg-[#0f172a]"
                    />
                    <SkillStatsCard 
                        title="Writing" 
                        icon={PenTool} 
                        percentage={stats?.writing_progress || 0} 
                        color="bg-slate-400"
                    />
                    <SkillStatsCard 
                        title="Listening" 
                        icon={Headphones} 
                        percentage={stats?.listening_progress || 0} 
                        color="bg-slate-300"
                    />
                    <SkillStatsCard 
                        title="Speaking" 
                        icon={MessageSquare} 
                        percentage={stats?.vocab_progress || 0} 
                        color="bg-slate-100"
                    />
                </div>

                {/* Main Middle Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2">
                        <MockTestWidget 
                            completed={stats?.reading_tests_completed || 0}
                            total={30}
                            avgBand={stats?.writing_average_score || 0}
                            lastScore={7.5}
                        />
                    </div>
                    <div>
                        <ActivityFeed activities={mockActivities} />
                    </div>
                </div>

                {/* Quick Actions at bottom */}
                <QuickActions />
            </div>
        </DashboardLayout>
    );
}
