"use client";

import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { useDevice } from "@/context/DeviceContext";

export const BouncyText = ({
    text,
    className = "",
    type = "letter"
}: {
    text: string,
    className?: string,
    type?: "word" | "letter"
}) => {
    const { tier, shouldAnimate } = useDevice();
    const items = type === "word" ? text.split(" ") : Array.from(text);

    // Low-tier or reduced-motion: render plain inline text, zero JS animation cost
    if (!shouldAnimate) {
        return (
            <span className={`inline-block ${className}`}>
                {items.map((item, i) => (
                    <span key={`${item}-${i}`} style={{ whiteSpace: "pre" }} className="inline-block">
                        {item}{type === "word" && i < items.length - 1 ? " " : ""}
                    </span>
                ))}
            </span>
        );
    }

    const stagger = tier === "mid"
        ? (type === "word" ? 0.03 : 0.015)
        : (type === "word" ? 0.04 : 0.02);

    // Mid-tier: simple fade, no spring physics
    const itemVariants: Variants = tier === "mid"
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.15 } },
        }
        : {
            hidden: { opacity: 0, y: 15, rotateX: 45, scale: 0.8 },
            visible: {
                opacity: 1, y: 0, rotateX: 0, scale: 1,
                transition: { type: "spring" as const, bounce: 0.6, duration: 0.6 }
            },
        };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger } as any },
    };

    return (
        <m.span variants={containerVariants} className={`inline-block ${className}`}>
            {items.map((item, i) => (
                <m.span
                    key={`${item}-${i}`}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ whiteSpace: "pre" }}
                >
                    {item}{type === "word" && i < items.length - 1 ? " " : ""}
                </m.span>
            ))}
        </m.span>
    );
};
