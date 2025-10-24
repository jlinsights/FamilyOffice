/**
 * Sentry Edge Runtime Configuration for FamilyOffice
 * Edge Runtime용 에러 트래킹 및 성능 모니터링
 */
import * as Sentry from '@sentry/nextjs';

// Only initialize if DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  
  // 환경 설정
  environment: process.env.NODE_ENV,
  
  // Edge Runtime은 가벼운 구성 사용
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // 릴리즈 정보
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Edge Runtime용 최적화된 설정
  beforeSend(event) {
    // 민감한 정보 필터링
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
    }
    
    // 한국 시간대 정보 추가
    event.tags = {
      ...event.tags,
      runtime: 'edge',
      region: 'asia-northeast',
      market: 'korean',
    };
    
    return event;
  },
  
  // Edge Runtime 호환 통합만 사용
  integrations: [
    // 기본 통합만 사용 (Edge Runtime 제한사항)
  ],
  
  // 태그 설정
  initialScope: {
    tags: {
      component: 'edge',
      runtime: 'edge',
      market: 'korean',
      platform: 'familyoffice',
    },
  },
  
  // 에러 필터링
  ignoreErrors: [
    // Edge Runtime 관련
    'Function timeout',
    'Request timeout',
    'Memory limit exceeded',
    
    // 네트워크 관련
    'fetch failed',
    'connection reset',
  ],
  });
}