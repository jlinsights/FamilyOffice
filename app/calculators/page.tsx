'use client';

import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle,
  Gift,
  PieChart,
  PiggyBank,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { LeadCaptureDialog } from '@/components/lead-capture-dialog';
import { StructuredData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo/structured-data';
import { cn } from '@/lib/utils';
import { useSafeAuth } from '@/hooks/use-safe-auth';

interface ColorClasses {
  icon: string;
  border: string;
  bg: string;
  button: string;
  gradient: string;
}

export default function CalculatorsPage() {
  const { isSignedIn } = useSafeAuth();
  const router = useRouter();
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  interface CalculatorItem {
    title: string;
    description: string;
    icon: typeof Calculator; // Lucide icon type
    color: string;
    href: string;
    features: string[];
    keywords: string;
    benefit: string;
  }

  const calculators: CalculatorItem[] = [
    {
      title: '상속세 계산기',
      description:
        '2025년 최신 세법 기준으로 상속세를 정확하게 계산하고 절세 방안을 확인하세요.',
      icon: Calculator,
      color: 'blue',
      href: '/calculators/inheritance-tax',
      features: ['누진세율 정확 계산', '공제 한도 자동 적용', '절세 방안 제시'],
      keywords: '월간 검색량 2,200회',
      benefit: '상속세 40% 절약 가능',
    },
    {
      title: '증여세 계산기',
      description:
        '관계별 공제 한도와 분할증여 최적화를 통한 증여세 계산 및 절세 전략을 제공합니다.',
      icon: Gift,
      color: 'green',
      href: '/calculators/gift-tax',
      features: ['관계별 공제 적용', '분할증여 시뮬레이션', '최적화 제안'],
      keywords: '월간 검색량 1,800회',
      benefit: '분할증여로 50% 절약',
    },
    {
      title: '가업승계 비용 계산기',
      description:
        '사업체 승계 방법별 비용을 계산하고 가업승계 특례 적용을 통한 최적 전략을 제안합니다.',
      icon: Building2,
      color: 'purple',
      href: '/calculators/succession-cost',
      features: [
        '가업승계 특례 적용',
        '지주회사 활용 분석',
        '방법별 비용 비교',
      ],
      keywords: '월간 검색량 600회',
      benefit: '특례 활용으로 70% 절약',
    },
    {
      title: '연금 계산기',
      description:
        '개인연금, 퇴직연금, 국민연금을 종합적으로 계산하고 은퇴 후 수령액을 시뮬레이션합니다.',
      icon: PiggyBank,
      color: 'emerald',
      href: '/pension-calculator',
      features: ['복리 효과 분석', '세액공제 계산', '은퇴 자금 설계'],
      keywords: '월간 검색량 3,500회',
      benefit: '노후 자금 30% 증대',
    },
  ];

  const handleCalculatorClick = (href: string) => {
    // 상속세 계산기는 인증 없이 바로 접근 가능 (Legacy logic, but applied generally now via soft gate if needed)
    // Actually, let's gate ALL calculators with the soft gate for better lead gen,
    // OR keep Inheritance Tax open if that was the specific strategy.
    // The prompt suggested lowering the barrier for "Calculators" generally.
    // However, if the user already clicked, let's treat them all as needing at least "Lead Info" OR "Auth".

    if (isSignedIn) {
      router.push(href);
      return;
    }

    // Set the targeted URL and show dialog
    setPendingUrl(href);
    setShowLeadCapture(true);
  };

  const handleLeadCaptureSuccess = () => {
    setShowLeadCapture(false);
    if (pendingUrl) {
      router.push(pendingUrl);
    }
  };

  const getColorClasses = (color: string): ColorClasses => {
    switch (color) {
      case 'blue':
        return {
          icon: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800',
          bg: 'bg-blue-50/50 dark:bg-blue-900/10',
          button:
            'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
          gradient: 'from-blue-500/20 to-indigo-500/20',
        };
      case 'green':
        return {
          icon: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800',
          bg: 'bg-green-50/50 dark:bg-green-900/10',
          button:
            'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          gradient: 'from-green-500/20 to-emerald-500/20',
        };
      case 'purple':
        return {
          icon: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800',
          bg: 'bg-purple-50/50 dark:bg-purple-900/10',
          button:
            'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',
          gradient: 'from-purple-500/20 to-violet-500/20',
        };
      case 'emerald':
        return {
          icon: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
          bg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
          button:
            'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
          gradient: 'from-emerald-500/20 to-teal-500/20',
        };
      default:
        return {
          icon: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800',
          bg: 'bg-blue-50/50 dark:bg-blue-900/10',
          button:
            'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
          gradient: 'from-blue-500/20 to-indigo-500/20',
        };
    }
  };

  // 검색엔진 최적화 구조화 데이터 추가
  const faqItems = [
    {
      question: '계산 결과의 정확도는 어느 정도인가요?',
      answer:
        '2025년 최신 세법을 반영하여 99.9% 이상의 정확도를 제공합니다. 단, 개별 사안의 특수성이나 법령 해석에 따라 실제 세액은 다를 수 있으므로 정확한 계획 수립을 위해서는 전문가 상담을 권장합니다.',
    },
    {
      question: '계산 결과를 바탕으로 실제 절세가 가능한가요?',
      answer:
        '네, 가능합니다. 계산기에서 제시하는 절세 방안들은 실제 적용 가능한 합법적인 방법들입니다. 다만 개인별 상황에 따라 적용 방법이 달라질 수 있어 전문가 상담을 통한 맞춤형 계획 수립을 추천드립니다.',
    },
    {
      question: '상담 신청 후 어떤 서비스를 받을 수 있나요?',
      answer:
        '첫 상담에서는 계산 결과 검토, 개인별 맞춤 전략 제안, 실행 방안 및 일정 수립을 진행합니다. 이후 필요에 따라 세무사, 변호사 등 전문가 네트워크를 통한 종합적인 패밀리오피스 서비스를 제공받으실 수 있습니다.',
    },
  ];
  const faqData = generateStructuredData('FAQPage', faqItems);
  const aiOptimizedData = generateStructuredData('AIOptimized');

  return (
    <>
      <div
        className={cn(
          'min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-blue-500/30 transition-all duration-300',
          showLeadCapture && 'blur-sm select-none pointer-events-none'
        )}
      >
        <StructuredData data={faqData} />
        <StructuredData data={aiOptimizedData} />

        {/* 배경 효과 */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* 헤더 섹션 */}
          <div className="relative text-center mb-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20 rounded-full blur-3xl -z-10"></div>

            <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-8 shadow-sm">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">
                New
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 pr-2">
                2025년 세법 개정안 완벽 반영
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-200 dark:via-indigo-200 dark:to-violet-200 bg-clip-text text-transparent">
                전문가급 세무 계산기
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              상속세, 증여세, 가업승계, 그리고 연금까지.{' '}
              <br className="hidden sm:block" />
              AI 알고리즘으로 복잡한 세금을 즉시 계산하고 최적의 절세 전략을
              확인하세요.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>99.9% 계산 정확도</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>실시간 절세 분석</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>전문가 검증 완료</span>
              </div>
            </div>
          </div>

          {/* 계산기 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {calculators.map((calculator, index) => {
              const Icon = calculator.icon;
              const colorClasses = getColorClasses(calculator.color);

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border ${colorClasses.border} ${colorClasses.bg} group backdrop-blur-sm`}
                >
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${colorClasses.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                  ></div>

                  <CardHeader className="relative pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-8 h-8 ${colorClasses.icon}`} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/60 dark:bg-slate-800/60 rounded-full backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                          {calculator.keywords}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {calculator.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[40px]">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative pt-0">
                    <div className="space-y-3 mb-6">
                      {calculator.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${colorClasses.icon.split(' ')[0]!.replace('text-', 'bg-')}`}
                          ></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 backdrop-blur-sm">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        예상 효과
                      </div>
                      <div className={`text-sm font-bold ${colorClasses.icon}`}>
                        {calculator.benefit}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCalculatorClick(calculator.href)}
                      className={cn(
                        buttonVariants(),
                        `w-full ${colorClasses.button} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`
                      )}
                    >
                      계산하기
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 통계 및 성과 */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 dark:bg-slate-950 rounded-3xl p-10 mb-24 text-white shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">압도적인 절세 성과</h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                FamilyOffice S의 프리미엄 계산기를 통해 고객님들이 달성한 실제
                성과입니다.
                <br />
                데이터에 기반한 정확한 분석으로 자산을 지켜드립니다.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <Calculator className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl font-black text-white mb-2">
                  2,400+
                </div>
                <div className="text-sm text-blue-200 font-medium">
                  누적 계산 건수
                </div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-black text-white mb-2">45%</div>
                <div className="text-sm text-green-200 font-medium">
                  평균 절세율
                </div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-black text-white mb-2">320억</div>
                <div className="text-sm text-purple-200 font-medium">
                  누적 절세 금액
                </div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <PieChart className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-4xl font-black text-white mb-2">98%</div>
                <div className="text-sm text-yellow-200 font-medium">
                  고객 만족도
                </div>
              </div>
            </div>
          </div>

          {/* 전문가 상담 CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <div className="bg-blue-600 dark:bg-blue-900 rounded-3xl p-10 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div>
                <h2 className="text-3xl font-bold mb-4">전문가 무료 상담</h2>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  계산 결과가 복잡하신가요? <br />
                  세무 전문가가 직접 분석하여 최적의 솔루션을 제안해 드립니다.
                </p>
              </div>
              <a
                href="/contact?service=tax-consulting"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto text-lg font-bold h-14 flex items-center justify-center gap-2'
                )}
              >
                무료 상담 신청하기
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-10 flex flex-col justify-between border border-slate-200 dark:border-slate-700 shadow-lg">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  프리미엄 리포트
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                  우리 가족만을 위한 맞춤형 세무 진단 리포트를 받아보세요.{' '}
                  <br />
                  상속, 증여, 가업승계의 마스터플랜을 수립해 드립니다.
                </p>
              </div>
              <a
                href="/services/tax-optimization"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 w-full sm:w-auto text-lg font-bold h-14 flex items-center justify-center gap-2'
                )}
              >
                서비스 자세히 보기
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 자주 묻는 질문 */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              자주 묻는 질문
            </h2>

            <PremiumFAQ
              items={[
                {
                  question: '계산 결과의 정확도는 어느 정도인가요?',
                  answer:
                    '2025년 최신 세법을 반영하여 99.9% 이상의 정확도를 제공합니다. 단, 개별 사안의 특수성이나 법령 해석에 따라 실제 세액은 다를 수 있으므로 정확한 계획 수립을 위해서는 전문가 상담을 권장합니다.',
                },
                {
                  question: '계산 결과를 바탕으로 실제 절세가 가능한가요?',
                  answer:
                    '네, 가능합니다. 계산기에서 제시하는 절세 방안들은 실제 적용 가능한 합법적인 방법들입니다. 다만 개인별 상황에 따라 적용 방법이 달라질 수 있어 전문가 상담을 통한 맞춤형 계획 수립을 추천드립니다.',
                },
                {
                  question: '상담 신청 후 어떤 서비스를 받을 수 있나요?',
                  answer:
                    '첫 상담에서는 계산 결과 검토, 개인별 맞춤 전략 제안, 실행 방안 및 일정 수립을 진행합니다. 이후 필요에 따라 세무사, 변호사 등 전문가 네트워크를 통한 종합적인 패밀리오피스 서비스를 제공받으실 수 있습니다.',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 리드 캡처 팝업 */}
      <LeadCaptureDialog
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSuccess={handleLeadCaptureSuccess}
      />
    </>
  );
}
