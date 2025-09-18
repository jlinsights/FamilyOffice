'use client';

import {
  AlertTriangle,
  ArrowRight,
  Award,
  Banknote,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Gem,
  Gift,
  GraduationCap,
  Heart,
  Info,
  Lightbulb,
  MinusCircle,
  Percent,
  Phone,
  PieChart,
  PiggyBank,
  PlusCircle,
  Shield,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function CorporateLifeInsurancePage() {
  const [startAnimation, setStartAnimation] = useState(false);

  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 절세 효과
  const taxBenefits = [
    {
      icon: DollarSign,
      title: '법인세 절세',
      description: '보험료를 손비로 처리하여 법인세 부담 경감',
      savingRate: '최대 27.5%',
      color: 'green',
      details: ['보험료 손비처리', '법인세율 27.5%', '즉시 절세효과']
    },
    {
      icon: Gift,
      title: '상속세 절약',
      description: '사망보험금 비과세로 상속세 부담 완화',
      savingRate: '최대 50%',
      color: 'blue',
      details: ['사망보험금 비과세', '상속재산 분산효과', '유동성 확보']
    },
    {
      icon: Users,
      title: '퇴직급여 대비',
      description: '임원 퇴직급여를 보험으로 준비하여 절세',
      savingRate: '최대 40%',
      color: 'purple',
      details: ['퇴직소득세 절약', '연금수령 가능', '분할 지급']
    },
    {
      icon: Shield,
      title: '자산보전',
      description: '기업 리스크로부터 개인자산 보호',
      savingRate: '100% 보호',
      color: 'orange',
      details: ['채권자 추심 불가', '강제집행 면제', '안전자산 확보']
    }
  ];

  // 상품 비교
  const insuranceProducts = [
    {
      product: '착한종신보험',
      returnRate: '4.0%',
      minPremium: '월 100만원',
      maxCoverage: '100억원',
      taxBenefit: '손비처리 100%',
      surrender: '10년 후 100%',
      features: ['원금보장', '배당형', '중도인출', '연금전환', '보험료 할인'],
      description: '기업가를 위한 착한 가격, 착한 혜택의 종신보험',
      rating: 5,
      popular: true
    },
    {
      product: '행복종신보험',
      returnRate: '3.8%',
      minPremium: '월 80만원',
      maxCoverage: '80억원',
      taxBenefit: '손비처리 100%',
      surrender: '12년 후 100%',
      features: ['원금보장', '배당형', '가족보장', '상속설계'],
      description: '가족의 행복한 미래를 위한 종신보험',
      rating: 5
    },
    {
      product: '올백종신',
      returnRate: '3.5%',
      minPremium: '월 150만원',
      maxCoverage: '150억원',
      taxBenefit: '손비처리 100%',
      surrender: '15년 후 100%',
      features: ['고액보장', '퇴직준비', '사업승계', 'VIP서비스'],
      description: '100% 만족을 위한 올백 종신보험',
      rating: 4
    },
    {
      product: '골든종신보험',
      returnRate: '3.2%',
      minPremium: '월 200만원',
      maxCoverage: '200억원',
      taxBenefit: '손비처리 100%',
      surrender: '20년 후 100%',
      features: ['고액보장', '자산보전', '세대이전', '프리미엄서비스'],
      description: '황금빛 노후를 위한 최고급 종신보험',
      rating: 4
    }
  ];

  // 활용 시나리오
  const useCases = [
    {
      title: '임원 퇴직급여 준비',
      description: '임원의 퇴직급여를 법인종신보험으로 준비하여 절세와 안정성 확보',
      scenario: {
        situation: '임원 퇴직급여 10억원 필요',
        solution: '법인종신보험 가입',
        benefit: '퇴직소득세 최대 40% 절약',
        period: '15년간 준비'
      },
      calculation: {
        traditional: '퇴직소득세 2억원',
        insurance: '퇴직소득세 1.2억원',
        saving: '8천만원 절약'
      },
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'CEO 상속세 대비',
      description: '사업 승계시 상속세 부담을 덜기 위한 보험활용 전략',
      scenario: {
        situation: '상속재산 50억원, 상속세 15억원',
        solution: '법인종신보험 15억원 가입',
        benefit: '상속세 납부자금 확보',
        period: '20년간 준비'
      },
      calculation: {
        traditional: '상속세 현금납부 부담',
        insurance: '보험금으로 상속세 납부',
        saving: '자산 분산 및 유동성 확보'
      },
      color: 'from-green-500 to-green-600'
    },
    {
      title: '기업 리스크 대비',
      description: '기업 경영 리스크로부터 개인자산을 보호하는 방안',
      scenario: {
        situation: '기업 부도 위험, 개인자산 보호 필요',
        solution: '법인종신보험 자산이전',
        benefit: '채권자 추심 불가능',
        period: '즉시 보호'
      },
      calculation: {
        traditional: '개인자산 압류 위험',
        insurance: '보험자산 완전 보호',
        saving: '자산 보전 100%'
      },
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // 가입 절차
  const processSteps = [
    {
      step: 1,
      title: '보험 설계',
      description: '기업 상황과 목적에 맞는 최적 보험 설계',
      items: ['기업 재무분석', '절세효과 계산', '보장설계', '보험료 산출'],
      duration: '1주',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 2,
      title: '상품 선택',
      description: '보험사별 상품 비교하여 최적 상품 선택',
      items: ['상품 비교분석', '수익률 검토', '특약 선택', '계약 조건 검토'],
      duration: '1주',
      color: 'from-green-500 to-green-600'
    },
    {
      step: 3,
      title: '계약 체결',
      description: '보험 계약 체결 및 첫 보험료 납입',
      items: ['계약서 작성', '건강검진', '서류 제출', '보험료 납입'],
      duration: '2주',
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: 4,
      title: '사후 관리',
      description: '지속적인 보험 관리 및 최적화',
      items: ['정기 점검', '수익률 모니터링', '세법 변경 대응', '추가 납입 상담'],
      duration: '지속',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-background dark:to-background/95">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 text-white py-20">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Badge className="bg-yellow-500 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100 px-4 py-2 text-sm font-semibold">
                  <Shield className="w-4 h-4 mr-1" />
                  절세 포커스 상품
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                법인종신보험
                <br />
                <span className="text-yellow-400">비교 분석</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200 leading-relaxed">
                <strong className="text-yellow-300 dark:text-yellow-200">법인세 절세</strong>부터 <strong className="text-yellow-300 dark:text-yellow-200">상속세 대비</strong>까지
                <br />
                기업과 개인의 이중 혜택을 누리세요
              </p>
              
              {/* 핵심 통계 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-300 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={27.5} 
                        duration={2000}
                        easingFunction={easingFunction}
                                              />
                    )}%
                  </div>
                  <p className="text-sm text-blue-200 dark:text-blue-300">법인세율</p>
                </div>
                <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-300 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={100} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}%
                  </div>
                  <p className="text-sm text-blue-200 dark:text-blue-300">손비처리</p>
                </div>
                <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-300 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={3.8} 
                        duration={2000}
                        easingFunction={easingFunction}
                                              />
                    )}%
                  </div>
                  <p className="text-sm text-blue-200 dark:text-blue-300">예상수익률</p>
                </div>
                <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-300 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={100} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}억
                  </div>
                  <p className="text-sm text-blue-200 dark:text-blue-300">최대보장</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  trigger={
                    <Button size="lg" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 dark:bg-yellow-600 dark:text-yellow-100 dark:hover:bg-yellow-500 px-8 py-4 text-lg font-semibold">
                      <Calculator className="mr-2 h-5 w-5" />
                      절세 효과 계산
                    </Button>
                  }
                  calLink="familyoffices/corporate-life-insurance"
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 dark:border-white/70 dark:text-white dark:hover:bg-white/10 dark:hover:text-white px-8 py-4 text-lg"
                  onClick={() => {
                    const element = document.getElementById('product-comparison');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  상품 비교하기
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 절세 혜택 섹션 */}
        <section className="py-20 bg-white dark:bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                법인종신보험 <span className="text-blue-600 dark:text-blue-400">절세 혜택</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                기업과 개인이 동시에 누릴 수 있는 4가지 핵심 혜택
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {taxBenefits.map((benefit, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300 group bg-card dark:bg-card/80 border-border/40 dark:border-border">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${
                      benefit.color === 'green' ? 'from-green-400 to-green-600' :
                      benefit.color === 'blue' ? 'from-blue-400 to-blue-600' :
                      benefit.color === 'purple' ? 'from-purple-400 to-purple-600' :
                      'from-orange-400 to-orange-600'
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{benefit.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                      benefit.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      benefit.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      benefit.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {benefit.savingRate}
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
                      {benefit.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 상품 비교 섹션 */}
        <section id="product-comparison" className="py-20 bg-gray-50 dark:bg-background/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                삼성생명 법인종신보험 <span className="text-blue-600 dark:text-blue-400">상품별 특징 비교</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                착한종신, 행복종신, 올백종신, 골든종신<br />
                경영인을 위한 삼성생명 맞춤형 종신보험 완전 분석
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceProducts.map((product, index) => (
                <Card key={index} className={`relative overflow-hidden ${product.popular ? 'ring-2 ring-yellow-400 dark:ring-yellow-500' : ''} hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border`}>
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 text-yellow-900 dark:text-yellow-100 px-3 py-1 text-sm font-bold rounded-bl-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      추천
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">{product.product}</CardTitle>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">예상수익률</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{product.returnRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">최소 보험료</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{product.minPremium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">최대 보장</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{product.maxCoverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">세제혜택</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{product.taxBenefit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">원금회복</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{product.surrender}</span>
                    </div>
                    <div className="pt-2 border-t border-border/40 dark:border-border">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">주요 특징</div>
                      <div className="flex flex-wrap gap-1">
                        {product.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CalComPopup
                      trigger={
                        <Button className="w-full mt-4" variant={product.popular ? "default" : "outline"}>
                          <FileText className="mr-2 h-4 w-4" />
                          상품 상담
                        </Button>
                      }
                      calLink="familyoffices/corporate-life-insurance"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 활용 시나리오 섹션 */}
        <section className="py-20 bg-white dark:bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                법인종신보험 <span className="text-blue-600 dark:text-blue-400">활용 시나리오</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                실제 상황별 법인종신보험 활용 사례와 절세 효과
              </p>
            </div>

            <div className="space-y-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                  <div className={`h-2 bg-gradient-to-r ${useCase.color}`}></div>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* 시나리오 설명 */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{useCase.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{useCase.description}</p>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Target className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-gray-100">상황</div>
                              <div className="text-gray-600 dark:text-gray-300 text-sm">{useCase.scenario.situation}</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Lightbulb className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-gray-100">솔루션</div>
                              <div className="text-gray-600 dark:text-gray-300 text-sm">{useCase.scenario.solution}</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Award className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-gray-100">효과</div>
                              <div className="text-gray-600 dark:text-gray-300 text-sm">{useCase.scenario.benefit}</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-gray-100">기간</div>
                              <div className="text-gray-600 dark:text-gray-300 text-sm">{useCase.scenario.period}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 비교 분석 */}
                      <div className="md:col-span-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">절세 효과 비교</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <div className="flex items-center mb-2">
                              <MinusCircle className="w-5 h-5 text-red-600 mr-2" />
                              <h5 className="font-semibold text-red-800">기존 방식</h5>
                            </div>
                            <p className="text-red-700 text-sm mb-2">{useCase.calculation.traditional}</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <PlusCircle className="w-5 h-5 text-green-600 mr-2" />
                              <h5 className="font-semibold text-green-800">보험 활용</h5>
                            </div>
                            <p className="text-green-700 text-sm mb-2">{useCase.calculation.insurance}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center">
                            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                            <h5 className="font-semibold text-blue-800">절세 효과</h5>
                          </div>
                          <p className="text-blue-700 font-bold mt-1">{useCase.calculation.saving}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 가입 절차 섹션 */}
        <section className="py-20 bg-gray-50 dark:bg-background/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                법인종신보험 <span className="text-blue-600 dark:text-blue-400">가입 절차</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                전문가와 함께하는 체계적인 4단계 가입 프로세스
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step.color}`}></div>
                  <CardHeader className="text-center pt-6">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold mb-3`}>
                      {step.step}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{step.title}</CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-20 bg-white dark:bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                법인종신보험 <span className="text-blue-600 dark:text-blue-400">FAQ</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                법인종신보험에 대한 자주 묻는 질문들
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    법인종신보험의 세제 혜택은 무엇인가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">법인종신보험은 다음과 같은 세제 혜택을 제공합니다:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">납입 시 혜택</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 보험료 100% 손비처리</li>
                        <li>• 법인세 즉시 절약 (27.5%)</li>
                        <li>• 현금흐름 개선</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">수령 시 혜택</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 사망보험금 비과세</li>
                        <li>• 상속세 절약 효과</li>
                        <li>• 해지환급금 익금산입</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    법인종신보험료를 손비로 처리할 수 있나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">법인종신보험료의 손비처리는 다음 조건을 만족해야 합니다:</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>업무관련성</strong>: 임원의 업무와 관련된 보험
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>보험료 규모</strong>: 과도하지 않은 적정 수준
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>수익자 설정</strong>: 법인이 수익자인 경우
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>합리적 이유</strong>: 퇴직급여, 복리후생 목적
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    중도해지 시 세무상 문제는 없나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">법인종신보험 중도해지 시 다음과 같은 세무처리가 필요합니다:</p>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold">해지환급금 처리</div>
                        <div className="text-sm text-gray-600">해지환급금은 익금에 산입되어 법인세 과세</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Zap className="w-5 h-5 text-yellow-600 mr-3" />
                      <div>
                        <div className="font-semibold">손비 환입</div>
                        <div className="text-sm text-gray-600">초기 손비처리한 보험료의 일부 환입 가능</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-semibold">전체 수익률 고려</div>
                        <div className="text-sm text-gray-600">초기 세액 절감 효과를 포함하여 종합 판단</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Users className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    임원 퇴직 시 보험은 어떻게 처리되나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">임원 퇴직 시 법인종신보험 처리방법:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">보험 유지</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 법인이 계속 보험료 납입</li>
                        <li>• 새로운 임원으로 피보험자 변경</li>
                        <li>• 퇴직급여 목적으로 계속 운용</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">보험 해지</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 해지환급금을 퇴직금으로 지급</li>
                        <li>• 퇴직소득세 적용으로 절세</li>
                        <li>• 임원에게 보험계약 양도</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <BarChart3 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    법인종신보험과 개인연금의 차이점은?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">법인종신보험과 개인연금의 주요 차이점:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">구분</th>
                          <th className="text-left py-2 px-3">법인종신보험</th>
                          <th className="text-left py-2 px-3">개인연금</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 px-3 font-medium">가입자</td>
                          <td className="py-2 px-3">법인</td>
                          <td className="py-2 px-3">개인</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-medium">세제혜택</td>
                          <td className="py-2 px-3">법인세 절감 27.5%</td>
                          <td className="py-2 px-3">소득공제 15%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-medium">보장금액</td>
                          <td className="py-2 px-3">무제한 (실질)</td>
                          <td className="py-2 px-3">연 1,800만원 한도</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-medium">자산보호</td>
                          <td className="py-2 px-3">채권자 추심 불가</td>
                          <td className="py-2 px-3">개인채무 영향</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg dark:hover:shadow-white/5 transition-shadow duration-300 bg-card dark:bg-card/80 border-border/40 dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    법인종신보험 상담은 어떻게 받나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">삼성생명 GFC 전문가와 법인종신보험 상담을 받으실 수 있습니다:</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">전화 상담</span>
                      <span className="text-blue-600 font-mono">0502-5550-8700</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">온라인 예약</span>
                      <CalComPopup
                        trigger={
                          <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            예약하기
                          </Button>
                        }
                        calLink="familyoffices/corporate-life-insurance"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">방문 상담</span>
                      <span className="text-sm text-gray-600">서울 중구 세종대로 124</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Family Office Upgrade Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50/50 to-blue-50/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 shadow-lg backdrop-blur-sm">
                <Crown className="h-4 w-4 mr-2" />
                Family Office Excellence
              </Badge>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                <span className="text-premium-gold">법인종신보험</span>을 넘어선{' '}
                <span className="text-premium-navy">패밀리오피스</span>
              </h3>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                개별 보험 상품에서 <span className="font-bold text-premium-navy">통합 리스크관리 솔루션</span>으로 업그레이드하세요.
                성공한 기업가들이 선택한 차별화된 패밀리오피스 서비스를 경험해보세요.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl mb-4 mx-auto">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">종합 리스크관리</h4>
                  <p className="text-muted-foreground text-sm">보험·세무·투자를 통합한 원스톱 리스크관리 솔루션</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl mb-4 mx-auto">
                    <Building className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">기업·개인 통합설계</h4>
                  <p className="text-muted-foreground text-sm">법인보험과 개인보험을 통합한 최적의 보장체계 구축</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl mb-4 mx-auto">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-premium-navy">절세 최적화</h4>
                  <p className="text-muted-foreground text-sm">법인세·소득세·상속세 통합 절세 전략 수립</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/family-office-center" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-premium-navy text-white text-lg font-semibold rounded-2xl hover:shadow-premium-navy transition-all duration-300 hover:scale-105"
                >
                  <Crown className="h-6 w-6 mr-2" />
                  패밀리오피스 센터 보기
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Link>
                
                <Link 
                  href="/fp-center" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-premium-navy text-premium-navy text-lg font-semibold rounded-2xl hover:bg-premium-navy hover:text-white transition-all duration-300"
                >
                  <Users className="h-6 w-6 mr-2" />
                  전문 FP 상담
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 시작하는 <span className="text-yellow-400">법인종신보험</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
              법인세 절세와 상속세 대비를 동시에
              <br />
              <strong>이중 혜택</strong>으로 기업 자산을 최적화하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 dark:bg-yellow-600 dark:text-yellow-100 dark:hover:bg-yellow-500 px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 상담 예약
                  </Button>
                }
                calLink="familyoffices/corporate-life-insurance"
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-900 dark:border-white/70 dark:text-white dark:hover:bg-white/10 dark:hover:text-white px-8 py-4 text-lg"
                onClick={() => window.open('tel:0502-5550-8700')}
              >
                <Phone className="mr-2 h-5 w-5" />
                0502-5550-8700
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <Script id="corporate-life-insurance-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": "법인종신보험 비교 분석 | 절세 효과 + 상품 비교",
              "description": "법인종신보험 완벽 가이드. 법인세 절세, 퇴직금 대비, 상속세 절약 효과까지. 주요 보험사 상품 비교분석.",
              "image": {
                "@type": "ImageObject",
                "url": "https://familyoffices.kr/images/corporate-life-insurance-guide.jpg",
                "width": 1200,
                "height": 630
              },
              "author": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "url": "https://familyoffices.kr"
              },
              "publisher": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://familyoffices.kr/logo.png",
                  "width": 400,
                  "height": 60
                }
              },
              "datePublished": new Date().toISOString(),
              "dateModified": new Date().toISOString(),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://familyoffices.kr/corporate-life-insurance"
              }
            },
            {
              "@type": "Service",
              "name": "법인종신보험 상담",
              "description": "법인종신보험 상품 비교 및 절세 전략 상담 서비스",
              "provider": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "telephone": "+82-502-5550-8700",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "세종대로 124",
                  "addressLocality": "중구",
                  "addressRegion": "서울",
                  "addressCountry": "KR"
                }
              },
              "areaServed": "KR",
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://familyoffices.kr/corporate-life-insurance",
                "servicePhone": "+82-502-5550-8700"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "KRW",
                "description": "무료 상담 및 상품 비교분석"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "법인종신보험의 세제 혜택은 무엇인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "보험료 100% 손비처리로 법인세 즉시 절약(27.5%), 사망보험금 비과세로 상속세 절약 효과를 얻을 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "법인종신보험료를 손비로 처리할 수 있나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "업무관련성, 적정 보험료 규모, 법인이 수익자인 경우, 합리적 이유(퇴직급여, 복리후생) 조건을 만족하면 손비처리 가능합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "중도해지 시 세무상 문제는 없나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "해지환급금은 익금 산입되어 법인세 과세되지만, 초기 세액 절감 효과를 포함하여 종합적으로 유리할 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "임원 퇴직 시 보험은 어떻게 처리되나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "법인이 보험 유지하거나, 해지환급금을 퇴직금으로 지급하여 퇴직소득세 적용으로 절세하거나, 임원에게 보험계약 양도가 가능합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "법인종신보험과 개인연금의 차이점은?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "법인종신보험은 법인세 절감 27.5%, 무제한 보장, 채권자 추심 불가 등 개인연금(소득공제 15%, 연 1,800만원 한도)보다 유리합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "법인종신보험 상담은 어떻게 받나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "전화상담(0502-5550-8700), 온라인 예약, 방문상담(서울 중구 세종대로 124)을 통해 삼성생명 GFC 전문가와 상담받을 수 있습니다."
                  }
                }
              ]
            }
          ]
        })}
      </Script>

      <Footer />
    </>
  );
}