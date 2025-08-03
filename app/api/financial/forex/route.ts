/**
 * 환율 데이터 API 라우트
 * GET /api/financial/forex
 */
import { NextRequest, NextResponse } from 'next/server';

import {
  getForexData,
  getMajorForexRates,
} from '@/lib/financial/financial-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const major = searchParams.get('major');
    const forceRefresh = searchParams.get('refresh') === 'true';

    console.log('💱 환율 데이터 API 요청:', { from, to, major, forceRefresh });

    // 주요 환율 데이터 요청
    if (major === 'true') {
      const result = await getMajorForexRates();

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: result.data,
          fromCache: result.fromCache,
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

    // 특정 통화쌍 요청
    if (from && to) {
      // 통화 코드 유효성 검사
      const validCurrencies = [
        'USD',
        'EUR',
        'JPY',
        'GBP',
        'CHF',
        'CAD',
        'AUD',
        'NZD',
        'KRW',
        'CNY',
        'HKD',
        'SGD',
      ];

      if (
        !validCurrencies.includes(from.toUpperCase()) ||
        !validCurrencies.includes(to.toUpperCase())
      ) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_CURRENCY',
              message: `지원되지 않는 통화 코드입니다. 지원 통화: ${validCurrencies.join(', ')}`,
              source: 'api',
              timestamp: Date.now(),
            },
          },
          { status: 400 }
        );
      }

      const result = await getForexData(
        from.toUpperCase(),
        to.toUpperCase(),
        forceRefresh
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: result.data,
          fromCache: result.fromCache,
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
          message: 'from, to 파라미터 또는 major=true 파라미터가 필요합니다.',
          source: 'api',
          timestamp: Date.now(),
        },
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('❌ 환율 API 라우트 오류:', error);

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
