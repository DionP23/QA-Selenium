const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('SauceDemo Test #Regression', function () {
    this.timeout(40000);
    let driver;

    let option;
switch (browser.toLowerCase()) {
    case 'firefox':
        const firefox = require('selenium-webdriver/firefox');
        option = new firefox.Options();
        option.addArguments('--headless');
        break;
    case 'chrome':
    default:
        const chrome = require('selenium-webdriver/chrome');
        option = new chrome.Options();
        option.addArguments('--headless'); 
        break;
}

before(async function () {
    driver = await new Builder().forBrowser(browser).setChromeOptions(option).build(); 
});

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    it('should successfully add item to cart and proceed to checkout', async function () {
        const dashboardPage = new DashboardPage(driver);
        const cartPage = new CartPage(driver);
        const checkoutPage = new CheckoutPage(driver);
    
        await dashboardPage.addItemToCart();
        await dashboardPage.goToCart();
    
        const cartItemCount = await cartPage.getCartItemCount();
        assert.strictEqual(cartItemCount, 1, 'Expected cart to contain 1 item.');
    
        await cartPage.proceedToCheckout();
    
        const isCheckoutFormVisible = await checkoutPage.isCheckoutFormVisible();
        assert.strictEqual(isCheckoutFormVisible, true, 'Checkout form should be visible.');
    
        await checkoutPage.enterCheckoutInformation('nama1', 'nama2', '22323');
        await checkoutPage.continueCheckout();
    
        const confirmationMessage = await checkoutPage.finishCheckout();
assert.strictEqual(confirmationMessage, 'Thank you for your order!', 'Expected confirmation message to be "Thank you for your order!".');

    });
    
    it('should successfully log in and navigate to dashboard', async function () {
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);
    
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    
        const isDashboardVisible = await dashboardPage.isDashboardVisible();
        assert.strictEqual(isDashboardVisible, true, 'Dashboard page should be visible after login.');
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
