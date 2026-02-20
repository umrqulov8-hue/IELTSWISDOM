import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";

export default async function ExamCenterPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Exam Center
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Take practice tests and track your scores.
                        </p>
                    </div>
                    <Button variant="outline" href="/dashboard">Back to Dashboard</Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                            L
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Listening Test</h3>
                        <p className="text-slate-500 mb-6">40 Questions • 30 Minutes</p>
                        <Button>Start Test</Button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                            R
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Reading Test</h3>
                        <p className="text-slate-500 mb-6">40 Questions • 60 Minutes</p>
                        <Button>Start Test</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
