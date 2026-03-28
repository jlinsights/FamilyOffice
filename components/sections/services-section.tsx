'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  Crown,
  Search,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/animation/FadeIn';
import {
  CTACard,
  LargeServiceCard,
  RegularServiceCard,
} from '@/components/bento';
import { BENTO_SERVICES, getGridClass } from '@/constants/bento-services';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <FadeIn direction="up" className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">
              Premium
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
              <Briefcase className="h-3 w-3 mr-1" />
              Family Office Excellence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
            <span className="inline-block">
              차별화된 패밀리오피스 전용 솔루션
            </span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            법인 자산 관리 및 가업승계 전문{' '}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              프리미엄 서비스 포트폴리오
            </span>
            로<br className="hidden sm:block" /> 세대를 잇는 자산관리를
            실현합니다
          </p>
        </FadeIn>

        {/* Bento Grid 서비스 카드 */}
        <FadeIn
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 auto-rows-auto"
          stagger={0.1}
        >
          {BENTO_SERVICES.map(service => {
            const gridClass = getGridClass(service.size);

            return (
              <div key={service.id} className={gridClass}>
                {service.size === 'large' ? (
                  <LargeServiceCard service={service} />
                ) : service.size === 'cta' ? (
                  <CTACard
                    service={service}
                    variant={
                      service.id === 'family-office-center'
                        ? 'primary'
                        : 'secondary'
                    }
                  />
                ) : (
                  <RegularServiceCard service={service} />
                )}
              </div>
            );
          })}
        </FadeIn>

        {/* 통계 섹션 */}
        <FadeIn direction="up" delay={0.2}>
          <div className="relative rounded-3xl p-10 mb-20 overflow-hidden bg-slate-900 dark:bg-slate-950 text-white shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-blue-300">패밀리오피스</span>의 탁월한
                성과
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
                최고 자산가들이 신뢰하는 패밀리오피스의 검증된 실적과{' '}
                <span className="font-bold text-white">차별화된 전문성</span>
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  value: '500억원+',
                  label: '자산관리 실적',
                  icon: TrendingUp,
                  color: 'text-blue-400',
                },
                {
                  value: '500+',
                  label: '법인 고객사',
                  icon: Building2,
                  color: 'text-purple-400',
                },
                {
                  value: '20년+',
                  label: '전문 경험',
                  icon: Shield,
                  color: 'text-green-400',
                },
                {
                  value: '98%',
                  label: '만족도',
                  icon: Target,
                  color: 'text-yellow-400',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                >
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
        </FadeIn>

        {/* CTA 섹션 */}
        <FadeIn direction="up" delay={0.4} className="text-center">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Link
              href="/family-office-center"
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                  <span className="text-xs font-bold px-2 text-blue-100">
                    VIP 전용
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  패밀리오피스 센터
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-blue-100 font-medium">
                  최고 자산가를 위한 전용 서비스
                </p>
              </div>
            </Link>

            <Link
              href="/solutions"
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Search className="w-24 h-24 -mr-8 -mt-8 -rotate-12" />
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                  <span className="text-xs font-bold px-2 text-slate-600 dark:text-slate-300">
                    Total Solutions
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  전체 솔루션 보기
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  30+ 전문 서비스 확인
                </p>
              </div>
            </Link>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            최고 자산가를 위한 차별화된 패밀리오피스 서비스를 경험해보세요
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
