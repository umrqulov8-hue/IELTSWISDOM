import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Premium IELTS Study Materials | IELTS Wisdom',
    description: 'Download exclusive IELTS e-books, grammar guides, practice worksheets, and audio drills. Authentic resources designed to help you reach Band 7.0+.',
    openGraph: {
        title: 'Premium IELTS Study Materials | IELTS Wisdom',
        description: 'Downloadable IELTS resources and study guides.',
    }
};

export default function MaterialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
