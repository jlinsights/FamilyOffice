/**
 * Sentry Client Configuration for FamilyOffice
 * 클라이언트사이드 에러 트래킹 및 성능 모니터링
 */
import * as Sentry from '@sentry/nextjs';

// Only initialize if DSN is provided
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // 환경 설정
  environment: process.env.NODE_ENV,
  
  // 성능 모니터링
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // 프로파일링 (성능 최적화)
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // 릴리즈 정보
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // 사용자 컨텍스트
  beforeSend(event) {
    // 민감한 정보 필터링
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.value?.includes('password') || error?.value?.includes('token')) {
        return null;
      }
    }
    
    // 한국 시간대 정보 추가
    if (event.contexts) {
      event.contexts.timezone = {
        name: 'Asia/Seoul',
        offset: '+09:00'
      };
    }
    
    return event;
  },
  
  // 통합 설정
  integrations: [
    // 성능 모니터링
    Sentry.browserTracingIntegration(),
    
    // 사용자 상호작용 추적
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // 에러 필터링
  ignoreErrors: [
    // 일반적인 브라우저 에러 무시
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Network request failed',
    'Load failed',
    'Script error',
    
    // 한국 웹 환경 특화 필터링
    'ChunkLoadError',
    'Loading chunk',
    'Loading CSS chunk',
  ],
  
  // 태그 설정
  initialScope: {
    tags: {
      component: 'client',
      market: 'korean',
      platform: 'familyoffice',
    },
  },
  });
}