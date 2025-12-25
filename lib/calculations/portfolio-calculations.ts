/**
 * Portfolio calculation functions for FamilyOffice
 * Critical financial calculations requiring 95%+ test coverage
 */

export interface Position {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  currency: string;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  allocation: Record<string, number>;
}

export interface PerformanceMetrics {
  returns: {
    daily: number;
    weekly: number;
    monthly: number;
    quarterly: number;
    yearly: number;
    ytd: number;
  };
  volatility: {
    daily: number;
    annualized: number;
  };
  sharpeRatio: number;
  maxDrawdown: number;
  beta: number;
  alpha: number;
}

/**
 * Calculate position market value
 */
export function calculatePositionValue(position: Position): number {
  if (!position || position.shares <= 0 || position.currentPrice <= 0) {
    return 0;
  }
  return position.shares * position.currentPrice;
}

/**
 * Calculate position cost basis
 */
export function calculatePositionCost(position: Position): number {
  if (!position || position.shares <= 0 || position.averagePrice <= 0) {
    return 0;
  }
  return position.shares * position.averagePrice;
}

/**
 * Calculate unrealized gain/loss for a position
 */
export function calculateUnrealizedGain(position: Position): {
  gain: number;
  gainPercent: number;
} {
  const marketValue = calculatePositionValue(position);
  const costBasis = calculatePositionCost(position);

  if (costBasis === 0) {
    return { gain: 0, gainPercent: 0 };
  }

  const gain = marketValue - costBasis;
  const gainPercent = (gain / costBasis) * 100;

  return {
    gain: Math.round(gain * 100) / 100,
    gainPercent: Math.round(gainPercent * 10000) / 10000,
  };
}

/**
 * Calculate portfolio total value
 */
export function calculatePortfolioValue(
  positions: Position[],
  cash: number = 0
): number {
  const positionsValue = positions.reduce((total, position) => {
    return total + calculatePositionValue(position);
  }, 0);

  return positionsValue + cash;
}

/**
 * Calculate portfolio allocation by position
 */
export function calculatePortfolioAllocation(
  positions: Position[],
  cash: number = 0
): Record<string, number> {
  const totalValue = calculatePortfolioValue(positions, cash);

  if (totalValue === 0) {
    return {};
  }

  const allocation: Record<string, number> = {};

  // Calculate position allocations
  positions.forEach(position => {
    const positionValue = calculatePositionValue(position);
    const weight = (positionValue / totalValue) * 100;
    allocation[position.symbol] = Math.round(weight * 100) / 100;
  });

  // Add cash allocation
  if (cash > 0) {
    const cashWeight = (cash / totalValue) * 100;
    allocation['CASH'] = Math.round(cashWeight * 100) / 100;
  }

  return allocation;
}

/**
 * Calculate portfolio metrics
 */
export function calculatePortfolioMetrics(
  positions: Position[],
  cash: number = 0,
  previousValue?: number
): PortfolioMetrics {
  const totalValue = calculatePortfolioValue(positions, cash);

  const totalCost =
    positions.reduce((total, position) => {
      return total + calculatePositionCost(position);
    }, 0) + cash;

  const totalGain = totalValue - totalCost;
  const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

  let dayChange = 0;
  let dayChangePercent = 0;

  if (previousValue && previousValue > 0) {
    dayChange = totalValue - previousValue;
    dayChangePercent = (dayChange / previousValue) * 100;
  }

  const allocation = calculatePortfolioAllocation(positions, cash);

  return {
    totalValue: Math.round(totalValue * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalGain: Math.round(totalGain * 100) / 100,
    totalGainPercent: Math.round(totalGainPercent * 10000) / 10000,
    dayChange: Math.round(dayChange * 100) / 100,
    dayChangePercent: Math.round(dayChangePercent * 10000) / 10000,
    allocation,
  };
}

/**
 * Calculate annualized return
 */
export function calculateAnnualizedReturn(
  startValue: number,
  endValue: number,
  years: number
): number {
  if (startValue <= 0 || years <= 0) {
    return 0;
  }

  const totalReturn = endValue / startValue;
  const annualizedReturn = (Math.pow(totalReturn, 1 / years) - 1) * 100;

  return Math.round(annualizedReturn * 10000) / 10000;
}

/**
 * Calculate portfolio volatility (standard deviation of returns)
 */
export function calculateVolatility(returns: number[]): number {
  if (returns.length < 2) {
    return 0;
  }

  const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance =
    returns.reduce((sum, ret) => {
      return sum + Math.pow(ret - mean, 2);
    }, 0) /
    (returns.length - 1);

  const standardDeviation = Math.sqrt(variance);

  return Math.round(standardDeviation * 10000) / 10000;
}

/**
 * Calculate Sharpe ratio
 */
export function calculateSharpeRatio(
  portfolioReturn: number,
  riskFreeRate: number,
  volatility: number
): number {
  if (volatility === 0) {
    return 0;
  }

  const excessReturn = portfolioReturn - riskFreeRate;
  const sharpeRatio = excessReturn / volatility;

  return Math.round(sharpeRatio * 10000) / 10000;
}

/**
 * Calculate maximum drawdown
 */
export function calculateMaxDrawdown(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }

  if (values.length === 0 || values[0] === undefined) return 0;

  let maxDrawdown = 0;
  let peak = values[0];

  for (let i = 1; i < values.length; i++) {
    const currentValue = values[i];
    if (
      currentValue !== undefined &&
      peak !== undefined &&
      currentValue > peak
    ) {
      peak = currentValue;
    }

    if (currentValue !== undefined && peak !== undefined) {
      const drawdown = (peak - currentValue) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
  }

  return Math.round(maxDrawdown * 10000) / 10000;
}

/**
 * Calculate portfolio beta against benchmark
 */
export function calculateBeta(
  portfolioReturns: number[],
  benchmarkReturns: number[]
): number {
  if (
    portfolioReturns.length !== benchmarkReturns.length ||
    portfolioReturns.length < 2
  ) {
    return 1;
  }

  const portfolioMean =
    portfolioReturns.reduce((sum, ret) => sum + ret, 0) /
    portfolioReturns.length;
  const benchmarkMean =
    benchmarkReturns.reduce((sum, ret) => sum + ret, 0) /
    benchmarkReturns.length;

  let covariance = 0;
  let benchmarkVariance = 0;

  for (let i = 0; i < portfolioReturns.length; i++) {
    const portfolioReturn = portfolioReturns[i];
    const benchmarkReturn = benchmarkReturns[i];

    if (portfolioReturn !== undefined && benchmarkReturn !== undefined) {
      const portfolioDeviation = portfolioReturn - portfolioMean;
      const benchmarkDeviation = benchmarkReturn - benchmarkMean;

      covariance += portfolioDeviation * benchmarkDeviation;
      benchmarkVariance += benchmarkDeviation * benchmarkDeviation;
    }
  }

  covariance /= portfolioReturns.length - 1;
  benchmarkVariance /= benchmarkReturns.length - 1;

  if (benchmarkVariance === 0) {
    return 1;
  }

  const beta = covariance / benchmarkVariance;

  return Math.round(beta * 10000) / 10000;
}

/**
 * Calculate portfolio alpha (Jensen's alpha)
 */
export function calculateAlpha(
  portfolioReturn: number,
  riskFreeRate: number,
  beta: number,
  benchmarkReturn: number
): number {
  const expectedReturn = riskFreeRate + beta * (benchmarkReturn - riskFreeRate);
  const alpha = portfolioReturn - expectedReturn;

  return Math.round(alpha * 10000) / 10000;
}

/**
 * Calculate comprehensive performance metrics
 */
export function calculatePerformanceMetrics(
  portfolioValues: number[],
  benchmarkValues: number[],
  riskFreeRate: number = 0.02
): PerformanceMetrics {
  if (portfolioValues.length < 2) {
    throw new Error('Insufficient data for performance calculation');
  }

  // Calculate daily returns
  const portfolioReturns = portfolioValues.slice(1).map((value, i) => {
    const prevValue = portfolioValues[i];
    if (value !== undefined && prevValue !== undefined && prevValue !== 0) {
      return (value - prevValue) / prevValue;
    }
    return 0;
  });

  const benchmarkReturns = benchmarkValues.slice(1).map((value, i) => {
    const prevValue = benchmarkValues[i];
    if (value !== undefined && prevValue !== undefined && prevValue !== 0) {
      return (value - prevValue) / prevValue;
    }
    return 0;
  });

  // Calculate various period returns
  const totalDays = portfolioValues.length - 1;
  const dailyReturn =
    portfolioReturns.reduce((sum, ret) => sum + ret, 0) /
    portfolioReturns.length;

  const startValue = portfolioValues[0];
  const endValue = portfolioValues[portfolioValues.length - 1];

  const returns = {
    daily: dailyReturn * 100,
    weekly: dailyReturn * 7 * 100,
    monthly: dailyReturn * 30 * 100,
    quarterly: dailyReturn * 90 * 100,
    yearly:
      startValue !== undefined && endValue !== undefined
        ? calculateAnnualizedReturn(startValue, endValue, totalDays / 365)
        : 0,
    ytd:
      startValue !== undefined && endValue !== undefined && startValue !== 0
        ? (endValue / startValue - 1) * 100
        : 0,
  };

  // Calculate volatility
  const dailyVolatility = calculateVolatility(portfolioReturns) * 100;
  const annualizedVolatility = dailyVolatility * Math.sqrt(252); // 252 trading days

  const volatility = {
    daily: dailyVolatility,
    annualized: annualizedVolatility,
  };

  // Calculate risk-adjusted metrics
  const sharpeRatio = calculateSharpeRatio(
    returns.yearly,
    riskFreeRate * 100,
    annualizedVolatility
  );
  const maxDrawdown = calculateMaxDrawdown(portfolioValues) * 100;
  const beta = calculateBeta(portfolioReturns, benchmarkReturns);
  const benchmarkStartValue = benchmarkValues[0];
  const benchmarkEndValue = benchmarkValues[benchmarkValues.length - 1];

  const alpha = calculateAlpha(
    returns.yearly,
    riskFreeRate * 100,
    beta,
    benchmarkStartValue !== undefined && benchmarkEndValue !== undefined
      ? calculateAnnualizedReturn(
          benchmarkStartValue,
          benchmarkEndValue,
          totalDays / 365
        )
      : 0
  );

  return {
    returns: {
      daily: Math.round(returns.daily * 10000) / 10000,
      weekly: Math.round(returns.weekly * 10000) / 10000,
      monthly: Math.round(returns.monthly * 10000) / 10000,
      quarterly: Math.round(returns.quarterly * 10000) / 10000,
      yearly: Math.round(returns.yearly * 10000) / 10000,
      ytd: Math.round(returns.ytd * 10000) / 10000,
    },
    volatility,
    sharpeRatio,
    maxDrawdown,
    beta,
    alpha,
  };
}

/**
 * Calculate portfolio rebalancing requirements
 */
export function calculateRebalancing(
  currentAllocation: Record<string, number>,
  targetAllocation: Record<string, number>,
  totalValue: number,
  threshold: number = 5 // 5% threshold
): Array<{
  symbol: string;
  currentWeight: number;
  targetWeight: number;
  difference: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  amount: number;
}> {
  const rebalancingActions: Array<{
    symbol: string;
    currentWeight: number;
    targetWeight: number;
    difference: number;
    action: 'BUY' | 'SELL' | 'HOLD';
    amount: number;
  }> = [];

  // Check all symbols in target allocation
  Object.keys(targetAllocation).forEach(symbol => {
    const currentWeight = currentAllocation[symbol] || 0;
    const targetWeight = targetAllocation[symbol];
    if (targetWeight === undefined) return;

    const difference = currentWeight - targetWeight;

    let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    let amount = 0;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        action = 'SELL';
        amount = (difference / 100) * totalValue;
      } else {
        action = 'BUY';
        amount = Math.abs(difference / 100) * totalValue;
      }
    }

    rebalancingActions.push({
      symbol,
      currentWeight: Math.round(currentWeight * 100) / 100,
      targetWeight: Math.round(targetWeight * 100) / 100,
      difference: Math.round(difference * 100) / 100,
      action,
      amount: Math.round(amount * 100) / 100,
    });
  });

  return rebalancingActions;
}
