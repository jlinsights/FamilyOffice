'use client';

import {
  AlertTriangle,
  Building,
  CheckCircle,
  ChevronRight,
  FileText,
  Heart,
  Shield,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  Brain,
  Briefcase,
  Award,
  Scale,
  Calculator,
  Phone,
  Clock,
  BarChart3,
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function RiskManagementPage() {
  const [activeScenario, setActiveScenario] = useState('manufacturing');

  // 리스크 카테고리
  const riskCategories = [
    {
      icon: Heart,
      title: 'CEO 건강 리스크',
      description: '경영자 유고시 기업 연속성 보장',
      solutions: ['경영인정기보험', 'Key Person 보장', '승계 계획'],
      link: '/key-person-insurance',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Scale,
      title: '법적 리스크',
      description: '중대재해처벌법 등 법적 책임 대응',
      solutions: ['중대재해 대응', '배상책임보험', '안전관리시스템'],
      link: '/serious-accident-law',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: '재무 리스크',
      description: '세무 최적화 및 현금흐름 관리',
      solutions: ['법인종신보험', '세무 최적화', '자금 유동성'],
      link: '/corporate-life-insurance',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: '인재 리스크',
      description: '핵심인재 이탈 방지 및 보상체계',
      solutions: ['퇴직연금', '복리후생', '인센티브 설계'],
      link: '/retirement-pension',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Building,
      title: '승계 리스크',
      description: '안정적인 가업승계 및 경영권 이전',
      solutions: ['상속증여 컨설팅', '가업승계 설계', '세대간 이전'],
      link: '/inheritance-gift',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: '운영 리스크',
      description: '사업 중단 및 운영 리스크 관리',
      solutions: ['단체보험', '사업중단보험', 'BCP 구축'],
      link: '/group-insurance',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  // 업종별 시나리오
  const industryScenarios = {
    manufacturing: {
      title: '제조업 CEO',
      company: '매출 100억 규모 제조업',
      challenges: [
        '중대재해처벌법 시행으로 형사책임 리스크',
        '설비투자 자금 압박과 현금흐름 악화',
        '핵심 기술인력 이탈 우려',
        '2세 승계 준비 (상속세 30억 예상)'
      ],
      solutions: {
        primary: [
          {
            title: '중대재해 종합 대응',
            items: ['안전관리시스템 구축', '배상책임보험 설계', 'CEO 형사책임 보장']
          },
          {
            title: '재무구조 최적화',
            items: ['법인종신보험 활용', '정책자금 연계', '세무 최적화']
          }
        ],
        secondary: [
          {
            title: '인재 리스크 관리',
            items: ['핵심인재 보상체계', '퇴직연금 설계', '복리후생 강화']
          },
          {
            title: '승계 계획 수립',
            items: ['단계별 증여 전략', '가업승계 공제', '경영권 안정화']
          }
        ]
      },
      expectedResult: '리스크 완전 헤지 + 상속세 50% 절감 + 안정적 경영환경 구축'
    },
    it: {
      title: 'IT/벤처 CEO',
      company: 'Series B 투자유치 IT 스타트업',
      challenges: [
        '핵심 개발인력 이탈시 사업 중단 위험',
        'IPO 준비 과정의 복잡한 규제 대응',
        '투자자 요구사항과 경영권 보호',
        'CEO 건강 이슈시 투자가치 하락'
      ],
      solutions: {
        primary: [
          {
            title: '핵심인재 Retention',
            items: ['스톡옵션 설계', '성과 인센티브', '퇴직연금 매칭']
          },
          {
            title: 'CEO 리스크 관리',
            items: ['Key Person 보험', '경영승계 계획', '투자자 신뢰 확보']
          }
        ],
        secondary: [
          {
            title: 'IPO 준비 지원',
            items: ['내부통제 시스템', '재무구조 개선', '규제 대응']
          },
          {
            title: '기업가치 보호',
            items: ['지식재산권 보호', '영업비밀 관리', '경쟁사 대응']
          }
        ]
      },
      expectedResult: '핵심인재 이탈률 0% + 기업가치 보전 + 성공적 IPO 준비'
    },
    construction: {
      title: '건설업 CEO',
      company: '중견 종합건설사',
      challenges: [
        '프로젝트별 중대재해 리스크 상존',
        '하도급업체 관리 및 연쇄 리스크',
        '대규모 프로젝트 자금조달 어려움',
        '시공 하자 및 법적 분쟁 리스크'
      ],
      solutions: {
        primary: [
          {
            title: '중대재해 완전 대응',
            items: ['프로젝트별 안전관리', '통합 배상책임보험', '법률 자문단 구성']
          },
          {
            title: '프로젝트 리스크 관리',
            items: ['이행보증보험 최적화', '하도급 리스크 헤지', '분쟁 예방 시스템']
          }
        ],
        secondary: [
          {
            title: '재무 안정성 확보',
            items: ['프로젝트 파이낸싱', '운영자금 확보', '채권 관리']
          },
          {
            title: '사업 연속성 계획',
            items: ['핵심인력 보호', '긴급 대응체계', 'BCP 수립']
          }
        ]
      },
      expectedResult: '중대재해 Zero + 프로젝트 수익성 개선 + 안정적 사업 운영'
    }
  };

  const currentScenario = industryScenarios[activeScenario as keyof typeof industryScenarios];

  // 전문가 네트워크
  const expertNetwork = [
    {
      category: '세무 전문가',
      count: 15,
      specialties: ['법인세', '상속세', '국제조세'],
      credentials: 'Big4 출신 세무사'
    },
    {
      category: '법률 전문가',
      count: 12,
      specialties: ['기업법무', 'M&A', '중대재해'],
      credentials: '대형 로펌 출신 변호사'
    },
    {
      category: '금융 전문가',
      count: 20,
      specialties: ['자산운용', '투자은행', '보험설계'],
      credentials: 'CFA, FRM 보유'
    },
    {
      category: '노무 전문가',
      count: 8,
      specialties: ['노동법', '산업안전', '인사제도'],
      credentials: '공인노무사'
    },
    {
      category: '경영 컨설턴트',
      count: 10,
      specialties: ['전략기획', '조직설계', '성과관리'],
      credentials: 'MBB 컨설팅 출신'
    }
  ];

  // 프로세스 단계
  const processSteps = [
    {
      step: 1,
      title: '종합 진단',
      description: '기업 전반의 리스크 요인 분석',
      duration: '1주',
      activities: ['재무분석', '법적검토', '조직진단', '시장분석']
    },
    {
      step: 2,
      title: '전략 수립',
      description: '맞춤형 리스크 관리 전략 설계',
      duration: '2주',
      activities: ['우선순위 설정', '솔루션 매칭', '비용효과 분석', '실행계획']
    },
    {
      step: 3,
      title: '전문가 매칭',
      description: '분야별 전문가 팀 구성',
      duration: '1주',
      activities: ['전문가 선정', '팀 구성', '역할 분담', '일정 조율']
    },
    {
      step: 4,
      title: '실행 지원',
      description: '솔루션 실행 및 모니터링',
      duration: '지속',
      activities: ['실행 관리', '진행 점검', '이슈 대응', '성과 측정']
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <Badge variant="outline" size="lg" className="animate-fade">
                <Shield className="h-3 w-3 mr-1" />
                Risk Management
              </Badge>
            </div>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 sm:mb-8 text-primary whitespace-pre-line animate-slide-up">
              종합 리스크 관리{'\n'}솔루션
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              CEO를 위한 통합 위험 관리
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '300ms' }}>
              경영자 개인부터 기업 전체까지{' '}
              <span className="font-semibold text-primary">
                60명의 전문가
              </span>
              가 함께하는 통합 리스크 관리
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg px-8 py-4 text-lg font-semibold">
                    <Shield className="mr-2 h-5 w-5" />
                    무료 리스크 진단
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
                calLink="familyoffices/risk-assessment"
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                onClick={() => {
                  document.getElementById('risk-categories')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                리스크 카테고리 보기
              </Button>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
              {[
                {
                  value: 500,
                  suffix: '억+',
                  label: '누적 관리자산',
                  color: 'text-blue-600 dark:text-blue-400',
                },
                {
                  value: 60,
                  suffix: '명',
                  label: '전문가 네트워크',
                  color: 'text-green-600 dark:text-green-400',
                },
                {
                  value: 300,
                  suffix: '+',
                  label: '기업 고객',
                  color: 'text-purple-600 dark:text-purple-400',
                },
                {
                  value: 95,
                  suffix: '%',
                  label: '고객 만족도',
                  color: 'text-orange-600 dark:text-orange-400',
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 리스크 카테고리 */}
        <section id="risk-categories" className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg">
                  <Target className="h-3 w-3 mr-1" />
                  Risk Categories
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                6대 핵심 <span className="text-primary">리스크 관리 영역</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                기업 경영에 필수적인 모든 리스크를 체계적으로 관리합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riskCategories.map((category, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-background to-background/50 border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Premium Badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Badge variant="outline" size="xs" className="bg-white/95 dark:bg-gray-900/95 text-primary border-primary/50 shadow-lg backdrop-blur-sm">
                      전문 관리
                    </Badge>
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon and header */}
                    <div className="mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <category.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="text-right mt-3">
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${category.color} text-white`}>
                          {category.solutions.length}개 솔루션
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Solutions list */}
                      <div className="space-y-2 mb-6">
                        {category.solutions.map((solution, sIndex) => (
                          <div key={sIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {solution}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={category.link}>
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        size="sm"
                      >
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 업종별 시나리오 */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Industry Solutions
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                업종별 <span className="text-primary">맞춤 솔루션</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                각 업종의 특성에 맞는 종합적인 리스크 관리 전략을 제공합니다
              </p>
            </div>

            <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="manufacturing">제조업</TabsTrigger>
                <TabsTrigger value="it">IT/벤처</TabsTrigger>
                <TabsTrigger value="construction">건설업</TabsTrigger>
              </TabsList>

              <TabsContent value={activeScenario} className="mt-8">
                <div className="bg-gradient-to-br from-background to-background/50 border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 py-8 px-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{currentScenario.title}</h3>
                        <p className="text-muted-foreground mt-1">{currentScenario.company}</p>
                      </div>
                      <Briefcase className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="p-8">
                    {/* 도전과제 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-destructive mr-2" />
                        주요 리스크 요인
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentScenario.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-muted-foreground">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 솔루션 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-foreground mb-6 flex items-center">
                        <Target className="w-5 h-5 text-primary mr-2" />
                        통합 리스크 관리 솔루션
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-foreground mb-4">핵심 대응 전략</h5>
                          <div className="space-y-4">
                            {currentScenario.solutions.primary.map((solution, index) => (
                              <div key={index} className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg border border-primary/20">
                                <h6 className="font-semibold text-primary mb-2">{solution.title}</h6>
                                <ul className="space-y-1">
                                  {solution.items.map((item, iIndex) => (
                                    <li key={iIndex} className="text-sm text-foreground flex items-center">
                                      <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0 text-primary" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground mb-4">보완 전략</h5>
                          <div className="space-y-4">
                            {currentScenario.solutions.secondary.map((solution, index) => (
                              <div key={index} className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg border border-primary/20">
                                <h6 className="font-semibold text-primary mb-2">{solution.title}</h6>
                                <ul className="space-y-1">
                                  {solution.items.map((item, iIndex) => (
                                    <li key={iIndex} className="text-sm text-foreground flex items-center">
                                      <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0 text-primary" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 기대효과 */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-bold text-green-900 dark:text-green-300 mb-2 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        기대 효과
                      </h4>
                      <p className="text-green-800 dark:text-green-200">{currentScenario.expectedResult}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 전문가 네트워크 */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg">
                  <Users className="h-3 w-3 mr-1" />
                  Expert Network
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                60명의 <span className="text-primary">전문가 네트워크</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                각 분야 최고의 전문가들이 통합 솔루션을 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {expertNetwork.map((expert, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-background to-background/50 border border-border rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-primary mb-2">{expert.count}명</div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{expert.category}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{expert.credentials}</p>
                    <div className="space-y-1">
                      {expert.specialties.map((specialty, sIndex) => (
                        <Badge key={sIndex} variant="secondary" size="xs" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Big4 회계법인, 대형 로펌, 글로벌 컨설팅사 출신 전문가들이
                <br />
                고객사의 모든 리스크 관리를 위해 협업합니다
              </p>
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                    <Users className="mr-2 h-5 w-5" />
                    전문가 상담 예약
                  </Button>
                }
                calLink="familyoffices/expert-consultation"
              />
            </div>
          </div>
        </section>

        {/* 프로세스 */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Badge variant="outline" size="lg">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  컴설팅 프로세스
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                체계적인 <span className="text-primary">리스크 관리 프로세스</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                4단계 프로세스를 통해 완벽한 리스크 관리 체계를 구축합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                    {step.step < 10 ? `0${step.step}` : step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <Badge variant="outline" size="xs">{step.duration}</Badge>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-primary/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              기업의 모든 리스크, <span className="text-primary">한 곳에서 관리하세요</span>
            </h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              60명의 전문가가 귀사의 리스크를 진단하고
              <br />
              최적의 통합 솔루션을 제공합니다
            </p>
            
            {/* 긴급성 표시기 */}
            <div className="flex justify-center mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
                <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-2">
                  ⏰ <span className="ml-2 font-semibold">한정 무료 진단</span>
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">
                  매월 선착순 20분 한정 · 전문가 직접 진단
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 리스크 진단 (20분 한정)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
                calLink="familyoffices/risk-assessment"
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                onClick={() => window.open('tel:0502-5550-8700')}
              >
                <Phone className="mr-2 h-5 w-5" />
                카카오톡 간편 상담
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mt-6">
              💡 평균 진단 시간: 45분 | 맞춤 솔루션 제안: 100% | 추가 비용: 없음
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <Script id="risk-management-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "기업 리스크 통합 관리 서비스",
          "description": "CEO를 위한 종합 리스크 관리 솔루션. 60명의 전문가가 제공하는 통합 리스크 관리 서비스",
          "provider": {
            "@type": "Organization",
            "name": "패밀리오피스 S",
            "telephone": "+82-502-5550-8700",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "세종대로 124",
              "addressLocality": "중구",
              "addressRegion": "서울",
              "addressCountry": "KR"
            }
          },
          "areaServed": "KR",
          "serviceType": ["리스크관리", "경영컨설팅", "세무자문", "법률자문"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW",
            "description": "무료 리스크 진단"
          }
        })}
      </Script>

      <Footer />
    </>
  );
}