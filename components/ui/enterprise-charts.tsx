/**
 * 엔터프라이즈급 고급 데이터 시각화 차트 컴포넌트 - FamilyOffice S
 * 인터랙티브 포트폴리오 차트, 성과 분석, 리스크 분석
 */

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  Calendar,
  DollarSign,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 차트 데이터 타입
interface ChartDataPoint {
  date: string
  value: number
  change?: number
  category?: string
  color?: string
}

interface PortfolioData {
  totalValue: number
  change: number
  changePercent: number
  assets: {
    category: string
    value: number
    percentage: number
    color: string
  }[]
  performance: ChartDataPoint[]
  riskMetrics: {
    volatility: number
    sharpeRatio: number
    maxDrawdown: number
    beta: number
  }
}

// 포트폴리오 성과 차트
interface PortfolioPerformanceChartProps {
  data: PortfolioData
  timeframe?: '1M' | '3M' | '6M' | '1Y' | 'ALL'
  className?: string
}

export function PortfolioPerformanceChart({ 
  data, 
  timeframe = '1Y', 
  className 
}: PortfolioPerformanceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)
  const [showGrid, setShowGrid] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 차트 렌더링
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // 차트 그리기
    drawPerformanceChart(ctx, data.performance, rect.width, rect.height, showGrid)
  }, [data.performance, selectedTimeframe, showGrid])

  const drawPerformanceChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartDataPoint[],
    width: number,
    height: number,
    showGrid: boolean
  ) => {
    // 배경 클리어
    ctx.clearRect(0, 0, width, height)

    if (data.length === 0) return

    // 데이터 정규화
    const values = data.map(d => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const range = maxValue - minValue

    // 그리드 그리기
    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = (height * 0.1) + (i * height * 0.8 / 4)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // 라인 차트 그리기
    ctx.strokeStyle = '#eab308'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width * 0.9 + width * 0.05
      const y = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // 포인트 그리기
    ctx.fillStyle = '#eab308'
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width * 0.9 + width * 0.05
      const y = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-gradient-to-r from-premium-50 to-premium-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-premium-600" />
            <CardTitle>포트폴리오 성과</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              aria-label={showGrid ? "그리드 숨기기" : "그리드 표시"}
            >
              {showGrid ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
                <SelectItem value="ALL">ALL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          총 자산: {data.totalValue.toLocaleString()}원 
          <span className={cn(
            "ml-2",
            data.change >= 0 ? "text-success-600" : "text-error-600"
          )}>
            {data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-64"
            role="img"
            aria-label="포트폴리오 성과 차트"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// 자산 배분 파이 차트
interface AssetAllocationChartProps {
  data: PortfolioData['assets']
  className?: string
}

export function AssetAllocationChart({ data, className }: AssetAllocationChartProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    drawPieChart(ctx, data, rect.width, rect.height, selectedAsset)
  }, [data, selectedAsset])

  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    data: PortfolioData['assets'],
    width: number,
    height: number,
    selectedAsset: string | null
  ) => {
    ctx.clearRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.3

    let currentAngle = 0
    const total = data.reduce((sum, asset) => sum + asset.percentage, 0)

    data.forEach((asset, index) => {
      const sliceAngle = (asset.percentage / total) * 2 * Math.PI
      const isSelected = selectedAsset === asset.category

      // 파이 슬라이스 그리기
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, isSelected ? radius + 5 : radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      
      ctx.fillStyle = asset.color
      ctx.fill()

      // 테두리
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      currentAngle += sliceAngle
    })

    // 중앙 텍스트
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 16px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('자산 배분', centerX, centerY - 5)
    ctx.font = '14px system-ui'
    ctx.fillText(`${total.toFixed(1)}%`, centerX, centerY + 15)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-gradient-to-r from-navy-50 to-navy-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-navy-600" />
            <CardTitle>자산 배분</CardTitle>
          </div>
        </div>
        <CardDescription>
          포트폴리오 자산 구성 비율
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-64 cursor-pointer"
              role="img"
              aria-label="자산 배분 파이 차트"
              onClick={(e) => {
                // 클릭 이벤트 처리 (간단한 구현)
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                // 여기서 클릭된 자산 카테고리 계산
              }}
            />
          </div>
          <div className="space-y-3">
            {data.map((asset) => (
              <div
                key={asset.category}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                  selectedAsset === asset.category 
                    ? "border-premium-300 bg-premium-50" 
                    : "border-gray-200 hover:border-premium-200"
                )}
                onClick={() => setSelectedAsset(
                  selectedAsset === asset.category ? null : asset.category
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="font-medium">{asset.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {asset.value.toLocaleString()}원
                  </div>
                  <div className="text-sm text-gray-500">
                    {asset.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 리스크 메트릭스 대시보드
interface RiskMetricsDashboardProps {
  data: PortfolioData['riskMetrics']
  className?: string
}

export function RiskMetricsDashboard({ data, className }: RiskMetricsDashboardProps) {
  const metrics = [
    {
      name: '변동성',
      value: data.volatility,
      unit: '%',
      description: '포트폴리오 가격 변동의 정도',
      color: data.volatility < 10 ? 'success' : data.volatility < 20 ? 'warning' : 'error'
    },
    {
      name: '샤프 비율',
      value: data.sharpeRatio,
      unit: '',
      description: '위험 대비 수익률',
      color: data.sharpeRatio > 1 ? 'success' : data.sharpeRatio > 0 ? 'warning' : 'error'
    },
    {
      name: '최대 낙폭',
      value: data.maxDrawdown,
      unit: '%',
      description: '역대 최대 손실률',
      color: data.maxDrawdown < 10 ? 'success' : data.maxDrawdown < 20 ? 'warning' : 'error'
    },
    {
      name: '베타',
      value: data.beta,
      unit: '',
      description: '시장 대비 변동성',
      color: data.beta < 1 ? 'success' : data.beta < 1.2 ? 'warning' : 'error'
    }
  ]

  const getColorClass = (color: string) => {
    switch (color) {
      case 'success': return 'text-success-600 bg-success-50 border-success-200'
      case 'warning': return 'text-warning-600 bg-warning-50 border-warning-200'
      case 'error': return 'text-error-600 bg-error-50 border-error-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-gradient-to-r from-error-50 to-error-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-error-600" />
            <CardTitle>리스크 메트릭스</CardTitle>
          </div>
        </div>
        <CardDescription>
          포트폴리오 리스크 분석 지표
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className={cn(
                "p-4 rounded-lg border transition-all",
                getColorClass(metric.color)
              )}
            >
              <div className="text-sm font-medium text-gray-600 mb-1">
                {metric.name}
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.value.toFixed(2)}{metric.unit}
              </div>
              <div className="text-xs text-gray-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 