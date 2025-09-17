/**
 * Content Security Policy Configuration
 * Defines security policies for the FamilyOffice application
 */

export const CSP_SOURCES = {
  // Self and trusted domains
  self: "'self'",
  
  // Analytics and tracking
  googleAnalytics: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
  ],
  
  // External integrations
  hubspot: [
    'https://js.hs-scripts.com',
    'https://forms.hubspot.com',
  ],
  
  calCom: [
    'https://app.cal.com',
    'https://cal.com',
  ],
  
  // CDNs and assets
  cdns: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
  ],
  
  // Payment and external services
  external: [
    'https://js.stripe.com',
    'https://checkout.stripe.com',
  ],
} as const;

/**
 * Generates Content Security Policy header value
 */
export function generateCSP(nonce?: string): string {
  const scriptSrc = [
    CSP_SOURCES.self,
    ...CSP_SOURCES.googleAnalytics,
    ...CSP_SOURCES.hubspot,
    ...CSP_SOURCES.calCom,
    "'unsafe-eval'", // Required for Next.js dev mode
  ];
  
  const styleSrc = [
    CSP_SOURCES.self,
    "'unsafe-inline'", // Required for Next.js and Tailwind
    ...CSP_SOURCES.cdns,
  ];
  
  const frameSrc = [
    CSP_SOURCES.self,
    ...CSP_SOURCES.googleAnalytics,
    ...CSP_SOURCES.calCom,
    ...CSP_SOURCES.external,
  ];
  
  const connectSrc = [
    CSP_SOURCES.self,
    ...CSP_SOURCES.googleAnalytics,
    ...CSP_SOURCES.hubspot,
    'https://api.github.com', // For updates
  ];
  
  const imgSrc = [
    CSP_SOURCES.self,
    'data:',
    'blob:',
    ...CSP_SOURCES.googleAnalytics,
    ...CSP_SOURCES.cdns,
  ];
  
  // Add nonce if provided
  if (nonce) {
    scriptSrc.push(`'nonce-${nonce}'`);
  }
  
  const policies = [
    `default-src ${CSP_SOURCES.self}`,
    `script-src ${scriptSrc.join(' ')}`,
    `style-src ${styleSrc.join(' ')}`,
    `img-src ${imgSrc.join(' ')}`,
    `font-src ${CSP_SOURCES.self} ${CSP_SOURCES.cdns.join(' ')}`,
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ')}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ];
  
  return policies.join('; ');
}

/**
 * Security headers configuration
 */
export const SECURITY_HEADERS = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=(self)',
  ].join(', '),
  
  // Strict Transport Security (HTTPS only)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
} as const;

/**
 * Generates all security headers including CSP
 */
export function generateSecurityHeaders(nonce?: string): Record<string, string> {
  return {
    ...SECURITY_HEADERS,
    'Content-Security-Policy': generateCSP(nonce),
  };
}

/**
 * Validates CSP nonce format
 */
export function generateCSPNonce(): string {
  // Generate cryptographically secure random nonce
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
}