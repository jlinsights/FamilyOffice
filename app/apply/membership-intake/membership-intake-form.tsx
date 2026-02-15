'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { submitMembershipIntake } from './actions';

const formSchema = z.object({
  // A. 기본 정보 (필수)
  name: z.string().min(2, { message: '성함을 입력해주세요.' }),
  affiliation: z
    .string()
    .min(1, { message: '소속(개인/법인)을 입력해주세요.' }),
  title: z.string().optional(),
  phone: z.string().min(10, { message: '유효한 연락처를 입력해주세요.' }),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  city: z.string().min(1, { message: '거주 지역(도시)을 입력해주세요.' }),

  // B. 관심 범위 (복수 선택)
  interests: z.array(z.string()).refine(value => value.length > 0, {
    message: '최소 1개 이상의 관심사를 선택해주세요.',
  }),
  interestsOther: z.string().optional(),

  // C. 요청 빈도
  frequency: z.enum(['monthly_1', 'monthly_2_3', 'weekly_1', 'project'], {
    required_error: '요청 빈도를 선택해주세요.',
  }),

  // D. 예산/결제
  budget: z.enum(['300', '600', '1200', '2400', 'negotiable'], {
    required_error: '예산대를 선택해주세요.',
  }),
  paymentMethod: z.enum(
    ['personal_card', 'corporate_card', 'tax_invoice', 'invoice_foreign'],
    {
      required_error: '결제 형태를 선택해주세요.',
    }
  ),

  // E. 상담 희망 시간
  preferredTime: z.enum(['weekday_am', 'weekday_pm', 'evening', 'weekend'], {
    required_error: '상담 희망 시간을 선택해주세요.',
  }),

  // F. 주관식
  keyProblem: z
    .string()
    .min(1, { message: '해결하고 싶은 1가지를 입력해주세요.' }),
  taboos: z.string().optional(),

  // 약관 동의
  marketingConsent: z.boolean().default(false),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine(val => val === true, {
      message: '개인정보처리방침에 동의해주세요.',
    }),
});

export function MembershipIntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      affiliation: '',
      title: '',
      phone: '',
      email: '',
      city: '',
      interests: [],
      interestsOther: '',
      keyProblem: '',
      taboos: '',
      marketingConsent: false,
      privacyConsent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Call Server Action
      const result = await submitMembershipIntake(values);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error(result.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center animate-fade-in bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-500/5 dark:to-slate-900 rounded-2xl border border-amber-200/50 dark:border-amber-500/20">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20">
          <Check className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-foreground">
          진단이 접수되었습니다
        </h3>
        <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
          제출해주신 내용을 바탕으로{' '}
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            Foundation부터 Legacy까지
          </span>{' '}
          귀하에게 최적화된 멤버십 등급을 분석하고 있습니다.
        </p>
        <p className="text-sm text-muted-foreground mb-8 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
          <span className="text-foreground font-medium">
            영업일 기준 24시간 이내
          </span>{' '}
          1차 안내 예정
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="rounded-full px-6"
            onClick={() => (window.location.href = '/')}
          >
            홈으로 돌아가기
          </Button>
          <Button
            className="rounded-full px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900"
            onClick={() => (window.location.href = '/membership')}
          >
            멤버십 혜택 둘러보기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* A. 기본 정보 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
              1
            </span>
            기본 정보
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    성함 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    소속 (개인/법인) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="삼성전자 / 개인사업자" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>직함</FormLabel>
                  <FormControl>
                    <Input placeholder="대표이사 / 임원" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    거주 지역 (도시) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="서울시 강남구" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    연락처 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="010-1234-5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    이메일 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* B. 관심 서비스 (4대 핵심 모듈) */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
              2
            </span>
            관심 서비스 (복수 선택){' '}
            <span className="text-red-500 text-sm">*</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            4가지 핵심 모듈 중 관심 있는 서비스를 선택해주세요.
          </p>
          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'travel',
                      label: 'Travel Design & Curation',
                      desc: '글로벌 럭셔리 트래블 · 특급 호텔 VIP 예약',
                    },
                    {
                      id: 'art',
                      label: 'Art Collection & Cultural Access',
                      desc: '프라이빗 전시 · 아트페어 동행 · 컬렉션 자문',
                    },
                    {
                      id: 'core',
                      label: 'Family Office Core Services',
                      desc: '자산 진단 · 가업승계 · 포트폴리오 리밸런싱',
                    },
                    {
                      id: 'network',
                      label: 'Premier Concierge Network',
                      desc: '24/7 컨시어지 · 전문가 연결 · VIP 네트워킹',
                    },
                    { id: 'other', label: '기타', desc: '직접 입력' },
                  ].map(item => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 hover:bg-amber-50/50 dark:hover:bg-amber-500/5 hover:border-amber-500/30 transition-all duration-200"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={checked => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          value => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="flex flex-col gap-1">
                              <FormLabel className="font-semibold cursor-pointer text-foreground">
                                {item.label}
                              </FormLabel>
                              <span className="text-xs text-muted-foreground">
                                {item.desc}
                              </span>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('interests')?.includes('other') && (
            <FormField
              control={form.control}
              name="interestsOther"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="기타 관심 서비스를 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </section>

        {/* C. 요청 빈도 & D. 예산 */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
              3
            </span>
            운영 규모 및 예산
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    예상 요청 빈도 (운영 난이도){' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="monthly_1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          월 1회 이하
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="monthly_2_3" />
                        </FormControl>
                        <FormLabel className="font-normal">월 2~3회</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="weekly_1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          주 1회 이상
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="project" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          프로젝트형 (연 2~4회 집중)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    관심 멤버십 등급 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription className="text-xs">
                    상담 후 최적 등급을 제안드립니다.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="300" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Foundation (입문) - 자산 진단 · 분기 리뷰
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="600" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          Signature (권장) - 전담 어드바이저 · VIP 예약
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            추천
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1200" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Elite (프리미엄) - 24/7 핫라인 · 트래블 디자인
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="2400" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Legacy (패밀리오피스) - 다세대 자산관리
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="negotiable" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          아직 모르겠어요 (상담 후 결정)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    결제 형태 <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal_card">개인 카드</SelectItem>
                      <SelectItem value="corporate_card">법인 카드</SelectItem>
                      <SelectItem value="tax_invoice">
                        세금계산서 (법인)
                      </SelectItem>
                      <SelectItem value="invoice_foreign">
                        인보이스 (해외 결제 포함)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    상담 희망 시간 <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekday_am">
                        평일 오전 (09:00 - 12:00)
                      </SelectItem>
                      <SelectItem value="weekday_pm">
                        평일 오후 (13:00 - 18:00)
                      </SelectItem>
                      <SelectItem value="evening">
                        평일 저녁 (18:00 이후)
                      </SelectItem>
                      <SelectItem value="weekend">
                        주말 (협의 가능 시)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* F. 주관식 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
              4
            </span>
            세부 요청
          </h3>
          <FormField
            control={form.control}
            name="keyProblem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  지금 가장 해결하고 싶은 1가지{' '}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="예: 이번 여름 이탈리아 가족 여행 동선 기획이 시급합니다. / 법인 자금의 효율적 운용 방안이 필요합니다."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taboos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>절대 원하지 않는 것 (금기사항)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="예: 얼굴이 노출되는 사진 촬영 절대 불가 / 5인 이상 단체 활동 사절 / 특정 브랜드 비선호 등"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* 약관 동의 */}
        <section className="space-y-4 pt-4 border-t">
          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </FormLabel>
                  <FormDescription>
                    제출해주신 정보는 멤버십 상담 및 설계를 위해서만 활용되며,
                    법령에 따르지 않는 한 제3자에게 제공되지 않습니다.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </section>

        <div className="flex flex-col gap-4 pt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg h-14 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                진단 제출 중...
              </>
            ) : (
              '멤버십 등급 진단 제출하기'
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            제출 후{' '}
            <span className="font-medium text-foreground">
              영업일 기준 24시간 내
            </span>{' '}
            Foundation~Legacy 최적 등급을 안내드립니다.
          </p>
        </div>
      </form>
    </Form>
  );
}
