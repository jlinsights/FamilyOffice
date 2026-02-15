'use client';

/**
 * 카카오톡 공유 버튼 컴포넌트
 * 카카오톡 메시지 API를 사용한 콘텐츠 공유 기능
 */
import { MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface KakaoShareButtonProps {
  title: string;
  description?: string;
  imageUrl?: string;
  webUrl?: string;
  mobileWebUrl?: string;
  variant?: 'default' | 'outline' | 'kakao';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  useOfficialImage?: boolean;
  children?: React.ReactNode;
}

export function KakaoShareButton({
  title,
  description,
  imageUrl,
  webUrl,
  mobileWebUrl,
  variant = 'kakao',
  size = 'default',
  fullWidth = false,
  useOfficialImage = true,
  children,
}: KakaoShareButtonProps) {
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // 카카오 SDK 로드 및 초기화
    const loadKakaoSDK = () => {
      if (window.Kakao) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
        if (kakaoKey && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }
        setIsKakaoReady(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.async = true;
      script.onload = () => {
        if (window.Kakao && process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
          setIsKakaoReady(true);
        }
      };
      document.head.appendChild(script);
    };

    loadKakaoSDK();
  }, []);

  const handleKakaoShare = () => {
    if (!isKakaoReady || !window.Kakao) {
      toast({
        title: '공유 오류',
        description: '카카오톡 SDK가 로드되지 않았습니다.',
        variant: 'destructive',
      });
      return;
    }

    try {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description || '프리미엄 패밀리오피스 서비스',
          imageUrl:
            imageUrl ||
            'https://imagedelivery.net/iELritu8tmGaSR8tZ-NWcg/0eadf9f9-146c-4dd7-1d1b-ac4d29126d00/Contain',
          link: {
            mobileWebUrl: mobileWebUrl || webUrl || window.location.href,
            webUrl: webUrl || window.location.href,
          },
        },
        social: {
          likeCount: 0,
          commentCount: 0,
          sharedCount: 0,
        },
        buttons: [
          {
            title: '웹사이트 보기',
            link: {
              mobileWebUrl: mobileWebUrl || webUrl || window.location.href,
              webUrl: webUrl || window.location.href,
            },
          },
        ],
        callback: function (result: any) {
          if (result.warningMsg) {
            toast({
              title: '공유 알림',
              description: result.warningMsg,
            });
          } else if (result.clickEvent) {
            toast({
              title: '카카오톡 공유',
              description: '카카오톡으로 공유되었습니다.',
            });
          }
        },
        serverCallbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/kakao/share/callback`,
      });
    } catch (error) {
      console.error('카카오 공유 오류:', error);
      toast({
        title: '공유 오류',
        description: '카카오톡 공유 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  // 공식 카카오톡 공유 이미지 사용 (향후 추가 시)
  if (useOfficialImage && variant === 'kakao') {
    return (
      <button
        onClick={handleKakaoShare}
        disabled={!isKakaoReady}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${!isKakaoReady ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02] cursor-pointer'}
          transition-all duration-200 outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-opacity-50 rounded-md
        `}
        title={isKakaoReady ? '카카오톡으로 공유하기' : 'SDK 로딩 중...'}
      >
        <div className="flex items-center justify-center px-4 py-2 bg-[#FEE500] hover:bg-[#FDD835] rounded-md transition-colors">
          <Image
            src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
            alt="카카오"
            width={20}
            height={20}
            className="mr-2 rounded-sm"
          />
          <MessageCircle className="mr-1 h-4 w-4 text-[#3C1E1E]" />
          <span className="text-[#3C1E1E] font-medium">
            {children || '카카오톡 공유'}
          </span>
        </div>
      </button>
    );
  }

  // 기본 버튼 스타일
  return (
    <Button
      variant={variant === 'kakao' ? 'default' : variant}
      size={size}
      onClick={handleKakaoShare}
      disabled={!isKakaoReady}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'kakao' ? 'bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] border-0' : ''}
        font-medium transition-all duration-200
        ${!isKakaoReady ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02]'}
      `}
      title={isKakaoReady ? '카카오톡으로 공유하기' : 'SDK 로딩 중...'}
    >
      {!isKakaoReady ? (
        <>
          <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          로딩 중...
        </>
      ) : (
        <>
          {useOfficialImage ? (
            <Image
              src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
              alt="카카오"
              width={16}
              height={16}
              className="mr-2 rounded-sm"
            />
          ) : (
            <MessageCircle className="mr-2 h-4 w-4" />
          )}
          {children || '카카오톡 공유'}
        </>
      )}
    </Button>
  );
}

export default KakaoShareButton;
