"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeBurger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      <label className="burger" htmlFor="burger">
        <input 
          type="checkbox" 
          id="burger" 
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>

      <style jsx>{`
        .burger {
          position: relative;
          width: 32px;
          height: 24px;
          background: transparent;
          cursor: pointer;
          display: block;
          transform: scale(0.7); /* Scale down a bit to fit header */
        }

        .burger input {
          display: none;
        }

        .burger span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: currentColor; /* Use current text color for theme compatibility */
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }

        .burger span:nth-of-type(1) {
          top: 0px;
          transform-origin: left center;
        }

        .burger span:nth-of-type(2) {
          top: 50%;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .burger span:nth-of-type(3) {
          top: 100%;
          transform-origin: left center;
          transform: translateY(-100%);
        }

        .burger input:checked ~ span:nth-of-type(1) {
          transform: rotate(45deg);
          top: -2px;
          left: 4px;
        }

        .burger input:checked ~ span:nth-of-type(2) {
          width: 0%;
          opacity: 0;
        }

        .burger input:checked ~ span:nth-of-type(3) {
          transform: rotate(-45deg);
          top: 24px;
          left: 4px;
        }
      `}</style>
    </div>
  );
}
