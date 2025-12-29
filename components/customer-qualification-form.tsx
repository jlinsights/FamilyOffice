'use client';

/**
 * 🎯 고객 자격 검증 폼 컴포넌트
 * 순자산/순이익 기준으로 패밀리오피스 vs FP센터 자동 분류
 */
import {
    Award,
    Calculator,
    CheckCircle,
    Crown,
    Star,
    Target,
    TrendingUp,
} from 'lucide-react';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { CalComButton } from '@/components/calendar/cal-com-button';

import {
    CUSTOMER_SEGMENTS,
    assessCustomerQualification,
    generateTargetingMessage,
    type CustomerQualificationForm,
} from '@/lib/customer-segmentation';

export default function CustomerQualificationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CustomerQualificationForm>({
    companyName: '',
    ceoName: '',
    industry: '',
    employees: 0,
    annualRevenue: 0,
    netWorth: 0,
    netIncome: 0,
    assets: {
      realEstate: 0,
      financial: 0,
      business: 0,
      other: 0,
    },
    needsAssessment: {
      familyOffice: false,
      businessSuccession: false,
      taxOptimization: false,
      portfolioManagement: false,
      estatePlanning: false,
    },
    preferredContactMethod: 'phone',
    urgency: 'within-month',
  });

  const [assessment, setAssessment] = useState<ReturnType<
    typeof assessCustomerQualification
  > | null>(null);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent as string]: {
          ...(prev[parent as keyof CustomerQualificationForm] as any),
          [child as string]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const result = assessCustomerQualification(formData);
    setAssessment(result);
    setStep(4);
  };

  if (step === 1) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            기업 기본 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">회사명</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={e => handleInputChange('companyName', e.target.value)}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="ceoName">대표자명</Label>
              <Input
                id="ceoName"
                value={formData.ceoName}
                onChange={e => handleInputChange('ceoName', e.target.value)}
                placeholder="대표자명을 입력하세요"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">업종</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={e => handleInputChange('industry', e.target.value)}
                placeholder="예: 제조업, IT, 건설업"
              />
            </div>
            <div>
              <Label htmlFor="employees">직원 수</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees || ''}
                onChange={e =>
                  handleInputChange('employees', Number(e.target.value))
                }
                placeholder="직원 수"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="annualRevenue">연 매출 (억원)</Label>
            <Input
              id="annualRevenue"
              type="number"
              value={formData.annualRevenue || ''}
              onChange={e =>
                handleInputChange('annualRevenue', Number(e.target.value))
              }
              placeholder="연 매출을 입력하세요"
            />
          </div>

          <Button onClick={() => setStep(2)} className="w-full">
            다음 단계: 자산 정보 입력
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            자산 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="netWorth" className="text-lg font-semibold">
                총 순자산 (억원) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="netWorth"
                type="number"
                value={formData.netWorth || ''}
                onChange={e =>
                  handleInputChange('netWorth', Number(e.target.value))
                }
                placeholder="총 순자산"
                className="text-lg"
              />
              <p className="text-sm text-gray-600 mt-1">
                총자산 - 총부채 = 순자산
              </p>
            </div>
            <div>
              <Label htmlFor="netIncome" className="text-lg font-semibold">
                연 순이익 (억원) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="netIncome"
                type="number"
                value={formData.netIncome || ''}
                onChange={e =>
                  handleInputChange('netIncome', Number(e.target.value))
                }
                placeholder="연 순이익"
                className="text-lg"
              />
              <p className="text-sm text-gray-600 mt-1">세후 순이익 기준</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">자산 구성 (선택사항)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="realEstate">부동산 (억원)</Label>
                <Input
                  id="realEstate"
                  type="number"
                  value={formData.assets.realEstate || ''}
                  onChange={e =>
                    handleInputChange(
                      'assets.realEstate',
                      Number(e.target.value)
                    )
                  }
                  placeholder="부동산 자산"
                />
              </div>
              <div>
                <Label htmlFor="financial">금융자산 (억원)</Label>
                <Input
                  id="financial"
                  type="number"
                  value={formData.assets.financial || ''}
                  onChange={e =>
                    handleInputChange(
                      'assets.financial',
                      Number(e.target.value)
                    )
                  }
                  placeholder="주식, 채권, 예금 등"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business">사업자산 (억원)</Label>
                <Input
                  id="business"
                  type="number"
                  value={formData.assets.business || ''}
                  onChange={e =>
                    handleInputChange('assets.business', Number(e.target.value))
                  }
                  placeholder="사업지분, 영업권 등"
                />
              </div>
              <div>
                <Label htmlFor="other">기타자산 (억원)</Label>
                <Input
                  id="other"
                  type="number"
                  value={formData.assets.other || ''}
                  onChange={e =>
                    handleInputChange('assets.other', Number(e.target.value))
                  }
                  placeholder="예술품, 귀금속 등"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              이전
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1">
              다음 단계: 서비스 니즈
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 3) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            서비스 니즈 및 상담 방식
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">관심 서비스 (복수 선택 가능)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { key: 'familyOffice', label: '패밀리오피스 구축' },
                { key: 'businessSuccession', label: '가업승계 설계' },
                { key: 'taxOptimization', label: '세무 최적화' },
                { key: 'portfolioManagement', label: '포트폴리오 관리' },
                { key: 'estatePlanning', label: '상속 설계' },
              ].map(service => (
                <label
                  key={service.key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.needsAssessment[
                        service.key as keyof typeof formData.needsAssessment
                      ]
                    }
                    onChange={e =>
                      handleInputChange(
                        `needsAssessment.${service.key}`,
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>선호 연락 방법</Label>
              <select
                value={formData.preferredContactMethod}
                onChange={e =>
                  handleInputChange('preferredContactMethod', e.target.value)
                }
                className="w-full p-2 border rounded"
              >
                <option value="phone">전화 상담</option>
                <option value="email">이메일</option>
                <option value="in-person">직접 방문</option>
              </select>
            </div>
            <div>
              <Label>상담 긴급도</Label>
              <select
                value={formData.urgency}
                onChange={e => handleInputChange('urgency', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="immediate">즉시</option>
                <option value="within-month">1개월 내</option>
                <option value="within-quarter">3개월 내</option>
                <option value="planning">계획 단계</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              이전
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              결과 확인
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 4 && assessment) {
    const segmentData = CUSTOMER_SEGMENTS[assessment.segment];
    const targetingMessage = generateTargetingMessage(assessment.segment);

    return (
      <div className="space-y-6">
        {/* 결과 카드 */}
        <Card className="max-w-2xl mx-auto border-2 border-blue-200">
          <CardHeader className="text-center">
            <div className="mb-4">
              {assessment.segment === 'family-office' && (
                <Crown className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              )}
              {assessment.segment === 'fp-center' && (
                <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              )}
              {assessment.segment === 'prospect' && (
                <Star className="w-16 h-16 text-green-600 mx-auto mb-4" />
              )}
            </div>

            <Badge
              variant="secondary"
              className={`mb-4 px-4 py-2 text-lg ${
                assessment.segment === 'family-office'
                  ? 'bg-amber-100 text-amber-800'
                  : assessment.segment === 'fp-center'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
              }`}
            >
              {segmentData.serviceLevel}
            </Badge>

            <CardTitle className="text-2xl mb-4">
              {segmentData.name} 서비스 추천
            </CardTitle>

            <p className="text-gray-600">{segmentData.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">추천 서비스 범위</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {segmentData.services.slice(0, 4).map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">다음 단계</h3>
                <ul className="space-y-2">
                  {assessment.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold text-sm">예상 서비스 비용</h4>
                  <p className="text-lg font-bold text-blue-600">
                    {assessment.estimatedFee}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">배정 담당자</h4>
                  <p className="text-lg font-bold text-blue-600">
                    {assessment.assignedManager}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상담 예약 CTA */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-4">
              {targetingMessage.cta}
            </h3>
            <p className="text-gray-600 mb-6">{targetingMessage.urgency}</p>

            <CalComButton
              variant="default"
              size="lg"
              className={`px-8 py-4 ${
                assessment.segment === 'family-office'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : assessment.segment === 'fp-center'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-green-600 hover:bg-green-700'
              }`}
              buttonText={targetingMessage.cta}
            />

            <p className="text-sm text-gray-500 mt-4">
              * 제출하신 정보를 바탕으로 맞춤 상담을 제공합니다
            </p>
          </CardContent>
        </Card>

        {/* 시작하기 다시 버튼 */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              setAssessment(null);
              setFormData({
                companyName: '',
                ceoName: '',
                industry: '',
                employees: 0,
                annualRevenue: 0,
                netWorth: 0,
                netIncome: 0,
                assets: {
                  realEstate: 0,
                  financial: 0,
                  business: 0,
                  other: 0,
                },
                needsAssessment: {
                  familyOffice: false,
                  businessSuccession: false,
                  taxOptimization: false,
                  portfolioManagement: false,
                  estatePlanning: false,
                },
                preferredContactMethod: 'phone',
                urgency: 'within-month',
              });
            }}
          >
            다시 진단하기
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
