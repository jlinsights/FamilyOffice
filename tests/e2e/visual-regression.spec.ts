/**
 * Visual Regression Testing with Playwright
 * Screenshots and visual comparison for UI consistency
 */
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('homepage visual consistency', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="hero-section"]', {
      timeout: 10000,
    });

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('mobile responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Screenshot mobile view
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('tablet responsive design', async ({ page }) => {
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Screenshot tablet view
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Korean content rendering', async ({ page }) => {
    await page.goto('/');

    // Wait for Korean content to load
    await page.waitForSelector('[data-testid="korean-content"]', {
      timeout: 10000,
    });

    // Test specific Korean content sections
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    // Screenshot Korean content specifically
    await expect(heroSection).toHaveScreenshot('korean-hero-content.png', {
      animations: 'disabled',
    });
  });

  test('financial data display', async ({ page }) => {
    await page.goto('/');

    // Wait for financial data to load
    await page.waitForSelector('[data-testid="financial-widget"]', {
      timeout: 15000,
    });

    const financialWidget = page.locator('[data-testid="financial-widget"]');
    await expect(financialWidget).toBeVisible();

    // Test financial data visualization
    await expect(financialWidget).toHaveScreenshot('financial-widget.png', {
      animations: 'disabled',
    });
  });

  test('navigation menu consistency', async ({ page }) => {
    await page.goto('/');

    // Test main navigation
    const navigation = page.locator('[data-testid="main-navigation"]');
    await expect(navigation).toBeVisible();

    await expect(navigation).toHaveScreenshot('main-navigation.png', {
      animations: 'disabled',
    });

    // Test mobile menu (if applicable)
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuToggle = page.locator('[data-testid="mobile-menu-toggle"]');

    if (await mobileMenuToggle.isVisible()) {
      await mobileMenuToggle.click();
      await page.waitForSelector('[data-testid="mobile-menu"]', {
        timeout: 5000,
      });

      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toHaveScreenshot('mobile-menu.png', {
        animations: 'disabled',
      });
    }
  });

  test('form consistency', async ({ page }) => {
    await page.goto('/contact');

    // Wait for contact form to load
    await page.waitForSelector('[data-testid="contact-form"]', {
      timeout: 10000,
    });

    const contactForm = page.locator('[data-testid="contact-form"]');
    await expect(contactForm).toBeVisible();

    // Test form layout and styling
    await expect(contactForm).toHaveScreenshot('contact-form.png', {
      animations: 'disabled',
    });
  });

  test('dark mode consistency', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Toggle dark mode
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition

      // Screenshot dark mode
      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('critical pages visual consistency', async ({ page }) => {
    const criticalPages = [
      { path: '/', name: 'homepage' },
      { path: '/about', name: 'about' },
      { path: '/contact', name: 'contact' },
      { path: '/faq', name: 'faq' },
      { path: '/membership', name: 'membership' },
    ];

    for (const pageConfig of criticalPages) {
      await page.goto(pageConfig.path);
      await page.waitForLoadState('networkidle');

      // Remove dynamic elements (time, dates, etc.)
      await page.evaluate(() => {
        // Remove elements that change between runs
        const dynamicSelectors = [
          '[data-dynamic="true"]',
          '.timestamp',
          '.live-data',
          '.countdown',
        ];

        dynamicSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });
      });

      await expect(page).toHaveScreenshot(`${pageConfig.name}-page.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('component library consistency', async ({ page }) => {
    // Test if there's a component library/storybook page
    await page.goto('/components');

    if (await page.locator('[data-testid="component-library"]').isVisible()) {
      // Test common components
      const components = [
        '[data-testid="button-component"]',
        '[data-testid="card-component"]',
        '[data-testid="form-component"]',
        '[data-testid="modal-component"]',
      ];

      for (const componentSelector of components) {
        const component = page.locator(componentSelector);
        if (await component.isVisible()) {
          await expect(component).toHaveScreenshot(
            `component-${componentSelector.replace(/\W/g, '-')}.png`,
            { animations: 'disabled' }
          );
        }
      }
    }
  });
});
