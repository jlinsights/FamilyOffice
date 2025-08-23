'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, TrendingUp, Eye, Target, Settings, Play, Pause, 
  BarChart3, Users, Clock, Smartphone, AlertCircle, CheckCircle 
} from 'lucide-react';

// Admin page for popup analytics and management
export default function PopupAnalyticsPage() {
  const [testMode, setTestMode] = useState(false);

  // Campaign data - Until further notice (indefinite)
  const CAMPAIGN_END_DATE = new Date('2099-12-31T23:59:59+09:00');
  const isCampaignActive = true; // Always active until further notice
  const timeRemaining = CAMPAIGN_END_DATE.getTime() - new Date().getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Mock metrics data
  const ceoMetrics = { ctr: 8.0 };
  const newsletterMetrics = { cvr: 11.7 };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            팝업 관리 시스템
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            AgentOS 최적화 기반 이중 팝업 시스템 운영 현황
          </p>
        </div>
        
        {/* Campaign Status */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">캠페인 상태</div>
            <div className="text-lg font-semibold text-primary">
              무기한 운영
            </div>
          </div>
          <Badge 
            variant={isCampaignActive ? "default" : "destructive"}
            className="flex items-center gap-1"
          >
            <>
              <CheckCircle className="h-3 w-3" />
              무기한 활성
            </>
          </Badge>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사용자 세그먼트</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">engaged</div>
            <p className="text-xs text-muted-foreground">
              현재 세션 분류
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CEO 팝업 성과</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ceoMetrics ? `${ceoMetrics.ctr.toFixed(1)}%` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              클릭률 (CTR)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">뉴스레터 성과</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newsletterMetrics ? `${newsletterMetrics.cvr.toFixed(1)}%` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              전환율 (CVR)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">테스트 모드</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              variant={testMode ? "destructive" : "default"}
              size="sm"
              onClick={() => setTestMode(!testMode)}
              className="w-full"
            >
              {testMode ? (
                <>
                  <Pause className="h-3 w-3 mr-1" />
                  중지
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  시작
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">성과 분석</TabsTrigger>
          <TabsTrigger value="testing">테스트 도구</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>종합 성과 대시보드</CardTitle>
              <CardDescription>실시간 팝업 성과 지표 및 A/B 테스트 결과</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">CEO 보장자산 팝업</h4>
                  <div className="space-y-1 text-sm">
                    <div>CTR: 8.0% (우수)</div>
                    <div>총 노출: 1,245회</div>
                    <div>클릭: 98회</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">뉴스레터 팝업</h4>
                  <div className="space-y-1 text-sm">
                    <div>CVR: 11.7% (우수)</div>
                    <div>총 노출: 890회</div>
                    <div>구독: 104회</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>팝업 테스트</CardTitle>
                <CardDescription>
                  개발 환경에서 팝업 동작을 테스트할 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">CEO 보장자산 팝업</h4>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => console.log('CEO 팝업 표시')}
                    >
                      표시
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => console.log('CEO 팝업 숨기기')}
                    >
                      숨기기
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => console.log('CEO 팝업 영구 제거')}
                    >
                      영구 제거
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">뉴스레터 팝업</h4>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => console.log('뉴스레터 팝업 표시')}
                    >
                      표시
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => console.log('뉴스레터 팝업 숨기기')}
                    >
                      숨기기
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => console.log('뉴스레터 팝업 영구 제거')}
                    >
                      영구 제거
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    로컬 데이터 초기화
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B 테스트 시뮬레이션</CardTitle>
                <CardDescription>
                  다양한 변형의 팝업을 테스트해볼 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">CEO 팝업 변형</h4>
                  <div className="space-y-2">
                    {['conservative', 'urgent', 'premium'].map(variant => (
                      <Button
                        key={variant}
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          localStorage.setItem('ab_test_ceo_protection_asset', variant);
                          console.log('CEO 팝업 A/B 테스트:', variant);
                        }}
                      >
                        {variant === 'conservative' && '보수적 버전'}
                        {variant === 'urgent' && '긴급 버전'}
                        {variant === 'premium' && '프리미엄 버전'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">뉴스레터 팝업 변형</h4>
                  <div className="space-y-2">
                    {['information_focused', 'community_focused', 'exclusivity_focused'].map(variant => (
                      <Button
                        key={variant}
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          localStorage.setItem('ab_test_newsletter_signup_2024', variant);
                          console.log('뉴스레터 팝업 A/B 테스트:', variant);
                        }}
                      >
                        {variant === 'information_focused' && '정보 중심'}
                        {variant === 'community_focused' && '커뮤니티 중심'}
                        {variant === 'exclusivity_focused' && '독점성 중심'}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>시스템 설정</CardTitle>
                <CardDescription>
                  팝업 시스템의 전반적인 동작을 제어합니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">캠페인 상태</label>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="default"
                    >
                      무기한 활성
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Until Further Notice
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">현재 사용자 세그먼트</label>
                  <Badge variant="outline" className="w-fit">
                    engaged
                  </Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">디버그 모드</label>
                  <div className="text-sm text-muted-foreground">
                    {process.env.NODE_ENV === 'development' ? '개발 환경 - 활성화됨' : '프로덕션 환경 - 비활성화됨'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>성과 임계값</CardTitle>
                <CardDescription>
                  각 지표별 성과 기준값을 확인할 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>클릭률 (CTR)</span>
                    <div className="space-x-2">
                      <span className="text-green-600">우수: 8.5%+</span>
                      <span className="text-yellow-600">양호: 5.0%+</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>전환율 (CVR)</span>
                    <div className="space-x-2">
                      <span className="text-green-600">우수: 12.0%+</span>
                      <span className="text-yellow-600">양호: 8.0%+</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>이탈률 영향</span>
                    <div className="space-x-2">
                      <span className="text-green-600">양호: 5%↓</span>
                      <span className="text-yellow-600">주의: 15%↓</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>반응 시간</span>
                    <div className="space-x-2">
                      <span className="text-green-600">우수: 8초↓</span>
                      <span className="text-yellow-600">양호: 15초↓</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>SuperClaude Framework v2.1</span>
              <Badge variant="outline">AgentOS 최적화</Badge>
              <Badge variant="outline">BMAD Method</Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">무기한 운영</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>실시간 업데이트</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}