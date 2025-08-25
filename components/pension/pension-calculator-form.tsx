'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calculator, PieChart, TrendingUp, Wallet, Calendar, Target, RotateCcw } from 'lucide-react';
import { formatNumber, parseNumber } from '@/lib/utils';
import { AnimatedCounter } from '@/components/animated-counter';

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
  inflationRate: 2.5
};

export default function PensionCalculatorForm() {
  const [inputs, setInputs] = useState<PensionInputs>(DEFAULT_INPUTS);

  const [results, setResults] = useState<PensionResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleInputChange = (field: keyof PensionInputs, value: string) => {
    const numericValue = field === 'annualReturn' || field === 'inflationRate' 
      ? parseFloat(value) || 0 
      : parseNumber(value);
    
    setInputs(prev => ({
      ...prev,
      [field]: numericValue
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
        futureValueAnnuity = inputs.monthlyContribution * 
          (Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate;
      } else {
        futureValueAnnuity = inputs.monthlyContribution * monthsToRetirement;
      }
      
      // Future Value of Initial Amount
      const futureValueInitial = inputs.initialAmount * 
        Math.pow(1 + inputs.annualReturn / 100, yearsToRetirement);
      
      const totalSavings = futureValueAnnuity + futureValueInitial;
      const totalContributions = inputs.initialAmount + 
        (inputs.monthlyContribution * monthsToRetirement);
      const totalInterest = totalSavings - totalContributions;
      
      // Monthly pension (assuming 20 years of withdrawal at 4% annual rate)
      const withdrawalRate = 0.04 / 12;
      const withdrawalPeriods = 20 * 12; // 20 years
      const monthlyPension = totalSavings * withdrawalRate / 
        (1 - Math.pow(1 + withdrawalRate, -withdrawalPeriods));
      
      // Tax benefit calculation (assuming 15% tax deduction on contributions)
      const annualContribution = inputs.monthlyContribution * 12;
      const taxDeductionLimit = 7000000; // 700만원 세액공제 한도
      const deductibleAmount = Math.min(annualContribution, taxDeductionLimit);
      const taxBenefit = deductibleAmount * 0.15 * yearsToRetirement;
      
      // Real purchasing power (adjusted for inflation)
      const realPurchasingPower = monthlyPension / 
        Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
      
      setResults({
        totalSavings,
        totalContributions,
        totalInterest,
        monthlyPension,
        taxBenefit,
        realPurchasingPower
      });
      
      setIsCalculating(false);
      // 계산 완료 후 애니메이션 시작
      setTimeout(() => setShouldAnimate(true), 100);
    }, 1000);
  };

  // 자동 계산 비활성화 - 수동 계산만 허용
  // useEffect(() => {
  //   // Auto-calculate when inputs change (with debounce)
  //   const timeoutId = setTimeout(() => {
  //     if (inputs.currentAge < inputs.retirementAge && 
  //         inputs.monthlyContribution > 0 && 
  //         inputs.annualReturn >= 0) {
  //       calculatePension();
  //     }
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [inputs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Input Form */}
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm w-full max-w-none">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Calculator className="h-5 w-5 text-primary" />
            연금 계산 입력
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentAge" className="text-sm font-medium">
                현재 나이
              </Label>
              <div className="relative">
                <Input
                  id="currentAge"
                  type="number"
                  value={inputs.currentAge}
                  onChange={(e) => handleInputChange('currentAge', e.target.value)}
                  className="pr-12"
                  min="20"
                  max="70"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  세
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="retirementAge" className="text-sm font-medium">
                연금 수령 나이
              </Label>
              <div className="relative">
                <Input
                  id="retirementAge"
                  type="number"
                  value={inputs.retirementAge}
                  onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                  className="pr-12"
                  min="55"
                  max="80"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  세
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="initialAmount" className="text-sm font-medium">
              초기 투자금액
            </Label>
            <div className="relative">
              <Input
                id="initialAmount"
                type="text"
                value={formatNumber(inputs.initialAmount)}
                onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                className="pr-12"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                원
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="monthlyContribution" className="text-sm font-medium">
              월 납입액
            </Label>
            <div className="relative">
              <Input
                id="monthlyContribution"
                type="text"
                value={formatNumber(inputs.monthlyContribution)}
                onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                className="pr-12"
                placeholder="1,000,000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                원
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              연금저축과 퇴직연금 합계 금액을 입력하세요
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="annualReturn" className="text-sm font-medium">
                연간 예상 수익률
              </Label>
              <div className="relative">
                <Input
                  id="annualReturn"
                  type="number"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange('annualReturn', e.target.value)}
                  className="pr-12"
                  step="0.1"
                  min="0"
                  max="15"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  %
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="inflationRate" className="text-sm font-medium">
                물가상승률
              </Label>
              <div className="relative">
                <Input
                  id="inflationRate"
                  type="number"
                  value={inputs.inflationRate}
                  onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                  className="pr-12"
                  step="0.1"
                  min="0"
                  max="10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={resetToDefaults}
              variant="outline"
              className="flex-1"
              disabled={isCalculating}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              초기화 하기
            </Button>
            
            <Button 
              onClick={calculatePension} 
              className="flex-1"
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

      {/* Results */}
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm w-full max-w-none">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <PieChart className="h-5 w-5 text-primary" />
            계산 결과
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {results ? (
            <div className="space-y-6">
              {/* 핵심 결과 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 dark:border-primary/20">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">총 연금 자산</p>
                  <p className="text-2xl font-bold text-primary">
                    <AnimatedCounter
                      end={Math.round(results.totalSavings)}
                      startAnimation={shouldAnimate}
                      duration={2000}
                      formatNumber={formatNumber}
                      suffix="원"
                    />
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <Wallet className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">월 예상 연금</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
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

              <Separator />

              {/* 상세 결과 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">총 납입원금</span>
                  <span className="font-medium">
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
                  <span className="text-muted-foreground">투자 수익</span>
                  <span className="font-medium text-primary">
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
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">예상 세액공제 혜택</span>
                  <span className="font-medium text-green-600">
                    <AnimatedCounter
                      end={Math.round(results.taxBenefit)}
                      startAnimation={shouldAnimate}
                      duration={1600}
                      formatNumber={formatNumber}
                      suffix="원"
                    />
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">실질 구매력 (현재 가치)</span>
                  <span className="font-medium text-orange-600">
                    <AnimatedCounter
                      end={Math.round(results.realPurchasingPower)}
                      startAnimation={shouldAnimate}
                      duration={2800}
                      formatNumber={formatNumber}
                      suffix="원/월"
                    />
                  </span>
                </div>
              </div>

              {/* 투자 기간 정보 */}
              <div className="bg-muted/50 dark:bg-slate-800/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">투자 계획 요약</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 투자 기간: {inputs.retirementAge - inputs.currentAge}년</p>
                  <p>• 월 납입액: {formatNumber(inputs.monthlyContribution)}원</p>
                  <p>• 예상 수익률: {inputs.annualReturn}% (연간)</p>
                  <p>• 물가상승률: {inputs.inflationRate}% (연간)</p>
                </div>
              </div>

              {/* 추천 메시지 */}
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      전문가 조언
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      현재 계획으로 월{' '}
                      <AnimatedCounter
                        end={Math.round(results.realPurchasingPower)}
                        startAnimation={shouldAnimate}
                        duration={2800}
                        formatNumber={formatNumber}
                        suffix="원"
                      />{' '}
                      (현재 구매력 기준)의 연금을 받을 수 있습니다.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      더 풍족한 노후를 위해 월 납입액을 늘리거나 수익률이 높은 상품을 고려해보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <div className="bg-muted/30 dark:bg-slate-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-12 w-12 opacity-50" />
              </div>
              <p className="text-lg font-medium mb-2">계산 대기 중</p>
              <p className="text-sm">좌측 입력란에 정보를 입력하고</p>
              <p className="text-sm">연금 계산하기 버튼을 눌러주세요.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}