import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles } from "lucide-react";

export default function AICheckPage() {
    return (
        <DashboardLayout
            title="Premium AI Check"
            description="Get instant AI feedback on your writing and speaking."
        >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-12 rounded-3xl flex flex-col items-center justify-center text-center text-white shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 bg-white/20 p-6 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h2 className="relative z-10 text-3xl font-bold mb-4">AI Writing Assistant</h2>
                <p className="relative z-10 text-indigo-100 max-w-lg mb-8 text-lg">
                    Paste your essay or speaking transcript below to get instant IELTS Band score estimation and detailed feedback.
                </p>
                <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 h-48 flex items-center justify-center">
                    <p className="text-white/50">Paste text here...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
