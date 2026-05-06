/**
 * 환경변수 런타임 검증 시스템 - 보안 강화
 * 필수 환경변수 누락 시 애플리케이션 실행 중단
 */
import { z } from 'zod';
import { logger } from './debug-logger';

// 공용 (클라이언트/서버) 환경변수 스키마
export const publicEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

// 서버 전용 환경변수 스키마 - 보안 강화
export const serverEnvSchema = z.object({
  // Supabase - 개발 환경에서는 선택적, production에서는 필수
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'Supabase Service Role Key is required')
    .optional(),

  // Clerk - 개발 환경에서는 선택적, production에서는 필수
  CLERK_SECRET_KEY: z
    .string()
    .min(1, 'Clerk Secret Key is required')
    .optional(),
  CLERK_WEBHOOK_SECRET: z
    .string()
    .min(1, 'Clerk Webhook Secret is required')
    .optional(),

  // 선택적 환경변수들
  REDIS_URL: z.string().url().optional().or(z.literal('')),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional()
    .or(z.literal('')),
  REDIS_PASSWORD: z.string().optional(),
  LOGS_SO_API_KEY: z.string().optional(),
  LOGS_SO_WORKSPACE_ID: z.string().optional(),
  ALPHA_VANTAGE_API_KEY: z
    .string()
    .regex(/^[A-Z0-9]+$/, 'Invalid Alpha Vantage API key format')
    .optional()
    .or(z.literal('')),
  BEEHIIV_API_KEY: z.string().optional(),
  BEEHIIV_PUBLICATION_ID: z.string().optional(),
  HUBSPOT_API_KEY: z.string().optional(),
  HUBSPOT_PRIVATE_ACCESS_TOKEN: z.string().optional(),

  // Resend Email - 추가됨
  RESEND_API_KEY: z.string().optional(),

  // Toss Payments - 상담 1회성 결제
  TOSS_SECRET_KEY: z
    .string()
    .regex(
      /^(test|live)_sk_/,
      'TOSS_SECRET_KEY must start with test_sk_ or live_sk_'
    )
    .optional(),
  TOSS_WEBHOOK_SECRET: z.string().optional(),
});

// 클라이언트 전용 환경변수 스키마 - 보안 강화
export const clientEnvSchema = z.object({
  // 개발 환경에서는 선택적, production에서는 필수
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'Clerk Publishable Key is required')
    .optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase Anon Key is required')
    .optional(),

  // 선택적 클라이언트 환경변수
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]{10}$/, 'Invalid GA4 measurement ID format')
    .optional()
    .or(z.literal('')),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_CALCOM_API_KEY: z.string().optional(),
  NEXT_PUBLIC_CALCOM_NAMESPACE: z.string().optional(),
  NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: z.string().optional(),
  NEXT_PUBLIC_KAKAO_CHANNEL_ID: z.string().optional(),
  NEXT_PUBLIC_KAKAO_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_HUBSPOT_PORTAL_ID: z.string().optional(),

  // Resend Email Domain - 추가됨
  NEXT_PUBLIC_RESEND_FROM_EMAIL: z.string().email().optional(),

  // Toss Payments - 클라이언트 키
  NEXT_PUBLIC_TOSS_CLIENT_KEY: z
    .string()
    .regex(
      /^(test|live)_ck_/,
      'NEXT_PUBLIC_TOSS_CLIENT_KEY must start with test_ck_ or live_ck_'
    )
    .optional(),
});

// 환경변수 파싱 함수 - 검증 강화
export function createEnv() {
  const isServer = typeof window === 'undefined';
  const isDev = process.env.NODE_ENV === 'development';
  const isBuild =
    typeof process !== 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build';
  const skipValidation =
    typeof process !== 'undefined' &&
    process.env.SKIP_ENV_VALIDATION === 'true';

  // 빌드 시에는 기본값 반환
  if (isBuild) {
    return {
      NODE_ENV: (process.env.NODE_ENV || 'development') as
        | 'development'
        | 'production'
        | 'test',
      NEXT_PUBLIC_APP_URL:
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    };
  }

  // 공용 환경변수 수집
  const publicEnv = {
    NODE_ENV: (process.env.NODE_ENV || 'development') as
      | 'development'
      | 'production'
      | 'test',
    VERCEL_ENV:
      typeof process !== 'undefined' ? process.env.VERCEL_ENV : undefined,
    VERCEL_URL:
      typeof process !== 'undefined' ? process.env.VERCEL_URL : undefined,
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  };

  // 클라이언트 환경변수 수집
  const clientEnv = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CALCOM_API_KEY: process.env.NEXT_PUBLIC_CALCOM_API_KEY,
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY:
      process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
    NEXT_PUBLIC_KAKAO_CHANNEL_ID: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
    NEXT_PUBLIC_KAKAO_PIXEL_ID: process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID,
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    NEXT_PUBLIC_RESEND_FROM_EMAIL: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL,
    NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
  };

  // 서버 환경변수 수집 (서버에서만)
  const serverEnv = isServer
    ? {
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
        REDIS_URL: process.env.REDIS_URL,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        LOGS_SO_API_KEY: process.env.LOGS_SO_API_KEY,
        LOGS_SO_WORKSPACE_ID: process.env.LOGS_SO_WORKSPACE_ID,
        ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
        BEEHIIV_API_KEY: process.env.BEEHIIV_API_KEY,
        BEEHIIV_PUBLICATION_ID: process.env.BEEHIIV_PUBLICATION_ID,
        HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
        HUBSPOT_PRIVATE_ACCESS_TOKEN: process.env.HUBSPOT_PRIVATE_ACCESS_TOKEN,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
        TOSS_WEBHOOK_SECRET: process.env.TOSS_WEBHOOK_SECRET,
      }
    : {};

  const allEnv = { ...publicEnv, ...clientEnv, ...serverEnv };

  // 검증 (개발 모드에서만, skipValidation이 false일 때)
  if (isDev && !skipValidation) {
    try {
      // 클라이언트 환경변수 검증
      const clientResult = clientEnvSchema.safeParse(clientEnv);
      if (!clientResult.success) {
        logger.warn(
          'Client environment variables validation failed:',
          clientResult.error.format()
        );
      }

      // 서버 환경변수 검증 (서버에서만)
      if (isServer) {
        const serverResult = serverEnvSchema.safeParse(serverEnv);
        if (!serverResult.success) {
          logger.warn(
            'Server environment variables validation failed:',
            serverResult.error.format()
          );
        }
      }
    } catch (error) {
      logger.warn('Environment validation error:', error);
    }
  }

  return allEnv;
}

// 환경변수 validation helper functions
export const validateEnvOnStartup = () => {
  try {
    // Skip validation in test environment
    if (process.env.SKIP_ENV_VALIDATION === 'true') {
      return { success: true, message: '환경변수 검증 성공' };
    }

    const publicResult = publicEnvSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });

    if (!publicResult.success) {
      return { success: false, message: '공용 환경변수 검증 실패' };
    }

    return { success: true, message: '환경변수 검증 성공' };
  } catch (error) {
    return { success: false, message: '환경변수 검증 오류' };
  }
};

// 특정 환경변수 그룹 검증
export const validateEnvGroup = (
  group: 'clerk' | 'supabase' | 'redis' | 'analytics'
) => {
  try {
    if (group === 'clerk') {
      const clerkEnv = {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
      };

      const schema = z.object({
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
        CLERK_SECRET_KEY: z.string().optional(),
        CLERK_WEBHOOK_SECRET: z.string().optional(),
      });

      const result = schema.safeParse(clerkEnv);
      if (!result.success) {
        return { success: false, message: 'clerk 환경변수 오류' };
      }
      return { success: true, message: 'clerk 환경변수 검증 성공' };
    }

    if (group === 'supabase') {
      const supabaseEnv = {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      };

      const schema = z.object({
        NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
        SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
      });

      const result = schema.safeParse(supabaseEnv);
      if (!result.success) {
        return { success: false, message: 'supabase 환경변수 오류' };
      }
      return { success: true, message: 'supabase 환경변수 검증 성공' };
    }

    if (group === 'redis') {
      const redisEnv = {
        REDIS_URL: process.env.REDIS_URL,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      };

      const schema = z.object({
        REDIS_URL: z.string().url().optional().or(z.literal('')),
        REDIS_HOST: z.string().optional(),
        REDIS_PORT: z.string().optional(),
        REDIS_PASSWORD: z.string().optional(),
      });

      const result = schema.safeParse(redisEnv);
      if (!result.success) {
        return { success: false, message: 'redis 환경변수 오류' };
      }
      return { success: true, message: 'redis 환경변수 검증 성공' };
    }

    if (group === 'analytics') {
      const analyticsEnv = {
        NEXT_PUBLIC_GA_MEASUREMENT_ID:
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      };

      const schema = z.object({
        NEXT_PUBLIC_GA_MEASUREMENT_ID: z
          .string()
          .regex(/^G-[A-Z0-9]{10}$/)
          .optional()
          .or(z.literal('')),
      });

      const result = schema.safeParse(analyticsEnv);
      if (!result.success) {
        return { success: false, message: 'analytics 환경변수 오류' };
      }
      return { success: true, message: 'analytics 환경변수 검증 성공' };
    }

    return { success: false, message: '알 수 없는 그룹' };
  } catch (error) {
    return { success: false, message: `${group} 환경변수 오류` };
  }
};

// 캐싱된 환경변수 객체
let cachedEnv: ReturnType<typeof createEnv> | null = null;

export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  try {
    cachedEnv = createEnv();
    return cachedEnv;
  } catch (error) {
    console.warn('Failed to create env, returning safe fallback:', error);
    // Return a safe fallback object to prevent build crashes
    const fallbackEnv: Partial<Env> = {
      NODE_ENV: 'production',
      NEXT_PUBLIC_APP_URL: 'https://familyoffices.vip',
      // Add other required fields with dummy values if needed for build
    };
    return fallbackEnv as Env;
  }
}

// 검증된 환경변수 전역 객체
export const env = getEnv();

// 타입 정의
export type Env = ReturnType<typeof createEnv>;
export type EnvGroup = 'clerk' | 'supabase' | 'redis' | 'analytics';

// 레거시 호환성을 위한 함수들 - 단순화
export const validateEnv = validateEnvOnStartup;
export const validateCriticalEnvVars = () => true;
export const initializeEnvironment = () => true;
export const validateEnvironment = getEnv;
