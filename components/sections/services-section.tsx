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
      className="section bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
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
        </div>

        {/* 서비스 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {mainPageServices.map((service, index) => (
            <Link
              key={service.id}
              href={`/solutions#${service.id}`}
              className="block group"
            >
              <Card
                className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md animate-slide-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                      <service.icon className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
                    >
                      {service.serviceCount}개 서비스
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2 line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative pt-0">
                  <div className="space-y-2.5 mb-6">
                    {service.keyFeatures.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2.5 flex-shrink-0 group-hover:bg-blue-500 transition-colors duration-300"></div>
                        <span className="group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {service.keyFeatures.length > 3 && (
                      <div className="flex items-center text-sm text-slate-400 dark:text-slate-500 pl-4">
                        +{service.keyFeatures.length - 3}개 더보기
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    자세히 보기 <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 통계 섹션 */}
        <div className="relative rounded-3xl p-10 mb-20 overflow-hidden bg-slate-900 dark:bg-slate-950 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-300">Family Office</span>의 탁월한 성과
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
              최고 자산가들이 신뢰하는 패밀리오피스의 검증된 실적과 <span className="font-bold text-white">차별화된 전문성</span>
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10조+', label: '관리 자산 규모', icon: TrendingUp, color: 'text-blue-400' },
              { value: '100+', label: 'VIP 패밀리 고객', icon: Building2, color: 'text-purple-400' },
              { value: '20년+', label: 'Family Office 경험', icon: Shield, color: 'text-green-400' },
              { value: '98%', label: '고객 만족도', icon: Target, color: 'text-yellow-400' },
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