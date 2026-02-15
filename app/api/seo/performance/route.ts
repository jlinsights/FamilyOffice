import { NextRequest, NextResponse } from 'next/server';
import { getAllFeatureFlags } from '@/lib/feature-flags';
import {
  performanceMonitor,
  seoPerformanceTracker,
} from '@/lib/performance-monitor';
import {
  enhancedSEOCache,
  aiCacheOperations,
} from '@/lib/seo/enhanced-seo-cache';
import { BundleSizeMonitor } from '@/lib/seo/seo-bundle-optimizer';
import { SEOErrorHandler } from '@/lib/seo/seo-error-handling';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const detailed = searchParams.get('detailed') === 'true';

    // Collect performance data
    const performanceSummary = performanceMonitor.getPerformanceSummary();
    const seoPerformance = seoPerformanceTracker.getSEOPerformance();
    const featureFlags = getAllFeatureFlags();
    const cacheStats = enhancedSEOCache.getStats();
    const aiCacheStats = aiCacheOperations.getPerformanceMetrics();
    const errorStats = SEOErrorHandler.getErrorStats();

    // Bundle optimization metrics
    const bundleStats = {
      loadTimes: BundleSizeMonitor.getLoadTimes(),
      totalImports: Object.keys(BundleSizeMonitor.getLoadTimes()).length,
      averageLoadTime:
        Object.values(BundleSizeMonitor.getLoadTimes()).length > 0
          ? Object.values(BundleSizeMonitor.getLoadTimes()).reduce(
              (a, b) => a + b,
              0
            ) / Object.values(BundleSizeMonitor.getLoadTimes()).length
          : 0,
    };

    // Get system stats
    const systemStats = {
      timestamp: Date.now(),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'unknown',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };

    const basicReport = {
      status: 'healthy',
      timestamp: systemStats.timestamp,
      environment: {
        node: systemStats.nodeEnv,
        vercel: systemStats.vercelEnv,
        uptime: `${Math.floor(systemStats.uptime / 60)}m ${Math.floor(systemStats.uptime % 60)}s`,
      },
      featureFlags: {
        enabledCount: Object.values(featureFlags).filter(Boolean).length,
        totalCount: Object.keys(featureFlags).length,
        enabled: Object.entries(featureFlags)
          .filter(([_, enabled]) => enabled)
          .map(([feature, _]) => feature),
      },
      performance: {
        totalOperations: performanceSummary.totalOperations,
        averageResponseTime:
          Math.round(performanceSummary.averageResponseTime * 100) / 100,
        slowOperations: performanceSummary.slowOperations,
        errorRate: Math.round(performanceSummary.errorRate * 10000) / 100, // Convert to percentage
      },
      cache: {
        entriesStored: cacheStats.size,
        hitRate: cacheStats.hitRate,
        status: cacheStats.size > 0 ? 'active' : 'empty',
      },
      aiCache: {
        hitRate: aiCacheStats.hitRate,
        totalRequests: aiCacheStats.totalRequests,
        status: aiCacheStats.totalRequests > 0 ? 'active' : 'inactive',
      },
      bundleOptimization: {
        totalImports: bundleStats.totalImports,
        averageLoadTime: Math.round(bundleStats.averageLoadTime * 100) / 100,
        status:
          bundleStats.averageLoadTime < 100 ? 'optimal' : 'needs-optimization',
      },
      errorTracking: {
        totalErrors: errorStats.totalErrors,
        criticalErrors: errorStats.errorsBySeverity.critical || 0,
        recentErrorRate:
          errorStats.totalErrors > 0
            ? Math.round(
                (errorStats.recentErrors.length / errorStats.totalErrors) * 100
              )
            : 0,
        status:
          (errorStats.errorsBySeverity.critical || 0) > 0
            ? 'critical'
            : (errorStats.errorsBySeverity.high || 0) > 0
              ? 'attention'
              : 'healthy',
      },
      recommendations: generateRecommendations(
        performanceSummary,
        featureFlags,
        bundleStats,
        aiCacheStats
      ),
    };

    if (detailed) {
      const detailedReport = {
        ...basicReport,
        detailed: {
          systemStats,
          seoOperations: {
            metadataGeneration: seoPerformance.metadataGeneration.length,
            keywordOptimization: seoPerformance.keywordOptimization.length,
            structuredData: seoPerformance.structuredData.length,
          },
          recentOperations: seoPerformance.metadataGeneration.slice(-5),
          memoryUsage: {
            rss: `${Math.round(systemStats.memoryUsage.rss / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(systemStats.memoryUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(systemStats.memoryUsage.heapTotal / 1024 / 1024)}MB`,
          },
          bundleOptimization: {
            loadTimes: bundleStats.loadTimes,
            averageLoadTime: bundleStats.averageLoadTime,
            slowImports: Object.entries(bundleStats.loadTimes).filter(
              ([_, time]) => time > 100
            ),
          },
          enhancedCache: {
            detailed: cacheStats,
            aiSpecific: aiCacheStats,
          },
        },
      };

      if (format === 'html') {
        return new NextResponse(generateHTMLReport(detailedReport), {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      return NextResponse.json(detailedReport);
    }

    if (format === 'html') {
      return new NextResponse(generateHTMLReport(basicReport), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return NextResponse.json(basicReport);
  } catch (error) {
    console.error('SEO Performance API Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to collect performance data',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}

// POST endpoint to clear cache and reset metrics
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'clear-cache') {
      enhancedSEOCache.clear();
      return NextResponse.json({
        status: 'success',
        message: 'SEO cache cleared successfully',
        timestamp: Date.now(),
      });
    }

    if (action === 'clear-metrics') {
      performanceMonitor.clearMetrics();
      return NextResponse.json({
        status: 'success',
        message: 'Performance metrics cleared successfully',
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        message:
          'Invalid action. Use ?action=clear-cache or ?action=clear-metrics',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('SEO Performance API Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to perform action',
      },
      { status: 500 }
    );
  }
}

function generateRecommendations(
  performanceSummary: any,
  featureFlags: any,
  bundleStats?: any,
  aiCacheStats?: any
): string[] {
  const recommendations = [];

  // Performance recommendations
  if (performanceSummary.averageResponseTime > 100) {
    recommendations.push('Consider enabling caching for slow operations');
  }

  if (performanceSummary.errorRate > 0.05) {
    recommendations.push('High error rate detected - review error logs');
  }

  if (performanceSummary.slowOperations > 5) {
    recommendations.push(
      'Multiple slow operations detected - consider optimization'
    );
  }

  // Feature flag recommendations
  const enabledFeatures = Object.values(featureFlags).filter(Boolean).length;
  if (enabledFeatures === 0) {
    recommendations.push(
      'All SEO features disabled - consider gradual activation'
    );
  }

  if (enabledFeatures >= 4 && performanceSummary.errorRate < 0.01) {
    recommendations.push(
      '✅ Week 3: AI features enabled - monitoring performance impact'
    );
  }

  if (enabledFeatures < 4 && performanceSummary.errorRate < 0.01) {
    recommendations.push(
      'System stable - safe to enable AI-powered SEO features'
    );
  }

  // Bundle optimization recommendations
  if (bundleStats && bundleStats.averageLoadTime > 100) {
    recommendations.push(
      'Bundle load times detected >100ms - consider preloading'
    );
  }

  if (bundleStats && bundleStats.totalImports > 5) {
    recommendations.push(
      'Multiple dynamic imports active - monitor bundle size'
    );
  }

  // Cache performance recommendations
  if (aiCacheStats && aiCacheStats.hitRate < 70) {
    recommendations.push(
      'AI cache hit rate <70% - consider increasing cache TTL'
    );
  }

  if (aiCacheStats && aiCacheStats.hitRate > 85) {
    recommendations.push(
      'Excellent AI cache performance - ready for next phase'
    );
  }

  // Default recommendation
  if (recommendations.length === 0) {
    recommendations.push(
      '✅ Week 3: AI-powered SEO features active - system performing optimally'
    );
  }

  return recommendations;
}

function generateHTMLReport(data: any): string {
  const statusColor = data.status === 'healthy' ? '#10B981' : '#EF4444';
  const errorRateColor =
    data.performance.errorRate < 1
      ? '#10B981'
      : data.performance.errorRate < 5
        ? '#F59E0B'
        : '#EF4444';

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Performance Dashboard</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 600; color: white; background: ${statusColor}; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .metric { display: flex; justify-content: space-between; margin: 8px 0; }
    .metric-value { font-weight: 600; color: #1f2937; }
    .recommendations { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin-top: 16px; }
    .recommendations h4 { margin: 0 0 12px 0; color: #92400e; }
    .recommendations ul { margin: 0; padding-left: 20px; }
    .recommendations li { color: #92400e; margin: 4px 0; }
    .feature-flags { display: flex; flex-wrap: gap; gap: 8px; margin-top: 12px; }
    .flag { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    .flag.enabled { background: #d1fae5; color: #065f46; }
    .flag.disabled { background: #fee2e2; color: #991b1b; }
    .refresh-btn { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 16px 0; }
    .refresh-btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 SEO Performance Dashboard</h1>
      <div class="status">${data.status.toUpperCase()}</div>
      <p>Last updated: ${new Date(data.timestamp).toLocaleString()}</p>
      <button class="refresh-btn" onclick="window.location.reload()">🔄 Refresh</button>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📊 Performance Metrics</h3>
        <div class="metric">
          <span>Total Operations:</span>
          <span class="metric-value">${data.performance.totalOperations}</span>
        </div>
        <div class="metric">
          <span>Avg Response Time:</span>
          <span class="metric-value">${data.performance.averageResponseTime}ms</span>
        </div>
        <div class="metric">
          <span>Slow Operations:</span>
          <span class="metric-value">${data.performance.slowOperations}</span>
        </div>
        <div class="metric">
          <span>Error Rate:</span>
          <span class="metric-value" style="color: ${errorRateColor}">${data.performance.errorRate}%</span>
        </div>
      </div>

      <div class="card">
        <h3>🎛️ Feature Flags</h3>
        <div class="metric">
          <span>Enabled Features:</span>
          <span class="metric-value">${data.featureFlags.enabledCount}/${data.featureFlags.totalCount}</span>
        </div>
        <div class="feature-flags">
          ${data.featureFlags.enabled
            .map(
              (feature: string) =>
                `<span class="flag enabled">${feature}</span>`
            )
            .join('')}
        </div>
      </div>

      <div class="card">
        <h3>💾 Cache Status</h3>
        <div class="metric">
          <span>Cached Entries:</span>
          <span class="metric-value">${data.cache.entriesStored}</span>
        </div>
        <div class="metric">
          <span>Hit Rate:</span>
          <span class="metric-value">${data.cache.hitRate}%</span>
        </div>
        <div class="metric">
          <span>Status:</span>
          <span class="metric-value">${data.cache.status}</span>
        </div>
      </div>

      <div class="card">
        <h3>🤖 AI Cache Performance</h3>
        <div class="metric">
          <span>AI Hit Rate:</span>
          <span class="metric-value">${data.aiCache.hitRate}%</span>
        </div>
        <div class="metric">
          <span>Total Requests:</span>
          <span class="metric-value">${data.aiCache.totalRequests}</span>
        </div>
        <div class="metric">
          <span>Status:</span>
          <span class="metric-value">${data.aiCache.status}</span>
        </div>
      </div>

      <div class="card">
        <h3>📦 Bundle Optimization</h3>
        <div class="metric">
          <span>Dynamic Imports:</span>
          <span class="metric-value">${data.bundleOptimization.totalImports}</span>
        </div>
        <div class="metric">
          <span>Avg Load Time:</span>
          <span class="metric-value">${data.bundleOptimization.averageLoadTime}ms</span>
        </div>
        <div class="metric">
          <span>Status:</span>
          <span class="metric-value">${data.bundleOptimization.status}</span>
        </div>
      </div>

      <div class="card">
        <h3>🌐 Environment</h3>
        <div class="metric">
          <span>Node Environment:</span>
          <span class="metric-value">${data.environment.node}</span>
        </div>
        <div class="metric">
          <span>Vercel Environment:</span>
          <span class="metric-value">${data.environment.vercel}</span>
        </div>
        <div class="metric">
          <span>Uptime:</span>
          <span class="metric-value">${data.environment.uptime}</span>
        </div>
      </div>
    </div>

    ${
      data.recommendations.length > 0
        ? `
    <div class="recommendations">
      <h4>💡 Recommendations</h4>
      <ul>
        ${data.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
    }
  </div>
</body>
</html>`;
}
