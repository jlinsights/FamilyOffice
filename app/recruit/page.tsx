'use client';

import {
  TrendingUp,
  Award,
  Mail,
  MapPin,
  Clock,
  Building,
  Heart,
  Briefcase,
  Users,
  CheckCircle,
  Star,
  Phone,
  GraduationCap,
  Play,
  Headphones,
  ExternalLink,
} from 'lucide-react';

import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalComPopup } from '@/components/cal-com-popup';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { YouTubeEmbed } from '@/components/media/youtube-embed';

// 클라이언트 컴포넌트에서는 서버 전용 설정 제거

export default function RecruitPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  // easing 함수를 메모이제이션
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 500ms 지연 후 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  const positions = [
    {
      title: '기업재무컨설턴트(GFC) - 가업승계 전문가',
      department: '삼성생명GFC',
      type: '위촉직',
      experience: '경력 5년 이상',
      location: '서울',
      description: '가족기업의 체계적인 가업승계 설계 및 실행 지원',
      requirements: [
        '금융/경영 관련 학과 졸업 또는 동등한 경력',
        '기업재무 또는 가업승계 컨설팅 경력 5년 이상',
        'CFP, 세무사, 변호사 등 전문 자격증 우대',
        '가족기업 및 상속/증여 관련 업무 경험 필수',
      ],
    },
    {
      title: '기업재무컨설턴트(GFC) - 자산관리 전문가',
      department: '삼성생명GFC',
      type: '위촉직',
      experience: '경력 3년 이상',
      location: '서울',
      description: '고액자산가 및 기업의 종합자산관리 서비스 제공',
      requirements: [
        '금융 관련 학과 졸업 또는 동등한 경력',
        '자산관리 또는 기업재무 경력 3년 이상',
        '금융투자분석사, CFP, CFA 등 관련 자격증 우대',
        '법인 자산관리 및 포트폴리오 운용 경험',
      ],
    },
    {
      title: '기업재무컨설턴트(GFC) - 세무회계 전문가',
      department: '삼성생명GFC',
      type: '위촉직',
      experience: '경력 5년 이상',
      location: '서울',
      description: '기업 세무전략 수립 및 절세 컨설팅 업무',
      requirements: [
        '세무사 자격증 보유 필수',
        '기업세무 컨설팅 경력 5년 이상',
        '법인세무 및 상속증여세 전문 경험',
        '국제세무 및 기업구조조정 경험자 우대',
      ],
    },
    {
      title: '기업재무컨설턴트(GFC) - 투자금융 전문가',
      department: '삼성생명GFC',
      type: '위촉직',
      experience: '경력 3년 이상',
      location: '서울',
      description: '기업 자금조달 및 투자금융 전문 컨설팅 서비스',
      requirements: [
        '투자은행 또는 금융 관련 학과 졸업',
        '투자금융 또는 기업금융 경력 3년 이상',
        'IB, 기업금융, M&A 관련 업무 경험',
        'CFA, FRM 등 투자 관련 자격증 우대',
      ],
    },
  ];

  // GFC 핵심 혜택 (중복 제거를 위해 통합)
  const gfcBenefits = [
    {
      icon: Building,
      title: '기업 전문',
      description: '중소중견기업 CEO 맞춤형 컨설팅',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: '높은 수입',
      description: '프리미엄 고객 대상 고수익 보장',
      color: 'green'
    },
    {
      icon: Award,
      title: '전문 브랜드',
      description: '삼성생명의 신뢰와 명성',
      color: 'yellow'
    },
    {
      icon: GraduationCap,
      title: '체계적 교육',
      description: '전문가 양성 교육 시스템',
      color: 'purple'
    },
    {
      icon: Users,
      title: '전문가 네트워크',
      description: '삼성생명 FP 및 전국 GFC 협업',
      color: 'indigo'
    },
    {
      icon: Heart,
      title: '워라밸 보장',
      description: '유연근무제 및 복리후생 혜택',
      color: 'pink'
    }
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
              삼성생명 GFC{'\n'}채용
            </h1>

            {/* 서브 헤드라인 */}
            <p
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              기업재무컨설턴트로 성공의 기회를 잡으세요
            </p>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed whitespace-pre-line"
              style={{ animationDelay: '300ms' }}
            >
              가업승계·패밀리오피스 전문가가 되는 길{'\n'}
              삼성생명의 신뢰와 함께 높은 수입과 전문성을 겸비하세요
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
                    easingFunction={easingFunction}
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
                    easingFunction={easingFunction}
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
                    easingFunction={easingFunction}
                  />
                </div>
                <div className="text-sm text-muted-foreground">내부 승진률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  <AnimatedCounter
                    end={4}
                    suffix="개"
                    startAnimation={startAnimation}
                    duration={1200}
                    easingFunction={easingFunction}
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
              <CalComPopup
                buttonText="GFC 채용 상담 신청"
                variant="default"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg"
              />
              <Button
                variant="outline"
                size="lg"
                className="font-bold shadow-lg px-8 py-4 text-lg"
                asChild
              >
                <a href="tel:0502-5550-8700">
                  <Phone className="mr-2 h-5 w-5" />
                  ☎ 0502-5550-8700
                </a>
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

        {/* GFC 소개 & 혜택 통합 섹션 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Briefcase className="h-3 w-3 mr-1" />
                Group Financial Consultant
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                GFC(기업재무컨설턴트)란?
              </h2>
              <p className="text-lg text-muted-foreground">
                삼성생명의 프리미엄 기업재무컨설턴트로서<br />
                중소중견기업 CEO들에게 가업승계, 자산관리, 절세전략 등<br />
                종합적인 재무컨설팅을 제공하는 전문가입니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gfcBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const colorClassesMap = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  yellow: 'bg-yellow-100 text-yellow-600',
                  purple: 'bg-purple-100 text-purple-600',
                  indigo: 'bg-indigo-100 text-indigo-600',
                  pink: 'bg-pink-100 text-pink-600'
                };
                const colorClasses = colorClassesMap[benefit.color as keyof typeof colorClassesMap] || 'bg-primary/10 text-primary';
                
                return (
                  <div 
                    key={index} 
                    className="text-center group cursor-pointer"
                    onClick={() => {
                      window.open(
                        'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/20250123%20GFC%20%E1%84%87%E1%85%B3%E1%84%85%E1%85%A9%E1%84%89%E1%85%A7.pdf',
                        '_blank'
                      );
                    }}
                  >
                    <div className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 성공으로 이끄는 이름: 삼성생명 GFC */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-6 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Success Stories
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  성공으로 이끄는 이름:
                  <br />
                  <span className="text-foreground">삼성생명 GFC</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  삼성생명 GFC의 성공 스토리와 전문성을 영상과 팟캐스트를 통해 확인해보세요.
                  <br />
                  실제 성공 사례와 전문가들의 인사이트를 만나볼 수 있습니다.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* YouTube Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl">
                      <Play className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">영상으로 보는 GFC</h3>
                      <p className="text-muted-foreground">삼성생명 GFC의 성공 스토리</p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative">
                      <YouTubeEmbed
                        videoId="YK1IRyUrxtk"
                        title="삼성생명 GFC 성공 스토리"
                        className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
                      />
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border/50">
                    <h4 className="font-semibold text-foreground mb-3">
                      🎯 주요 내용
                    </h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• 삼성생명 GFC로 성공한 실제 사례</li>
                      <li>• 전문 컨설턴트로서의 성장 과정</li>
                      <li>• 고객과 함께 만들어가는 성공 스토리</li>
                      <li>• GFC 전문성과 차별화된 서비스</li>
                    </ul>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">성공사례</Badge>
                        <Badge variant="secondary" className="text-xs">전문성</Badge>
                        <Badge variant="secondary" className="text-xs">고객만족</Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      >
                        <a 
                          href="https://youtu.be/YK1IRyUrxtk" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          YouTube에서 보기
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Spotify Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl">
                      <Headphones className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">팟캐스트로 듣는 GFC</h3>
                      <p className="text-muted-foreground">전문가 인터뷰 & 인사이트</p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl">
                      <div className="p-4">
                        <iframe 
                          data-testid="embed-iframe" 
                          style={{borderRadius: '12px'}} 
                          src="https://open.spotify.com/embed/episode/1ZUHuWpjQRdbwcPaZhqe5W?utm_source=generator" 
                          width="100%" 
                          height="152" 
                          frameBorder="0" 
                          allowFullScreen 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border/50">
                    <h4 className="font-semibold text-foreground mb-3">
                      🎙️ 에피소드 하이라이트
                    </h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• 삼성생명 GFC만의 차별화된 전문성</li>
                      <li>• 성공적인 컨설턴트의 커리어 노하우</li>
                      <li>• 클라이언트와의 신뢰 구축 방법</li>
                      <li>• 지속 가능한 성장 전략과 비전</li>
                    </ul>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">전문가인터뷰</Badge>
                        <Badge variant="secondary" className="text-xs">커리어노하우</Badge>
                        <Badge variant="secondary" className="text-xs">성장전략</Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                      >
                        <a 
                          href="https://open.spotify.com/episode/1ZUHuWpjQRdbwcPaZhqe5W?si=MHKRpQslQiWy-glvVDOsCw" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1"
                        >
                          Spotify에서 듣기
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 text-center">
                <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    삼성생명 GFC와 함께 성공하세요
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    영상과 팟캐스트에서 확인한 성공 스토리의 주인공이 되어보세요.
                    <br />
                    전문성과 열정으로 무장한 당신을 기다리고 있습니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      buttonText="GFC 커리어 상담 신청"
                      variant="default"
                      size="lg"
                      className="hover:scale-105 transition-transform duration-200"
                    />
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="hover:scale-105 transition-transform duration-200"
                      onClick={() => {
                        window.open(
                          'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/20250123%20GFC%20%E1%84%87%E1%85%B3%E1%84%85%E1%85%A9%E1%84%89%E1%85%A7.pdf',
                          '_blank'
                        );
                      }}
                    >
                      GFC 브로셔 다운로드
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 채용 조건 섹션 */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                GFC 자격조건 및 우대사항
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    기본 자격조건
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 4년제 대졸 이상</li>
                    <li>• 금융/경영/회계 관련 전공 우대</li>
                    <li>• 기본적인 PC 활용 능력</li>
                    <li>• 원활한 의사소통 능력</li>
                    <li>• 성실하고 책임감 있는 성격</li>
                  </ul>
                </div>
                
                <div className="bg-background rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    우대사항
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 금융업계 경험자</li>
                    <li>• 보험/증권/은행 근무 경력</li>
                    <li>• 자산관리/재무설계 경험</li>
                    <li>• 영업/컨설팅 경험</li>
                    <li>• 관련 자격증 보유자</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 채용 프로세스 */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              채용 프로세스
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              간단하고 신속한 채용 프로세스로 여러분의 커리어를 시작하세요
            </p>
            
            <div className="max-w-7xl mx-auto">
              {/* Desktop View - Horizontal Cards */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
                {/* Step 1 */}
                <div className="relative group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          1
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">지원서 접수</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        온라인 지원서 작성 및 제출. 경력사항과 자기소개서 작성
                      </p>
                    </CardContent>
                  </Card>
                  {/* Arrow for desktop */}
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-primary/30 border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          2
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">서류 심사</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        지원서류 검토 및 기본 자격요건 확인 (3-5일 소요)
                      </p>
                    </CardContent>
                  </Card>
                  {/* Arrow for desktop */}
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-blue-500/30 border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          3
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">면접 진행</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        1차 실무진 면접, 2차 임원 면접 (개별 일정 조율)
                      </p>
                    </CardContent>
                  </Card>
                  {/* Arrow for desktop */}
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-purple-500/30 border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
                          4
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">최종 선발</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        위촉계약 체결 및 교육 과정 안내
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Mobile View - Vertical Cards */}
              <div className="lg:hidden space-y-4">
                {[
                  {
                    number: 1,
                    title: "지원서 접수",
                    description: "온라인 지원서 작성 및 제출. 경력사항과 자기소개서 작성",
                    color: "from-primary to-primary/80"
                  },
                  {
                    number: 2,
                    title: "서류 심사",
                    description: "지원서류 검토 및 기본 자격요건 확인 (3-5일 소요)",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    number: 3,
                    title: "면접 진행",
                    description: "1차 실무진 면접, 2차 임원 면접 (개별 일정 조율)",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    number: 4,
                    title: "최종 선발",
                    description: "위촉계약 체결 및 교육 과정 안내",
                    color: "from-green-500 to-green-600",
                    isLast: true
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <Card className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${step.isLast ? 'animate-pulse' : ''}`}>
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Mobile connector line */}
                    {!step.isLast && (
                      <div className="flex justify-center py-2">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground/50 to-muted-foreground/20"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
                <span className="text-primary dark:text-emerald-300">삼성생명GFC</span>{' '}
                채용 포지션
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-200">
                가업승계, 자산관리, 세무회계, 투자금융 전문가로 함께할 기업재무컨설턴트를 모집합니다
              </p>
            </div>

            {/* 2x1 Grid Layout: Luma Calendar + Job Positions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Grid: Recruitment Calendar & Consultation */}
              <Card className="h-fit dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-center text-foreground dark:text-white">
                    🚀 채용 프로그램 & 개별 상담
                  </CardTitle>
                  <p className="text-sm text-center text-muted-foreground dark:text-gray-300 mt-2">
                    잡페어 참석 및 개별 인터뷰 상담을 예약하세요
                  </p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Job Fair Calendar */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground dark:text-white flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      잡페어 일정
                    </h3>
                    <div className="w-full flex justify-center">
                      <iframe
                        src="https://lu.ma/embed/calendar/cal-u8wu7qsSnM6rstO/events"
                        width="100%"
                        height="400"
                        className="w-full max-w-full"
                        style={{
                          border: '1px solid #bfcbda88',
                          borderRadius: '8px',
                          minHeight: '400px'
                        }}
                        frameBorder="0"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex={0}
                        title="FamilyOffice 잡페어 일정"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-300 mt-2 text-center">
                      📍 위 캘린더에서 잡페어 일정을 확인하고 참석 신청하실 수 있습니다
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
                    <div className="px-4 text-sm text-muted-foreground dark:text-gray-400">또는</div>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
                  </div>

                  {/* Individual Consultation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground dark:text-white flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      개별 인터뷰 상담
                    </h3>
                    <div 
                      style={{width:'100%', height:'500px', overflow:'scroll'}} 
                      id="my-cal-inline-recruit"
                      className="border border-gray-200 dark:border-gray-600 rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground dark:text-gray-300 mt-2 text-center">
                      💼 구직자 개별 상담 및 인터뷰 일정을 직접 예약하실 수 있습니다
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Right Grid: Job Positions */}
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
                
                {/* Samsung Life GFC Card */}
                <Card className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 text-foreground dark:text-white">
                          법인컨설팅 동반자, 삼성생명GFC
                        </CardTitle>
                        <p className="text-muted-foreground dark:text-gray-300">
                          Group Financial Consultant
                        </p>
                      </div>
                      <Button
                        className="mt-4 md:mt-0 dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
                        onClick={() =>
                          window.open(
                            'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/20250123%20GFC%20%E1%84%87%E1%85%B3%E1%84%85%E1%85%A9%E1%84%89%E1%85%A7.pdf',
                            '_blank'
                          )
                        }
                      >
                        열어보기
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 통합 CTA & Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            {/* 강력한 CTA */}
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                삼성생명 GFC로 성공하세요
              </h2>
              <p className="text-xl mb-8 opacity-90">
                전문적인 기업재무컨설턴트로서<br />
                높은 수입과 안정적인 커리어를 만들어가세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  buttonText="GFC 채용 상담 예약"
                  variant="secondary"
                  size="lg"
                />
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20" asChild>
                  <a href="tel:0502-5550-8700">
                    <Phone className="mr-2 h-4 w-4" />
                    ☎ 0502-5550-8700
                  </a>
                </Button>
              </div>
            </div>

            {/* 추가 지원 옵션 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                다양한 지원 방법
              </h3>
              <p className="text-muted-foreground mb-6 dark:text-gray-200">
                가장 편리한 방법으로 지원하고 상담받으세요
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold shadow-lg"
                  onClick={() =>
                    window.open('https://recruit.familyoffices.vip', '_blank')
                  }
                >
                  <Users className="mr-2 h-5 w-5" />
                  잡페어 참석하기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold shadow-lg"
                  asChild
                >
                  <a href="mailto:recruit@familyoffices.vip">
                    <Mail className="mr-2 h-5 w-5" />
                    이메일 문의
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cal.com Script for Individual Consultation */}
      <Script
        id="cal-embed-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) { 
              let p = function (a, ar) { a.q.push(ar); }; 
              let d = C.document; 
              C.Cal = C.Cal || function () { 
                let cal = C.Cal; 
                let ar = arguments; 
                if (!cal.loaded) { 
                  cal.ns = {}; 
                  cal.q = cal.q || []; 
                  d.head.appendChild(d.createElement("script")).src = A; 
                  cal.loaded = true; 
                } 
                if (ar[0] === L) { 
                  const api = function () { p(api, arguments); }; 
                  const namespace = ar[1]; 
                  api.q = api.q || []; 
                  if(typeof namespace === "string"){
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar); 
                  return;
                } 
                p(cal, ar); 
              }; 
            })(window, "https://app.cal.com/embed/embed.js", "init");
            
            Cal("init", "recruit", {origin:"https://app.cal.com"});
            
            Cal.ns.recruit("inline", {
              elementOrSelector:"#my-cal-inline-recruit",
              config: {"layout":"month_view"},
              calLink: "familyoffice/recruit",
            });
            
            Cal.ns.recruit("ui", {
              "cssVarsPerTheme": {
                "light": {"cal-brand":"#000000"},
                "dark": {"cal-brand":"#ffffff"}
              },
              "hideEventTypeDetails": false,
              "layout": "month_view"
            });
          `
        }}
      />
    </div>
  );
}
