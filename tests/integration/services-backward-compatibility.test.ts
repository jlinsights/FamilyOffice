/**
 * Integration tests for services module backward compatibility
 * Ensures old import paths continue to work after modularization
 */
// Old import path (should still work through deprecation wrapper)
import {
  SERVICE_CATEGORIES as OLD_SERVICE_CATEGORIES,
  SERVICE_STATS as OLD_SERVICE_STATS,
  generateServiceSlug as oldGenerateServiceSlug,
  getServiceBySlug as oldGetServiceBySlug,
  getAllServicePaths as oldGetAllServicePaths,
  getRelatedServices as oldGetRelatedServices,
  corporateInsuranceRiskCategory as oldCorporateInsuranceRisk,
  corporateStructureGovernance as oldCorporateStructure,
  hrStartupSupport as oldHrStartup,
  taxAccounting as oldTaxAccounting,
  investmentFinance as oldInvestmentFinance,
  assetWealthManagement as oldAssetWealth,
  businessSuccession as oldBusinessSuccession,
  strategicPlanningMA as oldStrategicPlanning,
} from '@/constants/services';
// New import paths (from modular structure)
import {
  SERVICE_CATEGORIES as NEW_SERVICE_CATEGORIES,
  SERVICE_STATS as NEW_SERVICE_STATS,
  generateServiceSlug as newGenerateServiceSlug,
  getServiceBySlug as newGetServiceBySlug,
  getAllServicePaths as newGetAllServicePaths,
  getRelatedServices as newGetRelatedServices,
  corporateInsuranceRiskCategory as newCorporateInsuranceRisk,
  corporateStructureGovernance as newCorporateStructure,
  hrStartupSupport as newHrStartup,
  taxAccounting as newTaxAccounting,
  investmentFinance as newInvestmentFinance,
  assetWealthManagement as newAssetWealth,
  businessSuccession as newBusinessSuccession,
  strategicPlanningMA as newStrategicPlanning,
} from '@/constants/services/index';

describe('Services Module Backward Compatibility', () => {
  describe('SERVICE_CATEGORIES Export', () => {
    it('should export SERVICE_CATEGORIES from old path', () => {
      expect(OLD_SERVICE_CATEGORIES).toBeDefined();
      expect(Array.isArray(OLD_SERVICE_CATEGORIES)).toBe(true);
    });

    it('should have same content as new path', () => {
      expect(OLD_SERVICE_CATEGORIES).toEqual(NEW_SERVICE_CATEGORIES);
      expect(OLD_SERVICE_CATEGORIES.length).toBe(NEW_SERVICE_CATEGORIES.length);
    });

    it('should have same structure as new path', () => {
      OLD_SERVICE_CATEGORIES.forEach((oldCat, index) => {
        const newCat = NEW_SERVICE_CATEGORIES[index]!;
        expect(oldCat.id).toBe(newCat.id);
        expect(oldCat.title).toBe(newCat.title);
        expect(oldCat.description).toBe(newCat.description);
        expect(oldCat.services.length).toBe(newCat.services.length);
      });
    });
  });

  describe('SERVICE_STATS Export', () => {
    it('should export SERVICE_STATS from old path', () => {
      expect(OLD_SERVICE_STATS).toBeDefined();
      expect(typeof OLD_SERVICE_STATS).toBe('object');
    });

    it('should have same content as new path', () => {
      expect(OLD_SERVICE_STATS).toEqual(NEW_SERVICE_STATS);
      expect(OLD_SERVICE_STATS.totalCategories).toBe(
        NEW_SERVICE_STATS.totalCategories
      );
      expect(OLD_SERVICE_STATS.totalServices).toBe(
        NEW_SERVICE_STATS.totalServices
      );
    });
  });

  describe('Utility Functions Export', () => {
    it('should export generateServiceSlug from old path', () => {
      expect(typeof oldGenerateServiceSlug).toBe('function');
    });

    it('should have same behavior as new path', () => {
      const testTitle = '개인/법인 종신보험';
      const oldResult = oldGenerateServiceSlug(testTitle);
      const newResult = newGenerateServiceSlug(testTitle);
      expect(oldResult).toBe(newResult);
    });

    it('should export getServiceBySlug from old path', () => {
      expect(typeof oldGetServiceBySlug).toBe('function');
    });

    it('getServiceBySlug should work identically', () => {
      const oldResult = oldGetServiceBySlug(
        'corporate-insurance-risk',
        '개인-법인-종신보험'
      );
      const newResult = newGetServiceBySlug(
        'corporate-insurance-risk',
        '개인-법인-종신보험'
      );
      expect(oldResult).toEqual(newResult);
      expect(oldResult?.service.title).toBe(newResult?.service.title);
    });

    it('should export getAllServicePaths from old path', () => {
      expect(typeof oldGetAllServicePaths).toBe('function');
    });

    it('getAllServicePaths should return same paths', () => {
      const oldPaths = oldGetAllServicePaths();
      const newPaths = newGetAllServicePaths();
      expect(oldPaths).toEqual(newPaths);
      expect(oldPaths.length).toBe(newPaths.length);
    });

    it('should export getRelatedServices from old path', () => {
      expect(typeof oldGetRelatedServices).toBe('function');
    });

    it('getRelatedServices should return same services', () => {
      const oldRelated = oldGetRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험',
        3
      );
      const newRelated = newGetRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험',
        3
      );
      expect(oldRelated.length).toBe(newRelated.length);
      oldRelated.forEach((service, index) => {
        expect(service.title).toBe(newRelated[index]!.title);
      });
    });
  });

  describe('Category Exports', () => {
    it('should export all categories from old path', () => {
      expect(oldCorporateInsuranceRisk).toBeDefined();
      expect(oldCorporateStructure).toBeDefined();
      expect(oldHrStartup).toBeDefined();
      expect(oldTaxAccounting).toBeDefined();
      expect(oldInvestmentFinance).toBeDefined();
      expect(oldAssetWealth).toBeDefined();
      expect(oldBusinessSuccession).toBeDefined();
      expect(oldStrategicPlanning).toBeDefined();
    });

    it('corporate-insurance-risk should be identical', () => {
      expect(oldCorporateInsuranceRisk).toEqual(newCorporateInsuranceRisk);
      expect(oldCorporateInsuranceRisk.id).toBe(newCorporateInsuranceRisk.id);
    });

    it('corporate-structure-governance should be identical', () => {
      expect(oldCorporateStructure).toEqual(newCorporateStructure);
      expect(oldCorporateStructure.id).toBe(newCorporateStructure.id);
    });

    it('hr-startup-support should be identical', () => {
      expect(oldHrStartup).toEqual(newHrStartup);
      expect(oldHrStartup.id).toBe(newHrStartup.id);
    });

    it('tax-accounting should be identical', () => {
      expect(oldTaxAccounting).toEqual(newTaxAccounting);
      expect(oldTaxAccounting.id).toBe(newTaxAccounting.id);
    });

    it('investment-finance should be identical', () => {
      expect(oldInvestmentFinance).toEqual(newInvestmentFinance);
      expect(oldInvestmentFinance.id).toBe(newInvestmentFinance.id);
    });

    it('asset-wealth-management should be identical', () => {
      expect(oldAssetWealth).toEqual(newAssetWealth);
      expect(oldAssetWealth.id).toBe(newAssetWealth.id);
    });

    it('business-succession should be identical', () => {
      expect(oldBusinessSuccession).toEqual(newBusinessSuccession);
      expect(oldBusinessSuccession.id).toBe(newBusinessSuccession.id);
    });

    it('strategic-planning-ma should be identical', () => {
      expect(oldStrategicPlanning).toEqual(newStrategicPlanning);
      expect(oldStrategicPlanning.id).toBe(newStrategicPlanning.id);
    });
  });

  describe('Data Integrity', () => {
    it('should have 46 total services from both paths', () => {
      const oldTotal = OLD_SERVICE_STATS.totalServices;
      const newTotal = NEW_SERVICE_STATS.totalServices;
      expect(oldTotal).toBe(46);
      expect(newTotal).toBe(46);
      expect(oldTotal).toBe(newTotal);
    });

    it('should have 8 categories from both paths', () => {
      const oldCount = OLD_SERVICE_CATEGORIES.length;
      const newCount = NEW_SERVICE_CATEGORIES.length;
      expect(oldCount).toBe(8);
      expect(newCount).toBe(8);
      expect(oldCount).toBe(newCount);
    });

    it('should maintain service count per category', () => {
      const oldServiceCounts = OLD_SERVICE_STATS.servicesByCategory;
      const newServiceCounts = NEW_SERVICE_STATS.servicesByCategory;

      oldServiceCounts.forEach((oldCat, index) => {
        const newCat = newServiceCounts[index]!;
        expect(oldCat.count).toBe(newCat.count);
        expect(oldCat.id).toBe(newCat.id);
      });
    });
  });

  describe('Functional Equivalence', () => {
    it('should generate identical slugs for all services', () => {
      const paths = oldGetAllServicePaths();
      paths.forEach(path => {
        const oldService = oldGetServiceBySlug(path.category, path.service);
        const newService = newGetServiceBySlug(path.category, path.service);

        expect(oldService?.service.title).toBe(newService?.service.title);
      });
    });

    it('should return identical related services for all categories', () => {
      OLD_SERVICE_CATEGORIES.forEach(category => {
        const firstService = category.services[0];
        if (firstService) {
          const oldRelated = oldGetRelatedServices(
            category.id,
            firstService.title
          );
          const newRelated = newGetRelatedServices(
            category.id,
            firstService.title
          );

          expect(oldRelated.length).toBe(newRelated.length);
        }
      });
    });
  });

  describe('Import Path Validation', () => {
    it('should successfully import from @/constants/services', async () => {
      const oldModule = await import('@/constants/services');
      expect(oldModule).toBeDefined();
      expect(oldModule.SERVICE_CATEGORIES).toBeDefined();
    });

    it('should successfully import from @/constants/services/index', async () => {
      const newModule = await import('@/constants/services/index');
      expect(newModule).toBeDefined();
      expect(newModule.SERVICE_CATEGORIES).toBeDefined();
    });

    it('both import paths should provide same exports', async () => {
      const oldModule = await import('@/constants/services');
      const newModule = await import('@/constants/services/index');

      expect(Object.keys(oldModule).sort()).toEqual(
        Object.keys(newModule).sort()
      );
    });
  });
});
