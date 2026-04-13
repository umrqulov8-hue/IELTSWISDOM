"use client";

import { useInView } from "framer-motion";
import * as React from "react";
import { useRef, useState, useEffect } from "react";

export function LazySection({ children, offset = "200px" }: { children: React.ReactNode, offset?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: offset });
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => {
        if (isInView && !hasRendered) {
            setHasRendered(true);
        }
    }, [isInView, hasRendered]);

    return (
        <div ref={ref}>
            {hasRendered ? children : <div className="min-h-[50vh]" />}
        </div>
    );
}
