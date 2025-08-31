'use client';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/supabase';
import { User } from '@supabase/supabase-js';

type UserRecord = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

export interface KakaoUser {
  id: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account?: {
    email?: string;
    profile?: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
  };
}

export interface SupabaseKakaoAuthResult {
  success: boolean;
  user?: User;
  userRecord?: UserRecord;
  isNewUser?: boolean;
  error?: string;
}

export class SupabaseKakaoAuthService {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  /**
   * Supabase OAuth를 통한 카카오 로그인
   */
  async signInWithKakao(): Promise<SupabaseKakaoAuthResult> {
    try {
      const { data: _data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          queryParams: {
            // 카카오에서 추가 정보 요청
            scope: 'profile_nickname profile_image account_email'
          }
        }
      });

      if (error) {
        console.error('Supabase 카카오 OAuth 오류:', error);
        return {
          success: false,
          error: error.message
        };
      }

      // OAuth 리다이렉트가 성공적으로 시작됨
      return {
        success: true
      };

    } catch (error) {
      console.error('카카오 로그인 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      };
    }
  }

  /**
   * 현재 세션 가져오기
   */
  async getSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.error('세션 조회 오류:', error);
        return null;
      }

      return session;
    } catch (error) {
      console.error('세션 조회 실패:', error);
      return null;
    }
  }

  /**
   * 현재 사용자 정보 가져오기
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      
      if (error) {
        console.error('사용자 조회 오류:', error);
        return null;
      }

      return user;
    } catch (error) {
      console.error('사용자 조회 실패:', error);
      return null;
    }
  }

  /**
   * users 테이블에서 사용자 레코드 가져오기
   */
  async getUserRecord(userId: string): Promise<UserRecord | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // Not found 에러가 아닌 경우만 로그
          console.error('사용자 레코드 조회 오류:', error);
        }
        return null;
      }

      return data;
    } catch (error) {
      console.error('사용자 레코드 조회 실패:', error);
      return null;
    }
  }

  /**
   * 카카오 사용자 정보를 users 테이블에 동기화
   */
  async syncKakaoUserToDatabase(user: User): Promise<UserRecord | null> {
    try {
      const kakaoData = user.user_metadata;
      const kakaoId = user.identities?.[0]?.id;

      // 기존 레코드 확인
      let userRecord = await this.getUserRecord(user.id);

      const userData: UserInsert | UserUpdate = {
        id: user.id,
        email: user.email || kakaoData?.email || null,
        name: kakaoData?.full_name || kakaoData?.name || kakaoData?.nickname || null,
        avatar_url: kakaoData?.avatar_url || kakaoData?.profile_image_url || null,
        kakao_id: kakaoId || null,
        provider: 'kakao',
        last_sign_in_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (userRecord) {
        // 기존 사용자 업데이트
        const { data, error } = await this.supabase
          .from('users')
          .update(userData as UserUpdate)
          .eq('id', user.id)
          .select()
          .single();

        if (error) {
          console.error('사용자 업데이트 오류:', error);
          return null;
        }

        return data;
      } else {
        // 새 사용자 생성
        const insertData: UserInsert = {
          ...userData as UserInsert,
          created_at: new Date().toISOString()
        };

        const { data, error } = await this.supabase
          .from('users')
          .insert(insertData)
          .select()
          .single();

        if (error) {
          console.error('사용자 생성 오류:', error);
          return null;
        }

        return data;
      }
    } catch (error) {
      console.error('카카오 사용자 동기화 실패:', error);
      return null;
    }
  }

  /**
   * 사용자 프로필 업데이트
   */
  async updateUserProfile(userId: string, updates: Partial<UserUpdate>): Promise<boolean> {
    try {
      const updateData: UserUpdate = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { error } = await this.supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);

      if (error) {
        console.error('프로필 업데이트 오류:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      return false;
    }
  }

  /**
   * 로그아웃
   */
  async signOut(): Promise<boolean> {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        console.error('로그아웃 오류:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('로그아웃 실패:', error);
      return false;
    }
  }

  /**
   * 카카오 연동 해제 (계정은 유지, 카카오 정보만 제거)
   */
  async unlinkKakaoAccount(userId: string): Promise<boolean> {
    try {
      // users 테이블에서 카카오 관련 정보 제거
      const { error } = await this.supabase
        .from('users')
        .update({
          kakao_id: null,
          kakao_access_token: null,
          provider: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('카카오 연동 해제 오류:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('카카오 연동 해제 실패:', error);
      return false;
    }
  }

  /**
   * 인증 상태 변경 리스너 등록
   */
  onAuthStateChange(callback: (user: User | null, userRecord: UserRecord | null) => void) {
    return this.supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // 로그인 시 사용자 레코드 동기화
        const userRecord = await this.syncKakaoUserToDatabase(session.user);
        callback(session.user, userRecord);
      } else {
        callback(null, null);
      }
    });
  }

  /**
   * 카카오 사용자 여부 확인
   */
  isKakaoUser(user: User | null): boolean {
    if (!user) return false;
    return user.app_metadata?.provider === 'kakao' || 
           user.identities?.some(identity => identity.provider === 'kakao') || 
           false;
  }

  /**
   * 카카오 사용자 정보 추출
   */
  getKakaoUserInfo(user: User | null): KakaoUser | null {
    if (!user || !this.isKakaoUser(user)) return null;

    const metadata = user.user_metadata;
    return {
      id: user.identities?.[0]?.id || user.id,
      properties: {
        nickname: metadata?.full_name || metadata?.name || metadata?.nickname || '',
        profile_image: metadata?.avatar_url || metadata?.profile_image_url,
        thumbnail_image: metadata?.thumbnail_image_url
      },
      kakao_account: {
        email: user.email || metadata?.email,
        profile: {
          nickname: metadata?.full_name || metadata?.name || metadata?.nickname || '',
          profile_image_url: metadata?.avatar_url || metadata?.profile_image_url,
          thumbnail_image_url: metadata?.thumbnail_image_url
        }
      }
    };
  }

  /**
   * 표시용 사용자 정보 생성
   */
  getDisplayUserInfo(user: User | null, userRecord: UserRecord | null) {
    if (!user) return null;

    const kakaoUser = this.getKakaoUserInfo(user);
    const isKakaoUser = this.isKakaoUser(user);

    return {
      id: user.id,
      email: user.email || userRecord?.email || '',
      displayName: userRecord?.name || 
                   kakaoUser?.properties?.nickname || 
                   user.user_metadata?.name || 
                   user.email?.split('@')[0] || 
                   '사용자',
      profileImage: userRecord?.avatar_url || 
                    kakaoUser?.properties?.profile_image || 
                    user.user_metadata?.avatar_url || 
                    null,
      companyName: userRecord?.company_name || null,
      phone: userRecord?.phone || null,
      isKakaoUser,
      kakaoUser,
      userRecord,
      createdAt: user.created_at,
      lastSignInAt: userRecord?.last_sign_in_at || user.last_sign_in_at
    };
  }
}

// 싱글톤 인스턴스
let supabaseKakaoAuthInstance: SupabaseKakaoAuthService | null = null;

export const getSupabaseKakaoAuthService = (): SupabaseKakaoAuthService => {
  if (!supabaseKakaoAuthInstance) {
    supabaseKakaoAuthInstance = new SupabaseKakaoAuthService();
  }
  return supabaseKakaoAuthInstance;
};