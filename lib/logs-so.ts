import Logs from 'logs-so';

// Initialize logs-so client
const logsClient = process.env.LOGS_SO_API_KEY
  ? new Logs({
      apiKey: process.env.LOGS_SO_API_KEY,
      project: 'FamilyOffice',
    })
  : null;

// Log levels
export enum LogLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  DEBUG = 'debug',
}

// Common log channels
export enum LogChannel {
  AUTH = 'authentication',
  API = 'api',
  DATABASE = 'database',
  PAYMENT = 'payment',
  USER = 'user',
  SYSTEM = 'system',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
}

// Icon mapping for different log types
const iconMap: Record<LogLevel, string> = {
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARNING]: '⚠️',
  [LogLevel.ERROR]: '❌',
  [LogLevel.SUCCESS]: '✅',
  [LogLevel.DEBUG]: '🐛',
};

interface LogOptions {
  channel: LogChannel;
  event: string;
  level?: LogLevel;
  description?: string;
  userId?: string;
  tags?: Record<string, any>;
  notify?: boolean;
  keywords?: string[];
}

/**
 * Send a log to logs.so
 * @param options - Log options
 */
export async function log(options: LogOptions): Promise<void> {
  if (!logsClient) {
    // Fallback to console.log in development or when API key is not set
    console.log(
      `[${options.level || LogLevel.INFO}] ${options.event}:`,
      options.description || '',
      options.tags || {}
    );
    return;
  }

  try {
    await logsClient.track({
      channel: options.channel,
      event: options.event,
      description: options.description || '',
      icon: iconMap[options.level || LogLevel.INFO],
      notify: options.notify || options.level === LogLevel.ERROR,
      tags: {
        level: options.level || LogLevel.INFO,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        ...options.tags,
      },
      ...(options.userId && { user_id: options.userId }),
      keywords: options.keywords || [
        options.channel,
        options.level || LogLevel.INFO,
      ],
    });
  } catch (error) {
    // Fallback to console.error if logging fails
    console.error('Failed to send log to logs.so:', error);
    console.log(
      `[${options.level || LogLevel.INFO}] ${options.event}:`,
      options.description || '',
      options.tags || {}
    );
  }
}

// Convenience methods for different log levels
export const logInfo = (
  channel: LogChannel,
  event: string,
  options?: Partial<LogOptions>
) => log({ ...options, channel, event, level: LogLevel.INFO });

export const logWarning = (
  channel: LogChannel,
  event: string,
  options?: Partial<LogOptions>
) => log({ ...options, channel, event, level: LogLevel.WARNING });

export const logError = (
  channel: LogChannel,
  event: string,
  options?: Partial<LogOptions>
) => log({ ...options, channel, event, level: LogLevel.ERROR, notify: true });

export const logSuccess = (
  channel: LogChannel,
  event: string,
  options?: Partial<LogOptions>
) => log({ ...options, channel, event, level: LogLevel.SUCCESS });

export const logDebug = (
  channel: LogChannel,
  event: string,
  options?: Partial<LogOptions>
) => log({ ...options, channel, event, level: LogLevel.DEBUG });

// Specialized logging functions for common scenarios

/**
 * Log authentication events
 */
export const logAuth = {
  login: (userId: string, method: string, success: boolean) =>
    log({
      channel: LogChannel.AUTH,
      event: success ? 'user-login-success' : 'user-login-failed',
      level: success ? LogLevel.SUCCESS : LogLevel.WARNING,
      userId,
      tags: { method },
      notify: !success,
    }),

  logout: (userId: string) =>
    log({
      channel: LogChannel.AUTH,
      event: 'user-logout',
      level: LogLevel.INFO,
      userId,
    }),

  register: (userId: string, method: string) =>
    log({
      channel: LogChannel.AUTH,
      event: 'user-registration',
      level: LogLevel.SUCCESS,
      userId,
      tags: { method },
    }),
};

/**
 * Log API events
 */
export const logAPI = {
  request: (endpoint: string, method: string, userId?: string) =>
    log({
      channel: LogChannel.API,
      event: 'api-request',
      level: LogLevel.INFO,
      ...(userId && { userId }),
      tags: { endpoint, method },
    }),

  response: (
    endpoint: string,
    statusCode: number,
    duration: number,
    userId?: string
  ) =>
    log({
      channel: LogChannel.API,
      event: 'api-response',
      level: statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO,
      ...(userId && { userId }),
      tags: { endpoint, statusCode, duration },
      notify: statusCode >= 500,
    }),

  error: (endpoint: string, error: any, userId?: string) =>
    log({
      channel: LogChannel.API,
      event: 'api-error',
      level: LogLevel.ERROR,
      ...(userId && { userId }),
      description: error.message || 'Unknown error',
      tags: { endpoint, error: error.stack || error.toString() },
      notify: true,
    }),
};

/**
 * Log performance metrics
 */
export const logPerformance = {
  slow: (operation: string, duration: number, threshold: number) =>
    log({
      channel: LogChannel.PERFORMANCE,
      event: 'slow-operation',
      level: LogLevel.WARNING,
      description: `${operation} took ${duration}ms (threshold: ${threshold}ms)`,
      tags: { operation, duration, threshold },
    }),

  metric: (name: string, value: number, unit: string) =>
    log({
      channel: LogChannel.PERFORMANCE,
      event: 'performance-metric',
      level: LogLevel.INFO,
      tags: { metric: name, value, unit },
    }),
};

/**
 * Log security events
 */
export const logSecurity = {
  threat: (type: string, details: any, userId?: string) =>
    log({
      channel: LogChannel.SECURITY,
      event: 'security-threat',
      level: LogLevel.ERROR,
      ...(userId && { userId }),
      description: `Security threat detected: ${type}`,
      tags: { type, details },
      notify: true,
    }),

  accessDenied: (resource: string, userId?: string) =>
    log({
      channel: LogChannel.SECURITY,
      event: 'access-denied',
      level: LogLevel.WARNING,
      ...(userId && { userId }),
      description: `Access denied to resource: ${resource}`,
      tags: { resource },
    }),
};

export default log;
