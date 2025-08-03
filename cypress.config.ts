/**
 * Cypress configuration for FamilyOffice E2E testing
 * Complete user workflow testing for financial application
 */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Base configuration
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Test execution settings
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,

    // Video and screenshot settings
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Test isolation
    testIsolation: true,

    // Browser settings
    chromeWebSecurity: false,
    modifyObstructiveCode: false,

    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Environment variables
    env: {
      // Test user credentials
      TEST_USER_EMAIL: 'test@familyoffice.com',
      TEST_USER_PASSWORD: 'TestPassword123!',
      TEST_ADMIN_EMAIL: 'admin@familyoffice.com',
      TEST_ADMIN_PASSWORD: 'AdminPassword123!',

      // API endpoints
      API_BASE_URL: 'http://localhost:3000/api',

      // Test data
      PORTFOLIO_VALUE_THRESHOLD: 1000000,
      MAX_PROCESSING_TIME: 30000,

      // Feature flags
      ENABLE_REAL_DATA: false,
      ENABLE_NOTIFICATIONS: true,
      ENABLE_AUDIT_LOGGING: true,
    },

    setupNodeEvents(on, config) {
      // Task definitions for financial scenarios
      on('task', {
        // Generate test portfolio data
        generatePortfolioData: (params: {
          userId: string;
          totalValue: number;
          positionCount: number;
        }) => {
          return {
            id: `portfolio-${params.userId}`,
            userId: params.userId,
            totalValue: params.totalValue,
            positions: Array.from({ length: params.positionCount }, (_, i) => ({
              symbol: ['AAPL', 'TSLA', '005930.KS', 'NAVER'][i % 4],
              shares: Math.floor(Math.random() * 1000) + 100,
              averagePrice: Math.floor(Math.random() * 200000) + 50000,
              currentPrice: Math.floor(Math.random() * 250000) + 60000,
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        },

        // Generate test transaction data
        generateTransactionData: (params: {
          portfolioId: string;
          transactionCount: number;
          dateRange: { start: string; end: string };
        }) => {
          const transactions = [];
          const startDate = new Date(params.dateRange.start);
          const endDate = new Date(params.dateRange.end);

          for (let i = 0; i < params.transactionCount; i++) {
            const randomDate = new Date(
              startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
            );

            transactions.push({
              id: `txn-${i + 1}`,
              portfolioId: params.portfolioId,
              type: ['BUY', 'SELL', 'DIVIDEND'][Math.floor(Math.random() * 3)],
              symbol: ['AAPL', 'TSLA', '005930.KS'][
                Math.floor(Math.random() * 3)
              ],
              shares: Math.floor(Math.random() * 500) + 10,
              price: Math.floor(Math.random() * 200000) + 50000,
              amount: Math.floor(Math.random() * 10000000) + 500000,
              fees: Math.floor(Math.random() * 50000) + 1000,
              date: randomDate.toISOString(),
              status: 'SETTLED',
            });
          }

          return transactions;
        },

        // Clean up test data
        cleanupTestData: (userId: string) => {
          // In real implementation, this would clean up test data from database
          console.log(`Cleaning up test data for user: ${userId}`);
          return { success: true };
        },

        // Wait for financial API response
        waitForApiResponse: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({ status: 'completed', timestamp: Date.now() });
            }, 1000);
          });
        },

        // Validate financial calculations
        validateCalculations: (data: {
          positions: any[];
          expectedTotalValue: number;
          tolerance: number;
        }) => {
          const calculatedValue = data.positions.reduce((total, position) => {
            return total + position.shares * position.currentPrice;
          }, 0);

          const difference = Math.abs(
            calculatedValue - data.expectedTotalValue
          );
          const isValid = difference <= data.tolerance;

          return {
            isValid,
            calculatedValue,
            expectedValue: data.expectedTotalValue,
            difference,
            tolerance: data.tolerance,
          };
        },
      });

      // Plugin configurations
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },

  // Global configuration
  includeShadowDom: true,
  numTestsKeptInMemory: 5,

  // Reporter configuration
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'cypress/reporter-config.json',
  },

  // Experimental features
  experimentalStudio: true,
  experimentalMemoryManagement: true,
});
