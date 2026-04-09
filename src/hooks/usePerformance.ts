"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function usePerformance() {
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return {
        isMobile,
        prefersReducedMotion,
        shouldAnimate: !prefersReducedMotion
    };
}
