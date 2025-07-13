/**
 * 금융 데이터 API 오류 처리 및 로깅 시스템
 */

import type { ApiError } from '../types/financial'

// 오류 심각도 레벨
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium', 
  HIGH = 'high',
  CRITICAL = 'critical'
}

// 로그 레벨
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// 오류 통계 인터페이스
interface ErrorStats {
  count: number
  lastOccurred: number
  firstOccurred: number
  errorCodes: Record<string, number>
}

// 오류 통계 저장소 (메모리)
const errorStats: Record<string, ErrorStats> = {}

/**
 * 오류 심각도 결정
 */
function getErrorSeverity(error: ApiError): ErrorSeverity {
  // API 제한 오류는 중간 심각도
  if (error.code.includes('RATE_LIMIT') || error.code.includes('QUOTA')) {
    return ErrorSeverity.MEDIUM
  }

  // 네트워크 오류는 중간 심각도
  if (error.code.includes('NETWORK') || error.code.includes('TIMEOUT')) {
    return ErrorSeverity.MEDIUM
  }

  // 인증 오류는 높은 심각도
  if (error.code.includes('AUTH') || error.code.includes('KEY')) {
    return ErrorSeverity.HIGH
  }

  // 모든 API 실패는 치명적
  if (error.code.includes('ALL_APIS_FAILED')) {
    return ErrorSeverity.CRITICAL
  }

  // 기본은 낮은 심각도
  return ErrorSeverity.LOW
}

/**
 * 구조화된 로깅 함수
 */
function structuredLog(
  level: LogLevel,
  message: string,
  metadata: Record<string, any> = {}
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'financial-api',
    message,
    ...metadata
  }

  switch (level) {
    case LogLevel.DEBUG:
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍', JSON.stringify(logEntry, null, 2))
      }
      break
    case LogLevel.INFO:
      console.info('ℹ️', JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.WARN:
      console.warn('⚠️', JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.ERROR:
      console.error('❌', JSON.stringify(logEntry, null, 2))
      break
  }

  // 프로덕션 환경에서는 외부 로깅 서비스로 전송
  if (process.env.NODE_ENV === 'production' && level === LogLevel.ERROR) {
    // TODO: 외부 로깅 서비스 (예: DataDog, Sentry) 연동
    sendToExternalLogging(logEntry)
  }
}

/**
 * 외부 로깅 서비스 전송 (스텁)
 */
async function sendToExternalLogging(logEntry: any) {
  try {
    // 실제 구현에서는 로깅 서비스 API 호출
    // 예: await fetch('https://logs.datadoghq.com/api/v2/logs', {...})
    console.log('📤 외부 로깅 서비스로 전송 (구현 필요):', logEntry)
  } catch (error) {
    console.error('외부 로깅 전송 실패:', error)
  }
}

/**
 * API 오류 로깅
 */
export function logApiError(
  error: ApiError,
  context: {
    operation?: string
    symbol?: string
    source?: string
    duration?: number
  } = {}
) {
  const severity = getErrorSeverity(error)
  
  const metadata = {
    errorCode: error.code,
    errorMessage: error.message,
    errorSource: error.source,
    errorTimestamp: error.timestamp,
    severity,
    context
  }

  // 오류 통계 업데이트
  updateErrorStats(error)

  // 심각도에 따라 로그 레벨 결정
  let logLevel: LogLevel
  switch (severity) {
    case ErrorSeverity.CRITICAL:
      logLevel = LogLevel.ERROR
      break
    case ErrorSeverity.HIGH:
      logLevel = LogLevel.ERROR
      break
    case ErrorSeverity.MEDIUM:
      logLevel = LogLevel.WARN
      break
    case ErrorSeverity.LOW:
    default:
      logLevel = LogLevel.INFO
      break
  }

  structuredLog(
    logLevel,
    `금융 API 오류 발생: ${error.message}`,
    metadata
  )

  // 치명적 오류의 경우 즉시 알림
  if (severity === ErrorSeverity.CRITICAL) {
    sendCriticalAlert(error, context)
  }
}

/**
 * API 성공 로깅
 */
export function logApiSuccess(
  operation: string,
  context: {
    symbol?: string
    source?: string
    duration?: number
    fromCache?: boolean
    dataPoints?: number
  } = {}
) {
  structuredLog(
    LogLevel.INFO,
    `금융 API 성공: ${operation}`,
    {
      operation,
      context,
      performance: {
        duration: context.duration,
        cached: context.fromCache
      }
    }
  )
}

/**
 * 오류 통계 업데이트
 */
function updateErrorStats(error: ApiError) {
  const key = `${error.source}-${error.code}`
  
  if (!errorStats[key]) {
    errorStats[key] = {
      count: 0,
      lastOccurred: 0,
      firstOccurred: Date.now(),
      errorCodes: {}
    }
  }

  const stats = errorStats[key]
  stats.count++
  stats.lastOccurred = Date.now()
  stats.errorCodes[error.code] = (stats.errorCodes[error.code] || 0) + 1

  // 1시간 내에 같은 오류가 10회 이상 발생하면 경고
  if (stats.count >= 10 && (Date.now() - stats.firstOccurred) < 3600000) {
    structuredLog(
      LogLevel.WARN,
      `반복적인 오류 감지: ${error.code}`,
      {
        errorCode: error.code,
        count: stats.count,
        timeWindow: '1시간',
        source: error.source
      }
    )
  }
}

/**
 * 치명적 오류 알림 전송
 */
async function sendCriticalAlert(
  error: ApiError,
  context: Record<string, any>
) {
  try {
    const alertData = {
      timestamp: new Date().toISOString(),
      service: 'financial-api',
      severity: 'CRITICAL',
      error: {
        code: error.code,
        message: error.message,
        source: error.source
      },
      context,
      environment: process.env.NODE_ENV
    }

    // 실제 구현에서는 알림 서비스 (예: Slack, PagerDuty) 연동
    console.error('🚨 치명적 오류 알림:', JSON.stringify(alertData, null, 2))

    // TODO: 실제 알림 서비스 연동
    // await sendSlackAlert(alertData)
    // await sendPagerDutyAlert(alertData)

  } catch (alertError) {
    console.error('알림 전송 실패:', alertError)
  }
}

/**
 * 성능 메트릭 로깅
 */
export function logPerformanceMetric(
  operation: string,
  duration: number,
  metadata: Record<string, any> = {}
) {
  structuredLog(
    LogLevel.INFO,
    `성능 메트릭: ${operation}`,
    {
      operation,
      duration,
      performanceThreshold: duration > 5000 ? 'SLOW' : 'NORMAL',
      ...metadata
    }
  )

  // 5초 이상 걸리는 요청은 경고
  if (duration > 5000) {
    structuredLog(
      LogLevel.WARN,
      `느린 API 응답 감지: ${operation} (${duration}ms)`,
      {
        operation,
        duration,
        ...metadata
      }
    )
  }
}

/**
 * 캐시 메트릭 로깅
 */
export function logCacheMetric(
  operation: 'hit' | 'miss' | 'set' | 'error',
  key: string,
  metadata: Record<string, any> = {}
) {
  structuredLog(
    LogLevel.DEBUG,
    `캐시 ${operation}: ${key}`,
    {
      cacheOperation: operation,
      cacheKey: key,
      ...metadata
    }
  )
}

/**
 * 오류 통계 조회
 */
export function getErrorStats(): Record<string, ErrorStats> {
  return { ...errorStats }
}

/**
 * 오류 통계 초기화
 */
export function clearErrorStats(): void {
  Object.keys(errorStats).forEach(key => {
    delete errorStats[key]
  })
  
  structuredLog(
    LogLevel.INFO,
    '오류 통계 초기화됨',
    { action: 'clear-error-stats' }
  )
}

/**
 * 오류 처리 미들웨어 (API 라우트용)
 */
export function createErrorHandler(operation: string) {
  return (error: any, context: Record<string, any> = {}) => {
    const apiError: ApiError = {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'Unknown error occurred',
      source: error.source || 'unknown',
      timestamp: Date.now()
    }

    logApiError(apiError, { operation, ...context })
    return apiError
  }
}

/**
 * 타이머 유틸리티 (성능 측정용)
 */
export function createTimer() {
  const start = Date.now()
  
  return {
    stop: (operation: string, metadata: Record<string, any> = {}) => {
      const duration = Date.now() - start
      logPerformanceMetric(operation, duration, metadata)
      return duration
    }
  }
}

/**
 * API 호출 래퍼 (자동 로깅)
 */
export async function withLogging<T>(
  operation: string,
  apiCall: () => Promise<T>,
  context: Record<string, any> = {}
): Promise<T> {
  const timer = createTimer()
  
  try {
    structuredLog(
      LogLevel.DEBUG,
      `API 호출 시작: ${operation}`,
      { operation, context }
    )

    const result = await apiCall()
    
    const duration = timer.stop(operation, context)
    logApiSuccess(operation, { ...context, duration })
    
    return result

  } catch (error) {
    const duration = timer.stop(operation, { ...context, error: true })
    
    const apiError: ApiError = {
      code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      source: 'network',
      timestamp: Date.now()
    }

    logApiError(apiError, { operation, duration, ...context })
    throw error
  }
}