'use client';

import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalComPopup } from './cal-com-popup';

export function CalComFloatingSimple() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2147483647, // 최대 z-index 값
        width: '64px',
        height: '64px',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'auto',
        isolation: 'isolate',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 툴팁 */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          background: '#1f2937',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'all 300ms',
          pointerEvents: 'none',
          zIndex: 2147483647,
        }}
      >
        무료 상담 예약하기
        {/* 말풍선 꼬리 */}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '24px',
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '4px solid #1f2937',
          }}
        />
      </div>

      <CalComPopup
        trigger={
          <Button
            size="lg"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transform: isHovered
                ? 'scale(1.1) rotate(5deg)'
                : 'scale(1) rotate(0deg)',
              transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 2147483647,
              position: 'relative',
            }}
          >
            <Calendar
              size={28}
              style={{
                transform: isHovered
                  ? 'scale(1.1) rotate(12deg)'
                  : 'scale(1) rotate(0deg)',
                transition: 'all 300ms',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
              }}
            />
          </Button>
        }
        buttonText="무료 상담 예약"
        eventType="consultation"
        variant="default"
        size="lg"
      />

      {/* 맥동 효과 */}
      <div
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '50%',
          border: '2px solid rgba(59, 130, 246, 0.4)',
          animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '50%',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '1s',
          pointerEvents: 'none',
        }}
      />

      {/* 글로우 효과 */}
      <div
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.2)',
          filter: 'blur(12px)',
          transform: isHovered ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovered ? 0.6 : 0.3,
          transition: 'all 500ms',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </div>
  );
}
