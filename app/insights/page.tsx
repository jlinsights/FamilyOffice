'use client';

import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  HelpCircle,
  Lightbulb,
  Mail,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { AnimatedCounter } from '@/components/animated-counter';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import InsightsFeed from '@/components/insights-feed';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { StructuredData } from '@/components/structured-data';

import { insightsFAQ } from '@/lib/seo/insights-faq-data';

export default function InsightsPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // FAQ Schema.org Structured Data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: insightsFAQ.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* FAQ Structured Data */}
      <StructuredData data={faqStructuredData} />

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-full blur-xl -z-10 will-change-transform"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-8 shadow-sm animate-slide-up">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">
                Premium
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 pr-2">
                전문가 인사이트 & 마켓 인텔리전스
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                인사이트 센터
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              자산관리 전문가의 깊이 있는 분석과 실용적인 전략을 만나보세요.
              <br className="hidden md:block" />
              시장의 변화를 앞서가는 통찰력으로 성공적인 투자 결정을 지원합니다.
            </p>
          </div>
        </section>

        {/* Main Content Feed */}
        <InsightsFeed limit={100} showHeader={false} showViewAll={false} />

        {/* Category Grid Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                카테고리별 인사이트 탐색
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                관심있는 주제를 선택하여 전문적인 인사이트를 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* 재무 설계 */}
              <Link href="/insights?category=재무설계">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 hover:border-blue-500">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      재무설계
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      체계적인 자산관리 전략
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* 세무 전략 */}
              <Link href="/insights?category=세무전략">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 hover:border-green-500">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      세무전략
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      절세와 효율적 운영
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* 가업승계 */}
              <Link href="/insights?category=가업승계">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 hover:border-purple-500">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      가업승계
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      백년영속 기업 준비
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* 리스크 관리 */}
              <Link href="/insights?category=리스크관리">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 hover:border-orange-500">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      리스크관리
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      안정적 자산 보호
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Publishing Schedule */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    정기 발행 일정
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-20">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-lg">
                          화요일
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        재무설계 및 세무 전략
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-20">
                        <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-lg">
                          금요일
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        시장 동향 및 투자 인사이트
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    매주 2회, 검증된 전문가의 인사이트를 정기적으로 발행합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5 inline" />
                자주 묻는 질문
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Insights FAQ
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                인사이트 콘텐츠와 구독에 관해 자주 묻는 질문입니다
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <PremiumFAQ items={insightsFAQ} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                찾으시는 답변이 없으신가요?
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  1:1 문의하기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/Images/grid-pattern.svg')] opacity-[0.03]"></div>

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter
                      end={500}
                      suffix="+"
                      startAnimation={startAnimation}
                      duration={2000}
                    />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    게시된 인사이트
                  </div>
                </div>

                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter
                      end={10000}
                      suffix="+"
                      startAnimation={startAnimation}
                      duration={2500}
                    />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    구독자
                  </div>
                </div>

                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <span className="inline-block">주 2회</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    정기 업데이트
                  </div>
                </div>

                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter
                      end={100}
                      suffix="+"
                      startAnimation={startAnimation}
                      duration={2000}
                    />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    전문 자료
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multimedia Content Section */}
        <CompactMultimediaSection />

        {/* Newsletter CTA */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 relative">
          <div className="absolute inset-0 bg-[url('/Images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Lightbulb className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="text-blue-100 font-medium">
                매주 화요일과 금요일 아침
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              성공을 위한 인사이트를 놓치지 마세요
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              엄선된 투자 정보, 시장 분석, 그리고 전문가의 제언을{' '}
              <br className="hidden sm:block" />
              가장 먼저 이메일로 받아보실 수 있습니다.
            </p>

            <Link href="/insights/weekly-brief">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-bold shadow-xl"
              >
                주간 브리프 무료 구독하기
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <p className="mt-6 text-sm text-blue-200/60">
              * 언제든지 구독을 취소하실 수 있습니다.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
