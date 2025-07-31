/**
 * Environment utilities with validation
 */
import { z } from 'zod'

// Environment schema
const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().default('pk_test_development_key'),
  CLERK_SECRET_KEY: z.string().default('sk_test_development_secret'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  AIRTABLE_API_KEY: z.string().optional(),
  AIRTABLE_BASE_ID: z.string().optional(),
  CAL_API_KEY: z.string().optional(),
  CAL_WEBHOOK_SECRET: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  GOOGLE_TAG_MANAGER_ID: z.string().optional(),
  NAVER_ANALYTICS_ID: z.string().optional(),
  KAKAO_ANALYTICS_ID: z.string().optional(),
  ALPHA_VANTAGE_API_KEY: z.string().optional(),
  HUBSPOT_API_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  V0_API_KEY: z.string().optional(),
})

type Environment = z.infer<typeof environmentSchema>

class EnvironmentManager {
  private static instance: EnvironmentManager
  private environment: Environment | null = null
  private logger: any

  constructor() {
    // Initialize logger if available
    try {
      this.logger = require('./logger').Logger
    } catch {
      this.logger = console
    }
  }

  static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager()
    }
    return EnvironmentManager.instance
  }

  validateEnvironment(): Environment {
    try {
      const envData = {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
        CAL_API_KEY: process.env.CAL_API_KEY,
        CAL_WEBHOOK_SECRET: process.env.CAL_WEBHOOK_SECRET,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
        NAVER_ANALYTICS_ID: process.env.NAVER_ANALYTICS_ID,
        KAKAO_ANALYTICS_ID: process.env.KAKAO_ANALYTICS_ID,
        ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
        HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        SENTRY_DSN: process.env.SENTRY_DSN,
        V0_API_KEY: process.env.V0_API_KEY,
      }

      this.environment = environmentSchema.parse(envData)
      
      if (this.logger && this.logger.info) {
        this.logger.info('Environment validation successful', {
          component: 'EnvironmentManager',
          function: 'validateEnvironment',
          metadata: {
            nodeEnv: this.environment.NODE_ENV,
            hasClerkKeys: !!this.environment.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!this.environment.CLERK_SECRET_KEY,
            hasSupabaseKeys: !!this.environment.NEXT_PUBLIC_SUPABASE_URL && !!this.environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          }
        })
      }

      return this.environment
    } catch (error) {
      const errorMessage = error instanceof z.ZodError 
        ? `Environment validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
        : 'Environment validation failed with unknown error'

      if (this.logger && this.logger.error) {
        this.logger.error('Environment validation failed', {
          component: 'EnvironmentManager',
          function: 'validateEnvironment',
          metadata: {
            errorCount: error instanceof z.ZodError ? error.errors.length : 1,
            errors: error instanceof z.ZodError ? error.errors.map(e => e.path.join('.')) : ['unknown'],
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
            url: typeof window !== 'undefined' ? window.location.href : 'server',
          },
          error
        })
      }

      throw error
    }
  }

  getEnvironment(): Environment {
    if (!this.environment) {
      this.validateEnvironment()
    }
    return this.environment!
  }

  get(key: keyof Environment): string | undefined {
    const env = this.getEnvironment()
    return env[key] as string | undefined
  }
}

// Export singleton instance
export const environmentManager = EnvironmentManager.getInstance()

// Legacy functions for backward compatibility
export function getV0ApiKey(): string | null {
  const apiKey = environmentManager.get('V0_API_KEY')
  if (!apiKey || !apiKey.startsWith('v1:')) {
    return null
  }
  return apiKey
}

export function validateEnv() {
  try {
    const env = environmentManager.validateEnvironment()
    return {
      success: true,
      data: env,
      errors: [],
      warnings: []
    }
  } catch (error) {
    return {
      success: false,
      data: {},
      errors: error instanceof z.ZodError ? error.errors : [error],
      warnings: []
    }
  }
}

export function validateCriticalEnvVars(): boolean {
  try {
    environmentManager.validateEnvironment()
    return true
  } catch {
    return false
  }
}

export function initializeEnvironment(): boolean {
  try {
    environmentManager.validateEnvironment()
    return true
  } catch {
    return false
  }
}

// Export for direct use
export const validateEnvironment = () => environmentManager.validateEnvironment()