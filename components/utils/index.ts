/**
 * Component utilities for common functionality
 */

export { cn } from '@/lib/utils';

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
