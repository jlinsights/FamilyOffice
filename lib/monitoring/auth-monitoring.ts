/**
 * 인증 시스템 모니터링 및 분석 서비스
 * 성능 지표, 에러 추적, 사용자 행동 분석 포함
 */

interface AuthMetrics {
  timestamp: number;
  userId?: string;
  action: string;
  success: boolean;
  duration: number;
  error?: string;
  metadata?: Record<string, any>;
}

interface PerformanceMetrics {
  loginTime: number[];
  tokenRefreshTime: number[];
  profileSyncTime: number[];
  cacheHitRate: number;
  errorRate: number;
}

interface UserBehavior {
  userId: string;
  loginCount: number;
  lastLogin: number;
  preferredAuthMethod: 'kakao' | 'email';
  failureCount: number;
  avgSessionDuration: number;
  deviceType: 'mobile' | 'desktop';
  location?: string;
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  lastUpdate: number;
}

export class AuthMonitoringService {
  private metrics: AuthMetrics[] = [];
  private performanceData: PerformanceMetrics = {
    loginTime: [],
    tokenRefreshTime: [],
    profileSyncTime: [],
    cacheHitRate: 0,
    errorRate: 0
  };
  private userBehaviors = new Map<string, UserBehavior>();
  private readonly MAX_METRICS_HISTORY = 1000;
  private readonly PERFORMANCE_WINDOW = 24 * 60 * 60 * 1000; // 24시간

  /**
   * 인증 이벤트 기록
   */
  recordAuthEvent(event: Omit<AuthMetrics, 'timestamp'>) {
    const metric: AuthMetrics = {
      ...event,
      timestamp: Date.now()
    };

    this.metrics.push(metric);
    
    // 메트릭 히스토리 크기 제한
    if (this.metrics.length > this.MAX_METRICS_HISTORY) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS_HISTORY);
    }

    // 성능 데이터 업데이트
    this.updatePerformanceMetrics(metric);

    // 사용자 행동 데이터 업데이트
    if (event.userId) {
      this.updateUserBehavior(event.userId, metric);
    }

    // 실시간 알림 (에러 발생 시)
    if (!event.success) {
      this.handleErrorAlert(metric);
    }

    // 외부 모니터링 서비스로 전송
    this.sendToExternalMonitoring(metric);
  }

  /**
   * 성능 지표 업데이트
   */
  private updatePerformanceMetrics(metric: AuthMetrics) {
    const now = Date.now();
    const windowStart = now - this.PERFORMANCE_WINDOW;

    // 시간 기반 필터링
    const recentMetrics = this.metrics.filter(m => m.timestamp > windowStart);

    switch (metric.action) {
      case 'login':
        this.performanceData.loginTime.push(metric.duration);
        break;
      case 'token_refresh':
        this.performanceData.tokenRefreshTime.push(metric.duration);
        break;
      case 'profile_sync':
        this.performanceData.profileSyncTime.push(metric.duration);
        break;
    }

    // 에러율 계산
    const totalEvents = recentMetrics.length;
    const failedEvents = recentMetrics.filter(m => !m.success).length;
    this.performanceData.errorRate = totalEvents > 0 ? failedEvents / totalEvents : 0;

    // 배열 크기 제한 (메모리 관리)
    const maxDataPoints = 100;
    if (this.performanceData.loginTime.length > maxDataPoints) {
      this.performanceData.loginTime = this.performanceData.loginTime.slice(-maxDataPoints);
    }
    if (this.performanceData.tokenRefreshTime.length > maxDataPoints) {
      this.performanceData.tokenRefreshTime = this.performanceData.tokenRefreshTime.slice(-maxDataPoints);
    }
    if (this.performanceData.profileSyncTime.length > maxDataPoints) {
      this.performanceData.profileSyncTime = this.performanceData.profileSyncTime.slice(-maxDataPoints);
    }
  }

  /**
   * 사용자 행동 데이터 업데이트
   */
  private updateUserBehavior(userId: string, metric: AuthMetrics) {
    const existing = this.userBehaviors.get(userId) || {
      userId,
      loginCount: 0,
      lastLogin: 0,
      preferredAuthMethod: 'kakao',
      failureCount: 0,
      avgSessionDuration: 0,
      deviceType: 'desktop'
    };

    if (metric.action === 'login') {
      existing.loginCount++;
      existing.lastLogin = metric.timestamp;
      
      if (metric.success) {
        // 디바이스 타입 감지
        existing.deviceType = this.detectDeviceType();
      } else {
        existing.failureCount++;
      }
    }

    this.userBehaviors.set(userId, existing);
  }

  /**
   * 에러 알림 처리
   */
  private handleErrorAlert(metric: AuthMetrics) {
    const severity = this.calculateErrorSeverity(metric);
    
    if (severity >= 0.7) {
      this.sendCriticalAlert({
        event: metric.action,
        error: metric.error,
        userId: metric.userId,
        timestamp: metric.timestamp,
        severity
      });
    }

    // 에러 패턴 분석
    this.analyzeErrorPatterns(metric);
  }

  /**
   * 에러 심각도 계산
   */
  private calculateErrorSeverity(metric: AuthMetrics): number {
    let severity = 0.3; // 기본 심각도

    // 에러 타입별 가중치
    if (metric.error?.includes('NETWORK')) severity += 0.2;
    if (metric.error?.includes('TOKEN')) severity += 0.3;
    if (metric.error?.includes('AUTH')) severity += 0.4;
    if (metric.error?.includes('CRITICAL')) severity += 0.5;

    // 최근 에러율 고려
    if (this.performanceData.errorRate > 0.1) severity += 0.2;
    if (this.performanceData.errorRate > 0.2) severity += 0.3;

    return Math.min(severity, 1.0);
  }

  /**
   * 에러 패턴 분석
   */
  private analyzeErrorPatterns(metric: AuthMetrics) {
    const recentErrors = this.metrics
      .filter(m => !m.success && m.timestamp > Date.now() - 5 * 60 * 1000) // 최근 5분
      .slice(-10);

    // 연속 실패 감지
    const consecutiveFailures = recentErrors.filter(e => e.action === metric.action).length;
    if (consecutiveFailures >= 3) {
      this.sendPatternAlert({
        type: 'consecutive_failures',
        action: metric.action,
        count: consecutiveFailures,
        timeWindow: '5m'
      });
    }

    // 특정 사용자 반복 실패
    if (metric.userId) {
      const userErrors = recentErrors.filter(e => e.userId === metric.userId).length;
      if (userErrors >= 3) {
        this.sendPatternAlert({
          type: 'user_repeated_failures',
          userId: metric.userId,
          count: userErrors,
          timeWindow: '5m'
        });
      }
    }
  }

  /**
   * 시스템 상태 확인
   */
  getSystemHealth(): SystemHealth {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => m.timestamp > now - 60 * 60 * 1000); // 1시간

    const avgResponseTime = recentMetrics.length > 0 
      ? recentMetrics.reduce((sum, m) => sum + m.duration, 0) / recentMetrics.length 
      : 0;

    const errorRate = this.performanceData.errorRate;
    const activeUsers = new Set(recentMetrics.map(m => m.userId).filter(Boolean)).size;

    let status: SystemHealth['status'] = 'healthy';
    if (errorRate > 0.1 || avgResponseTime > 5000) status = 'degraded';
    if (errorRate > 0.2 || avgResponseTime > 10000) status = 'critical';

    return {
      status,
      uptime: this.calculateUptime(),
      responseTime: avgResponseTime,
      errorRate,
      activeUsers,
      lastUpdate: now
    };
  }

  /**
   * 성능 리포트 생성
   */
  generatePerformanceReport(): {
    summary: {
      totalEvents: number;
      successRate: number;
      avgLoginTime: number;
      avgTokenRefreshTime: number;
      avgProfileSyncTime: number;
      cacheHitRate: number;
    };
    trends: {
      hourly: Array<{ hour: number; events: number; errors: number }>;
      daily: Array<{ day: string; events: number; errors: number }>;
    };
    topErrors: Array<{ error: string; count: number; percentage: number }>;
    userInsights: {
      totalUsers: number;
      activeUsers: number;
      newUsers: number;
      returningUsers: number;
      avgSessionDuration: number;
      preferredAuthMethods: Record<string, number>;
      deviceTypes: Record<string, number>;
    };
  } {
    const now = Date.now();
    const last24h = now - 24 * 60 * 60 * 1000;
    const recentMetrics = this.metrics.filter(m => m.timestamp > last24h);

    // 기본 통계
    const totalEvents = recentMetrics.length;
    const successfulEvents = recentMetrics.filter(m => m.success).length;
    const successRate = totalEvents > 0 ? successfulEvents / totalEvents : 0;

    // 평균 시간 계산
    const avgLoginTime = this.calculateAverage(this.performanceData.loginTime);
    const avgTokenRefreshTime = this.calculateAverage(this.performanceData.tokenRefreshTime);
    const avgProfileSyncTime = this.calculateAverage(this.performanceData.profileSyncTime);

    // 시간별 트렌드
    const hourlyTrends = this.generateHourlyTrends(recentMetrics);
    const dailyTrends = this.generateDailyTrends();

    // 에러 분석
    const topErrors = this.analyzeTopErrors(recentMetrics);

    // 사용자 인사이트
    const userInsights = this.generateUserInsights();

    return {
      summary: {
        totalEvents,
        successRate,
        avgLoginTime,
        avgTokenRefreshTime,
        avgProfileSyncTime,
        cacheHitRate: this.performanceData.cacheHitRate
      },
      trends: {
        hourly: hourlyTrends,
        daily: dailyTrends
      },
      topErrors,
      userInsights
    };
  }

  /**
   * 디바이스 타입 감지
   */
  private detectDeviceType(): 'mobile' | 'desktop' {
    if (typeof navigator === 'undefined') return 'desktop';
    
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    return mobileRegex.test(userAgent) ? 'mobile' : 'desktop';
  }

  /**
   * 업타임 계산
   */
  private calculateUptime(): number {
    // 실제 구현에서는 서비스 시작 시간을 저장하여 계산
    return 99.9; // 임시값
  }

  /**
   * 평균값 계산
   */
  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * 시간별 트렌드 생성
   */
  private generateHourlyTrends(metrics: AuthMetrics[]) {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      events: 0,
      errors: 0
    }));

    metrics.forEach(metric => {
      const hour = new Date(metric.timestamp).getHours();
      hours[hour].events++;
      if (!metric.success) {
        hours[hour].errors++;
      }
    });

    return hours;
  }

  /**
   * 일별 트렌드 생성 (최근 7일)
   */
  private generateDailyTrends() {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        day: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
        events: 0,
        errors: 0
      };
    });

    // 실제 구현에서는 지난 7일 데이터 집계
    return days;
  }

  /**
   * 상위 에러 분석
   */
  private analyzeTopErrors(metrics: AuthMetrics[]) {
    const errorCounts = new Map<string, number>();
    const failedMetrics = metrics.filter(m => !m.success && m.error);

    failedMetrics.forEach(metric => {
      const error = metric.error!;
      errorCounts.set(error, (errorCounts.get(error) || 0) + 1);
    });

    const totalErrors = failedMetrics.length;
    const sortedErrors = Array.from(errorCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([error, count]) => ({
        error,
        count,
        percentage: totalErrors > 0 ? (count / totalErrors) * 100 : 0
      }));

    return sortedErrors;
  }

  /**
   * 사용자 인사이트 생성
   */
  private generateUserInsights() {
    const users = Array.from(this.userBehaviors.values());
    const now = Date.now();
    const last24h = now - 24 * 60 * 60 * 1000;
    const lastWeek = now - 7 * 24 * 60 * 60 * 1000;

    const activeUsers = users.filter(u => u.lastLogin > last24h).length;
    const newUsers = users.filter(u => u.loginCount === 1 && u.lastLogin > lastWeek).length;
    const returningUsers = users.filter(u => u.loginCount > 1 && u.lastLogin > last24h).length;

    const avgSessionDuration = users.length > 0 
      ? users.reduce((sum, u) => sum + u.avgSessionDuration, 0) / users.length 
      : 0;

    // 선호하는 인증 방법
    const authMethods: Record<string, number> = {};
    users.forEach(user => {
      authMethods[user.preferredAuthMethod] = (authMethods[user.preferredAuthMethod] || 0) + 1;
    });

    // 디바이스 타입
    const deviceTypes: Record<string, number> = {};
    users.forEach(user => {
      deviceTypes[user.deviceType] = (deviceTypes[user.deviceType] || 0) + 1;
    });

    return {
      totalUsers: users.length,
      activeUsers,
      newUsers,
      returningUsers,
      avgSessionDuration,
      preferredAuthMethods: authMethods,
      deviceTypes
    };
  }

  /**
   * 외부 모니터링 서비스로 전송
   */
  private sendToExternalMonitoring(metric: AuthMetrics) {
    if (process.env.NODE_ENV === 'production') {
      // Sentry, DataDog, New Relic 등으로 전송
      this.sendToSentry(metric);
      this.sendToDataDog(metric);
    }
  }

  private sendToSentry(metric: AuthMetrics) {
    // Sentry 통합 예시
    if (typeof window !== 'undefined' && window.Sentry) {
      if (!metric.success) {
        window.Sentry.captureException(new Error(metric.error || 'Auth error'), {
          tags: {
            action: metric.action,
            userId: metric.userId
          },
          extra: metric.metadata
        });
      } else {
        window.Sentry.addBreadcrumb({
          category: 'auth',
          message: metric.action,
          level: 'info',
          data: { duration: metric.duration }
        });
      }
    }
  }

  private sendToDataDog(metric: AuthMetrics) {
    // DataDog RUM 통합 예시
    if (typeof window !== 'undefined' && window.DD_RUM) {
      window.DD_RUM.addAction(metric.action, {
        success: metric.success,
        duration: metric.duration,
        userId: metric.userId
      });
    }
  }

  /**
   * 중요 알림 발송
   */
  private sendCriticalAlert(alert: {
    event: string;
    error?: string;
    userId?: string;
    timestamp: number;
    severity: number;
  }) {
    console.error('🚨 Critical Auth Alert:', alert);
    
    // 실제 구현에서는 Slack, PagerDuty, 이메일 등으로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToSlack(alert);
      this.sendToPagerDuty(alert);
    }
  }

  /**
   * 패턴 알림 발송
   */
  private sendPatternAlert(alert: {
    type: string;
    action?: string;
    userId?: string;
    count: number;
    timeWindow: string;
  }) {
    console.warn('⚠️ Auth Pattern Alert:', alert);
    
    // 실제 구현에서는 모니터링 대시보드로 전송
  }

  private sendToSlack(alert: any) {
    // Slack 웹훅 연동
  }

  private sendToPagerDuty(alert: any) {
    // PagerDuty 연동
  }

  /**
   * 메트릭 데이터 정리 (메모리 관리)
   */
  cleanup() {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7일
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);

    // 사용자 행동 데이터 정리 (비활성 사용자)
    const activeThreshold = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30일
    for (const [userId, behavior] of this.userBehaviors) {
      if (behavior.lastLogin < activeThreshold) {
        this.userBehaviors.delete(userId);
      }
    }
  }
}

// 싱글톤 인스턴스
let authMonitoringInstance: AuthMonitoringService | null = null;

export const getAuthMonitoringService = (): AuthMonitoringService => {
  if (!authMonitoringInstance) {
    authMonitoringInstance = new AuthMonitoringService();
  }
  return authMonitoringInstance;
};

// 전역 타입 확장 (외부 서비스 연동용)
declare global {
  interface Window {
    Sentry?: any;
    DD_RUM?: any;
  }
}