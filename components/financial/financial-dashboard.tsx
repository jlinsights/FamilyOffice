/**
 * 금융 데이터 대시보드 컴포넌트
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, AlertCircle } from 'lucide-react'
import StockCard from './stock-card'
import ForexCard from './forex-card'

interface ApiStatus {
  yahoo: { available: boolean; error?: string }
  alphavantage: { available: boolean; error?: string }
  cache: {
    memory: { keys: number; hitRate: number }
    redis: { connected: boolean; status: string }
  }
}

interface FinancialDashboardProps {
  className?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function FinancialDashboard({
  className = '',
  autoRefresh = true,
  refreshInterval = 300000 // 5분
}: FinancialDashboardProps) {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [lastStatusUpdate, setLastStatusUpdate] = useState<Date | null>(null)

  // 한국 주요 주식 목록
  const koreanStocks = [
    '005930.KS', // 삼성전자
    '000660.KS', // SK하이닉스
    '035420.KS', // NAVER
    '051910.KS', // LG화학
    '035720.KS'  // 카카오
  ]

  // 미국 주요 주식 목록
  const usStocks = [
    'AAPL',  // 애플
    'MSFT',  // 마이크로소프트
    'GOOGL', // 구글
    'AMZN',  // 아마존
    'TSLA'   // 테슬라
  ]

  // 주요 환율 목록
  const majorForex = [
    { from: 'USD', to: 'KRW' },
    { from: 'EUR', to: 'KRW' },
    { from: 'JPY', to: 'KRW' },
    { from: 'CNY', to: 'KRW' }
  ]

  // API 상태 확인
  const fetchApiStatus = async () => {
    try {
      setStatusLoading(true)
      const response = await fetch('/api/financial/status?detailed=true')
      const result = await response.json()
      
      if (result.success) {
        setApiStatus(result.data.status)
        setLastStatusUpdate(new Date())
      }
    } catch (error) {
      console.error('API 상태 확인 실패:', error)
    } finally {
      setStatusLoading(false)
    }
  }

  // 컴포넌트 마운트 시 상태 확인
  useEffect(() => {
    fetchApiStatus()
  }, [])

  // 자동 상태 업데이트
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchApiStatus()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  // API 상태 색상
  const getStatusColor = (available: boolean) => {
    return available ? 'bg-green-500' : 'bg-red-500'
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 및 상태 정보 */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">금융 데이터 대시보드</h2>
          <p className="text-muted-foreground">
            실시간 주식 및 환율 정보를 확인하세요
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* API 상태 표시 */}
          {apiStatus && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(apiStatus.yahoo.available)}`} />
                <span className="text-xs">Yahoo</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(apiStatus.alphavantage.available)}`} />
                <span className="text-xs">Alpha</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(apiStatus.cache.redis.connected)}`} />
                <span className="text-xs">Cache</span>
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={fetchApiStatus}
            disabled={statusLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${statusLoading ? 'animate-spin' : ''}`} />
            상태 새로고침
          </Button>
        </div>
      </div>

      {/* 캐시 성능 정보 */}
      {apiStatus?.cache && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">캐시 성능</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">메모리 키 수</p>
                <p className="font-semibold">{apiStatus.cache.memory.keys}</p>
              </div>
              <div>
                <p className="text-gray-500">캐시 적중률</p>
                <p className="font-semibold">
                  {(apiStatus.cache.memory.hitRate * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-500">Redis 상태</p>
                <Badge variant={apiStatus.cache.redis.connected ? 'default' : 'destructive'}>
                  {apiStatus.cache.redis.status}
                </Badge>
              </div>
              <div>
                <p className="text-gray-500">마지막 업데이트</p>
                <p className="font-semibold">
                  {lastStatusUpdate?.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) || '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 메인 데이터 탭 */}
      <Tabs defaultValue="korean-stocks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="korean-stocks">한국 주식</TabsTrigger>
          <TabsTrigger value="us-stocks">미국 주식</TabsTrigger>
          <TabsTrigger value="forex">환율</TabsTrigger>
          <TabsTrigger value="indices">지수</TabsTrigger>
        </TabsList>

        {/* 한국 주식 탭 */}
        <TabsContent value="korean-stocks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {koreanStocks.map((symbol) => (
              <StockCard
                key={symbol}
                symbol={symbol}
                autoRefresh={autoRefresh}
                refreshInterval={refreshInterval}
              />
            ))}
          </div>
        </TabsContent>

        {/* 미국 주식 탭 */}
        <TabsContent value="us-stocks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {usStocks.map((symbol) => (
              <StockCard
                key={symbol}
                symbol={symbol}
                autoRefresh={autoRefresh}
                refreshInterval={refreshInterval}
              />
            ))}
          </div>
        </TabsContent>

        {/* 환율 탭 */}
        <TabsContent value="forex" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {majorForex.map(({ from, to }) => (
              <ForexCard
                key={`${from}-${to}`}
                fromCurrency={from}
                toCurrency={to}
                autoRefresh={autoRefresh}
                refreshInterval={refreshInterval}
              />
            ))}
          </div>
        </TabsContent>

        {/* 지수 탭 */}
        <TabsContent value="indices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StockCard symbol="^GSPC" autoRefresh={autoRefresh} /> {/* S&P 500 */}
            <StockCard symbol="^DJI" autoRefresh={autoRefresh} />  {/* 다우존스 */}
            <StockCard symbol="^IXIC" autoRefresh={autoRefresh} /> {/* 나스닥 */}
            <StockCard symbol="^KS11" autoRefresh={autoRefresh} /> {/* 코스피 */}
          </div>
        </TabsContent>
      </Tabs>

      {/* API 오류 알림 */}
      {apiStatus && (!apiStatus.yahoo.available && !apiStatus.alphavantage.available) && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">
                  금융 데이터 서비스 오류
                </p>
                <p className="text-sm text-red-600">
                  모든 데이터 제공업체에 연결할 수 없습니다. 캐시된 데이터만 표시됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}