/**
 * 프론트엔드 성능 최적화
 * Portfolio dashboard load time: <2 seconds 목표
 */

import { lazy, Suspense, memo, useMemo, useCallback, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { useVirtualizer } from '@tanstack/react-virtual'

// 동적 컴포넌트 로딩 (코드 분할)
export const LazyComponents = {
  // 차트 컴포넌트들 (번들 크기 최적화)
  AdvancedChart: dynamic(() => import('@/components/charts/advanced-chart'), {
    loading: () => <ChartSkeleton />,
    ssr: false, // 서버사이드 렌더링 비활성화
  }),
  
  PortfolioAnalytics: dynamic(() => import('@/components/portfolio/analytics'), {
    loading: () => <AnalyticsSkeleton />,
    ssr: false,
  }),
  
  ReportGenerator: dynamic(() => import('@/components/reports/generator'), {
    loading: () => <ReportSkeleton />,
    ssr: false,
  }),
  
  // 무거운 테이블 컴포넌트
  DataTable: dynamic(() => import('@/components/ui/data-table'), {
    loading: () => <TableSkeleton />,
  }),

  // 금융 계산기
  FinancialCalculator: dynamic(() => import('@/components/tools/calculator'), {
    loading: () => <CalculatorSkeleton />,
    ssr: false,
  }),
}

// 스켈레톤 컴포넌트들
const ChartSkeleton = memo(() => (
  <div className="h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">차트 로딩 중...</div>
  </div>
))

const AnalyticsSkeleton = memo(() => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
    ))}
  </div>
))

const ReportSkeleton = memo(() => (
  <div className="h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">리포트 생성 중...</div>
  </div>
))

const TableSkeleton = memo(() => (
  <div className="space-y-2">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="h-12 bg-muted animate-pulse rounded" />
    ))}
  </div>
))

const CalculatorSkeleton = memo(() => (
  <div className="h-48 bg-muted animate-pulse rounded-lg" />
))

// 이미지 최적화 컴포넌트
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  onLoad?: () => void
}

export const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  
  const { ref } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
    onIntersect: () => setIsInView(true),
  })

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setError(true)
  }, [])

  // WebP 지원 확인
  const webpSupported = useMemo(() => {
    if (typeof window === 'undefined') return false
    const canvas = document.createElement('canvas')
    return canvas.toDataURL('image/webp').indexOf('webp') > -1
  }, [])

  // 이미지 형식 최적화
  const optimizedSrc = useMemo(() => {
    if (!src) return ''
    
    // CDN URL 생성 (예: Cloudinary, ImageKit)
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
    const format = webpSupported ? 'webp' : 'jpg'
    const quality = 80
    
    if (baseUrl && !src.startsWith('http')) {
      return `${baseUrl}/f_${format},q_${quality}${width ? `,w_${width}` : ''}${height ? `,h_${height}` : ''}/${src}`
    }
    
    return src
  }, [src, webpSupported, width, height])

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">이미지 로딩 실패</span>
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : 'auto',
          }}
        />
      )}
    </div>
  )
})

// 가상 스크롤링 컴포넌트
interface VirtualizedListProps<T> {
  items: T[]
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  renderItem,
  className
}: VirtualizedListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5, // 보이는 영역 외 렌더링할 아이템 수
  })

  return (
    <div
      ref={parentRef}
      className={`h-full overflow-auto ${className}`}
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  )
}

// 무한 스크롤 컴포넌트
interface InfiniteScrollProps<T> {
  items: T[]
  hasNextPage: boolean
  loadMore: () => void
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

export function InfiniteScroll<T>({
  items,
  hasNextPage,
  loadMore,
  renderItem,
  className
}: InfiniteScrollProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { ref: loadMoreRef } = useIntersectionObserver({
    threshold: 0.1,
    onIntersect: useCallback(async () => {
      if (hasNextPage && !isLoading) {
        setIsLoading(true)
        await loadMore()
        setIsLoading(false)
      }
    }, [hasNextPage, isLoading, loadMore]),
  })

  return (
    <div className={className}>
      {items.map((item, index) => renderItem(item, index))}
      
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-4 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>로딩 중...</span>
            </div>
          ) : (
            <div className="text-muted-foreground">더 많은 항목 로딩...</div>
          )}
        </div>
      )}
    </div>
  )
}

// 메모이제이션된 컴포넌트들
export const MemoizedComponents = {
  // 포트폴리오 카드
  PortfolioCard: memo<{
    portfolio: any
    onClick?: () => void
  }>(({ portfolio, onClick }) => (
    <div 
      className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="font-semibold">{portfolio.name}</h3>
      <p className="text-muted-foreground">
        {new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        }).format(portfolio.totalValue)}
      </p>
      <div className={`text-sm ${
        portfolio.change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {portfolio.change >= 0 ? '+' : ''}{portfolio.change}%
      </div>
    </div>
  )),

  // 거래 내역 아이템
  TransactionItem: memo<{
    transaction: any
  }>(({ transaction }) => (
    <div className="flex items-center justify-between p-3 border-b">
      <div>
        <div className="font-medium">{transaction.symbol}</div>
        <div className="text-sm text-muted-foreground">
          {transaction.type} • {transaction.quantity}주
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">
          {new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(transaction.amount)}
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(transaction.date).toLocaleDateString('ko-KR')}
        </div>
      </div>
    </div>
  )),

  // 주식 가격 표시
  StockPrice: memo<{
    symbol: string
    price: number
    change: number
    changePercent: number
  }>(({ symbol, price, change, changePercent }) => (
    <div className="flex items-center justify-between">
      <span className="font-medium">{symbol}</span>
      <div className="text-right">
        <div className="font-medium">
          {new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(price)}
        </div>
        <div className={`text-sm ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? '+' : ''}{change} ({changePercent >= 0 ? '+' : ''}{changePercent}%)
        </div>
      </div>
    </div>
  )),
}

// 폰트 로딩 최적화
export class FontOptimizer {
  static preloadFonts(): void {
    if (typeof document === 'undefined') return

    const fonts = [
      {
        family: 'Pretendard Variable',
        url: '/fonts/PretendardVariable.woff2',
        format: 'woff2-variations',
      },
      {
        family: 'Inter',
        url: '/fonts/Inter-Variable.woff2',
        format: 'woff2-variations',
      },
    ]

    fonts.forEach(({ family, url, format }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = `font/${format}`
      link.crossOrigin = 'anonymous'
      link.href = url
      document.head.appendChild(link)
    })
  }

  static optimizeFontDisplay(): void {
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'Pretendard Variable';
        src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
        font-weight: 45 920;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Inter';
        src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }
    `
    document.head.appendChild(style)
  }
}

// CSS 최적화
export class CSSOptimizer {
  // 중요한 CSS 인라인화
  static inlineCriticalCSS(): string {
    return `
      <style>
        /* Critical CSS for above-the-fold content */
        .layout-header {
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 1.5rem;
        }
        
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }
        
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      </style>
    `
  }

  // 사용하지 않는 CSS 제거
  static purgeUnusedCSS(html: string, css: string): string {
    // PurgeCSS 로직 (실제 구현시 PurgeCSS 라이브러리 사용)
    const usedClasses = new Set<string>()
    const classRegex = /class(?:Name)?=["']([^"']+)["']/g
    
    let match
    while ((match = classRegex.exec(html)) !== null) {
      match[1].split(/\s+/).forEach(className => {
        if (className) usedClasses.add(className)
      })
    }

    // CSS에서 사용되지 않는 클래스 제거
    const lines = css.split('\n')
    const purgedCSS = lines.filter(line => {
      const classMatch = line.match(/\.([a-zA-Z][\w-]*)/g)
      if (!classMatch) return true
      
      return classMatch.some(className => 
        usedClasses.has(className.substring(1))
      )
    })

    return purgedCSS.join('\n')
  }
}

// JavaScript 최적화
export class JSOptimizer {
  // 코드 분할 전략
  static getChunkStrategy() {
    return {
      // 벤더 라이브러리
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 10,
      },
      
      // UI 컴포넌트
      ui: {
        test: /[\\/]components[\\/]ui[\\/]/,
        name: 'ui',
        chunks: 'all',
        priority: 20,
      },
      
      // 차트 라이브러리
      charts: {
        test: /[\\/]node_modules[\\/](recharts|d3|chart\.js)[\\/]/,
        name: 'charts',
        chunks: 'all',
        priority: 30,
      },
      
      // 공통 유틸리티
      common: {
        minChunks: 2,
        name: 'common',
        chunks: 'all',
        priority: 5,
      },
    }
  }

  // 트리 쉐이킹 최적화
  static optimizeTreeShaking() {
    return {
      // 사이드 이펙트 없는 모듈 표시
      sideEffects: false,
      
      // ES6 모듈 사용
      module: true,
      
      // 데드 코드 제거
      usedExports: true,
      
      // 프로덕션 최적화
      mode: 'production',
    }
  }

  // 번들 분석
  static analyzeBundleSize(): void {
    if (process.env.ANALYZE === 'true') {
      import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
        console.log('📊 Bundle analysis available at http://127.0.0.1:8888')
      })
    }
  }
}

// 성능 측정 훅
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
  }>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Web Vitals 측정
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, lcp: entry.startTime }))
            break
          case 'first-input':
            const fidEntry = entry as PerformanceEventTiming
            setMetrics(prev => ({ 
              ...prev, 
              fid: fidEntry.processingStart - fidEntry.startTime 
            }))
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                cls: (prev.cls || 0) + (entry as any).value 
              }))
            }
            break
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      
      // TTFB 측정
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigationEntry.responseStart - navigationEntry.fetchStart
        }))
      }
    } catch (error) {
      console.warn('Performance observation not supported:', error)
    }

    return () => observer.disconnect()
  }, [])

  return metrics
}

// 리소스 힌트 생성
export function generateResourceHints(): string {
  return `
    <!-- DNS prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//api.example.com">
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    
    <!-- Module preload -->
    <link rel="modulepreload" href="/js/app.js">
    <link rel="modulepreload" href="/js/vendor.js">
  `
}

// 초기화 함수
export function initializeFrontendOptimization(): void {
  console.log('🚀 Frontend optimization initialized')
  
  // 폰트 최적화
  FontOptimizer.preloadFonts()
  FontOptimizer.optimizeFontDisplay()
  
  // 번들 분석
  JSOptimizer.analyzeBundleSize()
  
  // 성능 모니터링 초기화
  if (process.env.NODE_ENV === 'production') {
    // Service Worker 등록
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('✅ Service Worker registered'))
        .catch(error => console.error('❌ Service Worker registration failed:', error))
    }
  }
}