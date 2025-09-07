import {
  FileText,
  Search,
  Globe,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Cpu,
  Building,
  Scale,
  Briefcase,
  Play,
  Headphones,
  ChevronRight,
  Brain,
  Zap,
  Network,
  Bot,
  Settings,
  Layers,
  Code,
  Database,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Lightbulb,
  Rocket,
  Shield,
} from 'lucide-react';

import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 기반 시장 인텔리전스 - BMAD × SuperClaude × AgentOS 전문가 플랫폼',
  description: 'BMAD Method, SuperClaude AI, AgentOS 시스템, Sub Agent 기반 전문가 인사이트. 4개 플랫폼을 통한 차세대 자산관리 및 핀테크 전략 분석.',
  keywords: 'BMAD Method, SuperClaude, AgentOS, Sub Agent, AI 자산관리, 핀테크 전략, 시장 분석, 전문가 플랫폼',
};

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogCategories } from '@/lib/blog-data';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { BlogCategoryFilter, BlogCategoryFilterSkeleton } from '@/components/blog-category-filter';
import { BlogContent } from '@/components/blog-content';
import { YouTubeThumbnail } from '@/components/media/youtube-thumbnail';
import { SpotifyEmbed } from '@/components/media/spotify-embed';

// Expert Insight Platform Categories
const expertPlatforms = [
  {
    id: 'bmad',
    name: 'BMAD Method',
    subtitle: '비즈니스 모델 분석 & 의사결정 프레임워크',
    description: '체계적 시장 분석과 데이터 기반 의사결정을 통한 전략적 자산관리',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    platformUrl: 'https://contents.premium.naver.com/familyoffice/fo',
    badges: ['전략 분석', '의사결정 프레임워크', '시장 인텔리전스'],
    keyInsights: ['BMAD 방법론 기반 포트폴리오 분석', 'AI 기반 위험 평가 모델', '차세대 투자 전략 설계']
  },
  {
    id: 'superclaude',
    name: 'SuperClaude AI',
    subtitle: 'AI 기반 금융 분석 & 자동화 솔루션',
    description: 'SuperClaude 프레임워크를 활용한 지능형 자산관리 및 핀테크 혁신',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    platformUrl: 'https://jaehong.substack.com',
    badges: ['AI 자동화', '핀테크 혁신', '지능형 분석'],
    keyInsights: ['Claude Code 기반 금융 자동화', 'MCP 서버 활용 투자 분석', '차세대 AI 자산관리']
  },
  {
    id: 'agentos',
    name: 'AgentOS',
    subtitle: '분산 시스템 아키텍처 & 플랫폼 전략',
    description: 'AgentOS 생태계를 통한 확장 가능한 자산관리 플랫폼 구축 - 마이크로서비스 아키텍처와 AI 에이전트 오케스트레이션',
    icon: Network,
    color: 'from-green-500 to-green-600',
    platformUrl: 'https://blog.naver.com/lim_jaehong',
    badges: ['시스템 아키텍처', '마이크로서비스', '플랫폼 확장성', 'AI 오케스트레이션', '생태계 전략'],
    keyInsights: [
      'AgentOS 기반 분산 자산관리 시스템 - 실시간 포트폴리오 분석',
      '확장 가능한 마이크로서비스 플랫폼 설계 - 컨테이너화된 금융 서비스',
      'AI 에이전트 네트워크를 통한 오픈 생태계 구축 - 협업형 투자 전략',
      '클라우드 네이티브 아키텍처 - 무한 확장 가능한 인프라',
      'Event-Driven Architecture - 실시간 시장 데이터 처리',
      'GraphQL Federation - 통합된 데이터 레이어 구축'
    ]
  },
  {
    id: 'subagent',
    name: 'Sub Agent',
    subtitle: '전문 영역별 세분화 & 특화 솔루션',
    description: '도메인별 전문 에이전트를 통한 맞춤형 자산관리 및 컨설팅 - Architect, Frontend, Backend, Security, Performance 등 11개 전문 페르소나',
    icon: Bot,
    color: 'from-amber-500 to-amber-600',
    platformUrl: 'https://brunch.co.kr/@familyoffice',
    badges: ['도메인 특화', '11개 전문 페르소나', '맞춤형 솔루션', '전문 컨설팅', '다중 에이전트'],
    keyInsights: [
      'Architect Agent - 시스템 설계 및 장기 아키텍처 전략',
      'Frontend Agent - UX 최적화 및 사용자 중심 자산관리 인터페이스',
      'Backend Agent - 안정성 및 보안 중심의 서버사이드 금융 시스템',
      'Security Agent - 위협 모델링 및 컴플라이언스 전문 분석',
      'Performance Agent - 포트폴리오 최적화 및 성과 분석',
      'Analyzer Agent - 근본 원인 분석 및 투자 패턴 발견',
      'QA Agent - 품질 보증 및 리스크 검증 시스템',
      'DevOps Agent - 인프라 자동화 및 배포 전략',
      'Mentor Agent - 교육 및 지식 전수 전문가',
      'Scribe Agent - 전문 문서화 및 다국어 현지화'
    ]
  }
];

export default function AIMarketIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Header />
      <main className="pt-20">
        {/* Hero Section - AI Expert Platform */}
        <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-slide-up">
              <Badge variant="outline" size="lg" className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <Brain className="w-4 h-4 mr-2" />
                AI × Expert Intelligence Platform
              </Badge>
            </div>
            
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 animate-slide-up">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 bg-clip-text text-transparent">
                차세대 AI 기반
              </span>
              <br />
              <span className="text-foreground">전문가 인사이트 플랫폼</span>
            </h1>
            
            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              <strong>BMAD Method</strong>, <strong>SuperClaude AI</strong>, <strong>AgentOS</strong>, <strong>Sub Agent</strong><br/>
              4개 전문가 플랫폼을 통한 체계적 자산관리 및 핀테크 전략 분석
            </p>

            {/* Platform Quick Navigation */}
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              {expertPlatforms.map((platform, index) => (
                <Link
                  key={platform.id}
                  href={`#${platform.id}`}
                  className="group relative p-4 rounded-lg bg-background/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`}></div>
                  <platform.icon className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {platform.name}
                  </div>
                </Link>
              ))}
            </div>

            <div
              className="max-w-lg mx-auto animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="flex">
                <Input
                  placeholder="AI 인사이트 통합 검색..."
                  className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50"
                />
                <Button className="ml-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Platform Sections */}
        {expertPlatforms.map((platform, index) => (
          <section 
            key={platform.id} 
            id={platform.id}
            className={`section relative ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Platform Header */}
              <div className="text-center mb-16">
                <div className="animate-slide-up">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} mb-6`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
                  <span className={`bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                    {platform.name}
                  </span>
                </h2>
                
                <h3 className="text-xl md:text-2xl text-muted-foreground font-medium mb-6 animate-slide-up">
                  {platform.subtitle}
                </h3>
                
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
                  {platform.description}
                </p>

                {/* Platform Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up">
                  {platform.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className="bg-background/50">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Insights Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {platform.keyInsights.map((insight, insightIndex) => (
                  <Card 
                    key={insightIndex}
                    className="animate-slide-up group hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${insightIndex * 100 + 200}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Lightbulb className={`w-5 h-5 text-gradient-to-r ${platform.color} group-hover:scale-110 transition-transform`} />
                        <Badge variant="secondary" size="xs">
                          핵심 인사이트 {insightIndex + 1}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground font-medium">{insight}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Platform Access Card */}
              <div className="max-w-4xl mx-auto">
                <Card className={`overflow-hidden border-2 border-transparent bg-gradient-to-r ${platform.color} p-[1px] animate-slide-up`}>
                  <div className="bg-background rounded-lg p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h4 className="text-2xl font-bold mb-4">
                          {platform.name} 플랫폼 접속
                        </h4>
                        <p className="text-muted-foreground mb-6">
                          전문가 수준의 {platform.name} 인사이트와 분석을 확인하세요. 
                          실시간 업데이트되는 콘텐츠와 독점 전략을 만나보실 수 있습니다.
                        </p>
                        <div className="flex gap-3">
                          <Button 
                            asChild 
                            className={`bg-gradient-to-r ${platform.color} hover:opacity-90`}
                          >
                            <Link 
                              href={platform.platformUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              플랫폼 바로가기
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="#blog-content" className="inline-flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              관련 포스트 보기
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-20 rounded-lg blur-xl`}></div>
                        <div className="relative bg-muted/50 rounded-lg p-6 text-center">
                          <platform.icon className={`w-16 h-16 mx-auto mb-4 text-gradient-to-r ${platform.color}`} />
                          <p className="text-sm text-muted-foreground font-medium">
                            전문가 인사이트 플랫폼
                          </p>
                          <p className="text-xs text-muted-foreground">
                            실시간 업데이트 | 독점 콘텐츠
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        ))}

        {/* Featured Media Content - Enhanced */}
        <section className="section bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" size="lg" className="mb-6">
                <Play className="w-4 h-4 mr-2" />
                멀티미디어 전문가 콘텐츠
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-up">
                영상 & 오디오로 만나는 
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 bg-clip-text text-transparent">
                  AI 기반 전문가 인사이트
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed">
                전문가가 직접 설명하는 BMAD, SuperClaude, AgentOS, Sub Agent 활용법과 
                실전 자산관리 전략을 영상과 팟캐스트로 만나보세요
              </p>
            </div>

            <Tabs defaultValue="video" className="w-full animate-slide-up">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-muted/50">
                <TabsTrigger value="video" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10">
                  <Play className="h-4 w-4" />
                  AI 분석 비디오
                </TabsTrigger>
                <TabsTrigger value="podcast" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10">
                  <Headphones className="h-4 w-4" />
                  전문가 팟캐스트
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <YouTubeThumbnail
                        videoId="0FCO9TQBok0"
                        title="BMAD Method: AI 기반 위험 평가 모델"
                        className="w-full mb-4"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-blue-600">
                          BMAD Method
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3">숨겨진 지뢰, 미처분이익잉여금</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        BMAD 방법론을 활용한 비상장기업의 숨겨진 위험 요소 분석. SuperClaude AI와 연계된 
                        지능형 위험 평가 모델을 통해 이익잉여금 관리 전략을 제시합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">BMAD 분석</Badge>
                        <Badge variant="secondary" size="sm">AI 위험평가</Badge>
                        <Badge variant="secondary" size="sm">세무전략</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <YouTubeThumbnail
                        videoId="XCB4ys-IU4s"
                        title="AgentOS 플랫폼: 확장가능한 자산관리 시스템"
                        className="w-full mb-4"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-gradient-to-r from-green-500 to-green-600">
                          AgentOS
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3">AgentOS 기반 자산관리 플랫폼</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        AgentOS 생태계를 활용한 확장 가능한 자산관리 시스템 구축 방법론. 
                        Sub Agent들과의 연계를 통한 개인화된 투자 전략을 실전 사례로 설명합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">플랫폼 설계</Badge>
                        <Badge variant="secondary" size="sm">시스템 확장성</Badge>
                        <Badge variant="secondary" size="sm">개인화 전략</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary via-purple-600 to-green-600 hover:opacity-90" asChild>
                    <Link 
                      href="https://youtube.com/@FamilyOffice-S" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Rocket className="w-5 h-5" />
                      AI 전문가 채널 구독
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="podcast" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-purple-600">
                          SuperClaude AI
                        </Badge>
                        <Badge variant="outline" size="sm">EP.1</Badge>
                      </div>
                      <SpotifyEmbed
                        uri="spotify:episode:3oWSt9SMetN4Zw3NXFL36H"
                        title="SuperClaude 기반 자동화된 자산관리 전략"
                        className="w-full rounded-lg overflow-hidden mb-4"
                      />
                      <h4 className="text-lg font-semibold mb-3">SuperClaude AI 자산관리 혁신</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        Claude Code와 MCP 서버를 활용한 지능형 자산관리 자동화 시스템. 
                        BMAD Method와 연계된 AI 기반 투자 분석 및 포트폴리오 최적화 전략을 상세히 다룹니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">AI 자동화</Badge>
                        <Badge variant="secondary" size="sm">MCP 서버</Badge>
                        <Badge variant="secondary" size="sm">포트폴리오 최적화</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-amber-600">
                          Sub Agent
                        </Badge>
                        <Badge variant="outline" size="sm">EP.2</Badge>
                      </div>
                      <SpotifyEmbed
                        uri="spotify:episode:6GdSlo5AkFiYB4G5Sib1xJ"
                        title="Sub Agent 전문화: 도메인별 맞춤 컨설팅"
                        className="w-full rounded-lg overflow-hidden mb-4"
                      />
                      <h4 className="text-lg font-semibold mb-3">Sub Agent 전문 영역별 세분화</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        CEO 보장정기보험과 퇴직금 플랜을 중심으로 한 Sub Agent 전문화 전략. 
                        각 도메인별 특화된 에이전트들의 협업을 통한 통합 솔루션 제공 방법론을 설명합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">도메인 특화</Badge>
                        <Badge variant="secondary" size="sm">전문 컨설팅</Badge>
                        <Badge variant="secondary" size="sm">통합 솔루션</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary via-purple-600 to-green-600 hover:opacity-90" asChild>
                    <Link 
                      href="https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Headphones className="w-5 h-5" />
                      AI 전문가 팟캐스트 구독
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* AI-Powered Blog Content with Platform Integration */}
        <section id="blog-content" className="section bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" size="lg" className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
                <Bot className="w-4 h-4 mr-2" />
                AI 통합 컨텐츠 플랫폼
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 bg-clip-text text-transparent">
                  4개 플랫폼 통합
                </span>
                <br />
                전문가 인사이트 아카이브
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto animate-slide-up leading-relaxed mb-8">
                <strong>네이버 프리미엄</strong>, <strong>Substack</strong>, <strong>브런치</strong>, <strong>네이버 블로그</strong><br/>
                4개 플랫폼을 통해 배포되는 전문가 수준의 AI 기반 자산관리 콘텐츠
              </p>

              {/* Enhanced Category Filter */}
              <div className="animate-slide-up mb-12">
                <Suspense fallback={<BlogCategoryFilterSkeleton />}>
                  <BlogCategoryFilter />
                </Suspense>
              </div>
            </div>

            {/* Platform Integration Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {expertPlatforms.map((platform, index) => (
                <Card 
                  key={platform.id}
                  className="text-center group hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {platform.subtitle}
                    </p>
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <Link href={platform.platformUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        바로가기
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Suspense fallback={
              <div className="text-center py-16">
                <div className="animate-pulse space-y-8">
                  <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-96 bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <BlogContent className="animate-slide-up" />
            </Suspense>
          </div>
        </section>

        {/* AI Newsletter Signup - Enhanced */}
        <section className="section bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI 전문가 인사이트 뉴스레터</h3>
                  <p className="text-muted-foreground">
                    BMAD, SuperClaude, AgentOS, Sub Agent 최신 업데이트와 전문가 분석을 매주 받아보세요
                  </p>
                </div>
                <NewsletterSubscription 
                  source="ai-expert-platform" 
                  variant="inline"
                  className="animate-slide-up max-w-md mx-auto"
                />
                <div className="flex justify-center gap-2 mt-6">
                  <Badge variant="outline" size="sm">AI 자동화 트렌드</Badge>
                  <Badge variant="outline" size="sm">전문가 독점 인사이트</Badge>
                  <Badge variant="outline" size="sm">실전 활용 가이드</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Media Content */}
        <section className="section bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-up">
                전문가 미디어 콘텐츠
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '200ms' }}>
                영상과 팟캐스트로 만나는 패밀리오피스와 자산관리 전문 인사이트
              </p>
            </div>

            <Tabs defaultValue="video" className="w-full animate-slide-up" style={{ animationDelay: '400ms' }}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  비디오 콘텐츠
                </TabsTrigger>
                <TabsTrigger value="podcast" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  팟캐스트
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <YouTubeThumbnail
                      videoId="0FCO9TQBok0"
                      title="숨겨진 지뢰, 미처분이익잉여금"
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      비상장기업의 &lsquo;숨겨진 지뢰&rsquo; 미처분이익잉여금. 성공의 결과물이자 심각한 재무적 위험을 초래할 수 있는 이익잉여금의 올바른 관리 방법과 세금 폭탄 방지 전략을 전문가가 상세히 분석합니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">미처분이익잉여금</Badge>
                      <Badge variant="secondary">상속증여세</Badge>
                      <Badge variant="secondary">세무조사</Badge>
                    </div>
                  </div>
                  <div>
                    <YouTubeThumbnail
                      videoId="XCB4ys-IU4s"
                      title="기업 자산관리 핵심 전략"
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      중견기업 CEO를 위한 자산관리 핵심 전략과 실무 가이드. 기업과 개인 자산의 균형잡힌 관리를 통해 장기적인 재무 안정성을 확보하는 방법을 상세히 알아봅니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">자산관리</Badge>
                      <Badge variant="secondary">재무전략</Badge>
                      <Badge variant="secondary">CEO가이드</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link 
                      href="https://youtube.com/@FamilyOffice-S" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      전체 비디오 보기
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="podcast" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <SpotifyEmbed
                      uri="spotify:episode:3oWSt9SMetN4Zw3NXFL36H"
                      title="패밀리오피스 자산관리 핵심 전략"
                      className="w-full rounded-lg overflow-hidden mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      패밀리오피스 전문가가 직접 들려주는 자산관리와 기업승계의 핵심 인사이트. 실무진이 꼭 알아야 할 세무 최적화 전략과 성공한 기업가들의 자산관리 노하우를 상세히 다룹니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">패밀리오피스</Badge>
                      <Badge variant="secondary">자산관리</Badge>
                      <Badge variant="secondary">기업승계</Badge>
                    </div>
                  </div>
                  <div>
                    <SpotifyEmbed
                      uri="spotify:episode:6GdSlo5AkFiYB4G5Sib1xJ"
                      title="CEO 보장정기보험과 퇴직금 플랜 완벽 가이드"
                      className="w-full rounded-lg overflow-hidden mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      CEO의 유고 리스크와 상속세 대비를 위한 보장정기보험의 활용법을 상세히 분석합니다. 법인세 절감과 퇴직소득 인정을 위한 CEO Plan의 정관 정비, 세무 처리, 그리고 2020년 개정된 임원 퇴직소득 한도까지 전문가가 체계적으로 해설합니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">CEO보장보험</Badge>
                      <Badge variant="secondary">퇴직금플랜</Badge>
                      <Badge variant="secondary">법인세절감</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link 
                      href="https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      전체 에피소드 듣기
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Blog Content with Category Support */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={
              <div className="text-center py-12">
                <div className="animate-pulse space-y-8">
                  <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-96 bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <BlogContent className="animate-slide-up" />
            </Suspense>
          </div>
        </section>

        {/* Weekly Brief Signup */}
        <section className="section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterSubscription 
              source="blog-page" 
              variant="default"
              className="animate-slide-up"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
