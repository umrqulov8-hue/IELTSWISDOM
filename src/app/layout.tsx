import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ClientLayout } from "@/components/ClientLayout";
import { AuthProvider } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from 'sonner';


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
  metadataBase: new URL('https://ieltswisdom.com'),
  title: {
    default: "IELTS Wisdom - Master English at Scale",
    template: "%s | IELTS Wisdom"
  },
  description: "Create, maintain, and scale your IELTS preparation with our comprehensive platform. AI-powered evaluations, structured curriculum, and native support.",
  keywords: ["IELTS", "English Learning", "SaaS", "Design System", "AI Evaluator"],
  authors: [{ name: "IELTS Wisdom Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieltswisdom.com",
    siteName: "IELTS Wisdom",
    images: [
      {
        url: "https://s3-alpha.figma.com/hub/file/2251959376041554426/5e13e50d-113c-4fb0-941d-e9c67ec41b37-cover.png",
        width: 1200,
        height: 630,
        alt: "IELTS Wisdom - Master English"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Wisdom - Design System SaaS",
    description: "Master English with a Proven System.",
    images: ["https://s3-alpha.figma.com/hub/file/2251959376041554426/5e13e50d-113c-4fb0-941d-e9c67ec41b37-cover.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>

        {/* Apply saved font size BEFORE first paint to prevent layout flash */}
        <Script
          id="font-size-setter"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
             __html: `(function(){try{var s=localStorage.getItem('ielts-font-size');if(s==='small')document.documentElement.style.fontSize='14px';else if(s==='large')document.documentElement.style.fontSize='18px';else document.documentElement.style.fontSize='16px';}catch(e){}})();`,
          }}
        />
        {/* Preconnect to external assets if needed */}
        <link rel="preconnect" href="https://azrmwfzrgdvkbzezwyfo.supabase.co" />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LanguageProvider>
              <SubscriptionProvider>
                <ModalProvider>
                  <ErrorBoundary>
                    <ClientLayout>
                      {children}
                    </ClientLayout>
                  </ErrorBoundary>
                  <Toaster position="top-center" richColors />
                </ModalProvider>
              </SubscriptionProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
