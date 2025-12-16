'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

// Form validation schema
const structureCheckSchema = z.object({
  // 연락처 정보
  name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  phone: z.string().min(10, '유효한 전화번호를 입력해주세요'),
  company: z.string().optional(),

  // 필수 질문
  q1_decision_made: z.enum(['yes', 'no'], {
    required_error: '답변을 선택해주세요',
  }),
  q1_decision_detail: z.string().optional(),

  q2_documented: z.enum(['yes', 'no'], {
    required_error: '답변을 선택해주세요',
  }),

  q3_authority_clear: z.enum(['clear', 'partial', 'unclear'], {
    required_error: '답변을 선택해주세요',
  }),

  q4_cash_plan: z.enum(['structure_exists', 'rough_idea', 'not_considered'], {
    required_error: '답변을 선택해주세요',
  }),

  q5_deadline: z.enum(['within_6m', '1_2y', 'when_needed'], {
    required_error: '답변을 선택해주세요',
  }),

  // 선택 질문
  q6_concerns: z.array(z.string()).optional(),
  q7_advisors: z.array(z.string()).optional(),

  // 추가 메모
  additional_notes: z.string().optional(),
});

type StructureCheckFormData = z.infer<typeof structureCheckSchema>;

export function StructureCheckRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StructureCheckFormData>({
    resolver: zodResolver(structureCheckSchema),
  });

  const concernsValue = watch('q6_concerns') || [];
  const advisorsValue = watch('q7_advisors') || [];

  const onSubmit = async (data: StructureCheckFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/structure-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('요청 전송에 실패했습니다');
      }

      setIsSuccess(true);
      toast.success('구조 점검 요청이 접수되었습니다', {
        description: '검토 후 개별적으로 연락드릴 예정입니다.',
      });

      // 성공 후 폼 리셋은 하지 않음 (사용자가 입력한 내용 확인 가능)
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('요청 전송에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-green-900">
            요청 내용을 확인했습니다
          </h3>
          <div className="max-w-2xl mx-auto space-y-4 text-left text-green-800">
            <p>
              구조 점검은 문제를 해결하기 위한 자리가 아니라,
              지금 무엇을 결정해야 하는지, 아직 미뤄도 되는 문제는 무엇인지를 정리하는 과정입니다.
            </p>
            <p>
              제출해 주신 내용을 바탕으로, 구조 점검이 필요한 경우에 한해 개별적으로 연락드릴 예정입니다.
            </p>
            <p>
              모든 요청이 진행되는 것은 아니며, 추가 정보가 필요한 경우 별도로 안내드릴 수 있습니다.
            </p>
            <p className="pt-4 font-semibold">
              결정을 서두르실 필요는 없습니다.
              다만, 판단의 기준이 정리되면 이후의 선택은 훨씬 단순해집니다.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 안내 문구 */}
      <div className="bg-muted/30 dark:bg-muted/10 border border-border p-6 rounded-lg">
        <p className="text-sm text-foreground leading-relaxed">
          아래 질문은 상담을 위한 것이 아닙니다.
          현재 상황에서 무엇이 정리되어 있고, 무엇이 아직 결정되지 않았는지를 확인하기 위한 최소한의 질문입니다.
        </p>
      </div>

      {/* 연락처 정보 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">연락처 정보</h3>

        <div className="space-y-2">
          <Label htmlFor="name">이름 *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="홍길동"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일 *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="example@company.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">연락처 *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="010-1234-5678"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">회사명 (선택)</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder="(주)패밀리오피스"
          />
        </div>
      </div>

      {/* 필수 질문 */}
      <div className="space-y-6 border-t pt-8">
        <h3 className="text-xl font-bold">사전 질문 (필수)</h3>

        {/* Q1 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            1. 상속·가업승계와 관련해 이미 결정된 사항이 있습니까? *
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('q1_decision_made', value as 'yes' | 'no')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="q1-yes" />
              <Label htmlFor="q1-yes" className="font-normal cursor-pointer">
                예 (간단히 적어주세요)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="q1-no" />
              <Label htmlFor="q1-no" className="font-normal cursor-pointer">
                아니오 / 아직 정리되지 않음
              </Label>
            </div>
          </RadioGroup>
          {watch('q1_decision_made') === 'yes' && (
            <Textarea
              {...register('q1_decision_detail')}
              placeholder="결정된 사항을 간단히 적어주세요"
              className="mt-2"
            />
          )}
          {errors.q1_decision_made && (
            <p className="text-sm text-red-500">{errors.q1_decision_made.message}</p>
          )}
        </div>

        {/* Q2 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            2. 위 결정은 문서(정관, 계약, 메모 등)로 남아 있습니까? *
          </Label>
          <RadioGroup
            onValueChange={(value) => setValue('q2_documented', value as 'yes' | 'no')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="q2-yes" />
              <Label htmlFor="q2-yes" className="font-normal cursor-pointer">
                예
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="q2-no" />
              <Label htmlFor="q2-no" className="font-normal cursor-pointer">
                아니오
              </Label>
            </div>
          </RadioGroup>
          {errors.q2_documented && (
            <p className="text-sm text-red-500">{errors.q2_documented.message}</p>
          )}
        </div>

        {/* Q3 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            3. 대표자 유고 시, 회사의 의사결정 권한은 명확히 정리돼 있습니까? *
          </Label>
          <RadioGroup
            onValueChange={(value) =>
              setValue('q3_authority_clear', value as 'clear' | 'partial' | 'unclear')
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clear" id="q3-clear" />
              <Label htmlFor="q3-clear" className="font-normal cursor-pointer">
                명확하다
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partial" id="q3-partial" />
              <Label htmlFor="q3-partial" className="font-normal cursor-pointer">
                일부만 정리됨
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unclear" id="q3-unclear" />
              <Label htmlFor="q3-unclear" className="font-normal cursor-pointer">
                잘 모르겠다
              </Label>
            </div>
          </RadioGroup>
          {errors.q3_authority_clear && (
            <p className="text-sm text-red-500">{errors.q3_authority_clear.message}</p>
          )}
        </div>

        {/* Q4 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            4. 상속이나 유사시 필요한 현금을 어떻게 마련할 계획입니까? *
          </Label>
          <RadioGroup
            onValueChange={(value) =>
              setValue(
                'q4_cash_plan',
                value as 'structure_exists' | 'rough_idea' | 'not_considered'
              )
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="structure_exists" id="q4-exists" />
              <Label htmlFor="q4-exists" className="font-normal cursor-pointer">
                이미 구조가 있다
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rough_idea" id="q4-idea" />
              <Label htmlFor="q4-idea" className="font-normal cursor-pointer">
                대략적인 생각만 있다
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not_considered" id="q4-not" />
              <Label htmlFor="q4-not" className="font-normal cursor-pointer">
                아직 고려하지 않았다
              </Label>
            </div>
          </RadioGroup>
          {errors.q4_cash_plan && (
            <p className="text-sm text-red-500">{errors.q4_cash_plan.message}</p>
          )}
        </div>

        {/* Q5 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            5. 이 문제를 언제까지 미뤄도 괜찮다고 생각하십니까? *
          </Label>
          <RadioGroup
            onValueChange={(value) =>
              setValue('q5_deadline', value as 'within_6m' | '1_2y' | 'when_needed')
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="within_6m" id="q5-6m" />
              <Label htmlFor="q5-6m" className="font-normal cursor-pointer">
                6개월 이내
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1_2y" id="q5-1-2y" />
              <Label htmlFor="q5-1-2y" className="font-normal cursor-pointer">
                1~2년
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="when_needed" id="q5-when" />
              <Label htmlFor="q5-when" className="font-normal cursor-pointer">
                상황이 생기면
              </Label>
            </div>
          </RadioGroup>
          {errors.q5_deadline && (
            <p className="text-sm text-red-500">{errors.q5_deadline.message}</p>
          )}
        </div>
      </div>

      {/* 선택 질문 */}
      <div className="space-y-6 border-t pt-8">
        <h3 className="text-xl font-bold">선택 질문 (선택)</h3>

        {/* Q6 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            6. 가장 불안한 영역은 무엇입니까? (복수 선택 가능)
          </Label>
          <div className="space-y-2">
            {concernOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`concern-${option.value}`}
                  checked={concernsValue.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue('q6_concerns', [...concernsValue, option.value]);
                    } else {
                      setValue(
                        'q6_concerns',
                        concernsValue.filter((v) => v !== option.value)
                      );
                    }
                  }}
                />
                <Label
                  htmlFor={`concern-${option.value}`}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Q7 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            7. 현재 도움을 받고 있는 전문가가 있습니까?
          </Label>
          <div className="space-y-2">
            {advisorOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`advisor-${option.value}`}
                  checked={advisorsValue.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue('q7_advisors', [...advisorsValue, option.value]);
                    } else {
                      setValue(
                        'q7_advisors',
                        advisorsValue.filter((v) => v !== option.value)
                      );
                    }
                  }}
                />
                <Label
                  htmlFor={`advisor-${option.value}`}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 메모 */}
        <div className="space-y-2">
          <Label htmlFor="additional_notes">추가로 전달하고 싶은 내용 (선택)</Label>
          <Textarea
            id="additional_notes"
            {...register('additional_notes')}
            placeholder="기타 특이사항이나 전달하고 싶은 내용이 있다면 자유롭게 작성해주세요"
            rows={4}
          />
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="bg-muted/30 dark:bg-muted/10 border border-border p-6 rounded-lg space-y-2 text-sm text-foreground">
        <p>• 본 질문은 판매나 제안을 위한 자료가 아닙니다.</p>
        <p>• 구조 점검은 선별적으로 진행됩니다.</p>
        <p>• 제출하신 내용은 외부에 공유되지 않습니다.</p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            요청 전송 중...
          </>
        ) : (
          '구조 점검 요청하기'
        )}
      </Button>
    </form>
  );
}

const concernOptions = [
  { value: 'inheritance_tax', label: '상속세 부담' },
  { value: 'equity_management', label: '지분·경영권' },
  { value: 'family_conflict', label: '가족 간 갈등 가능성' },
  { value: 'cash_flow', label: '현금 흐름' },
  { value: 'other', label: '기타' },
];

const advisorOptions = [
  { value: 'tax_accountant', label: '세무사' },
  { value: 'accountant', label: '회계사' },
  { value: 'lawyer', label: '법무사/변호사' },
  { value: 'none', label: '없음' },
];
