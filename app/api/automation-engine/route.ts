import { NextRequest, NextResponse } from 'next/server';

import {
  marketingAutomationEngine,
  ExecutionStatus,
} from '@/lib/marketing/marketing-automation-engine';
import { createAutomationRule } from '@/lib/marketing/inbound-marketing-automation';

/**
 * 마케팅 자동화 엔진 API 엔드포인트
 * GET: 실행 로그, 알림, 통계 조회
 * POST: 규칙 실행, 알림 확인
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const ruleId = searchParams.get('ruleId');
  const logId = searchParams.get('logId');
  const acknowledged = searchParams.get('acknowledged');

  try {
    switch (action) {
      case 'execution-logs': {
        // 실행 로그 조회
        if (ruleId) {
          const logs = marketingAutomationEngine.getExecutionLogsByRule(ruleId);
          return NextResponse.json({
            success: true,
            data: {
              logs,
              total: logs.length,
              ruleId,
            },
          });
        }

        const limit = parseInt(searchParams.get('limit') || '10');
        const recentLogs =
          marketingAutomationEngine.getRecentExecutionLogs(limit);

        return NextResponse.json({
          success: true,
          data: {
            logs: recentLogs,
            total: recentLogs.length,
            limit,
          },
        });
      }

      case 'execution-log': {
        // 특정 로그 조회
        if (!logId) {
          return NextResponse.json(
            {
              success: false,
              error: 'logId parameter required',
            },
            { status: 400 }
          );
        }

        const log = marketingAutomationEngine.getExecutionLog(logId);

        if (!log) {
          return NextResponse.json(
            {
              success: false,
              error: 'Execution log not found',
            },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          data: log,
        });
      }

      case 'alerts': {
        // 알림 조회
        const acknowledgedFilter =
          acknowledged === 'true'
            ? true
            : acknowledged === 'false'
              ? false
              : undefined;
        const alerts = marketingAutomationEngine.getAlerts(acknowledgedFilter);

        return NextResponse.json({
          success: true,
          data: {
            alerts,
            total: alerts.length,
            unacknowledged: alerts.filter(a => !a.acknowledged).length,
          },
        });
      }

      case 'stats': {
        // 엔진 통계
        const stats = marketingAutomationEngine.getEngineStats();

        return NextResponse.json({
          success: true,
          data: stats,
        });
      }

      case 'dashboard-data': {
        // 대시보드용 종합 데이터
        const stats = marketingAutomationEngine.getEngineStats();
        const recentLogs = marketingAutomationEngine.getRecentExecutionLogs(5);
        const unacknowledgedAlerts = marketingAutomationEngine.getAlerts(false);

        // 상태별 로그 수
        const statusCounts = recentLogs.reduce(
          (acc, log) => {
            acc[log.status] = (acc[log.status] || 0) + 1;
            return acc;
          },
          {} as Record<ExecutionStatus, number>
        );

        return NextResponse.json({
          success: true,
          data: {
            stats,
            recentLogs,
            statusCounts,
            alerts: {
              total: unacknowledgedAlerts.length,
              critical: unacknowledgedAlerts.filter(
                a => a.severity === 'critical'
              ).length,
              error: unacknowledgedAlerts.filter(a => a.severity === 'error')
                .length,
              warning: unacknowledgedAlerts.filter(
                a => a.severity === 'warning'
              ).length,
              info: unacknowledgedAlerts.filter(a => a.severity === 'info')
                .length,
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
              'execution-logs',
              'execution-log',
              'alerts',
              'stats',
              'dashboard-data',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Automation Engine API Error:', error);
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
 * POST: 규칙 실행, 알림 확인, 규칙 등록
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ruleId, alertId, acknowledgedBy, rule } = body;

    switch (action) {
      case 'execute-rule': {
        // 규칙 실행
        if (!ruleId) {
          return NextResponse.json(
            {
              success: false,
              error: 'ruleId required',
            },
            { status: 400 }
          );
        }

        const log = await marketingAutomationEngine.executeRule(ruleId);

        return NextResponse.json({
          success: true,
          message: 'Rule execution started',
          data: log,
        });
      }

      case 'acknowledge-alert': {
        // 알림 확인
        if (!alertId || !acknowledgedBy) {
          return NextResponse.json(
            {
              success: false,
              error: 'alertId and acknowledgedBy required',
            },
            { status: 400 }
          );
        }

        const alert = marketingAutomationEngine.acknowledgeAlert(
          alertId,
          acknowledgedBy
        );

        if (!alert) {
          return NextResponse.json(
            {
              success: false,
              error: 'Alert not found or already acknowledged',
            },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Alert acknowledged',
          data: alert,
        });
      }

      case 'register-rule': {
        // 규칙 등록
        if (!rule) {
          return NextResponse.json(
            {
              success: false,
              error: 'rule object required',
            },
            { status: 400 }
          );
        }

        // 규칙 생성 헬퍼 사용
        const automationRule = createAutomationRule(
          rule.name,
          rule.triggerType,
          rule.actionType,
          rule.options
        );

        marketingAutomationEngine.registerRule(automationRule);

        return NextResponse.json({
          success: true,
          message: 'Rule registered successfully',
          data: {
            ruleId: automationRule.id,
            name: automationRule.name,
          },
        });
      }

      case 'execute-cron-rules': {
        // Cron 규칙 실행 (스케줄러에서 호출)
        const logs = await marketingAutomationEngine.executeCronRules();

        return NextResponse.json({
          success: true,
          message: `${logs.length} cron rules executed`,
          data: {
            executedRules: logs.length,
            logs,
          },
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'execute-rule',
              'acknowledge-alert',
              'register-rule',
              'execute-cron-rules',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Automation Engine POST Error:', error);
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
