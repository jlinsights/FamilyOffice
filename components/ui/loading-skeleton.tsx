import { cn } from "@/lib/utils"
import { designTokens } from "@/lib/design-tokens"

interface LoadingSkeletonProps {
  type: 'card' | 'table' | 'chart' | 'metric' | 'text' | 'avatar' | 'button'
  count?: number
  className?: string
  height?: string
  width?: string
  rounded?: boolean
}

export function LoadingSkeleton({ 
  type, 
  count = 1, 
  className,
  height,
  width,
  rounded = true
}: LoadingSkeletonProps) {
  const variants = {
    card: 'h-32 w-full',
    table: 'h-4 w-full mb-2',
    chart: 'h-64 w-full',
    metric: 'h-16 w-full',
    text: 'h-4 w-full',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24'
  }
  
  const baseClasses = cn(
    'animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted',
    rounded && 'rounded-lg',
    variants[type],
    height && `h-[${height}]`,
    width && `w-[${width}]`,
    className
  )
  
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={baseClasses} />
      ))}
    </div>
  )
}

// Specialized skeleton components
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      <LoadingSkeleton type="text" count={1} className="h-6 w-1/3" />
      <LoadingSkeleton type="text" count={3} />
      <LoadingSkeleton type="button" count={1} className="w-24" />
    </div>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <LoadingSkeleton key={i} type="text" className="flex-1 h-6" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <LoadingSkeleton key={colIndex} type="text" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <LoadingSkeleton type="text" count={1} className="h-6 w-1/4" />
      <div className="h-64 w-full bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse rounded-lg" />
      <div className="flex justify-between">
        <LoadingSkeleton type="text" count={3} className="w-1/4" />
        <LoadingSkeleton type="text" count={3} className="w-1/4" />
      </div>
    </div>
  )
}

export function MetricSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 space-y-2', className)}>
      <LoadingSkeleton type="text" count={1} className="h-4 w-1/2" />
      <LoadingSkeleton type="text" count={1} className="h-8 w-1/3" />
      <LoadingSkeleton type="text" count={1} className="h-3 w-1/4" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricSkeleton />
      <MetricSkeleton />
      <MetricSkeleton />
      <ChartSkeleton className="lg:col-span-2" />
      <CardSkeleton />
      <TableSkeleton rows={4} columns={3} />
    </div>
  )
} 