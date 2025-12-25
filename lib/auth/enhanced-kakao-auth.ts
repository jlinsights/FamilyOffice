'use client';

import { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';
import { safeUpdate } from '@/lib/supabase/helpers';

import { Database } from '@/types/supabase';

type UserRecord = Database['public']['Tables']['users']['Row'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

interface TokenRefreshResult {
  success: boolean;
  expiresAt?: number;
  error?: string;
}

interface AuthCache {
  user: User | null;
  userRecord: UserRecord | null;
  timestamp: number;
  expiresAt: number;
}

export class EnhancedKakaoAuthService {
  private supabase;
  private cache = new Map<string, AuthCache>();
  private pendingRequests = new Map<string, Promise<any>>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5분
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 1000; // 1초

  constructor() {
    this.supabase = createClient();
    this.initializeTokenRefresh();
  }

  /**
   * 자동 토큰 갱신 설정
   */
  private initializeTokenRefresh() {
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED' && session) {
        this.logger.info('Token refreshed automatically', {
          expiresAt: session.expires_at,
          userId: session.user.id,
        });

        // 캐시 갱신
        await this.invalidateUserCache(session.user.id);
      }

      if (event === 'SIGNED_OUT') {
        this.clearAllCaches();
      }
    });
  }

  /**
   * 향상된 카카오 로그인 (재시도 및 에러 처리)
   */
  async signInWithKakao(): Promise<{
    success: boolean;
    redirectUrl?: string;
    error?: string;
    retryAfter?: number;
  }> {
    const cacheKey = 'kakao_login';

    try {
      // 중복 요청 방지
      if (this.pendingRequests.has(cacheKey)) {
        await this.pendingRequests.get(cacheKey);
        return { success: false, error: '이미 로그인 요청이 진행 중입니다.' };
      }

      const loginPromise = this.performKakaoLogin();
      this.pendingRequests.set(cacheKey, loginPromise);

      const result = await loginPromise;
      return result;
    } catch (error) {
      this.logger.error('Kakao login failed', error as Error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '로그인 중 오류가 발생했습니다.',
        retryAfter: 5000, // 5초 후 재시도 가능
      };
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async performKakaoLogin() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        queryParams: {
          scope: 'profile_nickname profile_image account_email',
          // CSRF 보호를 위한 state 값
          state: this.generateSecureState(),
        },
      },
    });

    if (error) {
      throw new AuthError(
        '카카오 OAuth 요청 실패',
        'OAUTH_REQUEST_FAILED',
        error
      );
    }

    this.logger.info('Kakao OAuth initiated', {
      redirectUrl: data.url,
      timestamp: Date.now(),
    });

    return {
      success: true,
      redirectUrl: data.url,
    };
  }

  /**
   * 토큰 수동 갱신
   */
  async refreshToken(): Promise<TokenRefreshResult> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();

      if (error) {
        this.logger.error('Token refresh failed', error);
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.session) {
        this.logger.info('Token refreshed manually', {
          userId: data.session.user.id,
          expiresAt: data.session.expires_at,
        });

        return {
          success: true,
          expiresAt:
            data.session.expires_at || Math.floor(Date.now() / 1000) + 3600,
        };
      }

      return {
        success: false,
        error: '세션 갱신에 실패했습니다.',
      };
    } catch (error) {
      this.logger.error('Token refresh error', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '토큰 갱신 오류',
      };
    }
  }

  /**
   * 토큰 만료 확인 및 자동 갱신
   */
  async ensureValidToken(): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await this.supabase.auth.getSession();

      if (!session) {
        return false;
      }

      // 토큰이 5분 내에 만료되면 갱신
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = session.expires_at || 0;

      if (expiresAt - now < 300) {
        // 5분
        this.logger.info('Token expiring soon, refreshing...', {
          expiresAt,
          now,
          userId: session.user.id,
        });

        const refreshResult = await this.refreshToken();
        return refreshResult.success;
      }

      return true;
    } catch (error) {
      this.logger.error('Token validation error', error as Error);
      return false;
    }
  }

  /**
   * 캐시된 사용자 정보 조회
   */
  async getCachedUser(
    userId: string
  ): Promise<{ user: User | null; userRecord: UserRecord | null }> {
    const cacheKey = `user_${userId}`;
    const cached = this.cache.get(cacheKey);

    // 캐시 유효성 확인
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return {
        user: cached.user,
        userRecord: cached.userRecord,
      };
    }

    // 중복 요청 방지
    if (this.pendingRequests.has(cacheKey)) {
      return await this.pendingRequests.get(cacheKey);
    }

    const fetchPromise = this.fetchUserWithRetry(userId);
    this.pendingRequests.set(cacheKey, fetchPromise);

    try {
      const result = await fetchPromise;

      // 캐시 저장
      this.cache.set(cacheKey, {
        user: result.user,
        userRecord: result.userRecord,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.CACHE_TTL,
      });

      return result;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  /**
   * 재시도 로직을 포함한 사용자 정보 조회
   */
  private async fetchUserWithRetry(
    userId: string
  ): Promise<{ user: User | null; userRecord: UserRecord | null }> {
    return this.retryOperation(async () => {
      const [userResult, recordResult] = await Promise.all([
        this.supabase.auth.getUser(),
        this.supabase.from('users').select('*').eq('id', userId).single(),
      ]);

      if (userResult.error && userResult.error.status !== 401) {
        throw new AuthError(
          '사용자 인증 정보 조회 실패',
          'USER_FETCH_FAILED',
          userResult.error
        );
      }

      return {
        user: userResult.data?.user || null,
        userRecord: recordResult.data || null,
      };
    }, 'fetchUser');
  }

  /**
   * 프로필 업데이트 (낙관적 업데이트 + 롤백)
   */
  async updateProfileWithRollback(
    userId: string,
    updates: Partial<UserUpdate>
  ): Promise<{
    success: boolean;
    userRecord?: UserRecord;
    error?: string;
  }> {
    const cacheKey = `user_${userId}`;
    const originalCache = this.cache.get(cacheKey);

    try {
      // 낙관적 업데이트 (UI 즉시 반영)
      if (originalCache?.userRecord) {
        const optimisticUpdate = {
          ...originalCache,
          userRecord: {
            ...originalCache.userRecord,
            ...updates,
            updated_at: new Date().toISOString(),
          },
          timestamp: Date.now(),
        };
        this.cache.set(cacheKey, optimisticUpdate);
      }

      // 실제 데이터베이스 업데이트
      const updateData: UserUpdate = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await safeUpdate(
        this.supabase,
        'users',
        updateData
      )
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        // 롤백
        if (originalCache) {
          this.cache.set(cacheKey, originalCache);
        }

        throw new AuthError(
          '프로필 업데이트 실패',
          'PROFILE_UPDATE_FAILED',
          error
        );
      }

      // 성공 시 최종 캐시 업데이트
      if (originalCache) {
        this.cache.set(cacheKey, {
          ...originalCache,
          userRecord: data,
          timestamp: Date.now(),
        });
      }

      this.logger.info('Profile updated successfully', {
        userId,
        updates: Object.keys(updates),
      });

      return {
        success: true,
        userRecord: data,
      };
    } catch (error) {
      // 롤백
      if (originalCache) {
        this.cache.set(cacheKey, originalCache);
      }

      this.logger.error('Profile update failed', error as Error, { userId });
      return {
        success: false,
        error: error instanceof Error ? error.message : '프로필 업데이트 실패',
      };
    }
  }

  /**
   * 네트워크 상태 확인
   */
  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  /**
   * 재시도 메커니즘
   */
  private async retryOperation<T>(
    operation: () => Promise<T>,
    operationName: string,
    maxRetries = this.MAX_RETRY_ATTEMPTS
  ): Promise<T> {
    let lastError: Error = new Error('Unknown error');

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 네트워크 상태 확인
        if (!this.isOnline()) {
          throw new AuthError('인터넷 연결을 확인해주세요', 'NETWORK_OFFLINE');
        }

        const result = await operation();

        // 첫 시도가 아닌 경우 복구 로그
        if (attempt > 1) {
          this.logger.info(
            `Operation ${operationName} recovered on attempt ${attempt}`
          );
        }

        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');

        this.logger.error(
          `Operation ${operationName} failed on attempt ${attempt}`,
          lastError,
          {
            attempt,
            maxRetries,
            willRetry: attempt < maxRetries,
          }
        );

        // 마지막 시도인 경우 에러 발생
        if (attempt === maxRetries) {
          break;
        }

        // 지수 백오프로 지연
        const delay = this.RETRY_DELAY * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new AuthError(
      `Operation ${operationName} failed after ${maxRetries} attempts`,
      'MAX_RETRIES_EXCEEDED',
      lastError
    );
  }

  /**
   * CSRF 보호를 위한 보안 상태 생성
   */
  private generateSecureState(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  /**
   * 캐시 관리
   */
  async invalidateUserCache(userId: string): Promise<void> {
    const cacheKey = `user_${userId}`;
    this.cache.delete(cacheKey);
  }

  private clearAllCaches(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  /**
   * 메트릭스 수집
   */
  getMetrics(): {
    cacheSize: number;
    pendingRequests: number;
    cacheHitRate: number;
  } {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      cacheHitRate: 0.95, // 실제 구현 시 추적 필요
    };
  }

  /**
   * 구조화된 로깅
   */
  private logger = {
    info: (event: string, data?: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.info(`[AUTH] ${event}`, data);
      }
      // 프로덕션에서는 외부 로깅 서비스로 전송
      this.sendToLoggingService('info', event, data);
    },

    error: (event: string, error: Error, data?: any) => {
      console.error(`[AUTH] ${event}`, {
        error: error.message,
        stack: error.stack,
        ...data,
      });
      // 에러 모니터링 서비스로 전송
      this.sendToErrorMonitoring(event, error, data);
    },
  };

  private sendToLoggingService(
    _level: string,
    _event: string,
    _data?: any
  ): void {
    // 실제 구현 시 Sentry, LogRocket, DataDog 등 연동
    if (process.env.NODE_ENV === 'production') {
      // 로깅 서비스 연동 코드
    }
  }

  private sendToErrorMonitoring(
    _event: string,
    _error: Error,
    _data?: any
  ): void {
    // 실제 구현 시 에러 모니터링 서비스 연동
    if (process.env.NODE_ENV === 'production') {
      // 에러 모니터링 서비스 연동 코드
    }
  }
}

/**
 * 커스텀 에러 클래스
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      originalError: this.originalError,
    };
  }
}

// 싱글톤 인스턴스
let enhancedAuthInstance: EnhancedKakaoAuthService | null = null;

export const getEnhancedKakaoAuthService = (): EnhancedKakaoAuthService => {
  if (!enhancedAuthInstance) {
    enhancedAuthInstance = new EnhancedKakaoAuthService();
  }
  return enhancedAuthInstance;
};
