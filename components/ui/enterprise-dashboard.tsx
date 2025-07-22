/**
 * 엔터프라이즈급 대시보드 컴포넌트 - FamilyOffice S
 * WCAG 2.1 AA 접근성 준수, 고급 데이터 시각화
 */

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  BarChart3,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 접근성을 위한 ARIA 라벨
const ARIA_LABELS = {
  portfolioValue: '포트폴리오 총 가치',
  performanceChange: '성과 변화율',
  riskLevel: '리스크 레벨',
  assetAllocation: '자산 배분',
  recentTransactions: '최근 거래 내역',
  marketTrends: '시장 동향',
}

interface DashboardMetricProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  description?: string
  ariaLabel?: string
}

function DashboardMetric({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  description,
  ariaLabel 
}: DashboardMetricProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="p-2 rounded-lg bg-gradient-to-br from-premium-100 to-premium-200">
                {icon}
              </div>
            )}
            <CardTitle className="text-sm font-medium text-gray-600">
              {title}
            </CardTitle>
          </div>
          {change !== undefined && (
            <Badge 
              variant={changeType === 'positive' ? 'default' : changeType === 'negative' ? 'destructive' : 'secondary'}
              className={cn(
                'text-xs',
                changeType === 'positive' && 'bg-success-100 text-success-700 border-success-200',
                changeType === 'negative' && 'bg-danger-100 text-danger-700 border-danger-200'
              )}
            >
              {change > 0 ? '+' : ''}{change}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="text-2xl font-bold text-gray-900 mb-1"
          aria-label={ariaLabel}
          role="text"
        >
          {value}
        </div>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface AssetAllocationProps {
  data: Array<{
    name: string
    percentage: number
    value: number
    color: string
  }>
}

function AssetAllocation({ data }: AssetAllocationProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-premium-600" />
          <span>자산 배분</span>
        </CardTitle>
        <CardDescription>
          포트폴리오 자산 배분 현황
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.percentage}% (₩{item.value.toLocaleString()})
              </span>
            </div>
            <Progress 
              value={item.percentage} 
              className="h-2"
              style={{ 
                '--progress-color': item.color 
              } as React.CSSProperties}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

interface EnterpriseDashboardProps {
  portfolioValue: number
  performanceChange: number
  riskLevel: 'low' | 'medium' | 'high'
  assetAllocation: AssetAllocationProps['data']
  className?: string
}

export function EnterpriseDashboard({
  portfolioValue,
  performanceChange,
  riskLevel,
  assetAllocation,
  className
}: EnterpriseDashboardProps) {
  const riskLevelConfig = {
    low: { color: 'text-success-600', bg: 'bg-success-100', label: '낮음' },
    medium: { color: 'text-warning-600', bg: 'bg-warning-100', label: '보통' },
    high: { color: 'text-danger-600', bg: 'bg-danger-100', label: '높음' }
  }

  const config = riskLevelConfig[riskLevel]

  return (
    <div className={cn("space-y-6", className)}>
      {/* 메트릭 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetric
          title="포트폴리오 가치"
          value={`₩${portfolioValue.toLocaleString()}`}
          change={performanceChange}
          changeType={performanceChange >= 0 ? 'positive' : 'negative'}
          icon={<DollarSign className="h-4 w-4 text-premium-600" />}
          ariaLabel={ARIA_LABELS.portfolioValue}
        />
        
        <DashboardMetric
          title="성과 변화"
          value={`${performanceChange >= 0 ? '+' : ''}${performanceChange}%`}
          icon={<TrendingUp className="h-4 w-4 text-success-600" />}
          description="지난 30일 기준"
          ariaLabel={ARIA_LABELS.performanceChange}
        />
        
        <DashboardMetric
          title="리스크 레벨"
          value={config.label}
          icon={<Shield className="h-4 w-4 text-navy-600" />}
          description="포트폴리오 리스크"
          ariaLabel={ARIA_LABELS.riskLevel}
        />
        
        <DashboardMetric
          title="총 자산"
          value={`₩${(portfolioValue * 1.2).toLocaleString()}`}
          icon={<BarChart3 className="h-4 w-4 text-data-600" />}
          description="모든 자산 포함"
        />
      </div>

      {/* 자산 배분 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocation data={assetAllocation} />
        
        {/* 추가 위젯 공간 */}
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>빠른 액션</span>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              상세 분석 보기
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              보고서 다운로드
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 