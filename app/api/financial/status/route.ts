/**
 * 금융 데이터 서비스 상태 API 라우트
 * GET /api/financial/status
 */

import { NextRequest, NextResponse } from 'next/server'
import { checkApiStatus, getServiceSummary } from '@/lib/financial/financial-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const detailed = searchParams.get('detailed') === 'true'

    console.log('🔍 금융 데이터 서비스 상태 확인 요청:', { detailed })

    if (detailed) {
      // 상세 상태 확인 (API 호출 포함)
      const [status, summary] = await Promise.all([
        checkApiStatus(),
        getServiceSummary()
      ])

      return NextResponse.json({
        success: true,
        data: {
          status,
          summary,
          timestamp: Date.now()
        }
      })
    } else {
      // 간단한 서비스 요약만
      const summary = getServiceSummary()
      
      return NextResponse.json({
        success: true,
        data: {
          summary,
          timestamp: Date.now()
        }
      })
    }

  } catch (error) {
    console.error('❌ 상태 확인 API 라우트 오류:', error)
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'STATUS_API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown status API error',
        source: 'api',
        timestamp: Date.now()
      }
    }, { status: 500 })
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
  })
}