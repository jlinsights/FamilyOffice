/**
 * 마케팅 분석 API
 * 리드 스코어링, 워크플로우, 콘텐츠 추천 성과 종합 분석
 */
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermissions } from '@/lib/admin-permissions';
import { getAIContentEngine } from '@/lib/marketing/ai-content-engine';
import { getLeadScoringEngine } from '@/lib/marketing/lead-scoring-engine';
import { getWorkflowEngine } from '@/lib/marketing/workflow-engine';
import { globalRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 관리자 권한 확인
    await requireAdminPermissions();

    // 3. 쿼리 파라미터 추출
    const url = new URL(request.url);
    const daysBack = parseInt(url.searchParams.get('days_back') || '30');
    const includeDetails = url.searchParams.get('include_details') === 'true';

    console.log(
      `📊 마케팅 분석 요청: ${daysBack}일간, 상세 정보: ${includeDetails}`
    );

    // 4. 각 엔진에서 성과 데이터 수집
    const [leadMetrics, workflowMetrics, contentMetrics] =
      await Promise.allSettled([
        getLeadScoringEngine().getMarketingMetrics(daysBack),
        getWorkflowEngine().getWorkflowAnalytics(undefined, daysBack),
        getAIContentEngine().getRecommendationAnalytics(daysBack),
      ]);

    // 5. 종합 분석 데이터 구성
    const analytics: any = {
      period: {
        days_back: daysBack,
        start_date: new Date(
          Date.now() - daysBack * 24 * 60 * 60 * 1000
        ).toISOString(),
        end_date: new Date().toISOString(),
      },

      // 리드 스코어링 메트릭
      lead_scoring:
        leadMetrics.status === 'fulfilled'
          ? {
              total_leads: (leadMetrics.value as any).total_leads,
              qualified_leads: (leadMetrics.value as any).qualified_leads,
              conversion_rate: `${(leadMetrics.value as any).conversion_rate}%`,
              avg_lead_score: parseFloat(
                (leadMetrics.value as any).avg_lead_score
              ).toFixed(1),
              top_activities:
                (leadMetrics.value as any).top_activities?.slice(0, 5) || [],
            }
          : {
              error: 'Failed to fetch lead scoring metrics',
              details:
                leadMetrics.status === 'rejected'
                  ? (leadMetrics.reason as Error)?.message
                  : 'Unknown error',
            },

      // 워크플로우 성과
      workflow_performance:
        workflowMetrics.status === 'fulfilled'
          ? {
              total_executions: workflowMetrics.value.total_executions,
              completed_executions: workflowMetrics.value.completed_executions,
              failed_executions: workflowMetrics.value.failed_executions,
              running_executions: workflowMetrics.value.running_executions,
              completion_rate: `${workflowMetrics.value.completion_rate}%`,
              failure_rate: `${workflowMetrics.value.failure_rate}%`,
              avg_completion_time: workflowMetrics.value.avg_completion_time,
            }
          : {
              error: 'Failed to fetch workflow metrics',
              details:
                workflowMetrics.status === 'rejected'
                  ? workflowMetrics.reason?.message
                  : 'Unknown error',
            },

      // 콘텐츠 추천 성과
      content_recommendations:
        contentMetrics.status === 'fulfilled'
          ? {
              total_recommendations: contentMetrics.value.total_recommendations,
              view_rate: `${contentMetrics.value.view_rate}%`,
              click_rate: `${contentMetrics.value.click_rate}%`,
              avg_relevance_score: contentMetrics.value.avg_relevance_score,
              avg_ai_confidence: contentMetrics.value.avg_ai_confidence,
              top_performing_content:
                contentMetrics.value.top_performing_content?.slice(0, 3) || [],
            }
          : {
              error: 'Failed to fetch content recommendation metrics',
              details:
                contentMetrics.status === 'rejected'
                  ? contentMetrics.reason?.message
                  : 'Unknown error',
            },

      // 종합 요약
      summary: {
        marketing_health_score: calculateMarketingHealthScore({
          leadMetrics:
            leadMetrics.status === 'fulfilled' ? leadMetrics.value : null,
          workflowMetrics:
            workflowMetrics.status === 'fulfilled'
              ? workflowMetrics.value
              : null,
          contentMetrics:
            contentMetrics.status === 'fulfilled' ? contentMetrics.value : null,
        }),
        key_insights: generateKeyInsights({
          leadMetrics:
            leadMetrics.status === 'fulfilled' ? leadMetrics.value : null,
          workflowMetrics:
            workflowMetrics.status === 'fulfilled'
              ? workflowMetrics.value
              : null,
          contentMetrics:
            contentMetrics.status === 'fulfilled' ? contentMetrics.value : null,
        }),
        recommendations: generateRecommendations({
          leadMetrics:
            leadMetrics.status === 'fulfilled' ? leadMetrics.value : null,
          workflowMetrics:
            workflowMetrics.status === 'fulfilled'
              ? workflowMetrics.value
              : null,
          contentMetrics:
            contentMetrics.status === 'fulfilled' ? contentMetrics.value : null,
        }),
      },
    };

    // 6. 상세 정보 추가 (옵션)
    if (includeDetails) {
      analytics.details = await getDetailedAnalytics(daysBack);
    }

    // 7. 성공 응답
    return NextResponse.json({
      success: true,
      data: analytics,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('마케팅 분석 API 오류:', error);

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
        error: 'Marketing analytics generation failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '마케팅 분석 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * 마케팅 헬스 스코어 계산 (0-100점)
 */
function calculateMarketingHealthScore(metrics: {
  leadMetrics: any;
  workflowMetrics: any;
  contentMetrics: any;
}): number {
  let totalScore = 0;
  let maxScore = 0;

  // 리드 전환율 (30점)
  if (metrics.leadMetrics) {
    const conversionRate = parseFloat(metrics.leadMetrics.conversion_rate) || 0;
    totalScore += Math.min(conversionRate * 3, 30); // 10% 전환율 = 30점
    maxScore += 30;
  }

  // 워크플로우 완료율 (30점)
  if (metrics.workflowMetrics) {
    const completionRate =
      parseFloat(metrics.workflowMetrics.completion_rate) || 0;
    totalScore += (completionRate / 100) * 30;
    maxScore += 30;
  }

  // 콘텐츠 클릭률 (25점)
  if (metrics.contentMetrics) {
    const clickRate = parseFloat(metrics.contentMetrics.click_rate) || 0;
    totalScore += Math.min(clickRate * 5, 25); // 5% 클릭률 = 25점
    maxScore += 25;
  }

  // 평균 리드 스코어 (15점)
  if (metrics.leadMetrics) {
    const avgLeadScore = parseFloat(metrics.leadMetrics.avg_lead_score) || 0;
    totalScore += (avgLeadScore / 100) * 15;
    maxScore += 15;
  }

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

/**
 * 주요 인사이트 생성
 */
function generateKeyInsights(metrics: {
  leadMetrics: any;
  workflowMetrics: any;
  contentMetrics: any;
}): string[] {
  const insights: string[] = [];

  // 리드 관련 인사이트
  if (metrics.leadMetrics) {
    const conversionRate = parseFloat(metrics.leadMetrics.conversion_rate) || 0;
    const totalLeads = parseInt(metrics.leadMetrics.total_leads) || 0;

    if (conversionRate > 15) {
      insights.push(`우수한 리드 품질: ${conversionRate}% 전환율 달성`);
    } else if (conversionRate < 5) {
      insights.push(`리드 품질 개선 필요: ${conversionRate}% 전환율로 낮음`);
    }

    if (totalLeads > 100) {
      insights.push(`활발한 리드 생성: ${totalLeads}개 리드 확보`);
    } else if (totalLeads < 20) {
      insights.push(`리드 생성 증대 필요: ${totalLeads}개 리드로 적음`);
    }
  }

  // 워크플로우 관련 인사이트
  if (metrics.workflowMetrics) {
    const completionRate =
      parseFloat(metrics.workflowMetrics.completion_rate) || 0;
    const failureRate = parseFloat(metrics.workflowMetrics.failure_rate) || 0;

    if (completionRate > 85) {
      insights.push(`효과적인 워크플로우: ${completionRate}% 완료율`);
    } else if (completionRate < 60) {
      insights.push(`워크플로우 최적화 필요: ${completionRate}% 완료율`);
    }

    if (failureRate > 10) {
      insights.push(`워크플로우 안정성 검토 필요: ${failureRate}% 실패율`);
    }
  }

  // 콘텐츠 관련 인사이트
  if (metrics.contentMetrics) {
    const clickRate = parseFloat(metrics.contentMetrics.click_rate) || 0;
    const viewRate = parseFloat(metrics.contentMetrics.view_rate) || 0;

    if (clickRate > 5) {
      insights.push(`높은 콘텐츠 참여도: ${clickRate}% 클릭률`);
    } else if (clickRate < 1) {
      insights.push(`콘텐츠 관련성 개선 필요: ${clickRate}% 클릭률`);
    }

    if (viewRate > 50) {
      insights.push(`좋은 콘텐츠 가시성: ${viewRate}% 조회율`);
    }
  }

  return insights.length > 0
    ? insights
    : ['충분한 데이터가 수집되면 인사이트를 제공합니다.'];
}

/**
 * 개선 권장사항 생성
 */
function generateRecommendations(metrics: {
  leadMetrics: any;
  workflowMetrics: any;
  contentMetrics: any;
}): string[] {
  const recommendations: string[] = [];

  // 리드 관련 권장사항
  if (metrics.leadMetrics) {
    const conversionRate = parseFloat(metrics.leadMetrics.conversion_rate) || 0;

    if (conversionRate < 10) {
      recommendations.push(
        '리드 스코어링 기준 재검토 및 질적 리드 확보 전략 수립'
      );
    }

    if (metrics.leadMetrics.top_activities?.length > 0) {
      const topActivity = metrics.leadMetrics.top_activities[0];
      recommendations.push(`${topActivity} 활동 중심의 마케팅 콘텐츠 강화`);
    }
  }

  // 워크플로우 관련 권장사항
  if (metrics.workflowMetrics) {
    const completionRate =
      parseFloat(metrics.workflowMetrics.completion_rate) || 0;
    const failureRate = parseFloat(metrics.workflowMetrics.failure_rate) || 0;

    if (completionRate < 70) {
      recommendations.push('워크플로우 단계별 최적화 및 고객 여정 재설계');
    }

    if (failureRate > 15) {
      recommendations.push('워크플로우 오류 원인 분석 및 안정성 개선');
    }
  }

  // 콘텐츠 관련 권장사항
  if (metrics.contentMetrics) {
    const clickRate = parseFloat(metrics.contentMetrics.click_rate) || 0;

    if (clickRate < 3) {
      recommendations.push('AI 추천 알고리즘 정확도 향상 및 개인화 강화');
    }

    if (metrics.contentMetrics.top_performing_content?.length > 0) {
      const topContent = metrics.contentMetrics.top_performing_content[0];
      recommendations.push(
        `${topContent.content_type} 타입 콘텐츠 확대 및 유사 콘텐츠 제작`
      );
    }
  }

  return recommendations.length > 0
    ? recommendations
    : ['현재 성과를 유지하며 지속적인 모니터링 진행'];
}

/**
 * 상세 분석 데이터 수집
 */
async function getDetailedAnalytics(daysBack: number) {
  try {
    const supabase = await import('@/lib/supabase/server').then(m =>
      m.createClient()
    );

    // 시간대별 활동 분석
    const { data: hourlyActivity } = await supabase
      .from('lead_activities')
      .select('created_at, activity_type')
      .gte(
        'created_at',
        new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()
      )
      .order('created_at', { ascending: true });

    // 리드 등급별 분포
    const { data: scoreDistribution } = await supabase
      .from('lead_scores')
      .select('score_grade')
      .gte(
        'created_at',
        new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString()
      );

    return {
      hourly_activity_pattern: analyzeHourlyActivity(hourlyActivity || []),
      lead_score_distribution: analyzeScoreDistribution(
        scoreDistribution || []
      ),
      activity_trends: analyzeActivityTrends(hourlyActivity || []),
    };
  } catch (error) {
    console.error('상세 분석 데이터 수집 실패:', error);
    return { error: 'Failed to generate detailed analytics' };
  }
}

/**
 * 시간대별 활동 패턴 분석
 */
function analyzeHourlyActivity(activities: any[]) {
  const hourlyCount = new Array(24).fill(0);

  activities.forEach(activity => {
    const hour = new Date(activity.created_at).getHours();
    hourlyCount[hour]++;
  });

  const peakHour = hourlyCount.indexOf(Math.max(...hourlyCount));

  return {
    hourly_distribution: hourlyCount,
    peak_hour: peakHour,
    peak_hour_label: `${peakHour}:00-${peakHour + 1}:00`,
    total_activities: activities.length,
  };
}

/**
 * 리드 등급 분포 분석
 */
function analyzeScoreDistribution(scores: any[]) {
  const distribution = { A: 0, B: 0, C: 0, D: 0 };

  scores.forEach(score => {
    if (distribution.hasOwnProperty(score.score_grade)) {
      distribution[score.score_grade as keyof typeof distribution]++;
    }
  });

  return distribution;
}

/**
 * 활동 트렌드 분석
 */
function analyzeActivityTrends(activities: any[]) {
  const activityTypes = activities.reduce(
    (acc, activity) => {
      acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(activityTypes)
    .map(([type, count]) => ({ type, count: count as number }))
    .sort((a, b) => (b.count as number) - (a.count as number))
    .slice(0, 10);
}
