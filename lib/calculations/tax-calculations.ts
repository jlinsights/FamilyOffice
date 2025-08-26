/**
 * Tax calculation functions for Korean financial regulations
 * Critical for compliance and reporting accuracy
 */

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'INTEREST';
  symbol: string;
  shares: number;
  price: number;
  amount: number;
  fees: number;
  currency: string;
  date: string;
  isKorean: boolean;
}

export interface TaxCalculationResult {
  capitalGains: {
    shortTerm: number;
    longTerm: number;
    total: number;
  };
  dividends: {
    domestic: number;
    foreign: number;
    total: number;
  };
  taxLiability: {
    capitalGainsTax: number;
    dividendTax: number;
    localIncomeTax: number;
    totalTax: number;
  };
  deductions: {
    tradingFees: number;
    managementFees: number;
    foreignTaxCredit: number;
    total: number;
  };
  netTaxableIncome: number;
  effectiveTaxRate: number;
}

export interface KoreanTaxRates {
  capitalGains: {
    domestic: number;
    foreign: number;
    largeShareholderThreshold: number;
    largeShareholderRate: number;
  };
  dividend: {
    domestic: number;
    foreign: number;
    withholding: number;
  };
  localIncomeTax: number;
}

// Korean tax rates for 2024
export const KOREAN_TAX_RATES: KoreanTaxRates = {
  capitalGains: {
    domestic: 0.22, // 22% for major shareholders
    foreign: 0.22, // 22% for foreign stocks
    largeShareholderThreshold: 0.01, // 1% ownership threshold
    largeShareholderRate: 0.25, // 25% for large shareholders
  },
  dividend: {
    domestic: 0.154, // 15.4% (14% + 1.4% local)
    foreign: 0.154, // 15.4% with foreign tax credit
    withholding: 0.14, // 14% withholding
  },
  localIncomeTax: 0.1, // 10% of national tax
};

/**
 * Calculate capital gains from transactions using FIFO method
 */
export function calculateCapitalGains(
  transactions: Transaction[],
  holdingPeriod: number = 365 // Days for long-term classification
): {
  shortTerm: number;
  longTerm: number;
  total: number;
  details: Array<{
    symbol: string;
    gain: number;
    isLongTerm: boolean;
    sellDate: string;
    buyDate: string;
  }>;
} {
  const holdings = new Map<
    string,
    Array<{
      shares: number;
      price: number;
      date: Date;
      fees: number;
    }>
  >();

  const gains: Array<{
    symbol: string;
    gain: number;
    isLongTerm: boolean;
    sellDate: string;
    buyDate: string;
  }> = [];

  let shortTermGains = 0;
  let longTermGains = 0;

  // Sort transactions by date
  const sortedTransactions = transactions
    .filter(t => t.type === 'BUY' || t.type === 'SELL')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (const transaction of sortedTransactions) {
    const { symbol, type, shares, price, date, fees } = transaction;

    if (!holdings.has(symbol)) {
      holdings.set(symbol, []);
    }

    const symbolHoldings = holdings.get(symbol)!;

    if (type === 'BUY') {
      symbolHoldings.push({
        shares,
        price,
        date: new Date(date),
        fees: fees || 0,
      });
    } else if (type === 'SELL') {
      let remainingShares = shares;
      const sellDate = new Date(date);

      while (remainingShares > 0 && symbolHoldings.length > 0) {
        const holding = symbolHoldings[0];
        if (!holding) break;
        
        const sharesToSell = Math.min(remainingShares, holding.shares);

        // Calculate gain/loss
        const sellAmount = sharesToSell * price;
        const buyAmount = sharesToSell * holding.price;
        const allocatedFees =
          (holding.fees * sharesToSell) / holding.shares +
          (fees * sharesToSell) / shares;
        const gain = sellAmount - buyAmount - allocatedFees;

        // Determine if long-term or short-term
        const daysDiff = Math.floor(
          (sellDate.getTime() - holding.date.getTime()) / (1000 * 60 * 60 * 24)
        );
        const isLongTerm = daysDiff >= holdingPeriod;

        gains.push({
          symbol,
          gain: Math.round(gain * 100) / 100,
          isLongTerm,
          sellDate: date,
          buyDate: holding.date.toISOString(),
        });

        if (isLongTerm) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }

        // Update holding
        holding.shares -= sharesToSell;
        holding.fees -=
          (holding.fees * sharesToSell) / (holding.shares + sharesToSell);

        if (holding.shares <= 0) {
          symbolHoldings.shift();
        }

        remainingShares -= sharesToSell;
      }
    }
  }

  return {
    shortTerm: Math.round(shortTermGains * 100) / 100,
    longTerm: Math.round(longTermGains * 100) / 100,
    total: Math.round((shortTermGains + longTermGains) * 100) / 100,
    details: gains,
  };
}

/**
 * Calculate dividend income and withholding taxes
 */
export function calculateDividendIncome(transactions: Transaction[]): {
  domestic: number;
  foreign: number;
  total: number;
  withholding: number;
  details: Array<{
    symbol: string;
    amount: number;
    isDomestic: boolean;
    date: string;
    withholding: number;
  }>;
} {
  const dividendTransactions = transactions.filter(t => t.type === 'DIVIDEND');
  const details: Array<{
    symbol: string;
    amount: number;
    isDomestic: boolean;
    date: string;
    withholding: number;
  }> = [];

  let domesticDividends = 0;
  let foreignDividends = 0;
  let totalWithholding = 0;

  for (const transaction of dividendTransactions) {
    const { symbol, amount, isKorean, date } = transaction;
    const isDomestic = isKorean;

    // Calculate withholding tax (assumed to be already deducted for foreign dividends)
    const withholding = isDomestic ? 0 : amount * 0.15; // Assume 15% foreign withholding

    details.push({
      symbol,
      amount,
      isDomestic,
      date,
      withholding,
    });

    if (isDomestic) {
      domesticDividends += amount;
    } else {
      foreignDividends += amount;
      totalWithholding += withholding;
    }
  }

  return {
    domestic: Math.round(domesticDividends * 100) / 100,
    foreign: Math.round(foreignDividends * 100) / 100,
    total: Math.round((domesticDividends + foreignDividends) * 100) / 100,
    withholding: Math.round(totalWithholding * 100) / 100,
    details,
  };
}

/**
 * Calculate total trading fees for deduction
 */
export function calculateDeductibleFees(
  transactions: Transaction[],
  managementFees: number = 0
): {
  tradingFees: number;
  managementFees: number;
  total: number;
} {
  const tradingFees = transactions.reduce((total, transaction) => {
    return total + (transaction.fees || 0);
  }, 0);

  return {
    tradingFees: Math.round(tradingFees * 100) / 100,
    managementFees: Math.round(managementFees * 100) / 100,
    total: Math.round((tradingFees + managementFees) * 100) / 100,
  };
}

/**
 * Calculate Korean capital gains tax
 */
export function calculateCapitalGainsTax(
  capitalGains: number,
  isKoreanStock: boolean = true,
  isLargeShareholder: boolean = false
): number {
  if (capitalGains <= 0) {
    return 0;
  }

  const taxRates = KOREAN_TAX_RATES.capitalGains;
  let taxRate = isKoreanStock ? taxRates.domestic : taxRates.foreign;

  if (isLargeShareholder) {
    taxRate = taxRates.largeShareholderRate;
  }

  const nationalTax = capitalGains * taxRate;
  const localTax = nationalTax * KOREAN_TAX_RATES.localIncomeTax;

  return Math.round((nationalTax + localTax) * 100) / 100;
}

/**
 * Calculate Korean dividend tax with foreign tax credit
 */
export function calculateDividendTax(
  domesticDividends: number,
  foreignDividends: number,
  foreignWithholding: number = 0
): {
  domesticTax: number;
  foreignTax: number;
  foreignTaxCredit: number;
  totalTax: number;
} {
  const taxRates = KOREAN_TAX_RATES.dividend;

  // Domestic dividend tax
  const domesticTax = domesticDividends * taxRates.domestic;

  // Foreign dividend tax before credit
  const foreignTaxBeforeCredit = foreignDividends * taxRates.foreign;

  // Foreign tax credit (limited to Korean tax on foreign dividends)
  const foreignTaxCredit = Math.min(foreignWithholding, foreignTaxBeforeCredit);

  // Net foreign tax after credit
  const foreignTax = Math.max(0, foreignTaxBeforeCredit - foreignTaxCredit);

  return {
    domesticTax: Math.round(domesticTax * 100) / 100,
    foreignTax: Math.round(foreignTax * 100) / 100,
    foreignTaxCredit: Math.round(foreignTaxCredit * 100) / 100,
    totalTax: Math.round((domesticTax + foreignTax) * 100) / 100,
  };
}

/**
 * Calculate comprehensive tax liability
 */
export function calculateTaxLiability(
  transactions: Transaction[],
  managementFees: number = 0,
  options: {
    isLargeShareholder?: boolean;
    holdingPeriod?: number;
  } = {}
): TaxCalculationResult {
  const { isLargeShareholder = false, holdingPeriod = 365 } = options;

  // Calculate capital gains
  const capitalGainsResult = calculateCapitalGains(transactions, holdingPeriod);

  // Calculate dividend income
  const dividendResult = calculateDividendIncome(transactions);

  // Calculate deductible fees
  const feesResult = calculateDeductibleFees(transactions, managementFees);

  // Separate Korean and foreign capital gains
  const koreanTransactions = transactions.filter(t => t.isKorean);
  const foreignTransactions = transactions.filter(t => !t.isKorean);

  const koreanCapitalGains = calculateCapitalGains(
    koreanTransactions,
    holdingPeriod
  );
  const foreignCapitalGains = calculateCapitalGains(
    foreignTransactions,
    holdingPeriod
  );

  // Calculate taxes
  const koreanCapitalGainsTax = calculateCapitalGainsTax(
    koreanCapitalGains.total,
    true,
    isLargeShareholder
  );

  const foreignCapitalGainsTax = calculateCapitalGainsTax(
    foreignCapitalGains.total,
    false,
    isLargeShareholder
  );

  const dividendTax = calculateDividendTax(
    dividendResult.domestic,
    dividendResult.foreign,
    dividendResult.withholding
  );

  // Total tax calculation
  const totalCapitalGainsTax = koreanCapitalGainsTax + foreignCapitalGainsTax;
  const totalDividendTax = dividendTax.totalTax;
  const localIncomeTax =
    (totalCapitalGainsTax + totalDividendTax) * KOREAN_TAX_RATES.localIncomeTax;
  const totalTax = totalCapitalGainsTax + totalDividendTax + localIncomeTax;

  // Net taxable income after deductions
  const grossIncome = capitalGainsResult.total + dividendResult.total;
  const netTaxableIncome = Math.max(0, grossIncome - feesResult.total);

  // Effective tax rate
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    capitalGains: {
      shortTerm: capitalGainsResult.shortTerm,
      longTerm: capitalGainsResult.longTerm,
      total: capitalGainsResult.total,
    },
    dividends: {
      domestic: dividendResult.domestic,
      foreign: dividendResult.foreign,
      total: dividendResult.total,
    },
    taxLiability: {
      capitalGainsTax: Math.round(totalCapitalGainsTax * 100) / 100,
      dividendTax: Math.round(totalDividendTax * 100) / 100,
      localIncomeTax: Math.round(localIncomeTax * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
    },
    deductions: {
      tradingFees: feesResult.tradingFees,
      managementFees: feesResult.managementFees,
      foreignTaxCredit: dividendTax.foreignTaxCredit,
      total: feesResult.total + dividendTax.foreignTaxCredit,
    },
    netTaxableIncome: Math.round(netTaxableIncome * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 10000) / 10000,
  };
}

/**
 * Calculate estimated quarterly tax payments
 */
export function calculateQuarterlyTax(
  transactions: Transaction[],
  quarter: 1 | 2 | 3 | 4,
  year: number,
  managementFees: number = 0
): TaxCalculationResult {
  const quarterStart = new Date(year, (quarter - 1) * 3, 1);
  const quarterEnd = new Date(year, quarter * 3, 0);

  const quarterTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= quarterStart && transactionDate <= quarterEnd;
  });

  return calculateTaxLiability(quarterTransactions, managementFees / 4);
}

/**
 * Generate tax loss harvesting opportunities
 */
export function generateTaxLossHarvesting(
  currentPositions: Array<{
    symbol: string;
    shares: number;
    averagePrice: number;
    currentPrice: number;
    isKorean: boolean;
  }>,
  capitalGainsToOffset: number
): Array<{
  symbol: string;
  unrealizedLoss: number;
  recommendation: 'SELL' | 'HOLD';
  taxSavings: number;
  washSaleRisk: boolean;
}> {
  const opportunities: Array<{
    symbol: string;
    unrealizedLoss: number;
    recommendation: 'SELL' | 'HOLD';
    taxSavings: number;
    washSaleRisk: boolean;
  }> = [];

  let remainingGains = capitalGainsToOffset;

  // Sort positions by unrealized loss (largest losses first)
  const lossPositions = currentPositions
    .filter(position => position.currentPrice < position.averagePrice)
    .sort((a, b) => {
      const lossA = (a.averagePrice - a.currentPrice) * a.shares;
      const lossB = (b.averagePrice - b.currentPrice) * b.shares;
      return lossB - lossA;
    });

  for (const position of lossPositions) {
    const unrealizedLoss =
      (position.averagePrice - position.currentPrice) * position.shares;
    const taxRate = position.isKorean
      ? KOREAN_TAX_RATES.capitalGains.domestic
      : KOREAN_TAX_RATES.capitalGains.foreign;
    const taxSavings = Math.min(unrealizedLoss, remainingGains) * taxRate;

    opportunities.push({
      symbol: position.symbol,
      unrealizedLoss: Math.round(unrealizedLoss * 100) / 100,
      recommendation:
        remainingGains > 0 && unrealizedLoss >= 1000 ? 'SELL' : 'HOLD',
      taxSavings: Math.round(taxSavings * 100) / 100,
      washSaleRisk: false, // Simplified - would need more complex logic for real wash sale detection
    });

    if (remainingGains > 0) {
      remainingGains = Math.max(0, remainingGains - unrealizedLoss);
    }
  }

  return opportunities;
}

/**
 * Validate transaction data for tax calculation
 */
export function validateTransactionData(transactions: Transaction[]): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [index, transaction] of transactions.entries()) {
    const prefix = `Transaction ${index + 1} (${transaction.id})`;

    // Required fields
    if (!transaction.id) errors.push(`${prefix}: Missing transaction ID`);
    if (!transaction.symbol) errors.push(`${prefix}: Missing symbol`);
    if (!transaction.type) errors.push(`${prefix}: Missing transaction type`);
    if (!transaction.date) errors.push(`${prefix}: Missing date`);

    // Numeric validations
    if (transaction.shares <= 0 && transaction.type !== 'DIVIDEND') {
      errors.push(`${prefix}: Invalid shares amount`);
    }
    if (transaction.price <= 0) errors.push(`${prefix}: Invalid price`);
    if (transaction.amount <= 0) errors.push(`${prefix}: Invalid amount`);

    // Date validation
    const transactionDate = new Date(transaction.date);
    if (isNaN(transactionDate.getTime())) {
      errors.push(`${prefix}: Invalid date format`);
    }

    // Consistency checks
    if (transaction.type === 'BUY' || transaction.type === 'SELL') {
      const expectedAmount = transaction.shares * transaction.price;
      const tolerance = expectedAmount * 0.01; // 1% tolerance for rounding

      if (Math.abs(transaction.amount - expectedAmount) > tolerance) {
        warnings.push(`${prefix}: Amount doesn't match shares × price`);
      }
    }

    // Currency validation
    if (!transaction.currency) {
      warnings.push(`${prefix}: Missing currency information`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
