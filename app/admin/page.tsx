'use client';

import { Brain, ClipboardCheck, Gauge, Phone, Search, Shield, Target, TrendingUp } from 'lucide-react';
import nextDynamic from 'next/dynamic';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { StructureCheckDashboard } from '@/components/admin/structure-check-dashboard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

// Dynamic imports for heavy dashboard components
const AISearchDashboard = nextDynamic(
  () => import('@/components/admin/ai-search-dashboard').then(mod => ({ default: mod.AISearchDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">AI 검색 대시보드 로딩 중...</div>
  }
);

const GoogleSearchConsoleDashboard = nextDynamic(
  () => import('@/components/admin/google-search-console-dashboard').then(mod => ({ default: mod.GoogleSearchConsoleDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">Google Search Console 로딩 중...</div>
  }
);

const WebVitalsDashboard = nextDynamic(
  () => import('@/components/web-vitals-dashboard').then(mod => ({ default: mod.WebVitalsDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">웹 성능 대시보드 로딩 중...</div>
  }
);

const SecurityDashboard = nextDynamic(
  () => import('@/components/admin/security-dashboard'),
  { 
    loading: () => <div className="flex items-center justify-center h-64">보안 대시보드 로딩 중...</div>
  }
);

const InboundMarketingDashboard = nextDynamic(
  () => import('@/components/admin/inbound-marketing-dashboard').then(mod => ({ default: mod.InboundMarketingDashboard })),
  {
    loading: () => <div className="flex items-center justify-center h-64">인바운드 마케팅 대시보드 로딩 중...</div>
  }
);

const MarketingPerformanceDashboard = nextDynamic(
  () => import('@/components/admin/marketing-performance-dashboard'),
  {
    loading: () => <div className="flex items-center justify-center h-64">마케팅 퍼포먼스 대시보드 로딩 중...</div>
  }
);

const SeoOverviewDashboard = nextDynamic(
  () => import('@/components/admin/seo-overview-dashboard').then(mod => ({ default: mod.SeoOverviewDashboard })),
  {
    loading: () => <div className="flex items-center justify-center h-64">SEO 성과 대시보드 로딩 중...</div>
  }
);

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ... (previous imports)
import { useEffect, useState } from 'react';
import { getAdminStats, getStructureCheckRequests, type StructureCheckRequest } from './actions';

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
  const [structureCheckRequests, setStructureCheckRequests] = useState<StructureCheckRequest[]>([]);
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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">관리자 대시보드</h1>
            </div>
            <Badge variant="outline" className="mb-4">
              프리미엄 관리자 대시보드
            </Badge>
          </div>

          <Tabs defaultValue="marketing-performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
              <TabsTrigger value="marketing-performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                마케팅 퍼포먼스
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                SEO 성과
              </TabsTrigger>
              <TabsTrigger value="consultations" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                상담 관리
              </TabsTrigger>
              <TabsTrigger value="structure-check" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                구조 점검
              </TabsTrigger>
              <TabsTrigger value="search-console" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Console
              </TabsTrigger>
              <TabsTrigger value="ai-search" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI 검색엔진
              </TabsTrigger>
              <TabsTrigger value="web-vitals" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                웹 성능
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                보안 상태
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                마케팅 자동화
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
                      <p className="text-sm text-muted-foreground">이번 달 상담</p>
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
                    <Button asChild>
                      <Link href="/admin/consultations">
                        상담 목록 보기
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure-check" className="space-y-6">
              {loadingRequests ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">구조 점검 요청 목록을 불러오는 중...</p>
                  </CardContent>
                </Card>
              ) : (
                <StructureCheckDashboard initialRequests={structureCheckRequests} />
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
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}