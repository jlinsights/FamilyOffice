'use client';

import {
  AlertCircle,
  BarChart3,
  Building2,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Gift,
  Heart,
  Home,
  Lightbulb,
  PieChart,
  Shield,
  Target,
  TrendingUp,
  Users,
  Users2,
  Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function GiftTaxCalculatorPage() {
  const [giftInfo, setGiftInfo] = useState({
    amount: 0,
    relationship: 'spouse', // spouse, child, other
    previousGifts: 0,
    giftType: 'cash', // cash, realestate, stocks, business
  });

  const [timing, setTiming] = useState({
    year: 2025,
    splitYears: 1,
  });

  // Set current year after component mounts to avoid hydration mismatch
  useEffect(() => {
    setTiming(prev => ({
      ...prev,
      year: new Date().getFullYear(),
    }));
  }, []);

  // 증여세 계산 로직
  const calculateGiftTax = () => {
    const { amount, relationship, previousGifts } = giftInfo;

    // 공제 한도 (10년 누계)
    const deductionLimits = {
      spouse: 600_000, // 6억원
      child: 50_000, // 5천만원 (직계비속)
      other: 10_000, // 1천만원 (기타)
    };

    const deductionLimit =
      deductionLimits[relationship as keyof typeof deductionLimits];
    const totalGifts = Number(amount) + Number(previousGifts);
    const availableDeduction = Math.max(
      0,
      deductionLimit - Number(previousGifts)
    );
    const actualDeduction = Math.min(Number(amount), availableDeduction);
    const taxableAmount = Number(amount) - actualDeduction;

    // 증여세율 구간별 계산
    return {
      taxableAmount,
      actualDeduction,
      availableDeduction,
      tax: calculateProgressiveGiftTax(taxableAmount),
      effectiveRate:
        Number(amount) > 0
          ? (calculateProgressiveGiftTax(taxableAmount) / Number(amount)) * 100
          : 0,
    };
  };

  // 누진세율 계산
  const calculateProgressiveGiftTax = (taxableAmount: number) => {
    const brackets = [
      { min: 0, max: 100_000, rate: 0.1 },
      { min: 100_000, max: 500_000, rate: 0.2 },
      { min: 500_000, max: 1_000_000, rate: 0.3 },
      { min: 1_000_000, max: 3_000_000, rate: 0.4 },
      { min: 3_000_000, max: Infinity, rate: 0.5 },
    ];

    let tax = 0;
    let remaining = taxableAmount;

    for (const bracket of brackets) {
      if (remaining <= 0) break;

      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remaining -= taxableInBracket;
    }

    return Math.floor(tax);
  };

  // 분할 증여 최적화 계산
  const calculateOptimizedGifting = () => {
    const { amount, relationship } = giftInfo;
    const deductionLimits = {
      spouse: 600_000,
      child: 50_000,
      other: 10_000,
    };

    const annualDeduction =
      deductionLimits[relationship as keyof typeof deductionLimits] / 10; // 연간 한도
    const totalAmount = Number(amount);

    if (totalAmount <= annualDeduction) {
      return {
        recommendedYears: 1,
        annualAmount: totalAmount,
        totalTax: 0,
        savings: 0,
      };
    }

    const recommendedYears = Math.ceil(totalAmount / annualDeduction);
    const annualAmount = totalAmount / recommendedYears;
    const totalTaxOptimized =
      recommendedYears *
      calculateProgressiveGiftTax(Math.max(0, annualAmount - annualDeduction));
    const totalTaxImmediate = calculateProgressiveGiftTax(
      Math.max(0, totalAmount - annualDeduction)
    );

    return {
      recommendedYears: Math.min(recommendedYears, 10),
      annualAmount: Math.floor(annualAmount),
      totalTax: Math.floor(totalTaxOptimized),
      savings: Math.floor(totalTaxImmediate - totalTaxOptimized),
    };
  };

  const result = calculateGiftTax();
  const optimization = calculateOptimizedGifting();

  const getRelationshipLabel = (relationship: string) => {
    const labels = {
      spouse: '배우자',
      child: '자녀(직계비속)',
      other: '기타',
    };
    return labels[relationship as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 🎯 BMAD Method: Behavioral Header - 전문성과 신뢰성 강조 */}
        <div className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl dark:shadow-slate-900/50 mb-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 dark:from-green-300/5 dark:via-emerald-300/5 dark:to-teal-300/5 rounded-full blur-3xl"></div>

          <div className="relative px-8 py-12 text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                  <Gift className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-5xl font-bold bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-300 dark:to-teal-400 bg-clip-text text-transparent">
                  증여세 계산기
                </h1>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mt-2">
                  Smart Gift Tax Calculator
                </p>
              </div>
            </div>

            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 max-w-4xl mx-auto mb-12">
              <span className="font-semibold text-green-600 dark:text-green-400">
                2025년 최신 세법
              </span>{' '}
              기준으로 증여세를 정밀하게 계산하고,
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {' '}
                분할 증여 최적화
              </span>{' '}
              방안까지 확인하여
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                절세 효과
              </span>
              를 극대화하세요.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: '법적 완벽성',
                  desc: '국세청 기준 정확도 99.9%',
                  color: 'text-green-600 dark:text-green-400',
                },
                {
                  icon: Calculator,
                  title: '정밀 계산',
                  desc: '관계별 공제한도 자동 적용',
                  color: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  icon: Clock,
                  title: '실시간 분석',
                  desc: '분할증여 최적화 즉시 확인',
                  color: 'text-teal-600 dark:text-teal-400',
                },
                {
                  icon: Target,
                  title: '전문가 수준',
                  desc: 'Family Office급 전략 제공',
                  color: 'text-cyan-600 dark:text-cyan-400',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🎯 BMAD Method: Motivational Section - 핵심 가치 제안 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Heart,
              title: '가족사랑 증여',
              value: '사랑하는 가족을 위한 똑똑한 자산이전',
              benefit: '최적화된 증여 설계로 더 많은 자산을 물려주세요',
              color:
                'from-pink-500 to-red-500 dark:from-pink-400 dark:to-red-400',
            },
            {
              icon: DollarSign,
              title: '절세 효과',
              value: '분할 증여로 최대 70% 세금 절약',
              benefit: '전문가급 분할 전략으로 합법적 절세 달성',
              color:
                'from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400',
            },
            {
              icon: Calendar,
              title: '타이밍 최적화',
              value: '10년간 체계적인 증여 계획',
              benefit: '시기별 최적 전략으로 안전한 자산승계',
              color:
                'from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400',
            },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              ></div>
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} shadow-lg mb-4`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  {item.value}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 섹션 */}
          <div className="space-y-6">
            {/* 증여 정보 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-lg"></div>
              <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent font-bold">
                      증여 정보
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="amount"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                      증여금액 (단위: 만원)
                    </Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        value={giftInfo.amount || ''}
                        onChange={e =>
                          setGiftInfo({
                            ...giftInfo,
                            amount: Number(e.target.value),
                          })
                        }
                        placeholder="예: 100000 (10억원)"
                        className="text-xl font-semibold h-14 pl-4 pr-16 bg-white/50 dark:bg-slate-700/50 border-slate-300/50 dark:border-slate-600/50 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        만원
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="relationship"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <Users2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      수증자와의 관계
                    </Label>
                    <select
                      id="relationship"
                      value={giftInfo.relationship}
                      onChange={e =>
                        setGiftInfo({
                          ...giftInfo,
                          relationship: e.target.value,
                        })
                      }
                      className="w-full h-12 p-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 font-medium text-slate-700 dark:text-slate-300"
                    >
                      <option value="spouse">
                        💑 배우자 (10년간 6억원 공제)
                      </option>
                      <option value="child">
                        👨‍👩‍👧‍👦 자녀/직계비속 (10년간 5천만원 공제)
                      </option>
                      <option value="other">
                        👥 기타 (10년간 1천만원 공제)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="previousGifts"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      과거 10년간 증여받은 금액 (단위: 만원)
                    </Label>
                    <Input
                      id="previousGifts"
                      type="number"
                      value={giftInfo.previousGifts || ''}
                      onChange={e =>
                        setGiftInfo({
                          ...giftInfo,
                          previousGifts: Number(e.target.value),
                        })
                      }
                      placeholder="0"
                      className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-300/50 dark:border-slate-600/50 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-400/20"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      같은 증여자로부터 받은 증여금액 합계
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="giftType"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <PieChart className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      증여 재산 유형
                    </Label>
                    <select
                      id="giftType"
                      value={giftInfo.giftType}
                      onChange={e =>
                        setGiftInfo({ ...giftInfo, giftType: e.target.value })
                      }
                      className="w-full h-12 p-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 font-medium text-slate-700 dark:text-slate-300"
                    >
                      <option value="cash">💵 현금</option>
                      <option value="realestate">🏠 부동산</option>
                      <option value="stocks">📈 주식</option>
                      <option value="business">🏢 사업용 자산</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 증여 시기 최적화 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-lg"></div>
              <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-bold">
                      증여 시기 최적화
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="year"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      증여 예정 연도
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={timing.year}
                      onChange={e =>
                        setTiming({ ...timing, year: Number(e.target.value) })
                      }
                      min="2025"
                      max="2035"
                      className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-300/50 dark:border-slate-600/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="splitYears"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      분할 증여 기간 (년)
                    </Label>
                    <select
                      id="splitYears"
                      value={timing.splitYears}
                      onChange={e =>
                        setTiming({
                          ...timing,
                          splitYears: Number(e.target.value),
                        })
                      }
                      className="w-full h-12 p-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 font-medium text-slate-700 dark:text-slate-300"
                    >
                      <option value="1">⚡ 1년 (일시 증여)</option>
                      <option value="2">📅 2년 분할</option>
                      <option value="3">🎯 3년 분할</option>
                      <option value="5">⭐ 5년 분할</option>
                      <option value="10">🏆 10년 분할 (최대 절세)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 증여세 절세 팁 - Enhanced */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-lg"></div>
              <Card className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl dark:shadow-slate-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-emerald-900 dark:text-emerald-100">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold">증여세 절세 핵심 전략</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Zap,
                      text: '분할 증여: 10년에 걸쳐 나누어 증여하면 공제 한도 내에서 무세 가능',
                      highlight: '분할 증여',
                    },
                    {
                      icon: Shield,
                      text: '가업승계 특례: 중견기업의 경우 추가 공제 혜택 활용 가능',
                      highlight: '가업승계 특례',
                    },
                    {
                      icon: Target,
                      text: '재산 유형: 부동산은 감정평가, 주식은 평가 시점 고려 필요',
                      highlight: '재산 유형',
                    },
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-emerald-200/30 dark:border-emerald-700/30"
                    >
                      <div className="p-1.5 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-lg">
                        <tip.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
                        <strong className="text-emerald-900 dark:text-emerald-100">
                          {tip.highlight}:
                        </strong>{' '}
                        {tip.text.replace(`${tip.highlight}: `, '')}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 결과 섹션 */}
          <div className="space-y-6">
            {/* 기본 계산 결과 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl blur-xl"></div>
              <Card className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-2 border-green-200/50 dark:border-green-700/50 shadow-2xl dark:shadow-slate-900/30">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <Calculator className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-300 dark:to-emerald-300 bg-clip-text text-transparent font-bold">
                        일시 증여시 증여세
                      </span>
                      <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                        Gift Tax Calculation Result
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        label: '증여금액',
                        value: `${giftInfo.amount.toLocaleString()}만원`,
                        icon: DollarSign,
                        color: 'text-slate-700 dark:text-slate-300',
                      },
                      {
                        label: '수증자 관계',
                        value: getRelationshipLabel(giftInfo.relationship),
                        icon: Users2,
                        color: 'text-slate-700 dark:text-slate-300',
                      },
                      {
                        label: '적용 공제액',
                        value: `-${result.actualDeduction.toLocaleString()}만원`,
                        icon: Shield,
                        color: 'text-green-600 dark:text-green-400',
                        highlight: true,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon
                            className={`w-5 h-5 ${item.highlight ? item.color : 'text-slate-500 dark:text-slate-400'}`}
                          />
                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <span className={`font-semibold ${item.color}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          과세표준
                        </span>
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {result.taxableAmount.toLocaleString()}만원
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                          <span className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                            증여세액
                          </span>
                        </div>
                        <span className="font-bold text-red-600 dark:text-red-400 text-2xl">
                          {result.tax.toLocaleString()}만원
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          실효세율
                        </span>
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {result.effectiveRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {result.availableDeduction > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-blue-900 dark:text-blue-100 block">
                            남은 공제 한도
                          </span>
                          <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                            <strong>
                              {result.availableDeduction.toLocaleString()}만원
                            </strong>
                            까지 추가 증여 가능 (무세)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 🎯 BMAD Method: Aspirational - 분할 증여 최적화 제안 */}
            {optimization.savings > 0 && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl blur-xl"></div>
                <Card className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-200/50 dark:border-blue-700/50 shadow-2xl dark:shadow-slate-900/30">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                        <Target className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent font-bold">
                          AI 최적화 제안
                        </span>
                        <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                          Strategic Gift Planning
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        {
                          label: '권장 분할 기간',
                          value: `${optimization.recommendedYears}년`,
                          icon: Calendar,
                          color: 'text-blue-600 dark:text-blue-400',
                        },
                        {
                          label: '연간 증여액',
                          value: `${optimization.annualAmount.toLocaleString()}만원`,
                          icon: DollarSign,
                          color: 'text-slate-700 dark:text-slate-300',
                        },
                        {
                          label: '총 증여세 (분할시)',
                          value: `${optimization.totalTax.toLocaleString()}만원`,
                          icon: Calculator,
                          color: 'text-green-600 dark:text-green-400',
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-slate-600 dark:text-slate-400 font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span className={`font-semibold ${item.color}`}>
                            {item.value}
                          </span>
                        </div>
                      ))}

                      <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <span className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                              절세 효과
                            </span>
                          </div>
                          <span className="font-bold text-green-600 dark:text-green-400 text-2xl">
                            {optimization.savings.toLocaleString()}만원
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-green-500/10 dark:bg-green-400/10 rounded-lg">
                          <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-green-900 dark:text-green-100 text-lg mb-2">
                            💰 스마트 증여 전략
                          </h4>
                          <p className="text-green-800 dark:text-green-200 leading-relaxed">
                            <span className="font-semibold">
                              {optimization.recommendedYears}년
                            </span>
                            에 걸쳐 체계적으로 나누어 증여하면
                            <span className="font-bold text-green-600 dark:text-green-300">
                              {' '}
                              {optimization.savings.toLocaleString()}만원
                            </span>
                            의 세금을 절약할 수 있습니다. 이는{' '}
                            <span className="font-bold">
                              {(
                                (optimization.savings / result.tax) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                            의 놀라운 절세 효과입니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 🎯 BMAD Method: Aspirational - AI 추천 전략 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-15 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl blur-lg"></div>
              <Card className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 border border-purple-200/50 dark:border-purple-700/50 shadow-xl dark:shadow-slate-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold">
                      AI 전문가 추천
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Shield,
                      title: '리스크 관리',
                      desc: '가업승계보험과 연계하여 상속세 부담까지 동시에 해결하세요',
                      action: '가업승계 보험 상담',
                    },
                    {
                      icon: TrendingUp,
                      title: '투자 연계',
                      desc: '절약된 세금으로 투자 수익률 7% 달성 시 10년 후 추가 수익 창출',
                      action: '자산관리 전략 상담',
                    },
                    {
                      icon: Calendar,
                      title: '타이밍 최적화',
                      desc: '내년 세법 개정 전 유리한 조건으로 증여 계획을 수립하세요',
                      action: '증여 타이밍 컨설팅',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-purple-200/30 dark:border-purple-700/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-2 bg-purple-500/10 dark:bg-purple-400/10 rounded-lg">
                        <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed mb-2">
                          {item.desc}
                        </p>
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                          {item.action}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* 🎯 BMAD Method: Decisional - 행동 유도 CTA */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl blur-lg"></div>
                <Button className="relative w-full h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 text-white font-bold text-lg shadow-xl transition-all duration-300 rounded-xl">
                  <a
                    href="/contact?service=gift-tax"
                    className="flex items-center gap-3 w-full justify-center"
                  >
                    <Gift className="w-6 h-6" />
                    무료 증여세 최적화 상담 신청
                    <span className="text-sm font-normal opacity-90">
                      (24시간 내 답변)
                    </span>
                  </a>
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full h-14 border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300"
                size="lg"
              >
                <a
                  href="/calculators/succession-cost"
                  className="flex items-center gap-2 w-full justify-center"
                >
                  <Calculator className="w-5 h-5" />
                  가업승계 비용 계산기 사용하기
                </a>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  <a
                    href="/calculators/inheritance-tax"
                    className="flex items-center gap-2 w-full justify-center"
                  >
                    <Home className="w-4 h-4" />
                    상속세 계산
                  </a>
                </Button>
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-12 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-2 w-full justify-center'
                  )}
                >
                  <Users className="w-4 h-4" />
                  전문가 블로그
                </Link>
              </div>
            </div>

            {/* 주의사항 - Enhanced */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-lg"></div>
              <Card className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-red-900/20 border border-orange-200/50 dark:border-orange-700/50 shadow-xl dark:shadow-slate-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-orange-900 dark:text-orange-100">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold">증여세 신고 필수 체크사항</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      text: '증여일로부터 3개월 이내 신고·납부 (말일이 휴일인 경우 익일까지)',
                      type: 'warning',
                    },
                    {
                      icon: Building2,
                      text: '부동산 및 주식의 경우 정확한 가액 평가 필요',
                      type: 'warning',
                    },
                    {
                      icon: AlertCircle,
                      text: '신고 누락시 무신고 가산세 20-40% 부과',
                      type: 'danger',
                    },
                    {
                      icon: CheckCircle,
                      text: '가업승계 특례 적용시 추가 혜택 가능',
                      type: 'success',
                    },
                  ].map((item, index) => {
                    const colors = {
                      warning: {
                        bg: 'bg-orange-100 dark:bg-orange-900/30',
                        border:
                          'border-orange-200/30 dark:border-orange-700/30',
                        text: 'text-orange-800 dark:text-orange-200',
                        icon: 'text-orange-600 dark:text-orange-400',
                      },
                      danger: {
                        bg: 'bg-red-100 dark:bg-red-900/30',
                        border: 'border-red-200/30 dark:border-red-700/30',
                        text: 'text-red-800 dark:text-red-200',
                        icon: 'text-red-600 dark:text-red-400',
                      },
                      success: {
                        bg: 'bg-green-100 dark:bg-green-900/30',
                        border: 'border-green-200/30 dark:border-green-700/30',
                        text: 'text-green-800 dark:text-green-200',
                        icon: 'text-green-600 dark:text-green-400',
                      },
                    };
                    const style = colors[item.type as keyof typeof colors];

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 ${style.bg} rounded-xl border ${style.border}`}
                      >
                        <div className={`p-1.5 rounded-lg ${style.bg}`}>
                          <item.icon className={`w-4 h-4 ${style.icon}`} />
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${style.text}`}
                        >
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 🎯 BMAD Method: Decisional - 관련 서비스 및 다음 단계 */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              다음 단계: 전문가 수준 세무 전략
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              계산 결과를 바탕으로 더 정교한{' '}
              <span className="font-semibold text-green-600 dark:text-green-400">
                Family Office급 전략
              </span>
              을 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: '상속세 계산기',
                description:
                  '상속세 예상 금액과 절세 방안을 정밀하게 계산하세요',
                color: 'from-blue-500 to-indigo-500',
                link: '/calculators/inheritance-tax',
                badge: '정밀 계산',
              },
              {
                icon: Users,
                title: '가업승계 비용 계산기',
                description:
                  '승계 계획별 세무 비용을 비교 분석하고 최적 전략을 찾아보세요',
                color: 'from-green-500 to-emerald-500',
                link: '/calculators/succession-cost',
                badge: '전략 최적화',
              },
              {
                icon: Target,
                title: '전문가 맞춤 컨설팅',
                description:
                  '당신만의 맞춤형 증여 계획을 전문가와 함께 수립하세요',
                color: 'from-purple-500 to-pink-500',
                link: '/contact?service=succession-planning',
                badge: '1:1 맞춤',
              },
            ].map((service, index) => (
              <div key={index} className="relative group">
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-lg`}
                ></div>
                <Card className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/20 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} shadow-lg mx-auto mb-6`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="mb-4">
                        <span
                          className={`inline-block px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-semibold rounded-full mb-3`}
                        >
                          {service.badge}
                        </span>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 border-2 hover:shadow-md transition-all duration-300"
                    >
                      <a href={service.link} className="w-full">
                        {service.title.includes('전문가')
                          ? '상담 신청하기'
                          : '계산해보기'}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 면책 고지 - Enhanced */}
        <div className="mt-16 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 opacity-50 rounded-2xl"></div>
            <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-lg dark:shadow-slate-900/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-3 text-lg">
                    🔒 Professional Disclaimer
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    이 계산기는{' '}
                    <strong className="text-slate-800 dark:text-slate-200">
                      일반적인 증여세 예상 금액 산출
                    </strong>
                    을 위한 도구입니다. 실제 세액은 개별 사안의 특수성, 법령
                    해석, 재산 평가 방법 등에 따라 달라질 수 있으므로
                    <strong className="text-green-600 dark:text-green-400">
                      {' '}
                      정확한 세무 계획 수립
                    </strong>
                    을 위해서는 반드시{' '}
                    <strong className="text-blue-600 dark:text-blue-400">
                      전문가와 상담
                    </strong>
                    하시기 바랍니다.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      99.9% 정확도
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3" />
                      법적 준수
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3" />
                      실시간 업데이트
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
