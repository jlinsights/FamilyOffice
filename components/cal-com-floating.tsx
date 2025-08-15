'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function CalComFloating() {
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    // Cal.com 플로팅 버튼을 더 간단하고 확실하게 생성
    const createFloatingButton = () => {
      // 기존 버튼이 있다면 제거
      const existingButton = document.getElementById('cal-floating-button');
      if (existingButton) {
        existingButton.remove();
      }

      // 플로팅 버튼 엘리먼트 생성
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'cal-floating-button';
      buttonContainer.style.cssText = `
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 999999 !important;
        font-family: system-ui, -apple-system, sans-serif !important;
        pointer-events: auto !important;
      `;

      const button = document.createElement('button');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
          <path d="M8 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.5 9.09H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.6947 13.7002H15.7037" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.6947 16.7002H15.7037" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.9955 13.7002H12.0045" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.9955 16.7002H12.0045" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.29431 13.7002H8.30329" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.29431 16.7002H8.30329" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        상담 예약
      `;

      button.style.cssText = `
        background-color: #3b82f6 !important;
        color: white !important;
        border: none !important;
        border-radius: 50px !important;
        padding: 12px 20px !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        white-space: nowrap !important;
      `;

      // 호버 효과
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
      });

      // 클릭 이벤트 with theme support
      button.addEventListener('click', () => {
        const isDark = resolvedTheme === 'dark';
        const calTheme = isDark ? 'dark' : 'light';
        const themeParams = `?theme=${calTheme}&bg=${isDark ? '1a1a1a' : 'ffffff'}&text=${isDark ? 'ffffff' : '000000'}`;
        window.open(`https://cal.com/familyoffice${themeParams}`, '_blank');
      });

      buttonContainer.appendChild(button);
      document.body.appendChild(buttonContainer);

      console.log('Cal.com 플로팅 버튼이 성공적으로 생성되었습니다.');
    };

    // 페이지 로드 완료 후 버튼 생성
    const timer = setTimeout(() => {
      createFloatingButton();
    }, 500);

    return () => {
      clearTimeout(timer);
      // 컴포넌트 언마운트 시 버튼 제거
      const button = document.getElementById('cal-floating-button');
      if (button) {
        button.remove();
      }
    };
  }, [resolvedTheme]); // Re-create button when theme changes

  return null;
}
