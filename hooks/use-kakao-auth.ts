'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { getKakaoAuthService, type KakaoUser, type KakaoAuthResult } from '@/lib/auth/kakao-auth';

export interface AuthState {
  user: User | null;
  kakaoUser: KakaoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useKakaoAuth(): AuthState & {
  signIn: () => Promise<KakaoAuthResult>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: {
    name?: string;
    avatar_url?: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  unlinkKakaoAccount: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  isKakaoUser: boolean;
  displayName: string;
  profileImage?: string | undefined;
  email?: string | undefined;
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    kakaoUser: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });

  const router = useRouter();
  const kakaoAuth = getKakaoAuthService();

  // 초기 로드 시 현재 사용자 확인
  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { user, kakaoUser } = await kakaoAuth.getCurrentUser();
      
      setState({
        user,
        kakaoUser: kakaoUser || null,
        isLoading: false,
        isAuthenticated: !!user,
        error: null
      });
    } catch (error) {
      console.error('사용자 확인 오류:', error);
      setState({
        user: null,
        kakaoUser: null,
        isLoading: false,
        isAuthenticated: false,
        error: error instanceof Error ? error.message : '사용자 정보를 가져올 수 없습니다.'
      });
    }
  }, [kakaoAuth]);

  const signIn = useCallback(async (): Promise<KakaoAuthResult> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await kakaoAuth.signInWithKakao();
      
      if (result.success && result.user) {
        setState({
          user: result.user,
          kakaoUser: result.kakaoUser || null,
          isLoading: false,
          isAuthenticated: true,
          error: null
        });
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || '로그인에 실패했습니다.'
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [kakaoAuth]);

  const signOut = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await kakaoAuth.signOut();
      
      if (result.success) {
        setState({
          user: null,
          kakaoUser: null,
          isLoading: false,
          isAuthenticated: false,
          error: null
        });
        
        // 로그아웃 후 홈페이지로 리다이렉트
        router.push('/');
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || '로그아웃에 실패했습니다.'
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [kakaoAuth, router]);

  const updateProfile = useCallback(async (updates: {
    name?: string;
    avatar_url?: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await kakaoAuth.updateProfile(updates);
      
      if (result.success) {
        // 프로필 업데이트 후 사용자 정보 새로고침
        await checkCurrentUser();
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || '프로필 업데이트에 실패했습니다.'
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [kakaoAuth, checkCurrentUser]);

  const unlinkKakaoAccount = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await kakaoAuth.unlinkKakaoAccount();
      
      if (result.success) {
        // 계정 연동 해제 후 사용자 정보 새로고침
        await checkCurrentUser();
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || '계정 연동 해제에 실패했습니다.'
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '계정 연동 해제 중 오류가 발생했습니다.';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [kakaoAuth, checkCurrentUser]);

  const refreshUser = useCallback(() => {
    return checkCurrentUser();
  }, [checkCurrentUser]);

  return {
    // 상태
    ...state,
    
    // 액션
    signIn,
    signOut,
    updateProfile,
    unlinkKakaoAccount,
    refreshUser,
    
    // 유틸리티
    isKakaoUser: !!state.kakaoUser,
    displayName: state.kakaoUser?.kakao_account.profile?.nickname || state.user?.user_metadata?.name || '사용자',
    profileImage: state.kakaoUser?.kakao_account.profile?.profile_image_url || state.user?.user_metadata?.avatar_url,
    email: state.kakaoUser?.kakao_account.email || state.user?.email
  };
}

export default useKakaoAuth;