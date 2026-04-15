// Pass-through — all page transition animation is handled by ClientLayout.tsx
// (AnimatePresence + CSS Grid stack keeps old and new pages simultaneously visible)
export default function Template({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
