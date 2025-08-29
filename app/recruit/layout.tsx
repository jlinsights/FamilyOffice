import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

// 채용 페이지 SEO 최적화 메타데이터
export const metadata: Metadata = {
  ...generateMetadata(
    '삼성생명 GFC 채용 | 기업재무컨설턴트 위촉 모집',
    '삼성생명 GFC(기업재무컨설턴트) 채용. 가업승계, 패밀리오피스 전문가 위쇼 모집. 높은 수입, 체계적 교육, 전문 브랜드 지원. 잡페어 참가 문의 ☎0502-5550-8700',
    [
      '삼성생명 GFC 채용',
      '삼성생명 GFC 위쇼',
      '삼성생명 GFC 모집',
      '삼성생명 잡페어',
      '기업재무컨설턴트 채용',
      'GFC 자격조건',
      'GFC 연봉',
      'GFC 수입',
      '삼성생명 FP',
      '삼성생명 GWP',
      '보험설계사 채용',
      '자산관리사 채용',
      '재무설계사 채용',
      '삼성생명 영업직',
      '삼성생명 컨설턴트',
      '패밀리오피스 전문가',
      '가업승계 컨설턴트',
      '서울 보험설계사',
      '강남 자산관리사',
      '중구 재무설계사',
    ]
  ),
  // 파비콘 및 앱 아이콘 설정 (메인 레이아웃과 동일하게)
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: { url: '/apple-touch-icon.png' }
  },
  manifest: '/site.webmanifest'
};

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}