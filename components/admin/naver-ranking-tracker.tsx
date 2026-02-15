'use client';

import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  Target,
  Clock,
  RefreshCw,
  Plus,
  BarChart3,
  Eye,
  MousePointer,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface KeywordRanking {
  id: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  bestRank: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  lastUpdated: string;
  targetRank: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface NaverRankingData {
  keywords: KeywordRanking[];
  summary: {
    totalKeywords: number;
    avgRank: number;
    improvingKeywords: number;
    decliningKeywords: number;
    top10Keywords: number;
    top20Keywords: number;
    totalSearchVolume: number;
  };
  categories: Record<
    string,
    {
      count: number;
      avgRank: number;
      trend: 'up' | 'down' | 'stable';
    }
  >;
  lastUpdate: string;
}

export function NaverRankingTracker() {
  const [data, setData] = useState<NaverRankingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState<'rank' | 'change' | 'volume'>('rank');

  // 모의 데이터
  useEffect(() => {
    const mockData: NaverRankingData = {
      keywords: [
        {
          id: '1',
          keyword: '가업승계 컨설팅',
          currentRank: 8,
          previousRank: 15,
          bestRank: 7,
          searchVolume: 3200,
          difficulty: 75,
          url: '/services',
          trend: 'up',
          changePercent: 87,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 5,
          category: '컨설팅',
          priority: 'high',
        },
        {
          id: '2',
          keyword: '패밀리오피스',
          currentRank: 12,
          previousRank: 18,
          bestRank: 9,
          searchVolume: 2400,
          difficulty: 68,
          url: '/',
          trend: 'up',
          changePercent: 50,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 8,
          category: '서비스',
          priority: 'high',
        },
        {
          id: '3',
          keyword: '법인세 절세',
          currentRank: 22,
          previousRank: 28,
          bestRank: 18,
          searchVolume: 5600,
          difficulty: 82,
          url: '/blog/corporate-tax',
          trend: 'up',
          changePercent: 27,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 15,
          category: '절세',
          priority: 'high',
        },
        {
          id: '4',
          keyword: '절세전략',
          currentRank: 16,
          previousRank: 19,
          bestRank: 14,
          searchVolume: 6800,
          difficulty: 79,
          url: '/tax-strategy',
          trend: 'up',
          changePercent: 18,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 10,
          category: '절세',
          priority: 'high',
        },
        {
          id: '5',
          keyword: '정책자금 신청',
          currentRank: 25,
          previousRank: 30,
          bestRank: 22,
          searchVolume: 12000,
          difficulty: 85,
          url: '/policy-funding',
          trend: 'up',
          changePercent: 20,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 15,
          category: '자금',
          priority: 'high',
        },
        {
          id: '6',
          keyword: '기업인증 혜택',
          currentRank: 14,
          previousRank: 20,
          bestRank: 11,
          searchVolume: 1800,
          difficulty: 62,
          url: '/business-certification',
          trend: 'up',
          changePercent: 42,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 8,
          category: '인증',
          priority: 'medium',
        },
        {
          id: '7',
          keyword: '경영인정기보험',
          currentRank: 11,
          previousRank: 16,
          bestRank: 8,
          searchVolume: 4200,
          difficulty: 71,
          url: '/key-person-insurance',
          trend: 'up',
          changePercent: 45,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 6,
          category: '보험',
          priority: 'medium',
        },
        {
          id: '8',
          keyword: 'M&A 컨설팅',
          currentRank: 18,
          previousRank: 15,
          bestRank: 12,
          searchVolume: 2100,
          difficulty: 88,
          url: '/ma-consulting',
          trend: 'down',
          changePercent: -17,
          lastUpdated: '2024-01-15 14:30',
          targetRank: 10,
          category: '컨설팅',
          priority: 'medium',
        },
      ],
      summary: {
        totalKeywords: 8,
        avgRank: 15.8,
        improvingKeywords: 7,
        decliningKeywords: 1,
        top10Keywords: 1,
        top20Keywords: 6,
        totalSearchVolume: 38100,
      },
      categories: {
        컨설팅: { count: 2, avgRank: 13.0, trend: 'up' },
        절세: { count: 2, avgRank: 19.0, trend: 'up' },
        서비스: { count: 1, avgRank: 12.0, trend: 'up' },
        자금: { count: 1, avgRank: 25.0, trend: 'up' },
        인증: { count: 1, avgRank: 14.0, trend: 'up' },
        보험: { count: 1, avgRank: 11.0, trend: 'up' },
      },
      lastUpdate: '2024-01-15 14:30:00',
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (trend: string, changePercent: number) => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 5) return 'default';
    if (rank <= 10) return 'secondary';
    if (rank <= 20) return 'outline';
    return 'destructive';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change}`;
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;

    // 실제로는 API 호출
    console.log('Adding keyword:', newKeyword);
    setNewKeyword('');
  };

  const refreshData = async () => {
    setLoading(true);
    // 실제로는 API 호출
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const filteredKeywords =
    data?.keywords
      .filter(
        keyword =>
          selectedCategory === '전체' || keyword.category === selectedCategory
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'rank':
            return a.currentRank - b.currentRank;
          case 'change':
            return b.changePercent - a.changePercent;
          case 'volume':
            return b.searchVolume - a.searchVolume;
          default:
            return 0;
        }
      }) || [];

  const categories = ['전체', ...Object.keys(data?.categories || {})];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>네이버 검색 순위 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">네이버 검색 순위 추적</h1>
          <p className="text-muted-foreground mt-2">
            실시간 키워드 순위 모니터링 및 성과 분석
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
            />
            새로고침
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            순위 리포트
          </Button>
        </div>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 순위</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.summary.avgRank.toFixed(1)}위
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {data.summary.improvingKeywords}개 상승 중
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 10 진입</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.summary.top10Keywords}개
            </div>
            <div className="flex items-center text-xs text-blue-600">
              <Target className="h-3 w-3 mr-1" />총 {data.summary.totalKeywords}
              개 중
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 검색량</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.summary.totalSearchVolume.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              월간 검색 기회
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">순위 변화</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{data.summary.improvingKeywords - data.summary.decliningKeywords}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              전반적 상승세
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="keywords">
        <TabsList>
          <TabsTrigger value="keywords">키워드 추적</TabsTrigger>
          <TabsTrigger value="categories">카테고리 분석</TabsTrigger>
          <TabsTrigger value="management">키워드 관리</TabsTrigger>
        </TabsList>

        {/* 키워드 추적 탭 */}
        <TabsContent value="keywords" className="space-y-4">
          {/* 필터 및 정렬 */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Label htmlFor="category-filter">카테고리:</Label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="sort-by">정렬:</Label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={e =>
                  setSortBy(e.target.value as 'rank' | 'change' | 'volume')
                }
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="rank">순위 순</option>
                <option value="change">변화량 순</option>
                <option value="volume">검색량 순</option>
              </select>
            </div>

            <div className="text-sm text-muted-foreground ml-auto">
              마지막 업데이트: {data.lastUpdate}
            </div>
          </div>

          {/* 키워드 테이블 */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/30">
                    <tr>
                      <th className="text-left py-3 px-4">키워드</th>
                      <th className="text-center py-3 px-2">순위</th>
                      <th className="text-center py-3 px-2">변화</th>
                      <th className="text-center py-3 px-2">최고순위</th>
                      <th className="text-center py-3 px-2">목표</th>
                      <th className="text-center py-3 px-2">검색량</th>
                      <th className="text-center py-3 px-2">난이도</th>
                      <th className="text-center py-3 px-2">우선순위</th>
                      <th className="text-center py-3 px-2">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKeywords.map(keyword => (
                      <tr
                        key={keyword.id}
                        className="border-b hover:bg-muted/30"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{keyword.keyword}</div>
                            <div className="text-sm text-muted-foreground">
                              {keyword.url} • {keyword.category}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge
                            variant={getRankBadgeVariant(keyword.currentRank)}
                          >
                            {keyword.currentRank}위
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2">
                          <div className="flex items-center justify-center space-x-1">
                            {getTrendIcon(keyword.trend, keyword.changePercent)}
                            <span
                              className={`text-sm ${
                                keyword.trend === 'up'
                                  ? 'text-green-600'
                                  : keyword.trend === 'down'
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                              }`}
                            >
                              {formatChange(keyword.changePercent)}
                            </span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-sm font-medium text-blue-600">
                            {keyword.bestRank}위
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-sm">
                            {keyword.targetRank}위
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-sm">
                            {keyword.searchVolume.toLocaleString()}/월
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <div className="flex items-center justify-center">
                            <span className="text-sm mr-1">
                              {keyword.difficulty}
                            </span>
                            <Progress
                              value={keyword.difficulty}
                              className="w-12 h-2"
                            />
                          </div>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge
                            variant="outline"
                            className={getPriorityColor(keyword.priority)}
                          >
                            {keyword.priority === 'high'
                              ? '높음'
                              : keyword.priority === 'medium'
                                ? '보통'
                                : '낮음'}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2">
                          {keyword.currentRank <= keyword.targetRank ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 카테고리 분석 탭 */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.categories).map(([category, stats]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category}
                    {getTrendIcon(stats.trend, 0)}
                  </CardTitle>
                  <CardDescription>{stats.count}개 키워드</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        평균 순위
                      </span>
                      <span className="font-medium">
                        {stats.avgRank.toFixed(1)}위
                      </span>
                    </div>
                    <Progress
                      value={(50 - stats.avgRank) * 2}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 키워드 관리 탭 */}
        <TabsContent value="management">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>새 키워드 추가</CardTitle>
                <CardDescription>
                  추적할 새로운 키워드를 추가하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="키워드 입력"
                    value={newKeyword}
                    onChange={e => setNewKeyword(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword}>
                    <Plus className="h-4 w-4 mr-2" />
                    추가
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>개선이 필요한 키워드</CardTitle>
                <CardDescription>
                  목표 순위에 도달하지 못한 키워드들
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.keywords
                    .filter(k => k.currentRank > k.targetRank)
                    .map(keyword => (
                      <div
                        key={keyword.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-l-4 border-yellow-400"
                      >
                        <div>
                          <div className="font-medium">{keyword.keyword}</div>
                          <div className="text-sm text-muted-foreground">
                            현재 {keyword.currentRank}위 → 목표{' '}
                            {keyword.targetRank}위
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-yellow-600 font-medium">
                            -{keyword.currentRank - keyword.targetRank}위 차이
                          </div>
                          <div className="text-xs text-muted-foreground">
                            우선순위:{' '}
                            {keyword.priority === 'high'
                              ? '높음'
                              : keyword.priority === 'medium'
                                ? '보통'
                                : '낮음'}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
