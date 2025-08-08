'use client';

import { useEffect } from 'react';

export function CalComFloating() {
  useEffect(() => {
    // Cal.com 플로팅 버튼 스크립트 로드
    const loadCalFloatingScript = () => {
      if (typeof window === 'undefined') return;

      // 기존 스크립트가 있으면 제거
      const existingScript = document.querySelector('script[src*="cal.com/embed"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        // 스크립트 로드 후 Cal 객체가 생성될 때까지 대기
        const initCal = () => {
          if ((window as any).Cal) {
            try {
              // Cal.com 초기화
              (window as any).Cal('init', {
                origin: 'https://cal.com',
              });

              // 플로팅 버튼 추가
              (window as any).Cal('floatingButton', {
                calLink: 'familyoffice/consultation',
                buttonPosition: 'bottom-right',
                buttonText: '상담 예약',
                buttonColor: '#3b82f6',
                hideButtonIcon: false,
              });
            } catch (error) {
              console.error('Cal.com 초기화 오류:', error);
            }
          } else {
            // Cal 객체가 아직 없으면 100ms 후 재시도
            setTimeout(initCal, 100);
          }
        };

        initCal();
      };
      
      script.onerror = () => {
        console.error('Cal.com 스크립트 로드 실패');
      };

      document.head.appendChild(script);
    };

    // 컴포넌트가 마운트된 후 약간의 지연을 두고 실행
    const timer = setTimeout(loadCalFloatingScript, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
