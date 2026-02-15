'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function KakaoFloating() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force a reflow to ensure proper positioning
    const button = document.querySelector('.kakao-floating-force');
    if (button) {
      // Force browser to recalculate position
      (button as HTMLElement).style.display = 'none';
      (button as HTMLElement).offsetHeight; // Trigger reflow
      (button as HTMLElement).style.display = 'block';
    }
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    // Kakao SDK가 초기화되어 있으면 채널 채팅 사용
    if (typeof window !== 'undefined' && window.Kakao?.Channel) {
      try {
        window.Kakao.Channel.chat({
          channelPublicId: '_gsxkxdG',
        });
      } catch (error) {
        // SDK 채팅 실패 시 기존 방식으로 대체
        console.warn('카카오 채널 채팅 실패, 브라우저 링크로 대체:', error);
        window.open(
          'http://pf.kakao.com/_gsxkxdG',
          '_blank',
          'noopener,noreferrer'
        );
      }
    } else {
      // SDK가 없으면 기존 방식 사용
      window.open(
        'http://pf.kakao.com/_gsxkxdG',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div
      className="kakao-floating-force group"
      style={{
        zIndex: 999998,
        position: 'fixed',
        bottom: '24px',
        right: '104px', // 24px (margin) + 64px (cal button width) + 16px (spacing)
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
        className={`absolute bottom-20 right-0 bg-[#FEE500] text-[#3C1E1E] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 transform ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        카카오톡 상담하기
        {/* 말풍선 꼬리 */}
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FEE500]"></div>
      </div>

      <Button
        size="lg"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: 999998 }}
        className={`
          relative overflow-hidden
          shadow-2xl hover:shadow-3xl 
          transition-all duration-500 ease-out
          bg-[#FEE500] hover:bg-[#FDD835]
          text-[#3C1E1E] 
          font-semibold 
          rounded-full 
          w-16 h-16
          group-hover:scale-110 
          hover:rotate-[5deg]
          focus:outline-none focus:ring-4 focus:ring-[#FEE500]/30
          active:scale-95
          before:absolute before:inset-0 
          before:bg-white/10 before:rounded-full 
          before:opacity-0 before:transition-opacity before:duration-300
          hover:before:opacity-100
          after:absolute after:inset-0 
          after:bg-gradient-to-tr after:from-transparent after:via-white/5 after:to-white/10
          after:rounded-full after:pointer-events-none
          border-0
        `}
      >
        <Image
          src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
          alt="카카오톡"
          width={28}
          height={28}
          className={`
            transition-all duration-300 
            ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
            drop-shadow-sm
          `}
        />
      </Button>

      {/* 지속적인 맥동 효과를 위한 링 */}
      <div
        className={`
          absolute inset-0 rounded-full 
          border-2 border-[#FEE500]/40 
          animate-pulse-ring
          pointer-events-none
        `}
      />

      {/* 두 번째 맥동 링 (딜레이 적용) */}
      <div
        className={`
          absolute inset-0 rounded-full 
          border-2 border-[#FEE500]/20 
          animate-pulse-ring
          pointer-events-none
        `}
        style={{ animationDelay: '1s' }}
      />

      {/* 백그라운드 글로우 효과 */}
      <div
        className={`
          absolute inset-0 rounded-full 
          bg-[#FEE500]/20 blur-xl
          transition-all duration-500
          pointer-events-none
          ${isHovered ? 'scale-150 opacity-60' : 'scale-100 opacity-30'}
        `}
      />
    </div>
  );
}
