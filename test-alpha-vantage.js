/**
 * Alpha Vantage API 테스트 스크립트
 * 제공된 API 키로 기본 기능들을 테스트합니다.
 */

// 환경 변수 설정 (테스트용)
process.env.ALPHA_VANTAGE_API_KEY = 'X6VFQWW0FS95PFIE';

const axios = require('axios');

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

/**
 * Alpha Vantage API 요청 함수
 */
async function makeAlphaVantageRequest(params) {
  const requestParams = {
    ...params,
    apikey: API_KEY,
  };

  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: requestParams,
      timeout: 10000,
      headers: {
        'User-Agent': 'FamilyOffice-App/1.0',
      },
    });

    // API 제한 확인
    if (response.data['Error Message']) {
      throw new Error(`Alpha Vantage API Error: ${response.data['Error Message']}`);
    }

    if (response.data['Note']) {
      throw new Error(`Alpha Vantage API Rate Limit: ${response.data['Note']}`);
    }

    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error.message);
    throw error;
  }
}

/**
 * 주식 데이터 테스트
 */
async function testStockData() {
  console.log('\n📈 주식 데이터 테스트 시작...');
  
  try {
    const data = await makeAlphaVantageRequest({
      function: 'GLOBAL_QUOTE',
      symbol: 'AAPL',
    });

    const quote = data['Global Quote'];
    
    if (quote && quote['05. price']) {
      console.log('✅ 주식 데이터 테스트 성공!');
      console.log(`심볼: ${quote['01. symbol']}`);
      console.log(`현재가: $${quote['05. price']}`);
      console.log(`변화량: ${quote['09. change']}`);
      console.log(`변화율: ${quote['10. change percent']}`);
      console.log(`거래량: ${quote['06. volume']}`);
    } else {
      console.log('❌ 주식 데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 주식 데이터 테스트 실패:', error.message);
  }
}

/**
 * 환율 데이터 테스트
 */
async function testForexData() {
  console.log('\n💱 환율 데이터 테스트 시작...');
  
  try {
    const data = await makeAlphaVantageRequest({
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'USD',
      to_currency: 'KRW',
    });

    const exchangeRate = data['Realtime Currency Exchange Rate'];
    
    if (exchangeRate && exchangeRate['5. Exchange Rate']) {
      console.log('✅ 환율 데이터 테스트 성공!');
      console.log(`환율: ${exchangeRate['5. Exchange Rate']}`);
      console.log(`기준통화: ${exchangeRate['1. From_Currency Code']}`);
      console.log(`대상통화: ${exchangeRate['3. To_Currency Code']}`);
      console.log(`시간: ${exchangeRate['6. Last Refreshed']}`);
    } else {
      console.log('❌ 환율 데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 환율 데이터 테스트 실패:', error.message);
  }
}

/**
 * 심볼 검색 테스트
 */
async function testSymbolSearch() {
  console.log('\n🔍 심볼 검색 테스트 시작...');
  
  try {
    const data = await makeAlphaVantageRequest({
      function: 'SYMBOL_SEARCH',
      keywords: 'Samsung',
    });

    const bestMatches = data['bestMatches'] || [];
    
    if (bestMatches.length > 0) {
      console.log('✅ 심볼 검색 테스트 성공!');
      console.log(`검색 결과: ${bestMatches.length}개`);
      
      bestMatches.slice(0, 3).forEach((match, index) => {
        console.log(`${index + 1}. ${match['1. symbol']} - ${match['2. name']}`);
      });
    } else {
      console.log('❌ 검색 결과를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 심볼 검색 테스트 실패:', error.message);
  }
}

/**
 * API 사용량 확인 테스트
 */
async function testApiUsage() {
  console.log('\n📊 API 사용량 확인 테스트 시작...');
  
  try {
    const data = await makeAlphaVantageRequest({
      function: 'API_REQUEST_USAGE',
    });

    console.log('✅ API 사용량 확인 성공!');
    console.log('API 사용량 정보:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ API 사용량 확인 실패:', error.message);
  }
}

/**
 * 메인 테스트 함수
 */
async function runTests() {
  console.log('🚀 Alpha Vantage API 테스트 시작');
  console.log(`API 키: ${API_KEY.substring(0, 8)}...`);
  
  try {
    await testStockData();
    await testForexData();
    await testSymbolSearch();
    await testApiUsage();
    
    console.log('\n✅ 모든 테스트 완료!');
  } catch (error) {
    console.error('\n❌ 테스트 중 오류 발생:', error.message);
  }
}

// 테스트 실행
runTests(); 