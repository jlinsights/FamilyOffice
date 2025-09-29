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
const BlogContentAdvanced = dynamic(() => import('@/components/blog/blog-content-advanced').then(mod => ({ default: mod.BlogContentAdvanced })), {
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
        {/* Hero Section - Modern Magazine Style */}
        <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <div className="mb-6 animate-slide-up">
              <Badge variant="outline" className="text-xs font-medium bg-white/50 dark:bg-gray-800/50 border-slate-200 dark:border-gray-700">
                💡 FamilyOffice S 인사이트
              </Badge>
            </div>
            
            {/* Main Title */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-foreground">자산관리 전문가</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  인사이트 & 전략
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                한국 중견기업 CEO를 위한 패밀리오피스, 자산관리, 투자전략, 
                세무최적화의 최신 인사이트와 성공 사례를 제공합니다.
              </p>
            </div>

            {/* Stats or Features Grid */}
            <div 
              className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">전문 아티클</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5개</div>
                <div className="text-sm text-muted-foreground">전문 영역</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-2xl font-bold text-foreground">매주 2회</div>
                <div className="text-sm text-muted-foreground">정기 발행</div>
              </div>
            </div>

            {/* Publication Schedule */}
            <div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 max-w-2xl mx-auto mb-8 animate-slide-up border border-blue-100 dark:border-gray-700"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center justify-center mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  📅 정기 발행 일정
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-foreground">화요일 오후 2:30</div>
                  <div className="text-muted-foreground">실무 가이드</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">목요일 저녁 8:00</div>
                  <div className="text-muted-foreground">전략 분석</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Categories & Filter - Modern Grid Design */}
        <section className="py-16 bg-slate-50/50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="mb-6 animate-slide-up">
                <Badge variant="outline" className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
                  🎯 전문 영역
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-up">
                전문 분야별 인사이트
              </h2>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '100ms' }}
              >
                패밀리오피스 및 자산관리의 다양한 전문 영역별 심층 분석을 확인하세요
              </p>
            </div>

            
            {/* Category Grid - Modern Card Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {blogCategories.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/insights/market-intelligence?category=${encodeURIComponent(category.name)}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  <div className="bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-800/40 dark:group-hover:to-indigo-800/40 transition-all duration-300">
                        <CategoryIcon iconName={category.icon} />
                      </div>
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Post Count */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                      >
                        {category.count} posts
                      </Badge>
                    </div>
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
                    <h3 className="text-sm font-medium text-foreground mb-3">비상장 벤처기업 스톡옵션</h3>
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
                      title="비상장 벤처기업 스톡옵션"
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

        {/* Blog Content with Category Support - Modern Magazine Layout */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 animate-slide-up">
              <Badge variant="outline" className="mb-6 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                📚 인사이트 아카이브
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                최신 자산관리 인사이트
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                전문가가 직접 분석한 최신 시장 동향과 실무 가이드를 확인하세요
              </p>
            </div>
            
            {/* Advanced Blog Content with Modern Features */}
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <BlogContentAdvanced 
                className="" 
                showSearch={true}
                showFilters={true}
                showViewToggle={true}
                infiniteScroll={false}
                itemsPerPage={12}
              />
            </div>
          </div>
        </section>

        {/* Newsletter Subscription - Modern CTA Design */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <Badge variant="outline" className="mb-6 bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                📬 뉴스레터 구독
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                전문가 인사이트를 받아보세요
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                매주 화요일과 목요일, 패밀리오피스 전문가의 최신 분석과 실무 가이드를 이메일로 받아보세요
              </p>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <NewsletterSubscription 
                source="blog-page" 
                variant="default"
                className=""
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
