'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
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

import { submitRequestTicket } from './actions';
import { requestTicketSchema } from './schema';

export function RequestTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof requestTicketSchema>>({
    resolver: zodResolver(requestTicketSchema),
    defaultValues: {
      requestType: undefined as any,
      requestTypeOther: '',
      preferredDate: '',
      deadline: '',
      participantsAdults: 1,
      participantsChildren: 0,
      participantsNotes: '',
      budget: '',
      stylePreference: '',
      constraints: '',
      optionStyle: 'best_one',
      contactChannel: 'kakao',
      contactDetail: '',
      additionalNotes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof requestTicketSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitRequestTicket(values);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
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
      <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold mb-4 font-serif">요청이 접수되었습니다</h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          담당자가 내용을 확인 후 <span className="text-foreground font-semibold">지정하신 마감 시한 내</span>에 연락드리겠습니다.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            추가 요청하기
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            홈으로 이동
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* 1. 요청 유형 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">1. 무엇을 도와드릴까요?</h3>
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {[
                      { value: 'hotel_dining', label: '호텔/다이닝 예약' },
                      { value: 'travel', label: '여행 일정 기획 (국내/해외)' },
                      { value: 'art_tour', label: '전시/아트 투어 (도슨트/프리뷰)' },
                      { value: 'family_office_meeting', label: '패밀리오피스 미팅 (자산/승계)' },
                      { value: 'network_inquiry', label: '네트워크/라운드테이블 문의' },
                      { value: 'other', label: '기타 (직접 기재)' },
                    ].map((item) => (
                      <FormItem key={item.value} className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer w-full text-base">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* 2. 희망 일정/마감 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">2. 일정 및 마감 시한</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>희망 날짜/시간 <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="예: 5월 15일 저녁 7시 / 8월 중순" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>확정 마감 시한 (Deadline) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="예: 오늘 18시까지 / 이번 주 금요일까지" {...field} />
                  </FormControl>
                  <FormDescription>언제까지 확정드려야 하나요?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* 3. 참여자/동행 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">3. 참여 인원</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="participantsAdults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>성인</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participantsChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>어린이</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="participantsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>동행자 특이사항</FormLabel>
                <FormControl>
                  <Input placeholder="예: 조용한 공간 필요, 계단 이용 불가, 휠체어 등" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* 4. 예산/선호 & 5. 제약 조건 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">4. 예산 및 조건</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>예산 범위 <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="예: 1인당 20만원 / 총 500만원 상한" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactChannel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>회신 받을 곳 <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kakao">카카오톡</SelectItem>
                      <SelectItem value="email">이메일</SelectItem>
                      <SelectItem value="assistant">비서/담당자</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <FormField
              control={form.control}
              name="contactDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연락처/이메일 상세 <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="연락받을 번호 또는 이메일을 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="constraints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제약 조건 / 알레르기</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="절대 피해야 할 것 (예: 특정 재료 알레르기, 시끄러운 곳, 특정 브랜드 등)" 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* 6. 옵션 제시 방식 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">5. 어떻게 제안해 드릴까요?</h3>
           <FormField
            control={form.control}
            name="optionStyle"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="best_one" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        가장 좋은 1안만 빠르게 (믿고 맡김)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="comparison" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        2~3개 비교안 제시 (직접 선택)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="budget_approval" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        예산 상한 넘을 경우에만 승인 요청
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        
        <div className="flex flex-col gap-4 pt-4">
          <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                요청 제출 중...
              </>
            ) : (
              '요청 티켓 제출하기 (Request)'
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
             제출 시 지정된 마감 시한 내에 신속히 회신 드립니다.
          </p>
        </div>
      </form>
    </Form>
  );
}
