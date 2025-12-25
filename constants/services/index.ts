/**
 * FamilyOffice S 서비스 카탈로그 통합 모듈
 *
 * 기존 3,340 라인의 services.ts를 유지보수 가능한 모듈로 분리
 * 각 모듈은 1,000 라인 이하로 유지하여 IDE 성능 최적화
 */

// Type definitions
export type { ServiceCategory, DetailedService, IndustryService } from './types';

// SEO mappings
export { SEO_PAGE_MAPPING } from './seo-mapping';

// Industry-specific services
export { INDUSTRY_SERVICES } from './industry-services';

// Utility functions
export {
  generateServiceSlug,
  getServiceBySlug,
  getAllServicePaths,
  getRelatedServices,
} from './utils';

// Service categories
export { corporateInsuranceRiskCategory } from './categories/corporate-insurance-risk';
export { corporateStructureGovernance } from './categories/corporate-structure-governance';
export { hrStartupSupport } from './categories/hr-startup-support';
export { taxAccounting } from './categories/tax-accounting';
export { investmentFinance } from './categories/investment-finance';
export { assetWealthManagement } from './categories/asset-wealth-management';
export { businessSuccession } from './categories/business-succession';
export { strategicPlanningMA } from './categories/strategic-planning-ma';

// Aggregated service categories array
import { corporateInsuranceRiskCategory } from './categories/corporate-insurance-risk';
import { corporateStructureGovernance } from './categories/corporate-structure-governance';
import { hrStartupSupport } from './categories/hr-startup-support';
import { taxAccounting } from './categories/tax-accounting';
import { investmentFinance } from './categories/investment-finance';
import { assetWealthManagement } from './categories/asset-wealth-management';
import { businessSuccession } from './categories/business-succession';
import { strategicPlanningMA } from './categories/strategic-planning-ma';
import type { ServiceCategory } from './types';

/**
 * 전체 서비스 카테고리 배열
 * 각 카테고리는 관련 서비스들을 그룹화하여 제공
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  corporateInsuranceRiskCategory,
  corporateStructureGovernance,
  hrStartupSupport,
  taxAccounting,
  investmentFinance,
  assetWealthManagement,
  businessSuccession,
  strategicPlanningMA,
];

/**
 * 전체 서비스 개수 통계
 */
export const SERVICE_STATS = {
  totalCategories: SERVICE_CATEGORIES.length,
  totalServices: SERVICE_CATEGORIES.reduce(
    (sum, category) => sum + category.services.length,
    0
  ),
  servicesByCategory: SERVICE_CATEGORIES.map((category) => ({
    id: category.id,
    title: category.title,
    count: category.services.length,
  })),
};
