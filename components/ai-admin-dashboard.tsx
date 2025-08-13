'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Activity,
  Brain,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Loader2,
  Zap,
  Target,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { toast } from 'sonner';

interface SystemHealth {
  claude_status: 'healthy' | 'degraded' | 'unavailable';
  openai_status: 'healthy' | 'degraded' | 'unavailable';
  gemini_status: 'healthy' | 'degraded' | 'unavailable';
  cache_status: 'healthy' | 'degraded' | 'unavailable';
  overall_status: 'healthy' | 'degraded' | 'unavailable';
  last_check: string;
}

interface AIStats {
  overview: {
    total_consultations: number;
    unique_users: number;
    avg_response_time: number;
    total_cost: number;
    avg_confidence: number;
  };
  ai_usage: {
    claude_usage: number;
    gpt4_usage: number;
    gemini_usage: number;
  };
  strategy_usage: {
    single_ai: number;
    parallel_hybrid: number;
    sequential_cascade: number;
    consensus_voting: number;
  };
  performance_metrics: {
    fast_responses: number;
    medium_responses: number;
    slow_responses: number;
    high_confidence: number;
    medium_confidence: number;
    low_confidence: number;
  };
}

interface DailyTrend {
  date: string;
  consultations: number;
  avg_response_time: number;
  total_cost: number;
  avg_confidence: number;
}

export function AIAdminDashboard() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [stats, setStats] = useState<AIStats | null>(null);
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([]);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // 시스템 헬스 확인
      const healthResponse = await fetch('/api/ai-consulting/health?detailed=true');
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        setHealth(healthData.health);
      }

      // 통계 데이터 가져오기
      const statsResponse = await fetch(`/api/ai-consulting/stats?period=${period}`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
        setDailyTrends(statsData.daily_trends || []);
      }
    } catch (error) {
      console.error('데이터 로딩 오류:', error);
      toast.error('데이터 로딩 실패', {
        description: '관리자 대시보드 데이터를 불러올 수 없습니다.'
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [period, fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'unavailable': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'degraded': return <AlertCircle className="h-4 w-4" />;
      case 'unavailable': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(4)}`;
  const formatTime = (ms: number) => `${(ms / 1000).toFixed(1)}초`;
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Triple-AI 시스템 관리</h2>
          <p className="text-gray-600">AI 컨설팅 시스템 상태 및 성능 모니터링</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {['7d', '30d', '90d'].map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p as any)}
              >
                {p}
              </Button>
            ))}
          </div>
          <Button onClick={handleRefresh} disabled={refreshing} size="sm">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* 시스템 상태 */}
      {health && (
        <Alert className={health.overall_status === 'healthy' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <div className={getStatusColor(health.overall_status)}>
            {getStatusIcon(health.overall_status)}
          </div>
          <AlertTitle>시스템 전체 상태: {health.overall_status.toUpperCase()}</AlertTitle>
          <AlertDescription>
            <div className="grid grid-cols-4 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className={getStatusColor(health.claude_status)}>●</span>
                Claude: {health.claude_status}
              </div>
              <div className="flex items-center gap-2">
                <span className={getStatusColor(health.openai_status)}>●</span>
                OpenAI: {health.openai_status}
              </div>
              <div className="flex items-center gap-2">
                <span className={getStatusColor(health.gemini_status)}>●</span>
                Gemini: {health.gemini_status}
              </div>
              <div className="flex items-center gap-2">
                <span className={getStatusColor(health.cache_status)}>●</span>
                Cache: {health.cache_status}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2" suppressHydrationWarning>
              마지막 확인: {new Date(health.last_check).toLocaleString('ko-KR')}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 주요 메트릭 카드 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 컨설팅</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.overview.total_consultations}</div>
              <p className="text-xs text-muted-foreground">
                고유 사용자: {stats.overview.unique_users}명
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 응답시간</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(stats.overview.avg_response_time)}</div>
              <p className="text-xs text-muted-foreground">
                빠른 응답: {stats.performance_metrics.fast_responses}건
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 비용</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.overview.total_cost)}</div>
              <p className="text-xs text-muted-foreground">
                평균: {formatCurrency(stats.overview.total_cost / stats.overview.total_consultations)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 신뢰도</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercent(stats.overview.avg_confidence)}</div>
              <p className="text-xs text-muted-foreground">
                높은 신뢰도: {stats.performance_metrics.high_confidence}건
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI 사용량 */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI 모델 사용량
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Claude Opus 4</span>
                    <span className="text-sm text-gray-600">{stats.ai_usage.claude_usage}회</span>
                  </div>
                  <Progress 
                    value={(stats.ai_usage.claude_usage / stats.overview.total_consultations) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">GPT-4 Turbo</span>
                    <span className="text-sm text-gray-600">{stats.ai_usage.gpt4_usage}회</span>
                  </div>
                  <Progress 
                    value={(stats.ai_usage.gpt4_usage / stats.overview.total_consultations) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Gemini 2.5 Pro</span>
                    <span className="text-sm text-gray-600">{stats.ai_usage.gemini_usage}회</span>
                  </div>
                  <Progress 
                    value={(stats.ai_usage.gemini_usage / stats.overview.total_consultations) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 실행 전략 */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                실행 전략 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries({
                  '단일 AI': stats.strategy_usage.single_ai,
                  '병렬 하이브리드': stats.strategy_usage.parallel_hybrid,
                  '순차 캐스케이드': stats.strategy_usage.sequential_cascade,
                  '합의 투표': stats.strategy_usage.consensus_voting,
                }).map(([strategy, count]) => (
                  <div key={strategy} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{strategy}</span>
                    <Badge variant="secondary">{count}회</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 일일 트렌드 */}
      {dailyTrends && dailyTrends.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              일일 트렌드 ({period})
            </CardTitle>
            <CardDescription>
              컨설팅 횟수, 응답시간, 비용, 신뢰도 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {dailyTrends.map((trend, index) => {
                  const prevTrend = index > 0 ? dailyTrends[index - 1] : null;
                  const consultationChange = prevTrend ? trend.consultations - prevTrend.consultations : 0;
                  
                  return (
                    <div key={trend.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">
                          {new Date(trend.date).toLocaleDateString('ko-KR')}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <span>{trend.consultations}건</span>
                          {consultationChange !== 0 && (
                            <span className={`flex items-center gap-1 ${consultationChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {consultationChange > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                              {Math.abs(consultationChange)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{formatTime(trend.avg_response_time)}</span>
                        <span>{formatCurrency(trend.total_cost)}</span>
                        <span>{formatPercent(trend.avg_confidence)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}