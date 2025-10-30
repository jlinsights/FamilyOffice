'use client';

import {
  CheckCircle,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { BreadcrumbNavigation } from '@/components/seo/breadcrumb-navigation';
import { ContentOptimizer } from '@/components/seo/content-optimizer';

import { SERVICE_CATEGORIES, SEO_PAGE_MAPPING, getServiceStats } from '@/constants/services';
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { generateInternalLinks } from '@/lib/seo/content-optimizer';
import { KEYWORD_CLUSTERS } from '@/lib/seo/keyword-strategy';

const ServicePageContent = () => {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const statsSectionRef = React.useRef<HTMLDivElement>(null);
  
  // 서비스 통계 정보 동적 계산
  const { totalCategories, totalServices } = getServiceStats();
  
  // SEO 최적화된 페이지 컨텐츠
  const pageContent = React.useMemo(() => {
    const baseContent = `
      프리미엄 자산관리 솔루션. 성공한 기업가와 개인자산 30억+ 자산가를 위한 맞춤형 패밀리오피스 서비스.
      가업승계부터 개인자산관리까지 통합 자산관리 솔루션. 포트폴리오 관리, 투자자문, 세무 컨설팅, 보험설계까지 원스톱 서비스.
      삼성생명 1000억+ 운용실적을 바탕으로 한 맞춤형 자산관리 솔루션. 중견기업 CEO와 고액자산가 전용 프리미엄 패밀리오피스.
      기업승계 전략, 세무최적화, 리스크관리를 통한 체계적인 자산관리. ${totalCategories}개 분야 ${totalServices}개 전문 솔루션 제공.
      성공률 98%, 평균 절세 40%, 완료 프로젝트 500+ 실적. 20년 경력의 전문가들이 검증된 프로세스로 최적의 솔루션 제공.
    `;
    
    return generateInternalLinks(baseContent, '/solutions');
  }, [totalCategories, totalServices]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filterServices = (categoryId: string) => {
    if (categoryId === 'all') return SERVICE_CATEGORIES;
    return SERVICE_CATEGORIES.filter(service => service.id === categoryId);
  };

  const filteredServices = filterServices(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* 브레드크럼 네비게이션 */}
        <div className="container mx-auto px-6 py-4">
          <BreadcrumbNavigation customItems={[
            { name: '홈', url: 'https://familyoffices.vip' },
            { name: '솔루션', url: 'https://familyoffices.vip/solutions', isCurrentPage: true }
          ]} />
        </div>
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <Badge variant="outline" size="lg" animation="fade">
                <Briefcase className="h-3 w-3 mr-1" />
                Premium Solutions
              </Badge>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
              프리미엄 <strong>자산관리 솔루션</strong>{'\n'}<span className="text-blue-600">패밀리오피스</span>
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <strong>개인자산 30억+ 고액자산가</strong> 전용 솔루션
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              <strong>중견기업 CEO</strong>와 <strong>고액자산가</strong>를 위한 맞춤형 <strong>패밀리오피스 서비스</strong>.{' '}
              <span className="font-semibold text-primary">
                법인종신보험 설계, 포트폴리오 관리, 투자자문, 세무 컨설팅
              </span>{' '}
              까지 원스톱 <strong>자산관리 솔루션</strong>을 제공합니다
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <CalComPopup
                buttonText="무료 자산관리 상담"
                variant="default"
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button variant="outline" size="lg" className="font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg" asChild>
                <Link href="/about">소개</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsSectionRef} className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">삼성생명 프리미엄</span> 패밀리오피스 파트너
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <strong>1000억+ 자산관리 실적</strong>과 <strong>20년+ 전문 경력</strong>으로 검증된 신뢰성
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  value: 1000,
                  suffix: '억원+',
                  label: '통합자산 관리실적',
                  color: 'text-blue-600 dark:text-blue-400',
                },
                {
                  value: 30,
                  suffix: '억+',
                  label: '개인자산 관리기준',
                  color: 'text-green-600 dark:text-green-400',
                },
                {
                  value: 20,
                  suffix: '년+',
                  label: '평균 경력',
                  color: 'text-purple-600 dark:text-purple-400',
                },
                {
                  value: 800,
                  suffix: '+',
                  label: '기업·자산가 고객',
                  color: 'text-orange-600 dark:text-orange-400',
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={startAnimation}
                      duration={1500 + index * 200}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  컨설팅 프로세스
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">체계적인</span> 컨설팅 프로세스
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                20년 경력의 전문가들이 검증된 프로세스로 최적의 솔루션을 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
              {[
                {
                  step: "01",
                  title: "현황 진단",
                  description: "기업 현황 및 자산 구조 정밀 분석",
                  icon: "🔍",
                  duration: "1-2주"
                },
                {
                  step: "02", 
                  title: "전략 수립",
                  description: "맞춤형 솔루션 전략 설계 및 제안",
                  icon: "📋",
                  duration: "2-3주"
                },
                {
                  step: "03",
                  title: "실행 계획",
                  description: "단계별 실행 계획 수립 및 준비",
                  icon: "⚡",
                  duration: "1-2주"
                },
                {
                  step: "04",
                  title: "사후 관리",
                  description: "지속적인 모니터링 및 최적화",
                  icon: "📊",
                  duration: "지속적"
                }
              ].map((process, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                    {process.icon}
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">{process.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{process.description}</p>
                  <Badge variant="outline" size="xs">{process.duration}</Badge>
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-primary/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <Briefcase className="h-3 w-3 mr-1" />
                  전문 솔루션
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">{totalCategories}개 분야</span> {totalServices}개 프리미엄 <strong>자산관리 서비스</strong>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                <strong>개인자산 30억+ 고액자산가</strong>와 <strong>중견기업 CEO</strong>를 위한 <span className="font-bold text-primary">맞춤형 패밀리오피스 솔루션</span>. <strong>법인종신보험</strong> 설계부터 포트폴리오 관리, 세무최적화까지 통합 <strong>자산관리 컨설팅</strong>을 제공합니다
              </p>
              
              {/* Success Rate Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                {[
                  { label: "성공률", value: "98%", icon: "🎯" },
                  { label: "평균 절세", value: "40%", icon: "💰" },
                  { label: "완료 프로젝트", value: "500+", icon: "✅" }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xl">{metric.icon}</span>
                    <span className="font-bold text-primary">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="font-semibold text-sm"
                >
                  전체 ({totalServices}개)
                </Button>
                <Button
                  variant={selectedCategory === 'corporate-insurance-finance' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('corporate-insurance-finance')}
                  className="font-semibold text-sm"
                >
                  🏢 기업보험·금융 (9개)
                </Button>
                <Button
                  variant={selectedCategory === 'business-succession' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('business-succession')}
                  className="font-semibold text-sm"
                >
                  🔄 가업승계 (5개)
                </Button>
                <Button
                  variant={selectedCategory === 'asset-management' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('asset-management')}
                  className="font-semibold text-sm"
                >
                  💼 자산관리 (4개)
                </Button>
                <Button
                  variant={selectedCategory === 'tax-accounting' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('tax-accounting')}
                  className="font-semibold text-sm"
                >
                  💰 세무회계 (4개)
                </Button>
                <Button
                  variant={selectedCategory === 'investment-finance' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('investment-finance')}
                  className="font-semibold text-sm"
                >
                  📈 투자금융 (4개)
                </Button>
                <Button
                  variant={selectedCategory === 'patent-startup' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('patent-startup')}
                  className="font-semibold text-sm"
                >
                  💡 특허·창업 (3개)
                </Button>
                <Button
                  variant={selectedCategory === 'ma-debt' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('ma-debt')}
                  className="font-semibold text-sm"
                >
                  🤝 M&A·부실채권 (3개)
                </Button>
                <Button
                  variant={selectedCategory === 'finance-tax-labor' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('finance-tax-labor')}
                  className="font-semibold text-sm"
                >
                  📋 통합관리 (3개)
                </Button>
              </div>
            </div>

            <div className="space-y-12">
              {filteredServices.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-20">
                  {selectedCategory === 'all' && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <category.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                        <Badge variant="outline" className="text-sm">
                          {category.services.length}개 서비스
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-6">{category.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={`${category.id}-${serviceIndex}`}
                        className="group relative bg-gradient-to-br from-background to-background/50 border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 overflow-hidden"
                        style={{
                          animationDelay: `${serviceIndex * 100}ms`,
                        }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Premium Badge */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <Badge variant="outline" size="xs" className="bg-white/95 dark:bg-gray-900/95 text-primary border-primary/50 shadow-lg backdrop-blur-sm">
                            Premium
                          </Badge>
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <category.icon className="h-7 w-7 text-primary" />
                            </div>
                            <div className="text-right mt-3">
                              <Badge variant="secondary" size="xs" className="mb-1">
                                {category.title}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                전문 컨설팅
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-5 text-sm leading-relaxed line-clamp-2">
                            {service.description}
                          </p>

                          {/* Key Benefits */}
                          <div className="space-y-2 mb-6">
                            <div className="text-xs font-semibold text-primary mb-2">핵심 혜택</div>
                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground leading-tight">{feature}</span>
                              </div>
                            ))}
                            {service.features.length > 3 && (
                              <div className="text-xs text-primary font-medium">
                                +{service.features.length - 3}개 추가 혜택
                              </div>
                            )}
                          </div>

                          {/* Client Type */}
                          <div className="mb-6 p-3 bg-muted/30 rounded-lg">
                            <div className="text-xs font-semibold text-primary mb-1">추천 고객</div>
                            <div className="text-xs text-muted-foreground">{service.targetClient}</div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3 mt-6">
                            <Button
                              asChild
                              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                              size="sm"
                            >
                              <Link href={SEO_PAGE_MAPPING[service.title] || `/solutions/${category.id}/${service.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                자세히 알아보기
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                            <CalComPopup
                              buttonText="무료 상담 신청"
                              variant="outline"
                              size="sm"
                              className="w-full border-primary/60 text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300"
                              eventType="consultation"
                              trigger={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-primary/60 text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300"
                                >
                                  무료 상담 신청 →
                                </Button>
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  ⭐ 고객 후기
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">성공한 CEO들</span>이 말하는 FamilyOffice S
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                실제 고객들의 솔직한 후기를 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "김○○ 대표",
                  company: "○○건설 (매출 200억)",
                  review: "가업승계 과정에서 40% 이상 절세할 수 있었습니다. 전문적이고 체계적인 솔루션에 매우 만족합니다.",
                  service: "가업승계 컨설팅",
                  result: "절세 42%",
                  rating: 5
                },
                {
                  name: "박○○ 대표",
                  company: "○○제조 (직원 150명)",
                  review: "기업재해처벌법 대응부터 법인보험 최적화까지 토탈 솔루션으로 안전하게 해결했습니다.",
                  service: "기업리스크 관리",
                  result: "100% 법적 리스크 해결",
                  rating: 5
                },
                {
                  name: "이○○ 회장",
                  company: "○○그룹 (자산 300억)",
                  review: "차세대 승계 준비를 체계적으로 진행할 수 있어 안심이 됩니다. 20년 경력의 전문성이 느껴집니다.",
                  service: "패밀리오피스",
                  result: "승계 준비 완료",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <Badge variant="outline" size="xs">{testimonial.service}</Badge>
                  </div>
                  <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                    &ldquo;{testimonial.review}&rdquo;
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{testimonial.company}</div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-600">{testimonial.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  ❓ 자주 묻는 질문
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">궁금한</span> 모든 것에 답변드립니다
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "법인종신보험이 자산관리에 꼭 필요한가요?",
                  answer: "법인종신보험은 CEO의 유고시 리스크 관리와 세무 최적화를 동시에 해결하는 핵심 도구입니다. 사망보장을 통한 기업 안정성 확보, 해약환급금을 통한 퇴직금 준비, 상속세 납부 재원 확보 등 다목적 활용이 가능하여 성공한 기업가에게 필수적입니다."
                },
                {
                  question: "법인종신보험의 세무상 혜택은 무엇인가요?",
                  answer: "법인에서 납입하는 보험료는 손금 처리가 가능하고, 사망보험금은 비과세로 수령할 수 있습니다. 또한 해약환급금은 퇴직금 지급 재원으로 활용하여 법인의 현금 흐름을 개선하고, 가업승계 시 상속세 납부 재원으로도 활용 가능합니다."
                },
                {
                  question: "컨설팅 비용은 어떻게 되나요?",
                  answer: "기업 규모와 서비스 범위에 따라 맞춤 견적을 제공합니다. 초기 상담은 무료이며, 구체적인 비용은 현황 분석 후 투명하게 안내드립니다."
                },
                {
                  question: "컨설팅 기간은 얼마나 걸리나요?",
                  answer: "프로젝트 복잡도에 따라 4-12주 소요됩니다. 현황진단(1-2주) → 전략수립(2-3주) → 실행계획(1-2주) → 사후관리(지속적) 순으로 진행됩니다."
                },
                {
                  question: "어떤 분들이 서비스를 받을 수 있나요?",
                  answer: "매출 10억 이상의 중소중견기업 CEO, 개인자산 30억 이상의 고액자산가, 가업승계를 준비하는 성공한 기업가분들께 최적화된 통합 자산관리 서비스를 제공합니다."
                },
                {
                  question: "실제 절세 효과는 어느 정도인가요?",
                  answer: "평균적으로 30-40%의 절세 효과를 기대할 수 있으며, 일부 사례에서는 50% 이상의 절세를 달성했습니다. 개별 기업 상황에 따라 차이가 있습니다."
                },
                {
                  question: "서비스 완료 후에도 지원받을 수 있나요?",
                  answer: "네, 사후관리 서비스를 통해 지속적으로 모니터링하고 변화하는 세법에 따른 업데이트를 제공합니다. 1년간 무료 사후지원이 포함됩니다."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold text-foreground mb-3 flex items-start">
                    <span className="text-primary font-bold mr-2">Q.</span>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    <span className="text-primary font-bold mr-2">A.</span>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              <strong>고액자산가 전용</strong> 프리미엄 자산관리 상담
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              <strong>개인자산 30억+</strong> 고객님의 성공적인 미래를 위한 <strong>맞춤형 패밀리오피스 솔루션</strong>을 함께 설계해보세요
            </p>
            
            {/* Urgency Indicator */}
            <div className="flex justify-center mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
                <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-2">
                  ⏰ <span className="ml-2 font-semibold">한정 무료 상담</span>
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">
                  매월 선착순 20분 한정 · 전문가 직접 상담
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 자산관리 상담"
                variant="default"
                size="lg"
                eventType="consultation"
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                    무료 자산관리 상담 (월 20분 한정)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오톡 간편 상담
                </Link>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mt-6">
              💡 평균 상담 시간: 45분 | 맞춤 솔루션 제안: 100% | 추가 비용: 없음
            </div>
          </div>
        </section>

        {/* SEO 컨텐츠 최적화 섹션 */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="hidden" dangerouslySetInnerHTML={{ __html: pageContent }} />
            </div>
          </div>
        </section>
        
        {/* Multimedia Content Section */}
        <CompactMultimediaSection />
      </main>

      <Footer />
    </div>
  );
};

export default function ServicePage() {
  const structuredData = generateStructuredData('Service');
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
        name: '솔루션',
        item: 'https://familyoffices.vip/solutions',
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <ServicePageContent />
    </>
  );
}