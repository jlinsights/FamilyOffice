/**
 * Application configuration utilities
 */

// Get base URL for the application
export function getBaseUrl(): string {
  // In production, use the domain
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_APP_URL || 'https://familyoffices.vip';
  }
  
  // In development
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // For Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Default to localhost
  return 'http://localhost:3000';
}

// Check if we're on the production domain
export function isProductionDomain(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'familyoffices.vip';
}

// Get protocol (http or https)
export function getProtocol(): string {
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production' ? 'https' : 'http';
  }
  return window.location.protocol.replace(':', '');
}

// Ensure HTTPS in production
export function ensureHttps(url: string): string {
  if (process.env.NODE_ENV === 'production' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

// Allowed Origins for CORS and Security
export const ALLOWED_ORIGINS = [
  'https://familyoffices.vip',
  'https://www.familyoffices.vip',
  'https://familyoffice-jet.vercel.app',
  'https://familyoffice-jlinsights-projects.vercel.app',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];