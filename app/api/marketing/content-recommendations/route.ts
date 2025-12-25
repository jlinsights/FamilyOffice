/**
 * AI 콘텐츠 추천 API
 * 리드별 개인화된 콘텐츠 추천 생성 및 조회
 */
import { NextRequest, NextResponse } from 'next/server';

import { requireAdminPermissions } from '@/lib/admin-permissions';
import { getAIContentEngine } from '@/lib/marketing/ai-content-engine';
import { globalRateLimit } from '@/lib/rate-limit';
import { safeFrom } from '@/lib/supabase/helpers';

/**
 * 콘텐츠 추천 생성 (POST)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 관리자 권한 확인
    await requireAdminPermissions();

    // 3. 요청 데이터 파싱
    const {
      contact_id,
      max_recommendations = 5,
      force_regenerate = false,
    } = await request.json();

    if (!contact_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing contact_id',
          message: '콘택트 ID가 필요합니다.',
        },
        { status: 400 }
      );
    }

    // 4. AI 콘텐츠 엔진으로 추천 생성
    const contentEngine = getAIContentEngine();
    const recommendations = await contentEngine.generateRecommendations(
      contact_id,
      max_recommendations
    );

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Content recommendations generated successfully',
      data: {
        contact_id,
        recommendations_count: recommendations.length,
        recommendations: recommendations.map(rec => ({
          content_id: rec.content.id,
          title: rec.content.title,
          type: rec.content.type,
          category: rec.content.category,
          url: rec.content.url,
          relevance_score: rec.relevance_score,
          ai_confidence: rec.ai_confidence,
          recommendation_reason: rec.recommendation_reason,
          personalization_factors: rec.personalization_factors,
          difficulty_level: rec.content.difficulty_level,
          reading_time_minutes: rec.content.reading_time_minutes,
        })),
        generated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('콘텐츠 추천 생성 API 오류:', error);

    // 권한 오류인 경우
    if (error instanceof Error && error.message.includes('권한')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized access',
          message: '관리자 권한이 필요합니다.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Content recommendation generation failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '콘텐츠 추천 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * 추천 결과 조회 (GET)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    const url = new URL(request.url);
    const contactId = url.searchParams.get('contact_id');
    const includeEngagement =
      url.searchParams.get('include_engagement') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '10');

    if (!contactId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing contact_id parameter',
          message: '콘택트 ID 파라미터가 필요합니다.',
        },
        { status: 400 }
      );
    }

    // 2. 추천 결과 조회
    const contentEngine = getAIContentEngine();
    const supabase = await import('@/lib/supabase/server').then(m =>
      m.createClient()
    );

    let query = supabase
      .from('content_recommendations')
      .select('*')
      .eq('hubspot_contact_id', contactId)
      .order('created_at', { ascending: false });

    if (limit > 0) {
      query = query.limit(limit);
    }

    const { data: recommendations, error } = (await query) as {
      data: Array<{
        id: string;
        content_id: string;
        content_title: string;
        content_type: string;
        content_url: string;
        relevance_score: number;
        ai_confidence: number;
        recommendation_reason: string;
        status: string;
        created_at: string;
        viewed_at: string | null;
        clicked_at: string | null;
        hubspot_contact_id: string;
      }> | null;
      error: any;
    };

    if (error) {
      throw error;
    }

    // 3. 추천 성과 정보 추가 (옵션)
    let engagementStats = null;
    if (includeEngagement && recommendations && recommendations.length > 0) {
      const totalRecommendations = recommendations.length;
      const viewedRecommendations = recommendations.filter(
        rec => rec.viewed_at
      ).length;
      const clickedRecommendations = recommendations.filter(
        rec => rec.clicked_at
      ).length;

      engagementStats = {
        total_recommendations: totalRecommendations,
        viewed_recommendations: viewedRecommendations,
        clicked_recommendations: clickedRecommendations,
        view_rate:
          totalRecommendations > 0
            ? ((viewedRecommendations / totalRecommendations) * 100).toFixed(1)
            : '0',
        click_rate:
          totalRecommendations > 0
            ? ((clickedRecommendations / totalRecommendations) * 100).toFixed(1)
            : '0',
      };
    }

    // 4. 성공 응답
    return NextResponse.json({
      success: true,
      data: {
        contact_id: contactId,
        recommendations: (recommendations || []).map(rec => ({
          id: rec.id,
          content_id: rec.content_id,
          content_title: rec.content_title,
          content_type: rec.content_type,
          content_url: rec.content_url,
          relevance_score: rec.relevance_score,
          ai_confidence: rec.ai_confidence,
          recommendation_reason: rec.recommendation_reason,
          status: rec.status,
          created_at: rec.created_at,
          viewed_at: rec.viewed_at,
          clicked_at: rec.clicked_at,
        })),
        engagement_stats: engagementStats,
        retrieved_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('추천 결과 조회 API 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve recommendations',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '추천 결과 조회 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * 추천 참여도 업데이트 (PATCH)
 */
export async function PATCH(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 요청 데이터 파싱
    const { recommendation_id, engagement_type, additional_data } =
      await request.json();

    if (!recommendation_id || !engagement_type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'recommendation_id와 engagement_type이 필요합니다.',
        },
        { status: 400 }
      );
    }

    if (!['viewed', 'clicked', 'downloaded'].includes(engagement_type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid engagement_type',
          message:
            'engagement_type은 viewed, clicked, downloaded 중 하나여야 합니다.',
        },
        { status: 400 }
      );
    }

    // 3. 참여도 정보 업데이트
    const contentEngine = getAIContentEngine();
    await contentEngine.trackRecommendationEngagement(
      recommendation_id,
      engagement_type
    );

    // 4. 추가 데이터 로깅 (옵션)
    if (additional_data) {
      const supabase = await import('@/lib/supabase/server').then(m =>
        m.createClient()
      );

      // 추가 활동 로그 저장
      const { data: recommendation } = await safeFrom(
        supabase,
        'content_recommendations'
      )
        .select('hubspot_contact_id, content_id, content_type')
        .eq('id', recommendation_id)
        .single();

      if (recommendation) {
        const { getLeadScoringEngine } =
          await import('@/lib/marketing/lead-scoring-engine');
        const scoringEngine = getLeadScoringEngine();

        await scoringEngine.trackActivity({
          hubspot_contact_id: recommendation.hubspot_contact_id,
          activity_type: 'content_engagement',
          activity_data: {
            engagement_type,
            content_id: recommendation.content_id,
            content_type: recommendation.content_type,
            recommendation_id,
            additional_data,
            timestamp: new Date().toISOString(),
          },
        });
      }
    }

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Engagement tracked successfully',
      data: {
        recommendation_id,
        engagement_type,
        tracked_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('추천 참여도 업데이트 API 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track engagement',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '참여도 추적 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
