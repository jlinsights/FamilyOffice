/**
 * Development-only logger utility
 * Replaces console.log with conditional logging that only works in development
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  // Server-only logging
  server: (...args: any[]) => {
    if (isDevelopment && isServer) {
      console.log('[SERVER]', ...args);
    }
  },
  
  // Client-only logging
  client: (...args: any[]) => {
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
  security: (...args: any[]) => {
    // Always log security events
    console.log('[SECURITY]', ...args);
  }
};

export default logger;