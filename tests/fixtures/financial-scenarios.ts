/**
 * Realistic financial test scenarios and data management
 * Provides comprehensive test data for various financial situations
 */

export interface FinancialScenario {
  id: string;
  name: string;
  description: string;
  portfolioValue: number;
  positions: Position[];
  transactions: Transaction[];
  taxSituation: TaxSituation;
  expectedOutcomes: ExpectedOutcomes;
}

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  currency: string;
  sector: string;
  exchange: string;
  dividendYield?: number;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'SPLIT' | 'TRANSFER';
  symbol: string;
  shares: number;
  price: number;
  timestamp: string;
  fees: number;
  currency: string;
  exchange: string;
}

export interface TaxSituation {
  residency: 'KOREA' | 'US' | 'DUAL';
  taxYear: number;
  foreignTaxCredits: number;
  managementFees: number;
  capitalGainsType: 'SHORT_TERM' | 'LONG_TERM' | 'MIXED';
}

export interface ExpectedOutcomes {
  totalValue: number;
  totalGainLoss: number;
  totalDividends: number;
  taxLiability: number;
  portfolioRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  diversificationScore: number;
}

// Korean Individual Investor - Conservative Portfolio
export const KOREAN_CONSERVATIVE_INVESTOR: FinancialScenario = {
  id: 'korean-conservative',
  name: 'Korean Conservative Investor',
  description:
    'Korean individual with conservative investment approach, focus on large-cap Korean stocks and bonds',
  portfolioValue: 500000000, // 500M KRW (~375K USD)
  positions: [
    {
      symbol: '005930.KS',
      name: '삼성전자',
      shares: 2000,
      averagePrice: 70000,
      currentPrice: 75000,
      currency: 'KRW',
      sector: 'Technology',
      exchange: 'KOSPI',
      dividendYield: 2.1,
    },
    {
      symbol: '000660.KS',
      name: 'SK하이닉스',
      shares: 500,
      averagePrice: 120000,
      currentPrice: 125000,
      currency: 'KRW',
      sector: 'Technology',
      exchange: 'KOSPI',
      dividendYield: 1.8,
    },
    {
      symbol: '051910.KS',
      name: 'LG화학',
      shares: 300,
      averagePrice: 400000,
      currentPrice: 420000,
      currency: 'KRW',
      sector: 'Materials',
      exchange: 'KOSPI',
      dividendYield: 1.5,
    },
    {
      symbol: '035420.KS',
      name: 'NAVER',
      shares: 200,
      averagePrice: 180000,
      currentPrice: 185000,
      currency: 'KRW',
      sector: 'Communication Services',
      exchange: 'KOSPI',
      dividendYield: 0.8,
    },
  ],
  transactions: [
    {
      id: 'txn-1',
      type: 'BUY',
      symbol: '005930.KS',
      shares: 1000,
      price: 68000,
      timestamp: '2024-01-15T09:30:00Z',
      fees: 6800,
      currency: 'KRW',
      exchange: 'KOSPI',
    },
    {
      id: 'txn-2',
      type: 'BUY',
      symbol: '005930.KS',
      shares: 1000,
      price: 72000,
      timestamp: '2024-03-10T09:30:00Z',
      fees: 7200,
      currency: 'KRW',
      exchange: 'KOSPI',
    },
    {
      id: 'txn-3',
      type: 'DIVIDEND',
      symbol: '005930.KS',
      shares: 2000,
      price: 1444, // Annual dividend per share
      timestamp: '2024-05-20T00:00:00Z',
      fees: 0,
      currency: 'KRW',
      exchange: 'KOSPI',
    },
  ],
  taxSituation: {
    residency: 'KOREA',
    taxYear: 2024,
    foreignTaxCredits: 0,
    managementFees: 2500000, // 2.5M KRW
    capitalGainsType: 'LONG_TERM',
  },
  expectedOutcomes: {
    totalValue: 500000000,
    totalGainLoss: 15000000,
    totalDividends: 2888000,
    taxLiability: 3200000,
    portfolioRisk: 'MEDIUM',
    diversificationScore: 75,
  },
};

// High Net Worth Family Office - Diversified Global Portfolio
export const FAMILY_OFFICE_DIVERSIFIED: FinancialScenario = {
  id: 'family-office-diversified',
  name: 'Family Office - Diversified Global Portfolio',
  description:
    'High net worth family office with global diversification across multiple asset classes',
  portfolioValue: 10000000, // $10M USD
  positions: [
    // US Large Cap
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 5000,
      averagePrice: 150.0,
      currentPrice: 182.52,
      currency: 'USD',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 0.5,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 3000,
      averagePrice: 280.0,
      currentPrice: 415.26,
      currency: 'USD',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 0.7,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 2000,
      averagePrice: 120.0,
      currentPrice: 175.85,
      currency: 'USD',
      sector: 'Communication Services',
      exchange: 'NASDAQ',
      dividendYield: 0.0,
    },
    // Korean Exposure
    {
      symbol: '005930.KS',
      name: '삼성전자',
      shares: 10000,
      averagePrice: 65000,
      currentPrice: 75000,
      currency: 'KRW',
      sector: 'Technology',
      exchange: 'KOSPI',
      dividendYield: 2.1,
    },
    {
      symbol: '035420.KS',
      name: 'NAVER',
      shares: 2000,
      averagePrice: 170000,
      currentPrice: 185000,
      currency: 'KRW',
      sector: 'Communication Services',
      exchange: 'KOSPI',
      dividendYield: 0.8,
    },
    // European Exposure
    {
      symbol: 'ASML',
      name: 'ASML Holding NV',
      shares: 500,
      averagePrice: 600.0,
      currentPrice: 785.5,
      currency: 'EUR',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 1.1,
    },
  ],
  transactions: [
    {
      id: 'txn-fo-1',
      type: 'BUY',
      symbol: 'AAPL',
      shares: 2500,
      price: 145.0,
      timestamp: '2024-01-05T14:30:00Z',
      fees: 25.0,
      currency: 'USD',
      exchange: 'NASDAQ',
    },
    {
      id: 'txn-fo-2',
      type: 'BUY',
      symbol: 'AAPL',
      shares: 2500,
      price: 155.0,
      timestamp: '2024-02-15T14:30:00Z',
      fees: 25.0,
      currency: 'USD',
      exchange: 'NASDAQ',
    },
    {
      id: 'txn-fo-3',
      type: 'SELL',
      symbol: 'MSFT',
      shares: 1000,
      price: 400.0,
      timestamp: '2024-06-10T14:30:00Z',
      fees: 15.0,
      currency: 'USD',
      exchange: 'NASDAQ',
    },
    {
      id: 'txn-fo-4',
      type: 'DIVIDEND',
      symbol: 'AAPL',
      shares: 5000,
      price: 0.24, // Quarterly dividend per share
      timestamp: '2024-08-15T00:00:00Z',
      fees: 0,
      currency: 'USD',
      exchange: 'NASDAQ',
    },
  ],
  taxSituation: {
    residency: 'DUAL',
    taxYear: 2024,
    foreignTaxCredits: 15000,
    managementFees: 125000, // $125K USD management fees
    capitalGainsType: 'MIXED',
  },
  expectedOutcomes: {
    totalValue: 10000000,
    totalGainLoss: 1500000,
    totalDividends: 75000,
    taxLiability: 285000,
    portfolioRisk: 'MEDIUM',
    diversificationScore: 90,
  },
};

// Day Trader - High Frequency Trading
export const DAY_TRADER_HIGH_FREQUENCY: FinancialScenario = {
  id: 'day-trader-hft',
  name: 'Day Trader - High Frequency',
  description:
    'Active day trader with high frequency transactions, primarily in US growth stocks',
  portfolioValue: 250000, // $250K USD
  positions: [
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 300,
      averagePrice: 240.0,
      currentPrice: 248.5,
      currency: 'USD',
      sector: 'Consumer Discretionary',
      exchange: 'NASDAQ',
      dividendYield: 0.0,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      shares: 150,
      averagePrice: 450.0,
      currentPrice: 875.0,
      currency: 'USD',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 0.03,
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      shares: 400,
      averagePrice: 120.0,
      currentPrice: 142.5,
      currency: 'USD',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 0.0,
    },
  ],
  transactions: [
    // Generate many transactions to simulate day trading
    ...Array.from({ length: 50 }, (_, i) => ({
      id: `day-txn-${i + 1}`,
      type: (Math.random() > 0.5 ? 'BUY' : 'SELL') as 'BUY' | 'SELL',
      symbol:
        (['TSLA', 'NVDA', 'AMD'] as const)[Math.floor(Math.random() * 3)] ||
        'TSLA',
      shares: Math.floor(Math.random() * 100) + 10,
      price: 200 + Math.random() * 600, // Random price between $200-800
      timestamp: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      fees: 1.0, // $1 per trade
      currency: 'USD',
      exchange: 'NASDAQ',
    })),
  ],
  taxSituation: {
    residency: 'US',
    taxYear: 2024,
    foreignTaxCredits: 0,
    managementFees: 0,
    capitalGainsType: 'SHORT_TERM',
  },
  expectedOutcomes: {
    totalValue: 250000,
    totalGainLoss: 45000,
    totalDividends: 500,
    taxLiability: 15750, // Short-term capital gains at higher tax rate
    portfolioRisk: 'HIGH',
    diversificationScore: 35,
  },
};

// Retirement Portfolio - Income Focused
export const RETIREMENT_INCOME_FOCUSED: FinancialScenario = {
  id: 'retirement-income',
  name: 'Retirement Portfolio - Income Focused',
  description:
    'Conservative retirement portfolio focused on dividend income and capital preservation',
  portfolioValue: 2000000, // $2M USD
  positions: [
    {
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      shares: 3000,
      averagePrice: 180.0,
      currentPrice: 265.0,
      currency: 'USD',
      sector: 'Diversified',
      exchange: 'NYSE',
      dividendYield: 1.3,
    },
    {
      symbol: 'VXUS',
      name: 'Vanguard Total International Stock ETF',
      shares: 2000,
      averagePrice: 50.0,
      currentPrice: 66.0,
      currency: 'USD',
      sector: 'Diversified',
      exchange: 'NYSE',
      dividendYield: 2.8,
    },
    {
      symbol: 'VYM',
      name: 'Vanguard High Dividend Yield ETF',
      shares: 2500,
      averagePrice: 90.0,
      currentPrice: 114.0,
      currency: 'USD',
      sector: 'Diversified',
      exchange: 'NYSE',
      dividendYield: 2.9,
    },
    {
      symbol: 'BND',
      name: 'Vanguard Total Bond Market ETF',
      shares: 4000,
      averagePrice: 78.0,
      currentPrice: 75.5,
      currency: 'USD',
      sector: 'Fixed Income',
      exchange: 'NYSE',
      dividendYield: 4.2,
    },
  ],
  transactions: [
    {
      id: 'ret-txn-1',
      type: 'BUY',
      symbol: 'VTI',
      shares: 1500,
      price: 175.0,
      timestamp: '2024-01-02T14:30:00Z',
      fees: 0, // ETF trades often commission-free
      currency: 'USD',
      exchange: 'NYSE',
    },
    {
      id: 'ret-txn-2',
      type: 'DIVIDEND',
      symbol: 'VYM',
      shares: 2500,
      price: 0.85, // Quarterly dividend per share
      timestamp: '2024-03-15T00:00:00Z',
      fees: 0,
      currency: 'USD',
      exchange: 'NYSE',
    },
    {
      id: 'ret-txn-3',
      type: 'DIVIDEND',
      symbol: 'BND',
      shares: 4000,
      price: 0.78, // Quarterly dividend per share
      timestamp: '2024-03-15T00:00:00Z',
      fees: 0,
      currency: 'USD',
      exchange: 'NYSE',
    },
  ],
  taxSituation: {
    residency: 'US',
    taxYear: 2024,
    foreignTaxCredits: 2500,
    managementFees: 8000, // 0.4% management fee
    capitalGainsType: 'LONG_TERM',
  },
  expectedOutcomes: {
    totalValue: 2000000,
    totalGainLoss: 250000,
    totalDividends: 52000,
    taxLiability: 42500,
    portfolioRisk: 'LOW',
    diversificationScore: 95,
  },
};

// Cryptocurrency Heavy Portfolio
export const CRYPTO_HEAVY_PORTFOLIO: FinancialScenario = {
  id: 'crypto-heavy',
  name: 'Cryptocurrency Heavy Portfolio',
  description:
    'High-risk portfolio with significant cryptocurrency exposure and growth stocks',
  portfolioValue: 500000, // $500K USD
  positions: [
    {
      symbol: 'BTC-USD',
      name: 'Bitcoin',
      shares: 10,
      averagePrice: 35000,
      currentPrice: 67000,
      currency: 'USD',
      sector: 'Cryptocurrency',
      exchange: 'CRYPTO',
      dividendYield: 0.0,
    },
    {
      symbol: 'ETH-USD',
      name: 'Ethereum',
      shares: 50,
      averagePrice: 2200,
      currentPrice: 3800,
      currency: 'USD',
      sector: 'Cryptocurrency',
      exchange: 'CRYPTO',
      dividendYield: 0.0,
    },
    {
      symbol: 'COIN',
      name: 'Coinbase Global Inc.',
      shares: 200,
      averagePrice: 250.0,
      currentPrice: 285.0,
      currency: 'USD',
      sector: 'Financial Services',
      exchange: 'NASDAQ',
      dividendYield: 0.0,
    },
    {
      symbol: 'MSTR',
      name: 'MicroStrategy Inc.',
      shares: 100,
      averagePrice: 180.0,
      currentPrice: 445.0,
      currency: 'USD',
      sector: 'Technology',
      exchange: 'NASDAQ',
      dividendYield: 0.0,
    },
  ],
  transactions: [
    {
      id: 'crypto-txn-1',
      type: 'BUY',
      symbol: 'BTC-USD',
      shares: 5,
      price: 30000,
      timestamp: '2024-01-10T00:00:00Z',
      fees: 150, // Higher crypto fees
      currency: 'USD',
      exchange: 'CRYPTO',
    },
    {
      id: 'crypto-txn-2',
      type: 'BUY',
      symbol: 'BTC-USD',
      shares: 5,
      price: 40000,
      timestamp: '2024-04-15T00:00:00Z',
      fees: 200,
      currency: 'USD',
      exchange: 'CRYPTO',
    },
  ],
  taxSituation: {
    residency: 'US',
    taxYear: 2024,
    foreignTaxCredits: 0,
    managementFees: 0,
    capitalGainsType: 'SHORT_TERM',
  },
  expectedOutcomes: {
    totalValue: 500000,
    totalGainLoss: 180000,
    totalDividends: 0,
    taxLiability: 63000,
    portfolioRisk: 'HIGH',
    diversificationScore: 25,
  },
};

// Test scenario management functions
export class FinancialScenarioManager {
  private scenarios: Map<string, FinancialScenario> = new Map();

  constructor() {
    this.loadDefaultScenarios();
  }

  private loadDefaultScenarios(): void {
    const defaultScenarios = [
      KOREAN_CONSERVATIVE_INVESTOR,
      FAMILY_OFFICE_DIVERSIFIED,
      DAY_TRADER_HIGH_FREQUENCY,
      RETIREMENT_INCOME_FOCUSED,
      CRYPTO_HEAVY_PORTFOLIO,
    ];

    defaultScenarios.forEach(scenario => {
      this.scenarios.set(scenario.id, scenario);
    });
  }

  getScenario(id: string): FinancialScenario | undefined {
    return this.scenarios.get(id);
  }

  getAllScenarios(): FinancialScenario[] {
    return Array.from(this.scenarios.values());
  }

  addCustomScenario(scenario: FinancialScenario): void {
    this.scenarios.set(scenario.id, scenario);
  }

  generateRandomPortfolio(
    targetValue: number,
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  ): FinancialScenario {
    const symbols =
      riskLevel === 'LOW'
        ? ['VTI', 'BND', 'VYM', 'VXUS']
        : riskLevel === 'MEDIUM'
          ? ['AAPL', 'MSFT', 'GOOGL', '005930.KS', 'VTI']
          : ['TSLA', 'NVDA', 'COIN', 'BTC-USD', 'ETH-USD'];

    const positions: Position[] = symbols.map(symbol => ({
      symbol,
      name: `Test ${symbol}`,
      shares: Math.floor(Math.random() * 1000) + 100,
      averagePrice: Math.random() * 500 + 50,
      currentPrice: Math.random() * 600 + 50,
      currency: symbol.includes('.KS') ? 'KRW' : 'USD',
      sector: 'Technology',
      exchange: symbol.includes('.KS') ? 'KOSPI' : 'NASDAQ',
    }));

    return {
      id: `random-${Date.now()}`,
      name: `Random ${riskLevel} Risk Portfolio`,
      description: `Randomly generated ${riskLevel.toLowerCase()} risk portfolio`,
      portfolioValue: targetValue,
      positions,
      transactions: [],
      taxSituation: {
        residency: 'US',
        taxYear: 2024,
        foreignTaxCredits: 0,
        managementFees: targetValue * 0.01,
        capitalGainsType: 'MIXED',
      },
      expectedOutcomes: {
        totalValue: targetValue,
        totalGainLoss: targetValue * (Math.random() * 0.3 - 0.1), // -10% to +20%
        totalDividends: targetValue * 0.02,
        taxLiability: targetValue * 0.15,
        portfolioRisk: riskLevel,
        diversificationScore:
          riskLevel === 'LOW' ? 90 : riskLevel === 'MEDIUM' ? 70 : 40,
      },
    };
  }

  validateScenario(scenario: FinancialScenario): string[] {
    const errors: string[] = [];

    // Validate basic structure
    if (!scenario.id || !scenario.name) {
      errors.push('Scenario must have id and name');
    }

    // Validate positions
    if (!scenario.positions || scenario.positions.length === 0) {
      errors.push('Scenario must have at least one position');
    }

    // Validate portfolio value matches positions
    const calculatedValue = scenario.positions.reduce((total, pos) => {
      const positionValue = pos.shares * pos.currentPrice;
      return (
        total + (pos.currency === 'KRW' ? positionValue / 1300 : positionValue)
      ); // Rough USD conversion
    }, 0);

    const valueDiscrepancy =
      Math.abs(calculatedValue - scenario.portfolioValue) /
      scenario.portfolioValue;
    if (valueDiscrepancy > 0.1) {
      // 10% tolerance
      errors.push(
        `Portfolio value mismatch: calculated ${calculatedValue}, expected ${scenario.portfolioValue}`
      );
    }

    // Validate transactions have required fields
    scenario.transactions.forEach((txn, index) => {
      if (!txn.id || !txn.symbol || !txn.type) {
        errors.push(`Transaction ${index} missing required fields`);
      }
    });

    return errors;
  }
}

// Export scenario instances and manager
export const scenarioManager = new FinancialScenarioManager();
export const FINANCIAL_SCENARIOS = {
  KOREAN_CONSERVATIVE_INVESTOR,
  FAMILY_OFFICE_DIVERSIFIED,
  DAY_TRADER_HIGH_FREQUENCY,
  RETIREMENT_INCOME_FOCUSED,
  CRYPTO_HEAVY_PORTFOLIO,
};
