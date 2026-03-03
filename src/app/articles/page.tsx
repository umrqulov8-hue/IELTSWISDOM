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
            hideHeader={true}
        >
            <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto mb-20 px-4">
                {/* Floating Header & Categories */}
                <div className="flex flex-col gap-6 sticky top-0 z-20 py-6 w-full">
                    {/* Organic Oval Glass Background for Header */}
                    <div className="absolute inset-x-0 top-2 h-[calc(100%-12px)] bg-white/70 backdrop-blur-2xl border border-white/90 -z-10 rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)]" />

                    <div className="flex items-center justify-between relative px-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl font-[900] text-slate-800 tracking-tight">Maqolalar</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Ekspertlar maslahatlari va IELTS bo'yicha yo'riqnomalar.</p>
                        </motion.div>
                        <div className="flex items-center gap-3">
                            <button className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center hover:bg-white text-slate-500 transition-all hover:scale-105 active:scale-95 group">
                                <Search className="w-5 h-5 group-hover:text-slate-800 transition-colors" />
                            </button>
                            <button className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center hover:bg-white text-slate-500 transition-all hover:scale-105 active:scale-95 group relative">
                                <Bell className="w-5 h-5 group-hover:text-slate-800 transition-colors" />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                            </button>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 px-8">
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
                                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                                key={`article-${article.id}`}
                                className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] p-5 flex flex-col gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            >
                                {/* Decorative Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-blue-400/0 group-hover:from-orange-400/5 group-hover:to-blue-400/5 transition-colors duration-500 pointer-events-none" />
                                {/* Image Container */}
                                <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
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
