"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BookOpen, Search, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { BouncyText } from "@/components/ui/BouncyText";
import { useState } from "react";
import Image from "next/image";

// Mock Data for Articles
const categories = ["Barchasi", "IELTS", "Grammatika", "O'qish", "Yozish", "Speaking"];
const articles = [
    {
        id: 1,
        title: "IELTS Speakingda baland ball olish sirlari",
        desc: "IELTS Speakingda baland ball olish sirlari. Ekspertlar va'yich-di ylema ko'p...",
        tag: "#IELTS",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 2,
        title: "Writing 7.5+ strategiyalari: Eng ko'p uchraydigan 5 ta xato",
        desc: "Writing 7.5+ strategiyalari: Eng ko'p uchraydigan 5 ta xato. O'qish tezligii...",
        tag: "#Listening",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 3,
        title: "O'qish tezligini oshirish usullari",
        desc: "O'qish tezligini oshirish usullari, usullari Yozh tezligini tezlignar irraha...",
        tag: "#O'quvTizimi",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 4,
        title: "Yosangi usullari",
        desc: "O'qish tezligini ralanvimman bo'quv xolim oshirish usullari, selso at man...",
        tag: "#IELTS",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 5,
        title: "IELTS Speakingda baland ball olish sirlari",
        desc: "Ekspertlar maslahatlari, strategiyalari va IELTS bo'yicha yo'riqnomalar.",
        tag: "#IELTS",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 6,
        title: "Writing 7.5+ strategiyalari: Eng ko'p uchraydigan 5 ta xato",
        desc: "Writing 7.5+ strategiyalari: Eng ko'p uchraydigan 5 ta xato aito.",
        tag: "#Listening",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 7,
        title: "O'qish tezligini oshirish usullari",
        desc: "O'qish tezligini oshirish usullari, munllar maslahatlar strategisaipi va ...",
        tag: "#O'quvTizimi",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    },
    {
        id: 8,
        title: "O'qish tezligini oshirish usullari",
        desc: "O'qish tezligini oshirish usullari va murlar-maslahatlari bo'yicha umitio...",
        tag: "#O'quvTizimi",
        author: "Alisher N.",
        date: "15-oktabr, 2023",
        time: "6 daqiqa o'qish",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        avatar: "https://i.pravatar.cc/150?u=alisher"
    }
];

export default function ArticlesPage() {
    const { lang } = useLanguage();
    const AR = T.articles;
    const [activeTab, setActiveTab] = useState("Barchasi");

    return (
        <DashboardLayout
            title={tx(AR.title, lang)}
            description={tx(AR.desc, lang)}
        >
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto mb-20">
                {/* Header & Categories */}
                <div className="flex flex-col gap-6 sticky top-[80px] z-20 bg-[var(--color-background)]/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800">Maqolalar</h1>
                            <p className="text-slate-500 text-sm mt-1">Ekspertlar maslahatlari, strategiyalari va IELTS bo'yicha yo'riqnomalar.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center hover:bg-white text-slate-500 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-sm flex items-center justify-center hover:bg-white text-slate-500 transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 relative overflow-hidden ${activeTab === cat
                                        ? "text-white shadow-md"
                                        : "bg-white/50 backdrop-blur-md border border-white/60 text-slate-600 hover:bg-white hover:text-slate-800 shadow-sm"
                                    }`}
                            >
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-slate-800 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {articles.map((article, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                key={`article-${article.id}`}
                                className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                            >
                                {/* Image Container with Overlapping Icon */}
                                <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    {/* Liquid Glass Book Icon */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-3 rounded-b-2xl shadow-sm border border-white border-t-0">
                                        <BookOpen className="w-5 h-5 text-slate-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 px-1">
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                                        {article.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-semibold mb-4">
                                            {article.tag}
                                        </span>

                                        <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 relative shrink-0 border border-white shadow-sm">
                                                <Image src={article.avatar} alt={article.author} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-slate-700">Muallif: {article.author}</span>
                                                <span className="text-[10px] text-slate-500">{article.date} • {article.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
