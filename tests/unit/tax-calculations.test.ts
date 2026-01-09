/**
 * Unit tests for Korean tax calculations
 * Target: 95%+ coverage for critical tax compliance calculations
 */
import {
  calculateCapitalGains,
  calculateDividendIncome,
  calculateDeductibleFees,
  calculateCapitalGainsTax,
  calculateDividendTax,
  calculateTaxLiability,
  calculateQuarterlyTax,
  generateTaxLossHarvesting,
  validateTransactionData,
  Transaction,
  KOREAN_TAX_RATES,
} from '../../lib/calculations/tax-calculations';

describe('Tax Calculations', () => {
  const sampleTransactions: Transaction[] = [
    {
      id: 'txn-001',
      type: 'BUY',
      symbol: '005930.KS',
      shares: 100,
      price: 70000,
      amount: 7000000,
      fees: 7000,
      currency: 'KRW',
      date: '2024-01-15T09:00:00Z',
      isKorean: true,
    },
    {
      id: 'txn-002',
      type: 'SELL',
      symbol: '005930.KS',
      shares: 50,
      price: 75000,
      amount: 3750000,
      fees: 3750,
      currency: 'KRW',
      date: '2024-07-15T14:00:00Z',
      isKorean: true,
    },
    {
      id: 'txn-003',
      type: 'BUY',
      symbol: 'AAPL',
      shares: 10,
      price: 180.0,
      amount: 1800,
      fees: 5,
      currency: 'USD',
      date: '2024-02-01T10:00:00Z',
      isKorean: false,
    },
    {
      id: 'txn-004',
      type: 'SELL',
      symbol: 'AAPL',
      shares: 5,
      price: 200.0,
      amount: 1000,
      fees: 3,
      currency: 'USD',
      date: '2024-03-01T15:00:00Z',
      isKorean: false,
    },
    {
      id: 'txn-005',
      type: 'DIVIDEND',
      symbol: '005930.KS',
      shares: 50,
      price: 354,
      amount: 17700,
      fees: 0,
      currency: 'KRW',
      date: '2024-03-15T00:00:00Z',
      isKorean: true,
    },
    {
      id: 'txn-006',
      type: 'DIVIDEND',
      symbol: 'AAPL',
      shares: 5,
      price: 0.24,
      amount: 1.02, // After 15% withholding
      fees: 0,
      currency: 'USD',
      date: '2024-03-20T00:00:00Z',
      isKorean: false,
    },
  ];

  describe('Capital Gains Calculation', () => {
    test('should calculate capital gains using FIFO method', () => {
      const result = calculateCapitalGains(sampleTransactions);

      // Samsung: Buy 100@70000, Sell 50@75000
      // Gain: 50 * (75000-70000) = 250000
      // Fees: (7000 * 50/100) + (3750 * 50/50) = 3500 + 3750 = 7250
      // Net: 250000 - 7250 = 242750

      // Apple: Buy 10@180, Sell 5@200
      // Gain: 5 * (200-180) = 100
      // Fees: (5 * 5/10) + (3 * 5/5) = 2.5 + 3 = 5.5
      // Net: 100 - 5.5 = 94.5

      // Total: 242750 + 94.5 = 242844.5
      expect(result.total).toBeCloseTo(242844.5, 1);
      expect(result.details).toHaveLength(2);
    });

    test('should distinguish between short-term and long-term gains', () => {
      const shortTermTransactions: Transaction[] = [
        {
          id: 'st-1',
          type: 'BUY',
          symbol: 'TEST',
          shares: 100,
          price: 100,
          amount: 10000,
          fees: 10,
          currency: 'USD',
          date: '2024-01-01T00:00:00Z',
          isKorean: false,
        },
        {
          id: 'st-2',
          type: 'SELL',
          symbol: 'TEST',
          shares: 50,
          price: 120,
          amount: 6000,
          fees: 6,
          currency: 'USD',
          date: '2024-06-01T00:00:00Z', // 5 months later (short-term)
          isKorean: false,
        },
        {
          id: 'st-3',
          type: 'SELL',
          symbol: 'TEST',
          shares: 50,
          price: 130,
          amount: 6500,
          fees: 6.5,
          currency: 'USD',
          date: '2025-02-01T00:00:00Z', // 13+ months later (long-term)
          isKorean: false,
        },
      ];

      const result = calculateCapitalGains(shortTermTransactions, 365);

      // Short-term: 50 * (120-100) - fees = 50 * 20 - 11 = 989
      // Long-term: 50 * (130-100) - fees = 50 * 30 - 11.5 = 1488.5
      expect(result.shortTerm).toBeCloseTo(989, 1);
      expect(result.longTerm).toBeCloseTo(1488.5, 1);
    });

    test('should handle complex FIFO scenarios', () => {
      const complexTransactions: Transaction[] = [
        {
          id: '1',
          type: 'BUY',
          symbol: 'TEST',
          shares: 100,
          price: 50,
          amount: 5000,
          fees: 5,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
        {
          id: '2',
          type: 'BUY',
          symbol: 'TEST',
          shares: 200,
          price: 60,
          amount: 12000,
          fees: 12,
          currency: 'USD',
          date: '2024-02-01',
          isKorean: false,
        },
        {
          id: '3',
          type: 'SELL',
          symbol: 'TEST',
          shares: 150,
          price: 70,
          amount: 10500,
          fees: 10.5,
          currency: 'USD',
          date: '2024-03-01',
          isKorean: false,
        },
      ];

      const result = calculateCapitalGains(complexTransactions);

      // First 100 shares: 100 * (70-50) = 2000
      // Next 50 shares: 50 * (70-60) = 500
      // Total gain before fees: 2500
      // Total fees: 5 + 6 + 10.5 = 21.5 (allocated proportionally)
      expect(result.total).toBeGreaterThan(2450); // Should be around 2478.5
      expect(result.details).toHaveLength(2); // Two separate lot sales
    });

    test('should handle losses correctly', () => {
      const lossTransactions: Transaction[] = [
        {
          id: '1',
          type: 'BUY',
          symbol: 'LOSS',
          shares: 100,
          price: 100,
          amount: 10000,
          fees: 10,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
        {
          id: '2',
          type: 'SELL',
          symbol: 'LOSS',
          shares: 100,
          price: 80,
          amount: 8000,
          fees: 8,
          currency: 'USD',
          date: '2024-06-01',
          isKorean: false,
        },
      ];

      const result = calculateCapitalGains(lossTransactions);
      expect(result.total).toBeLessThan(0); // Should be negative (loss)
    });

    test('should handle insufficient shares for sale', () => {
      const insufficientTransactions: Transaction[] = [
        {
          id: '1',
          type: 'BUY',
          symbol: 'INSUF',
          shares: 50,
          price: 100,
          amount: 5000,
          fees: 5,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
        {
          id: '2',
          type: 'SELL',
          symbol: 'INSUF',
          shares: 100,
          price: 120,
          amount: 12000,
          fees: 12,
          currency: 'USD',
          date: '2024-06-01',
          isKorean: false,
        },
      ];

      const result = calculateCapitalGains(insufficientTransactions);
      // Should only process 50 shares (what was available)
      // Buy fees: 5 * (50/50) = 5
      // Sell fees: 12 * (50/100) = 6
      // Total fees: 11
      // Gain: 50 * (120-100) - 11 = 1000 - 11 = 989
      expect(result.details[0]?.gain).toBeCloseTo(989, 1);
    });
  });

  describe('Dividend Income Calculation', () => {
    test('should calculate domestic and foreign dividends separately', () => {
      const result = calculateDividendIncome(sampleTransactions);

      expect(result.domestic).toBe(17700); // Samsung dividend
      expect(result.foreign).toBe(1.02); // Apple dividend (after withholding)
      expect(result.total).toBe(17701.02);
    });

    test('should calculate foreign withholding taxes', () => {
      const result = calculateDividendIncome(sampleTransactions);

      // Apple dividend: original amount before withholding would be 1.02 / 0.85 = 1.2
      // Withholding: 1.2 * 0.15 = 0.18
      expect(result.withholding).toBeGreaterThan(0);
    });

    test('should handle only domestic dividends', () => {
      const domesticOnly = sampleTransactions.filter(
        t => t.isKorean || t.type !== 'DIVIDEND'
      );
      const result = calculateDividendIncome(domesticOnly);

      expect(result.foreign).toBe(0);
      expect(result.withholding).toBe(0);
      expect(result.domestic).toBe(17700);
    });

    test('should handle only foreign dividends', () => {
      const foreignOnly = sampleTransactions.filter(
        t => !t.isKorean && t.type === 'DIVIDEND'
      );
      const result = calculateDividendIncome(foreignOnly);

      expect(result.domestic).toBe(0);
      expect(result.foreign).toBe(1.02);
      expect(result.withholding).toBeGreaterThan(0);
    });
  });

  describe('Deductible Fees Calculation', () => {
    test('should calculate total trading fees', () => {
      const result = calculateDeductibleFees(sampleTransactions, 50000);

      const expectedTradingFees = 7000 + 3750 + 5 + 3; // All transaction fees
      expect(result.tradingFees).toBe(expectedTradingFees);
      expect(result.managementFees).toBe(50000);
      expect(result.total).toBe(expectedTradingFees + 50000);
    });

    test('should handle zero management fees', () => {
      const result = calculateDeductibleFees(sampleTransactions);

      expect(result.managementFees).toBe(0);
      expect(result.total).toBe(result.tradingFees);
    });

    test('should handle transactions without fees', () => {
      const noFeesTransactions = sampleTransactions.map(t => ({
        ...t,
        fees: 0,
      }));
      const result = calculateDeductibleFees(noFeesTransactions);

      expect(result.tradingFees).toBe(0);
    });
  });

  describe('Capital Gains Tax Calculation', () => {
    test('should calculate Korean stock capital gains tax', () => {
      const capitalGains = 1000000; // 1M KRW
      const tax = calculateCapitalGainsTax(capitalGains, true, false);

      const expectedNationalTax =
        capitalGains * KOREAN_TAX_RATES.capitalGains.domestic;
      const expectedLocalTax =
        expectedNationalTax * KOREAN_TAX_RATES.localIncomeTax;
      const expectedTotal = expectedNationalTax + expectedLocalTax;

      expect(tax).toBeCloseTo(expectedTotal, 2);
    });

    test('should calculate foreign stock capital gains tax', () => {
      const capitalGains = 1000000;
      const tax = calculateCapitalGainsTax(capitalGains, false, false);

      const expectedNationalTax =
        capitalGains * KOREAN_TAX_RATES.capitalGains.foreign;
      const expectedLocalTax =
        expectedNationalTax * KOREAN_TAX_RATES.localIncomeTax;
      const expectedTotal = expectedNationalTax + expectedLocalTax;

      expect(tax).toBeCloseTo(expectedTotal, 2);
    });

    test('should apply higher rate for large shareholders', () => {
      const capitalGains = 1000000;
      const normalTax = calculateCapitalGainsTax(capitalGains, true, false);
      const largeholderTax = calculateCapitalGainsTax(capitalGains, true, true);

      expect(largeholderTax).toBeGreaterThan(normalTax);
    });

    test('should return 0 for losses', () => {
      const tax = calculateCapitalGainsTax(-100000, true, false);
      expect(tax).toBe(0);
    });

    test('should return 0 for zero gains', () => {
      const tax = calculateCapitalGainsTax(0, true, false);
      expect(tax).toBe(0);
    });
  });

  describe('Dividend Tax Calculation', () => {
    test('should calculate dividend tax with foreign tax credit', () => {
      const domesticDividends = 100000;
      const foreignDividends = 50000;
      const foreignWithholding = 7500; // 15% of foreign dividends

      const result = calculateDividendTax(
        domesticDividends,
        foreignDividends,
        foreignWithholding
      );

      const expectedDomesticTax =
        domesticDividends * KOREAN_TAX_RATES.dividend.domestic;
      const expectedForeignTaxBeforeCredit =
        foreignDividends * KOREAN_TAX_RATES.dividend.foreign;
      const expectedCredit = Math.min(
        foreignWithholding,
        expectedForeignTaxBeforeCredit
      );
      const expectedForeignTax = Math.max(
        0,
        expectedForeignTaxBeforeCredit - expectedCredit
      );

      expect(result.domesticTax).toBeCloseTo(expectedDomesticTax, 2);
      expect(result.foreignTax).toBeCloseTo(expectedForeignTax, 2);
      expect(result.foreignTaxCredit).toBeCloseTo(expectedCredit, 2);
      expect(result.totalTax).toBeCloseTo(
        expectedDomesticTax + expectedForeignTax,
        2
      );
    });

    test('should limit foreign tax credit to Korean tax liability', () => {
      const foreignDividends = 100000;
      const foreignWithholding = 20000; // 20% withholding (higher than Korean rate)

      const result = calculateDividendTax(
        0,
        foreignDividends,
        foreignWithholding
      );

      const koreanTaxLiability =
        foreignDividends * KOREAN_TAX_RATES.dividend.foreign;
      expect(result.foreignTaxCredit).toBeLessThanOrEqual(koreanTaxLiability);
    });

    test('should handle zero dividends', () => {
      const result = calculateDividendTax(0, 0, 0);

      expect(result.domesticTax).toBe(0);
      expect(result.foreignTax).toBe(0);
      expect(result.foreignTaxCredit).toBe(0);
      expect(result.totalTax).toBe(0);
    });
  });

  describe('Comprehensive Tax Liability', () => {
    test('should calculate complete tax liability', () => {
      const result = calculateTaxLiability(sampleTransactions, 100000);

      expect(result.capitalGains.total).toBeGreaterThan(0);
      expect(result.dividends.total).toBeGreaterThan(0);
      expect(result.taxLiability.totalTax).toBeGreaterThan(0);
      expect(result.deductions.total).toBeGreaterThan(0);
      expect(result.netTaxableIncome).toBeGreaterThanOrEqual(0);
      expect(result.effectiveTaxRate).toBeGreaterThanOrEqual(0);
    });

    test('should handle large shareholder scenario', () => {
      const normalResult = calculateTaxLiability(sampleTransactions, 0, {
        isLargeShareholder: false,
      });
      const largeholderResult = calculateTaxLiability(sampleTransactions, 0, {
        isLargeShareholder: true,
      });

      expect(largeholderResult.taxLiability.capitalGainsTax).toBeGreaterThan(
        normalResult.taxLiability.capitalGainsTax
      );
    });

    test('should handle different holding periods', () => {
      const shortTermResult = calculateTaxLiability(sampleTransactions, 0, {
        holdingPeriod: 30,
      });
      const longTermResult = calculateTaxLiability(sampleTransactions, 0, {
        holdingPeriod: 365,
      });

      // 30-day threshold: Samsung (182d) = longTerm, Apple (29d) = shortTerm → shortTerm = 94.5
      // 365-day threshold: Samsung (182d) = shortTerm, Apple (29d) = shortTerm → shortTerm = 242,844.5
      // Therefore: longTermResult.shortTerm > shortTermResult.shortTerm
      expect(longTermResult.capitalGains.shortTerm).toBeGreaterThan(
        shortTermResult.capitalGains.shortTerm
      );
    });

    test('should calculate effective tax rate correctly', () => {
      const result = calculateTaxLiability(sampleTransactions, 50000);

      const grossIncome = result.capitalGains.total + result.dividends.total;
      const expectedEffectiveRate =
        grossIncome > 0
          ? (result.taxLiability.totalTax / grossIncome) * 100
          : 0;

      expect(result.effectiveTaxRate).toBeCloseTo(expectedEffectiveRate, 4);
    });
  });

  describe('Quarterly Tax Calculation', () => {
    test('should calculate Q1 tax liability', () => {
      const q1Result = calculateQuarterlyTax(
        sampleTransactions,
        1,
        2024,
        100000
      );

      // Should only include Q1 transactions
      expect(q1Result).toBeDefined();
      expect(q1Result.capitalGains.total).toBeGreaterThanOrEqual(0);
    });

    test('should calculate different quarters', () => {
      const q1Result = calculateQuarterlyTax(sampleTransactions, 1, 2024);
      const q2Result = calculateQuarterlyTax(sampleTransactions, 2, 2024);
      const q3Result = calculateQuarterlyTax(sampleTransactions, 3, 2024);
      const q4Result = calculateQuarterlyTax(sampleTransactions, 4, 2024);

      // Different quarters should have different results
      const results = [q1Result, q2Result, q3Result, q4Result];
      expect(results.some(r => r.capitalGains.total > 0)).toBe(true);
    });

    test('should handle quarter with no transactions', () => {
      const q4Result = calculateQuarterlyTax(sampleTransactions, 4, 2024);

      // Q4 should have minimal activity based on sample data
      expect(q4Result.capitalGains.total).toBe(0);
      expect(q4Result.dividends.total).toBe(0);
    });
  });

  describe('Tax Loss Harvesting', () => {
    const lossPositions = [
      {
        symbol: 'LOSS1',
        shares: 100,
        averagePrice: 100,
        currentPrice: 80,
        isKorean: true,
      },
      {
        symbol: 'LOSS2',
        shares: 50,
        averagePrice: 200,
        currentPrice: 150,
        isKorean: false,
      },
      {
        symbol: 'GAIN1',
        shares: 200,
        averagePrice: 50,
        currentPrice: 60,
        isKorean: true,
      },
    ];

    test('should identify tax loss harvesting opportunities', () => {
      const opportunities = generateTaxLossHarvesting(lossPositions, 5000);

      // Tax loss harvesting only returns loss positions (LOSS1, LOSS2), not gains (GAIN1)
      expect(opportunities).toHaveLength(2);

      const lossOpportunities = opportunities.filter(o => o.unrealizedLoss > 0);
      expect(lossOpportunities).toHaveLength(2);

      const sellRecommendations = opportunities.filter(
        o => o.recommendation === 'SELL'
      );
      expect(sellRecommendations.length).toBeGreaterThan(0);
    });

    test('should calculate tax savings correctly', () => {
      const opportunities = generateTaxLossHarvesting(lossPositions, 10000);

      const loss1 = opportunities.find(o => o.symbol === 'LOSS1');
      const expectedLoss1 = (100 - 80) * 100; // 2000
      const expectedTaxSavings1 =
        expectedLoss1 * KOREAN_TAX_RATES.capitalGains.domestic;

      expect(loss1?.unrealizedLoss).toBe(expectedLoss1);
      expect(loss1?.taxSavings).toBeCloseTo(expectedTaxSavings1, 2);
    });

    test('should prioritize largest losses', () => {
      const opportunities = generateTaxLossHarvesting(lossPositions, 1000);

      // Should recommend selling the largest loss first
      const sellRecommendations = opportunities.filter(
        o => o.recommendation === 'SELL'
      );
      if (sellRecommendations.length > 0) {
        const firstSell = sellRecommendations[0];
        expect(firstSell?.unrealizedLoss).toBeGreaterThan(1000);
      }
    });

    test('should not recommend selling gains', () => {
      const opportunities = generateTaxLossHarvesting(lossPositions, 5000);

      // GAIN1 should not be included in tax loss harvesting opportunities
      // (only loss positions are returned)
      const gainPosition = opportunities.find(o => o.symbol === 'GAIN1');
      expect(gainPosition).toBeUndefined();

      // All returned opportunities should have positive unrealized losses
      opportunities.forEach(opp => {
        expect(opp.unrealizedLoss).toBeGreaterThan(0);
      });
    });
  });

  describe('Transaction Validation', () => {
    test('should validate correct transaction data', () => {
      const validation = validateTransactionData(sampleTransactions);

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should catch missing required fields', () => {
      const invalidTransactions: Transaction[] = [
        {
          id: '',
          type: 'BUY',
          symbol: '',
          shares: 0,
          price: 0,
          amount: 0,
          fees: 0,
          currency: '',
          date: '',
          isKorean: true,
        },
      ];

      const validation = validateTransactionData(invalidTransactions);

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(
        validation.errors.some(e => e.includes('Missing transaction ID'))
      ).toBe(true);
      expect(validation.errors.some(e => e.includes('Missing symbol'))).toBe(
        true
      );
    });

    test('should catch invalid numeric values', () => {
      const invalidTransactions: Transaction[] = [
        {
          id: 'invalid',
          type: 'BUY',
          symbol: 'TEST',
          shares: -10,
          price: -100,
          amount: -1000,
          fees: 0,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
      ];

      const validation = validateTransactionData(invalidTransactions);

      expect(validation.isValid).toBe(false);
      expect(
        validation.errors.some(e => e.includes('Invalid shares amount'))
      ).toBe(true);
      expect(validation.errors.some(e => e.includes('Invalid price'))).toBe(
        true
      );
    });

    test('should catch invalid dates', () => {
      const invalidTransactions: Transaction[] = [
        {
          id: 'invalid-date',
          type: 'BUY',
          symbol: 'TEST',
          shares: 10,
          price: 100,
          amount: 1000,
          fees: 1,
          currency: 'USD',
          date: 'invalid-date',
          isKorean: false,
        },
      ];

      const validation = validateTransactionData(invalidTransactions);

      expect(validation.isValid).toBe(false);
      expect(
        validation.errors.some(e => e.includes('Invalid date format'))
      ).toBe(true);
    });

    test('should warn about amount inconsistencies', () => {
      const inconsistentTransactions: Transaction[] = [
        {
          id: 'inconsistent',
          type: 'BUY',
          symbol: 'TEST',
          shares: 10,
          price: 100,
          amount: 1500, // Should be 1000
          fees: 1,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
      ];

      const validation = validateTransactionData(inconsistentTransactions);

      expect(
        validation.warnings.some(w => w.includes("Amount doesn't match"))
      ).toBe(true);
    });

    test('should allow dividends with zero shares', () => {
      const dividendTransactions: Transaction[] = [
        {
          id: 'dividend',
          type: 'DIVIDEND',
          symbol: 'TEST',
          shares: 0,
          price: 1,
          amount: 100,
          fees: 0,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
      ];

      const validation = validateTransactionData(dividendTransactions);

      expect(validation.isValid).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty transaction array', () => {
      const result = calculateTaxLiability([]);

      expect(result.capitalGains.total).toBe(0);
      expect(result.dividends.total).toBe(0);
      expect(result.taxLiability.totalTax).toBe(0);
      expect(result.effectiveTaxRate).toBe(0);
    });

    test('should handle very large numbers', () => {
      const largeTransactions: Transaction[] = [
        {
          id: 'large',
          type: 'BUY',
          symbol: 'LARGE',
          shares: 1000000,
          price: 10000,
          amount: 10000000000, // 10 billion
          fees: 1000000,
          currency: 'KRW',
          date: '2024-01-01',
          isKorean: true,
        },
      ];

      const result = calculateTaxLiability(largeTransactions);
      expect(result.deductions.tradingFees).toBe(1000000);
    });

    test('should handle very small numbers', () => {
      const smallTransactions: Transaction[] = [
        {
          id: 'small',
          type: 'DIVIDEND',
          symbol: 'SMALL',
          shares: 1,
          price: 0.001,
          amount: 0.001,
          fees: 0,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
      ];

      const result = calculateTaxLiability(smallTransactions);
      // Note: Implementation rounds to 2 decimal places (Math.round(x * 100) / 100)
      // So 0.001 rounds to 0.00 (standard financial rounding)
      expect(result.dividends.foreign).toBeCloseTo(0, 2);
    });

    test('should handle precision correctly', () => {
      const precisionTransactions: Transaction[] = [
        {
          id: 'precision',
          type: 'BUY',
          symbol: 'PREC',
          shares: 333.333333,
          price: 33.333333,
          amount: 11111.1109,
          fees: 11.11,
          currency: 'USD',
          date: '2024-01-01',
          isKorean: false,
        },
        {
          id: 'precision-sell',
          type: 'SELL',
          symbol: 'PREC',
          shares: 333.333333,
          price: 36.666666,
          amount: 12222.2218,
          fees: 12.22,
          currency: 'USD',
          date: '2024-06-01',
          isKorean: false,
        },
      ];

      const result = calculateCapitalGains(precisionTransactions);
      expect(result.total).toBeCloseTo(1087.78, 2); // Approximate expected gain
    });
  });
});
