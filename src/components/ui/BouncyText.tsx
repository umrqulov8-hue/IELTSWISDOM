"use client";

import { m } from "framer-motion";

export const BouncyText = ({
    text,
    className = "",
    type = "letter"
}: {
    text: string,
    className?: string,
    type?: "word" | "letter"
}) => {
    const items = type === "word" ? text.split(" ") : Array.from(text);
    return (
        <m.span
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: type === "word" ? 0.04 : 0.02 } }
            }}
            className={`inline-block ${className}`}
        >
            {items.map((item, i) => (
                <m.span
                    key={`${item}-${i}`}
                    variants={{
                        hidden: { opacity: 0, y: 15, rotateX: 45, scale: 0.8 },
                        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", bounce: 0.6, duration: 0.6 } }
                    }}
                    className="inline-block"
                    style={{ whiteSpace: "pre" }}
                >
                    {item}{type === "word" && i < items.length - 1 ? " " : ""}
                </m.span>
            ))}
        </m.span>
    );
};
