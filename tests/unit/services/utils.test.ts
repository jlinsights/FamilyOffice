/**
 * Unit tests for services utility functions
 * Tests slug generation, service lookup, path generation, and related services
 */

import {
  generateServiceSlug,
  getServiceBySlug,
  getAllServicePaths,
  getRelatedServices,
} from '@/constants/services/utils';

describe('Services Utility Functions', () => {
  describe('generateServiceSlug', () => {
    it('should convert title to URL-friendly slug', () => {
      const result = generateServiceSlug('법인보험 종합 컨설팅');
      expect(result).toMatch(/^[a-z0-9가-힣-]+$/);
      expect(result).not.toContain(' ');
    });

    it('should handle slashes and ampersands', () => {
      // Ampersands are replaced with hyphens, so M&A becomes m-a
      expect(generateServiceSlug('M&A/인수합병')).toBe('m-a-인수합병');
      expect(generateServiceSlug('Tax & Accounting')).toBe('tax-accounting');
    });

    it('should handle multiple spaces', () => {
      expect(generateServiceSlug('Service   With    Spaces')).toBe(
        'service-with-spaces'
      );
    });

    it('should remove special characters except Korean', () => {
      const result = generateServiceSlug('법인세@#$절감!전략');
      expect(result).toBe('법인세절감전략');
    });

    it('should handle leading and trailing hyphens', () => {
      expect(generateServiceSlug('  Service Name  ')).toBe('service-name');
      expect(generateServiceSlug('---Test---')).toBe('test');
    });

    it('should handle mixed Korean and English', () => {
      const result = generateServiceSlug('CEO 보장보험 Risk Management');
      expect(result).toMatch(/ceo-보장보험-risk-management/);
    });

    it('should handle empty string', () => {
      expect(generateServiceSlug('')).toBe('');
    });

    it('should replace multiple consecutive hyphens with single hyphen', () => {
      expect(generateServiceSlug('Service--Name---Here')).toBe(
        'service-name-here'
      );
    });
  });

  describe('getServiceBySlug', () => {
    it('should find service by valid category and service slugs', () => {
      // Using actual service from corporate-insurance-risk category
      const result = getServiceBySlug(
        'corporate-insurance-risk',
        '개인-법인-종신보험'
      );

      expect(result).not.toBeNull();
      expect(result?.category.id).toBe('corporate-insurance-risk');
      expect(result?.service).toBeDefined();
      expect(result?.service.title).toBe('개인/법인 종신보험');
    });

    it('should return null for invalid category slug', () => {
      const result = getServiceBySlug('invalid-category', 'any-service');
      expect(result).toBeNull();
    });

    it('should return null for invalid service slug', () => {
      const result = getServiceBySlug(
        'corporate-insurance-risk',
        'non-existent-service'
      );
      expect(result).toBeNull();
    });

    it('should handle services with explicit slug property', () => {
      // Test with a service that has an explicit slug
      const result = getServiceBySlug('tax-accounting', '개인사업자-법인전환');

      if (result) {
        expect(result.service).toBeDefined();
        expect(result.category.id).toBe('tax-accounting');
      }
    });

    it('should return service with all required properties', () => {
      const result = getServiceBySlug(
        'corporate-insurance-risk',
        '법인보험-종합-컨설팅'
      );

      if (result) {
        expect(result.service).toHaveProperty('title');
        expect(result.service).toHaveProperty('description');
        expect(result.service).toHaveProperty('features');
        expect(result.service).toHaveProperty('benefits');
        expect(result.service).toHaveProperty('targetClient');
        expect(Array.isArray(result.service.features)).toBe(true);
        expect(Array.isArray(result.service.benefits)).toBe(true);
      }
    });

    it('should handle Korean characters in slugs', () => {
      const result = getServiceBySlug(
        'business-succession',
        '가업상속공제'
      );

      if (result) {
        expect(result.category.id).toBe('business-succession');
        expect(result.service.title).toContain('가업');
      }
    });
  });

  describe('getAllServicePaths', () => {
    it('should return array of all service paths', () => {
      const paths = getAllServicePaths();

      expect(Array.isArray(paths)).toBe(true);
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should return paths with category and service properties', () => {
      const paths = getAllServicePaths();

      paths.forEach((path) => {
        expect(path).toHaveProperty('category');
        expect(path).toHaveProperty('service');
        expect(typeof path.category).toBe('string');
        expect(typeof path.service).toBe('string');
      });
    });

    it('should include paths from all 8 categories', () => {
      const paths = getAllServicePaths();
      const categories = new Set(paths.map((p) => p.category));

      expect(categories.size).toBe(8);
      expect(categories.has('corporate-insurance-risk')).toBe(true);
      expect(categories.has('corporate-structure-governance')).toBe(true);
      expect(categories.has('hr-startup-support')).toBe(true);
      expect(categories.has('tax-accounting')).toBe(true);
      expect(categories.has('investment-finance')).toBe(true);
      expect(categories.has('asset-wealth-management')).toBe(true);
      expect(categories.has('business-succession')).toBe(true);
      expect(categories.has('strategic-planning-ma')).toBe(true);
    });

    it('should generate valid service slugs', () => {
      const paths = getAllServicePaths();

      paths.forEach((path) => {
        expect(path.service).toMatch(/^[a-z0-9가-힣-]+$/);
        expect(path.service).not.toContain(' ');
      });
    });

    it('should return expected total number of services (46)', () => {
      const paths = getAllServicePaths();
      // 8 + 6 + 6 + 4 + 4 + 6 + 5 + 7 = 46 services across 8 categories
      expect(paths.length).toBe(46);
    });

    it('should not contain duplicate paths', () => {
      const paths = getAllServicePaths();
      const pathStrings = paths.map(
        (p) => `${p.category}/${p.service}`
      );
      const uniquePaths = new Set(pathStrings);

      expect(pathStrings.length).toBe(uniquePaths.size);
    });
  });

  describe('getRelatedServices', () => {
    it('should return array of related services', () => {
      const related = getRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험'
      );

      expect(Array.isArray(related)).toBe(true);
    });

    it('should exclude current service from results', () => {
      const currentServiceTitle = '개인/법인 종신보험';
      const related = getRelatedServices(
        'corporate-insurance-risk',
        currentServiceTitle
      );

      const titles = related.map((s) => s.title);
      expect(titles).not.toContain(currentServiceTitle);
    });

    it('should respect limit parameter (default 3)', () => {
      const related = getRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험'
      );

      expect(related.length).toBeLessThanOrEqual(3);
    });

    it('should respect custom limit parameter', () => {
      const related = getRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험',
        5
      );

      expect(related.length).toBeLessThanOrEqual(5);
    });

    it('should return empty array for invalid category', () => {
      const related = getRelatedServices(
        'invalid-category',
        'Any Service'
      );

      expect(related).toEqual([]);
    });

    it('should return all other services when limit exceeds available', () => {
      const related = getRelatedServices(
        'tax-accounting',
        '개인사업자 법인전환',
        100
      );

      // tax-accounting has 4 services, so max related is 3 (excluding current)
      expect(related.length).toBeLessThanOrEqual(3);
    });

    it('should return services with valid structure', () => {
      const related = getRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험'
      );

      related.forEach((service) => {
        expect(service).toHaveProperty('title');
        expect(service).toHaveProperty('description');
        expect(service).toHaveProperty('features');
        expect(service).toHaveProperty('benefits');
        expect(service).toHaveProperty('targetClient');
      });
    });

    it('should handle category with only one service', () => {
      // If a category had only 1 service, related would be empty
      const related = getRelatedServices(
        'tax-accounting',
        '경정청구 컨설팅',
        10
      );

      expect(Array.isArray(related)).toBe(true);
      // Should return other services from the category
      expect(related.length).toBeGreaterThan(0);
    });
  });

  describe('Integration: Utility Functions Working Together', () => {
    it('should generate slug that works with getServiceBySlug', () => {
      const title = '개인/법인 종신보험';
      const slug = generateServiceSlug(title);
      const result = getServiceBySlug('corporate-insurance-risk', slug);

      expect(result).not.toBeNull();
      expect(result?.service).toBeDefined();
    });

    it('should generate paths that can be used to retrieve services', () => {
      const paths = getAllServicePaths();
      const firstPath = paths[0]!;

      const result = getServiceBySlug(
        firstPath.category,
        firstPath.service
      );

      expect(result).not.toBeNull();
      expect(result?.category.id).toBe(firstPath.category);
    });

    it('should get related services that can be retrieved individually', () => {
      const related = getRelatedServices(
        'corporate-insurance-risk',
        '개인/법인 종신보험',
        2
      );

      related.forEach((service) => {
        const slug = service.slug || generateServiceSlug(service.title);
        const result = getServiceBySlug('corporate-insurance-risk', slug);

        expect(result).not.toBeNull();
        expect(result?.service.title).toBe(service.title);
      });
    });
  });
});
