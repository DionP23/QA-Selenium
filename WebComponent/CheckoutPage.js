const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.id('first-name');
        this.lastNameField = By.id('last-name');
        this.postalCodeField = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.finishButton = By.id('finish');
        this.confirmationMessage = By.className('complete-header');
    }

    async enterCheckoutInformation(firstName, lastName, postalCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
    }

    async continueCheckout() {
        await this.driver.findElement(this.continueButton).click();
    }

    async finishCheckout() {
        await this.driver.findElement(this.finishButton).click();
        const message = await this.driver.findElement(this.confirmationMessage).getText();
        return message;
    }

    async isCheckoutFormVisible() {
        try {
            await this.driver.findElement(this.firstNameField);
            await this.driver.findElement(this.lastNameField);  
            await this.driver.findElement(this.postalCodeField);
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = CheckoutPage;
