import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { AuthModal } from "@/components/AuthModal";
import { LanguageProvider } from "@/context/LanguageContext";
import { ClientLayout } from "@/components/ClientLayout";
import { AuthProvider } from "@/context/AuthContext";
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
  title: "IELTS Wisdom",
  description: "Master English with a Proven System. Interactive lessons, native speaker support, and structured curriculum.",
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
            <ModalProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
              <AuthModal />
              <Toaster position="top-center" richColors />
            </ModalProvider>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
