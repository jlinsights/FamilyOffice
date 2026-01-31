/**
 * Visual Regression Test Configuration
 * Custom setup for consistent screenshot testing
 */
import { devices, expect, type TestType } from '@playwright/test';

// Custom viewports for testing
const customViewports = {
  // Mobile devices
  'iPhone-SE': { width: 375, height: 667 },
  'iPhone-12': { width: 390, height: 844 },
  'iPhone-12-Pro-Max': { width: 428, height: 926 },
  'Samsung-Galaxy-S21': { width: 360, height: 800 },

  // Tablet devices
  iPad: { width: 768, height: 1024 },
  'iPad-Pro': { width: 1024, height: 1366 },
  'Surface-Pro': { width: 1368, height: 912 },

  // Desktop sizes
  'Desktop-HD': { width: 1280, height: 720 },
  'Desktop-FHD': { width: 1920, height: 1080 },
  'Desktop-2K': { width: 2560, height: 1440 },

  // Korean market specific devices
  'Korean-Mobile-Standard': { width: 360, height: 780 }, // Common Korean Android
  'Korean-Tablet': { width: 800, height: 1280 }, // Common Korean tablet
} as const;

type CustomFixture = {
  setViewport: (viewport: keyof typeof customViewports) => Promise<void>;
  disableAnimations: () => Promise<void>;
  waitForKoreanContent: () => Promise<void>;
  takeStableScreenshot: (name: string, options?: any) => Promise<void>;
};

// Extend expect with custom matchers
expect.extend({
  async toHaveKoreanText(locator, expectedText?: string) {
    const actualText = await locator.textContent();
    const hasKorean = /[가-힣]/.test(actualText || '');

    if (expectedText) {
      return {
        pass: actualText?.includes(expectedText) && hasKorean,
        message: () =>
          hasKorean
            ? `Expected Korean text "${expectedText}" but found "${actualText}"`
            : `Expected Korean text but found no Korean characters`,
      };
    }

    return {
      pass: hasKorean,
      message: () =>
        hasKorean
          ? `Expected no Korean text but found: "${actualText}"`
          : `Expected Korean text but found none`,
    };
  },
});

// Visual test utilities
export const visualTestUtils = {
  // Disable animations for consistent screenshots
  async disableAnimations(page: any) {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
          scroll-behavior: auto !important;
        }
      `,
    });
  },

  // Wait for stable state
  async waitForStableState(page: any, timeout = 5000) {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100); // Small delay for any final renders

    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(
            img =>
              new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
              })
          )
      );
    });

    // Wait for fonts to load
    await page.evaluate(() => {
      return document.fonts.ready;
    });
  },

  // Hide dynamic content that shouldn't be compared
  async hideDynamicElements(page: any) {
    await page.evaluate(() => {
      const selectors = [
        '[data-timestamp]',
        '[data-live="true"]',
        '.countdown',
        '.live-time',
        '.real-time-price',
        '.notification-badge',
        '.loading-spinner',
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.visibility = 'hidden';
        });
      });
    });
  },

  // Standardize screenshot taking
  async takeStandardScreenshot(page: any, name: string, options = {}) {
    const defaultOptions = {
      fullPage: true,
      animations: 'disabled',
      mask: [], // Elements to mask
      maskColor: '#ff0000', // Red for visibility
      ...options,
    };

    await expect(page).toHaveScreenshot(name, defaultOptions);
  },
};

// Test data for Korean content
export const koreanTestData = {
  expectedTexts: ['FamilyOffice S', '자산관리', '성공적인', '전문가', '컨설팅'],

  criticalElements: [
    '[data-testid="hero-section"]',
    '[data-testid="main-navigation"]',
    '[data-testid="korean-content"]',
    '[data-testid="cta-button"]',
  ],

  forms: [
    '[data-testid="contact-form"]',
    '[data-testid="consultation-form"]',
    '[data-testid="newsletter-form"]',
  ],
};

// Error handling for visual tests
export const visualTestErrorHandling = {
  async handleScreenshotError(page: any, testName: string, error: any) {
    console.error(`Screenshot failed for ${testName}:`, error);

    // Take a debug screenshot
    try {
      await page.screenshot({
        path: `test-results/debug-${testName}-${Date.now()}.png`,
        fullPage: true,
      });
    } catch (debugError) {
      console.error('Debug screenshot also failed:', debugError);
    }
  },

  async retryScreenshot(page: any, testName: string, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await visualTestUtils.takeStandardScreenshot(page, testName);
        return;
      } catch (error) {
        console.warn(`Screenshot attempt ${i + 1} failed:`, error);
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(1000); // Wait before retry
      }
    }
  },
};

export default visualTestUtils;
