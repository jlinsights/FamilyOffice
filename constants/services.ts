/**
 * @deprecated This file has been split into multiple modules for better maintainability.
 *
 * Please import from '@/constants/services' instead, which now uses the modular structure:
 * - constants/services/types.ts - Type definitions
 * - constants/services/seo-mapping.ts - SEO mappings
 * - constants/services/industry-services.ts - Industry-specific services
 * - constants/services/utils.ts - Helper functions
 * - constants/services/categories/*.ts - Service categories by domain
 *
 * All exports are still available from this file for backward compatibility,
 * but this file will be removed in a future version.
 *
 * Migration example:
 *
 * Before:
 *   import { SERVICE_CATEGORIES } from '@/constants/services';
 *
 * After (recommended):
 *   import { SERVICE_CATEGORIES } from '@/constants/services';
 *   // or import specific categories:
 *   import { corporateInsuranceRiskCategory } from '@/constants/services';
 *
 * All imports continue to work as before, but now benefit from:
 * - Better IDE performance (smaller file chunks)
 * - Improved maintainability (focused modules)
 * - Enhanced code splitting (tree-shaking optimization)
 */

// Re-export everything from the new modular structure
export * from './services/index';
