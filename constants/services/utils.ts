import type { ServiceCategory, DetailedService } from './types';
import { corporateInsuranceRiskCategory } from './categories/corporate-insurance-risk';
import { corporateStructureGovernance } from './categories/corporate-structure-governance';
import { hrStartupSupport } from './categories/hr-startup-support';
import { taxAccounting } from './categories/tax-accounting';
import { investmentFinance } from './categories/investment-finance';
import { assetWealthManagement } from './categories/asset-wealth-management';
import { businessSuccession } from './categories/business-succession';
import { strategicPlanningMA } from './categories/strategic-planning-ma';

// Local reference to service categories for utility functions
const SERVICE_CATEGORIES: ServiceCategory[] = [
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
 * Generate URL-friendly slug from service title
 */
export function generateServiceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[/&]/g, '-') // Replace slashes and ampersands
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9가-힣-]/g, '') // Remove special chars except Korean
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get service by category and service slugs
 */
export function getServiceBySlug(
  categorySlug: string,
  serviceSlug: string
): { category: ServiceCategory; service: DetailedService } | null {
  const category = SERVICE_CATEGORIES.find((cat) => cat.id === categorySlug);
  if (!category) return null;

  const service = category.services.find(
    (svc) => (svc.slug || generateServiceSlug(svc.title)) === serviceSlug
  );
  if (!service) return null;

  return { category, service };
}

/**
 * Get all possible service paths for static generation
 */
export function getAllServicePaths(): Array<{
  category: string;
  service: string;
}> {
  const paths: Array<{ category: string; service: string }> = [];

  for (const category of SERVICE_CATEGORIES) {
    for (const service of category.services) {
      paths.push({
        category: category.id,
        service: service.slug || generateServiceSlug(service.title),
      });
    }
  }

  return paths;
}

/**
 * Get related services (same category, different service)
 */
export function getRelatedServices(
  categoryId: string,
  currentServiceTitle: string,
  limit: number = 3
): DetailedService[] {
  const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) return [];

  return category.services
    .filter((svc) => svc.title !== currentServiceTitle)
    .slice(0, limit);
}
