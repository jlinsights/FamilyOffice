/**
 * 금융 API 관련 타입 정의
 */

export interface ApiError {
  code: string;
  message: string;
  source: string;
  timestamp: number;
}

export interface FinancialData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface ForexRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}

export interface StockPrice extends FinancialData {
  volume?: number;
  marketCap?: number;
}

export interface CacheMetrics {
  hitRate: number;
  missRate: number;
  avgResponseTime: number;
  totalRequests: number;
}
