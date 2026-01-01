'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowRight,
    Building,
    CheckCircle,
    Loader2,
    Phone,
} from 'lucide-react';
import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';


import { Badge } from '@/components/ui/badge';
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

import { useToast } from '@/hooks/use-toast';

const onboardingSchema = z.object({
  companyName: z
    .string()
    .min(2, '소속(회사명)은 최소 2자 이상이어야 합니다.')
    .max(100, '소속(회사명)은 최대 100자까지 입력 가능합니다.'),
  phone: z
    .string()
    .min(1, '연락처를 입력해주세요.')
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      '올바른 휴대폰 번호 형식을 입력해주세요. (예: 010-1234-5678)'
    ),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoaded } = useSafeUser();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: '',
      phone: '',
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Clerk 사용자 메타데이터 업데이트
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          companyName: data.companyName,
          phone: data.phone,
          onboardingCompleted: true,
          onboardingCompletedAt: new Date().toISOString(),
        },
      });

      toast({
        title: '프로필 완성!',
        description: `환영합니다, ${user.firstName || '회원'}님! 이제 모든 서비스를 이용하실 수 있습니다.`,
      });

      // 대시보드로 리다이렉트
      router.push('/dashboard');
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      toast({
        title: '오류 발생',
        description: '프로필 저장에 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/auth/sign-in');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Badge
            variant="outline"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            가입 완료
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            프로필을 완성해주세요
          </h1>
          <p className="text-muted-foreground">
            {user.firstName || '회원'}님, 환영합니다!
            <br />더 나은 서비스를 위해 추가 정보를 입력해주세요.
          </p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 소속(회사명) */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>소속(회사명) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="(주)홍길동컴퍼니"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      현재 소속된 기업/기관명을 입력해주세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 연락처 */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처(모바일) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="010-1234-5678"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      상담 및 서비스 안내에 사용됩니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    프로필 완성하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* 나중에 하기 */}
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => router.push('/dashboard')}
              disabled={isLoading}
            >
              나중에 입력하기
            </Button>
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          입력하신 정보는 서비스 제공 목적으로만 사용되며,
          <br />
          <a href="/privacy" className="text-primary hover:underline">
            개인정보처리방침
          </a>
          에 따라 안전하게 관리됩니다.
        </p>
      </div>
    </div>
  );
}
