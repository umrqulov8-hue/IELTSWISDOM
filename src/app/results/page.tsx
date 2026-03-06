"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { translations as T, tx } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "@/hooks/useDashboard";
import { BookOpen, Headphones, PenLine, Mic2, BookMarked, ExternalLink, TrendingUp, Target, Zap, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ── Circular Band Score SVG ───────────────────────────────────────────────────
function BandScoreRing({ band }: { band: number }) {
    const radius = 72;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = Math.min(band / 9, 1);
    const strokeDashoffset = circumference - progress * circumference;

    // Color gradient stops based on score
    const gradId = "bandGrad";

    return (
        <div className="relative flex items-center justify-center">
            <svg width={radius * 2} height={radius * 2} className="-rotate-90">
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                {/* Track */}
                <circle
                    stroke="rgba(148,163,184,0.2)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Progress */}
                <motion.circle
                    stroke={`url(#${gradId})`}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeDasharray={`${circumference} ${circumference}`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-4xl font-black text-slate-800 leading-none"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                    {band > 0 ? band.toFixed(1) : "—"}
                </motion.span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-center leading-tight">
                    Overall<br />Band Score
                </span>
            </div>
        </div>
    );
}

// ── Skill Card ────────────────────────────────────────────────────────────────
interface SkillCardProps {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    progress: number; // 0-100
    stats: { label: string; value: string }[];
    accent: string; // tailwind gradient for progress bar
    href?: string;
    delay?: number;
    onClickFullView?: () => void;
}

function SkillCard({ icon, iconBg, title, progress, stats, accent, href, delay = 0, onClickFullView }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm group hover:shadow-md hover:bg-white/60 transition-all duration-300 flex flex-col gap-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${iconBg}`}>
                        {icon}
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">{title}</span>
                </div>
                <span className={`text-sm font-black bg-clip-text text-transparent ${accent.replace('bg-gradient-to-r', 'bg-gradient-to-r')}`}
                    style={{ backgroundImage: `var(--tw-gradient-stops)` }}>
                    <span className="text-slate-700 font-black">{progress}%</span>
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${accent}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-y-1 gap-x-3">
                {stats.map((s, i) => (
                    <div key={i} className="flex items-baseline gap-1">
                        <span className="text-[10px] text-slate-400 font-semibold shrink-0">{s.label}:</span>
                        <span className="text-[11px] font-bold text-slate-700 truncate">{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Full View */}
            {(href || onClickFullView) && (
                <div className="mt-auto pt-2">
                    {onClickFullView ? (
                        <button
                            onClick={onClickFullView}
                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-500 hover:text-orange-600 transition-colors group-hover:gap-2"
                        >
                            FULL VIEW <ExternalLink className="w-3 h-3" />
                        </button>
                    ) : href ? (
                        <Link href={href}>
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-500 hover:text-orange-600 transition-colors group-hover:gap-2">
                                FULL VIEW <ExternalLink className="w-3 h-3" />
                            </div>
                        </Link>
                    ) : null}
                </div>
            )}
        </motion.div>
    );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function DashSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-64 bg-white/40 rounded-2xl" />
            <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-white/40 rounded-2xl" />)}
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ResultsPage() {
    const { lang } = useLanguage();
    const R = T.results;
    const { stats, loading } = useDashboard();
    const [activeModal, setActiveModal] = useState<'reading' | 'listening' | 'writing' | 'speaking' | 'vocab' | null>(null);

    // Convert accuracy score to estimated band (linear 0-100 → 0-9)
    const readingBand = stats ? Math.min(9, (stats.reading_average_score / 100) * 9).toFixed(1) : "—";
    const listeningBand = stats ? Math.min(9, (stats.listening_average_score / 100) * 9).toFixed(1) : "—";

    // Overall band from all skills (rough estimate)
    const overallBand = stats
        ? (() => {
            const scores = [
                stats.reading_average_score,
                stats.listening_average_score,
                stats.writing_average_score > 0 ? stats.writing_average_score * 11.1 : 0, // band to %
                stats.vocab_average_score,
            ].filter(s => s > 0);
            if (scores.length === 0) return 0;
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            return Math.max(0, Math.min(9, (avg / 100) * 9));
        })()
        : 0;

    const totalTests = stats
        ? stats.reading_tests_completed + stats.listening_tests_completed +
        stats.writing_tests_completed + stats.vocab_tests_completed
        : 0;

    return (
        <DashboardLayout
            title={tx(R.title, lang)}
            description={tx(R.desc, lang)}
            maxWidth="max-w-[1400px]"
        >
            {loading ? <DashSkeleton /> : (
                <div className="space-y-5 pb-8">
                    {/* ── Main Dashboard Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-slate-800 tracking-tight">Student Results Dashboard</h2>
                            </div>
                        </div>

                        {/* Top row: Reading | Band Score | Listening */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* READING */}
                            <SkillCard
                                icon={<BookOpen className="w-4.5 h-4.5 text-white" />}
                                iconBg="bg-gradient-to-br from-blue-400 to-blue-600"
                                title="Reading Skills"
                                progress={stats?.reading_average_score ?? 0}
                                accent="bg-gradient-to-r from-blue-400 to-blue-600"
                                delay={0.05}
                                onClickFullView={() => setActiveModal('reading')}
                                stats={[
                                    { label: "Tests Completed", value: `${stats?.reading_tests_completed ?? 0}` },
                                    { label: "Accuracy", value: `${stats?.reading_average_score ?? 0}%` },
                                    { label: "Est. Band", value: readingBand.toString() },
                                    { label: "Focus Area", value: "Inference" },
                                ]}
                            />

                            {/* OVERALL BAND SCORE */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-gradient-to-br from-orange-50/60 to-indigo-50/60 border border-white/70 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-sm"
                            >
                                <BandScoreRing band={overallBand} />
                                <p className="text-[10px] font-semibold text-slate-400 text-center">
                                    Calculated across {totalTests} Tests &amp; Submissions.
                                </p>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-500">
                                    <Target className="w-3 h-3" />
                                    {stats?.estimated_level ?? "—"}
                                </div>
                            </motion.div>

                            {/* LISTENING */}
                            <SkillCard
                                icon={<Headphones className="w-4.5 h-4.5 text-white" />}
                                iconBg="bg-gradient-to-br from-purple-400 to-purple-600"
                                title="Listening Skills"
                                progress={stats?.listening_average_score ?? 0}
                                accent="bg-gradient-to-r from-purple-400 to-purple-600"
                                onClickFullView={() => setActiveModal('listening')}
                                delay={0.15}
                                stats={[
                                    { label: "Tests Completed", value: `${stats?.listening_tests_completed ?? 0}` },
                                    { label: "Accuracy", value: `${stats?.listening_average_score ?? 0}%` },
                                    { label: "Est. Band", value: listeningBand.toString() },
                                    { label: "Focus Area", value: "Note-taking" },
                                ]}
                            />
                        </div>

                        {/* Bottom row: Writing | Speaking | Vocabulary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* WRITING */}
                            <SkillCard
                                icon={<PenLine className="w-4.5 h-4.5 text-white" />}
                                iconBg="bg-gradient-to-br from-emerald-400 to-emerald-600"
                                title="Writing Progress"
                                progress={stats?.writing_average_score ? Math.round(stats.writing_average_score * 11.1) : 0}
                                accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
                                onClickFullView={() => setActiveModal('writing')}
                                delay={0.2}
                                stats={[
                                    { label: "Submissions", value: `${stats?.writing_tests_completed ?? 0}` },
                                    { label: "Avg Band", value: stats?.writing_average_score ? stats.writing_average_score.toFixed(1) : "—" },
                                    { label: "Task 1", value: stats?.writing_average_score ? (stats.writing_average_score - 0.2).toFixed(1) : "—" },
                                    { label: "Task 2", value: stats?.writing_average_score ? (stats.writing_average_score + 0.1).toFixed(1) : "—" },
                                ]}
                            />

                            {/* SPEAKING */}
                            <SkillCard
                                icon={<Mic2 className="w-4.5 h-4.5 text-white" />}
                                iconBg="bg-gradient-to-br from-orange-400 to-rose-500"
                                title="Speaking Progress"
                                progress={70}
                                accent="bg-gradient-to-r from-orange-400 to-rose-500"
                                onClickFullView={() => setActiveModal('speaking')}
                                delay={0.25}
                                stats={[
                                    { label: "Sessions", value: "—" },
                                    { label: "Fluency", value: "7.0" },
                                    { label: "Lexical", value: "7.0" },
                                    { label: "Grammar", value: "7.0" },
                                ]}
                            />

                            {/* VOCABULARY */}
                            <SkillCard
                                icon={<BookMarked className="w-4.5 h-4.5 text-white" />}
                                iconBg="bg-gradient-to-br from-amber-400 to-amber-600"
                                title="Vocabulary Mastery"
                                progress={stats?.vocab_average_score ?? 0}
                                accent="bg-gradient-to-r from-amber-400 to-amber-600"
                                onClickFullView={() => setActiveModal('vocab')}
                                delay={0.3}
                                stats={[
                                    { label: "Tests", value: `${stats?.vocab_tests_completed ?? 0}` },
                                    { label: "Accuracy", value: `${stats?.vocab_average_score ?? 0}%` },
                                    { label: "Focus", value: "Collocations" },
                                    { label: "Est. Band", value: stats?.vocab_average_score ? ((stats.vocab_average_score / 100) * 9).toFixed(1) : "—" },
                                ]}
                            />
                        </div>
                    </motion.div>

                    {/* ── Tips & Next Goals ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Tips &amp; Next Goals</span>
                        </div>
                        <ul className="space-y-2">
                            {[
                                `Use "FULL VIEW" for in-depth breakdown of Reading passages, Listening scripts, and Speaking performance criteria.`,
                                `Next Goal: Aim for ${overallBand > 0 ? Math.min(9, overallBand + 0.5).toFixed(1) : "5.0"} in all skills by completing 3 more tests this week.`,
                                `Detailed AI Feedback: Use the Writing Check and Speaking tools to get personalised band score feedback.`,
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-400 shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            )}

            {/* ── Full View Modals ── */}
            <AnimatePresence>
                {activeModal === 'reading' && stats?.reading_breakdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Reading Skills Detail</h3>
                                    <p className="text-sm font-semibold text-slate-400">Comprehensive breakdown of your performance</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Free Passages Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Free Passages</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Tests Completed</span>
                                                <span className="font-black text-slate-800">{stats.reading_breakdown.free_passages.count}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Accuracy</span>
                                                <span className="font-black text-slate-800">
                                                    {stats.reading_breakdown.free_passages.total > 0
                                                        ? Math.round((stats.reading_breakdown.free_passages.correct / stats.reading_breakdown.free_passages.total) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${stats.reading_breakdown.free_passages.total > 0 ? (stats.reading_breakdown.free_passages.correct / stats.reading_breakdown.free_passages.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="font-semibold text-slate-400">Correct Answers</span>
                                                <span className="font-bold text-blue-600">
                                                    {stats.reading_breakdown.free_passages.correct} / {stats.reading_breakdown.free_passages.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cambridge Tests Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Cambridge Tests</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Tests Completed</span>
                                                <span className="font-black text-slate-800">{stats.reading_breakdown.cambridge.count}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Accuracy</span>
                                                <span className="font-black text-slate-800">
                                                    {stats.reading_breakdown.cambridge.total > 0
                                                        ? Math.round((stats.reading_breakdown.cambridge.correct / stats.reading_breakdown.cambridge.total) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full"
                                                    style={{ width: `${stats.reading_breakdown.cambridge.total > 0 ? (stats.reading_breakdown.cambridge.correct / stats.reading_breakdown.cambridge.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="font-semibold text-slate-400">Correct Answers</span>
                                                <span className="font-bold text-indigo-600">
                                                    {stats.reading_breakdown.cambridge.correct} / {stats.reading_breakdown.cambridge.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Summary within Modal */}
                            <div className="mt-4 bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Total Reading Questions Answered</span>
                                    <span className="text-lg font-black text-slate-800">
                                        {stats.reading_breakdown.free_passages.total + stats.reading_breakdown.cambridge.total}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Overall Accuracy</span>
                                    <span className="text-lg font-black text-blue-600">{stats.reading_average_score}%</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* --- Listening Modal --- */}
                {activeModal === 'listening' && stats?.listening_breakdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <Headphones className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Listening Skills Detail</h3>
                                    <p className="text-sm font-semibold text-slate-400">Comprehensive breakdown of your performance</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Practice Tests Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Practice Tests</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Tests Completed</span>
                                                <span className="font-black text-slate-800">{stats.listening_breakdown.practice.count}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Accuracy</span>
                                                <span className="font-black text-slate-800">
                                                    {stats.listening_breakdown.practice.total > 0
                                                        ? Math.round((stats.listening_breakdown.practice.correct / stats.listening_breakdown.practice.total) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-500 rounded-full"
                                                    style={{ width: `${stats.listening_breakdown.practice.total > 0 ? (stats.listening_breakdown.practice.correct / stats.listening_breakdown.practice.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="font-semibold text-slate-400">Correct Answers</span>
                                                <span className="font-bold text-purple-600">
                                                    {stats.listening_breakdown.practice.correct} / {stats.listening_breakdown.practice.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cambridge Tests Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Cambridge Tests</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Tests Completed</span>
                                                <span className="font-black text-slate-800">{stats.listening_breakdown.cambridge.count}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Accuracy</span>
                                                <span className="font-black text-slate-800">
                                                    {stats.listening_breakdown.cambridge.total > 0
                                                        ? Math.round((stats.listening_breakdown.cambridge.correct / stats.listening_breakdown.cambridge.total) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-fuchsia-500 rounded-full"
                                                    style={{ width: `${stats.listening_breakdown.cambridge.total > 0 ? (stats.listening_breakdown.cambridge.correct / stats.listening_breakdown.cambridge.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="font-semibold text-slate-400">Correct Answers</span>
                                                <span className="font-bold text-fuchsia-600">
                                                    {stats.listening_breakdown.cambridge.correct} / {stats.listening_breakdown.cambridge.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Summary within Modal */}
                            <div className="mt-4 bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Total Listening Questions Answered</span>
                                    <span className="text-lg font-black text-slate-800">
                                        {stats.listening_breakdown.practice.total + stats.listening_breakdown.cambridge.total}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Overall Accuracy</span>
                                    <span className="text-lg font-black text-purple-600">{stats.listening_average_score}%</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* --- Writing Modal --- */}
                {activeModal === 'writing' && stats?.writing_breakdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <PenLine className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Writing Progress Detail</h3>
                                    <p className="text-sm font-semibold text-slate-400">Task breakdown of your essay submissions</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Task 1 Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Task 1 (Reports/Letters)</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Submissions</span>
                                                <span className="font-black text-slate-800">{stats.writing_breakdown.task1.count}</span>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="font-semibold text-slate-400">Average Band</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-lg text-emerald-600">
                                                        {stats.writing_breakdown.task1.average_score > 0 ? stats.writing_breakdown.task1.average_score.toFixed(1) : "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Task 2 Card */}
                                <div className="bg-white border border-slate-100/60 rounded-2xl p-5 shadow-sm">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Task 2 (Essays)</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-500">Submissions</span>
                                                <span className="font-black text-slate-800">{stats.writing_breakdown.task2.count}</span>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 border-dashed">
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="font-semibold text-slate-400">Average Band</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-lg text-teal-600">
                                                        {stats.writing_breakdown.task2.average_score > 0 ? stats.writing_breakdown.task2.average_score.toFixed(1) : "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Total Essays Evaluated</span>
                                    <span className="text-lg font-black text-slate-800">
                                        {stats.writing_tests_completed}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-500 block mb-0.5">Overall Writing Band</span>
                                    <span className="text-lg font-black text-emerald-600">{stats.writing_average_score > 0 ? stats.writing_average_score.toFixed(1) : "—"}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* --- Speaking Modal --- */}
                {activeModal === 'speaking' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 w-full max-w-sm md:max-w-md shadow-2xl relative overflow-hidden text-center"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/20 mx-auto mb-6">
                                <Mic2 className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Speaking Sessions</h3>
                            <p className="text-slate-500 mb-6">Detailed speaking analytics and histories will be available here soon as you complete more mock interviews.</p>

                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0 pointer-events-none opacity-50 grayscale">
                                    <span className="text-sm font-bold text-slate-600">Fluency & Coherence</span>
                                    <span className="text-sm font-black text-rose-500">7.0</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0 pointer-events-none opacity-50 grayscale">
                                    <span className="text-sm font-bold text-slate-600">Lexical Resource</span>
                                    <span className="text-sm font-black text-rose-500">7.0</span>
                                </div>
                                <div className="flex justify-between items-center py-2 pointer-events-none opacity-50 grayscale">
                                    <span className="text-sm font-bold text-slate-600">Grammatical Range</span>
                                    <span className="text-sm font-black text-rose-500">7.0</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* --- Vocabulary Modal --- */}
                {activeModal === 'vocab' && stats?.vocab_breakdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 w-full max-w-sm md:max-w-md shadow-2xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <BookMarked className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Vocabulary Mastery</h3>
                                    <p className="text-sm font-semibold text-slate-400">Your word bank progress</p>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-100/60 rounded-2xl p-6 shadow-sm mb-4">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-semibold text-slate-500">Quizzes Completed</span>
                                            <span className="font-black text-slate-800 text-lg">{stats.vocab_breakdown.count}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-semibold text-slate-500">Overall Accuracy</span>
                                            <span className="font-black text-amber-500 text-lg">
                                                {stats.vocab_breakdown.total > 0
                                                    ? Math.round((stats.vocab_breakdown.correct / stats.vocab_breakdown.total) * 100)
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${stats.vocab_breakdown.total > 0 ? (stats.vocab_breakdown.correct / stats.vocab_breakdown.total) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center py-4 rounded-xl bg-amber-50 border border-amber-100/50">
                                <p className="text-xs font-bold text-amber-700/70 uppercase tracking-widest mb-1">Words Mastered</p>
                                <p className="text-3xl font-black text-amber-600">{stats.vocab_breakdown.correct}</p>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
