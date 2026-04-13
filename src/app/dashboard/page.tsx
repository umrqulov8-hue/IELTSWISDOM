import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/Skeleton";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Suspense } from "react";

export default function DashboardPage() {
    return (
        <DashboardLayout showGreeting={true}>
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardClient />
            </Suspense>
        </DashboardLayout>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-12">
            {/* Header Section Skeleton */}
            <div className="h-20 flex flex-col justify-center">
                <Skeleton className="h-8 w-64 mb-2 rounded-lg" />
                <Skeleton className="h-4 w-96 rounded-md" />
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
            </div>

            {/* Main Middle Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-[432px]">
                <div className="lg:col-span-2 h-[432px]">
                     <Skeleton className="h-full w-full rounded-[2.5rem]" />
                </div>
                <div className="h-[432px]">
                     <Skeleton className="h-full w-full rounded-[2.5rem]" />
                </div>
            </div>
            
            {/* Bottom Quick Actions Skeleton */}
            <div className="min-h-[128px]">
                <Skeleton className="h-full w-full rounded-3xl" />
            </div>
        </div>
    );
}
