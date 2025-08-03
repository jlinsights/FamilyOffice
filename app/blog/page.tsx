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
} from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title:
    'Korea Market Insights Blog | Business Analysis & Strategic Partnership',
  description:
    'Latest insights on Korea market trends, strategic partnerships, regulatory changes, and business development opportunities for global companies.',
  keywords:
    'Korea market insights, business analysis Korea, strategic partnership blog, Korea regulatory updates, market entry insights',
  openGraph: {
    title: 'Korea Market Insights Blog | FamilyOffices.vip',
    description:
      'Expert insights and analysis on Korea market trends and strategic partnerships.',
    type: 'website',
  },
};

const blogCategories = [
  {
    name: 'Market Entry Strategies',
    slug: 'market-entry',
    icon: <Target className="h-5 w-5" />,
    count: 15,
    description: '전략적 시장 진입 방법론',
  },
  {
    name: 'Financial Services',
    slug: 'financial-services',
    icon: <BarChart3 className="h-5 w-5" />,
    count: 12,
    description: '금융 서비스 산업 동향',
  },
  {
    name: 'Regulatory Updates',
    slug: 'regulatory',
    icon: <FileText className="h-5 w-5" />,
    count: 8,
    description: '규제 변화 및 분석',
  },
  {
    name: 'Cultural Insights',
    slug: 'culture',
    icon: <Globe className="h-5 w-5" />,
    count: 10,
    description: '한국 비즈니스 문화 이해',
  },
  {
    name: 'Success Stories',
    slug: 'success-stories',
    icon: <Users className="h-5 w-5" />,
    count: 6,
    description: '성공 사례 분석',
  },
];

const featuredPosts = [
  {
    id: 1,
    title:
      "Korea's Financial Services Sector: Opportunities for Global Asset Managers",
    excerpt:
      '한국 금융 서비스 시장의 최신 동향과 글로벌 자산 운용사들을 위한 기회를 분석합니다.',
    category: 'Financial Services',
    author: 'Jaehong Lim',
    date: '2024-01-15',
    readTime: '5 min read',
    image: '/blog/financial-services-korea.jpg',
    slug: 'korea-financial-services-opportunities',
    featured: true,
  },
  {
    id: 2,
    title: 'Understanding Korean Business Culture: Key Success Factors',
    excerpt:
      '한국 비즈니스 문화를 이해하고 성공적인 파트너십을 구축하는 핵심 요소들을 살펴봅니다.',
    category: 'Cultural Insights',
    author: 'Jaehong Lim',
    date: '2024-01-10',
    readTime: '7 min read',
    image: '/blog/korean-business-culture.jpg',
    slug: 'korean-business-culture-success-factors',
    featured: true,
  },
  {
    id: 3,
    title: "Regulatory Changes in Korea's Investment Industry: Q1 2024 Update",
    excerpt:
      '2024년 1분기 한국 투자 산업의 주요 규제 변화와 그 영향을 분석합니다.',
    category: 'Regulatory Updates',
    author: 'Jaehong Lim',
    date: '2024-01-05',
    readTime: '4 min read',
    image: '/blog/regulatory-changes-2024.jpg',
    slug: 'regulatory-changes-investment-industry-q1-2024',
    featured: true,
  },
];

const recentPosts = [
  {
    id: 4,
    title: 'Strategic Partnership Models: Lessons from European Firms',
    excerpt:
      '유럽 기업들의 한국 진출 사례를 통해 본 전략적 파트너십 모델들을 분석합니다.',
    category: 'Market Entry Strategies',
    author: 'Jaehong Lim',
    date: '2024-01-20',
    readTime: '6 min read',
    slug: 'strategic-partnership-models-european-firms',
  },
  {
    id: 5,
    title: "Korea's UHNW Market: Growth Trends and Investment Patterns",
    excerpt: '한국 초고액 자산가 시장의 성장 트렌드와 투자 패턴을 살펴봅니다.',
    category: 'Financial Services',
    author: 'Jaehong Lim',
    date: '2024-01-18',
    readTime: '5 min read',
    slug: 'korea-uhnw-market-growth-trends',
  },
  {
    id: 6,
    title: 'Technology Partnerships in Korea: FinTech Success Stories',
    excerpt: '한국에서 성공한 핀테크 기술 파트너십 사례들을 분석합니다.',
    category: 'Success Stories',
    author: 'Jaehong Lim',
    date: '2024-01-12',
    readTime: '4 min read',
    slug: 'technology-partnerships-fintech-success',
  },
];

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
              Korea Market Insights
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              Business Intelligence{'\\n'}
              <span className="text-foreground">& Market Analysis</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              Expert insights on Korea market trends, strategic partnerships,
              and business development opportunities for global companies.
            </p>
            <div
              className="max-w-md mx-auto animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex">
                <Input
                  placeholder="Search insights..."
                  className="bg-background/80 backdrop-blur-sm border-border"
                />
                <Button className="ml-2 bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Blog Categories
              </h2>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                Explore insights across different areas of Korea market
                expertise
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {blogCategories.map((category, index) => (
                <div
                  key={category.slug}
                  className="card-modern p-6 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Badge variant="outline">{category.count} posts</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Featured Insights
              </h2>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                Latest analysis and insights on Korea market trends
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <Badge className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Recent Insights
              </h2>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                Stay updated with the latest Korea market developments
              </p>
            </div>
            <div className="space-y-8">
              {recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="card-modern overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/4 aspect-video md:aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="md:w-3/4 p-6">
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 animate-slide-up">
              Stay Updated with Korea Market Insights
            </h2>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up opacity-90 leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              Get weekly insights on Korea market trends, regulatory changes,
              and strategic partnership opportunities.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <Input
                placeholder="Enter your email address"
                className="max-w-sm bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
              />
              <Button className="bg-background text-foreground hover:bg-background/90">
                Subscribe to Newsletter
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/80 mt-4">
              Join 500+ professionals who receive our weekly Korea market
              insights.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
