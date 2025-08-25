import { calculatePortfolioMetrics, calculateRiskMetrics, calculateTaxOptimization } from '@/lib/calculations/portfolio-calculations';

describe('Portfolio Calculations', () => {
  const mockPortfolio = {
    assets: [
      { type: 'stock', value: 1000000, expectedReturn: 0.08, risk: 0.15 },
      { type: 'bond', value: 500000, expectedReturn: 0.04, risk: 0.05 },
      { type: 'real_estate', value: 2000000, expectedReturn: 0.06, risk: 0.12 },
      { type: 'cash', value: 300000, expectedReturn: 0.02, risk: 0.01 }
    ],
    totalValue: 3800000
  };

  describe('calculatePortfolioMetrics', () => {
    it('calculates total portfolio value correctly', () => {
      const result = calculatePortfolioMetrics(mockPortfolio.assets);
      
      expect(result.totalValue).toBe(3800000);
      expect(result.assetCount).toBe(4);
    });

    it('calculates weighted average return correctly', () => {
      const result = calculatePortfolioMetrics(mockPortfolio.assets);
      
      // Expected: (1M * 0.08 + 0.5M * 0.04 + 2M * 0.06 + 0.3M * 0.02) / 3.8M
      const expectedReturn = (1000000 * 0.08 + 500000 * 0.04 + 2000000 * 0.06 + 300000 * 0.02) / 3800000;
      expect(result.weightedAverageReturn).toBeCloseTo(expectedReturn, 4);
    });

    it('calculates asset allocation percentages correctly', () => {
      const result = calculatePortfolioMetrics(mockPortfolio.assets);
      
      expect(result.allocations.stock).toBeCloseTo(26.32, 2); // 1M / 3.8M * 100
      expect(result.allocations.bond).toBeCloseTo(13.16, 2);  // 0.5M / 3.8M * 100
      expect(result.allocations.real_estate).toBeCloseTo(52.63, 2); // 2M / 3.8M * 100
      expect(result.allocations.cash).toBeCloseTo(7.89, 2);   // 0.3M / 3.8M * 100
    });
  });

  describe('calculateRiskMetrics', () => {
    it('calculates portfolio risk correctly', () => {
      const result = calculateRiskMetrics(mockPortfolio.assets);
      
      expect(result.totalRisk).toBeGreaterThan(0);
      expect(result.riskLevel).toBeDefined();
      expect(result.diversificationScore).toBeGreaterThan(0);
      expect(result.diversificationScore).toBeLessThanOrEqual(1);
    });

    it('identifies high-risk portfolios', () => {
      const highRiskPortfolio = [
        { type: 'stock', value: 2000000, expectedReturn: 0.12, risk: 0.25 },
        { type: 'crypto', value: 1000000, expectedReturn: 0.20, risk: 0.40 }
      ];
      
      const result = calculateRiskMetrics(highRiskPortfolio);
      
      expect(result.riskLevel).toBe('high');
      expect(result.totalRisk).toBeGreaterThan(0.3);
    });

    it('identifies low-risk portfolios', () => {
      const lowRiskPortfolio = [
        { type: 'bond', value: 2000000, expectedReturn: 0.03, risk: 0.03 },
        { type: 'cash', value: 1000000, expectedReturn: 0.02, risk: 0.01 }
      ];
      
      const result = calculateRiskMetrics(lowRiskPortfolio);
      
      expect(result.riskLevel).toBe('low');
      expect(result.totalRisk).toBeLessThan(0.1);
    });
  });

  describe('calculateTaxOptimization', () => {
    it('calculates tax implications correctly', () => {
      const result = calculateTaxOptimization(mockPortfolio.assets, 50000000); // 5천만원 소득
      
      expect(result.estimatedTax).toBeGreaterThan(0);
      expect(result.taxEfficiency).toBeDefined();
      expect(result.optimizationSuggestions).toBeInstanceOf(Array);
    });

    it('suggests tax optimization strategies', () => {
      const result = calculateTaxOptimization(mockPortfolio.assets, 100000000); // 1억원 소득
      
      expect(result.optimizationSuggestions.length).toBeGreaterThan(0);
      expect(result.optimizationSuggestions[0]).toHaveProperty('strategy');
      expect(result.optimizationSuggestions[0]).toHaveProperty('potentialSavings');
    });

    it('handles edge cases gracefully', () => {
      const emptyPortfolio: any[] = [];
      const result = calculateTaxOptimization(emptyPortfolio, 50000000);
      
      expect(result.estimatedTax).toBe(0);
      expect(result.taxEfficiency).toBe('N/A');
      expect(result.optimizationSuggestions).toEqual([]);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles zero-value assets', () => {
      const portfolioWithZero = [
        { type: 'stock', value: 0, expectedReturn: 0.08, risk: 0.15 },
        { type: 'bond', value: 1000000, expectedReturn: 0.04, risk: 0.05 }
      ];
      
      const result = calculatePortfolioMetrics(portfolioWithZero);
      
      expect(result.totalValue).toBe(1000000);
      expect(result.allocations.stock).toBe(0);
      expect(result.allocations.bond).toBe(100);
    });

    it('handles negative values gracefully', () => {
      const portfolioWithNegative = [
        { type: 'stock', value: -100000, expectedReturn: 0.08, risk: 0.15 },
        { type: 'bond', value: 1000000, expectedReturn: 0.04, risk: 0.05 }
      ];
      
      const result = calculatePortfolioMetrics(portfolioWithNegative);
      
      expect(result.totalValue).toBe(900000);
      expect(result.allocations.stock).toBe(0);
      expect(result.allocations.bond).toBe(100);
    });
  });
});
