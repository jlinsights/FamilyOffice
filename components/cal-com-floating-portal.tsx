'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { CalComFloating } from './cal-com-floating';

export function CalComFloatingPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 버튼이 확실히 렌더링되도록 강제 리플로우
    const forceReflow = () => {
      const button = document.querySelector('.cal-com-floating-force');
      if (button) {
        const rect = button.getBoundingClientRect();
        console.log('Floating button position:', rect);
      }
    };

    // DOM이 완전히 로드된 후 위치 확인
    setTimeout(forceReflow, 100);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // SSR 방지
  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  // document.body에 직접 포털로 렌더링
  return createPortal(
    <CalComFloating />,
    document.body
  );
}