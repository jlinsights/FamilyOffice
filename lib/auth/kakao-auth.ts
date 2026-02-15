/**
 * 카카오 소셜 로그인 시스템 with Supabase 통합
 * Kakao SDK + Supabase Auth 완전 연동
 */
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { safeInsert, safeUpdate, safeFrom } from '@/lib/supabase/helpers';

export interface KakaoUser {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement?: boolean;
    profile_image_needs_agreement?: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image?: boolean;
    };
    name_needs_agreement?: boolean;
    name?: string;
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
    age_range_needs_agreement?: boolean;
    age_range?: string;
    birthday_needs_agreement?: boolean;
    birthday?: string;
    birthday_type?: string;
    gender_needs_agreement?: boolean;
    gender?: 'female' | 'male';
    phone_number_needs_agreement?: boolean;
    phone_number?: string;
    ci_needs_agreement?: boolean;
    ci?: string;
  };
}

export interface KakaoAuthResult {
  success: boolean;
  user?: User;
  kakaoUser?: KakaoUser;
  error?: string;
  isNewUser?: boolean;
}

export class KakaoAuthService {
  private supabase = createClient();
  private isInitialized = false;

  constructor() {
    // 환경 변수 검증
    if (typeof window !== 'undefined') {
      const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
      if (!javascriptKey) {
        console.error(
          '❌ NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY가 설정되지 않았습니다.'
        );
        console.error('   카카오 로그인이 작동하지 않습니다.');
        return;
      }
    }

    this.initializeKakaoSDK();
  }

  private async initializeKakaoSDK(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Kakao SDK 초기화 대기
    const checkKakaoSDK = () => {
      return new Promise<void>(resolve => {
        const check = () => {
          if (window.Kakao && window.Kakao.isInitialized()) {
            this.isInitialized = true;
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    };

    await checkKakaoSDK();
  }

  /**
   * 카카오 로그인 실행
   */
  async signInWithKakao(): Promise<KakaoAuthResult> {
    try {
      await this.initializeKakaoSDK();

      if (!this.isInitialized) {
        throw new Error('카카오 SDK가 초기화되지 않았습니다.');
      }

      // 카카오 로그인
      const kakaoAuthResult = await this.performKakaoLogin();
      if (!kakaoAuthResult.success || !kakaoAuthResult.accessToken) {
        return {
          success: false,
          error: '카카오 로그인에 실패했습니다.',
        };
      }

      // 카카오 사용자 정보 가져오기
      const kakaoUser = await this.getKakaoUserInfo(
        kakaoAuthResult.accessToken
      );
      if (!kakaoUser) {
        return {
          success: false,
          error: '카카오 사용자 정보를 가져올 수 없습니다.',
        };
      }

      // Supabase에 사용자 등록/로그인
      const supabaseResult = await this.signInOrCreateUser(
        kakaoUser,
        kakaoAuthResult.accessToken
      );

      return {
        success: true,
        user: supabaseResult.user,
        kakaoUser,
        isNewUser: supabaseResult.isNewUser,
      };
    } catch (error) {
      console.error('카카오 로그인 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '로그인 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 카카오 SDK를 통한 로그인
   */
  private performKakaoLogin(): Promise<{
    success: boolean;
    accessToken?: string;
  }> {
    return new Promise(resolve => {
      if (!window.Kakao?.Auth) {
        resolve({ success: false });
        return;
      }

      window.Kakao.Auth.login({
        success: (authObj: any) => {
          resolve({
            success: true,
            accessToken: authObj.access_token,
          });
        },
        fail: (error: any) => {
          console.error('카카오 로그인 실패:', error);
          resolve({ success: false });
        },
      });
    });
  }

  /**
   * 카카오 사용자 정보 가져오기
   */
  private async getKakaoUserInfo(
    accessToken: string
  ): Promise<KakaoUser | null> {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('카카오 API 요청 실패');
      }

      const userData: KakaoUser = await response.json();
      return userData;
    } catch (error) {
      console.error('카카오 사용자 정보 가져오기 실패:', error);
      return null;
    }
  }

  /**
   * Supabase에 사용자 등록/로그인
   */
  private async signInOrCreateUser(
    kakaoUser: KakaoUser,
    accessToken: string
  ): Promise<{
    user: User;
    isNewUser: boolean;
  }> {
    const email = kakaoUser.kakao_account.email;
    const nickname =
      kakaoUser.kakao_account.profile?.nickname ||
      kakaoUser.properties.nickname;
    const profileImage =
      kakaoUser.kakao_account.profile?.profile_image_url ||
      kakaoUser.properties.profile_image;

    // 기존 사용자 확인
    const { data: existingUser } = await this.supabase
      .from('users')
      .select('*')
      .eq('kakao_id', kakaoUser.id.toString())
      .single();

    if (existingUser) {
      // 기존 사용자 로그인 - 정보 업데이트
      const { data, error } = await this.supabase.auth.signInAnonymously();

      if (error) throw error;

      // 사용자 정보 업데이트
      await safeUpdate(this.supabase, 'users', {
        name: nickname,
        avatar_url: profileImage || null,
        kakao_access_token: accessToken,
        last_sign_in_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('kakao_id', kakaoUser.id.toString());

      return {
        user: data.user!,
        isNewUser: false,
      };
    } else {
      // 새 사용자 생성
      const { data, error } = await this.supabase.auth.signInAnonymously();

      if (error) throw error;

      // users 테이블에 카카오 사용자 정보 저장
      const { error: insertError } = await safeInsert(this.supabase, 'users', {
        id: data.user!.id,
        email: email || null,
        name: nickname,
        avatar_url: profileImage || null,
        kakao_id: kakaoUser.id.toString(),
        kakao_access_token: accessToken,
        provider: 'kakao',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('사용자 정보 저장 실패:', insertError);
        throw insertError;
      }

      return {
        user: data.user!,
        isNewUser: true,
      };
    }
  }

  /**
   * 카카오 로그아웃
   */
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      // 카카오 로그아웃
      if (window.Kakao?.Auth) {
        window.Kakao.Auth.logout();
      }

      // Supabase 로그아웃
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('로그아웃 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '로그아웃 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 현재 로그인 상태 확인
   */
  async getCurrentUser(): Promise<{
    user: User | null;
    kakaoUser?: KakaoUser;
  }> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (!user) {
      return { user: null };
    }

    // 카카오 사용자 정보 가져오기
    const { data: userData } = await safeFrom(this.supabase, 'users')
      .select('*')
      .eq('id', user.id)
      .single();

    let kakaoUser: KakaoUser | undefined;
    if (userData?.kakao_access_token) {
      kakaoUser =
        (await this.getKakaoUserInfo(userData.kakao_access_token)) || undefined;
    }

    const result: { user: User | null; kakaoUser?: KakaoUser } = { user };
    if (kakaoUser) {
      result.kakaoUser = kakaoUser;
    }
    return result;
  }

  /**
   * 사용자 프로필 업데이트
   */
  async updateProfile(updates: {
    name?: string;
    avatar_url?: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const { error } = await safeUpdate(this.supabase, 'users', {
        ...updates,
        updated_at: new Date().toISOString(),
      }).eq('id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '프로필 업데이트 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * OAuth 콜백 처리 (카카오싱크용)
   */
  async handleOAuthCallback(code: string): Promise<KakaoAuthResult> {
    try {
      // 인증 코드로 액세스 토큰 교환
      const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '',
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/oauth`,
          code: code,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('액세스 토큰 교환에 실패했습니다.');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      if (!accessToken) {
        throw new Error('액세스 토큰을 받지 못했습니다.');
      }

      // 카카오 사용자 정보 가져오기
      const kakaoUser = await this.getKakaoUserInfo(accessToken);
      if (!kakaoUser) {
        throw new Error('카카오 사용자 정보를 가져올 수 없습니다.');
      }

      // Supabase에 사용자 등록/로그인
      const supabaseResult = await this.signInOrCreateUser(
        kakaoUser,
        accessToken
      );

      return {
        success: true,
        user: supabaseResult.user,
        kakaoUser,
        isNewUser: supabaseResult.isNewUser,
      };
    } catch (error) {
      console.error('OAuth 콜백 처리 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'OAuth 처리 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 카카오 로그아웃 (카카오싱크 사용 시)
   */
  async signOutFromKakao(): Promise<{ success: boolean; error?: string }> {
    try {
      if (typeof window === 'undefined' || !window.Kakao) {
        console.warn('카카오 SDK가 로드되지 않았습니다.');
        return { success: true }; // SDK가 없어도 성공으로 처리
      }

      // 카카오 로그아웃 처리
      if (window.Kakao.Auth.getAccessToken()) {
        // 액세스 토큰이 있으면 카카오 서버에 로그아웃 요청
        try {
          await fetch('https://kapi.kakao.com/v1/user/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${window.Kakao.Auth.getAccessToken()}`,
            },
          });
        } catch (error) {
          console.warn('카카오 서버 로그아웃 실패:', error);
          // 서버 로그아웃 실패해도 클라이언트 로그아웃은 진행
        }
      }

      // 클라이언트 측 토큰 정리
      window.Kakao.Auth.logout();

      return { success: true };
    } catch (error) {
      console.error('카카오 로그아웃 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '카카오 로그아웃 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 계정 연동 해제 (카카오 연결 끊기)
   */
  async unlinkKakaoAccount(): Promise<{ success: boolean; error?: string }> {
    try {
      // 카카오 연결 끊기
      if (window.Kakao?.API) {
        await new Promise<void>((resolve, reject) => {
          window.Kakao?.API?.request({
            url: '/v1/user/unlink',
            success: () => resolve(),
            fail: (error: any) => reject(error),
          });
        });
      }

      // Supabase에서 카카오 정보 제거
      const {
        data: { user },
      } = await this.supabase.auth.getUser();
      if (user) {
        await safeUpdate(this.supabase, 'users', {
          kakao_id: null,
          kakao_access_token: null,
          updated_at: new Date().toISOString(),
        }).eq('id', user.id);
      }

      return { success: true };
    } catch (error) {
      console.error('계정 연동 해제 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '계정 연동 해제 중 오류가 발생했습니다.',
      };
    }
  }
}

// 싱글톤 인스턴스
let kakaoAuthInstance: KakaoAuthService | null = null;

export function getKakaoAuthService(): KakaoAuthService {
  if (!kakaoAuthInstance) {
    kakaoAuthInstance = new KakaoAuthService();
  }
  return kakaoAuthInstance;
}

export default KakaoAuthService;
