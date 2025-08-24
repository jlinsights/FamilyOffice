'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getKakaoAuthService, type KakaoAuthResult } from '@/lib/auth/kakao-auth';
import { Loader2, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface KakaoLoginButtonProps {
  onSuccess?: (result: KakaoAuthResult) => void;
  onError?: (error: string) => void;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function KakaoLoginButton({
  onSuccess,
  onError,
  variant = 'default',
  size = 'default',
  fullWidth = false,
  showIcon = true,
  children
}: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const kakaoAuth = getKakaoAuthService();

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    
    try {
      // 카카오싱크 방식으로 리다이렉트
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth`;
      const clientId = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
      
      if (!clientId) {
        throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.');
      }

      // 카카오 OAuth URL 생성
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `state=${Math.random().toString(36).substring(7)}`;

      // 카카오 인증 페이지로 리다이렉트
      window.location.href = kakaoAuthUrl;
      
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      toast({
        title: '로그인 오류',
        description: errorMessage,
        variant: 'destructive',
      });
      onError?.(errorMessage);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleKakaoLogin}
      disabled={isLoading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'default' ? 'bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] border-0' : ''}
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
          {showIcon && (
            <MessageCircle className="mr-2 h-4 w-4" />
          )}
          {children || '카카오로 로그인'}
        </>
      )}
    </Button>
  );
}

export default KakaoLoginButton;