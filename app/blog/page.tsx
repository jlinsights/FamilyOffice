import {
  CalendarDays,
  Clock,
  User,
  FileText,
  Search,
  ArrowRight,
  BookOpen,
  Globe,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Cpu,
} from 'lucide-react';

import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogCategories, blogPosts } from '@/lib/blog-data';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { BlogCategoryFilter, BlogCategoryFilterSkeleton } from '@/components/blog-category-filter';
import { BlogContent } from '@/components/blog-content';

export const metadata: Metadata = {
  title: 'FamilyOffice S Blog | 자산관리 인사이트 & 전략적 파트너십',
  description: 'FamilyOffice S의 자산관리 전문가들이 제공하는 최신 인사이트, 투자 전략, 세무 최적화, 그리고 한국 중견기업을 위한 패밀리오피스 솔루션을 확인하세요.',
  keywords: '패밀리오피스, 자산관리, 투자전략, 포트폴리오최적화, 가족자산관리, 상속세절세, 디지털전환, AI자산관리',
  openGraph: {
    title: 'FamilyOffice S Blog | 프리미엄 자산관리 인사이트',
    description: '한국 중견기업 CEO를 위한 전문 자산관리 및 패밀리오피스 인사이트를 제공합니다.',
    type: 'website',
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
            <Badge className="mb-4 bg-background/80 backdrop-blur-sm animate-fade-in">
              FamilyOffice S 인사이트
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              자산관리 전문가{'\\n'}
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
                  href={`/blog?category=${encodeURIComponent(category.name)}`}
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
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Badge variant="outline">{category.count} posts</Badge>
                  </div>
                </Link>
              ))}
            </div>
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

        {/* Newsletter Signup */}
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
