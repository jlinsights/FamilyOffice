'use client';

import {
  ArrowRight,
  CheckCircle,
  Crown,
  Palette,
  Shield,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Benefit {
  icon: React.ReactNode;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

const VVIP_BENEFITS: Benefit[] = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    category: 'Financial Shield',
    title: 'CEO Risk Audit & Simulation',
    subtitle: '자산 보호의 완벽한 시작',
    description:
      '국세청 시스템 기반 모의 세무조사와 가업승계 출구전략(Exit Plan) 시뮬레이션을 제공합니다.',
    features: [
      '국세청 시스템 기반 모의 세무조사',
      '가업승계 및 Exit Plan 시뮬레이션',
      '최상위 법무/세무법인 제휴 정밀 진단',
      '수백만 원 상당 리포트 무상 제공',
    ],
  },
  {
    icon: <Palette className="h-6 w-6 text-primary" />,
    category: 'Private Art & Wellness',
    title: 'The Private Retreat',
    subtitle: 'Art & Healing',
    description:
      '일반 여행사에서는 접할 수 없는 비공개 도슨트 투어와 프라이빗 힐링 여행을 경험하세요.',
    features: [
      '미술관/갤러리 휴관일 대관 Private View',
      '일본 나오시마 예술 기행',
      '스위스 청정지역 웰니스 리트릿',
      '비공개 장소 도슨트 설명 & 만찬',
    ],
  },
  {
    icon: <Crown className="h-6 w-6 text-primary" />,
    category: 'VVIP Concierge',
    title: 'Premier Concierge Service',
    subtitle: '당신의 시간을 디자인합니다',
    description:
      '해외 출장, 골프, 건강검진 등 CEO의 일상을 전담 비서처럼 케어합니다.',
    features: [
      'Airport Protocol: 자택-공항 리무진 픽업',
      'Medical Care: VIP 검진센터 우선 예약',
      'Golf & Dining: 명문 골프장 부킹',
      '특급호텔 파인 다이닝 우선 예약',
    ],
  },
];

export function VVIPBenefitsSection() {
  return (
    <section className="section bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container">
        {/* Intro Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden />
            Exclusive Membership
          </Badge>

          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            성공, 그 이상의 가치를{' '}
            <span className="text-primary">디자인합니다</span>
          </h2>

          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up leading-relaxed"
            style={{ animationDelay: '100ms' }}
          >
            성공한 CEO의 삶을 완벽하게 케어하는{' '}
            <span className="text-foreground font-semibold">
              통합 프리미엄 솔루션
            </span>
            을 경험하세요
          </p>
        </div>

        {/* Benefit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {VVIP_BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="card p-8 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {benefit.icon}
              </div>

              {/* Category Tag */}
              <Badge variant="secondary" className="mb-4">
                {benefit.category}
              </Badge>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground font-medium mb-4">
                {benefit.subtitle}
              </p>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {benefit.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {benefit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm">
                    <CheckCircle
                      className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/structure-check#request-form"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full font-semibold'
                )}
              >
                프라이빗 초청 제안서 받기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-10 md:p-14 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            {/* Exclusive Badge */}
            <Badge variant="outline" className="mb-6">
              <Crown className="h-3 w-3 mr-1" aria-hidden />
              Limited Membership
            </Badge>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              100억 CEO, <span className="text-primary">100분</span>만을 위한{' '}
              <br className="hidden sm:block" />
              한정된 멤버십입니다
            </h3>

            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              엄격한 자격 심사를 통해 선별된 분들만 함께합니다.
              <br />
              지금 프라이빗 초청 제안서를 요청하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/structure-check#request-form"
                className={cn(buttonVariants({ size: 'lg' }), 'font-bold')}
              >
                프라이빗 초청 제안서 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="http://pf.kakao.com/_gsxkxdG/chat"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'font-bold'
                )}
              >
                카카오톡 간편 문의
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
