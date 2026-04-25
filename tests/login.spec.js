const { test, expect } = require('@playwright/test');
const path = require('path');

const url = `file://${path.join(__dirname, '../index.html')}`;

test.describe('Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test('should login with valid credentials', async ({ page }) => {
        await page.fill('#username', 'test_user');
        await page.fill('#password', 'password123');
        await page.click('#login-btn');

        await expect(page.locator('#product-section')).toBeVisible();
        await expect(page.locator('#login-status')).toContainText('test_user');
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.fill('#username', 'wrong_user');
        await page.fill('#password', 'wrong_pass');
        await page.click('#login-btn');

        await expect(page.locator('#login-error')).toBeVisible();
        await expect(page.locator('#login-error')).not.toHaveClass('hidden');
    });

    test('should allow admin login with anything (the intentional bug)', async ({ page }) => {
        await page.fill('#username', 'admin');
        await page.fill('#password', 'any_password');
        await page.click('#login-btn');

        await expect(page.locator('#product-section')).toBeVisible();
        await expect(page.locator('#login-status')).toContainText('Admin User');
    });
});
