'use client';

import { useState } from 'react';
import { MessageCircle, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getKakaoAuthService, type KakaoAuthResult } from '@/lib/auth/kakao-auth';

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
      const result = await kakaoAuth.signInWithKakao();
      
      if (result.success) {
        toast({
          title: result.isNewUser ? '회원가입 완료!' : '로그인 성공!',
          description: result.isNewUser 
            ? `환영합니다! ${result.kakaoUser?.kakao_account.profile?.nickname || '회원'}님`
            : `다시 오신 것을 환영합니다, ${result.kakaoUser?.kakao_account.profile?.nickname || '회원'}님!`,
        });
        onSuccess?.(result);
      } else {
        const errorMessage = result.error || '로그인에 실패했습니다.';
        toast({
          title: '로그인 실패',
          description: errorMessage,
          variant: 'destructive',
        });
        onError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      toast({
        title: '로그인 오류',
        description: errorMessage,
        variant: 'destructive',
      });
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
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