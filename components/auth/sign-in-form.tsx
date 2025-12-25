'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createClient } from '@/lib/supabase/client';
import { safeInsert, safeUpdate } from '@/lib/supabase/helpers';

import { useToast } from '@/hooks/use-toast';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(50, '비밀번호는 최대 50자까지 입력 가능합니다.'),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function SignInForm({
  onSuccess,
  redirectTo = '/dashboard',
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        // 에러 메시지 한국어 처리
        let errorMessage = '로그인에 실패했습니다.';

        if (error.message.includes('Invalid login credentials')) {
          errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage =
            '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
        }

        toast({
          title: '로그인 실패',
          description: errorMessage,
          variant: 'destructive',
        });
        return;
      }

      if (authData.user) {
        // users 테이블에 사용자 정보가 있는지 확인하고 없으면 생성
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', authData.user.id)
          .single();

        if (!existingUser) {
          // users 테이블에 기본 정보 생성
          await safeInsert(supabase, 'users', {
            id: authData.user.id,
            email: authData.user.email || null,
            name:
              authData.user.user_metadata?.name ||
              authData.user.email?.split('@')[0] ||
              '사용자',
            provider: 'email',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          // 기존 사용자 로그인 시간 업데이트
          await safeUpdate(supabase, 'users', {
            last_sign_in_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }).eq('id', authData.user.id);
        }

        toast({
          title: '로그인 성공!',
          description: `환영합니다, ${authData.user.email?.split('@')[0] || '회원'}님!`,
        });

        onSuccess?.();
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      toast({
        title: '로그인 오류',
        description: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues('email');

    if (!email) {
      toast({
        title: '이메일 입력 필요',
        description: '비밀번호 재설정을 위해 이메일을 먼저 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast({
          title: '오류',
          description: '비밀번호 재설정 이메일 전송에 실패했습니다.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '이메일 전송 완료',
        description: '비밀번호 재설정 링크를 이메일로 전송했습니다.',
      });
    } catch (error) {
      console.error('비밀번호 재설정 오류:', error);
      toast({
        title: '오류',
        description: '비밀번호 재설정 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...form.register('rememberMe')}
              disabled={isLoading}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              로그인 상태 유지
            </Label>
          </div>

          <Button
            type="button"
            variant="link"
            size="sm"
            className="px-0 font-normal text-primary hover:underline"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            비밀번호를 잊으셨나요?
          </Button>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              로그인 중...
            </>
          ) : (
            '로그인'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            처음 방문하시나요?{' '}
            <Button
              type="button"
              variant="link"
              size="sm"
              className="px-0 font-medium text-primary hover:underline"
              onClick={() => router.push('/auth/sign-up')}
              disabled={isLoading}
            >
              회원가입하기
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
