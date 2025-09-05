'use client';

import {
  Award,
  Building,
  Calculator,
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
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Zap,
  Factory,
  Cpu,
  Medal,
} from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function PolicyFundsPage() {
  const [startAnimation, setStartAnimation] = useState(false);

  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 2025년 정책자금 핵심 통계 (업데이트된 데이터)
  const policyFundStats = [
    {
      value: 92,
      suffix: '조원',
      label: '2025년 중소벤처 지원사업 총 규모',
      icon: DollarSign,
      color: 'green'
    },
    {
      value: 1.0,
      suffix: '%',
      label: '최저 금리 (R&D지원자금 기준)',
      icon: Percent,
      color: 'blue'
    },
    {
      value: 40,
      suffix: '%',
      label: '연구개발비 세액공제 상한',
      icon: Shield,
      color: 'purple'
    },
    {
      value: 84,
      suffix: '개월',
      label: '최대 상환기간 (7년)',
      icon: Clock,
      color: 'orange'
    }
  ];

  // 정책자금 종류별 분류 (강화된 내용)
  const policyFundCategories = [
    {
      icon: GraduationCap,
      title: '창업자금',
      description: '창업 초기 필요한 시설자금 및 운영자금 (세액감면 5년→7년 연장)',
      funds: [
        { name: '창업성장기술개발사업', rate: '1.0%', limit: '5억원', period: '5년' },
        { name: '창업기업 정책자금', rate: '1.5%', limit: '3억원', period: '3년' },
        { name: '청년창업자금 확대', rate: '1.0%', limit: '2억원', period: '7년' },
        { name: '고용창출 창업자금', rate: '0.8%', limit: '3억원', period: '5년' }
      ],
      color: 'blue',
      badge: '2025확대'
    },
    {
      icon: Lightbulb,
      title: 'R&D지원자금',
      description: '기업부설연구소 설립 및 연구개발 전용 자금 (세액공제 40%)',
      funds: [
        { name: '혁신형 중소기업 R&D', rate: '1.0%', limit: '10억원', period: '5년' },
        { name: '연구소 설립지원금', rate: '무상', limit: '10억원', period: '-' },
        { name: '연구장비 구입지원', rate: '무상', limit: '20억원', period: '-' }
      ],
      color: 'purple',
      badge: '2025신규'
    },
    {
      icon: Building,
      title: '운영자금',
      description: '기업 운영에 필요한 단기 자금 지원',
      funds: [
        { name: '일반운영자금', rate: '2.0%', limit: '10억원', period: '1년' },
        { name: '경영안정자금', rate: '1.8%', limit: '30억원', period: '5년' },
        { name: '긴급경영안정자금', rate: '1.5%', limit: '10억원', period: '3년' }
      ],
      color: 'green',
      badge: '운영중기업'
    },
    {
      icon: Zap,
      title: '시설자금',
      description: '설비투자 및 시설 확충을 위한 장기 자금',
      funds: [
        { name: '시설자금대출', rate: '2.2%', limit: '50억원', period: '7년' },
        { name: '스마트공장 구축자금', rate: '1.8%', limit: '20억원', period: '5년' },
        { name: '친환경시설자금', rate: '1.5%', limit: '30억원', period: '10년' }
      ],
      color: 'purple',
      badge: '투자확대'
    },
    {
      icon: TrendingUp,
      title: '특별지원자금',
      description: '정부 특별정책에 따른 지원 프로그램 (무상지원금 연계)',
      funds: [
        { name: 'ESG 경영자금 확대', rate: '1.3%', limit: '20억원', period: '7년' },
        { name: '스마트공장 구축지원', rate: '무상', limit: '1억원', period: '-' },
        { name: '수출기업 지원자금', rate: '1.8%', limit: '50억원', period: '3년' },
        { name: '글로벌 강소기업 육성', rate: '무상', limit: '3억원', period: '-' }
      ],
      color: 'orange',
      badge: '2025확대'
    }
  ];

  // 주요 보증기관
  const guaranteeInstitutions = [
    {
      name: '신용보증기금',
      abbr: '신보',
      description: '중소기업 신용보증 전문기관',
      guaranteeRate: '95%',
      maxAmount: '30억원',
      features: ['일반보증', '특별보증', '정책자금보증'],
      contact: '1588-2487'
    },
    {
      name: '기술보증기금',
      abbr: '기보',
      description: '기술력 우수 기업 전문 보증',
      guaranteeRate: '95%',
      maxAmount: '50억원',
      features: ['기술평가보증', 'IP담보대출', '벤처보증'],
      contact: '1544-1120'
    },
    {
      name: '중소벤처기업진흥공단',
      abbr: '중진공',
      description: '중소벤처기업 종합지원 기관',
      guaranteeRate: '85%',
      maxAmount: '100억원',
      features: ['직접대출', '융자지원', '투자연계'],
      contact: '1357-0119'
    },
    {
      name: '지역신용보증재단',
      abbr: '지보재',
      description: '지역 특화 소상공인 지원',
      guaranteeRate: '95%',
      maxAmount: '2억원',
      features: ['소상공인대출', '지역특화', '창업지원'],
      contact: '지역별상이'
    }
  ];

  // 신청 프로세스
  const applicationProcess = [
    {
      step: 1,
      title: '자격 요건 확인',
      description: '업종, 매출, 신용등급 등 기본 자격 검토',
      duration: '1일',
      icon: CheckCircle,
      details: [
        '중소기업 확인서 확인',
        '업력 6개월 이상',
        '신용등급 BB- 이상',
        '세금 체납 여부 확인'
      ]
    },
    {
      step: 2,
      title: '보증서 신청',
      description: '신용보증기금 등 보증기관에 보증서 신청',
      duration: '5-7일',
      icon: FileText,
      details: [
        '보증신청서 작성',
        '재무제표 제출',
        '사업계획서 작성',
        '담보 제공 계획'
      ]
    },
    {
      step: 3,
      title: '금융기관 접촉',
      description: '보증서를 바탕으로 은행에 대출 신청',
      duration: '3-5일',
      icon: Building,
      details: [
        '대출신청서 작성',
        '보증서 제출',
        '추가 서류 보완',
        '담보 설정'
      ]
    },
    {
      step: 4,
      title: '자금 실행',
      description: '최종 승인 후 정책자금 지급 및 사후관리',
      duration: '2-3일',
      icon: CreditCard,
      details: [
        '대출약정 체결',
        '자금 지급',
        '사후관리 시작',
        '정기 점검'
      ]
    }
  ];

  // 2025년 주요 변경사항 (문서 기반 업데이트)
  const changes2025 = [
    {
      icon: TrendingDown,
      title: '금리 인하',
      description: 'R&D지원자금 최대 1.0%, 친환경시설 2.0%→1.5%',
      impact: '연간 500만원 절약 (10억원 기준)',
      color: 'green'
    },
    {
      icon: Gift,
      title: '무상지원금 확대',
      description: '스마트공장 3,000억, R&D 2,500억, 글로벌강소 500억',
      impact: '최대 90% 무상지원 가능',
      color: 'blue'
    },
    {
      icon: Lightbulb,
      title: '연구소 세액공제 인상',
      description: '기업부설연구소 세액공제 25%→40% 상향',
      impact: '연간 최대 2억원 세금 절감',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'AI 자동심사 도입',
      description: '통합보증심사시스템으로 AI 기반 서류검증',
      impact: '승인기간 1주 단축, 95% 성공률',
      color: 'orange'
    }
  ];

  // 정책자금 FAQ 카테고리 데이터
  const policyFundsFaqCategories = [
    {
      title: '정책자금 기본 정보',
      icon: 'Info',
      faqs: [
        {
          id: 'basic-1',
          question: '2025년 정책자금 신청 자격은 어떻게 되나요?',
          answer: '중소기업기본법상 중소기업으로 업력 6개월 이상, 신용등급 BB- 이상, 세금 체납이 없는 기업이 신청 가능합니다. 벤처기업, 이노비즈 기업, ESG 경영기업은 우대조건이 적용되며, 특히 기업부설연구소 보유기업은 추가 혜택을 받을 수 있습니다.'
        },
        {
          id: 'basic-2',
          question: '정책자금과 일반 은행대출의 차이점은 무엇인가요?',
          answer: '정책자금은 정부가 지원하는 저금리 대출로 일반 시중금리보다 1-2% 낮습니다. 신용보증기금 등의 보증을 통해 담보 부담도 줄일 수 있으며, 상환 조건도 더 유리합니다. 특히 R&D 목적 자금의 경우 최대 1.0% 금리로 지원받을 수 있습니다.'
        },
        {
          id: 'basic-3',
          question: '정책자금 신청부터 실행까지 얼마나 걸리나요?',
          answer: '일반적으로 보증기관 승인 5-7일, 은행 대출 승인 3-5일로 총 2-3주 정도 소요됩니다. 벤처기업이나 이노비즈 기업은 심사 간소화로 1-2주 내 처리가 가능하며, 2025년부터 AI 기반 자동 서류검증으로 처리기간이 더욱 단축되었습니다.'
        }
      ]
    },
    {
      title: '기업인증 및 우대혜택',
      icon: 'Medal',
      faqs: [
        {
          id: 'cert-1',
          question: '벤처기업 인증 시 어떤 정책자금 혜택이 있나요?',
          answer: '벤처기업 인증 시 보증한도가 30억원에서 50억원으로 확대되며, 금리우대 1.5%p를 받을 수 있습니다. 또한 R&D 지원사업 신청 시 10점의 가점이 주어지고, 정부조달 입찰에서 7점의 가점을 받습니다.'
        },
        {
          id: 'cert-2',
          question: '기업부설연구소 설립 시 혜택은 무엇인가요?',
          answer: '기업부설연구소 설립 시 연구개발비 세액공제를 최대 40%까지 받을 수 있으며, 설립지원금 최대 10억원, 연구장비 구입자금 20억원을 지원받을 수 있습니다. 상시근로자 10인 이상, 연구전담인력 3인 이상이 설립 요건입니다.'
        },
        {
          id: 'cert-3',
          question: '이노비즈, 메인비즈 기업의 정책자금 우대사항은?',
          answer: '이노비즈 기업은 기술혁신자금 우선지원, 보증료율 0.2%p 우대, 기보 보증한도 10억원 추가 확대 혜택을 받습니다. 메인비즈 기업은 시설자금 금리 0.3%p 우대, 운영자금 한도 50% 확대, 심사기간 30% 단축의 혜택이 있습니다.'
        }
      ]
    },
    {
      title: '신청 절차 및 요건',
      icon: 'FileText',
      faqs: [
        {
          id: 'process-1',
          question: '신용보증기금 보증 없이도 정책자금 신청이 가능한가요?',
          answer: '가능합니다만, 보증기관의 보증을 받으면 금리 우대, 한도 확대, 담보 부담 경감 등의 혜택이 있어 보증 신청을 권장합니다. 기업 신용등급에 따라 보증 없이도 신청 가능한 상품들이 있으며, 2025년부터 통합보증심사 시스템으로 처리가 간소화되었습니다.'
        },
        {
          id: 'process-2',
          question: '정책자금 중복 신청이 가능한가요?',
          answer: '목적이 다른 정책자금은 중복 신청 가능합니다. 예를 들어 시설자금과 운영자금은 동시 신청할 수 있지만, 같은 목적의 자금은 중복 신청이 제한됩니다. 총 한도 내에서 관리되며, 2025년부터 통합한도 관리시스템으로 효율적으로 관리됩니다.'
        },
        {
          id: 'process-3',
          question: '정책자금 신청 시 필요한 주요 서류는 무엇인가요?',
          answer: '기본적으로 중소기업확인서, 재무제표, 사업자등록증, 사업계획서가 필요하며, 벤처/이노비즈 기업은 인증서를 추가 제출합니다. 기업부설연구소 보유기업은 연구소신고필증을 제출하면 추가 혜택을 받을 수 있습니다.'
        }
      ]
    },
    {
      title: '2025년 신규 프로그램',
      icon: 'TrendingUp',
      faqs: [
        {
          id: 'new-1',
          question: '2025년 새로 추가된 정책자금은 어떤 것이 있나요?',
          answer: 'ESG 경영자금 한도 확대(15억→20억), 디지털전환자금 신규 출시, 친환경시설자금 금리 인하(2.0%→1.5%) 등이 주요 변경사항입니다. 또한 청년창업자금 지원 대상 확대, 스마트공장 구축지원 3,000억원 예산으로 최대 1억원 지원이 가능합니다.'
        },
        {
          id: 'new-2',
          question: '2025년 R&D 지원사업의 변경사항은?',
          answer: '혁신형 중소기업 R&D 예산이 2,500억원으로 확대되어 최대 10억원까지 지원받을 수 있습니다. 기업부설연구소 보유기업은 우선선정되며, 연구개발비 세액공제도 일반 25%에서 중소기업 40%로 상향 조정되었습니다.'
        },
        {
          id: 'new-3',
          question: '창업기업 세액감면 확대 내용은?',
          answer: '2025년부터 창업기업 세액감면 기간이 5년에서 7년으로 연장되었습니다. 벤처기업 특별세액감면도 20%에서 30%로 인상되어, 창업 초기 기업의 세부담을 대폭 경감할 수 있습니다.'
        }
      ]
    }
  ];

  // 아이콘 매핑 함수
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Info: Info,
      Medal: Medal,
      FileText: FileText,
      TrendingUp: TrendingUp,
      Building: Building,
      Users: Users,
      Award: Award,
      Star: Star,
      Factory: Factory,
      Cpu: Cpu
    };
    return iconMap[iconName] || Info;
  };

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
                <Gift className="w-4 h-4 mr-2" />
                2025년 최신 정보
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                2025년 정책자금
                <span className="block text-primary">완벽 가이드</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                저금리 대출부터 정부 지원금까지, 중소기업이 알아야 할 
                <strong className="text-primary font-semibold"> 모든 정책자금 정보</strong>를 한 곳에서 확인하세요.
              </p>

              {/* 핵심 통계 */}
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {policyFundStats.map((stat, index) => (
                  <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-card/30 dark:border-border/30">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color === 'green' ? 'text-emerald-600 dark:text-emerald-400' : stat.color === 'blue' ? 'text-primary' : stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-orange-600 dark:text-orange-400'}`} />
                      <div className="text-2xl font-bold text-foreground mb-2">
                        <AnimatedCounter
                          end={stat.value}
                          duration={2000}
                          startAnimation={startAnimation}
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
                  buttonText="정책자금 무료 상담"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                />
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  자금 종류 확인
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2025년 주요 변경사항 */}
        <section className="py-16 md:py-24 bg-background dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                2025년 업데이트
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                올해 달라진 정책자금
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                기업부설연구소 세액공제 확대, 무상지원금 대폭 증액으로 더 많은 혜택을 받아보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {changes2025.map((change, index) => (
                <Card key={index} className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-${change.color}-100 dark:bg-${change.color}-900/30 rounded-lg flex items-center justify-center mb-4`}>
                      <change.icon className={`w-6 h-6 text-${change.color}-600 dark:text-${change.color}-400`} />
                    </div>
                    <CardTitle className="text-lg text-foreground">{change.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{change.description}</p>
                    <Badge className={`bg-${change.color}-100 dark:bg-${change.color}-900/30 text-${change.color}-700 dark:text-${change.color}-300`}>
                      {change.impact}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 정책자금 종류별 분류 */}
        <section id="categories" className="py-16 bg-muted/30 dark:bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Calculator className="w-4 h-4 mr-2" />
                Policy Fund Categories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                정책자금 종류별 안내
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                기업의 성장 단계와 목적에 맞는 최적의 정책자금을 선택하세요
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {policyFundCategories.map((category, index) => (
                <Card key={index} className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                      </div>
                      <Badge className={`bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-700 dark:text-${category.color}-300`}>
                        {category.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground">{category.title}</CardTitle>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.funds.map((fund, fundIndex) => (
                        <div key={fundIndex} className="p-4 bg-accent/20 dark:bg-accent/10 rounded-lg border border-border/20">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-foreground">{fund.name}</h4>
                            <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400">
                              {fund.rate}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium text-foreground">한도:</span> {fund.limit}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">기간:</span> {fund.period}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 보증기관 안내 */}
        <section className="py-16 md:py-24 bg-background dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Guarantee Institutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                주요 보증기관 안내
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                2025년 통합보증심사시스템 도입으로 더 유리한 조건으로 정책자금을 지원받으세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guaranteeInstitutions.map((institution, index) => (
                <Card key={index} className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-foreground">{institution.name}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">{institution.abbr}</Badge>
                    </div>
                    <p className="text-muted-foreground">{institution.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">보증비율</p>
                        <p className="font-semibold text-primary">{institution.guaranteeRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">최대한도</p>
                        <p className="font-semibold text-primary">{institution.maxAmount}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">주요 특징</p>
                      <div className="flex flex-wrap gap-2">
                        {institution.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs border-border/40 text-muted-foreground hover:bg-accent/50">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{institution.contact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 신청 프로세스 */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                정책자금 신청 프로세스
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                체계적인 4단계 프로세스로 신속하게 정책자금을 지원받으세요
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {applicationProcess.map((process, index) => (
                  <Card key={index} className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {process.step}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{process.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 border-border/40 text-muted-foreground">
                            소요시간: {process.duration}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{process.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {process.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 기업부설연구소 설립 혜택 */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700 dark:border-purple-400 dark:text-purple-300">
                  <Factory className="w-4 h-4 mr-2" />
                  기업부설연구소 특화 혜택
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  연구소 설립으로 받는
                  <span className="block text-purple-600 dark:text-purple-400">특별 지원 혜택</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  기업부설연구소를 설립하면 정책자금뿐만 아니라 세액공제, 무상지원금 등 
                  다양한 정부 지원을 받을 수 있습니다.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Percent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">세액공제 40%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      연구개발비에 대해 최대 40% 세액공제 혜택을 받을 수 있습니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">일반기업</span>
                        <span className="font-semibold text-foreground">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">중소기업</span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">40%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        연간 최대 2억원까지 공제 가능
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">무상지원금</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      연구소 설립 및 운영에 필요한 자금을 무상으로 지원받습니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">설립지원금</span>
                        <span className="font-semibold text-foreground">최대 10억원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">장비구입비</span>
                        <span className="font-semibold text-foreground">최대 20억원</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        연구개발 목적 장비에 한함
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/40 bg-background/80 dark:bg-background/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">우선 지원</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      각종 정부 지원사업에서 우선 선정 및 가점 혜택을 받습니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">R&D 지원사업</span>
                        <span className="font-semibold text-foreground">10점 가점</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">정책자금 금리</span>
                        <span className="font-semibold text-foreground">0.5%p 우대</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        기술보증기금 우선 보증 대상
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        기업부설연구소 설립 요건
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                          <span>상시근로자 10인 이상 고용</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                          <span>연구전담인력 3인 이상 (학사 이상)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                          <span>독립된 연구시설 보유</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                          <span>연간 R&D 투자 매출액의 0.5% 이상</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/10 rounded-lg p-6">
                        <div className="text-4xl font-bold mb-2">95%</div>
                        <div className="text-lg mb-4">설립 성공률</div>
                        <Link 
                          href="/contact"
                          className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
                        >
                          연구소 설립 상담
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              정책자금 신청, 전문가와 함께하세요
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              복잡한 정책자금 신청 과정을 전문가가 도와드립니다. 
              <strong>무료 상담</strong>으로 최적의 자금 조달 방안을 찾아보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CalComPopup
                calLink="samsung-life-gfc-qjwjd4vhnr3cklsf"
                buttonText="무료 정책자금 상담 예약"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              />
              
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
                <span>정책자금 전문가 상담</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>맞춤형 자금 조달 계획</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>신청 서류 작성 지원</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>승인률 95% 실적</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Info className="h-3 w-3 mr-1" />
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  정책자금 FAQ
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  정책자금에 대한 궁금한 점들을 확인해보세요.
                  <br />
                  추가 궁금한 사항은 언제든 문의해주세요.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {policyFundsFaqCategories.map((category, categoryIndex) => {
                  const IconComponent = getIcon(category.icon);
                  return (
                    <div key={categoryIndex} className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {category.title}
                        </h3>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((item, itemIndex) => (
                          <AccordionItem 
                            key={itemIndex} 
                            value={`${categoryIndex}-${itemIndex}`}
                            className="border border-border/40 rounded-lg bg-background/80 dark:bg-background/60"
                          >
                            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-accent/50 rounded-t-lg">
                              <span className="font-medium text-foreground text-sm">
                                {item.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-muted-foreground">
                              <div className="whitespace-pre-line leading-relaxed text-sm">
                                {item.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Structured Data */}
      <Script id="policy-funds-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "2025년 정책자금 완벽 가이드 | 저금리 대출 + 지원금 최신 정보",
          "description": "2025년 최신 정책자금 완벽 가이드. 창업자금, 운영자금, 시설자금까지 저금리 대출정보. 중소기업 지원정책 전문가 상담",
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
            "@id": "https://familyoffice.life/policy-funds"
          }
        })}
      </Script>

      <Script id="service-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "정책자금 컨설팅 서비스",
          "description": "중소기업 정책자금 신청 지원 및 컨설팅 서비스",
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
          "serviceType": "정책자금 컨설팅",
          "areaServed": "대한민국",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW",
            "description": "무료 정책자금 상담"
          }
        })}
      </Script>

      <Script id="faq-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": policyFundsFaqCategories.flatMap(category => 
            category.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          )
        })}
      </Script>
    </>
  );
}