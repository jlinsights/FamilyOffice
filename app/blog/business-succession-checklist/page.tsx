import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileCheck,
  Shield,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '가업승계 체크리스트 PDF 다운로드 | 5-10년 준비 가이드',
  '가업승계 준비 완벽 체크리스트! 5-10년 단계별 준비 사항, 세금 절감 전략, 법적 절차까지. 세무사가 만든 무료 PDF 다운로드 ☎0502-5550-8700',
  [
    '가업승계 체크리스트',
    '가업승계 준비',
    '가업승계 절세',
    '가업승계 방법',
    '가업승계 계획',
    '기업 승계 체크리스트',
    '가업상속공제',
    '2세 경영 승계',
    '가족기업 승계',
    '중소기업 승계',
  ],
  '/blog/business-succession-checklist-cover.jpg',
  '전문가급',
  '성숙기',
  'informational',
  '/blog/business-succession-checklist'
);

export default function BusinessSuccessionChecklistPage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '가업승계는 언제부터 준비해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '가업승계는 최소 5년, 이상적으로는 10년 전부터 준비해야 합니다. 기업 가치 상승 전에 미리 계획하고, 후계자 교육 기간을 충분히 확보하며, 단계적으로 지분을 이전해야 세금 부담을 최소화할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업상속공제는 얼마까지 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '가업상속공제는 최대 600억원까지 공제받을 수 있습니다. 다만 10년 이상 계속 경영한 기업, 매출액 5,000억원 미만, 상속인이 2년 이상 근무 등의 요건을 충족해야 합니다. 사후 요건도 7년간 유지해야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업승계 시 가장 큰 세금 부담은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '상속세와 증여세가 가장 큰 부담입니다. 기업 가치가 높을수록 최대 50%(최대주주 할증 시 60%)의 세율이 적용될 수 있습니다. 따라서 가업상속공제, 사전증여, 가족법인 활용 등 다양한 절세 전략이 필수입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '후계자는 어떻게 선정하고 교육해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '능력, 열정, 가족 합의 등을 종합적으로 고려해야 합니다. 최소 5년 이상의 교육 기간을 두고, 현장 경험부터 경영 참여까지 단계적으로 진행하며, 외부 교육(MBA 등)과 멘토링을 병행하는 것이 효과적입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '가업승계 실패를 방지하려면 어떻게 해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '투명한 지배구조 구축, 체계적인 후계자 교육, 전문경영인 영입, 가족 간 명확한 역할 분담, 법적 문서화(가족헌장 등), 외부 전문가 자문 활용이 중요합니다. 무엇보다 충분한 준비 기간 확보가 핵심입니다.',
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <FileCheck className="mr-1 h-3 w-3" />
                세무사 검증 완료
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                가업승계 체크리스트 완벽 가이드
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                5-10년 장기 계획이 필요한 가업승계, 단계별 준비사항을
                체크리스트로 정리했습니다
                <br />
                무료 PDF 다운로드 제공
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <Download className="mr-2 h-5 w-5" />
                    무료 체크리스트 받기
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/business-succession-strategy">
                    전문가 상담 신청
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p className="lead text-lg">
                <strong>가업승계</strong>는 평생 일궈온 기업을 다음 세대에게
                안정적으로 물려주는 중요한 과정입니다. 하지만 준비 없이 진행하면
                높은 세금 부담과 경영 불안정으로 기업의 존립이 위협받을 수
                있습니다.
              </p>
              <p>
                실제로 한국의 가업승계 성공률은 30%에 불과하며, 10년 내 폐업하는
                경우가 70%에 달합니다. 성공적인 가업승계를 위해서는{' '}
                <strong>최소 5-10년의 체계적인 준비</strong>가 필요합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Main Checklist */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                가업승계 5단계 체크리스트
              </h2>

              <div className="space-y-6">
                {/* Phase 1: 10년 전 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Timer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          1단계: 장기 준비 (10년 전~)
                        </CardTitle>
                        <CardDescription className="mt-2">
                          가업승계의 토대 마련하기
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            후계자 선정 및 합의
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            가족 회의를 통해 후계자를 선정하고, 다른 가족
                            구성원의 동의 확보
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">기업 가치 평가</h4>
                          <p className="text-sm text-muted-foreground">
                            회계법인을 통한 정확한 기업 가치 산정 (절세 전략의
                            기초)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            가업승계 전문가 팀 구성
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            세무사, 변호사, 회계사 등 전문가 자문단 확보
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">가족헌장 작성</h4>
                          <p className="text-sm text-muted-foreground">
                            가족 간 역할, 의사결정 구조, 분쟁 해결 방법 등을
                            문서화
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: 5-7년 전 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          2단계: 후계자 교육 (5-7년 전)
                        </CardTitle>
                        <CardDescription className="mt-2">
                          체계적인 역량 개발
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">현장 경험 축적</h4>
                          <p className="text-sm text-muted-foreground">
                            생산, 영업, 관리 등 주요 부서 순환 근무 (최소 2-3년)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            MBA 또는 전문 교육
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            경영학 석사, 산업별 전문 교육 프로그램 이수
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            해외 선진 기업 벤치마킹
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            글로벌 트렌드 학습 및 네트워크 구축
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            임원 승진 및 경영 참여
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            이사회 참석, 주요 의사결정 과정 참여
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: 3-5년 전 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          3단계: 절세 전략 실행 (3-5년 전)
                        </CardTitle>
                        <CardDescription className="mt-2">
                          세금 부담 최소화
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">사전 증여 시작</h4>
                          <p className="text-sm text-muted-foreground">
                            10년 단위로 증여세 과세표준 분산 (5억원까지 10%
                            세율)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            가족법인 설립 검토
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            지주회사 구조로 전환하여 지배력 유지하며 세금 절감
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            가업상속공제 요건 준비
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            후계자 2년 이상 근무, 10년 이상 기업 경영 등 요건
                            충족
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            주식 평가 하락 전략
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            적법한 범위 내에서 주식 가치를 일시적으로 낮추는
                            방법 활용
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: 1-2년 전 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          4단계: 경영권 이양 준비 (1-2년 전)
                        </CardTitle>
                        <CardDescription className="mt-2">
                          실질적 경영 승계
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            공동 대표이사 체제
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            1-2년간 선대와 후계자가 함께 경영하며 노하우 전수
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            핵심 임직원 소통
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            주요 인력의 이탈 방지, 후계자에 대한 신뢰 구축
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            거래처 관계 인수인계
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            주요 고객사, 협력사와 후계자 관계 형성
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">지분 이전 완료</h4>
                          <p className="text-sm text-muted-foreground">
                            경영권 확보에 필요한 지분(통상 51% 이상) 이전
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 5: 승계 시점 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          5단계: 승계 완료 및 사후 관리
                        </CardTitle>
                        <CardDescription className="mt-2">
                          안정적 정착과 지속 성장
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">공식 승계 발표</h4>
                          <p className="text-sm text-muted-foreground">
                            내부 및 외부 이해관계자에게 공식 발표
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            세무 신고 및 납부
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            상속세/증여세 신고 (6개월 이내), 가업상속공제 신청
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            선대 경영자 역할 재정의
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            고문, 이사회 의장 등으로 전환하여 간섭 최소화
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            사후 요건 관리 (7년간)
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            가업상속공제 사후 요건(업종 유지, 고용 유지 등)
                            철저히 준수
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA  - Download */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <Download className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  가업승계 체크리스트 PDF 무료 다운로드
                </h2>
                <p className="text-lg mb-8 text-blue-50">
                  세무사가 만든 단계별 체크리스트와 필수 서류 목록 포함
                  <br />
                  가이업승계 성공률을 70%까지 높이세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/contact">
                      <Download className="mr-2 h-5 w-5" />
                      무료 PDF 다운로드
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
                  >
                    <Link href="/business-succession-strategy">
                      전문가 1:1 상담
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                자주 묻는 질문
              </h2>
              <div className="space-y-4">
                {faqData.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{faq.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {faq.acceptedAnswer.text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">관련 서비스</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>가업승계 컨설팅</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    5-10년 장기 플랜 수립부터 실행까지 전문가가 함께합니다
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/business-succession-strategy">
                      자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-emerald-600 mb-2" />
                  <CardTitle>상속세 절세 전략</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    가업상속공제 최대 600억원 활용 전략
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/inheritance-gift-tax">
                      자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>CEO 자산관리</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    기업 자산과 개인 자산을 통합 관리하는 전략
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/wealth-consulting">
                      자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      </main>
      <Footer />
      <CalComPopup />
    </>
  );
}
