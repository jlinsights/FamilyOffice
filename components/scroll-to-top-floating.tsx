'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTopFloating() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const toggleVisibility = () => {
      // Show button when page is scrolled down 500px (더 아래에서 표시)
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Force a reflow to ensure proper positioning
    const button = document.querySelector('.scroll-to-top-floating-force');
    if (button) {
      // Force browser to recalculate position
      (button as HTMLElement).style.display = 'none';
      (button as HTMLElement).offsetHeight; // Trigger reflow
      (button as HTMLElement).style.display = 'block';
    }

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!mounted) return null;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`scroll-to-top-mobile group transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* 호버 시 나타나는 툴팁 텍스트 */}
      <div 
        className={`absolute bottom-20 right-0 bg-[#3B4455] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 transform ${
          isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        맨 위로
        {/* 말풍선 꼬리 */}
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#3B4455]"></div>
      </div>
      
      <Button
        size="lg"
        onClick={handleScrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: 999995 }}
        className={`
          relative overflow-hidden
          shadow-2xl hover:shadow-3xl 
          transition-all duration-500 ease-out
          bg-[#3B4455] hover:bg-[#2A3142]
          text-white 
          font-semibold 
                        rounded-full 
              w-14 h-14 md:w-16 md:h-16
          group-hover:scale-110 
          hover:rotate-[5deg]
          focus:outline-none focus:ring-4 focus:ring-[#3B4455]/30
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
        <ArrowUp 
          className={`
            h-6 w-6 md:h-7 md:w-7 
            transition-all duration-300 
            ${isHovered ? 'scale-110 -translate-y-1' : 'scale-100 translate-y-0'}
            drop-shadow-sm
          `} 
        />
      </Button>
      
      {/* 지속적인 맥동 효과를 위한 링 */}
      <div 
        className={`
          absolute inset-0 rounded-full 
          border-2 border-[#3B4455]/40 
          animate-pulse-ring
          pointer-events-none
        `}
      />
      
      {/* 두 번째 맥동 링 (딜레이 적용) */}
      <div 
        className={`
          absolute inset-0 rounded-full 
          border-2 border-[#3B4455]/20 
          animate-pulse-ring
          pointer-events-none
        `}
        style={{ animationDelay: '1s' }}
      />
      
      {/* 백그라운드 글로우 효과 */}
      <div 
        className={`
          absolute inset-0 rounded-full 
          bg-[#3B4455]/20 blur-xl
          transition-all duration-500
          pointer-events-none
          ${isHovered 
            ? 'scale-150 opacity-60' 
            : 'scale-100 opacity-30'
          }
        `}
      />
    </div>
  );
}