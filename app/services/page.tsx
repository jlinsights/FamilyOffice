'use client';

import {
  CheckCircle,
  ArrowRight,
  Building,
  TrendingUp,
  Award,
  Users,
  Phone,
  Search,
  ChevronRight,
} from 'lucide-react';

import { useEffect, useState, useRef } from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { SERVICE_CATEGORIES } from '@/constants/services';

export default function ServicePage() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = statsSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // 실적 및 신뢰성 지표
  const serviceStats = [
    {
      icon: TrendingUp,
      value: 500,
      suffix: '억원+',
      label: '누적 관리 자산',
      description: '중소중견기업 전문 관리 실적',
    },
    {
      icon: Building,
      value: 500,
      suffix: '+',
      label: '법인 고객사',
      description: '다양한 업종의 중소중견기업',
    },
    {
      icon: Award,
      value: 20,
      suffix: '년',
      label: '전문 경험',
      description: '중소중견기업 자산관리 노하우',
    },
    {
      icon: Users,
      value: 98,
      suffix: '%',
      label: '고객 만족도',
      description: '지속적인 신뢰 관계 구축',
    },
  ];

  // 필터링된 서비스 카테고리
  const filteredCategories =
    selectedCategory === 'all'
      ? SERVICE_CATEGORIES
      : SERVICE_CATEGORIES.filter(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Building className="h-3 w-3 mr-1" />
                Professional Services
              </Badge>
            </div>

            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              중소중견기업{'\n'}대표를 위한{'\n'}
              <span className="text-foreground">전문 자산관리</span>
            </h1>

            <p
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              8개 분야 34개 세부 전문 서비스
            </p>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              <span className="font-semibold text-foreground">
                법인 지배구조부터 가업승계까지
              </span>{' '}
              <span className="font-semibold text-primary">
                전문가 팀의 원스톱 솔루션
              </span>
              으로
              <br />
              기업가의 모든 고민을 해결해드립니다
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '500ms' }}
            >
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
              >
                <Link href="/contact" className="flex items-center">
                  무료 상담 신청
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="font-bold shadow-lg px-8 py-4 text-lg"
              >
                <Link href="#services" className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  서비스 살펴보기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 서비스 실적 통계 섹션 */}
        <section
          ref={statsSectionRef}
          className="section bg-gradient-to-r from-muted/30 to-background"
        >
          <div className="container">
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Award className="h-3 w-3 mr-1" />
                Proven Excellence
              </Badge>

              <h2 className="mb-6 font-bold text-balance animate-slide-up">
                <span className="text-primary">검증된 실적</span>과{' '}
                <span className="text-primary">전문성</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {serviceStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        startAnimation={startAnimation}
                        duration={1500 + index * 200}
                        easingFunction={t => 1 - Math.pow(1 - t, 3)}
                      />
                    </div>
                    <div className="font-semibold text-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground text-pretty">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 전문 서비스 카테고리 섹션 */}
        <section id="services" className="section">
          <div className="container">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Building className="h-3 w-3 mr-1" />
                Comprehensive Services
              </Badge>

              <h2 className="mb-6 font-bold text-balance animate-slide-up">
                <span className="text-primary">8개 분야 34개</span> 전문 서비스
              </h2>

              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up leading-relaxed"
                style={{ animationDelay: '100ms' }}
              >
                기업가의 모든 고민을 해결하는 체계적이고 전문적인 서비스
                포트폴리오
              </p>
            </div>

            {/* 서비스 카테고리 필터 */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="mb-2"
              >
                전체 서비스
              </Button>
              {SERVICE_CATEGORIES.map(category => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                >
                  {category.title}
                </Button>
              ))}
            </div>

            {/* 서비스 카테고리 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {filteredCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-slide-up hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="pb-4">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center mr-4">
                          <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-3">
                        {category.services.map((service, serviceIndex) => (
                          <div
                            key={serviceIndex}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-white">
                                {service.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          총{' '}
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {category.services.length}개
                          </span>{' '}
                          전문 서비스
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 상세 서비스 탭 */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  상세 서비스 안내
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  각 서비스별 세부 내용과 혜택을 확인하세요
                </p>
              </div>

              <Tabs defaultValue={SERVICE_CATEGORIES[0]?.id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
                  {SERVICE_CATEGORIES.map(category => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="text-xs p-2"
                    >
                      {category.title.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {SERVICE_CATEGORIES.map(category => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="space-y-6"
                  >
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                      >
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                            {service.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {service.description}
                          </p>
                        </div>
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h5 className="font-semibold mb-3 text-gray-900 dark:text-white">
                                주요 서비스
                              </h5>
                              <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold mb-3 text-gray-900 dark:text-white">
                                기대 효과
                              </h5>
                              <ul className="space-y-2">
                                {service.benefits.map((benefit, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-sm"
                                  >
                                    <ArrowRight className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {benefit}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold mb-3 text-gray-900 dark:text-white">
                                대상 고객
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                {service.targetClient}
                              </p>
                              {service.caseStudy && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                  <h6 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">
                                    성공 사례
                                  </h6>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                                    {service.caseStudy.situation}
                                  </p>
                                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    {service.caseStudy.result}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* 전문가 팀 - 숨김 처리 */}
        {/* <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm">Expert Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">중소중견기업 전문가 팀</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">20년 이상의 경험을 보유한 중소중견기업 자산관리 전문가들이 함께합니다</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `0ms` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">임재홍</h3>
                <p className="text-primary font-medium mb-1">대표 컨설턴트 / 수석</p>
                <p className="text-sm text-muted-foreground mb-2">중소중견기업 전문, 패밀리오피스 설계</p>
                <p className="text-muted-foreground text-sm">대형 금융그룹 출신으로 중소중견기업 자산관리 경험과 전문성 보유</p>
              </div>
              <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `150ms` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">장현오</h3>
                <p className="text-primary font-medium mb-1 playfair-display-bold">FamilyOffice S</p>
                <p className="text-sm text-muted-foreground mb-2">제조업·건설업 전문, 중대재해처벌법 대응</p>
                <p className="text-muted-foreground text-sm">위험업종 전문 보험설계 및 기업재해보장보험 설계 전문가</p>
              </div>
              <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `300ms` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">박병학</h3>
                <p className="text-primary font-medium mb-1">세무 회계 본부장</p>
                <p className="text-sm text-muted-foreground mb-2">가족법인 설립, 승계 설계, MSO 구조화</p>
                <p className="text-muted-foreground text-sm">Big4 회계법인 출신으로 중소중견기업 세무 및 승계 전문가</p>
              </div>
              <div className="card-modern p-8 text-center animate-up" style={{ animationDelay: `450ms` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">주상미</h3>
                <p className="text-primary font-medium mb-1">FP (Financial Planner)</p>
                <p className="text-sm text-muted-foreground mb-2">투자 포트폴리오 관리, 리스크 헤지</p>
                <p className="text-muted-foreground text-sm">투자은행 출신으로 중소중견기업 맞춤형 투자전략 설계 전문가</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* 업종별 특화 서비스 섹션 (프리미엄 Tabs) - 숨김 처리 */}
        {/* <IndustryServicesTabsSection /> */}

        {/* 연락처 및 CTA 섹션 */}
        <section
          id="contact"
          className="section bg-gradient-to-r from-primary/5 to-primary/10"
        >
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="mb-4 animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Phone className="h-3 w-3 mr-1" />
                상담 문의
              </Badge>

              <h2 className="mb-6 font-bold text-balance animate-slide-up">
                전문 컨설팅 상담 문의
              </h2>

              <p
                className="text-xl text-muted-foreground mb-8 text-balance animate-slide-up leading-relaxed"
                style={{ animationDelay: '100ms' }}
              >
                8개 분야 34개 전문 서비스로 기업가의 모든 고민을 해결해드립니다
              </p>

              {/* 연락처 정보 */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                <div className="card p-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">전화 상담</h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    0502-5550-8700
                  </p>
                  <p className="text-sm text-muted-foreground">
                    평일 10:00~18:00
                  </p>
                </div>
                <div className="card p-6 text-center">
                  <Building className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">카카오채널</h3>
                  <p className="text-lg font-bold text-primary mb-2">
                    @패밀리오피스
                  </p>
                  <p className="text-sm text-muted-foreground">
                    24시간 상담 가능
                  </p>
                </div>
                <div className="card p-6 text-center">
                  <Building className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">상담 예약</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    온라인 예약 시스템
                  </p>
                  <p className="text-sm text-muted-foreground">
                    원하는 시간에 예약
                  </p>
                </div>
              </div>

              {/* 오피스 주소 */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up"
                style={{ animationDelay: '250ms' }}
              >
                <div className="card p-6">
                  <Building className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">서초 오피스</h3>
                  <p className="text-muted-foreground mb-2">
                    서울 서초구 서초대로 74길 4
                  </p>
                  <p className="text-sm text-muted-foreground">
                    지하철 3호선 남부터미널역 5번출구
                  </p>
                </div>

                <div className="card p-6">
                  <Building className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">종로 오피스</h3>
                  <p className="text-muted-foreground mb-2">
                    서울시 종로구 종로 33
                  </p>
                  <p className="text-sm text-muted-foreground">
                    지하철 1호선 종각역 1번출구
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: '300ms' }}
              >
                <Button size="lg" asChild className="btn-primary group">
                  <Link
                    href="https://cal.com/familyoffice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    상담 예약 바로가기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href="http://pf.kakao.com/_gsxkxdG/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    카카오톡 상담하기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
