/**
 * Startup Initialization Component
 * Runs application initialization on the server side
 */

import { initializeApplication } from '@/lib/app-initialization'
import { logger } from '@/lib/logger'

/**
 * Server component that performs initialization
 * This runs once per deployment/restart
 */
export async function StartupInit() {
  // Only run on server side
  if (typeof window !== 'undefined') {
    return null
  }
  
  try {
    // Check if we've already initialized (simple cache)
    const initKey = `init_${process.env.NODE_ENV}_${Date.now()}`
    
    logger.info('Starting application initialization', {
      component: 'StartupInit',
      key: initKey
    })
    
    const result = await initializeApplication()
    
    if (!result.canContinue) {
      logger.critical('Application cannot continue due to initialization failure', undefined, {
        component: 'StartupInit',
        errors: result.errors
      })
      
      // In a real application, you might want to exit the process here
      // or redirect to a maintenance page
      throw new Error('Critical initialization failure - application cannot start')
    }
    
    if (!result.success) {
      logger.warn('Application initialized with warnings', {
        component: 'StartupInit',
        warnings: result.warnings,
        errors: result.errors
      })
    } else {
      logger.info('Application initialization completed successfully', {
        component: 'StartupInit',
        services: result.services
      })
    }
    
  } catch (error) {
    logger.critical('Startup initialization component failed', error as Error, {
      component: 'StartupInit'
    })
    
    // Don't fail silently in critical scenarios
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
  }
  
  // This component doesn't render anything
  return null
}