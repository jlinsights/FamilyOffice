'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Loading components for better UX
const ComponentSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    </CardContent>
  </Card>
)

const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-64 w-full" />
    <div className="flex space-x-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
)

// Heavy components with lazy loading
export const LazyFinancialDashboard = dynamic(
  () => import('@/components/asset-management-dashboard'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

export const LazyAssetManagementDashboard = dynamic(
  () => import('@/components/asset-management-dashboard'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

export const LazyKoreanMarketInsight = dynamic(
  () => import('@/components/korean-market-insight'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
)

export const LazyStockCard = dynamic(
  () => import('@/components/financial/stock-card'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

export const LazyForexCard = dynamic(
  () => import('@/components/financial/forex-card'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

// Cal.com components with lazy loading
export const LazyCalComInline = dynamic(
  () => import('@/components/cal-com-inline'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    ),
    ssr: false,
  }
)

export const LazyCalComAdvanced = dynamic(
  () => import('@/components/cal-com-advanced'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

// Admin components (heavy and rarely used)
export const LazyAdminDashboard = dynamic(
  () => import('@/app/admin/page').then((mod) => ({ default: mod.default })),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  }
)

// Charts and analytics components
export const LazyChartComponent = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
)

// Form components that might be heavy
export const LazyConsultationForm = dynamic(
  () => import('@/components/forms/consultation-form'),
  {
    loading: () => (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-1/3" />
        </CardContent>
      </Card>
    ),
    ssr: false,
  }
)

// Utility hook for intersection observer
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}

// HOC for lazy loading on scroll
export const withLazyLoading = <T extends object>(
  Component: React.ComponentType<T>,
  fallback: React.ComponentType = ComponentSkeleton
) => {
  const LazyLoadedComponent = React.forwardRef<HTMLDivElement, T>((props, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(elementRef, {
      threshold: 0.1,
      rootMargin: '50px',
    })

    React.useImperativeHandle(ref, () => elementRef.current!)

    return (
      <div ref={elementRef}>
        {isVisible ? <Component {...props} /> : React.createElement(fallback)}
      </div>
    )
  })
  
  LazyLoadedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name || 'Component'})`
  return LazyLoadedComponent
}

// Bundle splitting utilities
export const loadFeature = async (featureName: string) => {
  try {
    switch (featureName) {
      case 'financial':
        return await import('@/components/asset-management-dashboard')
      case 'consulting':
        return await import('@/components/forms/consultation-form')
      case 'analytics':
        return await import('@/components/korean-market-insight')
      case 'admin':
        return await import('@/app/admin/page')
      default:
        throw new Error(`Unknown feature: ${featureName}`)
    }
  } catch (error) {
    console.error(`Failed to load feature ${featureName}:`, error)
    throw error
  }
}