/**
 * Dynamic Loading Components with Skeletons
 * Optimized loading states for better UX
 */
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Dynamic Loading Components with Skeletons
 * Optimized loading states for better UX
 */

// Chart Loading Skeleton
export const ChartSkeleton = () => (
  <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted">
    <div className="flex flex-col items-center space-y-2">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">차트 로딩 중...</p>
    </div>
  </div>
);

// Animation Loading Skeleton
export const AnimationSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-lg bg-muted', className)} />
);

// Image Loading Skeleton
export const ImageSkeleton = ({
  width = '100%',
  height = '200px',
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={cn('animate-pulse rounded-lg bg-muted', className)}
    style={{ width, height }}
  />
);

// Text Loading Skeleton
export const TextSkeleton = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={cn(
          'animate-pulse rounded bg-muted',
          i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full'
        )}
      />
    ))}
  </div>
);

// Card Loading Skeleton
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}>
    <div className="space-y-4">
      <div className="animate-pulse h-6 rounded bg-muted" />
      <div className="space-y-2">
        <div className="animate-pulse h-4 rounded bg-muted" />
        <div className="animate-pulse h-4 w-3/4 rounded bg-muted" />
      </div>
    </div>
  </div>
);

// Table Loading Skeleton
export const TableSkeleton = ({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={`header-${i}`}
          className="animate-pulse h-8 rounded bg-muted"
        />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={`cell-${rowIndex}-${colIndex}`}
            className="animate-pulse h-6 rounded bg-muted"
          />
        ))}
      </div>
    ))}
  </div>
);

// Form Loading Skeleton
export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="animate-pulse h-4 w-1/4 rounded bg-muted" />
        <div className="animate-pulse h-10 rounded-md bg-muted" />
      </div>
    ))}
    <div className="animate-pulse h-10 w-1/4 rounded-md bg-muted" />
  </div>
);

// List Loading Skeleton
export const ListSkeleton = ({
  items = 5,
  className,
}: {
  items?: number;
  className?: string;
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="animate-pulse h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="animate-pulse h-4 w-1/3 rounded bg-muted" />
          <div className="animate-pulse h-3 w-2/3 rounded bg-muted" />
        </div>
      </div>
    ))}
  </div>
);

// Dashboard Loading Skeleton
export const DashboardSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Loading Wrapper Component
export const LoadingWrapper = ({
  isLoading,
  children,
  fallback,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  if (isLoading) {
    return <div className={className}>{fallback || <ChartSkeleton />}</div>;
  }
  return <>{children}</>;
};

// Progressive Loading with Delay
export const ProgressiveLoader = ({
  delay = 300,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (showLoader) {
    return <ChartSkeleton />;
  }

  return <div className={className}>{children}</div>;
};
