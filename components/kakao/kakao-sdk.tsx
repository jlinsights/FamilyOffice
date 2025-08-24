'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Kakao SDK 글로벌 타입 정의
declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoSDKProps {
  javascriptKey: string;
  debug?: boolean;
}

export function KakaoSDK({ javascriptKey, debug = false }: KakaoSDKProps) {
  useEffect(() => {
    // Kakao SDK 초기화
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(javascriptKey);
        
        if (debug) {
          console.log('✅ Kakao SDK initialized with key:', javascriptKey.substring(0, 10) + '...');
          console.log('🔧 Kakao SDK services:', Object.keys(window.Kakao));
        }
      }
    }
  }, [javascriptKey, debug]);

  return (
    <Script
      id="kakao-sdk"
      strategy="afterInteractive"
      src="https://developers.kakao.com/sdk/js/kakao.js"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(javascriptKey);
          
          if (debug) {
            console.log('✅ Kakao SDK script loaded and initialized');
          }
        }
      }}
      onError={(error) => {
        console.error('❌ Kakao SDK script loading failed:', error);
      }}
    />
  );
}

// Kakao SDK 유틸리티 함수들
export const kakaoSDKUtils = {
  // 카카오 로그인
  login: (callback?: (authObj: any) => void) => {
    if (window.Kakao?.Auth) {
      window.Kakao.Auth.login({
        success: callback,
        fail: (error: any) => {
          console.error('카카오 로그인 실패:', error);
        }
      });
    }
  },

  // 카카오 로그아웃
  logout: (callback?: () => void) => {
    if (window.Kakao?.Auth) {
      window.Kakao.Auth.logout(callback);
    }
  },

  // 카카오톡 공유하기
  shareMessage: (templateObject: any) => {
    if (window.Kakao?.Share) {
      window.Kakao.Share.sendDefault(templateObject);
    }
  },

  // 카카오톡 채널 추가
  addChannel: (channelPublicId: string) => {
    if (window.Kakao?.Channel) {
      window.Kakao.Channel.addChannel({
        channelPublicId: channelPublicId
      });
    }
  },

  // 카카오톡 채널 채팅
  chatChannel: (channelPublicId: string) => {
    if (window.Kakao?.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: channelPublicId
      });
    }
  },

  // 사용자 정보 가져오기
  getUserInfo: (callback: (userInfo: any) => void) => {
    if (window.Kakao?.API) {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: callback,
        fail: (error: any) => {
          console.error('사용자 정보 가져오기 실패:', error);
        }
      });
    }
  }
};

// React Hook for Kakao SDK
export function useKakaoSDK(javascriptKey?: string) {
  useEffect(() => {
    if (javascriptKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(javascriptKey);
    }
  }, [javascriptKey]);

  const isReady = typeof window !== 'undefined' && 
                 window.Kakao && 
                 window.Kakao.isInitialized();

  return {
    isReady,
    kakao: isReady ? window.Kakao : null,
    ...kakaoSDKUtils
  };
}