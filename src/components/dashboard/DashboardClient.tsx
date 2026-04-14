"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { SkillStatsCard } from "@/components/dashboard/SkillStatsCard";
import { BookOpen, PenTool, Headphones, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

// --- Dynamic Imports for Performance & Breaking JS Chain ---
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

export function DashboardClient() {
    const { stats } = useDashboard();

    const mockActivities: any[] = [];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
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
                    color="bg-emerald-700 dark:bg-emerald-400"
                />
            </div>

            {/* Main Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-[432px]">
                <div className="lg:col-span-2 h-[432px]">
                    <MockTestWidget 
                        completed={stats?.mock_tests_completed || 0}
                        total={stats?.mock_tests_total || 30}
                        avgBand={stats?.mock_average_band || 0}
                        lastScore={stats?.mock_last_band || 0}
                    />
                </div>
                <div className="h-[432px]">
                    <ActivityFeed activities={mockActivities} />
                </div>
            </div>

            {/* Quick Actions at bottom */}
            <div className="min-h-[128px]">
                <QuickActions />
            </div>
        </div>
    );
}
