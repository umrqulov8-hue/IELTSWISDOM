"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { useRouter } from "next/navigation";

const MOCK_THEMES = [
    { cardBg: "from-[#6beae5] via-[#a2f0c7] to-[#ffe68d]", titleColor: "text-[#0f172a]", textColor: "text-[#1e293b]" },
    { cardBg: "from-[#ff9f6b] via-[#ff6a5a] to-[#ff2a5f]", titleColor: "text-[#0f172a]", textColor: "text-white" },
    { cardBg: "from-[#6beae5] via-[#a2f0c7] to-[#ffe68d]", titleColor: "text-[#0f172a]", textColor: "text-[#1e293b]" },
    { cardBg: "from-[#ff9f6b] via-[#ff6a5a] to-[#ff2a5f]", titleColor: "text-[#0f172a]", textColor: "text-white" },
];

export default function MockExamsPage() {
    const { lang } = useLanguage();
    const router = useRouter();
    const ME = T.mockExams;
    const tests = ME.tests;

    return (
        <DashboardLayout title={tx(ME.title, lang)} description={tx(ME.desc, lang)}>
            <div className="max-w-[1150px] mx-auto px-4 md:px-8 space-y-10 relative z-10 pt-6 pb-20">
                <div className="flex items-center gap-3 mb-10 pl-5 border-l-[4px] border-[#FF8C00]">
                    <h2 className="text-[28px] font-black text-slate-800 tracking-tight">{tx(ME.sectionTitle, lang)}</h2>
                </div>

                {(tests as unknown as any[]).length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 bg-white/50 backdrop-blur-xl rounded-[40px] border border-white/60 text-center shadow-lg">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                            <Play className="w-10 h-10 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                            {lang === "en" ? "New Mock Tests Coming Soon" : "Yangi Mock Testlar Tez Kunda"}
                        </h3>
                        <p className="text-slate-500 font-medium max-w-md">
                            {lang === "en" 
                                ? "We are actively preparing new, high-quality mock exams. Check back later!" 
                                : "Biz yangi, yuqori sifatli mock imtihonlarni tayyorlamoqdamiz. Keyinroq tekshirib ko'ring!"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                        {(tests as unknown as any[]).map((test, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 60 }}
                                className={cn("relative rounded-[40px] p-8 lg:p-10 flex flex-col overflow-hidden group transition-all duration-500 bg-white/90 backdrop-blur-3xl border border-white/60")}
                                style={{ boxShadow: "inset 4px 4px 15px rgba(255,255,255,1), inset -4px -4px 15px rgba(0,0,0,0.03), 0 25px 50px -12px rgba(0,0,0,0.15)" }}
                            >
                                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-white to-transparent -rotate-6 pointer-events-none rounded-[100%] blur-[12px] opacity-90" />
                                <div className="relative z-10">
                                    <h3 className="text-[26px] font-black mb-6 tracking-tight drop-shadow-sm text-[#0f172a]">
                                        {tx(test.title, lang)}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <span className="text-[12px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] shadow-sm">
                                            {tx(ME.fullTest, lang)}
                                        </span>
                                        <span className="text-[12px] font-black px-4 py-2.5 rounded-full tracking-widest uppercase bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd] shadow-sm">
                                            {tx(ME.hours, lang)}
                                        </span>
                                    </div>
                                    <p className="text-[#334155] text-[15px] mb-8 font-bold leading-relaxed opacity-95">
                                        {tx(test.desc, lang)}
                                    </p>
                                    <h4 className="font-black text-[#0f172a] text-[13px] mb-4 tracking-widest uppercase">
                                        {tx(test.listTitle, lang)}
                                    </h4>
                                    <ul className="list-disc pl-[20px] text-[#334155] text-[15px] font-bold space-y-3 mb-12 opacity-95">
                                        {test.listItems.map((item: any, i: number) => (
                                            <li key={i}>{tx(item, lang)}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto relative z-10 w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => router.push(`/mock-exams/${index}/pre-check`)}
                                        className="w-full text-white font-black py-[16px] rounded-full flex items-center justify-center gap-3 transition-all text-[15px] bg-[#0f172a] shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_25px_rgba(15,23,42,0.3)]"
                                    >
                                        <Play className="w-[18px] h-[18px] fill-white" strokeWidth={3} />
                                        <span className="tracking-widest uppercase">{tx(ME.startTest, lang)}</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
