'use client';

import {
  Calculator,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building,
  TrendingUp,
  Shield,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  Download,
  Phone,
  BookOpen,
  Briefcase,
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


// 결산 후 필수 점검 포인트 체크리스트
const postSettlementChecklist = {
  taxDeclaration: {
    title: '법인세 신고 관련',
    icon: FileText,
    critical: true,
    items: [
      { id: 'tax-return-filing', label: '법인세 신고서 작성 및 제출', deadline: '결산일로부터 3개월', critical: true },
      { id: 'tax-payment', label: '법인세 납부', deadline: '신고기한 내', critical: true },
      { id: 'withholding-tax', label: '원천징수세액 정산', deadline: '결산일로부터 3개월', critical: true },
      { id: 'vat-settlement', label: '부가가치세 확정신고', deadline: '1월, 7월 25일', critical: true },
      { id: 'local-tax', label: '지방소득세 신고', deadline: '법인세 신고 후 10일', critical: true },
      { id: 'tax-reconciliation', label: '세무조정 검토 및 최적화', deadline: '신고 전', critical: false },
    ],
  },
  financialReview: {
    title: '재무제표 검토',
    icon: Calculator,
    critical: true,
    items: [
      { id: 'financial-audit', label: '외부감사 대응', deadline: '결산일로부터 90일', critical: true },
      { id: 'accounting-standards', label: '회계기준 적용 검토', deadline: '결산 시', critical: true },
      { id: 'asset-valuation', label: '자산 재평가 필요성 검토', deadline: '결산 시', critical: false },
      { id: 'provision-review', label: '충당금 설정 적정성 검토', deadline: '결산 시', critical: false },
      { id: 'related-party', label: '특수관계자 거래 공시', deadline: '결산 시', critical: true },
      { id: 'subsequent-events', label: '후발사건 검토', deadline: '감사보고서일까지', critical: false },
    ],
  },
  taxOptimization: {
    title: '절세 전략 검토',
    icon: TrendingUp,
    critical: false,
    items: [
      { id: 'deduction-review', label: '손금산입 항목 최대화 검토', deadline: '신고 전', critical: false },
      { id: 'depreciation-method', label: '감가상각 방법 최적화', deadline: '신고 전', critical: false },
      { id: 'tax-credit', label: '세액공제 항목 누락 검토', deadline: '신고 전', critical: true },
      { id: 'loss-carryforward', label: '결손금 이월공제 활용', deadline: '신고 전', critical: false },
      { id: 'research-credit', label: '연구개발비 세액공제 검토', deadline: '신고 전', critical: false },
      { id: 'investment-deduction', label: '투자세액공제 적용 검토', deadline: '신고 전', critical: false },
    ],
  },
  compliance: {
    title: '컴플라이언스 점검',
    icon: Shield,
    critical: true,
    items: [
      { id: 'transfer-pricing', label: '이전가격 문서화 의무 이행', deadline: '결산일로부터 12개월', critical: true },
      { id: 'tax-haven-rule', label: '조세피난처 규정 검토', deadline: '신고 시', critical: false },
      { id: 'cfc-rule', label: 'CFC 규정 적용 검토', deadline: '신고 시', critical: false },
      { id: 'beps-action', label: 'BEPS 대응 방안 검토', deadline: '지속적', critical: false },
      { id: 'documentation', label: '세무관련 서류 보관', deadline: '5년간', critical: true },
      { id: 'risk-assessment', label: '세무리스크 평가', deadline: '연간', critical: true },
    ],
  },
  planning: {
    title: '차기년도 계획',
    icon: Target,
    critical: false,
    items: [
      { id: 'tax-planning', label: '차기년도 세무계획 수립', deadline: '차기 사업연도 시작 전', critical: false },
      { id: 'cash-flow-plan', label: '세금 납부 현금흐름 계획', deadline: '차기 사업연도 시작 전', critical: true },
      { id: 'system-upgrade', label: '세무회계 시스템 개선', deadline: '필요 시', critical: false },
      { id: 'staff-training', label: '세무담당자 교육 계획', deadline: '연간', critical: false },
      { id: 'advisor-selection', label: '세무자문 업체 선정', deadline: '필요 시', critical: false },
      { id: 'monitoring-system', label: '세무모니터링 체계 구축', deadline: '지속적', critical: true },
    ],
  },
};

// 결산 스케줄 및 중요 일정
const settlementSchedule = [
  {
    period: '결산일 직후',
    tasks: ['재무제표 작성', '세무조정 검토', '감사 준비'],
    deadline: '결산일 + 1개월',
    priority: 'high',
  },
  {
    period: '결산 후 2개월',
    tasks: ['외부감사 완료', '법인세 신고서 검토', '세무자문'],
    deadline: '결산일 + 2개월',
    priority: 'high',
  },
  {
    period: '결산 후 3개월',
    tasks: ['법인세 신고', '법인세 납부', '지방소득세 신고'],
    deadline: '결산일 + 3개월',
    priority: 'critical',
  },
  {
    period: '결산 후 6개월',
    tasks: ['세무조사 대비', '차기년도 계획', '시스템 개선'],
    deadline: '결산일 + 6개월',
    priority: 'medium',
  },
];

const CorporateTaxChecklistPage = () => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = React.useState('all');

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

  // 카테고리별 진행률 계산
  const calculateCategoryProgress = (category: keyof typeof postSettlementChecklist) => {
    const items = postSettlementChecklist[category].items;
    const checkedCount = items.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / items.length) * 100;
  };

  // 전체 진행률 계산
  const calculateOverallProgress = () => {
    const allItems = Object.values(postSettlementChecklist).flatMap(cat => cat.items);
    const checkedCount = allItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / allItems.length) * 100;
  };

  // Critical 항목 진행률
  const calculateCriticalProgress = () => {
    const criticalItems = Object.values(postSettlementChecklist)
      .flatMap(cat => cat.items)
      .filter(item => item.critical);
    const checkedCritical = criticalItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCritical / criticalItems.length) * 100;
  };

  const overallProgress = calculateOverallProgress();
  const criticalProgress = calculateCriticalProgress();

  // 위험도 평가
  const getRiskLevel = () => {
    if (criticalProgress < 50) return { level: '높음', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (criticalProgress < 80) return { level: '보통', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { level: '낮음', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" size="lg" className="mb-6">
              <BookOpen className="h-3 w-3 mr-1" />
              삼성생명 법인세 세일즈북
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              결산 후 필수 점검 포인트
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              법인 결산 완료 후 놓치기 쉬운
              <span className="block mt-2 text-primary font-semibold">
                세무 및 재무 핵심 체크포인트
              </span>
            </p>

            {/* Current Status Overview */}
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">전체 진행률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(overallProgress)}%
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">필수 항목</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {Math.round(criticalProgress)}%
                  </div>
                  <Progress value={criticalProgress} className="h-2" />
                </CardContent>
              </Card>

              <Card className={riskLevel.bgColor}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">위험도</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${riskLevel.color} mb-2`}>
                    {riskLevel.level}
                  </div>
                  <div className="flex items-center gap-1">
                    {riskLevel.level === '높음' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                    {riskLevel.level === '보통' && <Clock className="h-5 w-5 text-yellow-600" />}
                    {riskLevel.level === '낮음' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">D-Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    D-45
                  </div>
                  <div className="text-xs text-muted-foreground">법인세 신고까지</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                buttonText="전문가 상담 예약"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    전문가 상담 예약
                  </div>
                }
              />

              <Button variant="outline" size="lg" asChild>
                <Link href="#checklist">
                  <FileCheck className="h-5 w-5 mr-2" />
                  체크리스트 시작하기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Settlement Schedule Timeline */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">결산 후 주요 일정</h2>
              <p className="text-lg text-muted-foreground">
                법인 결산 완료 후 반드시 챙겨야 할 핵심 업무와 마감일정
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {settlementSchedule.map((schedule, index) => (
                <Card key={index} className={`relative overflow-hidden ${
                  schedule.priority === 'critical' ? 'border-red-200 bg-red-50/50' :
                  schedule.priority === 'high' ? 'border-orange-200 bg-orange-50/50' :
                  'border-blue-200 bg-blue-50/50'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{schedule.period}</CardTitle>
                      <Badge variant={
                        schedule.priority === 'critical' ? 'destructive' :
                        schedule.priority === 'high' ? 'secondary' : 'default'
                      }>
                        {schedule.priority === 'critical' ? '긴급' :
                         schedule.priority === 'high' ? '중요' : '일반'}
                      </Badge>
                    </div>
                    <CardDescription className="font-medium text-foreground">
                      {schedule.deadline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {schedule.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Checklist */}
        <section id="checklist" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">상세 체크리스트</h2>
              <p className="text-lg text-muted-foreground">
                5개 영역 30개 항목으로 구성된 종합적인 결산 후 점검 체크리스트
              </p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-8">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="taxDeclaration">신고</TabsTrigger>
                <TabsTrigger value="financialReview">재무</TabsTrigger>
                <TabsTrigger value="taxOptimization">절세</TabsTrigger>
                <TabsTrigger value="compliance">컴플라이언스</TabsTrigger>
                <TabsTrigger value="planning">계획</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {Object.entries(postSettlementChecklist).map(([key, category]) => {
                  const Icon = category.icon;
                  const progress = calculateCategoryProgress(key as keyof typeof postSettlementChecklist);

                  return (
                    <Card key={key} className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            <CardTitle className="flex items-center gap-2">
                              {category.title}
                              {category.critical && (
                                <Badge variant="destructive" size="sm">필수</Badge>
                              )}
                            </CardTitle>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round(progress)}% 완료
                          </div>
                        </div>
                        <Progress value={progress} className="h-2 mt-3" />
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={item.id}
                                checked={checkedItems.has(item.id)}
                                onCheckedChange={() => toggleCheck(item.id)}
                              />
                              <div className="flex-1 min-w-0">
                                <label
                                  htmlFor={item.id}
                                  className="cursor-pointer select-none block"
                                >
                                  <div className={`${item.critical ? 'font-medium' : ''} mb-1`}>
                                    {item.label}
                                    {item.critical && (
                                      <Badge variant="destructive" size="sm" className="ml-2">
                                        필수
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    마감: {item.deadline}
                                  </div>
                                </label>
                              </div>
                              <div className="flex items-center">
                                {checkedItems.has(item.id) ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-gray-300" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              {Object.entries(postSettlementChecklist).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <CardTitle className="flex items-center gap-2">
                          {category.title}
                          {category.critical && (
                            <Badge variant="destructive" size="sm">필수 영역</Badge>
                          )}
                        </CardTitle>
                      </div>
                      <CardDescription>
                        진행률: {Math.round(calculateCategoryProgress(key as keyof typeof postSettlementChecklist))}%
                      </CardDescription>
                      <Progress 
                        value={calculateCategoryProgress(key as keyof typeof postSettlementChecklist)} 
                        className="h-2 mt-3" 
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              id={`${key}-${item.id}`}
                              checked={checkedItems.has(item.id)}
                              onCheckedChange={() => toggleCheck(item.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <label
                                htmlFor={`${key}-${item.id}`}
                                className="cursor-pointer select-none block"
                              >
                                <div className={`${item.critical ? 'font-medium' : ''} mb-1`}>
                                  {item.label}
                                  {item.critical && (
                                    <Badge variant="destructive" size="sm" className="ml-2">
                                      필수
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  마감: {item.deadline}
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center">
                              {checkedItems.has(item.id) ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-gray-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Action Section based on progress */}
            <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {criticalProgress < 50 && '긴급 대응이 필요합니다'}
                      {criticalProgress >= 50 && criticalProgress < 80 && '잘 진행되고 있습니다'}
                      {criticalProgress >= 80 && '완벽한 준비 상태입니다'}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {criticalProgress < 50 && '필수 항목들의 즉시 완료가 필요합니다. 전문가 상담을 권해드립니다.'}
                      {criticalProgress >= 50 && criticalProgress < 80 && '몇 가지 항목만 더 완료하시면 됩니다.'}
                      {criticalProgress >= 80 && '모든 필수 항목이 완료되어 세무리스크가 최소화되었습니다.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                      buttonText="전문가 상담 예약"
                      eventType="consultation"
                      trigger={
                        <div className="inline-flex items-center">
                          <Calculator className="h-5 w-5 mr-2" />
                          전문가 상담 예약
                        </div>
                      }
                    />

                    <Button variant="outline" size="lg" asChild>
                      <Link href="/tax-strategy">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        절세 전략 보기
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg">
                      <Download className="h-5 w-5 mr-2" />
                      체크리스트 다운로드
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>긴급 세무 상담: 0502-5550-8700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Recommendations */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {criticalProgress < 70 && (
                <>
                  <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                    <CardHeader>
                      <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                      <CardTitle>신고기한 임박</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        법인세 신고 마감일이 다가오고 있습니다. 빠른 대응이 필요합니다.
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        긴급 상담 신청
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                    <CardHeader>
                      <Shield className="h-8 w-8 text-orange-600 mb-2" />
                      <CardTitle>절세 기회 검토</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        신고 전 마지막 절세 기회를 놓치지 마세요. 전문가 검토가 중요합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/tax-strategy">
                          절세 전략 확인
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardHeader>
                      <Users className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle>전문가 지원</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        복잡한 세무 이슈는 전문가와 함께 해결하는 것이 안전합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        전문가 매칭
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {criticalProgress >= 70 && (
                <>
                  <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                    <CardHeader>
                      <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                      <CardTitle>우수한 준비도</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        체계적인 결산 후 관리가 이루어지고 있습니다. 지속적인 관리가 중요합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        정기 모니터링 신청
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardHeader>
                      <Target className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle>고도화 전략</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        기본적인 관리를 넘어서 전략적 세무관리로 발전시켜보세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        고급 전략 상담
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                    <CardHeader>
                      <Lightbulb className="h-8 w-8 text-purple-600 mb-2" />
                      <CardTitle>차기년도 준비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        다음 결산을 위한 사전 계획과 시스템 구축을 시작하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        연간 계획 수립
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 관련 도구 연결 섹션 */}
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">완벽한 세무 관리를 위한 통합 솔루션</h2>
              <p className="text-lg text-muted-foreground">
                법인세 결산부터 전체 경영진단까지, 체계적인 관리 도구들을 함께 활용하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">절세의 미학</CardTitle>
                  <CardDescription>
                    법인세, 소득세, 상속세 절세를 위한 체계적인 전략과 시뮬레이션
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      법인세 30% 절감 전략
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      상속세 50% 절감 솔루션
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      실시간 절세 시뮬레이터
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/tax-strategy">
                      절세 전략 확인하기
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">CEO 경영진단</CardTitle>
                  <CardDescription>
                    5대 핵심영역 30개 항목으로 진단하는 종합적인 경영 건전성 평가
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      재무·세무 건전성 진단
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      가업승계 준비도 평가
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      리스크 관리 점검
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/ceo-checklist">
                      경영진단 시작하기
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">인사노무 관리</CardTitle>
                  <CardDescription>
                    6개 영역 36개 항목으로 구성된 완벽한 인사노무 컴플라이언스 가이드
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      노동법 준수 관리
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      안전보건 관리
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      노사관계 관리
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="/hr-labor-management">
                      인사노무 가이드 보기
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">통합 솔루션</CardTitle>
                  <CardDescription>
                    패밀리오피스 전체 솔루션으로 완벽한 자산관리 체계 구축
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      통합 자산관리
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      상속·증여 설계
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      세무·법률 자문
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                    <Link href="/solutions">
                      전체 솔루션 보기
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-4">
                🔥 지금 진단받고 맞춤형 솔루션을 무료로 받아보세요
              </p>
              <CalComPopup
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors shadow-xl"
                buttonText="무료 통합 상담 예약"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    무료 통합 상담 예약
                  </div>
                }
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateTaxChecklistPage;