/**
 * 통합 API 에러 핸들러
 * 모든 API 라우트에서 일관된 에러 처리를 제공
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logSecurityEvent } from '@/lib/security/security-monitor';

// 에러 타입 정의
export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;

  constructor(
    message: string, 
    statusCode: number = 500, 
    code: string = 'INTERNAL_ERROR',
    details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// 일반적인 에러 클래스들
export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = '인증이 필요합니다') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = '권한이 없습니다') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = '리소스를 찾을 수 없습니다') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = '중복된 리소스입니다') {
    super(message, 409, 'CONFLICT_ERROR');
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = '요청 한도를 초과했습니다', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT_ERROR', { retryAfter });
  }
}

export class DatabaseError extends ApiError {
  constructor(message: string = '데이터베이스 오류가 발생했습니다', details?: unknown) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}

export class ExternalServiceError extends ApiError {
  constructor(service: string, message: string = '외부 서비스 오류가 발생했습니다', details?: unknown) {
    super(`${service}: ${message}`, 502, 'EXTERNAL_SERVICE_ERROR', details);
  }
}

// 에러 로깅 시스템
interface ErrorContext {
  request: NextRequest;
  endpoint: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  additionalData?: Record<string, unknown>;
}

// 에러 심각도 계산
function getErrorSeverity(error: Error | ApiError): 'low' | 'medium' | 'high' | 'critical' {
  if (error instanceof ApiError) {
    if (error.statusCode >= 500) return 'high';
    if (error.statusCode === 429) return 'medium';
    if (error.statusCode >= 400) return 'low';
  }
  
  // 보안 관련 에러
  if (error.message.toLowerCase().includes('security') ||
      error.message.toLowerCase().includes('attack') ||
      error.message.toLowerCase().includes('malicious')) {
    return 'critical';
  }
  
  // 시스템 에러
  if (error.message.toLowerCase().includes('database') ||
      error.message.toLowerCase().includes('connection') ||
      error.message.toLowerCase().includes('timeout')) {
    return 'high';
  }
  
  return 'medium';
}

// 에러 로깅 함수
async function logError(error: Error | ApiError, context: ErrorContext): Promise<void> {
  try {
    const severity = getErrorSeverity(error);
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(error instanceof ApiError ? {
          statusCode: error.statusCode,
          code: error.code,
          details: error.details,
        } : {}),
      },
      context: {
        endpoint: context.endpoint,
        method: context.request.method,
        url: context.request.url,
        ip: context.ip,
        userAgent: context.userAgent,
        userId: context.userId,
        ...context.additionalData,
      },
      severity,
    };

    // 콘솔 로깅
    console.error('API Error:', errorLog);

    // 보안 이벤트 로깅 (보안 관련 에러만)
    if (severity === 'critical' || severity === 'high') {
      await logSecurityEvent({
        type: error instanceof AuthenticationError ? 'invalid_auth' : 'admin_access',
        severity,
        description: `API Error: ${error.message}`,
        additional_data: errorLog,
      }, context.request);
    }

    // 프로덕션 환경에서는 외부 로깅 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      // TODO: Sentry, LogRocket 등 외부 서비스로 전송
    }

  } catch (loggingError) {
    console.error('Error logging failed:', loggingError);
  }
}

// 통합 에러 핸들러
export async function handleApiError(
  error: unknown,
  request: NextRequest,
  endpoint: string,
  additionalContext?: Record<string, unknown>
): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  const context: ErrorContext = {
    request,
    endpoint,
    ip,
    userAgent,
    ...(additionalContext && { additionalData: additionalContext }),
  };

  // Zod 검증 에러 처리
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      '입력값이 올바르지 않습니다',
      error.issues
    );
    await logError(validationError, context);
    
    return NextResponse.json({
      success: false,
      error: {
        message: validationError.message,
        code: validationError.code,
        details: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
        timestamp: new Date().toISOString(),
      },
    }, { status: validationError.statusCode });
  }

  // ApiError 처리
  if (error instanceof ApiError) {
    await logError(error, context);
    
    const shouldIncludeDetails = process.env.NODE_ENV === 'development';
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
        ...(shouldIncludeDetails && error.details ? { details: error.details } : {}),
        timestamp: new Date().toISOString(),
      },
    }, { 
      status: error.statusCode,
      headers: error instanceof RateLimitError && 
               typeof error.details === 'object' && 
               error.details && 
               'retryAfter' in error.details && 
               typeof error.details.retryAfter === 'number' ? {
        'Retry-After': error.details.retryAfter.toString(),
      } : {}
    });
  }

  // 일반 에러 처리
  const genericError = error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다');
  await logError(genericError, context);

  return NextResponse.json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'development' 
        ? genericError.message 
        : '서버 오류가 발생했습니다',
      code: 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' ? { 
        stack: genericError.stack 
      } : {}),
      timestamp: new Date().toISOString(),
    },
  }, { status: 500 });
}

// API 핸들러 래퍼 - 에러 처리 자동화
export function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  endpoint: string
) {
  return async (...args: T): Promise<NextResponse> => {
    const request = args[0] as NextRequest; // 첫 번째 인자는 항상 NextRequest
    
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error, request, endpoint);
    }
  };
}

// 에러 응답 유틸리티 함수들
export const ErrorResponses = {
  badRequest: (message: string = '잘못된 요청입니다') => 
    new ValidationError(message),
  
  unauthorized: (message: string = '인증이 필요합니다') => 
    new AuthenticationError(message),
  
  forbidden: (message: string = '권한이 없습니다') => 
    new AuthorizationError(message),
  
  notFound: (message: string = '리소스를 찾을 수 없습니다') => 
    new NotFoundError(message),
  
  conflict: (message: string = '중복된 리소스입니다') => 
    new ConflictError(message),
  
  rateLimited: (message: string = '요청 한도를 초과했습니다', retryAfter?: number) => 
    new RateLimitError(message, retryAfter),
  
  internalError: (message: string = '서버 오류가 발생했습니다') => 
    new ApiError(message, 500, 'INTERNAL_ERROR'),
  
  serviceUnavailable: (service: string, message?: string) => 
    new ExternalServiceError(service, message),
  
  database: (message?: string, details?: unknown) => 
    new DatabaseError(message, details),
};

// 에러 타입 가드
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError;
};

// 에러 메트릭스 수집
interface ErrorMetrics {
  totalErrors: number;
  errorsByCode: Record<string, number>;
  errorsByEndpoint: Record<string, number>;
  errorsByStatusCode: Record<number, number>;
  lastHourErrors: number;
}

let errorMetrics: ErrorMetrics = {
  totalErrors: 0,
  errorsByCode: {},
  errorsByEndpoint: {},
  errorsByStatusCode: {},
  lastHourErrors: 0,
};

export function getErrorMetrics(): ErrorMetrics {
  return { ...errorMetrics };
}

export function resetErrorMetrics(): void {
  errorMetrics = {
    totalErrors: 0,
    errorsByCode: {},
    errorsByEndpoint: {},
    errorsByStatusCode: {},
    lastHourErrors: 0,
  };
}

// 에러 메트릭스 업데이트
function updateErrorMetrics(error: Error | ApiError, endpoint: string): void {
  errorMetrics.totalErrors++;
  errorMetrics.lastHourErrors++;
  
  // 1시간 후 lastHourErrors 리셋
  setTimeout(() => {
    errorMetrics.lastHourErrors = Math.max(0, errorMetrics.lastHourErrors - 1);
  }, 60 * 60 * 1000);
  
  if (error instanceof ApiError) {
    const code = error.code;
    const statusCode = error.statusCode;
    
    errorMetrics.errorsByCode[code] = (errorMetrics.errorsByCode[code] || 0) + 1;
    errorMetrics.errorsByStatusCode[statusCode] = (errorMetrics.errorsByStatusCode[statusCode] || 0) + 1;
  }
  
  errorMetrics.errorsByEndpoint[endpoint] = (errorMetrics.errorsByEndpoint[endpoint] || 0) + 1;
}