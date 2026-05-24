import { NavigationItem } from '@/types/globals';

// 네비게이션 메뉴 데이터
// 네비게이션 메뉴 데이터
export const NAVIGATION_ITEMS: NavigationItem[] = [
  // { href: '/about', label: '소개' },
  { href: '/membership', label: '멤버십' },
  {
    href: '/solution-finder',
    label: '서비스',
    submenu: [
      { href: '/program', label: '프로그램' },
      { href: '/solution-finder', label: '솔루션 파인더' },
      { href: '/calculators', label: '계산기' },
    ],
  },
  { href: '/insights', label: '인사이트' },
  { href: '/seminar', label: '세미나' },
  { href: '/shop', label: 'SHOP', requireAuth: true },
  { href: '/recruit', label: '채용' },
  // { href: '/stories', label: '케이스/스토리' }, // [미완성] 추후 오픈
  // 상담신청 메뉴 삭제 (2026-05-24) — 헤더의 ClipboardCheck CTA 버튼으로 진입점 단일화
];

// 위 4개 메뉴는 미완성 상태이므로 주석 처리하여 숨깁니다.
// 추후 완성 시 주석을 해제하면 바로 노출됩니다.

// 애플리케이션 메타데이터
export const APP_CONFIG = {
  name: '패밀리오피스 VIP',
  description: '대한민국 상위 1% 자산가를 위한 맞춤형 자산관리 솔루션',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://familyoffice-vip.com',
  keywords: '패밀리오피스, 자산관리, 상속, 증여, 세무, 법률, 부동산, 가업승계',
  contact: {
    phone: '☎︎ 0502-5550-8700',
    phoneNumber: '0502-5550-8700',
    email: 'info@familyoffices.vip',
    address: '서울 중구 세종대로 73(태평로2가 310) 태평로빌딩 10층',
    businessHours: '평일 09:00 - 18:00',
  },
} as const;

// 상담 결제 (1회성, VAT 포함)
export const CONSULTATION_FEE = 330_000 as const;

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
