/**
 * 엔터프라이즈급 통합 대시보드 예시 - FamilyOffice S
 * 모든 고급 컴포넌트를 통합한 완전한 대시보드
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Users, 
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 샘플 데이터
const samplePortfolioData = {
  totalValue: 12500000000, // 125억원
  change: 1250000000, // 12.5억원
  changePercent: 11.11,
  assets: [
    { category: '주식', value: 5000000000, percentage: 40, color: '#10b981' },
    { category: '채권', value: 3000000000, percentage: 24, color: '#3b82f6' },
    { category: '부동산', value: 2500000000, percentage: 20, color: '#f59e0b' },
    { category: '대체투자', value: 1500000000, percentage: 12, color: '#8b5cf6' },
    { category: '현금', value: 500000000, percentage: 4, color: '#6b7280' }
  ],
  performance: [
    { date: '2024-01', value: 10000000000 },
    { date: '2024-02', value: 10500000000 },
    { date: '2024-03', value: 11000000000 },
    { date: '2024-04', value: 10800000000 },
    { date: '2024-05', value: 11500000000 },
    { date: '2024-06', value: 12000000000 },
    { date: '2024-07', value: 12500000000 }
  ],
  riskMetrics: {
    volatility: 12.5,
    sharpeRatio: 1.8,
    maxDrawdown: 8.2,
    beta: 0.85
  }
}

// 메트릭 카드 컴포넌트
interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
  className?: string
}

function MetricCard({ title, value, change, icon, color, className }: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <p className={cn(
                "text-sm font-medium mt-1",
                change >= 0 ? "text-success-600" : "text-error-600"
              )}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-full", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 엔터프라이즈급 대시보드
export function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">FamilyOffice S</h1>
              <Badge variant="secondary" className="bg-premium-100 text-premium-800">
                엔터프라이즈
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 네비게이션 */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          {[
            { id: 'overview', label: '개요', icon: TrendingUp },
            { id: 'portfolio', label: '포트폴리오', icon: DollarSign },
            { id: 'risk', label: '리스크', icon: Shield },
            { id: 'transactions', label: '거래', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === tab.id
                  ? "border-premium-500 text-premium-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 대시보드 콘텐츠 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 메트릭 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="총 자산"
                value={`${(samplePortfolioData.totalValue / 100000000).toFixed(1)}억원`}
                change={samplePortfolioData.changePercent}
                icon={<DollarSign className="h-6 w-6 text-white" />}
                color="bg-premium-500"
              />
              <MetricCard
                title="일일 수익률"
                value="+2.34%"
                change={2.34}
                icon={<TrendingUp className="h-6 w-6 text-white" />}
                color="bg-success-500"
              />
              <MetricCard
                title="리스크 점수"
                value="낮음"
                icon={<Shield className="h-6 w-6 text-white" />}
                color="bg-navy-500"
              />
              <MetricCard
                title="활성 거래"
                value="12"
                icon={<Users className="h-6 w-6 text-white" />}
                color="bg-warning-500"
              />
            </div>

            {/* 차트 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-gradient-to-r from-premium-50 to-premium-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-premium-600" />
                      <CardTitle>포트폴리오 성과</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    최근 6개월 성과 추이
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">고급 차트 컴포넌트가 여기에 표시됩니다</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-gradient-to-r from-navy-50 to-navy-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-navy-600" />
                      <CardTitle>자산 배분</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    포트폴리오 자산 구성
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {samplePortfolioData.assets.map((asset) => (
                      <div key={asset.category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: asset.color }}
                          />
                          <span className="font-medium">{asset.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {(asset.value / 100000000).toFixed(1)}억원
                          </div>
                          <div className="text-sm text-gray-500">
                            {asset.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 리스크 메트릭스 */}
            <Card className="overflow-hidden">
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
                  {[
                    { name: '변동성', value: '12.5%', color: 'success' },
                    { name: '샤프 비율', value: '1.8', color: 'success' },
                    { name: '최대 낙폭', value: '8.2%', color: 'warning' },
                    { name: '베타', value: '0.85', color: 'success' }
                  ].map((metric) => (
                    <div
                      key={metric.name}
                      className={cn(
                        "p-4 rounded-lg border",
                        metric.color === 'success' 
                          ? "text-success-600 bg-success-50 border-success-200"
                          : "text-warning-600 bg-warning-50 border-warning-200"
                      )}
                    >
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        {metric.name}
                      </div>
                      <div className="text-2xl font-bold">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 접근성 기능 */}
        <div className="fixed bottom-4 right-4">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-premium-500 hover:bg-premium-600"
            aria-label="접근성 설정"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  )
}

// 사용 예시
export function EnterpriseDashboardExample() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          FamilyOffice S 엔터프라이즈 대시보드
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          초고액 자산가를 위한 프리미엄 자산 관리 플랫폼
        </p>
      </div>
      
      <EnterpriseDashboard />
    </div>
  )
} 