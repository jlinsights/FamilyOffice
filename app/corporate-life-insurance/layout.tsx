import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

// 법인종신보험 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '법인종신보험 비교 분석 | 절세 효과 + 상품 비교 ✓ 2025년 최신',
    '법인종신보험 완벽 가이드. 법인세 절세, 퇴직금 대비, 상속세 절약 효과까지. 주요 보험사 상품 비교분석. 전문가 상담 ☎0502-5550-8700',
    [
      '법인종신보험',
      '법인보험',
      '기업보험',
      '법인종신보험 절세',
      '법인종신보험 비교',
      '법인종신보험 추천',
      '법인종신보험 혜택',
      '법인종신보험 상품',
      '기업종신보험',
      '법인세 절세보험',
      '법인보험 절세',
      '기업보험 절세',
      '퇴직금 법인보험',
      '임원퇴직보험',
      'CEO 보험',
      '임원보험',
      '법인 생명보험',
      '기업 생명보험',
      '법인보험 비교',
      '기업보험 비교',
      '법인종신 상품비교',
      '삼성생명 법인종신',
      '한화생명 법인종신',
      '교보생명 법인종신',
      'KB생명 법인종신',
      '신한생명 법인종신',
      '법인종신보험 세제혜택',
      '법인종신보험 수익률',
      '법인종신보험 해지환급금',
      '법인종신보험 가입조건',
      '법인종신보험 보험료',
      '법인종신보험 상속',
      '법인종신보험 증여',
      '법인보험 상속세',
      '법인보험 증여세',
      '서울 법인보험',
      '강남 법인보험',
      '중구 기업보험',
      '법인종신보험 상담',
      '법인보험 전문가',
      '기업보험 컨설팅',
      '2025년 법인보험',
      '법인종신보험 신상품',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function CorporateLifeInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}