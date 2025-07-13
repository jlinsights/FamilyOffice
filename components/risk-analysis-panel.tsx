/**
 * 위험 분석 패널 - 포트폴리오 리스크 관리 전용 컴포넌트
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  Target,
  BarChart3,
  Info,
  Settings
} from 'lucide-react'

interface RiskMetrics {
  volatility: number
  var95: number // Value at Risk (95%)
  sharpeRatio: number
  beta: number
  maxDrawdown: number
  correlationToMarket: number
  concentrationRisk: number
}

interface RiskAlert {
  type: 'high' | 'medium' | 'low'
  title: string
  description: string
  recommendation: string
}

interface RiskAnalysisPanelProps {
  metrics: RiskMetrics
  className?: string
  onOptimize?: () => void
  onViewDetails?: () => void
}

export default function RiskAnalysisPanel({
  metrics,
  className = '',
  onOptimize,
  onViewDetails
}: RiskAnalysisPanelProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  // 위험도 등급 계산
  const calculateRiskLevel = (volatility: number): { level: string; color: string; description: string } => {
    if (volatility <= 10) {
      return { level: '낮음', color: 'green', description: '안정적인 포트폴리오' }
    } else if (volatility <= 20) {
      return { level: '보통', color: 'yellow', description: '균형잡힌 포트폴리오' }
    } else {
      return { level: '높음', color: 'red', description: '공격적인 포트폴리오' }
    }
  }

  // 위험 알림 생성
  const generateRiskAlerts = (): RiskAlert[] => {
    const alerts: RiskAlert[] = []

    if (metrics.concentrationRisk > 30) {
      alerts.push({
        type: 'high',
        title: '집중도 위험',
        description: `상위 종목 집중도가 ${metrics.concentrationRisk.toFixed(1)}%로 높습니다`,
        recommendation: '포트폴리오 분산투자를 권장합니다'
      })
    }

    if (metrics.maxDrawdown < -15) {
      alerts.push({
        type: 'medium',
        title: '최대 손실폭 주의',
        description: `최대 손실폭이 ${Math.abs(metrics.maxDrawdown).toFixed(1)}%입니다`,
        recommendation: '손절 전략 점검이 필요합니다'
      })
    }

    if (metrics.sharpeRatio < 0.5) {
      alerts.push({
        type: 'medium',
        title: '위험 대비 수익률 개선 필요',
        description: `샤프 비율이 ${metrics.sharpeRatio.toFixed(2)}로 낮습니다`,
        recommendation: '포트폴리오 최적화를 고려해보세요'
      })
    }

    return alerts
  }

  const riskLevel = calculateRiskLevel(metrics.volatility)
  const riskAlerts = generateRiskAlerts()

  const getMetricDescription = (metric: string) => {
    const descriptions: Record<string, string> = {
      volatility: '포트폴리오 수익률의 변동성을 나타냅니다. 낮을수록 안정적입니다.',
      var95: '95% 신뢰수준에서 예상되는 최대 손실액입니다.',
      sharpeRatio: '위험 대비 수익률을 측정합니다. 높을수록 효율적입니다.',
      beta: '시장 대비 민감도를 나타냅니다. 1보다 크면 시장보다 변동성이 큽니다.',
      maxDrawdown: '과거 최고점 대비 최대 하락폭입니다.',
      correlationToMarket: '시장과의 상관관계입니다. 1에 가까우면 시장과 동조합니다.',
      concentrationRisk: '상위 종목 집중도입니다. 높을수록 집중투자 위험이 큽니다.'
    }
    return descriptions[metric] || ''
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 전체 위험도 요약 */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              포트폴리오 위험도 분석
            </span>
            <Badge 
              variant={riskLevel.color === 'red' ? 'destructive' : 'default'}
              className={`${riskLevel.color === 'green' ? 'bg-green-100 text-green-800' : 
                          riskLevel.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}`}
            >
              위험도: {riskLevel.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">변동성</span>
            <span className="text-2xl font-bold">{metrics.volatility.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(metrics.volatility, 30) / 30 * 100} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">{riskLevel.description}</p>
        </CardContent>
      </Card>

      {/* 위험 메트릭 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { key: 'var95', label: 'VaR (95%)', value: `${metrics.var95.toFixed(1)}%`, icon: TrendingDown },
          { key: 'sharpeRatio', label: '샤프 비율', value: metrics.sharpeRatio.toFixed(2), icon: Target },
          { key: 'beta', label: '베타', value: metrics.beta.toFixed(2), icon: BarChart3 },
          { key: 'maxDrawdown', label: '최대 손실폭', value: `${metrics.maxDrawdown.toFixed(1)}%`, icon: AlertTriangle },
          { key: 'correlationToMarket', label: '시장 상관관계', value: metrics.correlationToMarket.toFixed(2), icon: BarChart3 },
          { key: 'concentrationRisk', label: '집중도 위험', value: `${metrics.concentrationRisk.toFixed(1)}%`, icon: AlertTriangle }
        ].map((metric) => (
          <Card 
            key={metric.key} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMetric === metric.key ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric(selectedMetric === metric.key ? null : metric.key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-4 w-4 text-gray-600" />
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">{metric.label}</p>
                <p className="text-lg font-bold">{metric.value}</p>
              </div>
              
              {selectedMetric === metric.key && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-600">
                    {getMetricDescription(metric.key)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 위험 알림 */}
      {riskAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              위험 관리 알림
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskAlerts.map((alert, index) => (
              <div key={index} className="border-l-4 border-orange-400 pl-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-orange-900">{alert.title}</h4>
                  <Badge 
                    variant={alert.type === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.type === 'high' ? '높음' : alert.type === 'medium' ? '보통' : '낮음'}
                  </Badge>
                </div>
                <p className="text-sm text-orange-800 mb-1">{alert.description}</p>
                <p className="text-xs text-orange-700">{alert.recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 액션 버튼 */}
      <div className="flex space-x-3">
        <Button 
          onClick={onOptimize}
          className="flex-1"
          variant={riskAlerts.length > 0 ? 'default' : 'outline'}
        >
          <Settings className="h-4 w-4 mr-2" />
          포트폴리오 최적화
        </Button>
        
        <Button 
          onClick={onViewDetails}
          variant="outline"
          className="flex-1"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          상세 분석
        </Button>
      </div>

      {/* 위험 관리 가이드 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">위험 관리 가이드</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 변동성 15% 이하 유지를 권장합니다</li>
            <li>• 상위 10개 종목 집중도는 50% 이하로 관리하세요</li>
            <li>• 샤프 비율 1.0 이상을 목표로 하세요</li>
            <li>• 정기적인 리밸런싱으로 위험을 분산하세요</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}