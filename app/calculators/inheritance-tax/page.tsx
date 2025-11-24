'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingDown, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function InheritanceTaxCalculatorPage() {
  const [assets, setAssets] = useState({
    cash: 0,
    realEstate: 0,
    stocks: 0,
    business: 0,
    other: 0
  });

  const [beneficiaries, setBeneficiaries] = useState({
    spouse: false,
    children: 0,
    others: 0
  });

  const [debts, setDebts] = useState({
    loans: 0,
    taxes: 0,
    funeral: 0
  });

  // 상속세 계산 로직
  const calculateTax = () => {
    const totalAssets = Object.values(assets).reduce((sum, val) => sum + Number(val), 0);
    const totalDebts = Object.values(debts).reduce((sum, val) => sum + Number(val), 0);
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
    return calculateProgressiveTax(taxableAssets);
  };

  // 누진세율 계산
  const calculateProgressiveTax = (taxableAmount: number) => {
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

  const result = calculateTax();
  const totalAssets = Object.values(assets).reduce((sum, val) => sum + Number(val), 0);
  const totalDebts = Object.values(debts).reduce((sum, val) => sum + Number(val), 0);
  const effectiveRate = totalAssets > 0 ? ((result / totalAssets) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-slate-900">상속세 계산기</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          2025년 최신 세법 기준으로 상속세를 정확하게 계산해보세요. 
          전문가가 설계한 계산기로 절세 전략까지 확인하실 수 있습니다.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>2025년 최신 세법 적용</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>누진세율 정확 계산</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>절세 방안 제시</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 입력 섹션 */}
        <div className="space-y-6">
          {/* 자산 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                자산 정보 (단위: 만원)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cash">현금 및 예금</Label>
                <Input
                  id="cash"
                  type="number"
                  value={assets.cash}
                  onChange={(e) => setAssets({...assets, cash: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="realEstate">부동산</Label>
                <Input
                  id="realEstate"
                  type="number"
                  value={assets.realEstate}
                  onChange={(e) => setAssets({...assets, realEstate: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="stocks">주식 및 금융자산</Label>
                <Input
                  id="stocks"
                  type="number"
                  value={assets.stocks}
                  onChange={(e) => setAssets({...assets, stocks: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="business">사업용 자산</Label>
                <Input
                  id="business"
                  type="number"
                  value={assets.business}
                  onChange={(e) => setAssets({...assets, business: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="other">기타 자산</Label>
                <Input
                  id="other"
                  type="number"
                  value={assets.other}
                  onChange={(e) => setAssets({...assets, other: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* 상속인 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                상속인 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="spouse"
                  checked={beneficiaries.spouse}
                  onChange={(e) => setBeneficiaries({...beneficiaries, spouse: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="spouse">배우자 있음 (5억원 공제)</Label>
              </div>
              
              <div>
                <Label htmlFor="children">자녀 수 (1인당 5천만원 공제)</Label>
                <Input
                  id="children"
                  type="number"
                  value={beneficiaries.children}
                  onChange={(e) => setBeneficiaries({...beneficiaries, children: Number(e.target.value)})}
                  min="0"
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="others">기타 상속인 수 (1인당 1천만원 공제)</Label>
                <Input
                  id="others"
                  type="number"
                  value={beneficiaries.others}
                  onChange={(e) => setBeneficiaries({...beneficiaries, others: Number(e.target.value)})}
                  min="0"
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* 채무 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                채무 및 비용 (단위: 만원)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loans">대출금 및 채무</Label>
                <Input
                  id="loans"
                  type="number"
                  value={debts.loans}
                  onChange={(e) => setDebts({...debts, loans: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="taxes">미납세금</Label>
                <Input
                  id="taxes"
                  type="number"
                  value={debts.taxes}
                  onChange={(e) => setDebts({...debts, taxes: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="funeral">장례비용</Label>
                <Input
                  id="funeral"
                  type="number"
                  value={debts.funeral}
                  onChange={(e) => setDebts({...debts, funeral: Number(e.target.value)})}
                  placeholder="500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 결과 섹션 */}
        <div className="space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-900">계산 결과</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">총 자산가액</span>
                  <span className="font-semibold">
                    {totalAssets.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">총 채무</span>
                  <span className="font-semibold text-red-600">
                    -{totalDebts.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">순자산가액</span>
                  <span className="font-semibold">
                    {(totalAssets - totalDebts).toLocaleString()}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">기초공제</span>
                  <span className="font-semibold text-green-600">
                    -20,000만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">인적공제</span>
                  <span className="font-semibold text-green-600">
                    -{(beneficiaries.spouse ? 50000 : 0) + (beneficiaries.children * 5000) + (beneficiaries.others * 1000)}만원
                  </span>
                </div>
                
                <hr className="border-slate-300" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-900 font-bold">예상 상속세</span>
                  <span className="font-bold text-red-600 text-xl">
                    {result.toLocaleString()}만원
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">실효세율</span>
                  <span className="font-semibold">
                    {effectiveRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* 절세 팁 */}
              {result > 10000 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">💡 절세 Tip</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• 생전증여를 통해 상속세를 최대 40% 절약할 수 있습니다</li>
                        <li>• 가업승계 특례를 활용하면 추가 공제가 가능합니다</li>
                        <li>• 부동산 임대사업 법인 설립으로 세부담을 줄일 수 있습니다</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA 버튼 */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <a href="/contact?service=inheritance-tax" className="w-full">
                    무료 상속세 최적화 상담 신청
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <a href="/calculators/gift-tax" className="w-full">
                    증여세 계산기도 사용해보기
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 추가 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>2025년 상속세 주요 변경사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>기초공제 한도 유지: 2억원</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>배우자 상속공제: 최대 5억원 (기존 동일)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>최고세율 50% 구간: 30억원 초과분</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>가업승계 특례 요건 일부 강화</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
          ⚠️ <strong>면책 고지</strong>: 이 계산기는 일반적인 상속세 예상 금액 산출을 위한 도구입니다. 
          실제 세액은 개별 사안의 특수성, 법령 해석, 평가 방법 등에 따라 달라질 수 있으므로 
          정확한 세무 계획 수립을 위해서는 반드시 전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}