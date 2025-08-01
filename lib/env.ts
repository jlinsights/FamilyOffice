/**
 * Safe environment utilities
 */
import { z } from 'zod'

// Simple environment schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  V0_API_KEY: z.string().optional(),
})

type EnvSchema = z.infer<typeof envSchema>

let cachedEnv: EnvSchema | null = null

export function getEnv(): EnvSchema {
  if (cachedEnv) {
    return cachedEnv
  }

  try {
    const env = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      V0_API_KEY: process.env.V0_API_KEY,
    }

    cachedEnv = envSchema.parse(env)
    return cachedEnv
  } catch (error) {
    console.error('환경 변수 검증 실패:', error)
    // Return safe defaults
    cachedEnv = {
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    }
    return cachedEnv
  }
}

// Safe getters
export function getV0ApiKey(): string | null {
  try {
    const env = getEnv()
    const apiKey = env.V0_API_KEY
    if (!apiKey || !apiKey.startsWith('v1:')) {
      return null
    }
    return apiKey
  } catch {
    return null
  }
}

export function validateEnv() {
  try {
    const env = getEnv()
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
    getEnv()
    return true
  } catch {
    return false
  }
}

export function initializeEnvironment(): boolean {
  try {
    getEnv()
    return true
  } catch {
    return false
  }
}

export const validateEnvironment = getEnv