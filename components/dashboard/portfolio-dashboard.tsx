'use client';

import {
  Circle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
} from 'lucide-react';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

import { cn } from '@/lib/utils';

interface PortfolioData {
  totalValue: number;
  todayChange: number;
  todayChangePercent: number;
  ytdReturn: number;
  ytdReturnPercent: number;
  allocation: AllocationData[];
  performance: PerformanceData[];
  transactions: TransactionData[];
  risk: RiskData;
  indicators: IndicatorData[];
}

interface AllocationData {
  name: string;
  value: number;
  amount: number;
  color: string;
}

interface PerformanceData {
  date: string;
  value: number;
  change: number;
}

interface TransactionData {
  id: string;
  type: 'buy' | 'sell' | 'dividend';
  asset: string;
  amount: number;
  quantity: number;
  date: string;
}

interface RiskData {
  sharpeRatio: number;
  beta: number;
  volatility: number;
  maxDrawdown: number;
}

interface IndicatorData {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

// Mock data for demonstration
const mockPortfolioData: PortfolioData = {
  totalValue: 125000000,
  todayChange: 2500000,
  todayChangePercent: 2.04,
  ytdReturn: 8500000,
  ytdReturnPercent: 7.3,
  allocation: [
    { name: '주식', value: 45, amount: 56250000, color: '#3b82f6' },
    { name: '채권', value: 30, amount: 37500000, color: '#10b981' },
    { name: '부동산', value: 15, amount: 18750000, color: '#f59e0b' },
    { name: '현금', value: 10, amount: 12500000, color: '#6b7280' },
  ],
  performance: [
    { date: '2024-01', value: 100, change: 0 },
    { date: '2024-02', value: 102, change: 2 },
    { date: '2024-03', value: 98, change: -4 },
    { date: '2024-04', value: 105, change: 7 },
    { date: '2024-05', value: 107, change: 2 },
  ],
  transactions: [
    {
      id: '1',
      type: 'buy',
      asset: '삼성전자',
      amount: 5000000,
      quantity: 100,
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'sell',
      asset: 'SK하이닉스',
      amount: 3000000,
      quantity: 50,
      date: '2024-01-14',
    },
    {
      id: '3',
      type: 'dividend',
      asset: 'LG화학',
      amount: 150000,
      quantity: 0,
      date: '2024-01-13',
    },
  ],
  risk: {
    sharpeRatio: 1.2,
    beta: 0.85,
    volatility: 12.5,
    maxDrawdown: -8.2,
  },
  indicators: [
    { name: 'KOSPI', value: 2500, change: 1.2, trend: 'up' },
    { name: 'S&P 500', value: 4200, change: -0.5, trend: 'down' },
    { name: '달러/원', value: 1300, change: 0.3, trend: 'up' },
  ],
};

export function PortfolioDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [data] = useState<PortfolioData | null>(mockPortfolioData);

  // Simulate data loading
  const loadData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSkeleton type="chart" count={6} />;
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          포트폴리오 데이터를 불러올 수 없습니다.
        </p>
        <Button onClick={loadData}>다시 시도</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PortfolioOverview data={data} />
      <AssetAllocation data={data.allocation} />
      <PerformanceChart data={data.performance} />
      <RecentTransactions data={data.transactions} />
      <RiskMetrics data={data.risk} />
      <MarketIndicators data={data.indicators} />
    </div>
  );
}

export function PortfolioOverview({ data }: { data: PortfolioData }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">포트폴리오 개요</h3>
          <Badge variant="outline">
            <Circle className="h-2 w-2 mr-1 fill-green-500 text-green-500" />
            실시간
          </Badge>
        </div>

        <div className="space-y-3">
          <FinancialMetric
            label="총 자산가치"
            value={data.totalValue}
            format="currency"
            size="lg"
          />
          <FinancialMetric
            label="오늘 변동"
            value={data.todayChange}
            change={data.todayChangePercent}
            format="currency"
            size="md"
          />
          <FinancialMetric
            label="연간 수익률"
            value={data.ytdReturn}
            change={data.ytdReturnPercent}
            format="currency"
            size="md"
          />
        </div>
      </div>
    </Card>
  );
}

export function AssetAllocation({ data }: { data: AllocationData[] }) {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">자산 배분</h3>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            리밸런싱
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-48">
            <div className="w-full h-full rounded-full border-8 border-gray-200 dark:border-gray-700 relative">
              {data.map((item, index) => {
                const startAngle = data
                  .slice(0, index)
                  .reduce((sum, d) => sum + (d.value / 100) * 360, 0);
                const angle = (item.value / 100) * 360;
                const isSelected = selectedSegment === item.name;

                return (
                  <div
                    key={item.name}
                    className="absolute inset-0"
                    style={{
                      background: `conic-gradient(from ${startAngle}deg, ${item.color} 0deg, ${item.color} ${angle}deg, transparent ${angle}deg)`,
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.2s ease',
                    }}
                    onClick={() => setSelectedSegment(item.name)}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            {data.map(item => (
              <div
                key={item.name}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer',
                  selectedSegment === item.name ? 'bg-muted' : 'bg-muted/50',
                  'hover:bg-muted'
                )}
                onClick={() => setSelectedSegment(item.name)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.value}%</div>
                  <div className="text-xs text-muted-foreground">
                    {new Intl.NumberFormat('ko-KR', {
                      style: 'currency',
                      currency: 'KRW',
                    }).format(item.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PerformanceChart({ data }: { data: PerformanceData[] }) {
  console.log('Performance chart data:', data);
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">성과 추이</h3>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">차트 컴포넌트</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RecentTransactions({ data }: { data: TransactionData[] }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">최근 거래</h3>
        <div className="space-y-3">
          {data.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    transaction.type === 'buy'
                      ? 'bg-green-500'
                      : transaction.type === 'sell'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                  )}
                />
                <div>
                  <p className="text-sm font-medium">{transaction.asset}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    'text-sm font-medium',
                    transaction.type === 'buy'
                      ? 'text-green-600 dark:text-green-400'
                      : transaction.type === 'sell'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-blue-600 dark:text-blue-400'
                  )}
                >
                  {transaction.type === 'buy'
                    ? '+'
                    : transaction.type === 'sell'
                      ? '-'
                      : ''}
                  {new Intl.NumberFormat('ko-KR', {
                    style: 'currency',
                    currency: 'KRW',
                  }).format(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.quantity > 0 && `${transaction.quantity}주`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function RiskMetrics({ data }: { data: RiskData }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">리스크 지표</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
            <p className="text-sm text-muted-foreground">샤프 비율</p>
            <p className="text-lg font-semibold">{data.sharpeRatio}</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
            <p className="text-sm text-muted-foreground">베타</p>
            <p className="text-lg font-semibold">{data.beta}</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
            <p className="text-sm text-muted-foreground">변동성</p>
            <p className="text-lg font-semibold">{data.volatility}%</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
            <p className="text-sm text-muted-foreground">최대 낙폭</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
              {data.maxDrawdown}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function MarketIndicators({ data }: { data: IndicatorData[] }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">시장 지표</h3>
        <div className="space-y-3">
          {data.map(indicator => (
            <div
              key={indicator.name}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{indicator.name}</p>
                <p className="text-xs text-muted-foreground">
                  {indicator.value}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {indicator.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : indicator.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : (
                  <div className="h-4 w-4" />
                )}
                <span
                  className={cn(
                    'text-sm font-medium',
                    indicator.change >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {indicator.change >= 0 ? '+' : ''}
                  {indicator.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface FinancialMetricProps {
  label: string;
  value: number;
  change?: number;
  format: 'currency' | 'percentage' | 'number';
  size: 'sm' | 'md' | 'lg';
}

function FinancialMetric({
  label,
  value,
  change,
  format,
  size,
}: FinancialMetricProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `₩${val.toLocaleString()}`;
      case 'percentage':
        return `${val.toFixed(2)}%`;
      case 'number':
        return val.toLocaleString();
      default:
        return val.toString();
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl font-bold',
  };

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={sizeClasses[size]}>{formatValue(value)}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1">
          {change >= 0 ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
          <span
            className={cn(
              'text-xs',
              change >= 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
}
