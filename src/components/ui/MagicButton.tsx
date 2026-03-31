"use client";

import React from 'react';
import './magic-button.css';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isLoading?: boolean;
  text1?: string;
  variant?: "primary" | "secondary";
}

export const MagicButton: React.FC<MagicButtonProps> = ({ 
  onClick, 
  isLoading, 
  text1 = "Start Free",
  variant = "primary",
  className,
  ...props 
}) => {
  return (
    <button 
      className={`magic-button dark:bg-white dark:text-slate-900 dark:border-white ${variant === 'secondary' ? 'variant-secondary' : ''} ${className || ''}`} 
      onClick={onClick} 
      disabled={isLoading} 
      {...props}
    >
      {text1}
      <div className="star-1">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
      <div className="star-2">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
      <div className="star-3">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
      <div className="star-4">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
      <div className="star-5">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
      <div className="star-6">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", fillRule:"evenodd", clipRule:"evenodd"}} viewBox="0 0 784.11 815.53">
          <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
        </svg>
      </div>
    </button>
  );
};
