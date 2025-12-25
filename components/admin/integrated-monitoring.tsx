'use client';

import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Bell,
  BarChart3,
  RefreshCw,
  Play,
  Pause,
  Target,
  Eye,
  Users,
  MousePointer,
  Search,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';

import React, { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MonitoringAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  source: 'seo' | 'ranking' | 'traffic' | 'performance' | 'aeo';
  actionRequired: boolean;
  acknowledged: boolean;
}

interface PerformanceMetric {
  name: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

interface MonitoringData {
  alerts: MonitoringAlert[];
  realTimeMetrics: {
    seo: {
      avgRanking: PerformanceMetric;
      organicTraffic: PerformanceMetric;
      keywordVisibility: PerformanceMetric;
      technicalScore: PerformanceMetric;
    };
    aeo: {
      answerCoverage: PerformanceMetric;
      voiceOptimization: PerformanceMetric;
      aiCompatibility: PerformanceMetric;
      structuredAnswers: PerformanceMetric;
    };
    performance: {
      pageSpeed: PerformanceMetric;
      coreWebVitals: PerformanceMetric;
      uptime: PerformanceMetric;
      errorRate: PerformanceMetric;
    };
    business: {
      conversionRate: PerformanceMetric;
      leadGeneration: PerformanceMetric;
      engagement: PerformanceMetric;
      retention: PerformanceMetric;
    };
  };
  automationStatus: {
    seoOptimization: boolean;
    rankingTracking: boolean;
    contentGeneration: boolean;
    performanceMonitoring: boolean;
    alertNotifications: boolean;
    reportGeneration: boolean;
  };
  systemHealth: {
    overall: number;
    components: Array<{
      name: string;
      status: 'online' | 'degraded' | 'offline';
      uptime: number;
      lastCheck: string;
    }>;
  };
}

export function IntegratedMonitoring() {
  const [data, setData] = useState<MonitoringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // 모의 데이터
  useEffect(() => {
    const mockData: MonitoringData = {
      alerts: [
        {
          id: '1',
          type: 'warning',
          title: '키워드 순위 하락',
          message: '"정책자금 신청" 키워드가 25위에서 28위로 하락했습니다.',
          timestamp: '2024-01-15 14:30:00',
          source: 'ranking',
          actionRequired: true,
          acknowledged: false,
        },
        {
          id: '2',
          type: 'success',
          title: 'SEO 목표 달성',
          message: '월간 유기적 트래픽이 목표치 8,000을 초과했습니다 (8,500).',
          timestamp: '2024-01-15 13:15:00',
          source: 'traffic',
          actionRequired: false,
          acknowledged: false,
        },
        {
          id: '3',
          type: 'info',
          title: 'AEO 최적화 완료',
          message: '15개 질문에 대한 구조화 답변이 생성되었습니다.',
          timestamp: '2024-01-15 12:00:00',
          source: 'aeo',
          actionRequired: false,
          acknowledged: true,
        },
        {
          id: '4',
          type: 'critical',
          title: 'Core Web Vitals 저하',
          message: '모바일 LCP가 3.2초로 권장 기준을 초과했습니다.',
          timestamp: '2024-01-15 11:45:00',
          source: 'performance',
          actionRequired: true,
          acknowledged: false,
        },
      ],
      realTimeMetrics: {
        seo: {
          avgRanking: {
            name: '평균 순위',
            current: 15.8,
            previous: 18.2,
            target: 15.0,
            unit: '위',
            trend: 'up',
            status: 'good',
          },
          organicTraffic: {
            name: '유기적 트래픽',
            current: 8500,
            previous: 7800,
            target: 8000,
            unit: '세션',
            trend: 'up',
            status: 'good',
          },
          keywordVisibility: {
            name: '키워드 가시성',
            current: 78,
            previous: 72,
            target: 80,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
          technicalScore: {
            name: '기술적 SEO',
            current: 87,
            previous: 85,
            target: 90,
            unit: '점',
            trend: 'up',
            status: 'good',
          },
        },
        aeo: {
          answerCoverage: {
            name: '답변 커버리지',
            current: 91,
            previous: 88,
            target: 95,
            unit: '%',
            trend: 'up',
            status: 'good',
          },
          voiceOptimization: {
            name: '음성 최적화',
            current: 88,
            previous: 82,
            target: 90,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
          aiCompatibility: {
            name: 'AI 호환성',
            current: 89,
            previous: 86,
            target: 92,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
          structuredAnswers: {
            name: '구조화 답변',
            current: 94,
            previous: 91,
            target: 95,
            unit: '%',
            trend: 'up',
            status: 'good',
          },
        },
        performance: {
          pageSpeed: {
            name: '페이지 속도',
            current: 92,
            previous: 89,
            target: 90,
            unit: '점',
            trend: 'up',
            status: 'good',
          },
          coreWebVitals: {
            name: 'Core Web Vitals',
            current: 85,
            previous: 88,
            target: 90,
            unit: '점',
            trend: 'down',
            status: 'warning',
          },
          uptime: {
            name: '가동률',
            current: 99.9,
            previous: 99.8,
            target: 99.9,
            unit: '%',
            trend: 'up',
            status: 'good',
          },
          errorRate: {
            name: '오류율',
            current: 0.1,
            previous: 0.2,
            target: 0.1,
            unit: '%',
            trend: 'up',
            status: 'good',
          },
        },
        business: {
          conversionRate: {
            name: '전환율',
            current: 2.14,
            previous: 1.98,
            target: 2.5,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
          leadGeneration: {
            name: '리드 생성',
            current: 127,
            previous: 115,
            target: 150,
            unit: '건',
            trend: 'up',
            status: 'warning',
          },
          engagement: {
            name: '참여도',
            current: 78,
            previous: 75,
            target: 80,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
          retention: {
            name: '재방문율',
            current: 45,
            previous: 42,
            target: 50,
            unit: '%',
            trend: 'up',
            status: 'warning',
          },
        },
      },
      automationStatus: {
        seoOptimization: true,
        rankingTracking: true,
        contentGeneration: false,
        performanceMonitoring: true,
        alertNotifications: true,
        reportGeneration: true,
      },
      systemHealth: {
        overall: 92,
        components: [
          {
            name: 'SEO 분석',
            status: 'online',
            uptime: 99.9,
            lastCheck: '2024-01-15 14:30',
          },
          {
            name: '순위 추적',
            status: 'online',
            uptime: 98.7,
            lastCheck: '2024-01-15 14:29',
          },
          {
            name: 'AEO 엔진',
            status: 'online',
            uptime: 99.5,
            lastCheck: '2024-01-15 14:30',
          },
          {
            name: '성과 모니터링',
            status: 'degraded',
            uptime: 95.2,
            lastCheck: '2024-01-15 14:28',
          },
          {
            name: '알림 시스템',
            status: 'online',
            uptime: 100.0,
            lastCheck: '2024-01-15 14:30',
          },
        ],
      },
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up')
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down')
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <span className="h-4 w-4 bg-gray-300 rounded-full"></span>;
  };

  const toggleAutomation = (key: keyof MonitoringData['automationStatus']) => {
    if (!data) return;

    setData(prev =>
      prev
        ? {
            ...prev,
            automationStatus: {
              ...prev.automationStatus,
              [key]: !prev.automationStatus[key],
            },
          }
        : null
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    if (!data) return;

    setData(prev =>
      prev
        ? {
            ...prev,
            alerts: prev.alerts.map(alert =>
              alert.id === alertId ? { ...alert, acknowledged: true } : alert
            ),
          }
        : null
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>모니터링 시스템 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">통합 성과 모니터링</h1>
          <p className="text-muted-foreground mt-2">
            실시간 SEO/AEO 성과 모니터링 및 자동화 관리
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              id="auto-refresh"
            />
            <Label htmlFor="auto-refresh">자동 새로고침</Label>
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
        </div>
      </div>

      {/* 시스템 상태 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            시스템 상태
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.systemHealth.components.map((component, index) => (
              <div
                key={index}
                className="text-center p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center justify-center mb-2">
                  {component.status === 'online' && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                  {component.status === 'degraded' && (
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  )}
                  {component.status === 'offline' && (
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div className="font-medium text-sm">{component.name}</div>
                <div className="text-xs text-muted-foreground">
                  {component.uptime}% 가동률
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              전체 시스템 상태: {data.systemHealth.overall}%
            </div>
            <Progress
              value={data.systemHealth.overall}
              className="w-full h-2 mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">대시보드</TabsTrigger>
          <TabsTrigger value="alerts">알림 센터</TabsTrigger>
          <TabsTrigger value="automation">자동화 설정</TabsTrigger>
          <TabsTrigger value="reports">리포트</TabsTrigger>
        </TabsList>

        {/* 대시보드 탭 */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* 실시간 메트릭 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SEO 메트릭 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  SEO 성과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(data.realTimeMetrics.seo).map(
                  (metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${getStatusColor(metric.status)}`}
                        >
                          {metric.current}
                          {metric.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          목표: {metric.target}
                          {metric.unit}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* AEO 메트릭 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  AEO 최적화
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(data.realTimeMetrics.aeo).map(
                  (metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${getStatusColor(metric.status)}`}
                        >
                          {metric.current}
                          {metric.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          목표: {metric.target}
                          {metric.unit}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* 성능 메트릭 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  성능 지표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(data.realTimeMetrics.performance).map(
                  (metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${getStatusColor(metric.status)}`}
                        >
                          {metric.current}
                          {metric.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          목표: {metric.target}
                          {metric.unit}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* 비즈니스 메트릭 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  비즈니스 성과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(data.realTimeMetrics.business).map(
                  (metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${getStatusColor(metric.status)}`}
                        >
                          {metric.current}
                          {metric.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          목표: {metric.target}
                          {metric.unit}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 알림 센터 탭 */}
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>실시간 알림</CardTitle>
              <CardDescription>
                시스템에서 발생한 중요한 이벤트 및 알림
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'critical'
                        ? 'bg-red-50 border-red-500'
                        : alert.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-500'
                          : alert.type === 'success'
                            ? 'bg-green-50 border-green-500'
                            : 'bg-blue-50 border-blue-500'
                    } ${alert.acknowledged ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{alert.source}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {alert.actionRequired && !alert.acknowledged && (
                          <Badge variant="destructive">조치 필요</Badge>
                        )}
                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            확인
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 자동화 설정 탭 */}
        <TabsContent value="automation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>자동화 기능</CardTitle>
                <CardDescription>시스템 자동화 기능 설정</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(data.automationStatus).map(([key, enabled]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">
                        {key === 'seoOptimization'
                          ? 'SEO 최적화'
                          : key === 'rankingTracking'
                            ? '순위 추적'
                            : key === 'contentGeneration'
                              ? '콘텐츠 생성'
                              : key === 'performanceMonitoring'
                                ? '성능 모니터링'
                                : key === 'alertNotifications'
                                  ? '알림 발송'
                                  : key === 'reportGeneration'
                                    ? '리포트 생성'
                                    : key}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {enabled ? '활성화됨' : '비활성화됨'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {enabled ? (
                        <Play className="h-4 w-4 text-green-500" />
                      ) : (
                        <Pause className="h-4 w-4 text-gray-400" />
                      )}
                      <Switch
                        checked={enabled}
                        onCheckedChange={() =>
                          toggleAutomation(
                            key as keyof MonitoringData['automationStatus']
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>모니터링 설정</CardTitle>
                <CardDescription>알림 및 리포팅 설정</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>알림 빈도</Label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>실시간</option>
                    <option>1시간마다</option>
                    <option>하루 한 번</option>
                    <option>주간 요약</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label>리포트 주기</Label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>일일</option>
                    <option>주간</option>
                    <option>월간</option>
                    <option>분기별</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label>시간 범위</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1h', '24h', '7d', '30d'].map(range => (
                      <Button
                        key={range}
                        variant={
                          selectedTimeRange === range ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedTimeRange(range)}
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 리포트 탭 */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                성과 리포트
              </CardTitle>
              <CardDescription>자동 생성된 성과 분석 리포트</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: '일일 SEO 성과 리포트',
                    date: '2024-01-15',
                    type: 'SEO',
                    status: '생성 완료',
                  },
                  {
                    title: '주간 키워드 순위 변화',
                    date: '2024-01-14',
                    type: 'Ranking',
                    status: '생성 완료',
                  },
                  {
                    title: '월간 AEO 최적화 리포트',
                    date: '2024-01-01',
                    type: 'AEO',
                    status: '생성 완료',
                  },
                  {
                    title: '성능 모니터링 주간 요약',
                    date: '2024-01-14',
                    type: 'Performance',
                    status: '생성 중',
                  },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.date} • {report.type}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          report.status === '생성 완료'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {report.status}
                      </Badge>
                      {report.status === '생성 완료' && (
                        <Button size="sm" variant="outline">
                          다운로드
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />새 리포트 생성
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
