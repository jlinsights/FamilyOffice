import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Star,
  Building,
  Award,
  ArrowRight,
  Phone,
  Briefcase,
  Users,
  Target,
  Shield,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnimatedCounter } from '@/components/animated-counter';
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export { metadata } from './metadata';

export default function AboutPage() {
  const structuredData = generateStructuredData('Organization');
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://familyoffices.vip',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '회사 소개',
        item: 'https://familyoffices.vip/about',
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <Header />

      <main className="pt-20">
        {/* 히어로 섹션 */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                About FamilyOffice S
              </span>
            </div>

            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line">
              중소중견기업의{'\n'}
              <span className="text-foreground">성공적인 자산관리</span>
              {'\n'}파트너
            </h1>

            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              중소중견기업 전문 자산관리
            </p>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-foreground">
                법인 대표님을 위한 전문적인 자산관리
              </span>{' '}
              및{' '}
              <span className="font-semibold text-primary">
                가업승계 설계 서비스
              </span>
              를 제공합니다
            </p>

            <p className="text-md md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed bg-primary/5 rounded-lg p-4 border border-primary/10">
              <span className="font-bold text-primary">FamilyOffice S</span>는{' '}
              <span className="font-semibold text-foreground">삼성생명 기업컨설팅센터</span>의{' '}
              <span className="text-primary font-semibold">VIP 고객 전담 프로젝트팀</span>입니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl text-lg font-bold h-12 px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg transition-colors"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                상담 신청
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-xl text-lg font-bold h-12 px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg transition-colors"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                서비스 보기
              </a>
            </div>
          </div>
        </section>

        {/* 통계 섹션 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: '자산관리 실적',
                  value: 500,
                  suffix: '억원+',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  label: '법인 대표 만족도',
                  value: 98,
                  suffix: '%',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ),
                },
                {
                  label: '법인 고객사',
                  value: 500,
                  suffix: '+',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                },
                {
                  label: '중소중견기업 전문경험',
                  value: 20,
                  suffix: '년+',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 text-center bg-background rounded-lg shadow-sm border border-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={true}
                      duration={1500 + index * 200}
                    />
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 전문가 팀 섹션 - 숨김 처리 */}
        {/* <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Users className="h-3 w-3 mr-1" />
                Expert Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                중소중견기업 전문가 팀
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                20년 이상의 경험을 보유한 중소중견기업 자산관리 전문가들이 함께합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: '임재홍',
                  position: '대표 컨설턴트 / 수석',
                  specialty: '중소중견기업 전문, 패밀리오피스 설계',
                  description: '대형 금융그룹 출신으로 중소중견기업 자산관리 경험과 전문성 보유',
                },
                {
                  name: '장현오',
                  position: 'FamilyOffice S',
                  specialty: '제조업·건설업 전문, 중대재해처벌법 대응',
                  description: '위험업종 전문 보험설계 및 기업재해보장보험 설계 전문가',
                },
                {
                  name: '박병학',
                  position: '세무 회계 본부장',
                  specialty: '가족법인 설립, 승계 설계, MSO 구조화',
                  description: 'Big4 회계법인 출신으로 중소중견기업 세무 및 승계 전문가',
                },
                {
                  name: '주상미',
                  position: 'FP (Financial Planner)',
                  specialty: '투자 포트폴리오 관리, 리스크 헤지',
                  description: '투자은행 출신으로 중소중견기업 맞춤형 투자전략 설계 전문가',
                },
              ].map((expert, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-primary font-medium">{expert.position}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {expert.specialty}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {expert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* 핵심 가치 섹션 */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Target className="h-3 w-3 mr-1" />
                Core Values
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                FamilyOffice S의 <span className="text-primary">핵심 가치</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: '신뢰와 투명성',
                  description: '고객의 자산을 내 자산처럼 소중히 여기며, 모든 거래와 운용 과정을 투명하게 공개합니다.',
                  features: [
                    '실시간 자산 현황 공개',
                    '투명한 수수료 구조',
                    '정기적인 운용 보고서 제공',
                  ],
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: '전문성과 경험',
                  description: '20년 이상의 중소중견기업 전문 경험을 바탕으로 최적의 자산관리 솔루션을 제공합니다.',
                  features: [
                    '중소중견기업 특화 노하우',
                    '업종별 맞춤 전략',
                    '지속적인 전문가 교육',
                  ],
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: '맞춤형 서비스',
                  description: '획일화된 서비스가 아닌, 각 기업의 특성과 목표에 맞는 개별화된 서비스를 제공합니다.',
                  features: [
                    '개별 기업 분석',
                    '맞춤형 포트폴리오 구성',
                    '전담 전문가 배정',
                  ],
                },
              ].map((value, index) => (
                <Card key={index} className="text-center h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white transition-colors duration-300">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground dark:text-gray-300 mb-6 flex-1 transition-colors duration-300">
                      {value.description}
                    </p>
                    <ul className="space-y-2">
                      {value.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              <Phone className="h-3 w-3 mr-1" />
              Contact Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              중소중견기업 전문 자산관리 상담
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              귀하의 기업에 최적화된 자산관리 전략을 함께 설계해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact" className="flex items-center">
                  무료 상담 신청
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">서비스 자세히 보기</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
