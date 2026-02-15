'use client';

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Clock,
  Eye,
  MousePointerClick,
  RefreshCw,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * BMAD 키워드 추적 대시보드
 * Decisional 키워드 고성과 중심 모니터링
 */

interface BMADDashboardData {
  overview: {
    totalKeywords: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    avgCTR: number;
    avgConversionRate: number;
  };
  categoryPerformance: Array<{
    category: string;
    totalKeywords: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    avgCTR: number;
    avgConversionRate: number;
    avgPosition: number;
    performance: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  }>;
  topKeywords: Array<{
    keyword: string;
    category: string;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
  }>;
  lastUpdated: string;
}

export function BMADKeywordDashboard() {
  const [data, setData] = useState<BMADDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // 데이터 로드
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        '/api/bmad-tracking?action=dashboard-summary'
      );
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setLastRefresh(new Date());
      } else {
        setError(result.error || 'Failed to load BMAD data');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('BMAD Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            BMAD 키워드 데이터를 분석 중입니다...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>오류: {error}</span>
            <Button onClick={loadDashboardData} variant="outline" size="sm">
              다시 시도
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            BMAD 키워드 추적
          </h2>
          <p className="text-muted-foreground">
            성공한 기업가의 검색 패턴별 성과 모니터링
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {lastRefresh.toLocaleTimeString('ko-KR')} 업데이트
          </Badge>
          <Button onClick={loadDashboardData} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
        </div>
      </div>

      {/* 개요 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 노출수</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalImpressions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.overview.totalKeywords}개 키워드 추적 중
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 클릭수</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              평균 CTR: {data.overview.avgCTR.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 전환수</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.overview.totalConversions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              평균 전환율: {data.overview.avgConversionRate.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최고 성과</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Decisional</div>
            <p className="text-xs text-muted-foreground">
              89.7점 고성과 카테고리
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 분석 탭 */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">카테고리 성과</TabsTrigger>
          <TabsTrigger value="keywords">상위 키워드</TabsTrigger>
          <TabsTrigger value="insights">인사이트</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>BMAD 카테고리별 성과 분석</CardTitle>
              <CardDescription>
                Decisional 키워드가 가장 높은 전환율을 보입니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.categoryPerformance.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-lg">
                        {category.category === 'behavioral' && '🎯 Behavioral'}
                        {category.category === 'motivational' &&
                          '🚀 Motivational'}
                        {category.category === 'aspirational' &&
                          '✨ Aspirational'}
                        {category.category === 'decisional' && '⚡ Decisional'}
                      </span>
                      <Badge variant="outline">
                        {category.totalKeywords}개
                      </Badge>
                      {category.trend !== 'stable' && (
                        <Badge
                          variant={
                            category.trend === 'up' ? 'default' : 'destructive'
                          }
                        >
                          {category.trend === 'up' ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(category.trendPercentage)}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {category.performance.toFixed(1)}
                      </div>
                      <p className="text-xs text-muted-foreground">성과 점수</p>
                    </div>
                  </div>

                  <Progress value={category.performance} className="h-2" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">노출수</p>
                      <p className="font-medium">
                        {category.totalImpressions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">클릭수</p>
                      <p className="font-medium">
                        {category.totalClicks.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">CTR</p>
                      <p className="font-medium">
                        {category.avgCTR.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">전환율</p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {category.avgConversionRate.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground pt-2 border-t">
                    {category.category === 'behavioral' &&
                      '실제 기업가들의 검색 행동 패턴'}
                    {category.category === 'motivational' &&
                      '성취 동기와 성장 욕구 기반'}
                    {category.category === 'aspirational' &&
                      '미래 비전과 열망 기반'}
                    {category.category === 'decisional' &&
                      '구체적 실행과 즉시 결정 기반 - 최고 성과'}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>상위 성과 키워드 TOP 10</CardTitle>
              <CardDescription>
                전환수와 클릭수 기준 상위 키워드
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-primary text-lg">
                          #{index + 1}
                        </span>
                        <span className="font-medium">{keyword.keyword}</span>
                        <Badge variant="secondary" className="text-xs">
                          {keyword.category === 'behavioral' && '🎯 Behavioral'}
                          {keyword.category === 'motivational' &&
                            '🚀 Motivational'}
                          {keyword.category === 'aspirational' &&
                            '✨ Aspirational'}
                          {keyword.category === 'decisional' && '⚡ Decisional'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">노출</p>
                          <p className="font-medium">
                            {keyword.impressions.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">클릭</p>
                          <p className="font-medium">
                            {keyword.clicks.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">전환</p>
                          <p className="font-medium text-green-600 dark:text-green-400">
                            {keyword.conversions}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CTR</p>
                          <p className="font-medium">
                            {keyword.ctr.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            전환율
                          </p>
                          <p className="font-medium">
                            {keyword.conversionRate.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                BMAD 키워드 인사이트 & 권장사항
              </CardTitle>
              <CardDescription>데이터 기반 최적화 전략</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 핵심 인사이트 */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  핵심 인사이트
                </h4>
                <div className="space-y-2 pl-6">
                  <div className="flex items-start space-x-2">
                    <div className="text-green-500 mt-1">✓</div>
                    <p className="text-sm">
                      <strong>Decisional 키워드</strong>가 전체 전환의{' '}
                      <strong>68%</strong>를 차지하며 가장 높은 ROI 제공
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="text-green-500 mt-1">✓</div>
                    <p className="text-sm">
                      &ldquo;무료 상담&rdquo;, &ldquo;비용 문의&rdquo; 등{' '}
                      <strong>즉시 행동 유도 키워드</strong>의 전환율이 평균{' '}
                      <strong>2.5배</strong> 높음
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-500 mt-1">!</div>
                    <p className="text-sm">
                      Aspirational 키워드는 높은 노출 대비{' '}
                      <strong>낮은 전환율</strong> → 콘텐츠 최적화 필요
                    </p>
                  </div>
                </div>
              </div>

              {/* 실행 권장사항 */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  실행 권장사항
                </h4>
                <div className="space-y-3 pl-6">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">
                      🎯 우선순위 1: Decisional 키워드 중심 랜딩 페이지 최적화
                    </p>
                    <p className="text-xs text-muted-foreground">
                      &ldquo;패밀리오피스 비용&rdquo;, &ldquo;무료 상담&rdquo;
                      등 고전환 키워드 타겟 페이지 개선
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">
                      📝 우선순위 2: FAQ 섹션에 즉시 행동 키워드 추가
                    </p>
                    <p className="text-xs text-muted-foreground">
                      비용, 상담 절차, 서비스 범위 등 구체적인 정보 상세화
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">
                      🚀 우선순위 3: CTA 버튼 최적화
                    </p>
                    <p className="text-xs text-muted-foreground">
                      &ldquo;무료 상담 신청&rdquo; CTA를 더 눈에 띄는 위치로
                      이동 및 강조
                    </p>
                  </div>
                </div>
              </div>

              {/* 다음 단계 */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">다음 단계 액션:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    월간 리포트 다운로드
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    키워드별 상세 분석
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
