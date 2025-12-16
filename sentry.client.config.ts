/**
 * Sentry Client Configuration for FamilyOffice
 * 클라이언트사이드 에러 트래킹 및 성능 모니터링
 *
 * Note: Next.js replaces process.env.NEXT_PUBLIC_* at build time
 * We must reference them directly for static replacement
 */
import * as Sentry from '@sentry/nextjs';

// Environment variables - these are replaced at build time by Next.js
declare const process: {
  env: {
    NEXT_PUBLIC_SENTRY_DSN?: string;
    NODE_ENV?: string;
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?: string;
  };
};

// Only initialize if DSN is provided
// @ts-ignore - Next.js will replace this at build time
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,

  // 환경 설정
  // @ts-ignore - Next.js will replace this at build time
  environment: process.env.NODE_ENV || 'production',

  // 성능 모니터링 (개발/프로덕션 모두 10% 샘플링)
  tracesSampleRate: 0.1,

  // 프로파일링 (성능 최적화)
  profilesSampleRate: 0.1,

  // 릴리즈 정보 (Vercel 환경변수 사용)
  // @ts-ignore - Next.js will replace this at build time
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  
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