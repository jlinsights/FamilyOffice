import type { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

// 단체보험 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '기업 단체보험 서비스 | 복리후생 + 절세 혜택 ✓ 임직원 만족도 UP',
    '기업 단체보험 완벽 가이드. 복리후생비 100% 손비처리, 임직원 만족도 향상, 절세 효과까지. 전 직원 보장 단체보험 상담 ☎0502-5550-8700',
    [
      '단체보험',
      '기업 단체보험',
      '회사 단체보험',
      '임직원 단체보험',
      '단체보험 서비스',
      '단체보험 상품',
      '단체보험 가입',
      '단체보험 혜택',
      '단체보험 비교',
      '단체보험 추천',
      '복리후생 보험',
      '복리후생비',
      '복리후생 제도',
      '임직원 복리후생',
      '기업 복리후생',
      '회사 복리후생',
      '단체상해보험',
      '단체건강보험',
      '단체생명보험',
      '단체암보험',
      '단체의료보험',
      '직장인 보험',
      '사원 보험',
      '임직원 보험',
      '기업보험',
      '회사보험',
      '단체보험 절세',
      '복리후생비 절세',
      '단체보험 세제혜택',
      '단체보험 손비처리',
      '삼성화재 단체보험',
      'DB손보 단체보험',
      '현대해상 단체보험',
      'KB손보 단체보험',
      '메리츠화재 단체보험',
      '단체보험 견적',
      '단체보험 설계',
      '단체보험 상담',
      '서울 단체보험',
      '강남 단체보험',
      '중구 단체보험',
      '단체보험 전문가',
      '단체보험 컨설팅',
      '2025년 단체보험',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
};

export default function GroupInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
