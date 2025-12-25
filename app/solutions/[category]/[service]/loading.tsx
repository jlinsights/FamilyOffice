export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-8 animate-pulse"></div>

            {/* Back Button Skeleton */}
            <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-8 animate-pulse"></div>

            {/* Badges Skeleton */}
            <div className="flex gap-3 mb-6">
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
              <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 mb-6">
              <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-12 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>

            {/* Target Client Skeleton */}
            <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mb-8 animate-pulse"></div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
              <div className="h-12 w-36 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
