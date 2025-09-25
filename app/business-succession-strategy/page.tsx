'use client';

import {
  Users,
  Building2,
  Target,
  TrendingUp,
  Calculator,
  Shield,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Banknote,
  Lightbulb,
  ArrowRight,
  Crown,
  Briefcase,
  Clock,
  Heart,
  BookOpen,
  Phone,
  Download,
  Star,
  Award,
  Gem,
  TreePine,
  HandHeart,
  ChevronRight,
  PlayCircle,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';


// 5단계 가업승계 로드맵
const successionRoadmap = [
  {
    phase: 1,
    title: '현황 진단 및 목표 설정',
    duration: '1-3개월',
    description: '기업 현재 상황과 승계 목표를 정확히 파악',
    tasks: [
      '기업 가치 평가 및 지분 구조 분석',
      '현 경영진과 차세대 역량 진단',
      '승계 목표 및 일정 수립',
      '세무·법률 리스크 분석',
      '가족 구성원 의견 수렴'
    ],
    critical: true
  },
  {
    phase: 2,
    title: '승계 전략 수립',
    duration: '3-6개월',
    description: '개별 기업에 최적화된 승계 전략 설계',
    tasks: [
      '승계 방법론 선택 (증여/상속/매각)',
      '세무 최적화 전략 수립',
      '지분 재구성 계획',
      '경영권 이전 로드맵',
      '리스크 관리 전략'
    ],
    critical: true
  },
  {
    phase: 3,
    title: '차세대 준비 및 교육',
    duration: '6-24개월',
    description: '승계자의 역량 개발과 조직 적응',
    tasks: [
      '차세대 경영자 교육 프로그램',
      '실무 경험 및 책임 확대',
      '리더십 및 소통 능력 개발',
      '업계 네트워크 구축',
      '가족 경영 철학 전수'
    ],
    critical: false
  },
  {
    phase: 4,
    title: '승계 실행',
    duration: '6-12개월',
    description: '단계적 승계 실행과 모니터링',
    tasks: [
      '지분 이전 실행',
      '경영권 단계별 이양',
      '조직 변화 관리',
      '이해관계자 소통',
      '성과 모니터링'
    ],
    critical: true
  },
  {
    phase: 5,
    title: '사후 관리 및 안정화',
    duration: '12개월+',
    description: '승계 후 안정화와 지속적 지원',
    tasks: [
      '승계 효과 평가',
      '추가 지원 및 멘토링',
      '차차세대 승계 준비',
      '가족 거버넌스 체계 구축',
      '지속 가능 경영 체계 확립'
    ],
    critical: false
  }
];

// 승계 방법별 특징
const successionMethods = {
  gift: {
    title: '생전증여',
    icon: HandHeart,
    description: '경영자가 생존 시 주식을 무상으로 이전',
    advantages: [
      '증여세 절세 효과 (할인 평가)',
      '단계적 승계로 리스크 최소화',
      '경영권 조기 안정화',
      '상속세 부담 경감'
    ],
    considerations: [
      '증여세 현금 납부 부담',
      '증여시점 기업 가치 평가',
      '증여 후 통제권 이슈',
      '세무조사 가능성'
    ],
    suitableFor: '안정적 현금흐름 보유 기업, 장기적 승계 계획',
    taxSaving: '30-50%'
  },
  inheritance: {
    title: '상속승계',
    icon: Crown,
    description: '경영자 사망 시 상속을 통한 승계',
    advantages: [
      '상속세 납부유예 활용 가능',
      '경영권 일괄 승계',
      '가업상속공제 활용',
      '분할납부 혜택'
    ],
    considerations: [
      '높은 상속세 부담',
      '유동성 확보 어려움',
      '상속 시점 불확실성',
      '가족간 분쟁 가능성'
    ],
    suitableFor: '높은 기업 가치, 유동성 확보 방안 보유',
    taxSaving: '20-40%'
  },
  sale: {
    title: '매각승계',
    icon: TrendingUp,
    description: '주식 매각을 통한 경영권 이전',
    advantages: [
      '현금 확보 가능',
      '세무 부담 상대적 경미',
      '승계 시점 통제 가능',
      '가족간 갈등 최소화'
    ],
    considerations: [
      '경영권 상실',
      '매수자 선정의 어려움',
      '기업 문화 변화',
      '직원 고용 불안'
    ],
    suitableFor: '적절한 매수자 존재, 경영권 유지 불요',
    taxSaving: '10-30%'
  },
  mbo: {
    title: 'MBO/MBI',
    icon: Users,
    description: '경영진 또는 외부 투자자 매입',
    advantages: [
      '전문 경영체제 구축',
      '기업 가치 극대화',
      '경영진 동기부여',
      '자본 구조 최적화'
    ],
    considerations: [
      '복잡한 구조 설계',
      '높은 금융비용',
      '경영진 부담 가중',
      '실행 위험성'
    ],
    suitableFor: '전문 경영진 보유, 안정적 수익성',
    taxSaving: '15-35%'
  }
};

// 가족 거버넌스 체계
const familyGovernance = {
  charter: {
    title: '가족헌장',
    icon: FileText,
    description: '가족의 가치와 원칙을 명문화한 기본 문서',
    components: [
      '가족의 미션과 비전',
      '핵심 가치와 원칙',
      '의사결정 프로세스',
      '갈등 해결 방안',
      '차세대 교육 방침'
    ]
  },
  council: {
    title: '가족경영협의회',
    icon: Users,
    description: '가족 구성원간 소통과 의사결정 기구',
    components: [
      '정기 회의체 운영',
      '중요 안건 심의',
      '가족 구성원 교육',
      '갈등 조정 역할',
      '승계 계획 검토'
    ]
  },
  office: {
    title: '패밀리오피스',
    icon: Building2,
    description: '가족 자산의 통합 관리 조직',
    components: [
      '자산 관리 서비스',
      '세무 및 법률 자문',
      '교육 및 개발 지원',
      '차세대 멘토링',
      '네트워크 구축'
    ]
  },
  trust: {
    title: '가족신탁',
    icon: Shield,
    description: '자산 보호와 승계의 법적 구조',
    components: [
      '자산 보호 기능',
      '세무 효율성',
      '승계 계획 실행',
      '분쟁 방지 효과',
      '전문가 관리'
    ]
  }
};

const BusinessSuccessionPage = () => {
  const [selectedMethod, setSelectedMethod] = React.useState('gift');
  const [checkedTasks, setCheckedTasks] = React.useState<Set<string>>(new Set());
  const [selectedPhase, setSelectedPhase] = React.useState(1);

  // 체크리스트 토글
  const toggleTask = (taskId: string) => {
    const newChecked = new Set(checkedTasks);
    if (newChecked.has(taskId)) {
      newChecked.delete(taskId);
    } else {
      newChecked.add(taskId);
    }
    setCheckedTasks(newChecked);
  };

  // 진행률 계산
  const calculateProgress = () => {
    const allTasks = successionRoadmap.flatMap((phase, phaseIndex) => 
      phase.tasks.map((task, taskIndex) => `${phaseIndex}-${taskIndex}`)
    );
    return (checkedTasks.size / allTasks.length) * 100;
  };

  const overallProgress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" size="lg" className="mb-6">
              <Crown className="h-3 w-3 mr-1" />
              삼성생명 패밀리오피스 승계 전략
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              전략적 가업승계 방안
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              성공적인 세대교체를 위한 체계적 승계 전략으로
              <span className="block mt-2 text-primary font-semibold">
                상속세 50% 절감과 경영권 안정화를 동시에 실현
              </span>
            </p>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">상속세 절감</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">50%</div>
                  <div className="text-sm text-muted-foreground">평균 절세 효과</div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">승계 성공률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">체계적 준비 시</div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">준비 기간</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">3-5</div>
                  <div className="text-sm text-muted-foreground">년 권장</div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">진행률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {Math.round(overallProgress)}%
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5단계 승계 로드맵 */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                5단계 승계 로드맵
              </h2>
              <p className="text-xl text-muted-foreground">
                체계적이고 단계적인 승계 프로세스로 성공률을 극대화합니다
              </p>
            </div>

            <Tabs value={selectedPhase.toString()} onValueChange={(value) => setSelectedPhase(parseInt(value))} className="w-full">
              <TabsList className="grid grid-cols-5 w-full mb-8">
                {successionRoadmap.map((phase) => (
                  <TabsTrigger key={phase.phase} value={phase.phase.toString()} className="text-sm">
                    {phase.phase}단계
                  </TabsTrigger>
                ))}
              </TabsList>

              {successionRoadmap.map((phase) => (
                <TabsContent key={phase.phase} value={phase.phase.toString()}>
                  <Card className={`bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5 ${phase.critical ? 'border-primary dark:border-primary/70' : 'border-muted dark:border-muted/70'}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          phase.critical ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {phase.phase}
                        </div>
                        <div>
                          <CardTitle>{phase.title}</CardTitle>
                          <CardDescription>
                            {phase.duration} · {phase.description}
                          </CardDescription>
                        </div>
                        {phase.critical && (
                          <Badge variant="destructive" className="ml-auto">
                            필수
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {phase.tasks.map((task, taskIndex) => {
                          const taskId = `${phase.phase - 1}-${taskIndex}`;
                          return (
                            <div
                              key={taskId}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={taskId}
                                checked={checkedTasks.has(taskId)}
                                onCheckedChange={() => toggleTask(taskId)}
                              />
                              <label htmlFor={taskId} className="flex-1 cursor-pointer select-none">
                                {task}
                              </label>
                              <div className="flex items-center">
                                {checkedTasks.has(taskId) ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-gray-300" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* 로드맵 시각화 */}
            <Card className="mt-8 bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
              <CardHeader>
                <CardTitle>전체 로드맵 Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  {successionRoadmap.map((phase, index) => (
                    <div key={phase.phase} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                          selectedPhase === phase.phase
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/70'
                        }`}
                        onClick={() => setSelectedPhase(phase.phase)}
                      >
                        {phase.phase}
                      </div>
                      {index < successionRoadmap.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    클릭하여 각 단계의 세부 내용을 확인하세요
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 승계 방법별 비교 */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                승계 방법별 비교 분석
              </h2>
              <p className="text-xl text-muted-foreground">
                기업 상황에 맞는 최적의 승계 방법을 선택하세요
              </p>
            </div>

            <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8">
                {Object.entries(successionMethods).map(([key, method]) => (
                  <TabsTrigger key={key} value={key}>
                    {method.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(successionMethods).map(([key, method]) => {
                const Icon = method.icon;
                return (
                  <TabsContent key={key} value={key}>
                    <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-2xl">{method.title}</CardTitle>
                            <CardDescription className="text-lg">
                              {method.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            절세 효과: {method.taxSaving}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              장점
                            </h4>
                            <ul className="space-y-2">
                              {method.advantages.map((advantage, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{advantage}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-orange-700 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5" />
                              고려사항
                            </h4>
                            <ul className="space-y-2">
                              {method.considerations.map((consideration, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{consideration}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            적합한 기업
                          </h4>
                          <p className="text-sm">{method.suitableFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* 가족 거버넌스 체계 */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                가족 거버넌스 체계 구축
              </h2>
              <p className="text-xl text-muted-foreground">
                지속가능한 가업승계를 위한 체계적인 가족 거버넌스
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(familyGovernance).map(([key, governance]) => {
                const Icon = governance.icon;
                return (
                  <Card key={key} className="h-full bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle>{governance.title}</CardTitle>
                          <CardDescription>{governance.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {governance.components.map((component, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{component}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium Family Office Upgrade Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50/30 to-blue-50/30 dark:from-amber-950/20 dark:to-blue-950/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-amber-200 dark:border-amber-400/30 bg-gradient-to-r from-amber-50/80 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/30 text-amber-800 dark:text-amber-300 shadow-lg backdrop-blur-sm" animation="fade">
                <Crown className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                Family Office Excellence
              </Badge>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair animate-slide-up">
                <span className="text-amber-600 dark:text-amber-400">가업승계</span>를 넘어선{' '}
                <span className="text-card-foreground">패밀리오피스</span>
              </h3>
              
              <p className="text-xl text-card-foreground/80 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
                단순한 승계 전략에서 <span className="font-bold text-card-foreground">세대를 아우르는 통합 자산관리</span>로 업그레이드하세요.
                성공한 기업가 가문들이 선택한 차별화된 패밀리오피스 서비스를 경험해보세요.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="border-border/50 bg-card/80 backdrop-blur-sm rounded-xl p-6 border shadow-white/5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-card-foreground">기업 + 개인자산 통합</h4>
                  <p className="text-card-foreground/80 text-sm">기업자산과 개인자산을 통합하여 최적의 승계 구조 설계</p>
                </div>
                
                <div className="border-border/50 bg-card/80 backdrop-blur-sm rounded-xl p-6 border shadow-white/5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-card-foreground">차세대 교육 프로그램</h4>
                  <p className="text-card-foreground/80 text-sm">후계자 역량 개발과 가족 거버넌스 체계 구축</p>
                </div>
                
                <div className="border-border/50 bg-card/80 backdrop-blur-sm rounded-xl p-6 border shadow-white/5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-card-foreground">지속가능 성장전략</h4>
                  <p className="text-card-foreground/80 text-sm">승계 이후 장기 성장을 위한 투자 및 운영 전략</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
                <Link 
                  href="/family-office-center" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white text-lg font-semibold rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Crown className="h-6 w-6 mr-2" />
                  패밀리오피스 센터 보기
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Link>
                
                <Link 
                  href="/fp-center" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 text-lg font-semibold rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Users className="h-6 w-6 mr-2" />
                  전문 FP 상담
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Success Cases */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                성공 사례
              </h2>
              <p className="text-xl text-muted-foreground">
                체계적인 승계 전략으로 성공한 기업들의 사례
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle>제조업 A사</CardTitle>
                  <CardDescription>매출 300억원, 직원 150명</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">도전과제</h4>
                      <p className="text-sm text-muted-foreground">
                        높은 기업가치로 인한 상속세 부담 (예상 50억원)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">솔루션</h4>
                      <p className="text-sm text-muted-foreground">
                        5년간 단계적 생전증여 + 가족법인 설립
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">결과</h4>
                      <p className="text-sm text-green-600 font-medium">
                        상속세 70% 절감 (15억원 → 4.5억원)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
                    <Gem className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>유통업 B사</CardTitle>
                  <CardDescription>매출 500억원, 직원 250명</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">도전과제</h4>
                      <p className="text-sm text-muted-foreground">
                        차세대 경영 역량 부족, 형제간 갈등
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">솔루션</h4>
                      <p className="text-sm text-muted-foreground">
                        3년 차세대 교육 + 가족헌장 제정
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">결과</h4>
                      <p className="text-sm text-green-600 font-medium">
                        안정적 승계 완료, 매출 20% 성장
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card/80 border-border/40 dark:border-border hover:shadow-2xl dark:hover:shadow-white/5">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                    <TreePine className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>건설업 C사</CardTitle>
                  <CardDescription>매출 1,000억원, 직원 400명</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">도전과제</h4>
                      <p className="text-sm text-muted-foreground">
                        복잡한 지분 구조, 다수 가족 구성원
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">솔루션</h4>
                      <p className="text-sm text-muted-foreground">
                        패밀리오피스 설립 + 신탁 구조 활용
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">결과</h4>
                      <p className="text-sm text-green-600 font-medium">
                        체계적 자산관리, 갈등 해결
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessSuccessionPage;