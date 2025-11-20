import { generateMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

// 정책자금 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '2025년 정책자금 완벽 가이드 | 저금리 대출 + 지원금 ✓ 최신 정보',
    '2025년 최신 정책자금 완벽 가이드. 창업자금, 운영자금, 시설자금까지 저금리 대출정보. 중소기업 지원정책 전문가 상담 ☎0502-5550-8700',
    [
      '정책자금',
      '정책금융',
      '정책대출',
      '중소기업 정책자금',
      '창업 정책자금',
      '정책자금 신청',
      '정책자금 조건',
      '정책자금 금리',
      '저금리 대출',
      '정부지원 대출',
      '중소기업 지원금',
      '창업지원금',
      '운영자금 대출',
      '시설자금 대출',
      '창업자금 대출',
      '기술개발자금',
      '수출자금',
      '경영안정자금',
      '신보대출',
      '기보대출',
      '중진공 대출',
      '신용보증기금',
      '기술보증기금',
      '중소벤처기업진흥공단',
      'IBK기업은행',
      '우리은행 정책자금',
      '신한은행 정책자금',
      '하나은행 정책자금',
      'KB국민은행 정책자금',
      '2025년 정책자금',
      '정책자금 최신',
      '정책자금 변경사항',
      '정책자금 신규',
      '벤처기업 지원',
      '이노비즈 지원',
      '메인비즈 지원',
      '소상공인 지원',
      '서울 정책자금',
      '강남 정책자금',
      '중구 정책자금',
      '정책자금 컨설팅',
      '정책자금 전문가',
      '정책자금 상담',
      '정책자금 신청방법',
      '정책자금 서류',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function PolicyFundsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}