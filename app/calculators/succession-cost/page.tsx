'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Calculator, TrendingUp, Users, AlertCircle, CheckCircle, PieChart } from 'lucide-react';

export default function SuccessionCostCalculatorPage() {
  const [businessInfo, setBusinessInfo] = useState({
    businessValue: 0,
    annualRevenue: 0,
    employees: 0,
    businessType: 'manufacturing', // manufacturing, service, technology, construction
    ownershipShare: 100
  });

  const [successionPlan, setSuccessionPlan] = useState({
    method: 'inheritance', // inheritance, gift, sale, mbo
    timeframe: 5, // years
    targetOwnership: 51, // percentage
    useHoldingCo: false
  });

  const [currentOwner, setCurrentOwner] = useState({
    age: 60,
    hasSpouse: true,
    childrenCount: 2,
    relationship: 'child' // child, spouse, third-party
  });

  // 가업승계 비용 계산 로직
  const calculateSuccessionCost = () => {
    const { businessValue, businessType, ownershipShare } = businessInfo;
    const { method, timeframe, targetOwnership, useHoldingCo } = successionPlan;
    
    const transferValue = (businessValue * ownershipShare * targetOwnership) / (100 * 100);
    
    // 방법별 세무 비용 계산
    let taxCost = 0;
    let specialDeduction = 0;
    
    // 가업승계 특례 적용 여부
    const isEligibleForSpecialTax = businessValue >= 100_000 && businessValue <= 60_000_000; // 10억-600억
    
    if (method === 'inheritance') {
      // 상속세 계산 (간략화)
      const basicDeduction = 200_000; // 2억
      const personalDeduction = currentOwner.hasSpouse ? 500_000 : 0; // 배우자 5억
      const childDeduction = currentOwner.childrenCount * 50_000; // 자녀 1인당 5천만원
      
      if (isEligibleForSpecialTax) {
        // 가업승계 특례 공제
        specialDeduction = Math.min(transferValue * 0.8, 20_000_000); // 최대 200억
      }
      
      const totalDeduction = basicDeduction + personalDeduction + childDeduction + specialDeduction;
      const taxableAmount = Math.max(0, transferValue - totalDeduction);
      
      taxCost = calculateProgressiveTax(taxableAmount, 'inheritance');
      
    } else if (method === 'gift') {
      // 증여세 계산
      const relationshipDeduction = currentOwner.relationship === 'child' ? 50_000 : 10_000;
      const annualDeduction = relationshipDeduction / 10; // 연간 한도
      const totalDeductionOverYears = annualDeduction * timeframe;
      
      if (isEligibleForSpecialTax) {
        // 가업승계 특례 적용
        specialDeduction = Math.min(transferValue * 0.8, 10_000_000); // 최대 100억
      }
      
      const taxableAmount = Math.max(0, transferValue - totalDeductionOverYears - specialDeduction);
      taxCost = calculateProgressiveTax(taxableAmount, 'gift');
    }
    
    // 추가 비용들
    const legalCost = transferValue * 0.01; // 법무비용 1%
    const valuationCost = Math.min(transferValue * 0.005, 5_000); // 평가비용 0.5%, 최대 500만원
    const holdingCoCost = useHoldingCo ? 20_000 : 0; // 지주회사 설립비용 2억
    const consultingCost = transferValue * 0.003; // 컨설팅 비용 0.3%
    
    const totalCost = taxCost + legalCost + valuationCost + holdingCoCost + consultingCost;
    const effectiveRate = transferValue > 0 ? (totalCost / transferValue) * 100 : 0;
    const savingsFromSpecialTax = specialDeduction * (method === 'inheritance' ? 0.4 : 0.3); // 평균 세율 적용
    
    return {
      transferValue,
      taxCost,
      legalCost,
      valuationCost,
      holdingCoCost,
      consultingCost,
      totalCost,
      effectiveRate,
      specialDeduction,
      savingsFromSpecialTax,
      netCost: totalCost - savingsFromSpecialTax
    };
  };

  // 누진세율 계산
  const calculateProgressiveTax = (taxableAmount: number, type: 'inheritance' | 'gift') => {
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

  // 최적화 제안 계산
  const calculateOptimization = () => {
    const currentResult = calculateSuccessionCost();
    
    // 지주회사 활용 시나리오
    const holdingCoResult = { 
      ...successionPlan, 
      useHoldingCo: true 
    };
    const withHoldingCo = {
      ...businessInfo,
      ...holdingCoResult
    };
    
    // 분할 증여 시나리오
    const giftResult = {
      ...successionPlan,
      method: 'gift' as const,
      timeframe: 10
    };
    
    // 간단한 최적화 계산 (실제로는 더 복잡함)
    const holdingCoSavings = currentResult.taxCost * 0.3; // 지주회사 활용시 30% 절약
    const splitGiftSavings = currentResult.taxCost * 0.4; // 분할증여시 40% 절약
    
    return {
      currentCost: currentResult.totalCost,
      holdingCoSavings,
      splitGiftSavings,
      bestStrategy: splitGiftSavings > holdingCoSavings ? 'gift' : 'holding'
    };
  };

  const result = calculateSuccessionCost();
  const optimization = calculateOptimization();

  const getBusinessTypeLabel = (type: string) => {
    const labels = {
      manufacturing: '제조업',
      service: '서비스업',
      technology: '기술업',
      construction: '건설업'
    };
    return labels[type as keyof typeof labels];
  };

  const getMethodLabel = (method: string) => {
    const labels = {
      inheritance: '상속',
      gift: '증여',
      sale: '매각',
      mbo: 'MBO'
    };
    return labels[method as keyof typeof labels];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-4xl font-bold text-slate-900">가업승계 비용 계산기</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          사업체 가치와 승계 방법에 따른 정확한 비용을 계산하고, 
          최적의 가업승계 전략을 확인해보세요.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>가업승계 특례 적용</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>지주회사 활용 분석</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>분할증여 최적화</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 입력 섹션 */}
        <div className="space-y-6">
          {/* 사업체 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                사업체 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessValue">기업가치 (단위: 만원)</Label>
                <Input
                  id="businessValue"
                  type="number"
                  value={businessInfo.businessValue}
                  onChange={(e) => setBusinessInfo({...businessInfo, businessValue: Number(e.target.value)})}
                  placeholder="0"
                  className="text-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="annualRevenue">연간 매출 (단위: 만원)</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={businessInfo.annualRevenue}
                  onChange={(e) => setBusinessInfo({...businessInfo, annualRevenue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="employees">임직원 수 (명)</Label>
                <Input
                  id="employees"
                  type="number"
                  value={businessInfo.employees}
                  onChange={(e) => setBusinessInfo({...businessInfo, employees: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">업종</Label>
                <select
                  id="businessType"
                  value={businessInfo.businessType}
                  onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="manufacturing">제조업</option>
                  <option value="service">서비스업</option>
                  <option value="technology">기술업</option>
                  <option value="construction">건설업</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="ownershipShare">현재 지분율 (%)</Label>
                <Input
                  id="ownershipShare"
                  type="number"
                  value={businessInfo.ownershipShare}
                  onChange={(e) => setBusinessInfo({...businessInfo, ownershipShare: Number(e.target.value)})}
                  min="1"
                  max="100"
                  placeholder="100"
                />
              </div>
            </CardContent>
          </Card>

          {/* 승계 계획 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                승계 계획
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="method">승계 방법</Label>
                <select
                  id="method"
                  value={successionPlan.method}
                  onChange={(e) => setSuccessionPlan({...successionPlan, method: e.target.value as any})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="inheritance">상속</option>
                  <option value="gift">증여</option>
                  <option value="sale">매각</option>
                  <option value="mbo">MBO (경영진매수)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="timeframe">승계 기간 (년)</Label>
                <select
                  id="timeframe"
                  value={successionPlan.timeframe}
                  onChange={(e) => setSuccessionPlan({...successionPlan, timeframe: Number(e.target.value)})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="1">1년 (즉시)</option>
                  <option value="3">3년</option>
                  <option value="5">5년</option>
                  <option value="7">7년</option>
                  <option value="10">10년</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="targetOwnership">승계 목표 지분 (%)</Label>
                <Input
                  id="targetOwnership"
                  type="number"
                  value={successionPlan.targetOwnership}
                  onChange={(e) => setSuccessionPlan({...successionPlan, targetOwnership: Number(e.target.value)})}
                  min="1"
                  max="100"
                  placeholder="51"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useHoldingCo"
                  checked={successionPlan.useHoldingCo}
                  onChange={(e) => setSuccessionPlan({...successionPlan, useHoldingCo: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="useHoldingCo">지주회사 설립 활용</Label>
              </div>
            </CardContent>
          </Card>

          {/* 현재 소유자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                현재 소유자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="age">나이</Label>
                <Input
                  id="age"
                  type="number"
                  value={currentOwner.age}
                  onChange={(e) => setCurrentOwner({...currentOwner, age: Number(e.target.value)})}
                  min="30"
                  max="90"
                  placeholder="60"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasSpouse"
                  checked={currentOwner.hasSpouse}
                  onChange={(e) => setCurrentOwner({...currentOwner, hasSpouse: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="hasSpouse">배우자 있음</Label>
              </div>
              
              <div>
                <Label htmlFor="childrenCount">자녀 수</Label>
                <Input
                  id="childrenCount"
                  type="number"
                  value={currentOwner.childrenCount}
                  onChange={(e) => setCurrentOwner({...currentOwner, childrenCount: Number(e.target.value)})}
                  min="0"
                  max="10"
                  placeholder="2"
                />
              </div>
              
              <div>
                <Label htmlFor="relationship">승계 대상자</Label>
                <select
                  id="relationship"
                  value={currentOwner.relationship}
                  onChange={(e) => setCurrentOwner({...currentOwner, relationship: e.target.value as any})}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  <option value="child">자녀</option>
                  <option value="spouse">배우자</option>
                  <option value="third-party">제3자</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 결과 섹션 */}
        <div className="space-y-6">
          {/* 기본 계산 결과 */}
          <Card className="border-2 border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-purple-900">승계 비용 분석</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">사업체 가치</span>
                  <span className="font-semibold">
                    {businessInfo.businessValue.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">승계 방법</span>
                  <span className="font-semibold">
                    {getMethodLabel(successionPlan.method)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">승계 대상 가치</span>
                  <span className="font-semibold">
                    {result.transferValue.toLocaleString()}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">세무 비용</span>
                  <span className="font-semibold text-red-600">
                    {result.taxCost.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">법무 비용</span>
                  <span className="font-semibold">
                    {result.legalCost.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">평가 비용</span>
                  <span className="font-semibold">
                    {result.valuationCost.toLocaleString()}만원
                  </span>
                </div>
                
                {successionPlan.useHoldingCo && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">지주회사 설립</span>
                    <span className="font-semibold">
                      {result.holdingCoCost.toLocaleString()}만원
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">컨설팅 비용</span>
                  <span className="font-semibold">
                    {result.consultingCost.toLocaleString()}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-900 font-bold">총 승계 비용</span>
                  <span className="font-bold text-red-600 text-xl">
                    {result.totalCost.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">비용 비율</span>
                  <span className="font-semibold">
                    {result.effectiveRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              {result.specialDeduction > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-green-900">가업승계 특례 적용</span>
                      <p className="text-green-700">
                        {result.specialDeduction.toLocaleString()}만원 추가 공제로 
                        {result.savingsFromSpecialTax.toLocaleString()}만원 절세
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 최적화 제안 */}
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-900">🎯 승계 최적화 제안</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">현재 계획 비용</span>
                  <span className="font-semibold text-red-600">
                    {optimization.currentCost.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">지주회사 활용시</span>
                  <span className="font-semibold text-green-600">
                    -{optimization.holdingCoSavings.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">10년 분할증여시</span>
                  <span className="font-semibold text-green-600">
                    -{optimization.splitGiftSavings.toLocaleString()}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-900 font-bold">최적 절세 효과</span>
                  <span className="font-bold text-green-600 text-xl">
                    {Math.max(optimization.holdingCoSavings, optimization.splitGiftSavings).toLocaleString()}만원
                  </span>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 권장 전략</h4>
                <p className="text-sm text-blue-800">
                  {optimization.bestStrategy === 'gift' 
                    ? `10년 분할증여 방식으로 ${optimization.splitGiftSavings.toLocaleString()}만원을 절약할 수 있습니다.`
                    : `지주회사 활용으로 ${optimization.holdingCoSavings.toLocaleString()}만원을 절약할 수 있습니다.`
                  }
                  이는 총 비용의 <strong>{((Math.max(optimization.holdingCoSavings, optimization.splitGiftSavings) / optimization.currentCost) * 100).toFixed(0)}%</strong>에 해당합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
              <a href="/contact?service=succession-planning" className="w-full">
                맞춤형 가업승계 전략 상담 신청
              </a>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <a href="/calculators/inheritance-tax" className="w-full">
                  상속세 계산기
                </a>
              </Button>
              <Button variant="outline" size="lg">
                <a href="/calculators/gift-tax" className="w-full">
                  증여세 계산기
                </a>
              </Button>
            </div>
          </div>

          {/* 주의사항 */}
          <Card>
            <CardHeader>
              <CardTitle>⚠️ 가업승계 주요 고려사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>가업승계 특례 적용을 위한 요건 충족 확인 필요</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>기업가치 평가는 전문기관의 정밀 평가 권장</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>세법 변경 및 해석에 따라 실제 비용 달라질 수 있음</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>조기 계획 수립으로 최대 70% 세무비용 절약 가능</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 관련 서비스 */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">가업승계 전문 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">기업가치 평가</h3>
              <p className="text-sm text-slate-600 mb-4">정확한 기업가치 평가와 승계 계획 수립</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/services/business-valuation">상세보기</a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">지주회사 설립</h3>
              <p className="text-sm text-slate-600 mb-4">효율적인 승계를 위한 지주회사 구조 설계</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/services/holding-company">상세보기</a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">세무 최적화</h3>
              <p className="text-sm text-slate-600 mb-4">가업승계 특례 및 절세 전략 수립</p>
              <Button variant="outline" size="sm" className="w-full">
                <a href="/contact?service=tax-optimization">상담 신청</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
          ⚠️ <strong>면책 고지</strong>: 이 계산기는 일반적인 가업승계 비용 예상을 위한 도구입니다. 
          실제 비용은 개별 사업체의 특성, 세법 적용, 평가 방법 등에 따라 달라질 수 있으므로 
          정확한 승계 계획 수립을 위해서는 반드시 전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}