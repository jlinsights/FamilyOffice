import {
  register,
  Counter,
  Histogram,
  Gauge,
  collectDefaultMetrics,
} from 'prom-client';
import { logger } from '../logging/logger';

// 기본 메트릭 수집 활성화
collectDefaultMetrics({ register });

// API 요청 메트릭
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP 요청 지속 시간',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: '총 HTTP 요청 수',
  labelNames: ['method', 'route', 'status_code'],
});

// 데이터베이스 메트릭
export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: '데이터베이스 쿼리 지속 시간',
  labelNames: ['operation', 'table'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

export const dbConnectionsActive = new Gauge({
  name: 'db_connections_active',
  help: '활성 데이터베이스 연결 수',
  labelNames: ['database'],
});

// 큐 메트릭
export const queueJobDuration = new Histogram({
  name: 'queue_job_duration_seconds',
  help: '큐 작업 지속 시간',
  labelNames: ['queue', 'job_type'],
  buckets: [1, 5, 10, 30, 60, 120, 300],
});

export const queueJobsTotal = new Counter({
  name: 'queue_jobs_total',
  help: '총 큐 작업 수',
  labelNames: ['queue', 'job_type', 'status'],
});

export const queueJobsActive = new Gauge({
  name: 'queue_jobs_active',
  help: '활성 큐 작업 수',
  labelNames: ['queue'],
});

// 비즈니스 메트릭
export const portfolioValue = new Gauge({
  name: 'portfolio_value_total',
  help: '포트폴리오 총 가치',
  labelNames: ['tenant_id', 'portfolio_id'],
});

export const transactionVolume = new Counter({
  name: 'transaction_volume_total',
  help: '총 거래량',
  labelNames: ['tenant_id', 'transaction_type'],
});

export const userSessionsActive = new Gauge({
  name: 'user_sessions_active',
  help: '활성 사용자 세션 수',
  labelNames: ['tenant_id'],
});

// 에러 메트릭
export const errorTotal = new Counter({
  name: 'errors_total',
  help: '총 에러 수',
  labelNames: ['service', 'error_type'],
});

// 메트릭 수집기 클래스
export class MetricsCollector {
  private static instance: MetricsCollector;

  private constructor() {
    this.initializeMetrics();
  }

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  private initializeMetrics(): void {
    logger.info('메트릭 수집기 초기화');
  }

  // HTTP 요청 메트릭 기록
  recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    duration: number
  ): void {
    const labels = { method, route, status_code: statusCode.toString() };

    httpRequestDuration.observe(labels, duration / 1000); // 초 단위로 변환
    httpRequestTotal.inc(labels);
  }

  // 데이터베이스 쿼리 메트릭 기록
  recordDbQuery(operation: string, table: string, duration: number): void {
    const labels = { operation, table };
    dbQueryDuration.observe(labels, duration / 1000);
  }

  // 데이터베이스 연결 수 설정
  setDbConnections(count: number, database: string = 'postgresql'): void {
    dbConnectionsActive.set({ database }, count);
  }

  // 큐 작업 메트릭 기록
  recordQueueJob(
    queue: string,
    jobType: string,
    duration: number,
    status: 'completed' | 'failed'
  ): void {
    const labels = { queue, job_type: jobType };

    queueJobDuration.observe(labels, duration / 1000);
    queueJobsTotal.inc({ ...labels, status });
  }

  // 활성 큐 작업 수 설정
  setQueueJobsActive(queue: string, count: number): void {
    queueJobsActive.set({ queue }, count);
  }

  // 포트폴리오 가치 설정
  setPortfolioValue(
    tenantId: string,
    portfolioId: string,
    value: number
  ): void {
    portfolioValue.set(
      { tenant_id: tenantId, portfolio_id: portfolioId },
      value
    );
  }

  // 거래량 증가
  incrementTransactionVolume(
    tenantId: string,
    transactionType: string,
    amount: number = 1
  ): void {
    transactionVolume.inc(
      { tenant_id: tenantId, transaction_type: transactionType },
      amount
    );
  }

  // 활성 사용자 세션 수 설정
  setActiveSessions(tenantId: string, count: number): void {
    userSessionsActive.set({ tenant_id: tenantId }, count);
  }

  // 에러 메트릭 기록
  recordError(service: string, errorType: string): void {
    errorTotal.inc({ service, error_type: errorType });
  }

  // 메트릭 수집
  async getMetrics(): Promise<string> {
    return register.metrics();
  }

  // 헬스 체크
  async healthCheck(): Promise<{
    status: string;
    checks: Record<string, any>;
  }> {
    const checks: Record<string, any> = {};

    try {
      // 메트릭 등록 상태 확인
      const metrics = await this.getMetrics();
      checks.metrics = {
        status: 'healthy',
        message: '메트릭 수집 정상',
        metricCount: metrics.split('\n').length,
      };
    } catch (error) {
      checks.metrics = {
        status: 'unhealthy',
        message: '메트릭 수집 실패',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    const overallStatus = Object.values(checks).every(
      (check: any) => check.status === 'healthy'
    )
      ? 'healthy'
      : 'unhealthy';

    return {
      status: overallStatus,
      checks,
    };
  }
}

// 전역 메트릭 수집기 인스턴스
export const metricsCollector = MetricsCollector.getInstance();

// 메트릭 미들웨어 (Express용)
export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    metricsCollector.recordHttpRequest(
      req.method,
      req.route?.path || req.path,
      res.statusCode,
      duration
    );
  });

  next();
};
