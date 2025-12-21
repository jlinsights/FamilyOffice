/**
 * Development-only logger utility
 * Replaces console.log with conditional logging that only works in development
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

// Type-safe logger arguments
type LogArgs = unknown[];

export const logger = {
  log: (...args: LogArgs) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: LogArgs) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
  
  warn: (...args: LogArgs) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args: LogArgs) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: LogArgs) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  // Server-only logging
  server: (...args: LogArgs) => {
    if (isDevelopment && isServer) {
      console.log('[SERVER]', ...args);
    }
  },
  
  // Client-only logging
  client: (...args: LogArgs) => {
    if (isDevelopment && !isServer) {
      console.log('[CLIENT]', ...args);
    }
  },
  
  // Performance logging
  performance: (label: string, startTime: number) => {
    if (isDevelopment) {
      const duration = Date.now() - startTime;
      console.log(`⏱️ [PERF] ${label}: ${duration}ms`);
    }
  },
  
  // API logging
  api: (method: string, endpoint: string, status?: number) => {
    if (isDevelopment) {
      const statusEmoji = status && status < 400 ? '✅' : '❌';
      console.log(`${statusEmoji} [API] ${method} ${endpoint}${status ? ` - ${status}` : ''}`);
    }
  },
  
  // Security logging (always log in production for audit)
  security: (...args: LogArgs) => {
    // Always log security events
    console.log('[SECURITY]', ...args);
  }
};

export default logger;