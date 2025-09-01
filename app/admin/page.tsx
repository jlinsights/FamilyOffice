'use client';

import nextDynamic from 'next/dynamic';
import { Shield, Brain, TrendingUp, Search, Gauge, Phone } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Dynamic imports for heavy dashboard components
const AISearchDashboard = nextDynamic(
  () => import('@/components/admin/ai-search-dashboard').then(mod => ({ default: mod.AISearchDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">AI 검색 대시보드 로딩 중...</div>
  }
);

const GoogleSearchConsoleDashboard = nextDynamic(
  () => import('@/components/admin/google-search-console-dashboard').then(mod => ({ default: mod.GoogleSearchConsoleDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">Google Search Console 로딩 중...</div>
  }
);

const WebVitalsDashboard = nextDynamic(
  () => import('@/components/web-vitals-dashboard').then(mod => ({ default: mod.WebVitalsDashboard })),
  { 
    loading: () => <div className="flex items-center justify-center h-64">웹 성능 대시보드 로딩 중...</div>
  }
);

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

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              SEO 성과
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              상담 관리
            </TabsTrigger>
            <TabsTrigger value="search-console" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Console
            </TabsTrigger>
            <TabsTrigger value="ai-search" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI 검색엔진
            </TabsTrigger>
            <TabsTrigger value="web-vitals" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              웹 성능
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO 성과 지표</CardTitle>
                <CardDescription>검색엔진 최적화 및 트래픽 성과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4위</div>
                    <p className="text-sm text-muted-foreground">패밀리오피스 검색순위</p>
                    <p className="text-xs text-green-600">↗ 3단계 상승</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+187%</div>
                    <p className="text-sm text-muted-foreground">검색 트래픽 증가</p>
                    <p className="text-xs text-muted-foreground">목표: 300%</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-violet-600">5개</div>
                    <p className="text-sm text-muted-foreground">AI 플랫폼 노출</p>
                    <p className="text-xs text-muted-foreground">ChatGPT, Claude 등</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">최근 SEO 개선 사항</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>8개 고가치 키워드 랜딩 페이지 생성 완료</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>구조화된 데이터 마크업 100% 적용</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Core Web Vitals 모든 지표 녹색 달성</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>상담 관리</CardTitle>
                <CardDescription>예약된 상담 및 문의 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">67</div>
                    <p className="text-sm text-muted-foreground">이번 달 상담</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">12</div>
                    <p className="text-sm text-muted-foreground">오늘 예정</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">5</div>
                    <p className="text-sm text-muted-foreground">대기 중</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/admin/consultations">
                      상담 목록 보기
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search-console">
            <GoogleSearchConsoleDashboard />
          </TabsContent>

          <TabsContent value="ai-search">
            <AISearchDashboard />
          </TabsContent>

          <TabsContent value="web-vitals">
            <WebVitalsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}