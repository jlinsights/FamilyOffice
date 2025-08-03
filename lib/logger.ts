/**
 * Structured Logging Service for FamilyOffice Platform
 * Replaces console.log statements with proper logging infrastructure
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  component?: string;
  function?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context: LogContext;
  environment: string;
  service: string;
  version: string;
}

class Logger {
  private readonly serviceName: string = 'familyoffice-platform';
  private readonly version: string = process.env.npm_package_version || '1.0.0';
  private readonly environment: string = process.env.NODE_ENV || 'development';

  private createLogEntry(
    level: LogLevel,
    message: string,
    context: LogContext = {}
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: {
        ...context,
        metadata: {
          ...context.metadata,
          userAgent:
            typeof window !== 'undefined'
              ? window.navigator.userAgent
              : 'server',
          url: typeof window !== 'undefined' ? window.location.href : 'server',
        },
      },
      environment: this.environment,
      service: this.serviceName,
      version: this.version,
    };
  }

  private formatLogEntry(entry: LogEntry): string {
    const { level, message, timestamp, context, service } = entry;

    if (this.environment === 'development') {
      // Human-readable format for development
      const contextStr =
        Object.keys(context).length > 0
          ? `\n  Context: ${JSON.stringify(context, null, 2)}`
          : '';

      return `[${timestamp}] [${level.toUpperCase()}] [${service}] ${message}${contextStr}`;
    } else {
      // JSON format for production (easier for log aggregation)
      return JSON.stringify(entry);
    }
  }

  private async sendToExternalService(entry: LogEntry): Promise<void> {
    if (this.environment === 'production') {
      try {
        // Send to external logging service (e.g., DataDog, Sentry)
        await fetch('/api/logging', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        });
      } catch (error) {
        // Fallback to console only for critical logging failures
        console.error('Failed to send log to external service:', error);
      }
    }
  }

  private log(
    level: LogLevel,
    message: string,
    context: LogContext = {}
  ): void {
    const entry = this.createLogEntry(level, message, context);
    const formattedLog = this.formatLogEntry(entry);

    // Always output to console in development, or for critical errors
    if (this.environment === 'development' || level === LogLevel.CRITICAL) {
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedLog);
          break;
        case LogLevel.INFO:
          console.info(formattedLog);
          break;
        case LogLevel.WARN:
          console.warn(formattedLog);
          break;
        case LogLevel.ERROR:
        case LogLevel.CRITICAL:
          console.error(formattedLog);
          break;
      }
    }

    // Send to external service asynchronously
    this.sendToExternalService(entry).catch(() => {
      // Silent fail - don't want logging to break the application
    });
  }

  /**
   * Debug level logging - for detailed diagnostic information
   */
  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Info level logging - for general operational information
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Warning level logging - for potentially harmful situations
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Error level logging - for error events that don't stop execution
   */
  error(message: string, error?: Error, context?: LogContext): void {
    const errorContext = error
      ? {
          ...context,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : context;

    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * Critical level logging - for very severe error events
   */
  critical(message: string, error?: Error, context?: LogContext): void {
    const errorContext = error
      ? {
          ...context,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : context;

    this.log(LogLevel.CRITICAL, message, errorContext);
  }

  /**
   * Performance monitoring utility
   */
  performance(
    metricName: string,
    duration: number,
    context?: LogContext
  ): void {
    this.info(`Performance: ${metricName}`, {
      ...context,
      metadata: {
        ...context?.metadata,
        duration,
        metric: metricName,
      },
    });
  }

  /**
   * API request logging utility
   */
  apiRequest(
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const level = statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    this.log(level, `API ${method} ${endpoint} - ${statusCode}`, {
      ...context,
      metadata: {
        ...context?.metadata,
        api: {
          method,
          endpoint,
          statusCode,
          duration,
        },
      },
    });
  }

  /**
   * User action logging utility
   */
  userAction(action: string, userId: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      metadata: {
        ...context?.metadata,
        userId,
        action,
      },
    });
  }

  /**
   * Security event logging utility
   */
  security(
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    context?: LogContext
  ): void {
    const level =
      severity === 'critical'
        ? LogLevel.CRITICAL
        : severity === 'high'
          ? LogLevel.ERROR
          : severity === 'medium'
            ? LogLevel.WARN
            : LogLevel.INFO;

    this.log(level, `Security Event: ${event}`, {
      ...context,
      metadata: {
        ...context?.metadata,
        security: {
          event,
          severity,
        },
      },
    });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenient performance wrapper
export function withPerformanceLogging<T>(
  fn: () => Promise<T>,
  metricName: string,
  context?: LogContext
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now();

    try {
      logger.debug(`Starting: ${metricName}`, context);
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;

      logger.performance(metricName, duration, context);
      resolve(result);
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      logger.error(`Failed: ${metricName}`, error as Error, {
        ...context,
        duration,
      });
      reject(error);
    }
  });
}
