'use client';

import {
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Gavel,
  HardHat,
  Heart,
  Info,
  Phone,
  Scale,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import { SelfCheckSafety } from '@/components/forms/self-check-safety';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function SeriousAccidentLawPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  // easing 함수를 메모이제이션
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 주요 위험 요소
  const riskFactors = [
    {
      icon: Building,
      title: '제조업',
      description: '기계사고, 화학물질 노출 등',
      penalty: '최대 50억원',
      color: 'red'
    },
    {
      icon: HardHat,
      title: '건설업',
      description: '추락, 붕괴, 끼임 사고 등',
      penalty: '최대 10억원',
      color: 'orange'
    },
    {
      icon: Users,
      title: '서비스업',
      description: '화재, 질식, 감전 사고 등',
      penalty: '최대 10억원',
      color: 'yellow'
    },
    {
      icon: Zap,
      title: '전체업종',
      description: '중대시민재해 포함 확대',
      penalty: '처벌 강화',
      color: 'purple'
    }
  ];

  // 대응 단계
  const responseSteps = [
    {
      step: 1,
      title: '현황 진단',
      description: '현재 안전관리 수준 점검 및 리스크 평가',
      items: ['안전관리체계 현황 분석', '법적 요구사항 gap 분석', '잠재 위험요소 식별', '우선순위 도출'],
      duration: '1-2주',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 2,
      title: '체계 구축',
      description: '법적 요구사항에 맞는 안전관리체계 구축',
      items: ['안전보건관리체계 수립', '안전보건규정 제정', '교육훈련 체계 구축', '점검·개선 절차 마련'],
      duration: '2-4주',
      color: 'from-green-500 to-green-600'
    },
    {
      step: 3,
      title: '보험 대비',
      description: '경영진 보호를 위한 보험 가입 및 운영',
      items: ['임원배상책임보험 가입', 'D&O 보험 검토', '중대재해 특약 추가', '보험금 청구 프로세스'],
      duration: '1주',
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: 4,
      title: '모니터링',
      description: '지속적인 관리 및 개선 시스템 운영',
      items: ['정기 점검 실시', '교육훈련 이행', '법령 변경사항 반영', '사고 예방 활동'],
      duration: '상시',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // 보험 상품 비교
  const insuranceProducts = [
    {
      name: '임원배상책임보험',
      coverage: '경영진 개인 손해 보상',
      limit: '10억원~100억원',
      premium: '연 100만원~',
      features: ['형사처벌 변호비용', '민사소송 대응', '과태료 부담', '재판비용 지원']
    },
    {
      name: 'D&O 보험 특약',
      coverage: '중대재해 관련 특화',
      limit: '50억원~200억원',
      premium: '연 300만원~',
      features: ['중대재해 전문 대응', '24시간 긴급대응', '전문 변호사단', '위기관리 컨설팅']
    },
    {
      name: '기업종합보험',
      coverage: '기업 전체 리스크',
      limit: '100억원~500억원',
      premium: '연 500만원~',
      features: ['중대재해 + 일반사고', '영업손실 보상', '복구비용 지원', '사업중단보험']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
          {/* 배경 그라데이션 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            {/* 상단 경고 태그 */}
            <div className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="animate-fade-in bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Critical Business Risk
              </Badge>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              중대재해처벌법{'\n'}완벽 대응 가이드
            </h1>

            {/* 서브 헤드라인 */}
            <p
              className="text-xl md:text-2xl font-semibold text-foreground mb-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              경영진 처벌과 기업 존폐를 막는 최후의 보루
            </p>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed whitespace-pre-line"
              style={{ animationDelay: '300ms' }}
            >
              중대재해 발생 시 경영책임자는 1년 이상 징역 또는 10억원 이하 벌금{'\n'}
              안전관리체계 구축부터 보험까지, 완벽한 예방 솔루션을 제공합니다
            </p>

            {/* 핵심 통계 지표 */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  <AnimatedCounter
                    end={10}
                    suffix="억원"
                    startAnimation={startAnimation}
                    duration={1500}
                    easingFunction={easingFunction}
                  />
                </div>
                <div className="text-sm text-muted-foreground">최대 벌금</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  <AnimatedCounter
                    end={1}
                    suffix="년"
                    startAnimation={startAnimation}
                    duration={1200}
                    easingFunction={easingFunction}
                  />
                </div>
                <div className="text-sm text-muted-foreground">최소 징역</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  <AnimatedCounter
                    end={50}
                    suffix="인"
                    startAnimation={startAnimation}
                    duration={1800}
                    easingFunction={easingFunction}
                  />
                </div>
                <div className="text-sm text-muted-foreground">적용 기업규모</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  <AnimatedCounter
                    end={2022}
                    startAnimation={startAnimation}
                    duration={2000}
                    easingFunction={easingFunction}
                  />
                </div>
                <div className="text-sm text-muted-foreground">시행연도</div>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '500ms' }}
            >
              <CalComPopup
                buttonText="무료 진단 신청"
                variant="default"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg bg-red-600 hover:bg-red-700"
              />
              <Button
                variant="outline"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg"
                asChild
              >
                <a href="tel:0502-5550-8700">
                  <Phone className="mr-2 h-5 w-5" />
                  ☎ 0502-5550-8700
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg"
                onClick={() => {
                  const element = document.getElementById('risk-assessment');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Target className="mr-2 h-5 w-5" />
                위험도 자가진단
              </Button>
            </div>
          </div>
        </section>

        {/* 중대재해처벌법 개요 섹션 */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Gavel className="h-3 w-3 mr-1" />
                  Legal Framework
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  중대재해처벌법이란?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  중대재해로 인한 인명피해 발생 시 경영책임자와 기업에 대해 
                  형사처벌을 강화한 법률입니다.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* 적용 대상 */}
                <Card className="border-2 border-red-200 dark:border-red-800 bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                      <Building className="h-5 w-5 mr-2" />
                      적용 대상
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>상시근로자 50인 이상</strong> 사업장 (2022.1.27~)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>상시근로자 5인 이상</strong> 사업장 (2024.1.27~)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>중대시민재해</strong> 전 사업장 적용</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>공공기관, 지방공사</strong> 포함</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* 처벌 수준 */}
                <Card className="border-2 border-orange-200 dark:border-orange-800 bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700 dark:text-orange-400">
                      <Scale className="h-5 w-5 mr-2" />
                      처벌 수준
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>경영책임자:</strong> 1년 이상 징역 또는 10억원 이하 벌금</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>법인:</strong> 50억원 이하 벌금 (매출액의 1/1000 이하)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>공공기관:</strong> 100억원 이하 벌금</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm"><strong>추가:</strong> 영업정지, 허가취소 등</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* 중대재해 정의 */}
              <Card className="bg-card text-card-foreground border border-border">
                <CardHeader>
                  <CardTitle className="text-center text-foreground">
                    중대재해의 정의
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">
                        📍 중대산업재해
                      </h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• 사망자 1명 이상 발생</li>
                        <li>• 6개월 이상 치료가 필요한 부상자 2명 이상</li>
                        <li>• 3개월 이상 치료가 필요한 부상자 10명 이상</li>
                        <li>• 급성중독 등으로 동시에 3명 이상 부상</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-700 dark:text-orange-400">
                        📍 중대시민재해
                      </h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• 사망자 1명 이상 발생</li>
                        <li>• 2개월 이상 치료가 필요한 부상자 10명 이상</li>
                        <li>• 1개월 이상 치료가 필요한 부상자 30명 이상</li>
                        <li>• 원료·제조물질 등으로 인한 피해</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 업종별 위험도 분석 섹션 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Risk Analysis
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                업종별 위험도 분석
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                업종에 따라 다른 위험 요소와 대응 전략이 필요합니다.
                <br />
                귀하의 업종에 맞는 맞춤형 솔루션을 확인하세요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {riskFactors.map((risk, index) => {
                const Icon = risk.icon;
                const colorClassesMap = {
                  red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
                  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
                  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
                  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                };
                const colorClasses = colorClassesMap[risk.color as keyof typeof colorClassesMap];

                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card text-card-foreground border border-border">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{risk.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                      <Badge variant="destructive" className="text-xs">
                        {risk.penalty}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 위험도 자가진단 */}
            <div id="risk-assessment" className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <SelfCheckSafety />
            </div>
          </div>
        </section>

        {/* 4단계 대응 전략 섹션 */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Target className="h-3 w-3 mr-1" />
                Response Strategy
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                4단계 완벽 대응 전략
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                체계적이고 단계별로 진행되는 완벽한 중대재해처벌법 대응 솔루션
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {responseSteps.map((step, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-card text-card-foreground border border-border">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 프로세스 플로우 */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full px-6 py-3 border border-primary/20">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold">총 소요기간: 4-8주</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-sm text-muted-foreground">완료 후 상시 모니터링</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 보험 상품 비교 섹션 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Shield className="h-3 w-3 mr-1" />
                Insurance Solutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                경영진 보호 보험 상품
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                중대재해 발생 시 경영진의 재정적 부담을 최소화하고
                <br />
                기업의 지속가능성을 보장하는 보험 솔루션
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {insuranceProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-card text-card-foreground border border-border">
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                      추천
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{product.coverage}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-primary mb-1">{product.limit}</div>
                      <div className="text-sm text-muted-foreground">보장한도</div>
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">{product.premium}</div>
                      <div className="text-xs text-muted-foreground">보험료</div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      상세 정보 요청
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 보험 선택 가이드 */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">
                  보험 선택 가이드
                </h3>
                <p className="text-green-600 dark:text-green-300 text-sm">
                  기업 규모와 업종에 따른 맞춤형 보험 추천
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold mb-2">중소기업 (50-299인)</h4>
                  <p className="text-sm text-muted-foreground">임원배상책임보험 + 기본 특약</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold mb-2">중견기업 (300-999인)</h4>
                  <p className="text-sm text-muted-foreground">D&O 보험 특약 (추천 상품)</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold mb-2">대기업 (1000인+)</h4>
                  <p className="text-sm text-muted-foreground">기업종합보험 (포괄적 보장)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Info className="h-3 w-3 mr-1" />
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  중대재해처벌법 FAQ
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  중대재해처벌법에 대해 자주 묻는 질문들을 정리했습니다.
                </p>
              </div>

              <div className="space-y-6">
                {/* FAQ 1 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        우리 회사도 중대재해처벌법 적용 대상인가요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        상시근로자 5인 이상 사업장이면 모두 적용됩니다. 2022년부터 50인 이상, 2024년부터 5인 이상으로 확대되었습니다.
                        중대시민재해의 경우 사업장 규모와 관계없이 모든 사업장에 적용됩니다.
                        건설업, 제조업뿐만 아니라 서비스업, 유통업 등 모든 업종이 대상입니다.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* FAQ 2 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        안전관리체계는 어떻게 구축해야 하나요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        ①안전보건관리책임자 지정 ②안전보건관리체계 구축 ③안전보건목표·계획 수립 ④안전보건관리규정 제정·시행
                        ⑤안전보건교육 실시 ⑥작업환경측정 등 안전보건조치 이행 ⑦중대재해 발생 시 재발방지 조치 등
                        7가지 핵심 요소를 모두 갖춰야 합니다. 전문가의 도움 없이는 완벽한 구축이 어렵습니다.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* FAQ 3 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        보험으로 모든 처벌을 피할 수 있나요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        보험은 형사처벌 자체를 피할 수 없지만, 변호비용과 벌금, 손해배상 등 재정적 부담을 크게 줄여줍니다.
                        더 중요한 것은 사전에 안전관리체계를 완벽히 구축하여 중대재해를 예방하는 것입니다.
                        보험은 만약의 사태에 대비한 최후의 안전장치입니다.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* FAQ 4 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        대응 비용은 얼마나 드나요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        기업 규모와 업종에 따라 다르지만, 컨설팅 비용은 500만원~2000만원, 
                        보험료는 연간 100만원~1000만원 수준입니다.
                        하지만 중대재해 발생 시 경영진 개인이 부담해야 할 비용(변호비용, 벌금, 손해배상 등)은
                        수십억원에 달할 수 있어 사전 대비 비용과 비교할 수 없습니다.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* FAQ 5 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        협력업체나 하청업체 사고도 우리 책임인가요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        원청업체는 하청업체 근로자의 안전에 대해서도 책임을 집니다.
                        특히 건설업의 경우 하청업체 관리가 매우 중요하며, 하청업체 안전교육, 
                        안전장비 지급, 작업환경 점검 등을 철저히 해야 합니다.
                        하청업체와의 계약서에 안전관리 조항을 명시하고 정기 점검을 실시해야 합니다.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* FAQ 6 */}
                <Card className="p-6 bg-card text-card-foreground border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        지금부터 준비해도 늦지 않나요?
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        중대재해처벌법은 이미 시행 중이며, 언제든 사고가 발생할 수 있습니다.
                        하루라도 빨리 안전관리체계를 구축하고 보험에 가입하는 것이 중요합니다.
                        완벽한 준비까지는 4-8주가 걸리므로, 지금 즉시 시작하시기 바랍니다.
                        전문가의 무료 진단부터 시작하여 단계적으로 준비하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* FAQ CTA */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                  <h3 className="text-xl font-bold mb-4">더 궁금한 점이 있으신가요?</h3>
                  <p className="text-muted-foreground mb-6">
                    중대재해처벌법 대응에 대한 추가 질문이나 맞춤형 상담을 원하시면 언제든 연락주세요.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      buttonText="무료 상담 예약"
                      variant="default"
                      size="lg"
                    />
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:0502-5550-8700">
                        <Phone className="mr-2 h-4 w-4" />
                        ☎ 0502-5550-8700
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-xl mb-8 opacity-90">
                중대재해는 예고 없이 찾아옵니다<br />
                완벽한 준비로 기업과 경영진을 보호하세요
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">무료 진단</h3>
                  <p className="text-sm opacity-75">현재 위험도 무료 분석</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">완벽 대응</h3>
                  <p className="text-sm opacity-75">4단계 체계적 솔루션</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">안심 보장</h3>
                  <p className="text-sm opacity-75">지속적인 관리 지원</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  buttonText="긴급 상담 신청"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100"
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  asChild
                >
                  <a href="tel:0502-5550-8700">
                    <Phone className="mr-2 h-4 w-4" />
                    ☎ 0502-5550-8700
                  </a>
                </Button>
              </div>

              <p className="text-xs opacity-75 mt-6">
                * 상담 예약 시 중대재해처벌법 대응 가이드북을 무료로 제공합니다
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* 중대재해처벌법 구조화 데이터 */}
      <Script
        id="serious-accident-law-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://familyoffices.vip/serious-accident-law#article",
                "headline": "중대재해처벌법 완벽 대응 가이드",
                "description": "중대재해처벌법 완벽 대응을 위한 안전관리체계 구축, 경영진 보험, 법적 리스크 차단 전략을 제공합니다.",
                "author": {
                  "@type": "Organization",
                  "name": "FamilyOffice S",
                  "url": "https://familyoffices.vip"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "FamilyOffice S",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://familyoffices.vip/favicon.ico"
                  }
                },
                "datePublished": "2025-01-31",
                "dateModified": "2025-01-31",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://familyoffices.vip/serious-accident-law"
                },
                "articleSection": "Business Law",
                "keywords": ["중대재해처벌법", "안전관리체계", "경영책임자", "임원배상책임보험", "중대재해 대응"]
              },
              {
                "@type": "HowTo",
                "name": "중대재해처벌법 4단계 대응 방법",
                "description": "중대재해처벌법에 완벽하게 대응하기 위한 체계적인 4단계 방법론",
                "totalTime": "P4W",
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "전문 컨설턴트"
                  },
                  {
                    "@type": "HowToSupply", 
                    "name": "임원배상책임보험"
                  }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "현황 진단",
                    "text": "현재 안전관리 수준 점검 및 리스크 평가를 실시합니다. 안전관리체계 현황 분석, 법적 요구사항 gap 분석, 잠재 위험요소 식별을 통해 우선순위를 도출합니다.",
                    "url": "https://familyoffices.vip/serious-accident-law#step1"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "체계 구축",
                    "text": "법적 요구사항에 맞는 안전관리체계를 구축합니다. 안전보건관리체계 수립, 안전보건규정 제정, 교육훈련 체계 구축, 점검·개선 절차를 마련합니다.",
                    "url": "https://familyoffices.vip/serious-accident-law#step2"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "보험 대비",
                    "text": "경영진 보호를 위한 보험에 가입하고 운영합니다. 임원배상책임보험 가입, D&O 보험 검토, 중대재해 특약 추가, 보험금 청구 프로세스를 구축합니다.",
                    "url": "https://familyoffices.vip/serious-accident-law#step3"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "모니터링",
                    "text": "지속적인 관리 및 개선 시스템을 운영합니다. 정기 점검 실시, 교육훈련 이행, 법령 변경사항 반영, 사고 예방 활동을 상시 진행합니다.",
                    "url": "https://familyoffices.vip/serious-accident-law#step4"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "우리 회사도 중대재해처벌법 적용 대상인가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "상시근로자 5인 이상 사업장이면 모두 적용됩니다. 2022년부터 50인 이상, 2024년부터 5인 이상으로 확대되었습니다. 중대시민재해의 경우 사업장 규모와 관계없이 모든 사업장에 적용됩니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "안전관리체계는 어떻게 구축해야 하나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "①안전보건관리책임자 지정 ②안전보건관리체계 구축 ③안전보건목표·계획 수립 ④안전보건관리규정 제정·시행 ⑤안전보건교육 실시 ⑥작업환경측정 등 안전보건조치 이행 ⑦중대재해 발생 시 재발방지 조치 등 7가지 핵심 요소를 모두 갖춰야 합니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "보험으로 모든 처벌을 피할 수 있나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "보험은 형사처벌 자체를 피할 수 없지만, 변호비용과 벌금, 손해배상 등 재정적 부담을 크게 줄여줍니다. 더 중요한 것은 사전에 안전관리체계를 완벽히 구축하여 중대재해를 예방하는 것입니다."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "대응 비용은 얼마나 드나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "기업 규모와 업종에 따라 다르지만, 컨설팅 비용은 500만원~2000만원, 보험료는 연간 100만원~1000만원 수준입니다. 하지만 중대재해 발생 시 경영진 개인이 부담해야 할 비용은 수십억원에 달할 수 있습니다."
                    }
                  }
                ]
              },
              {
                "@type": "Service",
                "name": "중대재해처벌법 대응 컨설팅",
                "description": "중대재해처벌법 완벽 대응을 위한 안전관리체계 구축 및 보험 솔루션 제공",
                "provider": {
                  "@type": "Organization",
                  "name": "FamilyOffice S",
                  "url": "https://familyoffices.vip"
                },
                "areaServed": "KR",
                "availableChannel": {
                  "@type": "ServiceChannel",
                  "serviceUrl": "https://familyoffices.vip/serious-accident-law",
                  "servicePhone": "0502-5550-8700"
                },
                "offers": {
                  "@type": "Offer",
                  "description": "무료 위험도 진단 및 맞춤형 대응 솔루션",
                  "priceRange": "500만원-2000만원"
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}