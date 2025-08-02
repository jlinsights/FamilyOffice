'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  AlertTriangle,
  Download,
  Calendar,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  performance: PerformanceData[]
  riskReturn: RiskReturnData[]
  correlations: CorrelationData[]
  sectors: SectorData[]
  sharpeRatio: number
  alpha: number
  beta: number
  maxDrawdown: number
}

interface PerformanceData {
  date: string
  value: number
  benchmark: number
}

interface RiskReturnData {
  risk: number
  return: number
  asset: string
}

interface CorrelationData {
  asset1: string
  asset2: string
  correlation: number
}

interface SectorData {
  sector: string
  allocation: number
  performance: number
}

// Mock data
const mockAnalyticsData: AnalyticsData = {
  performance: [
    { date: '2024-01', value: 100, benchmark: 100 },
    { date: '2024-02', value: 102, benchmark: 101 },
    { date: '2024-03', value: 98, benchmark: 99 },
    { date: '2024-04', value: 105, benchmark: 102 },
    { date: '2024-05', value: 107, benchmark: 104 },
    { date: '2024-06', value: 110, benchmark: 106 }
  ],
  riskReturn: [
    { risk: 12.5, return: 8.2, asset: '주식' },
    { risk: 8.3, return: 5.1, asset: '채권' },
    { risk: 15.2, return: 12.4, asset: '부동산' },
    { risk: 2.1, return: 1.8, asset: '현금' }
  ],
  correlations: [
    { asset1: '주식', asset2: '채권', correlation: -0.3 },
    { asset1: '주식', asset2: '부동산', correlation: 0.2 },
    { asset1: '채권', asset2: '부동산', correlation: 0.1 }
  ],
  sectors: [
    { sector: 'IT', allocation: 25, performance: 12.5 },
    { sector: '금융', allocation: 20, performance: 8.3 },
    { sector: '소비재', allocation: 15, performance: 6.2 },
    { sector: '헬스케어', allocation: 12, performance: 15.1 },
    { sector: '에너지', allocation: 8, performance: -2.1 },
    { sector: '기타', allocation: 20, performance: 4.8 }
  ],
  sharpeRatio: 1.25,
  alpha: 2.1,
  beta: 0.85,
  maxDrawdown: -8.2
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('1Y')
  const [selectedMetrics, setSelectedMetrics] = useState(['return', 'volatility'])
  const [data] = useState<AnalyticsData>(mockAnalyticsData)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">포트폴리오 분석</h2>
        <div className="flex gap-2">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          <MetricSelector value={selectedMetrics} onChange={setSelectedMetrics} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={data.performance} />
        <RiskReturnScatter data={data.riskReturn} />
        <CorrelationMatrix data={data.correlations} />
        <SectorAllocation data={data.sectors} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="샤프 비율" 
          value={data.sharpeRatio} 
          format="number"
          description="위험 대비 수익률"
          trend="up"
        />
        <MetricCard 
          title="알파" 
          value={data.alpha} 
          format="percentage"
          description="초과 수익률"
          trend="up"
        />
        <MetricCard 
          title="베타" 
          value={data.beta} 
          format="number"
          description="시장 대비 변동성"
          trend="neutral"
        />
        <MetricCard 
          title="최대 낙폭" 
          value={data.maxDrawdown} 
          format="percentage"
          description="최대 손실률"
          trend="down"
        />
      </div>
    </div>
  )
}

function TimeRangeSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1M">1개월</SelectItem>
        <SelectItem value="3M">3개월</SelectItem>
        <SelectItem value="6M">6개월</SelectItem>
        <SelectItem value="1Y">1년</SelectItem>
        <SelectItem value="3Y">3년</SelectItem>
        <SelectItem value="5Y">5년</SelectItem>
      </SelectContent>
    </Select>
  )
}

function MetricSelector({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const metrics = [
    { key: 'return', label: '수익률' },
    { key: 'volatility', label: '변동성' },
    { key: 'sharpe', label: '샤프 비율' },
    { key: 'drawdown', label: '낙폭' }
  ]

  const toggleMetric = (metric: string) => {
    if (value.includes(metric)) {
      onChange(value.filter(v => v !== metric))
    } else {
      onChange([...value, metric])
    }
  }

  return (
    <div className="flex gap-1">
      {metrics.map((metric) => (
        <Button
          key={metric.key}
          variant={value.includes(metric.key) ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleMetric(metric.key)}
        >
          {metric.label}
        </Button>
      ))}
    </div>
  )
}

function PerformanceChart({ data }: { data: PerformanceData[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">성과 추이</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600">
              포트폴리오
            </Badge>
            <Badge variant="outline" className="text-blue-600">
              벤치마크
            </Badge>
          </div>
        </div>
        
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">차트 컴포넌트</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">+10.0%</p>
            <p className="text-xs text-muted-foreground">포트폴리오 수익률</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">+6.0%</p>
            <p className="text-xs text-muted-foreground">벤치마크 수익률</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function RiskReturnScatter({ data }: { data: RiskReturnData[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">위험-수익 분산도</h3>
        
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">산점도 차트</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {data.map((item) => (
            <div key={item.asset} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm font-medium">{item.asset}</span>
              <div className="text-right">
                <p className="text-sm font-medium">{item.return}%</p>
                <p className="text-xs text-muted-foreground">위험: {item.risk}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function CorrelationMatrix({ data }: { data: CorrelationData[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">상관관계 매트릭스</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">자산</th>
                <th className="text-center p-2">주식</th>
                <th className="text-center p-2">채권</th>
                <th className="text-center p-2">부동산</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-medium">주식</td>
                <td className="text-center p-2">1.00</td>
                <td className="text-center p-2 text-red-600">-0.30</td>
                <td className="text-center p-2 text-green-600">0.20</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">채권</td>
                <td className="text-center p-2 text-red-600">-0.30</td>
                <td className="text-center p-2">1.00</td>
                <td className="text-center p-2 text-green-600">0.10</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">부동산</td>
                <td className="text-center p-2 text-green-600">0.20</td>
                <td className="text-center p-2 text-green-600">0.10</td>
                <td className="text-center p-2">1.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}

function SectorAllocation({ data }: { data: SectorData[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">섹터 배분</h3>
        
        <div className="space-y-3">
          {data.map((sector) => (
            <div key={sector.sector} className="flex items-center justify-between p-3 bg-muted/50 rounded">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div>
                  <p className="text-sm font-medium">{sector.sector}</p>
                  <p className="text-xs text-muted-foreground">{sector.allocation}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  'text-sm font-medium',
                  sector.performance >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

interface MetricCardProps {
  title: string
  value: number
  format: 'number' | 'percentage' | 'currency'
  description: string
  trend: 'up' | 'down' | 'neutral'
}

function MetricCard({ title, value, format, description, trend }: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(2)}%`
      case 'currency':
        return `₩${val.toLocaleString()}`
      case 'number':
        return val.toFixed(2)
      default:
        return val.toString()
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
          {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
          {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
          {trend === 'neutral' && <Target className="h-4 w-4 text-blue-600" />}
        </div>
        <p className="text-2xl font-bold">{formatValue(value)}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
} 