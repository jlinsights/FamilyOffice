'use client';

import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Crown,
  Star
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { BreadcrumbNavigation } from '@/components/seo/breadcrumb-navigation';

import { PremiumFAQ } from '@/components/faq/premium-faq';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { StructuredData } from '@/components/structured-data';
import { SEO_PAGE_MAPPING, SERVICE_CATEGORIES, getServiceStats } from '@/constants/services';
import { generateInternalLinks } from '@/lib/seo/content-optimizer';
import { generateStructuredData } from '@/lib/seo/structured-data';
import { sanitizeHTMLContent, isTextOnlyContent } from '@/lib/security/html-sanitizer';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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
        <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-sm animate-fade-in">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">Premium Solutions</span>
                <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
                  <Briefcase className="h-3 w-3 mr-1" />
                  전문가 솔루션
                </span>
              </div>
            </div>

            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-8 text-slate-900 dark:text-white whitespace-pre-line animate-slide-up tracking-tight">
              프리미엄 <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">자산관리 솔루션</span>{'\n'}패밀리오피스
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300 mb-6 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <span className="text-blue-600 dark:text-blue-400">개인자산 30억+ 고액자산가</span> 전용 솔루션
            </p>

            <p
              className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed font-light"
              style={{ animationDelay: '300ms' }}
            >
              <strong className="font-semibold text-slate-900 dark:text-white">중견기업 CEO</strong>와 <strong className="font-semibold text-slate-900 dark:text-white">고액자산가</strong>를 위한 <strong className="font-semibold text-slate-900 dark:text-white">프리미엄 패밀리오피스</strong>.<br className="hidden md:block" />
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                법인 자산관리, 가업승계, 세무 최적화, 리스크 관리
              </span>
              를 아우르는<br className="hidden md:block" /> <strong className="font-semibold text-slate-900 dark:text-white">통합 자산관리 생태계</strong>를 제공합니다
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <CalComPopup
                buttonText="무료 자산관리 상담"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl rounded-full"
                eventType="consultation"
              />
              <Button variant="outline" size="lg" className="font-bold px-8 py-4 text-lg shadow-lg rounded-full border-2 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                <Link href="/about">소개 보기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsSectionRef} className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="text-blue-400">삼성생명 프리미엄</span> 패밀리오피스 파트너
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
                <strong className="text-white">500억원+ 자산관리 실적</strong>과 <strong className="text-white">20년+ 전문 경력</strong>으로 검증된 신뢰성
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  value: 500,
                  suffix: '억원+',
                  label: '자산관리 실적',
                  color: 'text-blue-400',
                },
                {
                  value: 30,
                  suffix: '억+',
                  label: '개인자산 관리기준',
                  color: 'text-emerald-400',
                },
                {
                  value: 20,
                  suffix: '년+',
                  label: '전문 경험',
                  color: 'text-purple-400',
                },
                {
                  value: 500,
                  suffix: '+',
                  label: '법인 고객사',
                  color: 'text-amber-400',
                },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.color}`}>
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={startAnimation}
                      duration={1500 + index * 200}
                    />
                  </div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">체계적인</span> 컨설팅 프로세스
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                20년 경력의 전문가들이 검증된 프로세스로 최적의 솔루션을 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>

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
                <div key={index} className="relative text-center z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-slate-50 dark:border-slate-900">
                    {process.icon}
                  </div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 tracking-widest">STEP {process.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{process.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{process.description}</p>
                  <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">{process.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm">
                <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Solutions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">{totalCategories}개 분야</span> {totalServices}개 프리미엄 <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">자산관리 서비스</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                <strong className="font-semibold text-slate-900 dark:text-white">개인자산 30억+ 고액자산가</strong>와 <strong className="font-semibold text-slate-900 dark:text-white">중견기업 CEO</strong>를 위한 <span className="font-bold text-blue-600 dark:text-blue-400">맞춤형 패밀리오피스 솔루션</span>.<br />
                <strong>법인종신보험</strong> 설계부터 포트폴리오 관리, 세무최적화까지 통합 <strong>자산관리 컨설팅</strong>을 제공합니다
              </p>
              
              {/* Success Rate Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg max-w-4xl mx-auto">
                {[
                  { label: "성공률", value: "98%", icon: "🎯" },
                  { label: "평균 절세", value: "40%", icon: "💰" },
                  { label: "완료 프로젝트", value: "500+", icon: "✅" }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center gap-3 px-4">
                    <span className="text-2xl">{metric.icon}</span>
                    <div className="text-left">
                      <div className="font-black text-2xl text-slate-900 dark:text-white">{metric.value}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-16">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className={`font-bold text-sm rounded-full px-6 py-2 transition-all duration-300 ${selectedCategory === 'all' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  전체 ({totalServices}개)
                </Button>
                {[
                  { id: 'corporate-insurance-finance', label: '🏢 기업보험·금융', count: 10 },
                  { id: 'business-succession', label: '🔄 가업승계', count: 5 },
                  { id: 'asset-management', label: '💼 자산관리', count: 4 },
                  { id: 'tax-accounting', label: '💰 세무회계', count: 4 },
                  { id: 'investment-finance', label: '📈 투자금융', count: 4 },
                  { id: 'patent-startup', label: '💡 특허·창업', count: 3 },
                  { id: 'ma-debt', label: '🤝 M&A·부실채권', count: 3 },
                  { id: 'finance-tax-labor', label: '📋 통합관리', count: 3 },
                ].map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`font-bold text-sm rounded-full px-6 py-2 transition-all duration-300 ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-lg scale-105 border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {cat.label} ({cat.count}개)
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-16">
              {filteredServices.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-24">
                  {selectedCategory === 'all' && (
                    <div className="mb-10 pl-4 border-l-4 border-blue-600 dark:border-blue-400">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">{category.title}</h3>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md">
                          {category.services.length}개 서비스
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={`${category.id}-${serviceIndex}`}
                        className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        style={{
                          animationDelay: `${serviceIndex * 100}ms`,
                        }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Premium Badge */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <span className="px-2 py-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 text-[10px] font-black uppercase tracking-wider rounded-sm shadow-sm">
                            Premium
                          </span>
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md border border-slate-100 dark:border-slate-700">
                              <category.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-right mt-2">
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</div>
                              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md inline-block">
                                {category.title}
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2 h-10">
                            {service.description}
                          </p>

                          {/* Key Benefits */}
                          <div className="space-y-3 mb-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                            <div className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                              <Star className="h-3 w-3 text-amber-400 mr-1 fill-amber-400" /> 핵심 혜택
                            </div>
                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start text-sm">
                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-600 dark:text-slate-300 leading-tight text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Client Type */}
                          <div className="mb-6">
                            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">추천 고객</div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{service.targetClient}</div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3 mt-auto">
                            <Button
                              asChild
                              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-5"
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
                              className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all duration-300 rounded-xl py-5"
                              eventType="consultation"
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
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <Crown className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">성공한 CEO들</span>이 말하는 FamilyOffice S
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-light">
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
                <div key={index} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-amber-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{testimonial.service}</span>
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                    &ldquo;{testimonial.review}&rdquo;
                  </blockquote>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                    <div className="font-bold text-slate-900 dark:text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">{testimonial.company}</div>
                    <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg w-fit">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-sm font-bold text-green-700 dark:text-green-300">{testimonial.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 px-2">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">궁금한</span> 모든 것에 답변드립니다
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <PremiumFAQ
                items={[
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
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <strong className="text-blue-300">고액자산가 전용</strong> 프리미엄 자산관리 상담
            </h2>
            <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light">
              <strong className="text-white">개인자산 30억+</strong> 고객님의 성공적인 미래를 위한 <strong className="text-white">맞춤형 패밀리오피스 솔루션</strong>을 함께 설계해보세요
            </p>
            
            {/* Urgency Indicator */}
            <div className="flex justify-center mb-10">
              <div className="bg-white/10 border border-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
                <div className="flex items-center justify-center text-white text-sm font-bold">
                  ⏰ <span className="ml-2">매월 선착순 20분 한정 · 전문가 직접 상담</span>
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
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-xl rounded-full px-8 py-6 text-lg border-none">
                    무료 자산관리 상담 (월 20분 한정)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full px-8 py-6 text-lg font-bold" asChild>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오톡 간편 상담
                </Link>
              </Button>
            </div>
            
            <div className="text-sm text-blue-200/60 mt-8 font-medium">
              💡 평균 상담 시간: 45분 | 맞춤 솔루션 제안: 100% | 추가 비용: 없음
            </div>
          </div>
        </section>

        {/* SEO 컨텐츠 최적화 섹션 */}
        <section className="py-12 bg-slate-50 dark:bg-slate-900/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Security: sanitize HTML content before rendering */}
              <div className="hidden" dangerouslySetInnerHTML={{ 
                __html: sanitizeHTMLContent(pageContent) 
              }} />
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

  // 검색엔진 최적화 구조화 데이터 추가
  const faqItems = [
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
  ];
  const faqData = generateStructuredData('FAQPage', faqItems);

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <StructuredData data={faqData} />
      <ServicePageContent />
    </>
  );
}