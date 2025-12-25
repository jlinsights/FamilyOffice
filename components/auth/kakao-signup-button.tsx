'use client';

import { Loader2 } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { type KakaoAuthResult } from '@/lib/auth/kakao-auth';

import { useToast } from '@/hooks/use-toast';

interface KakaoSignUpButtonProps {
  onSuccess?: (result: KakaoAuthResult) => void;
  onError?: (error: string) => void;
  variant?: 'default' | 'outline' | 'secondary' | 'kakao';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
  useOfficialImage?: boolean;
  children?: React.ReactNode;
}

export function KakaoSignUpButton({
  onSuccess,
  onError,
  variant = 'kakao',
  size = 'default',
  fullWidth = false,
  showIcon = true,
  useOfficialImage = true,
  children,
}: KakaoSignUpButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKakaoSignUp = async () => {
    setIsLoading(true);

    try {
      // 카카오싱크 방식으로 리다이렉트
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth`;
      const clientId = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

      if (!clientId) {
        throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.');
      }

      // 카카오 OAuth URL 생성
      const kakaoAuthUrl =
        `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `state=${Math.random().toString(36).substring(7)}`;

      // 카카오 인증 페이지로 리다이렉트
      window.location.href = kakaoAuthUrl;

      // onSuccess 콜백 호출 (리다이렉트 전)
      if (onSuccess) {
        onSuccess({
          success: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.';
      toast({
        title: '회원가입 오류',
        description: errorMessage,
        variant: 'destructive',
      });
      onError?.(errorMessage);
    }
  };

  // 공식 카카오 로그인 이미지 사용 시 (회원가입용 텍스트로 오버레이)
  if (useOfficialImage && variant === 'kakao') {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} flex justify-center`}>
        <button
          onClick={handleKakaoSignUp}
          disabled={isLoading}
          className={`
            relative
            ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02] cursor-pointer'}
            transition-all duration-200 outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-opacity-50 rounded-md
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center px-4 py-2 bg-[#FEE500] rounded-md">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#3C1E1E]" />
              <span className="text-[#3C1E1E] font-medium">회원가입 중...</span>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={
                  size === 'lg'
                    ? '/images/KAKAO/kakao_login/ko/kakao_login_large_wide.png'
                    : size === 'sm'
                      ? '/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png'
                      : '/images/KAKAO/kakao_login/ko/kakao_login_medium_wide.png'
                }
                alt="카카오로 간편 회원가입"
                width={size === 'lg' ? 300 : size === 'sm' ? 222 : 300}
                height={size === 'lg' ? 60 : size === 'sm' ? 49 : 60}
                className="h-auto max-w-full"
                priority
              />
              {/* 회원가입 텍스트 오버레이 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#3C1E1E] font-bold text-sm">
                  카카오로 간편 회원가입
                </span>
              </div>
            </div>
          )}
        </button>
      </div>
    );
  }

  // 기존 버튼 스타일 (fallback)
  return (
    <Button
      variant={variant === 'kakao' ? 'default' : variant}
      size={size}
      onClick={handleKakaoSignUp}
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
          회원가입 중...
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
          {children || '카카오로 간편 회원가입'}
        </>
      )}
    </Button>
  );
}

export default KakaoSignUpButton;
