'use client';

import {
  AlertTriangle,
  ArrowRight,
  Building,
  Calculator,
  CheckCircle,
  Crown,
  DollarSign,
  FileText,
  Lightbulb,
  Shield,
  Star,
  Target,
  TrendingDown,
  Trophy,
  Users,
} from 'lucide-react';

import React from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const TaxStrategyPage = () => {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const statsSectionRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <Badge variant="outline" size="lg" animation="fade">
                <Calculator className="h-3 w-3 mr-1" />
                절세의 미학
              </Badge>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
              절세의 미학{'\n'}Smart Tax Strategy
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              세금을 줄이는 것이 아닌, 세금을 지혜롭게 관리하는 것
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              삼성생명과 함께하는{' '}
              <span className="font-semibold text-primary">
                체계적인 절세 전략
              </span>
              으로{' '}
              <span className="font-semibold text-emerald-600">
                법인세 30%, 소득세 40%, 상속세 50%
              </span>{' '}
              절감을 경험하세요
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <CalComPopup
                buttonText="절세 전략 상담"
                variant="default"
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold shadow-xl"
                eventType="consultation"
              />
              <Button
                variant="outline"
                size="lg"
                className="font-bold px-8 py-4 text-lg shadow-lg"
                asChild
              >
                <Link href="#strategies">절세 전략 보기</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                {
                  value: '40%',
                  label: '평균 절세율',
                  color: 'text-emerald-600',
                },
                { value: '500+', label: '성공 사례', color: 'text-blue-600' },
                { value: '20년', label: '전문 경력', color: 'text-purple-600' },
                {
                  value: '98%',
                  label: '고객 만족도',
                  color: 'text-orange-600',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm border border-white/20"
                >
                  <div
                    className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Savings Calculator Section */}
        <section
          ref={statsSectionRef}
          className="py-20 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <DollarSign className="h-3 w-3 mr-1" />
                  절세 시뮬레이션
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">나의 절세 효과</span> 미리
                확인하기
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                현재 상황에 따른 예상 절세 금액을 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '법인세 절세',
                  description: '법인세 최적화 전략',
                  beforeTax: 50000000,
                  afterTax: 35000000,
                  savingRate: 30,
                  icon: Building,
                  color: 'emerald',
                },
                {
                  title: '소득세 절세',
                  description: '개인소득세 절감 방안',
                  beforeTax: 30000000,
                  afterTax: 18000000,
                  savingRate: 40,
                  icon: Users,
                  color: 'blue',
                },
                {
                  title: '상속세 절세',
                  description: '상속세 부담 최소화',
                  beforeTax: 200000000,
                  afterTax: 100000000,
                  savingRate: 50,
                  icon: Shield,
                  color: 'purple',
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500 group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-${item.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg flex items-center justify-center`}
                      >
                        <item.icon
                          className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`}
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className={`bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-700 dark:text-${item.color}-300`}
                      >
                        {item.savingRate}% 절세
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          절세 전
                        </span>
                        <span className="font-bold text-red-600">
                          {(item.beforeTax / 10000).toLocaleString()}만원
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          절세 후
                        </span>
                        <span
                          className={`font-bold text-${item.color}-600 dark:text-${item.color}-400`}
                        >
                          {(item.afterTax / 10000).toLocaleString()}만원
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">절세 금액</span>
                          <span
                            className={`text-xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}
                          >
                            <AnimatedCounter
                              end={(item.beforeTax - item.afterTax) / 10000}
                              suffix="만원"
                              startAnimation={startAnimation}
                              duration={2000 + index * 300}
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <CalComPopup
                      buttonText="상담 신청"
                      variant="outline"
                      size="sm"
                      className={`w-full border-${item.color}-200 text-${item.color}-700 hover:bg-${item.color}-50`}
                      eventType="consultation"
                      trigger={
                        <Button variant="outline" size="sm" className="w-full">
                          맞춤 절세 상담 →
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Strategy Tabs Section */}
        <section id="strategies" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <Target className="h-3 w-3 mr-1" />
                  절세 전략
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">맞춤형</span> 절세 전략 솔루션
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                삼성생명과 함께하는 검증된 절세 전략으로 세금 부담을 혁신적으로
                줄여보세요
              </p>
            </div>

            <Tabs defaultValue="corporate" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger
                  value="corporate"
                  className="text-sm font-semibold"
                >
                  법인 절세
                </TabsTrigger>
                <TabsTrigger value="personal" className="text-sm font-semibold">
                  개인 절세
                </TabsTrigger>
                <TabsTrigger
                  value="succession"
                  className="text-sm font-semibold"
                >
                  승계 절세
                </TabsTrigger>
              </TabsList>

              {/* 법인 절세 전략 */}
              <TabsContent value="corporate" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: '가지급금 정리 전략',
                      description: '가지급금 해소를 통한 세무리스크 제거',
                      benefits: [
                        '의제배당 부담 해소',
                        '세무조사 리스크 제거',
                        '재무제표 건전성 확보',
                        '내부통제 시스템 구축',
                      ],
                      expectedSaving: '의제배당세 80% 절감',
                      caseStudy: 'IT기업 R사: 8억 가지급금 완전 정리',
                      icon: FileText,
                      color: 'blue',
                    },
                    {
                      title: '자기주식 활용',
                      description: '자기주식 취득·소각을 통한 세무최적화',
                      benefits: [
                        '배당소득세 부담 경감',
                        '주가 안정화 효과',
                        '재무구조 개선',
                        '배당정책 유연성 확보',
                      ],
                      expectedSaving: '배당세 50% 절감',
                      caseStudy: '중견기업 D사: 신이익소각으로 절세 성공',
                      icon: TrendingDown,
                      color: 'purple',
                    },
                    {
                      title: '경정청구 컨설팅',
                      description: '과다납부 세금의 체계적 환급',
                      benefits: [
                        '5년간 세무신고 정밀검토',
                        '과납세액 완전 환급',
                        '세무 정확성 향상',
                        '현금 유동성 개선',
                      ],
                      expectedSaving: '평균 3,000만원 환급',
                      caseStudy: '건설업 C사: 1억 2천만원 환급 성공',
                      icon: Calculator,
                      color: 'orange',
                    },
                    {
                      title: '법인전환 컨설팅',
                      description: '개인사업자의 최적 법인전환 타이밍',
                      benefits: [
                        '세금 부담 대폭 경감',
                        '사업 확장 기반 마련',
                        '대외 신용도 향상',
                        '상속증여 유리',
                      ],
                      expectedSaving: '연간 2,000만원 절세',
                      caseStudy: '개인사업자 B씨: 법인전환으로 대폭 절세',
                      icon: Building,
                      color: 'teal',
                    },
                    {
                      title: '임원소득보장플랜',
                      description: '임원 퇴직금 최적화를 통한 절세',
                      benefits: [
                        '퇴직소득 세제혜택 활용',
                        '임원 retention 강화',
                        '세무 효율성 제고',
                        '보험활용 절세',
                      ],
                      expectedSaving: '퇴직소득세 40% 절감',
                      caseStudy: '성장기업 임원: 퇴직금플랜으로 절세',
                      icon: Users,
                      color: 'indigo',
                    },
                  ].map((strategy, index) => (
                    <Card
                      key={index}
                      className="group bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500 relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-${strategy.color}-500/5 to-${strategy.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 bg-${strategy.color}-100 dark:bg-${strategy.color}-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <strategy.icon
                              className={`h-6 w-6 text-${strategy.color}-600 dark:text-${strategy.color}-400`}
                            />
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-${strategy.color}-700 dark:text-${strategy.color}-300 border-${strategy.color}-200 dark:border-${strategy.color}-700`}
                          >
                            절세 전략
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold mb-2">
                          {strategy.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {strategy.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="relative z-10">
                        <div className="space-y-3 mb-6">
                          {strategy.benefits
                            .slice(0, 3)
                            .map((benefit, benefitIndex) => (
                              <div
                                key={benefitIndex}
                                className="flex items-start text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          {strategy.benefits.length > 3 && (
                            <div className="text-xs text-primary font-medium">
                              +{strategy.benefits.length - 3}개 추가 혜택
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 mb-6">
                          <div
                            className={`p-3 bg-${strategy.color}-50 dark:bg-${strategy.color}-900/30 rounded-lg`}
                          >
                            <div className="text-xs font-semibold text-muted-foreground mb-1">
                              예상 절세 효과
                            </div>
                            <div
                              className={`text-lg font-bold text-${strategy.color}-600 dark:text-${strategy.color}-400`}
                            >
                              {strategy.expectedSaving}
                            </div>
                          </div>

                          <div className="p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
                            <div className="text-xs font-semibold text-muted-foreground mb-1">
                              성공 사례
                            </div>
                            <div className="text-sm text-foreground">
                              {strategy.caseStudy}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            asChild
                            className={`flex-1 bg-${strategy.color}-600 hover:bg-${strategy.color}-700 dark:bg-${strategy.color}-600 dark:hover:bg-${strategy.color}-700 text-white`}
                            size="sm"
                          >
                            <Link
                              href={`/solutions/${strategy.title.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                              자세히 보기
                            </Link>
                          </Button>
                          <CalComPopup
                            buttonText="상담"
                            variant="outline"
                            size="sm"
                            className={`border-${strategy.color}-200 dark:border-${strategy.color}-700 text-${strategy.color}-700 dark:text-${strategy.color}-300 hover:bg-${strategy.color}-50 dark:hover:bg-${strategy.color}-900/30`}
                            eventType="consultation"
                            trigger={
                              <Button variant="outline" size="sm">
                                상담 →
                              </Button>
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 개인 절세 전략 */}
              <TabsContent value="personal" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: '연금저축 최적화',
                      description: '연금저축을 활용한 소득공제 극대화',
                      benefits: [
                        '연 최대 700만원 세액공제',
                        '운용수익 과세이연',
                        '퇴직소득세 우대',
                        '안정적 노후자금 확보',
                      ],
                      expectedSaving: '연 105만원 절세',
                      targetClient: '고소득 개인',
                      icon: Shield,
                    },
                    {
                      title: '부동산 절세 전략',
                      description: '부동산 투자 및 보유시 절세 방안',
                      benefits: [
                        '양도소득세 절감',
                        '취득세 경감 혜택',
                        '임대소득 최적화',
                        '상속세 부담 경감',
                      ],
                      expectedSaving: '양도세 30% 절감',
                      targetClient: '부동산 투자자',
                      icon: Building,
                    },
                    {
                      title: '금융소득 절세',
                      description: '금융투자상품 활용 절세 전략',
                      benefits: [
                        '금융소득종합과세 회피',
                        '배당소득 최적화',
                        'ISA 계좌 활용',
                        '해외투자 절세',
                      ],
                      expectedSaving: '금융소득세 50% 절감',
                      targetClient: '금융투자자',
                      icon: TrendingDown,
                    },
                  ].map((strategy, index) => (
                    <Card
                      key={index}
                      className="group bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-lg dark:hover:shadow-white/5 transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <strategy.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <Badge
                            variant="outline"
                            className="text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                          >
                            개인 절세
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold mb-2">
                          {strategy.title}
                        </CardTitle>
                        <CardDescription>
                          {strategy.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-2 mb-6">
                          {strategy.benefits.map((benefit, benefitIndex) => (
                            <div
                              key={benefitIndex}
                              className="flex items-start text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <div className="text-xs font-semibold text-muted-foreground mb-1">
                              절세 효과
                            </div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {strategy.expectedSaving}
                            </div>
                          </div>

                          <div className="p-3 bg-muted/30 dark:bg-muted/20 rounded-lg">
                            <div className="text-xs font-semibold text-muted-foreground mb-1">
                              추천 고객
                            </div>
                            <div className="text-sm text-foreground">
                              {strategy.targetClient}
                            </div>
                          </div>
                        </div>

                        <CalComPopup
                          buttonText="맞춤 상담 신청"
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          eventType="consultation"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 승계 절세 전략 */}
              <TabsContent value="succession" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: '가업승계 특례 활용',
                      description: '가업상속공제 및 증여세 납부유예 혜택',
                      benefits: [
                        '상속세 최대 500억원 공제',
                        '증여세 납부유예 10년',
                        '조건 충족시 세액 면제',
                        '체계적 승계 지원',
                      ],
                      expectedSaving: '상속세 70% 절감',
                      caseStudy: '제조업 A사: 승계세 30억 → 9억으로 절감',
                      requirements: [
                        '10년 이상 사업 영위',
                        '후계자 승계 의지',
                        '고용 유지 의무',
                      ],
                      icon: Target,
                      processSteps: [
                        '가업승계 계획 수립',
                        '요건 충족 여부 검토',
                        '단계적 지분 이전',
                        '신고 및 승인 절차',
                      ],
                    },
                    {
                      title: '자녀법인 활용 전략',
                      description: '자녀법인 설립을 통한 절세 및 승계',
                      benefits: [
                        '승계세 부담 경감',
                        '경영권 분산 방지',
                        '차세대 경영 교육',
                        '안정적 승계 실행',
                      ],
                      expectedSaving: '승계비용 40% 절감',
                      caseStudy: '가족기업 B사: 자녀법인으로 성공적 승계',
                      requirements: [
                        '자녀의 경영 의지',
                        '충분한 사업 자금',
                        '단계적 승계 계획',
                      ],
                      icon: Users,
                      processSteps: [
                        '자녀법인 설립 전략',
                        '사업이관 계획 수립',
                        '세무 최적화 설계',
                        '리스크 관리 체계',
                      ],
                    },
                  ].map((strategy, index) => (
                    <Card
                      key={index}
                      className="group bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-500"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                            <strategy.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <Badge
                            variant="outline"
                            className="text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                          >
                            승계 절세
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-bold mb-3">
                          {strategy.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {strategy.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-6">
                          {/* 핵심 혜택 */}
                          <div>
                            <h4 className="font-semibold text-sm mb-3 text-purple-700 dark:text-purple-300">
                              핵심 혜택
                            </h4>
                            <div className="space-y-2">
                              {strategy.benefits.map(
                                (benefit, benefitIndex) => (
                                  <div
                                    key={benefitIndex}
                                    className="flex items-start text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                      {benefit}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* 절세 효과 및 성공 사례 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                              <div className="text-xs font-semibold text-muted-foreground mb-1">
                                절세 효과
                              </div>
                              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                {strategy.expectedSaving}
                              </div>
                            </div>

                            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
                              <div className="text-xs font-semibold text-muted-foreground mb-2">
                                성공 사례
                              </div>
                              <div className="text-sm text-foreground">
                                {strategy.caseStudy}
                              </div>
                            </div>
                          </div>

                          {/* 요건 사항 */}
                          <div>
                            <h4 className="font-semibold text-sm mb-3 text-orange-600 dark:text-orange-400 flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              주요 요건
                            </h4>
                            <div className="space-y-1">
                              {strategy.requirements.map((req, reqIndex) => (
                                <div
                                  key={reqIndex}
                                  className="text-sm text-muted-foreground"
                                >
                                  • {req}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 진행 단계 */}
                          <div>
                            <h4 className="font-semibold text-sm mb-3 text-blue-600 dark:text-blue-400">
                              진행 단계
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {strategy.processSteps.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className="flex items-center text-xs p-2 bg-blue-50 dark:bg-blue-900/30 rounded"
                                >
                                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                    {stepIndex + 1}
                                  </span>
                                  <span className="text-blue-700 dark:text-blue-300">
                                    {step}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 액션 버튼 */}
                          <div className="flex gap-2 pt-4 border-t">
                            <Button
                              asChild
                              className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
                              size="sm"
                            >
                              <Link href={`/business-succession`}>
                                자세한 정보
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                            <CalComPopup
                              buttonText="승계 상담"
                              variant="outline"
                              size="sm"
                              className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                              eventType="consultation"
                              trigger={
                                <Button variant="outline" size="sm">
                                  승계 상담 →
                                </Button>
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg" animation="fade">
                  <Trophy className="h-3 w-3 mr-1" />
                  성공 사례
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">검증된</span> 절세 성공 사례
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                삼성생명과 함께한 고객들의 실제 절세 성과를 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  company: '제조업 K사',
                  industry: '자동차부품 제조',
                  challenge: '가업승계 과정에서 높은 세금 부담 우려',
                  solution: '가업상속공제 + 단계적 증여 활용',
                  results: {
                    before: '예상 상속세 50억원',
                    after: '실제 상속세 15억원',
                    saving: '70% 절감 (35억원)',
                  },
                  timeline: '18개월',
                  ceo: '김○○ 회장',
                  testimonial:
                    '체계적인 승계 계획으로 자녀들에게 부담 없이 사업을 물려줄 수 있게 되었습니다.',
                },
                {
                  company: 'IT기업 S사',
                  industry: '소프트웨어 개발',
                  challenge: '급성장으로 인한 법인세 부담 급증',
                  solution: '경영인정기보험 + 연구개발비 최적화',
                  results: {
                    before: '연간 법인세 8억원',
                    after: '연간 법인세 5.6억원',
                    saving: '30% 절감 (2.4억원)',
                  },
                  timeline: '12개월',
                  ceo: '박○○ 대표',
                  testimonial:
                    '절세와 동시에 기업의 안정성까지 확보할 수 있는 최적의 솔루션이었습니다.',
                },
                {
                  company: '건설업 D사',
                  industry: '종합건설업',
                  challenge: '가지급금 문제로 세무조사 리스크 상존',
                  solution: '가지급금 단계적 정리 + 내부통제 강화 + 경정청구',
                  results: {
                    before: '가지급금 12억원 + 세무리스크',
                    after: '가지급금 완전 해소 + 3억원 환급',
                    saving: '리스크 제거 + 환급',
                  },
                  timeline: '24개월',
                  ceo: '최○○ 대표',
                  testimonial:
                    '오랜 숙제였던 가지급금 문제를 말끔히 해결하고 오히려 환급까지 받았습니다.',
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className="group bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
                      >
                        {story.industry}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {story.timeline} 완료
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">
                      {story.company}
                    </CardTitle>
                    <CardDescription className="text-sm font-semibold text-foreground mb-4">
                      {story.challenge}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      {/* 솔루션 */}
                      <div>
                        <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          적용 솔루션
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {story.solution}
                        </p>
                      </div>

                      {/* 결과 */}
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg">
                        <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                          절세 결과
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              절세 전:
                            </span>
                            <span className="font-medium text-red-600 dark:text-red-400">
                              {story.results.before}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              절세 후:
                            </span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {story.results.after}
                            </span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-bold">
                              <span>절세 효과:</span>
                              <span className="text-green-600 dark:text-green-400">
                                {story.results.saving}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 고객 후기 */}
                      <div className="p-3 bg-muted/50 dark:bg-muted/30 rounded-lg">
                        <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-2">
                          &ldquo;{story.testimonial}&rdquo;
                        </blockquote>
                        <div className="text-xs font-medium text-foreground">
                          - {story.ceo}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <CalComPopup
                buttonText="나만의 절세 전략 상담받기"
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold px-8 py-4 shadow-xl"
                eventType="consultation"
              />
            </div>
          </div>
        </section>

        {/* Premium Family Office Upgrade Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-800/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="mb-6 border-amber-200 dark:border-amber-700/50 bg-gradient-to-r from-amber-50/80 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/50 text-amber-800 dark:text-amber-300 shadow-lg backdrop-blur-sm"
              >
                <Crown className="h-4 w-4 mr-2" />
                Family Office Excellence
              </Badge>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-foreground dark:text-white">
                <span className="text-amber-600 dark:text-amber-400">
                  절세 전략
                </span>
                을 넘어선{' '}
                <span className="text-indigo-900 dark:text-indigo-300">
                  패밀리오피스
                </span>
              </h3>

              <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                개별 절세 전략에서{' '}
                <span className="font-bold text-indigo-900 dark:text-indigo-300">
                  통합 자산관리 솔루션
                </span>
                으로 업그레이드하세요. 최고 자산가들이 선택한 차별화된
                패밀리오피스 서비스를 경험해보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/family-office-center"
                  className="inline-flex items-center justify-center px-8 py-4 bg-indigo-900 dark:bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Crown className="h-6 w-6 mr-2" />
                  패밀리오피스 센터 보기
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Link>

                <CalComPopup
                  buttonText="VIP 전용 상담 신청"
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-foreground dark:text-amber-100 rounded-2xl"
                  eventType="consultation"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground dark:text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  <span>100억+ 자산 전용</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                  <span>전담 전문가팀</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>98% 고객 만족도</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600/10 to-blue-600/10">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Badge
                variant="outline"
                size="lg"
                className="bg-white/80 dark:bg-gray-900/80"
              >
                <Calculator className="h-3 w-3 mr-1" />
                전문가 상담
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              당신만의 <span className="text-primary">절세 전략</span>을
              설계하세요
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              삼성생명과 함께하는{' '}
              <span className="font-bold text-emerald-600">
                맞춤형 절세 컨설팅
              </span>
              으로
              <br />
              세금 부담을 혁신적으로 줄이고 미래를 준비하세요
            </p>

            {/* 상담 혜택 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
              {[
                { icon: '📊', text: '현황 진단' },
                { icon: '💡', text: '맞춤 전략' },
                { icon: '📋', text: '실행 계획' },
                { icon: '🎯', text: '성과 보장' },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/60 dark:bg-card/60 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-2xl mb-1">{benefit.icon}</div>
                  <div className="text-sm font-medium">{benefit.text}</div>
                </div>
              ))}
            </div>

            {/* 긴급성 표시 */}
            <div className="flex justify-center mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
                <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-2">
                  ⏰{' '}
                  <span className="ml-2 font-semibold">
                    세법 개정 전 마지막 기회
                  </span>
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">
                  2024년 세법 개정으로 절세 혜택 축소 예정 · 지금이 마지막 기회
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 절세 진단 받기"
                variant="default"
                size="lg"
                eventType="consultation"
                trigger={
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold px-8 py-4 shadow-xl"
                  >
                    무료 절세 진단 받기 (30분 상담)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/60 text-primary hover:bg-primary/10 font-bold px-8 py-4"
              >
                <Link
                  href="http://pf.kakao.com/_gsxkxdG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오톡 간편 상담
                </Link>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mt-6 space-y-1">
              <div>
                🎁 <strong>상담 혜택:</strong> 개인 맞춤 절세 리포트 무료 제공
              </div>
              <div>
                ⚡ <strong>상담 시간:</strong> 30-45분 전문가 직접 상담
              </div>
              <div>
                💯 <strong>만족도:</strong> 98% 고객 만족 · 100% 솔루션 제안
              </div>
            </div>
          </div>
        </section>

        {/* CEO 체크리스트 연결 섹션 */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg">
                  <FileText className="h-3 w-3 mr-1" />
                  경영 진단
                </Badge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">CEO 경영 진단</span>으로 전체적인
                준비도를 점검하세요
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                절세 전략 외에도 리스크 관리, 가업승계, 성장전략 등 5대 핵심
                영역의 준비도를
                <span className="font-semibold text-primary"> 무료로 진단</span>
                받아보세요
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">리스크 관리</h3>
                    <p className="text-sm text-muted-foreground">
                      중대재해처벌법, 기업보험 등
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                  <CardContent className="pt-6 text-center">
                    <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">가업승계</h3>
                    <p className="text-sm text-muted-foreground">
                      승계 계획, 차세대 교육 등
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                  <CardContent className="pt-6 text-center">
                    <TrendingDown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">성장 전략</h3>
                    <p className="text-sm text-muted-foreground">
                      M&A, 디지털 전환 등
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/ceo-checklist">
                    <FileText className="h-5 w-5 mr-2" />
                    CEO 체크리스트 진단하기
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-bold"
                  asChild
                >
                  <Link href="/ceo-checklist#succession">
                    승계 준비도 확인하기
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                ✅ 5개 영역 30개 항목 진단 · 🆓 무료 분석 리포트 · ⚡ 즉시 결과
                확인
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TaxStrategyPage;
