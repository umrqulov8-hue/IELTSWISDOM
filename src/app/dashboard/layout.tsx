import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | IELTS Wisdom",
    description: "Track your IELTS progress, complete lessons, and manage your practice tests in your personalized learning hub.",
    openGraph: {
        title: "Dashboard | IELTS Wisdom",
        description: "Track your IELTS progress and manage your lessons.",
    }
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
