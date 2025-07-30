/**
 * 환경변수 검증 및 관리 유틸리티 - 중앙화된 환경변수 관리 서비스
 */

import { z } from 'zod'
import { logger } from './logger'

// 환경변수 카테고리별 스키마 정의
const coreAppSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url('유효하지 않은 앱 URL'),
  PORT: z.string().regex(/^\d+$/).optional().default('3000'),
})

const authenticationSchema = z.object({
  // Clerk 인증 (필수)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Clerk 공개 키가 필요합니다'),
  CLERK_SECRET_KEY: z.string().min(1, 'Clerk 비밀 키가 필요합니다'),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
})

const databaseSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('유효하지 않은 Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
})

const redisSchema = z.object({
  // Redis 캐시
  REDIS_URL: z.string().url('유효하지 않은 Redis URL').optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().regex(/^\d+$/, '포트는 숫자여야 합니다').optional(),
  REDIS_PASSWORD: z.string().optional(),
  
  // Upstash Redis (Rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url('유효하지 않은 Upstash Redis URL').optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
})

const externalApisSchema = z.object({
  // v0 API
  V0_API_KEY: z.string().regex(/^v1:/, 'V0 API 키는 v1:로 시작해야 합니다').optional(),
  
  // Financial Data APIs
  ALPHA_VANTAGE_API_KEY: z.string().min(1).optional(),
  YAHOO_FINANCE_API_KEY: z.string().min(1).optional(),
  
  // Cal.com
  NEXT_PUBLIC_CALCOM_NAMESPACE: z.string().optional(),
  CALCOM_API_KEY: z.string().optional(),
})

const analyticsSchema = z.object({
  // Analytics
  NEXT_PUBLIC_GTM_ID: z.string().regex(/^GTM-/, 'GTM ID는 GTM-로 시작해야 합니다').optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().regex(/^G-/, 'GA4 ID는 G-로 시작해야 합니다').optional(),
})

const monitoringSchema = z.object({
  // Monitoring & Logging
  SENTRY_DSN: z.string().url('유효하지 않은 Sentry DSN').optional(),
  DATADOG_API_KEY: z.string().optional(),
  DATADOG_APP_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'critical']).default('info'),
})

const securitySchema = z.object({
  // Security
  JWT_SECRET: z.string().min(32, 'JWT Secret은 최소 32자 이상이어야 합니다').optional(),
  ENCRYPTION_KEY: z.string().length(32, '암호화 키는 정확히 32자여야 합니다').optional(),
  API_RATE_LIMIT: z.string().regex(/^\d+$/).optional().default('100'),
})

// 통합 환경변수 스키마
const envSchema = coreAppSchema
  .merge(authenticationSchema)
  .merge(databaseSchema)
  .merge(redisSchema)
  .merge(externalApisSchema)
  .merge(analyticsSchema)
  .merge(monitoringSchema)
  .merge(securitySchema)

// 환경변수 타입 정의
export type EnvVars = z.infer<typeof envSchema>

// 환경변수 검증 결과 타입
interface ValidationResult {
  success: boolean
  data?: EnvVars
  errors?: Array<{
    field: string
    message: string
    category: string
    severity: 'error' | 'warning'
  }>
  warnings?: Array<{
    field: string
    message: string
    category: string
  }>
}

// 중앙화된 환경변수 관리 클래스
export class EnvironmentManager {
  private static instance: EnvironmentManager
  private validatedEnv: EnvVars | null = null
  private validationPerformed = false
  
  private constructor() {}
  
  static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager()
    }
    return EnvironmentManager.instance
  }
  
  // 환경변수 전체 검증
  validateEnvironment(): ValidationResult {
    if (this.validationPerformed && this.validatedEnv) {
      return { success: true, data: this.validatedEnv }
    }
    
    try {
      const env = envSchema.parse(process.env)
      this.validatedEnv = env
      this.validationPerformed = true
      
      const warnings = this.checkWarnings(env)
      
      logger.info('Environment validation completed successfully', {
        component: 'EnvironmentManager',
        function: 'validateEnvironment',
        warningCount: warnings.length
      })
      
      return { 
        success: true, 
        data: env,
        warnings 
      }
    } catch (error) {
      this.validationPerformed = true
      
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          category: this.getCategoryForField(err.path[0] as string),
          severity: this.getSeverityForField(err.path[0] as string) as 'error' | 'warning'
        }))
        
        logger.error('Environment validation failed', error, {
          component: 'EnvironmentManager',
          function: 'validateEnvironment',
          errorCount: errors.length,
          errors: errors.map(e => e.field)
        })
        
        return {
          success: false,
          errors
        }
      }
      
      logger.critical('Unknown environment validation error', error as Error, {
        component: 'EnvironmentManager',
        function: 'validateEnvironment'
      })
      
      return {
        success: false,
        errors: [{
          field: 'unknown',
          message: '알 수 없는 환경변수 검증 오류가 발생했습니다.',
          category: 'system',
          severity: 'error'
        }]
      }
    }
  }
  
  // 카테고리별 검증
  validateCategory(category: 'core' | 'auth' | 'database' | 'redis' | 'apis' | 'analytics' | 'monitoring' | 'security'): ValidationResult {
    const schemaMap = {
      core: coreAppSchema,
      auth: authenticationSchema,
      database: databaseSchema,
      redis: redisSchema,
      apis: externalApisSchema,
      analytics: analyticsSchema,
      monitoring: monitoringSchema,
      security: securitySchema
    }
    
    try {
      const schema = schemaMap[category]
      const env = schema.parse(process.env)
      
      logger.debug(`Environment category validation successful: ${category}`, {
        component: 'EnvironmentManager',
        function: 'validateCategory',
        category
      })
      
      return { success: true, data: env as EnvVars }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          category,
          severity: 'error' as const
        }))
        
        logger.warn(`Environment category validation failed: ${category}`, {
          component: 'EnvironmentManager',
          function: 'validateCategory',
          category,
          errorCount: errors.length
        })
        
        return { success: false, errors }
      }
      
      return {
        success: false,
        errors: [{
          field: 'unknown',
          message: `Unknown error in ${category} validation`,
          category,
          severity: 'error'
        }]
      }
    }
  }
  
  // 안전한 환경변수 접근
  getEnvVar<K extends keyof EnvVars>(key: K, options?: { 
    fallback?: string 
    required?: boolean
    validate?: boolean
  }): EnvVars[K] | string {
    const { fallback, required = false, validate = true } = options || {}
    
    if (validate && !this.validationPerformed) {
      this.validateEnvironment()
    }
    
    const value = this.validatedEnv?.[key] ?? process.env[key as string]
    
    if (!value || value === '') {
      if (required) {
        const error = new Error(`Required environment variable ${String(key)} is missing`)
        logger.critical('Required environment variable missing', error, {
          component: 'EnvironmentManager',
          function: 'getEnvVar',
          key: String(key)
        })
        throw error
      }
      
      if (fallback !== undefined) {
        logger.debug(`Using fallback value for ${String(key)}`, {
          component: 'EnvironmentManager',
          function: 'getEnvVar',
          key: String(key)
        })
        return fallback
      }
      
      logger.warn(`Environment variable ${String(key)} is not defined`, {
        component: 'EnvironmentManager',
        function: 'getEnvVar',
        key: String(key)
      })
      
      return '' as EnvVars[K]
    }
    
    return value
  }
  
  // 환경변수 상태 확인
  getEnvironmentStatus(): {
    isValid: boolean
    environment: string
    core: { configured: number; total: number }
    optional: { configured: number; total: number }
    errors: number
    warnings: number
  } {
    const validation = this.validateEnvironment()
    
    if (!validation.success) {
      return {
        isValid: false,
        environment: process.env.NODE_ENV || 'unknown',
        core: { configured: 0, total: 0 },
        optional: { configured: 0, total: 0 },
        errors: validation.errors?.length || 0,
        warnings: 0
      }
    }
    
    const coreFields = ['NODE_ENV', 'NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY']
    const allFields = Object.keys(envSchema.shape)
    const configuredCore = coreFields.filter(field => process.env[field]).length
    const configuredOptional = allFields.filter(field => 
      !coreFields.includes(field) && process.env[field]
    ).length
    
    return {
      isValid: true,
      environment: validation.data?.NODE_ENV || 'development',
      core: { configured: configuredCore, total: coreFields.length },
      optional: { configured: configuredOptional, total: allFields.length - coreFields.length },
      errors: 0,
      warnings: validation.warnings?.length || 0
    }
  }
  
  // 런타임 검증 (중요 환경변수)
  validateCriticalAtRuntime(): boolean {
    const criticalVars = [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'NEXT_PUBLIC_APP_URL'
    ]
    
    const missing = criticalVars.filter(varName => !process.env[varName])
    
    if (missing.length > 0) {
      logger.critical('Critical environment variables missing at runtime', undefined, {
        component: 'EnvironmentManager',
        function: 'validateCriticalAtRuntime',
        missingVars: missing
      })
      return false
    }
    
    logger.info('Critical environment variables validated at runtime', {
      component: 'EnvironmentManager',
      function: 'validateCriticalAtRuntime'
    })
    
    return true
  }
  
  private checkWarnings(env: EnvVars): Array<{ field: string; message: string; category: string }> {
    const warnings: Array<{ field: string; message: string; category: string }> = []
    
    // Development 환경에서 프로덕션 기능 경고
    if (env.NODE_ENV === 'development') {
      if (!env.SENTRY_DSN) {
        warnings.push({
          field: 'SENTRY_DSN',
          message: '개발 환경에서 Sentry 설정을 권장합니다',
          category: 'monitoring'
        })
      }
      
      if (!env.REDIS_URL && !env.REDIS_HOST) {
        warnings.push({
          field: 'REDIS_URL',
          message: '캐싱 성능을 위해 Redis 설정을 권장합니다',
          category: 'redis'
        })
      }
    }
    
    // Production 환경에서 보안 경고
    if (env.NODE_ENV === 'production') {
      if (!env.JWT_SECRET) {
        warnings.push({
          field: 'JWT_SECRET',
          message: '프로덕션 환경에서 JWT Secret 설정이 필요합니다',
          category: 'security'
        })
      }
      
      if (!env.SENTRY_DSN) {
        warnings.push({
          field: 'SENTRY_DSN',
          message: '프로덕션 모니터링을 위해 Sentry 설정이 필요합니다',
          category: 'monitoring'
        })
      }
    }
    
    return warnings
  }
  
  private getCategoryForField(field: string): string {
    if (['NODE_ENV', 'NEXT_PUBLIC_APP_URL', 'PORT'].includes(field)) return 'core'
    if (['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY', 'CLERK_WEBHOOK_SECRET'].includes(field)) return 'auth'
    if (['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'].includes(field)) return 'database'
    if (['REDIS_URL', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'].includes(field)) return 'redis'
    if (['V0_API_KEY', 'ALPHA_VANTAGE_API_KEY', 'YAHOO_FINANCE_API_KEY', 'CALCOM_API_KEY'].includes(field)) return 'apis'
    if (['NEXT_PUBLIC_GTM_ID', 'NEXT_PUBLIC_GA_MEASUREMENT_ID'].includes(field)) return 'analytics'
    if (['SENTRY_DSN', 'DATADOG_API_KEY', 'DATADOG_APP_KEY', 'LOG_LEVEL'].includes(field)) return 'monitoring'
    if (['JWT_SECRET', 'ENCRYPTION_KEY', 'API_RATE_LIMIT'].includes(field)) return 'security'
    return 'unknown'
  }
  
  private getSeverityForField(field: string): 'error' | 'warning' {
    const criticalFields = [
      'NODE_ENV',
      'NEXT_PUBLIC_APP_URL',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY'
    ]
    
    return criticalFields.includes(field) ? 'error' : 'warning'
  }
}

// 기존 함수들을 새로운 클래스 사용하도록 업데이트
const envManager = EnvironmentManager.getInstance()

export function validateEnv(): ValidationResult {
  return envManager.validateEnvironment()
}

// 편의 함수들 - 새로운 EnvironmentManager 사용
export function getEnvVar<K extends keyof EnvVars>(
  key: K, 
  fallback?: string
): EnvVars[K] | string {
  return envManager.getEnvVar(key, { fallback })
}

// v0 API key 전용 함수 - 개선된 검증
export function getV0ApiKey(): string | null {
  try {
    const apiKey = envManager.getEnvVar('V0_API_KEY')
    
    if (!apiKey) {
      logger.warn('V0_API_KEY가 설정되지 않음', {
        component: 'env',
        function: 'getV0ApiKey'
      })
      return null
    }
    
    // v0 API key 형식 검증 (v1:로 시작하는지 확인)
    if (!apiKey.startsWith('v1:')) {
      logger.error('V0_API_KEY 형식이 올바르지 않음 - v1:로 시작해야 함', undefined, {
        component: 'env',
        function: 'getV0ApiKey'
      })
      return null
    }
    
    return apiKey
  } catch (error) {
    logger.error('V0_API_KEY 접근 중 오류', error as Error, {
      component: 'env',
      function: 'getV0ApiKey'
    })
    return null
  }
}

// 환경변수 상태 확인 - 개선된 버전
export function checkEnvStatus(): void {
  const status = envManager.getEnvironmentStatus()
  
  logger.info('Environment status check', {
    component: 'env',
    function: 'checkEnvStatus',
    environment: status.environment,
    isValid: status.isValid,
    coreConfigured: `${status.core.configured}/${status.core.total}`,
    optionalConfigured: `${status.optional.configured}/${status.optional.total}`,
    errors: status.errors,
    warnings: status.warnings
  })
  
  if (!status.isValid) {
    logger.error('Environment validation failed', undefined, {
      component: 'env',
      function: 'checkEnvStatus',
      errors: status.errors
    })
  }
}

// 카테고리별 검증 함수들
export function validateAuth() {
  return envManager.validateCategory('auth')
}

export function validateRedis() {
  return envManager.validateCategory('redis')
}

export function validateDatabase() {
  return envManager.validateCategory('database')
}

export function validateMonitoring() {
  return envManager.validateCategory('monitoring')
}

export function validateSecurity() {
  return envManager.validateCategory('security')
}

// 런타임 검증 함수
export function validateCriticalEnvVars(): boolean {
  return envManager.validateCriticalAtRuntime()
}

// 초기화 함수 - 앱 시작시 호출
export function initializeEnvironment(): boolean {
  logger.info('Initializing environment validation', {
    component: 'env',
    function: 'initializeEnvironment'
  })
  
  const validation = validateEnv()
  
  if (!validation.success) {
    logger.critical('Environment initialization failed', undefined, {
      component: 'env',
      function: 'initializeEnvironment',
      errors: validation.errors?.map(e => `${e.field}: ${e.message}`)
    })
    return false
  }
  
  if (validation.warnings && validation.warnings.length > 0) {
    validation.warnings.forEach(warning => {
      logger.warn(`Environment warning: ${warning.message}`, {
        component: 'env',
        function: 'initializeEnvironment',
        field: warning.field,
        category: warning.category
      })
    })
  }
  
  logger.info('Environment validation completed successfully', {
    component: 'env',
    function: 'initializeEnvironment',
    warningCount: validation.warnings?.length || 0
  })
  
  return true
}

// Export the manager instance for advanced usage
export { envManager as EnvironmentManager }

// Export environment types
export type { EnvVars, ValidationResult } 