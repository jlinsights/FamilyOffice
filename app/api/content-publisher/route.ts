import { NextRequest, NextResponse } from 'next/server';

import {
  contentAutoPublisher,
  ContentStatus,
  ContentType,
  SocialPlatform,
} from '@/lib/marketing/content-auto-publisher';

/**
 * 콘텐츠 자동 게시 시스템 API 엔드포인트
 * GET: 콘텐츠 조회, 통계, 스케줄 확인
 * POST: 콘텐츠 생성, 승인, 게시, 스케줄링
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const contentId = searchParams.get('contentId');
  const status = searchParams.get('status') as ContentStatus | null;
  const approver = searchParams.get('approver');

  try {
    switch (action) {
      case 'get-content': {
        // 특정 콘텐츠 조회
        if (!contentId) {
          return NextResponse.json(
            {
              success: false,
              error: 'contentId parameter required',
            },
            { status: 400 }
          );
        }

        const content = contentAutoPublisher.getContent(contentId);

        if (!content) {
          return NextResponse.json(
            {
              success: false,
              error: 'Content not found',
            },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          data: content,
        });
      }

      case 'get-contents-by-status': {
        // 상태별 콘텐츠 조회
        if (!status) {
          return NextResponse.json(
            {
              success: false,
              error: 'status parameter required',
            },
            { status: 400 }
          );
        }

        const contents = contentAutoPublisher.getContentsByStatus(status);

        return NextResponse.json({
          success: true,
          data: {
            contents,
            total: contents.length,
            status,
          },
        });
      }

      case 'upcoming-scheduled': {
        // 다가오는 스케줄된 콘텐츠
        const days = parseInt(searchParams.get('days') || '7');
        const contents =
          contentAutoPublisher.getUpcomingScheduledContents(days);

        return NextResponse.json({
          success: true,
          data: {
            contents,
            total: contents.length,
            days,
          },
        });
      }

      case 'pending-approvals': {
        // 승인 대기 중인 콘텐츠
        const contents = contentAutoPublisher.getPendingApprovals(
          approver || undefined
        );

        return NextResponse.json({
          success: true,
          data: {
            contents,
            total: contents.length,
            approver: approver || 'all',
          },
        });
      }

      case 'dashboard-stats': {
        // 대시보드 통계
        const stats = contentAutoPublisher.getDashboardStats();

        return NextResponse.json({
          success: true,
          data: stats,
        });
      }

      case 'dashboard-data': {
        // 대시보드용 종합 데이터
        const stats = contentAutoPublisher.getDashboardStats();
        const upcomingScheduled =
          contentAutoPublisher.getUpcomingScheduledContents(7);
        const pendingApprovals = contentAutoPublisher.getPendingApprovals();
        const recentPublished = contentAutoPublisher
          .getContentsByStatus('published')
          .sort((a, b) => {
            if (!a.publishedDate || !b.publishedDate) return 0;
            return b.publishedDate.getTime() - a.publishedDate.getTime();
          })
          .slice(0, 5);

        return NextResponse.json({
          success: true,
          data: {
            stats,
            upcomingScheduled: upcomingScheduled.map(c => ({
              id: c.id,
              title: c.title,
              type: c.type,
              scheduledDate: c.scheduledDate,
              status: c.status,
            })),
            pendingApprovals: pendingApprovals.map(c => ({
              id: c.id,
              title: c.title,
              type: c.type,
              createdBy: c.createdBy,
              approvalRequests: c.approvalRequests,
            })),
            recentPublished: recentPublished.map(c => ({
              id: c.id,
              title: c.title,
              type: c.type,
              publishedDate: c.publishedDate,
              views: c.views,
              shares: c.shares,
              engagementRate: c.engagementRate,
            })),
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
              'get-content',
              'get-contents-by-status',
              'upcoming-scheduled',
              'pending-approvals',
              'dashboard-stats',
              'dashboard-data',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Content Publisher API Error:', error);
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
 * POST: 콘텐츠 생성, 승인, 게시, 스케줄링
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create-content': {
        // 콘텐츠 생성
        const {
          title,
          content,
          type,
          createdBy,
          scheduledDate,
          tags,
          categories,
        } = body;

        if (!title || !content || !type || !createdBy) {
          return NextResponse.json(
            {
              success: false,
              error: 'Missing required fields: title, content, type, createdBy',
            },
            { status: 400 }
          );
        }

        const contentItem = contentAutoPublisher.createContent({
          title,
          content,
          type: type as ContentType,
          createdBy,
          ...(scheduledDate && { scheduledDate: new Date(scheduledDate) }),
          tags,
          categories,
        });

        return NextResponse.json({
          success: true,
          message: 'Content created successfully',
          data: contentItem,
        });
      }

      case 'request-approval': {
        // 승인 요청
        const { contentId, requestedBy, approver } = body;

        if (!contentId || !requestedBy || !approver) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Missing required fields: contentId, requestedBy, approver',
            },
            { status: 400 }
          );
        }

        const approvalRequest = contentAutoPublisher.requestApproval(
          contentId,
          requestedBy,
          approver
        );

        return NextResponse.json({
          success: true,
          message: 'Approval requested successfully',
          data: approvalRequest,
        });
      }

      case 'approve-content': {
        // 승인 처리
        const { contentId, approvalRequestId, approvedBy, comments } = body;

        if (!contentId || !approvalRequestId || !approvedBy) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Missing required fields: contentId, approvalRequestId, approvedBy',
            },
            { status: 400 }
          );
        }

        const content = contentAutoPublisher.approveContent(
          contentId,
          approvalRequestId,
          approvedBy,
          comments
        );

        return NextResponse.json({
          success: true,
          message: 'Content approved successfully',
          data: content,
        });
      }

      case 'reject-content': {
        // 승인 거부
        const { contentId, approvalRequestId, rejectedBy, comments } = body;

        if (!contentId || !approvalRequestId || !rejectedBy || !comments) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Missing required fields: contentId, approvalRequestId, rejectedBy, comments',
            },
            { status: 400 }
          );
        }

        const content = contentAutoPublisher.rejectContent(
          contentId,
          approvalRequestId,
          rejectedBy,
          comments
        );

        return NextResponse.json({
          success: true,
          message: 'Content rejected',
          data: content,
        });
      }

      case 'schedule-content': {
        // 콘텐츠 스케줄링
        const { contentId, scheduledDate } = body;

        if (!contentId || !scheduledDate) {
          return NextResponse.json(
            {
              success: false,
              error: 'Missing required fields: contentId, scheduledDate',
            },
            { status: 400 }
          );
        }

        const content = contentAutoPublisher.scheduleContent(
          contentId,
          new Date(scheduledDate)
        );

        return NextResponse.json({
          success: true,
          message: 'Content scheduled successfully',
          data: content,
        });
      }

      case 'publish-content': {
        // 콘텐츠 게시
        const { contentId } = body;

        if (!contentId) {
          return NextResponse.json(
            {
              success: false,
              error: 'contentId required',
            },
            { status: 400 }
          );
        }

        const result = await contentAutoPublisher.publishContent(contentId);

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? 'Content published successfully'
            : 'Failed to publish content',
          data: result,
        });
      }

      case 'publish-scheduled': {
        // 스케줄된 콘텐츠 자동 게시 (Cron Job에서 호출)
        const results = await contentAutoPublisher.publishScheduledContents();

        return NextResponse.json({
          success: true,
          message: `${results.length} scheduled contents published`,
          data: {
            results,
            total: results.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
          },
        });
      }

      case 'generate-from-calendar': {
        // 캘린더 기반 콘텐츠 일괄 생성
        const { targetAudience, monthsAhead } = body;

        if (!targetAudience) {
          return NextResponse.json(
            {
              success: false,
              error: 'targetAudience required',
            },
            { status: 400 }
          );
        }

        const contents = await contentAutoPublisher.generateContentFromCalendar(
          targetAudience as 'ceo' | 'high-net-worth' | 'mid-market',
          monthsAhead || 3
        );

        return NextResponse.json({
          success: true,
          message: `${contents.length} contents generated from calendar`,
          data: {
            contents,
            total: contents.length,
            targetAudience,
            monthsAhead: monthsAhead || 3,
          },
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'create-content',
              'request-approval',
              'approve-content',
              'reject-content',
              'schedule-content',
              'publish-content',
              'publish-scheduled',
              'generate-from-calendar',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Content Publisher POST Error:', error);
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
