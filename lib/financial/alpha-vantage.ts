/**
 * Alpha Vantage API 클라이언트
 */
import axios from 'axios';

import type {
  StockData,
  ForexData,
  ApiResponse,
  ApiError,
} from '../types/financial';

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const REQUEST_TIMEOUT = 10000; // 10초

/**
 * Alpha Vantage API 키 가져오기
 */
function getAlphaVantageApiKey(): string {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    throw new Error('ALPHA_VANTAGE_API_KEY 환경변수가 설정되지 않았습니다.');
  }

  return apiKey;
}

/**
 * Alpha Vantage API 공통 요청 함수
 */
async function makeAlphaVantageRequest(params: Record<string, string>) {
  const apiKey = getAlphaVantageApiKey();

  const requestParams = {
    ...params,
    apikey: apiKey,
  };

  const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
    params: requestParams,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'User-Agent': 'FamilyOffice-App/1.0',
    },
  });

  // Alpha Vantage API 제한 확인
  if (response.data['Error Message']) {
    throw new Error(
      `Alpha Vantage API Error: ${response.data['Error Message']}`
    );
  }

  if (response.data['Note']) {
    throw new Error(`Alpha Vantage API Rate Limit: ${response.data['Note']}`);
  }

  return response.data;
}

/**
 * Alpha Vantage에서 주식 데이터 가져오기
 */
export async function getAlphaVantageStockData(
  symbol: string
): Promise<ApiResponse<StockData>> {
  try {
    console.log(`📈 Alpha Vantage에서 주식 데이터 요청: ${symbol}`);

    const data = await makeAlphaVantageRequest({
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
    });

    const quote = data['Global Quote'];

    if (!quote || !quote['05. price']) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }

    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(
      quote['10. change percent'].replace('%', '')
    );
    const previousClose = parseFloat(quote['08. previous close']);
    const open = parseFloat(quote['02. open']);
    const high = parseFloat(quote['03. high']);
    const low = parseFloat(quote['04. low']);
    const volume = parseInt(quote['06. volume']);

    const stockData: StockData = {
      symbol: quote['01. symbol'],
      price,
      change,
      changePercent,
      previousClose,
      open,
      high,
      low,
      volume,
      currency: 'USD', // Alpha Vantage는 기본적으로 USD
      timestamp: Date.now(),
      source: 'alphavantage',
      cached: false,
    };

    console.log(
      `✅ Alpha Vantage 주식 데이터 성공: ${symbol} - $${stockData.price}`
    );

    return {
      success: true,
      data: stockData,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`❌ Alpha Vantage 주식 데이터 오류 (${symbol}):`, error);

    const apiError: ApiError = {
      code: 'ALPHAVANTAGE_STOCK_ERROR',
      message:
        error instanceof Error ? error.message : 'Unknown Alpha Vantage error',
      source: 'alphavantage',
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
 * Alpha Vantage에서 환율 데이터 가져오기
 */
export async function getAlphaVantageForexData(
  fromCurrency: string,
  toCurrency: string
): Promise<ApiResponse<ForexData>> {
  try {
    console.log(
      `💱 Alpha Vantage에서 환율 데이터 요청: ${fromCurrency}/${toCurrency}`
    );

    const data = await makeAlphaVantageRequest({
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: fromCurrency,
      to_currency: toCurrency,
    });

    const exchangeRate = data['Realtime Currency Exchange Rate'];

    if (!exchangeRate || !exchangeRate['5. Exchange Rate']) {
      throw new Error(`No forex data found for: ${fromCurrency}/${toCurrency}`);
    }

    const rate = parseFloat(exchangeRate['5. Exchange Rate']);
    const bid = parseFloat(exchangeRate['8. Bid Price']) || rate;
    const ask = parseFloat(exchangeRate['9. Ask Price']) || rate;

    const forexData: ForexData = {
      symbol: `${fromCurrency}${toCurrency}`,
      fromCurrency: exchangeRate['1. From_Currency Code'],
      toCurrency: exchangeRate['3. To_Currency Code'],
      rate,
      change: 0, // Alpha Vantage 실시간 환율에는 변화량 정보 없음
      changePercent: 0,
      bid,
      ask,
      timestamp: Date.now(),
      source: 'alphavantage',
      cached: false,
    };

    console.log(
      `✅ Alpha Vantage 환율 데이터 성공: ${fromCurrency}/${toCurrency} - ${forexData.rate}`
    );

    return {
      success: true,
      data: forexData,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(
      `❌ Alpha Vantage 환율 데이터 오류 (${fromCurrency}/${toCurrency}):`,
      error
    );

    const apiError: ApiError = {
      code: 'ALPHAVANTAGE_FOREX_ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown Alpha Vantage forex error',
      source: 'alphavantage',
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
 * Alpha Vantage에서 일간 시계열 데이터 가져오기 (차트용)
 */
export async function getAlphaVantageDailyData(
  symbol: string,
  outputSize: 'compact' | 'full' = 'compact'
) {
  try {
    console.log(`📊 Alpha Vantage에서 일간 데이터 요청: ${symbol}`);

    const data = await makeAlphaVantageRequest({
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol: symbol,
      outputsize: outputSize,
    });

    const timeSeries = data['Time Series (Daily)'];

    if (!timeSeries) {
      throw new Error(`No daily data found for symbol: ${symbol}`);
    }

    // 최근 30일 데이터만 변환
    const dates = Object.keys(timeSeries).slice(0, 30);
    const chartData = dates.map(date => ({
      date,
      open: parseFloat(timeSeries[date]['1. open']),
      high: parseFloat(timeSeries[date]['2. high']),
      low: parseFloat(timeSeries[date]['3. low']),
      close: parseFloat(timeSeries[date]['4. close']),
      adjustedClose: parseFloat(timeSeries[date]['5. adjusted close']),
      volume: parseInt(timeSeries[date]['6. volume']),
    }));

    console.log(
      `✅ Alpha Vantage 일간 데이터 성공: ${symbol} - ${chartData.length}일`
    );

    return {
      success: true,
      data: chartData,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`❌ Alpha Vantage 일간 데이터 오류 (${symbol}):`, error);

    return {
      success: false,
      error: {
        code: 'ALPHAVANTAGE_DAILY_ERROR',
        message:
          error instanceof Error
            ? error.message
            : 'Unknown Alpha Vantage daily data error',
        source: 'alphavantage',
        timestamp: Date.now(),
      },
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * Alpha Vantage에서 실시간 검색 결과 가져오기
 */
export async function searchAlphaVantageSymbols(keywords: string) {
  try {
    console.log(`🔍 Alpha Vantage에서 심볼 검색: ${keywords}`);

    const data = await makeAlphaVantageRequest({
      function: 'SYMBOL_SEARCH',
      keywords: keywords,
    });

    const bestMatches = data['bestMatches'] || [];

    const searchResults = bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: parseFloat(match['9. matchScore']),
    }));

    console.log(
      `✅ Alpha Vantage 심볼 검색 성공: ${searchResults.length}개 결과`
    );

    return {
      success: true,
      data: searchResults,
      fromCache: false,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`❌ Alpha Vantage 심볼 검색 오류 (${keywords}):`, error);

    return {
      success: false,
      error: {
        code: 'ALPHAVANTAGE_SEARCH_ERROR',
        message:
          error instanceof Error
            ? error.message
            : 'Unknown Alpha Vantage search error',
        source: 'alphavantage',
        timestamp: Date.now(),
      },
      fromCache: false,
      timestamp: Date.now(),
    };
  }
}

/**
 * Alpha Vantage API 상태 확인
 */
export async function checkAlphaVantageStatus(): Promise<boolean> {
  try {
    // 간단한 심볼로 API 상태 확인
    const result = await getAlphaVantageStockData('AAPL');
    return result.success;
  } catch (error) {
    console.error('❌ Alpha Vantage API 상태 확인 실패:', error);
    return false;
  }
}

/**
 * Alpha Vantage API 사용량 확인 (프리미엄 기능)
 */
export async function getAlphaVantageUsage() {
  try {
    const apiKey = getAlphaVantageApiKey();

    const response = await axios.get(
      `${ALPHA_VANTAGE_BASE_URL}?function=API_REQUEST_USAGE&apikey=${apiKey}`,
      {
        timeout: REQUEST_TIMEOUT,
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Alpha Vantage 사용량 확인 실패:', error);
    return null;
  }
}
