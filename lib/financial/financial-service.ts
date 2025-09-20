/**
 * 통합 금융 데이터 서비스
 * Yahoo Finance + Alpha Vantage API 통합 및 Failover 처리
 */
import type {
  StockData,
  ForexData,
  IndexData,
  ApiResponse,
  ApiError,
  FinancialDataConfig,
  KoreanStockSymbol,
  MajorForexPair,
} from '../types/financial';
import {
  getAlphaVantageStockData,
  getAlphaVantageForexData,
  checkAlphaVantageStatus,
} from './alpha-vantage';
import {
  getCachedStockData,
  setCachedStockData,
  getCachedForexData,
  setCachedForexData,
  getCachedIndexData,
  setCachedIndexData,
  getCacheStats,
} from './cache';
import {
  getYahooStockData,
  getYahooForexData,
  getYahooIndexData,
  getYahooMultipleStocks,
  checkYahooFinanceStatus,
} from './yahoo-finance';
import { logger } from '../debug-logger';

// 기본 설정
const DEFAULT_CONFIG: FinancialDataConfig = {
  refreshInterval: 5 * 60 * 1000, // 5분
  cacheTimeout: 5 * 60, // 5분 (초)
  maxRetries: 3, // 최대 3회 재시도
  fallbackToCache: true, // 실패 시 캐시 사용
  enableRealtime: false, // 실시간 업데이트 비활성화 (기본)
};

let currentConfig = { ...DEFAULT_CONFIG };

/**
 * 금융 데이터 서비스 설정 업데이트
 */
export function updateFinancialConfig(
  config: Partial<FinancialDataConfig>
): void {
  currentConfig = { ...currentConfig, ...config };
  logger.log('⚙️ 금융 데이터 서비스 설정 업데이트:', currentConfig);
}

/**
 * 통합 주식 데이터 가져오기 (캐시 + Failover)
 */
export async function getStockData(
  symbol: string,
  forceRefresh: boolean = false
): Promise<ApiResponse<StockData>> {
  try {
    logger.log(
      `📈 주식 데이터 요청: ${symbol} (강제새로고침: ${forceRefresh})`
    );

    // 1. 캐시 확인 (강제 새로고침이 아닌 경우)
    if (!forceRefresh) {
      const cachedData = await getCachedStockData(symbol);
      if (cachedData) {
        logger.log(`🎯 캐시된 주식 데이터 반환: ${symbol}`);
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    // 2. Yahoo Finance 시도
    let result = await getYahooStockData(symbol);

    if (result.success && result.data) {
      // 성공한 데이터를 캐시에 저장
      await setCachedStockData(symbol, result.data, currentConfig.cacheTimeout);
      return result;
    }

    logger.log(`⚠️ Yahoo Finance 실패, Alpha Vantage로 Failover: ${symbol}`);

    // 3. Alpha Vantage Failover
    result = await getAlphaVantageStockData(symbol);

    if (result.success && result.data) {
      // 성공한 데이터를 캐시에 저장
      await setCachedStockData(symbol, result.data, currentConfig.cacheTimeout);
      return result;
    }

    // 4. 모든 API 실패 시 캐시 사용 (설정에 따라)
    if (currentConfig.fallbackToCache) {
      const cachedData = await getCachedStockData(symbol);
      if (cachedData) {
        logger.log(`🔄 API 실패로 캐시 데이터 사용: ${symbol}`);
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    // 5. 모든 방법 실패
    const apiError: ApiError = {
      code: 'ALL_APIS_FAILED',
      message: `모든 API에서 ${symbol} 데이터를 가져올 수 없습니다.`,
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`❌ 주식 데이터 통합 서비스 오류 (${symbol}):`, error);

    const apiError: ApiError = {
      code: 'FINANCIAL_SERVICE_ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown financial service error',
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * 통합 환율 데이터 가져오기 (캐시 + Failover)
 */
export async function getForexData(
  fromCurrency: string,
  toCurrency: string,
  forceRefresh: boolean = false
): Promise<ApiResponse<ForexData>> {
  try {
    logger.log(
      `💱 환율 데이터 요청: ${fromCurrency}/${toCurrency} (강제새로고침: ${forceRefresh})`
    );

    // 1. 캐시 확인
    if (!forceRefresh) {
      const cachedData = await getCachedForexData(fromCurrency, toCurrency);
      if (cachedData) {
        logger.log(
          `🎯 캐시된 환율 데이터 반환: ${fromCurrency}/${toCurrency}`
        );
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    // 2. Yahoo Finance 시도
    let result = await getYahooForexData(fromCurrency, toCurrency);

    if (result.success && result.data) {
      await setCachedForexData(
        fromCurrency,
        toCurrency,
        result.data,
        currentConfig.cacheTimeout
      );
      return result;
    }

    logger.log(
      `⚠️ Yahoo Finance 환율 실패, Alpha Vantage로 Failover: ${fromCurrency}/${toCurrency}`
    );

    // 3. Alpha Vantage Failover
    result = await getAlphaVantageForexData(fromCurrency, toCurrency);

    if (result.success && result.data) {
      await setCachedForexData(
        fromCurrency,
        toCurrency,
        result.data,
        currentConfig.cacheTimeout
      );
      return result;
    }

    // 4. 캐시 Fallback
    if (currentConfig.fallbackToCache) {
      const cachedData = await getCachedForexData(fromCurrency, toCurrency);
      if (cachedData) {
        logger.log(
          `🔄 API 실패로 캐시 환율 데이터 사용: ${fromCurrency}/${toCurrency}`
        );
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    // 5. 모든 방법 실패
    const apiError: ApiError = {
      code: 'ALL_FOREX_APIS_FAILED',
      message: `모든 API에서 ${fromCurrency}/${toCurrency} 환율 데이터를 가져올 수 없습니다.`,
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(
      `❌ 환율 데이터 통합 서비스 오류 (${fromCurrency}/${toCurrency}):`,
      error
    );

    const apiError: ApiError = {
      code: 'FOREX_SERVICE_ERROR',
      message:
        error instanceof Error ? error.message : 'Unknown forex service error',
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * 지수 데이터 가져오기 (Yahoo Finance 전용)
 */
export async function getIndexData(
  symbol: string,
  forceRefresh: boolean = false
): Promise<ApiResponse<IndexData>> {
  try {
    logger.log(`📊 지수 데이터 요청: ${symbol}`);

    // 1. 캐시 확인
    if (!forceRefresh) {
      const cachedData = await getCachedIndexData(symbol);
      if (cachedData) {
        logger.log(`🎯 캐시된 지수 데이터 반환: ${symbol}`);
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    // 2. Yahoo Finance에서 가져오기
    const result = await getYahooIndexData(symbol);

    if (result.success && result.data) {
      await setCachedIndexData(symbol, result.data, currentConfig.cacheTimeout);
      return result;
    }

    // 3. 캐시 Fallback
    if (currentConfig.fallbackToCache) {
      const cachedData = await getCachedIndexData(symbol);
      if (cachedData) {
        logger.log(`🔄 API 실패로 캐시 지수 데이터 사용: ${symbol}`);
        return {
          success: true,
          data: cachedData,
          fromCache: true,
          timestamp: Date.now(),
        };
      }
    }

    return result;
  } catch (error) {
    console.error(`❌ 지수 데이터 서비스 오류 (${symbol}):`, error);

    const apiError: ApiError = {
      code: 'INDEX_SERVICE_ERROR',
      message:
        error instanceof Error ? error.message : 'Unknown index service error',
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * 복수 주식 데이터 일괄 가져오기
 */
export async function getMultipleStocks(
  symbols: string[]
): Promise<ApiResponse<StockData[]>> {
  try {
    logger.log(`📈 복수 주식 데이터 요청: [${symbols.join(', ')}]`);

    // Yahoo Finance 일괄 요청 시도
    const result = await getYahooMultipleStocks(symbols);

    if (result.success && result.data) {
      // 각 주식 데이터를 개별적으로 캐시에 저장
      for (const stockData of result.data) {
        await setCachedStockData(
          stockData.symbol,
          stockData,
          currentConfig.cacheTimeout
        );
      }
      return result;
    }

    // 실패 시 개별 요청으로 Fallback
    logger.log('⚠️ 일괄 요청 실패, 개별 요청으로 Fallback');

    const stockDataArray: StockData[] = [];
    const errors: string[] = [];

    for (const symbol of symbols) {
      const stockResult = await getStockData(symbol);
      if (stockResult.success && stockResult.data) {
        stockDataArray.push(stockResult.data);
      } else {
        errors.push(
          `${symbol}: ${stockResult.error?.message || 'Unknown error'}`
        );
      }
    }

    if (stockDataArray.length > 0) {
      return {
        success: true,
        data: stockDataArray,
        fromCache: false,
        timestamp: Date.now(),
      };
    }

    const apiError: ApiError = {
      code: 'MULTIPLE_STOCKS_FAILED',
      message: `복수 주식 데이터 요청 실패: ${errors.join(', ')}`,
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('❌ 복수 주식 데이터 서비스 오류:', error);

    const apiError: ApiError = {
      code: 'MULTIPLE_STOCKS_SERVICE_ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown multiple stocks service error',
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * 한국 주요 주식 데이터 가져오기
 */
export async function getKoreanStocks(): Promise<ApiResponse<StockData[]>> {
  const koreanSymbols: KoreanStockSymbol[] = [
    '005930.KS', // 삼성전자
    '000660.KS', // SK하이닉스
    '035420.KS', // NAVER
    '051910.KS', // LG화학
    '035720.KS', // 카카오
  ];

  return getMultipleStocks(koreanSymbols);
}

/**
 * 주요 환율 데이터 가져오기
 */
export async function getMajorForexRates(): Promise<ApiResponse<ForexData[]>> {
  const majorPairs: MajorForexPair[] = [
    'USD/KRW',
    'EUR/KRW',
    'JPY/KRW',
    'CNY/KRW',
  ];

  try {
    const forexDataArray: ForexData[] = [];
    const errors: string[] = [];

    for (const pair of majorPairs) {
      const [from, to] = pair.split('/');
      if (!from || !to) continue;
      
      const forexResult = await getForexData(from, to);

      if (forexResult.success && forexResult.data) {
        forexDataArray.push(forexResult.data);
      } else {
        errors.push(
          `${pair}: ${forexResult.error?.message || 'Unknown error'}`
        );
      }
    }

    if (forexDataArray.length > 0) {
      return {
        success: true,
        data: forexDataArray,
        fromCache: false,
        timestamp: Date.now(),
      };
    }

    const apiError: ApiError = {
      code: 'MAJOR_FOREX_FAILED',
      message: `주요 환율 데이터 요청 실패: ${errors.join(', ')}`,
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('❌ 주요 환율 데이터 서비스 오류:', error);

    const apiError: ApiError = {
      code: 'MAJOR_FOREX_SERVICE_ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown major forex service error',
      source: 'yahoo',
      timestamp: Date.now(),
    };

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * API 상태 확인
 */
export async function checkApiStatus() {
  logger.log('🔍 API 상태 확인 중...');

  const [yahooStatus, alphaVantageStatus] = await Promise.allSettled([
    checkYahooFinanceStatus(),
    checkAlphaVantageStatus(),
  ]);

  const cacheStats = getCacheStats();

  const status = {
    yahoo: {
      available: yahooStatus.status === 'fulfilled' && yahooStatus.value,
      error:
        yahooStatus.status === 'rejected' ? yahooStatus.reason?.message : null,
    },
    alphavantage: {
      available:
        alphaVantageStatus.status === 'fulfilled' && alphaVantageStatus.value,
      error:
        alphaVantageStatus.status === 'rejected'
          ? alphaVantageStatus.reason?.message
          : null,
    },
    cache: cacheStats,
    config: currentConfig,
  };

  logger.log('📊 API 상태:', status);
  return status;
}

/**
 * 서비스 상태 요약
 */
export function getServiceSummary() {
  return {
    name: '통합 금융 데이터 서비스',
    version: '1.0.0',
    providers: ['Yahoo Finance', 'Alpha Vantage'],
    features: [
      '실시간 주식 데이터',
      '환율 정보',
      '시장 지수',
      '캐싱',
      'Failover',
    ],
    config: currentConfig,
    cache: getCacheStats(),
  };
}
