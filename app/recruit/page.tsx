'use client';

import {
  TrendingUp,
  Award,
  Globe,
  Mail,
  MapPin,
  Clock,
  Building,
  Heart,
  Lightbulb,
  ArrowRight,
  Briefcase,
  Users,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

// 클라이언트 컴포넌트에서는 서버 전용 설정 제거

export default function RecruitPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 500ms 지연 후 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  const positions = [
    {
      title: '자산관리 어드바이저',
      department: '자산관리팀',
      type: '위촉직',
      experience: '경력 3년 이상',
      location: '서울 강남',
      description: '고액자산가 대상 종합자산관리 서비스 제공',
      requirements: [
        '금융 관련 학과 졸업 또는 동등한 경력',
        '자산관리 관련 경력 3년 이상',
        '금융투자분석사, CFP 등 관련 자격증 우대',
        '영어 회화 가능자 우대',
      ],
    },
    {
      title: '세무 컨설턴트',
      department: '세무팀',
      type: '위촉직',
      experience: '경력 5년 이상',
      location: '서울 강남',
      description: '기업 및 개인 세무 컨설팅 업무',
      requirements: [
        '세무사 자격증 보유 필수',
        '세무 컨설팅 경력 5년 이상',
        '기업세무 및 개인세무 경험',
        '국제세무 경험자 우대',
      ],
    },
    {
      title: '부동산 투자 매니저',
      department: '투자팀',
      type: '위촉직',
      experience: '경력 3년 이상',
      location: '서울 강남',
      description: '부동산 투자 상품 개발 및 관리',
      requirements: [
        '부동산 관련 학과 졸업 또는 동등한 경력',
        '부동산 투자 경력 3년 이상',
        '공인중개사 자격증 우대',
        '데이터 분석 능력 필수',
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: '경쟁력 있는 연봉',
      description: '업계 최고 수준의 보상 체계',
    },
    {
      icon: Award,
      title: '성과 인센티브',
      description: '개인 및 팀 성과에 따른 추가 보상',
    },
    {
      icon: Globe,
      title: '글로벌 네트워크',
      description: '해외 파트너사와의 협업 기회',
    },
    {
      icon: Lightbulb,
      title: '전문성 개발',
      description: '지속적인 교육 및 자격증 취득 지원',
    },
    {
      icon: Heart,
      title: '워라밸',
      description: '유연근무제 및 복리후생',
    },
    {
      icon: Building,
      title: '프리미엄 오피스',
      description: '강남 핵심지역 최고급 사무환경',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section - 메인 페이지와 통일성 있는 디자인 */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden pt-20">
          {/* 배경 그라데이션 효과 - 메인 페이지와 동일 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            {/* 상단 태그 */}
            <div className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="animate-fade-in bg-background/80 backdrop-blur-sm"
              >
                <Briefcase className="h-3 w-3 mr-1" />
                Career Opportunities
              </Badge>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              함께 성장할{'\n'}인재를 찾습니다
            </h1>

            {/* 서브 헤드라인 */}
            <p
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              당신의 꿈이 현실이 되는 곳
            </p>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed"
              style={{ animationDelay: '300ms' }}
            >
              글로벌 자산관리 전문가로 성장하고 싶은 분들을 기다립니다.{' '}
              <span className="playfair-display-bold">FamilyOffice S</span>에서
              당신의 커리어를 한 단계 높여보세요
            </p>

            {/* 핵심 성과 지표 - 메인 페이지와 동일한 스타일 */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter
                    end={95}
                    suffix="%"
                    startAnimation={startAnimation}
                    duration={1500}
                    easingFunction={t => 1 - Math.pow(1 - t, 3)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">직원 만족도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  <AnimatedCounter
                    end={24}
                    suffix="개월"
                    startAnimation={startAnimation}
                    duration={1800}
                    easingFunction={t => 1 - Math.pow(1 - t, 3)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  평균 교육기간
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                  <AnimatedCounter
                    end={85}
                    suffix="%"
                    startAnimation={startAnimation}
                    duration={1600}
                    easingFunction={t => 1 - Math.pow(1 - t, 3)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">내부 승진률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  <AnimatedCounter
                    end={3}
                    suffix="개"
                    startAnimation={startAnimation}
                    duration={1200}
                    easingFunction={t => 1 - Math.pow(1 - t, 3)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  현재 채용직군
                </div>
              </div>
            </div>

            {/* CTA 버튼 - 메인 페이지와 동일한 스타일 */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
              style={{ animationDelay: '500ms' }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg"
                onClick={() => {
                  const positionsSection =
                    document.getElementById('positions-section');
                  if (positionsSection) {
                    positionsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                채용 포지션 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg"
                onClick={() =>
                  window.open('https://recruit.familyoffices.vip', '_blank')
                }
              >
                <Users className="mr-2 h-5 w-5" />
                잡페어 참석하기
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                <span className="text-primary dark:text-emerald-300 playfair-display-bold">
                  FamilyOffice S
                </span>
                와 함께하는 이유
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-200">
                최고의 환경에서 전문성을 키우고 성장할 수 있는 기회를 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors">
                        <Icon className="h-8 w-8 text-primary dark:text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-200">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Positions Section */}
        <section
          id="positions-section"
          className="py-20 bg-muted/20 dark:bg-gray-900/50"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                <span className="text-primary dark:text-emerald-300">채용</span>{' '}
                포지션
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-200">
                현재 모집 중인 포지션을 확인하고 지원해보세요
              </p>
            </div>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 text-foreground dark:text-white">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          >
                            <Building className="h-3 w-3 mr-1" />
                            {position.department}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="dark:bg-primary/80 dark:text-white dark:border-primary/60"
                          >
                            {position.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {position.experience}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            {position.location}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        className="mt-4 md:mt-0 dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
                        onClick={() =>
                          window.open(
                            'https://cal.com/familyoffice/recruit',
                            '_blank'
                          )
                        }
                      >
                        지원하기
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 dark:text-gray-200">
                      {position.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground dark:text-white">
                        지원 자격
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground dark:text-gray-200">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              지원 문의
            </h2>
            <p className="text-lg text-muted-foreground mb-8 dark:text-gray-200">
              채용 관련 문의사항이 있으시면 언제든 연락주세요
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
              >
                <a
                  href="https://cal.com/familyoffice/recruit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  무료 상담 예약
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <a href="tel:0502-5550-8700">전화 문의: 0502-5550-8700</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
