'use client';

import {
  Users,
  Shield,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Building,
  Scale,
  Heart,
  BookOpen,
  Target,
  TrendingUp,
  Calculator,
  Gavel,
  UserCheck,
  ClipboardList,
  Award,
  Briefcase,
  Phone,
  ArrowRight,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
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


// 인사노무 핵심 포인트 체크리스트
const hrLaborChecklist = {
  recruitment: {
    title: '채용 및 입사관리',
    icon: UserCheck,
    priority: 'high',
    items: [
      { id: 'job-posting', label: '채용공고 법적 요건 준수', risk: 'medium', deadline: '채용 시', critical: true },
      { id: 'interview-process', label: '면접과정 차별금지 준수', risk: 'high', deadline: '면접 시', critical: true },
      { id: 'employment-contract', label: '근로계약서 필수사항 기재', risk: 'high', deadline: '입사일 전', critical: true },
      { id: 'probation-period', label: '수습기간 설정 및 관리', risk: 'medium', deadline: '입사일', critical: false },
      { id: 'personal-info', label: '개인정보 수집·이용 동의', risk: 'high', deadline: '입사 시', critical: true },
      { id: 'orientation', label: '신입사원 오리엔테이션 실시', risk: 'low', deadline: '입사 후 1주', critical: false },
    ],
  },
  workingTime: {
    title: '근로시간 관리',
    icon: Clock,
    priority: 'critical',
    items: [
      { id: 'working-hours', label: '법정 근로시간 준수 (주 52시간)', risk: 'critical', deadline: '매주', critical: true },
      { id: 'overtime-management', label: '연장근로 한도 및 승인체계', risk: 'high', deadline: '실시간', critical: true },
      { id: 'break-time', label: '휴게시간 보장 (4시간당 30분)', risk: 'medium', deadline: '매일', critical: true },
      { id: 'flexible-work', label: '선택근무제 운영 규정', risk: 'low', deadline: '제도 도입 시', critical: false },
      { id: 'time-recording', label: '근로시간 기록 및 보관', risk: 'high', deadline: '매일', critical: true },
      { id: 'night-holiday', label: '야간·휴일근로 관리', risk: 'high', deadline: '해당 시', critical: true },
    ],
  },
  wagesLeave: {
    title: '임금 및 휴가관리',
    icon: DollarSign,
    priority: 'critical',
    items: [
      { id: 'minimum-wage', label: '최저임금 준수', risk: 'critical', deadline: '매월', critical: true },
      { id: 'wage-payment', label: '임금지급 원칙 준수 (매월 정기)', risk: 'high', deadline: '매월', critical: true },
      { id: 'overtime-pay', label: '연장·야간·휴일근로 수당 지급', risk: 'high', deadline: '해당월', critical: true },
      { id: 'annual-leave', label: '연차유급휴가 부여 및 관리', risk: 'high', deadline: '연간', critical: true },
      { id: 'special-leave', label: '각종 특별휴가 제도 운영', risk: 'medium', deadline: '해당 시', critical: false },
      { id: 'severance-pay', label: '퇴직금 적립 및 지급', risk: 'high', deadline: '퇴직 시', critical: true },
    ],
  },
  safetyHealth: {
    title: '안전보건 관리',
    icon: Shield,
    priority: 'critical',
    items: [
      { id: 'safety-education', label: '안전보건교육 실시', risk: 'high', deadline: '정기적', critical: true },
      { id: 'health-checkup', label: '건강진단 실시', risk: 'medium', deadline: '연 1-2회', critical: true },
      { id: 'safety-manager', label: '안전관리자 선임', risk: 'high', deadline: '상시 50인 이상', critical: true },
      { id: 'accident-reporting', label: '산업재해 발생 시 보고체계', risk: 'critical', deadline: '즉시', critical: true },
      { id: 'workplace-safety', label: '작업환경측정 및 개선', risk: 'medium', deadline: '정기적', critical: false },
      { id: 'safety-committee', label: '산업안전보건위원회 운영', risk: 'medium', deadline: '정기적', critical: false },
    ],
  },
  laborRelations: {
    title: '노사관계 관리',
    icon: Users,
    priority: 'high',
    items: [
      { id: 'employment-rules', label: '취업규칙 작성 및 신고', risk: 'high', deadline: '상시 10인 이상', critical: true },
      { id: 'disciplinary-action', label: '징계절차 및 기준 수립', risk: 'high', deadline: '필요 시', critical: true },
      { id: 'grievance-handling', label: '고충처리 절차 운영', risk: 'medium', deadline: '상시', critical: false },
      { id: 'union-relations', label: '노동조합 대응 및 관리', risk: 'high', deadline: '해당 시', critical: false },
      { id: 'workplace-harassment', label: '직장 내 괴롭힘 예방 및 대응', risk: 'high', deadline: '상시', critical: true },
      { id: 'discrimination', label: '차별금지 및 고용평등 준수', risk: 'high', deadline: '상시', critical: true },
    ],
  },
  compliance: {
    title: '법정 의무사항',
    icon: Scale,
    priority: 'critical',
    items: [
      { id: 'employment-insurance', label: '4대보험 가입 및 관리', risk: 'critical', deadline: '입사 시', critical: true },
      { id: 'labor-inspection', label: '근로감독관 감독 대응', risk: 'high', deadline: '감독 시', critical: true },
      { id: 'document-retention', label: '법정 서류 작성 및 보관', risk: 'high', deadline: '3-5년간', critical: true },
      { id: 'foreign-workers', label: '외국인 근로자 관리', risk: 'medium', deadline: '해당 시', critical: false },
      { id: 'maternity-protection', label: '모성보호 제도 운영', risk: 'high', deadline: '해당 시', critical: true },
      { id: 'equal-employment', label: '남녀고용평등법 준수', risk: 'high', deadline: '상시', critical: true },
    ],
  },
};

// 인사노무 위험도 평가 기준
const riskLevels = {
  critical: { label: '매우 높음', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' },
  high: { label: '높음', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-300' },
  medium: { label: '보통', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300' },
  low: { label: '낮음', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-300' },
};

// 주요 법령 업데이트
const recentLegalUpdates = [
  {
    date: '2024.01.01',
    title: '최저임금 인상',
    content: '2024년 최저임금 시간당 9,860원으로 인상',
    impact: 'critical',
    action: '급여체계 전면 점검 필요',
  },
  {
    date: '2024.07.01',
    title: '중대재해처벌법 강화',
    content: '안전보건관리체계 구축 의무 확대',
    impact: 'high',
    action: '안전관리체계 점검 및 강화',
  },
  {
    date: '2023.10.19',
    title: '직장 내 괴롭힘 방지법',
    content: '예방교육 및 신고처리 절차 의무화',
    impact: 'high',
    action: '예방교육 프로그램 도입',
  },
  {
    date: '2023.05.01',
    title: '육아휴직 확대',
    content: '육아휴직 분할사용 횟수 확대',
    impact: 'medium',
    action: '휴직 관리 시스템 정비',
  },
];

const HRLaborManagementPage = () => {
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
  const calculateCategoryProgress = (category: keyof typeof hrLaborChecklist) => {
    const items = hrLaborChecklist[category].items;
    const checkedCount = items.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / items.length) * 100;
  };

  // 전체 진행률 계산
  const calculateOverallProgress = () => {
    const allItems = Object.values(hrLaborChecklist).flatMap(cat => cat.items);
    const checkedCount = allItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / allItems.length) * 100;
  };

  // Critical 항목 진행률
  const calculateCriticalProgress = () => {
    const criticalItems = Object.values(hrLaborChecklist)
      .flatMap(cat => cat.items)
      .filter(item => item.critical);
    const checkedCritical = criticalItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCritical / criticalItems.length) * 100;
  };

  // 위험도별 항목 수 계산
  const calculateRiskDistribution = () => {
    const allItems = Object.values(hrLaborChecklist).flatMap(cat => cat.items);
    const distribution = {
      critical: allItems.filter(item => item.risk === 'critical').length,
      high: allItems.filter(item => item.risk === 'high').length,
      medium: allItems.filter(item => item.risk === 'medium').length,
      low: allItems.filter(item => item.risk === 'low').length,
    };
    return distribution;
  };

  const overallProgress = calculateOverallProgress();
  const criticalProgress = calculateCriticalProgress();
  const riskDistribution = calculateRiskDistribution();

  // 컴플라이언스 위험도 평가
  const getComplianceRisk = () => {
    if (criticalProgress < 30) return { level: '매우 위험', color: 'text-red-700 dark:text-red-400', bgColor: 'bg-red-50', darkBgColor: 'dark:bg-red-950/20', darkBorderColor: 'dark:border-red-800/30' };
    if (criticalProgress < 60) return { level: '위험', color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50', darkBgColor: 'dark:bg-orange-950/20', darkBorderColor: 'dark:border-orange-800/30' };
    if (criticalProgress < 80) return { level: '주의', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-50', darkBgColor: 'dark:bg-yellow-950/20', darkBorderColor: 'dark:border-yellow-800/30' };
    return { level: '안전', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50', darkBgColor: 'dark:bg-green-950/20', darkBorderColor: 'dark:border-green-800/30' };
  };

  const complianceRisk = getComplianceRisk();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" size="lg" className="mb-6" animation="fade">
              <BookOpen className="h-3 w-3 mr-1" />
              삼성생명 인사노무 핵심포인트
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-slide-up">
              인사노무 관리 완벽 가이드
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              중소기업을 위한
              <span className="block mt-2 text-primary font-semibold">
                법정 의무사항 및 리스크 관리 체크리스트
              </span>
            </p>

            {/* Status Dashboard */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">전체 준수율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(overallProgress)}%
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/80 backdrop-blur-sm dark:border-orange-800/30 dark:bg-orange-950/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">필수 항목</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {Math.round(criticalProgress)}%
                  </div>
                  <Progress value={criticalProgress} className="h-2 bg-orange-100 dark:bg-orange-950/50" />
                </CardContent>
              </Card>

              <Card className={`${complianceRisk.bgColor} ${complianceRisk.darkBgColor} ${complianceRisk.darkBorderColor} backdrop-blur-sm`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">컴플라이언스</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${complianceRisk.color} mb-2`}>
                    {complianceRisk.level}
                  </div>
                  <div className="flex items-center gap-1">
                    {complianceRisk.level.includes('위험') && <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                    {complianceRisk.level === '주의' && <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                    {complianceRisk.level === '안전' && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">고위험 항목</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {riskDistribution.critical + riskDistribution.high}개
                  </div>
                  <div className="text-xs text-muted-foreground">즉시 점검 필요</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                buttonText="전문가 상담 예약"
                eventType="consultation"
                trigger={
                  <div className="inline-flex items-center">
                    <Users className="h-5 w-5 mr-2" />
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

        {/* Legal Updates Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">최근 법령 변경사항</h2>
              <p className="text-lg text-muted-foreground">
                놓치면 안 되는 주요 노동법 개정 내용과 대응방안
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentLegalUpdates.map((update, index) => (
                <Card key={index} className={`relative overflow-hidden ${
                  update.impact === 'critical' ? 'border-red-200 bg-red-50/50' :
                  update.impact === 'high' ? 'border-orange-200 bg-orange-50/50' :
                  'border-blue-200 bg-blue-50/50'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={
                        update.impact === 'critical' ? 'destructive' :
                        update.impact === 'high' ? 'secondary' : 'default'
                      }>
                        {update.impact === 'critical' ? '긴급' :
                         update.impact === 'high' ? '중요' : '일반'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{update.date}</span>
                    </div>
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <CardDescription>{update.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white/50 p-3 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">조치사항</h4>
                      <p className="text-sm text-muted-foreground">{update.action}</p>
                    </div>
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
              <h2 className="text-3xl font-bold mb-4">인사노무 상세 체크리스트</h2>
              <p className="text-lg text-muted-foreground">
                6개 영역 36개 항목으로 구성된 종합 인사노무 관리 체크리스트
              </p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full mb-8">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="recruitment">채용</TabsTrigger>
                <TabsTrigger value="workingTime">근로시간</TabsTrigger>
                <TabsTrigger value="wagesLeave">임금휴가</TabsTrigger>
                <TabsTrigger value="safetyHealth">안전보건</TabsTrigger>
                <TabsTrigger value="laborRelations">노사관계</TabsTrigger>
                <TabsTrigger value="compliance">법정의무</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {Object.entries(hrLaborChecklist).map(([key, category]) => {
                  const Icon = category.icon;
                  const progress = calculateCategoryProgress(key as keyof typeof hrLaborChecklist);
                  const priorityBadge = category.priority === 'critical' ? 'destructive' :
                                       category.priority === 'high' ? 'secondary' : 'default';

                  return (
                    <Card key={key} className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            <CardTitle className="flex items-center gap-2">
                              {category.title}
                              <Badge variant={priorityBadge} size="sm">
                                {category.priority === 'critical' ? '매우중요' :
                                 category.priority === 'high' ? '중요' : '일반'}
                              </Badge>
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
                          {category.items.map((item) => {
                            const riskLevel = riskLevels[item.risk as keyof typeof riskLevels];
                            
                            return (
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
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={item.critical ? 'font-medium' : ''}>
                                        {item.label}
                                      </span>
                                      {item.critical && (
                                        <Badge variant="destructive" size="sm">필수</Badge>
                                      )}
                                      <Badge 
                                        variant="outline" 
                                        size="sm" 
                                        className={`${riskLevel.color} ${riskLevel.bgColor} ${riskLevel.borderColor}`}
                                      >
                                        {riskLevel.label}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      시점: {item.deadline}
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
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              {Object.entries(hrLaborChecklist).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <CardTitle className="flex items-center gap-2">
                          {category.title}
                          <Badge variant={
                            category.priority === 'critical' ? 'destructive' :
                            category.priority === 'high' ? 'secondary' : 'default'
                          } size="sm">
                            {category.priority === 'critical' ? '매우중요' :
                             category.priority === 'high' ? '중요' : '일반'}
                          </Badge>
                        </CardTitle>
                      </div>
                      <CardDescription>
                        진행률: {Math.round(calculateCategoryProgress(key as keyof typeof hrLaborChecklist))}%
                      </CardDescription>
                      <Progress 
                        value={calculateCategoryProgress(key as keyof typeof hrLaborChecklist)} 
                        className="h-2 mt-3" 
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item) => {
                          const riskLevel = riskLevels[item.risk as keyof typeof riskLevels];
                          
                          return (
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
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={item.critical ? 'font-medium' : ''}>
                                      {item.label}
                                    </span>
                                    {item.critical && (
                                      <Badge variant="destructive" size="sm">필수</Badge>
                                    )}
                                    <Badge 
                                      variant="outline" 
                                      size="sm" 
                                      className={`${riskLevel.color} ${riskLevel.bgColor} ${riskLevel.borderColor}`}
                                    >
                                      {riskLevel.label}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    시점: {item.deadline}
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
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Action Section */}
            <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {criticalProgress < 50 && '긴급 인사노무 점검이 필요합니다'}
                      {criticalProgress >= 50 && criticalProgress < 80 && '양호한 관리 수준입니다'}
                      {criticalProgress >= 80 && '훌륭한 인사노무 관리 상태입니다'}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {criticalProgress < 50 && '법적 리스크가 높습니다. 즉시 전문가 상담이 필요합니다.'}
                      {criticalProgress >= 50 && criticalProgress < 80 && '몇 가지 영역의 개선이 필요합니다.'}
                      {criticalProgress >= 80 && '지속적인 관리로 법적 리스크를 최소화하고 있습니다.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CalComPopup
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                      buttonText="전문가 상담 예약"
                      eventType="consultation"
                      trigger={
                        <div className="inline-flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          전문가 상담 예약
                        </div>
                      }
                    />

                    <Button variant="outline" size="lg" asChild>
                      <Link href="/ceo-checklist">
                        <Target className="h-5 w-5 mr-2" />
                        CEO 경영진단 보기
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg">
                      <Download className="h-5 w-5 mr-2" />
                      체크리스트 다운로드
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>긴급 인사노무 상담: 0502-5550-8700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk-based Recommendations */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {criticalProgress < 60 && (
                <>
                  <Card className="border-red-200 bg-red-50/50 dark:border-red-800/30 dark:bg-red-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
                      <CardTitle className="text-card-foreground">법적 리스크 관리</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        근로기준법, 산업안전보건법 등 법적 의무사항 위반 위험이 높습니다.
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        긴급 점검 신청
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800/30 dark:bg-orange-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                      <CardTitle className="text-card-foreground">안전보건 강화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        산업재해 예방과 근로자 안전을 위한 체계적인 관리가 필요합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        안전관리 컨설팅
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800/30 dark:bg-blue-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-card-foreground">취업규칙 정비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        취업규칙 작성·변경 및 신고 의무를 준수하고 내용을 정비해야 합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        규칙 정비 지원
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {criticalProgress >= 60 && (
                <>
                  <Card className="border-green-200 bg-green-50/50 dark:border-green-800/30 dark:bg-green-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                      <CardTitle className="text-card-foreground">우수한 관리 수준</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        체계적인 인사노무 관리가 이루어지고 있습니다. 지속적인 개선이 중요합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        고도화 컨설팅
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800/30 dark:bg-blue-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-card-foreground">HR 시스템 개선</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        디지털 HR 시스템과 데이터 기반 인사관리로 효율성을 높여보세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        HR 시스템 상담
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800/30 dark:bg-purple-950/20 backdrop-blur-sm">
                    <CardHeader>
                      <Award className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                      <CardTitle className="text-card-foreground">조직문화 개선</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        법적 준수를 넘어 건강한 조직문화 구축으로 경쟁력을 강화하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        조직진단 상담
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HRLaborManagementPage;