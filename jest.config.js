/**
 * Jest configuration for FamilyOffice financial application testing
 * Targeting 90%+ coverage for critical financial calculations
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  // Test environment
  testEnvironment: 'jest-environment-jsdom',

  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/tests/setup/financial-mocks.js',
  ],

  // TypeScript configuration
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/constants/(.*)$': '<rootDir>/constants/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    // Mock ESM modules that cause issues
    '^uncrypto$': '<rootDir>/tests/mocks/uncrypto.js',
    '^nanoid$': '<rootDir>/tests/mocks/nanoid.js',
  },

  // Test directories
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
  ],

  // Coverage configuration — 모듈별 differential (familyoffice-jest-coverage-threshold-cleanup, 2026-05-30)
  // 기준선: baseline floor − 1pp buffer (큰 회귀 >1pp 만 차단, prettier 등 노이즈 흡수)
  collectCoverage: true,
  collectCoverageFrom: [
    // Keep + threshold (실 coverage 양호, 회귀 가드 가치 큼)
    'lib/calculations/**/*.{ts,tsx}',
    'lib/payments/**/*.{ts,tsx}',
    'lib/security/csrf.ts',

    // Keep + no threshold (CLAUDE.md "금융 모듈 90%+" TODO, 별 사이클 familyoffice-financial-test-coverage 예정)
    // 매 측정마다 0% 가 surface → 별 사이클 진입 신호
    'lib/financial/**/*.{ts,tsx}',

    // Exclude 영구 (UI/페이지/픽스처 — Playwright e2e 가 담당, jest 측정 부적합)
    '!**/*.d.ts',
    '!**/*.config.{js,ts}',
    '!**/*.stories.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/layout.tsx',
    '!**/globals.css',
  ],

  // 회귀 가드 — 모듈별 differential 만 유지 (global threshold 제거)
  coverageThreshold: {
    // 파일 단위 (critical asset 회귀 방지)
    'lib/security/csrf.ts': {
      statements: 90,
      branches: 95,
      functions: 100,
      lines: 95,
    },

    // 디렉토리 단위 (baseline floor − 1pp buffer)
    'lib/calculations/': {
      statements: 97,
      branches: 89,
      functions: 100,
      lines: 98,
    },
    'lib/payments/': {
      statements: 93,
      branches: 87,
      functions: 100,
      lines: 95,
    },

    // NOTE: lib/financial/ 는 의도적으로 임계값 미설정.
    // collectCoverageFrom 에는 포함되어 매 측정마다 0% 가 보고됨 (가시성).
    // 별 사이클 familyoffice-financial-test-coverage 에서 임계값 부여 예정.
    // CLAUDE.md "테스트 전략 — 금융 모듈 90%+" 와 연동.
  },

  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
    'json-summary',
    'cobertura', // For CI/CD
  ],

  // Coverage directory
  coverageDirectory: '<rootDir>/coverage',

  // Clear mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Test timeout for complex financial calculations
  testTimeout: 30000,

  // Transform configuration
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@radix-ui|lucide-react|recharts|uncrypto|@upstash/redis|ioredis))',
  ],

  // Globals for financial testing
  globals: {
    'ts-jest': {
      useESM: true,
    },
    // Financial precision settings
    FINANCIAL_PRECISION: 4,
    CURRENCY_PRECISION: 2,
    PERCENTAGE_PRECISION: 4,
    TEST_MODE: true,
  },

  // Test reporters
  reporters: ['default'],

  // Verbose output
  verbose: process.env.CI === 'true' || process.env.JEST_VERBOSE === 'true',

  // Error handling
  errorOnDeprecated: true,
  bail: false, // Continue running tests even if some fail

  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },

  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>'],
};

module.exports = createJestConfig(customJestConfig);
