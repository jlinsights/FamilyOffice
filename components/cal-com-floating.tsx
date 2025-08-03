'use client';

import { useEffect } from 'react';

export function CalComFloating() {
  useEffect(() => {
    // Cal.com 플로팅 버튼 스크립트 로드
    const loadCalFloatingScript = () => {
      if (typeof window === 'undefined' || (window as any).Cal) return;

      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).Cal) {
          (window as any)
            .Cal('init', {
              origin: 'https://cal.com',
            })(
              // 플로팅 버튼 추가
              window as any
            )
            .Cal('floatingButton', {
              calLink: 'familyoffice/consultation',
              buttonPosition: 'bottom-right',
              buttonText: '상담 예약',
              buttonColor: '#c9a961',
            });
        }
      };
      document.head.appendChild(script);
    };

    loadCalFloatingScript();
  }, []);

  return null;
}
