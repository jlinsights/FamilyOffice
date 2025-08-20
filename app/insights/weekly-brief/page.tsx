'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  CheckCircle, 
  Calendar, 
  Users, 
  TrendingUp, 
  BarChart, 
  Building2,
  Star,
  Clock,
  ArrowRight,
  Shield,
  Target,
  Loader2
} from 'lucide-react';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { CalComPopup } from '@/components/cal-com-popup';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';

// Metadata는 서버 컴포넌트에서만 사용 가능하므로 주석 처리
// export const metadata: Metadata = {
//   title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
//   description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다. 5분 내 독서 완료, 실무 적용 가능한 전문가 인사이트.',
//   keywords: '주간 브리프, 기업승계 뉴스레터, CEO 뉴스레터, 상속세 절세, 가업승계, 중견기업, 패밀리오피스, 자산관리 인사이트',
//   openGraph: {
//     title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
//     description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다.',
//     type: 'website',
//     locale: 'ko_KR',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: '주간 브리프 | 기업승계와 자산관리 핵심 인사이트 | FamilyOffice S',
//     description: '매주 월·금요일 오전 7:30, 기업승계와 자산관리 핵심 인사이트를 전달합니다.',
//   },
//   alternates: {
//     canonical: '/insights/weekly-brief',
//   },
// };

interface NewsletterPost {
  issueNumber: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  categories: string[];
  url: string;
  thumbnail?: string;
}

const valuePropositions = [
  {
    icon: Clock,
    title: '5분 내 독서 완료',
    description: '바쁜 CEO를 위한 핵심 요약 형태로 구성된 간결한 콘텐츠',
  },
  {
    icon: Target,
    title: '실무 적용 가능한 정보',
    description: '이론이 아닌 실제 경영 현장에서 바로 활용할 수 있는 실용적 인사이트',
  },
  {
    icon: Users,
    title: '전문가 네트워크 독점 인사이트',
    description: '변호사, 회계사, 투자전문가들의 검증된 분석과 조언',
  },
  {
    icon: Shield,
    title: '무료 구독, 언제든 해지 가능',
    description: '부담 없이 시작하고, 원할 때 언제든 구독을 중단할 수 있습니다',
  },
];

const newsletterStats = {
  subscribers: '1,200+',
  openRate: '52%',
  issues: '52+',
  establishedYear: '2025',
  platform: 'beehiiv'
};

const recentIssues = [
  {
    issueNumber: '#50',
    date: '2025.01.17',
    title: '2025년 상속세법 개정안 핵심 포인트',
    excerpt: '상속세 과세표준 구간 조정과 세율 변화가 중견기업에 미치는 영향을 분석했습니다.',
    readTime: '4분',
    categories: ['세무', '법률', '기업승계'],
    url: 'https://newsletter.familyoffices.vip',
  },
  {
    issueNumber: '#49',
    date: '2025.01.10',
    title: 'AI 시대 기업 밸류에이션의 새로운 기준',
    excerpt: '전통적인 기업 가치 평가 방식에서 벗어나 AI 역량을 반영한 새로운 평가 모델을 제시합니다.',
    readTime: '5분',
    categories: ['투자', '기업가치', 'AI'],
    url: 'https://newsletter.familyoffices.vip',
  },
  {
    issueNumber: '#48',
    date: '2025.01.03',
    title: '2025년 글로벌 경제 전망과 자산배분 전략',
    excerpt: '새해를 맞아 주요 투자은행들의 경제 전망을 종합하여 한국 중견기업을 위한 자산배분 가이드를 정리했습니다.',
    readTime: '6분',
    categories: ['투자전략', '자산배분', '글로벌'],
    url: 'https://newsletter.familyoffices.vip',
  },
  {
    issueNumber: '#47',
    date: '2024.12.27',
    title: '패밀리오피스 설립 시 고려사항 총정리',
    excerpt: '자산 규모별 패밀리오피스 형태와 설립 과정에서 반드시 체크해야 할 법적, 세무적 요소들을 정리했습니다.',
    readTime: '5분',
    categories: ['패밀리오피스', '자산관리', '설립'],
    url: 'https://newsletter.familyoffices.vip',
  },
];

const testimonials = [
  {
    name: '김○○ 대표',
    company: '제조업 A사',
    content: '매주 받는 뉴스레터를 통해 시장 변화를 빠르게 파악하고 있습니다. 특히 업종별 분석이 도움이 됩니다.',
    rating: 5,
  },
  {
    name: '이○○ 회장',
    company: '건설업 B그룹',
    content: '상속세 관련 내용이 매우 실용적이었습니다. 전문가의 조언을 쉽게 이해할 수 있어 좋습니다.',
    rating: 5,
  },
  {
    name: '박○○ 대표',
    company: 'IT기업 C사',
    content: '글로벌 시장 동향과 국내 시장을 연결해서 설명해주는 점이 특히 유용합니다.',
    rating: 5,
  },
];

const recentTopics = [
  '2025년 상반기 투자 전망과 포트폴리오 전략',
  '중대재해처벌법 시행 2년, CEO가 알아야 할 핵심 사항',
  'AI 시대의 기업 가치 평가, 무엇이 달라지나',
  '가족법인 설립을 통한 상속세 절감 사례 분석',
  'ESG 경영이 기업 가치에 미치는 영향',
];

export default function WeeklyBriefPage() {
  const [recentPosts, setRecentPosts] = useState<NewsletterPost[]>(recentIssues);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API에서 최신 뉴스레터 가져오기
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch('/api/newsletter/posts?limit=4');
        const data = await response.json();
        
        if (data.success && data.posts.length > 0) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.error('Failed to fetch newsletter posts:', error);
        // 에러 시 기본 데이터 유지
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
      {/* Weekly Brief Main Section */}
      <section className="weekly-brief relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6 text-lg px-4 py-2">매주 월·금요일 오전 7:30 발송</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              주간 브리프
            </h1>
            <p className="subtitle text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              매주 월·금요일 오전 7:30, 
              <br className="hidden sm:block" />
              기업승계와 자산관리 핵심 인사이트를 전달합니다
            </p>
            
            {/* Value Propositions */}
            <div className="value-props bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-12 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {valuePropositions.map((prop, index) => {
                  const Icon = prop.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 text-left">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{prop.title}</h3>
                        <p className="text-sm text-muted-foreground">{prop.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform Info & Subscription */}
            <div className="subscription-form max-w-2xl mx-auto mb-16">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border">
                <div className="flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    전문 뉴스레터 서비스
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{newsletterStats.subscribers}</div>
                    <div className="text-sm text-muted-foreground">구독자</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{newsletterStats.openRate}</div>
                    <div className="text-sm text-muted-foreground">열람률</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{newsletterStats.issues}</div>
                    <div className="text-sm text-muted-foreground">발행호</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{newsletterStats.establishedYear}</div>
                    <div className="text-sm text-muted-foreground">시작년도</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Link 
                      href="https://newsletter.familyoffices.vip" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="lg" className="w-full">
                        newsletter.familyoffices.vip에서 구독하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="text-center">
                    <NewsletterSubscription 
                      source="weekly-brief-main"
                      variant="compact"
                    />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-muted-foreground">
                    📧 <strong>newsletter.familyoffices.vip</strong>에서 관리되는 전문 뉴스레터<br />
                    🔒 엔터프라이즈급 보안과 전송 안정성
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="recent-issues py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              최근 발행호
            </h3>
            <p className="text-lg text-muted-foreground">
              지난 주간 브리프에서 다뤘던 핵심 주제들을 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              // 로딩 스켈레톤
              [...Array(4)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              recentPosts.map((issue, index) => (
              <Card key={index} className="card-modern bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" size="sm" className="text-xs font-mono">
                      {issue.issueNumber}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {issue.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {issue.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 leading-relaxed">
                    {issue.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      읽는 시간: {issue.readTime}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      뉴스레터
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {issue.categories.map((category, catIndex) => (
                      <Badge key={catIndex} variant="secondary" size="sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link 
                    href={issue.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      열어보기
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                전체 백로그 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                최근 다룬 주요 주제
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                실무에 바로 적용 가능한 인사이트와 전략을 제공합니다
              </p>
              
              <div className="space-y-4">
                {recentTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-foreground">{topic}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    지난 뉴스레터 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                구독자 후기
              </h3>
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              신뢰받는 Weekly Brief
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              기업승계와 자산관리 전문가들이 검증한 양질의 콘텐츠를 정기적으로 제공합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{newsletterStats.subscribers}</div>
              <div className="text-muted-foreground">활성 구독자</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BarChart className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{newsletterStats.openRate}</div>
              <div className="text-muted-foreground">평균 열람률</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{newsletterStats.issues}</div>
              <div className="text-muted-foreground">총 발행호</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">주 2회</div>
              <div className="text-muted-foreground">월·금 발송</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">전문 뉴스레터 서비스</h3>
                <p className="text-muted-foreground">기업승계와 자산관리 전문 인사이트 제공</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">전문 콘텐츠</h4>
                <p className="text-sm text-muted-foreground">변호사, 회계사, 투자 전문가 검증</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">실무 중심</h4>
                <p className="text-sm text-muted-foreground">즉시 적용 가능한 실용적 인사이트</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">맞춤형 분석</h4>
                <p className="text-sm text-muted-foreground">중견기업 CEO를 위한 특화 콘텐츠</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                <strong>newsletter.familyoffices.vip</strong> • 
                {newsletterStats.establishedYear}년부터 서비스 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 border-primary/20">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left side - Consultant Info */}
                <div className="p-8 md:p-12 flex items-center">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/5 border-4 border-primary/20">
                      <picture>
                        <source srcSet="/images/ai_profile.png" type="image/webp" />
                        <source srcSet="/images/ai_profile.png" type="image/png" />
                        <Image 
                          src="/images/ai_profile.png" 
                          alt="임재홍 수석 컨설턴트"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover object-center"
                          priority
                          quality={90}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </picture>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        임재홍 <span className="text-muted-foreground font-normal">수석 컨설턴트</span>
                      </h3>
                      <p className="text-lg text-primary font-medium mb-4">
                        대표 컨설턴트 / 수석
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        국내 대기업 및 글로벌 외국계 기업 출신으로 중견기업 자산관리 경험과 전문성을 보유하고 있습니다. 
                        패밀리오피스 설계, 가업승계 전략, 세무최적화 등 통합적인 솔루션으로 기업과 가족의 지속가능한 성장을 지원합니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right side - CTA */}
                <div className="bg-primary/5 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Weekly Brief 구독하기
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    매주 월·금요일, 중소중견기업 CEO를 위한 맞춤형 인사이트를 제공합니다. 
                    5분 내 읽을 수 있는 핵심 정보로 경영 의사결정을 지원합니다.
                  </p>
                  <div className="space-y-4">
                    <CalComPopup
                      buttonText="상담 신청"
                      variant="default"
                      size="lg"
                      className="w-full"
                      eventType="consultation"
                      trigger={
                        <Button size="lg" className="w-full">
                          <Calendar className="mr-2 h-5 w-5" />
                          상담 신청
                        </Button>
                      }
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      무료 상담을 통해 맞춤형 솔루션을 제안드립니다
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 구독하고 다음 호를 받아보세요
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            매주 월·금요일 오전 7시 30분, 당신의 투자 결정을 돕는 인사이트가 도착합니다
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <Link 
              href="https://newsletter.familyoffices.vip" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="w-full mb-4">
                newsletter.familyoffices.vip에서 구독하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <div className="text-sm text-primary-foreground/70">
              또는
            </div>
            
            <NewsletterSubscription 
              source="weekly-brief-cta"
              variant="compact"
            />
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/80 mb-2">
              <Mail className="w-4 h-4" />
              전문 뉴스레터 플랫폼으로 안전하게 관리됩니다
            </div>
            <p className="text-sm text-primary-foreground/70">
              구독 신청 즉시 환영 이메일과 함께 최신 뉴스레터를 보내드립니다<br />
              🔒 개인정보 보호 • 📧 스팸 없음 • ✋ 언제든 해지 가능
            </p>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}