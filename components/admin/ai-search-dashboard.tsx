'use client';

import {
  AlertCircle,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Eye,
  RefreshCw,
  Search,
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
 * AI 검색엔진 최적화 모니터링 대시보드
 * SuperClaude Framework + BMAD Method 통합
 */

interface AIMonitoringData {
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

export function AISearchDashboard() {
  const [data, setData] = useState<AIMonitoringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // 데이터 로드
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        '/api/ai-search-optimization?action=dashboard-data'
      );
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setLastRefresh(new Date());
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Dashboard load error:', err);
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
            AI 검색엔진 데이터를 분석 중입니다...
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
            AI 검색엔진 최적화 모니터링
          </h2>
          <p className="text-muted-foreground">
            {data.metadata.framework} | {data.metadata.methodology}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              총 모니터링 쿼리
            </CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalQueries}
            </div>
            <p className="text-xs text-muted-foreground">
              BMAD Method 기반 키워드
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              평균 검색 순위
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.averageRanking || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">목표: 상위 3위 진입</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">개선율</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +{data.overview.improvementRate}%
            </div>
            <p className="text-xs text-muted-foreground">지난 30일 대비</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI 엔진 수</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.enginePerformance.length}
            </div>
            <p className="text-xs text-muted-foreground">
              ChatGPT, Perplexity 등
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 분석 탭 */}
      <Tabs defaultValue="engines" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engines">AI 엔진별 성과</TabsTrigger>
          <TabsTrigger value="bmad">BMAD 분석</TabsTrigger>
          <TabsTrigger value="recommendations">개선 권장사항</TabsTrigger>
        </TabsList>

        <TabsContent value="engines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.enginePerformance.map((engine, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{engine.engine}</CardTitle>
                    <Badge variant="secondary">{engine.platform}</Badge>
                  </div>
                  <CardDescription>
                    {engine.contentPreference} 선호 | {engine.optimalLength}자
                    최적
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">쿼리 수</span>
                      <span className="font-medium">{engine.queries}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">평균 순위</span>
                      <span className="font-medium text-primary">
                        #{engine.avgRanking}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">주요 키워드:</p>
                    <div className="flex flex-wrap gap-1">
                      {engine.topKeywords.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bmad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>BMAD Method 키워드 성과 분석</CardTitle>
              <CardDescription>
                성공한 기업가의 검색 패턴별 성과 지표
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(data.bmdAnalytics).map(([category, stats]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium capitalize">
                        {category === 'behavioral' &&
                          '🎯 Behavioral (행동 기반)'}
                        {category === 'motivational' &&
                          '🚀 Motivational (동기 기반)'}
                        {category === 'aspirational' &&
                          '✨ Aspirational (열망 기반)'}
                        {category === 'decisional' &&
                          '⚡ Decisional (결정 기반)'}
                      </span>
                      <Badge variant="outline">{stats.queries}개 쿼리</Badge>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {stats.performance}%
                    </span>
                  </div>
                  <Progress value={stats.performance} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {category === 'behavioral' &&
                      '실제 기업가들의 검색 행동 패턴 기반'}
                    {category === 'motivational' &&
                      '성취 동기와 성장 욕구 기반'}
                    {category === 'aspirational' && '미래 비전과 열망 기반'}
                    {category === 'decisional' && '구체적 실행과 결정 기반'}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                AI 검색엔진 최적화 권장사항
              </CardTitle>
              <CardDescription>
                SuperClaude 프레임워크 기반 개선 전략
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-3">다음 단계 액션 아이템:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    성과 데이터 내보내기
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    상세 분석 보고서
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
