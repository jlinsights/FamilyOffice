// Comprehensive error handling for SEO operations
import { performanceMonitor } from './performance-monitor';

export interface SEOError extends Error {
  code: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  module: string;
  operation: string;
  fallbackUsed?: boolean;
  timestamp: number;
}

export class SEOErrorHandler {
  private static errors: SEOError[] = [];
  private static readonly MAX_ERRORS = 100;

  // Create standardized SEO error
  static createError(
    message: string,
    code: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    module: string,
    operation: string,
    originalError?: Error
  ): SEOError {
    const error = new Error(message) as SEOError;
    error.code = code;
    error.severity = severity;
    error.module = module;
    error.operation = operation;
    error.timestamp = Date.now();
    error.fallbackUsed = false;

    if (originalError) {
      if (originalError.stack) {
        error.stack = originalError.stack;
      }
      (error as any).cause = originalError;
    }

    this.logError(error);
    return error;
  }

  // Safe wrapper for AI operations with fallback
  static async safeAIOperation<T>(
    operation: () => Promise<T>,
    fallback: T,
    context: {
      module: string;
      operationName: string;
      timeout?: number;
    }
  ): Promise<T> {
    const { module, operationName, timeout = 10000 } = context;

    return await performanceMonitor.trackAsyncOperation(
      `safe_${operationName}`,
      async () => {
        try {
          // Add timeout protection
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => {
              reject(
                this.createError(
                  `Operation timeout after ${timeout}ms`,
                  'OPERATION_TIMEOUT',
                  'high',
                  module,
                  operationName
                )
              );
            }, timeout);
          });

          const result = await Promise.race([operation(), timeoutPromise]);
          return result;
        } catch (error) {
          const seoError = this.createError(
            `AI operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'AI_OPERATION_FAILED',
            'medium',
            module,
            operationName,
            error instanceof Error ? error : undefined
          );

          seoError.fallbackUsed = true;

          // Log in development for debugging
          if (process.env.NODE_ENV === 'development') {
            console.error(
              `SEO AI Operation Failed [${module}:${operationName}]:`,
              error
            );
            console.info(`Using fallback value:`, fallback);
          }

          return fallback;
        }
      },
      { module, operation: operationName, safety: 'high' }
    );
  }

  // Validate input for AI operations
  static validateContentInput(
    content: string,
    maxLength: number = 10000
  ): {
    isValid: boolean;
    sanitizedContent: string;
    errors: string[];
  } {
    const errors: string[] = [];
    let sanitizedContent = content;

    // Basic validation
    if (!content || typeof content !== 'string') {
      errors.push('Content must be a non-empty string');
      return { isValid: false, sanitizedContent: '', errors };
    }

    // Length validation
    if (content.length > maxLength) {
      sanitizedContent = content.substring(0, maxLength);
      errors.push(`Content truncated to ${maxLength} characters`);
    }

    // Sanitize HTML tags and potential XSS vectors
    sanitizedContent = sanitizedContent
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();

    // Check for minimum meaningful content
    if (sanitizedContent.length < 10) {
      errors.push('Content too short to be meaningful');
      return { isValid: false, sanitizedContent, errors };
    }

    return {
      isValid: errors.length === 0,
      sanitizedContent,
      errors,
    };
  }

  // Log error to internal system
  private static logError(error: SEOError): void {
    // Add to internal error tracking
    this.errors.push(error);

    // Prevent memory leaks by limiting stored errors
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `SEO Error [${error.severity}] ${error.module}:${error.operation}:`,
        error.message
      );
    }

    // In production, could send to error tracking service
    if (
      process.env.NODE_ENV === 'production' &&
      error.severity === 'critical'
    ) {
      // Could integrate with Sentry, LogRocket, etc.
      console.error('Critical SEO Error:', {
        code: error.code,
        message: error.message,
        module: error.module,
        operation: error.operation,
        timestamp: error.timestamp,
      });
    }
  }

  // Get error statistics
  static getErrorStats(): {
    totalErrors: number;
    errorsBySeverity: Record<string, number>;
    errorsByModule: Record<string, number>;
    recentErrors: SEOError[];
  } {
    const errorsBySeverity: Record<string, number> = {};
    const errorsByModule: Record<string, number> = {};

    this.errors.forEach(error => {
      errorsBySeverity[error.severity] =
        (errorsBySeverity[error.severity] || 0) + 1;
      errorsByModule[error.module] = (errorsByModule[error.module] || 0) + 1;
    });

    return {
      totalErrors: this.errors.length,
      errorsBySeverity,
      errorsByModule,
      recentErrors: this.errors.slice(-10), // Last 10 errors
    };
  }

  // Clear error history
  static clearErrors(): void {
    this.errors = [];
  }
}

// Input sanitization utilities
export const inputSanitizer = {
  // Sanitize text content for AI processing
  sanitizeText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
      .trim()
      .substring(0, 5000); // Limit length
  },

  // Sanitize keywords array
  sanitizeKeywords(keywords: string[]): string[] {
    return keywords
      .filter(
        keyword => typeof keyword === 'string' && keyword.trim().length > 0
      )
      .map(keyword => keyword.trim().toLowerCase())
      .slice(0, 20); // Limit number of keywords
  },

  // Validate domain input
  validateDomain(domain: string): boolean {
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  },
};

// Export error handling utilities
export const seoErrorUtils = {
  handler: SEOErrorHandler,
  sanitizer: inputSanitizer,

  // Quick helper for safe operations
  async withFallback<T>(
    operation: () => Promise<T>,
    fallback: T,
    operationName: string
  ): Promise<T> {
    return await SEOErrorHandler.safeAIOperation(operation, fallback, {
      module: 'general',
      operationName,
    });
  },
};
