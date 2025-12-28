import type { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

// 위촉 페이지 SEO 최적화 메타데이터 - 50대+ 경력직 타겟
export const metadata: Metadata = {
  ...generateMetadata(
    '삼성생명 GFC 위촉 | 50대 경력직 환영 · 고소득 보장 · 비즈니스 파이프라인 구축',
    '삼성생명 GFC 위촉 - 50대 이상 경력직 환영. 풍부한 경험을 자산으로, 고소득 비즈니스 파이프라인을 구축하세요. 세컨드 커리어 최적화, 평생 수입원 마련. 전문가 상담 ☎0502-5550-8700',
    [
      // 핵심 브랜드 키워드
      '삼성생명 GFC 위촉',
      '삼성생명 GFC 채용',
      '삼성생명 GFC 모집',
      '삼성생명 기업재무컨설턴트',
      'GFC 위촉',
      'GFC 채용',
      '기업재무컨설턴트 위촉',
      
      // 50대+ 경력직 타겟 키워드
      '50대 재취업',
      '50대 경력직 채용',
      '50대 고소득 재취업',
      '50대 위촉직',
      '경력직 재취업',
      '경력직 위촉',
      '전직 임원 재취업',
      '사업가 재취업',
      '전문가 재취업',
      
      // 세컨드 커리어 키워드
      '세컨드 커리어',
      '경력 활용 직무',
      '나이 무관 채용',
      '경험 중시 채용',
      '시니어 전문직',
      
      // 비즈니스 파이프라인 키워드
      '비즈니스 파이프라인',
      '평생 수입원',
      '커미션 수입',
      '고소득 위촉직',
      '성과급 체계',
      '독립적 업무',
      
      // 금융업계 경력 키워드
      '금융업계 경력직',
      '보험업계 경력직',
      '금융 영업 전문가',
      '자산관리 경력직',
      
      // 지역 및 기타
      '서울 GFC 위촉',
      '강남 경력직 채용',
      '중구 금융컨설턴트',
      '은퇴 후 재취업',
      '전문가 네트워크',
    ],
    'https://familyoffices.vip/images/og-image-familyoffice-v2.png'
  ),
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
};

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
