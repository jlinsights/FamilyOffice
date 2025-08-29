import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Mail, Download, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';

export const metadata: Metadata = {
  title: '인사이트 센터 | 기업승계 전문 분석 | FamilyOffice S',
  description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다. 중견기업 CEO를 위한 실무 중심 콘텐츠.',
  keywords: '기업승계, 상속세 절세, 패밀리오피스, 자산관리 인사이트, 중견기업 CEO, 가업승계, 세무최적화, 투자전략',
  openGraph: {
    title: '인사이트 센터 | 기업승계 전문 분석 | FamilyOffice S',
    description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '인사이트 센터 | 기업승계 전문 분석 | FamilyOffice S',
    description: '기업승계, 상속세 절세, 패밀리오피스 운영에 관한 전문가 분석과 시장 인사이트를 제공합니다.',
  },
  alternates: {
    canonical: '/insights',
  },
};

const insightSections = [
  {
    title: '시장 분석',
    description: '자산관리 전문가의 최신 인사이트와 전략 분석',
    href: '/insights/market-intelligence',
    icon: FileText,
    gradient: 'from-blue-500 to-blue-600',
    features: [
      '매주 수요일 정기 업데이트',
      '시장 동향 분석',
      '투자 전략 가이드',
      '세무 최적화 팁',
    ],
  },
  {
    title: '주간 브리프',
    description: '주간 시장 동향과 투자 인사이트를 이메일로 받아보세요',
    href: '/insights/weekly-brief',
    icon: Mail,
    gradient: 'from-purple-500 to-purple-600',
    features: [
      '매주 화·금 발송',
      '독점 투자 정보',
      '전문가 인터뷰',
      '맞춤형 콘텐츠',
    ],
  },
  {
    title: '자료실',
    description: '투자 가이드, 시장 보고서, 교육 자료 다운로드',
    href: '/insights/resources',
    icon: Download,
    gradient: 'from-green-500 to-green-600',
    features: [
      '투자 가이드북',
      '시장 분석 보고서',
      '세미나 발표 자료',
      'CEO 필독 자료',
    ],
  },
];

const latestInsights = [
  {
    category: '투자전략',
    title: '2025년 글로벌 투자 전망과 포트폴리오 전략',
    excerpt: '불확실한 시장 환경에서 안정적인 수익을 추구하는 자산 배분 전략을 소개합니다.',
    date: '2025.1.15',
    readTime: '5분',
  },
  {
    category: '세무최적화',
    title: '가족법인 설립을 통한 절세 전략 완벽 가이드',
    excerpt: '합법적인 세무 구조 개선을 통해 상속·증여세를 절감하는 방법을 알아봅니다.',
    date: '2025.1.12',
    readTime: '8분',
  },
  {
    category: '패밀리오피스',
    title: '성공적인 가업승계를 위한 5가지 핵심 전략',
    excerpt: '100년 기업으로 나아가기 위한 체계적인 승계 계획 수립 방법을 제시합니다.',
    date: '2025.1.10',
    readTime: '6분',
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              인사이트 센터
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              자산관리 전문가의 깊이 있는 분석과 실용적인 전략을 만나보세요.
              <br />
              시장의 변화를 앞서가는 인사이트로 여러분의 투자 결정을 도와드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="group bg-card border-border hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {section.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-foreground/80">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={section.href}>
                      <Button className="w-full group-hover:translate-x-1 transition-transform duration-300">
                        자세히 보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              최신 인사이트
            </h2>
            <p className="text-lg text-foreground/70">
              자산관리 전문가들이 전하는 최신 시장 분석과 투자 전략
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestInsights.map((insight, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                      {insight.category}
                    </span>
                    <span className="text-sm text-foreground/60">
                      {insight.readTime} 읽기
                    </span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{insight.title}</CardTitle>
                  <CardDescription className="text-base line-clamp-3 mt-2">
                    {insight.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">
                      {insight.date}
                    </span>
                    <Link href="/insights/market-intelligence" className="text-sm font-medium text-primary hover:text-primary/80">
                      읽어보기 →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/insights/market-intelligence">
              <Button size="lg" variant="outline">
                모든 글 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-foreground/70">게시된 인사이트</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-foreground/70">구독자</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">주 1회</div>
              <div className="text-foreground/70">시장 분석 업데이트</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-10 h-10 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">100+</div>
              <div className="text-foreground/70">다운로드 자료</div>
            </div>
          </div>
        </div>
      </section>

      {/* Multimedia Content Section */}
      <CompactMultimediaSection />

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            주간 브리프를 놓치지 마세요
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            매주 화·금, 엄선된 투자 정보와 시장 분석을 이메일로 받아보세요
          </p>
          <Link href="/insights/weekly-brief">
            <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300">
              주간 브리프 구독하기
              <Mail className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}