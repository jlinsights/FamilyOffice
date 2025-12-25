import { NextRequest, NextResponse } from 'next/server';

import {
  leadScoringSystem,
  LeadStatus,
  LeadSegment,
  BMADStage,
  ActivityType,
} from '@/lib/lead-scoring-system';

/**
 * 리드 스코어링 시스템 API 엔드포인트
 * GET: 리드 조회, 통계, 세그먼트 분석
 * POST: 리드 생성, 활동 기록, CRM 동기화
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const leadId = searchParams.get('leadId');
  const email = searchParams.get('email');
  const status = searchParams.get('status') as LeadStatus | null;
  const segment = searchParams.get('segment') as LeadSegment | null;
  const bmadStage = searchParams.get('bmadStage') as BMADStage | null;

  try {
    switch (action) {
      case 'get-lead': {
        // 리드 조회
        if (leadId) {
          const lead = leadScoringSystem.getLead(leadId);
          if (!lead) {
            return NextResponse.json(
              {
                success: false,
                error: 'Lead not found',
              },
              { status: 404 }
            );
          }

          return NextResponse.json({
            success: true,
            data: lead,
          });
        }

        if (email) {
          const lead = leadScoringSystem.findLeadByEmail(email);
          if (!lead) {
            return NextResponse.json(
              {
                success: false,
                error: 'Lead not found',
              },
              { status: 404 }
            );
          }

          return NextResponse.json({
            success: true,
            data: lead,
          });
        }

        return NextResponse.json(
          {
            success: false,
            error: 'leadId or email parameter required',
          },
          { status: 400 }
        );
      }

      case 'get-leads-by-status': {
        // 상태별 리드 조회
        if (!status) {
          return NextResponse.json(
            {
              success: false,
              error: 'status parameter required',
            },
            { status: 400 }
          );
        }

        const leads = leadScoringSystem.getLeadsByStatus(status);

        return NextResponse.json({
          success: true,
          data: {
            leads,
            total: leads.length,
            status,
          },
        });
      }

      case 'get-leads-by-segment': {
        // 세그먼트별 리드 조회
        if (!segment) {
          return NextResponse.json(
            {
              success: false,
              error: 'segment parameter required',
            },
            { status: 400 }
          );
        }

        const leads = leadScoringSystem.getLeadsBySegment(segment);

        return NextResponse.json({
          success: true,
          data: {
            leads,
            total: leads.length,
            segment,
          },
        });
      }

      case 'get-leads-by-bmad-stage': {
        // BMAD 단계별 리드 조회
        if (!bmadStage) {
          return NextResponse.json(
            {
              success: false,
              error: 'bmadStage parameter required',
            },
            { status: 400 }
          );
        }

        const leads = leadScoringSystem.getLeadsByBMADStage(bmadStage);

        return NextResponse.json({
          success: true,
          data: {
            leads,
            total: leads.length,
            bmadStage,
          },
        });
      }

      case 'get-leads-by-score': {
        // 점수 범위별 리드 조회
        const minScore = parseInt(searchParams.get('minScore') || '0');
        const maxScore = parseInt(searchParams.get('maxScore') || '100');

        const leads = leadScoringSystem.getLeadsByScoreRange(
          minScore,
          maxScore
        );

        return NextResponse.json({
          success: true,
          data: {
            leads,
            total: leads.length,
            minScore,
            maxScore,
          },
        });
      }

      case 'get-hot-leads': {
        // Hot Leads 조회
        const minProbability = parseInt(
          searchParams.get('minProbability') || '70'
        );
        const leads = leadScoringSystem.getHotLeads(minProbability);

        return NextResponse.json({
          success: true,
          data: {
            leads,
            total: leads.length,
            minProbability,
          },
        });
      }

      case 'get-stats': {
        // 통계 조회
        const stats = leadScoringSystem.getStats();

        return NextResponse.json({
          success: true,
          data: stats,
        });
      }

      case 'dashboard-data': {
        // 대시보드용 종합 데이터
        const data = leadScoringSystem.getDashboardData();

        return NextResponse.json({
          success: true,
          data: {
            ...data,
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
              'get-lead',
              'get-leads-by-status',
              'get-leads-by-segment',
              'get-leads-by-bmad-stage',
              'get-leads-by-score',
              'get-hot-leads',
              'get-stats',
              'dashboard-data',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Lead Scoring API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST: 리드 생성, 활동 기록, CRM 동기화
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create-or-update-lead': {
        // 리드 생성 또는 업데이트
        const { email, name, company, position, phone, demographics } = body;

        if (!email) {
          return NextResponse.json(
            {
              success: false,
              error: 'email is required',
            },
            { status: 400 }
          );
        }

        const lead = leadScoringSystem.createOrUpdateLead({
          email,
          name,
          company,
          position,
          phone,
          demographics,
        });

        return NextResponse.json({
          success: true,
          message: 'Lead created or updated successfully',
          data: lead,
        });
      }

      case 'record-activity': {
        // 활동 기록
        const { leadId, activityType, details } = body;

        if (!leadId || !activityType) {
          return NextResponse.json(
            {
              success: false,
              error: 'leadId and activityType are required',
            },
            { status: 400 }
          );
        }

        const lead = leadScoringSystem.recordActivity(
          leadId,
          activityType as ActivityType,
          details
        );

        return NextResponse.json({
          success: true,
          message: 'Activity recorded successfully',
          data: lead,
        });
      }

      case 'record-activity-by-email': {
        // 이메일로 활동 기록
        const { email, activityType, details } = body;

        if (!email || !activityType) {
          return NextResponse.json(
            {
              success: false,
              error: 'email and activityType are required',
            },
            { status: 400 }
          );
        }

        // 리드 찾기 또는 생성
        let lead = leadScoringSystem.findLeadByEmail(email);
        if (!lead) {
          lead = leadScoringSystem.createOrUpdateLead({ email });
        }

        // 활동 기록
        lead = leadScoringSystem.recordActivity(
          lead.id,
          activityType as ActivityType,
          details
        );

        return NextResponse.json({
          success: true,
          message: 'Activity recorded successfully',
          data: lead,
        });
      }

      case 'bulk-record-activities': {
        // 활동 일괄 기록
        const { activities } = body;

        if (!activities || !Array.isArray(activities)) {
          return NextResponse.json(
            {
              success: false,
              error: 'activities array is required',
            },
            { status: 400 }
          );
        }

        const results: { leadId: string; success: boolean; error?: string }[] =
          [];

        for (const activity of activities) {
          try {
            const { leadId, email, activityType, details } = activity;

            let lead;
            if (leadId) {
              lead = leadScoringSystem.getLead(leadId);
            } else if (email) {
              lead = leadScoringSystem.findLeadByEmail(email);
              if (!lead) {
                lead = leadScoringSystem.createOrUpdateLead({ email });
              }
            }

            if (!lead) {
              results.push({
                leadId: leadId || email,
                success: false,
                error: 'Lead not found',
              });
              continue;
            }

            leadScoringSystem.recordActivity(
              lead.id,
              activityType as ActivityType,
              details
            );
            results.push({
              leadId: lead.id,
              success: true,
            });
          } catch (error) {
            results.push({
              leadId: activity.leadId || activity.email,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        }

        return NextResponse.json({
          success: true,
          message: `${results.filter(r => r.success).length} activities recorded`,
          data: {
            results,
            total: results.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
          },
        });
      }

      case 'sync-to-crm': {
        // CRM 동기화
        const { leadId } = body;

        if (!leadId) {
          return NextResponse.json(
            {
              success: false,
              error: 'leadId is required',
            },
            { status: 400 }
          );
        }

        await leadScoringSystem.syncToCRM(leadId);

        return NextResponse.json({
          success: true,
          message: 'Lead synced to CRM successfully',
          data: {
            leadId,
            syncedAt: new Date().toISOString(),
          },
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'create-or-update-lead',
              'record-activity',
              'record-activity-by-email',
              'bulk-record-activities',
              'sync-to-crm',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Lead Scoring POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to process request',
      },
      { status: 500 }
    );
  }
}
