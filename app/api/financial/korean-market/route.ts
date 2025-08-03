import { NextResponse } from 'next/server';

interface KoreanMarketData {
  kospi: {
    value: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  kosdaq: {
    value: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  usdkrw: {
    value: number;
    change: number;
    changePercent: number;
  };
  topStocks: Array<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  }>;
  sectors: Array<{
    name: string;
    performance: number;
    topStocks: string[];
  }>;
}

// Mock data for Korean market
const mockKoreanMarketData: KoreanMarketData = {
  kospi: {
    value: 2500.45,
    change: 12.34,
    changePercent: 0.49,
    volume: 450000000,
  },
  kosdaq: {
    value: 850.23,
    change: -5.67,
    changePercent: -0.66,
    volume: 120000000,
  },
  usdkrw: {
    value: 1305.5,
    change: 2.3,
    changePercent: 0.18,
  },
  topStocks: [
    {
      symbol: '005930',
      name: '삼성전자',
      price: 75000,
      change: 1500,
      changePercent: 2.04,
      volume: 15000000,
    },
    {
      symbol: '000660',
      name: 'SK하이닉스',
      price: 145000,
      change: -2000,
      changePercent: -1.36,
      volume: 8000000,
    },
    {
      symbol: '035420',
      name: 'NAVER',
      price: 185000,
      change: 3000,
      changePercent: 1.65,
      volume: 5000000,
    },
    {
      symbol: '051910',
      name: 'LG화학',
      price: 520000,
      change: 8000,
      changePercent: 1.56,
      volume: 3000000,
    },
    {
      symbol: '006400',
      name: '삼성SDI',
      price: 420000,
      change: -5000,
      changePercent: -1.18,
      volume: 2500000,
    },
  ],
  sectors: [
    {
      name: '반도체',
      performance: 2.5,
      topStocks: ['삼성전자', 'SK하이닉스', '삼성SDI'],
    },
    {
      name: 'IT/소프트웨어',
      performance: 1.8,
      topStocks: ['NAVER', '카카오', '쿠팡'],
    },
    {
      name: '화학',
      performance: 1.2,
      topStocks: ['LG화학', 'LG에너지솔루션', '포스코퓨처엠'],
    },
    {
      name: '금융',
      performance: -0.5,
      topStocks: ['KB금융', '신한지주', '하나금융지주'],
    },
    {
      name: '자동차',
      performance: 0.8,
      topStocks: ['현대차', '기아', '현대모비스'],
    },
  ],
};

export async function GET() {
  try {
    // 실제 구현에서는 Alpha Vantage API나 한국투자증권 API를 사용
    // const apiKey = process.env.ALPHA_VANTAGE_API_KEY
    // const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=005930.KS&apikey=${apiKey}`)

    // 현재는 Mock 데이터 반환
    const data = mockKoreanMarketData;

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
      timezone: 'Asia/Seoul',
    });
  } catch (error) {
    console.error('Korean market data fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Korean market data',
        message: '한국 시장 데이터를 가져오는데 실패했습니다.',
      },
      { status: 500 }
    );
  }
}
