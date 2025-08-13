/**
 * 환경변수 검증 및 관리 유틸리티
 */

import { z } from 'zod'

// 환경변수 스키마 정의
const envSchema = z.object({
  // App 설정
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // Clerk 인증
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  
  // v0 API
  V0_API_KEY: z.string().optional(),
  
  // Analytics (선택사항)
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  
  // Cal.com (선택사항)
  NEXT_PUBLIC_CALCOM_NAMESPACE: z.string().optional(),
  CALCOM_API_KEY: z.string().optional(),
  
  // Supabase (선택사항)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
})

// 환경변수 검증 함수
export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    return { success: true, data: env }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      )
      return {
        success: false,
        error: `환경변수 검증 실패:\n${errorMessages.join('\n')}`
      }
    }
    return {
      success: false,
      error: '알 수 없는 환경변수 검증 오류가 발생했습니다.'
    }
  }
}

// 안전한 환경변수 접근 함수
export function getEnvVar(key: keyof z.infer<typeof envSchema>, fallback?: string): string {
  const value = process.env[key]
  
  if (!value) {
    if (fallback !== undefined) {
      return fallback
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Environment variable ${key} is not defined`)
    }
    
    return ''
  }
  
  return value
}

// v0 API key 전용 함수
export function getV0ApiKey(): string | null {
  const apiKey = process.env.V0_API_KEY
  
  if (!apiKey) {
    console.warn('⚠️ V0_API_KEY가 설정되지 않았습니다.')
    return null
  }
  
  // v0 API key 형식 검증 (v1:로 시작하는지 확인)
  if (!apiKey.startsWith('v1:')) {
    console.error('❌ V0_API_KEY 형식이 올바르지 않습니다. v1:로 시작해야 합니다.')
    return null
  }
  
  return apiKey
}

// 중요한 환경변수만 검증하는 함수 (최소 요구사항)
export function validateCriticalEnvVars(): boolean {
  const critical = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_APP_URL'
  ]
  
  return critical.every(key => {
    const value = process.env[key]
    return value && value.length > 0
  })
}

// 개발 환경에서 환경변수 상태 확인
export function checkEnvStatus() {
  if (process.env.NODE_ENV !== 'development') return
  
  console.log('🔍 환경변수 상태 확인:')
  console.log('✅ NODE_ENV:', process.env.NODE_ENV)
  console.log('✅ NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL ? '설정됨' : '❌ 누락')
  console.log('✅ CLERK Keys:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY ? '설정됨' : '❌ 누락')
  console.log('✅ V0_API_KEY:', process.env.V0_API_KEY ? '설정됨' : '❌ 누락')
  
  const validation = validateEnv()
  if (!validation.success) {
    console.error('❌ 환경변수 검증 실패:', validation.error)
  } else {
    console.log('✅ 모든 필수 환경변수가 올바르게 설정되었습니다.')
  }
} 