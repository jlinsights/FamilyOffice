/**
 * 마케팅 자동화 규칙 실행 엔진
 * Cron job 연동, 실행 로그 저장, 실패 시 알림, 재시도 로직
 */
import {
  AutomationRule,
  generateContentTemplate,
  ContentTemplate,
} from './seo/inbound-marketing-automation';

export type ExecutionStatus =
  | 'pending'
  | 'running'
  | 'success'
  | 'failed'
  | 'retrying';

export interface ExecutionLog {
  id: string;
  ruleId: string;
  ruleName: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  duration?: number; // milliseconds
  result?: Record<string, unknown>;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ExecutionAlert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  ruleId: string;
  executionLogId: string;
  createdAt: Date;
  acknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
}

export interface EngineStats {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageDuration: number;
  successRate: number;
  lastExecutionAt?: Date;
  uptime: number; // seconds
}

/**
 * 마케팅 자동화 실행 엔진 클래스
 */
export class MarketingAutomationEngine {
  private executionLogs: Map<string, ExecutionLog> = new Map();
  private alerts: ExecutionAlert[] = [];
  private rules: Map<string, AutomationRule> = new Map();
  private startTime: Date = new Date();

  /**
   * 자동화 규칙 등록
   */
  registerRule(rule: AutomationRule): void {
    this.rules.set(rule.id, rule);
    console.log(
      `[AutomationEngine] Rule registered: ${rule.name} (${rule.id})`
    );
  }

  /**
   * 여러 규칙 일괄 등록
   */
  registerRules(rules: AutomationRule[]): void {
    rules.forEach(rule => this.registerRule(rule));
  }

  /**
   * 규칙 실행
   */
  async executeRule(ruleId: string): Promise<ExecutionLog> {
    const rule = this.rules.get(ruleId);

    if (!rule) {
      throw new Error(`Rule not found: ${ruleId}`);
    }

    // 실행 로그 생성
    const log: ExecutionLog = {
      id: this.generateLogId(),
      ruleId: rule.id,
      ruleName: rule.name,
      status: 'running',
      startedAt: new Date(),
      retryCount: 0,
      maxRetries: rule.retryPolicy?.maxRetries || 3,
    };

    this.executionLogs.set(log.id, log);

    try {
      console.log(`[AutomationEngine] Executing rule: ${rule.name}`);

      // 액션 실행
      const result = await this.performAction(rule);

      // 성공 처리
      const completedAt = new Date();
      log.status = 'success';
      log.completedAt = completedAt;
      log.duration = completedAt.getTime() - log.startedAt.getTime();
      log.result = result;

      this.executionLogs.set(log.id, log);

      console.log(
        `[AutomationEngine] Rule executed successfully: ${rule.name} (${log.duration}ms)`
      );

      // Supabase logging: https://github.com/jlinsights/FamilyOffice/issues/8
      // await this.saveLogToDatabase(log);

      return log;
    } catch (error) {
      // 실패 처리
      const completedAt = new Date();
      log.status = 'failed';
      log.completedAt = completedAt;
      log.duration = completedAt.getTime() - log.startedAt.getTime();
      log.error = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 'EXECUTION_FAILED',
        details: error,
      };

      this.executionLogs.set(log.id, log);

      // 알림 생성
      await this.createAlert({
        severity: 'error',
        title: `Rule Execution Failed: ${rule.name}`,
        message: log.error.message,
        ruleId: rule.id,
        executionLogId: log.id,
      });

      // 재시도 로직
      if (rule.retryPolicy?.enabled && log.retryCount < log.maxRetries) {
        await this.scheduleRetry(rule, log);
      }

      console.error(
        `[AutomationEngine] Rule execution failed: ${rule.name}`,
        error
      );

      return log;
    }
  }

  /**
   * 액션 실행 로직
   */
  private async performAction(
    rule: AutomationRule
  ): Promise<Record<string, unknown>> {
    const { action } = rule;

    switch (action.type) {
      case 'generate-content': {
        // 콘텐츠 자동 생성
        const targetKeyword =
          (action.config?.targetKeyword as string) || '패밀리오피스';
        const contentType = (action.config?.contentType as string) || 'blog';
        const targetAudience =
          (action.config?.targetAudience as string) || 'ceo';

        const template = generateContentTemplate(
          targetKeyword,
          contentType as ContentTemplate['type'],
          targetAudience as 'ceo' | 'high-net-worth' | 'mid-market'
        );

        console.log(
          `[AutomationEngine] Generated content template: ${template.title}`
        );

        return {
          action: 'generate-content',
          template,
          keyword: targetKeyword,
        };
      }

      case 'optimize-existing': {
        // 기존 콘텐츠 최적화
        const pageUrl = action.config?.pageUrl || '/';

        console.log(`[AutomationEngine] Optimizing page: ${pageUrl}`);

        return {
          action: 'optimize-existing',
          pageUrl,
          optimizations: [
            'Updated meta descriptions',
            'Improved internal linking',
            'Enhanced structured data',
          ],
        };
      }

      case 'update-metadata': {
        // 메타데이터 업데이트
        const pages = (action.config?.pages as string[]) || [];

        console.log(
          `[AutomationEngine] Updating metadata for ${pages.length} pages`
        );

        return {
          action: 'update-metadata',
          pagesUpdated: pages.length,
          updates: ['title', 'description', 'keywords'],
        };
      }

      case 'create-internal-links': {
        // 내부 링크 생성
        const sourcePages = (action.config?.sourcePages as string[]) || [];
        const targetPages = (action.config?.targetPages as string[]) || [];

        console.log(`[AutomationEngine] Creating internal links`);

        return {
          action: 'create-internal-links',
          linksCreated: sourcePages.length * targetPages.length,
          sourcePages,
          targetPages,
        };
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * 재시도 스케줄링
   */
  private async scheduleRetry(
    rule: AutomationRule,
    log: ExecutionLog
  ): Promise<void> {
    const retryDelay = rule.retryPolicy?.retryDelay || 300000; // 5분 기본값
    const nextRetryAt = new Date(Date.now() + retryDelay);

    log.status = 'retrying';
    log.retryCount += 1;
    log.nextRetryAt = nextRetryAt;

    this.executionLogs.set(log.id, log);

    console.log(
      `[AutomationEngine] Retry scheduled: ${rule.name} (attempt ${log.retryCount}/${log.maxRetries}) at ${nextRetryAt.toISOString()}`
    );

    // Cron job 또는 setTimeout으로 재시도 예약
    setTimeout(async () => {
      await this.executeRule(rule.id);
    }, retryDelay);

    // 알림 생성
    await this.createAlert({
      severity: 'warning',
      title: `Rule Retry Scheduled: ${rule.name}`,
      message: `Retry attempt ${log.retryCount}/${log.maxRetries} scheduled at ${nextRetryAt.toLocaleString('ko-KR')}`,
      ruleId: rule.id,
      executionLogId: log.id,
    });
  }

  /**
   * Cron 표현식 기반 규칙 실행
   */
  async executeCronRules(): Promise<ExecutionLog[]> {
    const now = new Date();
    const logs: ExecutionLog[] = [];

    for (const [, rule] of this.rules) {
      if (
        rule.trigger.type === 'schedule' &&
        rule.enabled &&
        rule.trigger.schedule
      ) {
        // Cron expression parsing: https://github.com/jlinsights/FamilyOffice/issues/8
        // 현재는 단순화된 로직
        if (this.shouldExecuteNow(rule.trigger.schedule, now)) {
          const log = await this.executeRule(rule.id);
          logs.push(log);
        }
      }
    }

    return logs;
  }

  /**
   * Cron 스케줄 매칭 (단순화된 버전)
   */
  private shouldExecuteNow(schedule: string, now: Date): boolean {
    // Cron parser library integration: https://github.com/jlinsights/FamilyOffice/issues/8
    // 현재는 특정 패턴만 지원

    const schedulePatterns: Record<string, () => boolean> = {
      '0 9 * * 2': () =>
        now.getDay() === 2 && now.getHours() === 9 && now.getMinutes() === 0, // 매주 화요일 9시
      '0 2 1 * *': () =>
        now.getDate() === 1 && now.getHours() === 2 && now.getMinutes() === 0, // 매월 1일 2시
      '0 * * * *': () => now.getMinutes() === 0, // 매시간
    };

    const matcher = schedulePatterns[schedule];
    return matcher ? matcher() : false;
  }

  /**
   * 알림 생성
   */
  private async createAlert(
    params: Omit<ExecutionAlert, 'id' | 'createdAt' | 'acknowledged'>
  ): Promise<ExecutionAlert> {
    const alert: ExecutionAlert = {
      id: this.generateAlertId(),
      createdAt: new Date(),
      acknowledged: false,
      ...params,
    };

    this.alerts.push(alert);

    // Notification integration (Email, Slack, Discord): https://github.com/jlinsights/FamilyOffice/issues/8
    console.log(`[AutomationEngine] Alert created: ${alert.title}`);

    // Supabase notification storage: https://github.com/jlinsights/FamilyOffice/issues/8
    // await this.saveAlertToDatabase(alert);

    return alert;
  }

  /**
   * 알림 확인 처리
   */
  acknowledgeAlert(
    alertId: string,
    acknowledgedBy: string
  ): ExecutionAlert | undefined {
    const alert = this.alerts.find(a => a.id === alertId);

    if (alert && !alert.acknowledged) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
      alert.acknowledgedBy = acknowledgedBy;

      console.log(`[AutomationEngine] Alert acknowledged: ${alert.title}`);
    }

    return alert;
  }

  /**
   * 실행 로그 조회
   */
  getExecutionLog(logId: string): ExecutionLog | undefined {
    return this.executionLogs.get(logId);
  }

  /**
   * 규칙별 실행 로그 조회
   */
  getExecutionLogsByRule(ruleId: string): ExecutionLog[] {
    return Array.from(this.executionLogs.values()).filter(
      log => log.ruleId === ruleId
    );
  }

  /**
   * 최근 실행 로그 조회
   */
  getRecentExecutionLogs(limit: number = 10): ExecutionLog[] {
    return Array.from(this.executionLogs.values())
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
      .slice(0, limit);
  }

  /**
   * 알림 조회
   */
  getAlerts(acknowledgedFilter?: boolean): ExecutionAlert[] {
    if (acknowledgedFilter === undefined) {
      return this.alerts;
    }
    return this.alerts.filter(a => a.acknowledged === acknowledgedFilter);
  }

  /**
   * 엔진 통계
   */
  getEngineStats(): EngineStats {
    const logs = Array.from(this.executionLogs.values());
    const totalExecutions = logs.length;
    const successfulExecutions = logs.filter(
      l => l.status === 'success'
    ).length;
    const failedExecutions = logs.filter(l => l.status === 'failed').length;

    const durations = logs
      .filter(l => l.duration !== undefined)
      .map(l => l.duration as number);

    const averageDuration =
      durations.length > 0
        ? durations.reduce((sum, d) => sum + d, 0) / durations.length
        : 0;

    const successRate =
      totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

    const lastLog = logs.sort(
      (a, b) => b.startedAt.getTime() - a.startedAt.getTime()
    )[0];
    const lastExecutionAt = lastLog?.startedAt;

    const uptime = Math.floor((Date.now() - this.startTime.getTime()) / 1000);

    const stats: EngineStats = {
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      averageDuration,
      successRate,
      uptime,
    };

    // Conditionally add optional property
    if (lastExecutionAt !== undefined) {
      stats.lastExecutionAt = lastExecutionAt;
    }

    return stats;
  }

  /**
   * 로그 ID 생성
   */
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * 알림 ID 생성
   */
  private generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * 엔진 상태 리셋 (테스트용)
   */
  reset(): void {
    this.executionLogs.clear();
    this.alerts = [];
    this.rules.clear();
    this.startTime = new Date();
    console.log('[AutomationEngine] Engine reset');
  }
}

/**
 * 싱글톤 인스턴스
 */
export const marketingAutomationEngine = new MarketingAutomationEngine();

// 기본 규칙 등록 (개발 환경)
if (process.env.NODE_ENV === 'development') {
  // Database rules loading: https://github.com/jlinsights/FamilyOffice/issues/8
  console.log('[AutomationEngine] Development mode: Ready to register rules');
}
