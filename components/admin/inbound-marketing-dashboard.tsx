/**
 * 인바운드 마케팅 대시보드
 * 리드 스코어링, 워크플로우, 콘텐츠 추천 성과를 종합적으로 모니터링
 */

'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Activity,
    BarChart3,
    BookOpen,
    CheckCircle,
    Clock,
    Eye,
    MousePointer,
    RefreshCw,
    Star,
    Target,
    TrendingUp,
    Users,
    XCircle,
    Zap
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface MarketingAnalytics {
  period: {
    days_back: number;
    start_date: string;
    end_date: string;
  };
  lead_scoring: {
    total_leads: number;
    qualified_leads: number;
    conversion_rate: string;
    avg_lead_score: string;
    top_activities: string[];
  };
  workflow_performance: {
    total_executions: number;
    completed_executions: number;
    failed_executions: number;
    running_executions: number;
    completion_rate: string;
    failure_rate: string;
    avg_completion_time: string;
  };
  content_recommendations: {
    total_recommendations: number;
    view_rate: string;
    click_rate: string;
    avg_relevance_score: string;
    avg_ai_confidence: string;
    top_performing_content: Array<{
      content_id: string;
      content_title: string;
      content_type: string;
      click_rate: string;
      total_recommendations: number;
    }>;
  };
  summary: {
    marketing_health_score: number;
    key_insights: string[];
    recommendations: string[];
  };
}

export function InboundMarketingDashboard() {
  const [analytics, setAnalytics] = useState<MarketingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const fetchAnalytics = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`/api/marketing/analytics?days_back=${selectedPeriod}&include_details=true`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch analytics');
      }

      setAnalytics(result.data);
      setError(null);

    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod, fetchAnalytics]);

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getHealthScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    if (score >= 40) return 'outline';
    return 'destructive';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">인바운드 마케팅 대시보드</h2>
          <div className="animate-pulse">
            <div className="w-32 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2"
            onClick={fetchAnalytics}
          >
            다시 시도
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!analytics) {
    return (
      <Alert>
        <AlertDescription>분석 데이터가 없습니다.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">인바운드 마케팅 대시보드</h2>
          <p className="text-gray-600 mt-1">
            최근 {analytics.period.days_back}일간 마케팅 성과 분석
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="px-3 py-2 border rounded-md"
          >
            <option value={7}>7일</option>
            <option value={30}>30일</option>
            <option value={90}>90일</option>
          </select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchAnalytics}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 마케팅 헬스 스코어 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            마케팅 헬스 스코어
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${getHealthScoreColor(analytics.summary.marketing_health_score)}`}>
                {analytics.summary.marketing_health_score}
              </div>
              <div>
                <Badge variant={getHealthScoreBadgeVariant(analytics.summary.marketing_health_score)}>
                  {analytics.summary.marketing_health_score >= 80 ? '우수' :
                   analytics.summary.marketing_health_score >= 60 ? '양호' :
                   analytics.summary.marketing_health_score >= 40 ? '개선필요' : '위험'}
                </Badge>
                <div className="text-sm text-gray-600 mt-1">
                  전체 마케팅 성과 종합 점수
                </div>
              </div>
            </div>
            <Progress 
              value={analytics.summary.marketing_health_score} 
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 총 리드 수 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 리드</p>
                <p className="text-2xl font-bold">{analytics.lead_scoring.total_leads}</p>
                <p className="text-xs text-gray-500">최근 {analytics.period.days_back}일</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* 전환율 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">리드 전환율</p>
                <p className="text-2xl font-bold">{analytics.lead_scoring.conversion_rate}</p>
                <div className="flex items-center gap-1 text-xs">
                  <Target className="h-3 w-3" />
                  <span>자격 리드: {analytics.lead_scoring.qualified_leads}</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* 워크플로우 성과 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">워크플로우 완료율</p>
                <p className="text-2xl font-bold">{analytics.workflow_performance.completion_rate}</p>
                <p className="text-xs text-gray-500">
                  {analytics.workflow_performance.total_executions}개 실행
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* 콘텐츠 참여도 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">콘텐츠 클릭률</p>
                <p className="text-2xl font-bold">{analytics.content_recommendations.click_rate}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.content_recommendations.total_recommendations}개 추천
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상세 분석 탭 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="leads">리드 스코어링</TabsTrigger>
          <TabsTrigger value="workflows">워크플로우</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 추천</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 주요 인사이트 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  주요 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(analytics.summary?.key_insights || []).map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-200">{index + 1}</span>
                      </div>
                      <p className="text-sm text-blue-800 dark:text-blue-100">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 개선 권장사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  개선 권장사항
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(analytics.summary?.recommendations || []).map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="w-6 h-6 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-200">{index + 1}</span>
                      </div>
                      <p className="text-sm text-amber-800 dark:text-amber-100">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 리드 스코어링 탭 */}
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>리드 성과 요약</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">평균 리드 스코어</span>
                    <span className="font-semibold">{analytics.lead_scoring.avg_lead_score}점</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">전환율</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {analytics.lead_scoring?.conversion_rate || '0%'}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">리드 전환 현황</div>
                    <Progress 
                      value={parseFloat((analytics.lead_scoring?.conversion_rate || '0').replace('%', ''))} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{analytics.lead_scoring?.qualified_leads || 0} 자격</span>
                      <span>{analytics.lead_scoring?.total_leads || 0} 총계</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>인기 활동</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(analytics.lead_scoring?.top_activities || []).map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 워크플로우 탭 */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  완료
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {analytics.workflow_performance.completed_executions}
                </div>
                <p className="text-sm text-gray-600">
                  완료율: {analytics.workflow_performance.completion_rate}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  실행 중
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.workflow_performance.running_executions}
                </div>
                <p className="text-sm text-gray-600">
                  평균 소요시간: {analytics.workflow_performance.avg_completion_time}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  실패
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {analytics.workflow_performance.failed_executions}
                </div>
                <p className="text-sm text-gray-600">
                  실패율: {analytics.workflow_performance.failure_rate}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>워크플로우 실행 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">총 실행 수</span>
                  <span className="font-semibold">{analytics.workflow_performance.total_executions}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>완료: {analytics.workflow_performance.completion_rate}</span>
                    <span>실패: {analytics.workflow_performance.failure_rate}</span>
                  </div>
                  <Progress 
                    value={parseFloat((analytics.workflow_performance?.completion_rate || '0').replace('%', ''))} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 콘텐츠 추천 탭 */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>참여도 지표</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">조회율</span>
                    </div>
                    <span className="font-semibold">{analytics.content_recommendations.view_rate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-green-500" />
                      <span className="text-sm">클릭률</span>
                    </div>
                    <span className="font-semibold">{analytics.content_recommendations.click_rate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">평균 관련도</span>
                    </div>
                    <span className="font-semibold">{analytics.content_recommendations.avg_relevance_score}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">AI 신뢰도</span>
                    </div>
                    <span className="font-semibold">{analytics.content_recommendations.avg_ai_confidence}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>최고 성과 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(analytics.content_recommendations?.top_performing_content || []).map((content, index) => (
                    <div key={content.content_id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{content.content_title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {content.content_type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {content.total_recommendations}개 추천
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{content.click_rate}%</div>
                          <div className="text-xs text-gray-500">클릭률</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}