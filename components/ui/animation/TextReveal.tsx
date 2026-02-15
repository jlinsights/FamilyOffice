'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  type?: 'char' | 'word' | 'line';
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function TextReveal({
  children,
  className,
  type = 'word',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text logic
  const splitText = () => {
    switch (type) {
      case 'char':
        return children.split('').map((char, i) => (
          <span key={i} className="inline-block select-none">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ));
      case 'word':
        return children.split(' ').map((word, i) => (
          <span key={i} className="inline-block mr-[0.2em]">
            {word}
          </span>
        ));
      case 'line':
      default:
        // Simple simulation of line splitting (wrapping in span)
        return <span className="inline-block">{children}</span>;
    }
  };

  useGSAP(
    () => {
      const elements = containerRef.current?.children;
      if (!elements) return;

      gsap.from(elements, {
        y: 20,
        opacity: 0,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      aria-label={children}
    >
      {splitText()}
    </div>
  );
}
