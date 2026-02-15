'use client';

import { useEffect } from 'react';
import { kakaoPixelTrack } from './kakao-pixel';

export function ContactPageTracking() {
  useEffect(() => {
    // 페이지 조회 추적
    kakaoPixelTrack.pageView('상담 신청 페이지', 'consultation');

    // 컨텐츠 조회 추적 - 상담 페이지 전용
    kakaoPixelTrack.viewContent('consultation', 'contact-page', 100000);
  }, []);

  useEffect(() => {
    // 전화 클릭 추적
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    const handlePhoneClick = () => {
      kakaoPixelTrack.contact('phone', 50000);
    };

    phoneLinks.forEach(link => {
      link.addEventListener('click', handlePhoneClick);
    });

    // Cal.com 상담 예약 완료 추적 (Cal.com embed 이벤트 리스닝)
    const handleCalComBooking = (event: MessageEvent) => {
      if (
        event.data?.type === 'cal.com' &&
        event.data?.event === 'booking-completed'
      ) {
        kakaoPixelTrack.lead('consultation', 200000);
      }
    };

    window.addEventListener('message', handleCalComBooking);

    // Cleanup
    return () => {
      phoneLinks.forEach(link => {
        link.removeEventListener('click', handlePhoneClick);
      });
      window.removeEventListener('message', handleCalComBooking);
    };
  }, []);

  return null; // 이 컴포넌트는 시각적으로 렌더링되지 않음
}
