'use client';

import {
  Building2,
  CheckCircle,
  TrendingUp,
  Shield,
  Calculator,
  Users,
  Gavel,
  Target,
  ArrowRight,
  Search,
  Briefcase,
} from 'lucide-react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// 메인 페이지용 서비스 카테고리 요약
const mainPageServices = [
  {
    id: 'corporate-governance',
    icon: Gavel,
    title: '법인 지배구조 & 컨설팅',
    description: '정관 설계부터 임원 운영까지 법인 경영의 모든 영역',
    serviceCount: 4,
    keyFeatures: [
      '정관 및 배당 컨설팅',
      'CEO유고시 리스크 관리',
      '임원소득보장플랜',
      '법인 운영 컨설팅',
    ],
  },
  {
    id: 'hr-support',
    icon: Users,
    title: '인사 & 고용지원',
    description: '인재 확보부터 복지까지 기업의 인사 전략',
    serviceCount: 4,
    keyFeatures: [
      '고용지원금 컨설팅',
      '노무관리 컨설팅',
      '사내근로복지기금',
      '인사제도 설계',
    ],
  },
  {
    id: 'tax-accounting',
    icon: Calculator,
    title: '세무 & 회계',
    description: '세무 최적화부터 회계 시스템까지 전문 서비스',
    serviceCount: 4,
    keyFeatures: [
      '세무조정계산서',
      '법인세 최적화',
      '개인세 최적화',
      '세무 리스크 관리',
    ],
  },
  {
    id: 'investment-finance',
    icon: TrendingUp,
    title: '투자 & 금융',
    description: '기업 성장을 위한 투자 전략과 금융 솔루션',
    serviceCount: 4,
    keyFeatures: [
      '투자 포트폴리오 관리',
      '정책자금 활용',
      '자금조달 최적화',
      '리스크 헤지',
    ],
  },
  {
    id: 'asset-management',
    icon: Building2,
    title: '자산관리 & 보험',
    description: '기업 자산의 효율적 관리와 보험 설계',
    serviceCount: 4,
    keyFeatures: [
      '자산 구조 최적화',
      '보험 설계',
      '자산 분산 전략',
      '리스크 관리',
    ],
  },
  {
    id: 'business-succession',
    icon: Target,
    title: '가업승계 & M&A',
    description: '기업 가치를 다음 세대로 전달하는 전문 서비스',
    serviceCount: 4,
    keyFeatures: [
      '승계 전략 수립',
      'M&A Advisory',
      '지배구조 최적화',
      '세대 간 갈등 해결',
    ],
  },
  {
    id: 'corporate-structure',
    icon: Shield,
    title: '법인구조 & 설립',
    description: '효율적인 법인 구조 설계와 설립 지원',
    serviceCount: 4,
    keyFeatures: [
      '가족법인 설립',
      '자녀법인 설립',
      'MSO 구조화',
      '법인 구조 재편',
    ],
  },
  {
    id: 'analysis-planning',
    icon: Search,
    title: '분석 & 전략수립',
    description: '데이터 기반의 전략적 의사결정 지원',
    serviceCount: 6,
    keyFeatures: ['기업가치 평가', '전략 수립', '리스크 분석', '성과 측정'],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section bg-gradient-to-b from-muted/30 to-background dark:from-gray-900 dark:to-gray-900"
    >
      <div className="container">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60"
          >
            <Briefcase className="h-3 w-3 mr-1" />
            Professional Services
          </Badge>

          <h2 className="mb-6 font-bold text-balance animate-slide-up text-foreground">
            <span className="text-primary dark:text-emerald-300">
              8개 분야 34개
            </span>{' '}
            전문 서비스
          </h2>

          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up leading-relaxed"
            style={{ animationDelay: '100ms' }}
          >
            기업가의 모든 고민을 해결하는 체계적이고 전문적인 서비스 포트폴리오
          </p>
        </div>

        {/* 서비스 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainPageServices.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slide-up border-border/50 hover:border-primary/30 bg-card text-card-foreground"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/30 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors">
                    <service.icon className="h-5 w-5 text-primary dark:text-emerald-300" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {service.serviceCount}개 서비스
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {service.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-primary dark:text-emerald-300 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {service.keyFeatures.length > 3 && (
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-primary dark:text-emerald-300 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        +{service.keyFeatures.length - 3}개 더
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 통계 섹션 */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
              <span className="text-primary dark:text-emerald-300">
                검증된 실적
              </span>
              과{' '}
              <span className="text-primary dark:text-emerald-300">전문성</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              500억원+ 관리 실적과 20년+ 전문 경험을 바탕으로 중소중견기업
              대표님의 모든 고민을 해결합니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500억원+', label: '자산관리 실적', icon: TrendingUp },
              { value: '500+', label: '법인 고객사', icon: Building2 },
              { value: '20년+', label: '전문 경험', icon: Shield },
              { value: '98%', label: '고객 만족도', icon: Target },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary dark:text-emerald-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
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
              href="/solutions"
              className="inline-flex items-center justify-center rounded-xl text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background transition-colors focus-visible:ring-offset-2 h-12 px-8 py-4 bg-primary hover:bg-primary/90 text-white shadow-lg dark:bg-emerald-600 dark:hover:bg-emerald-700"
            >
              <Search className="mr-2 h-5 w-5" />
              솔루션 자세히 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background transition-colors focus-visible:ring-offset-2 h-12 px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg"
            >
              무료 상담 신청
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            각 서비스별 상세 내용과 혜택을 확인하시고, 맞춤형 솔루션을
            경험해보세요
          </p>
        </div>
      </div>
    </section>
  );
}