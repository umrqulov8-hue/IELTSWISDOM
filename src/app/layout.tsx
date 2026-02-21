import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { AuthModal } from "@/components/AuthModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELTS Wisdom",
  description: "Master English with a Proven System. Interactive lessons, native speaker support, and structured curriculum.",
};

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <ModalProvider>
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
            <AuthModal />
            <Toaster position="top-center" richColors />
          </ModalProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

