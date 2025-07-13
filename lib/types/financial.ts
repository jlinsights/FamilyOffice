/**
 * 금융 데이터 관련 TypeScript 타입 정의
 */

// 기본 금융 데이터 인터페이스
export interface BaseFinancialData {
  symbol: string
  timestamp: number
  source: 'yahoo' | 'alphavantage'
  cached: boolean
}

// 주식 데이터 인터페이스
export interface StockData extends BaseFinancialData {
  price: number
  change: number
  changePercent: number
  previousClose: number
  open: number
  high: number
  low: number
  volume: number
  marketCap?: number
  pe?: number
  eps?: number
  currency: string
}

// 환율 데이터 인터페이스  
export interface ForexData extends BaseFinancialData {
  fromCurrency: string
  toCurrency: string
  rate: number
  change: number
  changePercent: number
  bid?: number
  ask?: number
  high?: number
  low?: number
}

// 시장 지수 데이터
export interface IndexData extends BaseFinancialData {
  name: string
  value: number
  change: number
  changePercent: number
  high: number
  low: number
}

// Yahoo Finance API 응답 타입
export interface YahooFinanceQuote {
  symbol: string
  regularMarketPrice: number
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  regularMarketDayHigh: number
  regularMarketDayLow: number
  regularMarketVolume: number
  marketCap?: number
  trailingPE?: number
  epsTrailingTwelveMonths?: number
  currency: string
}

// Alpha Vantage API 응답 타입
export interface AlphaVantageQuote {
  'Global Quote': {
    '01. symbol': string
    '05. price': string
    '09. change': string
    '10. change percent': string
    '08. previous close': string
    '02. open': string
    '03. high': string
    '04. low': string
    '06. volume': string
  }
}

export interface AlphaVantageForex {
  'Realtime Currency Exchange Rate': {
    '1. From_Currency Code': string
    '3. To_Currency Code': string
    '5. Exchange Rate': string
    '8. Bid Price': string
    '9. Ask Price': string
  }
}

// API 오류 타입
export interface ApiError {
  code: string
  message: string
  source: 'yahoo' | 'alphavantage' | 'cache' | 'network'
  timestamp: number
}

// 캐시 키 생성을 위한 타입
export type CacheKeyType = 'stock' | 'forex' | 'index'

// API 응답 래퍼 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  fromCache: boolean
  timestamp: number
}

// 실시간 업데이트를 위한 구독 타입
export interface FinancialDataSubscription {
  symbols: string[]
  type: CacheKeyType
  callback: (data: StockData | ForexData | IndexData) => void
  interval: number
}

// 한국 주요 주식 심볼 타입
export type KoreanStockSymbol = 
  | 'KOSPI'       // 코스피 지수
  | '005930.KS'   // 삼성전자
  | '000660.KS'   // SK하이닉스  
  | '035420.KS'   // NAVER
  | '051910.KS'   // LG화학
  | '006400.KS'   // 삼성SDI
  | '035720.KS'   // 카카오
  | '028260.KS'   // 삼성물산
  | '068270.KS'   // 셀트리온
  | '207940.KS'   // 삼성바이오로직스

// 주요 환율 쌍 타입
export type MajorForexPair = 
  | 'USD/KRW'     // 달러/원
  | 'EUR/KRW'     // 유로/원
  | 'JPY/KRW'     // 엔/원
  | 'CNY/KRW'     // 위안/원
  | 'GBP/KRW'     // 파운드/원
  | 'USD/EUR'     // 달러/유로
  | 'USD/JPY'     // 달러/엔

// 금융 데이터 설정 타입
export interface FinancialDataConfig {
  refreshInterval: number          // 데이터 갱신 주기 (밀리초)
  cacheTimeout: number            // 캐시 만료 시간 (밀리초)
  maxRetries: number              // API 호출 재시도 횟수
  fallbackToCache: boolean        // API 실패 시 캐시 사용 여부
  enableRealtime: boolean         // 실시간 업데이트 활성화
}

// 포트폴리오 데이터 타입 (향후 확장용)
export interface PortfolioItem {
  symbol: string
  shares: number
  purchasePrice: number
  currentPrice: number
  totalValue: number
  gainLoss: number
  gainLossPercent: number
}

export interface Portfolio {
  id: string
  name: string
  items: PortfolioItem[]
  totalValue: number
  totalGainLoss: number
  totalGainLossPercent: number
  lastUpdated: number
}