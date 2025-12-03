'use client'

/**
 * 🎯 성능 대시보드 컴포넌트
 * Core Web Vitals 실시간 모니터링 및 최적화 가이드
 */

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    AlertTriangle,
    BarChart3,
    CheckCircle,
    Clock,
    Gauge,
    Monitor,
    Smartphone,
    TrendingDown,
    TrendingUp,
    Wifi,
    Zap
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface WebVitalsData {
  lcp: { value: number; rating: string; trend: number }
  inp: { value: number; rating: string; trend: number }
  cls: { value: number; rating: string; trend: number }
  fcp: { value: number; rating: string; trend: number }
  ttfb: { value: number; rating: string; trend: number }
  lastUpdated: Date
}

interface PerformanceOptimization {
  metric: string
  current: number
  target: number
  impact: 'high' | 'medium' | 'low'
  actions: string[]
  status: 'implemented' | 'in-progress' | 'pending'
}

const performanceOptimizations: PerformanceOptimization[] = [
  {
    metric: 'LCP',
    current: 2.1,
    target: 1.8,
    impact: 'high',
    actions: [
      '히어로 이미지 WebP 변환 및 압축',
      'Critical CSS 인라인화',
      'CDN 활용한 이미지 최적화',
      '폰트 프리로드 최적화'
    ],
    status: 'implemented'
  },
  {
    metric: 'INP',
    current: 180,
    target: 150,
    impact: 'medium',
    actions: [
      'JavaScript 번들 최적화',
      '이벤트 핸들러 최적화',
      'Third-party 스크립트 지연 로딩',
      'React 컴포넌트 메모이제이션'
    ],
    status: 'in-progress'
  },
  {
    metric: 'CLS',
    current: 0.08,
    target: 0.05,
    impact: 'high',
    actions: [
      '이미지 aspect-ratio 설정',
      '폰트 FOUT 방지',
      '동적 콘텐츠 공간 예약',
      'Cal.com 위젯 안정화'
    ],
    status: 'pending'
  }
]

export default function PerformanceDashboard() {
  const [webVitalsData, setWebVitalsData] = useState<WebVitalsData>({
    lcp: { value: 2100, rating: 'good', trend: -8.3 },
    inp: { value: 180, rating: 'good', trend: -12.1 },
    cls: { value: 0.08, rating: 'good', trend: -5.2 },
    fcp: { value: 1650, rating: 'good', trend: -15.6 },
    ttfb: { value: 720, rating: 'good', trend: -3.8 },
    lastUpdated: new Date()
  })

  const [isRealTime, setIsRealTime] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [selectedConnection, setSelectedConnection] = useState<'4G' | '3G' | 'WiFi'>('4G')

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 border-green-200 bg-green-50'
      case 'needs-improvement': return 'text-yellow-600 border-yellow-200 bg-yellow-50'
      case 'poor': return 'text-red-600 border-red-200 bg-red-50'
      default: return 'text-gray-600 border-gray-200 bg-gray-50'
    }
  }

  const getProgressColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'bg-green-500'
      case 'needs-improvement': return 'bg-yellow-500'
      case 'poor': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatMetricValue = (metric: string, value: number) => {
    switch (metric) {
      case 'LCP':
      case 'FCP':
      case 'INP':
      case 'TTFB':
        return `${value}ms`
      case 'CLS':
        return value.toFixed(3)
      default:
        return value.toString()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        // 실시간 데이터 시뮬레이션 (실제로는 Web Vitals API에서 받아옴)
        setWebVitalsData(prev => ({
          ...prev,
          lastUpdated: new Date(),
          lcp: { ...prev.lcp, value: prev.lcp.value + (Math.random() - 0.5) * 100 },
          inp: { ...prev.inp, value: prev.inp.value + (Math.random() - 0.5) * 20 }
        }))
      }, 5000)

      return () => clearInterval(interval)
    }
    return undefined
  }, [isRealTime])

  return (
    <div className="space-y-6">
      {/* 헤더 및 컨트롤 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">성능 대시보드</h2>
          <p className="text-gray-600">Core Web Vitals 실시간 모니터링 및 최적화</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={isRealTime ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
          >
            {isRealTime ? '실시간 ON' : '실시간 OFF'}
          </Button>
          
          <div className="flex border rounded-lg">
            <Button
              variant={selectedDevice === 'mobile' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDevice('mobile')}
            >
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile
            </Button>
            <Button
              variant={selectedDevice === 'desktop' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDevice('desktop')}
            >
              <Monitor className="w-4 h-4 mr-1" />
              Desktop
            </Button>
          </div>
        </div>
      </div>

      {/* Web Vitals 메트릭 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(webVitalsData).filter(([key]) => key !== 'lastUpdated').map(([metric, data]) => (
          <Card key={metric}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase">{metric}</CardTitle>
                <div className="flex items-center gap-1">
                  {data.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-xs ${data.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(data.trend).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {formatMetricValue(metric.toUpperCase(), data.value)}
                </div>
                <Badge className={getRatingColor(data.rating)}>
                  {data.rating === 'good' ? '좋음' : 
                   data.rating === 'needs-improvement' ? '개선필요' : '나쁨'}
                </Badge>
                <Progress 
                  value={data.rating === 'good' ? 100 : data.rating === 'needs-improvement' ? 60 : 30}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 탭 섹션 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="optimizations">최적화</TabsTrigger>
          <TabsTrigger value="trends">트렌드</TabsTrigger>
          <TabsTrigger value="recommendations">권장사항</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 성능 점수 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  전체 성능 점수
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">94</div>
                  <div className="text-sm text-gray-600 mb-4">Lighthouse 성능 점수</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-600 font-semibold">Core Web Vitals</div>
                      <div>모두 통과</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-semibold">접근성</div>
                      <div>95점</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 연결 속도별 성능 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  연결 속도별 성능
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['WiFi', '4G', '3G'].map((connection) => (
                    <div key={connection} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          connection === 'WiFi' ? 'bg-green-500' :
                          connection === '4G' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span>{connection}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {connection === 'WiFi' ? '1.2s' : 
                         connection === '4G' ? '2.8s' : '4.1s'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4">
          {performanceOptimizations.map((optimization, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(optimization.status)}
                      {optimization.metric} 최적화
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">
                        현재: {formatMetricValue(optimization.metric, optimization.current)}
                      </Badge>
                      <Badge variant="outline">
                        목표: {formatMetricValue(optimization.metric, optimization.target)}
                      </Badge>
                      <Badge className={
                        optimization.impact === 'high' ? 'bg-red-100 text-red-800' :
                        optimization.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {optimization.impact === 'high' ? '높음' :
                         optimization.impact === 'medium' ? '중간' : '낮음'} 영향
                      </Badge>
                    </div>
                  </div>
                  
                  <Progress 
                    value={((optimization.target / optimization.current) * 100)}
                    className="w-24"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">개선 작업:</h4>
                  <ul className="space-y-1">
                    {optimization.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                30일 성능 트렌드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>성능 트렌드 차트는 실제 구현에서 Chart.js 또는 Recharts로 구현됩니다.</p>
                <p className="text-sm mt-2">LCP, INP, CLS 지표의 일별/주별 변화를 시각화</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* 즉시 개선 가능 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Zap className="w-5 h-5" />
                  즉시 개선 가능
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">이미지 최적화</h4>
                  <p className="text-sm text-gray-600">WebP 포맷 사용으로 30% 용량 절약</p>
                  <Badge variant="outline" className="mt-1">LCP -400ms</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">폰트 프리로드</h4>
                  <p className="text-sm text-gray-600">중요 폰트 사전 로딩</p>
                  <Badge variant="outline" className="mt-1">CLS -0.02</Badge>
                </div>
              </CardContent>
            </Card>

            {/* 장기 개선 목표 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-5 h-5" />
                  장기 개선 목표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">CDN 최적화</h4>
                  <p className="text-sm text-gray-600">글로벌 CDN 도입 및 엣지 캐싱</p>
                  <Badge variant="outline" className="mt-1">TTFB -200ms</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">번들 분할</h4>
                  <p className="text-sm text-gray-600">JavaScript 코드 스플리팅</p>
                  <Badge variant="outline" className="mt-1">INP -50ms</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 마지막 업데이트 시간 */}
      <div className="text-center text-sm text-gray-500">
        마지막 업데이트: {webVitalsData.lastUpdated.toLocaleString('ko-KR')}
        {isRealTime && <span className="ml-2 text-green-600">● 실시간</span>}
      </div>
    </div>
  )
}