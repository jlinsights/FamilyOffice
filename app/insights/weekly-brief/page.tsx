import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  CheckCircle, 
  Calendar, 
  Users, 
  TrendingUp, 
  BarChart, 
  Building2,
  Star,
  Clock,
  ArrowRight,
  Shield,
  Target
} from 'lucide-react';
import { NewsletterSubscription } from '@/components/newsletter-subscription';

export const metadata: Metadata = {
  title: '기업승계 Weekly Brief | CEO 전용 뉴스레터 | FamilyOffice S',
  description: '매주 월·금, 기업승계와 상속세 절세에 관한 핵심 인사이트를 CEO에게 직접 전달합니다. 500+ 중견기업 경영진이 구독하는 프리미엄 뉴스레터.',
  keywords: '기업승계 뉴스레터, CEO 뉴스레터, 상속세 절세, 가업승계, 중견기업, 패밀리오피스, 경영진 인사이트',
  openGraph: {
    title: '기업승계 Weekly Brief | CEO 전용 뉴스레터 | FamilyOffice S',
    description: '매주 월·금, 기업승계와 상속세 절세에 관한 핵심 인사이트를 CEO에게 직접 전달합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '기업승계 Weekly Brief | CEO 전용 뉴스레터 | FamilyOffice S',
    description: '매주 월·금, 기업승계와 상속세 절세에 관한 핵심 인사이트를 CEO에게 직접 전달합니다.',
  },
  alternates: {
    canonical: '/insights/weekly-brief',
  },
};

const newsletterBenefits = [
  {
    icon: TrendingUp,
    title: '시장 동향 분석',
    description: '국내외 금융시장의 주요 동향과 투자 기회를 전문가의 시각으로 분석',
  },
  {
    icon: Building2,
    title: '업종별 인사이트',
    description: '제조, 건설, IT, 유통 등 업종별 맞춤형 투자 전략과 리스크 관리',
  },
  {
    icon: Shield,
    title: '세무·법률 가이드',
    description: '최신 세법 개정사항과 절세 전략, 상속·증여 관련 실무 팁',
  },
  {
    icon: Target,
    title: 'CEO 필독 자료',
    description: '경영진을 위한 핵심 이슈 브리핑과 의사결정 참고 자료',
  },
];

const testimonials = [
  {
    name: '김○○ 대표',
    company: '제조업 A사',
    content: '매주 받는 뉴스레터를 통해 시장 변화를 빠르게 파악하고 있습니다. 특히 업종별 분석이 도움이 됩니다.',
    rating: 5,
  },
  {
    name: '이○○ 회장',
    company: '건설업 B그룹',
    content: '상속세 관련 내용이 매우 실용적이었습니다. 전문가의 조언을 쉽게 이해할 수 있어 좋습니다.',
    rating: 5,
  },
  {
    name: '박○○ 대표',
    company: 'IT기업 C사',
    content: '글로벌 시장 동향과 국내 시장을 연결해서 설명해주는 점이 특히 유용합니다.',
    rating: 5,
  },
];

const recentTopics = [
  '2025년 상반기 투자 전망과 포트폴리오 전략',
  '중대재해처벌법 시행 2년, CEO가 알아야 할 핵심 사항',
  'AI 시대의 기업 가치 평가, 무엇이 달라지나',
  '가족법인 설립을 통한 상속세 절감 사례 분석',
  'ESG 경영이 기업 가치에 미치는 영향',
];

export default function WeeklyBriefPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">매주 월·금 오전 7:30 발송</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                CEO를 위한<br />
                프리미엄 투자 뉴스레터
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                500+ 중견기업 경영진이 신뢰하는 FamilyOffice S의<br />
                독점 투자 인사이트를 매주 2회 받아보세요.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">무료 구독</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">언제든 해지 가능</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">스팸 없음</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">실무 중심 콘텐츠</span>
                </div>
              </div>

              <NewsletterSubscription 
                source="weekly-brief-hero"
                variant="default"
                showDescription={false}
              />
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">최신호 미리보기</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2025년 1월 17일 (금요일)</p>
                  </div>
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">주요 뉴스</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">한국은행 기준금리 동결, 투자 전략 재점검 필요</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">투자 인사이트</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2025년 주목해야 할 5가지 투자 트렌드</p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">CEO 브리핑</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">디지털 전환 시대의 리더십 전략</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">구독자 10,000+</span>
                    <span className="text-gray-500 dark:text-gray-400">평균 열람률 45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              뉴스레터 구독 혜택
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              FamilyOffice S 뉴스레터만의 차별화된 콘텐츠를 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsletterBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                최근 다룬 주요 주제
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                실무에 바로 적용 가능한 인사이트와 전략을 제공합니다
              </p>
              
              <div className="space-y-4">
                {recentTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{topic}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link href="https://newsletter.familyoffices.vip" target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    지난 뉴스레터 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                구독자 후기
              </h3>
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">활성 구독자</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3년+</div>
              <div className="text-gray-600 dark:text-gray-400">발행 기간</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BarChart className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">45%</div>
              <div className="text-gray-600 dark:text-gray-400">평균 열람률</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-10 h-10 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">주 2회</div>
              <div className="text-gray-600 dark:text-gray-400">정기 발송</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 구독하고 다음 호를 받아보세요
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            매주 월·금 오전 7시 30분, 당신의 투자 결정을 돕는 인사이트가 도착합니다
          </p>
          
          <div className="max-w-md mx-auto">
            <NewsletterSubscription 
              source="weekly-brief-cta"
              variant="inline"
              buttonVariant="secondary"
            />
          </div>
          
          <p className="text-sm text-purple-200 mt-6">
            구독 신청 즉시 환영 이메일과 함께 최신 뉴스레터를 보내드립니다
          </p>
        </div>
      </section>
    </div>
  );
}