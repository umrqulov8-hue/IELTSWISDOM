import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Full IELTS Mock Exams | IELTS Wisdom',
    description: 'Take authentic computer-delivered IELTS mock exams in a secure, full-screen environment. Get instant feedback and improve your score.',
    openGraph: {
        title: 'Full IELTS Mock Exams | IELTS Wisdom',
        description: 'Authentic IELTS simulation experience.',
    }
};

export default function MockExamsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
