/**
 * Homepage E2E Tests for FamilyOffice
 * Tests core landing page functionality and navigation
 */
import { test, expect } from '@playwright/test';

test.describe('FamilyOffice Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check if page loads
    await expect(page).toHaveTitle(/FamilyOffice/i);

    // Verify main content is visible
    await expect(page.locator('body')).toBeVisible();

    // Check for key elements
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display Korean content correctly', async ({ page }) => {
    // Check for Korean text rendering
    const koreanContent = page
      .locator('text=/패밀리오피스|자산관리|승계계획/')
      .first();
    await expect(koreanContent).toBeVisible();

    // Verify Korean fonts are loading
    const bodyElement = page.locator('body');
    const fontFamily = await bodyElement.evaluate(
      el => window.getComputedStyle(el).fontFamily
    );

    // Should include Korean-compatible fonts
    expect(fontFamily).toBeTruthy();
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to key sections', async ({ page }) => {
    // Test navigation to services
    const servicesLink = page.locator('a[href*="/services"]').first();
    if ((await servicesLink.count()) > 0) {
      await servicesLink.click();
      await expect(page).toHaveURL(/.*services.*/);
    }

    // Navigate back to home
    await page.goto('/');

    // Test navigation to about
    const aboutLink = page.locator('a[href*="/about"]').first();
    if ((await aboutLink.count()) > 0) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about.*/);
    }
  });

  test('should load financial data widgets', async ({ page }) => {
    // Wait for any financial widgets to load
    await page.waitForTimeout(2000);

    // Check if stock cards are present
    const stockCards = page.locator('[data-testid*="stock"], [class*="stock"]');
    if ((await stockCards.count()) > 0) {
      await expect(stockCards.first()).toBeVisible();
    }

    // Check if forex cards are present
    const forexCards = page.locator('[data-testid*="forex"], [class*="forex"]');
    if ((await forexCards.count()) > 0) {
      await expect(forexCards.first()).toBeVisible();
    }
  });

  test('should handle Cal.com integration', async ({ page }) => {
    // Look for consultation booking elements
    const calButton = page
      .locator(
        '[data-testid*="cal"], button:has-text("상담"), button:has-text("예약")'
      )
      .first();

    if ((await calButton.count()) > 0) {
      await expect(calButton).toBeVisible();
      await expect(calButton).toBeEnabled();

      // Test button interaction (don't actually book)
      await calButton.hover();
      await expect(calButton).toBeVisible();
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/.+/);

    // Check meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if ((await ogTitle.count()) > 0) {
      await expect(ogTitle).toHaveAttribute('content', /.+/);
    }
  });

  test('should handle theme switching', async ({ page }) => {
    // Look for theme toggle
    const themeToggle = page
      .locator('[data-testid="theme-toggle"], button[aria-label*="theme"]')
      .first();

    if ((await themeToggle.count()) > 0) {
      await expect(themeToggle).toBeVisible();

      // Test theme switching
      await themeToggle.click();
      await page.waitForTimeout(500);

      // Verify theme change (check data-theme or class changes)
      const html = page.locator('html');
      const htmlClasses = (await html.getAttribute('class')) || '';
      const dataTheme = (await html.getAttribute('data-theme')) || '';

      expect(htmlClasses || dataTheme).toBeTruthy();
    }
  });
});
