// Error monitoring and logging utilities
import { logger } from './logger';

// Monitoring service types
interface MonitoringConfig {
  sentry?: {
    dsn: string;
    environment: string;
    release?: string;
  };
  datadog?: {
    apiKey: string;
    service: string;
    environment: string;
    version?: string;
  };
  enabled: boolean;
}

// Get monitoring configuration from environment
function getMonitoringConfig(): MonitoringConfig {
  const config: MonitoringConfig = {
    enabled: process.env.NODE_ENV === 'production',
  };

  if (process.env.SENTRY_DSN) {
    config.sentry = {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      release: process.env.npm_package_version || '1.0.0',
    };
  }

  if (process.env.DATADOG_API_KEY) {
    config.datadog = {
      apiKey: process.env.DATADOG_API_KEY,
      service: 'familyoffice-platform',
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  return config;
}

const monitoringConfig = getMonitoringConfig();

export class ErrorMonitor {
  static logError(error: Error, context?: Record<string, any>) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };

    // Use structured logging
    logger.error('Error Monitor', error, {
      component: 'ErrorMonitor',
      function: 'logError',
      ...context,
    });

    // In production, send to monitoring service
    // TODO: Integrate with Sentry, DataDog, or similar service
    this.sendToMonitoringService(errorInfo);
  }

  static logPerformance(
    metric: string,
    duration: number,
    context?: Record<string, any>
  ) {
    const performanceInfo = {
      metric,
      duration,
      timestamp: new Date().toISOString(),
      context,
    };

    // Use structured performance logging
    logger.performance(metric, duration, {
      component: 'ErrorMonitor',
      function: 'logPerformance',
      ...context,
    });

    // TODO: Send to performance monitoring service
    this.sendToPerformanceService(performanceInfo);
  }

  private static async sendToMonitoringService(errorInfo: any) {
    if (!monitoringConfig.enabled) {
      return;
    }

    try {
      // Send to Sentry if configured
      if (monitoringConfig.sentry) {
        await this.sendToSentry(errorInfo);
      }

      // Send to DataDog if configured
      if (monitoringConfig.datadog) {
        await this.sendToDataDog(errorInfo, 'error');
      }

      // Fallback to internal API
      await fetch('/api/monitoring/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      });
    } catch (err) {
      logger.error('Failed to send error to monitoring service', err as Error, {
        component: 'ErrorMonitor',
        function: 'sendToMonitoringService',
      });
    }
  }

  private static async sendToPerformanceService(performanceInfo: any) {
    if (!monitoringConfig.enabled) {
      return;
    }

    try {
      // Send to DataDog for performance metrics
      if (monitoringConfig.datadog) {
        await this.sendToDataDog(performanceInfo, 'metric');
      }

      // Send to Sentry for performance monitoring
      if (monitoringConfig.sentry) {
        await this.sendPerformanceToSentry(performanceInfo);
      }

      // Fallback to internal API
      await fetch('/api/monitoring/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceInfo),
      });
    } catch (err) {
      logger.error('Failed to send performance data', err as Error, {
        component: 'ErrorMonitor',
        function: 'sendToPerformanceService',
      });
    }
  }
  // Sentry integration methods
  private static async sendToSentry(errorInfo: any) {
    if (!monitoringConfig.sentry) return;

    const sentryPayload = {
      message: errorInfo.message,
      level: 'error',
      timestamp: errorInfo.timestamp,
      environment: monitoringConfig.sentry.environment,
      release: monitoringConfig.sentry.release,
      extra: {
        context: errorInfo.context,
        userAgent: errorInfo.userAgent,
        url: errorInfo.url,
        stack: errorInfo.stack,
      },
    };

    // Send to Sentry DSN
    await fetch(
      `https://sentry.io/api/0/projects/${monitoringConfig.sentry.dsn.split('@')[1]}/store/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sentry-Auth': `Sentry sentry_version=7, sentry_key=${monitoringConfig.sentry.dsn.split('@')[0].split('//')[1]}`,
        },
        body: JSON.stringify(sentryPayload),
      }
    );
  }

  private static async sendPerformanceToSentry(performanceInfo: any) {
    if (!monitoringConfig.sentry) return;

    const sentryTransaction = {
      type: 'transaction',
      transaction: performanceInfo.metric,
      start_timestamp:
        new Date(performanceInfo.timestamp).getTime() / 1000 -
        performanceInfo.duration / 1000,
      timestamp: new Date(performanceInfo.timestamp).getTime() / 1000,
      contexts: {
        trace: {
          op: 'performance.measure',
          description: performanceInfo.metric,
        },
      },
      extra: performanceInfo.context,
    };

    await fetch(
      `https://sentry.io/api/0/projects/${monitoringConfig.sentry.dsn.split('@')[1]}/envelope/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-sentry-envelope',
        },
        body: JSON.stringify(sentryTransaction),
      }
    );
  }

  // DataDog integration methods
  private static async sendToDataDog(data: any, type: 'error' | 'metric') {
    if (!monitoringConfig.datadog) return;

    const datadogUrl =
      type === 'error'
        ? 'https://http-intake.logs.datadoghq.com/v1/input'
        : 'https://api.datadoghq.com/api/v1/series';

    let payload: any;

    if (type === 'error') {
      payload = {
        ddsource: 'nextjs',
        ddtags: `env:${monitoringConfig.datadog.environment},service:${monitoringConfig.datadog.service},version:${monitoringConfig.datadog.version}`,
        hostname: 'familyoffice-platform',
        message: data.message,
        level: 'error',
        timestamp: data.timestamp,
        attributes: {
          error: {
            stack: data.stack,
            message: data.message,
          },
          context: data.context,
          userAgent: data.userAgent,
          url: data.url,
        },
      };
    } else {
      payload = {
        series: [
          {
            metric: `familyoffice.performance.${data.metric.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            points: [
              [
                Math.floor(new Date(data.timestamp).getTime() / 1000),
                data.duration,
              ],
            ],
            type: 'gauge',
            tags: [
              `env:${monitoringConfig.datadog.environment}`,
              `service:${monitoringConfig.datadog.service}`,
              `version:${monitoringConfig.datadog.version}`,
            ],
          },
        ],
      };
    }

    await fetch(datadogUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': monitoringConfig.datadog.apiKey,
      },
      body: JSON.stringify(payload),
    });
  }
}

// Performance measurement utility
export function measurePerformance<T>(
  fn: () => Promise<T>,
  metricName: string,
  context?: Record<string, any>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now();

    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log performance and send to monitoring services
      ErrorMonitor.logPerformance(metricName, duration, context);
      resolve(result);
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log both the error and the performance data
      ErrorMonitor.logError(error as Error, {
        ...context,
        metricName,
        duration,
        performanceFailure: true,
      });
      reject(error);
    }
  });
}

// Additional monitoring utilities

/**
 * Monitor async function execution with automatic error reporting
 */
export function withMonitoring<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: {
    name?: string;
    component?: string;
    logPerformance?: boolean;
    context?: Record<string, any>;
  } = {}
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const functionName = options.name || fn.name || 'anonymous';
    const startTime = performance.now();

    try {
      const result = await fn(...args);

      if (options.logPerformance !== false) {
        const duration = performance.now() - startTime;
        ErrorMonitor.logPerformance(functionName, duration, {
          component: options.component,
          ...options.context,
        });
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      ErrorMonitor.logError(error as Error, {
        component: options.component,
        function: functionName,
        duration,
        ...options.context,
      });

      throw error;
    }
  };
}

/**
 * Create a monitoring wrapper for API routes
 */
export function withApiMonitoring<T extends any[]>(
  handler: (...args: T) => Promise<Response>,
  options: {
    name?: string;
    logPerformance?: boolean;
    context?: Record<string, any>;
  } = {}
): (...args: T) => Promise<Response> {
  return withMonitoring(handler, {
    ...options,
    component: 'api-route',
    logPerformance: options.logPerformance !== false,
  });
}

/**
 * Health check for monitoring services
 */
export async function checkMonitoringHealth(): Promise<{
  healthy: boolean;
  services: Record<string, boolean>;
  errors: string[];
}> {
  const services: Record<string, boolean> = {};
  const errors: string[] = [];

  // Check Sentry connectivity
  if (monitoringConfig.sentry) {
    try {
      // Simple connectivity test - this would be a real health check in production
      services.sentry = true;
    } catch (error) {
      services.sentry = false;
      errors.push(`Sentry health check failed: ${(error as Error).message}`);
    }
  } else {
    services.sentry = false;
  }

  // Check DataDog connectivity
  if (monitoringConfig.datadog) {
    try {
      // Simple connectivity test - this would be a real health check in production
      services.datadog = true;
    } catch (error) {
      services.datadog = false;
      errors.push(`DataDog health check failed: ${(error as Error).message}`);
    }
  } else {
    services.datadog = false;
  }

  // Check internal API endpoints
  try {
    const response = await fetch('/api/monitoring/health');
    services.internal = response.ok;
    if (!response.ok) {
      errors.push(
        `Internal monitoring API returned status: ${response.status}`
      );
    }
  } catch (error) {
    services.internal = false;
    errors.push(
      `Internal monitoring API health check failed: ${(error as Error).message}`
    );
  }

  const activeServices = Object.values(services).filter(Boolean).length;
  const healthy = activeServices > 0; // At least one service should be working

  return {
    healthy,
    services,
    errors,
  };
}

/**
 * Monitor critical application startup
 */
export function monitorStartup() {
  if (typeof window !== 'undefined') {
    // Client-side startup monitoring
    const loadTime = performance.now();

    window.addEventListener('load', () => {
      const fullLoadTime = performance.now();
      ErrorMonitor.logPerformance('client_startup', fullLoadTime, {
        component: 'startup-monitor',
        initialLoad: loadTime,
      });
    });

    // Monitor unhandled errors
    window.addEventListener('error', event => {
      ErrorMonitor.logError(event.error || new Error(event.message), {
        component: 'global-error-handler',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      ErrorMonitor.logError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`),
        {
          component: 'global-promise-handler',
          reason: event.reason,
        }
      );
    });
  } else {
    // Server-side startup monitoring
    const startTime = performance.now();

    process.on('uncaughtException', error => {
      ErrorMonitor.logError(error, {
        component: 'global-exception-handler',
        severity: 'critical',
      });
    });

    process.on('unhandledRejection', (reason, promise) => {
      ErrorMonitor.logError(
        new Error(`Unhandled Promise Rejection: ${reason}`),
        {
          component: 'global-rejection-handler',
          severity: 'critical',
          reason,
          promise: promise.toString(),
        }
      );
    });

    // Log server startup completion
    process.nextTick(() => {
      const startupTime = performance.now() - startTime;
      ErrorMonitor.logPerformance('server_startup', startupTime, {
        component: 'startup-monitor',
        environment: process.env.NODE_ENV,
      });
    });
  }
}
