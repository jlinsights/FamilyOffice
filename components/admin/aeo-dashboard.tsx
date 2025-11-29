'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  MessageSquare, 
  Mic, 
  Target,
  Zap,
  TrendingUp,
  Bot,
  Search,
  Volume2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';

interface AEOMetrics {
  answerCoverage: {
    totalQueries: number;
    answeredQueries: number;
    coverage: number;
  };
  voiceSearch: {
    optimizedQuestions: number;
    naturalLanguageQueries: number;
    voiceReadiness: number;
  };
  aiEngines: {
    chatgpt: { optimized: boolean; score: number; };
    claude: { optimized: boolean; score: number; };
    bard: { optimized: boolean; score: number; };
    hyperclova: { optimized: boolean; score: number; };
    perplexity: { optimized: boolean; score: number; };
  };
  conversationalQueries: {
    identified: number;
    optimized: number;
    businessValue: { high: number; medium: number; low: number; };
  };
  structuredAnswers: {
    templates: number;
    accuracy: number;
    freshness: number;
  };
}

export function AEODashboard() {
  const [metrics, setMetrics] = useState<AEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // 모의 AEO 데이터 (실제로는 API에서 가져옴)
    const mockData: AEOMetrics = {
      answerCoverage: {
        totalQueries: 156,
        answeredQueries: 142,
        coverage: 91
      },
      voiceSearch: {
        optimizedQuestions: 45,
        naturalLanguageQueries: 67,
        voiceReadiness: 88
      },
      aiEngines: {
        chatgpt: { optimized: true, score: 94 },
        claude: { optimized: true, score: 91 },
        bard: { optimized: true, score: 87 },
        hyperclova: { optimized: true, score: 89 },
        perplexity: { optimized: false, score: 76 }
      },
      conversationalQueries: {
        identified: 89,
        optimized: 76,
        businessValue: { high: 34, medium: 28, low: 14 }
      },
      structuredAnswers: {
        templates: 28,
        accuracy: 94,
        freshness: 87
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
          <p>AEO 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const getAIEngineIcon = (engine: string) => {
    switch (engine) {
      case 'chatgpt': return '🤖';
      case 'claude': return '🧠';
      case 'bard': return '🎭';
      case 'hyperclova': return '🇰🇷';
      case 'perplexity': return '🔍';
      default: return '🤖';
    }
  };

  const getEngineDisplayName = (engine: string) => {
    switch (engine) {
      case 'chatgpt': return 'ChatGPT';
      case 'claude': return 'Claude';
      case 'bard': return 'Bard';
      case 'hyperclova': return 'HyperCLOVA';
      case 'perplexity': return 'Perplexity';
      default: return engine;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AEO 성과 대시보드</h1>
          <p className="text-muted-foreground mt-2">
            Answer Engine Optimization - AI 검색엔진 & 음성검색 최적화
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" />
            AI 학습 데이터 업데이트
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            AEO 보고서 생성
          </Button>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">답변 커버리지</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.answerCoverage.coverage}%
            </div>
            <div className="flex items-center text-xs text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              {metrics.answerCoverage.answeredQueries}/{metrics.answerCoverage.totalQueries} 질의 대응
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">음성 검색 준비도</CardTitle>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.voiceSearch.voiceReadiness}%
            </div>
            <div className="flex items-center text-xs text-blue-600">
              <Mic className="h-3 w-3 mr-1" />
              {metrics.voiceSearch.optimizedQuestions}개 음성 최적화
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI 엔진 호환성</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(metrics.aiEngines).filter(e => e.optimized).length}/5
            </div>
            <div className="flex items-center text-xs text-purple-600">
              <Brain className="h-3 w-3 mr-1" />
              주요 AI 엔진 최적화 완료
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">답변 정확도</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.structuredAnswers.accuracy}%
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              구조화된 답변 품질
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="voice">음성 검색</TabsTrigger>
          <TabsTrigger value="ai-engines">AI 엔진</TabsTrigger>
          <TabsTrigger value="answers">구조화 답변</TabsTrigger>
          <TabsTrigger value="optimization">최적화</TabsTrigger>
        </TabsList>

        {/* 전체 개요 탭 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AEO 점수 차트 */}
            <Card>
              <CardHeader>
                <CardTitle>AEO 종합 점수</CardTitle>
                <CardDescription>Answer Engine Optimization 성과 분석</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">답변 커버리지</span>
                    <span className="text-sm font-medium">91/100</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">음성 검색 준비도</span>
                    <span className="text-sm font-medium">88/100</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">대화형 질의 대응</span>
                    <span className="text-sm font-medium">85/100</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI 엔진 최적화</span>
                    <span className="text-sm font-medium">89/100</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 대화형 질의 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>대화형 질의 현황</CardTitle>
                <CardDescription>사용자의 자연어 질문 패턴 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">고가치 질의</p>
                        <p className="text-sm text-green-700">{metrics.conversationalQueries.businessValue.high}개</p>
                      </div>
                    </div>
                    <Badge variant="secondary">우선 최적화</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">중간가치 질의</p>
                        <p className="text-sm text-blue-700">{metrics.conversationalQueries.businessValue.medium}개</p>
                      </div>
                    </div>
                    <Badge variant="outline">단계적 개선</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">저가치 질의</p>
                        <p className="text-sm text-gray-700">{metrics.conversationalQueries.businessValue.low}개</p>
                      </div>
                    </div>
                    <Badge variant="outline">자동화 대응</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 음성 검색 탭 */}
        <TabsContent value="voice">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>음성 검색 최적화 현황</CardTitle>
                <CardDescription>스마트 스피커 및 모바일 음성검색 대응</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">자연어 질문 형식</span>
                    <span className="text-sm font-medium">{metrics.voiceSearch.naturalLanguageQueries}개</span>
                  </div>
                  <Progress value={(metrics.voiceSearch.naturalLanguageQueries / 100) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">음성 최적화 답변</span>
                    <span className="text-sm font-medium">{metrics.voiceSearch.optimizedQuestions}개</span>
                  </div>
                  <Progress value={(metrics.voiceSearch.optimizedQuestions / 67) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">전체 준비도</span>
                    <span className="text-sm font-medium">{metrics.voiceSearch.voiceReadiness}%</span>
                  </div>
                  <Progress value={metrics.voiceSearch.voiceReadiness} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>자주 묻는 음성 질문</CardTitle>
                <CardDescription>실제 사용자 음성 검색 쿼리</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    '우리 회사 가업승계 어떻게 준비해야 해?',
                    '중소기업 절세 방법 좀 알려줘',
                    '패밀리오피스 서비스 비용이 얼마나 들어?',
                    '정책자금 어디서 신청할 수 있나?',
                    '경영인정기보험이 정말 절세에 도움돼?'
                  ].map((question, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        <Mic className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{question}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {index < 2 ? '완전 최적화' : index < 4 ? '부분 최적화' : '최적화 필요'}
                          </Badge>
                          {index < 2 && <CheckCircle className="h-3 w-3 text-green-600" />}
                          {index >= 4 && <AlertCircle className="h-3 w-3 text-orange-600" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI 엔진 탭 */}
        <TabsContent value="ai-engines">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 엔진별 최적화 현황</CardTitle>
                <CardDescription>주요 AI 검색엔진 호환성 및 성과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(metrics.aiEngines).map(([engine, data]) => (
                    <div key={engine} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getAIEngineIcon(engine)}</span>
                          <span className="font-medium">{getEngineDisplayName(engine)}</span>
                        </div>
                        {data.optimized ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>최적화 점수</span>
                          <span className="font-medium">{data.score}%</span>
                        </div>
                        <Progress value={data.score} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {data.optimized ? '완전 최적화' : '추가 최적화 필요'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI 엔진별 답변 형식 최적화</CardTitle>
                <CardDescription>각 엔진의 선호 형식에 맞춘 콘텐츠 구조</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      engine: 'ChatGPT',
                      format: '대화형 전문가 조언',
                      features: ['전문용어 설명', '단계별 실행방안', '추가 질문 유도'],
                      status: 'optimized'
                    },
                    {
                      engine: 'Claude',
                      format: '체계적 분석 리포트',
                      features: ['구조화된 설명', '관련 고려사항', '전문가 검토 권장'],
                      status: 'optimized'
                    },
                    {
                      engine: 'HyperCLOVA',
                      format: '한국형 비즈니스 컨설팅',
                      features: ['한국 세법 기준', '국내 기관 정보', '정부 정책 연계'],
                      status: 'optimized'
                    },
                    {
                      engine: 'Perplexity',
                      format: '리서치 기반 분석',
                      features: ['최신 정보 인용', '다양한 출처 종합', '데이터 기반 분석'],
                      status: 'partial'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{item.engine}</h3>
                          <Badge variant={item.status === 'optimized' ? 'default' : 'secondary'}>
                            {item.status === 'optimized' ? '최적화 완료' : '부분 최적화'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.format}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.features.map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 구조화 답변 탭 */}
        <TabsContent value="answers">
          <Card>
            <CardHeader>
              <CardTitle>구조화된 답변 관리</CardTitle>
              <CardDescription>AI가 이해하기 쉬운 형식의 답변 템플릿</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{metrics.structuredAnswers.templates}</div>
                    <div className="text-sm text-muted-foreground">답변 템플릿</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{metrics.structuredAnswers.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">정확도</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metrics.structuredAnswers.freshness}%</div>
                    <div className="text-sm text-muted-foreground">최신성</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      pattern: '{업종} {규모}기업 가업승계 방법',
                      example: '제조업 중견기업 가업승계 방법',
                      accuracy: 96,
                      lastUpdated: '2024-12-20'
                    },
                    {
                      pattern: '{지역} 정책자금 신청 방법',
                      example: '경기도 정책자금 신청 방법',
                      accuracy: 94,
                      lastUpdated: '2024-12-18'
                    },
                    {
                      pattern: 'CEO 절세 방법 {업종}',
                      example: 'CEO 절세 방법 IT업종',
                      accuracy: 92,
                      lastUpdated: '2024-12-15'
                    },
                    {
                      pattern: '{자산규모} 패밀리오피스 서비스',
                      example: '100억 패밀리오피스 서비스',
                      accuracy: 89,
                      lastUpdated: '2024-12-12'
                    }
                  ].map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-grow">
                        <div className="font-medium mb-1">{template.pattern}</div>
                        <div className="text-sm text-muted-foreground">{template.example}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{template.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">{template.lastUpdated}</div>
                        </div>
                        <Badge variant={template.accuracy >= 95 ? 'default' : template.accuracy >= 90 ? 'secondary' : 'outline'}>
                          {template.accuracy >= 95 ? '우수' : template.accuracy >= 90 ? '양호' : '개선필요'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 최적화 탭 */}
        <TabsContent value="optimization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AEO 최적화 제안</CardTitle>
                <CardDescription>AI 엔진 성능 향상을 위한 자동 제안</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      priority: 'high',
                      title: 'Perplexity 엔진 최적화',
                      description: '리서치 기반 답변 형식으로 콘텐츠 재구성',
                      expectedImpact: '+15% AI 엔진 호환성',
                      effort: 'medium'
                    },
                    {
                      priority: 'medium',
                      title: '음성 검색 자연어 확장',
                      description: '더 많은 대화형 질문 패턴 추가',
                      expectedImpact: '+12% 음성 검색 트래픽',
                      effort: 'low'
                    },
                    {
                      priority: 'medium',
                      title: '구조화 답변 템플릿 확장',
                      description: '업종별 특화 답변 템플릿 추가',
                      expectedImpact: '+8% 답변 정확도',
                      effort: 'high'
                    },
                    {
                      priority: 'low',
                      title: 'FAQ 자동 변환 시스템',
                      description: '기존 FAQ를 AEO 형식으로 자동 변환',
                      expectedImpact: '+5% 운영 효율성',
                      effort: 'medium'
                    }
                  ].map((suggestion, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      suggestion.priority === 'high' ? 'border-red-400 bg-red-50' :
                      suggestion.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                      'border-blue-400 bg-blue-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium mb-1">{suggestion.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="font-medium text-green-600">{suggestion.expectedImpact}</span>
                            <Badge variant="outline">{suggestion.effort === 'low' ? '낮음' : suggestion.effort === 'medium' ? '보통' : '높음'} 노력</Badge>
                          </div>
                        </div>
                        <Badge variant={
                          suggestion.priority === 'high' ? 'destructive' :
                          suggestion.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {suggestion.priority === 'high' ? '높음' : suggestion.priority === 'medium' ? '보통' : '낮음'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>실행 중인 최적화</CardTitle>
                <CardDescription>현재 진행 중인 AEO 개선 작업</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      task: '대화형 질의 답변 생성',
                      progress: 75,
                      eta: '2시간 후 완료',
                      status: 'active'
                    },
                    {
                      task: 'AI 엔진 최적화 검증',
                      progress: 45,
                      eta: '1일 후 완료',
                      status: 'active'
                    },
                    {
                      task: '음성 검색 키워드 분석',
                      progress: 100,
                      eta: '완료',
                      status: 'completed'
                    },
                    {
                      task: '구조화 답변 템플릿 업데이트',
                      progress: 30,
                      eta: '3일 후 완료',
                      status: 'scheduled'
                    }
                  ].map((task, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.task}</span>
                        <span className="text-xs text-muted-foreground">{task.eta}</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span>{task.progress}% 완료</span>
                        <Badge variant={
                          task.status === 'completed' ? 'default' :
                          task.status === 'active' ? 'secondary' : 'outline'
                        }>
                          {task.status === 'completed' ? '완료' :
                           task.status === 'active' ? '진행중' : '대기중'}
                        </Badge>
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