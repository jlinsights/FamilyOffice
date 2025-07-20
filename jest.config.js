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
    '<rootDir>/tests/setup/financial-mocks.js'
  ],
  
  // Module name mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/constants/(.*)$': '<rootDir>/constants/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
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
  
  // Coverage configuration - Enhanced for financial applications
  collectCoverage: true,
  collectCoverageFrom: [
    // Financial calculation modules (90%+ required)
    'lib/financial/**/*.{js,ts,jsx,tsx}',
    'lib/calculations/**/*.{js,ts,jsx,tsx}',
    'lib/portfolio/**/*.{js,ts,jsx,tsx}',
    'lib/tax/**/*.{js,ts,jsx,tsx}',
    'lib/reporting/**/*.{js,ts,jsx,tsx}',
    'lib/compliance/**/*.{js,ts,jsx,tsx}',
    
    // API routes (85%+ required)
    'app/api/**/*.{js,ts}',
    
    // Core application logic (80%+ required)
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'constants/**/*.{js,jsx,ts,tsx}',
    
    // Exclude files
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
  
  // Strict coverage thresholds for financial calculations
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    // Critical financial modules require 90%+ coverage
    'lib/financial/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'lib/calculations/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'lib/portfolio/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'lib/tax/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    // API routes
    'app/api/': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
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
    'node_modules/(?!(.*\\.mjs$|@radix-ui|lucide-react|recharts))',
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
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage/html-report',
        filename: 'test-report.html',
        expand: true,
        hideIcon: false,
        pageTitle: 'FamilyOffice Financial Test Report',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './coverage/junit',
        outputName: 'junit.xml',
        ancestorSeparator: ' › ',
        uniqueOutputName: 'false',
        suiteNameTemplate: '{filepath}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
  ],
  
  // Verbose output
  verbose: process.env.CI === 'true' || process.env.JEST_VERBOSE === 'true',
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  
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
