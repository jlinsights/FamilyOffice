'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(50, '비밀번호는 최대 50자까지 입력 가능합니다.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '대소문자, 숫자를 포함해야 합니다.'),
  confirmPassword: z
    .string()
    .min(1, '비밀번호 확인을 입력해주세요.'),
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자까지 입력 가능합니다.'),
  companyName: z
    .string()
    .min(2, '회사명은 최소 2자 이상이어야 합니다.')
    .max(100, '회사명은 최대 100자까지 입력 가능합니다.')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^01[0-9]-[0-9]{4}-[0-9]{4}$/, '올바른 휴대폰 번호 형식을 입력해주세요. (예: 010-1234-5678)')
    .optional()
    .or(z.literal('')),
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, '이용약관에 동의해주세요.'),
  agreeToPrivacy: z
    .boolean()
    .refine(val => val === true, '개인정보처리방침에 동의해주세요.'),
  agreeToMarketing: z
    .boolean()
    .optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function SignUpForm({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      companyName: '',
      phone: '',
      agreeToTerms: false,
      agreeToPrivacy: false,
      agreeToMarketing: false
    }
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    try {
      // 1. Supabase Auth에 사용자 생성
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            company_name: data.companyName || null,
            phone: data.phone || null,
          }
        }
      });

      if (authError) {
        // 에러 메시지 한국어 처리
        let errorMessage = '회원가입에 실패했습니다.';
        
        if (authError.message.includes('User already registered')) {
          errorMessage = '이미 가입된 이메일입니다. 로그인을 시도해보세요.';
        } else if (authError.message.includes('Password should be at least')) {
          errorMessage = '비밀번호는 최소 8자 이상이어야 합니다.';
        } else if (authError.message.includes('Invalid email')) {
          errorMessage = '올바른 이메일 형식을 입력해주세요.';
        } else if (authError.message.includes('Signup is disabled')) {
          errorMessage = '현재 회원가입이 비활성화되어 있습니다. 관리자에게 문의하세요.';
        }

        toast({
          title: '회원가입 실패',
          description: errorMessage,
          variant: 'destructive',
        });
        return;
      }

      if (authData.user) {
        // 2. users 테이블에 추가 정보 저장
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            name: data.name,
            company_name: data.companyName || null,
            phone: data.phone || null,
            provider: 'email',
            marketing_consent: data.agreeToMarketing || false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('사용자 정보 저장 실패:', insertError);
          // 인증은 성공했지만 추가 정보 저장 실패 시에도 성공으로 처리
        }

        // 3. 이메일 확인이 필요한 경우
        if (!authData.session) {
          toast({
            title: '회원가입 완료!',
            description: '이메일 인증 링크를 전송했습니다. 이메일을 확인하고 인증을 완료해주세요.',
          });
          
          // 이메일 인증 안내 페이지로 리다이렉트
          router.push('/auth/verify-email?email=' + encodeURIComponent(data.email));
          return;
        }

        // 4. 즉시 로그인 된 경우
        toast({
          title: '회원가입 완료!',
          description: `환영합니다, ${data.name}님! FamilyOffice S에서 프리미엄 서비스를 경험하세요.`,
        });

        onSuccess?.();
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      toast({
        title: '회원가입 오류',
        description: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* 이메일 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 *</FormLabel>
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

        {/* 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름 *</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="홍길동"
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

        {/* 회사명 */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>회사명</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 휴대폰 번호 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>휴대폰 번호</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="010-1234-5678"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8자 이상, 대소문자+숫자 포함"
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

        {/* 비밀번호 확인 */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인 *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
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

        {/* 약관 동의 */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    <a href="/terms" target="_blank" className="text-primary hover:underline">
                      이용약관
                    </a>에 동의합니다. (필수) *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToPrivacy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    <a href="/privacy" target="_blank" className="text-primary hover:underline">
                      개인정보처리방침
                    </a>에 동의합니다. (필수) *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToMarketing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    마케팅 정보 수신에 동의합니다. (선택)
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    프리미엄 콘텐츠, 세미나 정보 등을 이메일로 받아보실 수 있습니다.
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              회원가입 중...
            </>
          ) : (
            '회원가입 완료'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Button
              type="button"
              variant="link"
              size="sm"
              className="px-0 font-medium text-primary hover:underline"
              onClick={() => router.push('/auth/sign-in')}
              disabled={isLoading}
            >
              로그인하기
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;