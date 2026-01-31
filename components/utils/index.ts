/**
 * Component utilities for common functionality
 */

export { cn } from '@/lib/utils';
export { sanitizeHTMLContent } from '@/lib/security/html-sanitizer';

// Component-specific utilities
export const getComponentClassName = (base: string, variants: Record<string, boolean | string | undefined>) => {
  const variantClasses = Object.entries(variants)
    .filter(([_, value]) => value !== false)
    .map(([key, value]) => `${key}-${value}`)
    .join(' ');
    
  return cn(base, variantClasses);
};

export const responsive = {
  mobile: 'sm:hidden',
  tablet: 'hidden md:block lg:hidden',
  desktop: 'hidden lg:block',
  notMobile: 'block sm:hidden md:block',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const responsive = {
  mobile: 'sm:hidden',
  tablet: 'hidden md:block lg:hidden',
  desktop: 'hidden lg:block',
  notMobile: 'block sm:hidden md:block',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
