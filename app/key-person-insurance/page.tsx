'use client';

import {
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
  Info,
  Lightbulb,
  Phone,
  PiggyBank,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { CalComPopup } from '@/components/cal-com-popup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AnimatedCounter } from '@/components/animated-counter';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function KeyPersonInsurancePage() {
  const [startAnimation, setStartAnimation] = useState(false);

  // easing 함수를 메모이제이션
  const easingFunction = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 주요 혜택 (CEO보장정기보험 특화)
  const keyBenefits = [
    {
      icon: PiggyBank,
      title: 'CEO 퇴직급여 절세',
      description: '법인명의 가입으로 전액 손금처리, 퇴직소득세 최대 절약',
      saving: '최대 50%',
      color: 'green',
      details: ['법인 손금처리 100%', '퇴직소득세 비과세', '임원 퇴직급여 대용']
    },
    {
      icon: Building,
      title: '기업 연속성 보장',
      description: '핵심인재 사망시 기업 운영자금 확보 및 경영승계 지원',
      saving: '운영자금',
      color: 'blue',
      details: ['운영자금 확보', '신규채용 비용', '업무 공백 보상']
    },
    {
      icon: Trophy,
      title: '임원 전용 혜택',
      description: '고액 보장한도와 우대 보험료율 적용',
      saving: '특별 요율',
      color: 'purple',
      details: ['최대 50억 보장', '우대 보험료율', '건강체 할인']
    },
    {
      icon: Shield,
      title: '법인세 절약',
      description: '보험료 전액 손금처리로 법인세 부담 경감',
      saving: '100% 손금',
      color: 'orange',
      details: ['보험료 손금처리', '법인세 절약', '현금흐름 개선']
    }
  ];


  // 가입 절차
  const enrollmentProcess = [
    {
      step: 1,
      title: '자격 확인',
      description: 'CEO, 임원, 핵심인재 자격 요건 검토',
      duration: '1일',
      color: 'from-blue-500 to-blue-600',
      items: ['임원 등기부등본', '재직증명서', '급여명세서', '사업자등록증']
    },
    {
      step: 2,
      title: '상품 설계',
      description: '개인 맞춤형 보험 설계 및 절세 효과 분석',
      duration: '2-3일',
      color: 'from-green-500 to-green-600',
      items: ['소득분석', '절세효과 계산', '연금설계', '상속설계']
    },
    {
      step: 3,
      title: '계약 체결',
      description: '보험 계약 체결 및 첫 보험료 납입',
      duration: '1주',
      color: 'from-purple-500 to-purple-600',
      items: ['계약서 작성', '건강체크', '보험료 납입', '증권 발행']
    },
    {
      step: 4,
      title: '사후관리',
      description: '연 1회 운용보고서 및 지속적인 컨설팅',
      duration: '지속',
      color: 'from-orange-500 to-orange-600',
      items: ['운용현황 보고', '세제변경 안내', '연금전환 상담', '추가납입 제안']
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2 text-sm font-semibold">
                  <Trophy className="w-4 h-4 mr-1" />
                  CEO 전용 특별상품
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                경영인정기보험
                <br />
                <span className="text-yellow-400">완벽 가이드</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                법인 명의 가입으로 <strong className="text-yellow-300">보험료 전액 손금처리</strong>
                <br />
                CEO·핵심임원 사망시 <strong className="text-yellow-300">기업 연속성 보장</strong> 및 <strong className="text-yellow-300">법인세 절약</strong>
              </p>
              
              {/* 핵심 통계 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
                  <p className="text-sm text-blue-200">법인세 절약효과</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={50} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}억
                  </div>
                  <p className="text-sm text-blue-200">최대 보장한도</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={100} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}%
                  </div>
                  <p className="text-sm text-blue-200">손금처리 비율</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {startAnimation && (
                      <AnimatedCounter 
                        start={0} 
                        end={1} 
                        duration={2000}
                        easingFunction={easingFunction}
                      />
                    )}년
                  </div>
                  <p className="text-sm text-blue-200">갱신 보장기간</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  trigger={
                    <Button size="lg" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                      <Calculator className="mr-2 h-5 w-5" />
                      무료 절세효과 계산
                    </Button>
                  }
                  calLink="familyoffices/key-person-insurance"
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                  onClick={() => {
                    window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' });
                  }}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  가입절차 안내
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CEO보장정기보험 특징 섹션 */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  CEO보장정기보험이 <span className="text-blue-600">특별한 이유</span>
                </h2>
                <p className="text-xl text-gray-600">
                  법인 명의 가입으로 얻는 세무적 장점과 기업 보호 효과
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="border-l-4 border-l-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Building className="w-6 h-6 mr-3" />
                      법인세 절약 효과
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        보험료 전액 <strong>손금처리</strong> (법인세법 제19조)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        법인세율 22~25% 절약 효과
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        현금흐름 개선 및 자금운용 효율성 증대
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <Shield className="w-6 h-6 mr-3" />
                      기업 연속성 보장
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        핵심인재 사망시 <strong>운영자금 확보</strong>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        신규채용 및 교육비용 보상
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        업무공백으로 인한 매출손실 방지
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <Trophy className="w-6 h-6 mr-3" />
                      임원 전용 우대혜택
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <strong>최대 50억원</strong> 고액 보장한도
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        CEO/임원 전용 우대 보험료율
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        건강체 할인 및 단체할인 적용
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <Zap className="w-6 h-6 mr-3" />
                      간편한 관리 시스템
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <strong>1년 갱신형</strong>으로 유연한 보장관리
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        법인 회계처리 간소화
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        연간 보험료 조정 가능
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 혜택 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                CEO보장정기보험 <span className="text-blue-600">핵심 혜택</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                법인과 CEO 모두에게 도움이 되는 실질적 혜택들
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${
                      benefit.color === 'green' ? 'from-green-400 to-green-600' :
                      benefit.color === 'blue' ? 'from-blue-400 to-blue-600' :
                      benefit.color === 'purple' ? 'from-purple-400 to-purple-600' :
                      'from-orange-400 to-orange-600'
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                      benefit.color === 'green' ? 'bg-green-100 text-green-800' :
                      benefit.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      benefit.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {benefit.saving}
                    </div>
                    <div className="space-y-1">
                      {benefit.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* 가입 절차 섹션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                경영인정기보험 <span className="text-blue-600">가입 절차</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                전문가와 함께하는 체계적인 4단계 가입 프로세스
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {enrollmentProcess.map((step, index) => (
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                경영인정기보험 <span className="text-blue-600">FAQ</span>
              </h2>
              <p className="text-xl text-gray-600">
                경영인정기보험에 대한 자주 묻는 질문들
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    경영인정기보험 가입 자격 조건은 무엇인가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">경영인정기보험은 다음 조건을 만족하는 분들이 가입 가능합니다:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li><strong>법인 대표이사, 임원</strong>: 등기부등본상 확인 가능한 임원</li>
                    <li><strong>핵심 인재</strong>: 연봉 1억 이상 또는 지분 보유 임직원</li>
                    <li><strong>개인사업자</strong>: 사업자등록증 보유 및 일정 소득 증명</li>
                    <li><strong>전문직</strong>: 의사, 변호사, 회계사 등 전문 자격증 보유자</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    어떤 세제 혜택을 받을 수 있나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">납입 시 혜택</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 소득공제: 연 400만원 한도</li>
                        <li>• 법인세 비용처리 가능</li>
                        <li>• 증여세 절약 효과</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">수령 시 혜택</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 퇴직소득세 0% (일시수령)</li>
                        <li>• 연금소득세 적용 (연금수령)</li>
                        <li>• 상속세 절세 혜택</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <PiggyBank className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    연금 전환은 언제부터 가능한가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">경영인정기보험의 연금전환 조건은 다음과 같습니다:</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>연금개시 연령</strong>: 만 55세부터 가능 (상품에 따라 차이)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>연금종류</strong>: 종신연금, 확정연금, 상속연금 선택
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <strong>세제혜택</strong>: 연금소득세 적용으로 절세 효과
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    원금 손실 위험은 없나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">경영인정기보험은 원금보장 상품으로 다음과 같은 안전장치가 있습니다:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">원금 보장</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 최소보증이율 적용</li>
                        <li>• 납입원금 100% 보장</li>
                        <li>• 생명보험사 지급여력비율</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">추가 보장</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 예금자보호법 적용</li>
                        <li>• 보험업감독규정 준수</li>
                        <li>• 금융감독원 관리감독</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Calculator className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    중도해지 시 손해는 어느 정도인가요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-3">경영인정기보험 중도해지 시 다음과 같은 영향이 있습니다:</p>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Zap className="w-5 h-5 text-yellow-600 mr-3" />
                      <div>
                        <div className="font-semibold">초기 5년</div>
                        <div className="text-sm text-gray-600">해지환급금이 납입원금보다 적을 수 있음</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-semibold">5년 이후</div>
                        <div className="text-sm text-gray-600">점진적으로 해지환급률 상승</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold">10년 이후</div>
                        <div className="text-sm text-gray-600">납입원금 회복 및 이익 발생</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-lg">
                    <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    경영인정기보험 가입 상담은 어떻게 받나요?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p className="mb-4">삼성생명 GFC 전문가와 1:1 맞춤 상담을 받으실 수 있습니다:</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">전화 상담</span>
                      <span className="text-blue-600 font-mono">0502-5550-8700</span>
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
                        calLink="familyoffices/key-person-insurance"
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
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 시작하는 <span className="text-yellow-400">CEO 전용 보험</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              경영인정기보험 전문가와 함께 
              <br />
              <strong>퇴직금·상속세 절세</strong> 전략을 수립하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalComPopup
                trigger={
                  <Button size="lg" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 상담 예약
                  </Button>
                }
                calLink="familyoffices/key-person-insurance"
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
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
      <Script id="key-person-insurance-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": "경영인정기보험 완벽 가이드 | CEO 전용 보험 상품 비교",
              "description": "CEO·핵심임직원 전용 보험상품으로 퇴직금·상속세 절세와 연금보험 전환 혜택까지. 삼성생명 GFC 전문가 상담.",
              "image": {
                "@type": "ImageObject",
                "url": "https://familyoffices.kr/images/key-person-insurance-guide.jpg",
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
                "@id": "https://familyoffices.kr/key-person-insurance"
              }
            },
            {
              "@type": "Service",
              "name": "경영인정기보험 상담",
              "description": "CEO·핵심임직원을 위한 전용 보험상품 상담 및 설계 서비스",
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
                "serviceUrl": "https://familyoffices.kr/key-person-insurance",
                "servicePhone": "+82-502-5550-8700"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "KRW",
                "description": "무료 상담 및 보험 설계"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "경영인정기보험 가입 자격 조건은 무엇인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "법인 대표이사·임원, 연봉 1억 이상 핵심인재, 개인사업자, 전문직 자격증 보유자가 가입 가능합니다."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "어떤 세제 혜택을 받을 수 있나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "납입시 연 400만원 소득공제, 수령시 퇴직소득세 0% 또는 연금소득세 적용, 상속세 절세 혜택을 받을 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "연금 전환은 언제부터 가능한가요?", 
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "만 55세부터 종신연금, 확정연금, 상속연금 중 선택하여 연금수령이 가능하며, 연금소득세 적용으로 절세 효과가 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "원금 손실 위험은 없나요?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "최소보증이율 적용으로 납입원금 100% 보장되며, 예금자보호법 적용 및 금융감독원 관리감독을 받습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "중도해지 시 손해는 어느 정도인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "초기 5년은 해지환급금이 적을 수 있으나, 5년 이후 점진적 상승, 10년 이후 납입원금 회복 및 이익이 발생합니다."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "경영인정기보험 가입 상담은 어떻게 받나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "전화상담(0502-5550-8700), 온라인 예약, 방문상담(서울 중구 세종대로 124)을 통해 삼성생명 GFC 전문가와 1:1 맞춤 상담받으실 수 있습니다."
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