/**
 * Financial mocks and test utilities
 * Used across all financial-related tests
 */

// Mock financial API responses
global.mockFinancialData = {
  stockData: {
    symbol: '005930.KS',
    price: 71000,
    change: 1.5,
    changePercent: 2.15,
  },
  forexData: {
    from: 'USD',
    to: 'KRW',
    rate: 1305.50,
    change: -0.5,
  },
};

// Mock Redis client
global.mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
};

// Financial calculation precision helpers
global.roundToFinancialPrecision = (value, precision = 4) => {
  return Number(value.toFixed(precision));
};

global.roundToCurrency = (value, precision = 2) => {
  return Number(value.toFixed(precision));
};

// Mock environment variables for testing
process.env.TEST_MODE = 'true';
process.env.FINANCIAL_PRECISION = '4';
process.env.CURRENCY_PRECISION = '2';
