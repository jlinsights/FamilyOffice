import type { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

// 채용 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '삼성생명 GFC 채용 | 기업재무컨설턴트 고수입 보장 ✓ 즉시지원',
    '삼성생명 GFC 채용 - 기업재무컨설턴트 위촉 모집. 연봉 상위 1% 고수입 보장, 가업승계 전문가 양성, 24개월 교육 시스템. 삼성생명 GFC 지원 문의 ☎0502-5550-8700',
    [
      '삼성생명 GFC 채용',
      '삼성생명 GFC 위촉',
      '삼성생명 GFC 모집',
      '삼성생명 GFC 연봉',
      '삼성생명 GFC 자격조건',
      '삼성생명 GFC 교육',
      'GFC 채용',
      'GFC 모집',
      'GFC 위촉',
      'GFC 자격조건',
      'GFC 연봉',
      'GFC 수입',
      'GFC 교육시스템',
      '기업재무컨설턴트 채용',
      '기업재무컨설턴트 위촉',
      '기업재무컨설턴트 연봉',
      '기업재무컨설턴트 자격',
      '삼성생명 잡페어',
      '삼성생명 채용',
      '삼성생명 컨설턴트',
      '패밀리오피스 전문가',
      '가업승계 컨설턴트',
      '가업승계 전문가',
      '자산관리 전문가',
      '세무 컨설턴트',
      '재무 컨설턴트',
      '보험 컨설턴트',
      '서울 GFC 채용',
      '강남 기업재무컨설턴트',
      '중구 금융컨설턴트',
    ]
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
