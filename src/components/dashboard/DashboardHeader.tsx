"use client";

import { useLanguage } from "@/context/LanguageContext";
import { memo } from "react";

interface DashboardHeaderProps {
    title?: string;
    description?: string;
    showGreeting?: boolean;
    displayName?: string;
}

export const DashboardHeader = memo(({ title, description, showGreeting, displayName }: DashboardHeaderProps) => {
    const { lang } = useLanguage();

    return (
        <header className="flex justify-between items-center mb-10 z-50 relative min-h-[4rem]">
            <div>
                {showGreeting ? (
                    <div className="opacity-0 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">
                            {lang === "en" ? "Welcome back, " : "Xush kelibsiz, "} 
                            <span className="text-[#FF8C00] drop-shadow-sm">{displayName}</span>!
                        </h1>
                        <p className="text-slate-700 dark:text-slate-300 mt-2 font-medium transition-colors">
                            {lang === "en" ? "Ready to hit your targets today?" : "Bugun maqsadlaringizga erishishga tayyormisiz?"}
                        </p>
                    </div>
                ) : (
                    <div className="opacity-0 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-slate-700 dark:text-slate-300 mt-2 font-medium transition-colors">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
            
            {/* NOTE: The Search Box and Notification Bell features were intentionally removed here
                to streamline the user experience and avoid deep z-index layer conflicts on complex pages. */}
        </header>
    );
});
