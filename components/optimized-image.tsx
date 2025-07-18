'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  quality = 75,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-muted text-muted-foreground',
        fill ? 'absolute inset-0' : '',
        className
      )}>
        <div className="text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">이미지를 불러올 수 없습니다</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <Skeleton className={cn(
          'absolute inset-0 z-10',
          fill ? '' : `w-[${width}px] h-[${height}px]`
        )} />
      )}
      
      <Image
        src={src}
        alt={alt}
        {...(width && height ? { width, height } : {})}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        priority={priority}
        placeholder={placeholder}
        {...(blurDataURL ? { blurDataURL } : {})}
        fill={fill}
        sizes={sizes}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
} 