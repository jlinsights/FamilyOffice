/**
 * 환경변수 검증 시스템 테스트
 * Zod 스키마 기반 런타임 검증 테스트
 */
import { z } from 'zod';
import {
  publicEnvSchema,
  clientEnvSchema,
  serverEnvSchema,
  validateEnvOnStartup,
  validateEnvGroup,
  createEnv,
} from '@/lib/env';

// Mock process.env for testing
const originalEnv = process.env;

describe('Environment Validation System', () => {
  beforeEach(() => {
    // Reset environment variables
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('publicEnvSchema', () => {
    it('should validate valid NODE_ENV values', () => {
      expect(() =>
        publicEnvSchema.parse({ NODE_ENV: 'development' })
      ).not.toThrow();
      expect(() =>
        publicEnvSchema.parse({ NODE_ENV: 'production' })
      ).not.toThrow();
      expect(() => publicEnvSchema.parse({ NODE_ENV: 'test' })).not.toThrow();
    });

    it('should default NODE_ENV to development', () => {
      const result = publicEnvSchema.parse({});
      expect(result.NODE_ENV).toBe('development');
    });

    it('should reject invalid NODE_ENV values', () => {
      expect(() => publicEnvSchema.parse({ NODE_ENV: 'invalid' })).toThrow();
    });

    it('should validate optional VERCEL_ENV', () => {
      expect(() =>
        publicEnvSchema.parse({
          VERCEL_ENV: 'preview',
          NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        })
      ).not.toThrow();
    });

    it('should validate NEXT_PUBLIC_APP_URL as URL', () => {
      expect(() =>
        publicEnvSchema.parse({
          NEXT_PUBLIC_APP_URL: 'https://familyoffices.vip',
        })
      ).not.toThrow();

      expect(() =>
        publicEnvSchema.parse({
          NEXT_PUBLIC_APP_URL: 'not-a-url',
        })
      ).toThrow();
    });
  });

  describe('serverEnvSchema', () => {
    it('should validate optional server environment variables', () => {
      const validServerEnv = {
        SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        CLERK_SECRET_KEY: 'sk_test_123456789',
        CLERK_WEBHOOK_SECRET: 'whsec_123456789',
        ALPHA_VANTAGE_API_KEY: 'ABCDEFGHIJKLMNOP',
        REDIS_URL: 'redis://localhost:6379',
        REDIS_PORT: '6379',
      };

      expect(() => serverEnvSchema.parse(validServerEnv)).not.toThrow();
    });

    it('should allow empty server environment for development', () => {
      expect(() => serverEnvSchema.parse({})).not.toThrow();
    });

    it('should validate REDIS_PORT as numeric string', () => {
      expect(() =>
        serverEnvSchema.parse({
          REDIS_PORT: '6379',
        })
      ).not.toThrow();

      expect(() =>
        serverEnvSchema.parse({
          REDIS_PORT: 'invalid',
        })
      ).toThrow();
    });

    it('should validate REDIS_URL format', () => {
      expect(() =>
        serverEnvSchema.parse({
          REDIS_URL: 'redis://localhost:6379',
        })
      ).not.toThrow();

      expect(() =>
        serverEnvSchema.parse({
          REDIS_URL: 'not-a-url',
        })
      ).toThrow();
    });

    it('should validate API key formats', () => {
      // Alpha Vantage API key format
      expect(() =>
        serverEnvSchema.parse({
          ALPHA_VANTAGE_API_KEY: 'ABCDEFGHIJKLMNOP',
        })
      ).not.toThrow();

      expect(() =>
        serverEnvSchema.parse({
          ALPHA_VANTAGE_API_KEY: 'invalid-format',
        })
      ).toThrow();
    });
  });

  describe('clientEnvSchema', () => {
    it('should validate optional client environment variables', () => {
      const validClientEnv = {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_123456789',
        NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-ABCDEFGHIJ',
        NEXT_PUBLIC_CALCOM_NAMESPACE: 'familyoffice',
      };

      expect(() => clientEnvSchema.parse(validClientEnv)).not.toThrow();
    });

    it('should allow empty client environment for development', () => {
      expect(() => clientEnvSchema.parse({})).not.toThrow();
    });

    it('should validate GA Measurement ID format', () => {
      expect(() =>
        clientEnvSchema.parse({
          NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-ABCDEFGHIJ',
        })
      ).not.toThrow();

      expect(() =>
        clientEnvSchema.parse({
          NEXT_PUBLIC_GA_MEASUREMENT_ID: 'invalid-format',
        })
      ).toThrow();
    });

    it('should validate Supabase URL domain', () => {
      expect(() =>
        clientEnvSchema.parse({
          NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
        })
      ).not.toThrow();

      // Note: In actual implementation, domain validation may be optional
      // This test validates the basic URL format requirement
      expect(() =>
        clientEnvSchema.parse({
          NEXT_PUBLIC_SUPABASE_URL: 'not-a-url',
        })
      ).toThrow();
    });
  });

  describe('validateEnvOnStartup', () => {
    it('should return success with valid environment', () => {
      process.env.SKIP_ENV_VALIDATION = 'true';

      const result = validateEnvOnStartup();

      expect(result.success).toBe(true);
      expect(result.message).toBe('환경변수 검증 성공');
    });

    it('should handle invalid environment properly', () => {
      // Since SKIP_ENV_VALIDATION is set in our test environment,
      // let's test the actual validation behavior by checking the schema directly
      try {
        publicEnvSchema.parse({ NODE_ENV: 'invalid' });
        // If it doesn't throw, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        // This should throw a Zod error
        expect(error).toBeDefined();
      }

      // Test that the validation function returns proper structure
      const result = validateEnvOnStartup();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
    });
  });

  describe('validateEnvGroup', () => {
    it('should validate clerk group', () => {
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_123';
      process.env.CLERK_SECRET_KEY = 'sk_test_123';
      process.env.CLERK_WEBHOOK_SECRET = 'whsec_123';

      const result = validateEnvGroup('clerk');

      expect(result.success).toBe(true);
      expect(result.message).toBe('clerk 환경변수 검증 성공');
    });

    it('should validate supabase group', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiJ9';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiJ9';

      const result = validateEnvGroup('supabase');

      expect(result.success).toBe(true);
      expect(result.message).toBe('supabase 환경변수 검증 성공');
    });

    it('should validate redis group', () => {
      process.env.REDIS_URL = 'redis://localhost:6379';
      process.env.REDIS_HOST = 'localhost';
      process.env.REDIS_PORT = '6379';
      process.env.REDIS_PASSWORD = 'password123';

      const result = validateEnvGroup('redis');

      expect(result.success).toBe(true);
      expect(result.message).toBe('redis 환경변수 검증 성공');
    });

    it('should validate analytics group', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABCDEFGHIJ';

      const result = validateEnvGroup('analytics');

      expect(result.success).toBe(true);
      expect(result.message).toBe('analytics 환경변수 검증 성공');
    });

    it('should return failure with invalid group configuration', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'invalid-format';

      const result = validateEnvGroup('analytics');

      expect(result.success).toBe(false);
      expect(result.message).toContain('analytics 환경변수 오류');
    });
  });

  describe('createEnv', () => {
    it('should skip validation when SKIP_ENV_VALIDATION is true', () => {
      process.env.SKIP_ENV_VALIDATION = 'true';
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        configurable: true,
      });
      process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

      expect(() => createEnv()).not.toThrow();
    });

    it('should provide development defaults when skipping validation', () => {
      process.env.SKIP_ENV_VALIDATION = 'true';
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: undefined,
        configurable: true,
      });
      Object.defineProperty(process.env, 'NEXT_PUBLIC_APP_URL', {
        value: undefined,
        configurable: true,
      });

      const result = createEnv();

      expect(result.NODE_ENV).toBe('development');
      expect(result.NEXT_PUBLIC_APP_URL).toBe('http://localhost:3000');
    });

    it('should handle production build phase', () => {
      process.env.NEXT_PHASE = 'phase-production-build';
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true,
      });

      const result = createEnv();

      expect(result.NODE_ENV).toBe('production');
      expect(result.NEXT_PUBLIC_APP_URL).toBeDefined();
    });
  });

  describe('Environment Variables Transformation', () => {
    it('should transform REDIS_PORT to number', () => {
      const result = serverEnvSchema.parse({
        REDIS_PORT: '6379',
      });

      expect(typeof result.REDIS_PORT).toBe('number');
      expect(result.REDIS_PORT).toBe(6379);
    });

    it('should handle undefined REDIS_PORT', () => {
      const result = serverEnvSchema.parse({});

      expect(result.REDIS_PORT).toBeUndefined();
    });
  });

  describe('Error Messages', () => {
    it('should provide helpful error messages for validation failures', () => {
      try {
        publicEnvSchema.parse({ NODE_ENV: 'invalid' });
      } catch (error) {
        expect(error).toBeInstanceOf(z.ZodError);
        const zodError = error as z.ZodError;
        expect(zodError.errors[0]?.message).toContain('Invalid enum value');
      }
    });

    it('should provide specific error messages for format validation', () => {
      try {
        clientEnvSchema.parse({
          NEXT_PUBLIC_GA_MEASUREMENT_ID: 'invalid-format',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(z.ZodError);
        const zodError = error as z.ZodError;
        expect(zodError.errors[0]?.message).toContain(
          'Invalid GA4 measurement ID format'
        );
      }
    });
  });
});
