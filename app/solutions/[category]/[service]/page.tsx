'use client';

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PremiumContentGuard } from '@/components/premium-content-guard';
import { BreadcrumbNavigation } from '@/components/seo/breadcrumb-navigation';

import {
  generateServiceSlug,
  getRelatedServices,
  getServiceBySlug,
} from '@/constants/services';

interface ServiceDetailPageProps {
  params: {
    category: string;
    service: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const result = getServiceBySlug(params.category, params.service);

  if (!result) {
    notFound();
  }

  const { category, service } = result;
  const relatedServices = getRelatedServices(category.id, service.title, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      <PremiumContentGuard>
        <main className="pt-20">
          {/* Breadcrumb */}
          <div className="container mx-auto px-6 py-4">
            <BreadcrumbNavigation
              customItems={[
                { name: '홈', url: 'https://familyoffices.vip' },
                { name: '솔루션', url: 'https://familyoffices.vip/solutions' },
                {
                  name: category.title,
                  url: `https://familyoffices.vip/solutions#${category.id}`,
                },
                {
                  name: service.title,
                  url: `https://familyoffices.vip/solutions/${params.category}/${params.service}`,
                  isCurrentPage: true,
                },
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/Images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 font-medium"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  솔루션 목록으로
                </Link>

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full">
                    {category.title}
                  </span>
                  <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Premium Service
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                  {service.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Target Client */}
                <div className="flex items-start gap-3 p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl mb-8">
                  <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      추천 고객
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      {service.targetClient}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl rounded-full px-8"
                    asChild
                  >
                    <Link href="/structure-check#request-form">
                      무료 구조 점검 신청
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-300 dark:border-slate-700 font-bold rounded-full px-8"
                    asChild
                  >
                    <Link
                      href="http://pf.kakao.com/_gsxkxdG/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      카카오톡 상담
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                  ⭐ 핵심 특징
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                    >
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                  💎 기대 효과
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200 dark:border-blue-800"
                    >
                      <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Case Study Section */}
          {service.caseStudy && (
            <section className="py-16 bg-slate-900 dark:bg-slate-950 text-white">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black mb-8">📊 성공 사례</h2>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Situation */}
                      <div className="space-y-3">
                        <div className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                          상황
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {service.caseStudy.situation}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-3">
                        <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                          솔루션
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {service.caseStudy.solution}
                        </p>
                      </div>

                      {/* Result */}
                      <div className="space-y-3">
                        <div className="text-amber-400 font-bold text-sm uppercase tracking-wider">
                          결과
                        </div>
                        <p className="text-slate-200 leading-relaxed font-semibold">
                          {service.caseStudy.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Detailed Content Section */}
          {service.detailedContent && (
            <>
              {/* Overview */}
              {service.detailedContent.overview && (
                <section className="py-16">
                  <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                        📋 서비스 개요
                      </h2>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {service.detailedContent.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Process */}
              {service.detailedContent.process &&
                service.detailedContent.process.length > 0 && (
                  <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                          🔄 진행 프로세스
                        </h2>
                        <div className="space-y-4">
                          {service.detailedContent.process.map(
                            (step, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                                  {step}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

              {/* Pricing & Timeline */}
              <section className="py-16">
                <div className="container mx-auto px-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pricing */}
                      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            비용 안내
                          </h3>
                        </div>
                        {service.detailedContent.pricing.range && (
                          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-2">
                            {service.detailedContent.pricing.range}
                          </div>
                        )}
                        <p className="text-slate-600 dark:text-slate-300">
                          {service.detailedContent.pricing.description}
                        </p>
                      </div>

                      {/* Timeline */}
                      <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            소요 기간
                          </h3>
                        </div>
                        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                          {service.detailedContent.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Deliverables */}
              {service.detailedContent.deliverables &&
                service.detailedContent.deliverables.length > 0 && (
                  <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                          📦 제공 산출물
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.detailedContent.deliverables.map(
                            (deliverable, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                              >
                                <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300">
                                  {deliverable}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

              {/* FAQs */}
              {service.detailedContent.faqs &&
                service.detailedContent.faqs.length > 0 && (
                  <section className="py-16">
                    <div className="container mx-auto px-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                          💬 자주 묻는 질문
                        </h2>
                        <PremiumFAQ items={service.detailedContent.faqs} />
                      </div>
                    </div>
                  </section>
                )}
            </>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">
                    🔗 관련 서비스
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedServices.map((relatedService, index) => (
                      <Link
                        key={index}
                        href={`/solutions/${category.id}/${relatedService.slug || generateServiceSlug(relatedService.title)}`}
                        className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                      >
                        <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {relatedService.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {relatedService.description}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                          자세히 보기
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Final CTA */}
          <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                {service.title} 상담이 필요하신가요?
              </h2>
              <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light">
                전문가와 함께 맞춤형 솔루션을 설계하세요
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-xl rounded-full px-8 py-6 text-lg border-none"
                  asChild
                >
                  <Link href="/structure-check#request-form">
                    무료 구조 점검 신청
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full px-8 py-6 text-lg font-bold"
                  asChild
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
            </div>
          </section>
        </main>
      </PremiumContentGuard>

      <Footer />
    </div>
  );
}
