/**
 * Unit tests for portfolio calculations
 * Target: 95%+ coverage for critical financial calculations
 */
import {
  calculatePositionValue,
  calculatePositionCost,
  calculateUnrealizedGain,
  calculatePortfolioValue,
  calculatePortfolioAllocation,
  calculatePortfolioMetrics,
  calculateAnnualizedReturn,
  calculateVolatility,
  calculateSharpeRatio,
  calculateMaxDrawdown,
  calculateBeta,
  calculateAlpha,
  calculatePerformanceMetrics,
  calculateRebalancing,
  Position,
  PortfolioMetrics,
  PerformanceMetrics,
} from '../../lib/calculations/portfolio-calculations';

describe('Portfolio Calculations', () => {
  describe('Position Value Calculations', () => {
    test('should calculate position value correctly', () => {
      const position: Position = {
        symbol: 'AAPL',
        shares: 100,
        averagePrice: 150.0,
        currentPrice: 180.0,
        currency: 'USD',
      };

      const value = calculatePositionValue(position);
      expect(value).toBe(18000.0);
    });

    test('should return 0 for invalid position data', () => {
      const invalidPositions = [
        {
          symbol: 'AAPL',
          shares: 0,
          averagePrice: 150,
          currentPrice: 180,
          currency: 'USD',
        },
        {
          symbol: 'AAPL',
          shares: -100,
          averagePrice: 150,
          currentPrice: 180,
          currency: 'USD',
        },
        {
          symbol: 'AAPL',
          shares: 100,
          averagePrice: 150,
          currentPrice: 0,
          currency: 'USD',
        },
        {
          symbol: 'AAPL',
          shares: 100,
          averagePrice: 150,
          currentPrice: -180,
          currency: 'USD',
        },
      ];

      invalidPositions.forEach(position => {
        expect(calculatePositionValue(position as Position)).toBe(0);
      });
    });

    test('should handle null or undefined position', () => {
      expect(calculatePositionValue(null as any)).toBe(0);
      expect(calculatePositionValue(undefined as any)).toBe(0);
    });

    test('should calculate position cost correctly', () => {
      const position: Position = {
        symbol: 'TSLA',
        shares: 50,
        averagePrice: 200.0,
        currentPrice: 250.0,
        currency: 'USD',
      };

      const cost = calculatePositionCost(position);
      expect(cost).toBe(10000.0);
    });

    test('should return 0 for invalid cost calculation', () => {
      const invalidPositions = [
        {
          symbol: 'TSLA',
          shares: 0,
          averagePrice: 200,
          currentPrice: 250,
          currency: 'USD',
        },
        {
          symbol: 'TSLA',
          shares: 50,
          averagePrice: 0,
          currentPrice: 250,
          currency: 'USD',
        },
        {
          symbol: 'TSLA',
          shares: -50,
          averagePrice: 200,
          currentPrice: 250,
          currency: 'USD',
        },
      ];

      invalidPositions.forEach(position => {
        expect(calculatePositionCost(position as Position)).toBe(0);
      });
    });
  });

  describe('Unrealized Gain Calculations', () => {
    test('should calculate unrealized gain correctly for profitable position', () => {
      const position: Position = {
        symbol: '005930.KS',
        shares: 1000,
        averagePrice: 70000,
        currentPrice: 75000,
        currency: 'KRW',
      };

      const result = calculateUnrealizedGain(position);
      expect(result.gain).toBe(5000000); // 1000 * (75000 - 70000)
      expect(result.gainPercent).toBe(7.1429); // 5000000 / 70000000 * 100
    });

    test('should calculate unrealized loss correctly', () => {
      const position: Position = {
        symbol: 'NAVER',
        shares: 100,
        averagePrice: 200000,
        currentPrice: 180000,
        currency: 'KRW',
      };

      const result = calculateUnrealizedGain(position);
      expect(result.gain).toBe(-2000000); // 100 * (180000 - 200000)
      expect(result.gainPercent).toBe(-10); // -2000000 / 20000000 * 100
    });

    test('should handle zero cost basis', () => {
      const position: Position = {
        symbol: 'FREE',
        shares: 100,
        averagePrice: 0,
        currentPrice: 50,
        currency: 'USD',
      };

      const result = calculateUnrealizedGain(position);
      expect(result.gain).toBe(0);
      expect(result.gainPercent).toBe(0);
    });

    test('should round gain and gain percent correctly', () => {
      const position: Position = {
        symbol: 'TEST',
        shares: 333,
        averagePrice: 33.33,
        currentPrice: 36.67,
        currency: 'USD',
      };

      const result = calculateUnrealizedGain(position);
      expect(result.gain).toBe(1112.22); // 333 * (36.67 - 33.33) = 1112.22
      expect(result.gainPercent).toBeCloseTo(10.011, 4); // Rounded to 4 decimal places
    });
  });

  describe('Portfolio Value and Allocation', () => {
    const testPositions: Position[] = [
      {
        symbol: 'AAPL',
        shares: 100,
        averagePrice: 150,
        currentPrice: 180,
        currency: 'USD',
      },
      {
        symbol: 'TSLA',
        shares: 50,
        averagePrice: 200,
        currentPrice: 250,
        currency: 'USD',
      },
      {
        symbol: '005930.KS',
        shares: 500,
        averagePrice: 70000,
        currentPrice: 75000,
        currency: 'KRW',
      },
    ];

    test('should calculate total portfolio value correctly', () => {
      const cash = 5000;
      const totalValue = calculatePortfolioValue(testPositions, cash);

      const expectedValue = 18000 + 12500 + 37500000 + 5000; // AAPL + TSLA + Samsung + Cash
      expect(totalValue).toBe(expectedValue);
    });

    test('should calculate portfolio value without cash', () => {
      const totalValue = calculatePortfolioValue(testPositions);
      const expectedValue = 18000 + 12500 + 37500000;
      expect(totalValue).toBe(expectedValue);
    });

    test('should handle empty positions array', () => {
      const totalValue = calculatePortfolioValue([], 10000);
      expect(totalValue).toBe(10000);
    });

    test('should calculate portfolio allocation correctly', () => {
      const cash = 1000000; // 1M for easier percentage calculation
      const allocation = calculatePortfolioAllocation(testPositions, cash);

      const totalValue = 18000 + 12500 + 37500000 + 1000000; // 38,530,500

      expect(allocation['AAPL']).toBeCloseTo((18000 / totalValue) * 100, 2);
      expect(allocation['TSLA']).toBeCloseTo((12500 / totalValue) * 100, 2);
      expect(allocation['005930.KS']).toBeCloseTo(
        (37500000 / totalValue) * 100,
        2
      );
      expect(allocation['CASH']).toBeCloseTo((1000000 / totalValue) * 100, 2);
    });

    test('should return empty allocation for zero total value', () => {
      const emptyPositions: Position[] = [];
      const allocation = calculatePortfolioAllocation(emptyPositions, 0);
      expect(allocation).toEqual({});
    });

    test('should not include cash in allocation if cash is 0', () => {
      const allocation = calculatePortfolioAllocation(testPositions, 0);
      expect(allocation['CASH']).toBeUndefined();
    });
  });

  describe('Portfolio Metrics', () => {
    const testPositions: Position[] = [
      {
        symbol: 'AAPL',
        shares: 100,
        averagePrice: 150,
        currentPrice: 180,
        currency: 'USD',
      },
      {
        symbol: 'TSLA',
        shares: 50,
        averagePrice: 200,
        currentPrice: 220,
        currency: 'USD',
      },
    ];

    test('should calculate comprehensive portfolio metrics', () => {
      const cash = 5000;
      const metrics = calculatePortfolioMetrics(testPositions, cash);

      const expectedTotalValue = 18000 + 11000 + 5000; // 34,000
      const expectedTotalCost = 15000 + 10000 + 5000; // 30,000
      const expectedTotalGain = 4000; // 34,000 - 30,000
      const expectedGainPercent = (4000 / 30000) * 100; // 13.33%

      expect(metrics.totalValue).toBe(expectedTotalValue);
      expect(metrics.totalCost).toBe(expectedTotalCost);
      expect(metrics.totalGain).toBe(expectedTotalGain);
      expect(metrics.totalGainPercent).toBeCloseTo(expectedGainPercent, 4);
      expect(metrics.dayChange).toBe(0); // No previous value provided
      expect(metrics.dayChangePercent).toBe(0);
      expect(metrics.allocation).toBeDefined();
    });

    test('should calculate day change when previous value provided', () => {
      const previousValue = 32000;
      const metrics = calculatePortfolioMetrics(
        testPositions,
        5000,
        previousValue
      );

      const currentValue = 18000 + 11000 + 5000; // 34,000
      const expectedDayChange = currentValue - previousValue; // 2,000
      const expectedDayChangePercent = (2000 / 32000) * 100; // 6.25%

      expect(metrics.dayChange).toBe(expectedDayChange);
      expect(metrics.dayChangePercent).toBeCloseTo(expectedDayChangePercent, 4);
    });

    test('should handle zero total cost', () => {
      const freePositions: Position[] = [
        {
          symbol: 'FREE',
          shares: 100,
          averagePrice: 0,
          currentPrice: 10,
          currency: 'USD',
        },
      ];

      const metrics = calculatePortfolioMetrics(freePositions, 0);
      expect(metrics.totalGainPercent).toBe(0);
    });
  });

  describe('Return Calculations', () => {
    test('should calculate annualized return correctly', () => {
      const startValue = 100000;
      const endValue = 121000; // 21% total return
      const years = 2;

      const annualizedReturn = calculateAnnualizedReturn(
        startValue,
        endValue,
        years
      );

      // (121000/100000)^(1/2) - 1 = 0.10 = 10%
      expect(annualizedReturn).toBeCloseTo(10, 4);
    });

    test('should return 0 for invalid inputs', () => {
      expect(calculateAnnualizedReturn(0, 100000, 1)).toBe(0);
      expect(calculateAnnualizedReturn(100000, 120000, 0)).toBe(0);
      expect(calculateAnnualizedReturn(-100000, 120000, 1)).toBe(0);
    });

    test('should handle loss scenarios', () => {
      const startValue = 100000;
      const endValue = 81000; // 19% loss
      const years = 1;

      const annualizedReturn = calculateAnnualizedReturn(
        startValue,
        endValue,
        years
      );
      expect(annualizedReturn).toBeCloseTo(-19, 4);
    });
  });

  describe('Risk Metrics', () => {
    test('should calculate volatility correctly', () => {
      const returns = [0.02, -0.01, 0.03, -0.02, 0.01]; // 2%, -1%, 3%, -2%, 1%
      const volatility = calculateVolatility(returns);

      // Calculate manually: mean = 0.006, variance, then std dev
      const mean = 0.006;
      const variance =
        (Math.pow(0.02 - mean, 2) +
          Math.pow(-0.01 - mean, 2) +
          Math.pow(0.03 - mean, 2) +
          Math.pow(-0.02 - mean, 2) +
          Math.pow(0.01 - mean, 2)) /
        4;

      const expectedVolatility = Math.sqrt(variance);
      expect(volatility).toBeCloseTo(expectedVolatility, 4);
    });

    test('should return 0 for insufficient data', () => {
      expect(calculateVolatility([])).toBe(0);
      expect(calculateVolatility([0.05])).toBe(0);
    });

    test('should calculate Sharpe ratio correctly', () => {
      const portfolioReturn = 12; // 12%
      const riskFreeRate = 2; // 2%
      const volatility = 15; // 15%

      const sharpeRatio = calculateSharpeRatio(
        portfolioReturn,
        riskFreeRate,
        volatility
      );
      const expected = (12 - 2) / 15; // 0.6667

      expect(sharpeRatio).toBeCloseTo(expected, 4);
    });

    test('should handle zero volatility in Sharpe ratio', () => {
      const sharpeRatio = calculateSharpeRatio(10, 2, 0);
      expect(sharpeRatio).toBe(0);
    });

    test('should calculate maximum drawdown correctly', () => {
      const values = [100, 110, 105, 120, 90, 95, 105];
      const maxDrawdown = calculateMaxDrawdown(values);

      // Peak at 120, trough at 90, drawdown = (120-90)/120 = 0.25 = 25%
      expect(maxDrawdown).toBeCloseTo(0.25, 4);
    });

    test('should return 0 for insufficient drawdown data', () => {
      expect(calculateMaxDrawdown([])).toBe(0);
      expect(calculateMaxDrawdown([100])).toBe(0);
    });

    test('should handle continuously rising values', () => {
      const values = [100, 110, 120, 130, 140];
      const maxDrawdown = calculateMaxDrawdown(values);
      expect(maxDrawdown).toBe(0);
    });
  });

  describe('Beta and Alpha Calculations', () => {
    test('should calculate beta correctly', () => {
      const portfolioReturns = [0.02, -0.01, 0.03, -0.02, 0.01];
      const benchmarkReturns = [0.015, -0.005, 0.025, -0.015, 0.008];

      const beta = calculateBeta(portfolioReturns, benchmarkReturns);

      // Manual calculation of covariance and benchmark variance
      const portfolioMean = 0.006;
      const benchmarkMean = 0.0056;

      let covariance = 0;
      let benchmarkVariance = 0;

      for (let i = 0; i < portfolioReturns.length; i++) {
        covariance +=
          (portfolioReturns[i] - portfolioMean) *
          (benchmarkReturns[i] - benchmarkMean);
        benchmarkVariance += Math.pow(benchmarkReturns[i] - benchmarkMean, 2);
      }

      covariance /= 4;
      benchmarkVariance /= 4;

      const expectedBeta = covariance / benchmarkVariance;
      expect(beta).toBeCloseTo(expectedBeta, 4);
    });

    test('should return 1 for mismatched array lengths', () => {
      const portfolioReturns = [0.02, -0.01];
      const benchmarkReturns = [0.015];

      const beta = calculateBeta(portfolioReturns, benchmarkReturns);
      expect(beta).toBe(1);
    });

    test('should return 1 for zero benchmark variance', () => {
      const portfolioReturns = [0.02, -0.01];
      const benchmarkReturns = [0.01, 0.01]; // No variance

      const beta = calculateBeta(portfolioReturns, benchmarkReturns);
      expect(beta).toBe(1);
    });

    test('should calculate alpha correctly', () => {
      const portfolioReturn = 15; // 15%
      const riskFreeRate = 2; // 2%
      const beta = 1.2;
      const benchmarkReturn = 10; // 10%

      const alpha = calculateAlpha(
        portfolioReturn,
        riskFreeRate,
        beta,
        benchmarkReturn
      );

      // Expected return = 2 + 1.2 * (10 - 2) = 11.6%
      // Alpha = 15 - 11.6 = 3.4%
      const expectedAlpha = 15 - (2 + 1.2 * (10 - 2));
      expect(alpha).toBeCloseTo(expectedAlpha, 4);
    });
  });

  describe('Performance Metrics Integration', () => {
    test('should calculate comprehensive performance metrics', () => {
      const portfolioValues = [100000, 102000, 101000, 105000, 103000, 108000];
      const benchmarkValues = [100000, 101000, 100500, 103000, 102000, 105000];
      const riskFreeRate = 0.02;

      const metrics = calculatePerformanceMetrics(
        portfolioValues,
        benchmarkValues,
        riskFreeRate
      );

      expect(metrics.returns).toBeDefined();
      expect(metrics.returns.daily).toBeCloseTo(0.7844, 3); // Daily return percentage
      expect(metrics.returns.yearly).toBeCloseTo(8, 0); // Annualized return
      expect(metrics.volatility.daily).toBeGreaterThan(0);
      expect(metrics.volatility.annualized).toBeGreaterThan(0);
      expect(metrics.sharpeRatio).toBeDefined();
      expect(metrics.maxDrawdown).toBeGreaterThanOrEqual(0);
      expect(metrics.beta).toBeDefined();
      expect(metrics.alpha).toBeDefined();
    });

    test('should throw error for insufficient data', () => {
      const portfolioValues = [100000];
      const benchmarkValues = [100000];

      expect(() => {
        calculatePerformanceMetrics(portfolioValues, benchmarkValues);
      }).toThrow('Insufficient data for performance calculation');
    });
  });

  describe('Portfolio Rebalancing', () => {
    test('should calculate rebalancing requirements correctly', () => {
      const currentAllocation = {
        AAPL: 45,
        TSLA: 25,
        CASH: 30,
      };

      const targetAllocation = {
        AAPL: 40,
        TSLA: 35,
        CASH: 25,
      };

      const totalValue = 100000;
      const threshold = 5;

      const rebalancing = calculateRebalancing(
        currentAllocation,
        targetAllocation,
        totalValue,
        threshold
      );

      expect(rebalancing).toHaveLength(3);

      const appleAction = rebalancing.find(action => action.symbol === 'AAPL');
      expect(appleAction?.action).toBe('SELL');
      expect(appleAction?.amount).toBe(5000); // 5% of 100000

      const teslaAction = rebalancing.find(action => action.symbol === 'TSLA');
      expect(teslaAction?.action).toBe('BUY');
      expect(teslaAction?.amount).toBe(10000); // 10% of 100000

      const cashAction = rebalancing.find(action => action.symbol === 'CASH');
      expect(cashAction?.action).toBe('SELL');
      expect(cashAction?.amount).toBe(5000); // 5% of 100000
    });

    test('should mark as HOLD when within threshold', () => {
      const currentAllocation = { AAPL: 42 };
      const targetAllocation = { AAPL: 40 };
      const totalValue = 100000;
      const threshold = 5;

      const rebalancing = calculateRebalancing(
        currentAllocation,
        targetAllocation,
        totalValue,
        threshold
      );

      expect(rebalancing[0].action).toBe('HOLD');
      expect(rebalancing[0].amount).toBe(0);
    });

    test('should handle missing current allocation', () => {
      const currentAllocation = {};
      const targetAllocation = { AAPL: 50 };
      const totalValue = 100000;

      const rebalancing = calculateRebalancing(
        currentAllocation,
        targetAllocation,
        totalValue
      );

      expect(rebalancing[0].action).toBe('BUY');
      expect(rebalancing[0].amount).toBe(50000); // Need to buy 50% worth
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle very small numbers correctly', () => {
      const position: Position = {
        symbol: 'PENNY',
        shares: 1000000,
        averagePrice: 0.001,
        currentPrice: 0.0011,
        currency: 'USD',
      };

      const gain = calculateUnrealizedGain(position);
      expect(gain.gain).toBe(100); // 1M shares * 0.0001 difference
      expect(gain.gainPercent).toBe(10); // 10% gain
    });

    test('should handle very large numbers correctly', () => {
      const position: Position = {
        symbol: 'EXPENSIVE',
        shares: 1,
        averagePrice: 1000000,
        currentPrice: 1100000,
        currency: 'USD',
      };

      const value = calculatePositionValue(position);
      expect(value).toBe(1100000);

      const gain = calculateUnrealizedGain(position);
      expect(gain.gain).toBe(100000);
      expect(gain.gainPercent).toBe(10);
    });

    test('should maintain precision in calculations', () => {
      const position: Position = {
        symbol: 'PRECISE',
        shares: 333.333333,
        averagePrice: 33.333333,
        currentPrice: 36.666666,
        currency: 'USD',
      };

      const value = calculatePositionValue(position);
      expect(value).toBeCloseTo(12222.2219, 4);

      const cost = calculatePositionCost(position);
      expect(cost).toBeCloseTo(11111.1109, 4);
    });
  });
});
