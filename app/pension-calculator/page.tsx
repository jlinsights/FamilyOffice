import { Metadata } from 'next';
import { Calculator, TrendingUp, PiggyBank, Shield } from 'lucide-react';
import PensionCalculatorForm from '@/components/pension/pension-calculator-form';
import { PensionCalculatorTracking } from '@/components/kakao/pension-calculator-tracking';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: '연금 계산기 - 정확한 노후 준비 계산',
  description: '개인연금, 퇴직연금, 국민연금을 종합적으로 계산해보세요. 성공한 CEO를 위한 맞춤형 연금 설계 서비스.',
  keywords: '연금계산기, 노후설계, 개인연금, 퇴직연금, 연금보험, 세금 절약, 은퇴 계획',
  openGraph: {
    title: '연금 계산기 | FamilyOffice S',
    description: '성공한 CEO를 위한 정확한 연금 계산과 노후 설계. 세금 혜택까지 고려한 종합 연금 플래너.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function PensionCalculatorPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <PensionCalculatorTracking />
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 backdrop-blur-sm rounded-full p-4">
                  <Calculator className="h-12 w-12 text-primary" />
              </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                정확한 <span className="text-primary">연금 계산기</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              성공한 CEO를 위한 종합적인 노후 설계
              <br />
              개인연금, 퇴직연금, 세금혜택까지 한번에
            </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="bg-card border border-border backdrop-blur-sm rounded-lg p-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2 text-card-foreground">정확한 수익률 계산</h3>
                  <p className="text-sm text-muted-foreground">복리 효과와 세금 혜택을 고려한 정밀 계산</p>
                </div>
                <div className="bg-card border border-border backdrop-blur-sm rounded-lg p-6">
                  <PiggyBank className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2 text-card-foreground">맞춤형 연금 설계</h3>
                  <p className="text-sm text-muted-foreground">개인 상황에 최적화된 연금 포트폴리오</p>
                </div>
                <div className="bg-card border border-border backdrop-blur-sm rounded-lg p-6">
                  <Shield className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2 text-card-foreground">세금 절약 효과</h3>
                  <p className="text-sm text-muted-foreground">연금저축과 퇴직연금의 세액공제 분석</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PensionCalculatorForm />
        </div>

        {/* Information Section */}
        <div className="bg-card py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-card-foreground mb-4">
                연금 계산기 사용 가이드
              </h2>
              <p className="text-lg text-muted-foreground">
                정확한 노후 설계를 위한 단계별 가이드
              </p>
            </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-6">
                  📊 계산 항목 설명
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium text-card-foreground">현재 나이</h4>
                    <p className="text-muted-foreground text-sm">연금 수령까지의 투자 기간 계산 기준</p>
                  </div>
                  <div className="border-l-4 border-green-600 dark:border-green-400 pl-4">
                    <h4 className="font-medium text-card-foreground">월 납입액</h4>
                    <p className="text-muted-foreground text-sm">매월 납입할 연금 금액 (개인연금 + 퇴직연금)</p>
                  </div>
                  <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-4">
                    <h4 className="font-medium text-card-foreground">연간 수익률</h4>
                    <p className="text-muted-foreground text-sm">예상 투자 수익률 (일반적으로 3-7%)</p>
                  </div>
                  <div className="border-l-4 border-red-600 dark:border-red-400 pl-4">
                    <h4 className="font-medium text-card-foreground">연금 수령 나이</h4>
                    <p className="text-muted-foreground text-sm">연금을 받기 시작할 나이 (55세 이상)</p>
                </div>
              </div>
            </div>
            
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-6">
                  💡 계산 결과 활용법
                </h3>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-card-foreground mb-2">
                      1. 목표 설정
                    </h4>
                    <p className="text-muted-foreground text-sm">
                    현재 생활비의 70-80% 수준의 노후 생활비를 목표로 설정
                  </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-card-foreground mb-2">
                      2. 납입액 조정
                    </h4>
                    <p className="text-muted-foreground text-sm">
                    목표액 달성을 위해 월 납입액을 점진적으로 증액
                  </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-card-foreground mb-2">
                      3. 세금 혜택 극대화
                    </h4>
                    <p className="text-muted-foreground text-sm">
                    연금저축 세액공제 한도(연 700만원)를 최대한 활용
                  </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-card-foreground mb-2">
                      4. 정기적 점검
                    </h4>
                    <p className="text-muted-foreground text-sm">
                    연 1-2회 계산을 다시 해보며 계획을 업데이트
                  </p>
                </div>
              </div>
            </div>
          </div>
          
            <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                ⚠️ 중요한 고려사항
              </h3>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
              <li>• 인플레이션률을 고려하여 실질 구매력을 계산해야 합니다</li>
              <li>• 의료비 등 노후 추가 비용을 별도로 준비하는 것이 좋습니다</li>
              <li>• 연금 수령 방식(일시금 vs 연금)에 따라 세금이 다를 수 있습니다</li>
              <li>• 전문 상담을 통해 개인별 최적 전략을 수립하시기 바랍니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}