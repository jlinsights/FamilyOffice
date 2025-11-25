'use client';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import InsightsFeed from '@/components/insights-feed';
import CompactMultimediaSection from '@/components/sections/compact-multimedia-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Download, Lightbulb, LineChart, Mail, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ColorClasses {
  icon: string;
  border: string;
  bg: string;
  button: string;
  gradient: string;
}

const insightSections = [
  {
    title: '시장 분석',
    description: '자산관리 전문가의 최신 인사이트와 전략 분석을 통해 시장의 흐름을 읽고 선제적으로 대응하세요.',
    href: '/insights/market-intelligence',
    icon: LineChart,
    color: 'blue',
    features: [
      '매주 수요일 정기 업데이트',
      '글로벌 시장 동향 분석',
      '섹터별 투자 전략 가이드',
      '거시경제 및 환율 전망',
    ],
  },
  {
    title: '주간 브리프',
    description: '한 주간의 핵심 시장 이슈와 투자 인사이트를 엄선하여 이메일로 편리하게 받아보세요.',
    href: '/insights/weekly-brief',
    icon: Mail,
    color: 'purple',
    features: [
      '매주 화·금 아침 발송',
      '독점 투자 정보 및 분석',
      '전문가 심층 인터뷰',
      '고객 맞춤형 큐레이션',
    ],
  },
  {
    title: '자료실',
    description: '투자 가이드북, 시장 분석 보고서, 세미나 발표 자료 등 깊이 있는 전문 자료를 제공합니다.',
    href: '/insights/resources',
    icon: Download,
    color: 'green',
    features: [
      '프리미엄 투자 가이드북',
      '심층 시장 분석 보고서',
      '세미나/웨비나 발표 자료',
      'CEO 필독 경영/세무 자료',
    ],
  },
];

const getColorClasses = (color: string): ColorClasses => {
  switch (color) {
    case 'blue':
      return {
        icon: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        bg: 'bg-blue-50/50 dark:bg-blue-900/10',
        button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        gradient: 'from-blue-500/20 to-indigo-500/20'
      };
    case 'green':
      return {
        icon: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        bg: 'bg-green-50/50 dark:bg-green-900/10',
        button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
        gradient: 'from-green-500/20 to-emerald-500/20'
      };
    case 'purple':
      return {
        icon: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        bg: 'bg-purple-50/50 dark:bg-purple-900/10',
        button: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',
        gradient: 'from-purple-500/20 to-violet-500/20'
      };
    default:
      return {
        icon: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-800',
        bg: 'bg-slate-50/50 dark:bg-slate-900/10',
        button: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800',
        gradient: 'from-slate-500/20 to-slate-600/20'
      };
  }
};

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

        {/* Main Sections */}
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insightSections.map((section, index) => {
                const Icon = section.icon;
                const colorClasses = getColorClasses(section.color);
                
                return (
                  <Card 
                    key={section.title} 
                    className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border ${colorClasses.border} ${colorClasses.bg} group backdrop-blur-sm animate-slide-up`}
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${colorClasses.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                    
                    <CardHeader className="relative pb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${colorClasses.icon}`} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {section.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed min-h-[80px]">
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <ul className="space-y-3 mb-8">
                        {section.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className={`w-1.5 h-1.5 rounded-full mr-3 ${colorClasses.icon.split(' ')[0]!.replace('text-', 'bg-')}`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex gap-3">
                        <Button
                          asChild
                          className={`flex-1 ${colorClasses.button} text-white shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                          <Link href={section.href} className="flex items-center justify-center">
                            더 알아보기 <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <a href="https://cal.com/familyoffice" target="_blank" rel="noopener noreferrer">상담 신청</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Insights - RSS 피드 통합 */}
        <InsightsFeed limit={9} showHeader={true} showViewAll={true} />

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