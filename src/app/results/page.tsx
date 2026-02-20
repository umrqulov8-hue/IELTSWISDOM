import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles } from "lucide-react";

export default function ResultsPage() {
    return (
        <DashboardLayout
            title="Student Results"
            description="Track your performance history and test scores."
        >
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-blue-100 p-6 rounded-full mb-6">
                    <Sparkles className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Results History</h2>
                <p className="text-slate-500 max-w-md">
                    You haven't taken any tests yet. Start a practice session to see your progress here!
                </p>
            </div>
        </DashboardLayout>
    );
}
