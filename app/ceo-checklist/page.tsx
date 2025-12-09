'use client';

import {
    AlertCircle,
    Briefcase,
    Building,
    Calculator,
    CheckCircle2,
    ChevronRight,
    Crown,
    Download,
    FileCheck,
    Heart,
    Phone,
    Shield,
    Target,
    TrendingUp,
    Users,
    XCircle,
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


// CEO 체크리스트 카테고리별 항목
const checklistCategories = {
  financial: {
    title: '재무 및 세무 관리',
    icon: Calculator,
    items: [
      { id: 'tax-planning', label: '법인세 절세 전략 수립 여부', critical: true },
      { id: 'financial-audit', label: '정기적인 재무 감사 실시', critical: true },
      { id: 'cash-flow', label: '현금흐름 관리 시스템 구축', critical: true },
      { id: 'expense-optimization', label: '경비 최적화 프로그램 운영', critical: false },
      { id: 'investment-strategy', label: '잉여자금 투자 전략 수립', critical: false },
      { id: 'tax-compliance', label: '세무 컴플라이언스 체계 구축', critical: true },
    ],
  },
  risk: {
    title: '리스크 관리',
    icon: Shield,
    items: [
      { id: 'serious-accident', label: '중대재해처벌법 대응 체계 구축', critical: true },
      { id: 'business-insurance', label: '기업종합보험 가입 및 정기 검토', critical: true },
      { id: 'key-person', label: '핵심인력 보험 가입', critical: false },
      { id: 'compliance-system', label: '컴플라이언스 관리 시스템 운영', critical: true },
      { id: 'crisis-response', label: '위기대응 매뉴얼 수립', critical: false },
      { id: 'legal-review', label: '정기적 법무 검토 체계', critical: false },
    ],
  },
  succession: {
    title: '가업승계 준비',
    icon: Users,
    items: [
      { id: 'succession-plan', label: '가업승계 마스터플랜 수립', critical: true },
      { id: 'stock-structure', label: '지분 구조 최적화', critical: true },
      { id: 'family-council', label: '가족경영협의회 운영', critical: false },
      { id: 'next-gen-education', label: '차세대 경영자 교육 프로그램', critical: true },
      { id: 'inheritance-gift-tax', label: '상속·증여세 절세 전략 수립', critical: true },
      { id: 'family-charter', label: '가족헌장 제정', critical: false },
    ],
  },
  growth: {
    title: '성장 전략',
    icon: TrendingUp,
    items: [
      { id: 'ma-strategy', label: 'M&A 전략 수립', critical: false },
      { id: 'digital-transformation', label: '디지털 전환 로드맵', critical: true },
      { id: 'esg-management', label: 'ESG 경영 체계 구축', critical: true },
      { id: 'global-expansion', label: '해외 진출 전략', critical: false },
      { id: 'innovation-system', label: '혁신 시스템 구축', critical: false },
      { id: 'strategic-partnership', label: '전략적 파트너십 구축', critical: false },
    ],
  },
  personal: {
    title: '개인 자산관리',
    icon: Heart,
    items: [
      { id: 'personal-portfolio', label: '개인 자산 포트폴리오 구축', critical: true },
      { id: 'retirement-planning', label: '은퇴 설계 수립', critical: true },
      { id: 'health-insurance', label: '건강보험 최적화', critical: false },
      { id: 'real-estate', label: '부동산 투자 전략', critical: false },
      { id: 'trust-structure', label: '신탁 구조 활용', critical: false },
      { id: 'wealth-preservation', label: '자산보전 전략 수립', critical: true },
    ],
  },
};

const CEOChecklistPage = () => {
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
  const calculateCategoryProgress = (category: keyof typeof checklistCategories) => {
    const items = checklistCategories[category].items;
    const checkedCount = items.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / items.length) * 100;
  };

  // 전체 진행률 계산
  const calculateOverallProgress = () => {
    const allItems = Object.values(checklistCategories).flatMap(cat => cat.items);
    const checkedCount = allItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCount / allItems.length) * 100;
  };

  // Critical 항목 진행률
  const calculateCriticalProgress = () => {
    const criticalItems = Object.values(checklistCategories)
      .flatMap(cat => cat.items)
      .filter(item => item.critical);
    const checkedCritical = criticalItems.filter(item => checkedItems.has(item.id)).length;
    return (checkedCritical / criticalItems.length) * 100;
  };

  const overallProgress = calculateOverallProgress();
  const criticalProgress = calculateCriticalProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="outline" size="lg" className="mb-6">
              <FileCheck className="h-3 w-3 mr-1" />
              삼성생명 CEO 체크리스트
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              CEO 경영 진단 체크리스트
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              성공적인 기업 경영과 가업승계를 위한
              <span className="block mt-2 text-primary font-semibold">
                5대 핵심 영역 자가진단
              </span>
            </p>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">전체 진행률</CardTitle>
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
                  <CardTitle className="text-lg text-card-foreground">핵심 항목 완료율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {Math.round(criticalProgress)}%
                  </div>
                  <Progress value={criticalProgress} className="h-2 bg-orange-100 dark:bg-orange-950/50" />
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground">리스크 레벨</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold mb-2 ${
                    criticalProgress < 50 
                      ? 'text-red-600 dark:text-red-400' 
                      : criticalProgress < 80 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {criticalProgress < 50 ? '높음' : criticalProgress < 80 ? '보통' : '낮음'}
                  </div>
                  <div className="flex items-center gap-1">
                    {criticalProgress < 50 && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                    {criticalProgress >= 50 && criticalProgress < 80 && (
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                    {criticalProgress >= 80 && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Checklist Tabs */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-8">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="financial">재무세무</TabsTrigger>
                <TabsTrigger value="risk">리스크</TabsTrigger>
                <TabsTrigger value="succession">승계</TabsTrigger>
                <TabsTrigger value="growth">성장</TabsTrigger>
                <TabsTrigger value="personal">개인자산</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {Object.entries(checklistCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  const progress = calculateCategoryProgress(key as keyof typeof checklistCategories);

                  return (
                    <Card key={key} className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="bg-muted/30 dark:bg-muted/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            <CardTitle className="text-card-foreground">{category.title}</CardTitle>
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
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={item.id}
                                checked={checkedItems.has(item.id)}
                                onCheckedChange={() => toggleCheck(item.id)}
                              />
                              <label
                                htmlFor={item.id}
                                className="flex-1 cursor-pointer select-none"
                              >
                                <span className={item.critical ? 'font-medium' : ''}>
                                  {item.label}
                                </span>
                                {item.critical && (
                                  <Badge variant="destructive" size="sm" className="ml-2">
                                    필수
                                  </Badge>
                                )}
                              </label>
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

              {Object.entries(checklistCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-card-foreground">{category.title}</CardTitle>
                      </div>
                      <CardDescription>
                        진행률: {Math.round(calculateCategoryProgress(key as keyof typeof checklistCategories))}%
                      </CardDescription>
                      <Progress 
                        value={calculateCategoryProgress(key as keyof typeof checklistCategories)} 
                        className="h-2 mt-3" 
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              id={`${key}-${item.id}`}
                              checked={checkedItems.has(item.id)}
                              onCheckedChange={() => toggleCheck(item.id)}
                            />
                            <label
                              htmlFor={`${key}-${item.id}`}
                              className="flex-1 cursor-pointer select-none"
                            >
                              <span className={item.critical ? 'font-medium' : ''}>
                                {item.label}
                              </span>
                              {item.critical && (
                                <Badge variant="destructive" size="sm" className="ml-2">
                                  필수
                                </Badge>
                              )}
                            </label>
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

            {/* Premium Family Office Upgrade Section */}
            <section className="py-16 bg-gradient-to-br from-amber-50/50 to-blue-50/50 dark:from-amber-950/30 dark:to-blue-950/30 rounded-2xl mt-12">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <Badge variant="outline" className="mb-6 border-amber-200 dark:border-amber-700/50 bg-gradient-to-r from-amber-50/80 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/50 text-amber-800 dark:text-amber-300 shadow-lg backdrop-blur-sm">
                    <Crown className="h-4 w-4 mr-2" />
                    Family Office Excellence
                  </Badge>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                    <span className="text-premium-gold">CEO 경영진단</span>을 넘어선{' '}
                    <span className="text-premium-navy">패밀리오피스</span>
                  </h3>
                  
                  <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    개별 경영 이슈에서 <span className="font-bold text-premium-navy">통합 자산·경영 솔루션</span>으로 업그레이드하세요.
                    성공한 CEO들이 선택한 차별화된 패밀리오피스 서비스를 경험해보세요.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl mb-4 mx-auto">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-premium-navy dark:text-amber-300">경영·재무 통합관리</h4>
                      <p className="text-muted-foreground text-sm">기업 경영진단부터 자산관리까지 원스톱 통합 솔루션</p>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl mb-4 mx-auto">
                        <Target className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-premium-navy dark:text-blue-300">전략적 성장지원</h4>
                      <p className="text-muted-foreground text-sm">CEO 개인 자산과 기업 성장을 동시에 고려한 장기 전략</p>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl mb-4 mx-auto">
                        <Shield className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-premium-navy dark:text-purple-300">리스크 총괄관리</h4>
                      <p className="text-muted-foreground text-sm">경영·세무·법무·보험을 통합한 종합 리스크관리</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/family-office-center" 
                      className="inline-flex items-center justify-center px-8 py-4 bg-premium-navy text-white text-lg font-semibold rounded-2xl hover:shadow-premium-navy transition-all duration-300 hover:scale-105"
                    >
                      <Crown className="h-6 w-6 mr-2" />
                      패밀리오피스 센터 보기
                      <ChevronRight className="h-6 w-6 ml-2" />
                    </Link>
                    
                    <Link 
                      href="/fp-center" 
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-premium-navy text-premium-navy text-lg font-semibold rounded-2xl hover:bg-premium-navy hover:text-white transition-all duration-300"
                    >
                      <Users className="h-6 w-6 mr-2" />
                      전문 FP 상담
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Section */}
            <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 backdrop-blur-sm border border-primary/10 dark:border-primary/20">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground dark:text-white">
                      체크리스트 결과를 바탕으로 맞춤형 솔루션을 제안해드립니다
                    </h3>
                    <p className="text-lg text-muted-foreground dark:text-gray-300">
                      {criticalProgress < 50 && '필수 항목의 준비가 시급합니다. 전문가 상담을 권해드립니다.'}
                      {criticalProgress >= 50 && criticalProgress < 80 && '양호한 수준이나 몇 가지 개선이 필요합니다.'}
                      {criticalProgress >= 80 && '우수한 경영 관리 수준입니다. 지속적인 관리가 중요합니다.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    <CalComPopup
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors w-full h-full min-h-[3.5rem]"
                      buttonText="무료 경영진단 상담"
                      eventType="consultation"
                      trigger={
                        <div className="inline-flex items-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          무료 경영진단 상담
                        </div>
                      }
                    />

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/tax-strategy">
                        <Calculator className="h-5 w-5 mr-2" />
                        절세 전략 보기
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/corporate-tax-checklist">
                        <FileCheck className="h-5 w-5 mr-2" />
                        법인세 결산 체크리스트
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/hr-labor-management">
                        <Users className="h-5 w-5 mr-2" />
                        인사노무 관리 가이드
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/business-succession-strategy">
                        <Crown className="h-5 w-5 mr-2" />
                        전략적 가업승계
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/inheritance-gift-tax">
                        <Heart className="h-5 w-5 mr-2" />
                        상속·증여세 가이드
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Link href="/fp-center">
                        <Users className="h-5 w-5 mr-2" />
                        FP센터 종합진단
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg" className="w-full h-full min-h-[3.5rem] dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
                      <Download className="h-5 w-5 mr-2" />
                      체크리스트 다운로드
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>긴급 상담: 0502-5550-8700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {criticalProgress < 50 && (
                <>
                  <Card className="border-red-200 bg-red-50/50 backdrop-blur-sm dark:border-red-800/30 dark:bg-red-950/20">
                    <CardHeader>
                      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
                      <CardTitle className="text-card-foreground">긴급 대응 필요</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        중대재해처벌법, 세무 리스크 등 법적 위험에 노출되어 있습니다.
                      </p>
                      <Button variant="destructive" size="sm" className="w-full" asChild>
                        <Link href="/serious-accident-law">
                          즉시 대응하기
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50/50 backdrop-blur-sm dark:border-orange-800/30 dark:bg-orange-950/20">
                    <CardHeader>
                      <Target className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                      <CardTitle className="text-card-foreground">가업승계 준비</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        체계적인 승계 계획 수립으로 상속세를 50% 이상 절감할 수 있습니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/business-succession-strategy">
                          승계 전략 보기
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm dark:border-blue-800/30 dark:bg-blue-950/20">
                    <CardHeader>
                      <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-card-foreground">보험 최적화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        기업 리스크 관리와 절세를 동시에 해결하는 맞춤형 보험 설계가 필요합니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/corporate-life-insurance">
                          보험 전략 보기
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {criticalProgress >= 50 && criticalProgress < 80 && (
                <>
                  <Card className="border-yellow-200 bg-yellow-50/50 backdrop-blur-sm dark:border-yellow-800/30 dark:bg-yellow-950/20">
                    <CardHeader>
                      <TrendingUp className="h-8 w-8 text-yellow-700 dark:text-yellow-400 mb-2" />
                      <CardTitle className="text-card-foreground">성장 전략 강화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        디지털 전환과 ESG 경영으로 지속가능한 성장 기반을 구축하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        성장 전략 상담
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50/50 backdrop-blur-sm dark:border-green-800/30 dark:bg-green-950/20">
                    <CardHeader>
                      <Calculator className="h-8 w-8 text-green-700 dark:text-green-400 mb-2" />
                      <CardTitle className="text-card-foreground">세무 최적화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        법인세와 소득세를 동시에 절감하는 통합 세무 전략을 수립하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/tax-strategy">
                          절세 전략 보기
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50/50 backdrop-blur-sm dark:border-purple-800/30 dark:bg-purple-950/20">
                    <CardHeader>
                      <Users className="h-8 w-8 text-purple-700 dark:text-purple-400 mb-2" />
                      <CardTitle className="text-card-foreground">승계 계획 정교화</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        차세대 경영자 교육과 지분 구조 최적화로 안정적인 승계를 준비하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        승계 컨설팅
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {criticalProgress >= 80 && (
                <>
                  <Card className="border-green-300 bg-green-50/70 backdrop-blur-sm dark:border-green-700/40 dark:bg-green-950/30">
                    <CardHeader>
                      <CheckCircle2 className="h-8 w-8 text-green-700 dark:text-green-400 mb-2" />
                      <CardTitle className="text-card-foreground">우수 경영 관리</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        훌륭한 경영 관리 수준입니다. 지속적인 모니터링과 개선을 추천드립니다.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        프리미엄 자문 서비스
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-300 bg-blue-50/70 backdrop-blur-sm dark:border-blue-700/40 dark:bg-blue-950/30">
                    <CardHeader>
                      <Building className="h-8 w-8 text-blue-700 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-card-foreground">M&A 기회 탐색</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        안정적인 경영 기반 위에 외부 성장 기회를 적극적으로 탐색해보세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        M&A 자문 서비스
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-300 bg-purple-50/70 backdrop-blur-sm dark:border-purple-700/40 dark:bg-purple-950/30">
                    <CardHeader>
                      <Heart className="h-8 w-8 text-purple-700 dark:text-purple-400 mb-2" />
                      <CardTitle className="text-card-foreground">가족 자산 설계</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-card-foreground/80">
                        기업 자산과 개인 자산의 균형잡힌 포트폴리오를 구축하세요.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        패밀리오피스 상담
                        <ChevronRight className="h-4 w-4 ml-1" />
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

export default CEOChecklistPage;