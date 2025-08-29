'use client';

import { Shield, Brain, TrendingUp, Users, BarChart3, Calendar, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AISearchDashboard } from '@/components/admin/ai-search-dashboard';
import { ContentCalendarDashboard } from '@/components/admin/content-calendar-dashboard';
import { GoogleSearchConsoleDashboard } from '@/components/admin/google-search-console-dashboard';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          </div>
          <Badge variant="outline" className="mb-4">
            프리미엄 관리자 대시보드
          </Badge>
        </div>

        <Tabs defaultValue="content-calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="content-calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              콘텐츠 캘린더
            </TabsTrigger>
            <TabsTrigger value="search-console" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Console
            </TabsTrigger>
            <TabsTrigger value="ai-search" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI 검색엔진
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              분석
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              사용자
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              성과
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content-calendar">
            <ContentCalendarDashboard />
          </TabsContent>

          <TabsContent value="search-console">
            <GoogleSearchConsoleDashboard />
          </TabsContent>

          <TabsContent value="ai-search">
            <AISearchDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>사이트 분석</CardTitle>
                <CardDescription>Google Analytics 및 성과 지표</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15.3%</div>
                    <p className="text-sm text-muted-foreground">월 성장률</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">2,847</div>
                    <p className="text-sm text-muted-foreground">월간 방문자</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-violet-600">8.4%</div>
                    <p className="text-sm text-muted-foreground">전환율</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>사용자 관리</CardTitle>
                <CardDescription>등록된 사용자 및 상담 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">등록 사용자</h3>
                    <div className="text-2xl font-bold text-primary">124명</div>
                    <p className="text-sm text-muted-foreground">지난 30일 +23명</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">상담 예약</h3>
                    <div className="text-2xl font-bold text-green-600">67건</div>
                    <p className="text-sm text-muted-foreground">이번 달 총 예약</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO 성과 지표</CardTitle>
                <CardDescription>검색엔진 최적화 및 트래픽 성과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">브랜드 키워드 순위</span>
                      <span className="text-sm text-muted-foreground">목표: 상위 3위</span>
                    </div>
                    <div className="text-lg font-bold">패밀리오피스: 7위 → 4위 📈</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">검색 트래픽 증가율</span>
                      <span className="text-sm text-muted-foreground">목표: 300%</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">+187% (진행 중)</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">AI 검색엔진 노출</span>
                      <span className="text-sm text-muted-foreground">ChatGPT, Perplexity 등</span>
                    </div>
                    <div className="text-lg font-bold text-violet-600">5개 플랫폼 활성화</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
