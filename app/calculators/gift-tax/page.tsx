'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Gift, Users, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';

export default function GiftTaxCalculatorPage() {
  const [giftInfo, setGiftInfo] = useState({
    amount: 0,
    relationship: 'spouse', // spouse, child, other
    previousGifts: 0,
    giftType: 'cash' // cash, realestate, stocks, business
  });

  const [timing, setTiming] = useState({
    year: new Date().getFullYear(),
    splitYears: 1
  });

  // 증여세 계산 로직
  const calculateGiftTax = () => {
    const { amount, relationship, previousGifts } = giftInfo;
    
    // 공제 한도 (10년 누계)
    const deductionLimits = {
      spouse: 600_000, // 6억원
      child: 50_000,   // 5천만원 (직계비속)
      other: 10_000    // 1천만원 (기타)
    };

    const deductionLimit = deductionLimits[relationship as keyof typeof deductionLimits];
    const totalGifts = Number(amount) + Number(previousGifts);
    const availableDeduction = Math.max(0, deductionLimit - Number(previousGifts));
    const actualDeduction = Math.min(Number(amount), availableDeduction);
    const taxableAmount = Number(amount) - actualDeduction;

    // 증여세율 구간별 계산
    return {
      taxableAmount,
      actualDeduction,
      availableDeduction,
      tax: calculateProgressiveGiftTax(taxableAmount),
      effectiveRate: Number(amount) > 0 ? (calculateProgressiveGiftTax(taxableAmount) / Number(amount)) * 100 : 0
    };
  };

  // 누진세율 계산
  const calculateProgressiveGiftTax = (taxableAmount: number) => {
    const brackets = [
      { min: 0, max: 100_000, rate: 0.10 },
      { min: 100_000, max: 500_000, rate: 0.20 },
      { min: 500_000, max: 1_000_000, rate: 0.30 },
      { min: 1_000_000, max: 3_000_000, rate: 0.40 },
      { min: 3_000_000, max: Infinity, rate: 0.50 }
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
      other: 10_000
    };

    const annualDeduction = deductionLimits[relationship as keyof typeof deductionLimits] / 10; // 연간 한도
    const totalAmount = Number(amount);
    
    if (totalAmount <= annualDeduction) {
      return {
        recommendedYears: 1,
        annualAmount: totalAmount,
        totalTax: 0,
        savings: 0
      };
    }

    const recommendedYears = Math.ceil(totalAmount / annualDeduction);
    const annualAmount = totalAmount / recommendedYears;
    const totalTaxOptimized = recommendedYears * calculateProgressiveGiftTax(Math.max(0, annualAmount - annualDeduction));
    const totalTaxImmediate = calculateProgressiveGiftTax(Math.max(0, totalAmount - annualDeduction));

    return {
      recommendedYears: Math.min(recommendedYears, 10),
      annualAmount: Math.floor(annualAmount),
      totalTax: Math.floor(totalTaxOptimized),
      savings: Math.floor(totalTaxImmediate - totalTaxOptimized)
    };
  };

  const result = calculateGiftTax();
  const optimization = calculateOptimizedGifting();

  const getRelationshipLabel = (relationship: string) => {
    const labels = {
      spouse: '배우자',
      child: '자녀(직계비속)',
      other: '기타'
    };
    return labels[relationship as keyof typeof labels];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gift className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-slate-900">증여세 계산기</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          2025년 최신 세법 기준으로 증여세를 정확하게 계산하고, 
          분할 증여를 통한 최적화 방안까지 확인해보세요.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>관계별 공제 한도 적용</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>분할 증여 최적화</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>절세 효과 시뮬레이션</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 입력 섹션 */}
        <div className="space-y-6">
          {/* 증여 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-600" />
                증여 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">증여금액 (단위: 만원)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={giftInfo.amount}
                  onChange={(e) => setGiftInfo({...giftInfo, amount: Number(e.target.value)})}
                  placeholder="0"
                  className="text-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="relationship">수증자와의 관계</Label>
                <select
                  id="relationship"
                  value={giftInfo.relationship}
                  onChange={(e) => setGiftInfo({...giftInfo, relationship: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="spouse">배우자 (10년간 6억원 공제)</option>
                  <option value="child">자녀/직계비속 (10년간 5천만원 공제)</option>
                  <option value="other">기타 (10년간 1천만원 공제)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="previousGifts">과거 10년간 증여받은 금액 (단위: 만원)</Label>
                <Input
                  id="previousGifts"
                  type="number"
                  value={giftInfo.previousGifts}
                  onChange={(e) => setGiftInfo({...giftInfo, previousGifts: Number(e.target.value)})}
                  placeholder="0"
                />
                <p className="text-xs text-slate-500 mt-1">
                  같은 증여자로부터 받은 증여금액 합계
                </p>
              </div>
              
              <div>
                <Label htmlFor="giftType">증여 재산 유형</Label>
                <select
                  id="giftType"
                  value={giftInfo.giftType}
                  onChange={(e) => setGiftInfo({...giftInfo, giftType: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="cash">현금</option>
                  <option value="realestate">부동산</option>
                  <option value="stocks">주식</option>
                  <option value="business">사업용 자산</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 증여 시기 최적화 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                증여 시기 최적화
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="year">증여 예정 연도</Label>
                <Input
                  id="year"
                  type="number"
                  value={timing.year}
                  onChange={(e) => setTiming({...timing, year: Number(e.target.value)})}
                  min="2025"
                  max="2035"
                />
              </div>
              
              <div>
                <Label htmlFor="splitYears">분할 증여 기간 (년)</Label>
                <select
                  id="splitYears"
                  value={timing.splitYears}
                  onChange={(e) => setTiming({...timing, splitYears: Number(e.target.value)})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="1">1년 (일시 증여)</option>
                  <option value="2">2년 분할</option>
                  <option value="3">3년 분할</option>
                  <option value="5">5년 분할</option>
                  <option value="10">10년 분할</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 증여세 절세 팁 */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">💡 증여세 절세 핵심 포인트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span><strong>분할 증여:</strong> 10년에 걸쳐 나누어 증여하면 공제 한도 내에서 무세 가능</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span><strong>가업승계 특례:</strong> 중견기업의 경우 추가 공제 혜택 활용 가능</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span><strong>재산 유형:</strong> 부동산은 감정평가, 주식은 평가 시점 고려 필요</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 결과 섹션 */}
        <div className="space-y-6">
          {/* 기본 계산 결과 */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-900">일시 증여시 증여세</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">증여금액</span>
                  <span className="font-semibold">
                    {giftInfo.amount.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">수증자 관계</span>
                  <span className="font-semibold">
                    {getRelationshipLabel(giftInfo.relationship)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">적용 공제액</span>
                  <span className="font-semibold text-green-600">
                    -{result.actualDeduction.toLocaleString()}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">과세표준</span>
                  <span className="font-semibold">
                    {result.taxableAmount.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-900 font-bold">증여세액</span>
                  <span className="font-bold text-red-600 text-xl">
                    {result.tax.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">실효세율</span>
                  <span className="font-semibold">
                    {result.effectiveRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              {result.availableDeduction > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-blue-900">남은 공제 한도</span>
                      <p className="text-blue-700">
                        {result.availableDeduction.toLocaleString()}만원까지 추가 증여 가능 (무세)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 최적화 제안 */}
          {optimization.savings > 0 && (
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-900">🎯 분할 증여 최적화 제안</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">권장 분할 기간</span>
                    <span className="font-semibold text-blue-600">
                      {optimization.recommendedYears}년
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">연간 증여액</span>
                    <span className="font-semibold">
                      {optimization.annualAmount.toLocaleString()}만원
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">총 증여세 (분할시)</span>
                    <span className="font-semibold text-green-600">
                      {optimization.totalTax.toLocaleString()}만원
                    </span>
                  </div>
                  
                  <hr className="border-slate-300" />
                  
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-900 font-bold">절세 효과</span>
                    <span className="font-bold text-green-600 text-xl">
                      {optimization.savings.toLocaleString()}만원
                    </span>
                  </div>
                </div>

                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">💰 분할 증여 효과</h4>
                  <p className="text-sm text-green-800">
                    {optimization.recommendedYears}년에 걸쳐 나누어 증여하면 
                    <strong> {optimization.savings.toLocaleString()}만원</strong>의 세금을 절약할 수 있습니다.
                    이는 <strong>{((optimization.savings / result.tax) * 100).toFixed(0)}%</strong>의 절세 효과입니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
              <a href="/contact?service=gift-tax" className="w-full">
                무료 증여세 최적화 상담 신청
              </a>
            </Button>
            
            <Button variant="outline" className="w-full" size="lg">
              <a href="/calculators/succession-cost" className="w-full">
                가업승계 비용 계산기 사용하기
              </a>
            </Button>
          </div>

          {/* 주의사항 */}
          <Card>
            <CardHeader>
              <CardTitle>⚠️ 증여세 신고 주의사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>증여일로부터 3개월 이내 신고·납부 (말일이 휴일인 경우 익일까지)</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>부동산 및 주식의 경우 정확한 가액 평가 필요</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>신고 누락시 무신고 가산세 20-40% 부과</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>가업승계 특례 적용시 추가 혜택 가능</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 관련 서비스 */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">관련 계산기 및 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">상속세 계산기</h3>
              <p className="text-sm text-slate-600 mb-4">상속세 예상 금액과 절세 방안 확인</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/calculators/inheritance-tax">계산하기</a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">가업승계 비용 계산기</h3>
              <p className="text-sm text-slate-600 mb-4">승계 계획별 세무 비용 비교</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/calculators/succession-cost">계산하기</a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Gift className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">전문가 상담</h3>
              <p className="text-sm text-slate-600 mb-4">맞춤형 증여 계획 수립</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/contact?service=succession-planning">상담 신청</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
          ⚠️ <strong>면책 고지</strong>: 이 계산기는 일반적인 증여세 예상 금액 산출을 위한 도구입니다. 
          실제 세액은 개별 사안의 특수성, 법령 해석, 재산 평가 방법 등에 따라 달라질 수 있으므로 
          정확한 세무 계획 수립을 위해서는 반드시 전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}