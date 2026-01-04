import { test, expect } from '@playwright/test';

test.describe('Inventory Page', () => {
    test('should load inventory page', async ({ page }) => {
        await page.goto('/inventory');

        // Check page title
        await expect(page).toHaveTitle(/AutoTrust Pro/);

        // Check header is visible
        await expect(page.getByRole('heading', { name: /Inventory/i })).toBeVisible();
    });

    test('should show add vehicle button', async ({ page }) => {
        await page.goto('/inventory');

        // Check for Add Car button
        const addButton = page.getByRole('button', { name: /Add/i });
        await expect(addButton).toBeVisible();
    });

    test('should open add vehicle dialog', async ({ page }) => {
        await page.goto('/inventory');

        // Click add button
        await page.getByRole('button', { name: /Add/i }).click();

        // Check dialog is open
        await expect(page.getByRole('dialog')).toBeVisible();
    });
});

test.describe('Dashboard Page', () => {
    test('should load dashboard', async ({ page }) => {
        await page.goto('/');

        // Check dashboard header
        await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    });

    test('should show KPI cards', async ({ page }) => {
        await page.goto('/');

        // Check for KPI cards
        await expect(page.getByText(/Cars in Stock/i)).toBeVisible();
        await expect(page.getByText(/Inventory Value/i)).toBeVisible();
    });

    test('should navigate to inventory', async ({ page }) => {
        await page.goto('/');

        // Click inventory link
        await page.getByRole('link', { name: /Inventory/i }).first().click();

        // Should be on inventory page
        await expect(page).toHaveURL(/inventory/);
    });
});

test.describe('Reports Page', () => {
    test('should load reports page', async ({ page }) => {
        await page.goto('/reports');

        // Check page title
        await expect(page.getByRole('heading', { name: /Tax Reports/i })).toBeVisible();
    });
});

test.describe('Settings Page', () => {
    test('should load settings page', async ({ page }) => {
        await page.goto('/settings');

        // Check page title
        await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
    });

    test('should show company name field', async ({ page }) => {
        await page.goto('/settings');

        // Check for company name input
        await expect(page.getByLabel(/Company Name/i)).toBeVisible();
    });
});
