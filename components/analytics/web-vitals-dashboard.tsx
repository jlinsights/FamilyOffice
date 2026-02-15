'use client';

/**
 * Core Web Vitals 대시보드 컴포넌트
 * 실시간 웹 성능 모니터링 및 분석 대시보드
 */
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Gauge,
  RefreshCw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WebVitalsAlert {
  type: 'critical' | 'warning' | 'info';
  metric: string;
  message: string;
  value: number;
  threshold: number;
}

interface WebVitalsData {
  overview: {
    performanceScore: number;
    performanceGrade: string;
    totalSamples: number;
    hasAlerts: boolean;
    alertCount: number;
    timestamp: number;
  };
  analytics: {
    summary: {
      totalSamples: number;
      averageScores: {
        lcp: { value: number; rating: string };
        fid: { value: number; rating: string };
        cls: { value: number; rating: string };
        fcp: { value: number; rating: string };
        ttfb: { value: number; rating: string };
        inp: { value: number; rating: string };
      };
      performanceScore: number;
    };
    pageBreakdown: Array<{
      url: string;
      sampleCount: number;
      averageLCP: number;
      averageFID: number;
      averageCLS: number;
      performanceGrade: string;
    }>;
  };
  alerts: WebVitalsAlert[];
  recommendations: string[];
}

export function WebVitalsDashboard() {
  const [data, setData] = useState<WebVitalsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/web-vitals');

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('관리자 권한이 필요합니다.');
        }
        throw new Error('데이터를 가져오는데 실패했습니다.');
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date());
      } else {
        throw new Error(result.message || '데이터 로드 실패');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
      console.error('웹 바이탈 데이터 로드 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('모든 웹 바이탈 데이터를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch('/api/web-vitals', { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        await fetchData(); // 데이터 새로고침
        alert('웹 바이탈 데이터가 초기화되었습니다.');
      } else {
        alert('데이터 초기화에 실패했습니다.');
      }
    } catch (err) {
      console.error('데이터 초기화 오류:', err);
      alert('데이터 초기화 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000); // 30초마다 새로고침
      return () => clearInterval(interval);
    }
    return undefined;
  }, [autoRefresh]);

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'LCP':
        return <Eye className="w-4 h-4" />;
      case 'FID':
      case 'INP':
        return <Zap className="w-4 h-4" />;
      case 'CLS':
        return <Activity className="w-4 h-4" />;
      case 'FCP':
        return <TrendingUp className="w-4 h-4" />;
      case 'TTFB':
        return <Clock className="w-4 h-4" />;
      default:
        return <Gauge className="w-4 h-4" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40';
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40';
      case 'poor':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40';
      case 'B':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40';
      case 'C':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40';
      case 'D':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40';
      case 'F':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const formatMetricValue = (metric: string, value: number): string => {
    switch (metric) {
      case 'CLS':
        return (value / 1000).toFixed(3); // CLS는 소수점으로 표시
      case 'LCP':
      case 'FCP':
      case 'TTFB':
        return `${Math.round(value)}ms`;
      case 'FID':
      case 'INP':
        return `${Math.round(value)}ms`;
      default:
        return `${Math.round(value)}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">웹 성능 모니터링</h2>
          <div className="animate-spin">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">웹 성능 모니터링</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="mt-2 ml-2"
              onClick={fetchData}
            >
              다시 시도
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">웹 성능 모니터링</h2>
        <p className="text-muted-foreground">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">웹 성능 모니터링</h2>
          <p className="text-muted-foreground">
            Core Web Vitals 실시간 분석{' '}
            {lastUpdated &&
              `(마지막 업데이트: ${lastUpdated.toLocaleString()})`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={
              autoRefresh
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : ''
            }
          >
            {autoRefresh ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-1" />
            )}
            {autoRefresh ? '자동 새로고침' : '수동 새로고침'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            새로고침
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearData}>
            데이터 초기화
          </Button>
        </div>
      </div>

      {/* 전체 성능 점수 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            전체 성능 점수
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {data.overview.performanceScore}
            </div>
            <Badge className={getGradeColor(data.overview.performanceGrade)}>
              등급 {data.overview.performanceGrade}
            </Badge>
            <div className="flex-1">
              <Progress
                value={data.overview.performanceScore}
                className="h-2"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {data.overview.totalSamples}개 샘플
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 알림 */}
      {data.alerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            성능 알림 ({data.alerts.length})
          </h3>
          {data.alerts.map((alert, index) => (
            <Alert
              key={index}
              variant={alert.type === 'critical' ? 'destructive' : 'default'}
              className={
                alert.type === 'warning'
                  ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                  : ''
              }
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {alert.metric}{' '}
                {alert.type === 'critical' ? '심각한 문제' : '개선 필요'}
              </AlertTitle>
              <AlertDescription>
                {alert.message} (현재:{' '}
                {formatMetricValue(alert.metric, alert.value)}, 권장:{' '}
                {formatMetricValue(alert.metric, alert.threshold)} 이하)
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* 메트릭 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.analytics.summary.averageScores).map(
          ([metric, score]) => (
            <Card key={metric}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {getMetricIcon(metric.toUpperCase())}
                  {metric.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {formatMetricValue(metric.toUpperCase(), score.value)}
                  </div>
                  <Badge className={getRatingColor(score.rating)}>
                    {score.rating === 'good'
                      ? '양호'
                      : score.rating === 'needs-improvement'
                        ? '개선 필요'
                        : '나쁨'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* 페이지별 성능 */}
      {data.analytics.pageBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>페이지별 성능 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.analytics.pageBreakdown.slice(0, 10).map((page, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Badge className={getGradeColor(page.performanceGrade)}>
                    {page.performanceGrade}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {page.url || '/'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {page.sampleCount}개 샘플
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div>LCP: {page.averageLCP}ms</div>
                    <div>FID: {page.averageFID}ms</div>
                    <div>CLS: {page.averageCLS}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 개선 권장사항 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            성능 개선 권장사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm">{recommendation}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
