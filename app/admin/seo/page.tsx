/**
 * 관리자 SEO 대시보드
 * 인바운드 마케팅 자동화 및 성과 모니터링
 */
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { SEOAnalyticsDashboard } from '@/components/admin/seo-analytics-dashboard';

export const metadata: Metadata = {
  title: 'SEO 대시보드 | FamilyOffice S 관리자',
  description: '인바운드 마케팅 자동화 및 SEO 성과 모니터링 대시보드',
  robots: {
    index: false,
    follow: false,
  },
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
      패밀리오피스: 2,
      자산관리서비스: 5,
      기업승계: 3,
      세무최적화: 8,
      프라이빗뱅킹: 12,
      가업승계: 4,
      포트폴리오관리: 15,
      고액자산가: 6,
    },
    conversionRate: 3.4,
    leadGeneration: 28,
    contentEngagement: {
      averageTimeOnPage: 285,
      bounceRate: 38,
      pagesPerSession: 4.1,
    },
    roi: 420,
  };

  return (
    <div className="space-y-6">
      {/* 브레드크럼 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">관리자</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>SEO 분석</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* SEO 대시보드 */}
      <SEOAnalyticsDashboard />
    </div>
  );
}
