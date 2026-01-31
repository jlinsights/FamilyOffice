/**
 * Enhanced Environment Variable Validation
 * Strict validation for production environment
 */
import { z } from 'zod';

import { logger } from './debug-logger';

// Production-critical environment variables
const productionRequiredSchema = z.object({
  // Authentication (Clerk)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'Clerk publishable key required in production'),
  CLERK_SECRET_KEY: z
    .string()
    .min(1, 'Clerk secret key required in production'),
  CLERK_WEBHOOK_SECRET: z
    .string()
    .min(1, 'Clerk webhook secret required in production'),

  // Database (Supabase)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase anon key required'),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'Supabase service role key required'),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Development environment schema (more lenient)
const developmentSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

// Optional environment variables
const optionalSchema = z.object({
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]{10}$/, 'Invalid GA4 ID')
    .optional(),

  // Financial APIs
  ALPHA_VANTAGE_API_KEY: z
    .string()
    .regex(/^[A-Z0-9]+$/, 'Invalid Alpha Vantage key')
    .optional(),
  YAHOO_FINANCE_API_KEY: z.string().optional(),

  // Email & Communication
  RESEND_API_KEY: z.string().optional(),
  NEXT_PUBLIC_RESEND_FROM_EMAIL: z.string().email().optional(),
  BEEHIIV_API_KEY: z.string().optional(),
  BEEHIIV_PUBLICATION_ID: z.string().optional(),

  // Caching
  REDIS_URL: z.string().url().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_PASSWORD: z.string().optional(),

  // External Services
  HUBSPOT_API_KEY: z.string().optional(),
  NEXT_PUBLIC_CALCOM_API_KEY: z.string().optional(),
  LOGS_SO_API_KEY: z.string().optional(),
});

export function validateEnvironmentStrict() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  try {
    // Validate based on environment
    if (isProduction) {
      const result = productionRequiredSchema.safeParse(process.env);
      if (!result.success) {
        const errors = result.error.format();
        logger.error('❌ Production environment validation failed:', errors);

        // Show specific missing variables
        const missing = Object.entries(errors)
          .filter(([key]) => key !== '_errors')
          .map(
            ([key, value]: [string, any]) =>
              `${key}: ${value._errors.join(', ')}`
          )
          .join('\n');

        throw new Error(
          `Missing required production environment variables:\n${missing}\n` +
            `Please set these in your production environment.`
        );
      }

      logger.info('✅ Production environment validation passed');
      return true;
    }

    if (isDevelopment) {
      const result = developmentSchema.safeParse(process.env);
      if (!result.success) {
        logger.warn(
          '⚠️ Development environment validation warnings:',
          result.error.format()
        );
      } else {
        logger.info('✅ Development environment validation passed');
      }
      return true;
    }

    return true;
  } catch (error) {
    logger.error('Environment validation error:', error);
    return false;
  }
}

// Validate specific service groups
export function validateServiceGroup(
  group: 'auth' | 'database' | 'analytics' | 'financial'
) {
  const groups = {
    auth: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
      CLERK_SECRET_KEY: z.string(),
      CLERK_WEBHOOK_SECRET: z.string(),
    },
    database: {
      NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
      SUPABASE_SERVICE_ROLE_KEY: z.string(),
    },
    analytics: {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z
        .string()
        .regex(/^G-[A-Z0-9]{10}$/)
        .optional(),
    },
    financial: {
      ALPHA_VANTAGE_API_KEY: z.string().optional(),
      YAHOO_FINANCE_API_KEY: z.string().optional(),
    },
  };

  const schema = z.object(groups[group]);
  const result = schema.safeParse(process.env);

  if (!result.success) {
    logger.warn(
      `⚠️ ${group} service validation warnings:`,
      result.error.format()
    );
    return { success: false, errors: result.error.format() };
  }

  logger.info(`✅ ${group} service validation passed`);
  return { success: true };
}

// Export enhanced validation function
export { validateEnvironmentStrict as validateEnv };
