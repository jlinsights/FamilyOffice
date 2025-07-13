/**
 * 한국 시장 인사이트 컴포넌트 - FamilyOffice S 특화 기능
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  TrendingUp, 
  Globe,
  Landmark,
  Users,
  AlertCircle,
  Calendar
} from 'lucide-react'
import StockCard from './financial/stock-card'
import ForexCard from './financial/forex-card'

interface MarketSentiment {
  kospi: { value: number; change: number }
  kosdaq: { value: number; change: number }
  sentiment: 'bullish' | 'bearish' | 'neutral'
  foreignInvestment: number
  institutionalFlow: number
}

interface PolicyUpdate {
  title: string
  category: 'tax' | 'regulation' | 'monetary' | 'fiscal'
  impact: 'positive' | 'negative' | 'neutral'
  summary: string
  date: string
}

interface IndustryInsight {
  sector: string
  performance: number
  outlook: 'positive' | 'negative' | 'neutral'
  keyFactors: string[]
  recommendedStocks: string[]
}

interface KoreanMarketInsightProps {
  className?: string
  autoRefresh?: boolean
}

export default function KoreanMarketInsight({
  className = '',
  autoRefresh = true
}: KoreanMarketInsightProps) {
  const [marketData, setMarketData] = useState<MarketSentiment | null>(null)
  const [loading, setLoading] = useState(true)

  // 데모 데이터 생성
  const generateDemoData = () => {
    const policies: PolicyUpdate[] = [
      {
        title: '금융투자소득세 재검토',
        category: 'tax',
        impact: 'positive',
        summary: '개인투자자 부담 완화 방안 논의',
        date: '2024-01-15'
      },
      {
        title: 'K-택소노미 확대',
        category: 'regulation',
        impact: 'positive',
        summary: 'ESG 투자 활성화 정책',
        date: '2024-01-12'
      },
      {
        title: '한국은행 기준금리 동결',
        category: 'monetary',
        impact: 'neutral',
        summary: '연 3.50% 수준 유지',
        date: '2024-01-11'
      }
    ]

    const industries: IndustryInsight[] = [
      {
        sector: '반도체',
        performance: 8.5,
        outlook: 'positive',
        keyFactors: ['AI 수요 증가', 'HBM 시장 성장', '중국 의존도 완화'],
        recommendedStocks: ['005930.KS', '000660.KS']
      },
      {
        sector: '2차전지',
        performance: 12.3,
        outlook: 'positive',
        keyFactors: ['전기차 확산', 'ESS 수요 증가', '정부 지원정책'],
        recommendedStocks: ['051910.KS', '006400.KS']
      },
      {
        sector: '바이오헬스',
        performance: -2.1,
        outlook: 'neutral',
        keyFactors: ['임상시험 결과 대기', '규제 환경 변화', '해외 진출 확대'],
        recommendedStocks: ['207940.KS', '068270.KS']
      }
    ]

    return {
      sentiment: {
        kospi: { value: 2485, change: 1.2 },
        kosdaq: { value: 758, change: 0.8 },
        sentiment: 'bullish' as const,
        foreignInvestment: 1250000000,
        institutionalFlow: -850000000
      },
      policies,
      industries
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = generateDemoData()
      setMarketData(data.sentiment)
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatCurrency = (amount: number) => {
    if (Math.abs(amount) >= 100000000) {
      return `${(amount / 100000000).toFixed(0)}억원`
    } else if (Math.abs(amount) >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`
    }
    return `${amount.toLocaleString()}원`
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-600'
      case 'bearish': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '강세'
      case 'bearish': return '약세'
      default: return '보합'
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const demoData = generateDemoData()

  if (loading) {
    return (
      <Card className={`${className} animate-pulse`}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 시장 개요 */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              한국 증시 현황
            </span>
            {marketData && (
              <Badge 
                className={`${getSentimentColor(marketData.sentiment)} bg-white`}
                variant="outline"
              >
                {getSentimentText(marketData.sentiment)}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {marketData && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">KOSPI</p>
                <p className="text-xl font-bold">{marketData.kospi.value.toLocaleString()}</p>
                <p className={`text-sm ${getChangeColor(marketData.kospi.change)}`}>
                  {marketData.kospi.change >= 0 ? '+' : ''}{marketData.kospi.change}%
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">KOSDAQ</p>
                <p className="text-xl font-bold">{marketData.kosdaq.value.toLocaleString()}</p>
                <p className={`text-sm ${getChangeColor(marketData.kosdaq.change)}`}>
                  {marketData.kosdaq.change >= 0 ? '+' : ''}{marketData.kosdaq.change}%
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">외국인 순매수</p>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(marketData.foreignInvestment)}
                </p>
                <p className="text-xs text-gray-600">이번 주</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">기관 순매도</p>
                <p className="text-lg font-bold text-red-600">
                  {formatCurrency(marketData.institutionalFlow)}
                </p>
                <p className="text-xs text-gray-600">이번 주</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 상세 분석 탭 */}
      <Tabs defaultValue="market" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market">시장 현황</TabsTrigger>
          <TabsTrigger value="policy">정책 동향</TabsTrigger>
          <TabsTrigger value="industry">업종 분석</TabsTrigger>
          <TabsTrigger value="recommendations">투자 제안</TabsTrigger>
        </TabsList>

        {/* 시장 현황 */}
        <TabsContent value="market" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 주요 주식 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  대형주 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StockCard symbol="005930.KS" autoRefresh={autoRefresh} />
                <StockCard symbol="000660.KS" autoRefresh={autoRefresh} />
                <StockCard symbol="035420.KS" autoRefresh={autoRefresh} />
              </CardContent>
            </Card>

            {/* 환율 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  주요 환율
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ForexCard fromCurrency="USD" toCurrency="KRW" autoRefresh={autoRefresh} />
                <ForexCard fromCurrency="EUR" toCurrency="KRW" autoRefresh={autoRefresh} />
                <ForexCard fromCurrency="JPY" toCurrency="KRW" autoRefresh={autoRefresh} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 정책 동향 */}
        <TabsContent value="policy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {demoData.policies.map((policy, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <Badge 
                      variant={policy.impact === 'positive' ? 'default' : 
                               policy.impact === 'negative' ? 'destructive' : 'secondary'}
                    >
                      {policy.impact === 'positive' ? '긍정적' : 
                       policy.impact === 'negative' ? '부정적' : '중립적'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Landmark className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600 capitalize">
                        {policy.category === 'tax' && '세제'}
                        {policy.category === 'regulation' && '규제'}
                        {policy.category === 'monetary' && '통화정책'}
                        {policy.category === 'fiscal' && '재정정책'}
                      </span>
                    </div>
                    <p className="text-sm">{policy.summary}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(policy.date).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 업종 분석 */}
        <TabsContent value="industry" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {demoData.industries.map((industry, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{industry.sector}</CardTitle>
                    <Badge 
                      variant={industry.outlook === 'positive' ? 'default' : 
                               industry.outlook === 'negative' ? 'destructive' : 'secondary'}
                    >
                      {industry.outlook === 'positive' ? '긍정적' : 
                       industry.outlook === 'negative' ? '부정적' : '중립적'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">섹터 수익률</p>
                    <p className={`text-2xl font-bold ${getChangeColor(industry.performance)}`}>
                      {industry.performance >= 0 ? '+' : ''}{industry.performance}%
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">주요 요인</h4>
                    <ul className="text-xs space-y-1">
                      {industry.keyFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">관련 종목</h4>
                    <div className="flex flex-wrap gap-1">
                      {industry.recommendedStocks.map((stock, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {stock.replace('.KS', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 투자 제안 */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 단기 투자 기회 */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  단기 투자 기회
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-green-400 pl-3">
                  <h4 className="font-semibold">반도체 섹터 반등</h4>
                  <p className="text-sm text-green-700">AI 수요 증가로 HBM 관련주 주목</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">삼성전자</Badge>
                    <Badge variant="outline">SK하이닉스</Badge>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-400 pl-3">
                  <h4 className="font-semibold">2차전지 강세</h4>
                  <p className="text-sm text-green-700">전기차 수요 확대 지속</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">LG화학</Badge>
                    <Badge variant="outline">삼성SDI</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 위험 요인 */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  주의 요인
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-orange-400 pl-3">
                  <h4 className="font-semibold">미중 무역분쟁</h4>
                  <p className="text-sm text-orange-700">기술패권 경쟁 심화로 반도체 업종 영향</p>
                </div>
                
                <div className="border-l-4 border-orange-400 pl-3">
                  <h4 className="font-semibold">금리 변동성</h4>
                  <p className="text-sm text-orange-700">한미 금리차 확대 가능성 주시</p>
                </div>
                
                <div className="border-l-4 border-orange-400 pl-3">
                  <h4 className="font-semibold">부동산 PF</h4>
                  <p className="text-sm text-orange-700">건설사 유동성 리스크 모니터링 필요</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FamilyOffice S 전문가 의견 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Users className="h-5 w-5 mr-2" />
                FamilyOffice S 전문가 의견
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-900">
                  "현재 한국 증시는 구조적 변화 국면에 있습니다. AI와 친환경 에너지 전환이라는 
                  두 가지 메가 트렌드가 새로운 투자 기회를 제공하고 있으며, 이에 따른 선별적 
                  접근이 필요합니다."
                </blockquote>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">포트폴리오 제안</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">성장주 (40%)</p>
                      <p>반도체, 2차전지, AI</p>
                    </div>
                    <div>
                      <p className="text-gray-600">가치주 (30%)</p>
                      <p>금융, 화학, 정유</p>
                    </div>
                    <div>
                      <p className="text-gray-600">배당주 (20%)</p>
                      <p>통신, 유틸리티</p>
                    </div>
                    <div>
                      <p className="text-gray-600">현금 (10%)</p>
                      <p>기회 대기자금</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}