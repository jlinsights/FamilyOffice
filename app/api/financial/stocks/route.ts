/**
 * 주식 데이터 API 라우트
 * GET /api/financial/stocks
 */
import { NextRequest, NextResponse } from 'next/server';

import { caches, getOrSet, CacheManager } from '@/lib/cache';
import {
  getStockData,
  getMultipleStocks,
  getKoreanStocks,
} from '@/lib/financial/financial-service';

// 캐시 매니저 인스턴스
const cacheManager = new CacheManager(caches.medium);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const symbols = searchParams.get('symbols');
    const korean = searchParams.get('korean');
    const forceRefresh = searchParams.get('refresh') === 'true';

    console.log('📈 주식 데이터 API 요청:', {
      symbol,
      symbols,
      korean,
      forceRefresh,
    });

    // 한국 주요 주식 데이터 요청
    if (korean === 'true') {
      const cacheKey = 'korean-stocks';

      if (forceRefresh) {
        await cacheManager.del(cacheKey);
      }

      const result = await getOrSet(
        cacheManager,
        cacheKey,
        async () => {
          const data = await getKoreanStocks();
          return data;
        },
        300 // 5분 캐시
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: result.data,
          fromCache: !forceRefresh,
          timestamp: result.timestamp,
          count: result.data?.length || 0,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
          },
          { status: 500 }
        );
      }
    }

    // 복수 심볼 요청 (쉼표로 구분)
    if (symbols) {
      const symbolArray = symbols
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      if (symbolArray.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_SYMBOLS',
              message: '유효한 심볼이 제공되지 않았습니다.',
              source: 'api',
              timestamp: Date.now(),
            },
          },
          { status: 400 }
        );
      }

      const cacheKey = `multiple-stocks:${symbolArray.sort().join(',')}`;

      if (forceRefresh) {
        await cacheManager.del(cacheKey);
      }

      const result = await getOrSet(
        cacheManager,
        cacheKey,
        async () => {
          const data = await getMultipleStocks(symbolArray);
          return data;
        },
        180 // 3분 캐시
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: result.data,
          fromCache: !forceRefresh,
          timestamp: result.timestamp,
          count: result.data?.length || 0,
          requested: symbolArray.length,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
          },
          { status: 500 }
        );
      }
    }

    // 단일 심볼 요청
    if (symbol) {
      const cacheKey = `stock:${symbol}`;

      if (forceRefresh) {
        await cacheManager.del(cacheKey);
      }

      const result = await getOrSet(
        cacheManager,
        cacheKey,
        async () => {
          const data = await getStockData(symbol, false);
          return data;
        },
        120 // 2분 캐시
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: result.data,
          fromCache: !forceRefresh,
          timestamp: result.timestamp,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
          },
          { status: 500 }
        );
      }
    }

    // 파라미터가 없는 경우
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'MISSING_PARAMETERS',
          message: 'symbol, symbols, 또는 korean 파라미터가 필요합니다.',
          source: 'api',
          timestamp: Date.now(),
        },
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('❌ 주식 API 라우트 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'API_ROUTE_ERROR',
          message:
            error instanceof Error ? error.message : 'Unknown API route error',
          source: 'api',
          timestamp: Date.now(),
        },
      },
      { status: 500 }
    );
  }
}

// OPTIONS 메서드 (CORS 지원)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
