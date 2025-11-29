'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  Search, 
  BarChart3, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Trophy,
  Eye,
  MousePointer,
  Volume2
} from 'lucide-react';

// 타입 정의
interface SEOMetrics {
  keywordRankings: Array<{
    keyword: string;
    currentRank: number;
    previousRank: number;
    searchVolume: number;
    url: string;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
  }>;
  organicTraffic: {
    totalSessions: number;
    organicSessions: number;
    organicPercentage: number;
    bounceRate: number;
    conversions: number;
    conversionRate: number;
  };
  technicalSEO: {
    overall: number;
    pagespeed: { desktop: number; mobile: number; };
    coreWebVitals: { lcp: number; fid: number; cls: number; };
  };
  contentPerformance: {
    totalPosts: number;
    avgWordCount: number;
    keywordDensity: number;
    topPerformingContent: Array<{
      title: string;
      url: string;
      views: number;
      seoScore: number;
    }>;
  };
  naverSpecificMetrics: {
    blogOptimization: {
      blogRank: number;
      subscriberCount: number;
      engagement: number;
    };
    premiumContent: {
      subscribers: number;
      monthlyRevenue: number;
      engagementRate: number;
    };
  };
}

export function SEOAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // 모의 데이터 (실제로는 API에서 가져옴)
  useEffect(() => {
    const mockData: SEOMetrics = {
      keywordRankings: [
        { keyword: '가업승계 컨설팅', currentRank: 8, previousRank: 15, searchVolume: 3200, url: '/services', trend: 'up', changePercent: 87 },
        { keyword: '패밀리오피스', currentRank: 12, previousRank: 18, searchVolume: 2400, url: '/', trend: 'up', changePercent: 50 },
        { keyword: '법인세 절세', currentRank: 22, previousRank: 28, searchVolume: 5600, url: '/blog/corporate-tax', trend: 'up', changePercent: 27 },
        { keyword: '절세전략', currentRank: 16, previousRank: 19, searchVolume: 6800, url: '/tax-strategy', trend: 'up', changePercent: 18 },
        { keyword: '정책자금 신청', currentRank: 25, previousRank: 30, searchVolume: 12000, url: '/policy-funding', trend: 'up', changePercent: 20 },
        { keyword: '기업인증 혜택', currentRank: 14, previousRank: 20, searchVolume: 1800, url: '/business-certification', trend: 'up', changePercent: 42 },
        { keyword: '경영인정기보험', currentRank: 11, previousRank: 16, searchVolume: 4200, url: '/key-person-insurance', trend: 'up', changePercent: 45 }
      ],
      organicTraffic: {
        totalSessions: 8500,
        organicSessions: 5950,
        organicPercentage: 70,
        bounceRate: 45,
        conversions: 127,
        conversionRate: 2.14
      },
      technicalSEO: {
        overall: 87,
        pagespeed: { desktop: 92, mobile: 85 },
        coreWebVitals: { lcp: 2.1, fid: 95, cls: 0.08 }
      },
      contentPerformance: {
        totalPosts: 24,
        avgWordCount: 1850,
        keywordDensity: 2.3,
        topPerformingContent: [
          { title: '2025년 가업승계 완벽 가이드', url: '/blog/succession-guide-2025', views: 2400, seoScore: 89 },
          { title: 'CEO 절세전략 실전편', url: '/blog/ceo-tax-strategy', views: 1950, seoScore: 85 },
          { title: '정책자금 신청 성공 노하우', url: '/blog/policy-funding-tips', views: 1650, seoScore: 82 }
        ]
      },
      naverSpecificMetrics: {
        blogOptimization: {
          blogRank: 127,
          subscriberCount: 450,
          engagement: 78
        },
        premiumContent: {
          subscribers: 23,
          monthlyRevenue: 230000,
          engagementRate: 85
        }
      }
    };

    setTimeout(() => {
      setMetrics(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>SEO 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const getTrendIcon = (trend: string, changePercent: number) => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4 bg-gray-300 rounded-full"></div>;
  };

  const formatChange = (change: number, isRanking = false) => {
    const prefix = isRanking ? (change > 0 ? '+' : '') : (change > 0 ? '+' : '');
    return `${prefix}${change}${isRanking ? '위' : '%'}`;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO 성과 대시보드</h1>
          <p className="text-muted-foreground mt-2">
            네이버 검색 최적화 및 통합 성과 모니터링
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            자동 새로고침
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            보고서 생성
          </Button>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 키워드 순위</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.keywordRankings.reduce((acc, k) => acc + k.currentRank, 0) / metrics.keywordRankings.length).toFixed(1)}위
            </div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              6.2위 상승 (지난 주 대비)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">유기적 트래픽</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.organicTraffic.organicSessions.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +{metrics.organicTraffic.organicPercentage}% 유기적
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전환율</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.organicTraffic.conversionRate.toFixed(2)}%
            </div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              {metrics.organicTraffic.conversions}건 전환
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">기술적 SEO</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.technicalSEO.overall}점
            </div>
            <div className="flex items-center text-xs text-blue-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              우수한 성능
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="keywords">키워드 순위</TabsTrigger>
          <TabsTrigger value="technical">기술적 SEO</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 성과</TabsTrigger>
          <TabsTrigger value="naver">네이버 특화</TabsTrigger>
          <TabsTrigger value="aeo">AEO 최적화</TabsTrigger>
        </TabsList>

        {/* 전체 개요 탭 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SEO 점수 차트 */}
            <Card>
              <CardHeader>
                <CardTitle>SEO 종합 점수</CardTitle>
                <CardDescription>각 영역별 성과 분석</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">키워드 순위</span>
                    <span className="text-sm font-medium">78/100</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">기술적 SEO</span>
                    <span className="text-sm font-medium">87/100</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">콘텐츠 품질</span>
                    <span className="text-sm font-medium">82/100</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">사용자 경험</span>
                    <span className="text-sm font-medium">75/100</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 개선 제안 */}
            <Card>
              <CardHeader>
                <CardTitle>우선순위 개선 과제</CardTitle>
                <CardDescription>즉시 실행 가능한 개선 사항</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">정책자금 키워드 순위 개선</p>
                      <p className="text-sm text-red-700">25위 → 15위 목표 (2주 내)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">모바일 페이지 속도 최적화</p>
                      <p className="text-sm text-yellow-700">85점 → 90점 목표</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">네이버 블로그 포스팅 빈도 증가</p>
                      <p className="text-sm text-blue-700">주 2회 → 주 3회</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 키워드 순위 탭 */}
        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>키워드 순위 추적</CardTitle>
              <CardDescription>주요 타겟 키워드의 네이버 검색 순위 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">키워드</th>
                      <th className="text-center py-3 px-2">현재 순위</th>
                      <th className="text-center py-3 px-2">변화</th>
                      <th className="text-center py-3 px-2">검색량</th>
                      <th className="text-center py-3 px-2">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.keywordRankings.map((keyword, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{keyword.keyword}</div>
                            <div className="text-sm text-muted-foreground">{keyword.url}</div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge variant={keyword.currentRank <= 10 ? "default" : keyword.currentRank <= 20 ? "secondary" : "outline"}>
                            {keyword.currentRank}위
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2">
                          <div className="flex items-center justify-center">
                            {getTrendIcon(keyword.trend, keyword.changePercent)}
                            <span className={`ml-1 text-sm ${
                              keyword.trend === 'up' ? 'text-green-600' : 
                              keyword.trend === 'down' ? 'text-red-600' : 
                              'text-gray-600'
                            }`}>
                              {formatChange(keyword.changePercent)}
                            </span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-sm">{keyword.searchVolume.toLocaleString()}/월</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge variant={
                            keyword.currentRank <= 5 ? "default" :
                            keyword.currentRank <= 15 ? "secondary" : "destructive"
                          }>
                            {keyword.currentRank <= 5 ? '우수' : keyword.currentRank <= 15 ? '양호' : '개선필요'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 기술적 SEO 탭 */}
        <TabsContent value="technical">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>페이지 속도 점수</CardTitle>
                <CardDescription>Google PageSpeed Insights 기준</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">데스크톱</span>
                    <span className="text-sm font-medium">{metrics.technicalSEO.pagespeed.desktop}점</span>
                  </div>
                  <Progress value={metrics.technicalSEO.pagespeed.desktop} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">모바일</span>
                    <span className="text-sm font-medium">{metrics.technicalSEO.pagespeed.mobile}점</span>
                  </div>
                  <Progress value={metrics.technicalSEO.pagespeed.mobile} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>사용자 경험 핵심 지표</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">{metrics.technicalSEO.coreWebVitals.lcp}s</div>
                    <div className="text-xs text-green-600">LCP</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">{metrics.technicalSEO.coreWebVitals.fid}ms</div>
                    <div className="text-xs text-green-600">FID</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">{metrics.technicalSEO.coreWebVitals.cls}</div>
                    <div className="text-xs text-green-600">CLS</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  모든 지표가 우수한 범위 내에 있습니다.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 콘텐츠 성과 탭 */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>콘텐츠 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">총 포스트</span>
                  <span className="font-medium">{metrics.contentPerformance.totalPosts}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">평균 글자 수</span>
                  <span className="font-medium">{metrics.contentPerformance.avgWordCount}자</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">키워드 밀도</span>
                  <span className="font-medium">{metrics.contentPerformance.keywordDensity}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>최고 성과 콘텐츠</CardTitle>
                <CardDescription>조회수 및 SEO 점수 기준</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.contentPerformance.topPerformingContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-sm text-muted-foreground">{content.url}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {content.views.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">SEO: {content.seoScore}점</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 네이버 특화 탭 */}
        <TabsContent value="naver">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>네이버 블로그 성과</CardTitle>
                <CardDescription>blog.naver.com/lim_jaehong</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">블로그 순위</span>
                  <span className="font-medium">{metrics.naverSpecificMetrics.blogOptimization.blogRank}위</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">구독자 수</span>
                  <span className="font-medium">{metrics.naverSpecificMetrics.blogOptimization.subscriberCount}명</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">참여도</span>
                    <span className="text-sm font-medium">{metrics.naverSpecificMetrics.blogOptimization.engagement}%</span>
                  </div>
                  <Progress value={metrics.naverSpecificMetrics.blogOptimization.engagement} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>프리미엄 콘텐츠 수익</CardTitle>
                <CardDescription>contents.premium.naver.com/familyoffice/fo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">구독자</span>
                  <span className="font-medium">{metrics.naverSpecificMetrics.premiumContent.subscribers}명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">월 수익</span>
                  <span className="font-medium">{metrics.naverSpecificMetrics.premiumContent.monthlyRevenue.toLocaleString()}원</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">참여율</span>
                    <span className="text-sm font-medium">{metrics.naverSpecificMetrics.premiumContent.engagementRate}%</span>
                  </div>
                  <Progress value={metrics.naverSpecificMetrics.premiumContent.engagementRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AEO 최적화 탭 */}
        <TabsContent value="aeo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Answer Engine Optimization</CardTitle>
                <CardDescription>AI 검색엔진 및 음성검색 최적화 현황</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">답변 커버리지</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">음성 검색 준비도</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI 엔진 호환성</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">구조화 답변 품질</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI 엔진별 최적화 상태</CardTitle>
                <CardDescription>주요 AI 검색엔진 호환성</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'ChatGPT', score: 94, status: '완전 최적화', icon: '🤖' },
                    { name: 'Claude', score: 91, status: '완전 최적화', icon: '🧠' },
                    { name: 'HyperCLOVA', score: 89, status: '완전 최적화', icon: '🇰🇷' },
                    { name: 'Bard', score: 87, status: '완전 최적화', icon: '🎭' },
                    { name: 'Perplexity', score: 76, status: '개선 필요', icon: '🔍' }
                  ].map((engine, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{engine.icon}</span>
                        <div>
                          <div className="font-medium">{engine.name}</div>
                          <div className="text-sm text-muted-foreground">{engine.status}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{engine.score}점</div>
                        <Badge variant={engine.score >= 90 ? 'default' : engine.score >= 80 ? 'secondary' : 'outline'}>
                          {engine.score >= 90 ? '우수' : engine.score >= 80 ? '양호' : '개선필요'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>음성 검색 최적화 현황</CardTitle>
              <CardDescription>자연어 질의 및 대화형 검색 대응</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">67개</div>
                  <div className="text-sm text-muted-foreground">자연어 질의</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45개</div>
                  <div className="text-sm text-muted-foreground">음성 최적화</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">88%</div>
                  <div className="text-sm text-muted-foreground">준비도</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">4개</div>
                  <div className="text-sm text-muted-foreground">디바이스</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">자주 묻는 음성 질문</h4>
                {[
                  '우리 회사 가업승계 어떻게 준비해야 해?',
                  '중소기업 절세 방법 좀 알려줘',
                  '패밀리오피스 서비스 비용이 얼마나 들어?'
                ].map((question, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{question}</span>
                    <Badge variant="secondary" className="ml-auto">최적화 완료</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 실시간 알림 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            최신 성과 알림
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <span className="font-medium text-green-800">"가업승계 컨설팅" 키워드 7위 상승!</span>
                <span className="text-sm text-green-700 ml-2">15위 → 8위</span>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <span className="font-medium text-blue-800">유기적 트래픽 35% 증가</span>
                <span className="text-sm text-blue-700 ml-2">이번 주 대비</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <Users className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <span className="font-medium text-yellow-800">네이버 블로그 구독자 50명 증가</span>
                <span className="text-sm text-yellow-700 ml-2">이번 달 누적</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}