'use client';

import {
  Activity,
  Award,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Heart,
  HeartPulse,
  Info,
  Lightbulb,
  Phone,
  Shield,
  Star,
  Stethoscope,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo/structured-data';

export default function GroupInsurancePage() {
  const [startAnimation, setStartAnimation] = useState(false);

  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 핵심 혜택
  const keyBenefits = [
    {
      icon: DollarSign,
      title: '복리후생비 절세',
      description: '복리후생비 100% 손비처리로 법인세 절감',
      savingRate: '최대 27.5%',
      color: 'green',
      details: ['복리후생비 100% 손비', '법인세 즉시 절감', '현금흐름 개선'],
    },
    {
      icon: Users,
      title: '임직원 만족도',
      description: '전 직원 보장으로 조직 만족도 향상',
      savingRate: '95% 만족도',
      color: 'blue',
      details: ['전 직원 동일 혜택', '가족 확대 보장', '복지포인트 연동'],
    },
    {
      icon: Shield,
      title: '리스크 관리',
      description: '업무상 재해 및 질병 위험 완벽 보장',
      savingRate: '100% 보장',
      color: 'purple',
      details: ['업무상 재해', '일반 상해질병', '암진단 보장'],
    },
    {
      icon: Award,
      title: '인재 유치',
      description: '우수 인재 채용과 이직 방지 효과',
      savingRate: '30% 이직률 감소',
      color: 'orange',
      details: ['채용 경쟁력', '이직률 감소', '회사 이미지 제고'],
    },
  ];

  // 단체보험 상품
  const insuranceProducts = [
    {
      category: '단체상해보험',
      icon: Shield,
      coverage: '상해사망/후유장해',
      premium: '월 1만원~',
      maxCoverage: '1억원',
      features: [
        '업무상/일반상해',
        '교통사고 보장',
        '골절진단비',
        '응급실내원비',
      ],
      color: 'from-red-400 to-red-600',
      popular: true,
    },
    {
      category: '단체건강보험',
      icon: Stethoscope,
      coverage: '질병치료/입원',
      premium: '월 2만원~',
      maxCoverage: '5천만원',
      features: ['입원일당', '수술비', '검진비', '치료비'],
      color: 'from-blue-400 to-blue-600',
    },
    {
      category: '단체암보험',
      icon: HeartPulse,
      coverage: '암 진단/치료',
      premium: '월 1.5만원~',
      maxCoverage: '1억원',
      features: ['암진단비', '암치료비', '항암치료', '재발보장'],
      color: 'from-green-400 to-green-600',
    },
    {
      category: '단체생명보험',
      icon: Heart,
      coverage: '사망/고도후유장해',
      premium: '월 3만원~',
      maxCoverage: '2억원',
      features: ['일반사망', '재해사망', '고도후유장해', '생활자금'],
      color: 'from-purple-400 to-purple-600',
    },
  ];

  // 업종별 맞춤 설계
  const industryPlans = [
    {
      industry: '제조업',
      riskLevel: '높음',
      mainRisks: ['산업재해', '기계사고', '화학물질'],
      recommendedCoverage: '단체상해 + 건강보험',
      premium: '월 3-5만원',
      features: ['업무상재해 특화', '응급실 우선', '24시간 보장'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      industry: '건설업',
      riskLevel: '높음',
      mainRisks: ['추락사고', '붕괴위험', '중장비'],
      recommendedCoverage: '단체상해 + 생명보험',
      premium: '월 4-6만원',
      features: ['고위험 특화', '재해사망 보장', '가족생계비'],
      color: 'from-red-500 to-red-600',
    },
    {
      industry: 'IT/서비스업',
      riskLevel: '낮음',
      mainRisks: ['과로', '스트레스', '근골격계'],
      recommendedCoverage: '건강보험 + 암보험',
      premium: '월 2-3만원',
      features: ['건강검진 확대', '정신건강', 'VDT증후군'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      industry: '유통/서비스업',
      riskLevel: '중간',
      mainRisks: ['고객응대', '배송사고', '감정노동'],
      recommendedCoverage: '단체상해 + 건강보험',
      premium: '월 2.5-4만원',
      features: ['고객관련 사고', '배송중 사고', '스트레스 관리'],
      color: 'from-green-500 to-green-600',
    },
  ];

  // 도입 절차
  const implementationSteps = [
    {
      step: 1,
      title: '위험도 분석',
      description: '업종별 위험요소 분석 및 보장 니즈 파악',
      items: [
        '업종별 위험분석',
        '임직원 니즈조사',
        '기존 보험 검토',
        '예산 설정',
      ],
      duration: '1주',
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: 2,
      title: '상품 설계',
      description: '맞춤형 단체보험 상품 설계 및 견적',
      items: ['보장내용 설계', '보험료 산출', '보험사 비교', '최적안 제시'],
      duration: '1주',
      color: 'from-green-500 to-green-600',
    },
    {
      step: 3,
      title: '계약 체결',
      description: '단체보험 계약 및 직원 가입절차',
      items: ['계약서 작성', '임직원 설명회', '가입신청서', '보험증권 발행'],
      duration: '2주',
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: 4,
      title: '운영 관리',
      description: '지속적인 보험 운영 및 관리',
      items: [
        '보험금 청구 지원',
        '신입직원 추가',
        '보장 업그레이드',
        '정기 리뷰',
      ],
      duration: '지속',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  // 검색엔진 최적화 구조화 데이터 추가
  const faqItems = [
    {
      question: '단체보험 가입 최소 인원은 몇 명인가요?',
      answer:
        '보험사별, 상품별로 상이하지만 일반적으로 5인 이상이면 가입 가능합니다. 단체상해보험은 5인 이상, 단체건강보험은 10인 이상, 단체생명보험은 7인 이상이 일반적입니다.',
    },
    {
      question: '기존 직원과 신입직원 보장은 어떻게 되나요?',
      answer:
        '기존 직원은 일괄 가입으로 동일한 보장을 받으며, 신입직원은 입사 즉시 또는 일정 기간 후 자동으로 가입됩니다. 퇴직 직원은 퇴사 시 자동으로 제외되며 개인 실손보험으로 전환도 가능합니다.',
    },
    {
      question: '보험료는 어떻게 결정되나요?',
      answer:
        '업종 및 위험도, 가입 인원 수, 연령 구성, 보장 내용 및 한도, 과거 사고 이력 등을 종합하여 결정됩니다. 단체할인, 무사고할인 등 다양한 할인 혜택을 적용받을 수 있습니다.',
    },
    {
      question: '보험금 청구 절차는 어떻게 되나요?',
      answer:
        '사고 접수 후 서류를 제출하면 심사를 거쳐 보험금이 지급됩니다. 전담 직원이 청구부터 지급까지 전 과정을 지원하므로 간편하게 처리하실 수 있습니다.',
    },
    {
      question: '단체보험 상담은 어떻게 받나요?',
      answer:
        '전화 상담(0502-5550-8700), 온라인 예약, 방문 상담 등 다양한 채널을 통해 전문가의 무료 상담을 받으실 수 있습니다. 위험도 분석부터 상품 설계, 견적 비교까지 원스톱으로 제공합니다.',
    },
  ];
  const faqData = generateStructuredData('FAQPage', faqItems);

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={faqData} />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-semibold">
                  <Users className="w-4 h-4 mr-1" />
                  복리후생 + 절세 혜택
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                기업 단체보험
                <br />
                <span className="text-yellow-400">서비스</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                <strong className="text-yellow-300">임직원 만족도 향상</strong>
                과 <strong className="text-yellow-300">복리후생비 절세</strong>
                <br />두 마리 토끼를 한번에 잡으세요
              </p>

              {/* 핵심 통계 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter
                        start={0}
                        end={100}
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}
                    %
                  </div>
                  <p className="text-sm text-blue-200">손비처리</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter
                        start={0}
                        end={95}
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}
                    %
                  </div>
                  <p className="text-sm text-blue-200">임직원 만족도</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter
                        start={0}
                        end={30}
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}
                    %
                  </div>
                  <p className="text-sm text-blue-200">이직률 감소</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter
                        start={0}
                        end={1}
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}
                    만원
                  </div>
                  <p className="text-sm text-blue-200">최저 보험료</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  trigger={
                    <Button
                      size="lg"
                      className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      무료 견적 받기
                    </Button>
                  }
                  calLink="familyoffices/group-insurance"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                  onClick={() => {
                    const element =
                      document.getElementById('insurance-products');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  보험상품 보기
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 혜택 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                단체보험 <span className="text-blue-600">핵심 혜택</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                기업과 임직원이 모두 만족하는 4가지 핵심 혜택
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${
                        benefit.color === 'green'
                          ? 'from-green-400 to-green-600'
                          : benefit.color === 'blue'
                            ? 'from-blue-400 to-blue-600'
                            : benefit.color === 'purple'
                              ? 'from-purple-400 to-purple-600'
                              : 'from-orange-400 to-orange-600'
                      } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <div
                      className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                        benefit.color === 'green'
                          ? 'bg-green-100 text-green-800'
                          : benefit.color === 'blue'
                            ? 'bg-blue-100 text-blue-800'
                            : benefit.color === 'purple'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {benefit.savingRate}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 text-left">
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

        {/* 보험상품 섹션 */}
        <section id="insurance-products" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                단체보험 <span className="text-blue-600">상품 라인업</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                업종과 리스크에 맞는 최적의 단체보험 상품
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceProducts.map((product, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${product.popular ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 text-sm font-bold rounded-bl-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      인기
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${product.color} flex items-center justify-center mb-4`}
                    >
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {product.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">주요 보장</span>
                      <span className="font-semibold text-blue-600">
                        {product.coverage}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">보험료</span>
                      <span className="font-bold text-green-600">
                        {product.premium}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">최대 보장</span>
                      <span className="font-semibold">
                        {product.maxCoverage}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-sm text-gray-600 mb-2">
                        보장 내용
                      </div>
                      <div className="space-y-1">
                        {product.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-center text-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <CalComPopup
                      trigger={
                        <Button
                          className="w-full mt-4"
                          variant={product.popular ? 'default' : 'outline'}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          견적 받기
                        </Button>
                      }
                      calLink="familyoffices/group-insurance"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 업종별 맞춤 설계 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                업종별 <span className="text-blue-600">맞춤 설계</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                업종별 위험특성을 반영한 최적화된 단체보험 설계
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryPlans.map((plan, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {plan.industry}
                    </CardTitle>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        plan.riskLevel === '높음'
                          ? 'bg-red-100 text-red-800'
                          : plan.riskLevel === '중간'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      위험도: {plan.riskLevel}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        주요 위험
                      </h4>
                      <div className="space-y-1">
                        {plan.mainRisks.map((risk, riskIndex) => (
                          <div
                            key={riskIndex}
                            className="flex items-center text-sm text-red-600"
                          >
                            <Zap className="w-3 h-3 mr-2 flex-shrink-0" />
                            {risk}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        권장 보장
                      </h4>
                      <p className="text-sm text-blue-600 font-medium">
                        {plan.recommendedCoverage}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        예상 보험료
                      </h4>
                      <p className="text-lg font-bold text-green-600">
                        {plan.premium}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        특화 서비스
                      </h4>
                      <div className="space-y-1">
                        {plan.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <CalComPopup
                      trigger={
                        <Button className="w-full mt-4" variant="outline">
                          <Calculator className="mr-2 h-4 w-4" />
                          맞춤 견적
                        </Button>
                      }
                      calLink="familyoffices/group-insurance"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 도입 절차 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                단체보험 <span className="text-blue-600">도입 절차</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                체계적인 4단계 프로세스로 완벽한 단체보험 구축
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {implementationSteps.map((step, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step.color}`}
                  ></div>
                  <CardHeader className="text-center pt-6">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold mb-3`}
                    >
                      {step.step}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {step.title}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center text-sm text-gray-700"
                        >
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                단체보험 <span className="text-blue-600">FAQ</span>
              </h2>
              <p className="text-xl text-gray-600">
                기업 단체보험에 대한 자주 묻는 질문들
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <PremiumFAQ
                items={[
                  {
                    question: '단체보험의 세제 혜택은 무엇인가요?',
                    answer: (
                      <div className="space-y-4">
                        <p>
                          기업 단체보험은 다음과 같은 세제 혜택을 제공합니다:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2">
                              법인 혜택
                            </h4>
                            <ul className="space-y-1 text-sm list-disc list-inside text-gray-700">
                              <li>복리후생비 100% 손비처리</li>
                              <li>법인세 즉시 절감 (27.5%)</li>
                              <li>현금흐름 개선</li>
                              <li>임직원 만족도 향상</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-600 mb-2">
                              임직원 혜택
                            </h4>
                            <ul className="space-y-1 text-sm list-disc list-inside text-gray-700">
                              <li>개인부담 0원 또는 최소화</li>
                              <li>단체할인 혜택</li>
                              <li>가족 확대 보장</li>
                              <li>건강관리 서비스</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    question: '최소 가입 인원이 있나요?',
                    answer: (
                      <div className="space-y-3">
                        <p>
                          단체보험 가입을 위한 최소 인원 기준은 다음과 같습니다:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                            <span>
                              <strong>단체상해보험</strong>: 최소 5인 이상
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                            <span>
                              <strong>단체건강보험</strong>: 최소 10인 이상
                            </span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                            <span>
                              <strong>단체생명보험</strong>: 최소 7인 이상
                            </span>
                          </li>
                        </ul>
                        <p className="text-sm text-gray-500 flex items-center mt-2">
                          <Info className="w-4 h-4 mr-1" /> 보험사별로 차이가
                          있을 수 있습니다
                        </p>
                      </div>
                    ),
                  },
                  {
                    question: '기존 직원과 신입직원 보장은 어떻게 되나요?',
                    answer: (
                      <div className="space-y-3">
                        <p>단체보험의 직원 보장 범위와 신규 가입 절차:</p>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-green-50 rounded-lg">
                            <UserCheck className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900">
                                기존 직원
                              </div>
                              <div className="text-sm text-gray-600">
                                일괄 가입으로 전 직원 동일 보장
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900">
                                신입직원
                              </div>
                              <div className="text-sm text-gray-600">
                                입사 즉시 또는 일정 기간 후 자동 가입
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <Activity className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900">
                                퇴직직원
                              </div>
                              <div className="text-sm text-gray-600">
                                퇴사 시 자동 제외, 개인전환 가능
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    question: '보험료는 어떻게 결정되나요?',
                    answer: (
                      <div className="space-y-4">
                        <p>단체보험료 결정 요소와 할인 혜택:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              보험료 결정 요소
                            </h4>
                            <ul className="space-y-1 text-sm list-disc list-inside text-gray-600">
                              <li>업종 및 위험도</li>
                              <li>가입 인원 수</li>
                              <li>연령 구성</li>
                              <li>보장 내용 및 한도</li>
                              <li>과거 사고 이력</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-600 mb-2">
                              할인 혜택
                            </h4>
                            <ul className="space-y-1 text-sm list-disc list-inside text-gray-600">
                              <li>단체할인: 10-30%</li>
                              <li>무사고할인: 5-20%</li>
                              <li>다계약할인: 5-15%</li>
                              <li>우량단체할인: 추가 할인</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    question: '보험금 청구 절차는 어떻게 되나요?',
                    answer: (
                      <div className="space-y-4">
                        <p>간편하고 신속한 보험금 청구 프로세스:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-blue-800">
                              1단계
                            </div>
                            <div className="text-sm text-gray-600">
                              사고 접수
                            </div>
                            <div className="text-xs text-gray-500">
                              24시간 접수
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-green-800">
                              2단계
                            </div>
                            <div className="text-sm text-gray-600">
                              서류 제출
                            </div>
                            <div className="text-xs text-gray-500">
                              온라인 가능
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-purple-800">
                              3단계
                            </div>
                            <div className="text-sm text-gray-600">
                              보험금 지급
                            </div>
                            <div className="text-xs text-gray-500">
                              3-7일 소요
                            </div>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg flex items-start">
                          <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-yellow-800">
                              전담 서비스
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              전담 직원이 청구부터 지급까지 전 과정을 지원합니다
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    question: '단체보험 상담은 어떻게 받나요?',
                    answer: (
                      <div className="space-y-3">
                        <p>전문가와 함께하는 기업 단체보험 상담:</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-700">
                              전화 상담
                            </span>
                            <a
                              href="tel:0502-5550-8700"
                              className="text-blue-600 font-mono font-bold hover:underline"
                            >
                              0502-5550-8700
                            </a>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-700">
                              온라인 예약
                            </span>
                            <CalComPopup
                              trigger={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                >
                                  <Calendar className="mr-2 h-3 w-3" />
                                  예약하기
                                </Button>
                              }
                              calLink="familyoffices/group-insurance"
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-700">
                              방문 상담
                            </span>
                            <span className="text-sm text-gray-600">
                              서울시 중구 세종대로 73 태평로빌딩
                            </span>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg text-center text-sm text-blue-800">
                            <strong>무료 서비스:</strong> 위험도 분석, 상품
                            설계, 견적 비교까지 모두 무료로 제공됩니다
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 시작하는{' '}
              <span className="text-yellow-400">기업 단체보험</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              임직원 만족도는 높이고 복리후생비는 절세하는
              <br />
              <strong>일석이조의 기회</strong>를 놓치지 마세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button
                    size="lg"
                    className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    무료 상담 예약
                  </Button>
                }
                calLink="familyoffices/group-insurance"
              />
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
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
      <Script id="group-insurance-structured-data" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: '기업 단체보험 서비스 | 복리후생 + 절세 혜택',
              description:
                '기업 단체보험 완벽 가이드. 복리후생비 100% 손비처리, 임직원 만족도 향상, 절세 효과까지. 전 직원 보장 단체보험 상담.',
              image: {
                '@type': 'ImageObject',
                url: 'https://familyoffices.kr/images/group-insurance-guide.jpg',
                width: 1200,
                height: 630,
              },
              author: {
                '@type': 'Organization',
                name: '패밀리오피스 S',
                url: 'https://familyoffices.kr',
              },
              publisher: {
                '@type': 'Organization',
                name: '패밀리오피스 S',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://familyoffices.kr/logo.png',
                  width: 400,
                  height: 60,
                },
              },
              datePublished: new Date().toISOString(),
              dateModified: new Date().toISOString(),
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://familyoffices.kr/group-insurance',
              },
            },
            {
              '@type': 'Service',
              name: '기업 단체보험 상담',
              description: '기업 단체보험 상품 설계 및 도입 컨설팅 서비스',
              provider: {
                '@type': 'Organization',
                name: '패밀리오피스 S',
                telephone: '+82-502-5550-8700',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '세종대로 73 태평로빌딩',
                  addressLocality: '중구',
                  addressRegion: '서울',
                  addressCountry: 'KR',
                },
              },
              areaServed: 'KR',
              availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: 'https://familyoffices.kr/group-insurance',
                servicePhone: '+82-502-5550-8700',
              },
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                price: '0',
                priceCurrency: 'KRW',
                description: '무료 위험도 분석 및 상품 설계',
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '단체보험의 세제 혜택은 무엇인가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '복리후생비 100% 손비처리로 법인세 즉시 절감(27.5%), 임직원은 개인부담 최소화와 단체할인 혜택을 받을 수 있습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '최소 가입 인원이 있나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '단체상해보험 최소 5인, 단체건강보험 최소 10인, 단체생명보험 최소 7인 이상이며 보험사별로 차이가 있을 수 있습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '기존 직원과 신입직원 보장은 어떻게 되나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '기존 직원은 일괄 가입으로 전 직원 동일 보장을 받고, 신입직원은 입사 즉시 또는 일정 기간 후 자동 가입됩니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '보험료는 어떻게 결정되나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '업종 위험도, 가입 인원 수, 연령 구성, 보장 내용을 고려하여 결정되며, 단체할인(10-30%), 무사고할인(5-20%) 등의 혜택이 있습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '보험금 청구 절차는 어떻게 되나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '24시간 사고 접수 → 온라인 서류 제출 → 3-7일 내 보험금 지급 순으로 진행되며, 전담 직원이 전 과정을 지원합니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '단체보험 상담은 어떻게 받나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '전화상담(0502-5550-8700), 온라인 예약, 방문상담(서울시 중구 세종대로 73 태평로빌딩)을 통해 위험도 분석부터 상품 설계까지 무료로 상담받을 수 있습니다.',
                  },
                },
              ],
            },
          ],
        })}
      </Script>

      <Footer />
    </div>
  );
}
