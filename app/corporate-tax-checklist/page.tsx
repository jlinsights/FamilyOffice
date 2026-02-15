'use client';

import { motion } from 'framer-motion';
import {
  Calculator,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { PremiumCard, SectionHeader, StatusBadge } from './components';

// 결산 후 필수 점검 포인트 체크리스트
const postSettlementChecklist = {
  taxDeclaration: {
    title: '법인세 신고',
    description: '신고 기한 내 필수 제출 서류 및 납부 확인',
    icon: FileText,
    critical: true,
    items: [
      {
        id: 'tax-return-filing',
        label: '법인세 신고서 작성 및 제출',
        deadline: '결산일로부터 3개월',
        critical: true,
        desc: '재무상태표, 손익계산서, 이익잉여금처분계산서 등 필수 첨부서류 확인',
      },
      {
        id: 'tax-payment',
        label: '법인세 납부',
        deadline: '신고기한 내',
        critical: true,
        desc: '분납 신청 여부 및 납부기한 확인',
      },
      {
        id: 'withholding-tax',
        label: '원천징수세액 정산',
        deadline: '결산일로부터 3개월',
        critical: true,
        desc: '이자배당소득 원천징수영수증 발급 및 제출',
      },
      {
        id: 'vat-settlement',
        label: '부가가치세 확정신고',
        deadline: '1월, 7월 25일',
        critical: true,
        desc: '매입매출장과 신고서 대조 확인',
      },
      {
        id: 'local-tax',
        label: '지방소득세 신고',
        deadline: '법인세 신고 후 1개월',
        critical: true,
        desc: '법인세법에 따라 계산된 세액의 10%',
      },
      {
        id: 'tax-reconciliation',
        label: '세무조정 검토 및 최적화',
        deadline: '신고 전',
        critical: false,
        desc: '세무조정계산서 꼼꼼한 검토로 누락 방지',
      },
    ],
  },
  financialReview: {
    title: '재무제표 검토',
    description: '회계 투명성 확보 및 재무 건전성 진단',
    icon: Calculator,
    critical: true,
    items: [
      {
        id: 'financial-audit',
        label: '외부감사 대응',
        deadline: '결산일로부터 90일',
        critical: true,
        desc: '감사보고서 수령 및 주주총회 승인',
      },
      {
        id: 'accounting-standards',
        label: '회계기준 적용 검토',
        deadline: '결산 시',
        critical: true,
        desc: 'K-GAAP 또는 K-IFRS 적용 적정성 확인',
      },
      {
        id: 'asset-valuation',
        label: '자산 재평가 필요성 검토',
        deadline: '결산 시',
        critical: false,
        desc: '토지, 건물 등 유형자산의 시가 반영 여부',
      },
      {
        id: 'provision-review',
        label: '충당금 설정 적정성 검토',
        deadline: '결산 시',
        critical: false,
        desc: '퇴직급여충당금, 대손충당금 등 설정액 검토',
      },
      {
        id: 'related-party',
        label: '특수관계자 거래 공시',
        deadline: '결산 시',
        critical: true,
        desc: '가지급금, 가수금 등 특수관계자 거래 내역 정리',
      },
      {
        id: 'subsequent-events',
        label: '후발사건 검토',
        deadline: '감사보고서일까지',
        critical: false,
        desc: '결산일 이후 발생한 중요 사건 반영',
      },
    ],
  },
  taxOptimization: {
    title: '절세 전략',
    description: '합법적인 세금 절감 방안 모색',
    icon: TrendingUp,
    critical: false,
    items: [
      {
        id: 'deduction-review',
        label: '손금산입 항목 최대화',
        deadline: '신고 전',
        critical: false,
        desc: '접대비, 기부금 등 한도 초과 여부 확인',
      },
      {
        id: 'depreciation-method',
        label: '감가상각 방법 최적화',
        deadline: '신고 전',
        critical: false,
        desc: '내용연수 및 상각방법 변경 검토',
      },
      {
        id: 'tax-credit',
        label: '세액공제 항목 누락 검토',
        deadline: '신고 전',
        critical: true,
        desc: '고용창출투자세액공제 등 각종 공제 혜택 확인',
      },
      {
        id: 'loss-carryforward',
        label: '결손금 이월공제 활용',
        deadline: '신고 전',
        critical: false,
        desc: '이월결손금 공제 한도 및 기한 확인',
      },
      {
        id: 'research-credit',
        label: '연구개발비 세액공제',
        deadline: '신고 전',
        critical: false,
        desc: '기업부설연구소 등 R&D 관련 비용 공제',
      },
      {
        id: 'investment-deduction',
        label: '투자세액공제 적용',
        deadline: '신고 전',
        critical: false,
        desc: '설비 투자 등에 대한 세액공제 요건 검토',
      },
    ],
  },
  compliance: {
    title: '컴플라이언스',
    description: '법적 의무 준수 및 리스크 관리',
    icon: Shield,
    critical: true,
    items: [
      {
        id: 'transfer-pricing',
        label: '이전가격 문서화',
        deadline: '결산일로부터 12개월',
        critical: true,
        desc: '국제거래가 있는 경우 이전가격보고서 작성',
      },
      {
        id: 'tax-haven-rule',
        label: '조세피난처 규정 검토',
        deadline: '신고 시',
        critical: false,
        desc: '조세피난처 소재 자회사 관련 규제 확인',
      },
      {
        id: 'cfc-rule',
        label: 'CFC 규정 적용 검토',
        deadline: '신고 시',
        critical: false,
        desc: '특정외국법인 유보소득 배당간주 규정 검토',
      },
      {
        id: 'beps-action',
        label: 'BEPS 대응 방안 검토',
        deadline: '지속적',
        critical: false,
        desc: '다국적기업 조세회피 방지 프로젝트 대응',
      },
      {
        id: 'documentation',
        label: '세무관련 서류 보관',
        deadline: '5년간',
        critical: true,
        desc: '증빙서류 원본 보관 및 전자문서 관리',
      },
      {
        id: 'risk-assessment',
        label: '세무리스크 평가',
        deadline: '연간',
        critical: true,
        desc: '잠재적 세추징 리스크 사전 진단',
      },
    ],
  },
  planning: {
    title: '차기 계획',
    description: '미래를 위한 전략적 세무 계획',
    icon: Target,
    critical: false,
    items: [
      {
        id: 'tax-planning',
        label: '차기년도 세무계획',
        deadline: '차기 사업연도 시작 전',
        critical: false,
        desc: '예상 매출 및 비용에 따른 세금 예산 수립',
      },
      {
        id: 'cash-flow-plan',
        label: '현금흐름 계획',
        deadline: '차기 사업연도 시작 전',
        critical: true,
        desc: '세금 납부 시기에 맞춘 자금 운용 계획',
      },
      {
        id: 'system-upgrade',
        label: '시스템 개선',
        deadline: '필요 시',
        critical: false,
        desc: 'ERP 등 회계 프로그램 고도화 검토',
      },
      {
        id: 'staff-training',
        label: '세무담당자 교육',
        deadline: '연간',
        critical: false,
        desc: '개정 세법 및 실무 교육 지원',
      },
      {
        id: 'advisor-selection',
        label: '세무자문 선정',
        deadline: '필요 시',
        critical: false,
        desc: '전문적인 세무 서비스를 위한 파트너 선정',
      },
      {
        id: 'monitoring-system',
        label: '모니터링 체계',
        deadline: '지속적',
        critical: true,
        desc: '월별/분기별 결산 및 세무 이슈 점검 프로세스',
      },
    ],
  },
};

const settlementSchedule = [
  {
    period: 'D-Day',
    title: '결산일',
    tasks: ['재고실사', '현금시재 확인'],
    priority: 'high',
  },
  {
    period: 'D+30',
    title: '재무제표 확정',
    tasks: ['계정별 원장 마감', '세무조정 기초자료 준비'],
    priority: 'high',
  },
  {
    period: 'D+60',
    title: '감사보고서 제출',
    tasks: ['외부감사 완료', '주주총회 승인'],
    priority: 'critical',
  },
  {
    period: 'D+90',
    title: '법인세 신고/납부',
    tasks: ['최종 세액 확정', '신고서 제출 및 납부'],
    priority: 'critical',
  },
];

const CorporateTaxChecklistPage = () => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(
    new Set()
  );
  const [activeTab, setActiveTab] = React.useState('taxDeclaration');

  // 체크리스트 토글
  const toggleCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  // 진행률 계산 로직 (기존 유지)
  const calculateProgress = (items: any[]) => {
    const checkedCount = items.filter(item => checkedItems.has(item.id)).length;
    return items.length > 0 ? (checkedCount / items.length) * 100 : 0;
  };

  const allItems = Object.values(postSettlementChecklist).flatMap(
    cat => cat.items
  );
  const criticalItems = allItems.filter(item => item.critical);

  const overallProgress = calculateProgress(allItems);
  const criticalProgress = calculateProgress(criticalItems);

  // 위험도 평가
  const getRiskStatus = () => {
    if (criticalProgress < 50)
      return {
        level: '위험',
        color: 'text-red-500',
        desc: '즉각적인 조치가 필요합니다.',
      };
    if (criticalProgress < 80)
      return {
        level: '주의',
        color: 'text-orange-500',
        desc: '주요 항목을 점검해주세요.',
      };
    return {
      level: '안정',
      color: 'text-green-500',
      desc: '관리가 잘 되고 있습니다.',
    };
  };

  const riskStatus = getRiskStatus();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Header />

      <main className="pt-20 pb-20">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden bg-premium-navy dark:bg-slate-900 text-white py-24 px-4">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>

          <div className="relative max-w-6xl mx-auto text-center space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm border-white/30 text-white backdrop-blur-md"
              >
                삼성생명 법인 컨설팅
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
                Corporate Tax
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                  Checklist & Strategy
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                성공적인 법인 경영의 완성은 완벽한 세무 결산에서 시작됩니다.
                <br className="hidden md:block" />
                법인세 신고부터 절세 전략까지, 전문가 수준의 체크리스트로
                빈틈없이 준비하세요.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <CalComPopup
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-500 hover:to-amber-600 font-semibold px-8 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
                buttonText="전문가 무료 상담 신청"
                eventType="consultation"
              />
              <Link
                href="#checklist-start"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'rounded-full px-8 py-6 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm'
                )}
              >
                체크리스트 시작하기
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Status Dashboard */}
        <section className="relative -mt-16 px-4 z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard className="p-6 flex flex-col items-center justify-center text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t-4 border-t-amber-400">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                전체 진행률
              </h3>
              <div className="text-4xl font-playfair font-bold text-slate-900 dark:text-white mb-2">
                {Math.round(overallProgress)}%
              </div>
              <Progress
                value={overallProgress}
                className="h-1.5 w-full bg-slate-100 dark:bg-slate-700"
                indicatorClassName="bg-amber-500"
              />
            </PremiumCard>

            <PremiumCard className="p-6 flex flex-col items-center justify-center text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t-4 border-t-blue-500">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                필수 항목 완료율
              </h3>
              <div className="text-4xl font-playfair font-bold text-slate-900 dark:text-white mb-2">
                {Math.round(criticalProgress)}%
              </div>
              <Progress
                value={criticalProgress}
                className="h-1.5 w-full bg-slate-100 dark:bg-slate-700"
                indicatorClassName="bg-blue-500"
              />
            </PremiumCard>

            <PremiumCard className="p-6 flex flex-col items-center justify-center text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t-4 border-t-slate-500">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                현재 리스크 수준
              </h3>
              <div
                className={`text-3xl font-playfair font-bold mb-2 ${riskStatus.color}`}
              >
                {riskStatus.level}
              </div>
              <p className="text-xs text-muted-foreground">{riskStatus.desc}</p>
            </PremiumCard>
          </div>
        </section>

        {/* Main Content Area */}
        <section id="checklist-start" className="max-w-6xl mx-auto px-4 py-20">
          <SectionHeader
            title="Comprehensive Tax Checklist"
            subtitle="법인 운영에 필요한 5가지 핵심 영역을 체계적으로 점검합니다."
          />

          <Tabs
            defaultValue="taxDeclaration"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-10 overflow-x-auto pb-4">
              <TabsList className="bg-white dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm inline-flex">
                {Object.entries(postSettlementChecklist).map(
                  ([key, category]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="rounded-full px-6 py-2.5 data-[state=active]:bg-premium-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                    >
                      {category.title}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
            </div>

            {Object.entries(postSettlementChecklist).map(([key, category]) => {
              const Icon = category.icon;
              const catProgress = calculateProgress(category.items);

              return (
                <TabsContent
                  key={key}
                  value={key}
                  className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
                >
                  <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-2xl font-bold font-playfair text-slate-900 dark:text-white">
                        {Math.round(catProgress)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Category Completion
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.items.map(item => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.01 }}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                          checkedItems.has(item.id)
                            ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-amber-400/50 dark:hover:border-amber-400/50'
                        }`}
                      >
                        <div className="p-5 flex items-start gap-4 h-full">
                          <Checkbox
                            id={item.id}
                            checked={checkedItems.has(item.id)}
                            onCheckedChange={() => toggleCheck(item.id)}
                            className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:text-white border-slate-300 dark:border-slate-600 w-5 h-5 rounded-md transition-colors"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <label
                                htmlFor={item.id}
                                className={`font-medium text-base cursor-pointer select-none transition-colors ${checkedItems.has(item.id) ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}
                              >
                                {item.label}
                              </label>
                              <StatusBadge
                                status={item.critical ? 'critical' : 'normal'}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-1 rounded w-fit">
                              <Clock className="w-3 h-3" />
                              <span>{item.deadline}</span>
                            </div>
                          </div>
                        </div>
                        {checkedItems.has(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-green-500/10 p-4 rounded-full"
                            >
                              <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        {/* Schedule Timeline Section (Redesigned) */}
        <section className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader
              title="Key Settlement Schedule"
              subtitle="법인 결산의 골든타임, 놓치지 말아야 할 주요 일정입니다."
            />

            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {settlementSchedule.map((schedule, index) => (
                  <div key={index} className="group">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                      <div className="mb-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${schedule.priority === 'critical' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {schedule.period}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {schedule.title}
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4 flex-1">
                        {schedule.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                      {schedule.priority === 'critical' && (
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-premium-navy text-white border-none p-10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-900 opacity-90"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-colors duration-700"></div>

              <div className="relative z-10 space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold">
                  Are You Ready
                  <br />
                  For Tax Season?
                </h2>
                <p className="text-lg text-slate-200 max-w-2xl mx-auto">
                  복잡한 법인세무 확인은 끝내셨나요? <br />
                  이제 전문 컨설턴트와 함께 최적의 절세 전략을 수립할
                  시간입니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <CalComPopup
                    className="bg-white text-premium-navy hover:bg-slate-100 font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105"
                    buttonText="전문가 무료 상담하기"
                    eventType="consultation"
                  />
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 border-white/30 text-white hover:bg-white/10 text-lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    체크리스트 PDF 다운로드
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CorporateTaxChecklistPage;
