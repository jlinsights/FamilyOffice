/**
 * 주식 데이터 조회 API 엔드포인트
 * 한국 및 해외 주식 정보 제공
 */
import { NextRequest, NextResponse } from 'next/server';

import {
  validateApiRequest,
  createValidationErrorResponse,
  createApiResponse,
  createErrorResponse,
  stockQuerySchema,
} from '@/lib/api-validation';

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 검증
    const validation = await validateApiRequest(
      request,
      stockQuerySchema,
      'query'
    );

    if (!validation.success) {
      return createValidationErrorResponse(validation);
    }

    const { symbol, period, interval, korean } = validation.data!;

    // 한국 주식 데이터 요청인 경우
    if (korean) {
      // 주요 한국 주식 목록
      const koreanStocks = [
        {
          symbol: '005930.KS',
          name: '삼성전자',
          price: 71000,
          change: 1000,
          changePercent: 1.43,
        },
        {
          symbol: '000660.KS',
          name: 'SK하이닉스',
          price: 125000,
          change: -2000,
          changePercent: -1.57,
        },
        {
          symbol: '035420.KS',
          name: 'NAVER',
          price: 196000,
          change: 3000,
          changePercent: 1.55,
        },
        {
          symbol: '005490.KS',
          name: 'POSCO홀딩스',
          price: 398000,
          change: -5000,
          changePercent: -1.24,
        },
        {
          symbol: '051910.KS',
          name: 'LG화학',
          price: 389000,
          change: 7000,
          changePercent: 1.83,
        },
      ];

      return createApiResponse(
        {
          stocks: koreanStocks,
          market: 'KRX',
          currency: 'KRW',
          timestamp: new Date().toISOString(),
        },
        '한국 주식 데이터 조회 완료'
      );
    }

    // 개별 종목 조회
    if (symbol) {
      // 실제 주식 API 연동 대신 모의 데이터 반환
      const mockStockData = {
        symbol: symbol.toUpperCase(),
        name: symbol.includes('.KS') ? '한국 종목' : '해외 종목',
        currentPrice: Math.floor(Math.random() * 100000) + 50000,
        change: Math.floor(Math.random() * 10000) - 5000,
        changePercent: (Math.random() * 10 - 5).toFixed(2),
        volume: Math.floor(Math.random() * 1000000),
        marketCap: Math.floor(Math.random() * 1000000000000),
        period,
        interval,
        timestamp: new Date().toISOString(),
      };

      return createApiResponse(
        mockStockData,
        `${symbol} 주식 데이터 조회 완료`
      );
    }

    // 기본 시장 개요
    const marketOverview = {
      kospi: {
        index: 2618.45,
        change: 15.23,
        changePercent: 0.58,
      },
      kosdaq: {
        index: 745.12,
        change: -3.45,
        changePercent: -0.46,
      },
      snp500: {
        index: 4567.89,
        change: 23.45,
        changePercent: 0.52,
      },
      nasdaq: {
        index: 14234.56,
        change: 67.89,
        changePercent: 0.48,
      },
      timestamp: new Date().toISOString(),
    };

    return createApiResponse(marketOverview, '시장 개요 조회 완료');
  } catch (error) {
    console.error('Stock API error:', error);
    return createErrorResponse(
      '주식 데이터 조회 중 오류가 발생했습니다.',
      'STOCK_API_ERROR',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}
