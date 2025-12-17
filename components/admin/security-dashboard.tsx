'use client';

/**
 * Supabase 보안 대시보드 컴포넌트
 * 실시간 보안 상태 모니터링 및 경고 관리
 */

import { AlertTriangle, CheckCircle, Clock, RefreshCw, Shield, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SecurityCheck {
  id: string;
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  recommendation?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'rls' | 'auth' | 'api' | 'data' | 'network';
}

interface SecurityReport {
  timestamp: Date;
  overallScore: number;
  checks: SecurityCheck[];
  summary: {
    passed: number;
    warnings: number;
    failed: number;
    critical: number;
  };
}

interface SecurityAuditResponse {
  success: boolean;
  data: {
    report: SecurityReport;
    criticalIssues: SecurityCheck[];
    recommendations: Array<{
      id: string;
      priority: string;
      action: string;
      category: string;
    }>;
  };
  timestamp: string;
}

export default function SecurityDashboard() {
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [criticalIssues, setCriticalIssues] = useState<SecurityCheck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 보안 감사 실행
  const runSecurityAudit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/security/audit', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: SecurityAuditResponse = await response.json();

      if (!data.success) {
        throw new Error((data as any).error || '보안 감사에 실패했습니다.');
      }

      setReport(data.data.report);
      setCriticalIssues(data.data.criticalIssues);
      setLastUpdated(new Date());

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '보안 감사 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Security audit error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 초기 감사 실행
  useEffect(() => {
    runSecurityAudit();
  }, []);

  // 보안 점수에 따른 상태 표시
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', label: '우수', icon: CheckCircle };
    if (score >= 70) return { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', label: '양호', icon: Clock };
    if (score >= 50) return { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', label: '주의', icon: AlertTriangle };
    return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', label: '위험', icon: XCircle };
  };

  // 심각도에 따른 배지 색상
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive">긴급</Badge>;
      case 'high': return <Badge variant="destructive">높음</Badge>;
      case 'medium': return <Badge variant="secondary">보통</Badge>;
      case 'low': return <Badge variant="outline">낮음</Badge>;
      default: return <Badge variant="outline">{severity}</Badge>;
    }
  };

  // 상태에 따른 아이콘
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>보안 감사 오류</AlertTitle>
          <AlertDescription>
            {error}
            <Button 
              onClick={runSecurityAudit} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              다시 시도
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supabase 보안 대시보드</h1>
          <p className="text-gray-600 dark:text-gray-400">
            실시간 보안 상태 모니터링 및 취약점 관리
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              마지막 업데이트: {lastUpdated.toLocaleString('ko-KR')}
            </span>
          )}
          <Button
            onClick={runSecurityAudit}
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Shield className="h-4 w-4 mr-2" />
            )}
            {loading ? '검사 중...' : '보안 검사'}
          </Button>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && !report && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-lg">보안 검사를 실행 중입니다...</span>
        </div>
      )}

      {/* 보안 점수 카드 */}
      {report && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              전체 보안 점수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {(() => {
                  const status = getScoreStatus(report.overallScore);
                  const StatusIcon = status.icon;
                  return (
                    <>
                      <div className={`p-3 rounded-full ${status.bg}`}>
                        <StatusIcon className={`h-8 w-8 ${status.color}`} />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{report.overallScore}점</div>
                        <div className={`text-sm font-medium ${status.color}`}>
                          {status.label}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{report.summary.passed}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">통과</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{report.summary.failed}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">실패</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 긴급 이슈 알림 */}
      {criticalIssues.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>🚨 긴급 보안 이슈 {criticalIssues.length}개 발견</AlertTitle>
          <AlertDescription>
            즉시 조치가 필요한 보안 문제가 발견되었습니다. 아래 권장사항을 확인하세요.
          </AlertDescription>
        </Alert>
      )}

      {/* 상세 보안 검사 결과 */}
      {report && (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">전체 ({report.checks.length})</TabsTrigger>
            <TabsTrigger value="critical">긴급 ({criticalIssues.length})</TabsTrigger>
            <TabsTrigger value="rls">RLS 정책</TabsTrigger>
            <TabsTrigger value="auth">인증</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="data">데이터</TabsTrigger>
            <TabsTrigger value="network">네트워크</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {report.checks.map((check) => (
              <Card key={check.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(check.status)}
                      <CardTitle className="text-base">{check.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(check.severity)}
                      <Badge variant="outline">{check.category}</Badge>
                    </div>
                  </div>
                  <CardDescription>{check.message}</CardDescription>
                </CardHeader>
                {check.recommendation && (
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">권장사항:</p>
                      <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">{check.recommendation}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="critical" className="space-y-4">
            {criticalIssues.map((check) => (
              <Card key={check.id} className="border-red-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <CardTitle className="text-base text-red-800">{check.name}</CardTitle>
                    </div>
                    {getSeverityBadge(check.severity)}
                  </div>
                  <CardDescription className="text-red-700">{check.message}</CardDescription>
                </CardHeader>
                {check.recommendation && (
                  <CardContent>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">즉시 조치 필요:</p>
                      <p className="text-sm text-red-700 dark:text-red-200 mt-1">{check.recommendation}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {['rls', 'auth', 'api', 'data', 'network'].map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              {report.checks
                .filter(check => check.category === category)
                .map((check) => (
                  <Card key={check.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(check.status)}
                          <CardTitle className="text-base">{check.name}</CardTitle>
                        </div>
                        {getSeverityBadge(check.severity)}
                      </div>
                      <CardDescription>{check.message}</CardDescription>
                    </CardHeader>
                    {check.recommendation && (
                      <CardContent>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">권장사항:</p>
                          <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">{check.recommendation}</p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}