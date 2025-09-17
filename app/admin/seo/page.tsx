/**
 * 관리자 SEO 대시보드
 * 인바운드 마케팅 자동화 및 성과 모니터링
 */

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { InboundMarketingDashboard } from '@/components/seo/inbound-marketing-dashboard';
import { ContentOptimizer } from '@/components/seo/content-optimizer';
import { SEOTrackerInit } from '@/components/seo/seo-tracker-init';

export const metadata: Metadata = {
  title: 'SEO 대시보드 | FamilyOffice S 관리자',
  description: '인바운드 마케팅 자동화 및 SEO 성과 모니터링 대시보드',
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminSEOPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // 관리자 권한 확인
  const user = await auth();
  const userEmail = user.sessionClaims?.email as string;
  
  if (userEmail !== 'jhlim725@gmail.com') {
    redirect('/');
  }

  // 실제 운영에서는 데이터베이스나 API에서 메트릭 데이터를 가져옴
  const mockMetrics = {
    period: '2024-09',
    organicTraffic: 15680,
    keywordRankings: {
      '패밀리오피스': 2,
      '자산관리서비스': 5,
      '기업승계': 3,
      '세무최적화': 8,
      '프라이빗뱅킹': 12,
      '가업승계': 4,
      '포트폴리오관리': 15,
      '고액자산가': 6
    },
    conversionRate: 3.4,
    leadGeneration: 28,
    contentEngagement: {
      averageTimeOnPage: 285,
      bounceRate: 38,
      pagesPerSession: 4.1
    },
    roi: 420
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SEO 관리 대시보드</h1>
          <p className="text-muted-foreground">
            인바운드 마케팅 자동화 및 SEO 성과 모니터링 시스템
          </p>
        </div>

        {/* 메인 대시보드 */}
        <InboundMarketingDashboard 
          initialMetrics={mockMetrics}
          className="mb-12"
        />

        {/* SEO 도구 섹션 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 컨텐츠 최적화 도구 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">실시간 컨텐츠 분석</h2>
            <div className="bg-card border rounded-lg p-6">
              <ContentOptimizer
                content="패밀리오피스 종합 자산관리 서비스. 고액자산가를 위한 프리미엄 금융 솔루션. 중견기업 CEO와 개인자산 30억+ 자산가를 위한 맞춤형 패밀리오피스 서비스. 포트폴리오 관리, 투자자문, 세무 컨설팅, 보험설계까지 원스톱 서비스로 제공합니다. 삼성생명 1000억+ 운용실적을 바탕으로 한 전문적인 자산관리 솔루션. 기업승계 전략부터 개인자산 최적화까지 종합적인 패밀리오피스 서비스를 제공합니다."
                targetKeywords={['패밀리오피스', '자산관리서비스', '고액자산가', '포트폴리오관리']}
                showAnalysis={true}
                autoOptimize={true}
              />
            </div>
          </div>

          {/* 키워드 성과 요약 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">키워드 성과 요약</h2>
            <div className="space-y-3">
              {Object.entries(mockMetrics.keywordRankings).map(([keyword, rank]) => (
                <div key={keyword} className="flex items-center justify-between p-4 bg-card border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      rank <= 3 ? 'bg-green-100 text-green-800' :
                      rank <= 10 ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {rank}
                    </div>
                    <span className="font-medium">{keyword}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {rank <= 3 && <span className="text-green-600">🏆</span>}
                    {rank > 10 && <span className="text-orange-600">📈</span>}
                    <span className="text-sm text-muted-foreground">
                      {rank <= 3 ? '상위권' : rank <= 10 ? '1페이지' : '개선필요'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 실시간 SEO 추적 시스템 */}
        <SEOTrackerInit 
          config={{
            ...(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && { gaTrackingId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID }),
            customDomain: 'familyoffices.vip',
            trackingEnabled: true,
            reportingInterval: 'daily'
          }}
        />

        {/* 최근 활동 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">최근 SEO 활동</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '메인 페이지 메타데이터 최적화',
                description: '타겟 키워드 밀도 개선 및 구조화 데이터 추가',
                timestamp: '2시간 전',
                type: 'optimization',
                impact: '+5% 클릭률 개선'
              },
              {
                title: '신규 블로그 포스트 자동 생성',
                description: '"기업승계 전략" 키워드 타겟 컨텐츠',
                timestamp: '4시간 전',
                type: 'content',
                impact: '예상 트래픽 +12%'
              },
              {
                title: '내부 링크 구조 자동 최적화',
                description: '관련 페이지 간 연결성 강화',
                timestamp: '1일 전',
                type: 'structure',
                impact: '페이지뷰 +8%'
              },
              {
                title: 'A/B 테스트 결과 적용',
                description: 'CTA 버튼 문구 최적화 완료',
                timestamp: '2일 전',
                type: 'conversion',
                impact: '전환율 +15%'
              },
              {
                title: '키워드 순위 개선',
                description: '"세무최적화" 12위 → 8위 상승',
                timestamp: '3일 전',
                type: 'ranking',
                impact: '순위 4단계 상승'
              },
              {
                title: '사이트 속도 최적화',
                description: '이미지 압축 및 캐싱 개선',
                timestamp: '1주 전',
                type: 'performance',
                impact: '로딩시간 -1.2초'
              }
            ].map((activity, index) => (
              <div key={index} className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{activity.title}</h3>
                  <span className={`w-2 h-2 rounded-full ${
                    activity.type === 'optimization' ? 'bg-blue-500' :
                    activity.type === 'content' ? 'bg-green-500' :
                    activity.type === 'structure' ? 'bg-purple-500' :
                    activity.type === 'conversion' ? 'bg-orange-500' :
                    activity.type === 'ranking' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`} />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{activity.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{activity.timestamp}</span>
                  <span className="font-medium text-green-600">{activity.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}