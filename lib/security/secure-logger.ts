/**
 * Secure Logger
 * Provides safe logging with production filtering and sensitive data protection
 */

// Log levels in order of severity
export const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
} as const;

type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

// Production log level (only errors and warnings)
const PRODUCTION_LOG_LEVEL = LogLevel.WARN;
const DEVELOPMENT_LOG_LEVEL = LogLevel.DEBUG;

// Patterns for sensitive data that should never be logged
const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /key/i,
  /auth/i,
  /bearer/i,
  /api[_-]?key/i,
  /client[_-]?secret/i,
  /private[_-]?key/i,
  /access[_-]?token/i,
  /refresh[_-]?token/i,
] as const;

// Get current log level based on environment
function getCurrentLogLevel(): LogLevelType {
  return process.env.NODE_ENV === 'production' 
    ? PRODUCTION_LOG_LEVEL 
    : DEVELOPMENT_LOG_LEVEL;
}

/**
 * Sanitizes data to remove sensitive information
 */
function sanitizeData(data: unknown): unknown {
  if (typeof data === 'string') {
    // Check for sensitive patterns
    if (SENSITIVE_PATTERNS.some(pattern => pattern.test(data))) {
      return '[REDACTED]';
    }
    return data;
  }

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(sanitizeData);
    }

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      // Check if key looks sensitive
      if (SENSITIVE_PATTERNS.some(pattern => pattern.test(key))) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeData(value);
      }
    }
    return sanitized;
  }

  return data;
}

/**
 * Creates a contextual logger with automatic sanitization
 */
export class SecureLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private shouldLog(level: LogLevelType): boolean {
    return level <= getCurrentLogLevel();
  }

  private formatMessage(level: string, message: string, data?: unknown): [string, ...unknown[]] {
    const timestamp = new Date().toISOString();
    const contextPrefix = `[${timestamp}] [${level}] [${this.context}]`;
    
    if (data !== undefined) {
      const sanitizedData = sanitizeData(data);
      return [`${contextPrefix} ${message}`, sanitizedData];
    }
    
    return [`${contextPrefix} ${message}`];
  }

  error(message: string, data?: unknown): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const args = this.formatMessage('ERROR', message, data);
    console.error(...args);
  }

  warn(message: string, data?: unknown): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const args = this.formatMessage('WARN', message, data);
    console.warn(...args);
  }

  info(message: string, data?: unknown): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const args = this.formatMessage('INFO', message, data);
    console.info(...args);
  }

  debug(message: string, data?: unknown): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const args = this.formatMessage('DEBUG', message, data);
    console.debug(...args);
  }

  /**
   * Logs security-related events (always logged in production)
   */
  security(message: string, data?: unknown): void {
    const args = this.formatMessage('SECURITY', message, data);
    console.error(...args);
  }
}

/**
 * Factory function for creating context-specific loggers
 */
export function createLogger(context: string): SecureLogger {
  return new SecureLogger(context);
}

/**
 * Default logger for general use
 */
export const logger = createLogger('App');

/**
 * Security logger for security events
 */
export const securityLogger = createLogger('Security');

/**
 * Performance logger for performance monitoring
 */
export const performanceLogger = createLogger('Performance');

/**
 * Validates that a value is safe to log (doesn't contain sensitive data)
 */
export function isSafeToLog(data: unknown): boolean {
  const serialized = JSON.stringify(data);
  return !SENSITIVE_PATTERNS.some(pattern => pattern.test(serialized));
}

/**
 * Utility for error boundary logging
 */
export function logError(error: Error, context: string, additionalData?: unknown): void {
  const logger = createLogger(context);
  logger.error(error.message, {
    stack: error.stack,
    name: error.name,
    ...(additionalData && typeof additionalData === 'object' ? additionalData : {}),
  });
}