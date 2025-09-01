'use client';

import {
  Award,
  Building,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  FileText,
  Gift,
  GraduationCap,
  Heart,
  Info,
  Lightbulb,
  MapPin,
  Percent,
  Phone,
  PieChart,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function BusinessCertificationPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 2025년 기업인증 핵심 통계
  const certificationStats = [
    {
      value: 47800,
      suffix: '개',
      label: '2024년 벤처기업 인증 누적',
      icon: Star,
      color: 'blue'
    },
    {
      value: 18500,
      suffix: '개',
      label: '이노비즈 인증기업 (2024)',
      icon: Lightbulb,
      color: 'green'
    },
    {
      value: 8200,
      suffix: '개',
      label: '메인비즈 인증기업 (2024)',
      icon: Building,
      color: 'purple'
    },
    {
      value: 65,
      suffix: '%',
      label: '인증기업 생존율 (일반 대비 +23%)',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  // 주요 기업인증 종류
  const certificationTypes = [
    {
      icon: Star,
      title: '벤처기업 인증',
      description: '벤처투자 또는 R&D 집약도 기준 혁신 기업',
      requirements: [
        '벤처투자 받은 기업',
        'R&D 비율 5% 이상',
        '신기술 사업화 기업',
        '예비벤처기업 졸업기업'
      ],
      benefits: [
        '세제혜택 (법인세 20%→10%)',
        '정부 R&D 가점 (5-20점)',
        '정책자금 우대금리',
        '코스닥 상장 특례'
      ],
      duration: '3년',
      color: 'blue',
      badge: '최고 인기',
      agency: '중소벤처기업부'
    },
    {
      icon: Lightbulb,
      title: '이노비즈 인증',
      description: '기술혁신형 중소기업 인증',
      requirements: [
        '기술혁신 역량 보유',
        '기술개발 투자 실적',
        '성장성 및 수익성',
        '기업 신용도 양호'
      ],
      benefits: [
        'R&D 자금지원 우선',
        '판로개척 지원',
        '인력채용 지원',
        '기술보증기금 우대'
      ],
      duration: '3년',
      color: 'green',
      badge: '기술집약',
      agency: '중소벤처기업부'
    },
    {
      icon: Building,
      title: '메인비즈 인증',
      description: '경영혁신형 중소기업 인증',
      requirements: [
        '경영시스템 우수성',
        '지속적 성장성',
        '기업 건전성',
        '사회적 책임 이행'
      ],
      benefits: [
        '경영컨설팅 지원',
        '해외진출 지원',
        '금융지원 우대',
        '정부조달 가점'
      ],
      duration: '3년',
      color: 'purple',
      badge: '경영혁신',
      agency: '중소벤처기업부'
    },
    {
      icon: Award,
      title: 'K-StartUp 인증',
      description: '창업 7년 이내 혁신 스타트업',
      requirements: [
        '창업 7년 이내',
        '혁신기술 보유',
        '성장가능성 입증',
        '투자유치 실적'
      ],
      benefits: [
        '창업지원 프로그램',
        '투자유치 지원',
        '해외진출 지원',
        '규제샌드박스 참여'
      ],
      duration: '2년',
      color: 'orange',
      badge: '2025신규',
      agency: '중소벤처기업부'
    }
  ];

  // 기업인증별 세제혜택 상세
  const taxBenefits = [
    {
      certification: '벤처기업',
      corporateTax: '10%',
      originalRate: '20-25%',
      savings: '50-60% 절감',
      additionalBenefits: [
        '스톡옵션 과세이연',
        '엔젤투자 소득공제',
        '기술취득비 세액공제',
        'R&D 세액공제 30%'
      ],
      color: 'blue'
    },
    {
      certification: '이노비즈',
      corporateTax: '15%',
      originalRate: '20-25%',
      savings: '25-40% 절감',
      additionalBenefits: [
        '기술개발 세액공제',
        '기술취득 특별상각',
        '연구인력 세액공제',
        '신성장동력 우대'
      ],
      color: 'green'
    },
    {
      certification: '메인비즈',
      corporateTax: '18%',
      originalRate: '20-25%',
      savings: '10-28% 절감',
      additionalBenefits: [
        '중소기업 세액공제',
        '경영개선 비용공제',
        '상생협력 세액공제',
        '고용창출 세액공제'
      ],
      color: 'purple'
    },
    {
      certification: 'K-StartUp',
      corporateTax: '12%',
      originalRate: '20-25%',
      savings: '40-52% 절감',
      additionalBenefits: [
        '창업기업 세액공제',
        '우수인력 주식매수선택권',
        '기술출자 과세특례',
        '창투조합 세액공제'
      ],
      color: 'orange'
    }
  ];

  // 인증 신청 프로세스
  const applicationProcess = [
    {
      step: 1,
      title: '사전 준비',
      description: '인증 요건 확인 및 필요 서류 준비',
      duration: '1-2주',
      icon: CheckCircle,
      details: [
        '인증 요건 자가진단',
        '기업 현황 정리',
        '재무제표 준비',
        '기술개발 실적 정리'
      ],
      tips: '전문가 사전 컨설팅 권장'
    },
    {
      step: 2,
      title: '온라인 신청',
      description: 'K-StartUp 홈페이지에서 온라인 신청',
      duration: '3-5일',
      icon: FileText,
      details: [
        '신청서 작성',
        '증빙서류 업로드',
        '기업정보 입력',
        '담당자 지정'
      ],
      tips: '서류 미비 시 보완요구 발생'
    },
    {
      step: 3,
      title: '서면 심사',
      description: '제출 서류 기반 1차 서면 심사',
      duration: '2-3주',
      icon: Building,
      details: [
        '요건 충족성 검토',
        '재무상태 분석',
        '기술력 평가',
        '성장가능성 검토'
      ],
      tips: '추가 자료 요청 시 신속 대응'
    },
    {
      step: 4,
      title: '현장 심사',
      description: '심사위원의 기업 방문 현장 심사',
      duration: '1주',
      icon: Users,
      details: [
        '경영진 면담',
        '기술개발 현황 확인',
        '사업장 실사',
        '종업원 면담'
      ],
      tips: '성실한 답변과 자료 제공 중요'
    },
    {
      step: 5,
      title: '최종 심의',
      description: '심사위원회 최종 심의 및 인증 결정',
      duration: '1-2주',
      icon: Award,
      details: [
        '종합평가 실시',
        '심의위원회 개최',
        '인증 여부 결정',
        '결과 통보'
      ],
      tips: '인증서 발급 후 혜택 활용 시작'
    }
  ];

  // 2025년 주요 변경사항
  const changes2025 = [
    {
      icon: Star,
      title: 'K-StartUp 인증 신설',
      description: '스타트업 전용 인증제도 신규 도입',
      impact: '창업 7년 이내 기업 혜택 확대',
      color: 'orange'
    },
    {
      icon: DollarSign,
      title: '세제혜택 확대',
      description: '벤처기업 법인세율 추가 인하 (12%→10%)',
      impact: '연간 2천만원 추가 절세 (매출 10억 기준)',
      color: 'green'
    },
    {
      icon: Clock,
      title: '심사기간 단축',
      description: '디지털 심사시스템 도입으로 처리기간 단축',
      impact: '기존 2개월 → 1개월로 단축',
      color: 'blue'
    },
    {
      icon: Gift,
      title: '지원혜택 통합',
      description: '중복 인증기업 추가 혜택 패키지',
      impact: '벤처+이노비즈 동시 인증 시 5% 추가 지원',
      color: 'purple'
    }
  ];

  // 업종별 인증 전략
  const industryStrategies = [
    {
      industry: 'IT/소프트웨어',
      recommended: ['벤처기업', 'K-StartUp'],
      keyPoints: [
        '기술력 중심 어필',
        '특허/지적재산권 강조',
        'SaaS/플랫폼 비즈니스 모델',
        '개발자 비율 및 역량'
      ],
      successRate: '78%',
      icon: Lightbulb
    },
    {
      industry: '바이오/헬스케어',
      recommended: ['벤처기업', '이노비즈'],
      keyPoints: [
        'R&D 투자 비율',
        '임상시험 진행 현황',
        '규제 승인 계획',
        '전문인력 보유 현황'
      ],
      successRate: '65%',
      icon: Heart
    },
    {
      industry: '제조업',
      recommended: ['이노비즈', '메인비즈'],
      keyPoints: [
        '생산성 혁신 사례',
        '스마트팩토리 도입',
        '품질 시스템 구축',
        '친환경 기술 적용'
      ],
      successRate: '72%',
      icon: Building
    },
    {
      industry: '서비스업',
      recommended: ['메인비즈', 'K-StartUp'],
      keyPoints: [
        '비즈니스 모델 혁신',
        '디지털 전환 성과',
        '고객 만족도 향상',
        '사회적 가치 창출'
      ],
      successRate: '69%',
      icon: Users
    }
  ];

  // FAQ 데이터
  const faqData = [
    {
      question: '벤처기업 인증과 이노비즈 인증의 차이점은 무엇인가요?',
      answer: '벤처기업 인증은 벤처투자를 받거나 R&D 비중이 높은 기업이 대상이고, 이노비즈는 기술혁신 역량과 성장성을 종합 평가합니다. 벤처기업은 법인세 10%, 이노비즈는 15%로 벤처기업 혜택이 더 큽니다.'
    },
    {
      question: '2025년 새로 도입된 K-StartUp 인증의 특징은 무엇인가요?',
      answer: 'K-StartUp은 창업 7년 이내 스타트업 전용 인증으로, 기존 인증보다 요건이 완화되고 창업지원에 특화된 혜택을 제공합니다. 법인세 12% 적용과 투자유치 지원, 규제샌드박스 참여 기회가 주요 혜택입니다.'
    },
    {
      question: '기업인증 심사는 얼마나 걸리고 합격률은 어떻게 되나요?',
      answer: '2025년부터 디지털 심사시스템 도입으로 심사기간이 2개월에서 1개월로 단축되었습니다. 벤처기업 78%, 이노비즈 72%, 메인비즈 69%의 합격률을 보이며, 사전 준비를 철저히 하면 성공 가능성이 높습니다.'
    },
    {
      question: '여러 인증을 동시에 받을 수 있나요?',
      answer: '가능합니다. 벤처기업과 이노비즈를 동시 보유하는 기업도 많으며, 2025년부터는 중복 인증기업에 대한 추가 혜택 패키지를 제공합니다. 단, 각 인증의 요건을 모두 충족해야 합니다.'
    },
    {
      question: '인증 후 유지 관리는 어떻게 해야 하나요?',
      answer: '인증 후에는 매년 현황보고서를 제출해야 하며, 인증 요건을 지속적으로 유지해야 합니다. 3년 유효기간 만료 전 재인증 신청이 필요하며, 조건 미충족 시 인증이 취소될 수 있습니다.'
    },
    {
      question: '기업인증을 위한 사전 준비는 어떻게 해야 하나요?',
      answer: '먼저 자가진단을 통해 인증 요건 충족 여부를 확인하고, 부족한 부분을 보완해야 합니다. 재무제표 정리, 기술개발 실적 정리, 특허 출원 등이 필요하며, 전문가 컨설팅을 받는 것을 권장합니다.'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:hover:bg-primary/30">
                <Award className="w-4 h-4 mr-2" />
                2025년 최신 정보
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                기업인증 완벽 가이드
                <span className="block text-primary">혜택부터 신청까지</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                벤처, 이노비즈, 메인비즈, K-StartUp까지, 
                <strong className="text-primary font-semibold"> 기업 성장에 필수적인 모든 인증</strong> 정보를 한 곳에서 확인하세요.
              </p>

              {/* 핵심 통계 */}
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {certificationStats.map((stat, index) => (
                  <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-card/30 dark:border-border/30">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color === 'blue' ? 'text-primary' : stat.color === 'green' ? 'text-emerald-600 dark:text-emerald-400' : stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-orange-600 dark:text-orange-400'}`} />
                      <div className="text-2xl font-bold text-foreground mb-2">
                        <AnimatedCounter
                          end={stat.value}
                          duration={2000}
                          start={startAnimation}
                          suffix={stat.suffix}
                          easingFunction={easingFunction}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  calLink="samsung-life-gfc-qjwjd4vhnr3cklsf"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  기업인증 무료 상담
                </CalComPopup>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="w-5 h-5 mr-2" />
                  인증 종류 확인
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2025년 주요 변경사항 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-700">
                <Star className="w-4 h-4 mr-2" />
                2025년 업데이트
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                올해 달라진 기업인증
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                2025년 새롭게 개선된 기업인증 제도로 더 많은 혜택을 받아보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {changes2025.map((change, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-${change.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                      <change.icon className={`w-6 h-6 text-${change.color}-600`} />
                    </div>
                    <CardTitle className="text-lg">{change.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{change.description}</p>
                    <Badge className={`bg-${change.color}-100 text-${change.color}-700`}>
                      {change.impact}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 주요 기업인증 종류 */}
        <section id="certifications" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                주요 기업인증 종류
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                기업의 특성과 성장 단계에 맞는 최적의 인증을 선택하세요
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {certificationTypes.map((cert, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${cert.color}-100 rounded-lg flex items-center justify-center`}>
                        <cert.icon className={`w-6 h-6 text-${cert.color}-600`} />
                      </div>
                      <Badge className={`bg-${cert.color}-100 text-${cert.color}-700`}>
                        {cert.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <p className="text-gray-600">{cert.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{cert.agency} | 유효기간: {cert.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">신청 요건</h4>
                        <div className="space-y-2">
                          {cert.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">주요 혜택</h4>
                        <div className="space-y-2">
                          {cert.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-start text-sm text-gray-600">
                              <Gift className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 세제혜택 상세 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                인증별 세제혜택 비교
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                각 인증별로 받을 수 있는 세제혜택을 상세히 비교해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {taxBenefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl">{benefit.certification}</CardTitle>
                      <Badge className="bg-green-100 text-green-700">
                        {benefit.savings}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{benefit.corporateTax}</p>
                        <p className="text-sm text-gray-500">법인세율</p>
                      </div>
                      <div className="text-gray-400">
                        <p className="text-lg">→</p>
                        <p className="text-xs">vs 일반</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-500 line-through">{benefit.originalRate}</p>
                        <p className="text-sm text-gray-500">일반 세율</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-gray-900 mb-3">추가 세제혜택</h4>
                    <div className="space-y-2">
                      {benefit.additionalBenefits.map((additional, additionalIndex) => (
                        <div key={additionalIndex} className="flex items-center text-sm text-gray-600">
                          <Percent className="w-4 h-4 mr-2 text-green-600" />
                          <span>{additional}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-3">세제혜택 계산 예시</h3>
                <p className="text-blue-700 mb-4">
                  연매출 10억원, 순이익 2억원 기업 기준
                </p>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="font-bold text-blue-600">벤처기업</p>
                    <p className="text-2xl font-bold">2,000만원</p>
                    <p className="text-sm text-gray-600">(10% 적용)</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-600">이노비즈</p>
                    <p className="text-2xl font-bold">3,000만원</p>
                    <p className="text-sm text-gray-600">(15% 적용)</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-600">메인비즈</p>
                    <p className="text-2xl font-bold">3,600만원</p>
                    <p className="text-sm text-gray-600">(18% 적용)</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600">일반기업</p>
                    <p className="text-2xl font-bold">5,000만원</p>
                    <p className="text-sm text-gray-600">(25% 적용)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 업종별 인증 전략 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                업종별 맞춤 인증 전략
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                업종 특성에 맞는 최적의 인증 전략과 성공 포인트를 확인하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {industryStrategies.map((strategy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <strategy.icon className="w-8 h-8 text-blue-600 mr-3" />
                        <CardTitle className="text-xl">{strategy.industry}</CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        성공률 {strategy.successRate}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="text-sm text-gray-600">추천 인증:</span>
                      {strategy.recommended.map((rec, recIndex) => (
                        <Badge key={recIndex} variant="outline" className="text-xs">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-gray-900 mb-3">성공 핵심 포인트</h4>
                    <div className="space-y-2">
                      {strategy.keyPoints.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start text-sm text-gray-600">
                          <Target className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 인증 신청 프로세스 */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                기업인증 신청 프로세스
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                체계적인 5단계 프로세스로 성공적인 기업인증을 받아보세요
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-5 gap-6">
                {applicationProcess.map((process, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 relative text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                        {process.step}
                      </div>
                      <CardTitle className="text-lg">{process.title}</CardTitle>
                      <Badge variant="outline" className="mx-auto">
                        {process.duration}
                      </Badge>
                      <p className="text-gray-600 text-sm mt-2">{process.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-left">
                        {process.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                        💡 {process.tips}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              기업인증 성공, 전문가와 함께하세요
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              복잡한 기업인증 과정을 전문가가 도와드립니다. 
              <strong>무료 상담</strong>으로 최적의 인증 전략을 세워보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                calLink="samsung-life-gfc-qjwjd4vhnr3cklsf"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                무료 기업인증 상담 예약
              </CalComPopup>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('tel:0502-5550-8700', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                즉시 상담: 0502-5550-8700
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>기업인증 전문가 상담</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>맞춤형 인증 전략 수립</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>신청 서류 작성 지원</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>심사 대응 컨설팅</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                기업인증 FAQ
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                기업인증에 대한 궁금한 점들을 확인해보세요
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-start gap-3 text-lg">
                        <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Structured Data */}
      <Script id="business-certification-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "2025년 기업인증 완벽 가이드 | 벤처/이노비즈/메인비즈 인증 혜택 총정리",
          "description": "2025년 최신 기업인증 완벽 가이드. 벤처기업 인증, 이노비즈 인증, 메인비즈 인증까지 혜택과 신청방법. 기업인증 전문가 상담",
          "author": {
            "@type": "Organization",
            "name": "삼성생명 GFC"
          },
          "publisher": {
            "@type": "Organization",
            "name": "삼성생명 GFC",
            "logo": {
              "@type": "ImageObject",
              "url": "https://familyoffice.life/logo.png"
            }
          },
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-01",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://familyoffice.life/business-certification"
          }
        })}
      </Script>

      <Script id="how-to-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "기업인증 신청 방법",
          "description": "벤처기업, 이노비즈, 메인비즈 등 기업인증 신청 5단계 프로세스",
          "step": applicationProcess.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.description,
            "image": "https://familyoffice.life/certification-process.jpg"
          }))
        })}
      </Script>

      <Script id="service-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "기업인증 컨설팅 서비스",
          "description": "벤처기업, 이노비즈, 메인비즈 등 기업인증 신청 지원 및 컨설팅 서비스",
          "provider": {
            "@type": "Organization",
            "name": "삼성생명 GFC",
            "telephone": "0502-5550-8700",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "서울",
              "addressCountry": "KR"
            }
          },
          "serviceType": "기업인증 컨설팅",
          "areaServed": "대한민국",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW",
            "description": "무료 기업인증 상담"
          }
        })}
      </Script>

      <Script id="faq-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </Script>
    </>
  );
}