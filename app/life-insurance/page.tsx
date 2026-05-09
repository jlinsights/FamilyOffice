'use client';

import {
  AlertTriangle,
  Award,
  Building,
  Calculator,
  CheckCircle,
  Clock,
  Crown,
  DollarSign,
  FileCheck,
  Heart,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { BreadcrumbNavigation } from '@/components/seo/breadcrumb-navigation';
import { StructuredData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo/structured-data';
import { cn } from '@/lib/utils';

const LifeInsurancePage = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const successCases = [
    {
      title: '제조업 K사 대표 (55세)',
      situation: '가업승계 준비, 상속세 15억 예상',
      solution: '법인명의 종신보험 10억 + 개인명의 5억',
      result: '상속세 50% 절감 (7.5억 → 3.7억) + 퇴직금 15억 확보',
      premium: '연 2억원 보험료',
      taxBenefit: '법인 손금처리 연 2억',
      roi: '15년 후 해약시 150% 수익률',
    },
    {
      title: '건설업 P사 회장 (62세)',
      situation: '차세대 승계 완료, 개인 자산보전 필요',
      solution: '개인명의 종신보험 20억 + 배우자 10억',
      result: '상속세 납부재원 30억 확보 + 비과세 승계',
      premium: '연 4.5억원 보험료',
      taxBenefit: '상속세 100% 해결',
      roi: '상속시 300% 보장',
    },
    {
      title: 'IT기업 L사 대표 (48세)',
      situation: '기업공개 준비, 핵심인력 리스크 관리',
      solution: '경영진 정기보험 5억 + 법인 종신보험 8억',
      result: 'IPO 평가 시 기업가치 10% 상승 효과',
      premium: '연 1.2억원 보험료',
      taxBenefit: 'Key Person 리스크 완전 차단',
      roi: '기업가치 100억 증가',
    },
  ];

  const comparisonData = [
    {
      category: '보장 기간',
      personal: '평생보장 (100세까지)',
      corporate: '평생보장 (계약유지시)',
      advantage: '개인/법인 모두 평생 안심',
    },
    {
      category: '세무 혜택',
      personal: '상속세 비과세 (상속공제)',
      corporate: '보험료 손금처리 100%',
      advantage: '이중 세무혜택 극대화',
    },
    {
      category: '현금화',
      personal: '해약환급금 개인 자산',
      corporate: '해약환급금 퇴직금 활용',
      advantage: '유동성 확보 + 목적 활용',
    },
    {
      category: '승계 연계',
      personal: '상속세 납부재원',
      corporate: '가업승계 안정화',
      advantage: '완벽한 승계 설계',
    },
  ];

  // 구조화된 데이터
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '개인/법인 종신보험 설계 서비스',
    provider: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      url: 'https://familyoffices.vip',
    },
    description: 'CEO와 고액자산가를 위한 개인/법인 종신보험 전문 설계 서비스',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: '$$$$',
    },
    areaServed: 'KR',
    serviceType: '종신보험 설계 컨설팅',
  };

  // 검색엔진 최적화 구조화 데이터 추가
  const faqItems = [
    {
      question: '개인종신보험과 법인종신보험 중 어떤 것이 더 유리한가요?',
      answer:
        '일반적으로 두 가지를 조합하는 것이 가장 유리합니다. 법인종신보험으로 보험료 손금처리 혜택을 받고, 개인종신보험으로 상속세 비과세 혜택을 확보하는 것이 세무상 최적입니다. 구체적인 비율은 기업 규모, 개인 자산, 상속세 예상액 등을 종합 분석하여 결정합니다.',
    },
    {
      question: '법인명의 종신보험의 보험료가 정말 100% 손금처리 가능한가요?',
      answer:
        '네, 법인이 임직원을 피보험자로 하여 가입한 종신보험의 보험료는 현행 법인세법상 100% 손금처리가 가능합니다. 다만, 수익자 지정 방법과 약관 조건에 따라 세무상 취급이 달라질 수 있어 전문가와 상담 후 설계하시는 것이 중요합니다.',
    },
    {
      question: '종신보험으로 상속세를 어떻게 절감할 수 있나요?',
      answer:
        '종신보험은 두 가지 방법으로 상속세를 절감합니다. 첫째, 개인명의 종신보험의 사망보험금은 상속세 과세대상에서 제외됩니다. 둘째, 상속 발생 시 즉시 현금화가 가능해 상속세 납부재원으로 활용할 수 있어 다른 자산을 매각할 필요가 없습니다.',
    },
    {
      question: '건강상 문제가 있어도 종신보험 가입이 가능한가요?',
      answer:
        '기존 질병이 있더라도 가입 가능한 상품들이 있습니다. 간편심사형 상품, 무진단형 상품 등 다양한 선택지가 있으며, 보험사별로 인수기준이 다르므로 여러 보험사를 비교 검토하여 최적의 상품을 찾을 수 있습니다.',
    },
    {
      question:
        '종신보험의 해약환급금을 퇴직금으로 활용할 때 세무상 혜택이 있나요?',
      answer:
        '법인명의 종신보험의 해약환급금을 임원 퇴직금으로 지급할 경우, 퇴직소득세 과세대상이 되어 근로소득세보다 낮은 세율이 적용됩니다. 또한 퇴직소득 공제 혜택도 받을 수 있어 세무상 매우 유리합니다.',
    },
    {
      question: '종신보험 가입 후 보장내용을 변경할 수 있나요?',
      answer:
        '대부분의 종신보험은 계약 후에도 보장금액 증액, 납입방법 변경, 수익자 변경 등이 가능합니다. 다만, 증액의 경우 재심사가 필요하고, 변경 시 세무상 영향을 검토해야 하므로 전문가와 상담 후 진행하시는 것을 권합니다.',
    },
  ];
  const faqData = generateStructuredData('FAQPage', faqItems);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <StructuredData data={structuredData} />
      <StructuredData data={faqData} />
      <Header />

      <main className="pt-20">
        {/* 브레드크럼 네비게이션 */}
        <div className="container mx-auto px-6 py-4">
          <BreadcrumbNavigation
            customItems={[
              { name: '홈', url: 'https://familyoffices.vip' },
              { name: '솔루션', url: 'https://familyoffices.vip/solutions' },
              {
                name: '개인/법인 종신보험',
                url: 'https://familyoffices.vip/life-insurance',
                isCurrentPage: true,
              },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6" size="lg">
                <Crown className="h-4 w-4 mr-2" />
                CEO 전용 맞춤 종신보험
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-primary">평생보장</span> +{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  세무최적화
                </span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                  CEO를 위한 <strong>개인/법인 종신보험</strong>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                <strong>중견기업 CEO</strong>와{' '}
                <strong>고액자산가 (30억+)</strong>를 위한
                <br />
                <span className="text-primary font-semibold">
                  평생보장 + 상속세 해결 + 퇴직금 확보
                </span>{' '}
                통합 솔루션
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
                <CalComPopup
                  buttonText="무료 종신보험 설계 상담"
                  size="lg"
                  className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
                />
                <Link
                  href="#comparison"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'px-8 py-4 text-lg font-bold'
                  )}
                >
                  설계 비교 보기
                </Link>
              </div>

              {/* 핵심 수치 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    평생
                  </div>
                  <div className="text-sm text-muted-foreground">보장기간</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">손금처리</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    50%+
                  </div>
                  <div className="text-sm text-muted-foreground">평균 절세</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    1000억+
                  </div>
                  <div className="text-sm text-muted-foreground">설계 실적</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 가치 제안 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                왜 <span className="text-primary">CEO에게</span> 종신보험이
                필수인가?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                성공한 기업가일수록 <strong>예측 불가능한 리스크</strong>에
                대비해야 합니다.
                <br />
                종신보험은{' '}
                <span className="font-semibold text-primary">
                  CEO 유고시 기업 안정성 확보
                </span>
                부터{' '}
                <span className="font-semibold text-primary">
                  체계적인 가업승계
                </span>
                까지 해결하는 핵심 도구입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl text-red-600 dark:text-red-400">
                    CEO 유고시 리스크
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    핵심 경영진 부재로 인한
                    <br />
                    <strong>기업가치 급락</strong> 및 <strong>경영 공백</strong>
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-center text-red-500 dark:text-red-400">
                      ⚠️ 주가 하락 (평균 30-50%)
                    </div>
                    <div className="flex items-center justify-center text-red-500 dark:text-red-400">
                      ⚠️ 금융기관 신용도 하락
                    </div>
                    <div className="flex items-center justify-center text-red-500 dark:text-red-400">
                      ⚠️ 핵심 사업 중단 위험
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl text-orange-600 dark:text-orange-400">
                    상속세 부담
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    고액 자산가의 경우
                    <br />
                    <strong>상속세율 최대 50%</strong> 부담
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-center text-orange-500 dark:text-orange-400">
                      💰 자산 100억 → 상속세 30억+
                    </div>
                    <div className="flex items-center justify-center text-orange-500 dark:text-orange-400">
                      💰 현금 부족 시 자산 매각
                    </div>
                    <div className="flex items-center justify-center text-orange-500 dark:text-orange-400">
                      💰 가업승계 계획 차질
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 border-primary/50 dark:border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    종신보험 솔루션
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    <strong>평생보장</strong> + <strong>세무혜택</strong>
                    <br />
                    모든 리스크를 <strong>완벽 차단</strong>
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-center text-green-500 dark:text-green-400">
                      ✅ CEO 유고시 보험금 즉시 지급
                    </div>
                    <div className="flex items-center justify-center text-green-500 dark:text-green-400">
                      ✅ 상속세 납부재원 확보
                    </div>
                    <div className="flex items-center justify-center text-green-500 dark:text-green-400">
                      ✅ 법인 손금처리 세무혜택
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 개인 vs 법인 종신보험 비교 */}
        <section id="comparison" className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">개인</span> vs{' '}
                <span className="text-blue-600 dark:text-blue-400">법인</span>{' '}
                종신보험 완벽 비교
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                개인명의와 법인명의 종신보험의 <strong>차이점과 장단점</strong>
                을 정확히 이해하고
                <br />
                <span className="font-semibold text-primary">최적의 조합</span>
                으로 설계하는 것이 핵심입니다.
              </p>
            </div>

            <Tabs defaultValue="comparison" className="max-w-6xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="comparison" className="font-semibold">
                  <Target className="h-4 w-4 mr-2" />
                  핵심 비교
                </TabsTrigger>
                <TabsTrigger value="personal" className="font-semibold">
                  <Heart className="h-4 w-4 mr-2" />
                  개인종신보험
                </TabsTrigger>
                <TabsTrigger value="corporate" className="font-semibold">
                  <Building className="h-4 w-4 mr-2" />
                  법인종신보험
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comparison">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold">
                            비교 항목
                          </th>
                          <th className="text-center py-4 px-4 font-semibold text-primary">
                            개인종신보험
                          </th>
                          <th className="text-center py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                            법인종신보험
                          </th>
                          <th className="text-center py-4 px-4 font-semibold text-green-600 dark:text-green-400">
                            통합의 장점
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-muted/30"
                          >
                            <td className="py-4 px-4 font-semibold">
                              {item.category}
                            </td>
                            <td className="py-4 px-4 text-center text-sm">
                              {item.personal}
                            </td>
                            <td className="py-4 px-4 text-center text-sm">
                              {item.corporate}
                            </td>
                            <td className="py-4 px-4 text-center text-sm font-medium text-green-600">
                              {item.advantage}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personal">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-6 w-6 mr-2 text-primary" />
                        개인종신보험의 장점
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">
                            상속세 비과세 혜택
                          </div>
                          <div className="text-sm text-muted-foreground">
                            법정상속인 수령 시 상속세 과세 제외
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">즉시 유동성 확보</div>
                          <div className="text-sm text-muted-foreground">
                            사망 즉시 보험금으로 상속세 납부 가능
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">개인 자산 보전</div>
                          <div className="text-sm text-muted-foreground">
                            기업 리스크와 분리된 안전한 자산
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calculator className="h-6 w-6 mr-2 text-orange-600" />
                        개인종신보험 활용법
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <div className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                          추천 설계 방법
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            • <strong>보험금액:</strong> 예상 상속세의 120-150%
                          </div>
                          <div>
                            • <strong>수익자:</strong> 배우자 + 자녀 비율 설정
                          </div>
                          <div>
                            • <strong>납입방법:</strong> 전기납 또는 단축납
                          </div>
                          <div>
                            • <strong>연계상품:</strong> 배우자 종신보험 동시
                            가입
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="corporate">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-6 w-6 mr-2 text-blue-600" />
                        법인종신보험의 장점
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">
                            보험료 100% 손금처리
                          </div>
                          <div className="text-sm text-muted-foreground">
                            법인세 절감으로 실질 보험료 부담 감소
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">
                            해약환급금 퇴직금 활용
                          </div>
                          <div className="text-sm text-muted-foreground">
                            CEO 퇴직시 목돈 확보 + 세무상 유리
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">기업 신용도 향상</div>
                          <div className="text-sm text-muted-foreground">
                            금융기관 평가 시 CEO 리스크 관리 인정
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                        법인종신보험 활용법
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          추천 설계 방법
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            • <strong>보험금액:</strong> 연매출의 50-100%
                          </div>
                          <div>
                            • <strong>수익자:</strong> 법인 (일부 가족 수익자)
                          </div>
                          <div>
                            • <strong>납입방법:</strong> 정기납 (현금흐름 고려)
                          </div>
                          <div>
                            • <strong>연계활용:</strong> 임원퇴직금 + 상속자금
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 성공 사례 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">실제 고객</span> 성공 사례
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <strong>중견기업 CEO</strong>들이 종신보험으로 얻은{' '}
                <strong>실제 성과</strong>를 확인해보세요.
                <br />
                평균{' '}
                <span className="font-semibold text-primary">
                  50% 이상 절세
                </span>{' '}
                +{' '}
                <span className="font-semibold text-primary">
                  완벽한 리스크 관리
                </span>
                를 달성했습니다.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* 사례 선택 탭 */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {successCases.map((item, index) => (
                  <Button
                    key={index}
                    variant={selectedCase === index ? 'default' : 'outline'}
                    onClick={() => setSelectedCase(index)}
                    className="text-sm"
                  >
                    {item.title}
                  </Button>
                ))}
              </div>

              {/* 선택된 사례 상세 */}
              <Card className="bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30 border-border/50 dark:border-border/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">
                      {successCases[selectedCase]?.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 dark:border-primary/30"
                    >
                      검증된 성공사례
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-orange-500 dark:text-orange-400" />
                          상황 분석
                        </h4>
                        <p className="text-muted-foreground">
                          {successCases[selectedCase]?.situation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                          맞춤 솔루션
                        </h4>
                        <p className="text-muted-foreground">
                          {successCases[selectedCase]?.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                          달성 결과
                        </h4>
                        <p className="text-muted-foreground font-medium">
                          {successCases[selectedCase]?.result}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 text-center">
                          핵심 수치
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              보험료
                            </span>
                            <span className="font-semibold text-primary">
                              {successCases[selectedCase]?.premium}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              세무혜택
                            </span>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {successCases[selectedCase]?.taxBenefit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              수익률
                            </span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {successCases[selectedCase]?.roi}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <CalComPopup
                          buttonText="동일한 성과 달성 상담"
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 설계 프로세스 */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">종신보험 전문 설계</span>{' '}
                프로세스
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <strong>20년 경력</strong>의 전문가가{' '}
                <strong>체계적인 6단계 프로세스</strong>로<br />
                CEO님만의{' '}
                <span className="font-semibold text-primary">
                  최적 종신보험
                </span>
                을 설계합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: '1단계',
                  title: '현황 정밀 진단',
                  icon: <FileCheck className="h-6 w-6" />,
                  description:
                    '기업 규모, 개인 자산, 가족 구성원, 기존 보험 현황을 종합 분석',
                  duration: '1주',
                  details: [
                    '기업 재무현황 분석',
                    '개인 자산구조 파악',
                    '기존 보험 점검',
                    '리스크 요인 진단',
                  ],
                },
                {
                  step: '2단계',
                  title: '세무 시뮬레이션',
                  icon: <Calculator className="h-6 w-6" />,
                  description:
                    '상속세 예상액, 법인세 절감효과, 개인소득세 영향도를 정밀 계산',
                  duration: '3-5일',
                  details: [
                    '상속세 산출',
                    '법인세 절감액 계산',
                    '개인세 영향 분석',
                    '최적 납입방법 도출',
                  ],
                },
                {
                  step: '3단계',
                  title: '맞춤 설계 제안',
                  icon: <Target className="h-6 w-6" />,
                  description:
                    '개인/법인 종신보험 최적 조합과 보장금액, 납입방법을 제안',
                  duration: '1주',
                  details: [
                    '개인/법인 비율 설계',
                    '보장금액 산정',
                    '납입기간 최적화',
                    '수익자 구조 설계',
                  ],
                },
                {
                  step: '4단계',
                  title: '보험사 선정',
                  icon: <Award className="h-6 w-6" />,
                  description:
                    '수익률, 안정성, 서비스를 종합 비교하여 최적 보험사 선정',
                  duration: '3-5일',
                  details: [
                    '보험사별 수익률 비교',
                    '재무건전성 분석',
                    '상품 특약 비교',
                    '서비스 품질 평가',
                  ],
                },
                {
                  step: '5단계',
                  title: '계약 체결',
                  icon: <FileCheck className="h-6 w-6" />,
                  description:
                    '계약서 검토, 건강진단, 서류 준비부터 계약 완료까지 전 과정 지원',
                  duration: '2주',
                  details: [
                    '계약서 상세 검토',
                    '건강진단 지원',
                    '필요서류 준비',
                    '계약 체결 완료',
                  ],
                },
                {
                  step: '6단계',
                  title: '지속 관리',
                  icon: <Users className="h-6 w-6" />,
                  description:
                    '연 1회 정기점검, 세법 변화 대응, 보장내용 최적화 등 평생 관리',
                  duration: '평생',
                  details: [
                    '연 1회 정기점검',
                    '세법 변화 대응',
                    '보장 최적화',
                    '가업승계 연계',
                  ],
                },
              ].map((process, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 group bg-gradient-to-br from-card to-card/50 dark:from-card/80 dark:to-card/30"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-colors">
                        {process.icon}
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {process.step}
                        </Badge>
                        <CardTitle className="text-lg">
                          {process.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {process.description}
                    </p>
                    <div className="space-y-2">
                      {process.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="secondary">{process.duration}</Badge>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">종신보험</span> 자주 묻는 질문
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <PremiumFAQ
                items={[
                  {
                    question:
                      '개인종신보험과 법인종신보험 중 어떤 것이 더 유리한가요?',
                    answer:
                      '일반적으로 두 가지를 조합하는 것이 가장 유리합니다. 법인종신보험으로 보험료 손금처리 혜택을 받고, 개인종신보험으로 상속세 비과세 혜택을 확보하는 것이 세무상 최적입니다. 구체적인 비율은 기업 규모, 개인 자산, 상속세 예상액 등을 종합 분석하여 결정합니다.',
                  },
                  {
                    question:
                      '법인명의 종신보험의 보험료가 정말 100% 손금처리 가능한가요?',
                    answer:
                      '네, 법인이 임직원을 피보험자로 하여 가입한 종신보험의 보험료는 현행 법인세법상 100% 손금처리가 가능합니다. 다만, 수익자 지정 방법과 약관 조건에 따라 세무상 취급이 달라질 수 있어 전문가와 상담 후 설계하시는 것이 중요합니다.',
                  },
                  {
                    question: '종신보험으로 상속세를 어떻게 절감할 수 있나요?',
                    answer:
                      '종신보험은 두 가지 방법으로 상속세를 절감합니다. 첫째, 개인명의 종신보험의 사망보험금은 상속세 과세대상에서 제외됩니다. 둘째, 상속 발생 시 즉시 현금화가 가능해 상속세 납부재원으로 활용할 수 있어 다른 자산을 매각할 필요가 없습니다.',
                  },
                  {
                    question:
                      '건강상 문제가 있어도 종신보험 가입이 가능한가요?',
                    answer:
                      '기존 질병이 있더라도 가입 가능한 상품들이 있습니다. 간편심사형 상품, 무진단형 상품 등 다양한 선택지가 있으며, 보험사별로 인수기준이 다르므로 여러 보험사를 비교 검토하여 최적의 상품을 찾을 수 있습니다.',
                  },
                  {
                    question:
                      '종신보험의 해약환급금을 퇴직금으로 활용할 때 세무상 혜택이 있나요?',
                    answer:
                      '법인명의 종신보험의 해약환급금을 임원 퇴직금으로 지급할 경우, 퇴직소득세 과세대상이 되어 근로소득세보다 낮은 세율이 적용됩니다. 또한 퇴직소득 공제 혜택도 받을 수 있어 세무상 매우 유리합니다.',
                  },
                  {
                    question: '종신보험 가입 후 보장내용을 변경할 수 있나요?',
                    answer:
                      '대부분의 종신보험은 계약 후에도 보장금액 증액, 납입방법 변경, 수익자 변경 등이 가능합니다. 다만, 증액의 경우 재심사가 필요하고, 변경 시 세무상 영향을 검토해야 하므로 전문가와 상담 후 진행하시는 것을 권합니다.',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <strong>CEO 전용</strong> 종신보험 무료 설계
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              <strong>20년 경력 전문가</strong>가 CEO님의 상황에 최적화된
              <br />
              <span className="font-semibold text-primary">
                개인/법인 종신보험 통합 설계
              </span>
              를 무료로 제공합니다.
            </p>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="font-semibold text-lg mb-4">
                🎯 무료 설계에 포함된 내용
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  현황 정밀 진단
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  상속세 시뮬레이션
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  세무혜택 분석
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  맞춤 설계 제안
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  보험사별 비교
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  리스크 관리 전략
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <CalComPopup
                buttonText="무료 종신보험 설계 상담 (월 15분 한정)"
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
              />
              <Link
                href="tel:0502-5550-8700"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'px-8 py-4 text-lg font-bold'
                )}
              >
                📞 전화 상담 (0502-5550-8700)
              </Link>
            </div>

            <div className="text-sm text-muted-foreground mt-6 space-y-1">
              <div>
                💡 평균 상담 시간: 60분 | 설계 완료: 1주일 | 추가 비용: 무료
              </div>
              <div>🏆 삼성생명 1000억+ 설계 실적 | 평균 상속세 절감: 50%+</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LifeInsurancePage;
