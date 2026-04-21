"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface TransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
}

export default function TransitionLink({
    href,
    children,
    className,
    style,
    onClick,
}: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = useCallback((e: React.MouseEvent) => {
        // Run custom onClick first (e.g. scroll-to-anchor on homepage)
        if (onClick) {
            onClick(e);
            if (e.defaultPrevented) return; // if custom handler prevented default, stop here
        }

        if (!href.startsWith("/")) return;
        if (href === pathname) return;

        e.preventDefault();
        router.push(href);
    }, [href, router, pathname, onClick]);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
}
