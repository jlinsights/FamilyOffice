import { generateAIOptimizedContent } from './modules/ai-content';
import { generateBreadcrumbStructuredData } from './modules/breadcrumbs';
import {
    generateAIOptimizedSchema,
    generateContactPageSchema,
    generateFAQPageSchema,
    generateLocalBusinessSchema,
    generateOrganizationSchema,
    generateServiceSchema,
    generateWebSiteSchema,
    getBaseData
} from './modules/schema-generators';
import { generateSitemapUrls } from './modules/sitemap';

// Re-export specific generators if needed directly
export { generateAIOptimizedContent, generateBreadcrumbStructuredData, generateSitemapUrls };

// Main entry point for generating structured data
export function generateStructuredData(
  type:
    | 'Organization'
    | 'WebSite'
    | 'Service'
    | 'FAQPage'
    | 'LocalBusiness'
    | 'BreadcrumbList'
    | 'AIOptimized'
    | 'ContactPage',
  faqItems?: { question: string; answer: string }[]
) {
  switch (type) {
    case 'Organization':
      return generateOrganizationSchema();
    case 'WebSite':
      return generateWebSiteSchema();
    case 'Service':
      return generateServiceSchema();
    case 'FAQPage':
      return generateFAQPageSchema(faqItems);
    case 'LocalBusiness':
      return generateLocalBusinessSchema();
    case 'BreadcrumbList':
      return generateBreadcrumbStructuredData(); // Note: This might need arguments if called from here, but usually breadcrumbs are called specifically with path
    case 'AIOptimized':
      return generateAIOptimizedSchema();
    case 'ContactPage':
      return generateContactPageSchema();
    default:
      return getBaseData(type);
  }
}
