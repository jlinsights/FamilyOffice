'use client';

import { useEffect } from 'react';

import Script from 'next/script';

// Kakao Pixel 글로벌 타입 정의
declare global {
  interface Window {
    kakaoPixel: any[];
  }
}

export interface KakaoPixelEvent {
  event_name:
    | 'PageView'
    | 'CompleteRegistration'
    | 'Purchase'
    | 'Contact'
    | 'Lead'
    | 'ViewContent';
  parameters: {
    content_category?:
      | 'consultation'
      | 'seminar'
      | 'newsletter'
      | 'calculator'
      | 'program';
    content_ids?: string[];
    value?: number;
    currency?: 'KRW';
    search_string?: string;
    page_title?: string;
    page_url?: string;
  };
}

interface KakaoPixelProps {
  pixelId: string;
  debug?: boolean;
}

export function KakaoPixel({ pixelId, debug = false }: KakaoPixelProps) {
  useEffect(() => {
    // Kakao Pixel 초기화
    if (typeof window !== 'undefined') {
      window.kakaoPixel = window.kakaoPixel || [];

      // 픽셀 초기화
      window.kakaoPixel.push(['init', pixelId]);

      // 자동 페이지뷰 추적
      window.kakaoPixel.push(['track', 'PageView']);
    }
  }, [pixelId, debug]);

  return (
    <Script
      id="kakao-pixel"
      strategy="afterInteractive"
      src="https://t1.kakaocdn.net/kakao_pixel/kakao_pixel.js"
    />
  );
}

// 이벤트 추적 함수들
export const kakaoPixelTrack = {
  // 기본 이벤트 추적
  track: (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.kakaoPixel) {
      window.kakaoPixel.push(['track', eventName, parameters]);
    }
  },

  // 페이지 조회
  pageView: (pageTitle?: string, contentCategory?: string) => {
    kakaoPixelTrack.track('PageView', {
      page_title: pageTitle || document.title,
      page_url: window.location.href,
      content_category: contentCategory,
    });
  },

  // 상담 문의
  contact: (source?: string, value?: number) => {
    kakaoPixelTrack.track('Contact', {
      content_category: 'consultation',
      value: value || 0,
      currency: 'KRW',
      source: source || 'website',
    });
  },

  // 리드 생성 (상담 예약, 뉴스레터 구독 등)
  lead: (type: 'consultation' | 'newsletter' | 'seminar', value?: number) => {
    kakaoPixelTrack.track('Lead', {
      content_category: type,
      value: value || 0,
      currency: 'KRW',
      content_ids: [type],
    });
  },

  // 회원가입/등록
  completeRegistration: (registrationType: string, value?: number) => {
    kakaoPixelTrack.track('CompleteRegistration', {
      content_category: 'registration',
      registration_type: registrationType,
      value: value || 0,
      currency: 'KRW',
    });
  },

  // 콘텐츠 조회 (연금계산기, 블로그 등)
  viewContent: (contentType: string, contentId?: string, value?: number) => {
    kakaoPixelTrack.track('ViewContent', {
      content_category: contentType,
      content_ids: contentId ? [contentId] : [],
      value: value || 0,
      currency: 'KRW',
    });
  },

  // 검색
  search: (searchTerm: string, category?: string) => {
    kakaoPixelTrack.track('Search', {
      search_string: searchTerm,
      content_category: category || 'general',
    });
  },

  // 커스텀 이벤트
  custom: (eventName: string, parameters: Record<string, any>) => {
    kakaoPixelTrack.track(eventName, parameters);
  },
};

// React Hook for tracking events
export function useKakaoPixel(pixelId?: string) {
  const track = (event: KakaoPixelEvent) => {
    if (typeof window !== 'undefined' && window.kakaoPixel) {
      window.kakaoPixel.push(['track', event.event_name, event.parameters]);
    }
  };

  const trackPageView = () => {
    track({
      event_name: 'PageView',
      parameters: {
        page_url: window.location.href,
        page_title: document.title,
      },
    });
  };

  const trackContact = (source?: string) => {
    track({
      event_name: 'Contact',
      parameters: {
        content_category: 'consultation',
        value: 0,
        currency: 'KRW',
      },
    });
  };

  const trackLead = (type: 'consultation' | 'newsletter' | 'seminar') => {
    track({
      event_name: 'Lead',
      parameters: {
        content_category: type,
        content_ids: [type],
        value: 0,
        currency: 'KRW',
      },
    });
  };

  return {
    track,
    trackPageView,
    trackContact,
    trackLead,
  };
}
