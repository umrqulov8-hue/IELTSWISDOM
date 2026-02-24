"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Headphones,
    PlayCircle,
    Clock,
    BarChart3,
    ChevronRight,
    Lock,
    Search,
    Filter,
    Sparkles,
    Music,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─────────────────────────────────────────────
// AUDIO PLAYER TYPES & DATA
// ─────────────────────────────────────────────
interface Part {
    id: number;
    label: string;
    src: string;
    description: string;
    duration?: string;
}

const PARTS: Part[] = [
    {
        id: 1,
        label: "Part 1",
        src: "/audio/listening1.mp3",
        description: "Conversation between two speakers in an everyday social context.",
        duration: "~8 min",
    },
    {
        id: 2,
        label: "Part 2",
        src: "/audio/listening2.mp3",
        description: "A monologue set in an everyday social context.",
        duration: "~8 min",
    },
    {
        id: 3,
        label: "Part 3",
        src: "/audio/listening3.mp3",
        description: "A conversation between up to four speakers in an educational context.",
        duration: "~8 min",
    },
    {
        id: 4,
        label: "Part 4",
        src: "/audio/listening4.mp3",
        description: "An academic monologue on a topic of general interest.",
        duration: "~8 min",
    },
];

// ─────────────────────────────────────────────
// HELPER: format seconds → mm:ss
// ─────────────────────────────────────────────
function fmt(sec: number) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────
// IELTS AUDIO PLAYER COMPONENT
// ─────────────────────────────────────────────
function IeltsAudioPlayer() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.85);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const seekRef = useRef<HTMLInputElement>(null);

    const currentPart = PARTS[activeIndex];

    // ── Sync audio src when part changes ────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        setCurrentTime(0);
        setDuration(0);
        audio.load();
        if (isPlaying) audio.play().catch(() => setIsPlaying(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    // ── Event listeners ─────────────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onEnded = () => {
            if (activeIndex < PARTS.length - 1) {
                switchPart(activeIndex + 1, true);
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);
        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
        };
    }, [activeIndex]);

    // ── Volume sync ──────────────────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);

    // ── Switch part ──────────────────────────────
    const switchPart = useCallback((index: number, autoPlay = false) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex(index);
            if (autoPlay) setIsPlaying(true);
            setIsTransitioning(false);
        }, 250);
    }, []);

    const handlePartClick = (index: number) => {
        if (index === activeIndex) return;
        switchPart(index, isPlaying);
    };

    // ── Playback controls ────────────────────────
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const t = Number(e.target.value);
        audio.currentTime = t;
        setCurrentTime(t);
    };

    const handlePrev = () => {
        if (activeIndex > 0) switchPart(activeIndex - 1, isPlaying);
    };
    const handleNext = () => {
        if (activeIndex < PARTS.length - 1) switchPart(activeIndex + 1, isPlaying);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <motion.section
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full mb-12"
        >
            {/* ── Ambient glow ── */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-sky-400/10 rounded-[3rem] blur-2xl pointer-events-none" />

            <div className="relative bg-gradient-to-br from-[#0c1a3a] via-[#0f2055] to-[#0a1435] rounded-[2rem] shadow-[0_32px_80px_rgba(10,30,100,0.55)] overflow-hidden border border-blue-900/40">

                {/* ── Decorative circles ── */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* ── Header strip ── */}
                <div className="relative flex items-center gap-4 px-8 py-5 border-b border-blue-900/40 bg-blue-950/30 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/20 shadow-inner">
                        <Headphones className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/80 mb-0.5">
                            IELTS Academic
                        </p>
                        <h2 className="text-lg font-bold text-white leading-tight">
                            Listening Section
                        </h2>
                    </div>
                    <div className="ml-auto flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-3.5 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        <span className="text-[11px] font-semibold text-blue-200">4 Parts Available</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-blue-900/40">

                    {/* ── Playlist (left) ── */}
                    <aside className="lg:col-span-2 p-6 space-y-2.5">
                        <p className="text-[10px] font-bold tracking-widest text-blue-400/60 uppercase mb-4 pl-1">Playlist</p>
                        {PARTS.map((part, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <motion.button
                                    key={part.id}
                                    onClick={() => handlePartClick(i)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 relative group overflow-hidden",
                                        isActive
                                            ? "bg-gradient-to-r from-blue-600/90 to-blue-500/80 shadow-[0_8px_30px_rgba(59,130,246,0.4)] border border-blue-400/30"
                                            : "bg-white/5 hover:bg-white/10 border border-transparent hover:border-blue-700/30"
                                    )}
                                >
                                    {/* shimmer on hover */}
                                    {!isActive && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none" />
                                    )}

                                    <div className="flex items-center gap-4 relative z-10">
                                        {/* Part number circle */}
                                        <div className={cn(
                                            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold transition-all duration-300",
                                            isActive
                                                ? "bg-white/20 text-white shadow-inner"
                                                : "bg-blue-900/50 text-blue-400 group-hover:bg-blue-800/50 group-hover:text-blue-300"
                                        )}>
                                            {isActive && isPlaying ? (
                                                <span className="flex gap-[3px] items-end h-4">
                                                    {[0, 1, 2].map((b) => (
                                                        <span
                                                            key={b}
                                                            className="w-[3px] bg-white rounded-full animate-bounce"
                                                            style={{
                                                                height: "60%",
                                                                animationDelay: `${b * 0.15}s`,
                                                                animationDuration: "0.6s",
                                                            }}
                                                        />
                                                    ))}
                                                </span>
                                            ) : (
                                                part.id
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "font-bold text-sm mb-0.5 transition-colors",
                                                isActive ? "text-white" : "text-blue-200 group-hover:text-white"
                                            )}>
                                                {part.label}
                                            </p>
                                            <p className={cn(
                                                "text-xs leading-snug line-clamp-1 transition-colors",
                                                isActive ? "text-blue-100/80" : "text-blue-400/60 group-hover:text-blue-300/70"
                                            )}>
                                                {part.description}
                                            </p>
                                        </div>

                                        <span className={cn(
                                            "flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors",
                                            isActive
                                                ? "bg-white/15 text-blue-100"
                                                : "bg-blue-900/40 text-blue-500 group-hover:text-blue-400"
                                        )}>
                                            {part.duration}
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </aside>

                    {/* ── Player (right) ── */}
                    <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 md:p-10 gap-8">

                        {/* Now Playing label */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`label-${activeIndex}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.35 }}
                                className="text-center"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400/60 block mb-1">
                                    Now Playing
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                                    {currentPart.label}
                                </h3>
                                <p className="text-sm text-blue-300/70 mt-1.5 max-w-sm text-center leading-relaxed">
                                    {currentPart.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Disc art */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`disc-${activeIndex}`}
                                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.85, rotate: 8 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative"
                            >
                                <div className={cn(
                                    "relative w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3),0_0_120px_rgba(59,130,246,0.15)] border-4 border-blue-800/40",
                                    "bg-gradient-to-br from-blue-800 via-[#0f2055] to-indigo-900",
                                    isPlaying && "animate-spin-slow"
                                )}>
                                    {/* Rings */}
                                    <div className="absolute inset-4 rounded-full border border-blue-600/20" />
                                    <div className="absolute inset-8 rounded-full border border-blue-500/15" />
                                    <div className="absolute inset-12 rounded-full border border-blue-400/10" />
                                    {/* Center dot */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0f2055]" />
                                    </div>
                                </div>
                                {/* Part label badge */}
                                <motion.div
                                    key={`badge-${activeIndex}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                    className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-lg border-2 border-[#0f2055]"
                                >
                                    P{currentPart.id}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress bar */}
                        <div className="w-full max-w-md space-y-2">
                            <div className="relative h-1.5 bg-blue-900/60 rounded-full overflow-hidden group cursor-pointer">
                                {/* Filled track */}
                                <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                                {/* Thumb (overlay input for seeking) */}
                                <input
                                    ref={seekRef}
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step={0.1}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-blue-400/60">
                                <span>{fmt(currentTime)}</span>
                                <span>{fmt(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-6">
                            {/* Prev */}
                            <motion.button
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className={cn(
                                    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200",
                                    activeIndex === 0
                                        ? "text-blue-700/40 cursor-not-allowed"
                                        : "text-blue-300 hover:bg-blue-700/40 hover:text-white"
                                )}
                            >
                                <SkipBack className="w-5 h-5 fill-current" />
                            </motion.button>

                            {/* Play / Pause */}
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={togglePlay}
                                className="relative w-18 h-18"
                                style={{ width: 72, height: 72 }}
                            >
                                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md animate-pulse" />
                                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.5)] flex items-center justify-center border border-blue-400/30 transition-all duration-200 hover:shadow-[0_12px_40px_rgba(59,130,246,0.7)]">
                                    <AnimatePresence mode="wait">
                                        {isPlaying ? (
                                            <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                                                <Pause className="w-7 h-7 text-white fill-white" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                                                <Play className="w-7 h-7 text-white fill-white ml-1" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>

                            {/* Next */}
                            <motion.button
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={handleNext}
                                disabled={activeIndex === PARTS.length - 1}
                                className={cn(
                                    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200",
                                    activeIndex === PARTS.length - 1
                                        ? "text-blue-700/40 cursor-not-allowed"
                                        : "text-blue-300 hover:bg-blue-700/40 hover:text-white"
                                )}
                            >
                                <SkipForward className="w-5 h-5 fill-current" />
                            </motion.button>
                        </div>

                        {/* Volume */}
                        <div className="flex items-center gap-3 w-full max-w-[200px]">
                            <button
                                onClick={() => setIsMuted((m) => !m)}
                                className="text-blue-400 hover:text-blue-200 transition-colors flex-shrink-0"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <div className="relative flex-1 h-1 bg-blue-900/60 rounded-full">
                                <div
                                    className="absolute inset-y-0 left-0 bg-blue-400/50 rounded-full"
                                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                                />
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => {
                                        setVolume(Number(e.target.value));
                                        setIsMuted(false);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Footer note ── */}
                <div className="px-8 py-3 bg-blue-950/40 border-t border-blue-900/30 flex items-center justify-between">
                    <p className="text-[10px] text-blue-500/60 font-medium">
                        ⚡ Audio streams automatically advance through all 4 parts
                    </p>
                    <p className="text-[10px] text-blue-500/40 font-mono">
                        IELTS Listening · 4 Sections
                    </p>
                </div>
            </div>

            {/* Hidden audio element */}
            <audio ref={audioRef} src={currentPart.src} preload="metadata" />

            {/* Spin animation */}
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </motion.section>
    );
}

// ─────────────────────────────────────────────
// CATALOG TYPES & DATA  (unchanged)
// ─────────────────────────────────────────────
interface TestCategory {
    id: string;
    title: string;
    count: number;
    icon?: any;
}
interface TestItem {
    id: string;
    categoryId: string;
    title: string;
    duration: string;
    status: "free" | "premium" | "completed";
    audioUrl?: string;
}

const CATEGORIES: TestCategory[] = [
    { id: "all", title: "All Tests", count: 29 },
    { id: "authentic", title: "Free Authentic", count: 4 },
    { id: "trainer-1", title: "IELTS Trainer 1", count: 6 },
    { id: "trainer-2", title: "IELTS Trainer 2", count: 6 },
    { id: "test-plus-3", title: "Test Plus 3", count: 7 },
    { id: "premium", title: "Premium Tests", count: 15, icon: Lock },
];

const TESTS: TestItem[] = [
    { id: "t1-1", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 1", duration: "30 min", status: "free" },
    { id: "t1-2", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 2", duration: "28 min", status: "free" },
    { id: "t1-3", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 3", duration: "31 min", status: "free" },
    { id: "t1-4", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 4", duration: "29 min", status: "free" },
    { id: "t1-5", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 5", duration: "30 min", status: "free" },
    { id: "t1-6", categoryId: "trainer-1", title: "IELTS Trainer 1, Test 6", duration: "32 min", status: "free" },
    { id: "t2-1", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 1", duration: "30 min", status: "free" },
    { id: "t2-2", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 2", duration: "30 min", status: "free" },
    { id: "t2-3", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 3", duration: "29 min", status: "free" },
    { id: "t2-4", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 4", duration: "31 min", status: "free" },
    { id: "t2-5", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 5", duration: "30 min", status: "free" },
    { id: "t2-6", categoryId: "trainer-2", title: "IELTS Trainer 2, Test 6", duration: "30 min", status: "free" },
    { id: "tp3-1", categoryId: "test-plus-3", title: "Test Plus 3, Test 1", duration: "30 min", status: "free" },
    { id: "tp3-2", categoryId: "test-plus-3", title: "Test Plus 3, Test 2", duration: "30 min", status: "free" },
    { id: "tp3-3", categoryId: "test-plus-3", title: "Test Plus 3, Test 3", duration: "30 min", status: "free" },
    { id: "tp3-4", categoryId: "test-plus-3", title: "Test Plus 3, Test 4", duration: "30 min", status: "free" },
    { id: "cambridge-11-test-1", categoryId: "authentic", title: "Cambridge IELTS 11, Test 1", duration: "32 min", status: "free", audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/Cambridge%20IELTS%2011.1.1.mp3" },
    { id: "auth-1", categoryId: "authentic", title: "Authentic Test 1", duration: "30 min", status: "free" },
    { id: "auth-2", categoryId: "authentic", title: "Authentic Test 2", duration: "30 min", status: "free" },
    { id: "auth-3", categoryId: "authentic", title: "Authentic Test 3", duration: "30 min", status: "free" },
];

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function ListeningPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTests = TESTS.filter((test) => {
        const matchesCategory = selectedCategory === "all" || test.categoryId === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <DashboardLayout
            title="Listening Practice"
            description="Authentic audio materials with native speakers to improve your listening comprehension."
        >
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Background Blobs */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-300/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-[80px]" />
                </div>

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a listening test..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 backdrop-blur-md border border-purple-100 text-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all shadow-[0_4px_20px_rgba(168,85,247,0.05)] placeholder:text-purple-300/70"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 p-4 space-y-2 lg:sticky lg:top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-purple-100/50">
                            <Filter className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Collections</span>
                        </div>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                                    selectedCategory === category.id
                                        ? "text-purple-700 shadow-md shadow-purple-500/10"
                                        : "hover:bg-purple-50/50 text-slate-600 hover:text-purple-800"
                                )}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    {category.icon ? (
                                        <category.icon className={cn("w-4 h-4", selectedCategory === category.id ? "text-purple-600" : "text-slate-400 group-hover:text-purple-500")} />
                                    ) : (
                                        <div className={cn("w-2 h-2 rounded-full transition-all duration-300", selectedCategory === category.id ? "bg-purple-500 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "bg-slate-300 group-hover:bg-purple-300")} />
                                    )}
                                    <span className={cn("transition-colors", selectedCategory === category.id && "font-semibold")}>
                                        {category.title}
                                    </span>
                                </div>
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-lg text-[10px] bg-white/50 border font-bold relative z-10 transition-colors",
                                    selectedCategory === category.id
                                        ? "border-purple-200 text-purple-600 bg-white"
                                        : "border-transparent text-slate-400 group-hover:bg-white group-hover:border-purple-100 group-hover:text-purple-400"
                                )}>
                                    {category.count}
                                </span>
                                {selectedCategory === category.id && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-100 via-fuchsia-50 to-purple-50 z-0"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </aside>

                {/* ── Main ── */}
                <main className="flex-1 min-w-0">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 md:p-10 mb-10 shadow-[0_20px_50px_rgba(124,58,237,0.3)] group"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] opacity-20 mix-blend-soft-light" />
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Headphones className="w-80 h-80 text-white transform translate-x-20 -translate-y-20 rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-in-out" />
                        </div>
                        <div className="relative z-10 text-white max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-yellow-300" /> Premium Content
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Listening Studio</h2>
                            <p className="text-purple-100 text-lg leading-relaxed font-light">
                                Immerse yourself in authentic audio experiences. Master varying accents and complex dialogues with our high-fidelity listening tests.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── IELTS Audio Player ── */}
                    <IeltsAudioPlayer />

                    {/* ── Test Catalog ── */}
                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {(selectedCategory === "all"
                                ? CATEGORIES.filter((c) => c.id !== "all")
                                : CATEGORIES.filter((c) => c.id === selectedCategory)
                            ).map((category, catIndex) => {
                                const categoryTests = filteredTests.filter((t) => t.categoryId === category.id);
                                if (categoryTests.length === 0) return null;
                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-sm border border-purple-100 text-purple-600">
                                                {category.id.includes("trainer") ? <BarChart3 className="w-5 h-5" /> : category.id.includes("plus") ? <Sparkles className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
                                                <p className="text-sm text-slate-400 font-medium">{categoryTests.length} Tests Available</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                            {categoryTests.map((test, index) => (
                                                <motion.div
                                                    key={test.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                                    className="group bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-1 border border-white/60 hover:border-purple-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)] transition-all duration-500 relative hover:-translate-y-1"
                                                >
                                                    <div className="bg-white/50 rounded-[1.2rem] p-5 h-full flex flex-col relative overflow-hidden group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-purple-50/30 transition-colors duration-500">
                                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                                            <span className={cn(
                                                                "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border",
                                                                test.status === "free"
                                                                    ? "bg-emerald-50/80 border-emerald-100 text-emerald-600"
                                                                    : "bg-amber-50/80 border-amber-100 text-amber-600"
                                                            )}>
                                                                {test.status === "free" ? "Free Access" : "Premium"}
                                                            </span>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-100/50 px-2.5 py-1.5 rounded-lg border border-slate-200/50">
                                                                <Clock className="w-3.5 h-3.5 text-purple-400" /> {test.duration}
                                                            </div>
                                                        </div>
                                                        <div className="mb-6 relative z-10">
                                                            <h4 className="font-bold text-slate-800 text-lg group-hover:text-purple-700 transition-colors line-clamp-1 mb-1">{test.title}</h4>
                                                            <p className="text-xs text-slate-400 font-medium">Cambridge Official Materials</p>
                                                        </div>
                                                        <div className="mt-auto relative z-10">
                                                            <Link href={`/practice/listening/${test.id}`}>
                                                                <button className="w-full py-3.5 rounded-xl bg-slate-900 group-hover:bg-purple-600 text-white font-bold text-sm shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden">
                                                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                                    <PlayCircle className="w-4 h-4 fill-current opacity-90 relative z-10" />
                                                                    <span className="relative z-10">Start Practice</span>
                                                                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                                                                </button>
                                                            </Link>
                                                        </div>
                                                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredTests.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200"
                            >
                                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Search className="w-8 h-8 text-purple-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No tests found</h3>
                                <p className="text-slate-400">Try searching for something else or clear filters.</p>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
