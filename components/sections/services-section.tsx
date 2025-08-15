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

// SuperClaude Designer 40+ UX 최적화
import {
  typography40Plus,
  touchTargets40Plus,
  spacing40Plus,
  colorSystem40Plus,
  animations40Plus,
  layoutPatterns40Plus,
  getResponsiveText,
  getTouchFriendlyButton,
  getAccessibleCard
} from '@/lib/design-system-40plus';

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
      className={`section bg-gradient-to-b from-muted/30 to-background dark:from-gray-900 dark:to-gray-900 ${spacing40Plus.sectionGap}`}
    >
      <div className={`container ${spacing40Plus.containerPadding}`}>
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <Badge
            variant="outline"
            className={`mb-6 sm:mb-8 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60 ${getResponsiveText('sm')} ${touchTargets40Plus.optimal.padding} ${animations40Plus.focus.ring}`}
          >
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Professional Services
          </Badge>

          <h2 className={`mb-8 sm:mb-10 ${typography40Plus.fontWeights.bold} ${typography40Plus.fontSizes['3xl']} ${typography40Plus.lineHeights.tight} text-balance animate-slide-up text-gray-900 dark:text-white ${typography40Plus.letterSpacing.normal}`}>
            <span className="text-primary dark:text-emerald-300">
              8개 분야 34개
            </span>{' '}
            전문 서비스
          </h2>

          <p
            className={`${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.medium} ${typography40Plus.lineHeights.relaxed} text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up dark:text-gray-200 ${typography40Plus.letterSpacing.normal}`}
            style={{ animationDelay: '100ms' }}
          >
            기업가의 모든 고민을 해결하는 체계적이고 전문적인 서비스 포트폴리오
          </p>
        </div>

        {/* 서비스 카테고리 그리드 - 40+ 최적화 */}
        <div className={`${layoutPatterns40Plus.grid.columns.mobile} ${layoutPatterns40Plus.grid.columns.tablet} ${layoutPatterns40Plus.grid.columns.desktop} ${layoutPatterns40Plus.grid.gap} mb-16 sm:mb-20`}>
          {mainPageServices.map((service, index) => (
            <Card
              key={service.id}
              className={`group ${getAccessibleCard()} ${animations40Plus.hover.scale} ${animations40Plus.hover.shadow} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration} animate-slide-up border-border/50 hover:border-primary/30 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${animations40Plus.focus.ring}`}
              style={{ animationDelay: `${index * 100}ms` }}
              tabIndex={0}
            >
              <CardHeader className={`pb-4 ${spacing40Plus.cardPadding}`}>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-primary/10 dark:bg-primary/30 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/40 ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`}>
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary dark:text-emerald-300" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${typography40Plus.fontSizes.xs} ${touchTargets40Plus.minimum.padding} dark:bg-gray-700 dark:text-gray-200`}
                  >
                    {service.serviceCount}개 서비스
                  </Badge>
                </div>
                <CardTitle className={`${typography40Plus.fontSizes.xl} ${typography40Plus.fontWeights.semibold} ${typography40Plus.lineHeights.normal} text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-emerald-300 ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration} ${typography40Plus.letterSpacing.normal}`}>
                  {service.title}
                </CardTitle>
                <CardDescription className={`${typography40Plus.fontSizes.base} ${typography40Plus.fontWeights.normal} ${typography40Plus.lineHeights.relaxed} text-muted-foreground dark:text-gray-200 ${typography40Plus.letterSpacing.normal}`}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className={`pt-0 ${spacing40Plus.cardPadding}`}>
                <div className={`${spacing40Plus.elementGap}`}>
                  {service.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className={`flex items-center ${typography40Plus.fontSizes.sm} ${touchTargets40Plus.minimum.height}`}>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-emerald-300 mr-3 flex-shrink-0" />
                      <span className={`text-muted-foreground dark:text-gray-200 ${typography40Plus.fontWeights.medium}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  {service.keyFeatures.length > 3 && (
                    <div className={`flex items-center ${typography40Plus.fontSizes.sm} ${touchTargets40Plus.minimum.height}`}>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-emerald-300 mr-3 flex-shrink-0" />
                      <span className={`text-muted-foreground dark:text-gray-200 ${typography40Plus.fontWeights.medium}`}>
                        +{service.keyFeatures.length - 3}개 더
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 통계 섹션 - 40+ 최적화 */}
        <div className={`bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl ${spacing40Plus.cardPadding} mb-16 sm:mb-20 dark:bg-gray-800/50`}>
          <div className="text-center mb-10 sm:mb-12">
            <h3 className={`${typography40Plus.fontSizes['2xl']} ${typography40Plus.fontWeights.bold} ${typography40Plus.lineHeights.normal} mb-6 sm:mb-8 text-foreground dark:text-white ${typography40Plus.letterSpacing.normal}`}>
              <span className="text-primary dark:text-emerald-300">
                검증된 실적
              </span>
              과{' '}
              <span className="text-primary dark:text-emerald-300">전문성</span>
            </h3>
            <p className={`${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.medium} ${typography40Plus.lineHeights.relaxed} text-muted-foreground dark:text-gray-200 max-w-2xl mx-auto ${typography40Plus.letterSpacing.normal}`}>
              500억원+ 관리 실적과 20년+ 전문 경험을 바탕으로 중소중견기업
              대표님의 모든 고민을 해결합니다
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 ${spacing40Plus.buttonGap}`}>
            {[
              { value: '500억원+', label: '자산관리 실적', icon: TrendingUp },
              { value: '500+', label: '법인 고객사', icon: Building2 },
              { value: '20년+', label: '전문 경험', icon: Shield },
              { value: '98%', label: '고객 만족도', icon: Target },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${typography40Plus.fontSizes['3xl']} ${typography40Plus.fontWeights.bold} text-primary dark:text-emerald-300 mb-3 sm:mb-4`}>
                  {stat.value}
                </div>
                <div className={`${typography40Plus.fontSizes.base} ${typography40Plus.fontWeights.medium} text-muted-foreground dark:text-gray-200`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 - 40+ 터치 최적화 */}
        <div className="text-center">
          <div className={`flex flex-col sm:flex-row ${spacing40Plus.buttonGap} justify-center mb-10 sm:mb-12`}>
            <Link
              href="/services"
              className={`inline-flex items-center justify-center rounded-xl ${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.bold} ${touchTargets40Plus.primary.width} ${touchTargets40Plus.primary.height} ${touchTargets40Plus.primary.padding} bg-primary hover:bg-primary/90 text-white shadow-lg dark:bg-emerald-600 dark:hover:bg-emerald-700 ${animations40Plus.hover.scale} ${animations40Plus.focus.ring} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`}
            >
              <Search className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              서비스 자세히 보기
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center rounded-xl ${typography40Plus.fontSizes.lg} ${typography40Plus.fontWeights.bold} ${touchTargets40Plus.primary.width} ${touchTargets40Plus.primary.height} ${touchTargets40Plus.primary.padding} border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-lg dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 ${animations40Plus.hover.scale} ${animations40Plus.focus.ring} ${animations40Plus.gentle.transform} ${animations40Plus.gentle.duration}`}
            >
              무료 상담 신청
            </Link>
          </div>

          <p className={`${typography40Plus.fontSizes.base} ${typography40Plus.fontWeights.medium} ${typography40Plus.lineHeights.relaxed} text-muted-foreground dark:text-gray-300 ${typography40Plus.letterSpacing.normal}`}>
            각 서비스별 상세 내용과 혜택을 확인하시고, 맞춤형 솔루션을
            경험해보세요
          </p>
        </div>
      </div>
    </section>
  );
}
