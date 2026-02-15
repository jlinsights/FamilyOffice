'use client';

/**
 * 🎯 Web Vitals 리포팅 컴포넌트
 * 실시간 성능 데이터 수집 및 리포팅
 */
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WebVitalsData {
  lcp: number;
  inp: number;
  cls: number;
  fcp: number;
  ttfb: number;
  timestamp: number;
}

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
  unit: string;
  description: string;
}

export default function WebVitalsReporter() {
  const [vitalsData, setVitalsData] = useState<WebVitalsData | null>(null);
  const [isCollecting, setIsCollecting] = useState(true);

  useEffect(() => {
    let collectingTimeout: NodeJS.Timeout;

    const collectVitals = async () => {
      try {
        const { onLCP, onINP, onCLS, onFCP, onTTFB } =
          await import('web-vitals');
        const data: Partial<WebVitalsData> = {};

        onLCP(metric => {
          data.lcp = metric.value;
          updateData(data);
        });

        onINP(metric => {
          data.inp = metric.value;
          updateData(data);
        });

        onCLS(metric => {
          data.cls = metric.value;
          updateData(data);
        });

        onFCP(metric => {
          data.fcp = metric.value;
          updateData(data);
        });

        onTTFB(metric => {
          data.ttfb = metric.value;
          updateData(data);
        });

        // 10초 후 수집 중지
        collectingTimeout = setTimeout(() => {
          setIsCollecting(false);
        }, 10000);
      } catch (error) {
        console.error('Web Vitals collection failed:', error);
        setIsCollecting(false);
      }
    };

    const updateData = (data: Partial<WebVitalsData>) => {
      if (
        data.lcp !== undefined ||
        data.inp !== undefined ||
        data.cls !== undefined
      ) {
        setVitalsData(
          prev =>
            ({
              ...prev,
              ...data,
              timestamp: Date.now(),
            }) as WebVitalsData
        );
      }
    };

    collectVitals();

    return () => {
      if (collectingTimeout) clearTimeout(collectingTimeout);
    };
  }, []);

  const getRating = (
    value: number,
    good: number,
    poor: number
  ): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  };

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'ms') return `${Math.round(value)}ms`;
    if (unit === 'score') return value.toFixed(3);
    return value.toString();
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-improvement':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'poor':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!vitalsData && isCollecting) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 animate-pulse" />
            Web Vitals 수집 중...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-pulse text-gray-600">
              성능 메트릭을 수집하고 있습니다...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!vitalsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Web Vitals 수집 실패</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            성능 데이터를 수집할 수 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  const metrics: VitalMetric[] = [
    {
      name: 'LCP',
      value: vitalsData.lcp,
      rating: getRating(vitalsData.lcp, 2500, 4000),
      threshold: { good: 2500, poor: 4000 },
      unit: 'ms',
      description: 'Largest Contentful Paint - 가장 큰 콘텐츠 요소의 로딩 시간',
    },
    {
      name: 'INP',
      value: vitalsData.inp,
      rating: getRating(vitalsData.inp, 200, 500),
      threshold: { good: 200, poor: 500 },
      unit: 'ms',
      description: 'Interaction to Next Paint - 사용자 상호작용 응답 시간',
    },
    {
      name: 'CLS',
      value: vitalsData.cls,
      rating: getRating(vitalsData.cls, 0.1, 0.25),
      threshold: { good: 0.1, poor: 0.25 },
      unit: 'score',
      description:
        'Cumulative Layout Shift - 레이아웃 변경으로 인한 시각적 안정성',
    },
    {
      name: 'FCP',
      value: vitalsData.fcp,
      rating: getRating(vitalsData.fcp, 1800, 3000),
      threshold: { good: 1800, poor: 3000 },
      unit: 'ms',
      description: 'First Contentful Paint - 첫 번째 콘텐츠 렌더링 시간',
    },
    {
      name: 'TTFB',
      value: vitalsData.ttfb,
      rating: getRating(vitalsData.ttfb, 800, 1800),
      threshold: { good: 800, poor: 1800 },
      unit: 'ms',
      description: 'Time to First Byte - 서버 응답 시간',
    },
  ];

  const goodMetrics = metrics.filter(m => m.rating === 'good').length;
  const totalMetrics = metrics.length;
  const overallScore = Math.round((goodMetrics / totalMetrics) * 100);

  return (
    <div className="space-y-6">
      {/* 전체 점수 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>전체 Web Vitals 점수</span>
            <Badge
              className={
                overallScore >= 80
                  ? 'bg-green-100 text-green-800'
                  : overallScore >= 60
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }
            >
              {overallScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {goodMetrics}/{totalMetrics}
            </div>
            <div className="text-gray-600">Core Web Vitals 통과</div>
          </div>
        </CardContent>
      </Card>

      {/* 메트릭 상세 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <Card key={metric.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{metric.name}</CardTitle>
                {getRatingIcon(metric.rating)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">
                  {formatValue(metric.value, metric.unit)}
                </div>

                <Badge className={getRatingColor(metric.rating)}>
                  {metric.rating === 'good'
                    ? '좋음'
                    : metric.rating === 'needs-improvement'
                      ? '개선필요'
                      : '나쁨'}
                </Badge>

                <div className="text-xs text-gray-600">
                  {metric.description}
                </div>

                <div className="text-xs text-gray-500">
                  임계값: 좋음 ≤{' '}
                  {formatValue(metric.threshold.good, metric.unit)}, 나쁨 &gt;{' '}
                  {formatValue(metric.threshold.poor, metric.unit)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 수집 시간 */}
      <div className="text-center text-sm text-gray-500">
        마지막 수집: {new Date(vitalsData.timestamp).toLocaleString('ko-KR')}
      </div>
    </div>
  );
}
