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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold mb-6">
                <Shield className="w-4 h-4 mr-1" />
                기업 리스크 통합 관리
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                CEO를 위한
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  종합 리스크 관리 솔루션
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-200">
                경영자 개인부터 기업 전체까지
                <br />
                <strong>60명의 전문가</strong>가 함께하는 통합 리스크 관리
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <CalComPopup
                  trigger={
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold">
                      <Shield className="mr-2 h-5 w-5" />
                      무료 리스크 진단
                    </Button>
                  }
                  calLink="familyoffices/risk-assessment"
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg"
                  onClick={() => {
                    document.getElementById('risk-categories')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  리스크 카테고리 보기
                </Button>
              </div>

              {/* 핵심 지표 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400 mb-1">500억+</div>
                  <p className="text-sm text-slate-300">누적 관리자산</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400 mb-1">60명</div>
                  <p className="text-sm text-slate-300">전문가 네트워크</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-1">300+</div>
                  <p className="text-sm text-slate-300">기업 고객</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-400 mb-1">95%</div>
                  <p className="text-sm text-slate-300">고객 만족도</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 리스크 카테고리 */}
        <section id="risk-categories" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                6대 핵심 <span className="text-blue-600">리스크 관리 영역</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                기업 경영에 필수적인 모든 리스크를 체계적으로 관리합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riskCategories.map((category, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`}></div>
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2 mb-6">
                      {category.solutions.map((solution, sIndex) => (
                        <div key={sIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {solution}
                        </div>
                      ))}
                    </div>
                    <Link href={category.link}>
                      <Button variant="outline" className="w-full group-hover:bg-blue-50">
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 업종별 시나리오 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                업종별 <span className="text-blue-600">맞춤 솔루션</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{currentScenario.title}</h3>
                        <p className="text-gray-600 mt-1">{currentScenario.company}</p>
                      </div>
                      <Briefcase className="w-12 h-12 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* 도전과제 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                        주요 리스크 요인
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentScenario.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 솔루션 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="w-5 h-5 text-green-500 mr-2" />
                        통합 리스크 관리 솔루션
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-4">핵심 대응 전략</h5>
                          <div className="space-y-4">
                            {currentScenario.solutions.primary.map((solution, index) => (
                              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                                <h6 className="font-semibold text-blue-900 mb-2">{solution.title}</h6>
                                <ul className="space-y-1">
                                  {solution.items.map((item, iIndex) => (
                                    <li key={iIndex} className="text-sm text-blue-700 flex items-center">
                                      <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-4">보완 전략</h5>
                          <div className="space-y-4">
                            {currentScenario.solutions.secondary.map((solution, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <h6 className="font-semibold text-gray-800 mb-2">{solution.title}</h6>
                                <ul className="space-y-1">
                                  {solution.items.map((item, iIndex) => (
                                    <li key={iIndex} className="text-sm text-gray-600 flex items-center">
                                      <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0" />
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
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-2 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        기대 효과
                      </h4>
                      <p className="text-green-800">{currentScenario.expectedResult}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 전문가 네트워크 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                60명의 <span className="text-blue-600">전문가 네트워크</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                각 분야 최고의 전문가들이 통합 솔루션을 제공합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {expertNetwork.map((expert, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="py-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{expert.count}명</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{expert.category}</h3>
                    <p className="text-sm text-gray-600 mb-3">{expert.credentials}</p>
                    <div className="space-y-1">
                      {expert.specialties.map((specialty, sIndex) => (
                        <Badge key={sIndex} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Big4 회계법인, 대형 로펌, 글로벌 컨설팅사 출신 전문가들이
                <br />
                고객사의 모든 리스크 관리를 위해 협업합니다
              </p>
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                체계적인 <span className="text-blue-600">리스크 관리 프로세스</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                4단계 프로세스를 통해 완벽한 리스크 관리 체계를 구축합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full">
                      <ChevronRight className="w-8 h-8 text-gray-300 -ml-4" />
                    </div>
                  )}
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.activities.map((activity, aIndex) => (
                          <li key={aIndex} className="text-sm text-gray-700 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              기업의 모든 리스크, <span className="text-blue-300">한 곳에서 관리하세요</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              60명의 전문가가 귀사의 리스크를 진단하고
              <br />
              최적의 통합 솔루션을 제공합니다
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl font-bold mb-4">무료 리스크 진단 혜택</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <Award className="w-8 h-8 text-blue-300 mb-2" />
                  <h4 className="font-semibold mb-1">종합 진단 보고서</h4>
                  <p className="text-sm text-blue-200">6대 리스크 영역 완전 분석</p>
                </div>
                <div>
                  <Calculator className="w-8 h-8 text-blue-300 mb-2" />
                  <h4 className="font-semibold mb-1">비용 절감 분석</h4>
                  <p className="text-sm text-blue-200">예상 절세액 및 비용 절감액 산출</p>
                </div>
                <div>
                  <Brain className="w-8 h-8 text-blue-300 mb-2" />
                  <h4 className="font-semibold mb-1">맞춤 전략 제안</h4>
                  <p className="text-sm text-blue-200">업종별 최적화 솔루션 설계</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 진단 신청하기
                  </Button>
                }
                calLink="familyoffices/risk-assessment"
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                onClick={() => window.open('tel:0502-5550-8700')}
              >
                <Phone className="mr-2 h-5 w-5" />
                0502-5550-8700
              </Button>
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