import {
  BarChart3,
  Users,
  DollarSign,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import { Suspense } from 'react';

import { Metadata } from 'next';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: '분석 대시보드',
  description: '실시간 플랫폼 분석 및 모니터링',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Mock data - 실제 구현에서는 API에서 가져올 것
const analyticsData = {
  overview: {
    totalUsers: 1247,
    activeUsers: 342,
    newUsersToday: 23,
    consultationRequests: 89,
    totalRevenue: 2450000000, // 24.5억
    averageSessionTime: '4:32',
    bounceRate: 28.5,
    conversionRate: 3.8,
  },

  realTimeMetrics: {
    currentVisitors: 45,
    pageViews: 1892,
    topPages: [
      { path: '/', views: 423, title: '홈페이지' },
      { path: '/services', views: 298, title: '서비스' },
      { path: '/program', views: 187, title: '교육 프로그램' },
      { path: '/contact', views: 156, title: '상담 신청' },
      { path: '/dashboard', views: 134, title: '대시보드' },
    ],
    devices: {
      desktop: 67.3,
      mobile: 28.4,
      tablet: 4.3,
    },
    browsers: {
      chrome: 68.9,
      safari: 18.7,
      edge: 8.1,
      firefox: 3.2,
      other: 1.1,
    },
  },

  userSegments: [
    { segment: '제조업', users: 387, percentage: 31.0, growth: '+12%' },
    { segment: '건설업', users: 298, percentage: 23.9, growth: '+8%' },
    { segment: 'IT/기술', users: 234, percentage: 18.8, growth: '+24%' },
    { segment: '가족기업', users: 189, percentage: 15.2, growth: '+5%' },
    { segment: '기타', users: 139, percentage: 11.1, growth: '-2%' },
  ],

  systemHealth: {
    apiStatus: 'operational',
    dbStatus: 'operational',
    cacheStatus: 'operational',
    uptime: 99.98,
    avgResponseTime: 145,
    errorRate: 0.02,
    lastIncident: '2024-01-15T10:30:00Z',
  },

  financialMetrics: {
    apiCalls: {
      yahoo: { calls: 15642, success: 99.94, avgLatency: 230 },
      alphaVantage: { calls: 3421, success: 99.87, avgLatency: 340 },
    },
    cacheHitRate: 87.3,
    dataFreshness: 95.8,
  },
};

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
}: {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          {trend && (
            <span
              className={`font-medium ${
                trend.startsWith('+')
                  ? 'text-green-600'
                  : trend.startsWith('-')
                    ? 'text-red-600'
                    : ''
              }`}
            >
              {trend}
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const getStatusIcon = () => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <span className="capitalize">{status}</span>
    </div>
  );
}

function RealTimeChart() {
  return (
    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
      <div className="text-center">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">실시간 차트</p>
        <p className="text-sm text-gray-400">
          Chart.js 또는 Recharts 구현 예정
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function AnalyticsPage() {
  const {
    overview,
    realTimeMetrics,
    userSegments,
    systemHealth,
    financialMetrics,
  } = analyticsData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">분석 대시보드</h1>
          <p className="text-muted-foreground">
            실시간 플랫폼 성능 및 사용자 분석
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          실시간 업데이트
        </Badge>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        {/* 핵심 지표 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="총 사용자"
            value={overview.totalUsers.toLocaleString()}
            description="전체 등록 사용자"
            icon={Users}
            trend="+8.2%"
          />
          <MetricCard
            title="활성 사용자"
            value={overview.activeUsers.toLocaleString()}
            description="월간 활성 사용자"
            icon={Activity}
            trend="+12.5%"
          />
          <MetricCard
            title="상담 신청"
            value={overview.consultationRequests}
            description="이번 달 상담 신청"
            icon={DollarSign}
            trend="+23.1%"
          />
          <MetricCard
            title="평균 세션 시간"
            value={overview.averageSessionTime}
            description="사용자당 평균 체류시간"
            icon={Clock}
            trend="+5.3%"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="users">사용자</TabsTrigger>
            <TabsTrigger value="system">시스템</TabsTrigger>
            <TabsTrigger value="financial">금융 API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>실시간 방문자</CardTitle>
                  <CardDescription>현재 온라인 상태인 사용자</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {realTimeMetrics.currentVisitors}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    오늘 페이지뷰: {realTimeMetrics.pageViews.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>전환율</CardTitle>
                  <CardDescription>방문자 대비 상담 신청 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {overview.conversionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    이탈률: {overview.bounceRate}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>인기 페이지</CardTitle>
                <CardDescription>가장 많이 방문된 페이지</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {realTimeMetrics.topPages.map((page, index) => (
                    <div
                      key={page.path}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="w-8 h-6 flex items-center justify-center"
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {page.path}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.views}</p>
                        <p className="text-sm text-muted-foreground">조회수</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>실시간 트래픽</CardTitle>
                <CardDescription>시간별 방문자 추이</CardDescription>
              </CardHeader>
              <CardContent>
                <RealTimeChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>업종별 사용자</CardTitle>
                  <CardDescription>사용자 세그먼트 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userSegments.map(segment => (
                      <div
                        key={segment.segment}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="font-medium">{segment.segment}</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{segment.users}</span>
                            <Badge
                              variant={
                                segment.growth.startsWith('+')
                                  ? 'default'
                                  : 'destructive'
                              }
                              className="text-xs"
                            >
                              {segment.growth}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {segment.percentage}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>디바이스 분석</CardTitle>
                  <CardDescription>접속 기기별 사용자 분포</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>데스크톱</span>
                      <span className="font-medium">
                        {realTimeMetrics.devices.desktop}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>모바일</span>
                      <span className="font-medium">
                        {realTimeMetrics.devices.mobile}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>태블릿</span>
                      <span className="font-medium">
                        {realTimeMetrics.devices.tablet}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>시스템 상태</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>API 서버</span>
                    <StatusIndicator status={systemHealth.apiStatus} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>데이터베이스</span>
                    <StatusIndicator status={systemHealth.dbStatus} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>캐시 시스템</span>
                    <StatusIndicator status={systemHealth.cacheStatus} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>성능 지표</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>가동률</span>
                    <span className="font-medium text-green-600">
                      {systemHealth.uptime}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>평균 응답시간</span>
                    <span className="font-medium">
                      {systemHealth.avgResponseTime}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>오류율</span>
                    <span className="font-medium text-green-600">
                      {systemHealth.errorRate}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>최근 활동</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>✅ 시스템 업데이트 완료</p>
                    <p>📊 일일 백업 완료</p>
                    <p>🔄 캐시 최적화 실행</p>
                    <p className="text-muted-foreground">
                      마지막 업데이트: 방금 전
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Yahoo Finance API</CardTitle>
                  <CardDescription>
                    주식 및 금융 데이터 API 상태
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>API 호출</span>
                    <span className="font-medium">
                      {financialMetrics.apiCalls.yahoo.calls.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>성공률</span>
                    <span className="font-medium text-green-600">
                      {financialMetrics.apiCalls.yahoo.success}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>평균 지연시간</span>
                    <span className="font-medium">
                      {financialMetrics.apiCalls.yahoo.avgLatency}ms
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alpha Vantage API</CardTitle>
                  <CardDescription>백업 금융 데이터 API 상태</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>API 호출</span>
                    <span className="font-medium">
                      {financialMetrics.apiCalls.alphaVantage.calls.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>성공률</span>
                    <span className="font-medium text-green-600">
                      {financialMetrics.apiCalls.alphaVantage.success}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>평균 지연시간</span>
                    <span className="font-medium">
                      {financialMetrics.apiCalls.alphaVantage.avgLatency}ms
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>캐시 성능</CardTitle>
                <CardDescription>데이터 캐싱 효율성</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">캐시 적중률</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {financialMetrics.cacheHitRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      데이터 신선도
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {financialMetrics.dataFreshness}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  );
}
