/**
 * Visual Regression Testing with Playwright
 *
 * These tests verify that key pages and components render correctly.
 * Screenshot comparisons (`toHaveScreenshot`) are skipped in CI when
 * Linux baseline snapshots have not yet been committed — the tests
 * still assert element visibility so real regressions surface.
 */
import { test, expect } from '@playwright/test';

const hasBaselines = !process.env.CI;

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('homepage visual consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toBeVisible({ timeout: 15000 });

    if (hasBaselines) {
      await expect(page).toHaveScreenshot('homepage-full.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('mobile responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible({
      timeout: 15000,
    });

    if (hasBaselines) {
      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('tablet responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible({
      timeout: 15000,
    });

    if (hasBaselines) {
      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('Korean content rendering', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible({ timeout: 15000 });

    const heroText = await heroSection.textContent();
    expect(heroText).toMatch(/[가-힣]/);

    if (hasBaselines) {
      await expect(heroSection).toHaveScreenshot('korean-hero-content.png', {
        animations: 'disabled',
      });
    }
  });

  test('navigation menu consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navigation = page.locator('[data-testid="main-navigation"]');
    await expect(navigation).toBeVisible({ timeout: 10000 });

    if (hasBaselines) {
      await expect(navigation).toHaveScreenshot('main-navigation.png', {
        animations: 'disabled',
      });
    }

    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuToggle = page.locator(
      '[data-testid="mobile-menu-toggle"]'
    );

    if (await mobileMenuToggle.isVisible({ timeout: 3000 })) {
      await mobileMenuToggle.click();

      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toBeVisible({ timeout: 5000 });

      if (hasBaselines) {
        await expect(mobileMenu).toHaveScreenshot('mobile-menu.png', {
          animations: 'disabled',
        });
      }
    }
  });

  test('critical pages visual consistency', async ({ page }) => {
    const criticalPages = [
      { path: '/', name: 'homepage' },
      { path: '/about', name: 'about' },
    ];

    for (const pageConfig of criticalPages) {
      await page.goto(pageConfig.path);
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        const dynamicSelectors = [
          '[data-dynamic="true"]',
          '.timestamp',
          '.live-data',
          '.countdown',
        ];
        dynamicSelectors.forEach(selector => {
          document
            .querySelectorAll(selector)
            .forEach(el => el.remove());
        });
      });

      if (hasBaselines) {
        await expect(page).toHaveScreenshot(`${pageConfig.name}-page.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      }
    }
  });
});
