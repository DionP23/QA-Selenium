const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id('user-name'); 
        this.passwordField = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.css('.error-message-container');
    }

    async navigate(browser) {
        await this.driver.get(browser);
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameField).sendKeys(username); 
        await this.driver.findElement(this.passwordField).sendKeys(password); 
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (err) {
            return null; 
        }
    }
}

module.exports = LoginPage;
