/**
 * Yahoo Finance API 클라이언트
 */

import yahooFinance from 'yahoo-finance2'
import type { StockData, ForexData, IndexData, ApiResponse, ApiError, YahooFinanceQuote } from '../types/financial'

// Yahoo Finance 설정
const yahooOptions = {
  validateResult: false,  // 결과 검증 비활성화 (속도 향상)
  timeout: 10000,        // 10초 타임아웃
}

/**
 * Yahoo Finance에서 주식 데이터 가져오기
 */
export async function getYahooStockData(symbol: string): Promise<ApiResponse<StockData>> {
  try {
    console.log(`📈 Yahoo Finance에서 주식 데이터 요청: ${symbol}`)
    
    const quote = await yahooFinance.quote(symbol, yahooOptions)
    
    if (!quote || !quote.regularMarketPrice) {
      throw new Error(`No data found for symbol: ${symbol}`)
    }

    const stockData: StockData = {
      symbol: quote.symbol || symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      previousClose: quote.regularMarketPreviousClose || quote.regularMarketPrice,
      open: quote.regularMarketOpen || quote.regularMarketPrice,
      high: quote.regularMarketDayHigh || quote.regularMarketPrice,
      low: quote.regularMarketDayLow || quote.regularMarketPrice,
      volume: quote.regularMarketVolume || 0,
      marketCap: quote.marketCap,
      pe: quote.trailingPE,
      eps: quote.epsTrailingTwelveMonths,
      currency: quote.currency || 'USD',
      timestamp: Date.now(),
      source: 'yahoo',
      cached: false
    }

    console.log(`✅ Yahoo Finance 주식 데이터 성공: ${symbol} - $${stockData.price}`)
    
    return {
      success: true,
      data: stockData,
      fromCache: false,
      timestamp: Date.now()
    }

  } catch (error) {
    console.error(`❌ Yahoo Finance 주식 데이터 오류 (${symbol}):`, error)
    
    const apiError: ApiError = {
      code: 'YAHOO_STOCK_ERROR',
      message: error instanceof Error ? error.message : 'Unknown Yahoo Finance error',
      source: 'yahoo',
      timestamp: Date.now()
    }

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now()
    }
  }
}

/**
 * Yahoo Finance에서 환율 데이터 가져오기
 */
export async function getYahooForexData(fromCurrency: string, toCurrency: string): Promise<ApiResponse<ForexData>> {
  try {
    const symbol = `${fromCurrency}${toCurrency}=X`
    console.log(`💱 Yahoo Finance에서 환율 데이터 요청: ${symbol}`)
    
    const quote = await yahooFinance.quote(symbol, yahooOptions)
    
    if (!quote || !quote.regularMarketPrice) {
      throw new Error(`No forex data found for: ${fromCurrency}/${toCurrency}`)
    }

    const forexData: ForexData = {
      symbol,
      fromCurrency,
      toCurrency,
      rate: quote.regularMarketPrice,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      bid: quote.bid,
      ask: quote.ask,
      high: quote.regularMarketDayHigh,
      low: quote.regularMarketDayLow,
      timestamp: Date.now(),
      source: 'yahoo',
      cached: false
    }

    console.log(`✅ Yahoo Finance 환율 데이터 성공: ${fromCurrency}/${toCurrency} - ${forexData.rate}`)
    
    return {
      success: true,
      data: forexData,
      fromCache: false,
      timestamp: Date.now()
    }

  } catch (error) {
    console.error(`❌ Yahoo Finance 환율 데이터 오류 (${fromCurrency}/${toCurrency}):`, error)
    
    const apiError: ApiError = {
      code: 'YAHOO_FOREX_ERROR',
      message: error instanceof Error ? error.message : 'Unknown Yahoo Finance forex error',
      source: 'yahoo',
      timestamp: Date.now()
    }

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now()
    }
  }
}

/**
 * Yahoo Finance에서 시장 지수 데이터 가져오기
 */
export async function getYahooIndexData(symbol: string): Promise<ApiResponse<IndexData>> {
  try {
    console.log(`📊 Yahoo Finance에서 지수 데이터 요청: ${symbol}`)
    
    const quote = await yahooFinance.quote(symbol, yahooOptions)
    
    if (!quote || !quote.regularMarketPrice) {
      throw new Error(`No index data found for symbol: ${symbol}`)
    }

    const indexData: IndexData = {
      symbol: quote.symbol || symbol,
      name: quote.longName || quote.shortName || symbol,
      value: quote.regularMarketPrice,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      high: quote.regularMarketDayHigh || quote.regularMarketPrice,
      low: quote.regularMarketDayLow || quote.regularMarketPrice,
      timestamp: Date.now(),
      source: 'yahoo',
      cached: false
    }

    console.log(`✅ Yahoo Finance 지수 데이터 성공: ${symbol} - ${indexData.value}`)
    
    return {
      success: true,
      data: indexData,
      fromCache: false,
      timestamp: Date.now()
    }

  } catch (error) {
    console.error(`❌ Yahoo Finance 지수 데이터 오류 (${symbol}):`, error)
    
    const apiError: ApiError = {
      code: 'YAHOO_INDEX_ERROR',
      message: error instanceof Error ? error.message : 'Unknown Yahoo Finance index error',
      source: 'yahoo',
      timestamp: Date.now()
    }

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now()
    }
  }
}

/**
 * 여러 심볼의 주식 데이터를 한번에 가져오기
 */
export async function getYahooMultipleStocks(symbols: string[]): Promise<ApiResponse<StockData[]>> {
  try {
    console.log(`📈 Yahoo Finance에서 복수 주식 데이터 요청: [${symbols.join(', ')}]`)
    
    const quotes = await yahooFinance.quote(symbols, yahooOptions)
    const stockDataArray: StockData[] = []

    // 단일 심볼인 경우 배열로 변환
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes]

    for (const quote of quotesArray) {
      if (quote && quote.regularMarketPrice) {
        const stockData: StockData = {
          symbol: quote.symbol || '',
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange || 0,
          changePercent: quote.regularMarketChangePercent || 0,
          previousClose: quote.regularMarketPreviousClose || quote.regularMarketPrice,
          open: quote.regularMarketOpen || quote.regularMarketPrice,
          high: quote.regularMarketDayHigh || quote.regularMarketPrice,
          low: quote.regularMarketDayLow || quote.regularMarketPrice,
          volume: quote.regularMarketVolume || 0,
          marketCap: quote.marketCap,
          pe: quote.trailingPE,
          eps: quote.epsTrailingTwelveMonths,
          currency: quote.currency || 'USD',
          timestamp: Date.now(),
          source: 'yahoo',
          cached: false
        }
        stockDataArray.push(stockData)
      }
    }

    console.log(`✅ Yahoo Finance 복수 주식 데이터 성공: ${stockDataArray.length}개 심볼`)
    
    return {
      success: true,
      data: stockDataArray,
      fromCache: false,
      timestamp: Date.now()
    }

  } catch (error) {
    console.error('❌ Yahoo Finance 복수 주식 데이터 오류:', error)
    
    const apiError: ApiError = {
      code: 'YAHOO_MULTIPLE_STOCKS_ERROR',
      message: error instanceof Error ? error.message : 'Unknown Yahoo Finance multiple stocks error',
      source: 'yahoo',
      timestamp: Date.now()
    }

    return {
      success: false,
      error: apiError,
      fromCache: false,
      timestamp: Date.now()
    }
  }
}

/**
 * Yahoo Finance API 상태 확인
 */
export async function checkYahooFinanceStatus(): Promise<boolean> {
  try {
    // 간단한 심볼로 API 상태 확인
    const result = await getYahooStockData('AAPL')
    return result.success
  } catch (error) {
    console.error('❌ Yahoo Finance API 상태 확인 실패:', error)
    return false
  }
}