/**
 * 자산 관리 대시보드 - FamilyOffice S 프리미엄 자산관리 플랫폼
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  PieChart, 
  Building2, 
  Wallet,
  Target,
  AlertTriangle,
  Calendar,
  User,
  Globe
} from 'lucide-react'
import StockCard from './financial/stock-card'
import ForexCard from './financial/forex-card'

interface PortfolioData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  allocations: {
    stocks: number
    bonds: number
    realEstate: number
    alternatives: number
    cash: number
  }
  topHoldings: Array<{
    symbol: string
    name: string
    value: number
    weight: number
    change: number
  }>
  riskMetrics: {
    volatility: number
    sharpeRatio: number
    beta: number
    maxDrawdown: number
  }
}

interface AssetManagementDashboardProps {
  className?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function AssetManagementDashboard({
  className = '',
  autoRefresh = true,
  refreshInterval = 300000 // 5분
}: AssetManagementDashboardProps) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // 데모 데이터 생성
  const generateDemoData = (): PortfolioData => {
    return {
      totalValue: 2450000000, // 24억 5천만원
      dayChange: 12300000, // +1,230만원
      dayChangePercent: 0.51,
      allocations: {
        stocks: 45.2,
        bonds: 25.8,
        realEstate: 18.5,
        alternatives: 7.3,
        cash: 3.2
      },
      topHoldings: [
        { symbol: '005930.KS', name: '삼성전자', value: 350000000, weight: 14.3, change: 2.1 },
        { symbol: 'AAPL', name: 'Apple Inc.', value: 280000000, weight: 11.4, change: 1.8 },
        { symbol: '000660.KS', name: 'SK하이닉스', value: 210000000, weight: 8.6, change: -0.7 },
        { symbol: 'MSFT', name: 'Microsoft', value: 185000000, weight: 7.5, change: 0.9 },
        { symbol: '035420.KS', name: 'NAVER', value: 165000000, weight: 6.7, change: 1.3 }
      ],
      riskMetrics: {
        volatility: 12.4,
        sharpeRatio: 1.25,
        beta: 0.88,
        maxDrawdown: -8.2
      }
    }
  }

  // 포트폴리오 데이터 로드
  const fetchPortfolioData = async () => {
    try {
      setLoading(true)
      // 실제 API 호출 대신 데모 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPortfolioData(generateDemoData())
      setLastUpdated(new Date())
    } catch (error) {
      console.error('포트폴리오 데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchPortfolioData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) { // 1억 이상
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) { // 1만 이상
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

  if (loading && !portfolioData) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!portfolioData) return null

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">자산 관리 대시보드</h1>
          <p className="text-gray-600">
            FamilyOffice S 프리미엄 자산관리 포트폴리오
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <User className="h-3 w-3 mr-1" />
            프리미엄 고객
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPortfolioData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 총 자산 */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wallet className="h-4 w-4 mr-2 text-blue-600" />
              총 자산가액
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(portfolioData.totalValue)}
            </div>
            <div className={`text-sm flex items-center mt-1 ${getChangeColor(portfolioData.dayChange)}`}>
              {getChangeIcon(portfolioData.dayChange)}
              <span className="ml-1">
                {portfolioData.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolioData.dayChange)}
                ({portfolioData.dayChangePercent >= 0 ? '+' : ''}{portfolioData.dayChangePercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 위험도 */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              위험도 (베타)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {portfolioData.riskMetrics.beta.toFixed(2)}
            </div>
            <div className="text-sm text-green-700 mt-1">
              시장 대비 {portfolioData.riskMetrics.beta < 1 ? '안정적' : '공격적'} 포트폴리오
            </div>
          </CardContent>
        </Card>

        {/* 샤프 비율 */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
              샤프 비율
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {portfolioData.riskMetrics.sharpeRatio.toFixed(2)}
            </div>
            <div className="text-sm text-purple-700 mt-1">
              우수한 위험 대비 수익률
            </div>
          </CardContent>
        </Card>

        {/* 최대 손실 */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
              최대 손실폭
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {portfolioData.riskMetrics.maxDrawdown.toFixed(1)}%
            </div>
            <div className="text-sm text-orange-700 mt-1">
              과거 1년 기준
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 컨텐츠 탭 */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">포트폴리오 개요</TabsTrigger>
          <TabsTrigger value="allocation">자산 배분</TabsTrigger>
          <TabsTrigger value="holdings">보유 종목</TabsTrigger>
          <TabsTrigger value="performance">성과 분석</TabsTrigger>
          <TabsTrigger value="market">시장 현황</TabsTrigger>
        </TabsList>

        {/* 포트폴리오 개요 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 자산 배분 차트 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  자산 배분 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">주식</span>
                    <span className="text-sm font-medium">{portfolioData.allocations.stocks}%</span>
                  </div>
                  <Progress value={portfolioData.allocations.stocks} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">채권</span>
                    <span className="text-sm font-medium">{portfolioData.allocations.bonds}%</span>
                  </div>
                  <Progress value={portfolioData.allocations.bonds} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">부동산</span>
                    <span className="text-sm font-medium">{portfolioData.allocations.realEstate}%</span>
                  </div>
                  <Progress value={portfolioData.allocations.realEstate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">대체투자</span>
                    <span className="text-sm font-medium">{portfolioData.allocations.alternatives}%</span>
                  </div>
                  <Progress value={portfolioData.allocations.alternatives} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">현금</span>
                    <span className="text-sm font-medium">{portfolioData.allocations.cash}%</span>
                  </div>
                  <Progress value={portfolioData.allocations.cash} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 위험 지표 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  위험 관리 지표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">
                      {portfolioData.riskMetrics.volatility}%
                    </div>
                    <div className="text-sm text-blue-600">변동성</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">
                      {portfolioData.riskMetrics.sharpeRatio}
                    </div>
                    <div className="text-sm text-green-600">샤프 비율</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">
                      {portfolioData.riskMetrics.beta}
                    </div>
                    <div className="text-sm text-purple-600">베타</div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">
                      {portfolioData.riskMetrics.maxDrawdown}%
                    </div>
                    <div className="text-sm text-orange-600">최대 손실폭</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 자산 배분 */}
        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(portfolioData.allocations).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {key === 'stocks' && '주식'}
                    {key === 'bonds' && '채권'}
                    {key === 'realEstate' && '부동산'}
                    {key === 'alternatives' && '대체투자'}
                    {key === 'cash' && '현금'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{value}%</div>
                  <div className="text-sm text-gray-600 mb-4">
                    {formatCurrency(portfolioData.totalValue * value / 100)}
                  </div>
                  <Progress value={value} className="h-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 보유 종목 */}
        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>주요 보유 종목</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.topHoldings.map((holding, index) => (
                  <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                      <div>
                        <div className="font-semibold">{holding.name}</div>
                        <div className="text-sm text-gray-600">{holding.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(holding.value)}</div>
                      <div className="text-sm text-gray-600">{holding.weight}%</div>
                      <div className={`text-sm ${getChangeColor(holding.change)}`}>
                        {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 성과 분석 */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>수익률 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>일간 수익률</span>
                    <span className={getChangeColor(portfolioData.dayChangePercent)}>
                      {portfolioData.dayChangePercent >= 0 ? '+' : ''}{portfolioData.dayChangePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>월간 수익률</span>
                    <span className="text-green-600">+3.24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>연간 수익률</span>
                    <span className="text-green-600">+12.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>누적 수익률</span>
                    <span className="text-green-600">+28.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>벤치마크 대비</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>KOSPI 대비</span>
                    <span className="text-green-600">+2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>S&P 500 대비</span>
                    <span className="text-green-600">+1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>채권지수 대비</span>
                    <span className="text-blue-600">+0.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>부동산지수 대비</span>
                    <span className="text-purple-600">+1.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 시장 현황 */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 한국 주요 주식 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  한국 주요 주식
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <StockCard symbol="005930.KS" autoRefresh={autoRefresh} />
                  <StockCard symbol="000660.KS" autoRefresh={autoRefresh} />
                  <StockCard symbol="035420.KS" autoRefresh={autoRefresh} />
                </div>
              </CardContent>
            </Card>

            {/* 환율 현황 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  주요 환율
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <ForexCard fromCurrency="USD" toCurrency="KRW" autoRefresh={autoRefresh} />
                  <ForexCard fromCurrency="EUR" toCurrency="KRW" autoRefresh={autoRefresh} />
                  <ForexCard fromCurrency="JPY" toCurrency="KRW" autoRefresh={autoRefresh} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 업데이트 시간 */}
      {lastUpdated && (
        <div className="text-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 inline mr-1" />
          마지막 업데이트: {lastUpdated.toLocaleString('ko-KR')}
        </div>
      )}
    </div>
  )
}