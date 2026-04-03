"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor, Settings2, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeBurger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Sync state with actual fullscreen status
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Esc (note: Esc also exits fullscreen natively)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    setIsOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Burger Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "relative w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300",
          isOpen
            ? "bg-slate-100 dark:bg-slate-800"
            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
        )}
        aria-label="Settings Menu"
      >
        <div className="flex flex-col gap-1.5 w-5 h-5 items-center justify-center relative">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{ marginBottom: "-2px" }}
            className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{ marginTop: "-2px" }}
            className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full origin-center"
          />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 mt-3 w-72 rounded-[1.5rem] bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-[9999]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2D3E50] dark:bg-blue-500/20 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-white dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Preferences</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Customize your exam experience
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Theme Selector */}
              <div className="space-y-3">
                <p className="px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Interface Theme
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light", icon: Sun, label: "Light" },
                    { id: "dark", icon: Moon, label: "Dark" },
                    { id: "system", icon: Monitor, label: "System" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200",
                        theme === item.id
                          ? "bg-[#2D3E50] border-transparent text-white shadow-lg shadow-[#2D3E50]/20 scale-[1.02]"
                          : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fullscreen Toggle */}
              <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4">
                <button
                  onClick={toggleFullscreen}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isFullscreen
                        ? "bg-emerald-100 dark:bg-emerald-500/20"
                        : "bg-slate-100 dark:bg-slate-700/50"
                    )}>
                      {isFullscreen
                        ? <Minimize className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        : <Maximize className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      }
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {isFullscreen ? "Exit Fullscreen" : "Full Interface"}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {isFullscreen ? "Press Esc to exit" : "Hide browser chrome"}
                      </span>
                    </div>
                  </div>
                  {/* State indicator */}
                  <div className={cn(
                    "w-9 h-5 rounded-full relative transition-colors duration-300",
                    isFullscreen ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
                  )}>
                    <div className={cn(
                      "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
                      isFullscreen ? "left-[18px]" : "left-0.5"
                    )} />
                  </div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/60">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium italic">
                Pro tip: Press{" "}
                <kbd className="font-sans px-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm">
                  Esc
                </kbd>{" "}
                to exit fullscreen
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
