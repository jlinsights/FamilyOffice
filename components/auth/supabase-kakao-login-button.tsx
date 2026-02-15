'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSupabaseKakaoAuth } from '@/hooks/use-supabase-kakao-auth';
import { useToast } from '@/hooks/use-toast';

interface SupabaseKakaoLoginButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  variant?: 'default' | 'outline' | 'secondary' | 'kakao';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
  useOfficialImage?: boolean;
  children?: React.ReactNode;
}

export function SupabaseKakaoLoginButton({
  onSuccess,
  onError,
  variant = 'kakao',
  size = 'default',
  fullWidth = false,
  showIcon = true,
  useOfficialImage = true,
  children,
}: SupabaseKakaoLoginButtonProps) {
  const { signInWithKakao, isLoading } = useSupabaseKakaoAuth();
  const { toast } = useToast();

  const handleKakaoLogin = async () => {
    try {
      const result = await signInWithKakao();

      if (result.success) {
        toast({
          title: '카카오 로그인',
          description: '카카오 인증 페이지로 이동합니다.',
        });
        onSuccess?.();
      } else {
        toast({
          title: '로그인 오류',
          description: result.error || '카카오 로그인에 실패했습니다.',
          variant: 'destructive',
        });
        onError?.(result.error || '알 수 없는 오류');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.';
      toast({
        title: '로그인 오류',
        description: errorMessage,
        variant: 'destructive',
      });
      onError?.(errorMessage);
    }
  };

  // 공식 카카오 로그인 이미지 사용 시
  if (useOfficialImage && variant === 'kakao') {
    return (
      <button
        onClick={handleKakaoLogin}
        disabled={isLoading}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02] cursor-pointer'}
          transition-all duration-200 outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-opacity-50 rounded-md
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center px-4 py-2 bg-[#FEE500] rounded-md">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#3C1E1E]" />
            <span className="text-[#3C1E1E] font-medium">로그인 중...</span>
          </div>
        ) : (
          <Image
            src={
              size === 'lg'
                ? '/images/KAKAO/kakao_login/ko/kakao_login_large_wide.png'
                : size === 'sm'
                  ? '/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png'
                  : '/images/KAKAO/kakao_login/ko/kakao_login_medium_wide.png'
            }
            alt="카카오로 로그인"
            width={size === 'lg' ? 300 : size === 'sm' ? 222 : 300}
            height={size === 'lg' ? 60 : size === 'sm' ? 49 : 60}
            className="h-auto max-w-full"
            priority
          />
        )}
      </button>
    );
  }

  // 기존 버튼 스타일 (fallback)
  return (
    <Button
      variant={variant === 'kakao' ? 'default' : variant}
      size={size}
      onClick={handleKakaoLogin}
      disabled={isLoading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'kakao' || variant === 'default' ? 'bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] border-0' : ''}
        font-medium transition-all duration-200
        ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02]'}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          로그인 중...
        </>
      ) : (
        <>
          {showIcon && !useOfficialImage && (
            <Image
              src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
              alt="카카오"
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          {children || '카카오로 로그인'}
        </>
      )}
    </Button>
  );
}

export default SupabaseKakaoLoginButton;
