'use client';

import {
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  BarChart3,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardData {
  overview: {
    totalQueries: number;
    averageRanking: number;
    improvementRate: number;
    lastUpdated: Date;
  };
  enginePerformance: Array<{
    engine: string;
    platform: string;
    queries: number;
    avgRanking: number;
    topKeywords: string[];
    contentPreference: string;
    optimalLength: number;
  }>;
  bmdAnalytics: {
    behavioral: { queries: number; performance: number };
    motivational: { queries: number; performance: number };
    aspirational: { queries: number; performance: number };
    decisional: { queries: number; performance: number };
  };
  recommendations: string[];
  metadata: {
    framework: string;
    version: string;
    methodology: string;
    lastUpdated: string;
  };
}

export default function MarketingPerformanceDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          '/api/ai-search-optimization?action=dashboard-data'
        );
        if (!response.ok) throw new Error('Failed to fetch dashboard data');

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">대시보드 데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <p>{error || '데이터를 불러올 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  const bmdCategories = [
    {
      key: 'behavioral' as const,
      label: 'Behavioral (행동 기반)',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      key: 'motivational' as const,
      label: 'Motivational (동기 기반)',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      key: 'aspirational' as const,
      label: 'Aspirational (열망 기반)',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      key: 'decisional' as const,
      label: 'Decisional (결정 기반)',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              마케팅 퍼포먼스 대시보드
            </h2>
            <p className="text-muted-foreground">
              실시간 SEO/AEO 최적화 및 마케팅 자동화 성과 모니터링
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {data.metadata.framework} v{data.metadata.version}
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              총 모니터링 쿼리
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalQueries}
            </div>
            <p className="text-xs text-muted-foreground">AI 검색엔진 추적 중</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 랭킹</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.averageRanking === 0
                ? '-'
                : `#${data.overview.averageRanking}`}
            </div>
            <p className="text-xs text-muted-foreground">
              실시간 데이터 수집 필요
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">개선율</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{data.overview.improvementRate}%
            </div>
            <p className="text-xs text-muted-foreground">전월 대비 성장</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              마지막 업데이트
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">실시간</div>
            <p className="text-xs text-muted-foreground">5분마다 자동 갱신</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bmad" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bmad">BMAD 분석</TabsTrigger>
          <TabsTrigger value="engines">AI 검색엔진</TabsTrigger>
          <TabsTrigger value="recommendations">권장사항</TabsTrigger>
        </TabsList>

        {/* BMAD Analytics Tab */}
        <TabsContent value="bmad" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {bmdCategories.map(category => {
              const analytics = data.bmdAnalytics[category.key];
              const Icon = category.icon;

              return (
                <Card key={category.key} className={category.bgColor}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">
                          {category.label}
                        </CardTitle>
                        <CardDescription>
                          {analytics.queries}개 키워드 추적
                        </CardDescription>
                      </div>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          퍼포먼스 점수
                        </span>
                        <span className="text-2xl font-bold">
                          {analytics.performance}%
                        </span>
                      </div>
                      <Progress value={analytics.performance} className="h-2" />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {analytics.performance >= 80 ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            <span>우수한 성과</span>
                          </>
                        ) : analytics.performance >= 70 ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-blue-600" />
                            <span>양호한 성과</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 text-orange-600" />
                            <span>개선 필요</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* BMAD Method Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>BMAD Method 키워드 전략</CardTitle>
              <CardDescription>
                성공한 기업가의 검색 패턴을 4단계로 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    Behavioral (행동 기반)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    실제 사례와 경험을 검색하는 단계. 타인의 성공 사례와 실제
                    적용 방법을 찾습니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    Motivational (동기 기반)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    성취 욕구와 목표를 명확히 하는 단계. 어떤 가치를 추구하고
                    어떤 성과를 원하는지 탐색합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    Aspirational (열망 기반)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    미래 비전과 이상적인 상태를 상상하는 단계. 최고 수준의
                    서비스와 결과를 지향합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-600" />
                    Decisional (결정 기반)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    즉시 행동으로 옮기는 단계. 구체적인 서비스 비교와 실행
                    방법을 검색합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Search Engines Tab */}
        <TabsContent value="engines" className="space-y-4">
          <div className="grid gap-4">
            {data.enginePerformance.map(engine => (
              <Card key={engine.platform}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{engine.engine}</CardTitle>
                      <CardDescription>
                        {engine.contentPreference} 형태 선호 | 최적 길이:{' '}
                        {engine.optimalLength}자
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">#{engine.avgRanking} 평균</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        모니터링 쿼리
                      </span>
                      <span className="font-medium">{engine.queries}개</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">
                        상위 키워드
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {engine.topKeywords.map((keyword, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI 기반 최적화 권장사항</CardTitle>
              <CardDescription>
                실시간 데이터 분석을 통한 개선 방향 제시
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recommendations.map((recommendation, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Framework Info */}
          <Card>
            <CardHeader>
              <CardTitle>시스템 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">프레임워크</span>
                  <span className="font-medium">{data.metadata.framework}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">버전</span>
                  <span className="font-medium">{data.metadata.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">방법론</span>
                  <span className="font-medium">
                    {data.metadata.methodology}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">업데이트</span>
                  <span className="font-medium">
                    {new Date(data.metadata.lastUpdated).toLocaleString(
                      'ko-KR'
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
