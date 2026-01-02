/**
 * 인바운드 마케팅 자동화 대시보드
 * SEO 성과 모니터링 및 컨텐츠 관리
 */

'use client';

import {
  Calendar,
  TrendingUp,
  Users,
  FileText,
  Zap,
  Settings,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  generateContentCalendar,
  createAutomationRule,
  generateContentTemplate,
  calculateMarketingROI,
  type ContentCalendar,
  type AutomationRule,
  type MarketingMetrics,
} from '@/lib/seo/inbound-marketing-automation';

/**
 * 인바운드 마케팅 자동화 대시보드
 * SEO 성과 모니터링 및 컨텐츠 관리
 */

interface InboundMarketingDashboardProps {
  initialMetrics?: MarketingMetrics;
  className?: string;
}

/**
 * 메인 인바운드 마케팅 대시보드
 */
export function InboundMarketingDashboard({
  initialMetrics,
  className = '',
}: InboundMarketingDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [contentCalendar, setContentCalendar] = useState<ContentCalendar[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [metrics, setMetrics] = useState<MarketingMetrics>(
    initialMetrics || {
      views: 15000,
      clicks: 1200,
      conversions: 48,
      period: '2024-01',
      organicTraffic: 12450,
      keywordRankings: {
        패밀리오피스: 3,
        자산관리: 7,
        기업승계: 5,
        세무최적화: 12,
      },
      conversionRate: 2.8,
      leadGeneration: 23,
      contentEngagement: {
        averageTimeOnPage: 245,
        bounceRate: 42,
        pagesPerSession: 3.2,
      },
      roi: 340,
    }
  );

  useEffect(() => {
    // 컨텐츠 캘린더 초기화
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    const calendar = generateContentCalendar(startDate, endDate, [
      '패밀리오피스',
      '자산관리',
      '기업승계',
      '세무최적화',
    ]);
    setContentCalendar(calendar);

    // 자동화 규칙 초기화
    const rules = [
      createAutomationRule('weekly-blog', 'schedule', 'generate-content', {
        name: '주간 블로그 자동 생성',
        trigger: { type: 'schedule', schedule: '0 9 * * 2' },
      }),
      createAutomationRule(
        'keyword-opportunity',
        'keyword-opportunity',
        'generate-content',
        {
          name: '키워드 기회 자동 감지',
          trigger: { type: 'keyword-opportunity', keywordThreshold: 100 },
        }
      ),
      createAutomationRule(
        'monthly-optimization',
        'schedule',
        'optimize-existing',
        {
          name: '월간 SEO 최적화',
          trigger: { type: 'schedule', schedule: '0 2 1 * *' },
        }
      ),
    ];
    setAutomationRules(rules);
  }, []);

  const roiData = calculateMarketingROI(metrics, 2000000) as { roi: number; costPerLead: number; ltv: number; recommendations?: string[] }; // 200만원 투자 가정

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">인바운드 마케팅 대시보드</h1>
          <p className="text-muted-foreground">
            SEO 성과 모니터링 및 컨텐츠 자동화 관리
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            설정
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            자동화 실행
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="content">컨텐츠</TabsTrigger>
          <TabsTrigger value="automation">자동화</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="optimization">최적화</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  유기적 트래픽
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.organicTraffic?.toLocaleString() || '0'}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% 전월 대비
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">전환율</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground">+0.3% 전월 대비</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">리드 생성</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.leadGeneration}
                </div>
                <p className="text-xs text-muted-foreground">+8 전월 대비</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(roiData.roi)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  리드당 {Math.round(roiData.costPerLead / 10000)}만원
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 키워드 순위 */}
          <Card>
            <CardHeader>
              <CardTitle>주요 키워드 순위</CardTitle>
              <CardDescription>타겟 키워드의 현재 검색 순위</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(metrics.keywordRankings || {}).map(
                  ([keyword, rank]) => (
                    <div
                      key={keyword}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            rank <= 3
                              ? 'default'
                              : rank <= 10
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {rank}위
                        </Badge>
                        <span className="font-medium">{keyword}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {rank <= 3 && (
                          <span className="text-green-600">🔥</span>
                        )}
                        {rank > 10 && (
                          <span className="text-orange-600">📈</span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* 성과 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>이번 달 성과 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">
                    평균 페이지 체류시간
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.floor(
                      (metrics.contentEngagement?.averageTimeOnPage || 0) / 60
                    )}
                    분 {(metrics.contentEngagement?.averageTimeOnPage || 0) % 60}초
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">이탈률</div>
                  <div className="text-2xl font-bold">
                    {metrics.contentEngagement?.bounceRate || 0}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    세션당 페이지뷰
                  </div>
                  <div className="text-2xl font-bold">
                    {metrics.contentEngagement?.pagesPerSession || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 컨텐츠 탭 */}
        <TabsContent value="content" className="space-y-6">
          <ContentCalendarView calendar={contentCalendar} />
        </TabsContent>

        {/* 자동화 탭 */}
        <TabsContent value="automation" className="space-y-6">
          <AutomationRulesView rules={automationRules} />
        </TabsContent>

        {/* 분석 탭 */}
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsView metrics={metrics} roiData={roiData} />
        </TabsContent>

        {/* 최적화 탭 */}
        <TabsContent value="optimization" className="space-y-6">
          <OptimizationView recommendations={roiData.recommendations || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * 컨텐츠 캘린더 뷰
 */
function ContentCalendarView({ calendar }: { calendar: ContentCalendar[] }) {
  const getStatusColor = (status: ContentCalendar['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'planned':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const upcomingContent = calendar.filter(
    item =>
      new Date(item.date) >= new Date() &&
      new Date(item.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            이번 주 컨텐츠 일정
          </CardTitle>
          <CardDescription>예정된 컨텐츠 발행 일정과 진행 상황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingContent.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      weekday: 'short',
                    })}
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      타겟: {item.targetKeywords?.join(', ') || '없음'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status === 'planned'
                      ? '예정'
                      : item.status === 'in-progress'
                        ? '진행중'
                        : '완료'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>컨텐츠 성과 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">이번 달 발행</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12.5K</div>
              <div className="text-sm text-muted-foreground">평균 조회수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3.8</div>
              <div className="text-sm text-muted-foreground">평균 평점</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 자동화 규칙 뷰
 */
function AutomationRulesView({ rules }: { rules: AutomationRule[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            활성화된 자동화 규칙
          </CardTitle>
          <CardDescription>설정된 자동화 규칙과 실행 상태</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map(rule => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  />
                  <div>
                    <div className="font-medium">{rule.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {typeof rule.trigger === 'object' && rule.trigger.type === 'schedule'
                        ? `스케줄: ${rule.trigger.schedule}`
                        : `트리거: ${typeof rule.trigger === 'object' ? rule.trigger.type : rule.trigger}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                    {rule.enabled ? '활성' : '비활성'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    편집
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>자동화 성과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">
                자동 생성된 컨텐츠
              </div>
              <div className="text-2xl font-bold">12개</div>
              <div className="text-xs text-green-600">+4 이번 달</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">시간 절약</div>
              <div className="text-2xl font-bold">24시간</div>
              <div className="text-xs text-blue-600">월 평균</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 분석 뷰
 */
function AnalyticsView({
  metrics,
  roiData,
}: {
  metrics: MarketingMetrics;
  roiData: { roi: number; costPerLead: number; ltv: number; recommendations?: string[] };
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ROI 분석</CardTitle>
          <CardDescription>투자 대비 수익률 상세 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">전체 ROI</div>
              <div className="text-3xl font-bold text-green-600">
                {Math.round(roiData.roi)}%
              </div>
              <Progress
                value={Math.min(roiData.roi / 5, 100)}
                className="mt-2"
              />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">리드당 비용</div>
              <div className="text-3xl font-bold">
                {Math.round(roiData.costPerLead / 10000)}만원
              </div>
              <div className="text-xs text-muted-foreground">
                목표: 10만원 이하
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm text-muted-foreground">
              고객 생애 가치 (LTV)
            </div>
            <div className="text-2xl font-bold">
              {(roiData.ltv / 10000).toFixed(0)}만원
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>트래픽 소스 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { source: '유기적 검색', percentage: 68, visitors: 8466 },
              { source: '직접 방문', percentage: 18, visitors: 2241 },
              { source: '소셜 미디어', percentage: 8, visitors: 996 },
              { source: '추천', percentage: 6, visitors: 747 },
            ].map(item => (
              <div
                key={item.source}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-20 text-sm">{item.source}</div>
                  <Progress value={item.percentage} className="w-32" />
                  <div className="text-sm text-muted-foreground">
                    {item.percentage}%
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {item.visitors.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 최적화 뷰
 */
function OptimizationView({ recommendations }: { recommendations: string[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI 추천 최적화
          </CardTitle>
          <CardDescription>데이터 기반 성과 개선 제안</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 border rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{recommendation}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    예상 개선 효과: +{Math.round((index + 1) * 5)}%
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  적용
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>진행 중인 최적화</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                task: '메인 페이지 A/B 테스트',
                progress: 75,
                status: '진행중',
              },
              {
                task: '블로그 컨텐츠 SEO 개선',
                progress: 45,
                status: '진행중',
              },
              {
                task: '내부 링크 구조 최적화',
                progress: 90,
                status: '거의 완료',
              },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.task}</span>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
                <Progress value={item.progress} />
                <div className="text-xs text-muted-foreground">
                  {item.progress}% 완료
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InboundMarketingDashboard;
