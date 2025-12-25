import { NextRequest, NextResponse } from 'next/server';

import { abTestEngine, ABTestStatus } from '@/lib/ab-test-engine';

/**
 * A/B 테스트 API 엔드포인트
 * GET: 테스트 조회, 결과 분석
 * POST: 테스트 생성, 시작, 일시정지, 완료, 메트릭 기록
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const testId = searchParams.get('testId');
  const visitorId = searchParams.get('visitorId');
  const status = searchParams.get('status') as ABTestStatus | null;

  try {
    switch (action) {
      case 'get-test': {
        // 특정 테스트 조회
        if (!testId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId parameter required',
            },
            { status: 400 }
          );
        }

        const test = abTestEngine.getTest(testId);
        if (!test) {
          return NextResponse.json(
            {
              success: false,
              error: 'Test not found',
            },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          data: test,
        });
      }

      case 'get-all-tests': {
        // 모든 테스트 조회
        const tests = abTestEngine.getAllTests();

        return NextResponse.json({
          success: true,
          data: {
            tests,
            total: tests.length,
          },
        });
      }

      case 'get-tests-by-status': {
        // 상태별 테스트 조회
        if (!status) {
          return NextResponse.json(
            {
              success: false,
              error: 'status parameter required',
            },
            { status: 400 }
          );
        }

        const tests = abTestEngine.getTestsByStatus(status);

        return NextResponse.json({
          success: true,
          data: {
            tests,
            total: tests.length,
            status,
          },
        });
      }

      case 'analyze-test': {
        // 테스트 결과 분석
        if (!testId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId parameter required',
            },
            { status: 400 }
          );
        }

        const result = abTestEngine.analyzeTest(testId);

        return NextResponse.json({
          success: true,
          data: result,
        });
      }

      case 'assign-variant': {
        // Variant 할당 (트래픽 분할)
        if (!testId || !visitorId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId and visitorId parameters required',
            },
            { status: 400 }
          );
        }

        const variant = abTestEngine.assignVariant(testId, visitorId);

        return NextResponse.json({
          success: true,
          data: {
            testId,
            visitorId,
            variant,
          },
        });
      }

      case 'dashboard-data': {
        // 대시보드용 종합 데이터
        const allTests = abTestEngine.getAllTests();
        const runningTests = abTestEngine.getTestsByStatus('running');
        const completedTests = abTestEngine.getTestsByStatus('completed');

        // 최근 완료된 테스트 결과
        const recentResults = completedTests
          .slice(0, 5)
          .map(test => {
            try {
              return abTestEngine.analyzeTest(test.id);
            } catch {
              return null;
            }
          })
          .filter(r => r !== null);

        return NextResponse.json({
          success: true,
          data: {
            summary: {
              totalTests: allTests.length,
              runningTests: runningTests.length,
              completedTests: completedTests.length,
              draftTests: abTestEngine.getTestsByStatus('draft').length,
            },
            runningTests: runningTests.map(test => ({
              id: test.id,
              name: test.name,
              targetPage: test.targetPage,
              startDate: test.startDate,
              duration: test.duration,
              variants: test.variants.length,
            })),
            recentResults: recentResults.slice(0, 3),
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
              'get-test',
              'get-all-tests',
              'get-tests-by-status',
              'analyze-test',
              'assign-variant',
              'dashboard-data',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('A/B Test API Error:', error);
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
 * POST: 테스트 생성, 관리, 메트릭 기록
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create-test': {
        // 테스트 생성
        const {
          name,
          description,
          targetPage,
          variants,
          duration,
          minSampleSize,
          confidenceThreshold,
          primaryMetric,
          createdBy,
        } = body;

        if (!name || !targetPage || !variants || !createdBy) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Missing required fields: name, targetPage, variants, createdBy',
            },
            { status: 400 }
          );
        }

        const test = abTestEngine.createTest({
          name,
          description,
          targetPage,
          variants,
          duration,
          minSampleSize,
          confidenceThreshold,
          primaryMetric,
          createdBy,
        });

        return NextResponse.json({
          success: true,
          message: 'Test created successfully',
          data: test,
        });
      }

      case 'start-test': {
        // 테스트 시작
        const { testId } = body;

        if (!testId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId required',
            },
            { status: 400 }
          );
        }

        const test = abTestEngine.startTest(testId);

        return NextResponse.json({
          success: true,
          message: 'Test started successfully',
          data: test,
        });
      }

      case 'pause-test': {
        // 테스트 일시정지
        const { testId } = body;

        if (!testId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId required',
            },
            { status: 400 }
          );
        }

        const test = abTestEngine.pauseTest(testId);

        return NextResponse.json({
          success: true,
          message: 'Test paused successfully',
          data: test,
        });
      }

      case 'complete-test': {
        // 테스트 완료
        const { testId } = body;

        if (!testId) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId required',
            },
            { status: 400 }
          );
        }

        const test = abTestEngine.completeTest(testId);

        return NextResponse.json({
          success: true,
          message: 'Test completed successfully',
          data: test,
        });
      }

      case 'record-metrics': {
        // 메트릭 기록
        const { testId, variantId, metrics } = body;

        if (!testId || !variantId || !metrics) {
          return NextResponse.json(
            {
              success: false,
              error: 'testId, variantId, and metrics required',
            },
            { status: 400 }
          );
        }

        abTestEngine.recordMetrics(testId, variantId, metrics);

        return NextResponse.json({
          success: true,
          message: 'Metrics recorded successfully',
          data: {
            testId,
            variantId,
            metrics,
            recordedAt: new Date().toISOString(),
          },
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'create-test',
              'start-test',
              'pause-test',
              'complete-test',
              'record-metrics',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('A/B Test POST Error:', error);
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
