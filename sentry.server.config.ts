/**
 * Sentry Server Configuration for FamilyOffice
 * 서버사이드 에러 트래킹 및 성능 모니터링
 */
import * as Sentry from '@sentry/nextjs';

// Only initialize if DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  
  // 환경 설정
  environment: process.env.NODE_ENV,
  
  // 성능 모니터링 (서버는 더 높은 샘플링 가능)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.5 : 1.0,
  
  // 프로파일링
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.5 : 1.0,
  
  // 릴리즈 정보
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // 서버 컨텍스트 설정
  beforeSend(event) {
    // API 키나 민감한 정보 필터링
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
    }
    
    // 환경변수 정보 제거
    if (event.contexts?.runtime?.node) {
      delete event.contexts.runtime.node;
    }
    
    // 한국 시간대 및 지역 정보 추가
    event.tags = {
      ...event.tags,
      region: 'asia-northeast',
      market: 'korean',
      server: 'vercel',
    };
    
    return event;
  },
  
  // 통합 설정
  integrations: [
    // HTTP 요청 추적
    Sentry.httpIntegration(),
  ],
  
  // 에러 필터링
  ignoreErrors: [
    // Next.js 관련 에러
    'ECONNRESET',
    'EPIPE',
    'ECONNREFUSED',
    
    // 일반적인 네트워크 에러
    'socket hang up',
    'connect ETIMEDOUT',
    
    // 한국 시간대 관련
    'Invalid time zone',
    'Invalid date string',
  ],
  
  // 태그 설정
  initialScope: {
    tags: {
      component: 'server',
      market: 'korean',
      platform: 'familyoffice',
      runtime: 'nodejs',
    },
  },
  
  });
}