/**
 * Minimal environment utilities
 */

export function getV0ApiKey(): string | null {
  const apiKey = process.env.V0_API_KEY
  if (!apiKey || !apiKey.startsWith('v1:')) {
    return null
  }
  return apiKey
}

export function validateEnv() {
  return {
    success: true,
    data: {},
    errors: [],
    warnings: []
  }
}

export function validateCriticalEnvVars(): boolean {
  return true
}

export function initializeEnvironment(): boolean {
  return true
}