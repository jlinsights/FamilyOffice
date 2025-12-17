/**
 * HTML Sanitization Utility
 * Provides secure methods for handling dynamic content that needs to be rendered as HTML
 */

// Allowlist of safe HTML tags for specific use cases
const ALLOWED_SCRIPT_SOURCES = [
  'googletagmanager.com',
  'google-analytics.com',
  'js.hs-scripts.com', // HubSpot
] as const;

// Environment variable validation
const ENV_VAR_PATTERN = /^[A-Z][A-Z0-9_-]*$/;

/**
 * Validates that an environment variable name is safe
 */
export function isValidEnvVarName(envVarName: string): boolean {
  return ENV_VAR_PATTERN.test(envVarName);
}

/**
 * Sanitizes environment variables for use in client-side scripts
 * Only allows NEXT_PUBLIC_ prefixed variables and validates format
 */
export function sanitizeEnvVar(envVarName: string, value: string | undefined): string {
  // Only allow NEXT_PUBLIC_ environment variables on client side
  if (!envVarName.startsWith('NEXT_PUBLIC_')) {
    throw new Error(`Environment variable ${envVarName} is not safe for client-side use`);
  }

  if (!isValidEnvVarName(envVarName)) {
    throw new Error(`Invalid environment variable name format: ${envVarName}`);
  }

  // Return sanitized value or empty string if undefined
  const sanitizedValue = value || '';
  
  // Basic XSS prevention - escape potential script injection
  return sanitizedValue
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates that a script source is from an allowed domain
 */
export function isAllowedScriptSource(src: string): boolean {
  try {
    const url = new URL(src.startsWith('//') ? `https:${src}` : src);
    return ALLOWED_SCRIPT_SOURCES.some(allowedDomain => 
      url.hostname === allowedDomain || url.hostname.endsWith(`.${allowedDomain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Creates a safe analytics script string with validated environment variables
 */
export function createAnalyticsScript(measurementId: string): string {
  // Validate measurement ID format (GA measurement IDs start with G-)
  if (!measurementId || !measurementId.match(/^G-[A-Z0-9]{10}$/)) {
    throw new Error('Invalid Google Analytics measurement ID format');
  }

  const sanitizedId = sanitizeEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID', measurementId);
  
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${sanitizedId}');
  `.trim();
}

/**
 * Creates a safe GTM script string with validated container ID
 */
export function createGTMScript(containerId: string): string {
  // Validate GTM container ID format (GTM IDs start with GTM-)
  if (!containerId || !containerId.match(/^GTM-[A-Z0-9]{6,8}$/)) {
    throw new Error('Invalid Google Tag Manager container ID format');
  }

  const sanitizedId = sanitizeEnvVar('NEXT_PUBLIC_GTM_ID', containerId);
  
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${sanitizedId}');
  `.trim();
}

/**
 * Validates and sanitizes structured data for JSON-LD
 */
export function sanitizeStructuredData(data: unknown): string {
  if (!data || typeof data !== 'object') {
    throw new Error('Structured data must be a valid object');
  }

  try {
    // Serialize and validate JSON
    const jsonString = JSON.stringify(data);
    
    // Additional validation - ensure no script tags in the JSON
    if (jsonString.includes('<script') || jsonString.includes('javascript:')) {
      throw new Error('Structured data contains potentially dangerous content');
    }
    
    return jsonString;
  } catch (error) {
    throw new Error(`Failed to serialize structured data: ${error}`);
  }
}

/**
 * Type guard for checking if content is safe for dangerouslySetInnerHTML
 */
export function isSafeHTMLContent(content: string): boolean {
  // Check if this is a safe GTM noscript iframe
  const gtmNoscriptPattern = /^<noscript><iframe\s+src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-[A-Z0-9]{6,8}"\s+height="0"\s+width="0"\s+style="display:none;visibility:hidden"><\/iframe><\/noscript>$/;
  if (gtmNoscriptPattern.test(content)) {
    return true;
  }

  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script(?:\s[^>]*)?>/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onload, etc.
    /<iframe(?:\s[^>]*)?>/i, // Block all other iframes
    /<object(?:\s[^>]*)?>/i,
    /<embed(?:\s[^>]*)?>/i,
    /<form(?:\s[^>]*)?>/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(content));
}

/**
 * Content Security Policy nonce validator
 */
export function validateCSPNonce(nonce?: string): string | undefined {
  if (!nonce) return undefined;
  
  // CSP nonces should be base64 encoded and at least 128 bits (16 bytes)
  if (!/^[A-Za-z0-9+/]{22,}={0,2}$/.test(nonce)) {
    throw new Error('Invalid CSP nonce format');
  }
  
  return nonce;
}

/**
 * Sanitizes HTML content for safe rendering in dangerouslySetInnerHTML
 * Removes dangerous elements and attributes while preserving basic formatting
 */
export function sanitizeHTMLContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }

  // Remove all script tags and their content
  let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, ''); // onclick, onload, etc.
  sanitized = sanitized.replace(/\s+javascript\s*:\s*[^"'\s>]*/gi, ''); // javascript: URLs
  
  // Remove dangerous tags completely
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b[^>]*>.*?<\\/${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
    // Also remove self-closing versions
    const selfClosingRegex = new RegExp(`<${tag}\\b[^>]*\\/>`, 'gi');
    sanitized = sanitized.replace(selfClosingRegex, '');
  });
  
  // Remove style attributes that could contain malicious CSS
  sanitized = sanitized.replace(/\s+style\s*=\s*["'][^"']*["']/gi, '');
  
  // Clean up any remaining whitespace/newlines
  sanitized = sanitized.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
  
  return sanitized;
}

/**
 * Validates if content is safe for SEO purposes (text content only)
 * Returns true if content contains only safe text content
 */
export function isTextOnlyContent(content: string): boolean {
  // Check if content has no HTML tags except basic formatting
  const allowedTags = /^[^<>]*(?:<\/?(?:p|br|strong|em|b|i|u|span|div|h[1-6])\b[^>]*>[^<>]*)*$/i;
  return allowedTags.test(content) && !content.includes('<script');
}

/**
 * Creates a safe user tracking script with validated parameters
 * Only logs basic user behavior for SEO optimization
 */
export function createUserTrackingScript(): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return `
    // Safe user behavior analysis
    if (typeof window !== 'undefined') {
      window.FamilyOfficeSEO = {
        version: '1.0',
        solution: 'Family Office Services',
        target: 'Business Leaders',
        initialized: new Date().toISOString()
      };
      
      // Basic user behavior tracking (no PII)
      window.addEventListener('load', function() {
        const userProfile = {
          referral: document.referrer ? 'external' : 'direct',
          device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
          screen: window.innerWidth > 1920 ? 'premium' : 'standard',
          performance: performance.now() < 3000 ? 'fast' : 'slow'
        };
        
        // Console logging only in development
        if (${isDevelopment}) {
          console.log('User Profile:', userProfile);
        }
      });
    }
  `.trim();
}