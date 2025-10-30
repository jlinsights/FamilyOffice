import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Enhanced cn function for Aceternity UI
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function for generating random values
export const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Color utilities for Aceternity effects
export const colors = [
  "#ffbe0b",
  "#fb5607", 
  "#ff006e",
  "#8338ec",
  "#3a86ff",
];

// Generate gradient string for backgrounds
export const generateGradient = (colors: string[]) => {
  return `linear-gradient(45deg, ${colors.join(", ")})`;
};

// Utility for creating SVG patterns
export const createPattern = (id: string, children: string) => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <defs>
        <pattern id="${id}" patternUnits="userSpaceOnUse" width="60" height="60">
          ${children}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#${id})" />
    </svg>
  `)}`;
};

// Mouse position tracking utility
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
};

// Animation delay utility
export const getAnimationDelay = (index: number, baseDelay: number = 0.1) => {
  return `${index * baseDelay}s`;
};

// Generate dots pattern for backgrounds
export const generateDotPattern = (size: number = 20, color: string = "#000000", opacity: number = 0.1) => {
  return createPattern("dots", `
    <circle cx="10" cy="10" r="1.5" fill="${color}" opacity="${opacity}" />
  `);
};

// Generate grid pattern for backgrounds
export const generateGridPattern = (size: number = 20, color: string = "#000000", opacity: number = 0.1) => {
  return createPattern("grid", `
    <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}" />
  `);
};

// Shimmer effect utility
export const getShimmerGradient = (direction: string = "to right") => {
  return `linear-gradient(${direction}, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`;
};

// Text gradient utility
export const getTextGradient = (colors: string[]) => {
  return {
    background: generateGradient(colors),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
};

// Perspective card utilities
export const getCardTransform = (x: number, y: number, rect: DOMRect) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

// Noise texture utility (for subtle backgrounds)
export const generateNoiseTexture = () => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  canvas.width = 100;
  canvas.height = 100;
  
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise;     // red
    data[i + 1] = noise; // green
    data[i + 2] = noise; // blue
    data[i + 3] = 25;    // alpha (low opacity)
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};