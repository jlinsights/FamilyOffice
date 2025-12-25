import { NextRequest, NextResponse } from 'next/server';

import {
  bmadKeywordTracker,
  type BMADCategory,
} from '@/lib/bmad-keyword-tracker';

/**
 * BMAD 키워드 추적 API 엔드포인트
 * GET: 키워드 성과 데이터 조회
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const category = searchParams.get('category') as BMADCategory | null;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    switch (action) {
      case 'track-all': {
        // 모든 키워드 추적
        const start = startDate
          ? new Date(startDate)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();

        const keywordData = await bmadKeywordTracker.trackAllKeywords(
          start,
          end
        );

        // 카테고리 필터링
        const filteredData = category
          ? keywordData.filter(k => k.category === category)
          : keywordData;

        return NextResponse.json({
          success: true,
          data: {
            keywords: filteredData,
            total: filteredData.length,
            dateRange: {
              start: start.toISOString(),
              end: end.toISOString(),
            },
          },
        });
      }

      case 'category-performance': {
        // 카테고리별 성과 분석
        const start = startDate
          ? new Date(startDate)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();

        const keywordData = await bmadKeywordTracker.trackAllKeywords(
          start,
          end
        );
        const categoryPerformance =
          bmadKeywordTracker.analyzeCategoryPerformance(keywordData);

        // 특정 카테고리만 반환
        const filteredPerformance = category
          ? categoryPerformance.filter(c => c.category === category)
          : categoryPerformance;

        return NextResponse.json({
          success: true,
          data: {
            categories: filteredPerformance,
            dateRange: {
              start: start.toISOString(),
              end: end.toISOString(),
            },
          },
        });
      }

      case 'monthly-report': {
        // 월간 리포트 생성
        const month = parseInt(
          searchParams.get('month') || String(new Date().getMonth() + 1)
        );
        const year = parseInt(
          searchParams.get('year') || String(new Date().getFullYear())
        );

        if (month < 1 || month > 12) {
          return NextResponse.json(
            {
              success: false,
              error: 'Invalid month parameter (1-12)',
            },
            { status: 400 }
          );
        }

        const report = await bmadKeywordTracker.generateMonthlyReport(
          month,
          year
        );

        return NextResponse.json({
          success: true,
          data: report,
        });
      }

      case 'top-performing': {
        // 상위 성과 키워드
        const limit = parseInt(searchParams.get('limit') || '10');
        const start = startDate
          ? new Date(startDate)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();

        const keywordData = await bmadKeywordTracker.trackAllKeywords(
          start,
          end
        );

        // 카테고리 필터링
        const filteredData = category
          ? keywordData.filter(k => k.category === category)
          : keywordData;

        // 성과 점수 기준 정렬 (전환 * 10 + 클릭)
        const topKeywords = filteredData
          .sort((a, b) => {
            const scoreA = a.conversions * 10 + a.clicks;
            const scoreB = b.conversions * 10 + b.clicks;
            return scoreB - scoreA;
          })
          .slice(0, limit);

        return NextResponse.json({
          success: true,
          data: {
            keywords: topKeywords,
            limit,
            category: category || 'all',
          },
        });
      }

      case 'dashboard-summary': {
        // 대시보드용 요약 데이터
        const start = startDate
          ? new Date(startDate)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();

        const keywordData = await bmadKeywordTracker.trackAllKeywords(
          start,
          end
        );
        const categoryPerformance =
          bmadKeywordTracker.analyzeCategoryPerformance(keywordData);

        // 전체 통계
        const totalImpressions = keywordData.reduce(
          (sum, k) => sum + k.impressions,
          0
        );
        const totalClicks = keywordData.reduce((sum, k) => sum + k.clicks, 0);
        const totalConversions = keywordData.reduce(
          (sum, k) => sum + k.conversions,
          0
        );
        const totalTraffic = keywordData.reduce((sum, k) => sum + k.traffic, 0);

        // 상위 5개 키워드
        const topKeywords = keywordData
          .sort((a, b) => {
            const scoreA = a.conversions * 10 + a.clicks;
            const scoreB = b.conversions * 10 + b.clicks;
            return scoreB - scoreA;
          })
          .slice(0, 5);

        return NextResponse.json({
          success: true,
          data: {
            overview: {
              totalKeywords: keywordData.length,
              totalImpressions,
              totalClicks,
              totalConversions,
              totalTraffic,
              avgCTR:
                totalImpressions > 0
                  ? (totalClicks / totalImpressions) * 100
                  : 0,
              avgConversionRate:
                totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
            },
            categoryPerformance,
            topKeywords,
            dateRange: {
              start: start.toISOString(),
              end: end.toISOString(),
            },
            lastUpdated: new Date().toISOString(),
          },
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'track-all',
              'category-performance',
              'monthly-report',
              'top-performing',
              'dashboard-summary',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('BMAD Tracking API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST: 키워드 성과 데이터 수동 업데이트
 * 관리자가 수동으로 성과 데이터를 입력할 수 있음
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, category, metrics } = body;

    if (!keyword || !category || !metrics) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: keyword, category, metrics',
        },
        { status: 400 }
      );
    }

    // TODO: 데이터베이스에 저장
    // 실제 구현 시 Supabase에 저장

    return NextResponse.json({
      success: true,
      message: 'Keyword performance data updated successfully',
      data: {
        keyword,
        category,
        metrics,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('BMAD Tracking POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update keyword performance data',
      },
      { status: 500 }
    );
  }
}
