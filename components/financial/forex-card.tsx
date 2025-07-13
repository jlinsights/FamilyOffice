/**
 * 환율 정보 카드 컴포넌트
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, RefreshCw, Clock, ArrowRightLeft } from 'lucide-react'
import type { ForexData } from '@/lib/types/financial'

interface ForexCardProps {
  fromCurrency: string
  toCurrency: string
  autoRefresh?: boolean
  refreshInterval?: number
  className?: string
}

export default function ForexCard({ 
  fromCurrency, 
  toCurrency,
  autoRefresh = false,
  refreshInterval = 300000, // 5분
  className = ''
}: ForexCardProps) {
  const [forexData, setForexData] = useState<ForexData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // 환율 데이터 가져오기
  const fetchForexData = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)

      const url = `/api/financial/forex?from=${fromCurrency}&to=${toCurrency}${forceRefresh ? '&refresh=true' : ''}`
      const response = await fetch(url)
      const result = await response.json()

      if (result.success && result.data) {
        setForexData(result.data)
        setLastUpdated(new Date())
      } else {
        setError(result.error?.message || '환율 데이터를 가져올 수 없습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchForexData()
  }, [fromCurrency, toCurrency])

  // 자동 새로고침 설정
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchForexData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  // 수동 새로고침
  const handleRefresh = () => {
    fetchForexData(true)
  }

  // 환율 변화 색상 결정
  const getRateChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // 환율 변화 아이콘
  const getRateChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return null
  }

  // 통화 기호 가져오기
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      JPY: '¥',
      GBP: '£',
      KRW: '₩',
      CNY: '¥',
      CHF: 'CHF',
      CAD: 'C$',
      AUD: 'A$'
    }
    return symbols[currency] || currency
  }

  // 숫자 포맷팅
  const formatRate = (rate: number) => {
    // KRW의 경우 소수점 없이, 다른 통화는 4자리까지
    const decimals = toCurrency === 'KRW' ? 0 : 4
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(rate)
  }

  // 퍼센트 포맷팅
  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`
  }

  // 로딩 상태
  if (loading && !forexData) {
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
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 오류 상태
  if (error && !forexData) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">
              {fromCurrency}/{toCurrency}
            </CardTitle>
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
            <p className="text-sm text-red-600 mb-2">환율 데이터 로드 실패</p>
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

  if (!forexData) return null

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-1">
              <span>{forexData.fromCurrency}</span>
              <ArrowRightLeft className="h-3 w-3 text-gray-400" />
              <span>{forexData.toCurrency}</span>
            </CardTitle>
            {forexData.cached && (
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
        {/* 현재 환율 */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {getCurrencySymbol(forexData.toCurrency)}{formatRate(forexData.rate)}
            </span>
            {getRateChangeIcon(forexData.change)}
          </div>
          
          {(forexData.change !== 0 || forexData.changePercent !== 0) && (
            <div className={`text-sm ${getRateChangeColor(forexData.change)}`}>
              {forexData.change >= 0 ? '+' : ''}
              {formatRate(forexData.change)} ({formatPercent(forexData.changePercent)})
            </div>
          )}
        </div>

        {/* 환율 계산기 */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">1 {forexData.fromCurrency}</span>
            <span className="font-medium">
              {formatRate(forexData.rate)} {forexData.toCurrency}
            </span>
          </div>
          
          {/* 역환율 표시 */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">1 {forexData.toCurrency}</span>
            <span className="font-medium">
              {formatRate(1 / forexData.rate)} {forexData.fromCurrency}
            </span>
          </div>
        </div>

        {/* Bid/Ask 정보 (있는 경우) */}
        {(forexData.bid || forexData.ask) && (
          <div className="grid grid-cols-2 gap-4 text-xs border-t pt-3">
            {forexData.bid && (
              <div className="space-y-1">
                <span className="text-gray-500">매수</span>
                <p className="font-medium text-green-600">
                  {formatRate(forexData.bid)}
                </p>
              </div>
            )}
            {forexData.ask && (
              <div className="space-y-1">
                <span className="text-gray-500">매도</span>
                <p className="font-medium text-red-600">
                  {formatRate(forexData.ask)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 고가/저가 (있는 경우) */}
        {(forexData.high || forexData.low) && (
          <div className="grid grid-cols-2 gap-4 text-xs">
            {forexData.high && (
              <div className="space-y-1">
                <span className="text-gray-500">고가</span>
                <p className="font-medium text-green-600">
                  {formatRate(forexData.high)}
                </p>
              </div>
            )}
            {forexData.low && (
              <div className="space-y-1">
                <span className="text-gray-500">저가</span>
                <p className="font-medium text-red-600">
                  {formatRate(forexData.low)}
                </p>
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