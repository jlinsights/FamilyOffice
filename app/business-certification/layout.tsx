import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

// 기업인증 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '2025년 기업인증 완벽 가이드 | 벤처/이노비즈/메인비즈 인증 ✓ 혜택 총정리',
    '2025년 최신 기업인증 완벽 가이드. 벤처기업 인증, 이노비즈 인증, 메인비즈 인증까지 혜택과 신청방법. 기업인증 전문가 상담 ☎0502-5550-8700',
    [
      '기업인증',
      '벤처기업 인증',
      '이노비즈 인증',
      '메인비즈 인증',
      'K-StartUp 인증',
      '소부장 기업 인증',
      '녹색인증기업',
      '여성기업 인증',
      '사회적기업 인증',
      '기업인증 혜택',
      '기업인증 신청',
      '기업인증 조건',
      '기업인증 절차',
      '벤처기업 확인',
      '이노비즈 신청',
      '메인비즈 신청',
      '벤처투자',
      '연구개발',
      '기술혁신',
      '벤처캐피탈',
      'R&D 지원',
      '세제혜택',
      '금융지원',
      '정책자금',
      '신용보증',
      '벤처투자 유치',
      '스타트업 지원',
      '중소기업 지원',
      '기술기업',
      '혁신기업',
      '성장기업',
      '스케일업',
      '유니콘',
      '벤처생태계',
      '기업가정신',
      '창업지원',
      '성장지원',
      '2025년 기업인증',
      '기업인증 최신',
      '기업인증 변경사항',
      '기업인증 신규',
      '기업인증 갱신',
      '기업인증 유지',
      '서울 기업인증',
      '강남 기업인증',
      '중구 기업인증',
      '기업인증 컨설팅',
      '기업인증 전문가',
      '기업인증 상담',
      '기업인증 대행',
      '기업인증 서류',
      '기업인증 준비',
      '기업인증 성공',
      '벤처확인 기준',
      '이노비즈 요건',
      '메인비즈 조건',
      '기술평가',
      '기업평가',
      '성장성 평가',
      '혁신성 평가',
    ],
    undefined,
    '전문가급',
    '성장기',
    'commercial',
    '/business-certification'
  ),
  // 파비콘 및 앱 아이콘 설정
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
};

export default function BusinessCertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
