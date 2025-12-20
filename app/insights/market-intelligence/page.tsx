import { redirect } from 'next/navigation';

/**
 * Market Intelligence 페이지는 /insights로 통합되었습니다.
 * SEO 중복 콘텐츠 문제 해결 및 사용자 경험 개선을 위해 리다이렉트 처리
 */
export default function MarketIntelligencePage() {
  redirect('/insights');
}
