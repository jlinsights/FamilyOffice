/**
 * Playwright Configuration for FamilyOffice
 * Advanced E2E testing setup for financial platform
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory structure
  testDir: './tests/e2e',
  
  // Global test configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }],
  ],
  
  // Global test settings
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:3000',
    
    // Browser context settings
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Projects for different browsers and scenarios
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing for responsive design
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // Financial platform specific scenarios
    {
      name: 'financial-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Simulate high-end user setup
        deviceScaleFactor: 1,
        hasTouch: false,
        isMobile: false,
      },
    },

    {
      name: 'financial-mobile',
      use: {
        ...devices['iPhone 13 Pro'],
        // CEO mobile usage scenario
        viewport: { width: 390, height: 844 },
      },
    },
  ],

  // Development server
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Test execution settings
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // Global setup and teardown
  globalSetup: require.resolve('./tests/e2e/global-setup.ts'),
  globalTeardown: require.resolve('./tests/e2e/global-teardown.ts'),

  // Output directories
  outputDir: 'test-results/',
  
  // Test match patterns
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts',
    '**/*.e2e.ts'
  ],
  
  // Test ignore patterns
  testIgnore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/cypress/**', // Ignore Cypress tests during migration
  ],

  // Metadata
  metadata: {
    project: 'FamilyOffice',
    version: '0.1.1',
    environment: process.env.NODE_ENV || 'development',
    author: 'FamilyOffice Development Team',
  },
});