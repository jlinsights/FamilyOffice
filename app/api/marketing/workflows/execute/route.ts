/**
 * 마케팅 워크플로우 실행 API
 * 스케줄된 워크플로우 단계를 실행하고 관리 (cron job endpoint)
 */
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getWorkflowEngine } from '@/lib/marketing/workflow-engine';
import { globalRateLimit } from '@/lib/rate-limit';

/**
 * 예정된 워크플로우 단계 실행 (GET - Vercel Cron Jobs용)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Cron job 인증 (Vercel Cron Jobs)
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Invalid cron secret',
        },
        { status: 401 }
      );
    }

    // 2. Rate limiting (cron job 전용)
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    console.log('🔄 워크플로우 cron job 실행 시작');

    // 3. 워크플로우 엔진으로 예정된 작업 실행
    const workflowEngine = getWorkflowEngine();
    await workflowEngine.executeScheduledWorkflows();

    // 4. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Scheduled workflows executed successfully',
      executed_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('워크플로우 cron job 실행 실패:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Workflow execution failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '워크플로우 실행 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * 수동 워크플로우 트리거 (POST)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting 체크
    const rateLimitResult = await globalRateLimit(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // 2. 요청 데이터 파싱
    const {
      trigger_type,
      contact_id,
      trigger_data = {},
      workflow_id,
    } = await request.json();

    if (!trigger_type || !contact_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'trigger_type과 contact_id가 필요합니다.',
        },
        { status: 400 }
      );
    }

    // 3. 유효한 트리거 타입 검증
    const validTriggerTypes = [
      'contact_created',
      'score_change',
      'property_change',
      'form_submit',
      'page_visit',
      'manual',
    ];

    if (!validTriggerTypes.includes(trigger_type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid trigger type',
          message: `trigger_type은 다음 중 하나여야 합니다: ${validTriggerTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    console.log(`🎯 수동 워크플로우 트리거: ${trigger_type} for ${contact_id}`);

    // 4. 워크플로우 엔진으로 트리거 처리
    const workflowEngine = getWorkflowEngine();

    if (workflow_id) {
      // 특정 워크플로우 수동 실행
      await workflowEngine.checkAndExecuteWorkflows('manual', contact_id, {
        ...trigger_data,
        manual_trigger: true,
        specific_workflow_id: workflow_id,
        original_trigger_type: trigger_type,
      });
    } else {
      // 일반 트리거 기반 워크플로우 실행
      await workflowEngine.checkAndExecuteWorkflows(
        trigger_type,
        contact_id,
        trigger_data
      );
    }

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Workflow trigger processed successfully',
      data: {
        trigger_type,
        contact_id,
        workflow_id,
        triggered_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('수동 워크플로우 트리거 실패:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Manual workflow trigger failed',
        message:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : '워크플로우 트리거 처리 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
