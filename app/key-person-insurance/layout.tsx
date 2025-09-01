import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

// 경영인정기보험 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '경영인정기보험 완벽 가이드 | CEO 전용 보험 상품 비교 ✓ 절세 혜택',
    '경영인정기보험 완벽 가이드. CEO·핵심임직원 전용 보험, 퇴직금·상속세 절세, 연금보험 전환 혜택. 삼성생명 GFC 전문가 상담 ☎0502-5550-8700',
    [
      '경영인정기보험',
      'CEO 전용보험',
      '임원 전용보험',
      '핵심인재 보험',
      '경영인보험',
      '임원퇴직보험',
      'CEO 연금보험',
      '임원연금',
      '퇴직급여 보험',
      '상속세 절세보험',
      '증여세 절세',
      '경영진 보험',
      '핵심임직원 보험',
      'CEO 절세상품',
      '임원 절세보험',
      '경영자보험',
      '기업임원보험',
      '법인세 절세',
      '소득세 절세',
      '연금보험 전환',
      '퇴직연금 대안',
      '임원 상속설계',
      'CEO 자산관리',
      '삼성생명 경영인정기',
      '한화생명 CEO보험',
      '교보생명 임원보험',
      'KB생명 경영자보험',
      '신한생명 CEO상품',
      '서울 CEO 보험',
      '강남 임원보험',
      '중구 경영자보험',
      '경영인정기보험 비교',
      '경영인정기보험 혜택',
      '경영인정기보험 세제혜택',
      '경영인정기보험 추천',
      '경영인정기보험 상담',
      '경영인정기보험 가입조건',
      '경영인정기보험 수익률',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function KeyPersonInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}