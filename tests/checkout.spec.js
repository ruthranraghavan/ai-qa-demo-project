const { test, expect } = require('@playwright/test');
const path = require('path');

const url = `file://${path.join(__dirname, '../index.html')}`;

test.describe('Checkout Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
        // Login first
        await page.fill('#username', 'test_user');
        await page.fill('#password', 'password123');
        await page.click('#login-btn');
    });

    test('should add products to cart and checkout', async ({ page }) => {
        // Add Laptop
        await page.click('.product[data-id="1"] .add-to-cart');
        
        // Add Smartphone (UI Inconsistency test)
        await page.click('.product[data-id="2"] .add-to-cart-typo');

        // Check cart
        const cartItems = page.locator('#cart-items li');
        await expect(cartItems).toHaveCount(2);
        await expect(cartItems.first()).toContainText('Laptop');
        await expect(cartItems.nth(1)).toContainText('Smartphone');

        // Checkout
        await page.click('#checkout-btn');

        // Success screen
        await expect(page.locator('#success-section')).toBeVisible();
        await expect(page.locator('#success-section h2')).toContainText('Thank you');
    });

    test('should not allow checkout with empty cart', async ({ page }) => {
        // Handle dialog
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Your cart is empty!');
            await dialog.dismiss();
        });

        await page.click('#checkout-btn');
    });
});
