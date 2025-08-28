"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Mail, FileText, TrendingUp, Target, Users, BarChart3 } from 'lucide-react';

/**
 * 콘텐츠 캘린더 대시보드 컴포넌트
 * SuperClaude Framework + BMAD Method + Phase 3 구현
 */

interface ContentEvent {
  time: string;
  type: 'newsletter' | 'blog';
  category: string;
  title: string;
  status: 'published' | 'scheduled';
}

interface CalendarDay {
  day: number;
  date: string;
  dayOfWeek: number;
  events: ContentEvent[];
  isToday: boolean;
  isWeekend: boolean;
}

interface ContentAnalytics {
  totalViews: number;
  avgEngagement: number;
  topPerformingContent: string;
  conversionRate: number;
}

export function ContentCalendarDashboard() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContentData();
  }, [selectedMonth, selectedYear]);

  const loadContentData = async () => {
    try {
      setLoading(true);
      
      // 콘텐츠 캘린더 데이터 로드
      const calendarResponse = await fetch(
        `/api/content-strategy?action=content-calendar&month=${selectedMonth}&year=${selectedYear}`
      );
      const calendarData = await calendarResponse.json();
      
      if (calendarData.success) {
        setCalendar(calendarData.data.calendar);
      }

      // 주간 콘텐츠 계획 로드
      const weeklyResponse = await fetch(
        `/api/content-strategy?action=weekly-plan&weeks=4`
      );
      const weeklyData = await weeklyResponse.json();
      
      if (weeklyData.success) {
        setWeeklyPlan(weeklyData.data.schedule);
      }

      // 콘텐츠 성과 분석 로드
      const analyticsResponse = await fetch(
        `/api/content-strategy?action=analytics-overview`
      );
      const analyticsData = await analyticsResponse.json();
      
      if (analyticsData.success) {
        setAnalytics(analyticsData.data.overview);
      }

    } catch (error) {
      console.error('Failed to load content data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: string) => {
    return type === 'newsletter' ? <Mail className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const getEventColor = (category: string) => {
    switch (category) {
      case 'practical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'strategic': return 'bg-green-100 text-green-800 border-green-200';
      case 'market-analysis': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryKorean = (category: string) => {
    switch (category) {
      case 'practical': return '실무 가이드';
      case 'strategic': return '전략 분석';
      case 'market-analysis': return '시장 분석';
      default: return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleDateString('ko-KR', { 
    month: 'long' 
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">콘텐츠 마케팅 캘린더</h2>
          <p className="text-muted-foreground">
            SuperClaude Framework 기반 콘텐츠 전략 관리 대시보드
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setSelectedMonth(prev => prev === 1 ? 12 : prev - 1)}
          >
            이전 월
          </Button>
          <span className="font-medium px-4">{selectedYear}년 {monthName}</span>
          <Button
            variant="outline" 
            onClick={() => setSelectedMonth(prev => prev === 12 ? 1 : prev + 1)}
          >
            다음 월
          </Button>
        </div>
      </div>

      {/* 성과 개요 카드 */}
      {analytics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                전월 대비 +15.2% 증가
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">
                업계 평균 대비 +23% 높음
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전환율</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                상담 예약 전환율
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">성장률</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+28.5%</div>
              <p className="text-xs text-muted-foreground">
                6개월 평균 성장률
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">월간 캘린더</TabsTrigger>
          <TabsTrigger value="schedule">주간 스케줄</TabsTrigger>
          <TabsTrigger value="performance">성과 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {selectedYear}년 {monthName} 콘텐츠 발행 일정
              </CardTitle>
              <CardDescription>
                화요일/금요일 뉴스레터 (오전 7:30) | 목요일 블로그 (저녁 8:00)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendar.map(({ day, events, isToday, isWeekend }) => (
                  <div
                    key={day}
                    className={`min-h-[100px] p-2 border rounded-lg ${
                      isToday ? 'bg-blue-50 border-blue-200' : 
                      isWeekend ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : ''}`}>
                      {day}
                    </div>
                    
                    <div className="space-y-1">
                      {events.map((event, idx) => (
                        <div key={idx} className="text-xs">
                          <Badge 
                            variant="outline" 
                            className={`text-xs p-1 ${getEventColor(event.category)}`}
                          >
                            <div className="flex items-center gap-1">
                              {getEventIcon(event.type)}
                              <span>{event.time}</span>
                            </div>
                          </Badge>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {getCategoryKorean(event.category)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                향후 4주 콘텐츠 스케줄
              </CardTitle>
              <CardDescription>
                BMAD Method 기반 주제별 콘텐츠 계획
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyPlan.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center gap-2">
                        {getEventIcon(item.type)}
                        <span className="font-medium">{formatDate(item.date)}</span>
                        <Badge variant="outline">{item.timeUntilPublish}일 후</Badge>
                      </div>
                      <div>
                        <div className="font-medium">{item.suggestedTopic}</div>
                        <div className="text-sm text-muted-foreground">
                          {getCategoryKorean(item.category)} | 템플릿: {item.templateId}
                        </div>
                      </div>
                    </div>
                    <Badge className={getEventColor(item.category)}>
                      {getCategoryKorean(item.category)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 성과 분석</CardTitle>
              <CardDescription>
                최근 30일 콘텐츠 마케팅 성과 요약
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">최고 성과 콘텐츠</h4>
                    <p className="text-sm text-muted-foreground">
                      {analytics?.topPerformingContent || '데이터 로딩 중...'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">개선 권장사항</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 목요일 블로그 포스트의 소셜 미디어 노출 확대</li>
                      <li>• 뉴스레터 오픈율 개선을 위한 제목 A/B 테스트</li>
                      <li>• 콘텐츠 내 CTA 배치 최적화</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">주간 발행 통계</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2</div>
                      <div className="text-sm text-muted-foreground">뉴스레터/주</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <div className="text-sm text-muted-foreground">블로그/주</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-muted-foreground">총 콘텐츠/월</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}