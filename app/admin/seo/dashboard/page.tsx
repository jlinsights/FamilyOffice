'use client';

import {
  RefreshCw,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
} from 'lucide-react';

import React, { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PerformanceData {
  status: string;
  timestamp: number;
  environment: {
    node: string;
    vercel: string;
    uptime: string;
  };
  featureFlags: {
    enabledCount: number;
    totalCount: number;
    enabled: string[];
  };
  performance: {
    totalOperations: number;
    averageResponseTime: number;
    slowOperations: number;
    errorRate: number;
  };
  cache: {
    entriesStored: number;
    hitRate: number;
    status: string;
  };
  aiCache: {
    hitRate: number;
    totalRequests: number;
    status: string;
  };
  bundleOptimization: {
    totalImports: number;
    averageLoadTime: number;
    status: string;
  };
  recommendations: string[];
}

export default function SEODashboardPage() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/seo/performance?detailed=true');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    try {
      const response = await fetch('/api/seo/performance?action=clear-cache', {
        method: 'POST',
      });

      if (response.ok) {
        await fetchData(); // Refresh data after clearing cache
      }
    } catch (err) {
      console.error('Failed to clear cache:', err);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">
              Loading SEO performance data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-2">
              <p className="text-lg font-medium text-red-600">
                Error loading dashboard
              </p>
              <p className="text-gray-600">{error}</p>
              <Button onClick={fetchData} className="mt-2">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'healthy'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (
    value: number,
    thresholds: { good: number; warning: number }
  ) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Activity className="h-8 w-8 mr-3 text-blue-600" />
              SEO Performance Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time monitoring of SEO system performance and feature flags
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(data?.status || 'unknown')}>
              {data?.status?.toUpperCase() || 'UNKNOWN'}
            </Badge>
            <Button
              onClick={fetchData}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {data && (
          <>
            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.performance.totalOperations}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Since deployment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getPerformanceColor(data.performance.averageResponseTime, { good: 100, warning: 500 })}`}
                  >
                    {data.performance.averageResponseTime.toFixed(1)}ms
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Target: &lt; 100ms
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Error Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getPerformanceColor(data.performance.errorRate, { good: 1, warning: 5 })}`}
                  >
                    {data.performance.errorRate.toFixed(2)}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Target: &lt; 1%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Bundle Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getPerformanceColor(data.bundleOptimization.averageLoadTime, { good: 50, warning: 100 })}`}
                  >
                    {data.bundleOptimization.averageLoadTime.toFixed(1)}ms
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.bundleOptimization.totalImports} imports •{' '}
                    {data.bundleOptimization.status}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature Flags Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Feature Flags Status
                </CardTitle>
                <CardDescription>
                  {data.featureFlags.enabledCount} of{' '}
                  {data.featureFlags.totalCount} features enabled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {/* Show enabled features */}
                  {data.featureFlags.enabled.map(feature => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {feature
                        .replace('enable', '')
                        .replace(/([A-Z])/g, ' $1')
                        .trim()}
                    </Badge>
                  ))}

                  {/* Show count of disabled features */}
                  {data.featureFlags.totalCount -
                    data.featureFlags.enabledCount >
                    0 && (
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-600"
                    >
                      +
                      {data.featureFlags.totalCount -
                        data.featureFlags.enabledCount}{' '}
                      disabled
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Cache Performance Card */}
            {data.aiCache.totalRequests > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-purple-600" />
                    AI Cache Performance
                    <Badge className="ml-2 bg-purple-100 text-purple-800">
                      Week 3
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    AI-powered SEO operations caching statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cache Hit Rate:</span>
                    <span
                      className={`font-medium ${data.aiCache.hitRate > 80 ? 'text-green-600' : data.aiCache.hitRate > 60 ? 'text-yellow-600' : 'text-red-600'}`}
                    >
                      {data.aiCache.hitRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total AI Requests:</span>
                    <span className="font-medium">
                      {data.aiCache.totalRequests}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Cache Status:</span>
                    <Badge
                      variant={
                        data.aiCache.status === 'active' ? 'default' : 'outline'
                      }
                    >
                      {data.aiCache.status}
                    </Badge>
                  </div>
                  {data.aiCache.hitRate < 70 && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-800">
                        💡 Consider increasing cache TTL for AI operations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* System Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-600" />
                    Environment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Node Environment:</span>
                    <Badge variant="outline">{data.environment.node}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vercel Environment:</span>
                    <Badge variant="outline">{data.environment.vercel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Uptime:</span>
                    <span className="font-mono text-sm">
                      {data.environment.uptime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-mono text-sm">
                      {lastRefresh?.toLocaleString() || 'Never'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-orange-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Slow Operations:</span>
                    <span
                      className={`font-medium ${data.performance.slowOperations > 0 ? 'text-red-600' : 'text-green-600'}`}
                    >
                      {data.performance.slowOperations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cache Entries:</span>
                    <span className="font-medium">
                      {data.cache.entriesStored}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cache Hit Rate:</span>
                    <span
                      className={`font-medium ${data.cache.hitRate > 80 ? 'text-green-600' : 'text-yellow-600'}`}
                    >
                      {data.cache.hitRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bundle Load Time:</span>
                    <span
                      className={`font-medium ${data.bundleOptimization.averageLoadTime > 100 ? 'text-yellow-600' : 'text-green-600'}`}
                    >
                      {data.bundleOptimization.averageLoadTime.toFixed(1)}ms
                    </span>
                  </div>
                  <div className="pt-2">
                    <Button
                      onClick={clearCache}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            {data.recommendations && data.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                    System Recommendations
                  </CardTitle>
                  <CardDescription>
                    Actionable insights based on current performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Footer Info */}
            <div className="text-center text-sm text-gray-500 pt-4">
              <p>
                Dashboard auto-refreshes every 30 seconds • Last updated:{' '}
                {new Date(data.timestamp).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
