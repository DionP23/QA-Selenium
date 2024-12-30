// Test Case Negative

const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const assert = require('assert');
require('dotenv').config();


const baseUrl = process.env.BASE_URL;



describe('TestCase 1', function () {
    this.timeout(40000);
    let driver;

    // Run satu kali sebelum semua pengujian
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Jalankan sebelum setiap pengujian
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login('ssss', 'asdf');
    });

    // Assertion atau Validasi
    it('Error message appears for invalid credentials', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(
            errorMessage,
            'Epic sadface: Username and password do not match any user in this service',
            'Expected error message did not match.'
        );
    });

    // Run satu kali setelah semua pengujian selesai
    after(async function () {
        await driver.quit();
    });
});
