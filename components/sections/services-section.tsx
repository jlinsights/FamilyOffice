'use client';

import {
  CheckCircle,
  TrendingUp,
  Building2,
  Shield,
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
import { SERVICE_CATEGORIES } from '@/constants/services';

// 솔루션 페이지 데이터를 기반으로 메인 페이지용 서비스 자동 생성
function generateMainPageServices() {
  const totalServices = SERVICE_CATEGORIES.reduce((total, category) => total + category.services.length, 0);
  const totalCategories = SERVICE_CATEGORIES.length;
  
  // 주요 카테고리들을 홈페이지용으로 변환 (상위 8개 카테고리 표시)
  const mainPageServices = SERVICE_CATEGORIES.slice(0, 8).map((category) => ({
    id: category.id,
    icon: category.icon,
    title: category.title,
    description: category.description,
    serviceCount: category.services.length,
    keyFeatures: category.services.slice(0, 4).map(service => service.title)
  }));

  return { mainPageServices, totalCategories, totalServices };
}

const { mainPageServices, totalCategories, totalServices } = generateMainPageServices();

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
              {totalCategories}개 분야 {totalServices}개
            </span>{' '}
            전문 서비스
          </h2>

          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up leading-relaxed"
            style={{ animationDelay: '100ms' }}
          >
            중소중견기업 CEO를 위한 <span className="font-bold text-primary">체계화된 전문 솔루션</span>으로 맞춤형 컨설팅을 제공합니다
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