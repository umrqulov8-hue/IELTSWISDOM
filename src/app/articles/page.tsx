import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BookOpen } from "lucide-react";

export default function ArticlesPage() {
    return (
        <DashboardLayout
            title="Read Articles"
            description="Improve your reading speed and vocabulary with curated articles."
        >
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-emerald-100 p-6 rounded-full mb-6">
                    <BookOpen className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Library</h2>
                <p className="text-slate-500 max-w-md">
                    We are curating the best articles for you. Check back soon for new content!
                </p>
            </div>
        </DashboardLayout>
    );
}
