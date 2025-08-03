/**
 * Financial testing mocks and setup
 * Provides realistic financial data scenarios for testing
 */

// Mock realistic financial data
export const MOCK_STOCK_DATA = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.52,
    change: 2.45,
    changePercent: 1.36,
    volume: 45234567,
    marketCap: 2856789000000,
    pe: 28.5,
    dividend: 0.94,
    high52w: 199.62,
    low52w: 144.25,
    beta: 1.28,
    eps: 6.42,
    currency: 'USD',
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.87,
    change: -8.23,
    changePercent: -3.2,
    volume: 67890123,
    marketCap: 789234000000,
    pe: 62.3,
    dividend: 0,
    high52w: 384.29,
    low52w: 152.37,
    beta: 2.09,
    eps: 3.99,
    currency: 'USD',
  },
  '005930.KS': {
    symbol: '005930.KS',
    name: '삼성전자',
    price: 73800,
    change: 1200,
    changePercent: 1.65,
    volume: 8934567,
    marketCap: 441789000000000,
    pe: 18.7,
    dividend: 1416,
    high52w: 89400,
    low52w: 68900,
    beta: 1.12,
    eps: 3946,
    currency: 'KRW',
  },
  '035420.KS': {
    symbol: '035420.KS',
    name: 'NAVER',
    price: 186500,
    change: -2500,
    changePercent: -1.32,
    volume: 456789,
    marketCap: 30567800000000,
    pe: 25.4,
    dividend: 0,
    high52w: 245000,
    low52w: 156000,
    beta: 1.45,
    eps: 7340,
    currency: 'KRW',
  },
};

export const MOCK_FOREX_DATA = {
  'USD/KRW': {
    from: 'USD',
    to: 'KRW',
    rate: 1325.5,
    change: 8.25,
    changePercent: 0.63,
    timestamp: Date.now(),
  },
  'EUR/KRW': {
    from: 'EUR',
    to: 'KRW',
    rate: 1438.75,
    change: -5.3,
    changePercent: -0.37,
    timestamp: Date.now(),
  },
  'JPY/KRW': {
    from: 'JPY',
    to: 'KRW',
    rate: 8.89,
    change: 0.12,
    changePercent: 1.37,
    timestamp: Date.now(),
  },
};

export const MOCK_PORTFOLIO_DATA = {
  id: 'portfolio-001',
  name: 'Conservative Growth Portfolio',
  totalValue: 125000000, // 1.25억 KRW
  cash: 15000000,
  investments: 110000000,
  currency: 'KRW',
  positions: [
    {
      symbol: '005930.KS',
      name: '삼성전자',
      shares: 1000,
      averagePrice: 72000,
      currentPrice: 73800,
      marketValue: 73800000,
      unrealizedGain: 1800000,
      unrealizedGainPercent: 2.5,
      weight: 59.04,
    },
    {
      symbol: '035420.KS',
      name: 'NAVER',
      shares: 100,
      averagePrice: 195000,
      currentPrice: 186500,
      marketValue: 18650000,
      unrealizedGain: -850000,
      unrealizedGainPercent: -4.36,
      weight: 14.92,
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      averagePrice: 175.25,
      currentPrice: 182.52,
      marketValue: 12076100, // USD to KRW converted
      unrealizedGain: 480475,
      unrealizedGainPercent: 4.15,
      weight: 9.66,
    },
  ],
  performance: {
    totalReturn: 12500000,
    totalReturnPercent: 11.11,
    dayChange: 850000,
    dayChangePercent: 0.68,
    ytdReturn: 8750000,
    ytdReturnPercent: 7.78,
  },
  allocation: {
    stocks: 88.0,
    cash: 12.0,
    bonds: 0.0,
    alternatives: 0.0,
  },
  lastUpdated: new Date().toISOString(),
};

export const MOCK_TRANSACTION_DATA = [
  {
    id: 'txn-001',
    portfolioId: 'portfolio-001',
    type: 'BUY',
    symbol: '005930.KS',
    shares: 500,
    price: 71500,
    amount: 35750000,
    fees: 35750,
    currency: 'KRW',
    date: '2024-01-15T09:30:00Z',
    status: 'SETTLED',
  },
  {
    id: 'txn-002',
    portfolioId: 'portfolio-001',
    type: 'SELL',
    symbol: '035420.KS',
    shares: 25,
    price: 202000,
    amount: 5050000,
    fees: 5050,
    currency: 'KRW',
    date: '2024-01-20T14:15:00Z',
    status: 'SETTLED',
  },
  {
    id: 'txn-003',
    portfolioId: 'portfolio-001',
    type: 'DIVIDEND',
    symbol: '005930.KS',
    shares: 1000,
    price: 354,
    amount: 354000,
    fees: 0,
    currency: 'KRW',
    date: '2024-03-15T00:00:00Z',
    status: 'SETTLED',
  },
];

export const MOCK_TAX_DATA = {
  year: 2024,
  portfolioId: 'portfolio-001',
  capitalGains: {
    shortTerm: 2500000,
    longTerm: 8750000,
    total: 11250000,
  },
  dividends: {
    domestic: 1416000,
    foreign: 156750,
    total: 1572750,
  },
  taxLiability: {
    capitalGainsTax: 1687500, // 15% on capital gains
    dividendTax: 235913, // 15% on dividends
    totalTax: 1923413,
  },
  deductions: {
    tradingFees: 125000,
    managementFees: 450000,
    total: 575000,
  },
  netTaxableIncome: 12247750,
};

export const MOCK_MARKET_DATA = {
  indices: {
    KOSPI: {
      name: 'KOSPI',
      value: 2645.32,
      change: 15.67,
      changePercent: 0.6,
    },
    KOSDAQ: {
      name: 'KOSDAQ',
      value: 852.45,
      change: -3.21,
      changePercent: -0.38,
    },
    'S&P500': {
      name: 'S&P 500',
      value: 4567.23,
      change: 12.45,
      changePercent: 0.27,
    },
    NASDAQ: {
      name: 'NASDAQ',
      value: 14234.56,
      change: -25.67,
      changePercent: -0.18,
    },
  },
  sectors: {
    Technology: { return: 15.6, weight: 32.5 },
    Financial: { return: 8.9, weight: 18.7 },
    Healthcare: { return: 12.3, weight: 14.2 },
    Consumer: { return: 6.7, weight: 12.8 },
    Industrial: { return: 9.4, weight: 11.3 },
    Energy: { return: 22.1, weight: 6.2 },
    Utilities: { return: 4.2, weight: 4.3 },
  },
};

// Financial calculation precision helpers
export const PRECISION = {
  CURRENCY: 2,
  PERCENTAGE: 4,
  PRICE: 4,
  SHARES: 6,
};

export function roundToPrecision(value, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

export function formatCurrency(amount, currency = 'KRW') {
  if (currency === 'KRW') {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } else if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return amount.toString();
}

// Mock API response generators
export function generateMockStockResponse(symbol) {
  const baseData = MOCK_STOCK_DATA[symbol];
  if (!baseData) {
    throw new Error(`No mock data for symbol: ${symbol}`);
  }

  return {
    ...baseData,
    timestamp: Date.now(),
    lastUpdated: new Date().toISOString(),
  };
}

export function generateMockPortfolioResponse(portfolioId) {
  return {
    ...MOCK_PORTFOLIO_DATA,
    id: portfolioId,
    lastUpdated: new Date().toISOString(),
  };
}

// Mock time series data for charts
export function generateMockTimeSeries(symbol, days = 30) {
  const basePrice = MOCK_STOCK_DATA[symbol]?.price || 100;
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const volatility = 0.02; // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const price = basePrice * (1 + (randomChange * i) / days);

    data.push({
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
      open: roundToPrecision(price * 0.995, PRECISION.PRICE),
      high: roundToPrecision(price * 1.015, PRECISION.PRICE),
      low: roundToPrecision(price * 0.985, PRECISION.PRICE),
      close: roundToPrecision(price, PRECISION.PRICE),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });
  }

  return data;
}

// Mock external API failures for testing error handling
export const MOCK_API_ERRORS = {
  RATE_LIMIT: {
    status: 429,
    message: 'Rate limit exceeded',
  },
  SERVER_ERROR: {
    status: 500,
    message: 'Internal server error',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Symbol not found',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized access',
  },
};

// Mock async delay for testing loading states
export function mockAsyncDelay(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Global mocks setup
beforeEach(() => {
  // Mock fetch for API calls
  global.fetch = jest.fn();

  // Mock console.error to reduce noise in tests
  jest.spyOn(console, 'error').mockImplementation(() => {});

  // Mock Date.now for consistent timestamps
  jest.spyOn(Date, 'now').mockReturnValue(1704067200000); // 2024-01-01

  // Mock performance.now for timing tests
  jest.spyOn(performance, 'now').mockReturnValue(0);
});

afterEach(() => {
  // Restore all mocks
  jest.restoreAllMocks();
});

// Export all mocks for individual test use
export {
  MOCK_STOCK_DATA,
  MOCK_FOREX_DATA,
  MOCK_PORTFOLIO_DATA,
  MOCK_TRANSACTION_DATA,
  MOCK_TAX_DATA,
  MOCK_MARKET_DATA,
  MOCK_API_ERRORS,
};
