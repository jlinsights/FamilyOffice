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
  Crown,
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
            className="mb-4 animate-fade-in border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 shadow-lg backdrop-blur-sm"
          >
            <Briefcase className="h-3 w-3 mr-1" />
            Family Office Excellence
          </Badge>

          <h2 className="mb-6 font-bold text-balance animate-slide-up text-foreground font-playfair">
            <span className="text-premium-gold">
              차별화된 패밀리오피스
            </span>{' '}
            <span className="text-premium-navy">전용 솔루션</span>
          </h2>

          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-slide-up leading-relaxed"
            style={{ animationDelay: '100ms' }}
          >
            최고 자산가와 성공한 기업가를 위한 <span className="font-bold text-premium-navy">프리미엄 서비스 포트폴리오</span>로 세대를 잇는 자산관리를 실현합니다
          </p>
        </div>

        {/* 서비스 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainPageServices.map((service, index) => (
            <Link
              key={service.id}
              href={`/solutions#${service.id}`}
              className="block"
            >
              <Card
                className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up border-border/50 hover:border-primary/50 bg-card text-card-foreground cursor-pointer hover:bg-accent/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/30 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-all duration-300 group-hover:scale-110">
                      <service.icon className="h-5 w-5 text-primary dark:text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-emerald-600"
                    >
                      {service.serviceCount}개 서비스
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-emerald-300 transition-colors duration-300">
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
                        <CheckCircle className="h-3 w-3 text-primary dark:text-emerald-300 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {service.keyFeatures.length > 3 && (
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-primary dark:text-emerald-300 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          +{service.keyFeatures.length - 3}개 더
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-end text-primary dark:text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">자세히 보기</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 통계 섹션 */}
        <div className="rounded-3xl p-8 mb-12 shadow-premium bg-card text-card-foreground border border-border dark:bg-card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground font-playfair">
              <span className="text-premium-gold">
                Family Office의
              </span>{' '}
              <span className="text-premium-navy">탁월한 성과</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              최고 자산가들이 신뢰하는 패밀리오피스의 검증된 실적과 
              <span className="font-bold text-premium-navy"> 차별화된 전문성</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10조+', label: '관리 자산 규모', icon: TrendingUp, color: 'text-premium-gold' },
              { value: '100+', label: 'VIP 패밀리 고객', icon: Building2, color: 'text-premium-navy' },
              { value: '20년+', label: 'Family Office 경험', icon: Shield, color: 'text-green-600' },
              { value: '98%', label: '고객 만족도', icon: Target, color: 'text-purple-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center rounded-2xl p-4 hover-premium bg-background/40 dark:bg-background/30 border border-border">
                <div className={`text-2xl font-bold mb-1 ${stat.color} drop-shadow-sm`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
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
              className="inline-flex items-center justify-center rounded-2xl text-lg font-bold px-8 py-4 bg-premium-navy text-white hover:shadow-premium-navy transition-all duration-300 hover:scale-105"
            >
              <Crown className="mr-2 h-5 w-5" />
              패밀리오피스 센터
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-2xl text-lg font-bold px-8 py-4 border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              전체 솔루션 보기
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            최고 자산가를 위한 차별화된 패밀리오피스 서비스를 경험해보세요
          </p>
        </div>
      </div>
    </section>
  );
}