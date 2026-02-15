/**
 * 🎯 순자산 50억+ 순이익 3억+ FP센터 전용 랜딩페이지
 * Premium 고객 대상 전문 자산관리 서비스
 */
import {
  Award,
  CheckCircle,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalComButton } from '@/components/calendar/cal-com-button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  CUSTOMER_SEGMENTS,
  generateDynamicContent,
  generateTargetingMessage,
} from '@/lib/marketing/customer-segmentation';

export default function FPCenterPage() {
  const segmentData = CUSTOMER_SEGMENTS['fp-center'];
  const targetingMessage = generateTargetingMessage('fp-center');
  const dynamicContent = generateDynamicContent('fp-center');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="pt-20">
        {/* 🎯 Hero Section - Premium */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-4 py-2"
            >
              <Award className="w-4 h-4 mr-2" />
              {segmentData.serviceLevel} Service
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-slate-50">
              {targetingMessage.headline}
            </h1>

            <p className="text-xl text-gray-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              {targetingMessage.subheadline}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <CalComButton
                variant="default"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4"
                buttonText={targetingMessage.cta}
              />

              <p className="text-sm text-blue-600 font-medium">
                {targetingMessage.urgency}
              </p>
            </div>
          </div>
        </section>

        {/* 🎯 FP센터 자격 기준 */}
        <section className="py-16 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                FP센터 자격 기준
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                HNW(High Net Worth) 고객을 위한 프리미엄 서비스
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    순자산 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {segmentData.criteria.netWorth}억원 이상
                  </div>
                  <p className="text-gray-600 dark:text-slate-400">
                    부동산, 금융자산, 사업자산 등 총 순자산
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 dark:border-slate-800 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    순이익 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {segmentData.criteria.netIncome}억원 이상
                  </div>
                  <p className="text-gray-600 dark:text-slate-400">
                    연간 순이익(세후소득) 기준
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 💼 Premium 전문 서비스 */}
        <section className="py-16 px-4 bg-blue-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                Premium 전문 서비스
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                성공한 기업인을 위한 체계적 자산관리 솔루션
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segmentData.services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow dark:bg-slate-800 dark:border-slate-700"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg dark:text-slate-200">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      {service}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 🌟 Premium 혜택 */}
        <section className="py-16 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                Premium 혜택
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                FP센터 고객만을 위한 특별 혜택
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {segmentData.exclusiveBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center p-6 border-2 border-blue-100 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 dark:text-slate-200">
                    {benefit}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 📈 성공 사례 */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                FP센터 성공 사례
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                실제 중견기업 CEO들의 자산관리 성과
              </p>
            </div>

            {dynamicContent.caseStudies.map((caseStudy, index) => (
              <Card
                key={index}
                className="p-8 mb-6 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-slate-100">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      운용 기간: {caseStudy.period}
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {caseStudy.result}
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    >
                      검증된 성과
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 💬 고객 후기 */}
        <section className="py-16 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                FP센터 고객 후기
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                중견기업 CEO들의 실제 경험담
              </p>
            </div>

            {dynamicContent.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 mb-6 border-2 border-blue-100 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg italic mb-4 dark:text-slate-300">
                      &quot;{testimonial.testimonial}&quot;
                    </blockquote>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold dark:text-slate-200">
                          {testimonial.client}
                        </div>
                        <div className="text-gray-600 dark:text-slate-400">
                          {testimonial.company}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-blue-600 dark:text-blue-400 dark:border-blue-900"
                      >
                        순자산 {testimonial.netWorth}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 📊 FP센터 vs 일반 상담 비교 */}
        <section className="py-16 px-4 bg-blue-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                FP센터 vs 일반 상담
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                Premium 서비스의 차별화된 가치
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-slate-800 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Award className="w-6 h-6" />
                    FP센터 (Premium)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-slate-300">
                      수석 전문가 전담 배정
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-slate-300">
                      월 1회 정기 자산관리 리포트
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-slate-300">
                      VIP 세미나 우선 참가
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-slate-300">
                      포트폴리오 실시간 모니터링
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="dark:text-slate-300">
                      세무/법무 전문가 연동
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-slate-700 dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                    <Target className="w-6 h-6" />
                    일반 상담 (Standard)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500">
                    <div className="w-5 h-5 border border-gray-300 dark:border-slate-600 rounded"></div>
                    <span>일반 상담사 배정</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500">
                    <div className="w-5 h-5 border border-gray-300 dark:border-slate-600 rounded"></div>
                    <span>필요 시 보고서 제공</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500">
                    <div className="w-5 h-5 border border-gray-300 dark:border-slate-600 rounded"></div>
                    <span>일반 세미나 참가</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500">
                    <div className="w-5 h-5 border border-gray-300 dark:border-slate-600 rounded"></div>
                    <span>기본 자산분석</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500">
                    <div className="w-5 h-5 border border-gray-300 dark:border-slate-600 rounded"></div>
                    <span>기초 세무 조언</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 💰 투자 정보 */}
        <section className="py-16 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-slate-100">
              FP센터 투자 정보
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {segmentData.minimumFee}
                </div>
                <p className="text-gray-600 dark:text-slate-400">
                  최소 서비스 피
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  48시간
                </div>
                <p className="text-gray-600 dark:text-slate-400">전문가 배정</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  수석 전문가
                </div>
                <p className="text-gray-600 dark:text-slate-400">담당 매니저</p>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 dark:text-slate-200">
                FP센터 수석 전문가와 상담하기
              </h3>
              <CalComButton
                variant="default"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-8 py-4"
                buttonText="48시간 내 FP 전문가 배정"
              />
              <p className="text-sm text-gray-500 dark:text-slate-500 mt-4">
                * HNW 자격 검증 후 수석 전문가 직접 상담
              </p>
            </div>
          </div>
        </section>

        {/* 📈 업그레이드 경로 */}
        <section className="py-16 px-4 bg-blue-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-slate-100">
              패밀리오피스 업그레이드
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-8">
              자산 성장에 따라 Ultra Premium 패밀리오피스로 업그레이드 가능
            </p>

            <Card className="p-8 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 dark:border-amber-900/50">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                    현재: FP센터
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">
                    순자산 50억+ / 순이익 3억+
                  </div>
                </div>

                <div className="text-3xl text-gray-400 dark:text-slate-600">
                  →
                </div>

                <div className="text-center">
                  <div className="text-amber-600 dark:text-amber-500 font-bold text-lg mb-2">
                    목표: 패밀리오피스
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">
                    순자산 300억+ / 순이익 5억+
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-slate-400 mb-4">
                자산 목표 달성 시 자동으로 패밀리오피스 서비스 자격이 부여됩니다
              </p>

              <Link href="/family-office-center">
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-950"
                >
                  패밀리오피스 서비스 알아보기
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* 🔗 관련 서비스 */}
        <section className="py-16 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">
                관련 서비스
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                FP센터와 함께 제공되는 통합 솔루션
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/services">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-slate-200">
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      전문 자산관리 서비스
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-slate-400">
                      체계적 포트폴리오 관리 및 리스크 분석
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/program">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-slate-200">
                      <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                      가업승계 컨설팅
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-slate-400">
                      중견기업 경영권 승계 및 세무 최적화
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/seminar">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-slate-200">
                      <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      FP센터 전용 세미나
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-slate-400">
                      중견기업 CEO 전용 자산관리 교육
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
