import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// 서비스 카드용 스켈레톤
function ServiceCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

// 헤더용 스켈레톤
function HeaderSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-navy-primary/80 border-b border-white/20">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="md:hidden flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 페이지 로딩용 스켈레톤
function PageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeaderSkeleton />
      <div className="pt-20 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="mb-20">
            <Skeleton className="h-16 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-2/3 mb-8" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ServiceCardSkeleton, HeaderSkeleton, PageSkeleton }
