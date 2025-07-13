/**
 * 주식 정보 카드 컴포넌트
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react'
import type { StockData } from '@/lib/types/financial'

interface StockCardProps {
  symbol: string
  autoRefresh?: boolean
  refreshInterval?: number
  className?: string
}

export default function StockCard({ 
  symbol, 
  autoRefresh = false,
  refreshInterval = 300000, // 5분
  className = ''
}: StockCardProps) {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // 주식 데이터 가져오기
  const fetchStockData = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)

      const url = `/api/financial/stocks?symbol=${encodeURIComponent(symbol)}${forceRefresh ? '&refresh=true' : ''}`
      const response = await fetch(url)
      const result = await response.json()

      if (result.success && result.data) {
        setStockData(result.data)
        setLastUpdated(new Date())
      } else {
        setError(result.error?.message || '데이터를 가져올 수 없습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchStockData()
  }, [symbol])

  // 자동 새로고침 설정
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchStockData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  // 수동 새로고침
  const handleRefresh = () => {
    fetchStockData(true)
  }

  // 가격 변화 색상 결정
  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // 가격 변화 아이콘
  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return null
  }

  // 숫자 포맷팅
  const formatNumber = (num: number, decimals = 2) => {
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num)
  }

  // 퍼센트 포맷팅
  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${formatNumber(num, 2)}%`
  }

  // 로딩 상태
  if (loading && !stockData) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 오류 상태
  if (error && !stockData) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">{symbol}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-sm text-red-600 mb-2">데이터 로드 실패</p>
            <p className="text-xs text-gray-500 mb-4">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              다시 시도
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stockData) return null

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-sm font-medium">{stockData.symbol}</CardTitle>
            {stockData.cached && (
              <Badge variant="secondary" className="text-xs">
                캐시
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 현재 가격 */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {stockData.currency === 'KRW' ? '₩' : '$'}
              {formatNumber(stockData.price)}
            </span>
            {getPriceChangeIcon(stockData.change)}
          </div>
          
          <div className={`text-sm ${getPriceChangeColor(stockData.change)}`}>
            {stockData.change >= 0 ? '+' : ''}
            {formatNumber(stockData.change)} ({formatPercent(stockData.changePercent)})
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-gray-500">시가</span>
            <p className="font-medium">{formatNumber(stockData.open)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500">전일종가</span>
            <p className="font-medium">{formatNumber(stockData.previousClose)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500">고가</span>
            <p className="font-medium text-green-600">{formatNumber(stockData.high)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500">저가</span>
            <p className="font-medium text-red-600">{formatNumber(stockData.low)}</p>
          </div>
        </div>

        {/* 거래량 및 추가 정보 */}
        {stockData.volume > 0 && (
          <div className="text-xs border-t pt-3">
            <div className="flex justify-between">
              <span className="text-gray-500">거래량</span>
              <span className="font-medium">
                {new Intl.NumberFormat('ko-KR').format(stockData.volume)}
              </span>
            </div>
            
            {stockData.marketCap && (
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">시가총액</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('ko-KR', {
                    notation: 'compact',
                    compactDisplay: 'short'
                  }).format(stockData.marketCap)}
                </span>
              </div>
            )}

            {stockData.pe && (
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">PER</span>
                <span className="font-medium">{formatNumber(stockData.pe)}</span>
              </div>
            )}
          </div>
        )}

        {/* 업데이트 시간 */}
        {lastUpdated && (
          <div className="flex items-center justify-center text-xs text-gray-500 border-t pt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {lastUpdated.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
              })} 업데이트
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}