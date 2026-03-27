import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IELTS AI Assistant | IELTS Wisdom',
    description: 'Get instant feedback on your IELTS writing and speaking, check your band score, and get personalized improvement tips from our AI tutor.',
    openGraph: {
        title: 'IELTS AI Assistant | IELTS Wisdom',
        description: 'Instant IELTS feedback and band score estimation.',
    }
};

export default function AICheckLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
