// Safe wrapper for SEO engine with feature flags and error handling
import { Metadata } from 'next';
import { isFeatureEnabled } from './feature-flags';
import { dynamicSEOImports, BundleSizeMonitor } from './seo-bundle-optimizer';
import { performanceMonitor } from './performance-monitor';
import { aiCacheOperations } from './enhanced-seo-cache';
import { SEOErrorHandler, inputSanitizer } from './seo-error-handling';

// Type definitions
interface SafeSEOMetadata extends Metadata {
  _isSafe?: boolean;
  _fallbackUsed?: boolean;
}

// Default fallback metadata
const defaultMetadata: SafeSEOMetadata = {
  title: 'FamilyOffice S - 프리미엄 자산관리 서비스',
  description: '중견기업 CEO를 위한 맞춤형 자산관리 및 절세 전략 서비스',
  keywords: ['자산관리', '절세', '가업승계', '패밀리오피스'],
  openGraph: {
    title: 'FamilyOffice S - 프리미엄 자산관리 서비스',
    description: '중견기업 CEO를 위한 맞춤형 자산관리 및 절세 전략 서비스',
    url: 'https://familyoffices.vip',
    siteName: 'FamilyOffice S',
    type: 'website',
  },
  _isSafe: true,
  _fallbackUsed: true,
};

// Dynamic imports now handled by bundle optimizer

// Safe metadata generation with fallbacks
export async function generateSafeMetadata(
  pageName: string,
  options?: {
    keywords?: string[];
    description?: string;
    title?: string;
    domain?: string;
  }
): Promise<SafeSEOMetadata> {
  try {
    // If advanced SEO is disabled, return default metadata
    if (!isFeatureEnabled('enableAdvancedSEO')) {
      return {
        ...defaultMetadata,
        title: options?.title || defaultMetadata.title,
        description: options?.description || defaultMetadata.description,
        keywords: options?.keywords || defaultMetadata.keywords,
      };
    }

    // Try to load and use advanced SEO engine with enhanced caching
    const context = { 
      domain: options?.domain || 'familyoffices.vip',
      userAgent: 'safe-seo-engine',
      referrer: '',
      location: 'KR',
      timeOfDay: Date.now(),
      deviceType: 'desktop' as const,
      userSegment: 'individual' as const
    };

    const metadata = await SEOErrorHandler.safeAIOperation(
      async () => {
        return await aiCacheOperations.generateAdvancedMetadata(
          options?.domain || 'familyoffices.vip',
          pageName,
          context,
          async () => {
            const advancedSEOEngine = await BundleSizeMonitor.trackImportTime(
              'advanced-seo-engine',
              () => dynamicSEOImports.loadAdvancedSEOEngine()
            );
            
            if (!advancedSEOEngine) {
              throw new Error('Advanced SEO engine failed to load');
            }

            return await advancedSEOEngine.generateContextualMetadata(
              options?.domain || 'familyoffices.vip',
              pageName,
              context
            );
          }
        );
      },
      defaultMetadata, // Fallback
      {
        module: 'safe-seo-engine',
        operationName: 'generateAdvancedMetadata'
      }
    );
      
    return {
      ...metadata,
      _isSafe: true,
      _fallbackUsed: false,
    };

    // Fallback if module fails to load
    return defaultMetadata;
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Safe SEO Engine Error:', error);
    }

    // Return safe fallback metadata
    return defaultMetadata;
  }
}

// Safe structured data generation
export async function generateSafeStructuredData(
  pageName: string,
  pageData?: any
): Promise<any> {
  try {
    if (!isFeatureEnabled('enableDynamicStructuredData')) {
      // Return basic structured data
      return {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: 'FamilyOffice S',
        description: '프리미엄 자산관리 서비스',
      };
    }

    const structuredDataEngine = await performanceMonitor.trackAsyncOperation(
      'seo_structured_data_generation',
      () => BundleSizeMonitor.trackImportTime(
        'structured-data-engine',
        () => dynamicSEOImports.loadStructuredDataEngine()
      ),
      { feature: 'structuredData' }
    );
    
    if (structuredDataEngine) {
      return await performanceMonitor.trackAsyncOperation(
        'seo_generate_structured_data',
        () => structuredDataEngine.generateDynamicStructuredData({
          pageName,
          domain: 'familyoffices.vip',
          ...pageData
        }),
        { operation: 'generateDynamicStructuredData' }
      );
    }

    return null;
  } catch (error) {
    console.error('Structured Data Error:', error);
    return null;
  }
}

// Safe keyword optimization
export async function optimizeKeywordsSafely(
  keywords: string[],
  options?: any
): Promise<string[]> {
  try {
    if (!isFeatureEnabled('enableAIKeywordOptimization')) {
      return keywords; // Return original keywords
    }

    // Sanitize keywords input
    const sanitizedKeywords = inputSanitizer.sanitizeKeywords(keywords);
    
    // Use enhanced caching for AI keyword optimization with error handling
    const result = await SEOErrorHandler.safeAIOperation(
      async () => {
        return await aiCacheOperations.optimizeKeywords(
          'familyoffices.vip',
          sanitizedKeywords,
          async () => {
            const keywordEngine = await BundleSizeMonitor.trackImportTime(
              'ai-keyword-engine',
              () => dynamicSEOImports.loadAIKeywordEngine()
            );
            
            if (!keywordEngine) {
              throw new Error('AI keyword engine failed to load');
            }

            return await keywordEngine.optimizeKeywords(
              'familyoffices.vip',
              sanitizedKeywords,
              'hybrid',
              'conversion'
            );
          }
        );
      },
      { recommendations: sanitizedKeywords.map(k => ({ keyword: k })) }, // Fallback structure
      {
        module: 'safe-seo-engine',
        operationName: 'optimizeKeywords'
      }
    );
    
    return result.recommendations?.map((r: any) => r.keyword) || sanitizedKeywords;
  } catch (error) {
    console.error('Keyword Optimization Error:', error);
    return keywords;
  }
}

// Export a safe metadata helper for pages
export const safeMetadata = {
  generate: generateSafeMetadata,
  structuredData: generateSafeStructuredData,
  keywords: optimizeKeywordsSafely,
  default: defaultMetadata,
};