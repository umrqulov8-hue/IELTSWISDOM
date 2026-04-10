import * as React from "react";
import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function usePerformance() {
    const [isMobile, setIsMobile] = React.useState(false);
    const prefersReducedMotion = useReducedMotion();

    React.useEffect(() => {
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
