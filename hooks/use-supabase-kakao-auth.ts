'use client';

import { User } from '@supabase/supabase-js';

import { useEffect, useState, useCallback } from 'react';

import {
  getSupabaseKakaoAuthService,
  type SupabaseKakaoAuthResult,
} from '@/lib/auth/supabase-kakao-auth';

import { Database } from '@/types/supabase';

type UserRecord = Database['public']['Tables']['users']['Row'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

interface UseSupabaseKakaoAuthState {
  user: User | null;
  userRecord: UserRecord | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isKakaoUser: boolean;
  displayName: string;
  email: string;
  profileImage: string | null;
  companyName: string | null;
  phone: string | null;
  error: string | null;
}

interface UseSupabaseKakaoAuthActions {
  signInWithKakao: () => Promise<SupabaseKakaoAuthResult>;
  signOut: () => Promise<boolean>;
  updateProfile: (updates: Partial<UserUpdate>) => Promise<boolean>;
  unlinkKakaoAccount: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

interface UseSupabaseKakaoAuth
  extends UseSupabaseKakaoAuthState, UseSupabaseKakaoAuthActions {}

export function useSupabaseKakaoAuth(): UseSupabaseKakaoAuth {
  const [state, setState] = useState<UseSupabaseKakaoAuthState>({
    user: null,
    userRecord: null,
    isLoading: true,
    isAuthenticated: false,
    isKakaoUser: false,
    displayName: '',
    email: '',
    profileImage: null,
    companyName: null,
    phone: null,
    error: null,
  });

  const authService = getSupabaseKakaoAuthService();

  // 사용자 상태 업데이트
  const updateUserState = useCallback(
    (user: User | null, userRecord: UserRecord | null) => {
      const displayInfo = authService.getDisplayUserInfo(user, userRecord);

      setState({
        user,
        userRecord,
        isLoading: false,
        isAuthenticated: !!user,
        isKakaoUser: displayInfo?.isKakaoUser || false,
        displayName: displayInfo?.displayName || '',
        email: displayInfo?.email || '',
        profileImage: displayInfo?.profileImage || null,
        companyName: displayInfo?.companyName || null,
        phone: displayInfo?.phone || null,
        error: null,
      });
    },
    [authService]
  );

  // 에러 상태 설정
  const setError = useCallback((error: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error,
    }));
  }, []);

  // 카카오 로그인
  const signInWithKakao =
    useCallback(async (): Promise<SupabaseKakaoAuthResult> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await authService.signInWithKakao();

        if (!result.success) {
          setError(result.error || '카카오 로그인에 실패했습니다.');
          return result;
        }

        // OAuth 리다이렉트가 시작되면 로딩 상태 유지
        // 실제 로그인은 콜백 페이지에서 처리됨
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      }
    }, [authService, setError]);

  // 로그아웃
  const signOut = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const success = await authService.signOut();

      if (success) {
        updateUserState(null, null);
      } else {
        setError('로그아웃에 실패했습니다.');
      }

      return success;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '로그아웃 중 오류가 발생했습니다.';
      setError(errorMessage);
      return false;
    }
  }, [authService, updateUserState, setError]);

  // 프로필 업데이트
  const updateProfile = useCallback(
    async (updates: Partial<UserUpdate>): Promise<boolean> => {
      if (!state.user) {
        setError('로그인이 필요합니다.');
        return false;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const success = await authService.updateUserProfile(
          state.user.id,
          updates
        );

        if (success) {
          // 프로필 업데이트 후 사용자 정보 새로고침
          await refreshUser();
        } else {
          setError('프로필 업데이트에 실패했습니다.');
        }

        return success;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '프로필 업데이트 중 오류가 발생했습니다.';
        setError(errorMessage);
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.user, authService, setError]
  );

  // 카카오 연동 해제
  const unlinkKakaoAccount = useCallback(async (): Promise<boolean> => {
    if (!state.user) {
      setError('로그인이 필요합니다.');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const success = await authService.unlinkKakaoAccount(state.user.id);

      if (success) {
        // 연동 해제 후 사용자 정보 새로고침
        await refreshUser();
      } else {
        setError('카카오 연동 해제에 실패했습니다.');
      }

      return success;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '카카오 연동 해제 중 오류가 발생했습니다.';
      setError(errorMessage);
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user, authService, setError]);

  // 사용자 정보 새로고침
  const refreshUser = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await authService.getCurrentUser();
      if (user) {
        const userRecord = await authService.getUserRecord(user.id);
        updateUserState(user, userRecord);
      } else {
        updateUserState(null, null);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '사용자 정보를 가져오는 중 오류가 발생했습니다.';
      setError(errorMessage);
    }
  }, [authService, updateUserState, setError]);

  // 컴포넌트 마운트 시 인증 상태 확인 및 리스너 등록
  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | null = null;

    const initializeAuth = async () => {
      try {
        // 현재 세션 확인
        const session = await authService.getSession();

        if (session?.user && mounted) {
          const userRecord = await authService.getUserRecord(session.user.id);
          updateUserState(session.user, userRecord);
        } else if (mounted) {
          updateUserState(null, null);
        }

        // 인증 상태 변경 리스너 등록
        const {
          data: { subscription },
        } = authService.onAuthStateChange((user, userRecord) => {
          if (mounted) {
            updateUserState(user, userRecord);
          }
        });

        unsubscribe = () => subscription.unsubscribe();
      } catch (error) {
        if (mounted) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '인증 초기화 중 오류가 발생했습니다.';
          setError(errorMessage);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authService, updateUserState, setError]);

  return {
    // State
    user: state.user,
    userRecord: state.userRecord,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    isKakaoUser: state.isKakaoUser,
    displayName: state.displayName,
    email: state.email,
    profileImage: state.profileImage,
    companyName: state.companyName,
    phone: state.phone,
    error: state.error,

    // Actions
    signInWithKakao,
    signOut,
    updateProfile,
    unlinkKakaoAccount,
    refreshUser,
  };
}
