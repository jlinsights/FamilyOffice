import type { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, FileText, Users, Shield, Calculator, Building, Wallet } from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = generateMetadata(
  '자주 묻는 질문 | 패밀리오피스·가업승계·개인자산관리 완벽 가이드',
  '패밀리오피스, 가업승계, 상속증여, 개인자산관리, 가족신탁, 법인보험까지. 성공한 기업가와 개인자산 30억+ 고액자산가가 가장 많이 묻는 질문과 전문가 답변. 맞춤형 통합자산관리 솔루션.',
  [
    '패밀리오피스 FAQ',
    '가업승계 질문',
    '상속증여 상담',
    '개인자산관리',
    '고액자산가 자산관리',
    '개인자산 30억 이상',
    '가족신탁 설립',
    '법인보험 가입',
    '중대재해처벌법 대응',
    '자산가 상속계획',
  ]
);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'family-office-center',
    title: '패밀리오피스',
    icon: <Building className="h-5 w-5" />,
    items: [
      {
        question: '패밀리오피스란 무엇인가요?',
        answer: '패밀리오피스는 고액자산가와 기업오너 가문의 종합적인 자산관리를 위한 전문 서비스입니다. 단순한 자산운용을 넘어 가업승계, 세무전략, 리스크관리, 차세대 교육까지 가문의 모든 재무적 니즈를 원스톱으로 해결합니다.'
      },
      {
        question: '패밀리오피스 설립 비용은 얼마나 드나요?',
        answer: '패밀리오피스 운영 비용은 서비스 범위와 자산 규모에 따라 다릅니다. 일반적으로 관리자산의 0.5~1.5% 수준이며, 절세효과와 투자수익 개선을 통해 비용 이상의 가치를 창출합니다. 무료 상담을 통해 정확한 견적을 받아보세요.'
      },
      {
        question: '어느 정도 자산이 있어야 패밀리오피스가 필요한가요?',
        answer: '기업자산의 경우 순자산 50억원 이상, 개인자산의 경우 30억원 이상부터 패밀리오피스 서비스를 권장합니다. 다만 가업승계 준비, 복잡한 세무구조, 해외자산 보유 등 특별한 니즈가 있다면 더 적은 규모에서도 충분한 효용이 있습니다.'
      },
      {
        question: '싱글 패밀리오피스와 멀티 패밀리오피스의 차이는?',
        answer: '싱글 패밀리오피스(SFO)는 단일 가문 전용으로 완전한 맞춤형 서비스와 절대적 기밀성을 제공합니다. 멀티 패밀리오피스(MFO)는 여러 가문이 공동으로 이용하여 비용 효율적이며 전문가 네트워크를 공유할 수 있습니다.'
      }
    ]
  },
  {
    id: 'private-wealth',
    title: '개인자산관리',
    icon: <Wallet className="h-5 w-5" />,
    items: [
      {
        question: '개인자산 30억 이상일 때 어떤 서비스를 받을 수 있나요?',
        answer: '개인자산 30억원 이상의 고액자산가를 위한 전문 서비스로 가족신탁 설립, 상속세 최적화, 해외자산 관리, 프라이빗 뱅킹, 대체투자 자문 등 VVIP 맞춤형 통합자산관리 서비스를 제공합니다.'
      },
      {
        question: '가족신탁이란 무엇이고 언제 필요한가요?',
        answer: '가족신탁은 자산을 신탁회사에 맡겨 가족 구성원을 위해 관리·운용하는 제도입니다. 상속세 절감, 자산보전, 차세대 교육 등이 목적일 때 설립하며, 개인자산 30억원 이상에서 효율적입니다.'
      },
      {
        question: '개인자산가도 상속세 절세가 가능한가요?',
        answer: '네, 매우 효과적입니다. 가족신탁, 증여세 과세특례, 부동산 절세 구조, 해외자산 배치 등을 통해 상속세를 30~50% 절감할 수 있습니다. 사전 계획이 핵심이므로 조기 상담을 권합니다.'
      },
      {
        question: '해외자산 관리 시 주의사항은?',
        answer: '해외자산은 국내 신고 의무가 있으며, 상속세 과세 대상입니다. CRS 자동정보교환으로 투명성이 높아졌으므로 합법적인 절세 구조와 체계적인 관리가 필요합니다.'
      }
    ]
  },
  {
    id: 'business-succession',
    title: '가업승계',
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        question: '가업승계는 언제 시작해야 하나요?',
        answer: '가업승계는 최소 5-10년 전부터 준비하는 것이 이상적입니다. 경영자가 50대 중반에 접어들면 본격적인 승계 계획을 수립해야 합니다. 단계적 실행으로 세금 부담을 분산하고 후계자 육성 시간을 확보할 수 있습니다.'
      },
      {
        question: '가업승계 시 세금은 얼마나 내야 하나요?',
        answer: '상속세와 증여세는 최대 50%까지 부과될 수 있습니다. 하지만 가업상속공제(최대 500억원), 증여세 과세특례, 주식 할증평가 배제 등을 활용하면 실효세율을 10-20%대로 낮출 수 있습니다.'
      },
      {
        question: '가업승계 실패율이 높은 이유는?',
        answer: '준비 부족(35%), 과도한 세금 부담(25%), 가족 간 갈등(20%), 후계자 역량 부족(20%)이 주요 원인입니다. 체계적인 사전 준비와 전문가 컨설팅으로 이러한 위험을 크게 줄일 수 있습니다.'
      },
      {
        question: '경영권 방어는 어떻게 하나요?',
        answer: '정관 개정, 의결권 제한 주식 발행, 주주간 협약, 황금주 도입 등의 방법이 있습니다. 기업 상황에 맞는 최적의 경영권 방어 전략을 수립하여 안정적인 승계를 보장할 수 있습니다.'
      }
    ]
  },
  {
    id: 'tax-optimization',
    title: '상속·증여',
    icon: <FileText className="h-5 w-5" />,
    items: [
      {
        question: '상속세와 증여세의 차이는 무엇인가요?',
        answer: '상속세는 사망 시 재산 이전에 부과되는 세금이고, 증여세는 생전에 무상으로 재산을 이전할 때 부과됩니다. 세율은 동일하지만 공제 한도와 과세 시기가 다르므로 전략적 활용이 중요합니다.'
      },
      {
        question: '증여세 면제 한도는 얼마인가요?',
        answer: '배우자 6억원(10년간), 성년 자녀 5천만원(10년간), 미성년 자녀 2천만원(10년간)까지 증여세가 면제됩니다. 계획적인 사전 증여로 상당한 절세가 가능합니다.'
      },
      {
        question: '가업상속공제 요건은 무엇인가요?',
        answer: '피상속인이 10년 이상 경영, 상속인이 상속 전 2년 이상 재직, 상속 후 7년간 고용 유지 등의 요건이 있습니다. 최대 500억원까지 공제받을 수 있어 중소기업 승계에 매우 유리합니다.'
      },
      {
        question: '해외자산도 상속세 대상인가요?',
        answer: '네, 거주자의 경우 전 세계 자산에 대해 상속세가 부과됩니다. 해외 부동산, 주식, 예금 등 모든 자산이 포함되므로 사전에 정확한 파악과 신고가 필요합니다.'
      }
    ]
  },
  {
    id: 'corporate-insurance',
    title: '법인보험',
    icon: <Shield className="h-5 w-5" />,
    items: [
      {
        question: '경영인정기보험이란 무엇인가요?',
        answer: '경영인정기보험은 CEO나 핵심 임원의 사망·질병 시 기업에 발생하는 경제적 손실을 보상하는 보험입니다. 보험금으로 경영 공백을 메우고 사업 안정성을 확보할 수 있습니다.'
      },
      {
        question: '법인종신보험의 장점은?',
        answer: '법인종신보험은 평생 보장이 지속되며, 해약환급금을 퇴직금 재원으로 활용할 수 있습니다. 또한 보험료는 손금 처리되어 법인세 절감 효과도 있습니다.'
      },
      {
        question: '중대재해처벌법 대응 보험은?',
        answer: '중대재해 발생 시 경영책임자의 형사처벌과 손해배상에 대비하는 보험입니다. 안전관리체계 구축과 함께 가입하면 경영 리스크를 효과적으로 관리할 수 있습니다.'
      },
      {
        question: '단체보험 가입 시 절세 효과는?',
        answer: '임직원 단체보험료는 복리후생비로 전액 손금 처리됩니다. 직원들에게는 비과세 혜택을 제공하면서 기업은 법인세를 절감할 수 있어 일석이조의 효과가 있습니다.'
      }
    ]
  },
  {
    id: 'policy-funds',
    title: '정책자금',
    icon: <Calculator className="h-5 w-5" />,
    items: [
      {
        question: '정책자금이란 무엇인가요?',
        answer: '정책자금은 정부나 공공기관이 중소기업 지원을 위해 제공하는 저리의 대출이나 보조금입니다. 시설자금, 운전자금, R&D자금 등 다양한 용도로 활용 가능합니다.'
      },
      {
        question: '정책자금 신청 자격은?',
        answer: '업종, 매출액, 종업원 수 등 중소기업 기준을 충족해야 합니다. 신용등급, 재무상태, 사업계획서 등을 종합 평가하여 지원 여부가 결정됩니다.'
      },
      {
        question: '정책자금 금리는 얼마나 되나요?',
        answer: '정책자금 금리는 연 1.5~3.5% 수준으로 시중 금리보다 2~4%p 낮습니다. 창업기업, 혁신기업은 추가 우대를 받을 수 있습니다.'
      },
      {
        question: '정책자금과 일반 대출을 함께 받을 수 있나요?',
        answer: '네, 가능합니다. 다만 총 차입금이 과도하지 않도록 관리해야 하며, 각 자금의 용도를 명확히 구분하여 사용해야 합니다.'
      }
    ]
  },
  {
    id: 'certification',
    title: '기업인증',
    icon: <Shield className="h-5 w-5" />,
    items: [
      {
        question: '기업인증의 종류와 혜택은?',
        answer: '벤처기업, 이노비즈, 메인비즈, 경영혁신형 중소기업 등이 있습니다. 인증 시 정책자금 우대, 세제 혜택, 공공입찰 가점 등 다양한 혜택을 받을 수 있습니다.'
      },
      {
        question: '벤처기업 인증 요건은?',
        answer: '벤처투자 유치, R&D 투자 비중, 기술평가 보증/대출, 예비벤처 중 하나를 충족하면 됩니다. 인증 시 법인세 감면, 스톡옵션 혜택 등을 받을 수 있습니다.'
      },
      {
        question: 'ISO 인증이 꼭 필요한가요?',
        answer: 'ISO 9001(품질), ISO 14001(환경), ISO 45001(안전보건) 등은 대기업 거래나 공공입찰 시 필수인 경우가 많습니다. 경영시스템 개선 효과도 있어 장기적으로 유익합니다.'
      },
      {
        question: '가족친화기업 인증의 장점은?',
        answer: '가족친화기업 인증 시 정부 지원금, 금리 우대, 공공입찰 가점을 받을 수 있습니다. 또한 우수 인재 채용과 직원 만족도 향상에도 도움이 됩니다.'
      }
    ]
  }
];

export default function FAQPage() {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap(category =>
      category.items.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={faqStructuredData} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              자주 묻는 질문
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              패밀리오피스부터 가업승계, 개인자산관리, 법인보험까지<br />
              성공한 기업가와 고액자산가가 가장 궁금해하는 모든 것
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <HelpCircle className="h-5 w-5" />
              <span>총 {faqCategories.reduce((acc, cat) => acc + cat.items.length, 0)}개의 질문과 답변</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="family-office-center" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 h-auto">
                {faqCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    {category.icon}
                    <span className="text-xs">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {category.icon}
                        {category.title} 관련 질문
                      </CardTitle>
                      <CardDescription>
                        {category.items.length}개의 자주 묻는 질문
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              더 자세한 정보가 필요하신가요?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">상담 신청</CardTitle>
                  <CardDescription>
                    전문가와 1:1 무료 상담
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/contact">상담 신청하기</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">자료 다운로드</CardTitle>
                  <CardDescription>
                    가이드북 무료 다운로드
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/resources">자료실 방문</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">세미나 신청</CardTitle>
                  <CardDescription>
                    CEO 대상 프리미엄 세미나
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/seminar">세미나 일정</Link>
                  </Button>
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
              찾으시는 답변이 없으신가요?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              20년 경력의 전문가가 직접 답변해드립니다.<br />
              부담 없이 문의해주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  1:1 문의하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0502-5550-8700">
                  ☎ 0502-5550-8700
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              평일 09:00-18:00 | 100% 비밀 보장
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}