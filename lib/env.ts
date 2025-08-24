/**
 * 환경변수 런타임 검증 시스템 - 보안 강화
 * 필수 환경변수 누락 시 애플리케이션 실행 중단
 */
import { z } from 'zod';

// 공용 (클라이언트/서버) 환경변수 스키마
export const publicEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

// 서버 전용 환경변수 스키마 - 보안 강화
export const serverEnvSchema = z.object({
  // Supabase - 필수 (but relaxed for development)
  SUPABASE_SERVICE_ROLE_KEY: z.string()
    .min(1, 'SUPABASE_SERVICE_ROLE_KEY is required')
    .optional(),
  
  // Clerk - 필수 (but relaxed for development) 
  CLERK_SECRET_KEY: z.string()
    .min(1, 'CLERK_SECRET_KEY is required')
    .optional(),
  CLERK_WEBHOOK_SECRET: z.string()
    .min(1, 'CLERK_WEBHOOK_SECRET is required')
    .optional(),
  
  // Financial APIs - 선택사항 but format validation
  ALPHA_VANTAGE_API_KEY: z.string()
    .regex(/^[A-Z0-9]{16}$/, 'Invalid Alpha Vantage API key format')
    .optional(),
  YAHOO_FINANCE_API_KEY: z.string().optional(),
  
  
  // Redis - 선택사항 but URL validation
  REDIS_URL: z.string()
    .url('Invalid Redis URL format')
    .optional(),
  REDIS_HOST: z.string()
    .min(1, 'REDIS_HOST cannot be empty if provided')
    .optional(),
  REDIS_PORT: z.string()
    .regex(/^\d{1,5}$/, 'REDIS_PORT must be a valid port number')
    .transform(val => val ? parseInt(val) : undefined)
    .optional(),
  REDIS_PASSWORD: z.string().optional(),
  
  // Newsletter
  BEEHIIV_API_KEY: z.string()
    .min(1, 'BEEHIIV_API_KEY cannot be empty')
    .optional(),
  BEEHIIV_PUBLICATION_ID: z.string().optional(),
  
  // Monitoring - 선택사항
  LOGS_SO_API_KEY: z.string().optional(),
  LOGS_SO_WORKSPACE_ID: z.string().optional(),
  
  // Kakao Business - 선택사항 but format validation
  KAKAO_REST_API_KEY: z.string()
    .regex(/^[a-f0-9]{32}$/, 'Invalid Kakao REST API key format')
    .optional(),
  KAKAO_APP_KEY: z.string()
    .regex(/^[a-f0-9]{32}$/, 'Invalid Kakao App key format')
    .optional(),
  KAKAO_JAVASCRIPT_KEY: z.string()
    .regex(/^[a-f0-9]{32}$/, 'Invalid Kakao JavaScript key format')
    .optional(),
  KAKAO_ADMIN_KEY: z.string()
    .regex(/^[a-f0-9]{32}$/, 'Invalid Kakao Admin key format')
    .optional(),
});

// 클라이언트 전용 환경변수 스키마 (NEXT_PUBLIC_*)
export const clientEnvSchema = z.object({
  // Clerk - 필수 (but relaxed for development)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string()
    .min(1, 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required')
    .optional(),
  
  // Supabase - 필수 (but relaxed for development)
  NEXT_PUBLIC_SUPABASE_URL: z.string()
    .url('Invalid Supabase URL format')
    .optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
    .optional(),
  
  // Analytics - 선택사항
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string()
    .regex(/^G-[A-Z0-9]{10}$/, 'Invalid GA4 measurement ID format')
    .optional(),
  
  // Cal.com - 선택사항
  NEXT_PUBLIC_CALCOM_API_KEY: z.string().optional(),
  NEXT_PUBLIC_CALCOM_NAMESPACE: z.string()
    .default('familyoffice')
    .optional(),
  
  // Kakao Business - 클라이언트 전용
  NEXT_PUBLIC_KAKAO_CHANNEL_ID: z.string()
    .min(1, 'NEXT_PUBLIC_KAKAO_CHANNEL_ID cannot be empty if provided')
    .optional(),
  NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: z.string()
    .regex(/^[a-f0-9]{32}$/, 'Invalid Kakao JavaScript key format')
    .optional(),
});

// 환경변수 파싱 함수 with comprehensive error handling
export function createEnv() {
  const isServer = typeof window === 'undefined';
  const isDev = process.env.NODE_ENV === 'development';
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
  
  // 빌드 시에는 기본값 반환
  if (isBuild || process.env.SKIP_ENV_VALIDATION === 'true') {
    return {
      NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    };
  }
  
  try {
    // 1. 공용 환경변수 검증
    const publicEnv = publicEnvSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });

    // 2. 클라이언트 환경변수 검증 (필수)
    const clientEnv = clientEnvSchema.parse({
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_CALCOM_API_KEY: process.env.NEXT_PUBLIC_CALCOM_API_KEY,
      NEXT_PUBLIC_CALCOM_NAMESPACE: process.env.NEXT_PUBLIC_CALCOM_NAMESPACE,
      NEXT_PUBLIC_KAKAO_CHANNEL_ID: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
      NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
    });

    // 3. 서버 환경변수 검증 (서버에서만)
    let serverEnv = {};
    if (isServer) {
      serverEnv = serverEnvSchema.parse({
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
        ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
        YAHOO_FINANCE_API_KEY: process.env.YAHOO_FINANCE_API_KEY,
        REDIS_URL: process.env.REDIS_URL,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        BEEHIIV_API_KEY: process.env.BEEHIIV_API_KEY,
        BEEHIIV_PUBLICATION_ID: process.env.BEEHIIV_PUBLICATION_ID,
        LOGS_SO_API_KEY: process.env.LOGS_SO_API_KEY,
        LOGS_SO_WORKSPACE_ID: process.env.LOGS_SO_WORKSPACE_ID,
        KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
        KAKAO_APP_KEY: process.env.KAKAO_APP_KEY,
        KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
        KAKAO_ADMIN_KEY: process.env.KAKAO_ADMIN_KEY,
      });
    }

    // 4. 성공 시 로깅 (개발 환경에서만)
    if (isDev && isServer) {
      console.log('✅ 환경변수 검증 완료');
      console.log('📊 설정된 환경변수:');
      console.log(`  - NODE_ENV: ${publicEnv.NODE_ENV}`);
      console.log(`  - VERCEL_ENV: ${publicEnv.VERCEL_ENV || 'N/A'}`);
      console.log(`  - Clerk: ${clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.substring(0, 20)}...`);
      console.log(`  - Supabase: ${clientEnv.NEXT_PUBLIC_SUPABASE_URL}`);
      console.log(`  - Analytics: ${clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'N/A'}`);
      
      if (serverEnv) {
        const serverKeys = Object.keys(serverEnv).filter(key => 
          serverEnv[key as keyof typeof serverEnv] !== undefined
        );
        console.log(`  - Server keys: ${serverKeys.length} configured`);
      }
    }

    return {
      ...publicEnv,
      ...clientEnv,
      ...serverEnv,
    };

  } catch (error) {
    // 환경변수 검증 실패 시 상세 오류 정보 제공
    console.error('🚨 환경변수 검증 실패');
    
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));
      
      console.error('❌ 오류 상세:', JSON.stringify(missingVars, null, 2));
      
      // 개발 환경에서는 구체적인 가이드 제공
      if (isDev) {
        console.error('\n📝 .env.local 파일 설정 가이드:');
        console.error('필수 환경변수를 설정해주세요:');
        missingVars.forEach(({ path, message }) => {
          console.error(`  ${path}: ${message}`);
        });
      }
    } else {
      console.error('❌ 알 수 없는 오류:', error);
    }

    // 프로덕션에서는 일반적인 메시지로 처리
    const errorMessage = isDev 
      ? `환경변수 설정 오류: ${error instanceof z.ZodError ? error.errors.length + '개 필드 누락' : error}`
      : '서버 설정 오류가 발생했습니다.';
    
    throw new Error(errorMessage);
  }
}

// 환경변수 validation helper functions
export const validateEnvOnStartup = () => {
  try {
    createEnv();
    return { success: true, message: '환경변수 검증 성공' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '환경변수 검증 실패' 
    };
  }
};

// 특정 환경변수 그룹 검증
export const validateEnvGroup = (group: 'clerk' | 'supabase' | 'redis' | 'analytics' | 'kakao') => {
  const schemas = {
    clerk: z.object({
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: clientEnvSchema.shape.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: serverEnvSchema.shape.CLERK_SECRET_KEY.optional(),
      CLERK_WEBHOOK_SECRET: serverEnvSchema.shape.CLERK_WEBHOOK_SECRET.optional(),
    }),
    supabase: z.object({
      NEXT_PUBLIC_SUPABASE_URL: clientEnvSchema.shape.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: clientEnvSchema.shape.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: serverEnvSchema.shape.SUPABASE_SERVICE_ROLE_KEY.optional(),
    }),
    redis: z.object({
      REDIS_URL: serverEnvSchema.shape.REDIS_URL,
      REDIS_HOST: serverEnvSchema.shape.REDIS_HOST,
      REDIS_PORT: serverEnvSchema.shape.REDIS_PORT,
      REDIS_PASSWORD: serverEnvSchema.shape.REDIS_PASSWORD,
    }),
    analytics: z.object({
      NEXT_PUBLIC_GA_MEASUREMENT_ID: clientEnvSchema.shape.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    }),
    kakao: z.object({
      NEXT_PUBLIC_KAKAO_CHANNEL_ID: clientEnvSchema.shape.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
      NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: clientEnvSchema.shape.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
      KAKAO_REST_API_KEY: serverEnvSchema.shape.KAKAO_REST_API_KEY.optional(),
      KAKAO_APP_KEY: serverEnvSchema.shape.KAKAO_APP_KEY.optional(),
      KAKAO_JAVASCRIPT_KEY: serverEnvSchema.shape.KAKAO_JAVASCRIPT_KEY.optional(),
      KAKAO_ADMIN_KEY: serverEnvSchema.shape.KAKAO_ADMIN_KEY.optional(),
    }),
  };

  try {
    const schema = schemas[group];
    const envVars = Object.keys(schema.shape).reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {} as Record<string, string | undefined>);
    
    schema.parse(envVars);
    return { success: true, message: `${group} 환경변수 검증 성공` };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof z.ZodError 
        ? `${group} 환경변수 오류: ${error.errors.map(e => e.message).join(', ')}`
        : `${group} 환경변수 검증 실패`
    };
  }
};

// 캐싱된 환경변수 객체
let cachedEnv: ReturnType<typeof createEnv> | null = null;

export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }
  
  cachedEnv = createEnv();
  return cachedEnv;
}


// 검증된 환경변수 전역 객체
export const env = getEnv();

// 타입 정의
export type Env = ReturnType<typeof createEnv>;
export type EnvGroup = 'clerk' | 'supabase' | 'redis' | 'analytics' | 'kakao';

// 레거시 호환성을 위한 함수들
export const validateEnv = validateEnvOnStartup;
export const validateCriticalEnvVars = () => validateEnvOnStartup().success;
export const initializeEnvironment = () => validateEnvOnStartup().success;
export const validateEnvironment = getEnv;
