/**
 * 금융 데이터 통합 모듈 - 메인 export 파일
 */

// 서비스 함수들
export {
  getStockData,
  getForexData,
  getIndexData,
  getMultipleStocks,
  getKoreanStocks,
  getMajorForexRates,
  checkApiStatus,
  getServiceSummary,
  updateFinancialConfig
} from './financial-service'

// Yahoo Finance 클라이언트
export {
  getYahooStockData,
  getYahooForexData,
  getYahooIndexData,
  getYahooMultipleStocks,
  checkYahooFinanceStatus
} from './yahoo-finance'

// Alpha Vantage 클라이언트
export {
  getAlphaVantageStockData,
  getAlphaVantageForexData,
  getAlphaVantageDailyData,
  searchAlphaVantageSymbols,
  checkAlphaVantageStatus,
  getAlphaVantageUsage
} from './alpha-vantage'

// 캐시 함수들
export {
  getCachedData,
  setCachedData,
  getCachedStockData,
  setCachedStockData,
  getCachedForexData,
  setCachedForexData,
  getCachedIndexData,
  setCachedIndexData,
  getCacheStats,
  clearCache,
  validateCache
} from './cache'

// 오류 처리 및 로깅
export {
  logApiError,
  logApiSuccess,
  logPerformanceMetric,
  logCacheMetric,
  getErrorStats,
  clearErrorStats,
  createErrorHandler,
  createTimer,
  withLogging,
  ErrorSeverity,
  LogLevel
} from './error-handler'

// 타입 정의들
export type {
  StockData,
  ForexData,
  IndexData,
  BaseFinancialData,
  ApiResponse,
  ApiError,
  FinancialDataConfig,
  FinancialDataSubscription,
  KoreanStockSymbol,
  MajorForexPair,
  CacheKeyType,
  YahooFinanceQuote,
  AlphaVantageQuote,
  AlphaVantageForex,
  Portfolio,
  PortfolioItem
} from '../types/financial'