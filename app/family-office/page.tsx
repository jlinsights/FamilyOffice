'use client'

/**
 * 🎯 순자산 300억+ 순이익 5억+ 패밀리오피스 전용 랜딩페이지
 * Ultra Premium 고객 대상 전용 서비스
 */

import { CalComButton } from '@/components/cal-com-button'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    CUSTOMER_SEGMENTS,
    generateDynamicContent,
    generateTargetingMessage
} from '@/lib/customer-segmentation'
import {
    CheckCircle2,
    Crown,
    Diamond,
    Eye,
    Gem,
    Globe,
    Infinity,
    Landmark,
    Lock,
    Mountain,
    Shield,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// 패밀리오피스 핵심 서비스 영역 (from /family-office-center)
const familyOfficeServices = {
  wealth: {
    title: '자산관리 Excellence',
    icon: Diamond,
    subtitle: 'Wealth Management',
    description: '세대를 초월하는 자산 보전과 성장 전략',
    features: [
      '글로벌 자산 배분 및 포트폴리오 관리',
      '대안투자 기회 발굴 및 접근',
      '리스크 헤지 및 자산 보전 전략',
      '세무 최적화 통합 솔루션',
      '유동성 관리 및 현금흐름 최적화'
    ],
    benefits: [
      '세대간 자산 보전 및 성장',
      '시장 변동성 대응력 강화',
      '세무 효율성 극대화',
      '글로벌 투자 기회 접근'
    ],
    targetAssets: '30억원 이상',
    philosophy: '資産保全 · 世代傳承'
  },
  succession: {
    title: '가업승계 Mastery',
    icon: Crown,
    subtitle: 'Business Succession',
    description: '기업과 가문의 지속가능한 발전을 위한 승계 설계',
    features: [
      '가업승계 마스터플랜 수립',
      '차세대 경영자 육성 프로그램',
      '지분 구조 최적화 및 경영권 보호',
      '가족 거버넌스 체계 구축',
      '상속·증여세 최적화 전략'
    ],
    benefits: [
      '안정적 경영권 승계',
      '세무 부담 최소화',
      '가족 갈등 예방',
      '기업 지속성 확보'
    ],
    targetAssets: '기업가치 50억원 이상',
    philosophy: '家業永續 · 經營承繼'
  },
  governance: {
    title: '가족 Governance',
    icon: Landmark,
    subtitle: 'Family Governance',
    description: '체계적인 가족 경영과 의사결정 시스템',
    features: [
      '가족헌장 및 가족협의회 구성',
      '차세대 교육 및 리더십 개발',
      '가족 자산 통합 관리',
      '갈등 조정 및 의사결정 시스템',
      '패밀리오피스 운영 체계'
    ],
    benefits: [
      '체계적 가족 경영',
      '세대간 소통 강화',
      '합리적 의사결정',
      '가족 유대 강화'
    ],
    targetAssets: '가족 자산 100억원 이상',
    philosophy: '家族經營 · 和諧統一'
  },
  legacy: {
    title: 'Legacy Building',
    icon: Mountain,
    subtitle: 'Wealth Legacy',
    description: '세대를 관통하는 가문의 유산 구축',
    features: [
      '가문의 미션과 비전 수립',
      '사회적 영향력 확대 전략',
      '자선 활동 및 사회공헌 설계',
      '문화적 유산 보전 및 계승',
      '글로벌 네트워크 구축'
    ],
    benefits: [
      '지속가능한 가문 발전',
      '사회적 명성 구축',
      '가치 기반 경영 실현',
      '차세대 자긍심 제고'
    ],
    targetAssets: '총 자산 500억원 이상',
    philosophy: '百年永續 · 社會貢獻'
  }
};

// 패밀리오피스의 차별화된 가치 제안 (from /family-office-center)
const uniqueValuePropositions = [
  {
    icon: Eye,
    title: '독점적 정보 접근',
    subtitle: 'Exclusive Intelligence',
    description: '일반인이 접근할 수 없는 프리미엄 투자 기회와 시장 정보를 독점 제공',
    details: ['글로벌 프라이빗 마켓 정보', 'UHNW 네트워크 인사이트', '정책 변화 선행 정보']
  },
  {
    icon: Lock,
    title: '최고 수준의 보안',
    subtitle: 'Ultimate Privacy',
    description: '완벽한 프라이버시 보호와 최고 수준의 정보 보안 시스템',
    details: ['익명성 보장 시스템', '암호화된 통신', '기밀 유지 협약']
  },
  {
    icon: Users,
    title: '전담 전문가팀',
    subtitle: 'Dedicated Experts',
    description: '고객 한 분을 위한 전담 멀티패밀리오피스 전문가팀 구성',
    details: ['CIO, CFO급 전문가', '24/7 전담 서비스', '글로벌 네트워크']
  },
  {
    icon: Globe,
    title: '글로벌 플랫폼',
    subtitle: 'Global Platform',
    description: '세계 주요 금융 허브와 연결된 통합 자산관리 플랫폼',
    details: ['해외 자산 통합 관리', 'Cross-border 최적화', '다중 통화 관리']
  },
  {
    icon: Zap,
    title: '혁신적 솔루션',
    subtitle: 'Innovation Edge',
    description: '최신 핀테크와 AI를 활용한 차세대 자산관리 솔루션',
    details: ['AI 기반 포트폴리오 관리', 'Real-time 리스크 모니터링', 'Advanced Analytics']
  },
  {
    icon: Infinity,
    title: '세대간 연속성',
    subtitle: 'Generational Continuity',
    description: '100년을 바라보는 장기적 관점의 세대간 자산 승계',
    details: ['세대별 맞춤 전략', '교육 및 멘토링', '가문 유산 보전']
  }
];

export default function FamilyOfficePage() {
  const segmentData = CUSTOMER_SEGMENTS['family-office']
  const targetingMessage = generateTargetingMessage('family-office')
  const dynamicContent = generateDynamicContent('family-office')
  const [selectedService, setSelectedService] = useState('wealth')

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      <main className="pt-20">
        {/* 🎯 Hero Section - Ultra Premium */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              {segmentData.serviceLevel} Service
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {targetingMessage.headline}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {targetingMessage.subheadline}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <CalComButton 
                variant="default"
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 px-8 py-4"
                buttonText={targetingMessage.cta}
              />
              
              <p className="text-sm text-amber-600 font-medium">
                {targetingMessage.urgency}
              </p>
            </div>
          </div>
        </section>

        {/* 🏆 Ultra Premium 자격 기준 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">패밀리오피스 자격 기준</h2>
              <p className="text-gray-600">UHNW(Ultra High Net Worth) 고객을 위한 전용 서비스</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                    순자산 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {segmentData.criteria.netWorth}억원 이상
                  </div>
                  <p className="text-gray-600">
                    부동산, 금융자산, 사업자산 등 총 순자산
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-600" />
                    순이익 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {segmentData.criteria.netIncome}억원 이상
                  </div>
                  <p className="text-gray-600">
                    연간 순이익(세후소득) 기준
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 💎 Ultra Premium 전용 서비스 (Rich Content from Family Office Center) */}
        <section className="py-20 px-4 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 bg-white/50" animation="fade">
                <Sparkles className="h-4 w-4 mr-2 text-amber-600" />
                Premium Services Portfolio
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                패밀리오피스 핵심 서비스
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                세대를 초월하는 자산관리와 가업승계의 완벽한 솔루션
              </p>
            </div>

            <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-12 h-auto p-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl">
                {Object.entries(familyOfficeServices).map(([key, service]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="flex flex-col items-center p-4 text-sm font-medium rounded-xl data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900"
                  >
                    <service.icon className="h-8 w-8 mb-2 text-amber-600" />
                    <span>{service.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(familyOfficeServices).map(([key, service]) => {
                const Icon = service.icon;
                return (
                  <TabsContent key={key} value={key}>
                    <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 pb-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-3xl text-gray-900">
                              {service.title}
                            </CardTitle>
                            <CardDescription className="text-lg text-amber-600 font-medium">
                              {service.subtitle}
                            </CardDescription>
                          </div>
                          <div className="ml-auto text-right hidden md:block">
                            <Badge variant="outline" className="bg-white/80 border-amber-200">
                              {service.targetAssets}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="text-center mt-4 p-3 bg-white/60 rounded-xl border border-amber-100">
                          <p className="text-lg font-medium text-amber-800 font-serif">
                            {service.philosophy}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-gray-900 flex items-center gap-2">
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                              핵심 서비스
                            </h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <Star className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-amber-700 flex items-center gap-2">
                              <Target className="h-6 w-6 text-amber-600" />
                              기대 가치
                            </h4>
                            <ul className="space-y-3">
                              {service.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <Gem className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 leading-relaxed">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* 👑 독점 혜택 (Rich Content from Family Office Center) */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-6" animation="fade">
                <Diamond className="h-4 w-4 mr-2 text-amber-600" />
                Exclusive Value
              </Badge>
              <h2 className="text-3xl font-bold mb-4">차별화된 가치 제안</h2>
              <p className="text-gray-600">UHNW 고객만이 누릴 수 있는 특별한 혜택</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uniqueValuePropositions.map((proposition, index) => {
                const Icon = proposition.icon;
                return (
                  <Card key={index} className="h-full border-amber-100 bg-amber-50/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-100 rounded-2xl">
                          <Icon className="h-8 w-8 text-amber-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900">{proposition.title}</CardTitle>
                          <CardDescription className="text-amber-600 font-medium">
                            {proposition.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {proposition.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {proposition.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* 📊 성공 사례 */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">UHNW 고객 성공 사례</h2>
              <p className="text-gray-600">실제 패밀리오피스 구축 및 운영 성과</p>
            </div>
            
            {dynamicContent.caseStudies.map((caseStudy, index) => (
              <Card key={index} className="p-8 mb-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                    <p className="text-gray-600">운용 기간: {caseStudy.period}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600 mb-2">
                      {caseStudy.result}
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-amber-600 border-amber-600">
                      검증된 성과
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 🎯 고객 후기 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">UHNW 고객 후기</h2>
              <p className="text-gray-600">실제 패밀리오피스 이용 고객들의 생생한 경험담</p>
            </div>
            
            {dynamicContent.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 mb-6 border-2 border-amber-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg italic mb-4">
                      &quot;{testimonial.testimonial}&quot;
                    </blockquote>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{testimonial.client}</div>
                        <div className="text-gray-600">{testimonial.company}</div>
                      </div>
                      <Badge variant="outline" className="text-amber-600">
                        순자산 {testimonial.netWorth}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 💰 투자 정보 */}
        <section className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">패밀리오피스 투자 정보</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-2">
                  {segmentData.minimumFee}
                </div>
                <p className="text-gray-600">최소 서비스 피</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-2">24시간</div>
                <p className="text-gray-600">전담 매니저 배정</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-2">임재홍 대표</div>
                <p className="text-gray-600">직접 관리</p>
              </div>
            </div>

            <Separator className="my-8" />
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">패밀리오피스 전담 매니저와 상담하기</h3>
              <CalComButton 
                variant="default" 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 px-8 py-4"
                buttonText="24시간 내 전담 매니저 배정"
              />
              <p className="text-sm text-gray-500 mt-4">
                * UHNW 자격 검증 후 임재홍 대표 직접 상담
              </p>
            </div>
          </div>
        </section>

        {/* 🔗 관련 서비스 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">관련 서비스</h2>
              <p className="text-gray-600">패밀리오피스와 함께 제공되는 통합 솔루션</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/services">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-6 h-6 text-blue-600" />
                      통합 자산관리 서비스
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">글로벌 포트폴리오 운용 및 리스크 관리</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/program">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-green-600" />
                      가업승계 전문 프로그램
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">세대간 자산 승계 및 경영권 이전</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/seminar">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-purple-600" />
                      UHNW 전용 세미나
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">울트라 리치 자산가 전용 교육 프로그램</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}