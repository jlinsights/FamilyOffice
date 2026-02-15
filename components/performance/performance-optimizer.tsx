'use client';

/**
 * 🚀 성능 최적화 실행 컴포넌트
 * Core Web Vitals 개선을 위한 자동 최적화
 */
import {
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
  Layout,
  Loader2,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  improveLCP,
  optimizeImages,
  reduceCLS,
} from '@/components/performance/core-web-vitals';

interface OptimizationTask {
  id: string;
  name: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimated_improvement: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  function: () => void;
  icon: React.ReactNode;
}

export default function PerformanceOptimizer() {
  const [tasks, setTasks] = useState<OptimizationTask[]>([
    {
      id: 'optimize-images',
      name: '이미지 최적화',
      description: 'WebP 포맷 변환, lazy loading, fetchpriority 설정',
      impact: 'high',
      estimated_improvement: 'LCP -400ms',
      status: 'pending',
      function: optimizeImages,
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 'reduce-cls',
      name: 'CLS 최적화',
      description: 'Layout Shift 방지, 폰트 로딩 최적화',
      impact: 'high',
      estimated_improvement: 'CLS -0.02',
      status: 'pending',
      function: reduceCLS,
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: 'improve-lcp',
      name: 'LCP 개선',
      description: 'Critical 리소스 프리로드, Hero 이미지 최적화',
      impact: 'high',
      estimated_improvement: 'LCP -300ms',
      status: 'pending',
      function: improveLCP,
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ]);

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 border-green-200 bg-green-50';
      case 'running':
        return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'error':
        return 'text-red-600 border-red-200 bg-red-50';
      default:
        return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const runOptimization = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: 'running' } : t))
    );

    try {
      // 최적화 함수 실행
      await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션 딜레이
      task.function();

      setTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, status: 'completed' } : t))
      );
    } catch (error) {
      console.error(`Optimization failed for ${taskId}:`, error);
      setTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, status: 'error' } : t))
      );
    }
  };

  const runAllOptimizations = async () => {
    setIsOptimizing(true);
    setProgress(0);

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (!task) continue;
      await runOptimization(task.id);
      setProgress(((i + 1) / tasks.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 500)); // 각 최적화 간 딜레이
    }

    setIsOptimizing(false);

    // 최적화 완료 후 페이지 새로고침으로 변경사항 적용
    setTimeout(() => {
      if (
        window.confirm(
          '최적화가 완료되었습니다. 변경사항을 적용하려면 페이지를 새로고침하시겠습니까?'
        )
      ) {
        window.location.reload();
      }
    }, 1000);
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-6">
      {/* 헤더 및 전체 실행 버튼 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">성능 최적화 실행</h2>
          <p className="text-gray-600">
            Core Web Vitals 개선을 위한 자동 최적화
          </p>
        </div>

        <Button
          onClick={runAllOptimizations}
          disabled={isOptimizing || completedTasks === totalTasks}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              최적화 중...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              전체 최적화 실행
            </>
          )}
        </Button>
      </div>

      {/* 진행상황 */}
      {isOptimizing && (
        <Card>
          <CardHeader>
            <CardTitle>최적화 진행상황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-600">
                {completedTasks}/{totalTasks} 작업 완료 ({Math.round(progress)}
                %)
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 완료 알림 */}
      {completedTasks === totalTasks && completedTasks > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            모든 최적화가 완료되었습니다! 변경사항을 확인하려면 페이지를
            새로고침해주세요.
          </AlertDescription>
        </Alert>
      )}

      {/* 최적화 작업 목록 */}
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {task.icon}
                  <div>
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getImpactColor(task.impact)}>
                    {task.impact === 'high'
                      ? '높음'
                      : task.impact === 'medium'
                        ? '중간'
                        : '낮음'}{' '}
                    영향
                  </Badge>
                  <Badge variant="outline">{task.estimated_improvement}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status === 'pending' && '대기중'}
                    {task.status === 'running' && (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        실행중
                      </>
                    )}
                    {task.status === 'completed' && (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        완료
                      </>
                    )}
                    {task.status === 'error' && (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        오류
                      </>
                    )}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runOptimization(task.id)}
                  disabled={
                    task.status === 'running' ||
                    task.status === 'completed' ||
                    isOptimizing
                  }
                >
                  {task.status === 'completed'
                    ? '완료'
                    : task.status === 'running'
                      ? '실행중...'
                      : '실행'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 최적화 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>최적화 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">최적화 효과</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  LCP (Largest Contentful Paint) 개선
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  CLS (Cumulative Layout Shift) 감소
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  INP (Interaction to Next Paint) 향상
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  전체 Lighthouse 점수 상승
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">주의사항</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  최적화 후 페이지 새로고침 필요
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  일부 최적화는 즉시 반영되지 않을 수 있음
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  모바일 환경에서 최대 효과 확인 가능
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  정기적인 성능 모니터링 권장
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
