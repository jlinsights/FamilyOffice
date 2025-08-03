/**
 * 성능 모니터링 대시보드
 * APM, RUM, Infrastructure monitoring 통합
 */

'use client';

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Database,
  TrendingUp,
  TrendingDown,
  Users,
} from 'lucide-react';

import React, { useState, useEffect, useMemo } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * 성능 모니터링 대시보드
 * APM, RUM, Infrastructure monitoring 통합
 */

/**
 * 성능 모니터링 대시보드
 * APM, RUM, Infrastructure monitoring 통합
 */

// 성능 메트릭 타입 정의
interface PerformanceMetrics {
  webVitals: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
  };
  api: {
    averageResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    errorRate: number;
    requestsPerSecond: number;
  };
  database: {
    queryTime: number;
    connectionPool: number;
    slowQueries: number;
    cacheHitRate: number;
  };
  realtime: {
    activeConnections: number;
    messagesPerSecond: number;
    latency: number;
    errorRate: number;
  };
  infrastructure: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    networkIO: number;
  };
}

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  threshold: number;
  condition: 'greater' | 'less';
  severity: 'critical' | 'warning' | 'info';
  active: boolean;
}

interface Alert {
  id: string;
  rule: AlertRule;
  value: number;
  timestamp: number;
  resolved: boolean;
}

// 성능 모니터링 훅
function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/performance/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        const data = await response.json();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return { metrics, loading, error };
}

// 알림 관리 훅
function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const alertRules: AlertRule[] = [
    {
      id: '1',
      name: 'High API Response Time',
      metric: 'api.averageResponseTime',
      threshold: 1000,
      condition: 'greater',
      severity: 'warning',
      active: true,
    },
    {
      id: '2',
      name: 'Critical API Response Time',
      metric: 'api.averageResponseTime',
      threshold: 2000,
      condition: 'greater',
      severity: 'critical',
      active: true,
    },
    {
      id: '3',
      name: 'High Error Rate',
      metric: 'api.errorRate',
      threshold: 5,
      condition: 'greater',
      severity: 'critical',
      active: true,
    },
    {
      id: '4',
      name: 'Low Cache Hit Rate',
      metric: 'database.cacheHitRate',
      threshold: 80,
      condition: 'less',
      severity: 'warning',
      active: true,
    },
    {
      id: '5',
      name: 'High Memory Usage',
      metric: 'infrastructure.memoryUsage',
      threshold: 85,
      condition: 'greater',
      severity: 'warning',
      active: true,
    },
  ];

  const checkAlerts = (metrics: PerformanceMetrics) => {
    const now = Date.now();
    const newAlerts: Alert[] = [];

    alertRules.forEach(rule => {
      if (!rule.active) return;

      const value = getNestedValue(metrics, rule.metric);
      if (value === undefined) return;

      const shouldAlert =
        rule.condition === 'greater'
          ? value > rule.threshold
          : value < rule.threshold;

      if (shouldAlert) {
        newAlerts.push({
          id: `${rule.id}_${now}`,
          rule,
          value,
          timestamp: now,
          resolved: false,
        });
      }
    });

    setAlerts(prev => [...newAlerts, ...prev.slice(0, 49)]); // 최대 50개 유지
  };

  return { alerts, alertRules, checkAlerts };
}

// 중첩된 객체 값 가져오기
function getNestedValue(obj: any, path: string): number | undefined {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// 메인 모니터링 대시보드
export function PerformanceMonitoringDashboard() {
  const { metrics, loading, error } = usePerformanceMetrics();
  const { alerts, checkAlerts } = useAlerts();
  const [timeRange, setTimeRange] = useState('1h');
  const [selectedMetric, setSelectedMetric] = useState('api');

  useEffect(() => {
    if (metrics) {
      checkAlerts(metrics);
    }
  }, [metrics, checkAlerts]);

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(
    alert => alert.rule.severity === 'critical'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>성능 데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>모니터링 오류</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* 헤더 및 제어 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">성능 모니터링</h1>
          <p className="text-muted-foreground">
            실시간 시스템 성능 및 비즈니스 메트릭
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15분</SelectItem>
              <SelectItem value="1h">1시간</SelectItem>
              <SelectItem value="6h">6시간</SelectItem>
              <SelectItem value="24h">24시간</SelectItem>
              <SelectItem value="7d">7일</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            실시간 업데이트
          </Button>
        </div>
      </div>

      {/* 알림 섹션 */}
      {activeAlerts.length > 0 && (
        <div className="space-y-2">
          {criticalAlerts.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>긴급 알림 ({criticalAlerts.length}개)</AlertTitle>
              <AlertDescription>
                시스템에 심각한 성능 문제가 감지되었습니다.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAlerts.slice(0, 6).map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* 주요 메트릭 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="평균 응답시간"
          value={`${metrics.api.averageResponseTime.toFixed(0)}ms`}
          change={-12}
          icon={<Clock className="h-4 w-4" />}
          status={
            metrics.api.averageResponseTime < 500
              ? 'good'
              : metrics.api.averageResponseTime < 1000
                ? 'warning'
                : 'critical'
          }
        />

        <MetricCard
          title="에러율"
          value={`${metrics.api.errorRate.toFixed(2)}%`}
          change={-0.5}
          icon={<AlertTriangle className="h-4 w-4" />}
          status={
            metrics.api.errorRate < 1
              ? 'good'
              : metrics.api.errorRate < 5
                ? 'warning'
                : 'critical'
          }
        />

        <MetricCard
          title="활성 연결"
          value={metrics.realtime.activeConnections.toString()}
          change={15}
          icon={<Users className="h-4 w-4" />}
          status="good"
        />

        <MetricCard
          title="캐시 적중률"
          value={`${metrics.database.cacheHitRate.toFixed(1)}%`}
          change={2.3}
          icon={<Database className="h-4 w-4" />}
          status={
            metrics.database.cacheHitRate > 90
              ? 'good'
              : metrics.database.cacheHitRate > 80
                ? 'warning'
                : 'critical'
          }
        />
      </div>

      {/* 상세 모니터링 탭 */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="database">데이터베이스</TabsTrigger>
          <TabsTrigger value="realtime">실시간</TabsTrigger>
          <TabsTrigger value="infrastructure">인프라</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab metrics={metrics} />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <APITab metrics={metrics.api} />
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <DatabaseTab metrics={metrics.database} />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealtimeTab metrics={metrics.realtime} />
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <InfrastructureTab metrics={metrics.infrastructure} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 메트릭 카드 컴포넌트
interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  status: 'good' | 'warning' | 'critical';
}

function MetricCard({ title, value, change, icon, status }: MetricCardProps) {
  const statusColors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    critical: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <Card className={`${statusColors[status]}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-60">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {change !== undefined && (
                <div
                  className={`flex items-center text-xs ${
                    change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
            </div>
          </div>
          <div className="opacity-60">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// 알림 카드 컴포넌트
function AlertCard({ alert }: { alert: Alert }) {
  const severityColors = {
    critical: 'border-red-500 bg-red-50',
    warning: 'border-yellow-500 bg-yellow-50',
    info: 'border-blue-500 bg-blue-50',
  };

  return (
    <Card className={severityColors[alert.rule.severity]}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">{alert.rule.name}</h4>
            <p className="text-sm text-muted-foreground">
              현재 값: {alert.value} (임계값: {alert.rule.threshold})
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(alert.timestamp).toLocaleTimeString('ko-KR')}
            </p>
          </div>
          <Badge
            variant={
              alert.rule.severity === 'critical' ? 'destructive' : 'secondary'
            }
          >
            {alert.rule.severity}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// 개요 탭
function OverviewTab({ metrics }: { metrics: PerformanceMetrics }) {
  const webVitalsScore = useMemo(() => {
    let score = 100;
    if (metrics.webVitals.lcp > 2500) score -= 25;
    if (metrics.webVitals.fid > 100) score -= 25;
    if (metrics.webVitals.cls > 0.1) score -= 25;
    if (metrics.webVitals.fcp > 1800) score -= 25;
    return Math.max(0, score);
  }, [metrics.webVitals]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Web Vitals 점수</CardTitle>
          <CardDescription>사용자 경험 핵심 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{webVitalsScore}</span>
              <Badge
                variant={
                  webVitalsScore >= 90
                    ? 'default'
                    : webVitalsScore >= 50
                      ? 'secondary'
                      : 'destructive'
                }
              >
                {webVitalsScore >= 90
                  ? 'Good'
                  : webVitalsScore >= 50
                    ? 'Needs Improvement'
                    : 'Poor'}
              </Badge>
            </div>

            <div className="space-y-3">
              <WebVitalMetric
                name="LCP (Largest Contentful Paint)"
                value={metrics.webVitals.lcp}
                threshold={2500}
                unit="ms"
              />
              <WebVitalMetric
                name="FID (First Input Delay)"
                value={metrics.webVitals.fid}
                threshold={100}
                unit="ms"
              />
              <WebVitalMetric
                name="CLS (Cumulative Layout Shift)"
                value={metrics.webVitals.cls}
                threshold={0.1}
                unit=""
                reverse
              />
              <WebVitalMetric
                name="FCP (First Contentful Paint)"
                value={metrics.webVitals.fcp}
                threshold={1800}
                unit="ms"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>시스템 상태</CardTitle>
          <CardDescription>전체 시스템 건강도</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SystemHealthIndicator
              name="API 서비스"
              status={metrics.api.errorRate < 1 ? 'healthy' : 'degraded'}
              details={`에러율: ${metrics.api.errorRate.toFixed(2)}%`}
            />
            <SystemHealthIndicator
              name="데이터베이스"
              status={
                metrics.database.cacheHitRate > 80 ? 'healthy' : 'degraded'
              }
              details={`캐시 적중률: ${metrics.database.cacheHitRate.toFixed(1)}%`}
            />
            <SystemHealthIndicator
              name="실시간 서비스"
              status={metrics.realtime.latency < 100 ? 'healthy' : 'degraded'}
              details={`지연시간: ${metrics.realtime.latency.toFixed(0)}ms`}
            />
            <SystemHealthIndicator
              name="인프라스트럭처"
              status={
                metrics.infrastructure.cpuUsage < 80 ? 'healthy' : 'degraded'
              }
              details={`CPU 사용률: ${metrics.infrastructure.cpuUsage.toFixed(1)}%`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Web Vital 메트릭 컴포넌트
function WebVitalMetric({
  name,
  value,
  threshold,
  unit,
  reverse = false,
}: {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  reverse?: boolean;
}) {
  const isGood = reverse ? value < threshold : value > threshold;
  const percentage = reverse
    ? Math.min((threshold / value) * 100, 100)
    : Math.min((value / threshold) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm">
          {value.toFixed(value < 1 ? 3 : 0)}
          {unit}
        </span>
      </div>
      <Progress
        value={percentage}
        className={`h-2 ${isGood ? 'bg-green-100' : 'bg-red-100'}`}
      />
    </div>
  );
}

// 시스템 건강도 지표
function SystemHealthIndicator({
  name,
  status,
  details,
}: {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  details: string;
}) {
  const statusConfig = {
    healthy: { color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-100' },
    degraded: {
      color: 'text-yellow-600',
      icon: AlertTriangle,
      bg: 'bg-yellow-100',
    },
    down: { color: 'text-red-600', icon: AlertTriangle, bg: 'bg-red-100' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${config.bg}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${config.color}`} />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{details}</div>
        </div>
      </div>
      <Badge
        variant={
          status === 'healthy'
            ? 'default'
            : status === 'degraded'
              ? 'secondary'
              : 'destructive'
        }
      >
        {status === 'healthy'
          ? '정상'
          : status === 'degraded'
            ? '성능저하'
            : '다운'}
      </Badge>
    </div>
  );
}

// API 탭
function APITab({ metrics }: { metrics: PerformanceMetrics['api'] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>응답 시간 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {metrics.averageResponseTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-muted-foreground">평균</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.p95ResponseTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-muted-foreground">95th %</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.p99ResponseTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-muted-foreground">99th %</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>처리량 및 에러율</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {metrics.requestsPerSecond.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">요청/초</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {metrics.errorRate.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">에러율</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 데이터베이스 탭
function DatabaseTab({ metrics }: { metrics: PerformanceMetrics['database'] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>쿼리 성능</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {metrics.queryTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-muted-foreground">
                  평균 쿼리 시간
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {metrics.slowQueries}
                </div>
                <div className="text-sm text-muted-foreground">느린 쿼리</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>캐시 및 연결</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {metrics.cacheHitRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">캐시 적중률</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.connectionPool}
                </div>
                <div className="text-sm text-muted-foreground">활성 연결</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 실시간 탭
function RealtimeTab({ metrics }: { metrics: PerformanceMetrics['realtime'] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>연결 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {metrics.activeConnections}
                </div>
                <div className="text-sm text-muted-foreground">활성 연결</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.messagesPerSecond.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">메시지/초</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>성능 지표</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {metrics.latency.toFixed(0)}ms
                </div>
                <div className="text-sm text-muted-foreground">
                  평균 지연시간
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {metrics.errorRate.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">에러율</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 인프라스트럭처 탭
function InfrastructureTab({
  metrics,
}: {
  metrics: PerformanceMetrics['infrastructure'];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>시스템 리소스</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ResourceUsage name="CPU" usage={metrics.cpuUsage} />
            <ResourceUsage name="메모리" usage={metrics.memoryUsage} />
            <ResourceUsage name="디스크" usage={metrics.diskUsage} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>네트워크 I/O</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {(metrics.networkIO / 1024 / 1024).toFixed(1)} MB/s
            </div>
            <div className="text-sm text-muted-foreground">네트워크 처리량</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 리소스 사용률 컴포넌트
function ResourceUsage({ name, usage }: { name: string; usage: number }) {
  const getColor = (usage: number) => {
    if (usage < 60) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm">{usage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getColor(usage)}`}
          style={{ width: `${usage}%` }}
        />
      </div>
    </div>
  );
}
