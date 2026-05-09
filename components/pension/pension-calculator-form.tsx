'use client';

import {
  Calculator,
  Calendar,
  DollarSign,
  Lightbulb,
  Percent,
  PieChart,
  RotateCcw,
  Target,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AnimatedCounter } from '@/components/animated-counter';
import { formatNumber, parseNumber } from '@/lib/utils';

interface PensionInputs {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  annualReturn: number;
  initialAmount: number;
  inflationRate: number;
}

interface PensionResults {
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  monthlyPension: number;
  taxBenefit: number;
  realPurchasingPower: number;
}

// 기본값 정의
const DEFAULT_INPUTS: PensionInputs = {
  currentAge: 35,
  retirementAge: 65,
  monthlyContribution: 0,
  annualReturn: 5.0,
  initialAmount: 0,
  inflationRate: 2.5,
};

export default function PensionCalculatorForm() {
  const [inputs, setInputs] = useState<PensionInputs>(DEFAULT_INPUTS);

  const [results, setResults] = useState<PensionResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleInputChange = (field: keyof PensionInputs, value: string) => {
    const numericValue =
      field === 'annualReturn' || field === 'inflationRate'
        ? parseFloat(value) || 0
        : parseNumber(value);

    setInputs(prev => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  const resetToDefaults = () => {
    setInputs(DEFAULT_INPUTS);
    setResults(null);
    setShouldAnimate(false);
  };

  const calculatePension = () => {
    setIsCalculating(true);
    setShouldAnimate(false);

    // Simulate calculation delay
    setTimeout(() => {
      const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
      const monthsToRetirement = yearsToRetirement * 12;
      const monthlyRate = inputs.annualReturn / 100 / 12;

      // Future Value of Annuity calculation
      let futureValueAnnuity = 0;
      if (monthlyRate > 0) {
        futureValueAnnuity =
          (inputs.monthlyContribution *
            (Math.pow(1 + monthlyRate, monthsToRetirement) - 1)) /
          monthlyRate;
      } else {
        futureValueAnnuity = inputs.monthlyContribution * monthsToRetirement;
      }

      // Future Value of Initial Amount
      const futureValueInitial =
        inputs.initialAmount *
        Math.pow(1 + inputs.annualReturn / 100, yearsToRetirement);

      const totalSavings = futureValueAnnuity + futureValueInitial;
      const totalContributions =
        inputs.initialAmount + inputs.monthlyContribution * monthsToRetirement;
      const totalInterest = totalSavings - totalContributions;

      // Monthly pension (assuming 20 years of withdrawal at 4% annual rate)
      const withdrawalRate = 0.04 / 12;
      const withdrawalPeriods = 20 * 12; // 20 years
      const monthlyPension =
        (totalSavings * withdrawalRate) /
        (1 - Math.pow(1 + withdrawalRate, -withdrawalPeriods));

      // Tax benefit calculation (assuming 15% tax deduction on contributions)
      const annualContribution = inputs.monthlyContribution * 12;
      const taxDeductionLimit = 9000000; // 2025년 기준 900만원 세액공제 한도 (연금저축+IRP)
      const deductibleAmount = Math.min(annualContribution, taxDeductionLimit);
      const taxBenefit = deductibleAmount * 0.165 * yearsToRetirement; // 16.5% 가정 (총급여 5,500만원 이하)

      // Real purchasing power (adjusted for inflation)
      const realPurchasingPower =
        monthlyPension /
        Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);

      setResults({
        totalSavings,
        totalContributions,
        totalInterest,
        monthlyPension,
        taxBenefit,
        realPurchasingPower,
      });

      setIsCalculating(false);
      // 계산 완료 후 애니메이션 시작
      setTimeout(() => setShouldAnimate(true), 100);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Input Form */}
      <div className="xl:col-span-5 space-y-8">
        <Card className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl dark:shadow-slate-900/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                  연금 정보 입력
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                  현재 상황과 목표를 입력해주세요
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="currentAge"
                    className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-emerald-500" />
                    현재 나이
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentAge"
                      type="number"
                      value={inputs.currentAge}
                      onChange={e =>
                        handleInputChange('currentAge', e.target.value)
                      }
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 rounded-xl transition-all duration-200 pr-12"
                      min="20"
                      max="70"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      세
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="retirementAge"
                    className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-blue-500" />
                    은퇴 나이
                  </Label>
                  <div className="relative">
                    <Input
                      id="retirementAge"
                      type="number"
                      value={inputs.retirementAge}
                      onChange={e =>
                        handleInputChange('retirementAge', e.target.value)
                      }
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 pr-12"
                      min="55"
                      max="80"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      세
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="initialAmount"
                  className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4 text-purple-500" />
                  초기 투자금액
                </Label>
                <div className="relative">
                  <Input
                    id="initialAmount"
                    type="text"
                    value={formatNumber(inputs.initialAmount)}
                    onChange={e =>
                      handleInputChange('initialAmount', e.target.value)
                    }
                    className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 rounded-xl transition-all duration-200 pr-12"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    원
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="monthlyContribution"
                  className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-amber-500" />월 납입액
                </Label>
                <div className="relative">
                  <Input
                    id="monthlyContribution"
                    type="text"
                    value={formatNumber(inputs.monthlyContribution)}
                    onChange={e =>
                      handleInputChange('monthlyContribution', e.target.value)
                    }
                    className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 dark:focus:ring-amber-400/20 rounded-xl transition-all duration-200 pr-12"
                    placeholder="1,000,000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    원
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-1">
                  * 연금저축 + 퇴직연금(IRP) 합산 금액 권장
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="annualReturn"
                    className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    예상 수익률
                  </Label>
                  <div className="relative">
                    <Input
                      id="annualReturn"
                      type="number"
                      value={inputs.annualReturn}
                      onChange={e =>
                        handleInputChange('annualReturn', e.target.value)
                      }
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20 rounded-xl transition-all duration-200 pr-12"
                      step="0.1"
                      min="0"
                      max="15"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="inflationRate"
                    className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2"
                  >
                    <Percent className="w-4 h-4 text-indigo-500" />
                    물가상승률
                  </Label>
                  <div className="relative">
                    <Input
                      id="inflationRate"
                      type="number"
                      value={inputs.inflationRate}
                      onChange={e =>
                        handleInputChange('inflationRate', e.target.value)
                      }
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 rounded-xl transition-all duration-200 pr-12"
                      step="0.1"
                      min="0"
                      max="10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={resetToDefaults}
                variant="outline"
                className="flex-1 h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                disabled={isCalculating}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                초기화
              </Button>

              <Button
                onClick={calculatePension}
                className="flex-[2] h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    계산 중...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    연금 계산하기
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="xl:col-span-7 space-y-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-700/60 border-2 border-emerald-200/60 dark:border-emerald-700/60 shadow-3xl dark:shadow-slate-900/70 h-full">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-cyan-400/10 dark:from-emerald-300/5 dark:via-teal-300/5 dark:to-cyan-300/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-400/5 via-emerald-400/5 to-teal-400/5 dark:from-blue-300/3 dark:via-emerald-300/3 dark:to-teal-300/3 rounded-full blur-3xl"></div>

          <CardHeader className="relative pb-8">
            <CardTitle className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-500 rounded-3xl text-white shadow-2xl">
                <PieChart className="w-8 h-8" />
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  계산 결과
                </span>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  2025년 세법 기준 • 복리 효과 반영
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative space-y-8">
            {results ? (
              <div className="space-y-6">
                {/* 핵심 결과 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/80 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-emerald-800 dark:text-emerald-200 font-bold">
                        총 연금 자산
                      </span>
                    </div>
                    <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
                      <AnimatedCounter
                        end={Math.round(results.totalSavings)}
                        startAnimation={shouldAnimate}
                        duration={2000}
                        formatNumber={formatNumber}
                        suffix="원"
                      />
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                      <span className="text-blue-800 dark:text-blue-200 font-bold">
                        월 예상 수령액
                      </span>
                    </div>
                    <p className="text-3xl font-black text-blue-700 dark:text-blue-300">
                      <AnimatedCounter
                        end={Math.round(results.monthlyPension)}
                        startAnimation={shouldAnimate}
                        duration={2500}
                        formatNumber={formatNumber}
                        suffix="원"
                      />
                    </p>
                  </div>
                </div>

                {/* 상세 분석 */}
                <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      총 납입원금
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      <AnimatedCounter
                        end={Math.round(results.totalContributions)}
                        startAnimation={shouldAnimate}
                        duration={1800}
                        formatNumber={formatNumber}
                        suffix="원"
                      />
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      투자 수익 (이자)
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      <AnimatedCounter
                        end={Math.round(results.totalInterest)}
                        startAnimation={shouldAnimate}
                        duration={2200}
                        formatNumber={formatNumber}
                        prefix="+"
                        suffix="원"
                      />
                    </span>
                  </div>

                  <Separator className="bg-slate-200 dark:bg-slate-700" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        예상 세액공제 혜택
                      </span>
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                        Total
                      </span>
                    </div>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter
                        end={Math.round(results.taxBenefit)}
                        startAnimation={shouldAnimate}
                        duration={1600}
                        formatNumber={formatNumber}
                        suffix="원"
                      />
                    </span>
                  </div>
                </div>

                {/* AI 인사이트 */}
                <div className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50/90 to-orange-50/60 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/10 dark:bg-amber-400/20 rounded-xl">
                      <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-2">
                        💡 AI 은퇴 설계 제안
                      </h4>
                      <div className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                        <p className="leading-relaxed">
                          현재 물가상승률({inputs.inflationRate}%)을 고려했을
                          때, 은퇴 시점의 실질 구매력은 월{' '}
                          <strong className="text-amber-700 dark:text-amber-300">
                            {formatNumber(
                              Math.round(results.realPurchasingPower)
                            )}
                            원
                          </strong>{' '}
                          수준입니다.
                        </p>
                        <p className="leading-relaxed mt-2">
                          더 풍요로운 노후를 위해{' '}
                          <strong className="text-amber-700 dark:text-amber-300">
                            월 납입액을 10% 증액
                          </strong>
                          하거나,
                          <strong className="text-amber-700 dark:text-amber-300">
                            ISA 계좌 만기 자금
                          </strong>
                          을 연금으로 전환하여 추가 세액공제를 받는 것을
                          추천합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <Button
                    className="h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    <a
                      href="/contact?service=pension"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Target className="w-5 h-5" />
                      전문가 상담 신청
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-xl transition-all duration-200"
                    size="lg"
                  >
                    <a
                      href="/calculators/tax-strategy"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-5 h-5" />
                      절세 전략 더보기
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-full p-8 mb-6 animate-pulse">
                  <Calculator className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  연금 계산을 시작해보세요
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                  좌측 입력란에 현재 나이, 은퇴 목표, 납입 계획을 입력하시면
                  복리 효과가 적용된 예상 연금 수령액을 분석해드립니다.
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full">
                  <Target className="w-4 h-4" />
                  <span>2025년 세법 개정안 반영 완료</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
