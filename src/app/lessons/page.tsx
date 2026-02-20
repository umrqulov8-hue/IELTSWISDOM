import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Users } from "lucide-react";

export default function LessonsPage() {
    return (
        <DashboardLayout
            title="My Lessons"
            description="Join live classes and watch recorded sessions."
        >
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-100 rounded-xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <span className="font-bold text-xs uppercase tracking-wider">Live</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">Speaking Masterclass</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">
                        Join Mr. Sanokulov for a live breakdown of recent IELTS Speaking Part 2 topics.
                    </p>
                    <button className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors">
                        Join Class
                    </button>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <span className="font-bold text-xs uppercase tracking-wider">Recorded</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">Task 2 Writing Structure</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">
                        Watch last week's session on structuring Agree/Disagree essays perfectly.
                    </p>
                    <button className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors">
                        Watch Recording
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
