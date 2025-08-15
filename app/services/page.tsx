'use client';

import {
  CheckCircle,
  ArrowRight,
  Building,
  TrendingUp,
  Award,
  Users,
  Phone,
  Search,
  ChevronRight,
  Briefcase,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AnimatedCounter } from '@/components/animated-counter';
import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { SERVICE_CATEGORIES } from '@/constants/services';
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

const ServicePageContent = () => {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const statsSectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filterServices = (categoryId: string) => {
    if (categoryId === 'all') return SERVICE_CATEGORIES;
    return SERVICE_CATEGORIES.filter(service => service.id === categoryId);
  };

  const filteredServices = filterServices(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <Badge variant="outline" size="lg" animation="fade">
                <Briefcase className="h-3 w-3 mr-1" />
                Premium Services
              </Badge>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
              프리미엄 자산관리{'\n'}서비스
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              당신의 성공을 다음 세대까지
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              중소중견기업 CEO와 고액자산가를 위한 맞춤형 서비스로{' '}
              <span className="font-semibold text-primary">
                가업승계부터 자산관리까지
              </span>{' '}
              토탈 솔루션을 제공합니다
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <CalComPopup
                buttonText="무료 상담 신청"
                variant="default"
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                eventType="consultation"
              />
              <Button variant="outline" size="lg" className="font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg" asChild>
                <Link href="/faq">자주 묻는 질문</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsSectionRef} className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">신뢰할 수 있는</span> 파트너
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                수치로 확인하는 전문성과 신뢰도
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  value: 500,
                  suffix: '억원+',
                  label: '자산관리 실적',
                  color: 'text-blue-600 dark:text-blue-400',
                },
                {
                  value: 98,
                  suffix: '%',
                  label: '고객 만족도',
                  color: 'text-green-600 dark:text-green-400',
                },
                {
                  value: 20,
                  suffix: '년+',
                  label: '평균 경력',
                  color: 'text-purple-600 dark:text-purple-400',
                },
                {
                  value: 500,
                  suffix: '+',
                  label: '법인 고객',
                  color: 'text-orange-600 dark:text-orange-400',
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={startAnimation}
                      duration={1500 + index * 200}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">전문</span> 서비스
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                업종별 특화된 솔루션과 맞춤형 컨설팅을 제공합니다
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="font-semibold"
                >
                  전체 서비스
                </Button>
                <Button
                  variant={selectedCategory === 'business-succession' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('business-succession')}
                  className="font-semibold"
                >
                  가업승계
                </Button>
                <Button
                  variant={selectedCategory === 'asset-management' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('asset-management')}
                  className="font-semibold"
                >
                  자산관리
                </Button>
                <Button
                  variant={selectedCategory === 'tax-accounting' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('tax-accounting')}
                  className="font-semibold"
                >
                  세무회계
                </Button>
                <Button
                  variant={selectedCategory === 'investment-finance' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('investment-finance')}
                  className="font-semibold"
                >
                  투자금융
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.flatMap((category) =>
                category.services.map((service, serviceIndex) => (
                  <div
                    key={`${category.id}-${serviceIndex}`}
                    className="group relative bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                    style={{
                      animationDelay: `${serviceIndex * 100}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" size="xs">
                        {category.title}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <CalComPopup
                      buttonText="상담 신청"
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      eventType="consultation"
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          상담 신청
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              프리미엄 자산관리 상담
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              당신의 성공적인 미래를 위한 맞춤 솔루션을 함께 설계해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 상담 신청"
                variant="default"
                size="lg"
                eventType="consultation"
                trigger={
                  <Button size="lg">
                    무료 상담 신청
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="http://pf.kakao.com/_gsxkxdG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오톡 상담하기
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default function ServicePage() {
  const structuredData = generateStructuredData('Service');
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://familyoffices.vip',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '서비스',
        item: 'https://familyoffices.vip/services',
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <ServicePageContent />
    </>
  );
}