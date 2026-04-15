"use client";

import { usePathname, useRouter } from "next/navigation";
import { PAGE_ORDER, navigationState } from "@/lib/navigationState";

interface TransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Direction-aware link that sets navigation direction before routing.
 * ClientLayout uses this state to determine animation direction.
 */
export default function TransitionLink({
    href,
    children,
    className,
    style,
}: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent) => {
        // Only trigger for internal links on the same site
        if (href.startsWith("/") && href !== pathname) {
            e.preventDefault();

            // Calculate direction
            const fromIdx = PAGE_ORDER.indexOf(pathname);
            const toIdx = PAGE_ORDER.indexOf(href);

            const direction = 
                fromIdx === -1 || toIdx === -1
                    ? "forward"
                    : toIdx > fromIdx 
                        ? "forward" 
                        : "backward";

            // Update global state - ClientLayout will pick this up
            navigationState.direction = direction;

            // Simple route change - Framer Motion's AnimatePresence 
            // will detect the route change and handle the transition.
            router.push(href);
        }
    };

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
