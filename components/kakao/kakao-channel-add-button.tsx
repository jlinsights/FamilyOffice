'use client';

/**
 * 카카오톡 채널 추가 버튼 컴포넌트
 * 공식 카카오 브랜딩 가이드라인에 따른 채널 추가 버튼
 */
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface KakaoChannelAddButtonProps {
  channelId?: string; // 카카오톡 채널 ID (예: @familyoffices)
  variant?: 'banner' | 'simple';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  onChannelAdd?: () => void;
}

export function KakaoChannelAddButton({
  channelId = '@familyoffices',
  variant = 'banner',
  size = 'default',
  fullWidth = false,
  onChannelAdd,
}: KakaoChannelAddButtonProps) {
  const { toast } = useToast();

  const handleChannelAdd = () => {
    try {
      // 카카오톡 채널 추가 URL 생성
      const channelUrl = `https://pf.kakao.com/${channelId.replace('@', '')}`;

      // 모바일에서는 카카오톡 앱으로, 데스크톱에서는 웹으로
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // 모바일: 카카오톡 앱 실행
        const kakaoScheme = `kakaotalk://plusfriend/home/${channelId}`;
        const fallbackUrl = channelUrl;

        // 카카오톡 앱 실행 시도
        window.location.href = kakaoScheme;

        // 앱이 설치되지 않은 경우 웹으로 fallback
        setTimeout(() => {
          window.open(fallbackUrl, '_blank');
        }, 1000);
      } else {
        // 데스크톱: 새 탭에서 웹페이지 열기
        window.open(channelUrl, '_blank', 'noopener,noreferrer');
      }

      toast({
        title: '카카오톡 채널',
        description: '카카오톡 채널 페이지로 이동합니다.',
      });

      onChannelAdd?.();
    } catch (error) {
      toast({
        title: '오류',
        description: '채널 페이지를 열 수 없습니다.',
        variant: 'destructive',
      });
    }
  };

  // 배너형 버튼
  if (variant === 'banner') {
    return (
      <button
        onClick={handleChannelAdd}
        className={`
          ${fullWidth ? 'w-full' : ''}
          hover:scale-[1.02] cursor-pointer transition-all duration-200 
          outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-opacity-50 rounded-md
        `}
      >
        <Image
          src={
            size === 'lg'
              ? '/images/KAKAO/banner_type@2x.png'
              : '/images/KAKAO/banner_type.png'
          }
          alt="카카오톡 채널 추가"
          width={size === 'lg' ? 640 : size === 'sm' ? 160 : 320}
          height={size === 'lg' ? 120 : size === 'sm' ? 30 : 60}
          className="h-auto max-w-full"
          priority
        />
      </button>
    );
  }

  // 심플형 버튼 (fallback)
  return (
    <Button
      onClick={handleChannelAdd}
      variant="outline"
      size={size}
      className={`
        ${fullWidth ? 'w-full' : ''}
        bg-white hover:bg-gray-50 border-gray-300 text-gray-700
        font-medium transition-all duration-200
        hover:scale-[1.02] flex items-center space-x-2
      `}
    >
      <Image
        src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png"
        alt="카카오"
        width={20}
        height={20}
        className="rounded-sm"
      />
      <span>채널 추가</span>
    </Button>
  );
}

export default KakaoChannelAddButton;
