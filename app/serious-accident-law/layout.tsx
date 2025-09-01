import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

// 중대재해처벌법 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '중대재해처벌법 완벽 대응 가이드 | 경영진 처벌 예방 전략',
    '중대재해처벌법 완벽 대응 가이드. 안전관리체계 구축, 경영책임자 보험, 법적 리스크 완전 차단. 전문가 무료 진단으로 완벽한 준비를. 상담 문의 ☎0502-5550-8700',
    [
      '중대재해처벌법',
      '중대재해처벌법 대응',
      '중대재해처벌법 보험',
      '중대재해처벌법 가이드',
      '중대재해처벌법 완벽대응',
      '안전관리체계',
      '안전관리체계 구축',
      '경영책임자 처벌',
      '경영책임자 보험',
      '중대재해 예방',
      '중대재해 대비',
      '산업안전보건법',
      '중대재해 법적책임',
      '기업 안전관리',
      '중소기업 안전관리',
      '중대재해처벌법 컨설팅',
      '중대재해 리스크관리',
      '중대재해 법률대응',
      '중대재해 처벌 피해',
      '중대재해처벌법 준비',
      '중대재해 보험상품',
      '임원배상책임보험',
      'D&O 보험',
      '중대재해 변호사',
      '중대재해 전문가',
      '서울 중대재해 컨설팅',
      '강남 안전관리',
      '중구 기업안전',
      '중대재해처벌법 2022',
      '중대재해처벌법 시행',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function SeriousAccidentLawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}