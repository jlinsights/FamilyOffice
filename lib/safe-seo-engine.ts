// Safe wrapper for SEO engine with feature flags and error handling
import { Metadata } from 'next';
import { isFeatureEnabled } from './feature-flags';
import { SEOErrorBoundary } from '@/components/seo-error-boundary';

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

// Lazy import for advanced SEO features
const loadAdvancedSEO = () => {
  if (isFeatureEnabled('enableAdvancedSEO')) {
    return import('./advanced-seo-engine');
  }
  return null;
};

const loadAIKeywords = () => {
  if (isFeatureEnabled('enableAIKeywordOptimization')) {
    return import('./ai-keyword-optimization-engine');
  }
  return null;
};

const loadStructuredData = () => {
  if (isFeatureEnabled('enableDynamicStructuredData')) {
    return import('./dynamic-structured-data');
  }
  return null;
};

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

    // Try to load and use advanced SEO engine
    const advancedSEOModule = await loadAdvancedSEO();
    if (advancedSEOModule) {
      const { advancedSEOEngine } = advancedSEOModule;
      const metadata = await advancedSEOEngine.generateContextualMetadata(
        options?.domain || 'familyoffices.vip',
        pageName,
        { 
          domain: options?.domain || 'familyoffices.vip',
          userAgent: 'safe-seo-engine',
          referrer: '',
          location: 'KR',
          timeOfDay: Date.now(),
          deviceType: 'desktop',
          userSegment: 'individual'
        }
      );
      
      return {
        ...metadata,
        _isSafe: true,
        _fallbackUsed: false,
      };
    }

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

    const structuredDataModule = await loadStructuredData();
    if (structuredDataModule) {
      const { dynamicStructuredDataEngine } = structuredDataModule;
      return await dynamicStructuredDataEngine.generateDynamicStructuredData({
        pageName,
        domain: 'familyoffices.vip',
        ...pageData
      });
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

    const keywordModule = await loadAIKeywords();
    if (keywordModule) {
      const { aiKeywordOptimizationEngine } = keywordModule;
      const result = await aiKeywordOptimizationEngine.optimizeKeywords(
        'familyoffices.vip',
        keywords,
        'hybrid',
        'conversion'
      );
      return result.recommendations?.map(r => r.keyword) || keywords;
    }

    return keywords;
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