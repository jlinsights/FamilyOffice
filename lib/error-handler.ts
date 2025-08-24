/**
 * 글로벌 에러 핸들러 - 표준화된 에러 응답 시스템
 * 사용자 친화적 에러 메시지와 개발자 디버깅 정보 제공
 */
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { env } from '@/lib/env';

// 에러 타입 정의
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT_EXCEEDED',
  EXTERNAL_API = 'EXTERNAL_API_ERROR',
  DATABASE = 'DATABASE_ERROR',
  SERVER = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  TIMEOUT = 'TIMEOUT_ERROR',
}

// 에러 상세 정보 인터페이스
export interface ErrorDetail {
  type: ErrorType;
  message: string;
  userMessage: string; // 사용자에게 표시할 친화적 메시지
  code?: string;
  details?: any;
  statusCode: number;
  timestamp: string;
  requestId?: string;
  stack?: string; // 개발 환경에서만 포함
}

// 미리 정의된 에러 메시지들
const ERROR_MESSAGES = {
  [ErrorType.VALIDATION]: {
    en: 'Please check the input data and try again.',
    ko: '입력 데이터를 확인하고 다시 시도해주세요.',
  },
  [ErrorType.AUTHENTICATION]: {
    en: 'Authentication is required. Please log in.',
    ko: '로그인이 필요합니다.',
  },
  [ErrorType.AUTHORIZATION]: {
    en: 'You do not have permission to access this resource.',
    ko: '이 리소스에 접근할 권한이 없습니다.',
  },
  [ErrorType.NOT_FOUND]: {
    en: 'The requested resource was not found.',
    ko: '요청하신 리소스를 찾을 수 없습니다.',
  },
  [ErrorType.RATE_LIMIT]: {
    en: 'Too many requests. Please try again later.',
    ko: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.',
  },
  [ErrorType.EXTERNAL_API]: {
    en: 'External service is temporarily unavailable.',
    ko: '외부 서비스가 일시적으로 사용 불가합니다.',
  },
  [ErrorType.DATABASE]: {
    en: 'Database operation failed. Please try again.',
    ko: '데이터베이스 오류가 발생했습니다. 다시 시도해주세요.',
  },
  [ErrorType.SERVER]: {
    en: 'An internal server error occurred.',
    ko: '서버 내부 오류가 발생했습니다.',
  },
  [ErrorType.BAD_REQUEST]: {
    en: 'Invalid request format.',
    ko: '잘못된 요청 형식입니다.',
  },
  [ErrorType.TIMEOUT]: {
    en: 'Request timeout. Please try again.',
    ko: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  },
} as const;

/**
 * 요청 ID 생성 (디버깅용)
 */
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Zod 에러를 사용자 친화적 메시지로 변환
 */
function formatZodError(error: ZodError): string[] {
  return error.errors.map(err => {
    const path = err.path.join('.');
    const message = err.message;
    
    // 한국어 필드명 매핑
    const fieldNames: Record<string, string> = {
      name: '이름',
      email: '이메일',
      phone: '전화번호',
      company: '회사명',
      position: '직급',
      message: '메시지',
      password: '비밀번호',
    };
    
    const fieldName = fieldNames[path] || path;
    return `${fieldName}: ${message}`;
  });
}

/**
 * 에러 타입 자동 감지
 */
function detectErrorType(error: any): ErrorType {
  if (error instanceof ZodError) {
    return ErrorType.VALIDATION;
  }
  
  if (error.name === 'UnauthorizedError' || error.status === 401) {
    return ErrorType.AUTHENTICATION;
  }
  
  if (error.name === 'ForbiddenError' || error.status === 403) {
    return ErrorType.AUTHORIZATION;
  }
  
  if (error.name === 'NotFoundError' || error.status === 404) {
    return ErrorType.NOT_FOUND;
  }
  
  if (error.status === 429) {
    return ErrorType.RATE_LIMIT;
  }
  
  if (error.status === 400) {
    return ErrorType.BAD_REQUEST;
  }
  
  if (error.name === 'TimeoutError' || error.code === 'TIMEOUT') {
    return ErrorType.TIMEOUT;
  }
  
  if (error.name === 'DatabaseError' || error.code?.startsWith('DB_')) {
    return ErrorType.DATABASE;
  }
  
  if (error.name === 'ExternalAPIError' || error.code?.startsWith('EXT_')) {
    return ErrorType.EXTERNAL_API;
  }
  
  return ErrorType.SERVER;
}

/**
 * 상태 코드 결정
 */
function getStatusCode(errorType: ErrorType): number {
  const statusCodes = {
    [ErrorType.VALIDATION]: 400,
    [ErrorType.AUTHENTICATION]: 401,
    [ErrorType.AUTHORIZATION]: 403,
    [ErrorType.NOT_FOUND]: 404,
    [ErrorType.RATE_LIMIT]: 429,
    [ErrorType.EXTERNAL_API]: 502,
    [ErrorType.DATABASE]: 500,
    [ErrorType.SERVER]: 500,
    [ErrorType.BAD_REQUEST]: 400,
    [ErrorType.TIMEOUT]: 504,
  };
  
  return statusCodes[errorType] || 500;
}

/**
 * 상세 에러 정보 생성
 */
export function createErrorDetail(
  error: any,
  customMessage?: string,
  requestId?: string
): ErrorDetail {
  const errorType = detectErrorType(error);
  const statusCode = getStatusCode(errorType);
  const isDev = env.NODE_ENV === 'development';
  
  // 사용자 친화적 메시지 결정
  let userMessage = customMessage || ERROR_MESSAGES[errorType].ko;
  
  // Zod 에러의 경우 구체적인 필드 에러 메시지
  if (error instanceof ZodError) {
    const zodErrors = formatZodError(error);
    userMessage = zodErrors.join(', ');
  }
  
  return {
    type: errorType,
    message: error.message || 'Unknown error',
    userMessage,
    code: error.code,
    details: isDev ? error.details : undefined,
    statusCode,
    timestamp: new Date().toISOString(),
    requestId: requestId || generateRequestId(),
    stack: isDev ? error.stack : undefined,
  };
}

/**
 * API 에러 응답 생성
 */
export function createErrorResponse(
  error: any,
  customMessage?: string,
  requestId?: string
): NextResponse {
  const errorDetail = createErrorDetail(error, customMessage, requestId);
  
  // 개발 환경에서는 상세 정보 로깅
  if (env.NODE_ENV === 'development') {
    console.error('🚨 Error Detail:', {
      ...errorDetail,
      originalError: error,
    });
  } else {
    // 프로덕션에서는 민감 정보 제외하고 로깅
    console.error('🚨 Production Error:', {
      type: errorDetail.type,
      message: errorDetail.message,
      statusCode: errorDetail.statusCode,
      timestamp: errorDetail.timestamp,
      requestId: errorDetail.requestId,
    });
  }
  
  // 응답 데이터 구성
  const responseData = {
    error: true,
    type: errorDetail.type,
    message: errorDetail.userMessage,
    requestId: errorDetail.requestId,
    timestamp: errorDetail.timestamp,
    ...(env.NODE_ENV === 'development' && {
      debug: {
        originalMessage: errorDetail.message,
        code: errorDetail.code,
        details: errorDetail.details,
        stack: errorDetail.stack,
      },
    }),
  };
  
  return NextResponse.json(responseData, { status: errorDetail.statusCode });
}

/**
 * API 라우트용 에러 핸들러 래퍼
 */
export function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return createErrorResponse(error);
    }
  };
}

/**
 * 비동기 함수 에러 처리 유틸리티
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback?: T
): Promise<{ data?: T; error?: ErrorDetail }> {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const errorDetail = createErrorDetail(error);
    
    return { 
      error: errorDetail,
      ...(fallback !== undefined && { data: fallback })
    };
  }
}

/**
 * 사용자 정의 에러 클래스들
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.SERVER,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.statusCode = getStatusCode(type);
    this.code = code;
    this.details = details;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, ErrorType.VALIDATION, 'VALIDATION_FAILED', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, ErrorType.AUTHENTICATION, 'AUTH_REQUIRED');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, ErrorType.AUTHORIZATION, 'INSUFFICIENT_PERMISSIONS');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, ErrorType.NOT_FOUND, 'RESOURCE_NOT_FOUND');
  }
}

export class ExternalAPIError extends AppError {
  constructor(service: string, originalError?: any) {
    super(
      `External service error: ${service}`,
      ErrorType.EXTERNAL_API,
      'EXT_API_ERROR',
      originalError
    );
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, originalError?: any) {
    super(
      `Database operation failed: ${operation}`,
      ErrorType.DATABASE,
      'DB_OPERATION_FAILED',
      originalError
    );
  }
}

/**
 * 성공 응답 생성 헬퍼
 */
export function createSuccessResponse<T = any>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  }, { status: statusCode });
}

/**
 * 페이지네이션 응답 생성 헬퍼
 */
export function createPaginatedResponse<T = any>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
): NextResponse {
  const totalPages = Math.ceil(total / limit);
  
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    message,
    timestamp: new Date().toISOString(),
  });
}