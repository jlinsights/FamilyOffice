/**
 * 자산군별 상세 카드 컴포넌트
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  Home, 
  Coins,
  DollarSign,
  MoreHorizontal,
  Eye,
  Settings
} from 'lucide-react'

interface AssetClassData {
  type: 'stocks' | 'bonds' | 'realEstate' | 'alternatives' | 'cash'
  totalValue: number
  allocation: number
  targetAllocation: number
  dayChange: number
  dayChangePercent: number
  ytdReturn: number
  holdings: Array<{
    name: string
    symbol?: string
    value: number
    weight: number
    change: number
  }>
  metrics: {
    count: number
    avgReturn?: number
    volatility?: number
    yield?: number
  }
}

interface AssetClassCardProps {
  data: AssetClassData
  className?: string
  onViewDetails?: () => void
  onRebalance?: () => void
}

export default function AssetClassCard({ 
  data, 
  className = '',
  onViewDetails,
  onRebalance 
}: AssetClassCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getAssetClassInfo = (type: AssetClassData['type']) => {
    switch (type) {
      case 'stocks':
        return {
          title: '주식',
          icon: TrendingUp,
          color: 'blue',
          description: '국내외 상장주식'
        }
      case 'bonds':
        return {
          title: '채권',
          icon: Landmark,
          color: 'green',
          description: '국공채, 회사채, 해외채권'
        }
      case 'realEstate':
        return {
          title: '부동산',
          icon: Home,
          color: 'purple',
          description: 'REITs, 직접투자, 개발사업'
        }
      case 'alternatives':
        return {
          title: '대체투자',
          icon: Coins,
          color: 'orange',
          description: '사모펀드, 헤지펀드, 원자재'
        }
      case 'cash':
        return {
          title: '현금성자산',
          icon: DollarSign,
          color: 'gray',
          description: 'MMF, 예금, 단기자금'
        }
    }
  }

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
    if (change > 0) return <TrendingUp className="h-3 w-3" />
    if (change < 0) return <TrendingDown className="h-3 w-3" />
    return null
  }

  const getAllocationStatus = () => {
    const diff = data.allocation - data.targetAllocation
    if (Math.abs(diff) <= 1) return { status: 'balanced', text: '균형', color: 'green' }
    if (diff > 1) return { status: 'overweight', text: '과중', color: 'red' }
    return { status: 'underweight', text: '과소', color: 'orange' }
  }

  const assetInfo = getAssetClassInfo(data.type)
  const Icon = assetInfo.icon
  const allocationStatus = getAllocationStatus()

  return (
    <Card className={`${className} hover:shadow-lg transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${assetInfo.color}-100`}>
              <Icon className={`h-5 w-5 text-${assetInfo.color}-600`} />
            </div>
            <div>
              <CardTitle className="text-lg">{assetInfo.title}</CardTitle>
              <p className="text-sm text-gray-600">{assetInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={allocationStatus.color === 'green' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {allocationStatus.text}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">자산가액</p>
            <p className="text-xl font-bold">{formatCurrency(data.totalValue)}</p>
            <div className={`text-sm flex items-center ${getChangeColor(data.dayChange)}`}>
              {getChangeIcon(data.dayChange)}
              <span className="ml-1">
                {data.dayChange >= 0 ? '+' : ''}{formatCurrency(data.dayChange)}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">현재 비중</p>
            <p className="text-xl font-bold">{data.allocation.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">
              목표: {data.targetAllocation.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* 배분 진행률 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>목표 대비 배분</span>
            <span>{data.allocation.toFixed(1)}% / {data.targetAllocation.toFixed(1)}%</span>
          </div>
          <Progress 
            value={(data.allocation / data.targetAllocation) * 100} 
            className="h-2"
          />
        </div>

        {/* 수익률 정보 */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">일간수익률</p>
            <p className={`text-sm font-semibold ${getChangeColor(data.dayChangePercent)}`}>
              {data.dayChangePercent >= 0 ? '+' : ''}{data.dayChangePercent.toFixed(2)}%
            </p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">연초대비</p>
            <p className={`text-sm font-semibold ${getChangeColor(data.ytdReturn)}`}>
              {data.ytdReturn >= 0 ? '+' : ''}{data.ytdReturn.toFixed(2)}%
            </p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">보유종목</p>
            <p className="text-sm font-semibold">{data.metrics.count}개</p>
          </div>
        </div>

        {/* 상세 정보 (토글) */}
        {showDetails && (
          <div className="border-t pt-4 space-y-3">
            <h4 className="font-semibold text-sm">주요 보유 종목</h4>
            <div className="space-y-2">
              {data.holdings.slice(0, 3).map((holding, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{holding.name}</span>
                    {holding.symbol && (
                      <span className="text-gray-500 ml-2">({holding.symbol})</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{holding.weight.toFixed(1)}%</div>
                    <div className={`text-xs ${getChangeColor(holding.change)}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
              {data.holdings.length > 3 && (
                <p className="text-xs text-gray-500 text-center">
                  외 {data.holdings.length - 3}개 종목
                </p>
              )}
            </div>

            {/* 추가 메트릭 */}
            {(data.metrics.avgReturn !== undefined || data.metrics.volatility !== undefined || data.metrics.yield !== undefined) && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {data.metrics.avgReturn !== undefined && (
                  <div>
                    <span className="text-gray-600">평균수익률</span>
                    <p className="font-semibold">{data.metrics.avgReturn.toFixed(2)}%</p>
                  </div>
                )}
                {data.metrics.volatility !== undefined && (
                  <div>
                    <span className="text-gray-600">변동성</span>
                    <p className="font-semibold">{data.metrics.volatility.toFixed(2)}%</p>
                  </div>
                )}
                {data.metrics.yield !== undefined && (
                  <div>
                    <span className="text-gray-600">수익률</span>
                    <p className="font-semibold">{data.metrics.yield.toFixed(2)}%</p>
                  </div>
                )}
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onViewDetails}
                className="flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                상세보기
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRebalance}
                className="flex-1"
              >
                <Settings className="h-3 w-3 mr-1" />
                리밸런싱
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}