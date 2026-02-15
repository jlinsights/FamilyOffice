'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  once = true,
  threshold = 0.2,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const getInitialProps = () => {
        switch (direction) {
          case 'up':
            return { y: 50, opacity: 0 };
          case 'down':
            return { y: -50, opacity: 0 };
          case 'left':
            return { x: 50, opacity: 0 };
          case 'right':
            return { x: -50, opacity: 0 };
          case 'none':
          default:
            return { opacity: 0 };
        }
      };

      gsap.fromTo(element.children, getInitialProps(), {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: `top ${100 - threshold * 100}%`,
          toggleActions: once ? 'play none none none' : 'play none none none',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
