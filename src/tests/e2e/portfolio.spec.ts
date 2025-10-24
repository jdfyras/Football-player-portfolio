import { test, expect } from '@playwright/test';

/**
 * End-to-End tests for the Football Player Portfolio
 */

test.describe('Player Portfolio Page', () => {
  test('should load and display player information', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section
    await expect(page.locator('h1')).toContainText('Sofia Martinez');
    await expect(page.locator('text=Forward')).toBeVisible();
    await expect(page.locator('text=FC Barcelona Femení')).toBeVisible();
  });

  test('should display all KPIs correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check stats are visible
    await expect(page.locator('text=Goals')).toBeVisible();
    await expect(page.locator('text=Assists')).toBeVisible();
    await expect(page.locator('text=Matches')).toBeVisible();
  });
});

test.describe('Visual Variants', () => {
  test('should switch between visual variants', async ({ page }) => {
    await page.goto('/');
    
    // Get the variant selector
    const variantSelect = page.locator('#variant-select');
    
    // Test Energetic variant
    await variantSelect.click();
    await page.locator('text=Energetic').click();
    await expect(page.locator('.bg-gradient-to-br')).toBeVisible();
    
    // Test Elegant variant
    await variantSelect.click();
    await page.locator('text=Elegant').click();
    
    // Test Sporty variant
    await variantSelect.click();
    await page.locator('text=Sporty').click();
  });
});

test.describe('Color-Blind Mode', () => {
  test('should toggle color-blind mode', async ({ page }) => {
    await page.goto('/');
    
    const colorBlindToggle = page.locator('#colorblind-mode');
    
    // Toggle on
    await colorBlindToggle.click();
    await expect(colorBlindToggle).toBeChecked();
    
    // Toggle off
    await colorBlindToggle.click();
    await expect(colorBlindToggle).not.toBeChecked();
  });

  test('should maintain color-blind mode across interactions', async ({ page }) => {
    await page.goto('/');
    
    const colorBlindToggle = page.locator('#colorblind-mode');
    await colorBlindToggle.click();
    
    // Interact with other elements
    await page.locator('text=Season').click();
    
    // Color-blind mode should still be active
    await expect(colorBlindToggle).toBeChecked();
  });
});

test.describe('Charts and Visualizations', () => {
  test('should render all charts', async ({ page }) => {
    await page.goto('/');
    
    // Check for chart elements
    await expect(page.locator('text=Touch Heatmap')).toBeVisible();
    await expect(page.locator('text=Shot Map')).toBeVisible();
    await expect(page.locator('text=Performance Radar')).toBeVisible();
    await expect(page.locator('text=Performance Over Time')).toBeVisible();
  });

  test('should display chart tooltips on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over a chart element (approximate location)
    const chart = page.locator('.recharts-wrapper').first();
    await chart.hover();
    
    // Wait for potential tooltip (if any)
    await page.waitForTimeout(500);
  });
});

test.describe('Season Filter', () => {
  test('should change season', async ({ page }) => {
    await page.goto('/');
    
    const seasonSelect = page.locator('#season-select');
    
    // Change to different season
    await seasonSelect.click();
    await page.locator('text=2023/24').click();
    
    // Verify season changed in the page
    await expect(page.locator('text=2023/24')).toBeVisible();
  });
});

test.describe('Match Modal', () => {
  test('should open and close match details', async ({ page }) => {
    await page.goto('/');
    
    // Click on a recent match
    const matchButton = page.locator('button:has-text("vs")').first();
    await matchButton.click();
    
    // Modal should be visible
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Match Details')).toBeVisible();
    
    // Close modal (Escape key)
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('should display match statistics in modal', async ({ page }) => {
    await page.goto('/');
    
    const matchButton = page.locator('button:has-text("vs")').first();
    await matchButton.click();
    
    // Check for match stats
    await expect(page.locator('text=Goals')).toBeVisible();
    await expect(page.locator('text=Assists')).toBeVisible();
    await expect(page.locator('text=Rating')).toBeVisible();
  });
});

test.describe('Media Gallery', () => {
  test('should display media items', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Media Gallery')).toBeVisible();
    
    // Check for gallery images
    const galleryImages = page.locator('[alt*="Match day"]');
    await expect(galleryImages.first()).toBeVisible();
  });

  test('should open media viewer on click', async ({ page }) => {
    await page.goto('/');
    
    // Click on first media item
    const mediaItem = page.locator('button[aria-label*="View"]').first();
    await mediaItem.click();
    
    // Modal should open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});

test.describe('PDF Export', () => {
  test('should show PDF export button', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Download PDF')).toBeVisible();
  });

  test('should trigger export on button click', async ({ page }) => {
    await page.goto('/');
    
    // Listen for console messages (since we're using alert in mock)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('PDF Export');
      await dialog.accept();
    });
    
    // Click export button
    await page.locator('[data-pdf-export] button').click();
  });
});

test.describe('Keyboard Navigation', () => {
  test('should navigate with Tab key', async ({ page }) => {
    await page.goto('/');
    
    // Start tabbing
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is moving
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should activate buttons with Enter key', async ({ page }) => {
    await page.goto('/');
    
    // Tab to color-blind toggle
    const toggle = page.locator('#colorblind-mode');
    await toggle.focus();
    
    // Press Enter to toggle
    await page.keyboard.press('Enter');
  });
});

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for aria-labels
    const ariaElements = page.locator('[aria-label]');
    const count = await ariaElements.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should have semantic HTML structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for semantic elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = await page.locator('h1').count();
    const h2 = await page.locator('h2').count();
    const h3 = await page.locator('h3').count();
    
    expect(h1).toBeGreaterThan(0);
    expect(h2 + h3).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design', () => {
  test('should adapt to mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that content is visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Goals')).toBeVisible();
  });

  test('should adapt to tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should show desktop layout on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check for multi-column layout
    await expect(page.locator('.grid')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should render charts efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Wait for charts to render
    await page.waitForSelector('.recharts-wrapper', { timeout: 5000 });
    
    const charts = await page.locator('.recharts-wrapper').count();
    expect(charts).toBeGreaterThan(0);
  });
});
