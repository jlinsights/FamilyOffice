'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, Eye, MousePointer, Target, 
  Users, Smartphone, Monitor, Tablet,
  AlertCircle, CheckCircle, Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Performance data interfaces
interface PopupMetrics {
  popupId: string;
  popupName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  dismissals: number;
  ctr: number;
  cvr: number;
  avgTimeToAction: number;
  bounceRateImpact: number;
  revenue: number;
  lastUpdated: Date;
}

interface ABTestResult {
  variant: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
  significance: number;
  confidence: number;
  isWinner: boolean;
}

interface UserSegmentData {
  segment: string;
  users: number;
  ctr: number;
  cvr: number;
  revenue: number;
  color: string;
}

interface DeviceData {
  device: string;
  users: number;
  ctr: number;
  cvr: number;
  avgTime: number;
}

interface TimeSeriesData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
}

// Mock data generators for demonstration
const generateMockData = () => {
  const popupMetrics: PopupMetrics[] = [
    {
      popupId: 'ceo_protection_asset',
      popupName: 'CEO 보장자산 안내',
      impressions: 15420,
      clicks: 1234,
      conversions: 145,
      dismissals: 13951,
      ctr: 8.0,
      cvr: 11.7,
      avgTimeToAction: 12500,
      bounceRateImpact: 3.2,
      revenue: 2890000,
      lastUpdated: new Date(),
    },
    {
      popupId: 'newsletter_signup_2024',
      popupName: '주간 자산관리 인사이트',
      impressions: 12850,
      clicks: 967,
      conversions: 412,
      dismissals: 11471,
      ctr: 7.5,
      cvr: 42.6,
      avgTimeToAction: 8200,
      bounceRateImpact: 1.8,
      revenue: 0, // Newsletter doesn't directly generate revenue
      lastUpdated: new Date(),
    }
  ];

  const abTestResults: Record<string, ABTestResult[]> = {
    'ceo_protection_asset': [
      {
        variant: 'conservative',
        impressions: 6168,
        clicks: 463,
        conversions: 52,
        ctr: 7.5,
        cvr: 11.2,
        significance: 0.95,
        confidence: 95,
        isWinner: false,
      },
      {
        variant: 'urgent',
        impressions: 4626,
        clicks: 417,
        conversions: 48,
        ctr: 9.0,
        cvr: 11.5,
        significance: 0.87,
        confidence: 87,
        isWinner: false,
      },
      {
        variant: 'premium',
        impressions: 4626,
        clicks: 354,
        conversions: 45,
        ctr: 7.7,
        cvr: 12.7,
        significance: 0.98,
        confidence: 98,
        isWinner: true,
      }
    ],
    'newsletter_signup_2024': [
      {
        variant: 'information_focused',
        impressions: 4242,
        clicks: 318,
        conversions: 132,
        ctr: 7.5,
        cvr: 41.5,
        significance: 0.92,
        confidence: 92,
        isWinner: false,
      },
      {
        variant: 'community_focused',
        impressions: 4242,
        clicks: 325,
        conversions: 145,
        ctr: 7.7,
        cvr: 44.6,
        significance: 0.97,
        confidence: 97,
        isWinner: true,
      },
      {
        variant: 'exclusivity_focused',
        impressions: 4366,
        clicks: 324,
        conversions: 135,
        ctr: 7.4,
        cvr: 41.7,
        significance: 0.89,
        confidence: 89,
        isWinner: false,
      }
    ]
  };

  const userSegmentData: UserSegmentData[] = [
    { segment: '첫 방문자', users: 8420, ctr: 6.2, cvr: 8.5, revenue: 1200000, color: '#8884d8' },
    { segment: '재방문자', users: 12650, ctr: 8.5, cvr: 15.2, revenue: 2100000, color: '#82ca9d' },
    { segment: '활성 사용자', users: 5890, ctr: 12.1, cvr: 22.8, revenue: 3500000, color: '#ffc658' },
    { segment: 'VIP 고객', users: 1310, ctr: 15.7, cvr: 35.2, revenue: 8900000, color: '#ff7300' },
  ];

  const deviceData: DeviceData[] = [
    { device: 'Desktop', users: 16280, ctr: 9.2, cvr: 18.5, avgTime: 15200 },
    { device: 'Mobile', users: 9840, ctr: 6.8, cvr: 12.3, avgTime: 8900 },
    { device: 'Tablet', users: 2150, ctr: 7.5, cvr: 14.7, avgTime: 11500 },
  ];

  const timeSeriesData: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const baseImpressions = Math.floor(Math.random() * 500) + 400;
    const clicks = Math.floor(baseImpressions * (0.05 + Math.random() * 0.10));
    const conversions = Math.floor(clicks * (0.08 + Math.random() * 0.20));
    
    return {
      date: date.toISOString().split('T')[0] || '',
      impressions: baseImpressions,
      clicks,
      conversions,
      ctr: (clicks / baseImpressions) * 100,
      cvr: clicks > 0 ? (conversions / clicks) * 100 : 0,
    };
  });

  return { popupMetrics, abTestResults, userSegmentData, deviceData, timeSeriesData };
};

// Main Dashboard Component
interface PopupAnalyticsDashboardProps {
  dateRange?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PopupAnalyticsDashboard: React.FC<PopupAnalyticsDashboardProps> = ({
  dateRange: _dateRange = '30d',
  autoRefresh = true,
  refreshInterval = 300000, // 5 minutes
}) => {
  const [data, setData] = useState(generateMockData());
  const [selectedPopup, setSelectedPopup] = useState<string>('all');
  const [_selectedSegment, _setSelectedSegment] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setData(generateMockData());
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const { popupMetrics } = data;
    const totals = popupMetrics.reduce(
      (acc, popup) => ({
        impressions: acc.impressions + popup.impressions,
        clicks: acc.clicks + popup.clicks,
        conversions: acc.conversions + popup.conversions,
        revenue: acc.revenue + popup.revenue,
      }),
      { impressions: 0, clicks: 0, conversions: 0, revenue: 0 }
    );

    return {
      ...totals,
      ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
      cvr: totals.clicks > 0 ? (totals.conversions / totals.clicks) * 100 : 0,
    };
  }, [data]);

  // Performance status indicators
  const getPerformanceStatus = (metric: string, value: number) => {
    const thresholds = {
      ctr: { excellent: 8.5, good: 5.0 },
      cvr: { excellent: 12.0, good: 8.0 },
      bounceRateImpact: { good: 5, concerning: 15 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'info';

    if (metric === 'bounceRateImpact') {
      return value <= threshold.good ? 'success' : value <= (threshold as any).concerning ? 'warning' : 'error';
    } else {
      return value >= (threshold as any).excellent ? 'success' : value >= threshold.good ? 'warning' : 'error';
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            팝업 성과 분석 대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            실시간 사용자 행동 분석 및 A/B 테스트 결과
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPopup} onValueChange={setSelectedPopup}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="팝업 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 팝업</SelectItem>
              <SelectItem value="ceo_protection_asset">CEO 보장자산</SelectItem>
              <SelectItem value="newsletter_signup_2024">뉴스레터</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs">
            마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 노출수</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.impressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              지난 30일간 누적
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">클릭률 (CTR)</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{summaryMetrics.ctr.toFixed(1)}%</div>
              <StatusIcon status={getPerformanceStatus('ctr', summaryMetrics.ctr)} />
            </div>
            <p className="text-xs text-muted-foreground">
              업계 평균 대비 우수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전환율 (CVR)</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{summaryMetrics.cvr.toFixed(1)}%</div>
              <StatusIcon status={getPerformanceStatus('cvr', summaryMetrics.cvr)} />
            </div>
            <p className="text-xs text-muted-foreground">
              목표 대비 {summaryMetrics.cvr > 10 ? '달성' : '미달'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">연결 매출</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(summaryMetrics.revenue / 1000000).toFixed(1)}백만원
            </div>
            <p className="text-xs text-muted-foreground">
              팝업 기여 매출
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="abtest">A/B 테스트</TabsTrigger>
          <TabsTrigger value="segments">사용자 분석</TabsTrigger>
          <TabsTrigger value="devices">디바이스 분석</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trend Chart */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>성과 추이</CardTitle>
                <CardDescription>지난 30일간 일별 성과 데이터</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="impressions" fill="#8884d8" name="노출수" />
                      <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#82ca9d" strokeWidth={2} name="클릭률 (%)" />
                      <Line yAxisId="right" type="monotone" dataKey="cvr" stroke="#ffc658" strokeWidth={2} name="전환율 (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Individual Popup Performance */}
            <Card>
              <CardHeader>
                <CardTitle>팝업별 성과</CardTitle>
                <CardDescription>각 팝업의 주요 지표 비교</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.popupMetrics.map((popup) => (
                    <div key={popup.popupId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{popup.popupName}</h4>
                        <Badge variant="outline">{popup.ctr.toFixed(1)}% CTR</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">노출</span>
                          <p className="font-medium">{popup.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">클릭</span>
                          <p className="font-medium">{popup.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">전환</span>
                          <p className="font-medium">{popup.conversions.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Performance */}
            <Card>
              <CardHeader>
                <CardTitle>디바이스별 성과</CardTitle>
                <CardDescription>사용 기기에 따른 성과 차이</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.deviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ctr" fill="#8884d8" name="클릭률 (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* A/B Test Results Tab */}
        <TabsContent value="abtest" className="space-y-4">
          {Object.entries(data.abTestResults).map(([popupId, variants]) => (
            <Card key={popupId}>
              <CardHeader>
                <CardTitle>
                  {data.popupMetrics.find(p => p.popupId === popupId)?.popupName || popupId} - A/B 테스트 결과
                </CardTitle>
                <CardDescription>
                  각 변형의 성과 비교 및 통계적 유의성 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {variants.map((variant) => (
                    <div 
                      key={variant.variant} 
                      className={`p-4 border rounded-lg ${variant.isWinner ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium capitalize">{variant.variant}</h4>
                        {variant.isWinner && (
                          <Badge className="bg-green-500 text-white">승리</Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">클릭률</span>
                          <span className="font-medium">{variant.ctr.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">전환율</span>
                          <span className="font-medium">{variant.cvr.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">신뢰도</span>
                          <span className="font-medium">{variant.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={variants}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variant" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ctr" fill="#8884d8" name="클릭률 (%)" />
                      <Bar dataKey="cvr" fill="#82ca9d" name="전환율 (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* User Segments Tab */}
        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>사용자 세그먼트 분포</CardTitle>
                <CardDescription>방문자 유형별 구성비</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.userSegmentData}
                        dataKey="users"
                        nameKey="segment"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.userSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>세그먼트별 성과</CardTitle>
                <CardDescription>사용자 유형에 따른 성과 차이</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.userSegmentData.map((segment) => (
                    <div key={segment.segment} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{segment.segment}</h4>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {segment.users.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">CTR</span>
                          <p className="font-medium">{segment.ctr}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CVR</span>
                          <p className="font-medium">{segment.cvr}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">매출</span>
                          <p className="font-medium">{(segment.revenue / 1000000).toFixed(1)}M</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Device Analysis Tab */}
        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>디바이스별 사용자 분포</CardTitle>
                <CardDescription>접속 기기 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.deviceData.map((device) => {
                    const Icon = device.device === 'Desktop' ? Monitor : 
                                device.device === 'Mobile' ? Smartphone : Tablet;
                    return (
                      <div key={device.device} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{device.device}</h4>
                            <p className="text-sm text-muted-foreground">
                              {device.users.toLocaleString()} 사용자
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{device.ctr}% CTR</p>
                          <p className="text-sm text-muted-foreground">{device.cvr}% CVR</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>평균 반응 시간</CardTitle>
                <CardDescription>기기별 사용자 반응 속도</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.deviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}ms`, '평균 반응 시간']} />
                      <Bar dataKey="avgTime" fill="#82ca9d" name="반응 시간 (ms)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PopupAnalyticsDashboard;