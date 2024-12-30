const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const browser = 'chrome'; 
const baseUrl = 'https://www.saucedemo.com';
const username = 'standard_user';
const password = 'secret_sauce';

const screenshotDir = './screenshot/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('SauceDemo Test', function () {
    this.timeout(40000);
    let driver;

    before(async function () {
        if (browser === 'firefox') {
            driver = await new Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(new firefox.Options()) 
                .build();
        } else {
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options()) 
                .build();
        }
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password); 
    });

    it('should login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be "Products".');
    });

    it('should add an item to the cart and verify it', async function () {
        const dashboardPage = new DashboardPage(driver);
        const cartPage = new CartPage(driver);

        await dashboardPage.addItemToCart();
        await dashboardPage.goToCart();

        const cartItemCount = await cartPage.getCartItemCount();
        assert.strictEqual(cartItemCount, 1, 'Expected cart to contain 1 item.');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const testName = this.currentTest.fullTitle().replace(/[^a-zA-Z0-9]/g, '_');
        const filePath = `${screenshotDir}${testName}.png`;

        fs.writeFileSync(filePath, screenshot, 'base64');
        console.log(`Screenshot saved: ${filePath}`);
    });

    after(async function () {
        await driver.quit();
    });
});
