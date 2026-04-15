"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxCurtainSectionProps {
    index: number;
    totalSections: number;
    bg?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Rezo-zero style "curtain" section.
 * Each section is sticky at top:0 and stacks on top of the previous one.
 * The z-index increases per section so each new panel slides over the previous.
 */
export default function ParallaxCurtainSection({
    index,
    totalSections,
    bg = "#ffffff",
    children,
    className = "",
}: ParallaxCurtainSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Inner content moves upward slightly as section scrolls away (parallax depth)
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

    return (
        <div
            ref={ref}
            className={`sticky top-0 w-full overflow-hidden ${className}`}
            style={{
                height: "100vh",
                zIndex: index + 1,
                backgroundColor: bg,
            }}
        >
            <motion.div
                style={{ y, willChange: "transform" }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
