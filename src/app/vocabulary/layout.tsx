import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IELTS Vocabulary Practice | IELTS Wisdom',
    description: 'Master 4000+ essential IELTS words with context-based passage practice from Cambridge IELTS and Trainer books. Improve your reading and writing score.',
    openGraph: {
        title: 'IELTS Vocabulary Practice | IELTS Wisdom',
        description: 'Context-based IELTS vocabulary training.',
    }
};

export default function VocabularyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
