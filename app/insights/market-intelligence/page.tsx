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
} from 'lucide-react';

import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogCategories } from '@/lib/blog-data';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { BlogCategoryFilter, BlogCategoryFilterSkeleton } from '@/components/blog-category-filter';
import { BlogContent } from '@/components/blog-content';
import { YouTubeEmbed } from '@/components/media/youtube-embed';
import { SpotifyEmbed } from '@/components/media/spotify-embed';

export const metadata: Metadata = {
  title: 'Market Intelligence | 기업승계 전문 인사이트 | FamilyOffice S',
  description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다.',
  keywords: '기업승계, 상속세 절세, 패밀리오피스, 자산관리, 중견기업, 가업승계, 세무최적화, 투자전략, 차세대 승계',
  openGraph: {
    title: 'Market Intelligence | 기업승계 전문 인사이트 | FamilyOffice S',
    description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Intelligence | 기업승계 전문 인사이트 | FamilyOffice S',
    description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다.',
  },
  alternates: {
    canonical: '/insights/market-intelligence',
  },
};

// Categories and posts are imported from @/lib/blog-data
// Dynamic rendering will be handled by BlogContent component based on URL parameters

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" size="lg" animation="fade">
              FamilyOffice S 인사이트
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary animate-slide-up">
              자산관리 전문가
              <br />
              <span className="text-foreground">인사이트 & 전략</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              한국 중견기업 CEO를 위한 패밀리오피스, 자산관리, 투자전략, 
              세무최적화의 최신 인사이트와 성공 사례를 제공합니다.
            </p>
            <div 
              className="bg-primary/10 rounded-lg px-6 py-4 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <p className="text-sm font-medium text-primary mb-1">정기 발행 일정</p>
              <p className="text-muted-foreground">
                매주 <strong>화요일 오후 2:30</strong> 실무 가이드<br/>
                매주 <strong>목요일 저녁 8:00</strong> 전략 분석
              </p>
            </div>
            <div
              className="max-w-md mx-auto animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex">
                <Input
                  placeholder="자산관리 인사이트 검색..."
                  className="bg-background/80 backdrop-blur-sm border-border"
                />
                <Button className="ml-2 bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Filter */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                전문 분야별 인사이트
              </h2>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed mb-8"
                style={{ animationDelay: '200ms' }}
              >
                패밀리오피스 및 자산관리의 다양한 전문 영역별 심층 분석을 확인하세요
              </p>
              
              {/* Category Filter */}
              <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <Suspense fallback={<BlogCategoryFilterSkeleton />}>
                  <BlogCategoryFilter />
                </Suspense>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {blogCategories.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/insights/market-intelligence?category=${encodeURIComponent(category.name)}`}
                  className="card-modern p-6 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up group"
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {category.icon === 'Target' && <Target className="h-5 w-5 text-primary" />}
                        {category.icon === 'BarChart3' && <BarChart3 className="h-5 w-5 text-primary" />}
                        {category.icon === 'TrendingUp' && <TrendingUp className="h-5 w-5 text-primary" />}
                        {category.icon === 'FileText' && <FileText className="h-5 w-5 text-primary" />}
                        {category.icon === 'Users' && <Users className="h-5 w-5 text-primary" />}
                        {category.icon === 'Cpu' && <Cpu className="h-5 w-5 text-primary" />}
                        {category.icon === 'Building' && <Building className="h-5 w-5 text-primary" />}
                        {category.icon === 'Scale' && <Scale className="h-5 w-5 text-primary" />}
                        {category.icon === 'Globe' && <Globe className="h-5 w-5 text-primary" />}
                        {category.icon === 'Briefcase' && <Briefcase className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Badge variant="ghost" size="xs">{category.count} posts</Badge>
                  </div>
                </Link>
              ))}
            </div>
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

              <TabsContent value="video" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <YouTubeEmbed
                      videoId="Pm27aGULsZk"
                      title="중대재해법 시대, 마지막 방패"
                      className="w-full aspect-video rounded-lg overflow-hidden"
                    />
                    <div className="mt-4 p-6 bg-card rounded-lg border">
                      <p className="text-muted-foreground mb-4">
                        중대재해처벌법 시대, 산재보험으로 없었질 수 없는 민사배상금 리스크. CEO 개인과 법인 모두를 지키는 마지막 방패를 준비하세요.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">중대재해처벌법</Badge>
                        <Badge variant="secondary">민사배상 리스크</Badge>
                        <Badge variant="secondary">기업재해보장</Badge>
                        <Badge variant="secondary">CEO 필수</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <YouTubeEmbed
                      videoId="Ufk5FHmG0LA"
                      title="중견기업 경영진, 자산관리 전략가이드"
                      className="w-full aspect-video rounded-lg overflow-hidden"
                    />
                    <div className="mt-4 p-6 bg-card rounded-lg border">
                      <p className="text-muted-foreground mb-4">
                        개별 전문가에서 &apos;전문가 팀&apos;으로. 중견기업 경영진의 복잡한 자산을 오케스트라처럼 조화롭게 관리하는 패밀리오피스 전략.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">패밀리오피스</Badge>
                        <Badge variant="secondary">전문가 팀</Badge>
                        <Badge variant="secondary">통합 자산관리</Badge>
                        <Badge variant="secondary">경영진 필수</Badge>
                      </div>
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

              <TabsContent value="podcast" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <SpotifyEmbed
                      uri="spotify:episode:1xVE4lGeiPlHlb2IOXZRzG"
                      title="중대재처벌과 산재 리스크"
                      className="w-full rounded-lg overflow-hidden"
                    />
                    <div className="mt-4 p-6 bg-card rounded-lg border">
                      <p className="text-muted-foreground mb-4">
                        실제 중견기업 CEO들의 자산관리 여정과 성공 전략을 심층 인터뷰로 공유합니다. 구체적인 실무 노하우와 시행착오 경험담을 들어보세요.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">CEO 인터뷰</Badge>
                        <Badge variant="secondary">성공사례</Badge>
                        <Badge variant="secondary">실무노하우</Badge>
                        <Badge variant="secondary">자산관리</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <SpotifyEmbed
                      uri="spotify:episode:2X1KIsTYtKNAfvrVgVLoJw"
                      title="CEO를 위한 금융 드림팀, '패밀리오피스'가 필요한 이유"
                      className="w-full rounded-lg overflow-hidden"
                    />
                    <div className="mt-4 p-6 bg-card rounded-lg border">
                      <p className="text-muted-foreground mb-4">
                        급변하는 글로벌 경제 환경 속에서 패밀리오피스가 주목해야 할 투자 트렌드와 리스크 관리 전략을 전문가가 분석합니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">글로벌투자</Badge>
                        <Badge variant="secondary">2025 전망</Badge>
                        <Badge variant="secondary">리스크관리</Badge>
                        <Badge variant="secondary">전문가분석</Badge>
                      </div>
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
