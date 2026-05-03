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
      className="section bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] dark:from-[#0A192F] dark:via-[#1E293B] dark:to-[#0A192F] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(10,25,47,0.04)' }}></div>

      <div className="container relative z-10">
        <FadeIn direction="up" className="text-center mb-16">
          {/* Premium badge — navy + gold */}
          <div className="inline-flex items-center justify-center p-1.5 backdrop-blur-sm border rounded-full mb-6 shadow-sm" style={{ backgroundColor: 'rgba(10,25,47,0.04)', borderColor: 'rgba(212,175,55,0.25)' }}>
            <span className="px-3 py-1 text-xs font-bold rounded-full mr-2" style={{ backgroundColor: 'rgba(212,175,55,0.12)', color: '#B8860B' }}>
              Premium
            </span>
            <span className="text-sm pr-2 flex items-center" style={{ color: '#475569' }}>
              <Briefcase className="h-3 w-3 mr-1" />
              Family Office Excellence
            </span>
          </div>

          {/* Playfair Display editorial headline */}
          <h2 className="font-playfair font-semibold mb-6 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#0A192F' }}>
            <span className="dark:text-white inline-block">
              차별화된 패밀리오피스 전용 솔루션
            </span>
          </h2>

          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light font-korean" style={{ color: '#475569' }}>
            법인 자산 관리 및 가업승계 전문{' '}
            <span className="font-semibold" style={{ color: '#B8860B' }}>
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

        <FadeIn direction="up" delay={0.2}>
          <div className="relative rounded-2xl p-10 mb-20 overflow-hidden text-white shadow-2xl" style={{ backgroundColor: '#0A192F' }}>
            {/* Gold ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}></div>
            {/* Top gold accent */}
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

            <div className="relative z-10 text-center mb-12">
              <h3 className="font-playfair font-semibold mb-4 text-3xl">
                <span style={{ color: '#D4AF37' }}>패밀리오피스</span>의 탁월한
                성과
              </h3>
              <p className="max-w-2xl mx-auto text-lg font-light font-korean" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
                },
                {
                  value: '500+',
                  label: '법인 고객사',
                  icon: Building2,
                },
                {
                  value: '20년+',
                  label: '전문 경험',
                  icon: Shield,
                },
                {
                  value: '98%',
                  label: '만족도',
                  icon: Target,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white tracking-tight financial-value">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
            {/* Primary CTA — Heritage Gold */}
            <Link
              href="/family-office-center"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0A192F 0%, #162C4E 100%)', border: '1px solid rgba(212,175,55,0.25)' }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown className="w-24 h-24 -mr-8 -mt-8 rotate-12" style={{ color: '#D4AF37' }} />
              </div>
              {/* Gold accent top border */}
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full mb-4 text-xs font-bold" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
                  VIP 전용
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
                  패밀리오피스 센터
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="font-medium font-korean" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  최고 자산가를 위한 전용 서비스
                </p>
              </div>
            </Link>

            {/* Secondary CTA — clean white/navy */}
            <Link
              href="/solutions"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-[#1E293B] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              style={{ border: '1px solid rgba(212,175,55,0.2)' }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Search className="w-24 h-24 -mr-8 -mt-8 -rotate-12" />
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full mb-4 text-xs font-bold" style={{ backgroundColor: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
                  Total Solutions
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 flex items-center justify-center gap-2" style={{ color: '#0A192F' }}>
                  전체 솔루션 보기
                  <ArrowRight className="w-5 h-5 transition-colors" style={{ color: '#D4AF37' }} />
                </h3>
                <p className="font-medium font-korean" style={{ color: '#64748B' }}>
                  30+ 전문 서비스 확인
                </p>
              </div>
            </Link>
          </div>

          <p className="text-sm" style={{ color: '#94A3B8' }}>
            최고 자산가를 위한 차별화된 패밀리오피스 서비스를 경험해보세요
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
