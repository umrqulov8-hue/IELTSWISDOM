"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft as BackIcon, Sparkles, RefreshCcw, Trophy, Timer, Zap, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';
import { getVocabularyForPassage } from "@/data/vocabulary";

// --- Types ---
interface GameItem {
    id: string; // The pair ID (e.g., "1")
    content: string; // The text (term or definition)
    type: "term" | "definition";
    uniqueId: string; // Unique for this card instance
}

type ItemStatus = "idle" | "selected" | "matched" | "error";

function MatchingGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const passageId = searchParams.get("id") || "c18-t1-p1";

    const [items, setItems] = useState<GameItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // Store uniqueIds
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // Store pair IDs
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [statusMap, setStatusMap] = useState<Record<string, ItemStatus>>({}); // uniqueId -> status
    const [matchesCount, setMatchesCount] = useState(0);

    useEffect(() => {
        initGame();
    }, [passageId]);

    const initGame = () => {
        // Fetch data from centralized source
        const data = getVocabularyForPassage(passageId);

        // Take first 6 items for the game to keep it manageable (or all if less)
        const gameData = data.slice(0, 6);

        const gameItems: GameItem[] = [];

        gameData.forEach(pair => {
            gameItems.push({ id: pair.id, content: pair.term, type: "term", uniqueId: `${pair.id}-term` });
            gameItems.push({ id: pair.id, content: pair.definition, type: "definition", uniqueId: `${pair.id}-def` });
        });

        // Shuffle
        setItems(gameItems.sort(() => Math.random() - 0.5));
        setSelectedItems([]);
        setMatchedPairs([]);
        setStatusMap({});
        setIsGameComplete(false);
        setMatchesCount(0);
    };

    const handleItemClick = (uniqueId: string, pairId: string) => {
        // Ignore if already matched or if clicking the same item twice
        if (matchedPairs.includes(pairId) || selectedItems.includes(uniqueId)) return;

        // Prevent selecting more than 2
        if (selectedItems.length >= 2) return;

        const newSelected = [...selectedItems, uniqueId];
        setSelectedItems(newSelected);

        // Update status for visual selection
        setStatusMap(prev => ({ ...prev, [uniqueId]: "selected" }));

        if (newSelected.length === 2) {
            const firstId = newSelected[0];
            const firstItem = items.find(i => i.uniqueId === firstId);
            const secondItem = items.find(i => i.uniqueId === uniqueId);

            if (firstItem && secondItem) {
                if (firstItem.id === secondItem.id) {
                    // Match!
                    setTimeout(() => {
                        setMatchedPairs(prev => [...prev, pairId]);
                        setStatusMap(prev => ({
                            ...prev,
                            [firstId]: "matched",
                            [uniqueId]: "matched"
                        }));
                        setSelectedItems([]);
                        setMatchesCount(prev => prev + 1);

                        // Confetti for match
                        confetti({
                            particleCount: 20,
                            spread: 40,
                            origin: { y: 0.8 },
                            colors: ['#34D399', '#10B981']
                        });

                        // Check Win
                        const uniquePairs = new Set(items.map(i => i.id)).size;
                        if (matchesCount + 1 === uniquePairs) {
                            setTimeout(() => {
                                setIsGameComplete(true);
                                fireWinConfetti();
                            }, 500);
                        }

                    }, 300);
                } else {
                    // Mismatch
                    setTimeout(() => {
                        setStatusMap(prev => ({
                            ...prev,
                            [firstId]: "error",
                            [uniqueId]: "error"
                        }));
                        setTimeout(() => {
                            setStatusMap(prev => {
                                const newMap = { ...prev };
                                delete newMap[firstId];
                                delete newMap[uniqueId];
                                return newMap;
                            });
                            setSelectedItems([]);
                        }, 800);
                    }, 300);
                }
            }
        }
    };

    const fireWinConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-8 font-sans">
            {/* Header */}
            <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:bg-slate-50 transition-colors shadow-sm">
                        <BackIcon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Back</span>
                </button>

                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">
                    Matching Pair
                </h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-slate-700 font-bold">{matchesCount} <span className="text-slate-400 font-normal">Pairs</span></span>
                    </div>
                    <button
                        onClick={initGame}
                        className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                        title="Restart Game"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {isGameComplete ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-xl"
                        >
                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trophy className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent!</h2>
                            <p className="text-slate-500 mb-8">You matched all terms correctly.</p>
                            <button
                                onClick={initGame}
                                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map((item) => {
                                const status = statusMap[item.uniqueId] || "idle";
                                const isMatched = status === "matched";

                                return (
                                    <motion.button
                                        key={item.uniqueId}
                                        layout
                                        onClick={() => handleItemClick(item.uniqueId, item.id)}
                                        disabled={isMatched}
                                        animate={{
                                            scale: status === "selected" ? 1.05 : 1,
                                            opacity: isMatched ? 0.8 : 1
                                        }}
                                        whileHover={!isMatched ? { scale: 1.02 } : {}}
                                        whileTap={!isMatched ? { scale: 0.98 } : {}}
                                        className={cn(
                                            "relative p-6 rounded-2xl border min-h-[160px] flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm",
                                            status === "idle" && "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:shadow-md",
                                            status === "selected" && "bg-blue-50 border-blue-400 text-blue-700 shadow-lg shadow-blue-500/10 ring-2 ring-blue-400/20",
                                            status === "matched" && "bg-emerald-50 border-emerald-400 text-emerald-700 cursor-default opacity-60 grayscale-[0.2]",
                                            status === "error" && "bg-rose-50 border-rose-400 text-rose-700 animate-shake ring-2 ring-rose-400/20"
                                        )}
                                    >
                                        {status === "selected" && (
                                            <div className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                                        )}
                                        {status === "matched" && (
                                            <div className="absolute top-3 right-3 text-emerald-500">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        )}
                                        {status === "error" && (
                                            <div className="absolute top-3 right-3 text-rose-500">
                                                <XCircle className="w-5 h-5" />
                                            </div>
                                        )}

                                        <span className={cn(
                                            "font-medium text-lg",
                                            item.type === "term" ? "font-bold text-xl" : "text-base italic"
                                        )}>
                                            {item.content}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default function MatchingGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center font-sans text-slate-500">Loading matching game...</div>}>
            <MatchingGameContent />
        </Suspense>
    );
}
