'use client';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import InsightsFeed from '@/components/insights-feed';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Mail, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InsightsPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-8 shadow-sm animate-slide-up">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">Premium</span>
              <span className="text-sm text-slate-600 dark:text-slate-300 pr-2">전문가 인사이트 & 마켓 인텔리전스</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                인사이트 센터
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
              자산관리 전문가의 깊이 있는 분석과 실용적인 전략을 만나보세요.
              <br className="hidden md:block" />
              시장의 변화를 앞서가는 통찰력으로 성공적인 투자 결정을 지원합니다.
            </p>
          </div>
        </section>

        {/* Main Content Feed */}
        <InsightsFeed limit={100} showHeader={false} showViewAll={false} />

        {/* Stats Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03]"></div>
              
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={500} suffix="+" startAnimation={startAnimation} duration={2000} />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">게시된 인사이트</div>
                </div>
                
                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={10000} suffix="+" startAnimation={startAnimation} duration={2500} />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">구독자</div>
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
                  <div className="text-slate-500 dark:text-slate-400 font-medium">정기 업데이트</div>
                </div>
                
                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter end={100} suffix="+" startAnimation={startAnimation} duration={2000} />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">전문 자료</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multimedia Content Section */}
        <CompactMultimediaSection />

        {/* Newsletter CTA */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Lightbulb className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="text-blue-100 font-medium">매주 화요일과 금요일 아침</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              성공을 위한 인사이트를 놓치지 마세요
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              엄선된 투자 정보, 시장 분석, 그리고 전문가의 제언을 <br className="hidden sm:block" />
              가장 먼저 이메일로 받아보실 수 있습니다.
            </p>
            
            <Link href="/insights/weekly-brief">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-bold shadow-xl">
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