// 포트폴리오 기본 타입
export interface Portfolio {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  currency: string;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
}

// 포트폴리오 자산 타입
export interface PortfolioAsset {
  id: string;
  portfolioId: string;
  assetId: string;
  symbol: string;
  name: string;
  assetType: AssetType;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  costBasis: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercent: number;
  weight: number; // 포트폴리오 내 비중
  lastUpdated: Date;
}

// 자산 타입 열거형
export enum AssetType {
  STOCK = 'stock',
  BOND = 'bond',
  ETF = 'etf',
  MUTUAL_FUND = 'mutual_fund',
  REAL_ESTATE = 'real_estate',
  PRIVATE_EQUITY = 'private_equity',
  HEDGE_FUND = 'hedge_fund',
  CASH = 'cash',
  COMMODITY = 'commodity',
  CRYPTOCURRENCY = 'cryptocurrency',
  OTHER = 'other',
}

// 자산 할당 타입
export interface AssetAllocation {
  assetType: AssetType;
  currentWeight: number;
  targetWeight: number;
  deviation: number;
  marketValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPercent: number;
}

// 포트폴리오 성과 타입
export interface PortfolioPerformance {
  id: string;
  portfolioId: string;
  date: Date;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dailyReturn: number;
  dailyReturnPercent: number;
  benchmarkReturn?: number;
  excessReturn?: number;
  sharpeRatio?: number;
  volatility?: number;
  maxDrawdown?: number;
}

// 포트폴리오 리밸런싱 타입
export interface RebalancingTarget {
  assetId: string;
  symbol: string;
  currentWeight: number;
  targetWeight: number;
  deviation: number;
  requiredAction: 'buy' | 'sell' | 'hold';
  requiredQuantity?: number;
  estimatedCost?: number;
}

// 포트폴리오 생성 요청
export interface CreatePortfolioRequest {
  name: string;
  description?: string;
  currency: string;
  initialAssets?: CreatePortfolioAsset[];
}

// 포트폴리오 자산 생성 요청
export interface CreatePortfolioAsset {
  symbol: string;
  name: string;
  assetType: AssetType;
  quantity: number;
  averagePrice: number;
  purchaseDate: Date;
}

// 포트폴리오 업데이트 요청
export interface UpdatePortfolioRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

// 포트폴리오 자산 업데이트 요청
export interface UpdatePortfolioAssetRequest {
  quantity?: number;
  averagePrice?: number;
}

// 포트폴리오 성과 조회 필터
export interface PerformanceFilter {
  startDate?: Date;
  endDate?: Date;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  benchmark?: string;
}

// 포트폴리오 통계
export interface PortfolioStats {
  totalAssets: number;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  bestPerformer: {
    symbol: string;
    gainLossPercent: number;
  };
  worstPerformer: {
    symbol: string;
    gainLossPercent: number;
  };
  topHoldings: PortfolioAsset[];
  assetAllocation: AssetAllocation[];
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    beta: number;
  };
}

// 포트폴리오 이벤트 타입
export enum PortfolioEventType {
  ASSET_ADDED = 'asset_added',
  ASSET_REMOVED = 'asset_removed',
  ASSET_UPDATED = 'asset_updated',
  PRICE_UPDATED = 'price_updated',
  REBALANCING_TRIGGERED = 'rebalancing_triggered',
  PERFORMANCE_CALCULATED = 'performance_calculated',
}

// 포트폴리오 이벤트
export interface PortfolioEvent {
  id: string;
  portfolioId: string;
  eventType: PortfolioEventType;
  description: string;
  data: Record<string, any>;
  timestamp: Date;
  userId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} 