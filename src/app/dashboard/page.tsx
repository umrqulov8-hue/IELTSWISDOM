"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SkillStatsCard } from "@/components/dashboard/SkillStatsCard";
import { BookOpen, PenTool, Headphones, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import dynamic from "next/dynamic";

// --- Dynamic Imports for Performance & Breaking CSS Chain ---
const MockTestWidget = dynamic(() => import("@/components/dashboard/MockTestWidget").then(m => m.MockTestWidget), { 
    ssr: false,
    loading: () => <Skeleton className="h-[432px] rounded-[2.5rem]" /> 
});

const ActivityFeed = dynamic(() => import("@/components/dashboard/ActivityFeed").then(m => m.ActivityFeed), { 
    ssr: false,
    loading: () => <Skeleton className="h-[432px] rounded-[2.5rem]" />
});

const QuickActions = dynamic(() => import("@/components/dashboard/QuickActions").then(m => m.QuickActions), { 
    ssr: false,
    loading: () => <Skeleton className="h-32 rounded-3xl" />
});

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
                <div className="space-y-12">
                    {/* Stat Cards Skeleton - Fixed gap-6 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
                    </div>

                    {/* Main Middle Row Skeleton - Structural Mirroring with gap-8 and items-stretch */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[432px]">
                        <div className="lg:col-span-2 min-h-[432px]">
                             <Skeleton className="h-full w-full rounded-[2.5rem]" />
                        </div>
                        <div className="min-h-[432px]">
                             <Skeleton className="h-full w-full rounded-[2.5rem]" />
                        </div>
                    </div>
                    
                    {/* Bottom Quick Actions Skeleton */}
                    <div className="min-h-[128px]">
                        <Skeleton className="h-full w-full rounded-3xl" />
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
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Welcome Back to IELTS Prep</h1>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-400 transition-colors">Continue your journey to IELTS success. Track your progress and practice with authentic materials.</p>
                </div>

                {/* Skill Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[128px]">
                    <SkillStatsCard 
                        title="Reading" 
                        icon={BookOpen} 
                        percentage={stats?.reading_progress || 0} 
                        color="bg-slate-900 dark:bg-slate-800"
                    />
                    <SkillStatsCard 
                        title="Writing" 
                        icon={PenTool} 
                        percentage={stats?.writing_progress || 0} 
                        color="bg-orange-500 dark:bg-orange-400"
                    />
                    <SkillStatsCard 
                        title="Listening" 
                        icon={Headphones} 
                        percentage={stats?.listening_progress || 0} 
                        color="bg-blue-600 dark:bg-blue-400"
                    />
                    <SkillStatsCard 
                        title="Speaking" 
                        icon={MessageSquare} 
                        percentage={stats?.vocab_progress || 0} 
                        color="bg-emerald-600 dark:bg-emerald-400"
                    />
                </div>

                {/* Main Middle Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[432px]">
                    <div className="lg:col-span-2 min-h-[432px]">
                        <MockTestWidget 
                            completed={stats?.reading_tests_completed || 0}
                            total={30}
                            avgBand={stats?.writing_average_score || 0}
                            lastScore={7.5}
                        />
                    </div>
                    <div className="min-h-[432px]">
                        <ActivityFeed activities={mockActivities} />
                    </div>
                </div>

                {/* Quick Actions at bottom */}
                <div className="min-h-[128px]">
                    <QuickActions />
                </div>
            </div>
        </DashboardLayout>
    );
}
