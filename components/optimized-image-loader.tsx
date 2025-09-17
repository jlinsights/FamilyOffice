'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the OptimizedImage component
 * @interface OptimizedImageProps
 */
interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to prioritize loading (for above-fold images) */
  priority?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** Placeholder type during loading */
  placeholder?: 'blur' | 'empty';
  /** Responsive sizes attribute */
  sizes?: string;
  /** Whether to fill parent container */
  fill?: boolean;
  /** Callback fired when image loads */
  onLoad?: () => void;
  /** Callback fired when image fails to load */
  onError?: () => void;
}

/**
 * An optimized image component with WebP/AVIF support, loading states, and error handling.
 * Automatically detects WebP support and provides fallback mechanisms.
 * 
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/hero-image.jpg"
 *   alt="Hero image"
 *   width={800}
 *   height={400}
 *   priority
 *   quality={90}
 * />
 * ```
 * 
 * @param props - The component props
 * @returns JSX element with optimized image loading
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  sizes = '100vw',
  fill = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // WebP/AVIF 지원 확인
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  // 최적화된 이미지 URL 생성
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    // 외부 이미지인 경우 Next.js Image Optimization 사용
    if (originalSrc.startsWith('http')) return originalSrc;
    
    // 로컬 이미지인 경우 WebP 변환 고려
    if (supportsWebP && originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      // Next.js가 자동으로 WebP 변환을 처리
      return originalSrc;
    }
    
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // 에러 상태일 때 fallback 이미지 표시
  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800',
          'text-gray-500 dark:text-gray-400 text-sm',
          className
        )}
        style={{ width: width || '100%', height: height || 'auto' }}
      >
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>이미지를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={getOptimizedSrc(src)}
        alt={alt}
        {...(fill ? {} : { width, height })}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        sizes={sizes}
        fill={fill}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        // 한국 시장 최적화
        unoptimized={false}
        // 성능 최적화
        style={{
          objectFit: 'cover',
        }}
      />
      
      {/* 로딩 스켈레톤 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
    </div>
  );
}

/**
 * Optimized image component for hero sections with high quality and priority loading
 * @param props - OptimizedImage props
 * @returns Hero image with optimized settings
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    />
  );
}

/**
 * Optimized image component for thumbnails with reduced quality and responsive sizes
 * @param props - OptimizedImage props
 * @returns Thumbnail image with optimized settings
 */
export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={75}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
    />
  );
}

/**
 * Optimized image component for user avatars with small size optimization
 * @param props - OptimizedImage props
 * @returns Avatar image with optimized settings
 */
export function AvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={80}
      sizes="(max-width: 768px) 40px, 60px"
    />
  );
}

/**
 * Optimized background image component with overlay support
 * @param src - Image source URL
 * @param alt - Alt text for accessibility
 * @param className - Additional CSS classes
 * @param children - Content to overlay on the background image
 * @returns Background image container with overlay content
 */
export function BackgroundImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={false}
        quality={85}
        sizes="100vw"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
