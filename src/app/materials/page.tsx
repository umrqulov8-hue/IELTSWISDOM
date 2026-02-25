"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Headphones, Archive, Star, Search, Filter, Lock, FileType, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- Types ---
type MaterialType = "all" | "ebook" | "worksheet" | "audio";
type MaterialLevel = "all" | "beginner" | "intermediate" | "advanced";

interface MaterialItem {
    id: string;
    type: "ebook" | "worksheet" | "audio";
    title: string;
    description: string;
    size: string;
    format: string; // PDF, MP3, ZIP
    isPremium: boolean;
    downloads: number;
    level: "beginner" | "intermediate" | "advanced";
}

// --- Mock Data ---
const MATERIALS: MaterialItem[] = [
    { id: "1", type: "ebook", title: "Complete IELTS Grammar Guide", description: "Master all essential grammar rules for Band 7.0+.", size: "4.2 MB", format: "PDF", isPremium: true, downloads: 1240, level: "advanced" },
    { id: "2", type: "worksheet", title: "100 Phrasal Verbs List", description: "Essential phrasal verbs with examples and exercises.", size: "1.5 MB", format: "PDF", isPremium: false, downloads: 850, level: "intermediate" },
    { id: "3", type: "audio", title: "Listening Practice: Accents", description: "Compilation of different English accents for practice.", size: "15 MB", format: "MP3", isPremium: true, downloads: 620, level: "advanced" },
    { id: "4", type: "ebook", title: "IELTS Writing Task 2 Templates", description: "Proven structures for every essay type.", size: "2.8 MB", format: "PDF", isPremium: true, downloads: 2100, level: "intermediate" },
    { id: "5", type: "worksheet", title: "Speaking Part 1 Questions", description: "Top 50 most common speaking questions.", size: "0.8 MB", format: "PDF", isPremium: false, downloads: 1500, level: "beginner" },
    { id: "6", type: "audio", title: "Pronunciation Workshop", description: "Drills for improving clarity and intonation.", size: "12 MB", format: "MP3", isPremium: false, downloads: 900, level: "intermediate" },
    { id: "7", type: "ebook", title: "Vocabulary for Academic Reading", description: "High-frequency academic word list.", size: "3.5 MB", format: "PDF", isPremium: true, downloads: 1800, level: "advanced" },
    { id: "8", type: "worksheet", title: "Note-Taking Strategies", description: "Improve your listening test scores.", size: "1.1 MB", format: "PDF", isPremium: false, downloads: 700, level: "intermediate" },
];

const CATEGORIES = [
    { id: "all", label: "All Resources", icon: Archive },
    { id: "ebook", label: "E-Books", icon: FileText },
    { id: "worksheet", label: "Worksheets", icon: FileType },
    { id: "audio", label: "Audio Files", icon: Headphones },
];

export default function MaterialsPage() {
    const { lang } = useLanguage();
    const CATEGORIES = [
        { id: "all", label: lang === "en" ? "All Resources" : "Barcha resurslar", icon: Archive },
        { id: "ebook", label: lang === "en" ? "E-Books" : "E-Kitoblar", icon: FileText },
        { id: "worksheet", label: lang === "en" ? "Worksheets" : "Ishchi varaqlar", icon: FileType },
        { id: "audio", label: lang === "en" ? "Audio Files" : "Audio fayllar", icon: Headphones },
    ];
    const [selectedType, setSelectedType] = useState<MaterialType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMaterials = MATERIALS.filter(item => {
        const matchesType = selectedType === "all" || item.type === selectedType;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <DashboardLayout
            title={lang === "en" ? "Premium Materials" : "Premium Materiallar"}
            description={lang === "en" ? "Exclusive downloadable resources to accelerate your learning." : "O'rganishingizni tezlashtiradigan eksklyuziv yuklab olinadigan resurslar."}
        >
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Background Blobs for Cyan/Teal Aesthetic */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-300/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[100px]" />
                    <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[80px]" />
                </div>

                {/* --- Sidebar Filters --- */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={lang === "en" ? "Search resources..." : "Resurslarni qidiring..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 backdrop-blur-md border border-cyan-100/50 text-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all shadow-sm placeholder:text-cyan-400/50"
                        />
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 p-4 space-y-2 lg:sticky lg:top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-cyan-100/50">
                            <Filter className="w-4 h-4 text-cyan-600" />
                            <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">{lang === "en" ? "File Type" : "Fayl turi"}</span>
                        </div>

                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedType(cat.id as MaterialType)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                                    selectedType === cat.id
                                        ? "text-cyan-700 shadow-md shadow-cyan-500/10"
                                        : "hover:bg-cyan-50/50 text-slate-600 hover:text-cyan-800"
                                )}
                            >
                                <cat.icon className={cn(
                                    "w-4 h-4 relative z-10 transition-colors",
                                    selectedType === cat.id ? "text-cyan-600" : "text-slate-400 group-hover:text-cyan-500"
                                )} />
                                <span className={cn("relative z-10 transition-colors", selectedType === cat.id && "font-semibold")}>
                                    {cat.label}
                                </span>

                                {selectedType === cat.id && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-100 via-teal-50 to-cyan-50 z-0"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 min-w-0">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-8 md:p-10 mb-10 shadow-[0_20px_50px_rgba(20,184,166,0.3)] group"
                    >
                        {/* Animated Mesh Gradient Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <HardDrive className="w-80 h-80 text-white transform translate-x-20 -translate-y-20 rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                        </div>

                        <div className="relative z-10 text-white max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <Star className="w-3 h-3 text-cyan-200 fill-cyan-200" /> {lang === "en" ? "Premium Vault" : "Premium Xazina"}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{lang === "en" ? "Downloads" : "Yuklab olish"}</h2>
                            <p className="text-cyan-50 text-lg leading-relaxed font-light">
                                {lang === "en" ? "Access our exclusive library of high-quality study materials, cheat sheets, and audio files." : "Yuqori sifatli o'quv materiallari, qo'llanmalar va audio fayllarning eksklyuziv kutubxonasidan foydalaning."}
                            </p>
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredMaterials.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-white/60 hover:border-cyan-200/50 p-1 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-1 relative"
                                >
                                    <div className="bg-white/50 rounded-[1.2rem] p-5 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-cyan-50/20 transition-colors duration-500">

                                        {/* Icon & Badge */}
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md",
                                                item.type === "ebook" ? "bg-gradient-to-br from-blue-500 to-indigo-500" :
                                                    item.type === "worksheet" ? "bg-gradient-to-br from-emerald-500 to-teal-500" :
                                                        "bg-gradient-to-br from-rose-500 to-orange-500"
                                            )}>
                                                {item.type === "ebook" && <FileText className="w-6 h-6" />}
                                                {item.type === "worksheet" && <FileType className="w-6 h-6" />}
                                                {item.type === "audio" && <Headphones className="w-6 h-6" />}
                                            </div>

                                            {item.isPremium ? (
                                                <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-amber-200">
                                                    <Lock className="w-3 h-3" /> {lang === 'uz' ? 'Premium' : 'Premium'}
                                                </div>
                                            ) : (
                                                <div className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                                                    {lang === 'uz' ? 'Bepul' : 'Free'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="mb-6 relative z-10">
                                            <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-cyan-700 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Metadata Footer */}
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "en" ? "Size" : "Hajm"}</span>
                                                <span className="text-xs font-semibold text-slate-600">{item.size}</span>
                                            </div>
                                            <div className="flex flex-col border-l border-slate-100 pl-4">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "en" ? "Format" : "Format"}</span>
                                                <span className="text-xs font-semibold text-slate-600">{item.format}</span>
                                            </div>

                                            <button className={cn(
                                                "ml-auto w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md group/btn",
                                                item.isPremium
                                                    ? "bg-slate-800 text-amber-400 hover:bg-black"
                                                    : "bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-cyan-500/30"
                                            )}>
                                                {item.isPremium ? <Lock className="w-4 h-4" /> : <Download className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredMaterials.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-slate-400">{lang === "en" ? "No resources found matching your search." : "Qidiruv bo'yicha resurslar topilmadi."}</p>
                        </div>
                    )}
                </main>
            </div>
        </DashboardLayout>
    );
}
