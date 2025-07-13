/**
 * 포트폴리오 요약 위젯 - 메인 대시보드용 축약 버전
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowUpRight,
  PieChart,
  Target,
  Calendar
} from 'lucide-react'

interface PortfolioSummaryData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  monthlyReturn: number
  yearlyReturn: number
  riskLevel: 'conservative' | 'moderate' | 'aggressive'
  topPerformer: {
    name: string
    return: number
  }
  rebalanceAlert: boolean
}

interface PortfolioSummaryWidgetProps {
  clientId?: string
  className?: string
  onViewFull?: () => void
}

export default function PortfolioSummaryWidget({
  clientId = 'demo',
  className = '',
  onViewFull
}: PortfolioSummaryWidgetProps) {
  const [data, setData] = useState<PortfolioSummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  // 데모 데이터 생성
  const generateDemoData = (): PortfolioSummaryData => ({
    totalValue: 2450000000,
    dayChange: 12300000,
    dayChangePercent: 0.51,
    monthlyReturn: 3.24,
    yearlyReturn: 12.8,
    riskLevel: 'moderate',
    topPerformer: {
      name: '삼성전자',
      return: 8.5
    },
    rebalanceAlert: true
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setData(generateDemoData())
      setLoading(false)
    }
    
    fetchData()
  }, [])

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`
    }
    return `${amount.toLocaleString()}원`
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return null
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'conservative': return '안정형'
      case 'moderate': return '적극형'
      case 'aggressive': return '공격형'
      default: return '중립형'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'conservative': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-green-100 text-green-800'
      case 'aggressive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card className={`${className} animate-pulse`}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className={`${className} bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            포트폴리오 현황
          </CardTitle>
          <div className="flex items-center space-x-2">
            {data.rebalanceAlert && (
              <Badge variant="destructive" className="text-xs">
                리밸런싱 필요
              </Badge>
            )}
            <Badge className={`text-xs ${getRiskLevelColor(data.riskLevel)}`}>
              {getRiskLevelText(data.riskLevel)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 총 자산 */}
        <div>
          <p className="text-sm text-gray-600 mb-1">총 자산가액</p>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold text-blue-900">
              {formatCurrency(data.totalValue)}
            </span>
            <div className={`text-sm flex items-center ${getChangeColor(data.dayChange)}`}>
              {getChangeIcon(data.dayChange)}
              <span className="ml-1">
                {data.dayChange >= 0 ? '+' : ''}{formatCurrency(data.dayChange)}
              </span>
            </div>
          </div>
          <p className={`text-sm ${getChangeColor(data.dayChangePercent)}`}>
            오늘 {data.dayChangePercent >= 0 ? '+' : ''}{data.dayChangePercent.toFixed(2)}%
          </p>
        </div>

        {/* 수익률 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white bg-opacity-60 p-3 rounded-lg">
            <p className="text-xs text-gray-600">월간 수익률</p>
            <p className={`text-lg font-bold ${getChangeColor(data.monthlyReturn)}`}>
              {data.monthlyReturn >= 0 ? '+' : ''}{data.monthlyReturn.toFixed(2)}%
            </p>
          </div>
          
          <div className="bg-white bg-opacity-60 p-3 rounded-lg">
            <p className="text-xs text-gray-600">연간 수익률</p>
            <p className={`text-lg font-bold ${getChangeColor(data.yearlyReturn)}`}>
              {data.yearlyReturn >= 0 ? '+' : ''}{data.yearlyReturn.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* 최고 수익 종목 */}
        <div className="bg-white bg-opacity-60 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">최고 수익 종목</p>
              <p className="font-semibold">{data.topPerformer.name}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                +{data.topPerformer.return.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="default"
            size="sm"
            onClick={onViewFull}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            상세 대시보드
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
          
          {data.rebalanceAlert && (
            <Button variant="outline" size="sm" className="flex-1">
              <Target className="h-3 w-3 mr-1" />
              리밸런싱
            </Button>
          )}
        </div>

        {/* 업데이트 시간 */}
        <div className="flex items-center justify-center text-xs text-gray-500 pt-2 border-t border-blue-200">
          <Calendar className="h-3 w-3 mr-1" />
          실시간 업데이트
        </div>
      </CardContent>
    </Card>
  )
}