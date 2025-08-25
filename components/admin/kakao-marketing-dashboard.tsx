'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  MousePointer, 
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { formatNumber, formatCurrency } from '@/lib/utils';

interface CampaignPerformance {
  id: string;
  name: string;
  type: 'display' | 'search' | 'video' | 'retargeting';
  status: 'active' | 'paused' | 'completed';
  budget: {
    daily: number;
    spent: number;
    remaining: number;
  };
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
    roas: number;
  };
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface MarketingMetrics {
  overview: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    averageCTR: number;
    averageCPC: number;
    overallROAS: number;
  };
  goals: {
    monthly_leads: { target: number; actual: number; };
    cost_per_lead: { target: number; actual: number; };
    conversion_rate: { target: number; actual: number; };
    roas: { target: number; actual: number; };
  };
  campaigns: CampaignPerformance[];
  audiences: Array<{
    name: string;
    size: number;
    performance: number;
    cost: number;
  }>;
  channels: Array<{
    channel: 'kakao_moment' | 'search' | 'retargeting' | 'messaging';
    spend: number;
    conversions: number;
    roas: number;
  }>;
}

// 모의 데이터
const mockData: MarketingMetrics = {
  overview: {
    totalSpend: 6500000,
    totalImpressions: 2450000,
    totalClicks: 14700,
    totalConversions: 294,
    averageCTR: 0.6,
    averageCPC: 442,
    overallROAS: 8.2,
  },
  goals: {
    monthly_leads: { target: 200, actual: 178 },
    cost_per_lead: { target: 100000, actual: 88000 },
    conversion_rate: { target: 2.0, actual: 2.4 },
    roas: { target: 10.0, actual: 8.2 },
  },
  campaigns: [
    {
      id: '1',
      name: 'CEO 타겟 디스플레이 광고',
      type: 'display',
      status: 'active',
      budget: { daily: 150000, spent: 128000, remaining: 22000 },
      performance: {
        impressions: 850000,
        clicks: 5100,
        conversions: 102,
        cost: 2280000,
        ctr: 0.6,
        cpc: 447,
        conversionRate: 2.0,
        roas: 9.2,
      },
      trend: 'up',
      lastUpdated: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: '연금계산기 검색 광고',
      type: 'search',
      status: 'active',
      budget: { daily: 100000, spent: 95000, remaining: 5000 },
      performance: {
        impressions: 320000,
        clicks: 2880,
        conversions: 86,
        cost: 1368000,
        ctr: 0.9,
        cpc: 475,
        conversionRate: 3.0,
        roas: 12.4,
      },
      trend: 'up',
      lastUpdated: '2024-01-15T10:25:00Z',
    },
    {
      id: '3',
      name: '리타게팅 캠페인',
      type: 'retargeting',
      status: 'active',
      budget: { daily: 80000, spent: 72000, remaining: 8000 },
      performance: {
        impressions: 180000,
        clicks: 1620,
        conversions: 65,
        cost: 729000,
        ctr: 0.9,
        cpc: 450,
        conversionRate: 4.0,
        roas: 11.8,
      },
      trend: 'stable',
      lastUpdated: '2024-01-15T10:20:00Z',
    },
  ],
  audiences: [
    { name: 'CEO 40-50대', size: 12500, performance: 89, cost: 2100000 },
    { name: '기업가 30-40대', size: 8900, performance: 76, cost: 1800000 },
    { name: '고액자산가', size: 5200, performance: 92, cost: 2600000 },
  ],
  channels: [
    { channel: 'kakao_moment', spend: 3200000, conversions: 145, roas: 8.9 },
    { channel: 'search', spend: 1800000, conversions: 89, roas: 12.1 },
    { channel: 'retargeting', spend: 1200000, conversions: 47, roas: 9.8 },
    { channel: 'messaging', spend: 300000, conversions: 13, roas: 6.2 },
  ],
};

export default function KakaoMarketingDashboard() {
  const [data] = useState<MarketingMetrics>(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshData = async () => {
    setIsLoading(true);
    // 실제 구현에서는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastRefresh(new Date());
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">카카오 마케팅 대시보드</h1>
          <p className="text-muted-foreground">
            실시간 광고 성과 및 마케팅 분석
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            마지막 업데이트: {lastRefresh.toLocaleString('ko-KR')}
          </p>
          <Button onClick={refreshData} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 광고비</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.overview.totalSpend)}
            </div>
            <p className="text-xs text-muted-foreground">
              이번 달 누적
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 전환수</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(data.overview.totalConversions)}
            </div>
            <p className="text-xs text-muted-foreground">
              전환율 {data.overview.totalConversions / data.overview.totalClicks * 100}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 CPC</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₩{formatNumber(data.overview.averageCPC)}
            </div>
            <p className="text-xs text-muted-foreground">
              클릭당 비용
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.overallROAS}:1
            </div>
            <p className="text-xs text-muted-foreground">
              광고 투자 수익률
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 목표 대비 성과 */}
      <Card>
        <CardHeader>
          <CardTitle>월간 목표 달성률</CardTitle>
          <CardDescription>이번 달 주요 KPI 달성 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(data.goals).map(([key, goal]) => {
              const achievementRate = (goal.actual / goal.target) * 100;
              const isAchieved = achievementRate >= 100;
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <Badge variant={isAchieved ? "default" : "secondary"}>
                      {achievementRate.toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">
                      {key.includes('cost') || key.includes('roas') 
                        ? (key.includes('cost') ? `₩${formatNumber(goal.actual)}` : `${goal.actual}:1`)
                        : formatNumber(goal.actual)
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      목표: {key.includes('cost') || key.includes('roas') 
                        ? (key.includes('cost') ? `₩${formatNumber(goal.target)}` : `${goal.target}:1`)
                        : formatNumber(goal.target)
                      }
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isAchieved ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${Math.min(achievementRate, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 상세 분석 탭 */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">캠페인</TabsTrigger>
          <TabsTrigger value="audiences">오디언스</TabsTrigger>
          <TabsTrigger value="channels">채널</TabsTrigger>
        </TabsList>

        {/* 캠페인 성과 */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {data.campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>
                        {campaign.type} • 마지막 업데이트: {new Date(campaign.lastUpdated).toLocaleString('ko-KR')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(campaign.trend)}
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">예산 사용률</p>
                      <p className="text-2xl font-bold">
                        {((campaign.budget.spent / campaign.budget.daily) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(campaign.budget.spent)} / {formatCurrency(campaign.budget.daily)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">노출수</p>
                      <p className="text-2xl font-bold">{formatNumber(campaign.performance.impressions)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">클릭수</p>
                      <p className="text-2xl font-bold">{formatNumber(campaign.performance.clicks)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">전환수</p>
                      <p className="text-2xl font-bold">{formatNumber(campaign.performance.conversions)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CTR</p>
                      <p className="text-2xl font-bold">{campaign.performance.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CPC</p>
                      <p className="text-2xl font-bold">₩{formatNumber(campaign.performance.cpc)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">전환율</p>
                      <p className="text-2xl font-bold">{campaign.performance.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ROAS</p>
                      <p className="text-2xl font-bold text-green-600">{campaign.performance.roas}:1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 오디언스 분석 */}
        <TabsContent value="audiences" className="space-y-4">
          <div className="grid gap-4">
            {data.audiences.map((audience, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{audience.name}</h3>
                      <p className="text-muted-foreground">
                        {formatNumber(audience.size)}명 • 성과 지수: {audience.performance}점
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatCurrency(audience.cost)}</p>
                      <p className="text-sm text-muted-foreground">총 광고비</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 채널별 성과 */}
        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4">
            {data.channels.map((channel, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold capitalize">
                        {channel.channel.replace('_', ' ')}
                      </h3>
                      <p className="text-muted-foreground">
                        전환수: {formatNumber(channel.conversions)}개
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold">{formatCurrency(channel.spend)}</p>
                      <Badge variant="outline">
                        ROAS: {channel.roas}:1
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}