'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  BarChart3,
  Target,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Download,
  Phone
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// 대시보드 데이터 타입 정의
interface MarketingMetrics {
  leads: {
    total: number;
    new: number;
    qualified: number;
    converted: number;
    conversionRate: number;
    trend: number;
  };
  content: {
    views: number;
    engagement: number;
    downloads: number;
    shareRate: number;
    topPerforming: ContentItem[];
  };
  campaigns: {
    active: number;
    emailsSent: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
  leadScoring: {
    averageScore: number;
    highScoreLeads: number;
    scoreDistribution: { grade: string; count: number; percentage: number }[];
  };
}

interface ContentItem {
  id: string;
  title: string;
  type: string;
  views: number;
  engagement: number;
  conversions: number;
}

interface LeadSummary {
  id: string;
  name: string;
  email: string;
  company: string;
  score: number;
  grade: string;
  temperature: 'Hot' | 'Warm' | 'Cold';
  lastActivity: string;
  source: string;
}

export function MarketingDashboard() {
  const [metrics, setMetrics] = useState<MarketingMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // 실제로는 API에서 데이터를 가져옴
      const [metricsData, leadsData] = await Promise.all([
        fetchMarketingMetrics(timeRange),
        fetchRecentLeads()
      ]);
      
      setMetrics(metricsData);
      setRecentLeads(leadsData);
    } catch (error) {
      console.error('대시보드 데이터 로딩 오류:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  // 데이터 로딩
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading || !metrics) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">마케팅 대시보드</h1>
          <p className="text-muted-foreground">
            인바운드 마케팅 성과 및 리드 관리 현황
          </p>
        </div>
        
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? '7일' : range === '30d' ? '30일' : '90일'}
            </Button>
          ))}
        </div>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="총 리드"
          value={metrics.leads.total}
          change={metrics.leads.trend}
          icon={<Users className="h-4 w-4" />}
          subtitle={`신규 ${metrics.leads.new}개`}
        />
        
        <MetricCard
          title="전환율"
          value={`${metrics.leads.conversionRate}%`}
          change={5.2}
          icon={<Target className="h-4 w-4" />}
          subtitle={`${metrics.leads.converted}명 전환`}
        />
        
        <MetricCard
          title="콘텐츠 조회"
          value={metrics.content.views}
          change={12.3}
          icon={<Eye className="h-4 w-4" />}
          subtitle={`참여율 ${metrics.content.engagement}%`}
        />
        
        <MetricCard
          title="이메일 오픈율"
          value={`${metrics.campaigns.openRate}%`}
          change={-2.1}
          icon={<Mail className="h-4 w-4" />}
          subtitle={`${metrics.campaigns.emailsSent}통 발송`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 리드 스코어 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              리드 스코어 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.leadScoring.scoreDistribution.map((dist) => (
                <div key={dist.grade} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={getGradeBadgeVariant(dist.grade)}>
                      {dist.grade}등급
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {dist.count}명
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-24">
                    <Progress value={dist.percentage} className="flex-1" />
                    <span className="text-sm">{dist.percentage}%</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>평균 스코어</span>
                  <span className="font-medium">{metrics.leadScoring.averageScore}점</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>고득점 리드 (80점+)</span>
                  <span>{metrics.leadScoring.highScoreLeads}명</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 인기 콘텐츠 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              인기 콘텐츠
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.content.topPerforming.slice(0, 5).map((content, index) => (
                <div key={content.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {content.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {content.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MousePointer className="h-3 w-3" />
                        {content.engagement}%
                      </span>
                      {content.conversions > 0 && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {content.conversions}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {content.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 고득점 리드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              고득점 리드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.filter(lead => lead.score >= 70).slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      lead.temperature === 'Hot' ? 'bg-red-500' :
                      lead.temperature === 'Warm' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm truncate">{lead.name}</h4>
                      <Badge variant={lead.grade === 'A' ? 'default' : 'secondary'} className="text-xs">
                        {lead.score}점
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.company}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {lead.source}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lead.lastActivity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                모든 리드 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 캠페인 성과 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            이메일 캠페인 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.campaigns.emailsSent.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">발송 수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.campaigns.openRate}%</div>
              <div className="text-sm text-muted-foreground">오픈율</div>
              <Progress value={metrics.campaigns.openRate} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.campaigns.clickRate}%</div>
              <div className="text-sm text-muted-foreground">클릭률</div>
              <Progress value={metrics.campaigns.clickRate} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{metrics.campaigns.unsubscribeRate}%</div>
              <div className="text-sm text-muted-foreground">구독취소율</div>
              <Progress value={metrics.campaigns.unsubscribeRate} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 지표 카드 컴포넌트
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  subtitle?: string;
}

function MetricCard({ title, value, change, icon, subtitle }: MetricCardProps) {
  const isPositive = change > 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500" />
            )}
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(change)}%
            </span>
            {subtitle && <span className="ml-1">{subtitle}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 등급별 배지 변형 가져오기
function getGradeBadgeVariant(grade: string) {
  switch (grade) {
    case 'A': return 'default';
    case 'B': return 'secondary';
    case 'C': return 'outline';
    case 'D': return 'destructive';
    default: return 'secondary';
  }
}

// 로딩 스켈레톤
function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-8 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-8 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// API 함수들 (실제로는 별도 파일로 분리)
async function fetchMarketingMetrics(timeRange: string): Promise<MarketingMetrics> {
  // 실제 API 호출 구현
  return {
    leads: {
      total: 1247,
      new: 89,
      qualified: 234,
      converted: 45,
      conversionRate: 18.5,
      trend: 12.3
    },
    content: {
      views: 15420,
      engagement: 8.7,
      downloads: 892,
      shareRate: 3.2,
      topPerforming: [
        {
          id: '1',
          title: 'CEO를 위한 가업승계 완벽 가이드',
          type: 'Blog',
          views: 2450,
          engagement: 12.8,
          conversions: 23
        },
        {
          id: '2', 
          title: '중견기업 자산관리 전략',
          type: 'Whitepaper',
          views: 1890,
          engagement: 15.6,
          conversions: 31
        }
      ]
    },
    campaigns: {
      active: 8,
      emailsSent: 12450,
      openRate: 24.8,
      clickRate: 4.2,
      unsubscribeRate: 0.8
    },
    leadScoring: {
      averageScore: 52,
      highScoreLeads: 89,
      scoreDistribution: [
        { grade: 'A', count: 89, percentage: 25 },
        { grade: 'B', count: 156, percentage: 35 },
        { grade: 'C', count: 134, percentage: 30 },
        { grade: 'D', count: 45, percentage: 10 }
      ]
    }
  };
}

async function fetchRecentLeads(): Promise<LeadSummary[]> {
  // 실제 API 호출 구현
  return [
    {
      id: '1',
      name: '김철수',
      email: 'kim@company.com',
      company: '(주)혁신기술',
      score: 85,
      grade: 'A',
      temperature: 'Hot',
      lastActivity: '2시간 전',
      source: '블로그'
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@business.co.kr',
      company: '비즈니스솔루션',
      score: 78,
      grade: 'B',
      temperature: 'Warm',
      lastActivity: '5시간 전',
      source: '웨비나'
    }
  ];
}