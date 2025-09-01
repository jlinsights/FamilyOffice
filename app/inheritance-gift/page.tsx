'use client';

import {
  AlertTriangle,
  Award,
  Building,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Gift,
  GraduationCap,
  Heart,
  Home,
  Info,
  Lightbulb,
  MapPin,
  Minus,
  Percent,
  Phone,
  PieChart,
  Plus,
  Shield,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function InheritanceGiftPage() {
  const [startAnimation, setStartAnimation] = useState(false);
  
  // 계산기 상태
  const [activeCalculator, setActiveCalculator] = useState('inheritance');
  
  // 상속세 계산기 상태
  const [inheritanceAmount, setInheritanceAmount] = useState('');
  const [inheritanceRelation, setInheritanceRelation] = useState('spouse');
  const [inheritanceHeirs, setInheritanceHeirs] = useState('1');
  const [inheritanceTax, setInheritanceTax] = useState(0);
  
  // 증여세 계산기 상태
  const [giftAmount, setGiftAmount] = useState('');
  const [giftRelation, setGiftRelation] = useState('child');
  const [giftAge, setGiftAge] = useState('adult');
  const [giftTax, setGiftTax] = useState(0);

  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 상속세 계산 함수
  const calculateInheritanceTax = useCallback(() => {
    const amount = parseInt(inheritanceAmount.replace(/,/g, '')) * 10000; // 만원 단위
    if (!amount || amount <= 0) {
      setInheritanceTax(0);
      return;
    }

    let basicDeduction = 0;
    let additionalDeduction = 0;

    // 기초공제 (2025년 기준)
    basicDeduction = 200000000; // 2억원

    // 인적공제 (2025년 기준)
    if (inheritanceRelation === 'spouse') {
      // 배우자공제: 최소 5억원, 상속재산의 30% 중 큰 금액 (최대 30억원)
      const spouseDeduction = Math.max(500000000, Math.min(amount * 0.3, 3000000000));
      additionalDeduction += spouseDeduction;
      additionalDeduction += parseInt(inheritanceHeirs) * 50000000; // 자녀당 5천만원
    } else if (inheritanceRelation === 'child') {
      additionalDeduction += parseInt(inheritanceHeirs) * 50000000; // 자녀당 5천만원
    } else if (inheritanceRelation === 'parent') {
      additionalDeduction += parseInt(inheritanceHeirs) * 50000000; // 부모당 5천만원
    } else {
      additionalDeduction += parseInt(inheritanceHeirs) * 50000000; // 기타 인당 5천만원
    }

    // 과세표준
    const taxableAmount = Math.max(0, amount - basicDeduction - additionalDeduction);
    
    let tax = 0;
    if (taxableAmount <= 100000000) {
      tax = taxableAmount * 0.1;
    } else if (taxableAmount <= 500000000) {
      tax = 10000000 + (taxableAmount - 100000000) * 0.2;
    } else if (taxableAmount <= 1000000000) {
      tax = 90000000 + (taxableAmount - 500000000) * 0.3;
    } else if (taxableAmount <= 3000000000) {
      tax = 240000000 + (taxableAmount - 1000000000) * 0.4;
    } else {
      tax = 1040000000 + (taxableAmount - 3000000000) * 0.5;
    }

    setInheritanceTax(Math.round(tax));
  }, [inheritanceAmount, inheritanceRelation, inheritanceHeirs]);

  // 증여세 계산 함수
  const calculateGiftTax = useCallback(() => {
    const amount = parseInt(giftAmount.replace(/,/g, '')) * 10000; // 만원 단위
    if (!amount || amount <= 0) {
      setGiftTax(0);
      return;
    }

    let deduction = 0;

    // 공제액 결정 (2025년 기준)
    if (giftRelation === 'spouse') {
      deduction = 600000000; // 6억원 (10년간)
    } else if (giftRelation === 'child') {
      deduction = giftAge === 'minor' ? 20000000 : 50000000; // 미성년자 2천만원, 성년자 5천만원 (10년간)
    } else if (giftRelation === 'parent') {
      deduction = 50000000; // 5천만원 (10년간)
    } else {
      deduction = 10000000; // 기타 1천만원 (10년간)
    }

    // 과세표준
    const taxableAmount = Math.max(0, amount - deduction);
    
    let tax = 0;
    if (taxableAmount <= 100000000) {
      tax = taxableAmount * 0.1;
    } else if (taxableAmount <= 500000000) {
      tax = 10000000 + (taxableAmount - 100000000) * 0.2;
    } else if (taxableAmount <= 1000000000) {
      tax = 90000000 + (taxableAmount - 500000000) * 0.3;
    } else if (taxableAmount <= 3000000000) {
      tax = 240000000 + (taxableAmount - 1000000000) * 0.4;
    } else {
      tax = 1040000000 + (taxableAmount - 3000000000) * 0.5;
    }

    setGiftTax(Math.round(tax));
  }, [giftAmount, giftRelation, giftAge]);

  // 실시간 계산
  useEffect(() => {
    calculateInheritanceTax();
  }, [calculateInheritanceTax]);

  useEffect(() => {
    calculateGiftTax();
  }, [calculateGiftTax]);

  // 숫자 포맷 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  // Input 포맷 함수
  const formatInputValue = (value: string) => {
    const numValue = value.replace(/,/g, '');
    if (numValue && !isNaN(Number(numValue))) {
      return new Intl.NumberFormat('ko-KR').format(Number(numValue));
    }
    return value;
  };

  // 세율표 데이터
  const taxRates = [
    { range: '1억원 이하', rate: '10%', progressiveDeduction: '0원' },
    { range: '1억 초과 ~ 5억 이하', rate: '20%', progressiveDeduction: '1,000만원' },
    { range: '5억 초과 ~ 10억 이하', rate: '30%', progressiveDeduction: '6,000만원' },
    { range: '10억 초과 ~ 30억 이하', rate: '40%', progressiveDeduction: '1억 6,000만원' },
    { range: '30억 초과', rate: '50%', progressiveDeduction: '4억 6,000만원' },
  ];

  // 절세 전략
  const taxSavingStrategies = [
    {
      icon: Gift,
      title: '생전증여 활용',
      description: '매년 증여세 공제한도 내에서 단계적 증여',
      savingRate: '최대 30%',
      color: 'green',
      details: ['배우자: 연 6억', '자녀: 연 5천만원', '10년 단위 반복']
    },
    {
      icon: Building,
      title: '가업승계 특례',
      description: '가업승계를 위한 주식 증여시 세액공제',
      savingRate: '최대 60%',
      color: 'blue',
      details: ['최대 300억 한도', '고용유지 조건', '사업지속 의무']
    },
    {
      icon: Home,
      title: '부동산 활용',
      description: '거주주택, 농지 등 특례 활용',
      savingRate: '최대 40%',
      color: 'purple',
      details: ['거주주택 40% 감액', '농지 30% 감액', '조건부 특례']
    },
    {
      icon: Shield,
      title: '보험 활용',
      description: '생명보험을 통한 상속재원 확보',
      savingRate: '최대 50%',
      color: 'orange',
      details: ['비과세 한도', '유동성 확보', '절세형 보험']
    }
  ];

  // 절차별 가이드
  const procedureSteps = [
    {
      step: 1,
      title: '재산평가',
      description: '상속·증여 대상 재산의 정확한 평가',
      items: ['부동산 감정평가', '주식 평가', '금융재산 조사', '부채 확인'],
      duration: '1-2주',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 2,
      title: '절세방안 수립',
      description: '각종 공제와 특례를 활용한 절세전략 설계',
      items: ['공제항목 검토', '특례 적용여부', '분할납부 검토', '연부연납 검토'],
      duration: '1주',
      color: 'from-green-500 to-green-600'
    },
    {
      step: 3,
      title: '신고·납부',
      description: '세무서 신고 및 세금 납부',
      items: ['신고서 작성', '첨부서류 준비', '세금계산', '납부방법 결정'],
      duration: '1주',
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: 4,
      title: '사후관리',
      description: '신고 후 세무조사 대응 및 추가 절세방안',
      items: ['세무조사 대응', '경정청구', '추가 절세방안', '차기 대비'],
      duration: '지속',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-semibold">
                  <Calculator className="w-4 h-4 mr-1" />
                  2025년 최신 세율 적용
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                상속증여세
                <br />
                <span className="text-yellow-400">완벽 가이드</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
                2025년 최신 세율표와 무료 계산기로
                <br />
                <strong className="text-yellow-300">합법적 절세 전략</strong>을 수립하세요
              </p>
              
              {/* 핵심 통계 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={50} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}%
                  </div>
                  <p className="text-sm text-green-200">최고세율</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={6} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}억
                  </div>
                  <p className="text-sm text-green-200">배우자 공제</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={300} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}억
                  </div>
                  <p className="text-sm text-green-200">가업승계 한도</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={60} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}%
                  </div>
                  <p className="text-sm text-green-200">최대 절세율</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    const element = document.getElementById('tax-calculator');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  무료 세금 계산하기
                </Button>
                <CalComPopup
                  trigger={
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      전문가 상담
                    </Button>
                  }
                  calLink="familyoffices/inheritance-gift"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 세금 계산기 섹션 */}
        <section id="tax-calculator" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-green-600">무료</span> 상속증여세 계산기
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                2024년 최신 세율 적용, 정확한 세금 계산 서비스
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Tabs value={activeCalculator} onValueChange={setActiveCalculator}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="inheritance" className="text-lg py-3">
                    <Gift className="w-5 h-5 mr-2" />
                    상속세 계산기
                  </TabsTrigger>
                  <TabsTrigger value="gift" className="text-lg py-3">
                    <Heart className="w-5 h-5 mr-2" />
                    증여세 계산기
                  </TabsTrigger>
                </TabsList>

                {/* 상속세 계산기 */}
                <TabsContent value="inheritance">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardTitle className="text-2xl flex items-center">
                        <Gift className="w-6 h-6 mr-2" />
                        상속세 계산기
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="inheritance-amount" className="text-lg font-semibold">
                              상속재산 총액 (만원)
                            </Label>
                            <Input
                              id="inheritance-amount"
                              type="text"
                              placeholder="예: 100,000"
                              value={inheritanceAmount}
                              onChange={(e) => setInheritanceAmount(formatInputValue(e.target.value))}
                              className="text-lg p-3 mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-lg font-semibold">상속인과의 관계</Label>
                            <Select value={inheritanceRelation} onValueChange={setInheritanceRelation}>
                              <SelectTrigger className="text-lg p-3 mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="spouse">배우자</SelectItem>
                                <SelectItem value="child">직계비속(자녀)</SelectItem>
                                <SelectItem value="parent">직계존속(부모)</SelectItem>
                                <SelectItem value="sibling">형제자매</SelectItem>
                                <SelectItem value="other">기타</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="inheritance-heirs" className="text-lg font-semibold">
                              상속인 수 (명)
                            </Label>
                            <Input
                              id="inheritance-heirs"
                              type="number"
                              min="1"
                              max="10"
                              value={inheritanceHeirs}
                              onChange={(e) => setInheritanceHeirs(e.target.value)}
                              className="text-lg p-3 mt-2"
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold mb-4 text-gray-900">계산 결과</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">상속재산 총액</span>
                              <span className="font-semibold">
                                {inheritanceAmount ? `${inheritanceAmount}만원` : '0원'}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center text-red-600">
                              <span className="text-lg font-semibold">상속세 예상액</span>
                              <span className="text-xl font-bold">
                                {formatNumber(Math.round(inheritanceTax / 10000))}만원
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-green-600">
                              <span className="text-lg font-semibold">실수령액</span>
                              <span className="text-xl font-bold">
                                {inheritanceAmount ? 
                                  `${formatNumber(parseInt(inheritanceAmount.replace(/,/g, '')) - Math.round(inheritanceTax / 10000))}만원` : 
                                  '0원'
                                }
                              </span>
                            </div>
                            <div className="mt-6">
                              <CalComPopup
                                trigger={
                                  <Button className="w-full" size="lg">
                                    <Phone className="mr-2 h-4 w-4" />
                                    절세 전략 상담받기
                                  </Button>
                                }
                                calLink="familyoffices/inheritance-gift"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 증여세 계산기 */}
                <TabsContent value="gift">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardTitle className="text-2xl flex items-center">
                        <Heart className="w-6 h-6 mr-2" />
                        증여세 계산기
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="gift-amount" className="text-lg font-semibold">
                              증여재산 가액 (만원)
                            </Label>
                            <Input
                              id="gift-amount"
                              type="text"
                              placeholder="예: 10,000"
                              value={giftAmount}
                              onChange={(e) => setGiftAmount(formatInputValue(e.target.value))}
                              className="text-lg p-3 mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-lg font-semibold">증여받는 사람과의 관계</Label>
                            <Select value={giftRelation} onValueChange={setGiftRelation}>
                              <SelectTrigger className="text-lg p-3 mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="spouse">배우자</SelectItem>
                                <SelectItem value="child">직계비속(자녀)</SelectItem>
                                <SelectItem value="parent">직계존속(부모)</SelectItem>
                                <SelectItem value="other">기타</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {giftRelation === 'child' && (
                            <div>
                              <Label className="text-lg font-semibold">연령 구분</Label>
                              <Select value={giftAge} onValueChange={setGiftAge}>
                                <SelectTrigger className="text-lg p-3 mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="adult">성년자(만19세 이상)</SelectItem>
                                  <SelectItem value="minor">미성년자(만19세 미만)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold mb-4 text-gray-900">계산 결과</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">증여재산 가액</span>
                              <span className="font-semibold">
                                {giftAmount ? `${giftAmount}만원` : '0원'}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center text-red-600">
                              <span className="text-lg font-semibold">증여세 예상액</span>
                              <span className="text-xl font-bold">
                                {formatNumber(Math.round(giftTax / 10000))}만원
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-green-600">
                              <span className="text-lg font-semibold">실수령액</span>
                              <span className="text-xl font-bold">
                                {giftAmount ? 
                                  `${formatNumber(parseInt(giftAmount.replace(/,/g, '')) - Math.round(giftTax / 10000))}만원` : 
                                  '0원'
                                }
                              </span>
                            </div>
                            <div className="mt-6">
                              <CalComPopup
                                trigger={
                                  <Button className="w-full" size="lg">
                                    <Phone className="mr-2 h-4 w-4" />
                                    절세 전략 상담받기
                                  </Button>
                                }
                                calLink="familyoffices/inheritance-gift"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* 세율표 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                2025년 <span className="text-green-600">상속증여세 세율표</span>
              </h2>
              <p className="text-xl text-gray-600">
                정확한 세금 계산을 위한 최신 세율 정보
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <CardTitle className="text-xl">상속세·증여세 세율 (2025년 기준)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-gray-900">과세표준</th>
                          <th className="px-6 py-4 text-center font-semibold text-gray-900">세율</th>
                          <th className="px-6 py-4 text-center font-semibold text-gray-900">누진공제액</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {taxRates.map((rate, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{rate.range}</td>
                            <td className="px-6 py-4 text-center font-bold text-red-600">{rate.rate}</td>
                            <td className="px-6 py-4 text-center text-gray-600">{rate.progressiveDeduction}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* 공제항목 정보 */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">상속세 공제</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        기초공제: 2억원 (변경없음)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        배우자공제: 최소 5억원 (최대 30억원)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        자녀공제: 1인당 5천만원
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        미성년자공제: 1천만원×(19-연령)
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">증여세 공제</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        배우자: 10년간 6억원
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        성년자녀: 10년간 5천만원
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        미성년자녀: 10년간 2천만원
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        기타: 10년간 1천만원
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 절세 전략 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                상속증여세 <span className="text-green-600">절세 전략</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                전문가가 알려주는 합법적이고 효과적인 절세 방법
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {taxSavingStrategies.map((strategy, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${
                      strategy.color === 'green' ? 'from-green-400 to-green-600' :
                      strategy.color === 'blue' ? 'from-blue-400 to-blue-600' :
                      strategy.color === 'purple' ? 'from-purple-400 to-purple-600' :
                      'from-orange-400 to-orange-600'
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <strategy.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                      strategy.color === 'green' ? 'bg-green-100 text-green-800' :
                      strategy.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      strategy.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {strategy.savingRate}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {strategy.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 신고납부 절차 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                상속증여세 <span className="text-green-600">신고납부 절차</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                체계적인 4단계 프로세스로 정확하고 안전한 세무처리
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {procedureSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step.color}`}></div>
                  <CardHeader className="text-center pt-6">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold mb-3`}>
                      {step.step}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                상속증여세 <span className="text-green-600">FAQ</span>
              </h2>
              <p className="text-xl text-gray-600">
                상속증여세에 대한 자주 묻는 질문들
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    상속세 신고기한은 언제까지인가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">상속세는 피상속인이 사망한 날이 속하는 달의 말일부터 6개월 이내에 신고납부해야 합니다.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        <strong>일반 상속</strong>: 6개월 이내
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        <strong>기한 연장</strong>: 3개월까지 연장 가능
                      </li>
                      <li className="flex items-center">
                        <DollarSign className="w-4 h-4 text-red-600 mr-2" />
                        <strong>신고 납부세액 공제</strong>: 10% (3개월 이내 신고시)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Gift className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    증여세 신고 시 유의사항은?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">증여세는 증여받은 날이 속하는 달의 말일부터 3개월 이내에 신고납부해야 합니다.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">신고의무자</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 증여받은 자(수증자)</li>
                        <li>• 법정대리인</li>
                        <li>• 상속인</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">신고혜택</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 신고세액공제 10%</li>
                        <li>• 성실신고 확인대상시 3%</li>
                        <li>• 분할납부 가능</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Building className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    가업승계 세제혜택은 어떻게 되나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">가업승계 특례는 중소기업 및 중견기업의 경영권 승계시 큰 절세 혜택을 제공합니다.</p>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold">증여세 납부유예</div>
                        <div className="text-sm text-gray-600">최대 300억원 한도, 15년간 납부유예</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-semibold">상속세 납부유예</div>
                        <div className="text-sm text-gray-600">최대 200억원 한도, 10년간 납부유예</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-semibold">고용유지 의무</div>
                        <div className="text-sm text-gray-600">5년간 고용유지율 80% 이상</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Calculator className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    분할납부나 연부연납은 언제 가능한가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">상속세액이 일정 금액을 초과하는 경우 분할납부나 연부연납을 신청할 수 있습니다.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-600 mb-2">분할납부</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 납부세액 2천만원 초과시</li>
                        <li>• 2~5회 분할 가능</li>
                        <li>• 이자 연 1.8%</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">연부연납</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 납부세액 1억원 초과시</li>
                        <li>• 최대 10년 분할</li>
                        <li>• 담보 제공 필요</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Home className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    부동산 상속시 평가는 어떻게 하나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">부동산 상속시 시가 또는 보충적 평가방법으로 평가합니다.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">평가순서</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>시가 (감정평가액, 매매사례가액 등)</li>
                        <li>공시가격 (기준시가)</li>
                        <li>환산가액 (개별주택가격, 개별공시지가)</li>
                      </ol>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-600 text-sm">거주주택 특례</h4>
                        <p className="text-xs text-gray-600">40% 평가감액 (9억원 한도)</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-600 text-sm">농지 특례</h4>
                        <p className="text-xs text-gray-600">30% 평가감액 조건부</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    상속증여세 상담은 어떻게 받나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-4">패밀리오피스 S 전문가와 1:1 맞춤 상담을 받으실 수 있습니다:</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">전화 상담</span>
                      <span className="text-green-600 font-mono">0502-5550-8700</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">온라인 예약</span>
                      <CalComPopup
                        trigger={
                          <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            예약하기
                          </Button>
                        }
                        calLink="familyoffices/inheritance-gift"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">방문 상담</span>
                      <span className="text-sm text-gray-600">서울 중구 세종대로 124</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 시작하는 <span className="text-yellow-400">상속증여세 절세</span>
            </h2>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              전문가와 함께 수립하는 맞춤형 절세 전략으로
              <br />
              <strong>최대 60% 세금 절약</strong>을 실현하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 상담 예약
                  </Button>
                }
                calLink="familyoffices/inheritance-gift"
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg"
                onClick={() => window.open('tel:0502-5550-8700')}
              >
                <Phone className="mr-2 h-5 w-5" />
                0502-5550-8700
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <Script id="inheritance-gift-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": "상속증여세 완벽 가이드 | 절세 전략 + 무료 계산기",
              "description": "2025년 최신 상속증여세 세율표, 절세 전략, 무료 계산기 제공. 전문가가 알려주는 합법적 절세 노하우.",
              "image": {
                "@type": "ImageObject",
                "url": "https://familyoffices.kr/images/inheritance-gift-guide.jpg",
                "width": 1200,
                "height": 630
              },
              "author": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "url": "https://familyoffices.kr"
              },
              "publisher": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://familyoffices.kr/logo.png",
                  "width": 400,
                  "height": 60
                }
              },
              "datePublished": new Date().toISOString(),
              "dateModified": new Date().toISOString(),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://familyoffices.kr/inheritance-gift"
              }
            },
            {
              "@type": "Service",
              "name": "상속증여세 상담",
              "description": "상속증여세 절세 전략 수립 및 신고 대행 서비스",
              "provider": {
                "@type": "Organization",
                "name": "패밀리오피스 S",
                "telephone": "+82-502-5550-8700",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "세종대로 124",
                  "addressLocality": "중구",
                  "addressRegion": "서울",
                  "addressCountry": "KR"
                }
              },
              "areaServed": "KR",
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://familyoffices.kr/inheritance-gift",
                "servicePhone": "+82-502-5550-8700"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "KRW",
                "description": "무료 상담 및 절세 전략 설계"
              }
            },
            {
              "@type": "WebApplication",
              "name": "상속증여세 계산기",
              "description": "2025년 최신 세율 적용 무료 상속증여세 계산기",
              "url": "https://familyoffices.kr/inheritance-gift#tax-calculator",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              }
            },
            {
              "@type": "HowTo",
              "name": "상속증여세 절세 방법",
              "description": "단계별 상속증여세 절세 전략 수립 방법",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "재산평가",
                  "text": "상속·증여 대상 재산의 정확한 평가를 실시합니다."
                },
                {
                  "@type": "HowToStep", 
                  "name": "절세방안 수립",
                  "text": "각종 공제와 특례를 활용한 절세전략을 설계합니다."
                },
                {
                  "@type": "HowToStep",
                  "name": "신고·납부",
                  "text": "세무서 신고 및 세금 납부를 진행합니다."
                },
                {
                  "@type": "HowToStep",
                  "name": "사후관리",
                  "text": "신고 후 세무조사 대응 및 추가 절세방안을 마련합니다."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "상속세 신고기한은 언제까지인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "피상속인이 사망한 날이 속하는 달의 말일부터 6개월 이내에 신고납부해야 하며, 3개월까지 연장 가능하고 3개월 이내 신고시 신고납부세액 공제 10%를 받을 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "증여세 신고 시 유의사항은?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "증여받은 날이 속하는 달의 말일부터 3개월 이내에 신고납부해야 하며, 수증자가 신고의무를 지고 신고세액공제 10%를 받을 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "가업승계 세제혜택은 어떻게 되나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "중소기업 및 중견기업의 경영권 승계시 증여세는 최대 300억원 한도로 15년간 납부유예, 상속세는 최대 200억원 한도로 10년간 납부유예가 가능하며 고용유지 의무가 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "분할납부나 연부연납은 언제 가능한가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "분할납부는 납부세액 2천만원 초과시 2~5회 분할 가능하고, 연부연납은 납부세액 1억원 초과시 최대 10년 분할 가능하며 담보 제공이 필요합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "부동산 상속시 평가는 어떻게 하나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "시가, 공시가격, 환산가액 순으로 평가하며, 거주주택은 40% 평가감액(9억원 한도), 농지는 30% 평가감액 특례가 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "상속증여세 상담은 어떻게 받나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "전화상담(0502-5550-8700), 온라인 예약, 방문상담(서울 중구 세종대로 124)을 통해 패밀리오피스 S 전문가와 1:1 맞춤 상담받으실 수 있습니다."
                  }
                }
              ]
            }
          ]
        })}
      </Script>

      <Footer />
    </>
  );
}