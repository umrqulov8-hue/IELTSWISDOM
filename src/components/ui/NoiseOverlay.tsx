"use client";

import React from "react";

export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.015] mix-blend-soft-light overflow-hidden">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            numOctaves="2" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
