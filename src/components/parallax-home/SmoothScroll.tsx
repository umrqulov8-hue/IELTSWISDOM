"use client";

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [pageHeight, setPageHeight] = useState(0);

    // We use a ResizeObserver to dynamically update the height of the ghost div
    const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
        for (let entry of entries) {
            setPageHeight(entry.contentRect.height);
        }
    }, []);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(entries => resizePageHeight(entries));
        if (scrollRef.current) {
            resizeObserver.observe(scrollRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [resizePageHeight]);

    const { scrollY } = useScroll();
    const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);

    return (
        <>
            <motion.div 
                ref={scrollRef} 
                style={{ y: spring }} 
                className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
            >
                {children}
            </motion.div>
            <div style={{ height: pageHeight }} />
        </>
    );
}
