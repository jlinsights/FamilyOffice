/**
 * Unit tests for service category modules
 * Validates structure, content, and data integrity across all 8 categories
 */

import { corporateInsuranceRiskCategory } from '@/constants/services/categories/corporate-insurance-risk';
import { corporateStructureGovernance } from '@/constants/services/categories/corporate-structure-governance';
import { hrStartupSupport } from '@/constants/services/categories/hr-startup-support';
import { taxAccounting } from '@/constants/services/categories/tax-accounting';
import { investmentFinance } from '@/constants/services/categories/investment-finance';
import { assetWealthManagement } from '@/constants/services/categories/asset-wealth-management';
import { businessSuccession } from '@/constants/services/categories/business-succession';
import { strategicPlanningMA } from '@/constants/services/categories/strategic-planning-ma';

describe('Service Category Modules', () => {
  // Helper function to validate category structure
  const validateCategoryStructure = (
    category: any,
    categoryName: string
  ) => {
    describe(`${categoryName} structure validation`, () => {
      it('should have required properties', () => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('title');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('services');
      });

      it('should have valid property types', () => {
        expect(typeof category.id).toBe('string');
        expect(typeof category.title).toBe('string');
        expect(typeof category.description).toBe('string');
        // Lucide icons are React components (ForwardRefExoticComponent)
        expect(category.icon).toBeTruthy();
        expect(typeof category.icon).toBe('object');
        expect(Array.isArray(category.services)).toBe(true);
      });

      it('should have non-empty id and title', () => {
        expect(category.id.length).toBeGreaterThan(0);
        expect(category.title.length).toBeGreaterThan(0);
      });

      it('should have at least one service', () => {
        expect(category.services.length).toBeGreaterThan(0);
      });
    });
  };

  // Helper function to validate service structure
  const validateServices = (category: any, categoryName: string) => {
    describe(`${categoryName} services validation`, () => {
      category.services.forEach((service: any, index: number) => {
        describe(`Service ${index + 1}: ${service.title}`, () => {
          it('should have required basic properties', () => {
            expect(service).toHaveProperty('title');
            expect(service).toHaveProperty('description');
            expect(service).toHaveProperty('features');
            expect(service).toHaveProperty('benefits');
            expect(service).toHaveProperty('targetClient');
          });

          it('should have valid basic property types', () => {
            expect(typeof service.title).toBe('string');
            expect(typeof service.description).toBe('string');
            expect(Array.isArray(service.features)).toBe(true);
            expect(Array.isArray(service.benefits)).toBe(true);
            expect(typeof service.targetClient).toBe('string');
          });

          it('should have non-empty arrays', () => {
            expect(service.features.length).toBeGreaterThan(0);
            expect(service.benefits.length).toBeGreaterThan(0);
          });

          it('should have valid detailedContent if present', () => {
            if (service.detailedContent) {
              expect(service.detailedContent).toHaveProperty('overview');
              expect(service.detailedContent).toHaveProperty('process');
              expect(service.detailedContent).toHaveProperty('pricing');
              expect(service.detailedContent).toHaveProperty('timeline');
              expect(service.detailedContent).toHaveProperty('deliverables');

              expect(typeof service.detailedContent.overview).toBe('string');
              expect(Array.isArray(service.detailedContent.process)).toBe(
                true
              );
              expect(typeof service.detailedContent.pricing).toBe('object');
              expect(typeof service.detailedContent.timeline).toBe('string');
              expect(Array.isArray(service.detailedContent.deliverables)).toBe(
                true
              );
            }
          });

          it('should have valid pricing structure if present', () => {
            if (service.detailedContent?.pricing) {
              const pricing = service.detailedContent.pricing;
              expect(pricing).toHaveProperty('type');
              expect(['custom', 'fixed', 'percentage']).toContain(
                pricing.type
              );
              expect(pricing).toHaveProperty('description');
              expect(typeof pricing.description).toBe('string');
            }
          });

          it('should have valid FAQs if present', () => {
            if (service.detailedContent?.faqs) {
              expect(Array.isArray(service.detailedContent.faqs)).toBe(true);
              service.detailedContent.faqs.forEach((faq: any) => {
                expect(faq).toHaveProperty('question');
                expect(faq).toHaveProperty('answer');
                expect(typeof faq.question).toBe('string');
                expect(typeof faq.answer).toBe('string');
                expect(faq.question.length).toBeGreaterThan(0);
                expect(faq.answer.length).toBeGreaterThan(0);
              });
            }
          });

          it('should have valid Korean content', () => {
            // Check for Korean characters (Hangul Unicode range: AC00-D7AF)
            const hasKorean = /[\uAC00-\uD7AF]/.test(service.title);
            expect(hasKorean).toBe(true);
          });
        });
      });
    });
  };

  describe('Corporate Insurance & Risk Management', () => {
    validateCategoryStructure(
      corporateInsuranceRiskCategory,
      'Corporate Insurance & Risk'
    );
    validateServices(
      corporateInsuranceRiskCategory,
      'Corporate Insurance & Risk'
    );

    it('should have correct category id', () => {
      expect(corporateInsuranceRiskCategory.id).toBe(
        'corporate-insurance-risk'
      );
    });

    it('should have 8 services', () => {
      expect(corporateInsuranceRiskCategory.services.length).toBe(8);
    });
  });

  describe('Corporate Structure & Governance', () => {
    validateCategoryStructure(
      corporateStructureGovernance,
      'Corporate Structure & Governance'
    );
    validateServices(
      corporateStructureGovernance,
      'Corporate Structure & Governance'
    );

    it('should have correct category id', () => {
      expect(corporateStructureGovernance.id).toBe(
        'corporate-structure-governance'
      );
    });

    it('should have 6 services', () => {
      expect(corporateStructureGovernance.services.length).toBe(6);
    });
  });

  describe('HR & Startup Support', () => {
    validateCategoryStructure(hrStartupSupport, 'HR & Startup Support');
    validateServices(hrStartupSupport, 'HR & Startup Support');

    it('should have correct category id', () => {
      expect(hrStartupSupport.id).toBe('hr-startup-support');
    });

    it('should have 6 services', () => {
      expect(hrStartupSupport.services.length).toBe(6);
    });
  });

  describe('Tax & Accounting', () => {
    validateCategoryStructure(taxAccounting, 'Tax & Accounting');
    validateServices(taxAccounting, 'Tax & Accounting');

    it('should have correct category id', () => {
      expect(taxAccounting.id).toBe('tax-accounting');
    });

    it('should have 4 services', () => {
      expect(taxAccounting.services.length).toBe(4);
    });
  });

  describe('Investment & Finance', () => {
    validateCategoryStructure(investmentFinance, 'Investment & Finance');
    validateServices(investmentFinance, 'Investment & Finance');

    it('should have correct category id', () => {
      expect(investmentFinance.id).toBe('investment-finance');
    });

    it('should have 4 services', () => {
      expect(investmentFinance.services.length).toBe(4);
    });
  });

  describe('Asset & Wealth Management', () => {
    validateCategoryStructure(
      assetWealthManagement,
      'Asset & Wealth Management'
    );
    validateServices(assetWealthManagement, 'Asset & Wealth Management');

    it('should have correct category id', () => {
      expect(assetWealthManagement.id).toBe('asset-wealth-management');
    });

    it('should have 6 services', () => {
      expect(assetWealthManagement.services.length).toBe(6);
    });
  });

  describe('Business Succession', () => {
    validateCategoryStructure(businessSuccession, 'Business Succession');
    validateServices(businessSuccession, 'Business Succession');

    it('should have correct category id', () => {
      expect(businessSuccession.id).toBe('business-succession');
    });

    it('should have 5 services', () => {
      expect(businessSuccession.services.length).toBe(5);
    });
  });

  describe('Strategic Planning & M&A', () => {
    validateCategoryStructure(strategicPlanningMA, 'Strategic Planning & M&A');
    validateServices(strategicPlanningMA, 'Strategic Planning & M&A');

    it('should have correct category id', () => {
      expect(strategicPlanningMA.id).toBe('strategic-planning-ma');
    });

    it('should have 7 services', () => {
      expect(strategicPlanningMA.services.length).toBe(7);
    });
  });

  describe('Cross-Category Validation', () => {
    const allCategories = [
      corporateInsuranceRiskCategory,
      corporateStructureGovernance,
      hrStartupSupport,
      taxAccounting,
      investmentFinance,
      assetWealthManagement,
      businessSuccession,
      strategicPlanningMA,
    ];

    it('should have unique category IDs', () => {
      const ids = allCategories.map((cat) => cat.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have total of 46 services across all categories', () => {
      const totalServices = allCategories.reduce(
        (sum, cat) => sum + cat.services.length,
        0
      );
      expect(totalServices).toBe(46); // 8+6+6+4+4+6+5+7 = 46
    });

    it('should have unique service titles across all categories', () => {
      const allServiceTitles = allCategories.flatMap((cat) =>
        cat.services.map((service) => service.title)
      );
      const uniqueTitles = new Set(allServiceTitles);
      expect(uniqueTitles.size).toBe(allServiceTitles.length);
    });

    it('should all use Korean language for titles and descriptions', () => {
      allCategories.forEach((category) => {
        const hasKoreanTitle = /[\uAC00-\uD7AF]/.test(category.title);
        const hasKoreanDesc = /[\uAC00-\uD7AF]/.test(category.description);
        expect(hasKoreanTitle).toBe(true);
        expect(hasKoreanDesc).toBe(true);
      });
    });
  });
});
