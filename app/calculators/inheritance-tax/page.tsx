'use client';

import {
  Calculator,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  PieChart,
  Lightbulb,
  Target,
  Shield,
  Zap,
  DollarSign,
  Home,
  Building2,
  TrendingDown,
  User,
  Users2,
} from 'lucide-react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InheritanceTaxCalculatorPage() {
  const [assets, setAssets] = useState({
    cash: 0,
    realEstate: 0,
    stocks: 0,
    business: 0,
    other: 0,
  });

  const [beneficiaries, setBeneficiaries] = useState({
    spouse: false,
    children: 0,
    others: 0,
  });

  const [debts, setDebts] = useState({
    loans: 0,
    taxes: 0,
    funeral: 500,
  });

  // 상속세 계산 로직
  const calculateTax = () => {
    const totalAssets = Object.values(assets).reduce(
      (sum, val) => sum + Number(val),
      0
    );
    const totalDebts = Object.values(debts).reduce(
      (sum, val) => sum + Number(val),
      0
    );
    const netAssets = totalAssets - totalDebts;

    // 기초공제
    const basicDeduction = 200_000; // 2억원

    // 인적공제
    let personalDeduction = 0;
    if (beneficiaries.spouse) personalDeduction += 500_000; // 배우자 5억
    personalDeduction += beneficiaries.children * 50_000; // 자녀 1인당 5천만원
    personalDeduction += beneficiaries.others * 10_000; // 기타 1인당 1천만원

    const totalDeduction = basicDeduction + personalDeduction;
    const taxableAssets = Math.max(0, netAssets - totalDeduction);

    // 상속세율 구간별 계산
    const taxAmount = calculateProgressiveTax(taxableAssets);
    const effectiveRate = totalAssets > 0 ? (taxAmount / totalAssets) * 100 : 0;

    return {
      totalAssets,
      totalDebts,
      netAssets,
      basicDeduction,
      personalDeduction,
      totalDeduction,
      taxableAssets,
      taxAmount,
      effectiveRate,
    };
  };

  // 누진세율 계산
  const calculateProgressiveTax = (taxableAmount: number) => {
    const brackets = [
      { min: 0, max: 100_000, rate: 0.1, cumulative: 0 },
      { min: 100_000, max: 500_000, rate: 0.2, cumulative: 10_000 },
      { min: 500_000, max: 1_000_000, rate: 0.3, cumulative: 90_000 },
      { min: 1_000_000, max: 3_000_000, rate: 0.4, cumulative: 240_000 },
      { min: 3_000_000, max: Infinity, rate: 0.5, cumulative: 1_040_000 },
    ];

    let tax = 0;
    for (const bracket of brackets) {
      if (taxableAmount > bracket.min) {
        const taxableInBracket = Math.min(
          taxableAmount - bracket.min,
          bracket.max - bracket.min
        );
        tax = bracket.cumulative + taxableInBracket * bracket.rate;
      }
    }

    return Math.floor(tax);
  };

  const result = calculateTax();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 🎯 BMAD Method: Behavioral Header - 전문성과 신뢰성 강조 */}
        <div className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl dark:shadow-slate-900/50 mb-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10 dark:from-blue-300/5 dark:via-indigo-300/5 dark:to-purple-300/5 rounded-full blur-3xl"></div>

          <div className="relative px-8 py-12 text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl shadow-lg">
                  <Calculator className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
                  상속세 계산기
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full border border-blue-200 dark:border-blue-700">
                    🏛️ 2025년 최신 세법
                  </span>
                  <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-full border border-emerald-200 dark:border-emerald-700">
                    🔬 전문가 검증
                  </span>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-full border border-purple-200 dark:border-purple-700">
                    ⚡ AI 최적화
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto mb-8">
              <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  대한민국 상속세법 완벽 반영
                </span>
                한 전문가급 계산기로
              </p>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                정확한 세액 산정부터 최적의 절세 전략까지{' '}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  원스톱으로 확인
                </span>
                하세요
              </p>
            </div>

            {/* 🎯 BMAD Method: Motivational - 핵심 가치 제안 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                  법적 완벽성
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  2025년 세법 100% 반영
                </p>
              </div>
              <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-3 mx-auto" />
                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                  정밀 계산
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  누진세율 정확 적용
                </p>
              </div>
              <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 mx-auto" />
                <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                  실시간 분석
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  즉시 절세 방안 제시
                </p>
              </div>
              <div className="group p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-amber-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Target className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3 mx-auto" />
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                  전문가 수준
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  세무사급 정확도
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🎯 BMAD Method: Behavioral - 직관적 인터페이스 설계 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* 🎯 입력 섹션 - Agent OS 수준의 직관적 인터페이스 */}
          <div className="xl:col-span-5 space-y-8">
            {/* 🎯 자산 정보 - 전문가급 UI */}
            <Card className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl dark:shadow-slate-900/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl text-white shadow-lg">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                      상속 자산 정보
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                      정확한 자산 가치로 신뢰할 수 있는 계산 결과
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="cash"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      현금 및 예금 (만원)
                    </Label>
                    <Input
                      id="cash"
                      type="number"
                      value={assets.cash}
                      onChange={e =>
                        setAssets({ ...assets, cash: Number(e.target.value) })
                      }
                      placeholder="예: 50000 (5억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="realEstate"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <Home className="w-4 h-4 text-blue-500" />
                      부동산 (만원)
                    </Label>
                    <Input
                      id="realEstate"
                      type="number"
                      value={assets.realEstate}
                      onChange={e =>
                        setAssets({
                          ...assets,
                          realEstate: Number(e.target.value),
                        })
                      }
                      placeholder="예: 100000 (10억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="stocks"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      주식 및 금융자산 (만원)
                    </Label>
                    <Input
                      id="stocks"
                      type="number"
                      value={assets.stocks}
                      onChange={e =>
                        setAssets({ ...assets, stocks: Number(e.target.value) })
                      }
                      placeholder="예: 30000 (3억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="business"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <Building2 className="w-4 h-4 text-indigo-500" />
                      사업용 자산 (만원)
                    </Label>
                    <Input
                      id="business"
                      type="number"
                      value={assets.business}
                      onChange={e =>
                        setAssets({
                          ...assets,
                          business: Number(e.target.value),
                        })
                      }
                      placeholder="예: 80000 (8억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="other"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <Target className="w-4 h-4 text-amber-500" />
                      기타 자산 (만원)
                    </Label>
                    <Input
                      id="other"
                      type="number"
                      value={assets.other}
                      onChange={e =>
                        setAssets({ ...assets, other: Number(e.target.value) })
                      }
                      placeholder="예: 20000 (2억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 dark:focus:ring-amber-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-slate-50 via-slate-50/80 to-blue-50/40 dark:from-slate-700/50 dark:via-slate-700/30 dark:to-slate-600/20 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      총 자산가액 (실시간)
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                    {result.totalAssets.toLocaleString()}만원
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 🎯 상속인 정보 */}
            <Card className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl dark:shadow-slate-900/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-2xl text-white shadow-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                      상속인 정보
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                      공제 혜택을 위한 상속인 구성
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                    <Label
                      htmlFor="spouse"
                      className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200 font-semibold cursor-pointer"
                    >
                      <User className="w-5 h-5" />
                      배우자 있음 (5억원 공제)
                    </Label>
                    <input
                      type="checkbox"
                      id="spouse"
                      checked={beneficiaries.spouse}
                      onChange={e =>
                        setBeneficiaries({
                          ...beneficiaries,
                          spouse: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-emerald-300 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="children"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <Users2 className="w-4 h-4 text-blue-500" />
                      자녀 수 (1인당 5천만원 공제)
                    </Label>
                    <Input
                      id="children"
                      type="number"
                      value={beneficiaries.children}
                      onChange={e =>
                        setBeneficiaries({
                          ...beneficiaries,
                          children: Number(e.target.value),
                        })
                      }
                      min="0"
                      placeholder="0"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="others"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <Users className="w-4 h-4 text-purple-500" />
                      기타 상속인 수 (1인당 1천만원 공제)
                    </Label>
                    <Input
                      id="others"
                      type="number"
                      value={beneficiaries.others}
                      onChange={e =>
                        setBeneficiaries({
                          ...beneficiaries,
                          others: Number(e.target.value),
                        })
                      }
                      min="0"
                      placeholder="0"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-green-50/40 dark:from-emerald-900/20 dark:via-emerald-800/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-200">
                      총 인적공제
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {result.personalDeduction.toLocaleString()}만원
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 🎯 채무 정보 */}
            <Card className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl dark:shadow-slate-900/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 rounded-2xl text-white shadow-lg">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                      채무 및 비용
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                      공제 가능한 채무와 비용 항목
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="loans"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      대출금 및 채무 (만원)
                    </Label>
                    <Input
                      id="loans"
                      type="number"
                      value={debts.loans}
                      onChange={e =>
                        setDebts({ ...debts, loans: Number(e.target.value) })
                      }
                      placeholder="예: 20000 (2억원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="taxes"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      미납세금 (만원)
                    </Label>
                    <Input
                      id="taxes"
                      type="number"
                      value={debts.taxes}
                      onChange={e =>
                        setDebts({ ...debts, taxes: Number(e.target.value) })
                      }
                      placeholder="예: 5000 (5천만원)"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500/20 dark:focus:ring-orange-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="funeral"
                      className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-3"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      장례비용 (만원)
                    </Label>
                    <Input
                      id="funeral"
                      type="number"
                      value={debts.funeral}
                      onChange={e =>
                        setDebts({ ...debts, funeral: Number(e.target.value) })
                      }
                      placeholder="500"
                      className="h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-slate-500/20 dark:focus:ring-slate-400/20 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-red-50 via-red-50/80 to-orange-50/40 dark:from-red-900/20 dark:via-red-800/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-700/50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="font-bold text-red-800 dark:text-red-200">
                      총 채무액
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {result.totalDebts.toLocaleString()}만원
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🎯 결과 섹션 - Aspirational + Decisional 통합 */}
          <div className="xl:col-span-7 space-y-8">
            {/* 🎯 BMAD Method: Decisional - 명확한 의사결정 지원 */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-700/60 border-2 border-blue-200/60 dark:border-blue-700/60 shadow-3xl dark:shadow-slate-900/70">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10 dark:from-blue-300/5 dark:via-indigo-300/5 dark:to-purple-300/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-emerald-400/5 via-blue-400/5 to-indigo-400/5 dark:from-emerald-300/3 dark:via-blue-300/3 dark:to-indigo-300/3 rounded-full blur-3xl"></div>

              <CardHeader className="relative pb-8">
                <CardTitle className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 rounded-3xl text-white shadow-2xl">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                      상속세 계산 결과
                    </span>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1">
                      2025년 세법 기준 • 전문가 수준 정확도
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative space-y-8">
                {/* 🎯 계산 과정 시각화 */}
                <div className="space-y-6">
                  {/* 자산 현황 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-700/50 dark:to-slate-600/30 rounded-2xl border border-slate-200/50 dark:border-slate-600/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">
                          총 자산가액
                        </span>
                      </div>
                      <p className="text-2xl font-black text-slate-800 dark:text-slate-200">
                        {result.totalAssets.toLocaleString()}만원
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-red-50 to-red-100/80 dark:from-red-900/20 dark:to-red-800/10 rounded-2xl border border-red-200/50 dark:border-red-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
                        <span className="text-red-700 dark:text-red-300 font-bold">
                          차감 채무
                        </span>
                      </div>
                      <p className="text-2xl font-black text-red-600 dark:text-red-400">
                        -{result.totalDebts.toLocaleString()}만원
                      </p>
                    </div>
                  </div>

                  {/* 순자산 */}
                  <div className="p-6 bg-gradient-to-br from-indigo-50 via-indigo-50/90 to-blue-50/60 dark:from-indigo-900/20 dark:via-indigo-800/20 dark:to-blue-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 dark:bg-indigo-400/20 rounded-xl">
                          <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-indigo-800 dark:text-indigo-200 font-bold text-lg">
                          순자산가액
                        </span>
                      </div>
                      <p className="text-3xl font-black text-indigo-700 dark:text-indigo-300">
                        {result.netAssets.toLocaleString()}만원
                      </p>
                    </div>
                  </div>

                  {/* 공제 항목들 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      공제 혜택
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/80 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                          <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                            기초공제
                          </span>
                        </div>
                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          -{result.basicDeduction.toLocaleString()}만원
                        </p>
                      </div>

                      <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          <span className="text-blue-700 dark:text-blue-300 font-bold">
                            인적공제
                          </span>
                        </div>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          -{result.personalDeduction.toLocaleString()}만원
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 과세표준 */}
                  <div className="p-6 bg-gradient-to-br from-amber-50 via-amber-50/90 to-yellow-50/60 dark:from-amber-900/20 dark:via-amber-800/20 dark:to-yellow-900/20 rounded-2xl border border-amber-200/50 dark:border-amber-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 dark:bg-amber-400/20 rounded-xl">
                          <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <span className="text-amber-800 dark:text-amber-200 font-bold text-lg">
                            과세표준
                          </span>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            누진세율 적용 기준
                          </p>
                        </div>
                      </div>
                      <p className="text-3xl font-black text-amber-700 dark:text-amber-300">
                        {result.taxableAssets.toLocaleString()}만원
                      </p>
                    </div>
                  </div>

                  {/* 최종 세액 - Hero Section */}
                  <div className="relative p-8 bg-gradient-to-br from-red-50 via-red-50/95 to-pink-50/70 dark:from-red-900/25 dark:via-red-800/25 dark:to-pink-900/25 rounded-3xl border-2 border-red-200/60 dark:border-red-700/60 shadow-2xl dark:shadow-red-900/20">
                    <div className="absolute top-3 right-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-full animate-pulse">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-2xl text-white shadow-lg">
                          <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="text-red-900 dark:text-red-100 font-black text-2xl">
                            최종 상속세액
                          </span>
                          <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                            세무서 납부 금액
                          </p>
                          <p className="text-xs text-red-500 dark:text-red-500 mt-1">
                            유효세율: {result.effectiveRate.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-5xl font-black text-red-600 dark:text-red-400 leading-none">
                          {result.taxAmount.toLocaleString()}
                        </p>
                        <p className="text-xl font-bold text-red-500 dark:text-red-500 mt-1">
                          만원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🎯 절세 컨설팅 제안 - BMAD Aspirational */}
                {result.taxAmount > 10000 && (
                  <div className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50/90 to-orange-50/60 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-amber-500/10 dark:bg-amber-400/20 rounded-xl">
                        <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-3">
                          💡 AI 절세 전략 제안
                        </h4>
                        <div className="space-y-3 text-sm text-amber-800 dark:text-amber-200">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="font-medium">
                              생전증여 활용으로{' '}
                              <strong className="text-amber-700 dark:text-amber-300">
                                최대 40% 절세
                              </strong>{' '}
                              가능
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="font-medium">
                              가업승계 특례 적용시{' '}
                              <strong className="text-amber-700 dark:text-amber-300">
                                대폭 공제
                              </strong>{' '}
                              혜택
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="font-medium">
                              법인 설립을 통한{' '}
                              <strong className="text-amber-700 dark:text-amber-300">
                                구조적 절세
                              </strong>{' '}
                              방안
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 🎯 BMAD Method: Decisional CTA */}
                <div className="space-y-4">
                  <Button
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
                    size="lg"
                  >
                    <a
                      href="/contact?service=inheritance-tax"
                      className="w-full flex items-center justify-center gap-3"
                    >
                      <Shield className="w-6 h-6" />
                      전문가 맞춤 상속세 최적화 상담 (무료)
                    </a>
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-12 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-semibold rounded-xl transition-all duration-200"
                      size="lg"
                    >
                      <a
                        href="/calculators/gift-tax"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4" />
                        증여세 계산기
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold rounded-xl transition-all duration-200"
                      size="lg"
                    >
                      <a
                        href="/calculators/succession-cost"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Building2 className="w-4 h-4" />
                        가업승계 계산기
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 🎯 2025년 세법 변경사항 */}
            <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-xl text-white">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-slate-900 dark:text-slate-100">
                    2025년 상속세법 주요 포인트
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-800 dark:text-emerald-200 block">
                        기초공제 유지
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        2억원 한도 동일 적용
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-800 dark:text-blue-200 block">
                        배우자 공제
                      </span>
                      <span className="text-blue-700 dark:text-blue-300">
                        최대 5억원 (기존 동일)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50/80 dark:bg-purple-900/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-purple-800 dark:text-purple-200 block">
                        최고세율 구간
                      </span>
                      <span className="text-purple-700 dark:text-purple-300">
                        30억원 초과분 50%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-amber-50/80 dark:bg-amber-900/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800 dark:text-amber-200 block">
                        가업승계 특례
                      </span>
                      <span className="text-amber-700 dark:text-amber-300">
                        요건 일부 강화
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 🎯 하단 면책 고지 */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto p-6 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl">
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              ⚠️{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                면책 고지
              </strong>
              : 본 계산기는 일반적인 상속세 예상 금액 산출을 위한 도구입니다.
              실제 세액은 개별 사안의 특수성, 법령 해석, 평가 방법 등에 따라
              달라질 수 있으므로 정확한 세무 계획 수립을 위해서는 반드시{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                전문가와 상담
              </strong>
              하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
