/**
 * 자산 관리 대시보드 페이지 - FamilyOffice S 프리미엄 자산관리
 */

import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AssetManagementDashboard from '@/components/asset-management-dashboard'
import KoreanMarketInsight from '@/components/korean-market-insight'
import RiskAnalysisPanel from '@/components/risk-analysis-panel'
import AssetClassCard from '@/components/asset-class-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  Shield, 
  TrendingUp, 
  Settings,
  Download,
  Calendar,
  Bell,
  ArrowLeft
} from 'lucide-react'

export const metadata: Metadata = {
  title: '자산 관리 대시보드 | FamilyOffice S',
  description: 'FamilyOffice S 프리미엄 자산관리 포트폴리오 대시보드. 실시간 포트폴리오 현황, 위험 분석, 한국 시장 인사이트를 제공합니다.',
  keywords: ['자산관리', '포트폴리오', '투자', '한국주식', '위험관리', 'FamilyOffice'],
}

// 데모 위험 메트릭 데이터
const demoRiskMetrics = {
  volatility: 12.4,
  var95: -3.2,
  sharpeRatio: 1.25,
  beta: 0.88,
  maxDrawdown: -8.2,
  correlationToMarket: 0.75,
  concentrationRisk: 28.5
}

// 데모 자산군 데이터
const demoAssetClasses = [
  {
    type: 'stocks' as const,
    totalValue: 1106400000,
    allocation: 45.2,
    targetAllocation: 50.0,
    dayChange: 5580000,
    dayChangePercent: 0.51,
    ytdReturn: 12.8,
    holdings: [
      { name: '삼성전자', symbol: '005930.KS', value: 350000000, weight: 31.6, change: 2.1 },
      { name: 'Apple Inc.', symbol: 'AAPL', value: 280000000, weight: 25.3, change: 1.8 },
      { name: 'SK하이닉스', symbol: '000660.KS', value: 210000000, weight: 19.0, change: -0.7 },
      { name: 'Microsoft', symbol: 'MSFT', value: 185000000, weight: 16.7, change: 0.9 },
      { name: 'NAVER', symbol: '035420.KS', value: 81400000, weight: 7.4, change: 1.3 }
    ],
    metrics: {
      count: 28,
      avgReturn: 8.5,
      volatility: 18.2
    }
  },
  {
    type: 'bonds' as const,
    totalValue: 632100000,
    allocation: 25.8,
    targetAllocation: 25.0,
    dayChange: 3160000,
    dayChangePercent: 0.50,
    ytdReturn: 4.2,
    holdings: [
      { name: '국고채 10년', value: 250000000, weight: 39.6, change: 0.2 },
      { name: '회사채 AA-', value: 180000000, weight: 28.5, change: 0.8 },
      { name: '해외채권 ETF', value: 120000000, weight: 19.0, change: 0.5 },
      { name: 'TIP (물가연동채)', value: 82100000, weight: 13.0, change: 0.1 }
    ],
    metrics: {
      count: 12,
      avgReturn: 4.2,
      yield: 3.8
    }
  },
  {
    type: 'realEstate' as const,
    totalValue: 453250000,
    allocation: 18.5,
    targetAllocation: 20.0,
    dayChange: 2266250,
    dayChangePercent: 0.50,
    ytdReturn: 6.8,
    holdings: [
      { name: '강남 오피스텔', value: 180000000, weight: 39.7, change: 0.3 },
      { name: 'REITs ETF', value: 140000000, weight: 30.9, change: 0.8 },
      { name: '물류센터 투자', value: 100000000, weight: 22.1, change: 0.2 },
      { name: '해외부동산 펀드', value: 33250000, weight: 7.3, change: 1.2 }
    ],
    metrics: {
      count: 8,
      avgReturn: 6.8,
      yield: 4.5
    }
  },
  {
    type: 'alternatives' as const,
    totalValue: 178850000,
    allocation: 7.3,
    targetAllocation: 10.0,
    dayChange: 894250,
    dayChangePercent: 0.50,
    ytdReturn: 15.2,
    holdings: [
      { name: '사모펀드 A', value: 80000000, weight: 44.7, change: 0.2 },
      { name: '헤지펀드 B', value: 60000000, weight: 33.5, change: 1.1 },
      { name: '금 ETF', value: 25000000, weight: 14.0, change: 0.8 },
      { name: '원자재 펀드', value: 13850000, weight: 7.7, change: -0.3 }
    ],
    metrics: {
      count: 6,
      avgReturn: 15.2,
      volatility: 22.8
    }
  },
  {
    type: 'cash' as const,
    totalValue: 78400000,
    allocation: 3.2,
    targetAllocation: 5.0,
    dayChange: 392000,
    dayChangePercent: 0.50,
    ytdReturn: 3.5,
    holdings: [
      { name: 'MMF', value: 50000000, weight: 63.8, change: 0.0 },
      { name: '정기예금', value: 20000000, weight: 25.5, change: 0.0 },
      { name: '단기자금', value: 8400000, weight: 10.7, change: 0.0 }
    ],
    metrics: {
      count: 3,
      yield: 3.5
    }
  }
]

export default async function AssetManagementPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* 뒤로가기 버튼 */}
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  대시보드
                </Link>
              </Button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">자산 관리 대시보드</h1>
                <p className="text-sm text-gray-600">FamilyOffice S 프리미엄 포트폴리오</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Calendar className="h-3 w-3 mr-1" />
                실시간 업데이트
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                리포트 다운로드
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                알림 설정
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                포트폴리오 설정
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 좌측 메인 대시보드 (3컬럼) */}
          <div className="xl:col-span-3 space-y-8">
            {/* 메인 자산 관리 대시보드 */}
            <AssetManagementDashboard 
              autoRefresh={true}
              refreshInterval={300000}
            />

            {/* 자산군별 상세 카드 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">자산군별 현황</h2>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  리밸런싱 제안
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demoAssetClasses.map((assetClass, index) => (
                  <AssetClassCard
                    key={index}
                    data={assetClass}
                    onViewDetails={() => console.log(`View details for ${assetClass.type}`)}
                    onRebalance={() => console.log(`Rebalance ${assetClass.type}`)}
                  />
                ))}
              </div>
            </div>

            {/* 한국 시장 인사이트 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">한국 시장 인사이트</h2>
              <KoreanMarketInsight autoRefresh={true} />
            </div>
          </div>

          {/* 우측 사이드바 (1컬럼) */}
          <div className="xl:col-span-1 space-y-6">
            {/* 위험 분석 패널 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                위험 분석
              </h3>
              <RiskAnalysisPanel
                metrics={demoRiskMetrics}
                onOptimize={() => console.log('Optimize portfolio')}
                onViewDetails={() => console.log('View risk details')}
              />
            </div>

            {/* 빠른 액션 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 액션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  월간 리포트 다운로드
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  전문가 상담 예약
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  투자 목표 설정
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  알림 설정
                </Button>
              </CardContent>
            </Card>

            {/* 최근 활동 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">최근 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">삼성전자 매수</span>
                    <span className="font-medium">어제</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">리밸런싱 완료</span>
                    <span className="font-medium">3일 전</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배당금 수령</span>
                    <span className="font-medium">1주 전</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">월간 리포트 생성</span>
                    <span className="font-medium">2주 전</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}