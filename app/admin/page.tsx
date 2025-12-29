'use client';

import {
    Brain,
    ClipboardCheck,
    Gauge,
    Phone,
    Search,
    Shield,
    Target,
    TrendingUp,
} from 'lucide-react';

// ... (previous imports)
import { useEffect, useState } from 'react';

import nextDynamic from 'next/dynamic';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BMADKeywordDashboard } from '@/components/admin/bmad-keyword-dashboard';
import { StructureCheckDashboard } from '@/components/admin/structure-check-dashboard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import {
    getAdminStats,
    getStructureCheckRequests,
    type StructureCheckRequest,
} from './actions';

// Dynamic imports for heavy dashboard components
const AISearchDashboard = nextDynamic(
  () =>
    import('@/components/admin/ai-search-dashboard').then(mod => ({
      default: mod.AISearchDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        AI 검색 대시보드 로딩 중...
      </div>
    ),
  }
);

const GoogleSearchConsoleDashboard = nextDynamic(
  () =>
    import('@/components/admin/google-search-console-dashboard').then(mod => ({
      default: mod.GoogleSearchConsoleDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        Google Search Console 로딩 중...
      </div>
    ),
  }
);

const WebVitalsDashboard = nextDynamic(
  () =>
    import('@/components/analytics/web-vitals-dashboard').then(mod => ({
      default: mod.WebVitalsDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        웹 성능 대시보드 로딩 중...
      </div>
    ),
  }
);

const SecurityDashboard = nextDynamic(
  () => import('@/components/admin/security-dashboard'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        보안 대시보드 로딩 중...
      </div>
    ),
  }
);

const InboundMarketingDashboard = nextDynamic(
  () =>
    import('@/components/admin/inbound-marketing-dashboard').then(mod => ({
      default: mod.InboundMarketingDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        인바운드 마케팅 대시보드 로딩 중...
      </div>
    ),
  }
);

const MarketingPerformanceDashboard = nextDynamic(
  () => import('@/components/admin/marketing-performance-dashboard'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        마케팅 퍼포먼스 대시보드 로딩 중...
      </div>
    ),
  }
);

const SeoOverviewDashboard = nextDynamic(
  () =>
    import('@/components/admin/seo-overview-dashboard').then(mod => ({
      default: mod.SeoOverviewDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        SEO 성과 대시보드 로딩 중...
      </div>
    ),
  }
);

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ... (dynamic imports)

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    consultations: {
      total: 0,
      today: 0,
      pending: 0,
    },
    structureChecks: {
      total: 0,
      today: 0,
      pending: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [structureCheckRequests, setStructureCheckRequests] = useState<
    StructureCheckRequest[]
  >([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const { data, error } = await getAdminStats();
      if (data) {
        setStats(data);
      } else {
        console.error('Failed to load admin stats:', error);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  useEffect(() => {
    async function loadStructureCheckRequests() {
      const { data, error } = await getStructureCheckRequests();
      if (data) {
        setStructureCheckRequests(data);
      } else {
        console.error('Failed to load structure check requests:', error);
      }
      setLoadingRequests(false);
    }
    loadStructureCheckRequests();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                관리자 대시보드
              </h1>
            </div>
            <Badge variant="outline" className="text-xs sm:text-sm">
              프리미엄 관리자 대시보드
            </Badge>
          </div>

          <Tabs defaultValue="marketing-performance" className="space-y-6">
            <TabsList className="flex flex-wrap gap-2 w-full justify-start p-1">
              <TabsTrigger
                value="marketing-performance"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">마케팅 퍼포먼스</span>
                <span className="sm:hidden">마케팅</span>
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">SEO 성과</span>
                <span className="sm:hidden">SEO</span>
              </TabsTrigger>
              <TabsTrigger
                value="consultations"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">상담 관리</span>
                <span className="sm:hidden">상담</span>
              </TabsTrigger>
              <TabsTrigger
                value="structure-check"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <ClipboardCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">구조 점검</span>
                <span className="sm:hidden">구조</span>
              </TabsTrigger>
              <TabsTrigger
                value="search-console"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden md:inline">Search Console</span>
                <span className="md:hidden">검색</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai-search"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">AI 검색엔진</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
              <TabsTrigger
                value="web-vitals"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Gauge className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">웹 성능</span>
                <span className="sm:hidden">성능</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">보안 상태</span>
                <span className="sm:hidden">보안</span>
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden md:inline">마케팅 자동화</span>
                <span className="md:hidden">자동화</span>
              </TabsTrigger>
              <TabsTrigger
                value="bmad"
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm"
              >
                <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                <span className="hidden sm:inline">BMAD 추적</span>
                <span className="sm:hidden">BMAD</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketing-performance">
              <MarketingPerformanceDashboard />
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <SeoOverviewDashboard />
            </TabsContent>

            <TabsContent value="consultations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>상담 관리</CardTitle>
                  <CardDescription>예약된 상담 및 문의 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {loading ? '-' : stats.consultations.total}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        이번 달 상담
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {loading ? '-' : stats.consultations.today}
                      </div>
                      <p className="text-sm text-muted-foreground">오늘 접수</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {loading ? '-' : stats.consultations.pending}
                      </div>
                      <p className="text-sm text-muted-foreground">대기 중</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/admin/consultations" className={buttonVariants()}>
                      상담 목록 보기
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure-check" className="space-y-6">
              {loadingRequests ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      구조 점검 요청 목록을 불러오는 중...
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <StructureCheckDashboard
                  initialRequests={structureCheckRequests}
                />
              )}
            </TabsContent>

            <TabsContent value="search-console">
              <GoogleSearchConsoleDashboard />
            </TabsContent>

            <TabsContent value="ai-search">
              <AISearchDashboard />
            </TabsContent>

            <TabsContent value="web-vitals">
              <WebVitalsDashboard />
            </TabsContent>

            <TabsContent value="security">
              <SecurityDashboard />
            </TabsContent>

            <TabsContent value="marketing">
              <InboundMarketingDashboard />
            </TabsContent>

            <TabsContent value="bmad">
              <BMADKeywordDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
