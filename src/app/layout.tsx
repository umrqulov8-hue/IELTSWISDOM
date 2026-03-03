import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { AuthModal } from "@/components/AuthModal";
import { LanguageProvider } from "@/context/LanguageContext";
import { ClientLayout } from "@/components/ClientLayout";
import { AuthProvider } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",   // prevents invisible text while font loads
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "IELTS Wisdom | Master IELTS with Confidence",
    template: "%s | IELTS Wisdom"
  },
  description: "Master English with a Proven System. Interactive lessons, native speaker support, and structured curriculum designed by experts.",
  keywords: ["IELTS", "English Learning", "IELTS Preparation", "IELTS Practice", "English Course"],
  authors: [{ name: "IELTS Wisdom Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieltswisdom.com",
    siteName: "IELTS Wisdom",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IELTS Wisdom - Master English"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Wisdom",
    description: "Master English with a Proven System.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external origins — reduces critical path latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://azrmwfzrgdvkbzezwyfo.supabase.co" />
        <link rel="dns-prefetch" href="https://azrmwfzrgdvkbzezwyfo.supabase.co" />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <LanguageProvider>
            <SubscriptionProvider>
              <ModalProvider>
                <ErrorBoundary>
                  <ClientLayout>
                    {children}
                  </ClientLayout>
                </ErrorBoundary>
                <AuthModal />
                <Toaster position="top-center" richColors />
              </ModalProvider>
            </SubscriptionProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
