import { redirect } from 'next/navigation';

/**
 * /insights/market-intelligence/[slug] 경로는 /insights/[slug]로 통합되었습니다.
 * SEO 중복 콘텐츠 문제 해결 및 사용자 경험 개선을 위해 리다이렉트 처리
 */
export default async function MarketIntelligenceSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/insights/${slug}`);
}
