'use client';

import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CalComPopup } from './cal-com-popup';

/**
 * Floating Cal.com booking widget positioned at bottom-right of screen.
 * Provides quick access to consultation booking across all pages.
 *
 * Features:
 * - Responsive hover animations
 * - Korean timezone optimization
 * - Anti-flicker mounting strategy
 * - High z-index for overlay positioning
 *
 * @example
 * ```tsx
 * <CalComFloating />
 * ```
 *
 * @returns Fixed-position floating booking button
 */
export function CalComFloating() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force a reflow to ensure proper positioning
    const button = document.querySelector('.cal-com-floating-force');
    if (button) {
      // Force browser to recalculate position
      (button as HTMLElement).style.display = 'none';
      (button as HTMLElement).offsetHeight; // Trigger reflow
      (button as HTMLElement).style.display = 'block';
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="cal-com-floating-force group"
      style={{
        zIndex: 999999,
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        pointerEvents: 'auto',
        // Force rendering context
        transform: 'translateZ(0)',
        willChange: 'transform',
        // Ensure it's not affected by parent transforms
        containIntrinsicSize: 'auto',
        contain: 'layout style',
      }}
    >
      {/* 호버 시 나타나는 툴팁 텍스트 */}
      <div
        className={`absolute bottom-20 right-0 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 transform ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        무료 상담 예약하기
        {/* 말풍선 꼬리 */}
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
      </div>

      <CalComPopup
        trigger={
          <Button
            size="lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ zIndex: 999999 }}
            className={`
              relative overflow-hidden
              shadow-2xl hover:shadow-3xl 
              transition-all duration-500 ease-out
              bg-gradient-to-br from-primary via-primary to-primary/80 
              hover:from-primary/90 hover:via-primary hover:to-primary/70
              text-primary-foreground 
              font-semibold 
              rounded-full 
              w-16 h-16
              group-hover:scale-110 
              hover:rotate-[5deg]
              focus:outline-none focus:ring-4 focus:ring-primary/30
              active:scale-95
              before:absolute before:inset-0 
              before:bg-white/10 before:rounded-full 
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100
              after:absolute after:inset-0 
              after:bg-gradient-to-tr after:from-transparent after:via-white/5 after:to-white/10
              after:rounded-full after:pointer-events-none
            `}
          >
            <Calendar
              className={`
                h-7 w-7 
                transition-all duration-300 
                ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                drop-shadow-sm
              `}
            />
          </Button>
        }
        buttonText="무료 상담 예약"
        eventType="consultation"
        variant="default"
        size="lg"
      />

      {/* 지속적인 맥동 효과를 위한 링 */}
      <div
        className={`
          absolute inset-0 rounded-full 
          border-2 border-primary/40 
          animate-pulse-ring
          pointer-events-none
        `}
      />

      {/* 두 번째 맥동 링 (딜레이 적용) */}
      <div
        className={`
          absolute inset-0 rounded-full 
          border-2 border-primary/20 
          animate-pulse-ring
          pointer-events-none
        `}
        style={{ animationDelay: '1s' }}
      />

      {/* 백그라운드 글로우 효과 */}
      <div
        className={`
          absolute inset-0 rounded-full 
          bg-primary/20 blur-xl
          transition-all duration-500
          pointer-events-none
          ${isHovered ? 'scale-150 opacity-60' : 'scale-100 opacity-30'}
        `}
      />
    </div>
  );
}
