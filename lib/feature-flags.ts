// Feature flag system for gradual SEO feature rollout
export interface FeatureFlags {
  // SEO Engine Features
  enableAdvancedSEO: boolean;
  enableAIKeywordOptimization: boolean;
  enableRealtimeSEODashboard: boolean;
  enableContentOptimization: boolean;
  enableCrossDomainRouting: boolean;
  enableDynamicStructuredData: boolean;
  
  // Performance Features
  enableServerSideCaching: boolean;
  enableLazyLoading: boolean;
  
  // Monitoring Features
  enableErrorTracking: boolean;
  enablePerformanceMonitoring: boolean;
}

// Default feature flag configuration for production safety
const defaultFlags: FeatureFlags = {
  // Start with all advanced SEO features disabled
  enableAdvancedSEO: false,
  enableAIKeywordOptimization: false,
  enableRealtimeSEODashboard: false,
  enableContentOptimization: false,
  enableCrossDomainRouting: false,
  enableDynamicStructuredData: false,
  
  // Performance features enabled by default
  enableServerSideCaching: true,
  enableLazyLoading: true,
  
  // Monitoring enabled by default
  enableErrorTracking: true,
  enablePerformanceMonitoring: true,
};

// Environment-based overrides
const getEnvironmentFlags = (): Partial<FeatureFlags> => {
  const env = process.env.NODE_ENV;
  
  // Development environment - enable all features
  if (env === 'development') {
    return {
      enableAdvancedSEO: true,
      enableAIKeywordOptimization: true,
      enableRealtimeSEODashboard: true,
      enableContentOptimization: true,
      enableCrossDomainRouting: true,
      enableDynamicStructuredData: true,
    };
  }
  
  // Staging environment - enable some features
  if (process.env.VERCEL_ENV === 'preview') {
    return {
      enableAdvancedSEO: true,
      enableDynamicStructuredData: true,
    };
  }
  
  // Production - use defaults or environment variable overrides
  return {
    enableAdvancedSEO: process.env.FEATURE_ADVANCED_SEO === 'true',
    enableAIKeywordOptimization: process.env.FEATURE_AI_KEYWORDS === 'true',
    enableRealtimeSEODashboard: process.env.FEATURE_SEO_DASHBOARD === 'true',
    enableContentOptimization: process.env.FEATURE_CONTENT_OPT === 'true',
    enableCrossDomainRouting: process.env.FEATURE_CROSS_DOMAIN === 'true',
    enableDynamicStructuredData: process.env.FEATURE_STRUCTURED_DATA === 'true',
  };
};

// Merge flags with environment overrides
const featureFlags: FeatureFlags = {
  ...defaultFlags,
  ...getEnvironmentFlags(),
};

// Feature flag checker with logging
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const enabled = featureFlags[feature];
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Feature ${feature}: ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  return enabled;
}

// Get all feature flags (useful for debugging)
export function getAllFeatureFlags(): FeatureFlags {
  return { ...featureFlags };
}

// Check multiple features at once
export function areFeaturesEnabled(...features: (keyof FeatureFlags)[]): boolean {
  return features.every(feature => isFeatureEnabled(feature));
}

// Export the flags object for direct access if needed
export { featureFlags };