'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

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
        width={fill ? undefined : width}
        height={fill ? undefined : height}
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

// 특정 용도별 최적화된 이미지 컴포넌트들
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

export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={75}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
    />
  );
}

export function AvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={80}
      sizes="(max-width: 768px) 40px, 60px"
    />
  );
}

// 배경 이미지 최적화
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
