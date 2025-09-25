import { Search, ChevronRight } from 'lucide-react';
import { Suspense, lazy } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '시장 인텔리전스 - 전문가 미디어 콘텐츠',
  description: '패밀리오피스 및 자산관리의 최신 인사이트를 영상과 팟캐스트로 만나보세요. 전문가가 직접 분석하는 시장 동향과 투자 전략을 확인하세요.',
  keywords: '시장 분석, 자산관리, 패밀리오피스, 투자 전략, 전문가 콘텐츠',
};

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogCategories } from '@/lib/blog-data';

// Dynamic imports for heavy components
const Tabs = dynamic(() => import('@/components/ui/tabs').then(mod => ({ default: mod.Tabs })), {
  loading: () => <div className="h-12 bg-muted animate-pulse rounded" />
});
const TabsContent = dynamic(() => import('@/components/ui/tabs').then(mod => ({ default: mod.TabsContent })));
const TabsList = dynamic(() => import('@/components/ui/tabs').then(mod => ({ default: mod.TabsList })));
const TabsTrigger = dynamic(() => import('@/components/ui/tabs').then(mod => ({ default: mod.TabsTrigger })));

const NewsletterSubscription = dynamic(() => import('@/components/newsletter-subscription').then(mod => ({ default: mod.NewsletterSubscription })), {
  loading: () => <div className="h-32 bg-muted animate-pulse rounded" />
});
const BlogCategoryFilter = dynamic(() => import('@/components/blog-category-filter').then(mod => ({ default: mod.BlogCategoryFilter })), {
  loading: () => <div className="h-16 bg-muted animate-pulse rounded" />
});
const BlogContent = dynamic(() => import('@/components/blog-content').then(mod => ({ default: mod.BlogContent })), {
  loading: () => (
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
  )
});
const YouTubeThumbnail = dynamic(() => import('@/components/media/youtube-thumbnail').then(mod => ({ default: mod.YouTubeThumbnail })), {
  loading: () => <div className="w-full aspect-video bg-muted animate-pulse rounded" />
});
const SpotifyEmbed = dynamic(() => import('@/components/media/spotify-embed').then(mod => ({ default: mod.SpotifyEmbed })), {
  loading: () => <div className="w-full h-32 bg-muted animate-pulse rounded" />
});

// Dynamic component for category icons - only load when needed
const CategoryIcon = dynamic(() => import('./category-icon'), {
  loading: () => <div className="w-5 h-5 bg-muted animate-pulse rounded" />
});

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
                <BlogCategoryFilter />
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
                        <CategoryIcon iconName={category.icon} />
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
                  <Suspense fallback={<div className="w-4 h-4 bg-muted animate-pulse rounded" />}>
                    <CategoryIcon iconName="Play" />
                  </Suspense>
                  비디오 콘텐츠
                </TabsTrigger>
                <TabsTrigger value="podcast" className="flex items-center gap-2">
                  <Suspense fallback={<div className="w-4 h-4 bg-muted animate-pulse rounded" />}>
                    <CategoryIcon iconName="Headphones" />
                  </Suspense>
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
                      videoId="dz7GaXLjwW0"
                      title="패밀리오피스 자산관리 전략"
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      패밀리오피스 전문가가 직접 설명하는 자산관리 핵심 전략과 실무 노하우. 성공한 기업가들의 자산 보전 및 승계 방법을 상세히 다룹니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">패밀리오피스</Badge>
                      <Badge variant="secondary">자산관리</Badge>
                      <Badge variant="secondary">기업승계</Badge>
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
                    <iframe 
                      data-testid="embed-iframe" 
                      style={{borderRadius: '12px'}} 
                      src="https://open.spotify.com/embed/episode/57b2C3gDKVhkcI8tVhramS?utm_source=generator" 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="mb-4"
                    />
                    <p className="text-muted-foreground mb-3">
                      패밀리오피스 전문가가 들려주는 최신 자산관리 인사이트와 투자 전략. 실무진이 알아야 할 핵심 노하우와 성공 사례를 상세히 다룹니다.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">패밀리오피스</Badge>
                      <Badge variant="secondary">투자전략</Badge>
                      <Badge variant="secondary">자산관리</Badge>
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
            <BlogContent className="animate-slide-up" />
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
