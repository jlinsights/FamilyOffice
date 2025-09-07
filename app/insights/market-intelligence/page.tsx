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
  title: '시장 인텔리전스 플랫폼 - 전문가 인사이트 & 자산관리 전략',
  description: '네이버 프리미엄, Substack, 네이버 블로그, 브런치스토리를 통한 전문가 인사이트. 4개 플랫폼 통합 자산관리 및 핀테크 전략 분석.',
  keywords: '시장 인텔리전스, 자산관리 전략, 전문가 인사이트, 네이버 프리미엄, Substack, 브런치스토리, 투자 분석',
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

// Market Intelligence Platform Categories
const contentPlatforms = [
  {
    id: 'naver-premium',
    name: '네이버 프리미엄',
    subtitle: '프리미엄 전문 컨텐츠 & 심화 전략 가이드',
    description: '네이버 프리미엄 콘텐츠를 통한 체계적 시장 분석과 데이터 기반 의사결정 전략적 자산관리',
    icon: Building,
    color: 'from-green-500 to-green-600',
    platformUrl: 'https://contents.premium.naver.com/familyoffice/fo',
    badges: ['프리미엄 콘텐츠', '전략 분석', '의사결정 프레임워크', '시장 인텔리전스'],
    keyInsights: ['전문가 수준의 포트폴리오 분석', '데이터 기반 위험 평가 모델', '차세대 투자 전략 설계']
  },
  {
    id: 'substack',
    name: 'Substack',
    subtitle: '글로벌 인사이트 & 핀테크 혁신 분석',
    description: 'Substack 플랫폼을 통한 지능형 자산관리 및 글로벌 핀테크 트렌드 분석',
    icon: Globe,
    color: 'from-orange-500 to-orange-600',
    platformUrl: 'https://jaehong.substack.com',
    badges: ['글로벌 인사이트', '핀테크 혁신', '지능형 분석', '국제 투자'],
    keyInsights: ['글로벌 금융 트렌드 분석', '해외 투자 전략 및 기회 발굴', '차세대 자산관리 솔루션']
  },
  {
    id: 'naver-blog',
    name: '네이버 블로그',
    subtitle: '실전 투자 가이드 & 플랫폼 전략',
    description: '네이버 블로그를 통한 확장 가능한 자산관리 시스템 구축 및 실전 투자 전략',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    platformUrl: 'https://blog.naver.com/lim_jaehong',
    badges: ['실전 가이드', '투자 전략', '플랫폼 분석', '시스템 구축', '실무 적용'],
    keyInsights: [
      '분산 투자 시스템 - 실시간 포트폴리오 분석',
      '확장 가능한 투자 플랫폼 설계 - 개인화된 금융 서비스',
      '투자자 네트워크를 통한 정보 공유 생태계 구축',
      '클라우드 기반 자산관리 - 무한 확장 가능한 인프라',
      '실시간 시장 데이터 처리 및 분석',
      '통합된 투자 정보 시스템 구축'
    ]
  },
  {
    id: 'brunch',
    name: '브런치스토리',
    subtitle: '전문 영역별 세분화 & 특화 인사이트',
    description: '브런치스토리를 통한 도메인별 전문 분석 및 맞춤형 자산관리 컨설팅',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    platformUrl: 'https://brunch.co.kr/@familyoffice',
    badges: ['도메인 특화', '전문 분석', '맞춤형 솔루션', '개인 컨설팅', '세분화 전략'],
    keyInsights: [
      '자산관리 전략 - 체계적 설계 및 장기 전략 수립',
      'UX 중심의 투자 플랫폼 - 사용자 친화적 자산관리 인터페이스',
      '안정성 중심의 투자 시스템 - 보안 및 리스크 관리',
      '투자 위험 모델링 - 컴플라이언스 및 규제 대응',
      '포트폴리오 최적화 - 수익성 및 성과 분석',
      '투자 패턴 분석 - 데이터 기반 의사결정 지원',
      '품질 중심의 투자 검증 - 리스크 평가 시스템',
      '자동화된 투자 전략 - 효율적 자산 배분',
      '투자 교육 및 컨설팅 - 전문 지식 전수',
      '투자 문서화 및 리포팅 - 체계적 성과 관리'
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 dark:from-primary/5 dark:to-purple-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background dark:via-background/70"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-slide-up">
              <Badge variant="outline" size="lg" className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border-primary/20 dark:border-primary/30">
                <Globe className="w-4 h-4 mr-2" />
                Multi-Platform Intelligence Hub
              </Badge>
            </div>
            
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 animate-slide-up">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 text-gradient-safe">
                4개 플랫폼 통합
              </span>
              <br />
              <span className="text-foreground">시장 인텔리전스 허브</span>
            </h1>
            
            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              <strong>네이버 프리미엄</strong>, <strong>Substack</strong>, <strong>네이버 블로그</strong>, <strong>브런치스토리</strong><br/>
              4개 플랫폼을 통한 전문가 인사이트 및 체계적 자산관리 전략 분석
            </p>

            {/* Platform Quick Navigation */}
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              {contentPlatforms.map((platform, index) => (
                <Link
                  key={platform.id}
                  href={`#${platform.id}`}
                  className="group relative p-4 rounded-lg card-platform hover:shadow-lg"
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
        {contentPlatforms.map((platform, index) => (
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
                  <span className={`bg-gradient-to-r ${platform.color} text-gradient-safe`}>
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
                    <Badge key={badgeIndex} variant="outline" className="badge-modern">
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
                    className="card-insight animate-slide-up group"
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
                <Card className={`overflow-hidden border-2 border-transparent bg-gradient-to-r ${platform.color} p-[1px] animate-slide-up dark:brightness-110`}>
                  <div className="bg-background dark:bg-card/90 rounded-lg p-8">
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
                        <div className="relative bg-muted/50 dark:bg-muted/30 rounded-lg p-6 text-center">
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
                <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 text-gradient-safe">
                  플랫폼별 전문가 인사이트
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed">
                네이버 프리미엄, Substack, 네이버 블로그, 브런치스토리 플랫폼별 특화된 
                전문가 인사이트와 실전 자산관리 전략을 영상과 팟캐스트로 만나보세요
              </p>
            </div>

            <Tabs defaultValue="video" className="w-full animate-slide-up">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-muted/50">
                <TabsTrigger value="video" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10">
                  <Play className="h-4 w-4" />
                  전문가 분석 비디오
                </TabsTrigger>
                <TabsTrigger value="podcast" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10">
                  <Headphones className="h-4 w-4" />
                  전문가 팟캐스트
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="card-modern overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <YouTubeThumbnail
                        videoId="0FCO9TQBok0"
                        title="네이버 프리미엄: 전문가 수준의 위험 평가 분석"
                        className="w-full mb-4"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-gradient-to-r from-green-500 to-green-600">
                          네이버 프리미엄
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3">숨겨진 지뢰, 미처분이익잉여금</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        네이버 프리미엄 콘텐츠를 통한 비상장기업의 숨겨진 위험 요소 분석. 전문가 수준의 
                        위험 평가 모델을 통해 이익잉여금 관리 전략을 제시합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">프리미엄 분석</Badge>
                        <Badge variant="secondary" size="sm">전문가 평가</Badge>
                        <Badge variant="secondary" size="sm">세무전략</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-modern overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <YouTubeThumbnail
                        videoId="XCB4ys-IU4s"
                        title="네이버 블로그: 실전 투자 플랫폼 구축 가이드"
                        className="w-full mb-4"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-blue-600">
                          네이버 블로그
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3">네이버 블로그 기반 자산관리 플랫폼</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        네이버 블로그를 활용한 확장 가능한 자산관리 시스템 구축 방법론. 
                        실전 투자 가이드를 통한 개인화된 투자 전략을 실제 사례로 설명합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">실전 가이드</Badge>
                        <Badge variant="secondary" size="sm">투자 전략</Badge>
                        <Badge variant="secondary" size="sm">개인화 솔루션</Badge>
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
                      전문가 플랫폼 채널 구독
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="podcast" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="card-modern overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-orange-600">
                          Substack
                        </Badge>
                        <Badge variant="outline" size="sm" className="dark:bg-muted/20 dark:border-border/50">EP.1</Badge>
                      </div>
                      <SpotifyEmbed
                        uri="spotify:episode:3oWSt9SMetN4Zw3NXFL36H"
                        title="Substack 기반 글로벌 자산관리 전략"
                        className="w-full rounded-lg overflow-hidden mb-4"
                      />
                      <h4 className="text-lg font-semibold mb-3">Substack 글로벌 자산관리 혁신</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        Substack 플랫폼을 활용한 지능형 글로벌 자산관리 전략. 
                        해외 투자 기회 발굴과 연계된 핀테크 혁신 분석 및 포트폴리오 최적화 전략을 상세히 다룹니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">글로벌 투자</Badge>
                        <Badge variant="secondary" size="sm">핀테크 혁신</Badge>
                        <Badge variant="secondary" size="sm">포트폴리오 최적화</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-modern overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-purple-600">
                          브런치스토리
                        </Badge>
                        <Badge variant="outline" size="sm" className="dark:bg-muted/20 dark:border-border/50">EP.2</Badge>
                      </div>
                      <SpotifyEmbed
                        uri="spotify:episode:6GdSlo5AkFiYB4G5Sib1xJ"
                        title="브런치스토리 전문화: 도메인별 맞춤 컨설팅"
                        className="w-full rounded-lg overflow-hidden mb-4"
                      />
                      <h4 className="text-lg font-semibold mb-3">브런치스토리 전문 영역별 세분화</h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        CEO 보장정기보험과 퇴직금 플랜을 중심으로 한 브런치스토리 전문화 전략. 
                        각 도메인별 특화된 전문가 분석을 통한 맞춤형 솔루션 제공 방법론을 설명합니다.
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
              <Badge variant="outline" size="lg" className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border-primary/20 dark:border-primary/30">
                <Bot className="w-4 h-4 mr-2" />
                AI 통합 컨텐츠 플랫폼
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-green-600 text-gradient-safe">
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
              {contentPlatforms.map((platform, index) => (
                <Card 
                  key={platform.id}
                  className="card-modern text-center group hover:shadow-lg transition-all duration-300 animate-slide-up"
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
            <Card className="card-modern overflow-hidden border-2 border-primary/20 dark:border-primary/10 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10">
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
                  <Badge variant="outline" size="sm" className="dark:bg-muted/20 dark:border-border/50">AI 자동화 트렌드</Badge>
                  <Badge variant="outline" size="sm" className="dark:bg-muted/20 dark:border-border/50">전문가 독점 인사이트</Badge>
                  <Badge variant="outline" size="sm" className="dark:bg-muted/20 dark:border-border/50">실전 활용 가이드</Badge>
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
