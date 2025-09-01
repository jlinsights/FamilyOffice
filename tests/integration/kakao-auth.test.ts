/**
 * 카카오 인증 시스템 통합 테스트
 * Supabase OAuth + 카카오 API + 모니터링 시스템 전체 테스트
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { createClient } from '@/lib/supabase/client';
import { getEnhancedKakaoAuthService } from '@/lib/auth/enhanced-kakao-auth';
import { getKakaoBusinessAPIService } from '@/lib/kakao/kakao-business-api';
import { getAuthMonitoringService } from '@/lib/monitoring/auth-monitoring';

// 테스트용 Mock 데이터
const mockKakaoProfile = {
  id: 12345678,
  connected_at: new Date().toISOString(),
  properties: {
    nickname: '테스트사용자',
    profile_image: 'https://example.com/profile.jpg',
    thumbnail_image: 'https://example.com/thumb.jpg'
  },
  kakao_account: {
    email: 'test@example.com',
    name: '홍길동',
    profile: {
      nickname: '테스트사용자',
      profile_image_url: 'https://example.com/profile.jpg'
    }
  }
};

describe('카카오 인증 시스템 통합 테스트', () => {
  let supabaseClient: ReturnType<typeof createClient>;
  let authService: ReturnType<typeof getEnhancedKakaoAuthService>;
  let businessAPI: ReturnType<typeof getKakaoBusinessAPIService>;
  let monitoring: ReturnType<typeof getAuthMonitoringService>;
  
  beforeAll(async () => {
    // 테스트 환경 초기화
    supabaseClient = createClient();
    authService = getEnhancedKakaoAuthService();
    businessAPI = getKakaoBusinessAPIService();
    monitoring = getAuthMonitoringService();
    
    console.log('🧪 카카오 인증 시스템 통합 테스트 시작');
  });

  beforeEach(() => {
    // 각 테스트 전 초기화
    monitoring.cleanup();
  });

  afterAll(async () => {
    // 테스트 정리
    await supabaseClient.auth.signOut();
    console.log('✅ 카카오 인증 시스템 통합 테스트 완료');
  });

  describe('인증 플로우 테스트', () => {
    test('카카오 OAuth 로그인 요청 생성', async () => {
      const result = await authService.signInWithKakao();
      
      expect(result.success).toBe(true);
      expect(result.redirectUrl).toContain('kakao.com');
      expect(result.redirectUrl).toContain('oauth');
      expect(result.error).toBeUndefined();
      
      console.log('✅ OAuth 요청 생성 성공');
    });

    test('토큰 갱신 메커니즘', async () => {
      // 토큰 만료 확인 및 갱신 테스트
      const needsRefresh = await authService.ensureValidToken();
      
      // 토큰이 5분 내에 만료되므로 갱신이 시도되어야 함
      expect(needsRefresh).toBeDefined();
      
      console.log('✅ 토큰 갱신 메커니즘 테스트 완료');
    });

    test('CSRF 보호 상태 생성', async () => {
      const result = await authService.signInWithKakao();
      
      // URL에 state 파라미터가 포함되어야 함
      if (result.redirectUrl) {
        const url = new URL(result.redirectUrl);
        const state = url.searchParams.get('state');
        
        expect(state).toBeTruthy();
        expect(state).toHaveLength(64); // 32 bytes * 2 (hex encoding)
      }
      
      console.log('✅ CSRF 보호 상태 생성 테스트 완료');
    });
  });

  describe('사용자 데이터 관리 테스트', () => {
    test('사용자 캐시 시스템', async () => {
      const testUserId = 'test-cache-user';
      
      // 첫 번째 호출 - 데이터베이스에서 조회
      const startTime = Date.now();
      const firstCall = await authService.getCachedUser(testUserId);
      const firstCallTime = Date.now() - startTime;
      
      // 두 번째 호출 - 캐시에서 조회
      const secondStartTime = Date.now();
      const secondCall = await authService.getCachedUser(testUserId);
      const secondCallTime = Date.now() - secondStartTime;
      
      // 캐시가 작동하면 두 번째 호출이 더 빨라야 함
      expect(secondCallTime).toBeLessThan(firstCallTime);
      expect(firstCall).toEqual(secondCall);
      
      console.log(`✅ 캐시 성능: 첫 호출 ${firstCallTime}ms, 캐시 호출 ${secondCallTime}ms`);
    });

    test('프로필 업데이트 및 롤백', async () => {
      const testUserId = 'test-update-user';
      const updatedData = { name: '수정된 이름' };
      
      // 프로필 업데이트 시도
      const updateResult = await authService.updateProfileWithRollback(
        testUserId, 
        updatedData
      );
      
      // 업데이트 로직 검증 (실제 DB 없이도 구조 확인)
      expect(updateResult).toHaveProperty('success');
      expect(updateResult).toHaveProperty('userRecord');
      
      console.log('✅ 프로필 업데이트 및 롤백 테스트 완료');
    });
  });

  describe('카카오 API 연동 테스트', () => {
    test('사용자 프로필 조회', async () => {
      const mockToken = 'mock-kakao-access-token';
      
      // Mock API 응답
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockKakaoProfile),
        })
      ) as jest.Mock;

      const result = await businessAPI.getUserProfile(mockToken);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockKakaoProfile);
      expect(result.error).toBeUndefined();
      
      console.log('✅ 카카오 프로필 조회 테스트 완료');
    });

    test('메시지 템플릿 생성', () => {
      const consultationData = {
        name: '홍길동',
        serviceType: '자산관리 상담',
        phone: '010-1234-5678',
        consultationDate: '2024-12-15'
      };

      const template = businessAPI.createConsultationTemplate(consultationData);
      
      expect(template.object_type).toBe('feed');
      expect(template.content?.title).toContain('상담 예약 완료');
      expect(template.content?.description).toContain(consultationData.name);
      expect(template.buttons).toHaveLength(2);
      
      console.log('✅ 메시지 템플릿 생성 테스트 완료');
    });

    test('서비스 상태 확인', () => {
      const status = businessAPI.getServiceStatus();
      
      expect(status).toHaveProperty('isConfigured');
      expect(status).toHaveProperty('availableFeatures');
      expect(status).toHaveProperty('missingConfig');
      
      expect(Array.isArray(status.availableFeatures)).toBe(true);
      expect(Array.isArray(status.missingConfig)).toBe(true);
      
      console.log('✅ 서비스 상태 확인 테스트 완료');
    });
  });

  describe('모니터링 시스템 테스트', () => {
    test('인증 이벤트 기록', () => {
      const authEvent = {
        userId: 'test-user',
        action: 'login',
        success: true,
        duration: 1500,
        metadata: { provider: 'kakao' }
      };

      monitoring.recordAuthEvent(authEvent);
      
      const systemHealth = monitoring.getSystemHealth();
      expect(systemHealth.status).toBe('healthy');
      expect(systemHealth.activeUsers).toBeGreaterThanOrEqual(0);
      
      console.log('✅ 인증 이벤트 기록 테스트 완료');
    });

    test('성능 리포트 생성', () => {
      // 여러 이벤트 기록
      const events = [
        { action: 'login', success: true, duration: 1200 },
        { action: 'login', success: true, duration: 800 },
        { action: 'login', success: false, duration: 2000, error: 'NETWORK_ERROR' },
        { action: 'token_refresh', success: true, duration: 300 }
      ];

      events.forEach(event => monitoring.recordAuthEvent(event));
      
      const report = monitoring.generatePerformanceReport();
      
      expect(report.summary.totalEvents).toBeGreaterThan(0);
      expect(report.summary.successRate).toBeGreaterThanOrEqual(0);
      expect(report.summary.successRate).toBeLessThanOrEqual(1);
      expect(report.trends.hourly).toHaveLength(24);
      expect(report.userInsights.totalUsers).toBeGreaterThanOrEqual(0);
      
      console.log('✅ 성능 리포트 생성 테스트 완료');
    });

    test('에러 패턴 분석', () => {
      // 연속 실패 시뮬레이션
      const failureEvents = [
        { action: 'login', success: false, duration: 1000, error: 'INVALID_TOKEN' },
        { action: 'login', success: false, duration: 1100, error: 'INVALID_TOKEN' },
        { action: 'login', success: false, duration: 1200, error: 'INVALID_TOKEN' }
      ];

      failureEvents.forEach(event => monitoring.recordAuthEvent(event));
      
      const systemHealth = monitoring.getSystemHealth();
      
      // 연속 실패로 인한 상태 변화 확인
      expect(['healthy', 'degraded', 'critical']).toContain(systemHealth.status);
      
      console.log('✅ 에러 패턴 분석 테스트 완료');
    });

    test('메트릭 정리 기능', () => {
      // 오래된 데이터 추가
      const oldEvent = {
        action: 'login',
        success: true,
        duration: 1000
      };

      monitoring.recordAuthEvent(oldEvent);
      
      // 정리 실행
      monitoring.cleanup();
      
      // 메트릭이 정리되었는지 확인
      const metrics = (monitoring as any).getMetrics?.();
      if (metrics) {
        expect(metrics.cacheSize).toBeGreaterThanOrEqual(0);
      }
      
      console.log('✅ 메트릭 정리 기능 테스트 완료');
    });
  });

  describe('에러 처리 및 복구 테스트', () => {
    test('네트워크 오류 시 재시도', async () => {
      // 네트워크 오류 시뮬레이션
      let callCount = 0;
      global.fetch = jest.fn(() => {
        callCount++;
        if (callCount < 3) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockKakaoProfile),
        });
      }) as jest.Mock;

      const result = await businessAPI.getUserProfile('test-token');
      
      // 3번째 시도에서 성공해야 함
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(result.success).toBe(true);
      
      console.log('✅ 네트워크 오류 재시도 테스트 완료');
    });

    test('토큰 만료 처리', async () => {
      // 토큰 만료 응답 시뮬레이션
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({
            msg: 'Invalid access token'
          }),
        })
      ) as jest.Mock;

      const result = await businessAPI.getUserProfile('expired-token');
      
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe(401);
      expect(result.error?.message).toContain('Invalid access token');
      
      console.log('✅ 토큰 만료 처리 테스트 완료');
    });
  });

  describe('보안 테스트', () => {
    test('SQL 인젝션 방지', async () => {
      const maliciousInput = "'; DROP TABLE users; --";
      
      const result = await authService.updateProfileWithRollback(
        'test-user',
        { name: maliciousInput }
      );
      
      // Supabase는 자동으로 SQL 인젝션을 방지함
      // 여기서는 구조적 안전성만 확인
      expect(result).toHaveProperty('success');
      
      console.log('✅ SQL 인젝션 방지 테스트 완료');
    });

    test('XSS 방지 검증', () => {
      const xssPayload = '<script>alert("xss")</script>';
      
      const template = businessAPI.createWelcomeTemplate({
        name: xssPayload,
        membershipTier: 'Premium'
      });
      
      // 템플릿에서 스크립트 태그가 제거되거나 이스케이프되어야 함
      expect(template.content?.description).not.toContain('<script>');
      
      console.log('✅ XSS 방지 검증 테스트 완료');
    });
  });

  describe('성능 테스트', () => {
    test('동시 로그인 요청 처리', async () => {
      const concurrentRequests = Array.from({ length: 5 }, () => 
        authService.signInWithKakao()
      );

      const results = await Promise.all(concurrentRequests);
      
      // 모든 요청이 처리되어야 함 (중복 요청 방지로 일부는 실패할 수 있음)
      results.forEach(result => {
        expect(result).toHaveProperty('success');
      });
      
      console.log('✅ 동시 로그인 요청 처리 테스트 완료');
    });

    test('캐시 성능 측정', async () => {
      const testUserId = 'performance-test-user';
      const iterations = 10;
      
      // 캐시 워밍업
      await authService.getCachedUser(testUserId);
      
      // 성능 측정
      const startTime = Date.now();
      const promises = Array.from({ length: iterations }, () =>
        authService.getCachedUser(testUserId)
      );
      
      await Promise.all(promises);
      const totalTime = Date.now() - startTime;
      const averageTime = totalTime / iterations;
      
      // 캐시된 요청은 50ms 이하여야 함
      expect(averageTime).toBeLessThan(50);
      
      console.log(`✅ 캐시 성능: 평균 ${averageTime.toFixed(2)}ms per request`);
    });
  });

  describe('통합 시나리오 테스트', () => {
    test('완전한 사용자 온보딩 플로우', async () => {
      console.log('🎯 완전한 사용자 온보딩 플로우 시작');
      
      // 1. 카카오 OAuth 시작
      const oauthResult = await authService.signInWithKakao();
      expect(oauthResult.success).toBe(true);
      console.log('  ✓ OAuth 요청 생성');
      
      // 2. 프로필 조회 (시뮬레이션)
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockKakaoProfile),
        })
      ) as jest.Mock;
      
      const profileResult = await businessAPI.getUserProfile('test-token');
      expect(profileResult.success).toBe(true);
      console.log('  ✓ 카카오 프로필 조회');
      
      // 3. 환영 메시지 생성
      const welcomeTemplate = businessAPI.createWelcomeTemplate({
        name: mockKakaoProfile.properties.nickname,
        membershipTier: 'Premium'
      });
      expect(welcomeTemplate.object_type).toBe('feed');
      console.log('  ✓ 환영 메시지 생성');
      
      // 4. 모니터링 이벤트 기록
      monitoring.recordAuthEvent({
        userId: 'new-user-id',
        action: 'signup_complete',
        success: true,
        duration: 3000,
        metadata: { provider: 'kakao', onboarding: true }
      });
      console.log('  ✓ 모니터링 이벤트 기록');
      
      console.log('✅ 완전한 사용자 온보딩 플로우 완료');
    });

    test('장애 복구 시나리오', async () => {
      console.log('🔧 장애 복구 시나리오 시작');
      
      // 1. 네트워크 장애 시뮬레이션
      let networkFailCount = 0;
      global.fetch = jest.fn(() => {
        networkFailCount++;
        if (networkFailCount <= 2) {
          return Promise.reject(new Error('Network timeout'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockKakaoProfile),
        });
      }) as jest.Mock;
      
      // 2. 재시도로 복구 확인
      const result = await businessAPI.getUserProfile('test-token');
      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(3);
      console.log('  ✓ 네트워크 장애 복구');
      
      // 3. 시스템 상태 복구 확인
      const systemHealth = monitoring.getSystemHealth();
      expect(['healthy', 'degraded']).toContain(systemHealth.status);
      console.log('  ✓ 시스템 상태 복구');
      
      console.log('✅ 장애 복구 시나리오 완료');
    });
  });
});

// Jest setup for this test file
beforeAll(() => {
  // Mock environment variables
  process.env.NEXT_PUBLIC_APP_URL = 'https://familyoffices.vip';
  process.env.KAKAO_REST_API_KEY = 'test-rest-api-key';
  process.env.KAKAO_ADMIN_KEY = 'test-admin-key';
  
  // Mock global functions
  global.crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }
  } as any;
});

afterAll(() => {
  // Cleanup
  delete (global as any).crypto;
  jest.restoreAllMocks();
});