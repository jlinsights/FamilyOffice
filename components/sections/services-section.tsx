'use client';

import {
    ArrowRight,
    Briefcase,
    Building2,
    Crown,
    Search,
    Shield,
    Target,
    TrendingUp
} from 'lucide-react';

import Link from 'next/link';

import { Reveal, StaggerContainer } from '@/components/animations/reveal';
import { CTACard, LargeServiceCard, RegularServiceCard } from '@/components/bento';
import { BENTO_SERVICES, getGridClass } from '@/constants/bento-services';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm animate-fade-in">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">Premium</span>
            <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
              <Briefcase className="h-3 w-3 mr-1" />
              Family Office Excellence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight animate-slide-up">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
              차별화된 패밀리오피스
            </span>{' '}
            <span className="text-slate-700 dark:text-slate-300">전용 솔루션</span>
          </h2>

          <p
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up font-light"
            style={{ animationDelay: '100ms' }}
          >
            최고 자산가와 성공한 기업가를 위한 <span className="font-semibold text-blue-700 dark:text-blue-400">프리미엄 서비스 포트폴리오</span>로<br className="hidden sm:block" /> 세대를 잇는 자산관리를 실현합니다
          </p>
        </Reveal>

        {/* Bento Grid 서비스 카드 */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 auto-rows-auto"
          staggerDelay={0.1}
        >
          {BENTO_SERVICES.map((service) => {
            const gridClass = getGridClass(service.size);
            
            return (
              <Reveal key={service.id} className={gridClass}>
                {service.size === 'large' ? (
                  <LargeServiceCard service={service} />
                ) : service.size === 'cta' ? (
                  <CTACard 
                    service={service} 
                    variant={service.id === 'family-office-center' ? 'primary' : 'secondary'}
                  />
                ) : (
                  <RegularServiceCard service={service} />
                )}
              </Reveal>
            );
          })}
        </StaggerContainer>

        {/* 통계 섹션 */}
        <div className="relative rounded-3xl p-10 mb-20 overflow-hidden bg-slate-900 dark:bg-slate-950 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-300">패밀리오피스</span>의 탁월한 성과
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
              최고 자산가들이 신뢰하는 패밀리오피스의 검증된 실적과 <span className="font-bold text-white">차별화된 전문성</span>
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500억원+', label: '자산관리 실적', icon: TrendingUp, color: 'text-blue-400' },
              { value: '500+', label: '법인 고객사', icon: Building2, color: 'text-purple-400' },
              { value: '20년+', label: '전문 경험', icon: Shield, color: 'text-green-400' },
              { value: '98%', label: '만족도', icon: Target, color: 'text-yellow-400' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                <div className="flex justify-center mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-black mb-2 text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/family-office-center"
              className="inline-flex items-center justify-center rounded-full text-lg font-bold px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Crown className="mr-2 h-5 w-5" />
              패밀리오피스 센터
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full text-lg font-bold px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              전체 솔루션 보기
            </Link>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            최고 자산가를 위한 차별화된 패밀리오피스 서비스를 경험해보세요
          </p>
        </div>
      </div>
    </section>
  );
}