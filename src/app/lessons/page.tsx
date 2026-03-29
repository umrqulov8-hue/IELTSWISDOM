"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion } from "framer-motion";
import { BouncyText } from "@/components/ui/BouncyText";

export default function LessonsPage() {
    const { lang } = useLanguage();
    const LS = T.lessons;

    const lessonsData = [
        {
            type: "live",
            badgeLabel: tx(LS.live, lang),
            badgeColor: "bg-red-100 text-red-500 group-hover:bg-red-500",
            title: tx(LS.l1Title, lang),
            desc: tx(LS.l1Desc, lang),
            buttonLabel: tx(LS.joinClass, lang),
            link: "https://t.me/ielts_wisdo"
        },
        {
            type: "recorded",
            badgeLabel: tx(LS.recorded, lang),
            badgeColor: "bg-purple-100 text-purple-700 group-hover:bg-purple-500",
            title: tx(LS.l2Title, lang),
            desc: tx(LS.l2Desc, lang),
            buttonLabel: tx(LS.watchRecording, lang),
            link: "https://t.me/ielts_wisdo"
        }
    ];

    return (
        <DashboardLayout
            title={tx(LS.title, lang)}
            description={tx(LS.desc, lang)}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
                className="grid md:grid-cols-2 gap-6"
            >
                {lessonsData.map((lesson, idx) => (
                    <motion.div
                        key={`${lesson.type}-${lang}`}
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
                        }}
                        className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-xl group-hover:text-white transition-colors ${lesson.badgeColor}`}>
                                    <span className="font-bold text-xs uppercase tracking-wider">
                                        <BouncyText key={`badge-${idx}-${lang}`} text={lesson.badgeLabel} type="word" />
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">
                                    <BouncyText key={`title-${idx}-${lang}`} text={lesson.title} type="word" />
                                </h3>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 max-w-sm">
                                <BouncyText key={`desc-${idx}-${lang}`} text={lesson.desc} type="word" />
                            </p>
                        </div>
                        <a href={lesson.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            <BouncyText key={`btn-${idx}-${lang}`} text={lesson.buttonLabel} type="word" />
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </DashboardLayout>
    );
}
