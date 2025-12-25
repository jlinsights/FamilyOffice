import {
  calculatePortfolioMetrics,
  type Position,
} from '@/lib/calculations/portfolio-calculations';

describe('Portfolio Calculations', () => {
  const mockPositions: Position[] = [
    {
      symbol: 'AAPL',
      shares: 100,
      averagePrice: 150,
      currentPrice: 170,
      currency: 'USD',
    },
    {
      symbol: 'GOOGL',
      shares: 50,
      averagePrice: 2000,
      currentPrice: 2200,
      currency: 'USD',
    },
    {
      symbol: 'MSFT',
      shares: 200,
      averagePrice: 250,
      currentPrice: 300,
      currency: 'USD',
    },
  ];

  describe('calculatePortfolioMetrics', () => {
    it('calculates total portfolio value correctly', () => {
      const result = calculatePortfolioMetrics(mockPositions);

      // Expected: (100 * 170) + (50 * 2200) + (200 * 300) = 17000 + 110000 + 60000 = 187000
      expect(result.totalValue).toBe(187000);
    });

    it('calculates total cost correctly', () => {
      const result = calculatePortfolioMetrics(mockPositions);

      // Expected: (100 * 150) + (50 * 2000) + (200 * 250) = 15000 + 100000 + 50000 = 165000
      expect(result.totalCost).toBe(165000);
    });

    it('calculates total gain and gain percentage correctly', () => {
      const result = calculatePortfolioMetrics(mockPositions);

      // Expected gain: 187000 - 165000 = 22000
      // Expected gain %: (22000 / 165000) * 100 = 13.33%
      expect(result.totalGain).toBe(22000);
      expect(result.totalGainPercent).toBeCloseTo(13.33, 2);
    });

    it('calculates asset allocation correctly', () => {
      const result = calculatePortfolioMetrics(mockPositions);

      // AAPL: 17000 / 187000 * 100 = 9.09%
      // GOOGL: 110000 / 187000 * 100 = 58.82%
      // MSFT: 60000 / 187000 * 100 = 32.09%
      expect(result.allocation['AAPL']).toBeCloseTo(9.09, 2);
      expect(result.allocation['GOOGL']).toBeCloseTo(58.82, 2);
      expect(result.allocation['MSFT']).toBeCloseTo(32.09, 2);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty portfolio', () => {
      const emptyPortfolio: Position[] = [];
      const result = calculatePortfolioMetrics(emptyPortfolio);

      expect(result.totalValue).toBe(0);
      expect(result.totalCost).toBe(0);
      expect(result.totalGain).toBe(0);
      expect(result.totalGainPercent).toBe(0);
      expect(result.allocation).toEqual({});
    });

    it('handles positions with zero shares', () => {
      const positionsWithZero: Position[] = [
        {
          symbol: 'AAPL',
          shares: 0,
          averagePrice: 150,
          currentPrice: 170,
          currency: 'USD',
        },
        {
          symbol: 'GOOGL',
          shares: 100,
          averagePrice: 2000,
          currentPrice: 2200,
          currency: 'USD',
        },
      ];

      const result = calculatePortfolioMetrics(positionsWithZero);

      expect(result.totalValue).toBe(220000); // Only GOOGL counts
      expect(result.allocation['AAPL']).toBe(0);
      expect(result.allocation['GOOGL']).toBe(100);
    });
  });
});
