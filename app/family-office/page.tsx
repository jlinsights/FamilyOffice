'use client'

/**
 * 🎯 순자산 300억+ 순이익 5억+ 패밀리오피스 전용 랜딩페이지
 * Ultra Premium 고객 대상 전용 서비스
 */

import { CalComButton } from '@/components/cal-com-button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    CUSTOMER_SEGMENTS,
    generateDynamicContent,
    generateTargetingMessage
} from '@/lib/customer-segmentation'
import { CheckCircle, Crown, Shield, Star, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function FamilyOfficePage() {
  const segmentData = CUSTOMER_SEGMENTS['family-office']
  const targetingMessage = generateTargetingMessage('family-office')
  const dynamicContent = generateDynamicContent('family-office')

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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

      {/* 💎 Ultra Premium 전용 서비스 */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ultra Premium 전용 서비스</h2>
            <p className="text-gray-600">UHNW 고객만을 위한 독점적 패밀리오피스 솔루션</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segmentData.services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                    {service}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 👑 독점 혜택 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">독점 혜택</h2>
            <p className="text-gray-600">UHNW 고객만이 누릴 수 있는 특별한 혜택</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {segmentData.exclusiveBenefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 border-2 border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit}</h3>
              </Card>
            ))}
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
                    "{testimonial.testimonial}"
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
    </div>
  )
}