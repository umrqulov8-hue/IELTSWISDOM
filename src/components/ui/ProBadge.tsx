"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProBadgeProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    showText?: boolean;
}

export function ProBadge({ size = "md", className, showText = true }: ProBadgeProps) {
    const sizes = {
        sm: { badge: "px-2 py-0.5 gap-1 text-[9px]", icon: "w-2.5 h-2.5" },
        md: { badge: "px-3 py-1 gap-1.5 text-[10px]", icon: "w-3.5 h-3.5" },
        lg: { badge: "px-4 py-1.5 gap-2 text-xs", icon: "w-4 h-4" },
    };

    const s = sizes[size];

    return (
        <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            className={cn(
                "relative inline-flex items-center font-black uppercase tracking-widest text-white rounded-full cursor-default select-none",
                "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500",
                "shadow-lg shadow-amber-500/30",
                s.badge,
                className
            )}
        >
            {/* Shine animation overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
                />
            </div>

            <Zap className={cn("relative z-10 fill-current", s.icon)} />
            {showText && <span className="relative z-10">PRO</span>}

            {/* Outer glow pulse */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 -z-10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
        </motion.div>
    );
}
