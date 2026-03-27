import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IELTS Band 9 Samples | IELTS Wisdom',
    description: 'Study officially graded Band 8.0/9.0 IELTS writing samples, speaking model answers, and sample reading/listening passages. Learn from the best to improve your own score.',
    openGraph: {
        title: 'IELTS Band 9 Samples | IELTS Wisdom',
        description: 'Authentic IELTS Band 9 model answers and samples.',
    }
};

export default function SamplesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
