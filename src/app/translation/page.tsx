import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Languages } from "lucide-react";

export default function TranslationPage() {
    return (
        <DashboardLayout
            title="Translation Practice"
            description="Translate sentences to improve your grammar and accuracy."
        >
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-indigo-100 p-6 rounded-full mb-6">
                    <Languages className="w-12 h-12 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Translation Tools</h2>
                <p className="text-slate-500 max-w-md">
                    We are building a translation practice tool. Stay tuned!
                </p>
            </div>
        </DashboardLayout>
    );
}
