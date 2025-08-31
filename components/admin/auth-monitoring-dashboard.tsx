'use client';

/**
 * 카카오 인증 시스템 모니터링 대시보드
 * 실시간 메트릭, 성능 분석, 에러 추적을 위한 관리자 전용 컴포넌트
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import Image from 'next/image';
import { getAuthMonitoringService } from '@/lib/monitoring/auth-monitoring';
import { getKakaoBusinessAPIService } from '@/lib/kakao/kakao-business-api';

interface DashboardProps {
  refreshInterval?: number;
  showSensitiveData?: boolean;
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  lastUpdate: number;
}

interface PerformanceReport {
  summary: {
    totalEvents: number;
    successRate: number;
    avgLoginTime: number;
    avgTokenRefreshTime: number;
    avgProfileSyncTime: number;
    cacheHitRate: number;
  };
  trends: {
    hourly: Array<{ hour: number; events: number; errors: number }>;
    daily: Array<{ day: string; events: number; errors: number }>;
  };
  topErrors: Array<{ error: string; count: number; percentage: number }>;
  userInsights: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    avgSessionDuration: number;
    preferredAuthMethods: Record<string, number>;
    deviceTypes: Record<string, number>;
  };
}

export default function AuthMonitoringDashboard({ 
  refreshInterval = 30000, 
  showSensitiveData = false 
}: DashboardProps) {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null);
  const [kakaoServiceStatus, setKakaoServiceStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sensitiveDataVisible, setSensitiveDataVisible] = useState(showSensitiveData);

  const monitoring = getAuthMonitoringService();
  const kakaoService = getKakaoBusinessAPIService();

  // 데이터 새로고침 함수
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 시스템 헬스 체크
      const health = monitoring.getSystemHealth();
      setSystemHealth(health);

      // 성능 리포트 생성
      const report = monitoring.generatePerformanceReport();
      setPerformanceReport(report);

      // 카카오 서비스 상태 확인
      const kakaoStatus = kakaoService.getServiceStatus();
      setKakaoServiceStatus(kakaoStatus);

      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [monitoring, kakaoService]);

  // 초기 데이터 로드
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // 자동 새로고침
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshData, refreshInterval, autoRefresh]);

  // 상태에 따른 색상 반환
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'degraded': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  // 리포트 다운로드
  const downloadReport = () => {
    if (!performanceReport) return;

    const reportData = {
      timestamp: new Date().toISOString(),
      systemHealth,
      performanceReport,
      kakaoServiceStatus
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auth-monitoring-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>모니터링 데이터 로드 실패</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Image 
              src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
              alt="카카오"
              width={32}
              height={32}
              className="rounded-sm"
            />
            <h2 className="text-3xl font-bold tracking-tight">카카오 인증 모니터링</h2>
          </div>
          <div>
            <p className="text-muted-foreground">
              실시간 시스템 상태 및 성능 모니터링 대시보드
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSensitiveDataVisible(!sensitiveDataVisible)}
          >
            {sensitiveDataVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            민감정보 {sensitiveDataVisible ? '숨김' : '표시'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={downloadReport}>
            <Download className="h-4 w-4 mr-1" />
            리포트 다운로드
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
            자동새로고침 {autoRefresh ? 'ON' : 'OFF'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 마지막 업데이트 시간 */}
      <div className="text-sm text-muted-foreground">
        마지막 업데이트: {lastRefresh.toLocaleString('ko-KR')}
      </div>

      {/* 시스템 상태 개요 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">시스템 상태</CardTitle>
            <Activity className={`h-4 w-4 ${systemHealth ? getStatusColor(systemHealth.status) : 'text-gray-400'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={systemHealth ? getStatusBadgeVariant(systemHealth.status) : 'outline'}>
                {systemHealth?.status || 'Loading...'}
              </Badge>
              {systemHealth && (
                <span className="text-xs text-muted-foreground">
                  업타임: {systemHealth.uptime}%
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth?.activeUsers.toLocaleString() || '-'}
            </div>
            <p className="text-xs text-muted-foreground">지난 24시간</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">응답 시간</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth ? `${Math.round(systemHealth.responseTime)}ms` : '-'}
            </div>
            <p className="text-xs text-muted-foreground">평균 응답 시간</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">에러율</CardTitle>
            {systemHealth && systemHealth.errorRate > 0.1 ? (
              <XCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth ? `${(systemHealth.errorRate * 100).toFixed(2)}%` : '-'}
            </div>
            <p className="text-xs text-muted-foreground">지난 1시간</p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 모니터링 탭 */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="performance">성능</TabsTrigger>
          <TabsTrigger value="errors">에러</TabsTrigger>
          <TabsTrigger value="users">사용자</TabsTrigger>
          <TabsTrigger value="kakao">카카오 서비스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* 성공률 */}
            <Card>
              <CardHeader>
                <CardTitle>로그인 성공률</CardTitle>
                <CardDescription>지난 24시간 동안의 성공률</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">성공률</span>
                    <span className="text-sm font-medium">
                      {performanceReport 
                        ? `${(performanceReport.summary.successRate * 100).toFixed(1)}%` 
                        : '-'
                      }
                    </span>
                  </div>
                  <Progress 
                    value={performanceReport ? performanceReport.summary.successRate * 100 : 0} 
                    className="w-full" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* 캐시 성능 */}
            <Card>
              <CardHeader>
                <CardTitle>캐시 성능</CardTitle>
                <CardDescription>캐시 히트율 및 성능 지표</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">캐시 히트율</span>
                    <span className="text-sm font-medium">
                      {performanceReport 
                        ? `${(performanceReport.summary.cacheHitRate * 100).toFixed(1)}%` 
                        : '-'
                      }
                    </span>
                  </div>
                  <Progress 
                    value={performanceReport ? performanceReport.summary.cacheHitRate * 100 : 0} 
                    className="w-full" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 시간별 트렌드 */}
          <Card>
            <CardHeader>
              <CardTitle>24시간 활동 트렌드</CardTitle>
              <CardDescription>시간대별 로그인 활동 현황</CardDescription>
            </CardHeader>
            <CardContent>
              {performanceReport?.trends.hourly && (
                <div className="grid grid-cols-24 gap-1">
                  {performanceReport.trends.hourly.map((hour, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded-sm flex items-center justify-center text-xs ${
                        hour.events > 0 
                          ? hour.errors > 0 
                            ? 'bg-red-200 text-red-800' 
                            : 'bg-green-200 text-green-800'
                          : 'bg-gray-100'
                      }`}
                      title={`${hour.hour}시: ${hour.events}건 (에러: ${hour.errors}건)`}
                    >
                      {hour.hour}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 성능 탭 */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>로그인 시간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport 
                    ? `${Math.round(performanceReport.summary.avgLoginTime)}ms` 
                    : '-'
                  }
                </div>
                <p className="text-xs text-muted-foreground">평균 로그인 시간</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>토큰 갱신</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport 
                    ? `${Math.round(performanceReport.summary.avgTokenRefreshTime)}ms` 
                    : '-'
                  }
                </div>
                <p className="text-xs text-muted-foreground">평균 갱신 시간</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>프로필 동기화</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport 
                    ? `${Math.round(performanceReport.summary.avgProfileSyncTime)}ms` 
                    : '-'
                  }
                </div>
                <p className="text-xs text-muted-foreground">평균 동기화 시간</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 에러 탭 */}
        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>상위 에러 목록</CardTitle>
              <CardDescription>빈도가 높은 에러들을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              {performanceReport?.topErrors.length ? (
                <div className="space-y-2">
                  {performanceReport.topErrors.map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {sensitiveDataVisible ? error.error : '***HIDDEN***'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {error.count}건 발생 ({error.percentage.toFixed(1)}%)
                        </div>
                      </div>
                      <Badge variant="secondary">{error.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  최근 에러가 없습니다 🎉
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 사용자 탭 */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>총 사용자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport?.userInsights.totalUsers.toLocaleString() || '-'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>신규 사용자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport?.userInsights.newUsers.toLocaleString() || '-'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>재방문 사용자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport?.userInsights.returningUsers.toLocaleString() || '-'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>세션 지속 시간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceReport 
                    ? `${Math.round(performanceReport.userInsights.avgSessionDuration / 1000 / 60)}분` 
                    : '-'
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 디바이스 타입 분포 */}
          <Card>
            <CardHeader>
              <CardTitle>디바이스 타입</CardTitle>
            </CardHeader>
            <CardContent>
              {performanceReport?.userInsights.deviceTypes && (
                <div className="space-y-2">
                  {Object.entries(performanceReport.userInsights.deviceTypes).map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{device}</span>
                      <span className="text-sm font-medium">{count}명</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 카카오 서비스 탭 */}
        <TabsContent value="kakao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>카카오 API 서비스 상태</CardTitle>
              <CardDescription>카카오 개발자 API 연동 상태</CardDescription>
            </CardHeader>
            <CardContent>
              {kakaoServiceStatus && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">설정 상태:</span>
                    <Badge variant={kakaoServiceStatus.isConfigured ? 'default' : 'destructive'}>
                      {kakaoServiceStatus.isConfigured ? '완료' : '미완료'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">사용 가능한 기능</h4>
                    <div className="grid gap-2">
                      {kakaoServiceStatus.availableFeatures.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {kakaoServiceStatus.missingConfig.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-red-600">누락된 설정</h4>
                      <div className="grid gap-2">
                        {kakaoServiceStatus.missingConfig.map((config: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{config}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}