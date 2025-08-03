import crypto from 'crypto';

import { logger } from '../logging/logger';

// JWT 설정 (실제 구현에서는 jsonwebtoken 패키지 사용)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

// 비밀번호 해싱 (실제 구현에서는 bcryptjs 패키지 사용)
export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
};

// 비밀번호 검증
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const [salt, storedHash] = hash.split(':');
  const computedHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return storedHash === computedHash;
};

// JWT 토큰 생성 (간단한 구현)
export const generateToken = (payload: any): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    'base64url'
  );
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url'
  );
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// JWT 토큰 검증
export const verifyToken = (token: string): any => {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch (error) {
    logger.error('JWT 토큰 검증 실패', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw new Error('Invalid token');
  }
};

// 리프레시 토큰 생성
export const generateRefreshToken = (payload: any): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    'base64url'
  );
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url'
  );
  const signature = crypto
    .createHmac('sha256', REFRESH_TOKEN_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// 리프레시 토큰 검증
export const verifyRefreshToken = (token: string): any => {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', REFRESH_TOKEN_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch (error) {
    logger.error('리프레시 토큰 검증 실패', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw new Error('Invalid refresh token');
  }
};

// 랜덤 토큰 생성
export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// API 키 생성
export const generateApiKey = (): string => {
  return `fo_${crypto.randomBytes(16).toString('hex')}`;
};

// 데이터 암호화
export const encryptData = (data: string, key: string): string => {
  const algorithm = 'aes-256-gcm';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
};

// 데이터 복호화
export const decryptData = (encryptedData: string, key: string): string => {
  const algorithm = 'aes-256-gcm';
  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipher(algorithm, key);

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

// 역할 기반 접근 제어 (RBAC)
export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description?: string;
}

export const checkPermission = (
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean => {
  return userPermissions.some(
    permission =>
      permission.resource === requiredPermission.resource &&
      permission.action === requiredPermission.action
  );
};

// 입력 검증 및 살균
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // JavaScript 프로토콜 제거
    .trim();
};

// SQL 인젝션 방지
export const escapeSql = (value: string): string => {
  return value
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
};

// XSS 방지 (Node.js 환경)
export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// CSRF 토큰 생성
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// 세션 관리
export interface Session {
  id: string;
  userId: string;
  tenantId: string;
  createdAt: Date;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
}

export const createSession = (
  userId: string,
  tenantId: string,
  ipAddress: string,
  userAgent: string
): Session => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24시간

  return {
    id: generateRandomToken(),
    userId,
    tenantId,
    createdAt: now,
    expiresAt,
    ipAddress,
    userAgent,
    isActive: true,
  };
};

// 보안 헤더 설정
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};
