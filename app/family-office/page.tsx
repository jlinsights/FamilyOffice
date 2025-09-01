import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, TrendingUp, Shield, Target, Building } from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = generateMetadata(
  '패밀리오피스란? | 성공한 기업가를 위한 통합 자산관리 솔루션',
  '패밀리오피스는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스입니다. 가업승계, 세무최적화, 투자전략, 리스크관리를 원스톱으로 해결하는 프리미엄 서비스의 모든 것을 알아보세요.',
  [
    '패밀리오피스',
    '패밀리오피스란',
    '패밀리오피스 서비스',
    '패밀리오피스 컨설팅',
    '패밀리오피스 비용',
    '패밀리오피스 설립',
    '싱글 패밀리오피스',
    '멀티 패밀리오피스',
    '가족자산관리',
    '통합자산관리',
    '프라이빗 뱅킹',
    '웰스 매니지먼트',
  ],
  undefined,
  '전문가급',
  '성숙기',
  'informational'
);

export default function FamilyOfficePage() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '패밀리오피스란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '패밀리오피스는 고액자산가와 기업오너 가문의 부를 종합적으로 관리하는 전문 조직입니다. 단순한 자산운용을 넘어 가업승계, 세무전략, 교육, 자선활동까지 가문의 모든 재무적 니즈를 관리합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '패밀리오피스가 필요한 자산 규모는?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '일반적으로 순자산 50억원 이상의 가문에서 패밀리오피스 설립을 고려합니다. 그러나 가업승계, 복잡한 세무구조, 해외자산 등 특별한 니즈가 있다면 더 적은 규모에서도 충분한 가치를 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '패밀리오피스 운영 비용은 얼마나 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '패밀리오피스 운영 비용은 서비스 범위와 자산 규모에 따라 다릅니다. 일반적으로 관리자산의 0.5~1.5% 수준이며, 절세효과와 투자수익 개선을 통해 비용 이상의 가치를 창출합니다.'
        }
      }
    ]
  };

  const serviceData = generateStructuredData('Service');

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={faqData} />
      <StructuredData data={serviceData} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Premium Family Office Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              패밀리오피스란 무엇인가?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              성공한 기업가와 고액자산가 가문을 위한<br />
              차세대 통합 자산관리 솔루션
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">무료 상담 신청</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#benefits">자세히 알아보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">패밀리오피스의 정의</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  <strong>패밀리오피스(Family Office)</strong>는 초고액자산가(UHNW) 가문의 
                  재산을 보존하고 증식시키기 위해 설립된 전문 자산관리 조직입니다.
                </p>
                <p>
                  19세기 미국의 록펠러, 모건 가문에서 시작된 패밀리오피스는 이제 전 세계적으로 
                  확산되어, 성공한 기업가들의 필수 자산관리 도구가 되었습니다.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">싱글 패밀리오피스 (SFO)</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>단일 가문 전용 서비스</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>완전한 맞춤형 솔루션</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>절대적 기밀성 보장</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">멀티 패밀리오피스 (MFO)</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>여러 가문이 공동 이용</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>비용 효율적인 운영</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>전문가 네트워크 공유</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">패밀리오피스 핵심 서비스</h2>
              <p className="text-lg text-muted-foreground">
                가문의 번영을 위한 360도 통합 솔루션
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>투자 관리</CardTitle>
                  <CardDescription>글로벌 분산투자 전략</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 포트폴리오 최적화</li>
                    <li>• 대체투자 기회 발굴</li>
                    <li>• 리스크 관리 시스템</li>
                    <li>• 성과 분석 및 리포팅</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>가업승계 설계</CardTitle>
                  <CardDescription>차세대 리더십 계승</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 승계 로드맵 수립</li>
                    <li>• 지분구조 최적화</li>
                    <li>• 경영권 안정화</li>
                    <li>• 차세대 교육 프로그램</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>세무 최적화</CardTitle>
                  <CardDescription>합법적 절세 전략</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 상속·증여세 플래닝</li>
                    <li>• 법인세 구조 개선</li>
                    <li>• 국제조세 대응</li>
                    <li>• 세무조사 지원</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>부동산 관리</CardTitle>
                  <CardDescription>프리미엄 자산 운용</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 투자 부동산 관리</li>
                    <li>• 개발 프로젝트 자문</li>
                    <li>• 글로벌 부동산 투자</li>
                    <li>• 자산 가치 극대화</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>사업 컨설팅</CardTitle>
                  <CardDescription>기업가치 극대화</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• M&A 자문</li>
                    <li>• 신사업 기회 발굴</li>
                    <li>• 전략적 파트너십</li>
                    <li>• Exit 전략 수립</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>리스크 관리</CardTitle>
                  <CardDescription>자산 보호 전략</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 보험 설계 최적화</li>
                    <li>• 법적 리스크 대응</li>
                    <li>• 평판 관리</li>
                    <li>• 사이버 보안</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">패밀리오피스의 가치</h2>
              <p className="text-lg text-muted-foreground">
                왜 성공한 기업가들이 패밀리오피스를 선택하는가
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>1. 통합 관리의 효율성</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    분산된 자산과 복잡한 금융구조를 하나의 통합된 시스템으로 관리함으로써 
                    효율성을 극대화하고 숨겨진 기회를 발견합니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. 전문가 네트워크</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    세무, 법무, 투자, M&A 등 각 분야 최고의 전문가들과 독점적 네트워크를 
                    구축하여 최상의 솔루션을 제공받습니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. 절대적 기밀성</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    가문의 재무 정보와 개인정보를 철저히 보호하며, 모든 거래와 상담은 
                    최고 수준의 기밀성 하에 진행됩니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. 장기적 관점</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    단기적 수익보다는 가문의 100년 번영을 목표로, 세대를 넘어서는 
                    장기적 관점에서 자산을 관리합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              귀하의 가문도 패밀리오피스가 필요하신가요?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              20년 이상의 경험을 보유한 전문가 그룹이<br />
              귀하의 가문에 최적화된 패밀리오피스 구축을 도와드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">무료 컨설팅 신청</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solutions">서비스 상세보기</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ☎ 0502-5550-8700 | 평일 09:00-18:00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}