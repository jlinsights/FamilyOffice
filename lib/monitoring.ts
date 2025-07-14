// Error monitoring and logging utilities
export class ErrorMonitor {
  static logError(error: Error, context?: Record<string, any>) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    }

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Monitor:', errorInfo)
      return
    }

    // In production, send to monitoring service
    // TODO: Integrate with Sentry, DataDog, or similar service
    this.sendToMonitoringService(errorInfo)
  }

  static logPerformance(metric: string, duration: number, context?: Record<string, any>) {
    const performanceInfo = {
      metric,
      duration,
      timestamp: new Date().toISOString(),
      context,
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Monitor:', performanceInfo)
      return
    }

    // TODO: Send to performance monitoring service
    this.sendToPerformanceService(performanceInfo)
  }

  private static async sendToMonitoringService(errorInfo: any) {
    try {
      // TODO: Replace with actual monitoring service endpoint
      await fetch('/api/monitoring/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      })
    } catch (err) {
      console.error('Failed to send error to monitoring service:', err)
    }
  }

  private static async sendToPerformanceService(performanceInfo: any) {
    try {
      // TODO: Replace with actual performance monitoring service
      await fetch('/api/monitoring/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceInfo),
      })
    } catch (err) {
      console.error('Failed to send performance data:', err)
    }
  }
}

// Performance measurement utility
export function measurePerformance<T>(
  fn: () => Promise<T>,
  metricName: string,
  context?: Record<string, any>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now()
    
    try {
      const result = await fn()
      const endTime = performance.now()
      const duration = endTime - startTime
      
      ErrorMonitor.logPerformance(metricName, duration, context)
      resolve(result)
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      ErrorMonitor.logError(error as Error, { 
        ...context, 
        metricName, 
        duration 
      })
      reject(error)
    }
  })
}